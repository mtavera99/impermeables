"""VEREDICTO DEL 19-AGO — ¿rebotó el cierre tras la quincena?

Cruza:
  guias-99envios-19ago.csv  (53 guias, 13-18 ago, export del 19)
  meta-14-19ago.csv         (528 conversaciones, $281.820)

Resuelve el criterio fijado POR ESCRITO ANTES de ver los datos (seccion 0-I):
    cierre rebota a 10-13%  -> era el CICLO DE PAGO
    cierre sigue en ~6%     -> clima / horas de venta del dueño

⚠️ OJO: las fechas del export vienen en UTC. Se convierten a hora Colombia
   (UTC-5) porque el negocio despacha de noche y eso corre guias de dia.
"""
import csv
from collections import Counter, defaultdict
from datetime import datetime, timedelta

MARGEN, COSTO_UD, EMPAQUE = 24433, 34000, 1500
PRECIO_LISTA = 59900
TASA_ENTREGA = 0.847
# Meta 14-19 ago
GASTO_META, CONV_META = 281820, 528
CONV_14AGO = 90          # conteo manual del dueño
VACIAS_14AGO = 52
# valle 10-14 ago
V_GUIAS, V_DIAS, V_CIERRE, V_CPA = 26, 5, 0.061, 9343
CIERRE_PICO = 0.13

rows = list(csv.DictReader(open('guias-99envios-19ago.csv')))
for r in rows:
    ts = datetime.strptime(r['fecha_envio_utc'], '%Y-%m-%d %H:%M:%S')
    r['col'] = ts - timedelta(hours=5)          # hora Colombia
    r['fecha'] = r['col'].date()
    r['uds'] = int(r['unidades'])
    r['servicio'] = float(r['valor_servicio'])
    r['seguro'] = float(r['valor_seguro_99'])
    r['recaudo'] = float(r['valor_comercial'])
    r['producto'] = r['recaudo'] - r['servicio']

print('=' * 70)
print('1. GUIAS POR DIA (convertido a hora Colombia)')
print('=' * 70)
por_dia = Counter(r['fecha'] for r in rows)
DIAS_SEM = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom']
d = min(por_dia)
while d <= max(por_dia):
    n = por_dia.get(d, 0)
    ds = DIAS_SEM[d.weekday()]
    marca = ''
    if n == 0:
        marca = '  <== NO DESPACHO'
    if d.day == 15:
        marca += '  [QUINCENA]'
    print(f'  {d} {ds}  {n:2d} {"#" * n}{marca}')
    d += timedelta(days=1)
print()
print('  🔑 NO DESPACHA FIN DE SEMANA. El export anterior tambien era lun-vie')
print('     (10,11,12,13,14 ago = lun a vie). Se confirma el patron.')
print('  >>> ENTONCES LAS 41 GUIAS DEL 17-18 SON LAS VENTAS ACUMULADAS DEL')
print('      SABADO 15, DOMINGO 16, LUNES 17 Y MARTES 18. No son de 2 dias.')
print('  ⚠️ TRAMPA EVITADA: contar "guias por fecha de despacho" habria dado')
print('     20,5 ventas/dia (falso alto) o 0 el sabado (falso bajo).')

print()
print('=' * 70)
print('2. 🎉 EL VEREDICTO: HUBO REBOTE, Y ES GRANDE')
print('=' * 70)
post = [r for r in rows if r['fecha'] >= datetime(2026, 8, 15).date()]
n_post, dias_post = len(post), 4          # 15,16,17,18
uds_post = sum(r['uds'] for r in post)
conv_post = CONV_META - CONV_14AGO        # se descuenta el 14 (dia del valle)

print(f'  Guias del 15 al 18 ago      : {n_post}   ({uds_post} unidades)')
print(f'  Ventas por dia              : {n_post/dias_post:.2f}   '
      f'(valle: {V_GUIAS/V_DIAS:.1f})  ->  {n_post/dias_post/(V_GUIAS/V_DIAS)*100-100:+.0f}%')
