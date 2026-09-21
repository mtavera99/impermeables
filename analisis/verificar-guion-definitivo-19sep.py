#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
VERIFICA cada precio del GUION-BOT-DEFINITIVO.md contra el flete real medido.
Si algo no cuadra, grita. No se publican precios sin pasar por acá.
"""
COSTO_PROD = 33000
META = 23244
PRECIO_PROD_CLIENTE = 59900

# envio real (flete+seguro) medido sobre las 226 guias del export 18-sep
ENVIO_1 = {"A": 14906, "B": 21038, "C": 25055, "D": 26287, "E": 28697}
ENVIO_2 = {"A": 23947, "B": 32597, "C": 38784, "D": 37832, "E": 45214}

# lo que quedo escrito en el guion
GUION_1 = {"A": 73000, "B": 78000, "C": 82000, "D": 83000, "E": 85000}
GUION_2 = {"A": 137000, "B": 146000, "C": 152000, "D": 152000, "E": 158000}

# lo que tenia el bot antes
VIEJO_1 = {"A": 73000, "B": 77000, "C": 81000, "D": 83000, "E": 85000}
VIEJO_2 = {"A": 128000, "B": 136000, "C": 138000, "D": 139000, "E": 143000}

fallas = []

print("=" * 70)
print("VERIFICACION DEL GUION DEFINITIVO")
print("=" * 70)
print()
print("### 1 UNIDAD")
print()
print(f"{'banda':<7}{'guion':>9}{'envio':>9}{'margen/ud':>11}{'vs meta':>10}  estado")
print("-" * 58)
for b in "ABCDE":
    m = GUION_1[b] - COSTO_PROD - ENVIO_1[b]
    ok = m >= META
    if not ok:
        fallas.append(f"1 ud banda {b}: margen ${m:,.0f} < ${META:,}")
    print(f"{b:<7}{GUION_1[b]:>9,}{ENVIO_1[b]:>9,}{m:>11,.0f}{m-META:>+10,.0f}"
          f"  {'OK' if ok else 'FALLA'}")
print()

print("### 2 UNIDADES")
print()
print(f"{'banda':<7}{'guion':>9}{'envio':>9}{'margen/ud':>11}{'vs meta':>10}  estado")
print("-" * 58)
for b in "ABCDE":
    m = (GUION_2[b] - 2*COSTO_PROD - ENVIO_2[b]) / 2
    ok = m >= META
    if not ok:
        fallas.append(f"2 uds banda {b}: margen ${m:,.0f} < ${META:,}")
    print(f"{b:<7}{GUION_2[b]:>9,}{ENVIO_2[b]:>9,}{m:>11,.0f}{m-META:>+10,.0f}"
          f"  {'OK' if ok else 'FALLA'}")
print()

print("### AHORRO DE LLEVAR 2 (lo que el bot le dice al cliente)")
print()
print(f"{'banda':<7}{'2 sueltos':>11}{'promo 2':>10}{'ahorro':>9}  ¿positivo?")
print("-" * 48)
for b in "ABCDE":
    dos = 2*GUION_1[b]
    ah = dos - GUION_2[b]
    if ah <= 0:
        fallas.append(f"banda {b}: la promo de 2 NO ahorra nada (${ah:,.0f})")
    print(f"{b:<7}{dos:>11,}{GUION_2[b]:>10,}{ah:>9,}  {'si' if ah > 0 else 'NO'}")
print()

print("### COHERENCIA: producto + envio = total")
print()
print(f"{'banda':<7}{'total':>9}{'- producto':>12}{'= envio q dice':>15}{'envio real':>12}")
print("-" * 56)
for b in "ABCDE":
    env_dice = GUION_1[b] - PRECIO_PROD_CLIENTE
    dif = env_dice - ENVIO_1[b]
    print(f"{b:<7}{GUION_1[b]:>9,}{PRECIO_PROD_CLIENTE:>12,}{env_dice:>15,}"
          f"{ENVIO_1[b]:>12,}")
print()
print("  (el 'envio que dice' puede ser algo mayor al real: ese es el colchon)")
print()

print("### CUANTO MEJORA CONTRA LO QUE TENIA EL BOT")
print()
tot_v = tot_n = 0
print(f"{'banda':<7}{'viejo 2u':>10}{'nuevo 2u':>10}{'sube':>8}{'margen viejo':>14}{'nuevo':>9}")
print("-" * 60)
for b in "ABCDE":
    mv = (VIEJO_2[b] - 2*COSTO_PROD - ENVIO_2[b]) / 2
    mn = (GUION_2[b] - 2*COSTO_PROD - ENVIO_2[b]) / 2
    print(f"{b:<7}{VIEJO_2[b]:>10,}{GUION_2[b]:>10,}{GUION_2[b]-VIEJO_2[b]:>+8,}"
          f"{mv:>14,.0f}{mn:>9,.0f}")
print()

# --- casos concretos del guion, uno por uno ---
print("### LOS EJEMPLOS QUE APARECEN EN EL GUION")
print()
casos = [
    ("Cali 1 ud (banda C)", GUION_1["C"], 82000),
    ("envio de Cali que dice el guion", GUION_1["C"] - PRECIO_PROD_CLIENTE, 22100),
    ("Medellin 2 uds (banda C)", GUION_2["C"], 152000),
    ("ahorro Medellin 2 uds", 2*GUION_1["C"] - GUION_2["C"], 12000),
    ("Riosucio Caldas (banda E)", GUION_1["E"], 85000),
]
for nom, calc, escrito in casos:
    ok = calc == escrito
    if not ok:
        fallas.append(f"{nom}: guion dice ${escrito:,} pero la tabla da ${calc:,}")
    print(f"  {nom:<38}${escrito:>8,}  {'OK' if ok else 'NO CUADRA'}")
print()

print("=" * 70)
if fallas:
    print(f"🔴 {len(fallas)} FALLAS:")
    for f in fallas:
        print(f"   · {f}")
else:
    print("🟢 TODO CUADRA. Los precios del guion son consistentes y todos")
    print("   dejan el margen por encima de $23.244/unidad.")
print("=" * 70)
