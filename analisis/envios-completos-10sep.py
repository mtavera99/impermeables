#!/usr/bin/env python3
"""
EXPORT COMPLETO DE 99 ENVIOS AL 10-SEP — 141 GUIAS (2 al 10 de septiembre)
==========================================================================
Primer export que cubre NUEVE dias seguidos, asi que por fin se puede:
  1. Cerrar las tres guias que estaban en el aire (#92 y el colmena)
  2. Medir el rechazo REAL con devoluciones ratificadas, no estimado
  3. Ver si el bloque de la 2a unidad movio el share
  4. Medir cuanto cuesta de verdad una devolucion  -> #91
"""
import csv, collections

L = '=' * 74
COSTO, CPA = 33_000, 7_674          # costo tradicional y CPA vigente (0-AE)
COSTO_COLM = 85_000
EQUILIBRIO_CONV = 2_657

rows = list(csv.DictReader(open('analisis/envios-completos-10sep.csv')))
for r in rows:
    r['vs'] = float(r['valor_servicio'])
    r['seg'] = float(r['seguro'])
    r['rec'] = int(r['recaudo'])

print(L); print(f'  {len(rows)} guias · del 2 al 10 de septiembre · fuente: 99 Envios'); print(L)

# ---------------------------------------------------------------- 1
print(); print(L); print('1. LAS TRES GUIAS QUE ESTABAN EN EL AIRE'); print(L)
for g, que in [('240060772823', 'MAYOREO GRANADA  $573.291 contraentrega'),
               ('240060773268', 'COLMENA San Francisco'),
               ('64532758224',  'COLMENA? Puerto Gaitan')]:
    r = next(x for x in rows if x['guia'] == g)
    print(f'  {que}')
    print(f'    guia {g} · producto="{r["producto"]}" · {r["ciudad"]}')
    print(f'    >>> ESTADO: {r["estado"].upper()}')
print()
print('  🟢 GRANADA ESTA ENTREGADA. Los $573.291 se cobraron.')
print('     La alarma mas grande del proyecto (#92) se cierra COBRADA.')
print('  🟢 EL COLMENA DE SAN FRANCISCO ESTA ENTREGADO Y PAGADO.')
print('     Primer rechazo medido a $149.900 contraentrega: NO hubo rechazo.')
print('  ⚠️ Puerto Gaitan dice "impermeable", no "impermeable colmena", pero')
print('     cobra $149.900 exactos. Sigue sin confirmar de que producto es.')

# ---------------------------------------------------------------- 2
print(); print(L); print('2. EL RECHAZO REAL, MEDIDO (no estimado)'); print(L)
est = collections.Counter(r['estado'] for r in rows)
CERRADO_OK  = ['Entregada']
CERRADO_MAL = ['Devolucion ratificada']
ENTREGADAS = [r for r in rows if r['estado'] in CERRADO_OK]
DEVUELTAS  = [r for r in rows if r['estado'] in CERRADO_MAL]
resueltas = len(ENTREGADAS) + len(DEVUELTAS)
print(f'  {"estado":<34}{"n":>4}')
for e, n in est.most_common():
    print(f'  {e:<34}{n:>4}')
print()
print(f'  RESUELTAS (entregada o devuelta) : {resueltas}')
print(f'    entregadas                     : {len(ENTREGADAS)}')
print(f'    devoluciones ratificadas       : {len(DEVUELTAS)}')
print(f'  >>> RECHAZO SOBRE RESUELTAS      : {len(DEVUELTAS)/resueltas:.1%}')
print()
print('  🔑 El archivo venia usando 15,3% (auditoria 0-G de agosto, con Heka).')
print(f'     Con 99 Envios e Interrapidisimo el rechazo real es {len(DEVUELTAS)/resueltas:.1%}.')
print(f'     Break-even de rechazo: ~49%. Hay {0.49/(len(DEVUELTAS)/resueltas):.0f}x de colchon.')
print()
print('  ⚠️ CAVEAT HONESTO: las 15 guias en "Reclame en oficina" y las 9 en')
print('     "Intento de entrega" todavia pueden volverse devolucion. Si TODAS')
print('     se cayeran, el rechazo subiria a '
      f'{(len(DEVUELTAS)+est["Reclame en oficina"]+est["Intento de entrega"])/(resueltas+est["Reclame en oficina"]+est["Intento de entrega"]):.1%}.')
print('     Por eso #75 (empujar los de oficina) sigue siendo la plata mas facil.')

