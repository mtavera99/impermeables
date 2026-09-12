#!/usr/bin/env python3
"""
PRIMERA LECTURA EN VIVO DE LA API (2026-09-11, 05:30 Bogota)
=============================================================
Los numeros de este archivo NO vienen de un export: salen de la Marketing API
con el token de solo lectura `Kiro Lectura`, cuenta act_4330882710457791.

Reproducir con:
  python3 analisis/meta-api-lectura.py conjuntos act_4330882710457791
  python3 analisis/meta-api-lectura.py insights  act_4330882710457791 2026-09-08 2026-09-10

Lo que se descubrio, en orden de importancia:
  1. Motorizados NUNCA se estaba encogiendo. Era UN dia, y era un dia malo
     para toda la cuenta. El recorte funciono, pero por el motivo contrario.
  2. El que se esta diluyendo es DOMICILIARIOS, que es el control del gate.
  3. El CPM de TEST Creativos oscila; no viene subiendo.
  4. La cuenta gasta $202.095/dia, no $154.000.
"""

L = '=' * 74
EQUILIBRIO = 2_657          # $/conversacion del tradicional
EQ_COLMENA = 3_322          # $/conversacion del colmena

# ---- datos crudos de la API, por dia y por conjunto: (gasto, impresiones, conv)
DIARIO = {
    'Domiciliarios': {
        '05': (32_076, 10_775, 49), '06': (69_025, 18_235, 95),
        '07': (66_221, 20_232, 95), '08': (39_180, 11_540, 48),
        '09': (42_701, 12_900, 46), '10': (80_354, 25_920, 72),
    },
    'Domiciliarios VIDEO': {
        '05': (74_033, 26_989, 99), '06': (43_067, 10_960, 60),
        '07': (60_726, 18_129, 85), '08': (45_555, 13_594, 59),
        '09': (45_901, 14_478, 48), '10': (72_748, 22_498, 98),
    },
    'TEST Creativos': {
        '05': (16_959, 3_319, 24), '06': (19_731, 3_307, 35),
        '07': (27_724, 5_462, 53), '08': (21_256, 3_594, 21),
        '09': (21_306, 3_247, 19), '10': (21_737, 3_599, 28),
    },
    'Motorizados': {
        '05': (13_850, 3_760, 15), '06': (15_857, 3_476, 30),
        '07': (15_647, 3_699, 22), '08': (19_682, 5_288, 22),
        '09': (18_006, 5_195, 9), '10': (11_487, 2_647, 13),
    },
    'Valle del Cauca': {
        '05': (8_387, 2_644, 12), '06': (8_762, 2_282, 3),
        '07': (3_894, 1_130, 1), '08': (2_612, 661, 3),
        '09': (4_004, 851, 2), '10': (3_919, 901, 1),
    },
    'Publico ABIERTO video (colmena)': {
        '05': (20_687, 3_909, 9), '06': (19_246, 3_905, 10),
        '07': (16_165, 2_490, 4), '08': (18_717, 2_291, 6),
        '09': (11_350, 1_151, 4), '10': (0, 0, 0),
    },
    'Publico ABIERTO - Creativo (colmena)': {
        '05': (19_479, 3_414, 3), '06': (16_904, 3_125, 6), '07': (13, 4, 0),
    },
    'Santander': {'09': (454, 54, 0), '10': (3_875, 878, 3)},
    'Eje Cafetero': {'09': (347, 56, 0), '10': (3_995, 892, 1)},
    'Tolima Huila': {'09': (382, 30, 1), '10': (3_980, 1_057, 4)},
}

# alcance y frecuencia (solo donde importa para el diagnostico)
ALCANCE = {
    'Domiciliarios':  {'07': (18_358, 1.10), '08': (10_431, 1.11),
                       '09': (12_214, 1.06), '10': (24_359, 1.06)},
    'Motorizados':    {'07': (3_559, 1.04), '08': (4_774, 1.11),
                       '09': (5_093, 1.02), '10': (2_531, 1.05)},
}


def cpm(g, i):
    return g / i * 1000 if i else 0


def cxm(c, i):
    return c / i * 1000 if i else 0


def pconv(g, c):
    return g / c if c else 0


