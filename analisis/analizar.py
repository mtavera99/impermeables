import csv
from collections import defaultdict

COSTO_UNIDAD = 34000
EMPAQUE = 1500
CAC = 5018

GRANDES = {
    'BOGOTA', 'MEDELLIN', 'CALI', 'CARTAGENA', 'BARRANQUILLA', 'CUCUTA',
    'BUCARAMANGA', 'PEREIRA', 'MANIZALES', 'PASTO', 'MONTERIA', 'VILLAVICENCIO',
    'NEIVA', 'TUNJA', 'YOPAL', 'FLORENCIA', 'BUENAVENTURA', 'BARRANCABERMEJA',
    'SABANETA', 'CHIA', 'MOSQUERA', 'CAJICA', 'RIONEGRO (ANT)',
}

rows = list(csv.DictReader(open('guias-heka.csv')))
for r in rows:
    r['recaudo'] = int(r['recaudo'])
    r['flete'] = int(r['flete'])
    r['producto'] = r['recaudo'] - r['flete']
    r['unidades'] = max(1, round(r['producto'] / 60000))
    r['grande'] = r['ciudad'] in GRANDES

entregadas = [r for r in rows if r['detalle'] == 'Entrega Exitosa']
devueltas = [r for r in rows if r['detalle'] == 'Devuelto al Remitente']
eliminadas = [r for r in rows if r['estado'] == 'ELIMINADA']
resueltas = entregadas + devueltas
proceso = [r for r in rows if r not in resueltas and r not in eliminadas]

print('=' * 62)
print('ESTADO GENERAL')
print('=' * 62)
print(f'Guias totales en el archivo : {len(rows)}')
print(f'  Anuladas/eliminadas       : {len(eliminadas)}  (se excluyen)')
print(f'  Aun en proceso            : {len(proceso)}')
print(f'  RESUELTAS                 : {len(resueltas)}')
print(f'    Entregadas              : {len(entregadas)}')
print(f'    Devueltas               : {len(devueltas)}')
tasa = len(devueltas) / len(resueltas) * 100
print(f'\n>>> TASA DE RECHAZO REAL   : {tasa:.1f}%')

print()
print('=' * 62)
print('DESGLOSE DE LAS QUE SIGUEN EN PROCESO')
print('=' * 62)
d = defaultdict(int)
for r in proceso:
    d[r['detalle'] or r['estado']] += 1
for k, v in sorted(d.items(), key=lambda x: -x[1]):
    print(f'  {v:3d}  {k}')

# riesgo: cuantas en proceso pueden volverse devolucion
riesgo = [r for r in proceso if r['detalle'] in
          ('Para Reclamar en Oficina', 'En Proceso de Devolucion',
           'En confirmacion telefonica', 'Para nuevo intento de entrega')]
print(f'\n  EN RIESGO de volverse devolucion: {len(riesgo)}')
peor = (len(devueltas) + len(riesgo)) / (len(resueltas) + len(riesgo)) * 100
print(f'  Si TODAS se cayeran, el rechazo seria: {peor:.1f}%')

print()
print('=' * 62)
print('CIUDADES GRANDES  vs  PUEBLOS   (solo guias resueltas)')
print('=' * 62)
for etiqueta, cond in (('CIUDADES GRANDES', True), ('PUEBLOS / MUNICIPIOS', False)):
    ent = [r for r in entregadas if r['grande'] == cond]
    dev = [r for r in devueltas if r['grande'] == cond]
    tot = len(ent) + len(dev)
    if tot:
        print(f'{etiqueta:22s} {tot:3d} resueltas | '
              f'{len(dev):2d} devueltas | RECHAZO {len(dev)/tot*100:5.1f}%')

print()
print('=' * 62)
print('RECHAZO POR CIUDAD (ciudades con 3 o mas guias resueltas)')
print('=' * 62)
porciudad = defaultdict(lambda: [0, 0])
for r in entregadas:
    porciudad[r['ciudad']][0] += 1
for r in devueltas:
    porciudad[r['ciudad']][1] += 1
filas = [(c, e, dv, e + dv, dv / (e + dv) * 100) for c, (e, dv) in porciudad.items() if e + dv >= 3]
for c, e, dv, tot, pct in sorted(filas, key=lambda x: (-x[4], -x[3])):
    flag = ' <<< ALERTA' if pct >= 25 else (' OK' if pct == 0 else '')
    print(f'  {c:24s} {tot:3d} guias | {dv:2d} dev | {pct:5.1f}%{flag}')

print()
print('=' * 62)
print('DINERO REAL')
print('=' * 62)
uds_ent = sum(r['unidades'] for r in entregadas)
uds_dev = sum(r['unidades'] for r in devueltas)
recaudado = sum(r['recaudo'] for r in entregadas)
producto_cobrado = sum(r['producto'] for r in entregadas)
fletes_cobrados = sum(r['flete'] for r in entregadas)
print(f'Unidades entregadas y cobradas : {uds_ent}')
print(f'Unidades devueltas             : {uds_dev}')
print(f'Recaudo total (producto+flete)  : ${recaudado:,}')
print(f'  de eso, producto             : ${producto_cobrado:,}')
print(f'  de eso, flete (pasa al envio): ${fletes_cobrados:,}')
print(f'Precio promedio por unidad     : ${producto_cobrado/uds_ent:,.0f}')
print(f'Unidades por pedido (promedio) : {uds_ent/len(entregadas):.2f}')

multi = [r for r in entregadas if r['unidades'] > 1]
print(f'Pedidos de mas de 1 unidad     : {len(multi)} de {len(entregadas)} '
      f'({len(multi)/len(entregadas)*100:.0f}%)')

print()
margen_bruto = producto_cobrado - uds_ent * (COSTO_UNIDAD + EMPAQUE)
perdida_dev = uds_dev * EMPAQUE
pub = len(resueltas) * CAC
print(f'Margen de las entregadas       : +${margen_bruto:,}')
print(f'Empaque perdido en devoluciones: -${perdida_dev:,}')
print(f'Publicidad ({len(resueltas)} ventas x ${CAC:,}) : -${pub:,}')
print(f'{"UTILIDAD NETA ESTIMADA":31s}: ${margen_bruto - perdida_dev - pub:,}')
print(f'\nUtilidad por guia despachada   : ${(margen_bruto-perdida_dev-pub)/len(resueltas):,.0f}')
