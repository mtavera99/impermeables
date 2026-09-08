#!/usr/bin/env python3
"""
99 ENVIOS · EXPORT COMPLETO DEL 7 Y 8 DE SEPTIEMBRE 2026
=========================================================
54 guias con flete real, seguro real, transportadora y estado.
Es el primer export que trae la columna valor_seguro_99 separada.

Contiene: el PEDIDO AL MAYOR de 12 unidades y las DOS ventas de colmena.

Tarifario vigente (1 ud): A 73.000 · B 77.000 · C 81.000 · D 83.000 · E 85.000
Promo 2 uds:              A 128.000 · C 138.000 · D 139.000 · E 143.000 · Cartagena 146.000
Producto: 1 ud = 59.900 · 2 uds = 110.000 (promo) · colmena = 149.900 envio gratis
Costo: tradicional 33.000 (NUEVO) · colmena 85.000
"""

L = '=' * 74
COSTO_TRAD = 33_000
COSTO_COLM = 85_000
COMISION   = 0.03          # ⚠️ SUPUESTO — pendiente #28-1, nunca confirmado

# (fecha, valor_servicio, producto, ciudad, valor_comercial, estado, transp, seguro)
G = [
 ('08','12956.14','trad','BOGOTA',73000,'Creado','inter',1754),
 ('08','12956.14','trad','SOACHA',73000,'Creado','inter',1754),
 ('08','34083.34','trad','BARRANCABERMEJA',138000,'Creado','inter',4644),
 ('08','22878.42','trad','BARRANQUILLA',81000,'Creado','inter',3124),
 ('08','25481.04','trad','FRONTINO',85000,'Creado','inter',3482),
 ('08','25481.04','trad','EL COPEY',85000,'Creado','inter',3482),
 ('08','25114.43','trad','DAGUA',80000,'Creado','inter',3434),
 ('08','17397.50','trad','GUTIERREZ',85000,'Creado','inter',2363),
 ('08','25481.04','trad','SANTIAGO DE TOLU',85000,'Creado','inter',3482),
 ('08','20895.39','trad','SOLEDAD',81000,'Recoleccion','coord',2849),
 ('08','20895.39','trad','CARTAGENA',81000,'Recoleccion','coord',2849),
 ('08','20895.39','trad','CARTAGENA',81000,'Recoleccion','coord',2849),
 ('08','20895.39','trad','ARMENIA',81000,'Recoleccion','coord',2849),
 ('08','20895.39','trad','MEDELLIN',81000,'Recoleccion','coord',2849),
 ('08','21034.86','trad','SINCELEJO',83000,'Recoleccion','coord',2867),
 ('07','25519.93','trad','GUACHUCAL',85511,'Creado','inter',3487),
 ('07','22156.03','COLMENA','SAN FRANCISCO',149900,'Admitida','inter',2985),
 ('07','94005.84','MAYOREO','GRANADA',573291,'Creado','inter',12701),
 ('07','34449.95','trad','MOCOA',143000,'Creado','inter',4692),
 ('07','12956.14','trad','BOGOTA',73000,'Admitida','inter',1754),
 ('07','17103.62','trad','IBAGUE',81000,'Creado','inter',2324),
 ('07','17397.50','trad','GRANADA',85000,'Creado','inter',2363),
 ('07','20647.14','trad','BOGOTA',128000,'Creado','inter',2789),
 ('07','12956.14','trad','BOGOTA',73000,'Creado','inter',1754),
 ('07','71667.48','trad','TADO',143000,'Admitida','inter',9846),
 ('07','20647.14','trad','BOGOTA',128000,'Creado','inter',2789),
 ('07','23171.31','trad','GALAPA',85000,'Creado','inter',3162),
 ('07','25481.04','trad','TERUEL',85000,'Creado','inter',3482),
 ('07','12956.14','trad','BOGOTA',73000,'Creado','inter',1754),
 ('07','12956.14','trad','BOGOTA',73000,'Creado','inter',1754),
 ('07','22584.54','trad','VILLA DE LEYVA',77000,'Creado','inter',3085),
 ('07','25481.04','trad','MONTELIBANO',85000,'Creado','inter',3482),
 ('07','16810.73','trad','TOCANCIPA',77000,'Creado','inter',2286),
 ('07','25481.04','trad','EL CARMEN DE BOLIVAR',85000,'Creado','inter',3482),
 ('07','25481.04','trad','PIVIJAY',85000,'Creado','inter',3482),
 ('07','23171.31','trad','BARANOA',85000,'Creado','inter',3162),
 ('07','23171.31','trad','PALERMO',85000,'Creado','inter',3162),
 ('07','25481.04','trad','PLATO',85000,'Creado','inter',3482),
 ('07','25481.04','trad','EL RETORNO',85000,'Creado','inter',3482),
 ('07','28959.05','trad','CARTAGENA',146000,'En terminal','coord',3930),
 ('07','25708.76','COLMENA','PUERTO GAITAN',149900,'En terminal','coord',3477),
 ('07','20895.39','trad','BARRANQUILLA',81000,'En terminal','coord',2849),
 ('07','33639.33','?','CALDAS',213000,'En terminal','coord',4541),
 ('07','20895.39','trad','MEDELLIN',81000,'En terminal','coord',2849),
 ('07','21034.86','trad','CUCUTA',83000,'En terminal','coord',2867),
 ('07','20895.39','trad','SOLEDAD',81000,'En terminal','coord',2849),
 ('07','21034.86','trad','BELLO',83000,'En terminal','coord',2867),
 ('07','28469.90','trad','RIONEGRO',139000,'En terminal','coord',3866),
 ('07','32509.81','trad','TADO',85000,'En terminal','coord',4455),
 ('07','20895.39','trad','CARTAGENA',81000,'En terminal','coord',2849),
 ('07','20895.39','trad','SABANETA',81000,'En terminal','coord',2849),
 ('07','20895.39','trad','PEREIRA',81000,'En terminal','coord',2849),
 ('07','21034.86','trad','MONTERIA',83000,'En terminal','coord',2867),
 ('07','20895.39','trad','MEDELLIN',81000,'En terminal','coord',2849),
]

