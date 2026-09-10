#!/usr/bin/env python3
"""
ESTABA COMPARANDO MAL: PROMEDIO CONTRA PROMEDIO (2026-09-10)
=============================================================
El dueno reencuadra la pregunta y tiene razon:

  "no se trata de decir este es mejor o este es peor. Lo que quiero es
   diversificar mis productos y ganar plata de los dos. No importa si me
   gano 20.000, 30.000 o 50.000 con el colmena, desde que me deje plata."

Yo venia respondiendo otra pregunta: "¿cual producto es mejor?". Y para eso
comparar promedios esta bien. Pero para decidir DONDE VA EL PROXIMO PESO hay
que comparar MARGINALES. Y ahi el resultado se invierte.
"""
L = '=' * 72

# --- colmena, ventana 4-9 sep, con las 3 ventas confirmadas
GASTO_COLM, VENTAS, MARGEN_COLM = 85_843, 3, 40_968
UTIL_COLM = MARGEN_COLM * VENTAS - GASTO_COLM

# --- tradicional: curva de elasticidad 0,63 medida en 0-W
CURVA = [(97_944, 0.60), (125_000, 0.35), (160_000, 0.16), (200_000, -0.00)]
GASTO_HOY = 154_000     # la cuenta al 10-sep

print(L); print('1. PROMEDIO CONTRA PROMEDIO — LO QUE YO HICE'); print(L)
MARGEN_TRAD, CPA_TRAD = 30_160, 7_674
print(f'  {"":<28}{"COLMENA":>12}{"TRADICIONAL":>14}')
print(f'  {"margen / CPA":<28}{MARGEN_COLM/(GASTO_COLM/VENTAS):>11.2f}x'
      f'{MARGEN_TRAD/CPA_TRAD:>13.2f}x')
print()
print('  Conclusion que saque: "el tradicional rinde 2,7x mas, se apaga el')
print('  colmena por costo de oportunidad".')
print()
print('  ⚠️ EL PROBLEMA: eso compara el PROMEDIO del tradicional, que incluye')
print('     sus primeros pesos, que son los mas rentables de todos. Pero el')
print(f'     peso que se le quitaria al colmena no iria al promedio: iria al')
print(f'     MARGEN, con la cuenta ya en ${GASTO_HOY:,}/dia.')

print(); print(L); print('2. MARGINAL CONTRA MARGINAL — LA COMPARACION CORRECTA'); print(L)
print('  La curva del tradicional (0-W, elasticidad 0,63 medida):')
print(f'  {"gasto/dia":>12}{"lo que devuelve el ultimo peso":>34}')
for g, m in CURVA:
    aqui = '  <-- la cuenta hoy' if abs(g-GASTO_HOY) < 12_000 else ''
    print(f'  {g:>12,}{m:>32,.2f}{aqui}')
marg_trad = 0.16
print()
print(f'  Tradicional, peso marginal a ${GASTO_HOY:,}/dia : +${marg_trad:.2f} de utilidad')
print(f'  Colmena, peso puesto en su campana         : '
      f'+${UTIL_COLM/GASTO_COLM:.2f} de utilidad')
print(f'    (${UTIL_COLM:,} de utilidad sobre ${GASTO_COLM:,} de gasto)')
print()
print(f'  🔑🔑 EL PESO DEL COLMENA RINDE '
      f'{(UTIL_COLM/GASTO_COLM)/marg_trad:.1f}x MAS QUE EL PESO MARGINAL')
print('     DEL TRADICIONAL. La conclusion se INVIERTE.')
print()
print('  📌 Por que: el tradicional esta en la parte PLANA de su curva. Sus')
print('     primeros pesos son buenisimos, pero el peso 154.000 ya casi no')
print('     devuelve nada. El colmena arranca en su propia curva desde cero.')
print()
print('  ⚠️ CAVEAT: la curva de 0-W se estimo con el margen viejo y con UN solo')
print('     escalon. Lo robusto es su FORMA (plana arriba de $125.000), no el')
print('     +$0,16 exacto.')
print(f'     Para que el tradicional le ganara al colmena en el margen tendria')
print(f'     que devolver +${UTIL_COLM/GASTO_COLM:.2f} por peso, que es el '
      f'{(UTIL_COLM/GASTO_COLM)/0.60:.0%} de lo que devolvia')
print('     cuando la cuenta estaba en $98.000/dia. O sea que el peso 154.000')
print('     tendria que rendir casi como rendia el peso 98.000, y toda la')
print('     evidencia de elasticidad dice lo contrario.')

