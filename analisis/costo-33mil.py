#!/usr/bin/env python3
"""
EL COSTO BAJO DE $34.000 A $33.000 (2026-09-07)
================================================
Dato del dueno: consiguio el impermeable tradicional a $33.000.
Parece $1.000. Recalcula TODO el modelo de margen porque ese numero
esta metido en cada cuenta del archivo.

Base: seccion 0-AC (modelo de margen), medicion del finde 6-7 sep,
      y analisis/mayoreo-40mil.py.
"""

L = '=' * 70

COSTO_VIEJO   = 34_000
COSTO_NUEVO   = 33_000
AHORRO        = COSTO_VIEJO - COSTO_NUEVO
PRECIO_RETAIL = 59_900
PRECIO_MAYOR  = 40_000
FUGA_FLETE    = 2_800
CIERRE        = 0.084

# --- medicion del finde 6-7 sep ---
PEDIDOS_FINDE = 39
MARGEN_PEDIDO_VIEJO = 30_517
PAUTA_FINDE   = 299_286
CPA_PEDIDO    = 7_674

MARGEN_UD_VIEJO = PRECIO_RETAIL - COSTO_VIEJO   # 25.900
MARGEN_UD_NUEVO = PRECIO_RETAIL - COSTO_NUEVO   # 26.900

# unidades/pedido implicitas en el margen medido
UDS_PEDIDO = (MARGEN_PEDIDO_VIEJO + FUGA_FLETE) / MARGEN_UD_VIEJO

print(L)
print('1. EL MODELO DE MARGEN CAMBIA DE COEFICIENTE')
print(L)
print(f'  ANTES : Margen = ${MARGEN_UD_VIEJO:,} x unidades - ${FUGA_FLETE:,} x despachos')
print(f'  AHORA : Margen = ${MARGEN_UD_NUEVO:,} x unidades - ${FUGA_FLETE:,} x despachos')
print()
print(f'  Costo ${COSTO_VIEJO:,} -> ${COSTO_NUEVO:,} = -{AHORRO/COSTO_VIEJO*100:.1f}% de costo')
print(f'  Margen por unidad: ${MARGEN_UD_VIEJO:,} -> ${MARGEN_UD_NUEVO:,} '
      f'= +{AHORRO/MARGEN_UD_VIEJO*100:.1f}%')
print()
print('  🔑 Bajar el costo 2,9% subio el margen 3,9%. Siempre es asi: el ahorro')
print('     de costo entra COMPLETO al margen, sin pagar pauta ni flete.')
print('     Es el peso mas limpio del negocio.')
print()

print(L)
print('2. POR PEDIDO Y POR DIA')
print(L)
margen_pedido_nuevo = MARGEN_UD_NUEVO * UDS_PEDIDO - FUGA_FLETE
util_vieja = MARGEN_PEDIDO_VIEJO - CPA_PEDIDO
util_nueva = margen_pedido_nuevo - CPA_PEDIDO

print(f'  ({UDS_PEDIDO:.3f} unidades por pedido, medidas el finde 6-7 sep)')
print()
print(f'  {"":<26} {"Antes":>12} {"Ahora":>12} {"Cambio":>9}')
print(f'  {"Margen bruto/pedido":<26} ${MARGEN_PEDIDO_VIEJO:>11,} '
      f'${margen_pedido_nuevo:>11,.0f} {margen_pedido_nuevo/MARGEN_PEDIDO_VIEJO-1:>8.1%}')
print(f'  {"CPA/pedido":<26} ${CPA_PEDIDO:>11,} ${CPA_PEDIDO:>11,} {"=":>9}')
print(f'  {"UTILIDAD/pedido":<26} ${util_vieja:>11,} ${util_nueva:>11,.0f} '
      f'{util_nueva/util_vieja-1:>8.1%}')
print()

