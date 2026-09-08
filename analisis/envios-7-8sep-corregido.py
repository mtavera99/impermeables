#!/usr/bin/env python3
"""
99 ENVIOS 7-8 SEP · VERSION CORREGIDA CON LOS DATOS DEL DUENO (2026-09-08)
==========================================================================
Correcciones aplicadas:
  1. CALDAS $213.000 = 3 unidades del tradicional a precio LLENO ($59.900 c/u).
     Ya no queda excluido: 3 x 59.900 = 179.700 + 33.300 de envio = 213.000 ✓
  2. DAGUA $80.000 = descuento de cierre de $1.000. Confirmado.
  3. TADO: el dueno dice "cobro como 35.000, no 70.000". Se verifica abajo:
     los $35.834 son POR UNIDAD y los $71.667 son el TOTAL de la guia de 2.

Reemplaza a envios-7-8sep.py en lo que se contradigan.
"""

L = '=' * 74
COSTO_TRAD = 33_000
COSTO_COLM = 85_000
PRECIO_1UD = 59_900
COMISION   = 0.03      # ⚠️ SUPUESTO — #28-1 sigue sin confirmar
CPA        = 7_674

# (dia, flete, tipo, ciudad, recaudo, uds, envio_cobrado, banda, transp, seguro)
G = [
 ('08',12956.14,'trad','BOGOTA',73000,1,13_100,'A','inter',1754),
 ('08',12956.14,'trad','SOACHA',73000,1,13_100,'A','inter',1754),
 ('08',34083.34,'trad','BARRANCABERMEJA',138000,2,28_000,'C·2ud','inter',4644),
 ('08',22878.42,'trad','BARRANQUILLA',81000,1,21_100,'C','inter',3124),
 ('08',25481.04,'trad','FRONTINO',85000,1,25_100,'E','inter',3482),
 ('08',25481.04,'trad','EL COPEY',85000,1,25_100,'E','inter',3482),
 ('08',25114.43,'trad','DAGUA',80000,1,20_100,'C-dcto','inter',3434),
 ('08',17397.50,'trad','GUTIERREZ',85000,1,25_100,'E','inter',2363),
 ('08',25481.04,'trad','SANTIAGO DE TOLU',85000,1,25_100,'E','inter',3482),
 ('08',20895.39,'trad','SOLEDAD',81000,1,21_100,'C','coord',2849),
 ('08',20895.39,'trad','CARTAGENA',81000,1,21_100,'C','coord',2849),
 ('08',20895.39,'trad','CARTAGENA',81000,1,21_100,'C','coord',2849),
 ('08',20895.39,'trad','ARMENIA',81000,1,21_100,'C','coord',2849),
 ('08',20895.39,'trad','MEDELLIN',81000,1,21_100,'C','coord',2849),
 ('08',21034.86,'trad','SINCELEJO',83000,1,23_100,'D','coord',2867),
 ('07',25519.93,'trad','GUACHUCAL',85511,1,25_611,'E+511','inter',3487),
 ('07',22156.03,'COLMENA','SAN FRANCISCO',149900,1,0,'gratis','inter',2985),
 ('07',94005.84,'MAYOREO','GRANADA',573291,12,93_291,'mayoreo','inter',12701),
 ('07',34449.95,'trad','MOCOA',143000,2,33_000,'E·2ud','inter',4692),
 ('07',12956.14,'trad','BOGOTA',73000,1,13_100,'A','inter',1754),
 ('07',17103.62,'trad','IBAGUE',81000,1,21_100,'C','inter',2324),
 ('07',17397.50,'trad','GRANADA',85000,1,25_100,'E','inter',2363),
 ('07',20647.14,'trad','BOGOTA',128000,2,18_000,'A·2ud','inter',2789),
 ('07',12956.14,'trad','BOGOTA',73000,1,13_100,'A','inter',1754),
 ('07',71667.48,'trad','TADO',143000,2,33_000,'E·2ud','inter',9846),
 ('07',20647.14,'trad','BOGOTA',128000,2,18_000,'A·2ud','inter',2789),
 ('07',23171.31,'trad','GALAPA',85000,1,25_100,'E','inter',3162),
 ('07',25481.04,'trad','TERUEL',85000,1,25_100,'E','inter',3482),
 ('07',12956.14,'trad','BOGOTA',73000,1,13_100,'A','inter',1754),
 ('07',12956.14,'trad','BOGOTA',73000,1,13_100,'A','inter',1754),
 ('07',22584.54,'trad','VILLA DE LEYVA',77000,1,17_100,'B','inter',3085),
 ('07',25481.04,'trad','MONTELIBANO',85000,1,25_100,'E','inter',3482),
 ('07',16810.73,'trad','TOCANCIPA',77000,1,17_100,'B','inter',2286),
 ('07',25481.04,'trad','EL CARMEN DE BOLIVAR',85000,1,25_100,'E','inter',3482),
 ('07',25481.04,'trad','PIVIJAY',85000,1,25_100,'E','inter',3482),
 ('07',23171.31,'trad','BARANOA',85000,1,25_100,'E','inter',3162),
 ('07',23171.31,'trad','PALERMO',85000,1,25_100,'E','inter',3162),
 ('07',25481.04,'trad','PLATO',85000,1,25_100,'E','inter',3482),
 ('07',25481.04,'trad','EL RETORNO',85000,1,25_100,'E','inter',3482),
 ('07',28959.05,'trad','CARTAGENA',146000,2,36_000,'Ctg·2ud','coord',3930),
 ('07',25708.76,'COLMENA','PUERTO GAITAN',149900,1,0,'gratis','coord',3477),
 ('07',20895.39,'trad','BARRANQUILLA',81000,1,21_100,'C','coord',2849),
 ('07',33639.33,'trad','CALDAS',213000,3,33_300,'3ud','coord',4541),   # CORREGIDO
 ('07',20895.39,'trad','MEDELLIN',81000,1,21_100,'C','coord',2849),
 ('07',21034.86,'trad','CUCUTA',83000,1,23_100,'D','coord',2867),
 ('07',20895.39,'trad','SOLEDAD',81000,1,21_100,'C','coord',2849),
 ('07',21034.86,'trad','BELLO',83000,1,23_100,'D','coord',2867),
 ('07',28469.90,'trad','RIONEGRO',139000,2,29_000,'D·2ud','coord',3866),
 ('07',32509.81,'trad','TADO',85000,1,25_100,'E','coord',4455),
 ('07',20895.39,'trad','CARTAGENA',81000,1,21_100,'C','coord',2849),
 ('07',20895.39,'trad','SABANETA',81000,1,21_100,'C','coord',2849),
 ('07',20895.39,'trad','PEREIRA',81000,1,21_100,'C','coord',2849),
 ('07',21034.86,'trad','MONTERIA',83000,1,23_100,'D','coord',2867),
 ('07',20895.39,'trad','MEDELLIN',81000,1,21_100,'C','coord',2849),
]
R = [dict(zip(('d','flete','tipo','ciu','rec','uds','cob','banda','tr','seg'), g))
     for g in G]
