#!/usr/bin/env python3
"""
QUE TRANSPORTADORA USAR DE HOY EN ADELANTE  (12-sep-2026)
=========================================================
Pregunta del dueño: hoy alterna Interrapidisimo y Coordinadora. ¿Cargar la mano
a una, a la otra, o dejarlas parejas y que compitan por costo?

⚠️ CORRECCION IMPORTANTE (por eso existe la version 2 de este script)
La primera version clasificaba los estados buscando la palabra "entrega" o
"devolucion" dentro del texto. Eso produjo dos errores graves:

  1. "ENTREGADO A REMITENTE" (Servientrega, 9 guias) contiene "ENTREGADO",
     asi que lo conto como ENTREGA EXITOSA. Es exactamente lo contrario:
     el paquete volvio al remitente. Es una DEVOLUCION.
     Resultado del error: Servientrega aparecia con 0% de devoluciones.

  2. Coordinadora NO usa la palabra "devolucion" en ningun estado. Usa
     "Destinatario no cancela recaudo", "No se entrega no cancela recaudo",
     "Cerrado por incidencia". Ninguno hacia match, asi que Coordinadora
     aparecia con 0 devoluciones y con cara de ser la mejor.

Cada transportadora escribe los estados en su propio idioma. Aqui va la tabla
explicita, estado por estado, sin adivinar por subcadenas.

SOLO LECTURA de un CSV local. No toca la red.
"""

import collections
import csv
import datetime as dt
import math
import os

CSV = os.path.join(os.path.dirname(os.path.abspath(__file__)), "transportadoras-12sep.csv")
HOY = dt.date(2026, 9, 12)
MADUREZ = 10

# ---------------------------------------------------------------------------
# TABLA EXPLICITA DE ESTADOS. Los 23 estados que existen en el CSV, uno por uno.
# ---------------------------------------------------------------------------
ENTREGADA = {"Entregada"}

DEVUELTA = {
    "Devolucion ratificada",              # interrapidisimo
    "Devolucion Regional",                # interrapidisimo
    "ENTREGADO A REMITENTE",              # servientrega  <- volvio al remitente
    "Destinatario no cancela recaudo",    # coordinadora  <- no pago, se devuelve
    "No se entrega no cancela recaudo",   # coordinadora
    "Cerrado por incidencia",             # coordinadora  <- cerrado sin entregar
    "Deterioro en validacion GP",         # coordinadora  <- llego averiado, perdida
}

# en curso, pero con senal de problema: predicen devolucion
EN_CURSO_ALERTA = {
    "No se localiza direccion",
    "Se visita no se logra entrega",
    "Unidad en lugar diferente",
    "Intento de entrega",
    "Reclame en oficina",
    "Reclamo oficina WhatsApp",
}

EN_CURSO_NORMAL = {
    "Transito Urbano", "Transito urbano informado Whatsapp", "EN PROCESAMIENTO",
    "En transporte", "Creado", "Admitida", "En terminal de destino",
    "Reparto", "Recoleccion programada",
}


def clasifica(e):
    e = (e or "").strip()
    if e in ENTREGADA:
        return "ent"
    if e in DEVUELTA:
        return "dev"
    if e in EN_CURSO_ALERTA:
        return "alerta"
    if e in EN_CURSO_NORMAL:
        return "curso"
    return "SIN_CLASIFICAR"


def wilson(k, n):
    if n == 0:
        return (0.0, 1.0)
    z, p = 1.96, k / n
    d = 1 + z * z / n
    c = p + z * z / (2 * n)
    m = z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))
    return (max(0.0, (c - m) / d), min(1.0, (c + m) / d))


filas = []
for r in csv.DictReader(open(CSV)):
    try:
        f = dt.date.fromisoformat(r["fecha"][:10])
    except Exception:
        continue
    fl = (r.get("flete") or "").replace(",", "").strip()
    filas.append({
        "fecha": f, "edad": (HOY - f).days,
        "t": (r["transportadora"] or "?").strip(),
        "ciudad": (r["ciudad"] or "?").strip().upper(),
        "estado": (r["estado"] or "").strip(),
        "cls": clasifica(r["estado"]),
        "flete": float(fl) if fl.replace(".", "", 1).isdigit() else 0.0,
    })

sin = [x for x in filas if x["cls"] == "SIN_CLASIFICAR"]
if sin:
    print("⛔ HAY ESTADOS SIN CLASIFICAR - arreglar la tabla antes de creer nada:")
    for e, n in collections.Counter(x["estado"] for x in sin).most_common():
        print("     %4d  %r" % (n, e))
    print()
else:
    print("✅ los %d estados del CSV estan todos clasificados a mano.\n" % len(set(x["estado"] for x in filas)))

# ---------------------------------------------------------------- 1
print("=" * 80)
print("1. DEVOLUCIONES SOBRE GUIAS MADURAS (>=%d dias) Y RESUELTAS" % MADUREZ)
print("=" * 80)
print("   Madura = ya tuvo tiempo de devolverse (la mediana de rezago es 10 dias).")
print("   Resuelta = ya terminó: entregada o devuelta.\n")
print("   transportadora     guias  maduras  resueltas  dev    tasa       IC 95%")
print("   " + "-" * 74)
for t in sorted({x["t"] for x in filas}):
    tod = [x for x in filas if x["t"] == t]
    mad = [x for x in tod if x["edad"] >= MADUREZ]
    res = [x for x in mad if x["cls"] in ("dev", "ent")]
    d = sum(1 for x in res if x["cls"] == "dev")
    lo, hi = wilson(d, len(res))
    print("   %-18s %6d %8d %10d %4d  %6s   %4.1f%% - %4.1f%%"
          % (t[:18], len(tod), len(mad), len(res), d,
             f"{d/len(res)*100:.1f}%" if res else "  -  ", lo * 100, hi * 100))
