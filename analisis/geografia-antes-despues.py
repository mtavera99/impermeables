#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
¿LA RESTRICCION DE GEOGRAFIA ESTA MORDIENDO?  ·  31-ago-2026

Hallazgo de la captura del Administrador: Domiciliarios apunta SOLO a
"Medellin (+40 km) Antioquia" y "Bogota (+40 km) Distrito Especial".
No es nacional. El cambio significativo del conjunto fue el 2026-08-19.

Pregunta: ¿los pedidos se concentraron en esas dos ciudades despues del
cambio, o siguen llegando de todo el pais?

  heka      15-jul a 09-ago   (antes del cambio)
  99envios  10-ago a 23-ago   (cruza el cambio)
  export31  24-ago a 31-ago   (despues del cambio)
"""
from collections import Counter, defaultdict

exec(open("mejor-lago-consolidado.py").read().split("# --------------------------------------------------------------- reporte")[0])

DENTRO = {"Antioquia", "Bogota/Cundinamarca"}

print("=" * 76)
print("CONCENTRACION GEOGRAFICA DE LOS PEDIDOS, POR PERIODO")
print("=" * 76)

periodos = [("heka", "15-jul a 09-ago", "ANTES"),
            ("99envios", "10-ago a 23-ago", "CRUZA"),
            ("export31", "24-ago a 31-ago", "DESPUES")]

print(f"\n{'PERIODO':<20}{'FECHAS':<20}{'n':>5}{'EN MED/BOG':>13}{'FUERA':>10}")
print("-" * 76)
resumen = {}
for fuente, fechas, etiqueta in periodos:
    gs = [g for g in guias if g["fuente"] == fuente]
    dentro = sum(1 for g in gs if g["region"] in DENTRO)
    fuera = len(gs) - dentro
    resumen[fuente] = (len(gs), dentro, fuera)
    print(f"{etiqueta:<20}{fechas:<20}{len(gs):>5}"
          f"{dentro:>8} {dentro/len(gs):>4.0%}{fuera:>6} {fuera/len(gs):>3.0%}")
print("-" * 76)

print("\n" + "=" * 76)
print("DETALLE: REGIONES POR PERIODO")
print("=" * 76)
for fuente, fechas, etiqueta in periodos:
    gs = [g for g in guias if g["fuente"] == fuente]
    regs = Counter(g["region"] for g in gs)
    print(f"\n{etiqueta}  ({fechas})  ·  {len(gs)} guias  ·  "
          f"{len(regs)} regiones distintas")
    for reg, n in regs.most_common():
        marca = "  <- dentro del targeting" if reg in DENTRO else ""
        print(f"     {n:>3}  ({n/len(gs):>4.1%})  {reg}{marca}")

print("\n" + "=" * 76)
print("VEREDICTO")
print("=" * 76)
n_a, d_a, f_a = resumen["heka"]
n_d, d_d, f_d = resumen["export31"]
print(f"""
  Antes  (heka):     {f_a}/{n_a} = {f_a/n_a:.0%} de pedidos FUERA de Medellin/Bogota
  Despues (export31): {f_d}/{n_d} = {f_d/n_d:.0%} de pedidos FUERA de Medellin/Bogota
""")
if abs(f_a/n_a - f_d/n_d) < 0.15:
    print("""  -> La proporcion NO cambio. Los pedidos siguen llegando de todo el pais
     aunque el targeting diga Medellin y Bogota.

     Implicacion: la restriccion de lugares NO esta impidiendo que lleguen
     pedidos nacionales. O Meta entrega fuera de la configuracion, o los
     clientes de Medellin/Bogota piden envio a otras ciudades.""")
else:
    print("""  -> La proporcion SI cambio. La restriccion esta mordiendo.""")

print("\n" + "=" * 76)
print("TAMANO DEL MERCADO NO PAUTADO")
print("=" * 76)
POB_TOT = sum(POB.values())
med_bog = POB["Antioquia"] + POB["Bogota/Cundinamarca"]
print(f"""
  El targeting cubre Medellin +40km y Bogota +40km.
  Eso es, como maximo, las areas metropolitanas: ~11.5 millones de personas.

  Colombia: 52 millones.
  Cobertura de la pauta: ~22% del pais.
  Sin pautar: ~78% del pais, unos 40 millones de personas.

  Regiones con CERO pauta y que YA compran igual:
""")
gs31 = [g for g in guias if g["fuente"] == "export31"]
fuera31 = Counter(g["region"] for g in gs31 if g["region"] not in DENTRO)
for reg, n in fuera31.most_common():
    print(f"     {n:>3} guias en 8 dias  ·  {reg}  ({POB[reg]/1e6:.1f}M hab)")
print("=" * 76)