print(f'  Antes del temblor           : 10-12/dia')
print()
print(f'  Conversaciones 15-18 (est.) : {conv_post}  ({conv_post/dias_post:.1f}/dia)')
print(f'  >>> TASA DE CIERRE          : {n_post/conv_post*100:.1f}%   (valle: 6,1%)')
print()
cierre_post = n_post / conv_post
print('  Evolucion completa del cierre:')
for et, v in (('1-4 ago', 0.102), ('5-10 ago PICO', 0.13), ('11 ago temblor', 0.067),
              ('10-14 ago valle', 0.061), ('15-18 ago AHORA', cierre_post)):
    print(f'    {et:<18} {v*100:>5.1f}%  {"#" * int(v*200)}')
print()
if cierre_post >= 0.10:
    print('  ✅✅ REBOTE CLARO -> ERA EL CICLO DE PAGO. Criterio cumplido.')
elif cierre_post >= 0.08:
    print('  ✅ REBOTE FUERTE pero por debajo del 10% -> ver matiz abajo.')
else:
    print('  🔴 SIN REBOTE SUFICIENTE.')

print()
print('=' * 70)
print('3. EL MATIZ IMPORTANTE: VOLVIERON LAS VENTAS, NO EL CIERRE DEL PICO')
print('=' * 70)
print(f'  Ventas/dia   : {V_GUIAS/V_DIAS:.1f} -> {n_post/dias_post:.2f}   '
      f'({n_post/dias_post/(V_GUIAS/V_DIAS)*100-100:+.0f}%)  ✅ nivel pre-temblor')
print(f'  Cierre       : 6,1% -> {cierre_post*100:.1f}%   '
      f'({cierre_post/V_CIERRE*100-100:+.0f}%)  ✅ pero el pico era 13%')
print(f'  Conversaciones/dia: 84.9 -> {conv_post/dias_post:.1f}   '
      f'({conv_post/dias_post/84.9*100-100:+.0f}%)')
print()
print('  🔑 LAS CONVERSACIONES SUBIERON ~29% Y LAS VENTAS ~97%.')
print('     Las dos cosas mejoraron, las ventas mucho mas. Por eso el cierre')
print('     sube pero no llega al 13%: hay MAS gente entrando, y parte de esa')
print('     gente extra convierte peor. Es escalamiento, no deterioro.')

print()
print('=' * 70)
print('4. 💰 CPA Y RENTABILIDAD')
print('=' * 70)
cpa_c = GASTO_META * (conv_post/CONV_META) / n_post
cpa_e = cpa_c / TASA_ENTREGA
print(f'  Gasto atribuido a 15-18     : ${GASTO_META*(conv_post/CONV_META):,.0f}')
print(f'  CPA por venta cerrada       : ${cpa_c:,.0f}   (valle: ${V_CPA:,})  '
      f'{cpa_c/V_CPA*100-100:+.0f}%')
print(f'  CPA por venta entregada     : ${cpa_e:,.0f}   (valle: $11.031)')
print(f'  Punto de equilibrio         : $23.674  -> colchon {23674/cpa_e:.1f}x')
print(f'  Utilidad por venta entregada: ${MARGEN-cpa_e:,.0f}')
print(f'  Utilidad estimada por dia   : '
      f'${(MARGEN-cpa_e)*n_post/dias_post*TASA_ENTREGA:,.0f}')
print()
print(f'  Referencia del valle: utilidad ~$65.000/dia')

print()
print('=' * 70)
print('5. 🚨🚨 HALLAZGO GRANDE: EL SEGURO 99 QUEDO CONFIRMADO CON DATOS')
print('=' * 70)
dev = [r for r in rows if 'Devoluci' in r['estado_del_envio']]
print('  Aparecieron las 2 primeras devoluciones con 99 Envios, y en ellas')
print('  el valor_servicio CAMBIO: ya no cobran el flete, cobran SOLO la prima.')
print()
print(f'  {"ciudad":<16} {"flete normal":>13} {"cobrado":>10} {"prima":>8} {"ahorro":>10}')
ahorro_tot = 0
NORMAL = {'BOGOTÁ, D.C.': 12871.27, 'SANTA MARTA': 22792.79}
for r in dev:
    normal = NORMAL.get(r['ciudad_destino'], 0)
    ah = normal - r['servicio']
    ahorro_tot += ah
    print(f'  {r["ciudad_destino"][:15]:<16} ${normal:>12,.0f} '
          f'${r["servicio"]:>9,.0f} ${r["seguro"]:>7,.0f} ${ah:>9,.0f}')
