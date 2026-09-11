#!/usr/bin/env python3
"""
LA TERCERA VENTA DEL COLMENA LLEGO CON LA CAMPANA APAGADA (2026-09-10)
=======================================================================
El dueno reporta: una persona que habia escrito la semana pasada volvio HOY
por su cuenta, pidio el colmena y PAGO ANTICIPADO los $149.900.

Nadie le escribio. La campana esta pausada desde el 9-sep.

⚠️ Esto NO es una anecdota: corrige el veredicto de #85, y lo corrige por
la MISMA razon que yo mismo documente en 0-AF sobre los dias abiertos.
Ahi el error era leer gasto fresco contra conversaciones que no habian
llegado. Aca el error es leer gasto contra VENTAS que no habian llegado.
Es el mismo sesgo, un escalon mas abajo del embudo.
"""
L = '=' * 74
COLM, COSTO_COLM = 149_900, 85_000
GASTO_CAMPANA = 85_843          # conjunto video colmena, 4 al 9-sep
CONVERS = 37                    # conversaciones de la campana del colmena

# margenes reales medidos con fletes de verdad (0-AE / comision corregida)
V1 = COLM - COSTO_COLM - 22_156.03      # San Francisco  -> ENTREGADA
V2 = COLM - COSTO_COLM - 25_708.76      # Puerto Gaitan   -> en terminal destino
FLETE_PROM = (22_156.03 + 25_708.76) / 2
V3 = COLM - COSTO_COLM - FLETE_PROM     # la nueva, PREPAGADA

print(L); print('1. LO QUE DIJE EL 9-SEP, Y LO QUE ERA'); print(L)
print(f'  {"":<34}{"con 2 ventas":>16}{"con 3 ventas":>16}')
print(f'  {"Ventas del colmena":<34}{2:>16}{3:>16}')
print(f'  {"Cierre sobre "+str(CONVERS)+" conversaciones":<34}'
      f'{2/CONVERS:>15.1%}{3/CONVERS:>16.1%}')
print(f'  {"Margen total":<34}${V1+V2:>15,.0f}${V1+V2+V3:>15,.0f}')
print(f'  {"Menos el gasto de la campana":<34}'
      f'${V1+V2-GASTO_CAMPANA:>15,.0f}${V1+V2+V3-GASTO_CAMPANA:>15,.0f}')
print()
print(f'  🔑 DIJE "no cubrio, se apaga" con -${GASTO_CAMPANA-(V1+V2):,.0f}.')
print(f'     Con la tercera venta la campana cierra en '
      f'+${V1+V2+V3-GASTO_CAMPANA:,.0f}. SI CUBRIO.')
print()
print('  Y el argumento central que use para pausarla se cae solo:')
print(f'     dije "necesita cerrar 6,9-7,9% y cierra 5,4%".')
print(f'     Cierra {3/CONVERS:.1%}. Y el tradicional cierra 8,4%.')
print('     >>> EL COLMENA CIERRA CASI IGUAL QUE EL TRADICIONAL.')

print(); print(L); print('2. POR QUE ME EQUIVOQUE — Y ES UN ERROR QUE YA TENIA ESCRITO'); print(L)
print('  El 9-sep escribi la regla: "el gasto se cuenta al instante y las')
print('  conversaciones se atribuyen despues, asi que un dia abierto sale')
print('  inflado". Aplique eso al CPM y no lo aplique a las VENTAS.')
print()
print('  🔑 EL COLMENA TIENE CICLO DE VENTA MAS LARGO QUE EL TRADICIONAL,')
print('     y tiene que tenerlo: son $149.900 contra $81.000.')
print('     Esta venta tardo ~7 DIAS desde el primer mensaje.')
print()
print('  Cerrar su gate a los 5 dias fue medir un producto de decision lenta')
print('  con el reloj de un producto de decision rapida. La ventana estaba')
print('  CENSURADA y el numero salio bajo por construccion.')
print()
print('  📌 REGLA NUEVA: el colmena no se juzga con menos de 10-14 dias')
print('     cerrados. El tradicional si, porque se decide en el dia.')

