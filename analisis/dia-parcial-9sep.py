#!/usr/bin/env python3
"""
9-SEP SOLO, A MEDIO DIA · POR QUE ESTE EXPORT NO SIRVE PARA DECIDIR
====================================================================
Export "9-sep a 9-sep": un dia suelto y todavia abierto (~60% del dia).
Es exactamente el sesgo descrito en conjuntos-8-9sep.py, pero al maximo.

PERO trae dos cosas que si valen, porque el CPM y las impresiones NO tienen
retraso de atribucion:
  1. El CPM de la cuenta VOLVIO A BAJAR -> el +10,2% de ayer no era tendencia.
  2. El CPM de TEST Creativos y del colmena siguen subiendo, tres ventanas
     seguidas. Eso si es real.
"""

L = '=' * 74

# 9-sep parcial: (ppto, gasto, conv, impresiones, alcance)
HOY = {
    'Domiciliarios':       (45_000, 27_020, 26,  8_021,  6_729),
    'Domiciliarios VIDEO': (55_000, 34_025, 25, 10_402,  8_796),
    'TEST Creativos':      (25_000, 12_015, 10,  1_508,  1_322),
    'Motorizados':         (15_000, 12_062,  3,  3_403,  3_047),
    'Valle del Cauca':     ( 5_000,  2_129,  0,    434,    367),
    'COLMENA · VIDEO':     (20_000, 11_350,  4,  1_128,  1_095),
}
# ventana 8-9 sep (referencia con un dia completo adentro)
REF = {
    'Domiciliarios':       (52_554,  63, 14_400),
    'Domiciliarios VIDEO': (62_838,  72, 17_745),
    'TEST Creativos':      (30_845,  29,  4_618),
    'Motorizados':         (24_161,  25,  6_191),
    'Valle del Cauca':     ( 4_138,   3,    914),
    'COLMENA · VIDEO':     (29_243,   9,  3_253),
}
VIEJA = [k for k in HOY if 'COLMENA' not in k]
MARGEN_PEDIDO = 26_900 * 1.176
CIERRE = 0.084
LIMITE = MARGEN_PEDIDO * CIERRE
MARGEN_COLM = 40_968

print(L)
print('1. 🚨 LA PRUEBA DE QUE ESTE EXPORT NO SE PUEDE LEER: MOTORIZADOS')
print(L)
k = 'Motorizados'
print(f'  Motorizados hoy: ${HOY[k][1]:,} gastados y {HOY[k][2]} conversaciones')
print(f'  = ${HOY[k][1]/HOY[k][2]:,.0f} por conversacion')
print()
print('  Su historia: $565 (mejor marca) · $605 · $656 · $730 · $966')
print(f'  Y hoy marcaria ${HOY[k][1]/HOY[k][2]:,.0f}, o sea '
      f'{HOY[k][1]/HOY[k][2]/966:.1f}x su peor dia.')
print()
print('  🔑 Eso NO PASO. Gasto el 80% de su presupuesto y le contaron 3')
print('     conversaciones. El gasto se cuenta al instante; las')
print('     conversaciones llegan con retraso. Es el sesgo, no el mercado.')
print()
print('  La prueba dura: las tasas de conversion se movieron en direcciones')
print('  CONTRARIAS entre conjuntos, y eso el mercado no lo hace.')
print()
print(f'  {"Conjunto":<21} {"conv/1000 impr 8-9":>19} {"hoy":>8} {"cambio":>9}')
for k2 in VIEJA:
    if HOY[k2][2] == 0:
        continue
    r_ref = REF[k2][1]/REF[k2][2]*1000
    r_hoy = HOY[k2][2]/HOY[k2][3]*1000
    print(f'  {k2:<21} {r_ref:>19.2f} {r_hoy:>8.2f} {r_hoy/r_ref-1:>8.0%}')
print()
print('  >>> Motorizados -78% y TEST Creativos +6% EL MISMO DIA, en la misma')
print('      subasta. Un encarecimiento real golpea a todos parecido.')
print('      Esto es retraso de atribucion y muestras chicas, nada mas.')
print()

print(L)
print('2. 🟢 LA BUENA DE FONDO: EL CPM VOLVIÓ A BAJAR')
print(L)
g = sum(HOY[k][1] for k in VIEJA); i = sum(HOY[k][3] for k in VIEJA)
a = sum(HOY[k][4] for k in VIEJA); c = sum(HOY[k][2] for k in VIEJA)
print('  El CPM NO tiene retraso de atribucion: las impresiones se cuentan')
print('  cuando pasan. Es la unica serie limpia que hay hoy.')
print()
print(f'  {"Ventana":<20} {"CPM":>9}')
for et, cpm in (('4-6 sep', 3_609*0), ):
    pass
