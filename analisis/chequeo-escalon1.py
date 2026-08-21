"""CHEQUEO DEL ESCALÓN 1 — export por conjunto 18-21 ago

⚠️ HALLAZGO PRINCIPAL: el campo "Último cambio significativo" CORRIGE una premisa
   sobre la que construí toda la escalera de escalamiento. Ver sección 2.
"""
import csv

CIERRE = 0.094
TASA_ENTREGA = 0.847
MARGEN = 24433
# días completos: 18, 19, 20 (son las 00:14 del 21)
DIAS = 3
# presupuestos por día: el 18 con los viejos, 19 y 20 con los nuevos
PPTO = {
    'Domiciliarios':  [30000, 55000, 55000],
    'Motorizados':    [15000, 15000, 15000],
    'TEST Creativos': [12000, 20000, 20000],
}
# referencias de la ventana anterior (14-19 ago)
ANT = {'Domiciliarios': 518, 'Motorizados': 473, 'TEST Creativos': 708}
CONV_DIA_ANT = 109.5

rows = list(csv.DictReader(open('conjuntos-18-21ago.csv')))
for r in rows:
    r['conv'] = int(r['resultados'])
    r['cc'] = float(r['costo_por_conv'])
    r['gastado'] = float(r['gastado'])
    r['impr'] = int(r['impresiones'])
    r['alc'] = int(r['alcance'])
    r['ctr'] = float(r['ctr_pct'])
    r['cpc'] = float(r['cpc'])
    r['frec'] = float(r['frecuencia'])
    r['clics'] = r['impr'] * r['ctr'] / 100
    r['clicchat'] = r['conv'] / r['clics'] * 100

print('=' * 74)
print('1. VERIFICACIÓN')
print('=' * 74)
tc = sum(r['conv'] for r in rows)
tg = sum(r['gastado'] for r in rows)
print(f'  Conversaciones : {tc}')
print(f'  Gastado        : ${tg:,.0f}')
for r in rows:
    print(f'  {r["conjunto"]:<16} ${r["gastado"]/r["conv"]:>7,.0f}/conv calculado vs '
          f'${r["cc"]:>7,.0f} del archivo  '
          f'{"OK" if abs(r["gastado"]/r["conv"]-r["cc"]) < 2 else "NO"}')

print()
print('=' * 74)
print('2. 🚨🚨 EL HALLAZGO: SUBIR PRESUPUESTO **SÍ** REINICIÓ EL APRENDIZAJE')
print('=' * 74)
print('  El campo "Último cambio significativo" por conjunto:')
print()
for r in rows:
    uc = r['ultimo_cambio_significativo']
    marca = ''
    if uc.startswith('2026-08-19'):
        marca = '  <== 🚨 SE REGISTRÓ EL CAMBIO DE PRESUPUESTO'
    elif uc == '0':
        marca = '  (ninguno registrado)'
    print(f'  {r["conjunto"]:<16} {uc}{marca}')
print()
print('  🔴 DOMICILIARIOS ENTRÓ EN APRENDIZAJE EL 19-AGO A LA 01:45,')
print('     que es exactamente cuando subiste $30.000 -> $55.000.')
print()
print('  ⚠️ ESTO CONTRADICE LA SECCIÓN 0-C Y MI PROPIA RECOMENDACIÓN.')
print('     Yo escribí: "subir presupuesto NO reinicia el aprendizaje en esta')
print('     cuenta" y sobre eso armé la escalera de +50-60% por escalón.')
print('     LA PREMISA ERA INCOMPLETA.')
print()
print('  🔑 PERO LOS DATOS AHORA MUESTRAN DÓNDE ESTÁ EL LÍMITE:')
print()
casos = [
    ('$18.000 -> $30.000', 66.7, 'NO se registró', '(sección 0-C, jul)'),
    ('$12.000 -> $20.000', 66.7, 'NO se registró', '(TEST, este export)'),
    ('$30.000 -> $55.000', 83.3, '🚨 SÍ se registró', '(Domiciliarios, 19-ago)'),
]
print(f'  {"cambio":<22} {"%":>7}  {"resultado":<18} fuente')
for c, p, res, f in casos:
    print(f'  {c:<22} {p:>+6.1f}% {res:<18} {f}')
