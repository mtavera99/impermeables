#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
DEVOLUCIONES — VERSION CORREGIDA (corrige mi error #27 de hoy)

Lo que hice mal en el primer intento de hoy:

  ERROR A — clasifique como DEVUELTA dos estados que son ENVIOS EN CURSO.
    0-AY ya lo habia documentado: los estados de transportadoras-12sep.csv estan
    TRUNCADOS. "Destinatario no cancela recaudo" es en realidad "...solicita la
    entrega en una fecha posterior" = el cliente pidio recibirlo otro dia.
    "No se entrega no cancela recaudo" es "Se visita, no se logra entrega".

  ERROR B — cobre flete de ida + flete de vuelta ($14.077 por devolucion).
    0-AY probo que el SEGURO cubre la devolucion: cuando se liquida, 99 Envios
    reemplaza valor_servicio por la prima del seguro. No hay flete de retorno.

Regla correcta de 0-AY (numerica, no depende de como escriban los estados):
  >>> una devolucion esta LIQUIDADA cuando flete == seguro <<<
  Si son distintos, el envio NO esta resuelto.
"""
import csv
from collections import defaultdict
from datetime import datetime

ARCH = "analisis/transportadoras-12sep.csv"
CORTE = datetime(2026, 9, 12)

# --- clasificacion corregida ---
ENTREGADA = {"ENTREGADA"}
# solo estas son devolucion de verdad
DEVUELTA = {"DEVOLUCION RATIFICADA", "ENTREGADO A REMITENTE", "DEVOLUCION REGIONAL"}
# 0-AY: estos dos son EN CURSO, no devolucion (estaban truncados)
RECLASIFICADOS = {"NO SE ENTREGA NO CANCELA RECAUDO", "DESTINATARIO NO CANCELA RECAUDO"}

NUCLEO = {"BOGOTA", "BOGOTA D.C.", "BOGOTA DC", "SOACHA", "MEDELLIN", "BELLO",
          "ITAGUI", "ENVIGADO", "SABANETA", "LA ESTRELLA", "COPACABANA",
          "CALDAS", "GIRARDOTA", "BARBOSA"}

filas = []
with open(ARCH, encoding="utf-8") as f:
    for r in csv.DictReader(f):
        try:
            rec = float(r["recaudo"] or 0)
            fl = float(r["flete"] or 0)
            sg = float(r["seguro"] or 0)
            fecha = datetime.strptime(r["fecha"], "%Y-%m-%d")
        except (ValueError, TypeError):
            continue
        if rec <= 0:
            continue
        e = (r["estado"] or "").strip().upper()
        ciu = (r["ciudad"] or "").strip().upper()
        if e in ENTREGADA:
            c = "entregada"
        elif e in DEVUELTA:
            c = "devuelta"
        else:
            c = "abierta"
        filas.append({
            "fecha": fecha, "edad": (CORTE - fecha).days, "ciudad": ciu,
            "recaudo": rec, "flete": fl, "seguro": sg, "estado_raw": e,
            "transp": (r["transportadora"] or "").strip().lower(),
            "cls": c, "reclas": e in RECLASIFICADOS,
            "zona": "nucleo" if ciu in NUCLEO else "region",
            "liquidada": abs(fl - sg) < 1.0,
        })

print("=" * 76)
print("DEVOLUCIONES — VERSION CORREGIDA")
print("=" * 76)
print()

# ---------- error A: cuanto movio ----------
rec = [x for x in filas if x["reclas"]]
print(f"### Error A: {len(rec)} guias que yo habia contado como devueltas y NO lo son")
for x in rec:
    print(f"    {x['ciudad'][:20]:<22}{x['estado_raw'][:38]:<40}(en curso)")
print()

# ---------- validar la regla de 0-AY ----------
print("### Validacion de la regla de 0-AY: ¿flete == seguro en las devoluciones?")
print()
dev = [x for x in filas if x["cls"] == "devuelta"]
liq = [x for x in dev if x["liquidada"]]
nol = [x for x in dev if not x["liquidada"]]
print(f"  devoluciones por estado ......... {len(dev)}")
print(f"  de esas, LIQUIDADAS (flete==seg)  {len(liq)}")
print(f"  aun sin liquidar ............... {len(nol)}")
print()
if liq:
    print("  Muestra de liquidadas (el flete YA es la prima del seguro):")
    for x in sorted(liq, key=lambda z: z["flete"])[:8]:
        print(f"    {x['ciudad'][:18]:<20}flete ${x['flete']:>9,.0f}  "
              f"seguro ${x['seguro']:>9,.0f}")
print()

# ---------- costo real ----------
print("### Costo REAL de una devolucion (solo liquidadas)")
print()
if liq:
    tot = sum(x["flete"] for x in liq)
    print(f"  {len(liq)} devoluciones liquidadas")
    print(f"  costo total .................. ${tot:,.0f}")
    print(f"  promedio por devolucion ...... ${tot/len(liq):,.0f}")
    print(f"  rango ........................ ${min(x['flete'] for x in liq):,.0f} "
          f"a ${max(x['flete'] for x in liq):,.0f}")
    print()
    print(f"  Lo que yo dije hoy (mal) ..... $14.077")
    print(f"  Constante del modelo ......... $33.648")
    print(f"  #17 ya lo habia corregido a .. $4.208")
print()


def tasa(xs):
    e = sum(1 for x in xs if x["cls"] == "entregada")
    d = sum(1 for x in xs if x["cls"] == "devuelta")
    return e + d, d, (d / (e + d) if (e + d) else 0)


# ---------- serie semanal corregida, con madurez ----------
SEM = [
    ("10-14 Ago", datetime(2026, 8, 10), datetime(2026, 8, 14)),
    ("18-21 Ago", datetime(2026, 8, 18), datetime(2026, 8, 21)),
    ("24-28 Ago", datetime(2026, 8, 24), datetime(2026, 8, 28)),
    ("31Ago-04Sep", datetime(2026, 8, 31), datetime(2026, 9, 4)),
    ("07-11 Sep", datetime(2026, 9, 7), datetime(2026, 9, 11)),
]
print("### Serie semanal CORREGIDA (y con el aviso de madurez)")
print()
print(f"{'semana':<14}{'edad':>6}{'total':>7}{'cerr':>6}{'%cerr':>7}"
      f"{'dev':>5}{'% s/cerr':>10}{'¿leible?':>11}")
print("-" * 66)
for nom, ini, fin in SEM:
    xs = [x for x in filas if ini <= x["fecha"] <= fin]
    if not xs:
        continue
    c, d, t = tasa(xs)
    edad = (CORTE - fin).days
    pc = c / len(xs)
    ok = "si" if pc >= 0.90 else ("parcial" if pc >= 0.80 else "NO")
    print(f"{nom:<14}{edad:>5}d{len(xs):>7}{c:>6}{pc*100:>6.0f}%"
          f"{d:>5}{t*100:>9.1f}%{ok:>11}")
print()

# ---------- la prueba del sesgo, corregida ----------
print("### La prueba del sesgo (misma tabla, clasificacion corregida)")
print()
print(f"{'edad':<12}{'n':>5}{'entreg':>8}{'devuel':>8}{'abiert':>8}{'dev/cerr':>10}")
print("-" * 51)
for lo, hi, nom in [(0, 5, "0-5 dias"), (6, 12, "6-12 dias"),
                    (13, 20, "13-20 dias"), (21, 40, "21+ dias")]:
    xs = [x for x in filas if lo <= x["edad"] <= hi]
    if not xs:
        continue
    c, d, t = tasa(xs)
    e = c - d
    print(f"{nom:<12}{len(xs):>5}{e:>8}{d:>8}{len(xs)-c:>8}{t*100:>9.1f}%")
print()

# ---------- linea base sobre lo leible ----------
print("### Linea base sobre semanas LEIBLES (>=90% cerradas)")
print()
leib = [x for x in filas if x["fecha"] <= datetime(2026, 8, 28)]
c, d, t = tasa(leib)
print(f"  10-ago a 28-ago: {c} cerradas, {d} devueltas = {t*100:.1f}%")
print()
print(f"  Constante del modelo ................. 19,0%")
print(f"  Lo ya medido en el archivo (maduras) .. interrapidisimo 19,6% · "
      f"servientrega 17,0%")
print()

# ---------- por transportadora, maduras ----------
print("### Por transportadora, solo guias maduras (>=10 dias)")
print()
print(f"{'transportadora':<18}{'maduras':>9}{'cerr':>6}{'dev':>5}{'tasa':>8}")
print("-" * 46)
g = defaultdict(list)
for x in filas:
    if x["edad"] >= 10:
        g[x["transp"]].append(x)
for k in sorted(g, key=lambda z: -len(g[z])):
    c, d, t = tasa(g[k])
    if c < 5:
        continue
    print(f"{k:<18}{len(g[k]):>9}{c:>6}{d:>5}{t*100:>7.1f}%")
print()

# ---------- zona ----------
print("### Nucleo vs region (maduras >=10 dias)")
print()
for z in ("nucleo", "region"):
    xs = [x for x in filas if x["zona"] == z and x["edad"] >= 10]
    c, d, t = tasa(xs)
    print(f"  {z:<10}{c:>4} cerradas  {d:>3} devueltas  {t*100:>5.1f}%")
print()

# ---------- veredicto ----------
print("### ¿Mejoramos?")
print()
ser = []
for nom, ini, fin in SEM:
    xs = [x for x in filas if ini <= x["fecha"] <= fin]
    if not xs:
        continue
    c, d, t = tasa(xs)
    if c / len(xs) >= 0.90:
        ser.append((nom, t * 100))
print("  Solo las semanas que ya se pueden leer:")
for nom, v in ser:
    print(f"    {nom:<14}{v:>6.1f}%")
print()
vals = [v for _, v in ser]
if len(vals) >= 3:
    monot = all(vals[i] > vals[i+1] for i in range(len(vals)-1))
    print(f"  ¿Monotona descendente? {'SI' if monot else 'NO — oscila'}")
    print(f"  Regla del proyecto: oscilacion es ruido, monotonia es tendencia")