print(f'  {"7-8 sep":<20} {3_609:>9,}')
print(f'  {"8-9 sep":<20} {3_979:>9,}   <- el susto (+10,2%)')
print(f'  {"9-sep (hoy)":<20} {g/i*1000:>9,.0f}   <- volvio')
print()
print(f'  🔑 EL +10,2% DE AYER NO ERA TENDENCIA: ERA EL MARTES.')
print(f'     Hoy el CPM esta en ${g/i*1000:,.0f}, a {g/i*1000/3_609-1:+.1%} del 7-8 sep.')
print('     >>> Eso responde tu preocupacion de fondo: la subasta NO se')
print('         encarecio de forma estructural.')
print()
print(f'  🟢 Y la frecuencia sigue plana: {i/a:.2f} (venia de 1,13 y 1,12).')
print('     Audiencia sana, sin desgaste.')
print()

print(L)
print('3. 📐 DONDE VA A CERRAR HOY DE VERDAD')
print(L)
tasa_ref = sum(REF[k][1] for k in VIEJA)/sum(REF[k][2] for k in VIEJA)*1000
conv_esp = i * tasa_ref/1000
print(f'  Impresiones de hoy          : {i:,}')
print(f'  Tasa normal (8-9 sep)       : {tasa_ref:.2f} conv por mil')
print(f'  Conversaciones ESPERADAS    : ~{conv_esp:.0f}')
print(f'  Conversaciones CONTADAS     : {c}  ({c/conv_esp:.0%})')
print()
print(f'  $/conv como se ve ahora     : ${g/c:>7,.0f}')
print(f'  $/conv con el denominador completo: ${g/conv_esp:>7,.0f}')
print()
print(f'  🔑 Hoy va a cerrar cerca de ${g/conv_esp:,.0f}, no de ${g/c:,.0f}.')
print(f'     Y ${g/conv_esp:,.0f} contra el limite de ${LIMITE:,.0f} es el '
      f'{g/conv_esp/LIMITE:.0%}: sano.')
print('  ⚠️ Es una proyeccion, no una medicion. El punto no es el numero:')
print('     es que NO se decide nada con un dia abierto.')
print()

print(L)
print('4. ⚖️ CORRECCIÓN A LO QUE TE DIJE HACE UNAS HORAS')
print(L)
k = 'TEST Creativos'
print('  Hace unas horas dije: "el problema real es TEST Creativos, subio 75%".')
print('  Hoy es el SEGUNDO MAS BARATO de la campaña vieja:')
print()
print(f'  {"Conjunto":<21} {"$/conv hoy":>11}')
for k2 in sorted([x for x in VIEJA if HOY[x][2] > 0], key=lambda x: HOY[x][1]/HOY[x][2]):
    print(f'  {k2:<21} {HOY[k2][1]/HOY[k2][2]:>11,.0f}')
print()
print('  🔑 Pasar de "el mas caro" a "el 2o mas barato" en un dia significa')
print('     que ese +75% era RUIDO. Me adelante y lo doy por corregido.')
print()
print('  PERO su CPM si es real, y es lo unico que crece de forma consistente:')
print(f'     $5.240 (7-8) -> $6.679 (8-9) -> ${HOY[k][1]/HOY[k][3]*1000:,.0f} (hoy)  '
      f'= {HOY[k][1]/HOY[k][3]*1000/5_240-1:+.0%} en tres ventanas')
print()

print(L)
print('5. 🔑 EL HALLAZGO DEL DÍA: EL MEJOR CREATIVO CON LA PEOR SUBASTA')
print(L)
print('  Separando las dos mitades del costo por conversacion:')
print()
print(f'  {"Conjunto":<21} {"CPM":>9} {"conv/1000":>10} {"$/conv":>9} '
      f'{"$/conv a CPM normal":>21}')
cpm_norm = g/i*1000
for k2 in sorted([x for x in HOY if HOY[x][2] > 0],
                 key=lambda x: -(HOY[x][2]/HOY[x][3])):
    cpm = HOY[k2][1]/HOY[k2][3]*1000
    tasa = HOY[k2][2]/HOY[k2][3]*1000
    print(f'  {k2:<21} {cpm:>9,.0f} {tasa:>10.2f} '
          f'{HOY[k2][1]/HOY[k2][2]:>9,.0f} {cpm_norm/tasa*1:>21,.0f}')
