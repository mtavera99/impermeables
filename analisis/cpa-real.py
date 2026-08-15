"""Estimacion del CPA real de la campana.

Datos duros disponibles:
  - Campana 1 jul - 14 ago : $1.070.672 gastados, 1.991 conversaciones
  - Ventas documentadas    : julio 50 | 1-4 ago 30 | 11 ago 6 | 12 ago 5
  - Ventas 5-10 ago        : el dueno reporto "10-12 por dia" (6 dias)
  - Rechazo real (Heka)    : 15.3%
"""

GASTO_TOTAL = 1_070_672      # 1 jul - 14 ago
CONV_TOTAL = 1_991
RECHAZO = 0.153
MARGEN_UNIDAD = 59_933 - 34_000 - 1_500   # precio real - producto - empaque

# 13 y 14 de agosto no tienen ventas reportadas -> se recorta la ventana
GASTO_DIARIO_EST = 48_000
gasto_1jul_12ago = GASTO_TOTAL - 2 * GASTO_DIARIO_EST

print('=' * 60)
print('LO QUE EL CSV DA DIRECTO (1 jul - 14 ago, 45 dias)')
print('=' * 60)
print(f'  Gastado              : ${GASTO_TOTAL:,}')
print(f'  Conversaciones       : {CONV_TOTAL:,}')
print(f'  Costo/conversacion   : ${GASTO_TOTAL/CONV_TOTAL:,.2f}')
print(f'  Gasto por dia        : ${GASTO_TOTAL/45:,.0f}')
print(f'  Conversaciones/dia   : {CONV_TOTAL/45:.1f}')

print()
print('=' * 60)
print('CPA ESTIMADO (1 jul - 12 ago, con rango por las ventas 5-10 ago)')
print('=' * 60)
print(f'  Gasto estimado       : ${gasto_1jul_12ago:,}')
print()
for etiqueta, por_dia in (('Escenario BAJO (10/dia)', 10), ('Escenario ALTO (12/dia)', 12)):
    ventas = 50 + 30 + 6 * por_dia + 6 + 5
    cpa_cerrada = gasto_1jul_12ago / ventas
    entregadas = ventas * (1 - RECHAZO)
    cpa_entregada = gasto_1jul_12ago / entregadas
    print(f'{etiqueta}: {ventas} ventas cerradas')
    print(f'   CPA por venta CERRADA    : ${cpa_cerrada:,.0f}')
    print(f'   CPA por venta ENTREGADA  : ${cpa_entregada:,.0f}   <-- el que importa')
    print()

print('=' * 60)
print('COMPARACION CON EL NUMERO QUE VENIAMOS USANDO')
print('=' * 60)
print('  CAC que usabamos (1-4 ago) : $5,018')
print('  CAC real del periodo       : ~$6,000 - $6,450')
print('  CAC por cliente que PAGA   : ~$7,050 - $7,600')
print('  -> El $5.018 era la MEJOR ventana, no el promedio')

print()
print('=' * 60)
print('RECALCULO DE LA UTILIDAD DE HEKA CON EL CAC REAL')
print('=' * 60)
UDS_ENT, UDS_DEV, RESUELTAS = 96, 17, 98
margen = UDS_ENT * MARGEN_UNIDAD
perdida = UDS_DEV * 1_500
for cac in (5_018, 6_000, 6_200, 6_450):
    pub = RESUELTAS * cac
    neto = margen - perdida - pub
    marca = '  <-- lo que reporte antes' if cac == 5_018 else ''
    print(f'  CAC ${cac:,}: utilidad ${neto:>10,} | '
          f'${neto/RESUELTAS:>6,.0f} por guia{marca}')

print()
print('  Punto de equilibrio del CAC:')
print(f'  ${(margen - perdida)/RESUELTAS:,.0f} por venta cerrada')
