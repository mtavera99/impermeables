"""Analisis definitivo de las guias de Heka.

Filtros aplicados:
  - Solo transportadora INTERRAPIDISIMO (se excluye 1 guia de Servientrega)
  - Se excluye el pedido mayorista de Yopal ($450.000 de producto)
  - Se excluyen las guias ELIMINADAS/anuladas
"""
import csv
from collections import Counter

COSTO_UNIDAD, EMPAQUE, CAC = 34000, 1500, 5018
PRINCIPALES = {
    'BOGOTA', 'MEDELLIN', 'CALI', 'CARTAGENA', 'BARRANQUILLA', 'CUCUTA',
    'BUCARAMANGA', 'PEREIRA', 'MANIZALES', 'PASTO', 'MONTERIA',
    'VILLAVICENCIO', 'NEIVA', 'TUNJA', 'YOPAL', 'FLORENCIA',
}

todas = list(csv.DictReader(open('guias-heka.csv')))
rows = [r for r in todas if r['transportadora'] == 'INTERRAPIDISIMO']
n_serv = len(todas) - len(rows)
rows = [r for r in rows if not (r['ciudad'] == 'YOPAL' and int(r['recaudo']) == 526698)]

print(f'Guias en el archivo        : {len(todas)}')
print(f'  Excluidas por Servientrega: {n_serv}')
print(f'  Excluidas por mayorista   : 1')
print(f'  QUEDAN PARA ANALIZAR      : {len(rows)}')

for r in rows:
    r['producto'] = int(r['recaudo']) - int(r['flete'])
    r['uds'] = max(1, round(r['producto'] / 60000))

ent = [r for r in rows if r['detalle'] == 'Entrega Exitosa']
dev = [r for r in rows if r['detalle'] == 'Devuelto al Remitente']
elim = [r for r in rows if r['estado'] == 'ELIMINADA']
res = ent + dev
proc = [r for r in rows if r not in res and r not in elim]

print()
print('=' * 58)
print('RESULTADO')
print('=' * 58)
print(f'  Anuladas          : {len(elim)}')
print(f'  En proceso        : {len(proc)}')
print(f'  RESUELTAS         : {len(res)}')
print(f'    Entregadas      : {len(ent)}')
print(f'    Devueltas       : {len(dev)}')
print(f'  >>> RECHAZO REAL  : {len(dev)/len(res)*100:.1f}%')

uds_e = sum(r['uds'] for r in ent)
uds_d = sum(r['uds'] for r in dev)
prod = sum(r['producto'] for r in ent)
rec = sum(int(r['recaudo']) for r in ent)
fl = sum(int(r['flete']) for r in ent)

print()
print('=' * 58)
print('DINERO')
print('=' * 58)
print(f'  Recaudo total     : ${rec:,}')
print(f'  Flete (a la transp): -${fl:,}')
print(f'  Producto (tuyo)   : ${prod:,}')
print(f'  Unidades          : {uds_e}  ->  ${prod/uds_e:,.0f} por unidad')
margen = prod - uds_e * (COSTO_UNIDAD + EMPAQUE)
perd = uds_d * EMPAQUE
pub = len(res) * CAC
neto = margen - perd - pub
print()
print(f'  Margen bruto      : ${margen:,}')
print(f'  Empaque perdido   : -${perd:,}')
print(f'  Publicidad        : -${pub:,}')
print(f'  >>> UTILIDAD NETA : ${neto:,}')
print(f'  Utilidad por guia : ${neto/len(res):,.0f}')

print()
print('=' * 58)
print('RECHAZO POR TIPO DE DESTINO')
print('=' * 58)
for et, cond in (('Ciudades principales', True), ('Pueblos / municipios', False)):
    e = sum(1 for r in ent if (r['ciudad'] in PRINCIPALES) == cond)
    v = sum(1 for r in dev if (r['ciudad'] in PRINCIPALES) == cond)
    print(f'  {et}: {e+v:3d} resueltas | {v:2d} dev | {v/(e+v)*100:5.1f}%')

riesgo = [r for r in proc if r['detalle'] in
          ('Para Reclamar en Oficina', 'En Proceso de Devolucion',
           'En confirmacion telefonica', 'Para nuevo intento de entrega')]
print()
print(f'  Guias en riesgo   : {len(riesgo)}')
print(f'  Peor escenario    : {(len(dev)+len(riesgo))/(len(res)+len(riesgo))*100:.1f}%')

print()
print('=' * 58)
print('DESGLOSE DE LAS QUE SIGUEN EN PROCESO')
print('=' * 58)
for k, v in sorted(Counter(r['detalle'] or r['estado'] for r in proc).items(),
                   key=lambda x: -x[1]):
    print(f'  {v:3d}  {k}')
