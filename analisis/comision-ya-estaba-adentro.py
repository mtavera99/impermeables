#!/usr/bin/env python3
"""
LA COMISION DE RECAUDO YA ESTABA DENTRO DEL FLETE (2026-09-10)
===============================================================
El dueno aclara: la comision de recaudo es la misma para los dos productos
y YA ESTA INCLUIDA en el valor_servicio que reporta 99 Envios.

O sea que yo la estaba restando DOS VECES en los analisis por pedido.
Este archivo recalcula todo sin ese doble descuento.

⚠️ El modelo de margen (26.900 x unidades - flete) NUNCA tuvo el error:
ahi solo se resta el flete. El doble conteo estaba en los calculos
individuales de colmena, mayoreo, Caldas y Tado.
"""

L = '=' * 72
COSTO_TRAD, COSTO_COLM, CPA = 33_000, 85_000, 7_674

print(L)
print('1. LA EVIDENCIA EN LOS DATOS LE DA LA RAZON')
print(L)
print('  Coordinadora, 1 unidad, guias del 7-8 sep:')
print()
print(f'  {"Ciudad":<16} {"recaudo":>9} {"valor_servicio":>15}')
for c, r, v in [('CARTAGENA',81_000,20_895.39),('MEDELLIN',81_000,20_895.39),
                ('SOLEDAD',81_000,20_895.39),('BARRANQUILLA',81_000,20_895.39),
                ('ARMENIA',81_000,20_895.39),('PEREIRA',81_000,20_895.39),
                ('SINCELEJO',83_000,21_034.86),('CUCUTA',83_000,21_034.86),
                ('BELLO',83_000,21_034.86),('MONTERIA',83_000,21_034.86)]:
    print(f'  {c:<16} {r:>9,} {v:>15,.2f}')
print()
print('  🔑 SEIS CIUDADES DISTINTAS, EL MISMO COBRO EXACTO. Y cuando el')
print('     recaudo sube $2.000, el cobro sube $139,47.')
pend = 139.47/2_000
print(f'     Pendiente: {pend:.2%} del valor recaudado.')
print()
print('  >>> Eso solo se explica si el valor_servicio TIENE ADENTRO un cargo')
print('      proporcional al recaudo. Confirma lo que dice el dueno: la')
print('      comision ya viene incluida y NO hay que restarla aparte.')
print()

print(L)
print('2. LO QUE CAMBIA (todo hacia arriba)')
print(L)
def linea(nombre, recaudo, costo, uds, flete, pauta=CPA):
    bruto = recaudo - costo*uds - flete
    print(f'  {nombre:<28} bruto ${bruto:>9,.0f} - pauta = ${bruto-pauta:>9,.0f}')
    return bruto - pauta

print('  PEDIDO AL MAYOR · GRANADA')
may = linea('  12 uds a $40.000', 573_291, COSTO_TRAD, 12, 94_005.84)
print(f'    antes yo decia $58.412 -> ahora ${may:,.0f}  (+${may-58_412:,.0f})')
print()
print('  CALDAS · 3 unidades al detal')
cal = linea('  3 uds a precio lleno', 213_000, COSTO_TRAD, 3, 33_639.33)
print(f'    antes yo decia $66.297 -> ahora ${cal:,.0f}  (+${cal-66_297:,.0f})')
print()
print('  TADO · 2 unidades (la mala)')
tad = linea('  2 uds banda E', 143_000, COSTO_TRAD, 2, 71_667.48)
print(f'    antes yo decia -$6.631 -> ahora ${tad:,.0f}. Sigue perdiendo.')
print()

print(L)
print('3. EL COLMENA: SIGUE EN ROJO, PERO MUCHO MENOS')
print(L)
col = [('SAN FRANCISCO', 22_156.03), ('PUERTO GAITAN', 25_708.76)]
tot = 0
for c, f in col:
    m = 149_900 - COSTO_COLM - f
    tot += m
    print(f'  {c:<16} flete ${f:>9,.2f}  margen ${m:>9,.0f}')
print(f'  {"TOTAL 2 ventas":<16} {"":>9}   {"":>7} ${tot:>9,.0f}')
GASTO = 85_843
print()
print(f'  Gasto del conjunto video 4-9 sep: ~${GASTO:,}')
print(f'  {"Con comision restada aparte (mal)":<38} ${69_388-GASTO:>9,.0f}')
print(f'  {"Sin restarla (correcto)":<38} ${tot-GASTO:>9,.0f}')
print()
print(f'  🔑 Pasa de -$16.455 a ${tot-GASTO:,.0f}. Sigue negativo, pero el')
print('     agujero era 4 veces mas chico de lo que dije.')
print('     La decision NO cambia: se pauso bien, porque el problema era el')
print('     CPM de $10.062 y eso no lo arregla ninguna comision.')
print()

print(L)
print('4. Y ME CORRIJO EN ALGO QUE AFIRME FUERTE')
print(L)
print(f'  Dije: "3 unidades al detal le ganan a 12 al mayor".')
print(f'    Caldas 3 uds  : ${cal:>9,.0f}')
print(f'    Granada 12 uds: ${may:>9,.0f}')
print(f'  >>> Con la cuenta corregida, el mayoreo gana por ${may-cal:,.0f} en TOTAL.')
print('      Mi frase estaba mal.')
print()
print('  PERO el argumento de fondo NO cambia, porque el que importa es por')
print('  unidad:')
print(f'    Caldas  : ${cal/3:>9,.0f} por unidad')
print(f'    Granada : ${may/12:>9,.0f} por unidad')
print(f'    >>> retail sigue rindiendo {(cal/3)/(may/12):.1f}x por unidad.')
print(f'  Y por eso el piso de lista sigue en $45.000: el mayoreo solo tiene')
print('  sentido si mueve volumen que el retail no alcanza, no si sustituye')
print('  ventas que igual ibas a hacer.')
print()

print(L)
print('5. LO QUE **NO** CAMBIA')
print(L)
print('  · El modelo de margen sigue siendo  26.900 x unidades - flete.')
print('    Ese nunca tuvo el error.')
print('  · Tado sigue perdiendo plata y sigue necesitando banda propia.')
print('  · La absorcion por banda no se mueve: se calculaba contra el')
print('    valor_servicio, sin tocar comision.')
print('  · El seguro sigue siendo el 13,6% del valor_servicio.')
print('  · El colmena sigue pausado con razon.')
print()
print('  📌 PENDIENTE #28-1 SE CIERRA a efectos de calculo: no hay que restar')
print('     comision aparte. Queda la curiosidad de saber el % exacto, pero')
print('     ya no bloquea ninguna decision.')
