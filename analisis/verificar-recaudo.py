import csv

rows = list(csv.DictReader(open('guias-heka.csv')))
ent = [r for r in rows if r['detalle'] == 'Entrega Exitosa']

recaudo = sum(int(r['recaudo']) for r in ent)
flete = sum(int(r['flete']) for r in ent)
producto = recaudo - flete

print(f'Guias con "Entrega Exitosa": {len(ent)}')
print(f'  Suma de la columna Recaudo : ${recaudo:,}   <-- los "8 millones"')
print(f'  Suma de la columna Flete   : ${flete:,}')
print(f'  Producto (recaudo - flete) : ${producto:,}')
print()
print('EJEMPLOS DE COMO SE DESCOMPONE CADA GUIA:')
for r in ent[:2] + [x for x in ent if int(x['recaudo']) > 140000][:2]:
    p = int(r['recaudo']) - int(r['flete'])
    print(f'  {r["ciudad"]:14s} recaudo ${int(r["recaudo"]):>7,} '
          f'- flete ${int(r["flete"]):>6,} = producto ${p:>7,} '
          f'-> {p/60000:.1f} unidades')

print()
print('=' * 58)
print('LAS GUIAS QUE NO CUADRAN CON $60.000 POR UNIDAD')
print('=' * 58)
raras = []
for r in ent:
    p = int(r['recaudo']) - int(r['flete'])
    resto = p % 60000
    if resto > 500 and resto < 59500:
        raras.append((r['ciudad'], p, p / 60000))
for c, p, u in sorted(raras, key=lambda x: -x[1]):
    print(f'  {c:16s} producto ${p:>7,}  = {u:.2f} unidades ???')

print()
print('=' * 58)
print('SENSIBILIDAD: cuanto cambia si el pedido grande de YOPAL')
print('($450.000 de producto) fueran 7, 8 o 9 unidades')
print('=' * 58)
base_unidades = sum(max(1, round((int(r['recaudo']) - int(r['flete'])) / 60000)) for r in ent)
for supuesto in (7, 8, 9):
    uds = base_unidades - 8 + supuesto
    margen = producto - uds * (34000 + 1500)
    neto = margen - 25500 - 99 * 5018
    print(f'  Si fueran {supuesto} uds -> total {uds} unidades | '
          f'utilidad neta ${neto:,}')