print(); print(L); print('3. ¿PIERDE PLATA EL COLMENA? EL GATE CORRECTO ES EL SUYO'); print(L)
CIERRE_COLM_TOT = VENTAS / 37
CIERRE_TRAD_TOT = 0.084
be_colm = MARGEN_COLM * CIERRE_COLM_TOT
be_trad = MARGEN_TRAD * CIERRE_TRAD_TOT
real_colm, real_trad = 2_838, 708
print(f'  {"":<34}{"COLMENA":>12}{"TRADICIONAL":>14}')
print(f'  {"$/conversacion de equilibrio":<34}${be_colm:>11,.0f}${be_trad:>13,.0f}')
print(f'  {"$/conversacion real (su peor dia)":<34}${real_colm:>11,.0f}${real_trad:>13,.0f}')
print(f'  {"% del limite":<34}{real_colm/be_colm:>11.0%}{real_trad/be_trad:>14.0%}')
print(f'  {"colchon":<34}{be_colm/real_colm:>11.2f}x{be_trad/real_trad:>13.2f}x')
print()
print(f'  🟢 RESPUESTA DIRECTA: NO, EL COLMENA NO PIERDE PLATA.')
print(f'     Su equilibrio son ${be_colm:,.0f} por conversacion y su PEOR dia')
print(f'     (con el CPM en $10.062, el mas caro que tuvo) marco ${real_colm:,}.')
print(f'     Nunca cruzo su propio equilibrio.')
print()
print(f'  🔔 PERO SIN COLCHON: al {real_colm/be_colm:.0%} del limite contra el '
      f'{real_trad/be_trad:.0%} del')
print('     tradicional. Eso es lo que hay que arreglar, y es distinto de')
print('     "no funciona".')

print(); print(L); print('4. ENTONCES SI, SE VUELVE A PRENDER — PERO NO IGUAL'); print(L)
print('  El error no fue prenderla. Fue COMO estaba armada. Tres cambios:')
print()
print('  (a) 🎯 AUDIENCIA DE TUS PROPIOS CLIENTES, no publico frio.')
print('      Y el mecanismo NO es que baje el CPM — ojo, una audiencia chica')
print('      suele tener CPM MAS ALTO. El mecanismo es el CIERRE:')
print('        · ya te compraron: la confianza esta hecha')
print('        · son motociclistas confirmados, no interesados en motos')
print('        · el colmena es literalmente el upgrade de lo que tienen')
for mult in (1.5, 2.0, 2.5):
    cierre = CIERRE_COLM_TOT * mult
    cpa = 2_838 / cierre
    print(f'        si el cierre es {mult:.1f}x ({cierre:.1%}) -> CPA ${cpa:,.0f}'
          f' -> utilidad/venta ${MARGEN_COLM-cpa:,.0f}')
print(f'      (al mismo $2.838 por conversacion, sin mejorar el CPM en nada)')
print()
print('  (b) 💵 PRESUPUESTO CHICO: $8.000-10.000/dia, no $20.000.')
print('      La audiencia es de ~450 personas: se agota. Meterle $20.000 la')
print('      quema en dias y el CPM se dispara, que es exactamente lo que')
print('      paso. Con audiencia chica, presupuesto chico.')
print()
print('  (c) ⏳ VENTANA DE 14 DIAS, NO DE 5. Ya esta demostrado que este')
print('      producto tarda ~7 dias en cerrar una venta. Con 5 dias se')
print('      vuelve a repetir el error de la ventana censurada.')
print()
print(f'  📌 Y el gate se mide contra SU equilibrio (${be_colm:,.0f}/conversacion),')
print('     NO contra el tradicional. Esa es la consecuencia practica de que')
print('     el objetivo sea diversificar y no ganar una carrera.')

print(); print(L); print('5. Y HAY UN ARGUMENTO MAS GRANDE QUE EL DEL COLMENA'); print(L)
print('  El archivo ya tiene medido que el tradicional esta cerca de su techo:')
print('    · elasticidad 0,63: duplicar el gasto sube las ventas solo 31%')
print('    · la utilidad esta PLANA entre $125.000 y $200.000/dia')
print('    · TECHO-REALISTA.md: para llegar a 50 uds/dia hay que bajar la')
print('      elasticidad a ~0,41, "y eso solo pasa metiendo audiencia nueva"')
print()
print('  🔑 O SEA QUE DIVERSIFICAR NO ES UNA DISTRACCION DEL PLAN DE')
print('     CRECIMIENTO: ES EL PLAN DE CRECIMIENTO.')
print('     El tradicional ya no crece con mas plata. Crece con productos')
print('     nuevos y audiencias nuevas. Tu instinto y los numeros coinciden.')
print()
print('  📌 Y para la CHAQUETA REFLECTIVA, el colmena ya dejo el manual:')
print('     · no juzgarla en 5 dias (ticket alto = decision lenta)')
print('     · no arrancar con publico frio y presupuesto grande')
print('     · medirla contra SU equilibrio, no contra el tradicional')
print('     · contar las conversaciones vacias aparte desde el dia 1')
print('     · y sacarle el margen real con fletes de verdad, no teoricos')
print('     Eso vale mas que las 3 ventas del colmena.')

print(); print(L); print('6. LO QUE NO HAY QUE HACER'); print(L)
print('  ⛔ No prenderla HOY. Serian 6 variables movidas en 48 horas y el')
print('     lunes 14 no se podria leer ni las regiones ni Motorizados.')
print('  ⛔ No prenderla igual que estaba (publico frio, $20.000): eso ya')
print('     esta probado y su CPM subio 6 dias seguidos.')
print('  ⛔ No bajarle el precio. Cierra al 15% de las conversaciones reales')
print('     a $149.900 y su margen es el 30% mayor del negocio.')
print('  ⛔ No esperar que reemplace al tradicional. No va a pasar y no hace')
print('     falta que pase.')