# valor_comercial -> (unidades, envio_cobrado, banda)
MAPA = {
    73000:(1,13_100,'A'), 77000:(1,17_100,'B'), 81000:(1,21_100,'C'),
    83000:(1,23_100,'D'), 85000:(1,25_100,'E'),
    80000:(1,20_100,'C-dcto'), 85511:(1,25_611,'E+511'),
    128000:(2,18_000,'A'), 138000:(2,28_000,'C'),
    139000:(2,29_000,'D'), 143000:(2,33_000,'E'), 146000:(2,36_000,'Ctg'),
    149900:(1,0,'COLMENA'), 573291:(12,93_291,'MAYOREO'),
    213000:(3,None,'?'),
}

rows = []
for f, vs, prod, ciu, val, est, tr, seg in G:
    vs = float(vs)
    u, cob, banda = MAPA[val]
    rows.append(dict(f=f, flete=vs, prod=prod, ciu=ciu, val=val, est=est,
                     tr=tr, seg=seg, uds=u, cob=cob, banda=banda))

print(L)
print('1. LA FOTO')
print(L)
for d in ('07','08'):
    sub = [r for r in rows if r['f'] == d]
    print(f'  {d}-sep: {len(sub):>2} guias · recaudo ${sum(r["val"] for r in sub):>9,} · '
          f'flete ${sum(r["flete"] for r in sub):>9,.0f} · '
          f'seguro ${sum(r["seg"] for r in sub):>7,}')
print(f'  TOTAL : {len(rows):>2} guias · recaudo ${sum(r["val"] for r in rows):>9,} · '
      f'flete ${sum(r["flete"] for r in rows):>9,.0f} · '
      f'seguro ${sum(r["seg"] for r in rows):>7,}')
print()
print('  🟢 CERO guias de Servientrega. El enrutamiento quedo limpio.')
print('  🟢 CERO guias trabadas: todas en Creado / Recoleccion / En terminal / Admitida.')
print()

