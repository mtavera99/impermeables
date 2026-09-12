#!/usr/bin/env python3
"""
CORRECCION: LAS 12 VENTAS/DIA ESTABAN MAL, Y EL DIAGNOSTICO TAMBIEN (2026-09-11)
================================================================================
El dueno dijo "12 ventas de promedio del 8-11? Pensé eran mas". Tenia razon.
Tres errores mios, y al corregirlos se cae la conclusion que habia sacado.

ERROR 1 - Conte GUIAS, no UNIDADES. Son 1,21 unidades por guia.
ERROR 2 - Meti el 11-sep como si estuviera completo. NO lo esta: el ultimo
          lote salio 14:53 Bogota (todos los otros dias salen 15:40-17:13) y
          el export se saco 15:30. Falta el lote de la tarde.
ERROR 3 - Meti el 9-sep, que es el dia con hueco de saldo, dentro del promedio.

Y EL ERROR GRANDE: dije "el gasto subio 60% y las ventas no". FALSO. Compare
contra el corte del 25-ago, dos semanas y mil cambios antes. Con el gasto
diario real de septiembre, traido de la API, el gasto estuvo PLANO.

METODO: se compara por BLOQUES de dias de despacho, no por dia suelto.
El despacho sale ~16:00, asi que las guias de un dia incluyen la noche del
dia anterior. Eso se promedia en bloques de 3-4 dias, no en un dia.
Y se descuenta el gasto del COLMENA, que no podia producir guias del
tradicional (el colmena vendio 2 unidades en toda la ventana).
"""

L = '=' * 78

# gasto diario de la API, separado tradicional / colmena
GASTO = {
    '2026-09-01': (173_163, 0), '2026-09-02': (183_022, 7_279),
    '2026-09-03': (153_600, 305), '2026-09-04': (105_069, 14_787),
    '2026-09-05': (145_305, 40_166), '2026-09-06': (156_442, 36_150),
    '2026-09-07': (174_212, 16_178), '2026-09-08': (128_285, 18_717),
    '2026-09-09': (133_101, 11_350), '2026-09-10': (203_169, 0),
}
CONV = {'2026-09-01': 164, '2026-09-02': 276, '2026-09-03': 232, '2026-09-04': 181,
        '2026-09-05': 211, '2026-09-06': 239, '2026-09-07': 260, '2026-09-08': 159,
        '2026-09-09': 129, '2026-09-10': 220}

# del export: guias y unidades por dia de despacho (tradicional, sin colmena ni mayoreo)
GUIAS = {'2026-09-02': (32, 37), '2026-09-03': (24, 32), '2026-09-04': (11, 13),
         '2026-09-07': (37, 44), '2026-09-08': (15, 16), '2026-09-09': (6, 8),
         '2026-09-10': (12, 16)}
# (el 7-sep tenia 39 guias: se le quitan las 2 del colmena)

BLOQUES = [
    ('A. 1 al 4-sep', ['2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04'],
     ['2026-09-02', '2026-09-03', '2026-09-04'], 4),
    ('B. 5 al 7-sep', ['2026-09-05', '2026-09-06', '2026-09-07'], ['2026-09-07'], 3),
    ('C. 8 al 10-sep', ['2026-09-08', '2026-09-09', '2026-09-10'],
     ['2026-09-08', '2026-09-09', '2026-09-10'], 3),
]

print(L)
print('1. EL NUMERO CORREGIDO')
print(L)
print(f"{'bloque':<16}{'dias':>5}{'gasto trad':>12}{'/dia':>10}{'uds':>5}{'uds/dia':>9}{'$/ud':>9}{'conv':>6}{'uds/conv':>10}")
res = {}
for nom, dias_g, dias_q, n in BLOQUES:
    gt = sum(GASTO[d][0] for d in dias_g)
    cv = sum(CONV[d] for d in dias_g)
    uds = sum(GUIAS[d][1] for d in dias_q)
    qs = sum(GUIAS[d][0] for d in dias_q)
    res[nom] = (gt, uds, qs, cv, n)
    print(f'{nom:<16}{n:>5}{gt:>12,.0f}{gt/n:>10,.0f}{uds:>5}{uds/n:>9.1f}'
          f'{gt/uds:>9,.0f}{cv:>6}{uds/cv:>9.1%}')
print()
print('  🔑 EL GASTO DEL TRADICIONAL ESTUVO PLANO: ~$154.000/dia en los TRES bloques.')
print('     Las unidades/dia cayeron 20,5 -> 14,7 -> 13,3 = -35%.')
print()
print('  >>> ASI QUE NO ES "SUBIMOS EL GASTO Y NO RINDIO". Es peor y distinto:')
print('      EL MISMO GASTO PRODUCE 35% MENOS UNIDADES QUE HACE UNA SEMANA.')
print()

