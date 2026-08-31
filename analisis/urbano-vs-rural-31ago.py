#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
¿HACIA DONDE ESTA EMPUJANDO META?  -  31-ago-2026

Usa la banda de recaudo como proxy objetivo de lejania: el tarifario propio del
negocio cobra mas caro a destinos mas remotos, asi que la banda ES la
clasificacion de remotidad hecha por el propio negocio.

Objetivo: distinguir si Valle esta sub-representado porque Meta NO GASTA ahi,
o porque Valle no compra.
"""
import csv
from collections import Counter, defaultdict

def money(x):
    return f"${x:,.0f}".replace(",", ".")

BANDAS = [
    (73_000, 73_000, "A. Bogota y sabana"),
    (76_000, 78_000, "B. Cercania"),
    (80_000, 83_000, "C. Ciudad intermedia"),
    (85_000, 85_000, "D. Remoto"),
]

def banda(vc):
    for lo, hi, nombre in BANDAS:
        if lo <= vc <= hi:
            return nombre
    return None

rows = []
with open("envios-31ago.csv", encoding="utf-8") as f:
    for r in csv.DictReader(f):
        r["vs"] = float(r["valor_servicio"])
        r["vc"] = float(r["valor_comercial"])
        rows.append(r)

unid = [r for r in rows if r["vc"] <= 100_000 and r["estado"] != "Devolucion ratificada"]

print("=" * 76)
print("1. MEZCLA DE PEDIDOS POR BANDA DE LEJANIA  (solo 1 unidad, n=%d)" % len(unid))
print("=" * 76)
print(f"{'BANDA':<24}{'GUIAS':>7}{'%':>8}{'FLETE PROM':>13}{'MARGEN':>11}")
print("-" * 76)

tot = 0
for lo, hi, nombre in BANDAS:
    g = [r for r in unid if banda(r["vc"]) == nombre]
    if not g:
        continue
    tot += len(g)
    fl = sum(r["vs"] for r in g) / len(g)
    rec = sum(r["vc"] for r in g) / len(g)
    mg = rec - fl - 34_000 - 1_500
    print(f"{nombre:<24}{len(g):>7}{len(g)/len(unid):>7.1%}"
          f"{money(fl):>13}{money(mg):>11}")
print("-" * 76)
otros = [r for r in unid if banda(r["vc"]) is None]
if otros:
    print(f"{'(fuera de banda)':<24}{len(otros):>7}")
    for r in otros:
        print(f"      {r['ciudad']}  recaudo {money(r['vc'])}  flete {money(r['vs'])}")

remoto = [r for r in unid if banda(r["vc"]) == "D. Remoto"]
bogota = [r for r in unid if banda(r["vc"]) == "A. Bogota y sabana"]
print(f"\n  Banda D (remoto) ........ {len(remoto)/len(unid):.1%} de los pedidos")
print(f"  Banda A (Bogota) ........ {len(bogota)/len(unid):.1%} de los pedidos")

print("\n" + "=" * 76)
print("2. LAS 5 CIUDADES MAS GRANDES DEL PAIS: CUANTO VENDES EN CADA UNA")
print("=" * 76)
GRANDES = {
    "BOGOTA":       ("Bogota",       7_900_000),
    "MEDELLIN":     ("Medellin",     2_600_000),
    "CALI":         ("Cali",         2_200_000),
    "BARRANQUILLA": ("Barranquilla", 1_300_000),
    "CARTAGENA DE INDIAS": ("Cartagena", 1_000_000),
}
# metros: sumar municipios del area
METRO = {
    "Bogota": ["BOGOTA", "CHIA", "CAJICA", "FACATATIVA", "TOCANCIPA", "NEMOCON",
               "CHOACHI", "GUTIERREZ"],
    "Medellin": ["MEDELLIN", "ITAGUI", "COPACABANA", "GUARNE"],
    "Cali": ["CALI", "YUMBO", "JAMUNDI", "PALMIRA"],
    "Barranquilla": ["BARRANQUILLA", "SOLEDAD"],
    "Cartagena": ["CARTAGENA DE INDIAS", "ARJONA"],
}
cc = Counter(r["ciudad"] for r in rows)
print(f"{'CIUDAD (nucleo)':<16}{'POBLAC':>10}{'GUIAS nucleo':>14}{'GUIAS metro':>13}")
print("-" * 76)
for k, (nombre, pob) in GRANDES.items():
    nucleo = cc.get(k, 0)
    metro = sum(cc.get(c, 0) for c in METRO[nombre])
    print(f"{nombre:<16}{pob/1e6:>9.1f}M{nucleo:>14}{metro:>13}")
print("-" * 76)
print("""
  Lectura: Cali y Barranquilla son la 3a y 4a ciudad del pais y entre las dos
  suman 3.5 millones de habitantes. Mira cuantas guias tienen.""")

print("\n" + "=" * 76)
print("3. LO QUE ESTOS DATOS SI PRUEBAN Y LO QUE NO")
print("=" * 76)
print("""
  SI PRUEBAN:
    - La mezcla esta cargada a destinos remotos (banda D), que es donde el CPM
      es barato porque hay menos anunciantes compitiendo.
    - Las ciudades grandes (Cali, Barranquilla) estan practicamente ausentes.

  NO PRUEBAN:
    - NO prueban que en Valle se venda bien. Solo prueban que Meta no ha
      llevado la pauta alli.
    - El indice de sub-explotacion mide AUSENCIA DE GASTO, no PRESENCIA DE
      DEMANDA. Son dos cosas distintas y estos datos no las separan.

  LO QUE FALTA (y se consigue en 2 minutos):
    - Desglose de la campana por region en el Administrador de anuncios.
      Si Meta gasto en Valle y saco conversaciones caras -> la region es mala
      y NO se abre el lago.
      Si Meta casi no gasto en Valle -> la hipotesis se confirma y se abre.
""")
print("=" * 76)