def serie(nombre):
    print(f'  {"dia":<8} {"gasto":>8} {"impr":>7} {"conv":>5} {"$/conv":>8} {"CPM":>7} {"conv/mil":>9}')
    for d in sorted(DIARIO[nombre]):
        g, i, c = DIARIO[nombre][d]
        print(f'  {d+"-sep":<8} {g:>8,} {i:>7,} {c:>5} '
              f'{pconv(g, c):>8,.0f} {cpm(g, i):>7,.0f} {cxm(c, i):>9.2f}')


print(L)
print('1. EL 9-SEP FUE UN DIA MALO PARA TODA LA CUENTA, NO PARA MOTORIZADOS')
print(L)
print('  Esto es lo que invalida el diagnostico de 0-AF, y hay que verlo primero:')
print()
print(f'  {"dia":<8} {"gasto cuenta":>13} {"conv":>6} {"$/conv cuenta":>14}')
for d in ('08', '09', '10'):
    tg = sum(v[d][0] for v in DIARIO.values() if d in v)
    tc = sum(v[d][2] for v in DIARIO.values() if d in v)
    marca = '  <<< +21%' if d == '09' else ''
    print(f'  {d+"-sep":<8} {tg:>13,} {tc:>6} {pconv(tg, tc):>14,.0f}{marca}')
print()
print('  >>> El 9-sep la cuenta ENTERA costo 21% mas. Domiciliarios cerro en su')
print('      peor dia ($928), el VIDEO en el suyo ($956), TEST Creativos en')
print('      $1.121 y Valle en $2.002. Motorizados no se descompuso solo:')
print('      se descompuso CON todos.')
print('  🔑 Y el recorte de Motorizados se decidio leyendo ESE dia.')
print()

print(L)
print('2. MOTORIZADOS: LA SERIE COMPLETA NO ES MONOTONA. ES UN POZO QUE REBOTO')
print(L)
serie('Motorizados')
print()
print('  0-AF leyo "conv/mil 4,04 -> 1,77 (-56%)" y concluyo audiencia que se')
print('  encoge. El 10-sep, con $9.000, la conv/mil volvio a 4,91: el valor mas')
print('  alto desde el 7-sep, y POR ENCIMA del 4,04 del que supuestamente caia.')
print()
print('  Y aca esta el mecanismo real, que es el contrario:')
print()
print(f'  {"":<12} {"9-sep $15.000":>14} {"10-sep $9.000":>14}')
a9, f9 = ALCANCE['Motorizados']['09']
a10, f10 = ALCANCE['Motorizados']['10']
g9, i9, c9 = DIARIO['Motorizados']['09']
g10, i10, c10 = DIARIO['Motorizados']['10']
print(f'  {"alcance":<12} {a9:>14,} {a10:>14,}   -> se replego a la mitad')
print(f'  {"CPM":<12} {cpm(g9,i9):>14,.0f} {cpm(g10,i10):>14,.0f}   -> paga 25% MAS')
print(f'  {"frecuencia":<12} {f9:>14.2f} {f10:>14.2f}   -> nunca hubo fatiga')
print(f'  {"conv/mil":<12} {cxm(c9,i9):>14.2f} {cxm(c10,i10):>14.2f}   -> 2,8x MEJOR')
print(f'  {"$/conv":<12} {pconv(g9,c9):>14,.0f} {pconv(g10,c10):>14,.0f}   -> -56%')
print()
print('  >>> No era una audiencia agotandose. Era una audiencia ESTIRADA.')
print('      Con menos plata compra menos y mejor, aun pagando un CPM mas alto.')
print(f'  ✅ Gate del lunes: umbral $1.500, cerro en ${pconv(g10,c10):,.0f}. Se queda en $9.000.')
print()

print(L)
print('3. POR QUE 0-AF VIO UNA TENDENCIA QUE NO EXISTIA: VENTANAS SUPERPUESTAS')
print(L)
print('  La serie que uso 0-AF para hablar de "cinco lecturas seguidas peores":')
print()
print('    3-sep $605 | 4-6 sep $656 | 7-8 sep $730 | 8-9 sep $966 | 9-sep $1.970')
print()
print('  🔑 "7-8 sep" y "8-9 sep" COMPARTEN el 8-sep. Y el ultimo punto es el dia')
print('     malo suelto. Cuando se promedian ventanas que se solapan y una de')
print('     ellas arrastra un dia atipico, ese dia aparece en VARIOS puntos y')
print('     fabrica una pendiente que en los datos diarios no esta.')
print()
print('  >>> REGLA NUEVA: para decidir si algo es tendencia, la serie tiene que')
print('      ser de dias DISJUNTOS. Ventanas que se solapan no son una serie.')
print()

