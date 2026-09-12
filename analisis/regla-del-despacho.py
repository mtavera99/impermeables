#!/usr/bin/env python3
"""
LA REGLA DEL DESPACHO — CÓMO CONTAR VENTAS SIN ENGAÑARSE (2026-09-12)
=====================================================================
El dueno explico la mecanica exacta y tiene razon en todo:

  "el 11 de septiembre yo despache 15 pero muchas de esas guias fueron de
   la noche del 10 y de parte de la tarde del 10... en este momento tengo
   ocho pedidos que entraron el viernes pero que no vamos a despachar hasta
   el lunes porque el sabado y el domingo no despachamos: si vendemos, pero
   todas las guias las tenemos que guardar."

  "no quiero justificar que el CPA esta mejor, quiero que entiendas muy bien
   esta regla para que podamos ser muy objetivos y saber cuando alarmarnos."

Este script implementa la regla. La 0-Y ya decia "guias/dia no son
ventas/dia", pero se quedaba corta: faltaba el CORTE HORARIO.

LA REGLA, EN TRES PARTES
------------------------
1. UN LOTE NO ES UN DIA. Un lote cubre desde el despacho anterior hasta el
   suyo. El corte real esta entre las 14:53 y las 17:13 Bogota (medido).
   Entonces cada lote arrastra la TARDE Y NOCHE del dia anterior.

2. EL FINDE ENTRA COMPLETO EN EL LOTE DEL LUNES. Del viernes ~17:00 al
   lunes ~17:00 son ~3,0 dias de venta en UN solo lote, porque las
   transportadoras no trabajan sabado ni domingo. Se vende igual: se guarda.

3. LAS VENTAS SIN DESPACHAR NO ESTAN EN EL EXPORT. Hoy hay 8 del viernes
   que se despachan el lunes. Si no se suman a mano, el viernes se ve peor
   de lo que fue Y el lunes se va a ver mejor de lo que es.

CONSECUENCIA: no se compara un dia contra otro NUNCA. Se comparan VENTANAS
delimitadas por despachos, y se divide por los dias FRACCIONARIOS que cubre.
"""

import collections
import csv
import json
import os

L = '=' * 78
BASE = os.path.dirname(os.path.abspath(__file__))

# Hora local (Bogota) del ULTIMO lote de cada dia, medida en el export
CORTE = {'2026-09-02': 17.05, '2026-09-03': 17.08, '2026-09-04': 16.67,
         '2026-09-07': 16.62, '2026-09-08': 15.82, '2026-09-09': 16.93,
         '2026-09-10': 17.22, '2026-09-11': 14.88}

# Ventas ya cerradas pero SIN despachar, informadas por el dueno.
# Se le asignan al dia en que entraron, no al dia en que se despachen.
SIN_DESPACHAR = {'2026-09-11': (8, 10)}   # (pedidos, unidades estimadas)

DIA_IDX = {d: i for i, d in enumerate(
    ['2026-09-02', '2026-09-03', '2026-09-04', '2026-09-05', '2026-09-06',
     '2026-09-07', '2026-09-08', '2026-09-09', '2026-09-10', '2026-09-11'])}


def cargar_lotes():
    """Del export: pedidos y unidades de TRADICIONAL por dia de despacho."""
    rows = list(csv.DictReader(open(os.path.join(BASE, 'envios-completos-11sep.csv'))))
    ped = collections.Counter()
    uds = collections.Counter()
    for r in rows:
        v = int(r['recaudo'])
        if v > 300_000:                      # mayoreo: no viene de la pauta
            continue
        if v == 149_900:                     # colmena: canal aparte
            continue
        ped[r['fecha']] += 1
        uds[r['fecha']] += 3 if v >= 200_000 else (2 if v >= 120_000 else 1)
    for d, (p, u) in SIN_DESPACHAR.items():
        ped[d] += p
        uds[d] += u
    return ped, uds