print("\n   👉 Servientrega ya NO sale en 0%. Ese era el bug de 'ENTREGADO A REMITENTE'.")

# ---------------------------------------------------------------- 2
print()
print("=" * 80)
print("2. SENAL TEMPRANA: GUIAS EN ESTADO DE PROBLEMA (no hay que esperar 10 dias)")
print("=" * 80)
print("   'No se localiza direccion', 'Se visita no se logra entrega', 'Unidad en")
print("   lugar diferente', 'Intento de entrega', 'Reclame en oficina'. Todas")
print("   terminan en devolucion con mucha probabilidad. Esto se ve YA.\n")
print("   transportadora     guias   en alerta   %      entregadas   devueltas")
print("   " + "-" * 70)
for t in sorted({x["t"] for x in filas}):
    tod = [x for x in filas if x["t"] == t]
    a = sum(1 for x in tod if x["cls"] == "alerta")
    e = sum(1 for x in tod if x["cls"] == "ent")
    d = sum(1 for x in tod if x["cls"] == "dev")
    print("   %-18s %6d %10d %5.0f%% %11d %11d" % (t[:18], len(tod), a, a / len(tod) * 100, e, d))
print("\n   ⚠️ ojo con la edad: las guias de Coordinadora son casi todas de los")
print("      ultimos dias, y una guia joven tiene mas chance de estar 'en curso'.")
print("      Pero 'no se localiza direccion' NO es un estado neutro de tránsito:")
print("      es una falla que ya ocurrió.")

# ---------------------------------------------------------------- 3
print()
print("=" * 80)
print("3. COORDINADORA EN DETALLE (es la que esta en duda)")
print("=" * 80)
co = [x for x in filas if x["t"] == "coordinadora"]
print("   %d guias, de %s a %s\n" % (len(co), min(x["fecha"] for x in co), max(x["fecha"] for x in co)))
for e, n in collections.Counter(x["estado"] for x in co).most_common():
    print("   %2d  %-34s -> %s" % (n, e, clasifica(e).upper()))
ent = sum(1 for x in co if x["cls"] == "ent")
dev = sum(1 for x in co if x["cls"] == "dev")
ale = sum(1 for x in co if x["cls"] == "alerta")
print("\n   resueltas: %d entregadas + %d devueltas = %d  ->  tasa %.0f%%"
      % (ent, dev, ent + dev, dev / (ent + dev) * 100 if ent + dev else 0))
lo, hi = wilson(dev, ent + dev)
print("   IC 95%%: %.1f%% - %.1f%%   (n=%d: sigue siendo un volado)" % (lo * 100, hi * 100, ent + dev))
peor = (dev + ale) / len(co) * 100
print("   si TODAS las %d en alerta se devuelven: %.0f%% (el peor caso)" % (ale, peor))
print("   si NINGUNA se devuelve:                 %.0f%% (el mejor caso)" % (dev / len(co) * 100))

# los mal enrutados: ¿evento o patron?
print("\n   'Unidad en lugar diferente' (mal enrutadas) por fecha:")
for f, n in sorted(collections.Counter(x["fecha"] for x in co if x["estado"] == "Unidad en lugar diferente").items()):
    tot = sum(1 for x in co if x["fecha"] == f)
    print("      %s: %d de %d guias despachadas ese dia" % (f, n, tot))

# ---------------------------------------------------------------- 4
print()
print("=" * 80)
print("4. MISMA CIUDAD, MISMA MADUREZ: LA UNICA COMPARACION LIMPIA")
print("=" * 80)
por = collections.defaultdict(lambda: collections.defaultdict(lambda: [0, 0]))
for x in filas:
    if x["edad"] >= MADUREZ and x["cls"] in ("dev", "ent"):
        c = por[x["ciudad"]][x["t"]]
        c[1] += 1
        c[0] += 1 if x["cls"] == "dev" else 0
comp = {c: v for c, v in por.items() if len(v) >= 2}
if not comp:
    print("   ⛔ ninguna ciudad tiene dos transportadoras con dato maduro.")
for c in sorted(comp, key=lambda c: -sum(n for _, n in por[c].values())):
    print("   %s:" % c)
    for t, (d, n) in sorted(por[c].items(), key=lambda kv: -kv[1][1]):
        print("      %-18s %2d/%-3d  %5.0f%%%s" % (t[:18], d, n, d / n * 100,
              "   <- muy poco dato" if n < 5 else ""))
print("\n   👉 Coordinadora tiene 1 sola guia madura comparable. NO alcanza.")

# ---------------------------------------------------------------- 5
print()
print("=" * 80)
print("5. COSTO POR GUIA (si la calidad no se distingue, decide el flete)")
print("=" * 80)
print("   transportadora     guias   flete prom   mediana   +costo de devolver")
print("   " + "-" * 70)
for t in sorted({x["t"] for x in filas}):
    v = sorted(x["flete"] for x in filas if x["t"] == t and x["flete"] > 0)
    if not v:
        continue
    mad = [x for x in filas if x["t"] == t and x["edad"] >= MADUREZ and x["cls"] in ("dev", "ent")]
    tasa = (sum(1 for x in mad if x["cls"] == "dev") / len(mad)) if mad else 0
    prom = sum(v) / len(v)
    # una devolucion cuesta el flete de ida + el de vuelta
    esperado = prom * (1 + tasa)
    print("   %-18s %6d  $%10s  $%8s   $%s  <- costo real esperado"
          % (t[:18], len(v), f"{prom:,.0f}", f"{v[len(v)//2]:,.0f}", f"{esperado:,.0f}"))
print()