print(L)
print('4. EL QUE SE ESTA DILUYENDO ES DOMICILIARIOS — Y ES EL CONTROL DEL GATE')
print(L)
serie('Domiciliarios')
print()
print('  Esta SI es monotona y son 5 dias disjuntos: $655 -> $1.116 = +70%,')
print('  con la conv/mil cayendo de 4,55 a 2,78 (a la mitad).')
print()
print('  Y la causa NO es la subasta ni la fatiga:')
print()
a9, f9 = ALCANCE['Domiciliarios']['09']
a10, f10 = ALCANCE['Domiciliarios']['10']
g9, i9, c9 = DIARIO['Domiciliarios']['09']
g10, i10, c10 = DIARIO['Domiciliarios']['10']
print(f'  {"":<12} {"9-sep":>10} {"10-sep":>10}')
print(f'  {"alcance":<12} {a9:>10,} {a10:>10,}   -> DUPLICA')
print(f'  {"CPM":<12} {cpm(g9,i9):>10,.0f} {cpm(g10,i10):>10,.0f}   -> BAJA')
print(f'  {"frecuencia":<12} {f9:>10.2f} {f10:>10.2f}   -> sin fatiga')
print(f'  {"conv/mil":<12} {cxm(c9,i9):>10.2f} {cxm(c10,i10):>10.2f}   -> peor')
print()
print('  >>> Duplico el alcance, el CPM BAJO, y convierte peor. Eso es comprar')
print('      impresiones mas baratas y mas frias: la elasticidad 0,63 en vivo.')
print('      Es el MISMO mecanismo de Motorizados, en el conjunto grande.')
print()
cxm_8 = cxm(DIARIO['Domiciliarios']['08'][2], DIARIO['Domiciliarios']['08'][1])
cpm_ref = 3_400
objetivo = cpm_ref / cxm_8
print(f'  CUANTO VALE PODARLO: si volviera a la conv/mil del 8-sep ({cxm_8:.2f}) con')
print(f'  un CPM de ~${cpm_ref:,}, el costo por conversacion seria ~${objetivo:,.0f}')
print(f'  en vez de ${pconv(g10,c10):,.0f}. Sobre los ${g10:,} que gasto el 10-sep:')
print(f'    hoy:      {c10} conversaciones')
print(f'    podado:  ~{g10/objetivo:.0f} conversaciones')
print(f'    >>> +{g10/objetivo - c10:.0f} conversaciones/dia SIN poner un peso mas.')
print('  ⛔ PERO NO SE TOCA HASTA EL LUNES 14: es el control de las tres regiones.')
print()

print(L)
print('5. EL CPM DE TEST CREATIVOS OSCILA. NO VIENE SUBIENDO')
print(L)
serie('TEST Creativos')
print()
print('  0-AF dijo "CPM $7.968 y subiendo ($5.240 -> $6.679 -> $7.968)".')
print('  En dias cerrados nunca toco $7.968: oscila alrededor de ~$5.800.')
print()
prom_cxm = sum(cxm(v[2], v[1]) for v in DIARIO['TEST Creativos'].values()) / 6
ctrl_cxm = cxm(DIARIO['Domiciliarios']['10'][2], DIARIO['Domiciliarios']['10'][1])
print(f'  conv/mil promedio de TEST Creativos: {prom_cxm:.2f}')
print(f'  conv/mil del control el 10-sep:      {ctrl_cxm:.2f}')
print(f'  >>> {prom_cxm/ctrl_cxm:.1f}x mejor calidad de audiencia. Con CPM casi el doble,')
print(f'      igual cierra en $776 contra $1.116 del control (-30%).')
print('  ⚠️  Esto NO ordena subirlo a $30.000. Dice que el argumento que lo')
print('      bloqueaba ("su CPM sube cada ventana") no esta en los datos. Re-mirar #77.')
print()