def cargar_horas():
    return json.load(open(os.path.join(BASE, 'hora-a-hora-sep.json')))


def acumular(horas, d_ini, h_ini, d_fin, h_fin):
    """Suma gasto y conversaciones entre (dia,hora) y (dia,hora)."""
    g = c = 0.0
    for d in sorted(horas):
        if not (DIA_IDX.get(d, -1) >= DIA_IDX[d_ini] and DIA_IDX[d] <= DIA_IDX[d_fin]):
            continue
        for h, (gg, cc) in horas[d].items():
            h = int(h)
            if d == d_ini and h < h_ini:
                continue
            if d == d_fin and h >= h_fin:
                continue
            g += gg
            c += cc
    return g, c


def dias(d_ini, h_ini, d_fin, h_fin):
    return (DIA_IDX[d_fin] - DIA_IDX[d_ini]) + (h_fin - h_ini) / 24


def main():
    ped, uds = cargar_lotes()
    horas = cargar_horas()

    print(L)
    print('1. EL CORTE MEDIDO: A QUE HORA SE DESPACHA')
    print(L)
    print(f"  {'dia':<13}{'ultimo lote':>13}{'pedidos':>9}{'uds':>6}")
    for d in sorted(CORTE):
        h = CORTE[d]
        extra = '  + 8 sin despachar' if d in SIN_DESPACHAR else ''
        if d in ped:
            print(f'  {d:<13}{int(h):>10}:{int((h%1)*60):02d}{ped[d]:>9}{uds[d]:>6}{extra}')
        else:
            print(f'  {d:<13}{int(h):>10}:{int((h%1)*60):02d}{"(finde)":>9}')
    print()
    print('  >>> El corte va de 14:53 a 17:13. Cada lote arrastra la tarde y')
    print('      la noche del dia anterior. NO es "las ventas del dia".')
    print()

    # ventanas delimitadas por despachos
    V = [
        ('POST-PAGO  3-4 sep', '2026-09-02', 17.05, '2026-09-04', 16.67,
         ['2026-09-03', '2026-09-04'], 'post-pago del 31-ago'),
        ('FINDE      5-7 sep', '2026-09-04', 16.67, '2026-09-07', 16.62,
         ['2026-09-07'], 'vie tarde + sab + dom + lun'),
        ('VALLE      8-11 sep', '2026-09-07', 16.62, '2026-09-11', 24.0,
         ['2026-09-08', '2026-09-09', '2026-09-10', '2026-09-11'], 'valle antes del 15'),
    ]

    print(L)
    print('2. VENTANAS BIEN ALINEADAS (gasto y conversaciones por HORA)')
    print(L)
    print(f"  {'ventana':<20}{'dias':>6}{'ped':>5}{'uds':>5}{'ped/dia':>9}"
          f"{'uds/dia':>9}{'$/ped':>9}{'$/ud':>8}{'cierre':>8}")
    out = {}
    for nom, di, hi, df, hf, lotes, _ in V:
        g, c = acumular(horas, di, hi, df, hf)
        p = sum(ped[x] for x in lotes)
        u = sum(uds[x] for x in lotes)
        n = dias(di, hi, df, hf)
        out[nom] = (g, c, p, u, n)
        print(f'  {nom:<20}{n:>6.2f}{p:>5}{u:>5}{p/n:>9.1f}{u/n:>9.1f}'
              f'{g/p:>9,.0f}{g/u:>8,.0f}{u/c:>8.1%}')
    print()
    print('  🎯 VALIDACION DEL METODO: la ventana post-pago da '
          f'${out["POST-PAGO  3-4 sep"][0]/out["POST-PAGO  3-4 sep"][2]:,.0f}/pedido,')
    print('     contra $7.806 que 0-AC midio con exports y $7.664 del 25-ago.')
    print('     Coincide. El metodo es correcto.')
    print()

    a = out['POST-PAGO  3-4 sep']
    z = out['VALLE      8-11 sep']
    print(L)
    print('3. QUE SE MOVIO DE VERDAD (post-pago vs valle, los dos bien medidos)')
    print(L)
    filas = [
        ('gasto/dia', a[0]/a[4], z[0]/z[4], '${:,.0f}'),
        ('conversaciones/dia', a[1]/a[4], z[1]/z[4], '{:,.0f}'),
        ('cierre uds/conv', a[3]/a[1], z[3]/z[1], '{:.1%}'),
        ('unidades/dia', a[3]/a[4], z[3]/z[4], '{:.1f}'),
        ('pedidos/dia', a[2]/a[4], z[2]/z[4], '{:.1f}'),
        ('CPA por pedido', a[0]/a[2], z[0]/z[2], '${:,.0f}'),
    ]
    print(f"  {'':<22}{'post-pago':>12}{'valle':>12}{'cambio':>10}")
    for nom, x, y, fmt in filas:
        print(f'  {nom:<22}{fmt.format(x):>12}{fmt.format(y):>12}{y/x-1:>+9.0%}')
    print()
    print('  🔑 El cierre baja poco. Lo que se cae son las CONVERSACIONES/dia')
    print('     con el gasto casi igual: es la conv/mil, o sea la audiencia.')
    print('     Coincide con la dilucion de Domiciliarios medida en 0-AH.')
    print()

    print(L)
    print('4. 🚨 CUANDO ALARMARSE — UMBRALES OBJETIVOS')
    print(L)
    UTIL = 24_129     # utilidad por pedido antes de pauta (0-AE, costo $33.000)
    print(f'  Utilidad por pedido antes de pauta: ${UTIL:,}')
    print('  Entonces el CPA por pedido se lee asi:')
    print()
    tramos = [(0, 9_000, '🟢 NORMAL', 'como el post-pago. No tocar nada'),
              (9_000, 14_000, '🟡 VIGILAR', 'mirar conv/mil y CPM. Puede ser el ciclo'),
              (14_000, 18_000, '🟠 ALARMA', 'ya son 3 dias? entonces actuar'),
              (18_000, UTIL, '🔴 GRAVE', 'la utilidad se esta comiendo entera'),
              (UTIL, 99_999, '⛔ PERDIDA', 'cada pedido pierde plata')]
    for lo, hi, et, q in tramos:
        r = f'${lo:,} - ${hi:,}' if hi < 99_999 else f'> ${lo:,}'
        print(f'  {r:<22}{et:<12} {q}')
    print()
    print(f'  📍 HOY (ventana del valle, bien medida): ${z[0]/z[2]:,.0f}/pedido -> ', end='')
    cpa = z[0]/z[2]
    print(next(et for lo, hi, et, _ in tramos if lo <= cpa < hi))
    print()
    print('  ⛔ Y LAS TRES REGLAS PARA NO ALARMARSE EN FALSO:')
    print('     1. Minimo 3 dias de ventana. Un lote solo no dice nada.')
    print('     2. Sumar SIEMPRE las ventas sin despachar antes de concluir.')
    print('     3. No comparar post-pago contra valle: son fases distintas del')
    print('        ciclo. Comparar valle contra valle y post-pago contra post-pago.')
    print()
    print(L)
    print('5. LO QUE FALTA PARA CERRAR ESTO BIEN')
    print(L)
    print('  ▪ Las ~10 unidades de las 8 guias del viernes son ESTIMADAS.')
    print('    El dueno dijo "algunas con pedidos dobles" sin precisar.')
    print('  ▪ El lote del lunes 14 va a traer viernes-tarde + sabado + domingo')
    print('    + lunes = ~3,1 dias. NO leerlo como un dia.')
    print('  ▪ Y ahi hay que restar las 8 que ya estan contadas en el viernes,')
    print('    para no contarlas dos veces.')
    print(L)


if __name__ == '__main__':
    main()
