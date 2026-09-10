#!/usr/bin/env python3
"""
LAS TRES PREGUNTAS DEL DUENO · 2026-09-09
==========================================
1. ¿Que se puede hacer con el colmena?
2. ¿Usamos TikTok?
3. ¿Conviene expandir mas el tradicional? ¿Como crecemos?

Y de paso resuelve la contradiccion aparente: por que el colmena NO puede
comprar publico frio y el tradicional SI.
"""

L = '=' * 74

MARGEN_TRAD_1UD = 27_226      # $26.900 + $326 de envio cobrado de mas
MARGEN_TRAD_PED = 31_634      # promedio a 1,176 uds/pedido
MARGEN_TRAD_2UD = 44_000 - 799
MARGEN_COLM     = 40_968
CIERRE          = 0.084
CONV_DIA        = 160
PEDIDOS_DIA     = CONV_DIA * CIERRE
LIMITE_CONV     = 2_657
CLIENTES        = 450

print(L)
print('0. LA CONTRADICCIÓN QUE TE QUEDÓ, RESUELTA EN CUATRO LÍNEAS')
print(L)
print('  No es que "el publico amplio no sirve". Es que un conjunto ENTRENADO')
print('  compra publico frio barato y uno SIN ENTRENAR lo compra carisimo.')
print()
print(f'  {"Conjunto":<24} {"corre desde":>13} {"CPM":>9} {"veredicto"}')
print(f'  {"Domiciliarios":<24} {"11-jul":>13} {3_369:>9,} entrenado -> compra frio bien')
print(f'  {"COLMENA video":<24} {"4-sep":>13} {10_062:>9,} sin entrenar -> 3x mas caro')
print()
print('  🔑 El tradicional SI puede seguir en publico amplio: su conjunto lleva')
print('     2 meses aprendiendo quien compra. El colmena no alcanzo a aprender')
print('     nada porque solo hizo 2 ventas en 6 dias.')
print('  🔑 Y por eso su limite NO es el publico: es el MAPA. Ver seccion 3.')
print()

print(L)
print('1. QUÉ SE PUEDE HACER CON EL COLMENA — TRES COSAS, EN ESTE ORDEN')
print(L)
delta = MARGEN_COLM - MARGEN_TRAD_PED
print(f'  A) UPSELL en la conversacion que ya pagas.  PERMANENTE, pauta $0.')
print(f'     {PEDIDOS_DIA:.1f} pedidos/dia · cada uno que elige colmena deja +${delta:,}')
for pct in (0.05, 0.10):
    print(f'     al {pct:.0%}: {PEDIDOS_DIA*pct:.2f} colmenas/dia = '
          f'${PEDIDOS_DIA*pct*delta*30:,.0f}/mes')
print()
match = int(CLIENTES * 0.6)
impr = match * 5
gasto_1tiro = impr * 10_062/1000
print(f'  B) TU BASE DE ~{CLIENTES} CLIENTES.  UN SOLO TIRO, y entrena el conjunto.')
print(f'     ~{match} emparejan con Facebook (60%) x 5 impresiones utiles '
      f'= {impr:,} impresiones')
print(f'     = ${gasto_1tiro:,.0f} de gasto TOTAL. A $5.000/dia son '
      f'{gasto_1tiro/5_000:.0f} dias y se acaba.')
print(f'     ⚠️ NO es un canal. Es un tiro de ~${gasto_1tiro:,.0f} que puede')
print(f'        devolver $55.000-$82.000 Y dejarle datos a Meta.')
print()
print(f'  C) PUBLICO SIMILAR de esos {CLIENTES}.  ONGOING, pero DESPUES de (B).')
print(f'     Meta acepta desde 100 registros, asi que {CLIENTES} alcanza.')
print('     Pero es publico frio otra vez: solo funciona si el conjunto ya')
print('     aprendio en (B) quien compra colmenas.')
print()
print('  ⛔ Lo que NO se hace: volver a pautarlo a Colombia amplio. Eso ya')
print('     costo $85.843 y el CPM subio cada dia.')
print()

