import csv

# Prueba de sensibilidad: el hallazgo "grandes rechazan mas" depende de como
# se clasifiquen los municipios de area metropolitana. Se prueban 3 criterios.

CRITERIOS = {
    'A) Solo capitales/ciudades principales': {
        'BOGOTA', 'MEDELLIN', 'CALI', 'CARTAGENA', 'BARRANQUILLA', 'CUCUTA',
        'BUCARAMANGA', 'PEREIRA', 'MANIZALES', 'PASTO', 'MONTERIA',
        'VILLAVICENCIO', 'NEIVA', 'TUNJA', 'YOPAL', 'FLORENCIA',
    },
    'B) + area metropolitana y ciudades medias': {
        'BOGOTA', 'MEDELLIN', 'CALI', 'CARTAGENA', 'BARRANQUILLA', 'CUCUTA',
        'BUCARAMANGA', 'PEREIRA', 'MANIZALES', 'PASTO', 'MONTERIA',
        'VILLAVICENCIO', 'NEIVA', 'TUNJA', 'YOPAL', 'FLORENCIA',
        'BUENAVENTURA', 'BARRANCABERMEJA', 'SABANETA', 'CHIA', 'MOSQUERA',
        'CAJICA', 'RIONEGRO (ANT)',
    },
    'C) Solo las 6 mas grandes del pais': {
        'BOGOTA', 'MEDELLIN', 'CALI', 'CARTAGENA', 'BARRANQUILLA', 'CUCUTA',
    },
}

rows = list(csv.DictReader(open('guias-heka.csv')))
ent = [r for r in rows if r['detalle'] == 'Entrega Exitosa']
dev = [r for r in rows if r['detalle'] == 'Devuelto al Remitente']

for nombre, grandes in CRITERIOS.items():
    print(nombre)
    for etiqueta, cond in (('  Grandes', True), ('  Resto  ', False)):
        e = sum(1 for r in ent if (r['ciudad'] in grandes) == cond)
        d = sum(1 for r in dev if (r['ciudad'] in grandes) == cond)
        if e + d:
            print(f'{etiqueta}: {e+d:3d} resueltas | {d:2d} dev | '
                  f'RECHAZO {d/(e+d)*100:5.1f}%')
    print()

print('=' * 62)
print('LAS 15 DEVOLUCIONES, UNA POR UNA')
print('=' * 62)
for r in dev:
    print(f'  {r["ciudad"]:24s} flete ${int(r["flete"]):,}')

print()
print('=' * 62)
print('FLETE PROMEDIO: lo que el CLIENTE paga de mas segun destino')
print('=' * 62)
for nombre, grandes in [('Ciudades principales', CRITERIOS['A) Solo capitales/ciudades principales'])]:
    for etiqueta, cond in (('Principales', True), ('Pueblos   ', False)):
        fl = [int(r['flete']) for r in ent if (r['ciudad'] in grandes) == cond]
        print(f'  {etiqueta}: flete promedio ${sum(fl)/len(fl):,.0f}  '
              f'-> el cliente paga ${59900 + sum(fl)/len(fl):,.0f} en total')