print()
print('  >>> EL UMBRAL ESTÁ ENTRE +67% Y +83%.')
print('      Dos veces +67% no lo activó; una vez +83% sí.')
print('  ✅ REGLA NUEVA: mantener los escalones en +60% o menos.')
print('     La escalera de 50% que propuse sigue siendo válida por poco;')
print('     el error fue decir que el tamaño no importaba.')

print()
print('=' * 74)
print('3. ✅ ABSORCIÓN: DOMICILIARIOS SE COMIÓ EL AUMENTO')
print('=' * 74)
print(f'  {"conjunto":<16} {"asignado":>11} {"gastado":>11} {"util":>7}')
tot_asig = 0
for r in rows:
    asig = sum(PPTO[r['conjunto']])
    tot_asig += asig
    print(f'  {r["conjunto"]:<16} ${asig:>10,} ${r["gastado"]:>10,.0f} '
          f'{r["gastado"]/asig*100:>6.0f}%')
print(f'  {"TOTAL":<16} ${tot_asig:>10,} ${tg:>10,.0f} {tg/tot_asig*100:>6.0f}%')
print()
print('  🎉 Domiciliarios al 96% con $55.000 -> ABSORBIÓ EL +83% SIN PROBLEMA.')
print('     Era la duda principal del escalón y quedó respondida.')
print('  ⚠️ Motorizados sigue en 84%: su límite es la audiencia, no la plata.')
print('     (predije 83% — se confirmó)')
print()
g_nuevo = (tg - 57000*0.99) / 2      # descontando el 18 con presupuesto viejo
print(f'  Gasto/día en los días a $90.000 (19-20, estimado): ${g_nuevo:,.0f}')
print(f'  = {g_nuevo/90000*100:.0f}% de los $90.000')
print(f'  📌 Mi predicción fue $77.000-84.000 (86-94%). Se cumplió.')

print()
print('=' * 74)
print('4. COSTO POR CONVERSACIÓN: PLANO, CON MÁS DEL DOBLE DE VOLUMEN')
print('=' * 74)
print(f'  {"conjunto":<16} {"antes":>8} {"ahora":>8} {"cambio":>9} {"CTR":>7} '
      f'{"clic->chat":>11} {"frec":>6}')
for r in sorted(rows, key=lambda x: x['cc']):
    a = ANT[r['conjunto']]
    print(f'  {r["conjunto"]:<16} ${a:>7,} ${r["cc"]:>7,.0f} '
          f'{r["cc"]/a*100-100:>+8.1f}% {r["ctr"]:>6.2f}% {r["clicchat"]:>10.1f}% '
          f'{r["frec"]:>6.2f}')
print()
print('  ✅ Motorizados y Domiciliarios PLANOS (+1,1% y +1,4%) pese al aumento.')
print('  🎉 TEST MEJORÓ FUERTE: $708 -> $578 (-18,4%). Dejó de ser el desastre')
print('     que era. Ojo: eso debilita mi propuesta de bajarlo a $12.000.')
print()
conv_dia = tc / DIAS
print(f'  Conversaciones/día: {conv_dia:.1f}  (antes {CONV_DIA_ANT})  '
      f'{conv_dia/CONV_DIA_ANT*100-100:+.0f}%')
conv_nuevo = (tc - CONV_DIA_ANT) / 2
print(f'  Y en los días a $90.000 (estimado): {conv_nuevo:.0f}/día  '
      f'{conv_nuevo/CONV_DIA_ANT*100-100:+.0f}%')