print(L)
print('2. ¿TIKTOK? SÍ, PERO NO AHORA Y NO POR EL COLMENA')
print(L)
print('  A favor:')
print('    · CPM = $0. Es literalmente el unico problema que tiene el colmena.')
print('    · El colmena es visual: 3 piezas, zapatones, "parece sudadera".')
print('    · Ya tienes la herramienta: carrusel-colmena.html saca 8 slides de')
print('      una foto, y estan los guiones en TIKTOK-GUIONES-Y-SETUP.md.')
print()
print('  En contra, y pesa mas hoy:')
print('    · Cuesta TU TIEMPO, que el archivo identifica como el FRENO #1 del')
print('      negocio. No cuesta plata, cuesta la cosa mas escasa que tienes.')
print('    · Tarda 2-3 meses en dar algo, no una semana.')
print('    · Es el mas impredecible de todos los canales.')
print()
print('  📌 VEREDICTO: 15-20 minutos al dia, y SOLO si te sobran despues de')
print('     las dos llamadas a 99 Envios y del upsell. Prioridad baja pero no')
print('     cero. Y cuando arranque, el contenido es del COLMENA, no del')
print('     tradicional: el tradicional ya tiene canal que funciona.')
print()

print(L)
print('3. CÓMO SE EXPANDE EL NEGOCIO — LAS TRES PALANCAS, MEDIDAS')
print(L)
print('  ⛔ PRIMERO, LO QUE **NO** ES PALANCA: subir el presupuesto.')
print('     Elasticidad medida 0,63 -> la utilidad esta casi PLANA entre')
print('     $125.000 y $200.000/dia. Estas en $145.000. Duplicar el gasto')
print('     subiria las ventas solo 31%. Ya no paga.')
print()

# --- palanca 1: share de 2 unidades ---
print('  🥇 PALANCA 1 — RECUPERAR EL SHARE DE 2 UNIDADES. Gratis.')
delta_2ud = MARGEN_TRAD_2UD - MARGEN_TRAD_1UD
for desde, hasta in ((0.157, 0.268),):
    n = PEDIDOS_DIA * (hasta - desde)
    print(f'     El share cayo de 26,8% a {desde:.1%}. Volverlo a {hasta:.1%}:')
    print(f'     {n:.2f} pedidos/dia pasan de 1 a 2 unidades x ${delta_2ud:,} '
          f'= ${n*delta_2ud:,.0f}/dia')
    print(f'     = ${n*delta_2ud*30:,.0f}/MES, con pauta $0')
print('     🔑 Es el numero mas grande de esta hoja, y no cuesta un peso.')
print('        Ya paso una vez: el guion aporto +$44.007/dia contra +$17.101')
print('        del escalon de presupuesto. 2,6x, y costo 10 minutos.')
print()

# --- palanca 2: geografia ---
print('  🥈 PALANCA 2 — GEOGRAFÍA, PERO EN CONJUNTOS CHICOS.')
print('     🔑 LA LECCION DE VALLE NO FUE "la geografia no sirve". FUE')
print('        "no le des $15.000 a una region chica":')
print(f'     {"":<18} {"$15.000":>10} {"$5.000":>10}')
print(f'     {"Utilizacion":<18} {"21%":>10} {"69%":>10}')
print(f'     {"$/conversacion":<18} {"$5.157":>10} {"$1.379":>10}')
print(f'     {"vs equilibrio":<18} {"2x PEOR":>10} {"48% del limite":>10}')
print()
print(f'     A $1.379/conv, un conjunto regional de $5.000/dia RINDE.')
print('     Y hoy la pauta cubre ~23% de la poblacion; el otro 77% ya te')
print('     genera el 61% de los pedidos SIN que le pautes.')
print()
for n_reg in (3, 5):
    gasto = n_reg * 5_000
    conv = gasto / 1_379
    ped = conv * CIERRE
    marg = ped * MARGEN_TRAD_PED
    print(f'     {n_reg} regiones x $5.000 = ${gasto:,}/dia -> {conv:.1f} conv '
          f'-> {ped:.2f} pedidos -> ${marg-gasto:,.0f}/dia neto '
          f'(${(marg-gasto)*30:,.0f}/mes)')