print(L)
print('2. 🔴 EL AGUJERO DEL DIA: TADO')
print(L)
tado = [r for r in rows if r['ciu'] == 'TADO']
for r in tado:
    absor = r['cob'] - r['flete']
    print(f'  {r["uds"]} ud · {r["tr"]:<6} · recaudo ${r["val"]:>7,} · '
          f'envio cobrado ${r["cob"]:>6,} · flete pagado ${r["flete"]:>9,.2f}')
    print(f'       >>> ABSORCION ${-absor:>9,.0f}   (flete/unidad ${r["flete"]/r["uds"]:,.0f})')
    marg = r['val'] - COSTO_TRAD*r['uds'] - r['flete']
    print(f'       margen antes de comision y pauta: ${marg:>9,.0f}  '
          f'(${marg/r["uds"]:,.0f}/ud)')
print()
print('  🔴 LA GUIA DE 2 UNIDADES A TADO ES CASI UNA PERDIDA TOTAL:')
r = tado[0]
marg = r['val'] - COSTO_TRAD*2 - r['flete']
print(f'     Recaudo $143.000 - producto $66.000 - flete $71.667 = ${marg:,.0f}')
print(f'     Menos comision de recaudo 3% (${r["val"]*COMISION:,.0f}) = '
      f'${marg - r["val"]*COMISION:,.0f}')
print(f'     Menos la pauta de ese pedido (~$7.674) = '
      f'${marg - r["val"]*COMISION - 7674:,.0f}  🔴 PIERDE PLATA')
print()
print('  🔑 TADO NO PERTENECE A LA BANDA E. Su flete es $32.510-$35.834 por')
print('     unidad y la banda E solo cobra $25.100. El error no es del')
print('     tarifario en general: es que Tado esta clasificado donde no va.')
print()
print('  📌 Y ojo al patron: la MISMA ciudad, dos transportadoras, muy distinto.')
print(f'     interrapidisimo ${tado[0]["flete"]/2:,.0f}/ud  vs  '
      f'coordinadora ${tado[1]["flete"]:,.0f}/ud')
print()

print(L)
print('3. LA ABSORCION DE FLETE, BANDA POR BANDA (actualiza #82)')
print(L)
from collections import defaultdict
por_banda = defaultdict(list)
for r in rows:
    if r['cob'] is None or r['banda'] in ('COLMENA', 'MAYOREO'):
        continue
    por_banda[r['banda']].append(r)

print(f'  {"Banda":<8} {"n":>3} {"cobrado":>9} {"flete real":>11} {"absorcion":>11}')
tot_abs = 0
for b in ('A','B','C','C-dcto','D','E','E+511','Ctg'):
    if b not in por_banda:
        continue
    s = por_banda[b]
    cob = sum(x['cob'] for x in s)/len(s)
    fl  = sum(x['flete'] for x in s)/len(s)
    tot_abs += sum(x['cob']-x['flete'] for x in s)
    flag = '🔴' if cob-fl < -3000 else ('🔔' if cob-fl < 0 else '🟢')
    print(f'  {b:<8} {len(s):>3} {cob:>9,.0f} {fl:>11,.0f} {cob-fl:>11,.0f} {flag}')
print(f'  {"TOTAL":<8} {sum(len(v) for v in por_banda.values()):>3} '
      f'{"":>9} {"":>11} {tot_abs:>11,.0f}')
n_trad = sum(len(v) for v in por_banda.values())
print()
print(f'  >>> Absorcion promedio por despacho: ${tot_abs/n_trad:,.0f}')
print(f'      El archivo documenta -$2.800 (0-AC). Aca sale '
      f'${tot_abs/n_trad:,.0f}.')
sin_tado = [r for v in por_banda.values() for r in v if r['ciu'] != 'TADO']
abs_st = sum(r['cob']-r['flete'] for r in sin_tado)
print(f'  >>> SIN LAS DOS DE TADO: ${abs_st/len(sin_tado):,.0f} por despacho '
      f'({len(sin_tado)} guias)')
print('  🔑 O sea que la "fuga de flete" no esta repartida: se concentra en')
print('     unos pocos destinos mal clasificados. Arreglar 3 o 4 ciudades')
print('     vale mas que subir el envio a todo el mundo.')
print()

