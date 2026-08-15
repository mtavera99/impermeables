"""CPA real de la ventana HEKA (hasta el 9 de agosto de 2026).

Las ventas posteriores al 9-ago ya salieron por 99 Envios, asi que se
corta el gasto publicitario en esa fecha para que ambos lados cuadren.

DATOS EXACTOS (de exports de Meta):
  1 jul - 14 ago : $1.070.672
  1 - 31 jul     : $389.432   (documentado en el archivo del proyecto)
  27 - 31 jul    : $179.432   (documentado)
  10 ago         : $43.366    (medido en pantalla)
  11 ago         : $53.988    (medido en pantalla)

ESTIMADO: solo los dias 12, 13 y 14 de agosto (~$48.000/dia).
"""
import csv, datetime
from collections import Counter

GASTO_1JUL_14AGO = 1_070_672
GASTO_JULIO = 389_432
GASTO_27_31JUL = 179_432
GASTO_10AGO, GASTO_11AGO = 43_366, 53_988
EST_DIARIO = 48_000            # para 12, 13 y 14 de agosto

MARGEN_UNIDAD = 59_933 - 34_000 - 1_500   # $24.433
EMPAQUE = 1_500

# --- gasto por ventana ---
gasto_1_14ago = GASTO_1JUL_14AGO - GASTO_JULIO
gasto_10_14ago = GASTO_10AGO + GASTO_11AGO + 3 * EST_DIARIO
gasto_1_9ago = gasto_1_14ago - gasto_10_14ago

VENTANAS = {
    'A) Todo desde el lanzamiento (1 jul - 9 ago)': GASTO_JULIO + gasto_1_9ago,
    'B) Operacion continua (27 jul - 9 ago)': GASTO_27_31JUL + gasto_1_9ago,
}

# --- ventas del archivo de Heka ---
rows = [r for r in csv.DictReader(open('guias-heka.csv'))
        if r['transportadora'] == 'INTERRAPIDISIMO'
        and not (r['ciudad'] == 'YOPAL' and int(r['recaudo']) == 526698)
        and r['estado'] != 'ELIMINADA']
for r in rows:
    r['d'] = datetime.date(1899, 12, 30) + datetime.timedelta(days=int(r['fecha']))

CORTE_A = datetime.date(2026, 7, 1)
CORTE_B = datetime.date(2026, 7, 27)
ventas = {
    'A) Todo desde el lanzamiento (1 jul - 9 ago)': [r for r in rows if r['d'] >= CORTE_A],
    'B) Operacion continua (27 jul - 9 ago)': [r for r in rows if r['d'] >= CORTE_B],
}

TASA_ENTREGA = 83 / 98   # de las 98 resueltas, 83 se entregaron

print('=' * 64)
print('GASTO PUBLICITARIO POR VENTANA')
print('=' * 64)
print(f'  1 jul - 14 ago (exacto)   : ${GASTO_1JUL_14AGO:,}')
print(f'  - julio (exacto)          : ${GASTO_JULIO:,}')
print(f'  = 1 - 14 ago              : ${gasto_1_14ago:,}')
print(f'  - 10 al 14 ago            : ${gasto_10_14ago:,}  (12-14 estimados)')
print(f'  = 1 - 9 AGO               : ${gasto_1_9ago:,}')

for nombre, gasto in VENTANAS.items():
    v = ventas[nombre]
    n = len(v)
    entregadas_est = n * TASA_ENTREGA
    uds = sum(max(1, round((int(r['recaudo']) - int(r['flete'])) / 60000)) for r in v)
    print()
    print('=' * 64)
    print(nombre)
    print('=' * 64)
    print(f'  Gasto publicitario        : ${gasto:,}')
    print(f'  Ventas cerradas (guias)   : {n}')
    print(f'  >>> CPA por venta CERRADA : ${gasto/n:,.0f}')
    print(f'  >>> CPA por venta ENTREGADA: ${gasto/entregadas_est:,.0f}   <-- el real')
    print()
    # utilidad de la ventana
    uds_ent = uds * TASA_ENTREGA
    uds_dev = uds - uds_ent
    margen = uds_ent * MARGEN_UNIDAD
    neto = margen - uds_dev * EMPAQUE - gasto
    print(f'  Unidades vendidas         : {uds}')
    print(f'  Margen de las entregadas  : +${margen:,.0f}')
    print(f'  Empaque perdido           : -${uds_dev*EMPAQUE:,.0f}')
    print(f'  Publicidad                : -${gasto:,}')
    print(f'  >>> UTILIDAD NETA         : ${neto:,.0f}')
    print(f'  Utilidad por venta cerrada: ${neto/n:,.0f}')
    print(f'  Margen sobre lo vendido   : {neto/(uds*59933)*100:.1f}%')