print('     📌 Orden sugerido por el archivo (#76): Santanderes primero')
print('        (entrega 71%), Atlantico despues (su entrega del 50% hunde el')
print('        margen). Eje Cafetero y Costa siguen.')
print()

# --- palanca 3: TEST Creativos ---
print('  🥉 PALANCA 3 — AUDIENCIA PROPIA PARA TEST CREATIVOS.')
print(f'     Es tu mejor creativo: convierte 2,0x mejor por impresion que')
print(f'     Domiciliarios. Pero paga 2,4x su CPM porque compite contra el')
print(f'     por la misma audiencia guardada.')
print(f'     A CPM normal costaria $554/conv contra $1.039 de Domiciliarios.')
print('     ⚠️ CUANTO VALE: no se puede proyectar todavia. Que aguante $554')
print('        con presupuesto real es justo lo que no esta probado. Es la')
print('        apuesta con mas techo y mas incertidumbre de las tres.')
print()

print(L)
print('4. LAS TRES PALANCAS, ORDENADAS POR PLATA POR HORA TUYA')
print(L)
n_share = PEDIDOS_DIA * (0.268-0.157) * delta_2ud * 30
n_geo5  = ((5*5_000/1_379*CIERRE*MARGEN_TRAD_PED) - 5*5_000) * 30
n_ups   = PEDIDOS_DIA * 0.075 * delta * 30
filas = [
    ('Recuperar share de 2 uds', n_share, '$0', '10 min (pegar guion)'),
    ('Upsell del colmena',       n_ups,   '$0', '10 min (pegar guion)'),
    ('5 regiones a $5.000',      n_geo5,  '$25.000/dia', '1 hora (crear conjuntos)'),
    ('Base de 450 clientes',     0,       '~$14.000 total', '2 horas (exportar+subir)'),
]
print(f'  {"Palanca":<28} {"$/mes":>12} {"Cuesta":>16} {"Tu tiempo":<24}')
for n, v, c, t in filas:
    v_s = f'{v:,.0f}' if v else 'un tiro'
    print(f'  {n:<28} {v_s:>12} {c:>16} {t:<24}')
print()
print('  🔑 LAS DOS PRIMERAS SON PEGAR TEXTO EN LA IA Y VALEN MAS QUE ABRIR')
print('     CINCO REGIONES. Empieza por ahi.')
print()

print(L)
print('5. EL PLAN DE LAS PRÓXIMAS DOS SEMANAS')
print(L)
print('  ESTA SEMANA (gratis, 20 minutos en total)')
print('    1. Pegar el bloque de recuperar la 2a unidad en el guion')
print('    2. Pegar el bloque del upsell del colmena')
print('    3. Las dos llamadas a 99 Envios (comision de recaudo + Tado)')
print('    4. Empezar a anotar en la hoja: colmena vs tradicional por pedido')
print()
print('  SEMANA QUE VIENE (si el share subio)')
print('    5. Abrir Santanderes a $5.000/dia. UNA region, no cinco.')
print('       Se mide 5 dias contra el equilibrio de $2.657 y ahi se decide')
print('       si se replica el molde.')
print('    6. Exportar el historico con telefonos y subir la audiencia')
print()
print('  ⛔ LO QUE NO SE HACE EN NINGUNA DE LAS DOS SEMANAS')
print('    · Subir el presupuesto total (elasticidad 0,63)')
print('    · Volver a pautar el colmena en frio')
print('    · Tocar Domiciliarios ni el VIDEO')
print('    · Abrir cinco regiones de una: se prueba UNA y se copia el molde')
