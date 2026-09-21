#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
El hueco que casi se me pasa con Expancion.

Expancion consigue conversaciones BARATAS ($656/conv hoy, el mejor de la cuenta).
Pero vende en Huila, N.Santander, Quindio, Risaralda, Santander, Tolima, Valle,
Caldas — y alla el FLETE no es el de Bogota.

El margen de $23.244/ud que usamos en toda la cuenta sale de un flete PROMEDIO.
Si el flete regional es el doble, un $/conv barato puede estar dejando menos
plata que un $/conv caro de Bogota. Esto lo mide con flete REAL del export.
"""
import csv
from collections import defaultdict

ARCH = "analisis/transportadoras-12sep.csv"

# Nucleo urbano: donde pautan Domiciliarios / VIDEO / TEST Creativos
NUCLEO = {"BOGOTA", "BOGOTA D.C.", "BOGOTA DC", "SOACHA", "MEDELLIN", "BELLO",
          "ITAGUI", "ENVIGADO", "SABANETA", "LA ESTRELLA", "COPACABANA",
          "CALDAS", "GIRARDOTA", "BARBOSA"}

PRECIO_VENTA_UD = 56244   # margen 23.244 + producto 33.000
COSTO_PROD_UD = 33000
DEVOL = 0.19
COSTO_DEVOL = 33648


def norm(c):
    return (c or "").strip().upper()


filas = []
with open(ARCH, encoding="utf-8") as f:
    for r in csv.DictReader(f):
        try:
            flete = float(r["flete"] or 0)
            seg = float(r["seguro"] or 0)
            rec = float(r["recaudo"] or 0)
        except ValueError:
            continue
        if rec <= 0:
            continue
        filas.append({
            "ciudad": norm(r["ciudad"]),
            "recaudo": rec,
            "envio": flete + seg,
            "transp": r["transportadora"],
            "estado": r["estado"],
        })

print("=" * 76)
print("FLETE REAL: nucleo urbano vs region  (base: %d guias con recaudo)" % len(filas))
print("=" * 76)
print()

grupos = defaultdict(list)
for x in filas:
    grupos["NUCLEO" if x["ciudad"] in NUCLEO else "REGION"].append(x)

print(f"{'grupo':<10}{'guias':>7}{'recaudo prom':>14}{'envio prom':>12}{'envio %':>9}")
print("-" * 52)
res = {}
for g in ("NUCLEO", "REGION"):
    xs = grupos[g]
    if not xs:
        continue
    rec = sum(x["recaudo"] for x in xs) / len(xs)
    env = sum(x["envio"] for x in xs) / len(xs)
    res[g] = (len(xs), rec, env)
    print(f"{g:<10}{len(xs):>7}{rec:>14,.0f}{env:>12,.0f}{env/rec*100:>8.1f}%")
print()

if "NUCLEO" in res and "REGION" in res:
    dif = res["REGION"][2] - res["NUCLEO"][2]
    print(f"El envio a region cuesta ${dif:,.0f} MAS por pedido "
          f"({res['REGION'][2]/res['NUCLEO'][2]:.2f}x el del nucleo)")
    print()

# --- margen real por unidad, por grupo ---
print("### Margen real por unidad (recaudo - producto - envio, sin pauta)")
print()
print(f"{'grupo':<10}{'uds est':>9}{'margen/ud':>12}{'vs 23.244':>11}")
print("-" * 43)
for g in ("NUCLEO", "REGION"):
    xs = grupos[g]
    if not xs:
        continue
    # unidades estimadas por recaudo: banda de 1 ud ~<=100k, 2 uds >100k
    tot_uds = tot_marg = 0
    for x in xs:
        uds = 1 if x["recaudo"] <= 100000 else 2
        tot_uds += uds
        tot_marg += x["recaudo"] - COSTO_PROD_UD * uds - x["envio"]
    m = tot_marg / tot_uds
    print(f"{g:<10}{tot_uds:>9}{m:>12,.0f}{m-23244:>+11,.0f}")
print()

# --- con devoluciones ---
# --- devolucion REAL por grupo, solo casos cerrados ---
ENTREGADA = {"ENTREGADA"}
DEVUELTA = {"DEVOLUCION RATIFICADA", "ENTREGADO A REMITENTE", "DEVOLUCION REGIONAL",
            "NO SE ENTREGA NO CANCELA RECAUDO", "DESTINATARIO NO CANCELA RECAUDO"}

print("### Devolucion REAL por grupo (solo guias ya cerradas)")
print()
print(f"{'grupo':<10}{'cerradas':>10}{'entreg':>8}{'devuel':>8}{'% devol':>9}")
print("-" * 45)
tasas = {}
for g in ("NUCLEO", "REGION"):
    ent = sum(1 for x in grupos[g] if x["estado"].strip().upper() in ENTREGADA)
    dev = sum(1 for x in grupos[g] if x["estado"].strip().upper() in DEVUELTA)
    cerr = ent + dev
    t = dev / cerr if cerr else 0
    tasas[g] = t
    print(f"{g:<10}{cerr:>10}{ent:>8}{dev:>8}{t*100:>8.1f}%")
print()


def margen_bruto(g):
    xs = grupos[g]
    tot_uds = tot_marg = 0
    for x in xs:
        uds = 1 if x["recaudo"] <= 100000 else 2
        tot_uds += uds
        tot_marg += x["recaudo"] - COSTO_PROD_UD * uds - x["envio"]
    return tot_marg / tot_uds


print("### Margen neto por unidad, con la devolucion real de cada grupo")
print()
print(f"{'grupo':<10}{'bruto/ud':>11}{'% devol':>9}{'neto/ud':>11}{'$/conv equil':>14}")
print("-" * 55)
for g in ("NUCLEO", "REGION"):
    b = margen_bruto(g)
    t = tasas[g]
    neto = b * (1 - t) - COSTO_DEVOL * t / 1.3
    print(f"{g:<10}{b:>11,.0f}{t*100:>8.1f}%{neto:>11,.0f}"
          f"{neto*1.3*0.084:>14,.0f}")
print()

# --- las ciudades mas caras ---
print("### Las 12 ciudades donde el envio se come el pedido")
print()
porciudad = defaultdict(list)
for x in filas:
    porciudad[x["ciudad"]].append(x)
peores = []
for c, xs in porciudad.items():
    env = sum(x["envio"] for x in xs) / len(xs)
    rec = sum(x["recaudo"] for x in xs) / len(xs)
    peores.append((c, len(xs), rec, env, env / rec))
print(f"{'ciudad':<22}{'n':>3}{'recaudo':>10}{'envio':>9}{'% del pedido':>13}")
print("-" * 57)
for c, n, rec, env, pct in sorted(peores, key=lambda x: -x[4])[:12]:
    print(f"{c[:21]:<22}{n:>3}{rec:>10,.0f}{env:>9,.0f}{pct*100:>12.1f}%")
