#!/usr/bin/env python3
"""
EL PEDIDO AL MAYOR DE 12 UNIDADES A $40.000 (2026-09-07)
=========================================================
Precio confirmado por el dueno: $40.000/unidad, SIN envio (12 unidades).

Sirve para responder tres cosas:
  1. Cuanto deja de verdad, contra un pedido retail
  2. Si $40.000 es un precio sostenible como lista de mayoreo
  3. Cual es el riesgo real (no es el margen, es la reventa)

Fuentes de los numeros base:
  - Costo unitario $34.000 y margen retail $25.900/ud -> seccion 0-AC del archivo madre
  - Fuga de flete $2.800/despacho -> seccion 0-AC (pendiente #82)
  - Margen del finde 6-7 sep: $30.517/pedido sobre 39 pedidos
  - Pauta de la campana vieja sab+dom: $299.286 -> CPA $7.674/pedido
  - Comision de recaudo 3% -> seccion 0-AC (reserva por pedido)
  - Precedente: el pedido mayorista de YOPAL, excluido de toda auditoria
    ($450.000 de producto, recaudo $526.698) -> analizar-sin-mayorista.py
"""

COSTO_UD        = 34_000
PRECIO_RETAIL   = 59_900
PRECIO_MAYOREO  = 40_000
UNIDADES        = 12
FUGA_FLETE      = 2_800     # por despacho, retail
COMISION_RECAUDO= 0.03

# --- retail medido el finde del 6-7 sep ---
MARGEN_PEDIDO   = 30_517    # margen bruto por pedido
CPA_PEDIDO      = 7_674     # pauta campana vieja sab+dom / 39 pedidos
CIERRE          = 0.084     # conversacion -> pedido

# unidades por pedido implicitas en el margen medido
# margen = 25.900*u - 2.800  ->  u = (margen + 2.800) / 25.900
MARGEN_UD_RETAIL = PRECIO_RETAIL - COSTO_UD          # 25.900
UDS_POR_PEDIDO   = (MARGEN_PEDIDO + FUGA_FLETE) / MARGEN_UD_RETAIL

L = '=' * 68
print(L)
print('1. QUE DEJA EL PEDIDO AL MAYOR')
print(L)

margen_ud_may = PRECIO_MAYOREO - COSTO_UD
margen_bruto  = margen_ud_may * UNIDADES
recaudo       = PRECIO_MAYOREO * UNIDADES

print(f'  Precio de venta        : ${PRECIO_MAYOREO:,}/ud  '
      f'(-{(1-PRECIO_MAYOREO/PRECIO_RETAIL)*100:.0f}% sobre retail)')
print(f'  Costo                  : ${COSTO_UD:,}/ud')
print(f'  Margen                 : ${margen_ud_may:,}/ud')
print(f'  Recaudo total          : ${recaudo:,}')
print(f'  MARGEN BRUTO ({UNIDADES} uds)   : ${margen_bruto:,}')
print()
print('  Tres escenarios segun COMO se cobre y de donde vino:')
print()
esc = [
    ('Transferencia + vino de pauta', CPA_PEDIDO, 0),
    ('Contraentrega + vino de pauta', CPA_PEDIDO, recaudo * COMISION_RECAUDO),
    ('Transferencia + cliente repetido / referido', 0, 0),
]
for nombre, cpa, com in esc:
    neto = margen_bruto - cpa - com
    print(f'    {nombre:<44}')
    print(f'      - pauta ${cpa:>7,.0f}  - comision ${com:>8,.0f}  '
          f'=> NETO ${neto:>9,.0f}  (${neto/UNIDADES:>6,.0f}/ud)')
print()

print(L)
print('2. CONTRA RETAIL: LA COMPARACION QUE IMPORTA ES POR UNIDAD')
print(L)

neto_pedido_retail = MARGEN_PEDIDO - CPA_PEDIDO
neto_ud_retail     = neto_pedido_retail / UDS_POR_PEDIDO
neto_ud_may        = (margen_bruto - CPA_PEDIDO) / UNIDADES   # escenario realista