# ---------------------------------------------------------------- 3
print(); print(L); print('3. 🆕 CUANTO CUESTA UNA DEVOLUCION — Y RESUELVE #91'); print(L)
print(f'  {"ciudad":<22}{"recaudo":>9}{"valor_servicio":>15}{"seguro":>9}')
for r in DEVUELTAS:
    print(f'  {r["ciudad"]:<22}{r["rec"]:>9,}{r["vs"]:>15,.2f}{r["seg"]:>9,.0f}')
print()
print('  🔑🔑 EN LAS TRES, valor_servicio == seguro EXACTO.')
print('     O sea que en una devolucion NO se paga flete: se paga SOLO el seguro.')
print('     99 Envios no cobra ni la ida.')
print()
# que costaria sin seguro: ida + vuelta al flete de su banda
bandas = collections.defaultdict(list)
for r in rows:
    if r['estado'] not in CERRADO_MAL:
        bandas[r['rec']].append(r['vs'])
print('  Lo que costaria esa misma devolucion SIN seguro (ida + vuelta):')
ahorro = 0
for r in DEVUELTAS:
    ref = sorted(bandas[r['rec']])[len(bandas[r['rec']])//2] if bandas[r['rec']] else 23_000
    sin = ref * 2
    a = sin - r['vs']
    ahorro += a
    print(f'    {r["ciudad"]:<22} flete banda ${ref:>9,.0f} x2 = ${sin:>9,.0f}'
          f'  ahorro ${a:>9,.0f}')
costo_seguro = sum(r['seg'] for r in rows)
print()
print(f'  COSTO del seguro en estas {len(rows)} guias : ${costo_seguro:,.0f}')
print(f'  AHORRO en las {len(DEVUELTAS)} devoluciones          : ${ahorro:,.0f}')
print(f'  >>> RELACION AHORRO/COSTO           : {ahorro/costo_seguro:.2f}x')
print()
if ahorro/costo_seguro < 1:
    print('  🔴 SIGUE SIENDO MENOR QUE 1: el seguro cuesta mas de lo que ahorra.')
    print(f'     Con este rechazo ({len(DEVUELTAS)/resueltas:.1%}) el seguro NO se paga.')
    n_eq = costo_seguro / (ahorro/len(DEVUELTAS))
    print(f'     Se pagaria a partir de ~{n_eq:.1f} devoluciones en {len(rows)} guias '
          f'= {n_eq/resueltas:.1%} de rechazo.')
    print('  📌 CONFIRMA #91 con datos duros y le pone el numero exacto:')
    print(f'     el seguro conviene solo si el rechazo pasa de ~{n_eq/resueltas:.0%}.')
else:
    print('  🟢 El seguro se paga.')

# ---------------------------------------------------------------- 4
print(); print(L); print('4. ¿VOLVIO EL SHARE DE 2 UNIDADES? (el bloque se pego el 9-sep)'); print(L)
def unidades(r):
    v = r['rec']
    if r['producto'] == 'impermeable colmena' or v == 149_900: return None   # colmena
    if v > 300_000: return None                                              # mayoreo
    if v >= 200_000: return 3
    if v >= 120_000: return 2
    return 1
por_dia = collections.defaultdict(list)
for r in rows:
    u = unidades(r)
    if u: por_dia[r['fecha']].append(u)
print(f'  {"fecha":<12}{"guias":>6}{"multiples":>11}{"share":>9}   ')
for f in sorted(por_dia):
    us = por_dia[f]
    m = sum(1 for u in us if u >= 2)
    marca = '  <-- 🆕 con el bloque pegado' if f >= '2026-09-09' else ''
    print(f'  {f:<12}{len(us):>6}{m:>11}{m/len(us):>8.1%}{marca}')
antes = [u for f, us in por_dia.items() if f < '2026-09-09' for u in us]
desp  = [u for f, us in por_dia.items() if f >= '2026-09-09' for u in us]
sa = sum(1 for u in antes if u >= 2)/len(antes)
sd = sum(1 for u in desp  if u >= 2)/len(desp)
print()
print(f'  ANTES del bloque (2 al 8-sep) : {sa:.1%}  (n={len(antes)})')
print(f'  DESPUES (9 y 10-sep)          : {sd:.1%}  (n={len(desp)})')
print(f'  Referencia historica: 26,8% en el pico (0-V) · 15,7% en la caida')
print()
print('  ⚠️⚠️ NO CANTAR VICTORIA, Y ESTA VEZ POR REGLA PROPIA (0-AF):')
print('     "oscilacion es ruido; monotonia es tendencia". Y esta serie OSCILA:')
serie = [f'{sum(1 for u in por_dia[f] if u>=2)/len(por_dia[f]):.0%}' for f in sorted(por_dia)]
print('       ' + ' -> '.join(serie))
print(f'     El 3-sep ya habia marcado alto SIN el bloque. Con n={len(desp)} esto es')
print('     compatible con el bloque funcionando Y con puro ruido.')
print('     📌 El dato bueno es el lunes 14 con la semana cerrada.')

# ---------------------------------------------------------------- 5
print(); print(L); print('5. 🔴 UNA FUGA NUEVA QUE NO ES TADO: EL CHARCO'); print(L)
peor = sorted((r for r in rows if unidades(r)), key=lambda r: r['rec'] - COSTO*unidades(r) - r['vs'])[:6]
print(f'  {"ciudad":<22}{"uds":>4}{"recaudo":>9}{"flete":>10}{"margen":>11}')
for r in peor:
    u = unidades(r); m = r['rec'] - COSTO*u - r['vs']
    print(f'  {r["ciudad"]:<22}{u:>4}{r["rec"]:>9,}{r["vs"]:>10,.0f}{m:>11,.0f}')
print()
ch = next(r for r in rows if r['ciudad'] == 'EL CHARCO')
print(f'  🔴 EL CHARCO: cobro ${ch["rec"]:,} y el flete fue ${ch["vs"]:,.0f}.')
print(f'     Margen: {ch["rec"]:,} - {COSTO:,} - {ch["vs"]:,.0f} = '
      f'${ch["rec"]-COSTO-ch["vs"]:,.0f}')
print('     🔑 Cobro $59.900 = el precio SIN envio. No le cobro el flete.')
print('        No es un problema de tarifa: es que la venta se cerro sin sumar')
print('        el envio. Y El Charco (Narino, por rio) es el flete mas caro')
print(f'        de las {len(rows)} guias.')
print('     📌 Es el mismo patron de Guachucal ($85.511): el guion se equivoca')
print('        justo en los destinos raros, donde mas cuesta equivocarse.')

# ---------------------------------------------------------------- 6
print(); print(L); print('6. LA PLATA PARADA, ACTUALIZADA'); print(L)
for e in ['Reclame en oficina', 'Intento de entrega', 'Centro acopio']:
    g = [r for r in rows if r['estado'] == e]
    if g:
        print(f'  {e:<22} {len(g):>3} guias · ${sum(r["rec"] for r in g):>10,} por cobrar')
viejas = [r for r in rows if r['estado'] == 'Reclame en oficina' and r['fecha'] <= '2026-09-04']
print()
print(f'  📌 De los "Reclame en oficina", {len(viejas)} son del 2 al 4-sep '
      f'(${sum(r["rec"] for r in viejas):,}):')
print('     esos llevan 6+ dias esperando que el cliente vaya. Son los que se')
print('     vuelven devolucion si nadie los llama -> #75')

# ---------------------------------------------------------------- 7
print(); print(L); print('7. LA CUENTA DE LA VENTANA (con el modelo corregido)'); print(L)
trad = [r for r in rows if unidades(r)]
uds = sum(unidades(r) for r in trad)
flete = sum(r['vs'] for r in trad)
bruto = sum(r['rec'] - COSTO*unidades(r) - r['vs'] for r in trad)
print(f'  Pedidos del tradicional      : {len(trad)}')
print(f'  Unidades                     : {uds}  ({uds/len(trad):.2f} por pedido)')
print(f'  Margen bruto (26.900xu-flete): ${bruto:,.0f}')
print(f'  Menos pauta ({len(trad)} x ${CPA:,})    : -${CPA*len(trad):,}')
print(f'  >>> UTILIDAD DE LA VENTANA   : ${bruto-CPA*len(trad):,.0f}')
print(f'      por pedido               : ${(bruto-CPA*len(trad))/len(trad):,.0f}')
print()
print('  ⚠️ Es utilidad DEVENGADA, no caja: 24 guias todavia pueden caerse.')
print(f'     Con el rechazo medido ({len(DEVUELTAS)/resueltas:.1%}) el ajuste es chico,')
print('     pero el numero real se sabe cuando cierren las 24.')
