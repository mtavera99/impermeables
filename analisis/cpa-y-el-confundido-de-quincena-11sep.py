#!/usr/bin/env python3
"""
EL CPA EXACTO, Y POR QUE NO PUEDO SEPARAR EL GUION DE LA QUINCENA (2026-09-11)
==============================================================================
El dueno pregunto dos cosas:
  1. "Cuanto fue el CPA entonces?"
  2. "No es normal que se caiga un poco por las fechas? Porque unos dias
      fueron quincena?"

La segunda pregunta desarma mi conclusion de 0-AJ, y hay que decirlo.
"""

L = '=' * 78

# gasto del TRADICIONAL por dia (API, descontado el colmena)
TRAD = {'2026-09-01': 173_163, '2026-09-02': 183_022, '2026-09-03': 153_600,
        '2026-09-04': 105_069, '2026-09-05': 145_305, '2026-09-06': 156_442,
        '2026-09-07': 174_212, '2026-09-08': 128_285, '2026-09-09': 133_101,
        '2026-09-10': 203_169}
CONV = {'2026-09-01': 164, '2026-09-02': 276, '2026-09-03': 232, '2026-09-04': 181,
        '2026-09-05': 211, '2026-09-06': 239, '2026-09-07': 260, '2026-09-08': 159,
        '2026-09-09': 129, '2026-09-10': 220}
# guias y unidades del tradicional por dia de despacho
Q = {'2026-09-02': (32, 37), '2026-09-03': (24, 32), '2026-09-04': (11, 13),
     '2026-09-07': (37, 44), '2026-09-08': (15, 16), '2026-09-09': (6, 8),
     '2026-09-10': (12, 16)}
SHARE2 = {'2026-09-02': .156, '2026-09-03': .333, '2026-09-04': .182,
          '2026-09-07': .194, '2026-09-08': .067, '2026-09-09': .333,
          '2026-09-10': .333, '2026-09-11': .267}

UTIL_PEDIDO = 24_129   # 0-AE, con costo de producto $33.000

BLOQUES = [
    ('A. 1-4 sep', ['2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04'],
     ['2026-09-02', '2026-09-03', '2026-09-04'], 4, 'post-pago del 31-ago'),
    ('B. 5-7 sep', ['2026-09-05', '2026-09-06', '2026-09-07'], ['2026-09-07'], 3,
     'finde + lunes, bajando'),
    ('C. 8-10 sep', ['2026-09-08', '2026-09-09', '2026-09-10'],
     ['2026-09-08', '2026-09-09', '2026-09-10'], 3, 'VALLE, antes del 15'),
]

print(L)
print('1. EL CPA, EN LAS DOS UNIDADES QUE USA EL PROYECTO')
print(L)
print(f"{'bloque':<13}{'gasto/dia':>11}{'ped/dia':>9}{'CPA/pedido':>12}"
      f"{'uds/dia':>9}{'CPA/unidad':>12}")
res = {}
for nom, dg, dq, n, _ in BLOQUES:
    g = sum(TRAD[d] for d in dg)
    ped = sum(Q[d][0] for d in dq)
    uds = sum(Q[d][1] for d in dq)
    cv = sum(CONV[d] for d in dg)
    res[nom] = (g, ped, uds, cv, n)
    print(f'{nom:<13}{g/n:>11,.0f}{ped/n:>9.1f}{g/ped:>12,.0f}'
          f'{uds/n:>9.1f}{g/uds:>12,.0f}')
print()
print('  📌 El archivo madre usa CPA POR PEDIDO. Los historicos para comparar:')
print('     25-ago (0-Y) : $7.664/pedido   |   4-sep (0-AC): $7.806/pedido')
print()
print(L)
print('2. ¿ESTA PERDIENDO PLATA? NO. PERO GANA MUCHO MENOS')
print(L)
print(f'  utilidad por pedido antes de pauta (0-AE): ${UTIL_PEDIDO:,}')
print()
print(f"  {'bloque':<13}{'CPA/pedido':>12}{'utilidad neta':>15}{'ped/dia':>9}{'utilidad/dia':>15}")
for nom, _, _, n, _ in [(b[0], 0, 0, b[3], 0) for b in BLOQUES]:
    g, ped, uds, cv, n = res[nom]
    cpa = g / ped
    neta = UTIL_PEDIDO - cpa
    print(f'  {nom:<13}{cpa:>12,.0f}{neta:>15,.0f}{ped/n:>9.1f}{neta*ped/n:>15,.0f}')
a = res['A. 1-4 sep']; c = res['C. 8-10 sep']
ua = (UTIL_PEDIDO - a[0]/a[1]) * a[1]/a[4]
uc = (UTIL_PEDIDO - c[0]/c[1]) * c[1]/c[4]
print()
print(f'  >>> DIFERENCIA: ${ua-uc:,.0f} de utilidad POR DIA = ${(ua-uc)*30:,.0f}/mes')
print('      El negocio sigue rentable. Pero se le fue esa plata.')
print()

