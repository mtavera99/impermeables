#!/usr/bin/env python3
"""
ASIGNACION DE TRANSPORTADORA PARA EL DESPACHO DEL 14-SEP (30 pedidos, 39 unidades)
=================================================================================
Pregunta del dueño: ¿todo con Interrapidisimo, o reparto? ¿En que orden?

REGLA #0, LA QUE MANDA SOBRE TODAS: si al cliente ya se le dijo "reclame en la
oficina de X", el pedido NO puede cambiar de transportadora. El cliente va a ir
a esa oficina. Mandarlo por otra = devolucion garantizada.
Eso NO es una decision de optimizacion: es una restriccion.

Despues de eso, y solo para los que quedan libres:
  1. Las tres transportadoras son estadisticamente INDISTINGUIBLES en devoluciones
     (20,0% / 19,6% / 17,0%, intervalos solapados). Ver 0-AN y 0-AR.
  2. Entonces deciden: cobertura del municipio, costo del flete, y la oportunidad
     de armar el A/B de Coordinadora en ciudades donde SI hay linea base.
  3. Donde no hay dato historico de la ciudad, NO se inventa: va el default.

⚠️ NO se usa el promedio de la cuenta como umbral (errores #12 y #14).
⚠️ NO se extrapola de una ciudad a su region (error de las transportadoras).

SOLO LECTURA de CSVs locales. Sin PII: ni nombres, ni telefonos, ni direcciones.
"""

import collections
import csv
import datetime as dt
import os

BASE = os.path.dirname(os.path.abspath(__file__))
HOY = dt.date(2026, 9, 14)
MADUREZ = 10

# --- historico: clasificacion de estados hecha a mano (0-AN) -----------------
src = open(os.path.join(BASE, "veredicto-transportadoras-12sep.py")).read()
ns = {}
exec(src[src.index("ENTREGADA = {"):src.index("def clasifica")], ns)
ENT, DEV, AL = ns["ENTREGADA"], ns["DEVUELTA"], ns["EN_CURSO_ALERTA"]
cl = lambda e: "ent" if e.strip() in ENT else "dev" if e.strip() in DEV else \
               "alerta" if e.strip() in AL else "curso"

hist = collections.defaultdict(lambda: [0, 0])            # ciudad -> [dev, resueltas]
hist_t = collections.defaultdict(lambda: collections.defaultdict(lambda: [0, 0]))
flete_ciudad = collections.defaultdict(list)
for x in csv.DictReader(open(os.path.join(BASE, "transportadoras-12sep.csv"))):
    f = dt.date.fromisoformat(x["fecha"][:10])
    c = x["ciudad"].strip().upper()
    t = x["transportadora"].strip()
    k = cl(x["estado"])
    fl = (x["flete"] or "0").replace(",", "")
    if fl.replace(".", "", 1).isdigit() and float(fl) > 0:
        flete_ciudad[c].append(float(fl))
    if (HOY - f).days >= MADUREZ and k in ("ent", "dev"):
        hist[c][1] += 1
        hist_t[c][t][1] += 1
        if k == "dev":
            hist[c][0] += 1
            hist_t[c][t][0] += 1

pedidos = list(csv.DictReader(open(os.path.join(BASE, "despacho-14sep.csv"))))

# ---------------------------------------------------------------- bloque 1
print("=" * 84)
print("BLOQUE 1 · LOS QUE **NO SE PUEDEN CAMBIAR** (al cliente ya se le dijo la oficina)")
print("=" * 84)
bloqueados = [p for p in pedidos if p["entrega"] == "oficina"
              and "interrapidisimo" in p["transportadora_dicha_al_cliente"]]
print("   Estos %d van OBLIGATORIAMENTE por Interrapidisimo. No es optimizacion,\n"
      "   es que el cliente va a caminar hasta ESA oficina.\n" % len(bloqueados))
print("   #   ciudad                     uds   recaudo")
for p in bloqueados:
    print("   %-3s %-26s %3s  $%s" % (p["n"], p["ciudad"], p["unidades"], f"{int(p['recaudo']):,}"))