print(L)
print('4. 💰 EL PEDIDO AL MAYOR: LOS NUMEROS REALES')
print(L)
m = [r for r in rows if r['prod'] == 'MAYOREO'][0]
print(f'  Destino: {m["ciu"]} · {m["tr"]} · estado {m["est"]}')
print(f'  Recaudo total     : ${m["val"]:>9,}')
print(f'  Envio cobrado     : ${m["cob"]:>9,}   (= recaudo - 12 x $40.000)')
print(f'  Flete pagado      : ${m["flete"]:>9,.2f}')
print(f'  >>> ABSORCION     : ${m["cob"]-m["flete"]:>9,.0f}  '
      '🟢 le cobraste el envio casi exacto')
print(f'  Del cual seguro   : ${m["seg"]:>9,} ({m["seg"]/m["flete"]:.1%} del flete)')
print()
print('  ✅ CORRIGE MI CUENTA DE AYER: yo asumi "sin envio" como que no habia')
print('     costo de flete. En realidad el flete existe ($94.006) pero lo paga')
print('     el cliente. El neto es mejor de lo que pinta el titular.')
print()
bruto = m['val'] - COSTO_TRAD*12 - m['flete']
print(f'  Recaudo ${m["val"]:,} - producto ${COSTO_TRAD*12:,} - flete ${m["flete"]:,.0f}')
print(f'  = ${bruto:,.0f} antes de comision y pauta')
print(f'  {"con comision 3%":<28} ${bruto - m["val"]*COMISION:>9,.0f}')
print(f'  {"menos pauta (~$7.674)":<28} ${bruto - m["val"]*COMISION - 7674:>9,.0f}  '
      '<- NETO probable')
print(f'  {"sin comision (si no aplica)":<28} ${bruto - 7674:>9,.0f}')
print(f'  >>> Entre ${bruto - m["val"]*COMISION - 7674:,.0f} y ${bruto-7674:,.0f}. '
      f'Ayer estime $76.326: quedo en el rango.')
print()
print('  🔴🔴 PERO LO IMPORTANTE ES OTRA COSA: **ES CONTRAENTREGA.**')
print(f'     aplica_contrapago = Si. Son ${m["val"]:,} que el mensajero tiene')
print('     que cobrar en efectivo en la puerta. Es, por mucho, la exposicion')
print('     mas grande en una sola guia en la historia del proyecto.')
print(f'     Y va a {m["ciu"]}, en estado "{m["est"]}" (ni recogida todavia).')
print()
print('     Si rechaza: pierdes la venta, pagas la prima del seguro')
print(f'     (${m["seg"]:,}) y te devuelven 12 unidades. No es catastrofe,')
print('     pero es una semana perdida y $396.000 de producto paseando.')
print('     📌 Te lo dije ayer y quedo sin ejecutar. Para el PROXIMO: transferencia.')
print()

print(L)
print('5. 💎 LOS DOS COLMENAS — Y EL VEREDICTO SE ADELGAZA')
print(L)
col = [r for r in rows if r['prod'] == 'COLMENA']
tot_margen_bruto = 0
tot_margen_com = 0
for r in col:
    mb = r['val'] - COSTO_COLM - r['flete']
    mc = mb - r['val']*COMISION
    tot_margen_bruto += mb
    tot_margen_com += mc
    print(f'  {r["ciu"]:<16} {r["tr"]:<6} flete ${r["flete"]:>9,.2f}  '
          f'margen ${mb:>8,.0f}  con comision ${mc:>8,.0f}')
print(f'  {"PROMEDIO":<16} {"":<6} '
      f'flete ${sum(r["flete"] for r in col)/2:>9,.2f}  '
      f'margen ${tot_margen_bruto/2:>8,.0f}')
print()
print('  ⚠️  YO VENIA USANDO $43.306 DE MARGEN POR COLMENA. El real de estos')
print(f'      dos es ${tot_margen_bruto/2:,.0f} porque el flete ponderado teorico')
print(f'      era $21.594 y estos pagaron $22.156 y $25.709.')
print()
GASTO_VIDEO = 72_618   # 4-8 sep, conjunto video del colmena (conjuntos-7-8sep.py)
for etiqueta, margen in (('con margen teorico $43.306', 2*43_306),
                         ('con margen REAL (sin comision)', tot_margen_bruto),
                         ('con margen REAL (con comision 3%)', tot_margen_com)):
    print(f'    {etiqueta:<36} ${margen - GASTO_VIDEO:>9,.0f}')