print(); print(L); print('3. ENTONCES, ¿SE VUELVE A PRENDER? — NO, Y ESTA ES LA RAZON BUENA'); print(L)
CPA_COLM = GASTO_CAMPANA / 3
MARGEN_COLM = (V1 + V2 + V3) / 3
# tradicional: de la ventana de 138 pedidos del export del 10-sep
MARGEN_TRAD, CPA_TRAD = 30_160, 7_674
print(f'  {"":<26}{"COLMENA":>14}{"TRADICIONAL":>14}')
print(f'  {"Margen por pedido":<26}${MARGEN_COLM:>13,.0f}${MARGEN_TRAD:>13,.0f}')
print(f'  {"CPA real":<26}${CPA_COLM:>13,.0f}${CPA_TRAD:>13,.0f}')
print(f'  {"Utilidad limpia":<26}${MARGEN_COLM-CPA_COLM:>13,.0f}'
      f'${MARGEN_TRAD-CPA_TRAD:>13,.0f}')
print(f'  {"Margen por $1 de pauta":<26}{MARGEN_COLM/CPA_COLM:>13.2f}x'
      f'{MARGEN_TRAD/CPA_TRAD:>13.2f}x')
print()
print(f'  🔑 EL COLMENA NO PERDIA PLATA. RENDIA MENOS.')
print(f'     Cada peso de pauta puesto en el tradicional devuelve '
      f'{(MARGEN_TRAD/CPA_TRAD)/(MARGEN_COLM/CPA_COLM):.1f}x')
print('     mas que en el colmena. Con presupuesto limitado se apaga igual,')
print('     pero por COSTO DE OPORTUNIDAD, no porque pierda.')
print()
print('  📌 Y eso cambia el gatillo para reactivarla. Ya no es "que sea')
print('     rentable" (ya lo es). Es "que empate con el tradicional":')
obj = MARGEN_COLM / (MARGEN_TRAD / CPA_TRAD)
print(f'       CPA objetivo             : ${obj:,.0f}  (hoy ${CPA_COLM:,.0f})')
print(f'       $/conversacion objetivo  : ${obj*3/CONVERS:,.0f}  (hoy $2.838)')
print(f'       o sea bajar el costo de conversacion {2838/(obj*3/CONVERS):.1f}x.')
print('     Eso NO lo da mas presupuesto: lo da audiencia propia (su CPM era')
print('     $10.062 = 2,7x la cuenta). El plan de 0-AF sigue en pie, con un')
print('     numero concreto al que apuntar.')

print(); print(L); print('4. LO QUE SI CAMBIA HOY, Y VALE PLATA'); print(L)
print('  🥇 LOS ~34 CHATS DEL COLMENA QUE NO CERRARON SIGUEN VIVOS.')
print('     Esta venta lo prueba: el CPA de esa conversacion ya esta pagado y')
print('     hundido. Cada venta que salga de ahi entra con CPA $0.')
print(f'       cada una vale        : ${MARGEN_COLM:,.0f} limpios')
print(f'       si cierra 1 mas de 34: ${MARGEN_COLM:,.0f}')
print(f'       si cierran 3 mas     : ${MARGEN_COLM*3:,.0f}')
print('     ✅ ES LEGITIMO ESCRIBIRLES: ellos escribieron primero. No es')
print('        mensaje no solicitado, es retomar una conversacion abierta.')
print('     ⛔ Uno por uno y con contexto. NO un copiar-pegar a los 34 el')
print('        mismo dia: eso si dispara reportes y el numero ES el negocio.')
print()
print('  🥈 EL PAGO ANTICIPADO FUNCIONA A $149.900. Es el primero a ese precio.')
print('     En el producto de mayor exposicion, el prepago borra el riesgo de')
print('     rechazo completo y ahorra la comision de recaudo.')
print('     ✅ Para el colmena, OFRECER prepago como opcion normal.')
print('     ⛔ Pero NO con descuento: el beneficio del prepago es ~$4.052 y')
print('        descontar $4.000 lo regala entero (0-AF, parche D).')
print()
print('  🥉 YA HAY 3 COMPRADORES DE COLMENA IDENTIFICADOS.')
print('     Son la semilla del lookalike. Con 2 no habia con que; con 3')
print('     tampoco alcanza, pero el contador ya corre y hay que anotarlos')
print('     aparte en la hoja (#81).')

