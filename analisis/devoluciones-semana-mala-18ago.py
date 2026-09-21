#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
La semana 18-21 ago dio 27,9% de devolucion. Las de al lado, 16,0% y 16,9%.
¿Fue un accidente o es el estado normal de la operacion?

De esto depende la linea base:
 - si fue accidente -> base ~16,7% y la constante 19% esta holgada
 - si es normal     -> base ~21,7% y la constante 19% nos esta enganando
"""
import csv
from collections import defaultdict
from datetime import datetime

ARCH = "analisis/transportadoras-12sep.csv"

ENTREGADA = {"ENTREGADA"}
DEVUELTA = {"DEVOLUCION RATIFICADA", "ENTREGADO A REMITENTE", "DEVOLUCION REGIONAL",
            "NO SE ENTREGA NO CANCELA RECAUDO", "DESTINATARIO NO CANCELA RECAUDO"}
NUCLEO = {"BOGOTA", "BOGOTA D.C.", "BOGOTA DC", "SOACHA", "MEDELLIN", "BELLO",
          "ITAGUI", "ENVIGADO", "SABANETA", "LA ESTRELLA", "COPACABANA",
          "CALDAS", "GIRARDOTA", "BARBOSA"}

filas = []
with open(ARCH, encoding="utf-8") as f:
    for r in csv.DictReader(f):
        try:
            rec = float(r["recaudo"] or 0)
            fecha = datetime.strptime(r["fecha"], "%Y-%m-%d")
        except (ValueError, TypeError):
            continue
        if rec <= 0:
            continue
        e = (r["estado"] or "").strip().upper()
        ciu = (r["ciudad"] or "").strip().upper()
        filas.append({
            "fecha": fecha, "ciudad": ciu, "recaudo": rec,
            "transp": (r["transportadora"] or "").strip().lower(),
            "cls": "entregada" if e in ENTREGADA else ("devuelta" if e in DEVUELTA else "abierta"),
            "zona": "nucleo" if ciu in NUCLEO else "region",
            "uds": 1 if rec <= 100000 else 2,
        })


def t(xs):
    e = sum(1 for x in xs if x["cls"] == "entregada")
    d = sum(1 for x in xs if x["cls"] == "devuelta")
    return e + d, d, (d / (e + d) if (e + d) else 0)


print("=" * 72)
print("¿LA SEMANA DEL 18-AGO FUE UN ACCIDENTE?")
print("=" * 72)
print()

# ---------- dia por dia de esa semana ----------
print("### Dia por dia, 18 al 21 de agosto")
print()
print(f"{'fecha':<13}{'total':>7}{'cerr':>6}{'devuel':>8}{'% devol':>9}")
print("-" * 43)
for dd in ("2026-08-18", "2026-08-19", "2026-08-20", "2026-08-21"):
    f0 = datetime.strptime(dd, "%Y-%m-%d")
    xs = [x for x in filas if x["fecha"] == f0]
    if not xs:
        continue
    c, d, tt = t(xs)
    print(f"{dd:<13}{len(xs):>7}{c:>6}{d:>8}{tt*100:>8.1f}%")
print()

# ---------- el 18-ago en detalle ----------
f18 = datetime(2026, 8, 18)
x18 = [x for x in filas if x["fecha"] == f18]
c, d, tt = t(x18)
print(f"### El 18-ago solo: {len(x18)} guias en UN dia, {d} devueltas ({tt*100:.1f}%)")
print()
print("  Por transportadora:")
g = defaultdict(list)
for x in x18:
    g[x["transp"]].append(x)
for k in sorted(g, key=lambda z: -len(g[z])):
    c2, d2, t2 = t(g[k])
    print(f"    {k:<18}{len(g[k]):>3} guias  {d2:>2} devuel  {t2*100:>5.1f}%")
print()
print("  Por zona:")
g = defaultdict(list)
for x in x18:
    g[x["zona"]].append(x)
for k in g:
    c2, d2, t2 = t(g[k])
    print(f"    {k:<18}{len(g[k]):>3} guias  {d2:>2} devuel  {t2*100:>5.1f}%")
print()
print("  Ciudades que devolvieron ese dia:")
g = defaultdict(list)
for x in x18:
    g[x["ciudad"]].append(x)
for k in sorted(g, key=lambda z: -t(g[z])[1]):
    c2, d2, t2 = t(g[k])
    if d2:
        print(f"    {k[:24]:<26}{len(g[k]):>3} guias  {d2:>2} devuel")
print()

# ---------- dias de lote grande vs dias normales ----------
print("### La hipotesis: ¿los dias de LOTE GRANDE devuelven mas?")
print()
pordia = defaultdict(list)
for x in filas:
    pordia[x["fecha"]].append(x)
grandes = [f for f, xs in pordia.items() if len(xs) >= 24]
normales = [f for f, xs in pordia.items() if len(xs) < 24]
for nom, dias_ in (("lote grande (24+)", grandes), ("dia normal (<24)", normales)):
    xs = [x for f in dias_ for x in pordia[f]]
    c2, d2, t2 = t(xs)
    print(f"  {nom:<20}{len(dias_):>2} dias  {len(xs):>3} guias  "
          f"{c2:>3} cerr  {d2:>2} devuel  {t2*100:>5.1f}%")
print()
print("  Dias de lote grande:")
for f in sorted(grandes):
    xs = pordia[f]
    c2, d2, t2 = t(xs)
    print(f"    {f:%d-%b}  {len(xs):>3} guias  {d2:>2} devuel  {t2*100:>5.1f}%")
print()

# ---------- linea base con y sin la semana mala ----------
print("### Linea base, segun si incluimos la semana mala")
print()
mad = [x for x in filas
       if x["fecha"] <= datetime(2026, 8, 28)]          # cohortes ya resueltas
sin_mala = [x for x in mad
            if not (datetime(2026, 8, 18) <= x["fecha"] <= datetime(2026, 8, 21))]
for nom, xs in (("CON la semana del 18-ago", mad), ("SIN la semana del 18-ago", sin_mala)):
    c2, d2, t2 = t(xs)
    print(f"  {nom:<28}{c2:>4} cerradas  {d2:>3} devuel  {t2*100:>5.1f}%")
print()
print("  Constante del modelo: 19,0%")
print()

# ---------- impacto en plata de 1 punto ----------
print("### Cuanto vale 1 punto de devolucion")
print()
MARGEN = 23244
UDS_DIA = 20
COSTO_DEV = 14077   # medido: flete ida + vuelta real
print(f"  A {UDS_DIA} uds/dia, 1 punto mas de devolucion =")
por_punto = UDS_DIA * 0.01 * (MARGEN + COSTO_DEV / 1.3)
print(f"    {UDS_DIA*0.01:.1f} uds/dia que no se venden")
print(f"    ${por_punto:,.0f}/dia  =  ${por_punto*30:,.0f}/mes")
print()
print(f"  Pasar de 21,7% a 16,7% (5 puntos) valdria "
      f"${por_punto*5*30:,.0f}/mes")