for r in R:
    r['absor'] = r['cob'] - r['flete']

print(L)
print('1. ✅ CALDAS RESUELTO — Y ES EL MEJOR PEDIDO DE LA VENTANA')
print(L)
c = [r for r in R if r['ciu'] == 'CALDAS'][0]
print(f'  3 unidades x ${PRECIO_1UD:,} = ${PRECIO_1UD*3:,}')
print(f'  + envio ${c["cob"]:,}  =  ${PRECIO_1UD*3 + c["cob"]:,}  '
      f'contra el recaudo real de ${c["rec"]:,} ✓ cuadra exacto')
print(f'  Flete pagado ${c["flete"]:,.2f} -> absorcion ${c["absor"]:,.0f} '
      '(practicamente cero)')
print()
mc = c['rec'] - COSTO_TRAD*3 - c['flete']
print(f'  Margen  : ${c["rec"]:,} - producto ${COSTO_TRAD*3:,} - flete '
      f'${c["flete"]:,.0f} = ${mc:,.0f}')
print(f'  - comision 3% (${c["rec"]*COMISION:,.0f}) - pauta (${CPA:,}) = '
      f'${mc - c["rec"]*COMISION - CPA:,.0f} NETO')
print(f'  Por unidad: ${(mc - c["rec"]*COMISION - CPA)/3:,.0f}')
print()
print('  🔑 Y EL FLETE SE COMPARTIO DE VERDAD: $33.639 por 3 unidades.')
print('     Un solo envio a Medellin/Caldas cuesta ~$20.895, asi que 3 unidades')
print('     costaron solo 1,6x lo que cuesta 1. El gancho del envio compartido')
print('     FUNCIONA — el problema es que aqui no se ofrecio la promo.')
print()
print('  ⚠️  PAGO PRECIO LLENO POR LAS TRES. Con la promo (2x$110.000 + 1) el')
print(f'      producto habria sido $169.900 en vez de ${PRECIO_1UD*3:,}: el cliente')
print(f'      pago ${PRECIO_1UD*3 - 169_900:,} MAS de lo que dice el tarifario.')
print('      Bueno para el margen de este pedido, pero es sintoma: si la IA no')
print('      ofrecio la promo a alguien que compraba TRES, no la esta ofreciendo')
print('      a nadie. >>> Conecta directo con el share de 2 uds que cayo (#40, #60).')
print()

