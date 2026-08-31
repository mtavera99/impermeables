#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ESTRES DEL RESULTADO: ¿aguanta Valle si le quito los supuestos favorables?

Valle gana en mejor-lago-consolidado.py con dos numeros fragiles:
  - tasa de entrega 100% sobre solo 5 casos resueltos
  - mezcla de combos superior al promedio (27% vs promedio general)

Aca se recalcula Valle con supuestos pesimistas y se compara contra el
segundo candidato con supuestos optimistas. Si Valle sigue ganando, la
decision es robusta.
"""
import csv, unicodedata
from collections import Counter, defaultdict

COSTO_UNIDAD, COSTO_EMPAQUE, CIERRE = 34_000, 1_500, 0.088

def money(x): return f"${x:,.0f}".replace(",", ".")

exec(open("mejor-lago-consolidado.py").read().split("# --------------------------------------------------------------- reporte")[0])

POB_TOT = sum(POB.values())
por_reg = defaultdict(list)
for g in guias: por_reg[g["region"]].append(g)
TOT = len(guias)

gex = sum(1 for g in guias if g["desenlace"] == "exito")
gfa = sum(1 for g in guias if g["desenlace"] == "falla")
TASA_GLOBAL = gex / (gex + gfa)
UDS_GLOBAL = sum(g["uds"] for g in guias) / TOT

print("=" * 78)
print("ESTRES DE LA DECISION DE LAGO")
print("=" * 78)
print(f"\nReferencias globales:")
print(f"   tasa de entrega global .... {TASA_GLOBAL:.1%}  ({gex+gfa} resueltas)")
print(f"   unidades por pedido ....... {UDS_GLOBAL:.3f}")

def escenario(reg, tasa, uds, etiqueta):
    gs = por_reg[reg]
    fl = sum(g["flete"] for g in gs) / len(gs)
    rc = sum(g["recaudo"] for g in gs) / len(gs)
    margen = rc - fl - COSTO_UNIDAD * uds - COSTO_EMPAQUE
    m_esp = tasa * margen - (1 - tasa) * fl
    be = m_esp * CIERRE
    print(f"   {etiqueta:<34}{money(margen):>10}{tasa:>7.0%}"
          f"{money(m_esp):>11}{money(be):>11}")
    return m_esp, be

print("\n" + "-" * 78)
print(f"{'ESCENARIO':<37}{'MARGEN':>10}{'TASA':>7}{'M.ESPER':>11}{'EQUIL/conv':>11}")
print("-" * 78)

print("\nVALLE  (n=15)")
uds_valle = sum(g["uds"] for g in por_reg["Valle"]) / len(por_reg["Valle"])
v_base = escenario("Valle", 1.00, uds_valle, "base: entrega 100%, combos reales")
v_glob = escenario("Valle", TASA_GLOBAL, uds_valle, "entrega = global 87.6%")
v_mix  = escenario("Valle", TASA_GLOBAL, UDS_GLOBAL, "entrega global + combos promedio")
v_pes  = escenario("Valle", 0.75, UDS_GLOBAL, "PESIMISTA: entrega 75% + sin combos")

print("\nSANTANDERES  (n=13)  - segundo candidato")
uds_sant = sum(g["uds"] for g in por_reg["Santanderes"]) / len(por_reg["Santanderes"])
s_base = escenario("Santanderes", 0.714, uds_sant, "base: entrega observada 71%")
s_opt  = escenario("Santanderes", TASA_GLOBAL, uds_sant, "OPTIMISTA: entrega global 87.6%")
s_max  = escenario("Santanderes", 1.00, uds_sant, "MAXIMO: entrega 100%")

print("\nATLANTICO  (n=6)")
uds_atl = sum(g["uds"] for g in por_reg["Atlantico"]) / len(por_reg["Atlantico"])
escenario("Atlantico", 0.50, uds_atl, "base: entrega observada 50%")
a_opt = escenario("Atlantico", TASA_GLOBAL, uds_atl, "OPTIMISTA: entrega global 87.6%")

print("-" * 78)

print("\n" + "=" * 78)
print("VEREDICTO")
print("=" * 78)
print(f"""
  Valle en su PEOR escenario ......... equilibrio {money(v_pes[1])}/conversacion
  Santanderes en su MEJOR escenario .. equilibrio {money(s_max[1])}/conversacion
  Atlantico en su MEJOR escenario .... equilibrio {money(a_opt[1])}/conversacion

  -> Valle pesimista {'GANA' if v_pes[1] > s_max[1] else 'PIERDE'} contra Santanderes optimista.
  -> La decision {'ES ROBUSTA' if v_pes[1] > s_max[1] and v_pes[1] > a_opt[1] else 'DEPENDE DE SUPUESTOS'}.
""")

print("=" * 78)
print("PENETRACION EN LAS 3 CIUDADES GRANDES  (por millon de habitantes)")
print("=" * 78)
GRANDES = [("BOGOTA", "Bogota", 7.9), ("MEDELLIN", "Medellin", 2.6),
           ("CALI", "Cali", 2.2), ("BARRANQUILLA", "Barranquilla", 1.3)]
cc = Counter(g["ciudad"] for g in guias)
print(f"\n{'CIUDAD':<14}{'POBLAC':>9}{'GUIAS':>7}{'GUIAS/MILLON':>15}{'vs MEDELLIN':>13}")
print("-" * 78)
base = cc.get("MEDELLIN", 0) / 2.6
for key, nombre, pob in GRANDES:
    n = cc.get(key, 0)
    pm = n / pob
    print(f"{nombre:<14}{pob:>8.1f}M{n:>7}{pm:>15.1f}{pm/base:>12.2f}x")
print("-" * 78)
print(f"""
  Cali tiene {cc.get('CALI',0)} guias en 6.5 semanas para 2.2 millones de habitantes.
  Medellin tiene {cc.get('MEDELLIN',0)} para 2.6 millones.
  Ajustando por poblacion, Cali esta {base/(cc.get('CALI',1)/2.2):.1f}x por debajo de Medellin.
""")
print("=" * 78)