print(L)
print('6. LA CUENTA GASTA $202.095, NO $154.000')
print(L)
presupuesto = 55_000 + 45_000 + 25_000 + 9_000 + 5_000 * 4
gasto10 = sum(v['10'][0] for v in DIARIO.values() if '10' in v)
print(f'  presupuesto de los conjuntos ACTIVOS : ${presupuesto:>9,}')
print(f'  gasto real del 10-sep                : ${gasto10:>9,}')
print(f'  sobre-entrega                        : {gasto10/presupuesto-1:>9.1%}')
print()
print('  🔑 La tabla de elasticidad de este proyecto dice que a $200.000/dia el')
print('     ultimo peso devuelve -$0,00 y que el optimo es ~$178.000/dia.')
print('     La cuenta YA esta ahi, aunque en la interfaz figure $154.000.')
print('  >>> "No subir presupuesto" se esta cumpliendo en la interfaz y NO en la')
print('      realidad. Y encaja con la dilucion de Domiciliarios: la plata de')
print('      mas se va a audiencia fria.')
print('  ⚠️  Un dia no es una serie. Confirmar el sabado 12 con 3 dias cerrados.')
print()

print(L)
print('7. EL COLMENA: LA API CORROBORA 0-AG')
print(L)
for n in ('Publico ABIERTO video (colmena)', 'Publico ABIERTO - Creativo (colmena)'):
    g = sum(v[0] for v in DIARIO[n].values())
    c = sum(v[2] for v in DIARIO[n].values())
    p = pconv(g, c)
    print(f'  {n}')
    print(f'    ${g:,} / {c} conv = ${p:,.0f}/conv  '
          f'= {p/EQ_COLMENA:.0%} de su equilibrio (${EQ_COLMENA:,})')
print()
print('  >>> El VIDEO del colmena corria al 79% de su equilibrio: NO perdia plata,')
print('      igual que dice 0-AG ("corre al 85% de SU equilibrio"). El estatico si')
print('      perdia (122% de su equilibrio) y fue el que justifico apagar.')
print('  📌 Estos dos conjuntos NO estaban en la tabla de configuracion del archivo')
print('     madre. Son $40.000/dia de presupuesto dormido: si alguien prende esa')
print('     campana sin mirar, vuelven a gastar.')
print()

print(L)
print('8. LAS TRES REGIONES: PRELIMINAR, NO ES EL VEREDICTO')
print(L)
print('  Se crearon la noche del 9-sep. El 10-sep es su UNICO dia completo.')
print()
print(f'  {"region":<16} {"gasto":>8} {"conv":>5} {"$/conv":>8} {"conv/mil":>9}  vs equilibrio')
for n in ('Tolima Huila', 'Santander', 'Eje Cafetero', 'Valle del Cauca'):
    g, i, c = DIARIO[n]['10']
    p = pconv(g, c)
    est = 'PASA' if p and p < EQUILIBRIO else 'no pasa'
    print(f'  {n:<16} {g:>8,} {c:>5} {p:>8,.0f} {cxm(c,i):>9.2f}  {est} ({p/EQUILIBRIO:.2f}x)')
print()
print('  ⛔ n = 1, 3 y 4 conversaciones. NO SE DECIDE NADA CON ESTO.')
print('     Tolima Huila y Santander entregan bajo el equilibrio desde el dia 1.')
print('     Eje Cafetero se ve flojo. Valle es el caso serio: su ventana 8-10 sep')
print('     cierra en $1.756 y su serie de 6 dias es mala.')
print()

print(L)
print('9. EL SESGO DEL GATE DEL LUNES AHORA TIENE DOS SIGNOS OPUESTOS')
print(L)
print('  (a) el recorte de Motorizados libero ~$8.700/dia en Med+Bog, donde corre')
print('      el control  ->  las regiones se ven PEOR de lo que son   [0-AF]')
print('  (b) el control se esta diluyendo (+70% en 5 dias)')
print('      ->  las regiones se ven MEJOR de lo que son               [nuevo]')
print()
print('  🔑 Se cancelan en direccion desconocida. El criterio RELATIVO queda')
print(f'     inservible para este gate: usar solo el ABSOLUTO de ${EQUILIBRIO:,}/conv.')
print()
print(L)
print('LO QUE ESTE ARCHIVO NO DICE')
print(L)
print('  - No dice que haya que tocar nada antes del lunes 14. Regla 4-B: el')
print('    agente lee, el dueno ejecuta. Nada se toco.')
print('  - No cierra el gate de las regiones: n va de 1 a 4 conversaciones.')
print('  - No mide VENTAS, solo conversaciones. El puente conversacion -> venta')
print('    sigue saliendo de los exports de 99 Envios, y #32 sigue abierto: la')
print('    API por conjunto no dice que creativo genera ventas.')
print(L)