# ---------------------------------------------------------------- bloque 2
print()
print("=" * 84)
print("BLOQUE 2 · 🔴 EL QUE HAY QUE ARREGLAR ANTES DE DESPACHAR")
print("=" * 84)
malos = [p for p in pedidos if "CONTRADICTORIO" in p["transportadora_dicha_al_cliente"]]
for p in malos:
    print("""   #%s · %s (%s) · $%s
   El mensaje dice "oficina de SERVIENTREGA en Potosi" pero el campo Direccion
   dice "Oficina interrapidisimo". SON DOS OFICINAS DISTINTAS.
   👉 Si va a una y el paquete esta en la otra: DEVOLUCION SEGURA.
   👉 Hay que escribirle y confirmar cual antes de generar la guia."""
          % (p["n"], p["ciudad"], p["departamento"], f"{int(p['recaudo']):,}"))

gen = [p for p in pedidos if p["entrega"] == "oficina"
       and p["transportadora_dicha_al_cliente"] == "generica"]
for p in gen:
    print("\n   #%s · %s · $%s — se le dijo 'oficina de la transportadora' sin nombrarla."
          % (p["n"], p["ciudad"], f"{int(p['recaudo']):,}"))
    print("   👉 Queda libre, PERO hay que avisarle por cual va, con direccion exacta.")

# ---------------------------------------------------------------- bloque 3
print()
print("=" * 84)
print("BLOQUE 3 · LOS LIBRES: QUE DICE EL HISTORICO DE CADA CIUDAD")
print("=" * 84)
libres = [p for p in pedidos if p not in bloqueados and p not in malos]
print("   %d pedidos con transportadora libre.\n" % len(libres))
print("   #   ciudad                  uds  recaudo    historico de la ciudad        riesgo")
print("   " + "-" * 80)
sin_dato = []
for p in sorted(libres, key=lambda x: -int(x["recaudo"])):
    c = p["ciudad"]
    d, n = hist.get(c, [0, 0])
    if n >= 2:
        tasa = d / n
        ico = "🔴 ALTO" if tasa >= 0.30 else "🟠 MEDIO" if tasa >= 0.20 else "🟢 BAJO"
        det = "%d/%d resueltas = %.0f%%" % (d, n, tasa * 100)
    elif n == 1:
        det = "1 sola guia (%d dev)" % d
        ico = "⛔ sin dato"
        sin_dato.append(p)
    else:
        det = "sin historico"
        ico = "⛔ sin dato"
        sin_dato.append(p)
    print("   %-3s %-23s %3s  $%-8s %-29s %s"
          % (p["n"], c[:23], p["unidades"], f"{int(p['recaudo']):,}", det, ico))

# ---------------------------------------------------------------- bloque 4
print()
print("=" * 84)
print("BLOQUE 4 · DONDE SI HAY DATO PARA COMPARAR TRANSPORTADORAS")
print("=" * 84)
hay = False
for p in libres:
    c = p["ciudad"]
    if len(hist_t.get(c, {})) >= 2:
        hay = True
        print("   %s (pedido #%s):" % (c, p["n"]))
        for t, (d, n) in sorted(hist_t[c].items(), key=lambda kv: -kv[1][1]):
            print("      %-17s %d/%d = %3.0f%%%s" % (t, d, n, d / n * 100,
                  "   <- muy poco dato" if n < 5 else ""))
if not hay:
    print("   ⛔ En NINGUNA de las ciudades libres hay dos transportadoras con dato maduro.")
    print("      O sea: para este lote, el historico NO puede elegir transportadora.")

# ---------------------------------------------------------------- bloque 5
print()
print("=" * 84)
print("BLOQUE 5 · PLATA EN JUEGO SI SE DEVUELVE")
print("=" * 84)
tot_u = sum(int(p["unidades"]) for p in pedidos)
tot_r = sum(int(p["recaudo"]) for p in pedidos)
print("   %d pedidos · %d unidades · $%s de recaudo total\n" % (len(pedidos), tot_u, f"{tot_r:,}"))
UTIL_U = 24129
print("   Los pedidos de MAS valor son los que hay que blindar con confirmacion:")
print("   #   ciudad                  uds  recaudo    utilidad en juego")
for p in sorted(pedidos, key=lambda x: -int(x["recaudo"]))[:8]:
    u = int(p["unidades"])
    print("   %-3s %-23s %3d  $%-8s $%s" % (p["n"], p["ciudad"][:23], u,
          f"{int(p['recaudo']):,}", f"{u*UTIL_U:,}"))
print()
print("   Una devolucion cuesta el flete IDA + VUELTA (~$41.000 en promedio)")
print("   MAS la utilidad que no se hizo. En los de 2-3 unidades eso es $48.000-72.000")
print("   de utilidad perdida por pedido.")
