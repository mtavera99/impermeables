#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
"SI TUVIERAMOS QUE DAR UN NUMERO, CUAL SERIA"

Tres preguntas del dueno:
  1. ¿Cual es el numero actual de la cuenta?
  2. ¿Hubo mejora considerable, o el 30% fue un hueco de ciertas fechas?
  3. ¿Debajo del 20% estamos bien?

Lo nuevo aca: INTERVALO DE CONFIANZA. Con 60-70 guias por semana, 16% y 28%
pueden ser el mismo numero con distinta suerte. Sin IC no se puede responder
"¿mejoro?" — solo se puede responder "¿se ve distinto?", que no es lo mismo.

Y un hallazgo estructural: en ESTE archivo los tramos de edad coinciden 1:1 con
las semanas, asi que madurez y semana estan perfectamente confundidas.
"""
import csv, math
from collections import defaultdict
from datetime import datetime

ARCH = "analisis/transportadoras-12sep.csv"
CORTE = datetime(2026, 9, 12)

ENTREGADA = {"ENTREGADA"}
DEVUELTA = {"DEVOLUCION RATIFICADA", "ENTREGADO A REMITENTE", "DEVOLUCION REGIONAL"}

COSTO_DEV = 3109        # medido hoy sobre 43 devoluciones liquidadas
MARGEN_UD = 23244
UDS_PEDIDO = 1.3
UDS_DIA = 20


def wilson(k, n, z=1.96):
    """IC 95% de una proporcion. Wilson: sirve con n chico, a diferencia del normal."""
    if n == 0:
        return (0, 0)
    p = k / n
    d = 1 + z*z/n
    c = (p + z*z/(2*n)) / d
    h = z*math.sqrt(p*(1-p)/n + z*z/(4*n*n)) / d
    return (max(0, c-h), min(1, c+h))


def z_test(k1, n1, k2, n2):
    """Dos proporciones. Devuelve (dif, z, p aprox)."""
    if n1 == 0 or n2 == 0:
        return (0, 0, 1)
    p1, p2 = k1/n1, k2/n2
    pp = (k1+k2)/(n1+n2)
    se = math.sqrt(pp*(1-pp)*(1/n1+1/n2))
    if se == 0:
        return (p1-p2, 0, 1)
    z = (p1-p2)/se
    p = 2*(1 - 0.5*(1+math.erf(abs(z)/math.sqrt(2))))
    return (p1-p2, z, p)


def n_necesario(p1, p2, pot=0.84, alfa=1.96):
    if p1 == p2:
        return float("inf")
    pb = (p1+p2)/2
    a = alfa*math.sqrt(2*pb*(1-pb))
    b = pot*math.sqrt(p1*(1-p1)+p2*(1-p2))
    return ((a+b)**2)/((p1-p2)**2)


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
        filas.append({
            "fecha": fecha, "edad": (CORTE-fecha).days,
            "cls": "entregada" if e in ENTREGADA else ("devuelta" if e in DEVUELTA else "abierta"),
        })


def tasa(xs):
    e = sum(1 for x in xs if x["cls"] == "entregada")
    d = sum(1 for x in xs if x["cls"] == "devuelta")
    return e+d, d


SEM = [
    ("10-14 Ago", datetime(2026, 8, 10), datetime(2026, 8, 14)),
    ("18-21 Ago", datetime(2026, 8, 18), datetime(2026, 8, 21)),
    ("24-28 Ago", datetime(2026, 8, 24), datetime(2026, 8, 28)),
    ("31Ago-04Sep", datetime(2026, 8, 31), datetime(2026, 9, 4)),
    ("07-11 Sep", datetime(2026, 9, 7), datetime(2026, 9, 11)),
]

print("=" * 78)
print("¿CUAL ES EL NUMERO? — con intervalo de confianza")
print("=" * 78)
print()

# ---------- 0. el problema estructural ----------
print("### 0. Por que este archivo NO puede responder si mejoramos")
print()
print(f"{'tramo de edad':<14}{'guias':>7}   semanas que caen en ese tramo")
print("-" * 62)
for lo, hi, nom in [(0, 5, "0-5 dias"), (6, 12, "6-12 dias"),
                    (13, 20, "13-20 dias"), (21, 40, "21+ dias")]:
    xs = [x for x in filas if lo <= x["edad"] <= hi]
    sems = set()
    for nomsem, ini, fin in SEM:
        if any(ini <= x["fecha"] <= fin for x in xs):
            sems.add(nomsem)
    print(f"{nom:<14}{len(xs):>7}   {', '.join(sorted(sems, key=lambda s: [n for n,_,_ in SEM].index(s)))}")
print()
print("  Cada tramo de edad ES una semana. Madurez y fecha van pegadas:")
print("  no hay forma de saber si la ultima semana se ve bien porque mejoro")
print("  o porque esta verde. Estan perfectamente confundidas.")
print()

# ---------- 1. semanas legibles con IC ----------
print("### 1. Las semanas que SI se pueden leer, con intervalo de confianza")
print()
print(f"{'semana':<14}{'cerr':>6}{'dev':>5}{'tasa':>8}{'IC 95%':>20}")
print("-" * 53)
legibles = []
for nom, ini, fin in SEM:
    xs = [x for x in filas if ini <= x["fecha"] <= fin]
    n, k = tasa(xs)
    if not n or n/len(xs) < 0.90:
        continue
    lo, hi = wilson(k, n)
    legibles.append((nom, k, n))
    print(f"{nom:<14}{n:>6}{k:>5}{k/n*100:>7.1f}%"
          f"{f'{lo*100:.1f}% – {hi*100:.1f}%':>20}")
print()
print("  🔑 Mira los intervalos: se SOLAPAN todos. Ese es el punto.")
print()

# ---------- 2. el hueco vs lo de al lado ----------
print("### 2. ¿El 27,9% fue un hueco real, o mala suerte?")
print()
mala = [x for x in legibles if x[0] == "18-21 Ago"][0]
otras_k = sum(k for n_, k, _ in legibles if n_ != "18-21 Ago")
otras_n = sum(nn for n_, _, nn in legibles if n_ != "18-21 Ago")
dif, z, p = z_test(mala[1], mala[2], otras_k, otras_n)
print(f"  semana mala .......... {mala[1]}/{mala[2]} = {mala[1]/mala[2]*100:.1f}%")
print(f"  las otras dos juntas . {otras_k}/{otras_n} = {otras_k/otras_n*100:.1f}%")
print(f"  diferencia ........... {dif*100:+.1f} puntos")
print(f"  p = {p:.3f}   ->  {'SI es un hueco real' if p < 0.05 else 'NO se distingue del ruido'}")
print()
if p >= 0.05:
    print("  Traduccion: el 27,9% es compatible con puro azar sobre una base del 17%.")
    print("  19 devoluciones de 68 envios. Con esa base, 13 o 14 tambien era posible.")
print()

# ---------- 3. el numero de la cuenta ----------
print("### 3. EL NUMERO de la cuenta")
print()
tot_k = sum(k for _, k, _ in legibles)
tot_n = sum(nn for _, _, nn in legibles)
lo, hi = wilson(tot_k, tot_n)
print(f"  Sobre TODO lo legible (10-ago a 28-ago, madurez >=15 dias):")
print(f"    {tot_k} devoluciones / {tot_n} guias cerradas = {tot_k/tot_n*100:.1f}%")
print(f"    IC 95%: {lo*100:.1f}% – {hi*100:.1f}%")
print()
sin_k = otras_k
sin_n = otras_n
lo2, hi2 = wilson(sin_k, sin_n)
print(f"  Sacando la semana mala:")
print(f"    {sin_k}/{sin_n} = {sin_k/sin_n*100:.1f}%   IC 95%: {lo2*100:.1f}% – {hi2*100:.1f}%")
print()
print(f"  Ya medido en el archivo (por transportadora, maduras):")
print(f"    interrapidisimo 19,6%  ·  servientrega 17,0%  ·  coordinadora 20,0%")
print()

# ---------- 4. cuantas guias hacen falta ----------
print("### 4. ¿Cuantas guias hacen falta para PROBAR una mejora?")
print()
print(f"{'comparacion':<26}{'guias/grupo':>13}{'dias/grupo':>12}")
print("-" * 51)
UDS_DIA_GUIAS = 20/UDS_PEDIDO
for a, b, nom in [(0.20, 0.18, "20% -> 18% (2 pts)"),
                  (0.20, 0.16, "20% -> 16% (4 pts)"),
                  (0.20, 0.15, "20% -> 15% (5 pts)"),
                  (0.28, 0.17, "28% -> 17% (11 pts)")]:
    n = n_necesario(a, b)
    print(f"{nom:<26}{n:>13,.0f}{n/UDS_DIA_GUIAS:>12,.0f}")
print()
print(f"  (a ~{UDS_DIA_GUIAS:.0f} guias/dia, y hay que sumarle 3 semanas de rezago)")
print()

# ---------- 5. cuanto vale un punto ----------
print("### 5. ¿Debajo del 20% estamos bien? — cuanto vale un punto")
print()
ped_dia = UDS_DIA / UDS_PEDIDO
marg_ped = MARGEN_UD * UDS_PEDIDO
por_punto = 0.01 * ped_dia * (marg_ped + COSTO_DEV)
print(f"  {ped_dia:.1f} pedidos/dia · margen ${marg_ped:,.0f}/pedido · "
      f"devolucion ${COSTO_DEV:,}")
print()
print(f"  1 punto de devolucion = ${por_punto:,.0f}/dia = ${por_punto*30:,.0f}/mes")
print()
print(f"{'tasa':<10}{'utilidad/mes vs 20%':>24}")
print("-" * 34)
for t in (0.15, 0.17, 0.19, 0.20, 0.22, 0.25, 0.28):
    delta = (0.20 - t) * 100 * por_punto * 30
    print(f"{t*100:>5.0f}%{delta:>+24,.0f}")
print()
print("  El umbral de 20% no sale de la contabilidad: sale de la costumbre.")
print("  Lo que importa es que cada punto son ~$150.000/mes, en los dos sentidos.")
