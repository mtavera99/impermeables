#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
LAGOS ACTUALIZADOS AL 31-AGO-2026
Refresca el analisis de donde-estan-los-lagos.py con las 94 guias del export
"Envios Completos" (24-ago a 31-ago), que es data mas reciente que la del 24-ago.

Un "lago" = conjunto de anuncios con geografia RESTRINGIDA a una region
sub-explotada, con presupuesto propio, para forzar a Meta a gastar ahi.
"""
import csv
from collections import Counter, defaultdict

# region -> poblacion aproximada (DANE, orden de magnitud)
POB = {
    "Bogota/Cundinamarca": 11_000_000,
    "Antioquia":            6_800_000,
    "Valle":                4_500_000,
    "Santanderes":          3_300_000,
    "Cauca/Narino":         3_100_000,
    "Caribe resto":         3_000_000,
    "Atlantico":            2_700_000,
    "Eje Cafetero":         2_500_000,
    "Sur (Huila/Caq/Put)":  2_400_000,
    "Bolivar":              2_200_000,
    "Llanos":               1_800_000,
    "Boyaca":               1_200_000,
    "Choco":                  550_000,
}

CIUDAD_REGION = {
    # Bogota / Cundinamarca
    "BOGOTA": "Bogota/Cundinamarca", "CHIA": "Bogota/Cundinamarca",
    "CAJICA": "Bogota/Cundinamarca", "FACATATIVA": "Bogota/Cundinamarca",
    "TOCANCIPA": "Bogota/Cundinamarca", "NEMOCON": "Bogota/Cundinamarca",
    "CHOACHI": "Bogota/Cundinamarca", "GUTIERREZ": "Bogota/Cundinamarca",
    # Antioquia
    "MEDELLIN": "Antioquia", "ITAGUI": "Antioquia", "COPACABANA": "Antioquia",
    "GUARNE": "Antioquia", "YARUMAL": "Antioquia", "CAUCASIA": "Antioquia",
    "EL BAGRE": "Antioquia", "PUERTO BERRIO": "Antioquia",
    "PUERTO TRIUNFO": "Antioquia", "SANTA ROSA DE OSOS": "Antioquia",
    "SAN PEDRO DE LOS MILAGROS": "Antioquia", "EL CARMEN DE VIBORAL": "Antioquia",
    # Valle
    "CARTAGO": "Valle", "BUENAVENTURA": "Valle",
    # Santanderes
    "GIRON": "Santanderes", "OCANA": "Santanderes", "CUCUTA": "Santanderes",
    # Cauca / Narino
    "PASTO": "Cauca/Narino", "IPIALES": "Cauca/Narino", "LA CRUZ": "Cauca/Narino",
    "CUMBAL": "Cauca/Narino", "FUNES": "Cauca/Narino", "EL TAMBO": "Cauca/Narino",
    "CORDOBA": "Cauca/Narino",
    # Caribe resto (Sucre, Cordoba)
    "MAJAGUAL": "Caribe resto", "SAN JUAN DE BETULIA": "Caribe resto",
    "CERETE": "Caribe resto", "MONTERIA": "Caribe resto",
    # Atlantico
    "SOLEDAD": "Atlantico",
    # Eje Cafetero
    "PEREIRA": "Eje Cafetero", "DOSQUEBRADAS": "Eje Cafetero",
    "MANIZALES": "Eje Cafetero", "MONTENEGRO": "Eje Cafetero",
    "RIOSUCIO": "Eje Cafetero",
    # Sur
    "NEIVA": "Sur (Huila/Caq/Put)", "PITALITO": "Sur (Huila/Caq/Put)",
    "SALADOBLANCO": "Sur (Huila/Caq/Put)", "ACEVEDO": "Sur (Huila/Caq/Put)",
    "VALLE DEL GUAMUEZ": "Sur (Huila/Caq/Put)", "PUERTO ASIS": "Sur (Huila/Caq/Put)",
    # Bolivar
    "ARJONA": "Bolivar", "CARTAGENA DE INDIAS": "Bolivar",
    "MAGANGUE": "Bolivar", "SAN ESTANISLAO": "Bolivar", "CALAMAR": "Bolivar",
    # Llanos
    "VILLAVICENCIO": "Llanos", "ACACIAS": "Llanos", "YOPAL": "Llanos",
    "TRINIDAD": "Llanos", "TAME": "Llanos", "BARRANCA DE UPIA": "Llanos",
    "SAN CARLOS DE GUAROA": "Llanos",
    # Boyaca
    "SAMACA": "Boyaca", "ARCABUCO": "Boyaca", "SUTAMARCHAN": "Boyaca",
    "CHITA": "Boyaca",
    # Choco
    "QUIBDO": "Choco",
}

COSTO_PRODUCTO = 34_000   # heredado de donde-estan-los-lagos.py
COSTO_EMPAQUE  = 1_500

def money(x):
    return f"${x:,.0f}".replace(",", ".")

rows = []
sin_mapear = set()
with open("envios-31ago.csv", encoding="utf-8") as f:
    for r in csv.DictReader(f):
        reg = CIUDAD_REGION.get(r["ciudad"])
        if reg is None:
            sin_mapear.add(r["ciudad"])
            continue
        r["region"] = reg
        r["vs"] = float(r["valor_servicio"])
        r["vc"] = float(r["valor_comercial"])
        rows.append(r)

print("=" * 78)
print("LAGOS AL 31-AGO-2026   ·   base: 94 guias del 24 al 31 de agosto")
print("=" * 78)
if sin_mapear:
    print(f"\nCiudades sin mapear: {sorted(sin_mapear)}")

# quitar la devolucion para la economia, pero contarla en volumen
POB_MAPEADA = sum(POB.values())
por_reg = defaultdict(list)
for r in rows:
    por_reg[r["region"]].append(r)

total = len(rows)
print(f"\nGuias mapeadas: {total} de 94")
print(f"Ciudades distintas: {len(set(r['ciudad'] for r in rows))}")
print(f"Regiones con venta: {len(por_reg)} de {len(POB)}")

print("\n" + "-" * 78)
print("1. SUB-EXPLOTACION: DONDE ESTA LA GENTE vs DONDE ESTAN LAS VENTAS")
print("-" * 78)
print(f"{'REGION':<22}{'GUIAS':>6}{'% VENTAS':>10}{'% POBLAC':>10}{'INDICE':>8}   ESTADO")
print("-" * 78)

filas = []
for reg, pob in POB.items():
    n = len(por_reg.get(reg, []))
    sv = n / total
    sp = pob / POB_MAPEADA
    idx = sv / sp
    filas.append((reg, n, sv, sp, idx))

for reg, n, sv, sp, idx in sorted(filas, key=lambda x: -x[4]):
    if idx > 1.3:
        estado = "sobre-representada"
    elif idx < 0.7:
        estado = "<<< SUB-EXPLOTADA"
    else:
        estado = "en su peso"
    print(f"{reg:<22}{n:>6}{sv:>9.1%}{sp:>10.1%}{idx:>8.2f}   {estado}")
print("-" * 78)

subs = [f for f in filas if f[4] < 0.7]
if subs:
    pob_sub = sum(f[3] for f in subs)
    ven_sub = sum(f[2] for f in subs)
    actual = sum(f[1] for f in subs)
    potencial = pob_sub * total
    print(f"\nRegiones sub-explotadas: {', '.join(f[0] for f in subs)}")
    print(f"  Tienen {pob_sub:.1%} de la poblacion y solo {ven_sub:.1%} de las ventas.")
    print(f"  A su peso natural serian ~{potencial:.0f} guias en vez de {actual}"
          f"  ({potencial/max(actual,1):.1f}x en esas zonas).")

print("\n" + "-" * 78)
print("2. ECONOMIA POR REGION  (solo pedidos de 1 unidad, para comparar parejo)")
print("-" * 78)
print(f"{'REGION':<22}{'n':>4}{'FLETE PROM':>13}{'RECAUDO':>11}{'MARGEN':>11}{'INDICE':>8}")
print("-" * 78)

econ = []
for reg, n, sv, sp, idx in filas:
    grupo = [r for r in por_reg.get(reg, []) if r["vc"] <= 100_000
             and r["estado"] != "Devolucion ratificada"]
    if not grupo:
        continue
    flete = sum(r["vs"] for r in grupo) / len(grupo)
    recaudo = sum(r["vc"] for r in grupo) / len(grupo)
    margen = recaudo - flete - COSTO_PRODUCTO - COSTO_EMPAQUE
    econ.append((reg, len(grupo), flete, recaudo, margen, idx))

for reg, n, flete, recaudo, margen, idx in sorted(econ, key=lambda x: x[5]):
    print(f"{reg:<22}{n:>4}{money(flete):>13}{money(recaudo):>11}"
          f"{money(margen):>11}{idx:>8.2f}")
print("-" * 78)
print(f"(margen = recaudo - flete - producto {money(COSTO_PRODUCTO)}"
      f" - empaque {money(COSTO_EMPAQUE)}, antes de pauta)")

print("\n" + "-" * 78)
print("3. CANDIDATOS A LAGO:  sub-explotado + margen sano")
print("-" * 78)
cands = [e for e in econ if e[5] < 0.8]
if not cands:
    cands = sorted(econ, key=lambda x: x[5])[:3]
for reg, n, flete, recaudo, margen, idx in sorted(cands, key=lambda x: -x[4]):
    pob = POB[reg]
    veredicto = "RECOMENDADO" if margen > 20_000 else "margen justo"
    print(f"\n  {reg}")
    print(f"     indice sub-explotacion .... {idx:.2f}")
    print(f"     poblacion ................. {pob/1e6:.1f} M  "
          f"({pob/POB_MAPEADA:.1%} del pais mapeado)")
    print(f"     guias actuales ............ {len(por_reg[reg])}")
    print(f"     flete promedio (1 und) .... {money(flete)}   (n={n})")
    print(f"     margen por pedido ......... {money(margen)}   -> {veredicto}")
    ciudades = Counter(r["ciudad"] for r in por_reg[reg])
    print(f"     ciudades vistas ........... "
          f"{', '.join(f'{c} ({k})' for c, k in ciudades.most_common())}")
    atascadas = [r for r in por_reg[reg]
                 if r["estado"] in ("EN PROCESAMIENTO", "Creado")
                 and r["fecha"] != "2026-08-31"]
    if atascadas:
        print(f"     ojo: {len(atascadas)} de {len(por_reg[reg])} guias atascadas "
              f"({', '.join(sorted(set(r['ciudad'] for r in atascadas)))})")

print("\n" + "=" * 78)