print(L)
print('3. 🔴 LA PREGUNTA DE LA QUINCENA DESARMA MI CONCLUSION. Y TIENE RAZON')
print(L)
print('  Calendario de septiembre 2026 (1-sep fue martes):')
print()
print(f"  {'bloque':<13}{'dias del mes':>14}{'fase del ciclo':>26}{'uds/dia':>9}")
for nom, dg, dq, n, fase in BLOQUES:
    dias = f"{dg[0][-2:]} al {dg[-1][-2:]}"
    g, ped, uds, cv, n2 = res[nom]
    print(f'  {nom:<13}{dias:>14}{fase:>26}{uds/n2:>9.1f}')
print()
print('  🔑 EL PAGO EN COLOMBIA ES EL 30/31 Y EL 15.')
print('     El bloque A (1-4 sep) cae JUSTO DESPUES del pago del 31-ago.')
print('     El bloque C (8-10 sep) cae en el VALLE, antes del pago del 15.')
print()
print('  >>> ASI QUE COMPARE EL MEJOR TRAMO DEL CICLO CONTRA EL PEOR.')
print('      Es el mismo error de ventana censurada, otra vez, en version')
print('      calendario. La caida de 20,5 a 13,3 uds/dia puede ser el ciclo')
print('      y no el guion.')
print()

print(L)
print('4. Y LO PEOR: LAS DOS HIPOTESIS PREDICEN EXACTAMENTE LO MISMO')
print(L)
print('  Yo dije: "las conversaciones no cayeron, el cierre si -> es el guion".')
print('  Pero la quincena predice IGUAL:')
print()
print('     sin plata, la gente ESCRIBE lo mismo ("cuanto vale?") y NO COMPRA')
print('     ("te escribo cuando me paguen").')
print()
print('  >>> conversaciones planas + cierre caido es la firma de LAS DOS.')
print('      Con los datos que tengo NO PUEDO SEPARARLAS. No esta identificado.')
print()

print(L)
print('5. LO UNICO QUE SI DISCRIMINA: EL SHARE DE 2 UNIDADES')
print(L)
print('  Aca si hay un dato que la quincena NO puede explicar:')
print()
print(f"  {'dia':<13}{'share 2+ uds':>14}")
for d in sorted(SHARE2):
    marca = ''
    if d == '2026-09-08':
        marca = '  <-- roto'
    if d == '2026-09-09':
        marca = '  <-- DIA DEL PARCHE DEL GUION'
    print(f'  {d:<13}{SHARE2[d]:>13.1%}{marca}')
print()
print('  🔑 Salto de 6,7% a 33,3% EN UN DIA, y ese dia es exactamente el dia')
print('     en que se pegaron los cinco parches. El 9 de septiembre NO es')
print('     quincena ni pago: esta en el medio del valle.')
print()
print('  >>> UN CICLO DE PAGO NO PRODUCE UN 5x DE UN DIA A OTRO EN MITAD DEL')
print('      VALLE. Eso es el guion, y esa parte queda confirmada.')
print('  >>> PERO el share de 2 uds explica el tamano del pedido, no cuantos')
print('      pedidos hay. La caida de VOLUMEN sigue sin identificar.')
print()

print(L)
print('6. EL TEST QUE SI LO RESUELVE — Y SE REGISTRA ANTES, NO DESPUES')
print(L)
print('  El pago del 15-sep (martes) es el experimento natural. 0-L ya uso')
print('  este mismo metodo con el pago del 15-ago y funciono.')
print()
print('  PREDICCION REGISTRADA HOY, 11-sep, ANTES DE VER EL RESULTADO:')
print()
print(f"  {'si el 16-18 sep...':<34}{'entonces':<44}")
print(f"  {'-'*34} {'-'*43}")
print(f"  {'uds/dia vuelve a ~20 y cierre a ~9,6%':<34} {'era EL CICLO. El guion ya esta bien.':<44}")
print(f"  {'uds/dia se queda en ~13-15':<34} {'era EL GUION y falta arreglar mas.':<44}")
print(f"  {'sube a ~16-17 (a medias)':<34} {'son las dos, mitad y mitad.':<44}")
print()
print('  ⛔ NO TOCAR PRESUPUESTOS ANTES DE ESO. Si se mueve la pauta el lunes')
print('     14 y el 15 entra el pago, los dos efectos se mezclan y se pierde')
print('     el unico experimento limpio que da el calendario.')
print()
print('  📌 Y OJO CON EL HISTORIAL: el archivo madre nunca probo la quincena.')
print('     0-I (14-ago): "no hay ni un dato que respalde la quincena", y el')
print('        corte crudo apuntaba EN CONTRA (pre-pago 9,3 vs post-pago 7,8).')
print('     0-Y (25-ago): el rango "valle 26-29" estaba ESCRITO A MANO en')
print('        ciclo-quincena.py como etiqueta, y se uso como si fuera medido.')
print('     0-L (19-ago): el rebote post-pago del 15-ago SI se cumplio. Es la')
print('        UNICA evidencia a favor, y fue una prediccion registrada antes.')
print()
print('  >>> O sea: el ciclo tiene UNA confirmacion buena y varias suposiciones.')
print('      El pago del 15-sep es la segunda oportunidad de medirlo bien.')
print(L)