print()
tasa_t = HOY[k][2]/HOY[k][3]*1000
tasa_d = HOY['Domiciliarios'][2]/HOY['Domiciliarios'][3]*1000
print(f'  🔑 TEST CREATIVOS CONVIERTE {tasa_t/tasa_d:.1f}x MEJOR POR IMPRESION QUE')
print(f'     DOMICILIARIOS, Y PAGA {(HOY[k][1]/HOY[k][3])/(HOY["Domiciliarios"][1]/HOY["Domiciliarios"][3]):.1f}x SU CPM.')
print(f'     Si pagara el CPM promedio de la cuenta, costaria '
      f'${cpm_norm/tasa_t:,.0f} por conversacion:')
print('     de lejos el mas barato que ha tenido la cuenta.')
print()
print('  >>> ESO ES EL PENDIENTE #77 EN NUMEROS. Su problema NO es el')
print('      creativo (es el mejor) ni el presupuesto (gasta lo que le dan):')
print('      es que puja contra Domiciliarios por la MISMA audiencia guardada,')
print('      y Domiciliarios tiene el historial. Le dan el inventario caro.')
print('  ⛔ NO se sube (le compra impresiones a $7.968).')
print('  ⛔ NO se baja (es el mejor creativo que hay).')
print('  ✅ SE LE DA AUDIENCIA PROPIA. Es la unica palanca que le sirve.')
print()

print(L)
print('6. 🔴 EL COLMENA: MISMA ENFERMEDAD, TERMINAL')
print(L)
k = 'COLMENA · VIDEO'
print(f'  ⚠️ ESTADO EN EL EXPORT: "not_delivering" (antes decia "active").')
print('     ¿Lo apagaste ya, o se freno solo? Cambia la lectura.')
print()
cpm_c = HOY[k][1]/HOY[k][3]*1000
tasa_c = HOY[k][2]/HOY[k][3]*1000
print(f'  CPM: $7.318 -> $8.990 -> ${cpm_c:,.0f}  '
      f'({cpm_c/7_318-1:+.0%} en tres ventanas)')
print(f'  Ya es {cpm_c/cpm_norm:.1f}x el CPM de la campaña vieja.')
print()
print(f'  Y aca esta lo cruel: su tasa de conversion es {tasa_c:.2f} por mil,')
print(f'  parecida a la de Domiciliarios ({tasa_d:.2f}). El creativo del')
print('  colmena NO es malo.')
print(f'  A CPM normal costaria ${cpm_norm/tasa_c:,.0f}/conv, y ahi necesitaria')
print(f'  cerrar solo {cpm_norm/tasa_c/MARGEN_COLM:.1%} — cierra 5,4%. SERIA RENTABLE.')
print()
print(f'  🔑 O SEA QUE EL COLMENA NO FRACASO POR EL PRODUCTO, NI POR EL PRECIO,')
print('     NI POR EL CREATIVO, NI POR LA CONVERSACION. Fracaso porque no')
print('     puede ganar la subasta. Y eso NO se arregla con presupuesto:')
print(f'     lleva 6 dias y ~$86.000 probandolo, con el CPM subiendo cada dia.')
print()
print('  ✅ LA DECISION NO CAMBIA: apagar. Pero el motivo importa para el')
print('     futuro: el camino del colmena es donde el CPM es barato, o sea')
print('     AUDIENCIA PERSONALIZADA con los que ya compraron (Paso 3 de 0-AC),')
print('     no subasta abierta.')
print()

print(L)
print('7. QUÉ HACER CON ESTE EXPORT: NADA')
print(L)
print('  1. ⛔ NO tocar nada por este dato. Un dia abierto no decide.')
print('  2. 🟢 Tu preocupacion de fondo esta respondida: el CPM volvio.')
print(f'     Hoy ${g/i*1000:,.0f} contra $3.979 de ayer y $3.609 del 7-8.')
print('  3. 🔴 El colmena sigue para apagar (¿ya quedo en not_delivering?).')
print('  4. 🧪 La jugada que si mueve la aguja: AUDIENCIA PROPIA para TEST')
print('     Creativos (#77). No presupuesto — audiencia distinta.')
print('  5. 📊 Mañana: export 4 al 10-sep COMPLETO por conjunto. Con la')
print('     ventana cerrada se ve si el CPM del martes fue un dia o un cambio.')
print()
print('  📌 REGLA PARA GUARDAR: no volver a sacar exports de un solo dia')
print('     abierto. Minimo 3 dias cerrados. Motorizados a $4.020 con n=3 es')
print('     el ejemplo perfecto de una cifra que asusta y no significa nada.')