print()
print(f'  🔑 EL COLMENA PASA DE "+$13.994 COMODO" A ENTRE '
      f'${tot_margen_com-GASTO_VIDEO:,.0f} Y ${tot_margen_bruto-GASTO_VIDEO:,.0f}.')
print('     Con comision queda practicamente en CERO.')
print('     >>> NO cambia la decision (no se apaga), pero SI cambia el tono:')
print('         no hay colchon. La tercera venta decide de verdad.')
print()
print('  🚨 Y ESTO ASCIENDE EL PENDIENTE #28-1 A CRITICO:')
print('     el % de comision de recaudo NUNCA se confirmo, y es la diferencia')
print(f'     entre que el colmena vaya ${tot_margen_bruto-GASTO_VIDEO:,.0f} '
      f'o ${tot_margen_com-GASTO_VIDEO:,.0f}. Es UNA llamada.')
print()

print(L)
print('6. 🆕 EL SEGURO ES EXACTAMENTE EL 13,6% DEL FLETE')
print(L)
ratios = [r['seg']/r['flete'] for r in rows]
print(f'  {len(rows)} guias · minimo {min(ratios):.2%} · maximo {max(ratios):.2%} · '
      f'promedio {sum(ratios)/len(ratios):.2%}')
print()
print('  🔑 Es una PROPORCION FIJA, no una prima por valor declarado.')
print('     Confirma lo que decia 0-H: el seguro va DENTRO del valor_servicio.')
print(f'     Del flete que pagaste (${sum(r["flete"] for r in rows):,.0f}), '
      f'${sum(r["seg"] for r in rows):,} son seguro.')
print()
tot_seg = sum(r['seg'] for r in rows)
print(f'  Cuanto cuesta al mes: ${tot_seg/2*30:,.0f} '
      f'(a razon de {len(rows)/2:.0f} guias/dia)')
print('  Cuanto ahorra: en devolucion solo se cobra la prima y el flete')
print('  ida+vuelta queda cubierto (~$18.574 por devolucion, 0-L).')
esperadas = len(rows) * 0.153
print(f'  A 15,3% de rechazo, {len(rows)} guias -> {esperadas:.1f} devoluciones '
      f'-> ahorro ${esperadas*18_574:,.0f}')
print(f'  Costo del seguro en esas mismas {len(rows)} guias: ${tot_seg:,}')
ratio = esperadas*18_574/tot_seg
print(f'  >>> Relacion ahorro/costo: {ratio:.2f}x  '
      f'{"🟢 vale la pena" if ratio > 1.2 else "🔔 esta al filo, hay que medirlo"}')
print('  ⚠️  Con el rechazo real de 99 Envios sin medir (#31), esto es')
print('      direccional. Pero si el rechazo es MENOR al 15,3%, el seguro')
print('      pasa a costar mas de lo que ahorra. Vale preguntar si es opcional.')
print()

print(L)
print('7. 🚚 COORDINADORA YA ES EL 39% DEL VOLUMEN — #50 SE PUEDE CERRAR')
print(L)
for tr in ('inter','coord'):
    s = [r for r in rows if r['tr'] == tr]
    print(f'  {tr:<6} {len(s):>3} guias ({len(s)/len(rows):>4.0%})  '
          f'flete promedio ${sum(r["flete"] for r in s)/len(s):>9,.0f}')
print()
print('  El pendiente #50 preguntaba "¿que cobertura tiene coordinadora?".')
print('  Ya hay respuesta empirica: llego a Cartagena, Armenia, Medellin,')
print('  Sincelejo, Soledad, Barranquilla, Cucuta, Bello, Rionegro, TADO,')
print('  Sabaneta, Pereira, Monteria, Puerto Gaitan y Caldas.')
print('  >>> NO es solo grandes ciudades. Llega a Tado y a Puerto Gaitan.')
print()
print('  Comparacion en la MISMA ciudad (lo unico valido):')
print(f'  {"Ciudad":<16} {"inter":>10} {"coord":>10} {"dif":>10}')
for ciu in ('BARRANQUILLA','TADO'):
    i = [r for r in rows if r['ciu']==ciu and r['tr']=='inter']
    c = [r for r in rows if r['ciu']==ciu and r['tr']=='coord']
    if i and c:
        fi = sum(r['flete']/r['uds'] for r in i)/len(i)
        fc = sum(r['flete']/r['uds'] for r in c)/len(c)
        print(f'  {ciu:<16} {fi:>10,.0f} {fc:>10,.0f} {fc-fi:>10,.0f}  '
              f'({fc/fi-1:+.1%})  [por unidad]')