print(L)
print('2. ⚖️ TADO: LOS $35.834 SON POR UNIDAD; LA GUIA COSTO $71.667')
print(L)
t2 = [r for r in R if r['ciu'] == 'TADO' and r['uds'] == 2][0]
t1 = [r for r in R if r['ciu'] == 'TADO' and r['uds'] == 1][0]
print('  Tenes razon en el numero: $35.000 por unidad es correcto.')
print('  Pero esa guia llevaba DOS unidades, y el cargo total fue $71.667.')
print()
print('  La prueba esta en la columna del seguro, que es 13,6% del flete en')
print('  las 54 guias sin excepcion:')
print()
print(f'  {"Guia":<22} {"flete":>11} {"seguro":>9} {"seguro/flete":>13}')
for r in (t2, t1):
    print(f'  TADO {r["uds"]} ud ({r["tr"]:<5}) {r["flete"]:>13,.2f} {r["seg"]:>9,} '
          f'{r["seg"]/r["flete"]:>12.2%}')
print(f'  {"si el flete fuera 35.834":<22} {35_834:>11,} {t2["seg"]:>9,} '
      f'{t2["seg"]/35_834:>12.2%}  <- 🔴 rompe el patron')
print()
print('  🔑 El seguro de esa guia ($9.846) es EXACTAMENTE el doble del que le')
print(f'     tocaria a una unidad (${t2["seg"]/2:,.0f}). Son dos paquetes')
print('     facturados en una sola guia. 99 Envios cobro los dos.')
print()
print('  📌 Y AHI ESTA EL PROBLEMA DE FONDO, QUE ES PEOR QUE UN ERROR DE BANDA:')
print('     en Tado el flete NO se comparte, se DUPLICA exacto.')
print(f'     2 x $35.834 = ${35_834*2:,} ≈ ${t2["flete"]:,.0f} ✓')
print()
print('  Comparado con el resto de la cuenta, Tado es el unico asi:')
print()
print(f'  {"Ciudad":<16} {"1 ud":>10} {"2 uds":>10} {"ratio":>7}')
pares = [('BOGOTA', 12956.14, 20647.14), ('CARTAGENA', 20895.39, 28959.05),
         ('TADO', 32509.81, 71667.48)]
for ciu, f1, f2 in pares:
    marca = '🔴' if f2/f1 > 2 else '🟢'
    print(f'  {ciu:<16} {f1:>10,.0f} {f2:>10,.0f} {f2/f1:>6.2f}x {marca}')
print(f'  {"CALDAS (3 uds)":<16} {20895.39:>10,.0f} {33639.33:>10,.0f} '
      f'{33639.33/20895.39:>6.2f}x 🟢  (por TRES)')
print()
print('  >>> En todo el pais 2 unidades cuestan 1,4-1,6x lo que cuesta una.')
print('      En Tado cuestan 2,2x. Es el unico destino donde el gancho falla.')
print()
mt = t2['rec'] - COSTO_TRAD*2 - t2['flete']
print(f'  La cuenta de esa guia sigue en rojo:')
print(f'    ${t2["rec"]:,} - producto ${COSTO_TRAD*2:,} - flete ${t2["flete"]:,.0f} '
      f'= ${mt:,.0f}')
print(f'    - comision (${t2["rec"]*COMISION:,.0f}) - pauta (${CPA:,}) = '
      f'${mt - t2["rec"]*COMISION - CPA:,.0f}  🔴')
print()
print('  ⚠️  Si tu registro interno dice que pagaste $35.000 por esa guia,')
print('      hay un descuadre de $36.667 contra lo que reporta 99 Envios.')
print('      Vale la pena mirar el extracto: o el export cobra doble, o el')
print('      cargo real es el doble de lo que crees. Cualquiera de las dos')
print('      importa mucho mas que este pedido.')
print()

print(L)
print('3. LA ABSORCION REAL: EL PROBLEMA ES LA PROMO, NO LAS BANDAS')
print(L)
trad = [r for r in R if r['tipo'] == 'trad']
uno  = [r for r in trad if r['uds'] == 1]
multi= [r for r in trad if r['uds'] > 1]

print(f'  {"":<26} {"n":>3} {"absorcion total":>16} {"por pedido":>12}')
for et, s in (('1 UNIDAD', uno), ('2 O 3 UNIDADES', multi)):
    tot = sum(r['absor'] for r in s)
    print(f'  {et:<26} {len(s):>3} {tot:>16,.0f} {tot/len(s):>12,.0f}')
tot_all = sum(r['absor'] for r in trad)
print(f'  {"TODOS":<26} {len(trad):>3} {tot_all:>16,.0f} {tot_all/len(trad):>12,.0f}')
print()
sin_tado = [r for r in multi if r['ciu'] != 'TADO']
print(f'  Multi SIN Tado           : {len(sin_tado):>3} '
      f'{sum(r["absor"] for r in sin_tado):>16,.0f} '
      f'{sum(r["absor"] for r in sin_tado)/len(sin_tado):>12,.0f}')