uds_dia = PEDIDOS_FINDE / 2 * UDS_PEDIDO
print(f'  Volumen medido: {PEDIDOS_FINDE/2:.1f} pedidos/dia = {uds_dia:.1f} unidades/dia')
print(f'  Ahorro: {uds_dia:.1f} x ${AHORRO:,} = ${uds_dia*AHORRO:>9,.0f}/dia')
print(f'                            = ${uds_dia*AHORRO*30:>9,.0f}/mes')
print()
margen_finde_v = MARGEN_UD_VIEJO*UDS_PEDIDO*PEDIDOS_FINDE - FUGA_FLETE*PEDIDOS_FINDE
margen_finde_n = MARGEN_UD_NUEVO*UDS_PEDIDO*PEDIDOS_FINDE - FUGA_FLETE*PEDIDOS_FINDE
print(f'  El finde 6-7 sep, recalculado:')
print(f'    Margen  ${margen_finde_v:,.0f} -> ${margen_finde_n:,.0f} '
      f'(+${margen_finde_n-margen_finde_v:,.0f})')
print(f'    Utilidad ${margen_finde_v-PAUTA_FINDE:,.0f} -> '
      f'${margen_finde_n-PAUTA_FINDE:,.0f}')
print()

print(L)
print('3. CONTRA LAS OTRAS FUGAS DEL NEGOCIO')
print(L)
ahorro_mes = uds_dia * AHORRO * 30
fugas = [
    ('Fuga de flete ($2.800 x despacho)', 1_848_000),
    ('Presupuesto sin gastar (viernes)',  1_368_780),
    ('>>> AHORRO DE COSTO ($1.000 x ud)', ahorro_mes),
    ('Meta One Expert',                     359_900),
]
for n, v in sorted(fugas, key=lambda x: -x[1]):
    print(f'  {n:<38} ${v:>11,.0f}/mes  {v/359_900:>5.1f}x')
print()
print(f'  🔑 Recupera el {ahorro_mes/1_848_000*100:.0f}% de la fuga de flete, '
      'y no hubo que tocar')
print('     al cliente, ni el precio, ni la pauta. Fue una negociacion.')
print()

print(L)
print('4. DONDE MAS PEGA: EL MAYOREO (y no era obvio)')
print(L)
may_viejo = PRECIO_MAYOR - COSTO_VIEJO
may_nuevo = PRECIO_MAYOR - COSTO_NUEVO
print(f'  {"":<22} {"Antes":>10} {"Ahora":>10} {"Cambio":>9}')
print(f'  {"Retail /ud":<22} ${MARGEN_UD_VIEJO:>9,} ${MARGEN_UD_NUEVO:>9,} '
      f'{MARGEN_UD_NUEVO/MARGEN_UD_VIEJO-1:>8.1%}')
print(f'  {"Mayoreo $40.000 /ud":<22} ${may_viejo:>9,} ${may_nuevo:>9,} '
      f'{may_nuevo/may_viejo-1:>8.1%}')
print()
print(f'  🔑 El MISMO $1.000 vale +3,9% en retail y +{may_nuevo/may_viejo-1:.1%} '
      'en mayoreo.')
print(f'     {(may_nuevo/may_viejo-1)/(MARGEN_UD_NUEVO/MARGEN_UD_VIEJO-1):.1f}x '
      'mas de impacto relativo, porque ahi el margen era delgado.')
print()
print('  El pedido de 12 unidades, recalculado:')
for c, m in ((COSTO_VIEJO, may_viejo), (COSTO_NUEVO, may_nuevo)):
    bruto = m * 12
    print(f'    costo ${c:,}: bruto ${bruto:>7,} - pauta ${CPA_PEDIDO:,} '
          f'= NETO ${bruto-CPA_PEDIDO:>7,}')
print(f'    >>> +${(may_nuevo-may_viejo)*12:,} en el mismo pedido, '
      'con el mismo precio y el mismo cliente.')
print()
print('  ⚠️  PERO NO CAMBIA LA CONCLUSION DE mayoreo-40mil.py:')
neto_ud_retail = util_nueva / UDS_PEDIDO
neto_ud_mayor  = (may_nuevo*12 - CPA_PEDIDO) / 12
print(f'      Retail  ${neto_ud_retail:,.0f} netos/unidad')
print(f'      Mayoreo ${neto_ud_mayor:,.0f} netos/unidad  '
      f'-> retail sigue rindiendo {neto_ud_retail/neto_ud_mayor:.1f}x')
print(f'      El piso de lista sigue en $45.000 (ahi el margen ya es '
      f'${45_000-COSTO_NUEVO:,}/ud).')
print()