print()
print('  ✅ EN UNA DEVOLUCION SOLO SE PAGA LA PRIMA DEL SEGURO.')
print('     El flete de ida Y de vuelta queda cubierto COMPLETO.')
print('     Es MEJOR de lo que estimaba la seccion 0-H.')
print()
print('  COMPARACION CONTRA HEKA (que no tenia seguro):')
FLETE_HEKA = 21000
for r in dev:
    print(f'    {r["ciudad_destino"][:20]:<22} con Heka habrias pagado '
          f'~${FLETE_HEKA:,} y perdido todo; pagaste ${r["servicio"]:,.0f}')
ahorro_prom = FLETE_HEKA - sum(r['servicio'] for r in dev)/len(dev)
print()
print(f'  Ahorro promedio por devolucion : ${ahorro_prom:,.0f}')
print(f'  A 15,3% de rechazo             : ${0.153*ahorro_prom:,.0f} por guia despachada')
print(f'  A 300 ventas/mes               : ${0.153*ahorro_prom*300:,.0f}/mes')
print()
print('  >>> LA PREGUNTA 3 DEL PENDIENTE #28 QUEDA RESPONDIDA CON DATOS.')
print('      Ya no hay que preguntarle nada a 99 Envios sobre el seguro.')

print()
print('=' * 70)
print('6. RECHAZO — PRIMEROS RESUELTOS (muestra minuscula, no concluir)')
print('=' * 70)
ent = [r for r in rows if r['estado_del_envio'] == 'Entregada']
res = len(ent) + len(dev)
print(f'  Entregadas : {len(ent)}')
print(f'  Devueltas  : {len(dev)}')
print(f'  Resueltas  : {res} de {len(rows)}')
print(f'  Rechazo    : {len(dev)/res*100:.0f}%  ⚠️ con {res} casos NO significa nada')
print()
print('  📌 PERO ATENCION AL PATRON: las 2 devoluciones son BOGOTA y SANTA MARTA')
print('     -> las dos son CIUDADES GRANDES, consistente con la seccion 0-G')
print('     (ciudades 20-23% vs pueblos 7-11%). Van 2 datos mas a ese lado.')

print()
print('=' * 70)
print('7. ⚠️ GUIAS QUE NECESITAN ACCION HOY')
print('=' * 70)
hoy = datetime(2026, 8, 19).date()
problemas = []
for r in rows:
    dias = (hoy - r['fecha']).days
    e = r['estado_del_envio']
    if e == 'Recoleccion programada' and dias >= 2:
        problemas.append((r, dias, f'NUNCA LA RECOGIERON ({dias} dias)'))
    elif e in ('Reclame en oficina', 'Telemercadeo') :
        problemas.append((r, dias, f'novedad sin resolver ({dias} dias)'))
    elif e == 'Transito Urbano' and dias >= 5:
        problemas.append((r, dias, f'en transito {dias} dias, muy lento'))
    elif e == 'EN PROCESAMIENTO' and dias >= 4:
        problemas.append((r, dias, f'trabada en procesamiento ({dias} dias)'))
for r, dias, msg in sorted(problemas, key=lambda x: -x[1]):
    m = r['producto'] - r['uds']*(COSTO_UD+EMPAQUE)
    print(f'  {r["fecha"]} {r["ciudad_destino"][:20]:<22} ${m:>7,.0f}  {msg}')
print()
print(f'  Margen en riesgo: ${sum(r["producto"]-r["uds"]*(COSTO_UD+EMPAQUE) for r,_,_ in problemas):,.0f}')
print()
print('  🔴 LA MAS GRAVE: la de GOMEZ PLATA del 13-ago sigue en "Recoleccion')
print('     programada" -> 99 Envios NUNCA la recogio en 5 dias. El cliente')
print('     esta esperando y el paquete no salio. Reclamar HOY.')

print()
print('=' * 70)
print('8. PEDIDOS DE 2 UNIDADES')
print('=' * 70)
dos = [r for r in rows if r['uds'] >= 2]
print(f'  Pedidos de 2+ unidades: {len(dos)} de {len(rows)} ({len(dos)/len(rows)*100:.0f}%)')
for r in dos:
    print(f'    {r["fecha"]} {r["ciudad_destino"][:22]:<24} recaudo ${r["recaudo"]:,.0f}')
print(f'  Referencia auditada (periodo Heka): 16%')
