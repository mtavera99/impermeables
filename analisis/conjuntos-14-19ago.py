"""DESGLOSE POR CONJUNTO — 14-19 ago (primer dato por conjunto desde el 12-ago)

Fuente: captura del Ads Manager del 19-ago 1:46 a.m. (hora Colombia).
Presupuestos YA APLICADOS: TEST $20.000 · Domiciliarios $55.000 · Motorizados $15.000

⚠️ REVELA UN ERROR EN MI RECOMENDACIÓN: propuse subir TEST de $12.000 a
   $20.000. Con este dato, TEST es el conjunto MÁS CARO y viene EMPEORANDO.
   Ese dinero rendía más en Domiciliarios. Se corrige en el próximo chequeo.
"""

CIERRE = 0.094          # tasa de cierre 15-18 ago
TASA_ENTREGA = 0.847
MARGEN = 24433
TECHO_CPA = 12000
DIAS = 5                # 14,15,16,17,18 (el 19 aporta ~1,75 h)

# nombre, conversaciones, costo/conv, presupuesto ANTERIOR, presupuesto NUEVO, gastado
sets = [
    ('Domiciliarios', 320, 518, 30000, 55000, 165714),
    ('Motorizados',   132, 473, 15000, 15000,  62494),
    ('TEST Creativos', 76, 708, 12000, 20000,  53830),
]

print('=' * 72)
print('1. VALIDACIÓN CRUZADA CON EL EXPORT')
print('=' * 72)
tc = sum(s[1] for s in sets)
tg = sum(s[5] for s in sets)
print(f'  Conversaciones sumadas : {tc}   (export de campaña: 528)  '
      f'{"OK" if tc == 528 else "NO CUADRA"}')
print(f'  Gasto sumado           : ${tg:,}   (export: $281.820)  '
      f'dif ${tg-281820:,} = minutos de gasto entre un export y otro')

print()
print('=' * 72)
print('2. 🔑 EL RANKING REAL — Y NO ES EL QUE YO ASUMÍ')
print('=' * 72)
print(f'  {"conjunto":<16} {"conv":>5} {"$/conv":>8} {"CPA cerr":>10} {"CPA entr":>10} {"util/venta":>11}')
for n, conv, cc, pa, pn, g in sorted(sets, key=lambda x: x[2]):
    cpa_c = cc / CIERRE
    cpa_e = cpa_c / TASA_ENTREGA
    print(f'  {n:<16} {conv:>5} ${cc:>7,} ${cpa_c:>9,.0f} ${cpa_e:>9,.0f} '
          f'${MARGEN-cpa_e:>10,.0f}')
print()
print('  🥇 MOTORIZADOS ES EL MÁS BARATO ($473/conv), no Domiciliarios.')
print('     Es 8,7% mejor que Domiciliarios y 33% mejor que TEST.')
print('  🔴 TEST ES EL PEOR ($708) Y VIENE EMPEORANDO: el 7-12 ago estaba en')
print('     $617-645. Se degradó ~13% más.')
print()
print(f'  ✅ Los tres siguen por debajo del techo de ${TECHO_CPA:,} de CPA entregada,')
print('     así que ninguno pierde plata. Es un problema de eficiencia, no de')
print('     rentabilidad.')
print()
print('  ⚠️ CAVEAT: se aplica el mismo 9,4% de cierre a los tres conjuntos porque')
print('     no hay cierre por conjunto. Si Motorizados cierra distinto, el ranking')
print('     de CPA podría moverse. El de costo/conversación sí es directo.')

print()
print('=' * 72)
print('3. UTILIZACIÓN DEL PRESUPUESTO (sobre los presupuestos ANTERIORES)')
print('=' * 72)
print(f'  {"conjunto":<16} {"ppto/día":>10} {"gasto/día":>11} {"util":>7}')
for n, conv, cc, pa, pn, g in sets:
    gd = g / DIAS
    print(f'  {n:<16} ${pa:>9,} ${gd:>10,.0f} {gd/pa*100:>6.0f}%')
tot_pa = sum(s[3] for s in sets)
print(f'  {"TOTAL":<16} ${tot_pa:>9,} ${tg/DIAS:>10,.0f} {tg/DIAS/tot_pa*100:>6.0f}%')
print()
print('  📌 Domiciliarios iba al 110% -> estaba TOPADO contra su presupuesto.')
print('     Subirlo fue correcto: era el único que pedía más.')
print('  ⚠️ Motorizados solo al 83% con $15.000. Coincide con lo documentado:')
print('     audiencia estrecha, no absorbe más plata. Su problema NO es')
print('     presupuesto, es tamaño de audiencia.')
print('     >>> Y es el más barato. Ahí hay valor atrapado.')

print()
print('=' * 72)
print('4. LO QUE HAY QUE CORREGIR EN EL CHEQUEO DEL 22-23')
print('=' * 72)
extra = 8000
gana = extra/518 - extra/708
print(f'  Mi recomendación puso ${extra:,}/día extra en TEST (el peor conjunto).')
print(f'  Ese mismo dinero en Domiciliarios daría {extra/518:.1f} conversaciones/día')
print(f'  en vez de {extra/708:.1f}  ->  +{gana:.1f} conversaciones/día perdidas.')
print(f'  A {CIERRE*100:.1f}% de cierre = {gana*CIERRE:.2f} ventas/día '
      f'= ${gana*CIERRE*(MARGEN-6732):,.0f}/día de utilidad no capturada.')
print(f'  En los 4 días hasta el chequeo: ~${gana*CIERRE*(MARGEN-6732)*4:,.0f}.')
print()
print('  ✅ CORRECCIÓN PROPUESTA (un solo ajuste, en el chequeo):')
print('     TEST          $20.000 -> $12.000')
print('     Domiciliarios $55.000 -> $63.000')
print('     Motorizados   $15.000    intacto (termómetro hasta el 29)')
print('     Total: $90.000 (sin cambiar el nivel de gasto, solo el reparto)')
print()
print('  ⚠️ NO hacerlo hoy: acabás de subir presupuesto y hay que dejar 3-4 días')
print('     para leer el escalón. Cambiar de nuevo hoy ensucia la lectura.')
print('     Reasignar entre conjuntos NO invalida la lectura del total, pero')
print('     conviene juntar los cambios en el chequeo para no perder el hilo.')

print()
print('=' * 72)
print('5. DESPUÉS DEL 29: LA OPORTUNIDAD DE MOTORIZADOS')
print('=' * 72)
print('  Motorizados es el más eficiente ($473) pero solo gasta el 83% de')
print('  $15.000 porque la audiencia es estrecha. El archivo ya lo dice:')
print('  "Para crecerlo hay que AMPLIAR LA AUDIENCIA primero, no darle más plata".')
print()
print('  >>> Si al ampliarle la audiencia mantiene los $473/conv, es el conjunto')
print('      con más potencial de la cuenta. Vale más que cualquier ajuste de')
print('      presupuesto.')
print('  ⚠️ PERO cambiar audiencia SÍ reinicia el aprendizaje, y hoy es el')
print('      GRUPO DE CONTROL del test del valle (26-29 ago).')
print('      -> No tocarlo hasta el 30-ago. Anotarlo como la jugada siguiente.')
