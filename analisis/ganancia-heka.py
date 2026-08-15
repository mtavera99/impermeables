"""Ganancia total del periodo HEKA (15 jul - 9 ago 2026), dos escenarios.

Se carga TODA la publicidad de la campana desde su inicio hasta el 9-ago
($829.318) contra TODAS las ventas del archivo de Heka (119). Asi no queda
gasto huerfano ni venta sin costear.
"""
import csv

PRECIO_UNIDAD = 59_933
COSTO_UNIDAD = 34_000
EMPAQUE = 1_500
MARGEN_UNIDAD = PRECIO_UNIDAD - COSTO_UNIDAD - EMPAQUE     # $24.433
PUBLICIDAD = 829_318          # 1 jul - 9 ago
TASA_ENTREGA = 83 / 98        # 84,7% observado en las resueltas

rows = [r for r in csv.DictReader(open('guias-heka.csv'))
        if r['transportadora'] == 'INTERRAPIDISIMO'
        and not (r['ciudad'] == 'YOPAL' and int(r['recaudo']) == 526_698)
        and r['estado'] != 'ELIMINADA']
for r in rows:
    r['uds'] = max(1, round((int(r['recaudo']) - int(r['flete'])) / 60_000))

ent = [r for r in rows if r['detalle'] == 'Entrega Exitosa']
dev = [r for r in rows if r['detalle'] == 'Devuelto al Remitente']
proc = [r for r in rows if r not in ent and r not in dev]

U_ENT = sum(r['uds'] for r in ent)
U_DEV = sum(r['uds'] for r in dev)
U_PROC = sum(r['uds'] for r in proc)

print(f'Ventas totales del periodo Heka : {len(rows)}')
print(f'  Entregadas : {len(ent):3d} guias / {U_ENT:3d} unidades')
print(f'  Devueltas  : {len(dev):3d} guias / {U_DEV:3d} unidades')
print(f'  En proceso : {len(proc):3d} guias / {U_PROC:3d} unidades')
print(f'Publicidad del periodo          : ${PUBLICIDAD:,}')

def caso(titulo, uds_entregadas, uds_devueltas, nota=''):
    margen = uds_entregadas * MARGEN_UNIDAD
    perdida = uds_devueltas * EMPAQUE
    neto = margen - perdida - PUBLICIDAD
    print()
    print('=' * 62)
    print(titulo)
    if nota:
        print(nota)
    print('=' * 62)
    print(f'  Unidades cobradas          : {uds_entregadas:.0f}')
    print(f'  Margen de las entregadas   : +${margen:>10,.0f}')
    print(f'  Empaque perdido en devol.  : -${perdida:>10,.0f}')
    print(f'  Publicidad                 : -${PUBLICIDAD:>10,.0f}')
    print(f'  {"GANANCIA NETA":26s} : ${neto:>11,.0f}')
    return neto

# ---- CASO 1: solo lo ya cobrado ----
# Las 21 en proceso ya consumieron empaque; su producto sigue siendo
# inventario (vuelve si se devuelve), asi que no se cuenta como perdida.
n1 = caso(
    'CASO 1 - SOLO LAS VENTAS YA COBRADAS (83 entregas confirmadas)',
    U_ENT, U_DEV + U_PROC,
    'Las 21 en proceso se cuentan como si TODAS fallaran (escenario piso)')

# ---- CASO 2: proyectando las en proceso ----
extra_ent = U_PROC * TASA_ENTREGA
extra_dev = U_PROC - extra_ent
n2 = caso(
    'CASO 2 - INCLUYENDO LAS 21 EN PROCESO (al 84,7% de entrega)',
    U_ENT + extra_ent, U_DEV + extra_dev,
    f'Se asume que de las {U_PROC} unidades en ruta se entregan {extra_ent:.0f}')

# ---- Techo teorico ----
n3 = caso(
    'CASO 3 - TECHO: si las 21 en proceso se entregaran TODAS',
    U_ENT + U_PROC, U_DEV,
    'Poco probable (12 estan "para reclamar en oficina"), es solo el limite')

print()
print('=' * 62)
print('RESUMEN')
print('=' * 62)
print(f'  Piso   (todas las en proceso fallan) : ${n1:>11,.0f}')
print(f'  CENTRAL (proyeccion realista)        : ${n2:>11,.0f}')
print(f'  Techo  (todas se entregan)           : ${n3:>11,.0f}')
print()
print(f'  Lo que esta en juego con las 21 en ruta: ${n3-n1:,.0f}')
print(f'  Valor de rescatar UNA guia en riesgo   : ${MARGEN_UNIDAD:,}')
