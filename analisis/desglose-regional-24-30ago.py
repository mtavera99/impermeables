#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
DESGLOSE REGIONAL Y POR ANUNCIO  ·  24 al 30 de agosto 2026

Responde dos preguntas pendientes:
  1. ¿Meta gasto en Valle del Cauca?  (decide si se abre el Lago Valle)
  2. ¿Que anuncio produce que?         (decide cual creativo se mantiene)

El export NO trae la columna Resultados a nivel region, asi que no hay costo
por conversacion regional. Si trae gasto, impresiones, alcance, CTR y CPC.
"""
import csv
from collections import defaultdict

def money(x):
    return f"${x:,.0f}".replace(",", ".")

rows = []
with open("regiones-24-30ago.csv", encoding="utf-8") as f:
    for r in csv.DictReader(f):
        r["gasto"] = float(r["gasto"])
        r["imp"] = int(r["impresiones"])
        r["alc"] = int(r["alcance"])
        r["ctr"] = float(r["ctr"]) if r["ctr"] else None
        rows.append(r)

TOT = sum(r["gasto"] for r in rows)
DIAS = len(set(r["dia"] for r in rows))

print("=" * 74)
print(f"DESGLOSE REGIONAL  ·  {DIAS} dias  ·  {len(rows)} filas")
print("=" * 74)
print(f"\nGasto total del periodo: {money(TOT)}")
print(f"Promedio diario:         {money(TOT/DIAS)}")

print("\n" + "=" * 74)
print("1. DONDE GASTO META")
print("=" * 74)
print(f"{'REGION':<22}{'GASTO':>13}{'% DEL TOTAL':>14}{'IMPRESIONES':>14}")
print("-" * 74)
porreg = defaultdict(lambda: {"g": 0.0, "i": 0})
for r in rows:
    porreg[r["region"]]["g"] += r["gasto"]
    porreg[r["region"]]["i"] += r["imp"]
for reg, d in sorted(porreg.items(), key=lambda x: -x[1]["g"]):
    print(f"{reg:<22}{money(d['g']):>13}{d['g']/TOT:>13.2%}{d['i']:>14,}"
          .replace(",", "."))
print("-" * 74)
print(f"{'TOTAL':<22}{money(TOT):>13}{1:>13.2%}"
      f"{sum(d['i'] for d in porreg.values()):>14,}".replace(",", "."))

print("\n" + "!" * 74)
print("VALLE DEL CAUCA:")
valle = [r for r in rows if "valle" in r["region"].lower()]
if not valle:
    print("   NO APARECE. Gasto = $0 en los 7 dias.")
else:
    print(f"   {money(sum(r['gasto'] for r in valle))}")
print("!" * 74)

regiones = sorted(porreg.keys())
print(f"\nRegiones con entrega: {len(regiones)}  ->  {', '.join(regiones)}")
print(f"Colombia tiene 32 departamentos + Bogota.")

print("\n" + "=" * 74)
print("2. ESTRUCTURA REAL DE ANUNCIOS POR CONJUNTO")
print("=" * 74)
estructura = defaultdict(lambda: defaultdict(float))
for r in rows:
    estructura[r["conjunto"]][r["anuncio"]] += r["gasto"]
for conj in sorted(estructura, key=lambda c: -sum(estructura[c].values())):
    sub = estructura[conj]
    tc = sum(sub.values())
    print(f"\n{conj}   ({money(tc)}  ·  {tc/TOT:.1%} del total)")
    for ad, g in sorted(sub.items(), key=lambda x: -x[1]):
        barra = "#" * int(g / tc * 40)
        print(f"   {ad:<34}{money(g):>11}  {g/tc:>6.1%}  {barra}")

print("\n" + "=" * 74)
print("3. DESEMPENO POR ANUNCIO  (agregado, todas las regiones)")
print("=" * 74)
print(f"{'ANUNCIO':<34}{'GASTO':>11}{'IMPR':>9}{'CTR':>8}{'CPC':>10}")
print("-" * 74)
poranuncio = defaultdict(lambda: {"g": 0.0, "i": 0, "clics": 0.0})
for r in rows:
    a = poranuncio[r["anuncio"]]
    a["g"] += r["gasto"]
    a["i"] += r["imp"]
    if r["ctr"]:
        a["clics"] += r["imp"] * r["ctr"] / 100
for ad, d in sorted(poranuncio.items(), key=lambda x: -x[1]["g"]):
    ctr = d["clics"] / d["i"] * 100 if d["i"] else 0
    cpc = d["g"] / d["clics"] if d["clics"] else 0
    print(f"{ad:<34}{money(d['g']):>11}{d['i']:>9,}{ctr:>7.2f}%{money(cpc):>10}"
          .replace(",", "."))
print("-" * 74)

print("\n" + "=" * 74)
print("4. CONCENTRACION: LAS 3 REGIONES vs EL RESTO DEL PAIS")
print("=" * 74)
TRES = {"Antioquia", "Distrito Especial", "Cundinamarca"}
g3 = sum(d["g"] for reg, d in porreg.items() if reg in TRES)
resto = TOT - g3
print(f"""
  Antioquia + Bogota + Cundinamarca ... {money(g3)}  ({g3/TOT:.2%})
  Todo el resto del pais .............. {money(resto)}  ({resto/TOT:.2%})

  Poblacion de esas 3 regiones: ~14.8 millones de 52 = 28% del pais.
  Reciben el {g3/TOT:.1%} del presupuesto.
""")
print("=" * 74)
