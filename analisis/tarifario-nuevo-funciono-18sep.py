#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
¿FUNCIONO EL TARIFARIO NUEVO DE 2 UNIDADES?

Contexto: el 16-sep se corrigieron las bandas de 2 uds (128->134 / 136->140 /
138->144 / 139->145 / 143->148 mil) porque se midio que 0 de 39 pedidos de
2 unidades alcanzaba el margen de $23.244/ud. El dueno lo pego al bot ese dia.

Prueba: los pedidos de 2 uds despachados del 16 al 18 de sep ya salieron con
el tarifario nuevo. Los del 14-15 y los de la semana A, con el viejo.

La pregunta no es "¿subio el precio?" sino "¿alcanza el margen AHORA?"
"""
import csv
from collections import defaultdict

ARCH = "analisis/envios-completos-18sep.csv"
COSTO_PROD_UD = 33000
MARGEN_META = 23244

NUCLEO = {"BOGOTA", "SOACHA", "MEDELLIN", "BELLO", "ITAGUI", "ENVIGADO",
          "SABANETA", "LA ESTRELLA", "COPACABANA", "GIRARDOTA", "CHIA",
          "ZIPAQUIRA", "MADRID", "TOCANCIPA", "MOSQUERA", "FUNZA"}

filas = []
with open(ARCH, encoding="utf-8") as fh:
    for r in csv.DictReader(fh):
        try:
            rec = float(r["recaudo"])
        except ValueError:
            continue
        ciu = r["ciudad"].strip().upper()
        uds = 1 if rec <= 100000 else 2
        env = float(r["flete"]) + float(r["seguro"])
        # una devolucion liquidada ya no muestra el flete de ida: no sirve
        # para medir costo de envio. Se excluye del analisis de margen.
        liq = abs(float(r["flete"]) - float(r["seguro"])) < 1.0
        filas.append({
            "fecha": r["fecha"], "ciudad": ciu, "recaudo": rec, "uds": uds,
            "envio": env, "liquidada": liq,
            "zona": "nucleo" if ciu in NUCLEO else "region",
            "margen_ud": (rec - COSTO_PROD_UD*uds - env)/uds,
        })

vivos = [x for x in filas if not x["liquidada"]]

print("=" * 74)
print("¿FUNCIONO EL TARIFARIO NUEVO DE 2 UNIDADES?")
print("=" * 74)
print()
print(f"  ({len(filas)-len(vivos)} devoluciones liquidadas excluidas: su flete")
print("   ya fue reemplazado por la prima del seguro, no sirve de costo de envio)")
print()

# ---------- 1. las bandas que estan saliendo ----------
print("### 1. ¿Que precios esta cobrando el bot? (pedidos de 2 uds)")
print()
dos = [x for x in vivos if x["uds"] == 2]
por_precio = defaultdict(list)
for x in dos:
    por_precio[int(x["recaudo"])].append(x)
print(f"{'recaudo':>10}{'n':>4}{'primera':>12}{'ultima':>12}{'banda':>10}")
print("-" * 48)
VIEJAS = {128000, 136000, 138000, 139000, 143000}
NUEVAS = {134000, 140000, 144000, 145000, 148000}
for p in sorted(por_precio):
    xs = por_precio[p]
    fs = sorted(x["fecha"] for x in xs)
    et = "NUEVA" if p in NUEVAS else ("vieja" if p in VIEJAS else "otra")
    print(f"{p:>10,}{len(xs):>4}{fs[0][5:]:>12}{fs[-1][5:]:>12}{et:>10}")
print()
nuevas_n = sum(len(por_precio[p]) for p in por_precio if p in NUEVAS)
viejas_n = sum(len(por_precio[p]) for p in por_precio if p in VIEJAS)
print(f"  con banda NUEVA: {nuevas_n}   ·   con banda vieja: {viejas_n}")
print()

# ---------- 2. margen por unidad: 1 ud vs 2 uds ----------
print("### 2. Margen por unidad, 1 ud vs 2 uds (sin pauta)")
print()
print(f"{'grupo':<22}{'n':>4}{'recaudo/ud':>12}{'envio/ud':>10}"
      f"{'margen/ud':>11}{'vs meta':>10}")
print("-" * 69)
for nom, xs in (("1 unidad", [x for x in vivos if x["uds"] == 1]),
                ("2 unidades", dos)):
    if not xs:
        continue
    uds = sum(x["uds"] for x in xs)
    rec = sum(x["recaudo"] for x in xs)/uds
    env = sum(x["envio"] for x in xs)/uds
    m = (sum(x["recaudo"] for x in xs) - COSTO_PROD_UD*uds
         - sum(x["envio"] for x in xs))/uds
    print(f"{nom:<22}{len(xs):>4}{rec:>12,.0f}{env:>10,.0f}{m:>11,.0f}"
          f"{m-MARGEN_META:>+10,.0f}")
print()

# ---------- 3. 2 uds ANTES vs DESPUES del tarifario nuevo ----------
print("### 3. Los pedidos de 2 uds: banda vieja vs banda nueva")
print()
gv = [x for x in dos if int(x["recaudo"]) in VIEJAS]
gn = [x for x in dos if int(x["recaudo"]) in NUEVAS]
print(f"{'':<16}{'n':>4}{'recaudo/ud':>12}{'envio/ud':>10}{'margen/ud':>11}{'vs meta':>10}")
print("-" * 63)
for nom, xs in (("banda vieja", gv), ("banda NUEVA", gn)):
    if not xs:
        continue
    uds = sum(x["uds"] for x in xs)
    rec = sum(x["recaudo"] for x in xs)/uds
    env = sum(x["envio"] for x in xs)/uds
    m = (sum(x["recaudo"] for x in xs) - COSTO_PROD_UD*uds
         - sum(x["envio"] for x in xs))/uds
    print(f"{nom:<16}{len(xs):>4}{rec:>12,.0f}{env:>10,.0f}{m:>11,.0f}"
          f"{m-MARGEN_META:>+10,.0f}")
print()
if gv and gn:
    mv = (sum(x["recaudo"] for x in gv) - COSTO_PROD_UD*sum(x["uds"] for x in gv)
          - sum(x["envio"] for x in gv))/sum(x["uds"] for x in gv)
    mn = (sum(x["recaudo"] for x in gn) - COSTO_PROD_UD*sum(x["uds"] for x in gn)
          - sum(x["envio"] for x in gn))/sum(x["uds"] for x in gn)
    print(f"  Mejora del tarifario nuevo: ${mn-mv:+,.0f}/ud")
print()

# ---------- 4. cuantos alcanzan la meta ----------
print("### 4. ¿Cuantos pedidos de 2 uds alcanzan los $23.244/ud?")
print()
print(f"{'':<16}{'n':>4}{'alcanzan':>10}{'%':>7}")
print("-" * 37)
for nom, xs in (("banda vieja", gv), ("banda NUEVA", gn)):
    if not xs:
        continue
    ok = sum(1 for x in xs if x["margen_ud"] >= MARGEN_META)
    print(f"{nom:<16}{len(xs):>4}{ok:>10}{ok/len(xs)*100:>6.0f}%")
print()
print("  🔑 Antes del arreglo, la medicion del 16-sep dio 0 de 39 (0%).")
print()

# ---------- 5. los que siguen sin alcanzar ----------
print("### 5. Los de banda NUEVA que todavia NO alcanzan")
print()
malos = [x for x in gn if x["margen_ud"] < MARGEN_META]
if malos:
    print(f"{'fecha':<12}{'ciudad':<26}{'recaudo':>9}{'envio':>9}{'margen/ud':>11}")
    print("-" * 67)
    for x in sorted(malos, key=lambda z: z["margen_ud"]):
        print(f"{x['fecha'][5:]:<12}{x['ciudad'][:25]:<26}{x['recaudo']:>9,.0f}"
              f"{x['envio']:>9,.0f}{x['margen_ud']:>11,.0f}")
    print()
    falta = sum((MARGEN_META - x["margen_ud"])*x["uds"] for x in malos)
    print(f"  Les falta ${falta:,.0f} en total para llegar a la meta")
    print(f"  = ${falta/len(malos):,.0f} por pedido de subida de precio")
else:
    print("  Ninguno: todos los de banda nueva alcanzan la meta")
print()

# ---------- 6. 1 unidad: ¿hay fuga ahi tambien? ----------
print("### 6. Y los de 1 unidad, ¿estan bien?")
print()
una = [x for x in vivos if x["uds"] == 1]
por_p1 = defaultdict(list)
for x in una:
    por_p1[int(x["recaudo"])].append(x)
print(f"{'recaudo':>10}{'n':>4}{'envio prom':>12}{'margen/ud':>11}{'vs meta':>10}")
print("-" * 47)
for p in sorted(por_p1):
    xs = por_p1[p]
    env = sum(x["envio"] for x in xs)/len(xs)
    m = p - COSTO_PROD_UD - env
    flag = "" if m >= MARGEN_META else "  <-- fuga"
    print(f"{p:>10,}{len(xs):>4}{env:>12,.0f}{m:>11,.0f}{m-MARGEN_META:>+10,.0f}{flag}")
print()
fuga1 = [x for x in una if x["margen_ud"] < MARGEN_META]
print(f"  {len(fuga1)} de {len(una)} pedidos de 1 ud por debajo de la meta "
      f"({len(fuga1)/len(una)*100:.0f}%)")
print(f"  Les falta ${sum(MARGEN_META - x['margen_ud'] for x in fuga1):,.0f} en total")
