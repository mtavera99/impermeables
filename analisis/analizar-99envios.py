"""Analisis de las guias de 99 ENVIOS (primera ventana: 10-14 ago 2026).

Fuente: export "Envios Completos" de 99envios.com descargado el 2026-08-15.
Datos en guias-99envios.csv (26 guias, 27 unidades).

OJO CON LA MADUREZ DE LA MUESTRA: 5 dias de operacion no alcanzan para medir
rechazo. Las entregas se resuelven en 2-4 dias; las devoluciones tardan 8-15.
Por eso el rechazo sale artificialmente en 0% y NO es un dato utilizable.
Lo que si es medible con 5 dias: el COSTO del servicio y el PRECIO implicito.

Comparacion contra la auditoria de Heka (ver seccion 0-G del archivo madre):
  flete promedio Heka        ~$21.000
  precio implicito por unidad $59.933
  margen por unidad entregada $24.433
"""
import csv
from collections import Counter, defaultdict

COSTO_UNIDAD, EMPAQUE = 34000, 1500
PRECIO_LISTA = 59900
CPA_ENTREGADA = 6414          # CPA real por venta entregada (auditoria Heka)
FLETE_HEKA = 21000            # flete promedio del periodo Heka
PRECIO_UNIT_HEKA = 59933      # precio implicito por unidad con Heka
MARGEN_UNIT_HEKA = 24433      # margen por unidad entregada con Heka

# Capitales departamentales + area metropolitana (mismo criterio de la seccion 0-G)
PRINCIPALES = {
    'BOGOTÁ, D.C.', 'MEDELLÍN', 'SANTA MARTA', 'BUCARAMANGA', 'MONTERÍA',
    'CARTAGENA DE INDIAS', 'POPAYÁN', 'TUNJA', 'FLORENCIA',
    'SOACHA', 'SOLEDAD',
}
# Estados que son NOVEDAD: el paquete existe pero la entrega se trabo
RIESGO = {'Reclame en oficina', 'Intento de entrega', 'Telemercadeo'}

rows = list(csv.DictReader(open('guias-99envios.csv')))
for r in rows:
    r['uds'] = int(r['unidades'])
    r['recaudo'] = float(r['valor_comercial'])
    r['servicio'] = float(r['valor_servicio'])
    r['seguro'] = float(r['valor_seguro_99'])
    r['fecha'] = r['fecha_envio'][:10]
    # lo que queda para el dueno despues de pagarle a la transportadora
    r['producto'] = r['recaudo'] - r['servicio']
    r['por_unidad'] = r['producto'] / r['uds']
    # cuanto flete se esta comiendo el dueno contra el precio de lista
    r['absorbido'] = PRECIO_LISTA * r['uds'] - r['producto']
    r['principal'] = r['ciudad_destino'] in PRINCIPALES

ent = [r for r in rows if r['estado_del_envio'] == 'Entregada']
dev = [r for r in rows if 'Devuelt' in r['estado_del_envio']]
riesgo = [r for r in rows if r['estado_del_envio'] in RIESGO]
curso = [r for r in rows if r not in ent and r not in dev and r not in riesgo]

n = len(rows)
uds = sum(r['uds'] for r in rows)

print('=' * 64)
print('1. QUE HAY EN EL ARCHIVO')
print('=' * 64)
print(f'  Guias                 : {n}')
print(f'  Unidades              : {uds}')
print(f'  Ventana               : {min(r["fecha"] for r in rows)} a {max(r["fecha"] for r in rows)}')
print(f'  Recaudo comprometido  : ${sum(r["recaudo"] for r in rows):,.0f}')
print()
print('  Guias despachadas por dia:')
por_dia = Counter(r['fecha'] for r in rows)
for f in sorted(por_dia):
    print(f'    {f}  {por_dia[f]:2d}  {"#" * por_dia[f]}')
print(f'    promedio: {n/len(por_dia):.1f} guias/dia')

print()
print('=' * 64)
print('2. ESTADO DE LAS GUIAS')
print('=' * 64)
for k, v in sorted(Counter(r['estado_del_envio'] for r in rows).items(), key=lambda x: -x[1]):
    marca = ' <-- NOVEDAD' if k in RIESGO else ''
    print(f'  {v:2d}  {k}{marca}')