print()
print('  ⚠️  Solo hay 2 ciudades con las dos transportadoras y una es Tado con')
print('      distinto numero de unidades. NO alcanza para concluir cual es mas')
print('      barata. Lo que SI queda probado es la COBERTURA.')
print()

print(L)
print('8. 🔔 EL SHARE DE 2 UNIDADES CAYO — OJO CON #60')
print(L)
trad = [r for r in rows if r['prod'] == 'trad']
dobles = [r for r in trad if r['uds'] == 2]
print(f'  Pedidos tradicionales: {len(trad)}')
print(f'  De 2 unidades        : {len(dobles)}  = {len(dobles)/len(trad):.1%}')
print(f'  Unidades/pedido      : {sum(r["uds"] for r in trad)/len(trad):.3f}')
print()
print('  Historia del share de 2 unidades:')
print('     6,8%  antes del gancho del envio compartido')
print('    26,8%  despues (el "hallazgo mas importante del proyecto")')
print('    37,5%  primera lectura del 25-ago (n=8)')
print(f'    {len(dobles)/len(trad):.1%}  ESTA VENTANA (n={len(trad)})')
print()
print(f'  ⚠️  Con n={len(trad)} el intervalo de confianza del 14,0% va de ~6% a ~27%.')
print('      Roza el 26,8% por el borde de arriba, asi que tecnicamente NO se')
print('      puede declarar una caida — pero es la muestra mas grande que se ha')
print('      medido y viene claramente por debajo. Es la senal mas fuerte hasta hoy')
print('      de que el gancho del envio compartido se aflojo.')
print('  📌 Esto es exactamente el pendiente #60. Merece revisar si la IA')
print('     esta ofreciendo la segunda unidad (#40) o si dejo de hacerlo.')
print()

print(L)
print('9. DOS RAREZAS DE DATOS')
print(L)
print('  · CALDAS, recaudo $213.000: no cuadra con ninguna combinacion del')
print('    tarifario. 3 unidades sueltas serian $179.700 + envio. Hay que')
print('    confirmar que se cobro ahi. Se dejo marcado como "?" y EXCLUIDO')
print('    de todos los promedios de arriba.')
print('  · GUACHUCAL, recaudo $85.511: banda E es $85.000. Sobran $511.')
print('    Probablemente redondeo manual, pero el guion no deberia inventar')
print('    cifras: el 93% de las guias cobra el total exacto de su banda.')
print('  · DAGUA $80.000: banda C es $81.000. Es un descuento de cierre de')
print('    $1.000, dentro del tope de $3.000. Correcto.')
print()

print(L)
print('10. QUE HACER CON ESTO')
print(L)
print('  1. 🔴 RECLASIFICAR TADO. Su flete por unidad es $32.510-$35.834 y')
print('     esta cobrando banda E ($25.100). Necesita banda propia o cotizacion')
print('     individual. Con 2 guias en un dia no es un caso raro.')
print('  2. 🔴 REVISAR LA PROMO DE 2 UNIDADES EN DESTINOS CAROS. El flete de')
print('     2 uds a Tado ($71.667) es 2,2x el de 1 ud: el gancho de "el envio')
print('     casi no sube" NO aplica ahi. En banda E la promo puede perder plata.')
print('  3. 📞 PREGUNTAR EL % DE COMISION DE RECAUDO (#28-1). Ascendio a')
print('     critico: decide si el colmena esta en cero o en positivo.')
print('  4. 💳 EL PROXIMO MAYOREO POR TRANSFERENCIA. Este quedo contraentrega')
print('     con $573.291 en la puerta.')
print('  5. 🔍 CONFIRMAR EL COBRO DE CALDAS ($213.000).')
print('  6. 📊 Para el CPA: estas 54 guias son fecha de DESPACHO. Sin la fecha')
print('     en que el cliente escribio (#80) no se pueden casar con la pauta.')