print(f'  Retail : {UDS_POR_PEDIDO:.2f} uds/pedido (implicitas en el margen medido)')
print(f'           margen ${MARGEN_PEDIDO:,}/pedido - CPA ${CPA_PEDIDO:,} '
      f'= ${neto_pedido_retail:,}/pedido')
print(f'           => ${neto_ud_retail:,.0f} NETOS POR UNIDAD')
print()
print(f'  Mayoreo: ${margen_bruto:,} - CPA ${CPA_PEDIDO:,} sobre {UNIDADES} uds')
print(f'           => ${neto_ud_may:,.0f} NETOS POR UNIDAD')
print()
print(f'  >>> Una unidad al mayor vale el {neto_ud_may/neto_ud_retail*100:.0f}% '
      f'de una unidad retail.')
print(f'  >>> Retail rinde {neto_ud_retail/neto_ud_may:.1f}x por unidad.')
print()
costo_op = neto_ud_retail * UNIDADES - (margen_bruto - CPA_PEDIDO)
print(f'  Esas mismas {UNIDADES} unidades por retail habrian dejado '
      f'${neto_ud_retail*UNIDADES:,.0f}')
print(f'  Diferencia: ${costo_op:,.0f}')
print('  ⚠️  PERO eso solo es un costo si el inventario fuera el limite. NO lo es:')
print('      5.000 unidades en consignacion + reposicion en 1 dia (seccion 0-R).')
print('      Sin restriccion de suministro, el mayoreo es margen INCREMENTAL,')
print('      no margen canibalizado. La cifra de arriba es referencia, no perdida.')
print()

print(L)
print('3. LO QUE EL MAYOREO SI GANA: TIEMPO DEL DUENO (EL FRENO REAL)')
print(L)

pedidos_equiv = UNIDADES / UDS_POR_PEDIDO
conv_equiv    = pedidos_equiv / CIERRE
print(f'  Vender {UNIDADES} unidades por retail exige:')
print(f'    ~{pedidos_equiv:.1f} pedidos cerrados a mano')
print(f'    ~{conv_equiv:.0f} conversaciones atendidas (cierre {CIERRE*100:.1f}%)')
print(f'    ~{pedidos_equiv:.0f} guias creadas una por una')
print()
print('  Al mayor: 1 conversacion, 1 guia, 1 direccion.')
print(f'  >>> {conv_equiv:.0f} conversaciones contra 1. El freno #1 del negocio es el')
print('      tiempo de cierre del dueno, y el mayoreo no lo consume.')
print('      Por HORA suya el mayoreo gana; por UNIDAD de inventario pierde.')
print()

print(L)
print('4. $40.000 NO AGUANTA COMO PRECIO DE LISTA')
print(L)

print(f'  {"Precio":>10} {"Margen/ud":>11} {"vs $40.000":>12} {"Dcto retail":>12}')
for p in (40_000, 42_000, 45_000, 48_000):
    m = p - COSTO_UD
    print(f'  ${p:>9,} ${m:>10,} {m/(PRECIO_MAYOREO-COSTO_UD):>11.2f}x '
          f'{(1-p/PRECIO_RETAIL)*100:>11.0f}%')
print()
print('  🔑 El analisis viejo de mayoreo (escalamiento-sin-frenos.py) uso $45.000.')
print(f'     A $45.000 el margen es $11.000/ud = 1,83x el de $40.000.')
print(f'     Bajar de $45.000 a $40.000 borra el 45% del margen del canal.')
print()
print('  Cuanto volumen exige $40.000 para igualar un dia de retail:')
UTILIDAD_DIA = 445_444   # utilidad/dia del finde 6-7 sep ($890.888 / 2)
print(f'    Utilidad retail medida: ${UTILIDAD_DIA:,}/dia')
print(f'    A ${margen_ud_may:,}/ud hacen falta '
      f'{UTILIDAD_DIA/margen_ud_may:.0f} unidades/dia al mayor')
print(f'    Eso es ~{UTILIDAD_DIA/margen_ud_may/(UDS_POR_PEDIDO*13):.1f}x '
      f'el volumen de unidades que mueve el retail hoy.')
