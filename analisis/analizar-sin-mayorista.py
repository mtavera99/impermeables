import csv
from collections import defaultdict, Counter

COSTO_UNIDAD, EMPAQUE, CAC = 34000, 1500, 5018

GRANDES = {
    'BOGOTA', 'MEDELLIN', 'CALI', 'CARTAGENA', 'BARRANQUILLA', 'CUCUTA',
    'BUCARAMANGA', 'PEREIRA', 'MANIZALES', 'PASTO', 'MONTERIA',
    'VILLAVICENCIO', 'NEIVA', 'TUNJA', 'YOPAL', 'FLORENCIA',
}

rows = list(csv.DictReader(open('guias-heka.csv')))

# EXCLUIR el pedido mayorista de Yopal ($450.000 de producto)
antes = len(rows)
rows = [r for r in rows
        if not (r['ciudad'] == 'YOPAL' and int(r['recaudo']) == 526698)]
print(f'Guias excluidas (pedido mayorista): {antes - len(rows)}')
print()

for r in rows:
    r['producto'] = int(r['recaudo']) - int(r['flete'])
    r['uds'] = max(1, round(r['producto'] / 60000))
    r['grande'] = r['ciudad'] in GRANDES

ent = [r for r in rows if r['detalle'] == 'Entrega Exitosa']
dev = [r for r in rows if r['detalle'] == 'Devuelto al Remitente']
elim = [r for r in rows if r['estado'] == 'ELIMINADA']
res = ent + dev
proc = [r for r in rows if r not in res and r not in elim]

print('=' * 60)
print('ESTADO GENERAL (sin el mayorista)')
print('=' * 60)
print(f'  Resueltas   : {len(res)}   (entregadas {len(ent)} | devueltas {len(dev)})')
print(f'  En proceso  : {len(proc)}')
print(f'  >>> RECHAZO : {len(dev)/len(res)*100:.1f}%')

uds_ent = sum(r['uds'] for r in ent)
uds_dev = sum(r['uds'] for r in dev)
producto = sum(r['producto'] for r in ent)
recaudo = sum(int(r['recaudo']) for r in ent)
flete = sum(int(r['flete']) for r in ent)

print()
print('=' * 60)
print('UNIDADES')
print('=' * 60)
d = Counter(r['uds'] for r in ent)
for u in sorted(d):
    print(f'  {d[u]:3d} guias de {u} unidad(es) = {u*d[u]:3d} uds')
print(f'  {len(ent):3d} guias{"":16s}= {uds_ent:3d} UNIDADES entregadas')
print(f'  Unidades por pedido      : {uds_ent/len(ent):.2f}')
print(f'  Pedidos multi-unidad     : {sum(1 for r in ent if r["uds"]>1)} '
      f'de {len(ent)} ({sum(1 for r in ent if r["uds"]>1)/len(ent)*100:.0f}%)')

print()
print('=' * 60)
print('DINERO')
print('=' * 60)
print(f'  Recaudo total            : ${recaudo:,}')
print(f'  Flete (transportadora)   : -${flete:,}')
print(f'  Producto (tuyo)          : ${producto:,}')
print(f'  >>> Precio por unidad    : ${producto/uds_ent:,.0f}  '
      f'(lista $59.900 -> {(producto/uds_ent)/59900*100-100:+.1f}%)')
print()
costo = uds_ent * COSTO_UNIDAD
emp = uds_ent * EMPAQUE
margen = producto - costo - emp
perdida = uds_dev * EMPAQUE
pub = len(res) * CAC
neto = margen - perdida - pub
print(f'  Producto cobrado         : +${producto:,}')
print(f'  Costo producto ({uds_ent} uds) : -${costo:,}')
print(f'  Empaque                  : -${emp:,}')
print(f'  MARGEN BRUTO             : ${margen:,}')
print(f'  Empaque perdido ({uds_dev} uds): -${perdida:,}')
print(f'  Publicidad ({len(res)} ventas)  : -${pub:,}')
print(f'  >>> UTILIDAD NETA        : ${neto:,}')
print()
print(f'  Utilidad por guia        : ${neto/len(res):,.0f}')
print(f'  Utilidad por unidad      : ${neto/uds_ent:,.0f}')
print(f'  Margen sobre lo cobrado  : {neto/producto*100:.1f}%')

print()
print('=' * 60)
print('RECHAZO: CIUDADES PRINCIPALES vs RESTO')
print('=' * 60)
for et, cond in (('Principales', True), ('Pueblos    ', False)):
    e = sum(1 for r in ent if r['grande'] == cond)
    v = sum(1 for r in dev if r['grande'] == cond)
    print(f'  {et}: {e+v:3d} resueltas | {v:2d} dev | RECHAZO {v/(e+v)*100:5.1f}%')

riesgo = [r for r in proc if r['detalle'] in
          ('Para Reclamar en Oficina', 'En Proceso de Devolucion',
           'En confirmacion telefonica', 'Para nuevo intento de entrega')]
print()
print(f'  En riesgo de devolucion  : {len(riesgo)} guias')
print(f'  Peor escenario           : '
      f'{(len(dev)+len(riesgo))/(len(res)+len(riesgo))*100:.1f}% de rechazo')