print(); print(L); print('5. LO QUE **NO** CAMBIA'); print(L)
print('  · El diagnostico del CPM sigue intacto: $10.062 = 2,7x la cuenta,')
print('    y subio seis dias seguidos. No puede comprar trafico en frio.')
print('  · La campana sigue apagada HOY. Prenderla seria la sexta variable')
print('    movida en 48 horas (tres regiones + Valle + Motorizados + guion),')
print('    y el lunes 14 no se podria leer nada.')
print('  · El precio no se toca: cierra al 8,1% a $149.900.')
print('  · El upsell dentro del chat del tradicional sigue siendo el canal #1.')
print()
print(f'  📌 n = 3 ventas. Todo esto es direccion, no precision. Pero la')
print('     direccion cambio de signo, y eso si es decision.')


print(); print(L)
print('6. ACLARACION DEL DUENO: EL LEAD ERA DE LA CAMPANA DEL COLMENA')
print(L)
print('  El dueno reviso la conversacion: la persona habia escrito DIAS ANTES,')
print('  cuando la publicidad estaba prendida, y hoy volvio preguntando por el')
print('  colmena, dijo que lo queria y pago. Sin que nadie le vendiera nada.')
print()
print('  🔑 ESO ES MAS LIMPIO DE LO QUE YO SUPUSE, y cambia dos cosas:')
print()
print('  (a) NO fue el upsell. El bloque del upsell no tuvo nada que ver, asi')
print('      que NO se puede contar como evidencia de que el upsell funciona.')
print('      Sigue sin medir. (Y el guion tampoco vendio: el cliente llego')
print('      resuelto. Eso es demanda del PRODUCTO, no del argumento.)')
print()
print('  (b) SI es una venta de la campana pausada, atribuible a su gasto.')
print('      O sea que las ~34 conversaciones que quedaron NO son leads')
print('      muertos: son la MISMA poblacion que acaba de producir una venta')
print('      sola, sin seguimiento, sin recordatorio y sin descuento.')
print()
print(f'  Tasa de retorno espontaneo medida: 1 de ~34 = {1/34:.1%}')
print('  ⚠️ n=1. Pero el piso importa: es lo que rinde HACER NADA.')
print('     Cualquier seguimiento razonable deberia superar el 2,9%.')

print(); print(L)
print('7. ⚠️ Y ENTONCES MI PROPIO 1,43x TAMBIEN ESTA CENSURADO')
print(L)
print('  Si los leads de esa campana siguen convirtiendo, el CPA del colmena')
print('  sigue BAJANDO. O sea que el 1,43x que calcule arriba es un PISO, no')
print('  el numero final. No puedo cerrar los libros de esa campana todavia.')
print()
print(f'  {"ventas":>7}{"CPA":>11}{"utilidad total":>17}{"margen/$ pauta":>17}')
for n in range(2, 9):
    cpa = GASTO_CAMPANA / n
    util = n * MARGEN_COLM - GASTO_CAMPANA
    ratio = MARGEN_COLM / cpa
    hoy = '  <-- hoy' if n == 3 else ''
    print(f'  {n:>7}{cpa:>11,.0f}{util:>17,.0f}{ratio:>16.2f}x{hoy}')
n_emp = (MARGEN_TRAD / CPA_TRAD) * GASTO_CAMPANA / MARGEN_COLM
print()
print(f'  Para EMPATAR con el tradicional (3,93x) necesitaria {n_emp:.1f} ventas')
print(f'  de 37 conversaciones = {n_emp/CONVERS:.0%} de cierre.')
print()
print('  🔑 CONCLUSION QUE SI AGUANTA: aunque entren 2 o 3 ventas mas, el')
print('     colmena NO llega a empatar con el tradicional. A 5 ventas va en')
print(f'     {MARGEN_COLM/(GASTO_CAMPANA/5):.2f}x contra 3,93x.')
print('     >>> "Rendia menos" se sostiene. Lo que se suaviza es CUANTO menos.')
print()
print('  📌 Pero la decision practica cambia de nombre: no es "el colmena')
print('     fracaso", es "el colmena es un producto de cola larga". Y a un')
print('     producto de cola larga no se le mide la pauta a 5 dias ni se le')
print('     tiran los leads a la basura a los 5 dias. Se le hace seguimiento.')