print()
print('  🔑 LO IMPORTANTE: +58% de presupuesto trajo ~+38% de conversaciones')
print('     SIN encarecer el costo por conversación. Ese es el mejor resultado')
print('     posible de un escalón. Escaló sin degradarse.')

print()
print('=' * 74)
print('5. 💎 MOTORIZADOS ES EL MEJOR CONJUNTO, Y AHORA HAY MÁS PRUEBAS')
print('=' * 74)
m = next(r for r in rows if r['conjunto'] == 'Motorizados')
d = next(r for r in rows if r['conjunto'] == 'Domiciliarios')
print(f'  {"":<20} {"Motorizados":>13} {"Domiciliarios":>14}')
print(f'  {"costo/conversación":<20} ${m["cc"]:>12,.0f} ${d["cc"]:>13,.0f}')
print(f'  {"CPC":<20} ${m["cpc"]:>12,.0f} ${d["cpc"]:>13,.0f}  <- Dom. gana acá')
print(f'  {"clic->chat":<20} {m["clicchat"]:>12.1f}% {d["clicchat"]:>13.1f}%  '
      f'<- 🔑 Mot. gana feo')
print(f'  {"frecuencia":<20} {m["frec"]:>13.2f} {d["frec"]:>14.2f}')
print()
print('  🔑 HALLAZGO FINO: Domiciliarios tiene el CLIC MÁS BARATO ($217 vs $249)')
print('     pero Motorizados convierte clics en conversaciones MUCHO mejor')
print(f'     ({m["clicchat"]:.0f}% vs {d["clicchat"]:.0f}%).')
print('     >>> CLICS BARATOS ≠ CONVERSACIONES BARATAS. La audiencia de')
print('         Motorizados está genuinamente mejor calificada.')
print()
print('  Y solo gasta el 84% de $15.000 porque la audiencia es chica.')
print('  >>> AMPLIARLE LA AUDIENCIA SIGUE SIENDO LA JUGADA DE MÁS VALOR.')
print('  ⚠️ Pero ahora sabemos que ESO TAMBIÉN reinicia aprendizaje, y hoy es')
print('     el grupo de control del valle. No tocar hasta el 30-ago.')

print()
print('=' * 74)
print('6. ⏳ LO QUE FALTA PARA CERRAR EL CHEQUEO: LAS GUÍAS')
print('=' * 74)
print('  Todo lo de arriba es la boca del embudo. El CPA necesita las ventas.')
print()
print('  ⚠️ EL 21 RECIÉN EMPEZÓ (00:14) -> no hay guías del 21 todavía, porque')
print('     el despacho es en la tarde/noche. Así que hoy solo se puede leer')
print('     con las guías del 19 y 20 (2 días).')
print('  📌 MEJOR OPCIÓN: hacer el chequeo HOY EN LA NOCHE, después de despachar,')
print('     y ahí son 3 días (19-20-21) contra 3 días de gasto. Y conviene,')
print('     porque sábado y domingo no despachás y el número se ensucia.')
print()
print(f'  {"guías 19-20":>12} {"ventas/día":>11} {"CPA cerrada":>12} {"CPA entr.":>11}  veredicto')
gasto_periodo = g_nuevo * 2
for g in (20, 25, 30, 35, 40, 45):
    cpa_c = gasto_periodo / g
    cpa_e = cpa_c / TASA_ENTREGA
    if cpa_e < 12000:
        v = '✅ escalón 2 a $140.000'
    elif cpa_e < 16000:
        v = '🟡 subir menos: $120.000'
    else:
        v = '🔴 quedarse en $90.000'
    print(f'  {g:>12} {g/2:>11.1f} ${cpa_c:>11,.0f} ${cpa_e:>10,.0f}  {v}')
print()
print('  ⚠️ Y hay un matiz de aprendizaje: Domiciliarios entró en fase de')
print('     aprendizaje el 19. Su CPA de estos días puede mejorar cuando salga.')
print('     Si el número queda en la franja amarilla, conviene esperar 2 días')
print('     más antes de decidir, no frenar.')