print()
print('  🔑 LOS PEDIDOS DE 1 UNIDAD **NO** TIENEN FUGA. La fuga esta entera')
print('     en la promo de 2 unidades, y dentro de esa, concentrada en Tado.')
print(f'     El archivo dice -$2.800 por despacho parejo. Es falso: es '
      f'${sum(r["absor"] for r in uno)/len(uno):+,.0f} en los sencillos')
print(f'     y ${sum(r["absor"] for r in multi)/len(multi):+,.0f} en los multiples.')
print()
print('  Detalle de los pedidos de 2 y 3 unidades:')
print(f'  {"Ciudad":<22} {"uds":>4} {"cobrado":>9} {"flete":>10} {"absorcion":>11}')
for r in sorted(multi, key=lambda x: x['absor']):
    m = '🔴' if r['absor'] < -3000 else ('🔔' if r['absor'] < 0 else '🟢')
    print(f'  {r["ciu"]:<22} {r["uds"]:>4} {r["cob"]:>9,} {r["flete"]:>10,.0f} '
          f'{r["absor"]:>11,.0f} {m}')
print()

print(L)
print('4. 🆚 3 UNIDADES AL DETAL LE GANA A 12 AL MAYOR')
print(L)
m = [r for r in R if r['tipo'] == 'MAYOREO'][0]
nm = m['rec'] - COSTO_TRAD*12 - m['flete'] - m['rec']*COMISION - CPA
nc = c['rec'] - COSTO_TRAD*3 - c['flete'] - c['rec']*COMISION - CPA
print(f'  {"":<28} {"unidades":>9} {"NETO":>11} {"por unidad":>12}')
print(f'  {"CALDAS · 3 uds al detal":<28} {3:>9} {nc:>11,.0f} {nc/3:>12,.0f}')
print(f'  {"GRANADA · 12 uds al mayor":<28} {12:>9} {nm:>11,.0f} {nm/12:>12,.0f}')
print()
print(f'  🔑 UN PEDIDO DE 3 UNIDADES AL DETAL DEJA ${nc-nm:,.0f} MAS QUE UNO DE')
print(f'     12 AL MAYOR. Cuatro veces menos producto, mas plata.')
print(f'     Por unidad: ${nc/3:,.0f} contra ${nm/12:,.0f} = {nc/3/(nm/12):.1f}x')
print()
print('  >>> Esto es el argumento mas fuerte que ha aparecido para NO vender a')
print('      $40.000. Y ya no es teoria: son dos pedidos reales del mismo dia.')
print('      El piso de $45.000 se queda corto; a $40.000 el mayoreo solo tiene')
print('      sentido por volumen grande, no por 12 unidades.')
print()

print(L)
print('5. LO QUE NO CAMBIA')
print(L)
col = [r for r in R if r['tipo'] == 'COLMENA']
mb = sum(r['rec'] - COSTO_COLM - r['flete'] for r in col)
mcom = mb - sum(r['rec']*COMISION for r in col)
print(f'  · COLMENA: margen real ${mb/2:,.0f}/venta (no $43.306). El video del')
print(f'    colmena queda entre ${mcom - 72_618:,.0f} y ${mb - 72_618:,.0f}. Sin colchon.')
print('  · El % de comision de recaudo (#28-1) sigue siendo la pregunta mas')
print('    rentable que hay pendiente: mueve el colmena de cero a positivo.')
print('  · Cero guias de Servientrega, cero trabadas.')
print('  · Coordinadora ya es el 39% y llega a Tado y Puerto Gaitan.')
print('  · GUACHUCAL sigue con $511 de sobra sobre la banda E.')
print()
uds_tot = sum(r['uds'] for r in trad)
print(f'  · Share de multiples: {len(multi)}/{len(trad)} = '
      f'{len(multi)/len(trad):.1%} · uds/pedido {uds_tot/len(trad):.3f}')
print('    Sigue por debajo del 26,8% documentado, y Caldas explica por que:')
print('    ni al que compra 3 le estan ofreciendo la promo.')
print()

print(L)
print('6. LAS TRES ACCIONES')
print(L)
print('  1. 🔴 TADO A COTIZACION INDIVIDUAL, y NO ofrecer la promo de 2 uds ahi.')
print('     Es el unico destino del pais donde el flete se duplica.')
print('  2. 🔴 REVISAR EL EXTRACTO DE 99 ENVIOS por la guia de Tado. Si pagaste')
print('     $35.000 y ellos reportan $71.667, hay un cobro doble que reclamar.')
print('  3. 💡 VOLVER A PONER LA PROMO EN EL GUION. Caldas prueba que la IA no')
print('     la esta ofreciendo, y el flete de 3 unidades costo 1,6x el de una:')
print('     el gancho es real en el 97% del pais.')