print('    >>> El mayoreo a $40.000 NO puede reemplazar el retail. Solo suma.')
print()

print(L)
print('5. EL RIESGO REAL NO ES EL MARGEN: ES LA REVENTA')
print(L)

margen_revendedor = PRECIO_RETAIL - PRECIO_MAYOREO
print(f'  El comprador paga ${PRECIO_MAYOREO:,} y tu lista publica es ${PRECIO_RETAIL:,}.')
print(f'  Le quedan ${margen_revendedor:,}/ud de aire para revender.')
print(f'  Puede vender a $49.900-$54.900 y quedarse con $9.900-$14.900')
print('  SIN pagar un peso de pauta, aprovechando la demanda que TU creaste.')
print()
print('  Tu margen por unidad en ese escenario: $6.000. El de el: hasta $14.900.')
print('  >>> Financias a un competidor con tus propios anuncios.')
print()
print('  📌 LA PREGUNTA QUE DECIDE: DONDE VA A VENDER.')
print('     - En Medellin o Bogota (donde pautas) -> te compite de frente')
print('     - En una ciudad donde no pautas       -> es upside puro, sin choque')
print()
print(f'  💵 Y si es contraentrega: son ${recaudo:,} que el mensajero debe cobrar')
print('     en la puerta. Nadie tiene eso en efectivo en la casa.')
print(f'     Ademas la comision de recaudo del 3% se come '
      f'${recaudo*COMISION_RECAUDO:,.0f} = '
      f'{recaudo*COMISION_RECAUDO/margen_bruto*100:.0f}% del margen del pedido.')
print('     >>> Al mayor se cobra por TRANSFERENCIA o anticipo. No es negociable.')
print()

print(L)
print('6. NO ES EL PRIMERO: YA HUBO UNO Y NADIE LE PUSO PRECIO')
print(L)
YOPAL_PRODUCTO = 450_000
YOPAL_RECAUDO  = 526_698
uds_yopal = YOPAL_PRODUCTO / COSTO_UD
print(f'  Pedido mayorista de YOPAL: ${YOPAL_PRODUCTO:,} de producto '
      f'= ~{uds_yopal:.0f} unidades')
print(f'  Recaudo ${YOPAL_RECAUDO:,} -> ~${YOPAL_RECAUDO/round(uds_yopal):,.0f}/ud '
      '(envio incluido, asi que el neto es algo menor)')
print()
print('  🔑 O sea que ~$40.000 ya se cobro antes, sin decision de precio detras.')
print('     Con dos pedidos al mismo precio, $40.000 ya es un PRECEDENTE.')
print('     Ese es el momento de fijar lista, antes de que se vuelva la norma.')
print()
print('  ⚠️  Y ojo: Yopal quedo EXCLUIDO de todas las auditorias por distorsionar')
print('      los promedios. Este pedido va a hacer lo mismo si se mezcla:')
print(f'      solo, sube las uds/pedido de {UDS_POR_PEDIDO:.2f} a '
      f'{(UDS_POR_PEDIDO*39 + UNIDADES)/40:.2f} y hunde el margen/unidad.')
print('      >>> Registrarlo aparte, marcado MAYOREO (pendiente #81).')
print()

print(L)
print('7. PROPUESTA')
print(L)
print('  1. Cobrar este por TRANSFERENCIA (o anticipo). Evita la comision del 3%')
print(f'     (${recaudo*COMISION_RECAUDO:,.0f}) y el riesgo de rechazo sobre ${recaudo:,}.')
print('  2. Preguntarle DONDE revende. Decide si el canal se cultiva o se limita.')
print('  3. Piso de lista para el proximo: $45.000 (margen $11.000, dcto 25%).')
print('     $40.000 se reserva para pedidos de 50+ unidades, no de 12.')
print('  4. Registrarlo aparte como MAYOREO. No mezclarlo en uds/pedido ni CPA.')
print('  5. No cambiar nada de la pauta por este pedido. Es un evento, no una senal.')
