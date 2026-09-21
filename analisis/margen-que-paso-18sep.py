#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
El CPA quedo plano (+3,5%) pero el margen por unidad cayo 42%.
Si no fue la pauta, ¿que fue? Aca se descompone peso por peso.

Sospechosos:
  a) mezcla de destinos: mas pueblos caros
  b) mezcla de 1 vs 2 unidades (el de 2 paga 1,46x de flete, no 2x)
  c) outliers puntuales (San Andres paga flete de avion)
  d) el tarifario nuevo no cubre los destinos caros
"""
import csv
from collections import defaultdict

ARCH = "analisis/envios-completos-18sep.csv"
COSTO_PROD_UD = 33000

SEM_A = {"2026-09-07", "2026-09-08", "2026-09-09", "2026-09-10", "2026-09-11"}
SEM_B = {"2026-09-14", "2026-09-15", "2026-09-16", "2026-09-17", "2026-09-18"}

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
        sem = "A" if r["fecha"] in SEM_A else ("B" if r["fecha"] in SEM_B else None)
        if not sem:
            continue
        ciu = r["ciudad"].strip().upper()
        filas.append({
            "sem": sem, "ciudad": ciu, "recaudo": rec,
            "envio": float(r["flete"]) + float(r["seguro"]),
            "uds": 1 if rec <= 100000 else 2,
            "zona": "nucleo" if ciu in NUCLEO else "region",
        })

A = [x for x in filas if x["sem"] == "A"]
B = [x for x in filas if x["sem"] == "B"]

print("=" * 72)
print("¿POR QUE CAYO EL MARGEN SI EL CPA QUEDO PLANO?")
print("=" * 72)
print()

# ---------- 1. nucleo vs region ----------
print("### 1. La mezcla: ¿a donde estamos vendiendo?")
print()
print(f"{'':<12}{'pedidos A':>11}{'%':>6}{'pedidos B':>11}{'%':>6}")
print("-" * 46)
for z in ("nucleo", "region"):
    a = [x for x in A if x["zona"] == z]
    b = [x for x in B if x["zona"] == z]
    print(f"{z:<12}{len(a):>11}{len(a)/len(A)*100:>5.0f}%"
          f"{len(b):>11}{len(b)/len(B)*100:>5.0f}%")
print()
print(f"{'':<12}{'envio A':>11}{'envio B':>11}")
print("-" * 34)
for z in ("nucleo", "region"):
    a = [x for x in A if x["zona"] == z]
    b = [x for x in B if x["zona"] == z]
    ea = sum(x["envio"] for x in a)/len(a) if a else 0
    eb = sum(x["envio"] for x in b)/len(b) if b else 0
    print(f"{z:<12}{ea:>11,.0f}{eb:>11,.0f}")
print()

# ---------- 2. descomposicion del alza del flete ----------
print("### 2. El alza del envio, separada en mezcla y precio")
print()
env_a = sum(x["envio"] for x in A)/len(A)
env_b = sum(x["envio"] for x in B)/len(B)
print(f"  envio por pedido: ${env_a:,.0f} -> ${env_b:,.0f}  "
      f"({(env_b-env_a)/env_a*100:+.0f}%)")
print()
# efecto mezcla: mismo envio por zona que A, con los pesos de B
pa = {z: sum(x["envio"] for x in A if x["zona"] == z) /
         max(1, len([x for x in A if x["zona"] == z])) for z in ("nucleo", "region")}
wb = {z: len([x for x in B if x["zona"] == z])/len(B) for z in ("nucleo", "region")}
wa = {z: len([x for x in A if x["zona"] == z])/len(A) for z in ("nucleo", "region")}
mezcla = sum(pa[z]*wb[z] for z in pa) - sum(pa[z]*wa[z] for z in pa)
print(f"  por MEZCLA de zona (mas region) ....... ${mezcla:+,.0f}")
print(f"  por PRECIO/destino dentro de zona ..... ${env_b-env_a-mezcla:+,.0f}")
print()

# ---------- 3. outliers ----------
print("### 3. Los envios que se salen de la curva en la semana B")
print()
print(f"{'ciudad':<26}{'recaudo':>10}{'envio':>10}{'% del pedido':>13}")
print("-" * 59)
for x in sorted(B, key=lambda z: -z["envio"])[:10]:
    print(f"{x['ciudad'][:25]:<26}{x['recaudo']:>10,.0f}{x['envio']:>10,.0f}"
          f"{x['envio']/x['recaudo']*100:>12.0f}%")
print()
top = sorted(B, key=lambda z: -z["envio"])[0]
sin_top = [x for x in B if x is not top]
env_sin = sum(x["envio"] for x in sin_top)/len(sin_top)
print(f"  Sacando solo a {top['ciudad']}: envio por pedido ${env_sin:,.0f} "
      f"(en vez de ${env_b:,.0f})")
print(f"  -> {top['ciudad']} sola explica ${env_b-env_sin:,.0f} del alza "
      f"de ${env_b-env_a:,.0f}  ({(env_b-env_sin)/(env_b-env_a)*100:.0f}%)")
print()

# ---------- 4. margen con y sin el outlier ----------
print("### 4. Margen por unidad (sin pauta), con y sin outliers")
print()


def margen(xs):
    uds = sum(x["uds"] for x in xs)
    return (sum(x["recaudo"] for x in xs) - COSTO_PROD_UD*uds
            - sum(x["envio"] for x in xs)) / uds


print(f"  SEMANA A completa ............... ${margen(A):,.0f}/ud")
print(f"  SEMANA B completa ............... ${margen(B):,.0f}/ud")
print(f"  SEMANA B sin {top['ciudad']:<18} ${margen(sin_top):,.0f}/ud")
caros = [x for x in B if x["envio"]/x["recaudo"] > 0.35]
print(f"  SEMANA B sin los {len(caros)} con envio >35% .. "
      f"${margen([x for x in B if x not in caros]):,.0f}/ud")
print()

# ---------- 5. cuanto vale la regla del guion ----------
print("### 5. Lo que costaria/ahorraria una regla de tope")
print()
print("  Regla: si el envio pasa de 30% del recaudo, se cotiza aparte o se")
print("  pide pago anticipado (ya es la regla del guion para destinos raros).")
print()
malos = [x for x in B if x["envio"]/x["recaudo"] > 0.30]
print(f"  Pedidos que la violan en la semana B: {len(malos)} de {len(B)}")
for x in sorted(malos, key=lambda z: -z["envio"]/z["recaudo"]):
    m = x["recaudo"] - COSTO_PROD_UD*x["uds"] - x["envio"]
    print(f"    {x['ciudad'][:24]:<26}recaudo ${x['recaudo']:>7,.0f}  "
          f"envio ${x['envio']:>7,.0f}  margen ${m:>8,.0f}")
print()
perdida = sum(x["recaudo"] - COSTO_PROD_UD*x["uds"] - x["envio"] for x in malos)
print(f"  Margen bruto que dejan esos {len(malos)}: ${perdida:,.0f}")
print(f"  (antes de pauta; a ${1052221/93:,.0f}/ud de pauta, "
      f"{sum(x['uds'] for x in malos)} uds cuestan "
      f"${1052221/93*sum(x['uds'] for x in malos):,.0f})")
neto = perdida - 1052221/93*sum(x["uds"] for x in malos)
print(f"  -> neto de esos pedidos: ${neto:,.0f}")