print()
print(f'  Entregadas            : {len(ent)}')
print(f'  Devueltas             : {len(dev)}')
print(f'  En novedad (riesgo)   : {len(riesgo)}  ({len(riesgo)/n*100:.0f}% del total)')
print(f'  En curso normal       : {len(curso)}')
res = len(ent) + len(dev)
print()
print(f'  RESUELTAS             : {res} de {n}')
if res:
    print(f'  Rechazo sobre resueltas: {len(dev)/res*100:.1f}%  <-- NO USAR, muestra inmadura')
print('  Techo del rechazo si TODAS las novedades fallaran: '
      f'{(len(dev)+len(riesgo))/(res+len(riesgo))*100:.1f}%')

print()
print('=' * 64)
print('3. COSTO DEL SERVICIO 99 ENVIOS vs HEKA')
print('=' * 64)
serv_tot = sum(r['servicio'] for r in rows)
seg_tot = sum(r['seguro'] for r in rows)
print(f'  Cobro total de 99 Envios : ${serv_tot:,.0f}')
print(f'  Promedio por guia        : ${serv_tot/n:,.0f}')
print(f'  Heka (referencia)        : ${FLETE_HEKA:,}')
print(f'  Diferencia               : {(serv_tot/n/FLETE_HEKA-1)*100:+.1f}%')
print()
print(f'  El campo "seguro" suma   : ${seg_tot:,.0f}  (${seg_tot/n:,.0f} por guia)')
print(f'  Seguro como % del cobro  : {seg_tot/serv_tot*100:.1f}%  (constante en todas las guias)')
print()
print('  LAS DOS LECTURAS POSIBLES (hay que confirmar cual es con 99 Envios):')
print(f'   (a) el seguro esta INCLUIDO en el cobro -> flete puro '
      f'${(serv_tot-seg_tot)/n:,.0f} = {((serv_tot-seg_tot)/n/FLETE_HEKA-1)*100:+.1f}% vs Heka')
print(f'   (b) el seguro se cobra APARTE          -> costo real '
      f'${(serv_tot+seg_tot)/n:,.0f} = {((serv_tot+seg_tot)/n/FLETE_HEKA-1)*100:+.1f}% vs Heka')
print('   -> la diferencia entre (a) y (b) es de '
      f'${seg_tot/n*2:,.0f} por guia. NO es un detalle menor.')

print()
print('=' * 64)
print('4. HALLAZGO: SE ESTA ABSORBIENDO FLETE EN LOS DESTINOS CAROS')
print('=' * 64)
prod_tot = sum(r['producto'] for r in rows)
print(f'  Precio de lista            : ${PRECIO_LISTA:,} por unidad')
print(f'  Precio implicito real      : ${prod_tot/uds:,.0f} por unidad')
print(f'  Con Heka era               : ${PRECIO_UNIT_HEKA:,} (= al precio de lista)')
print(f'  Diferencia por unidad      : ${prod_tot/uds - PRECIO_UNIT_HEKA:+,.0f}')
print()
print('  Tarifario que se le esta cobrando al cliente (recaudo = producto + envio):')
tar = defaultdict(list)
for r in rows:
    tar[(r['recaudo'], r['servicio'])].append(r)
print(f'  {"recaudo":>10} {"cobro 99":>10} {"queda":>10} {"absorbido":>11}  guias  destinos')
for (rec, srv), g in sorted(tar.items(), key=lambda x: x[0][1]):
    q = g[0]['producto'] / g[0]['uds']
    ab = PRECIO_LISTA - q
    ciudades = ', '.join(sorted({x['ciudad_destino'].split(',')[0] for x in g}))
    print(f'  ${rec:>9,.0f} ${srv:>9,.0f} ${q:>9,.0f} ${ab:>10,.0f}  {len(g):>4}  {ciudades[:38]}')
absorbido = sum(r['absorbido'] for r in rows if r['absorbido'] > 0)
print()
print(f'  Flete absorbido en esta ventana : ${absorbido:,.0f} en '
      f'{sum(1 for r in rows if r["absorbido"] > 0)} guias')
