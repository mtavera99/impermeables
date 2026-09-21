#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
BANDAS CORRECTAS, calculadas con el flete REAL de septiembre.

El bot (bot/src/fletes.js) tiene:
  · fletes de 1 ud medidos del 10-19 de AGOSTO
  · PROMO_2_TOTAL = {A:128000, B:136000, C:138000, D:139000, E:143000}
  · FLETE_2_OBSERVADO con datos de AGOSTO (Bogota $17.658)

Hoy medi que el flete de 2 uds en Bogota ya va en $26.064 (flete+seguro).
O sea que la tabla del bot esta vieja y por eso las bandas quedan cortas.

Este script recalcula, banda por banda, con las 226 guias del export del 18-sep:
  total_necesario = 2*costo_producto + envio_2uds + 2*margen_meta
"""
import csv
from collections import defaultdict

ARCH = "analisis/envios-completos-18sep.csv"
COSTO_PROD = 33000
MARGEN_META = 23244

# bandas tal como estan en bot/src/fletes.js
BANDAS = {
    "A": (73000, ["BOGOTA", "SOACHA", "ZIPAQUIRA", "CHIA", "CAJICA", "MOSQUERA",
                  "MADRID", "FUNZA", "FACATATIVA", "SIBATE", "LA CALERA"]),
    "B": (77000, ["TUNJA", "PAIPA", "AGUAZUL", "TOCANCIPA", "VILLAVICENCIO",
                  "DUITAMA", "SOGAMOSO", "YOPAL", "ACACIAS", "CUCUNUBA", "UBATE",
                  "CHOCONTA", "VILLA DE LEYVA"]),
    "C": (81000, ["MEDELLIN", "CALI", "BARRANQUILLA", "SOLEDAD", "CARTAGENA",
                  "CARTAGENA DE INDIAS", "PEREIRA", "DOSQUEBRADAS", "MANIZALES",
                  "BARRANCABERMEJA", "YARUMAL", "ARMENIA", "IBAGUE", "NEIVA",
                  "ITAGUI", "ENVIGADO", "SABANETA", "PALMIRA", "JAMUNDI", "YUMBO",
                  "COPACABANA", "BUENAVENTURA", "PUERTO BERRIO", "OCANA"]),
    "D": (83000, ["BUCARAMANGA", "MONTERIA", "POPAYAN", "SANTA MARTA", "IPIALES",
                  "FLORENCIA", "MOCOA", "BELLO", "RIONEGRO", "CERETE", "COVENAS",
                  "SAMACA", "CUCUTA", "SAN JOSE DE CUCUTA", "PASTO", "VALLEDUPAR",
                  "SINCELEJO", "QUIBDO", "RIOHACHA", "EL CERRITO"]),
}
PROMO_ACTUAL = {"A": 128000, "B": 136000, "C": 138000, "D": 139000, "E": 143000}
TOTAL_1UD = {"A": 73000, "B": 77000, "C": 81000, "D": 83000, "E": 85000}


def banda_de(ciudad):
    c = ciudad.strip().upper()
    for b, (_, ciudades) in BANDAS.items():
        if c in ciudades:
            return b
    return "E"


filas = []
with open(ARCH, encoding="utf-8") as fh:
    for r in csv.DictReader(fh):
        try:
            rec = float(r["recaudo"])
            fl = float(r["flete"])
            sg = float(r["seguro"])
        except ValueError:
            continue
        if abs(fl - sg) < 1.0:       # devolucion liquidada: flete no sirve
            continue
        filas.append({"banda": banda_de(r["ciudad"]), "ciudad": r["ciudad"],
                      "recaudo": rec, "envio": fl + sg,
                      "uds": 1 if rec <= 100000 else 2})

print("=" * 76)
print("BANDAS RECALCULADAS CON FLETE DE SEPTIEMBRE (226 guias del export 18-sep)")
print("=" * 76)
print()

# ---------- 1 unidad ----------
print("### 1 UNIDAD — ¿la banda cubre el margen?")
print()
print(f"{'banda':<7}{'n':>4}{'envio real':>12}{'cobra':>10}{'margen/ud':>11}"
      f"{'vs meta':>10}{'deberia':>10}")
print("-" * 64)
for b in "ABCDE":
    xs = [x for x in filas if x["banda"] == b and x["uds"] == 1]
    if not xs:
        continue
    env = sum(x["envio"] for x in xs) / len(xs)
    cobra = TOTAL_1UD[b]
    m = cobra - COSTO_PROD - env
    nec = COSTO_PROD + env + MARGEN_META
    flag = "" if m >= MARGEN_META else " 🔴"
    print(f"{b:<7}{len(xs):>4}{env:>12,.0f}{cobra:>10,.0f}{m:>11,.0f}"
          f"{m-MARGEN_META:>+10,.0f}{round(nec/1000)*1000:>10,.0f}{flag}")
print()

# ---------- 2 unidades ----------
print("### 2 UNIDADES — acá está la fuga grande")
print()
print(f"{'banda':<7}{'n':>4}{'envio real':>12}{'cobra hoy':>11}{'margen/ud':>11}"
      f"{'vs meta':>10}{'DEBERIA':>10}")
print("-" * 65)
nuevas = {}
for b in "ABCDE":
    xs = [x for x in filas if x["banda"] == b and x["uds"] == 2]
    if not xs:
        print(f"{b:<7}{0:>4}{'sin dato':>12}{PROMO_ACTUAL[b]:>11,.0f}")
        continue
    env = sum(x["envio"] for x in xs) / len(xs)
    cobra = PROMO_ACTUAL[b]
    m = (cobra - 2*COSTO_PROD - env) / 2
    nec = 2*COSTO_PROD + env + 2*MARGEN_META
    nuevas[b] = int(round(nec/1000)*1000)
    flag = "" if m >= MARGEN_META else " 🔴"
    print(f"{b:<7}{len(xs):>4}{env:>12,.0f}{cobra:>11,.0f}{m:>11,.0f}"
          f"{m-MARGEN_META:>+10,.0f}{nuevas[b]:>10,.0f}{flag}")
print()

# ---------- el salto de flete de agosto a septiembre ----------
print("### Por qué las bandas quedaron cortas: el flete de 2 uds subió")
print()
AGOSTO_2UD = {"BOGOTA": 17658, "MEDELLIN": 27891, "PEREIRA": 27608,
              "MANIZALES": 26915, "VILLAVICENCIO": 25445}
print(f"{'ciudad':<20}{'ago (bot)':>11}{'sep (real)':>12}{'cambio':>10}")
print("-" * 53)
for ciu, ago in AGOSTO_2UD.items():
    xs = [x for x in filas if x["ciudad"].strip().upper() == ciu and x["uds"] == 2]
    if not xs:
        continue
    sep = sum(x["envio"] for x in xs) / len(xs)
    print(f"{ciu:<20}{ago:>11,.0f}{sep:>12,.0f}{(sep-ago)/ago*100:>+9.0f}%")
print()
print("  El bot cotiza con flete de agosto. El flete de septiembre es mayor.")
print("  Esa diferencia sale del margen, no del cliente.")
print()

# ---------- el bloque para pegar ----------
print("### El reemplazo para bot/src/fletes.js")
print()
print("const PROMO_2_TOTAL = { ", end="")
print(", ".join(f"{b}: {nuevas.get(b, PROMO_ACTUAL[b])}" for b in "ABCDE"), end="")
print(" };")
print()
print("  Hoy:     ", ", ".join(f"{b}: {PROMO_ACTUAL[b]:,}" for b in "ABCDE"))
print("  Debería: ", ", ".join(f"{b}: {nuevas.get(b, PROMO_ACTUAL[b]):,}" for b in "ABCDE"))
print()
subidas = [(b, nuevas[b] - PROMO_ACTUAL[b]) for b in nuevas]
for b, d in subidas:
    print(f"    banda {b}: {d:+,} ({PROMO_ACTUAL[b]:,} -> {nuevas[b]:,})")
print()

# ---------- cuanto vale el arreglo ----------
print("### Cuánto vale arreglarlo")
print()
dos = [x for x in filas if x["uds"] == 2]
falta = 0
for x in dos:
    b = x["banda"]
    nec = 2*COSTO_PROD + x["envio"] + 2*MARGEN_META
    falta += max(0, nec - PROMO_ACTUAL[b])
print(f"  {len(dos)} pedidos de 2 uds en el export (2-18 sep)")
print(f"  margen que se dejó de cobrar: ${falta:,.0f}")
print(f"  por pedido de 2 uds: ${falta/len(dos):,.0f}")
share = len(dos) / len(filas)
print()
print(f"  Los de 2 uds son {share*100:.0f}% de los pedidos.")
print(f"  A 11 pedidos/día, son {11*share:.1f} pedidos de 2 uds/día")
print(f"  -> ${falta/len(dos)*11*share:,.0f}/día = "
      f"${falta/len(dos)*11*share*30:,.0f}/mes")
