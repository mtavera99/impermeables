import csv
from collections import Counter

rows = list(csv.DictReader(open('guias-heka.csv')))
ent = [r for r in rows if r['detalle'] == 'Entrega Exitosa']

for r in ent:
    r['producto'] = int(r['recaudo']) - int(r['flete'])
    r['uds'] = max(1, round(r['producto'] / 60000))

dist = Counter(r['uds'] for r in ent)
print('METODO: unidades = (recaudo - flete) / 60.000, redondeado')
print()
print('DISTRIBUCION DE LAS 84 GUIAS ENTREGADAS')
print('-' * 52)
total = 0
for uds in sorted(dist):
    guias = dist[uds]
    subtotal = uds * guias
    total += subtotal
    print(f'  {guias:3d} guias de {uds} unidad(es) = {subtotal:3d} unidades')
print('-' * 52)
print(f'  {len(ent):3d} guias                  = {total:3d} UNIDADES  <-- los 104')

print()
print('LOS 14 PEDIDOS DE MAS DE UNA UNIDAD (para que los verifiques)')
print('-' * 52)
for r in sorted([x for x in ent if x['uds'] > 1], key=lambda x: -x['producto']):
    print(f'  {r["ciudad"]:22s} producto ${r["producto"]:>7,} -> {r["uds"]} uds')

print()
print('COMPROBACION CRUZADA')
print('-' * 52)
prod = sum(r['producto'] for r in ent)
print(f'  Producto total cobrado : ${prod:,}')
print(f'  Dividido en {total} unidades : ${prod/total:,.0f} por unidad')
print(f'  Tu precio de lista     : $59.900')
print(f'  Diferencia             : {(prod/total)/59900*100-100:+.1f}%')