print(f'  Por guia afectada               : ${absorbido/max(1,sum(1 for r in rows if r["absorbido"]>0)):,.0f}')
print(f'  Proyectado a 300 ventas/mes     : ${absorbido/n*300:,.0f}/mes')
print()
print('  >>> El modelo dice "el cliente paga el envio", pero en los destinos')
print('      caros se le cobra un total tope y el resto lo paga el dueno.')

print()
print('=' * 64)
print('5. MARGEN DE LAS 10 ENTREGADAS (lo unico ya cobrado)')
print('=' * 64)
if ent:
    uds_e = sum(r['uds'] for r in ent)
    prod_e = sum(r['producto'] for r in ent)
    margen = prod_e - uds_e * (COSTO_UNIDAD + EMPAQUE)
    print(f'  Unidades entregadas   : {uds_e}')
    print(f'  Producto (neto envio) : ${prod_e:,.0f}')
    print(f'  Costo producto+empaque: -${uds_e*(COSTO_UNIDAD+EMPAQUE):,.0f}')
    print(f'  Margen bruto          : ${margen:,.0f}')
    print(f'  Margen por unidad     : ${margen/uds_e:,.0f}   (Heka: ${MARGEN_UNIT_HEKA:,})')
    print(f'  Publicidad (CPA x {len(ent)}) : -${CPA_ENTREGADA*len(ent):,}')
    print(f'  UTILIDAD NETA         : ${margen - CPA_ENTREGADA*len(ent):,.0f}')
    print()
    print('  ADVERTENCIA: esto NO es la utilidad del periodo. Son solo las 10 ya')
    print('  entregadas de 26; las otras 16 siguen en la calle y ya tienen la')
    print('  publicidad pagada. Es una foto parcial y optimista.')

print()
print('=' * 64)
print('6. LA PLATA QUE ESTA EN RIESGO AHORA MISMO')
print('=' * 64)
if riesgo:
    print(f'  {"ciudad":<22} {"estado":<20} {"recaudo":>10} {"margen":>9}')
    tot_m = 0
    for r in sorted(riesgo, key=lambda x: -x['recaudo']):
        m = r['producto'] - r['uds'] * (COSTO_UNIDAD + EMPAQUE)
        tot_m += m
        print(f'  {r["ciudad_destino"][:21]:<22} {r["estado_del_envio"]:<20} '
              f'${r["recaudo"]:>9,.0f} ${m:>8,.0f}')
    print(f'  {"":<43} ${sum(r["recaudo"] for r in riesgo):>9,.0f} ${tot_m:>8,.0f}')
    print()
    print(f'  Margen en juego            : ${tot_m:,.0f}')
    print(f'  Publicidad ya gastada ahi  : ${CPA_ENTREGADA*len(riesgo):,}')
    print(f'  Se pierde si fallan todas  : ${tot_m + CPA_ENTREGADA*len(riesgo):,.0f}')

print()
print('=' * 64)
print('7. RECHAZO POR TIPO DE DESTINO (sin señal todavia)')
print('=' * 64)
for et, cond in (('Ciudades principales', True), ('Pueblos / municipios', False)):
    e = sum(1 for r in ent if r['principal'] == cond)
    d = sum(1 for r in dev if r['principal'] == cond)
    g = sum(1 for r in riesgo if r['principal'] == cond)
    tot = sum(1 for r in rows if r['principal'] == cond)
    print(f'  {et:<22} {tot:2d} guias | {e:2d} entregadas | {d} devueltas | {g} en novedad')
print()
print('  Con 0 devoluciones no se puede comparar nada. El dato de la seccion 0-G')
print('  (ciudades grandes rechazan MAS) sigue siendo la mejor hipotesis vigente.')
print('  Volver a correr esto cuando haya ~100 guias resueltas con 99 Envios.')

print()
print('=' * 64)
print('8. LO QUE NO SE PUEDE RESPONDER CON ESTE ARCHIVO')
print('=' * 64)
print('  - CPA / costo por venta: falta el export de Meta con desglose POR DIA.')
print('  - Comision por recaudo: no aparece como campo. Puede estar dentro de')
print('    valor_servicio o cobrarse al liquidar. HAY QUE PREGUNTARLO.')
print('  - Dias de pago: el archivo no trae fecha de liquidacion.')
print('  - Rechazo real: faltan ~10 dias para que las novedades se resuelvan.')
