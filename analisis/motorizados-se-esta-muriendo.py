#!/usr/bin/env python3
"""
MOTORIZADOS CERRO EN $1.970 · PREDICCION FALLIDA Y QUE SIGNIFICA (2026-09-09)
=============================================================================
Prediccion mia: "va a cerrar entre $650 y $950, y si queda sobre $1.500
yo estaba equivocado". Cerro en $1.970.

Este archivo separa QUE parte de mi explicacion sirvio y cual no, porque el
mecanismo era correcto y la conclusion no.
"""

L = '=' * 72
EQUILIBRIO = 2_657

print(L)
print('1. LO QUE SI ERA CIERTO: EL SESGO DE ATRIBUCION EXISTE Y ES ENORME')
print(L)
lecturas_del_dia = [('~2:00 pm (parcial)', 4_021), ('~9:00 pm (parcial)', 1_861),
                    ('cierre del dia', 1_970)]
for et, v in lecturas_del_dia:
    print(f'  {et:<22} ${v:>7,}')
print()
print(f'  De $4.021 a $1.970 = una correccion del '
      f'{1-1970/4021:.0%} sin tocar NADA.')
print('  >>> El mecanismo era correcto: el gasto se cuenta al instante y las')
print('      conversaciones llegan despues. Eso no esta en discusion.')
print()

print(L)
print('2. EN QUE ME EQUIVOQUE: CONFUNDI EL MECANISMO CON LA CONCLUSION')
print(L)
print('  Mi error fue asumir que al cerrar el dia, la tasa de conversion de')
print('  Motorizados volveria al promedio de la cuenta. NO volvio.')
print()
print('  Y no volvio porque hay una tendencia que despache como ruido:')
print()
serie = [('4-6 sep', 656), ('7-8 sep', 730), ('8-9 sep', 966), ('9-sep cierre', 1_970)]
prev = 605
print(f'  {"Ventana":<16} {"$/conv":>8} {"vs anterior":>12}')
print(f'  {"3-sep":<16} {prev:>8,} {"":>12}')
for et, v in serie:
    print(f'  {et:<16} {v:>8,} {v/prev-1:>11.0%}')
    prev = v
print()
print('  🔑 CINCO LECTURAS SEGUIDAS, TODAS PEOR QUE LA ANTERIOR, con el')
print('     presupuesto CLAVADO en $15.000 todo el tiempo.')
print('     Eso no es ruido. Eso es una tendencia, y la lei mal.')
print()
print('  📌 LA LECCION, Y ES PARA GUARDAR: el sesgo de atribucion dice')
print('     CUANTO se va a corregir un numero fresco, NO en cuanto va a')
print('     aterrizar. Y una serie monotona de 5 lecturas es senal aunque')
print('     cada lectura individual este contaminada.')
print()

print(L)
print('3. QUE LE PASA A MOTORIZADOS: NO ES PRESUPUESTO, ES SU AUDIENCIA')
print(L)
# conversaciones por mil impresiones
datos = [('4-6 sep', 41_325, 63, 4_020), ('7-8 sep', 28_484, 39, 4_020),
         ('8-9 sep', 24_161, 25, 3_903)]
print(f'  {"Ventana":<12} {"impresiones":>12} {"conv":>6} {"conv/1000":>11} {"CPM":>8}')
for et, gasto, conv, cpm in datos:
    impr = gasto / cpm * 1000
    print(f'  {et:<12} {impr:>12,.0f} {conv:>6} {conv/impr*1000:>11.2f} {cpm:>8,}')
print()
print('  🔑 EL CPM BAJA Y LA TASA DE CONVERSION TAMBIEN. Eso descarta que')
print('     sea la subasta: las impresiones estan MAS baratas y aun asi')
print('     menos gente escribe. El problema es a QUIEN se le muestra.')
print()
print('  Y la frecuencia sigue plana (1,12-1,14), asi que NO es que le')
print('  aparezca al mismo tipo diez veces. Es que la gente que queda en')
print('  esa audiencia ya no responde.')
print()
print('  📌 Y estaba escrito desde el 4-sep, en 0-AC:')
print('     "MOTORIZADOS: TECHO CONFIRMADO POR TERCERA VEZ. Su audiencia')
print('      esta tapada en ~24 conversaciones diarias. Para crecer por ahi')
print('      hay que cambiarle la AUDIENCIA, no el presupuesto."')
print('     Ya no esta solo topado: se esta encogiendo.')
print()

print(L)
print('4. QUE HACER — Y HAY PRECEDENTE EN ESTE MISMO CONJUNTO')
print(L)
print(f'  Esta en ${1_970:,} contra un equilibrio de ${EQUILIBRIO:,} = '
      f'{1970/EQUILIBRIO:.0%} del limite.')
print('  Todavia gana plata, pero muy poco y bajando. Y esta SOBREGIRANDO:')
print('  gasto $20.134/dia sobre $15.000 de presupuesto = 134%.')
print()
print('  🔑 EL PRECEDENTE: el archivo documenta que en agosto se le bajo de')
print('     $25.000 a $15.000 y el resultado fue "-40% de presupuesto ->')
print('     -42% de costo". O sea que a este conjunto en particular,')
print('     recortarle presupuesto YA le funciono una vez.')
print()
print('  ✅ PROPUESTA: $15.000 -> $9.000 (-40%, el mismo recorte que funciono).')
for p in (15_000, 12_000, 9_000):
    print(f'     a ${p:>6,}/dia, si sostiene ~8 conv/dia -> '
          f'${p/8:>6,.0f}/conversacion')
print('     ⚠️ Es un supuesto: asume que las conversaciones no caen')
print('        proporcionalmente. Es justo lo que paso en Valle y en el')
print('        recorte de agosto, pero hay que medirlo.')
print()
print(f'  Libera ${15_000-9_000:,}/dia. La cuenta baja de $160.000 a $154.000.')
print()
print('  ⛔ NO se pausa todavia. A $1.970 sigue sobre el equilibrio, y su')
print('     trafico historicamente fue el MEJOR de la cuenta (clic->chat 52%).')
print('     Primero se prueba si el recorte lo revive; si en 3 dias sigue')
print('     sobre $1.500, ahi si se apaga y se le cambia la audiencia.')
print()

print(L)
print('5. LO QUE ESTO **NO** CAMBIA')
print(L)
print('  · El sesgo de atribucion sigue siendo real y sigue siendo enorme')
print('    ($4.021 -> $1.970 en un dia). Sigue valiendo no leer dias abiertos.')
print('  · El CPM de la CUENTA volvio ($3.979 -> $3.671), asi que el susto')
print('    del martes sigue explicado y sigue sin ser estructural.')
print('  · Domiciliarios y VIDEO son los que hay que mirar para saber si el')
print('    marco sirve o no: si ellos SI aterrizaron donde dije, entonces')
print('    Motorizados es la excepcion y el problema es de ese conjunto.')
print('    Si tambien quedaron altos, el problema es mi marco.')
print()
print('  📊 FALTA EL DATO: ¿en cuanto cerraron Domiciliarios, VIDEO y')
print('     TEST Creativos el 9-sep? Con eso se decide cual de las dos.')