print(L)
print('2. DONDE SE ROMPIO: NO ES LA PAUTA, ES EL CIERRE')
print(L)
print('  Las conversaciones NO se cayeron. Lo que se cayo es cuantas cierran:')
print()
print(f"  {'bloque':<16}{'conv/dia':>10}{'uds/conv':>10}")
for nom, _, _, n in [(b[0], 0, 0, b[3]) for b in BLOQUES]:
    gt, uds, qs, cv, n = res[nom]
    print(f'  {nom:<16}{cv/n:>10.0f}{uds/cv:>10.1%}')
print()
print('  🔑 conversaciones/dia: 213 -> 237 -> 169  (sube y baja, ruido)')
print('     cierre uds/conv   : 9,6% -> 6,2% -> 7,9%  <-- ESTO es lo que se rompio')
print()
print('  Y el archivo madre YA DOCUMENTA que se rompio exactamente ahi:')
print('     0-AF (9-sep): "cinco parches al guion: el bot vendia con MENU"')
print('                   "el bot descontó $4.000 de entrada"')
print('     0-AE (8-sep): "la IA dejo de ofrecer la promo" -> alarma #60')
print('     y el share de 2 uds el 8-sep fue 6,7% (roto) contra 26,8% de 0-V')
print()
print('  >>> LA CAIDA ES DEL GUION, NO DE META. Y el parche del 9-sep ya')
print('      empezo a revertirla: el cierre subio de 6,2% a 7,9% y el share')
print('      de 2 uds volvio a 33% el 9, 10 y 26,7% el 11.')
print()

print(L)
print('3. LO QUE ESTO LE HACE A MI RECOMENDACION DEL LUNES')
print(L)
print('  ANTES dije: "bajar el gasto, la elasticidad se cumplio".')
print('  AHORA los datos dicen otra cosa:')
print()
print('  ❌ La elasticidad NO explica esto. El gasto no subio: estuvo plano.')
print('     Comparar contra el corte del 25-ago ($105.000/dia) fue el error:')
print('     son dos semanas, otros creativos y otra geografia.')
print()
print('  ✅ Lo que explica la caida es el CIERRE (9,6% -> 6,2%), y la causa')
print('     esta documentada: el guion se rompio entre el 5 y el 8-sep.')
print()
print('  >>> PRIORIDAD 1 DEL LUNES: NO es tocar presupuestos. Es CONFIRMAR')
print('      que los cinco parches del guion quedaron (#95), sobre todo los')
print('      dos que sangran: "esta muy caro" y "soy de Tado". Cada punto de')
print('      cierre recuperado vale mas que cualquier movida de pauta:')
uds_dia_hoy = res['C. 8 al 10-sep'][1] / 3
cv_dia_hoy = res['C. 8 al 10-sep'][3] / 3
for tasa, et in ((0.079, 'hoy'), (0.096, 'como el 1-4 sep')):
    u = cv_dia_hoy * tasa
    print(f'       cierre {tasa:.1%} ({et:<16}) -> {u:>4.1f} uds/dia')
delta = cv_dia_hoy * (0.096 - 0.079)
print(f'     >>> volver al cierre del 1-4 sep = +{delta:.1f} unidades/dia')
print(f'         a $24.129 de utilidad = ${delta*24_129:,.0f}/dia = '
      f'${delta*24_129*30:,.0f}/mes')
print()
print(L)
print('4. LO QUE SIGUE SIENDO CIERTO DE LO ANTERIOR')
print(L)
print('  ✅ El hueco de saldo del 9-sep es real y esta medido (seccion 0-AI).')
print('     PERO OJO: el despacho del 9-sep salio 16:56 y el rebote de Meta')
print('     fue a las 18:00. Asi que las 6 guias de ese dia NO pueden ser')
print('     efecto del rebote: el rebote no habia pasado todavia.')
print('     >>> ME EQUIVOQUE AL DECIR QUE EL REBOTE COMPRO BASURA. No esta')
print('         probado. Lo que si esta probado es que hubo 4 horas sin')
print('         entrega, y eso es plata que no se gasto en el mejor momento.')
print('  ✅ Domiciliarios se esta diluyendo (0-AH): eso se sostiene, sale de')
print('     conv/mil y CPM, que no dependen de las guias.')
print('  ✅ Motorizados pasa el gate con $884.')
print('  ✅ #88 desbloqueado: el export trae telefono.')
print(L)