print(L)
print('5. LOS UMBRALES QUE HAY QUE MOVER EN EL ARCHIVO')
print(L)
lim_v = (MARGEN_UD_VIEJO*1.212 - FUGA_FLETE) * CIERRE
lim_n = (MARGEN_UD_NUEVO*1.212 - FUGA_FLETE) * CIERRE
eq_v  = MARGEN_UD_VIEJO - FUGA_FLETE/1.212
eq_n  = MARGEN_UD_NUEVO - FUGA_FLETE/1.212
print(f'  {"Umbral":<38} {"Antes":>10} {"Ahora":>10}')
print(f'  {"Limite $/conversacion (utilidad=0)":<38} ${lim_v:>9,.0f} ${lim_n:>9,.0f}')
print(f'  {"Equilibrio de CPA por unidad":<38} ${eq_v:>9,.0f} ${eq_n:>9,.0f}')
print(f'  {"Margen 1 unidad":<38} ${MARGEN_UD_VIEJO-FUGA_FLETE:>9,} '
      f'${MARGEN_UD_NUEVO-FUGA_FLETE:>9,}')
print(f'  {"Margen 2 unidades":<38} ${MARGEN_UD_VIEJO*2-FUGA_FLETE:>9,} '
      f'${MARGEN_UD_NUEVO*2-FUGA_FLETE:>9,}')
print(f'  {"Margen 3 unidades":<38} ${MARGEN_UD_VIEJO*3-FUGA_FLETE:>9,} '
      f'${MARGEN_UD_NUEVO*3-FUGA_FLETE:>9,}')
print(f'  {"2 unidades EN BODEGA":<38} ${MARGEN_UD_VIEJO*2:>9,} '
      f'${MARGEN_UD_NUEVO*2:>9,}')
print()
r1, r2 = MARGEN_UD_NUEVO-FUGA_FLETE, MARGEN_UD_NUEVO*2-FUGA_FLETE
v1, v2 = MARGEN_UD_VIEJO-FUGA_FLETE, MARGEN_UD_VIEJO*2-FUGA_FLETE
print(f'  📌 El pedido de 2 unidades sigue valiendo ~2,1x el de 1 '
      f'({v2/v1:.3f}x -> {r2/r1:.3f}x).')
print('     El ratio NO se movio: el ahorro entra a los dos lados. El gancho')
print('     del envio compartido vale lo mismo que antes, ni mas ni menos.')
print()
print(f'  🟢 Y sube el colchon: el CPA puede llegar a ${lim_n:,.0f}/conversacion')
print(f'     antes de que la utilidad sea cero (era ${lim_v:,.0f}).')
print()

print(L)
print('6. LO QUE HAY QUE PREGUNTAR ANTES DE METERLO EN EL MODELO')
print(L)
print('  1. ¿ES PERMANENTE O POR ESTE LOTE? Si esta condicionado a volumen,')
print('     el modelo no se puede cambiar todavia: se anota como excepcion.')
print()
print('  2. ¿APLICA A LAS 5.000 EN CONSIGNACION? No estan pagadas todavia.')
print('     Si el precio nuevo aplica a lo que aun no se ha liquidado, el')
print(f'     beneficio es retroactivo sobre el inventario en mano.')
print()
print('  3. ¿BAJO TAMBIEN EL COLMENA ($85.000)? Si es el mismo proveedor,')
print('     una baja proporcional (2,9%) seria ~$2.500/ud, y el colmena')
print('     esta justo en el filo de su equilibrio. Ahi vale doble.')
print()
print('  4. 🔴 ¿CAMBIO ALGO DEL PRODUCTO? Es la pregunta incomoda.')
print('     Un -2,9% puede ser negociacion por volumen (perfecto) o puede ser')
print('     material mas delgado, costuras, cremallera. Si es lo segundo,')
print('     el ahorro se paga con RECHAZO, y una devolucion cuesta la prima')
print('     mas el flete mas la reputacion.')
print(f'     >>> Vigilar la tasa de rechazo de las proximas 2 semanas contra')
print('         el 15,3% historico. Si sube, el $1.000 sale carisimo.')
print()
print('  📌 Y NO bajar el precio de venta. El ahorro se queda como margen.')
print('     El archivo ya decidio no subir a $64.900; tampoco hay razon para')
print('     bajar de $59.900 cuando la demanda no es el problema.')
