#!/usr/bin/env python3
"""
EXPORT POR CONJUNTO x VENTANA · 7 y 8 de septiembre 2026
=========================================================
Primer export a nivel CONJUNTO desde el 4-sep. Se compara contra la ventana
4-6 sep documentada en 0-AD.

⚠️ DOS TRAMPAS DE ESTA VENTANA, DECLARADAS DE ENTRADA:
  1. El 8-sep esta INCOMPLETO (export ~4 pm de Bogota). Los $/conv (que son
     un cociente) aguantan bien; los "por dia" y las utilizaciones NO, hay
     que normalizar por dias efectivos.
  2. 7-8 sep es LUNES y MARTES. 4-6 sep era VIERNES, SABADO y DOMINGO.
     El archivo mide que el finde rinde +44% (0-Y). ASI QUE PARTE DE
     CUALQUIER DETERIORO ES DIA DE SEMANA, NO DESGASTE. Es la misma
     contaminacion que se documento en 0-W.
"""

L = '=' * 72

# ---------- EXPORT 7-8 SEP ----------
# nombre: (ppto, gasto, conv, impresiones, alcance, contactos, nuevos, ult_cambio)
HOY = {
    'TEST Creativos':      (25_000, 40_149,  66,  7_662,  6_359,  70,  64, '2026-08-19'),
    'Domiciliarios':       (45_000, 94_066, 132, 28_608, 24_527, 137, 127, '2026-08-19'),
    'Domiciliarios VIDEO': (55_000, 89_907, 126, 26_551, 24_922, 130, 118, '2026-09-02'),
    'Motorizados':         (15_000, 28_484,  39,  7_086,  6_284,  41,  37, '2026-08-31'),
    'Valle del Cauca':     (15_000,  5_157,   1,  1_516,  1_345,   3,   0, '2026-08-31'),
    'COLMENA · VIDEO':     (20_000, 25_539,   6,  3_490,  3_084,   8,   5, '2026-09-04'),
}
# apagados confirmados: "Domiciliarios | Colmena" $0 · "Publico ABIERTO - Creativo" $13

# ---------- VENTANA 4-6 SEP (0-AD) ----------
ANTES = {   # $/conv, gasto/dia, conv
    'TEST Creativos':      (  541, 15_138,  84),
    'Domiciliarios':       (  673, 45_796, 204),
    'Domiciliarios VIDEO': (  716, 53_460, 224),
    'Motorizados':         (  656, 13_775,  63),
    'Valle del Cauca':     (1_119,  6_713,  18),
    'COLMENA · VIDEO':     (1_883, 15_693,  25),
}

# dias efectivos de la ventana 7-8: el 8-sep esta parcial.
# Ancla: la campana vieja tiene $155.000/dia de presupuesto y gasto $257.763.
PPTO_VIEJA = 155_000
GASTO_VIEJA = sum(v[1] for k, v in HOY.items() if 'COLMENA' not in k)
DIAS_EF = GASTO_VIEJA / PPTO_VIEJA     # ~1,66 dias si utiliza 100%

# --- economia con el costo nuevo de $33.000 ---
MARGEN_UD    = 26_900
FUGA_FLETE   = 2_800
UDS_PEDIDO   = 1.286
CIERRE       = 0.084
MARGEN_PEDIDO = MARGEN_UD * UDS_PEDIDO - FUGA_FLETE
EQUILIBRIO_CONV = MARGEN_PEDIDO * CIERRE
MARGEN_COLMENA  = 43_306
TRIPWIRE = 1_200

print(L)
print('1. LA FOTO, ORDENADA POR COSTO')
print(L)
print(f'  {"Conjunto":<21} {"Ppto":>7} {"Gasto":>8} {"Conv":>5} {"$/conv":>8} '
      f'{"antes":>7} {"cambio":>8}')
for k, v in sorted(HOY.items(), key=lambda x: x[1][1]/max(x[1][2], 1)):
    ppto, gasto, conv = v[0], v[1], v[2]
    pc = gasto / conv if conv else 0
    ant = ANTES[k][0]
    print(f'  {k:<21} {ppto:>7,} {gasto:>8,} {conv:>5} {pc:>8,.0f} '
          f'{ant:>7,} {pc/ant-1:>7.1%}')
tot_g = sum(v[1] for v in HOY.values())
tot_c = sum(v[2] for v in HOY.values())
print(f'  {"CUENTA COMPLETA":<21} {"":>7} {tot_g:>8,} {tot_c:>5} '
      f'{tot_g/tot_c:>8,.0f}')
print(f'  {"solo campana vieja":<21} {"":>7} {GASTO_VIEJA:>8,} '
      f'{tot_c-HOY["COLMENA · VIDEO"][2]:>5} '
      f'{GASTO_VIEJA/(tot_c-HOY["COLMENA · VIDEO"][2]):>8,.0f}')
print()
print(f'  Equilibrio por conversacion (costo $33.000): '
      f'${EQUILIBRIO_CONV:,.0f}')
print()

print(L)
print('2. 🔑 EL HALLAZGO: EL VIDEO ES EL UNICO QUE **NO** SE DETERIORO')
print(L)
viejo_antes = sum(ANTES[k][1] for k in HOY if 'COLMENA' not in k) * 3
conv_antes  = sum(ANTES[k][2] for k in HOY if 'COLMENA' not in k)
print(f'  Campana vieja 4-6 sep : ${viejo_antes:,} / {conv_antes} conv = '
      f'${viejo_antes/conv_antes:,.0f}')
print(f'  Campana vieja 7-8 sep : ${GASTO_VIEJA:,} / '
      f'{tot_c-HOY["COLMENA · VIDEO"][2]} conv = '
      f'${GASTO_VIEJA/(tot_c-HOY["COLMENA · VIDEO"][2]):,.0f}')
subida = (GASTO_VIEJA/(tot_c-HOY['COLMENA · VIDEO'][2])) / (viejo_antes/conv_antes) - 1
print(f'  >>> Toda la cuenta subio {subida:+.1%}')
print()
print('  Y adentro, cada uno se movio distinto:')
print()
for k in ('Domiciliarios VIDEO', 'Domiciliarios', 'Motorizados', 'TEST Creativos'):
    pc = HOY[k][1] / HOY[k][2]
    ch = pc / ANTES[k][0] - 1
    marca = '🟢 PLANO' if abs(ch) < 0.02 else ('🔴' if ch > 0.08 else '🔔')
    print(f'    {k:<21} {ANTES[k][0]:>5,} -> {pc:>5,.0f}  {ch:>+6.1%}  {marca}')
print()
print('  🔑 AYER SE CONCLUYO LO CONTRARIO Y HAY QUE MATIZARLO.')
print('     0-AD dijo: "el VIDEO se deterioro +14,4% y Domiciliarios se quedo')
print('     clavado = control perfecto". Con dos dias mas, el VIDEO es el UNICO')
print('     que no se movio, y los otros tres subieron entre 6% y 12%.')
print()
print('  ⚠️  PERO NO CANTAR VICTORIA: 4-6 era vie/sab/dom y 7-8 es lun/mar.')
print('      El finde rinde +44% (0-Y), asi que buena parte de esa subida')
print(f'      general de {subida:.1%} es DIA DE SEMANA, no desgaste.')
print('      Lo que SI es solido: en la misma ventana, con la misma subasta y')
print('      los mismos dias, el VIDEO aguanto y los demas no.')
print()
pc_video = HOY['Domiciliarios VIDEO'][1] / HOY['Domiciliarios VIDEO'][2]
pc_dom   = HOY['Domiciliarios'][1] / HOY['Domiciliarios'][2]
print(f'  📌 Y el empate: VIDEO ${pc_video:,.0f} vs Domiciliarios ${pc_dom:,.0f} '
      f'= {pc_video/pc_dom-1:+.1%}. Son el MISMO numero.')
print('     La brecha del 14,4% se cerro sola, sin tocar nada.')
print()
print(f'  ⛔ EL GATILLO DE #78 NO SE DISPARA: era "que el VIDEO pase de $800".')
print(f'     Esta en ${pc_video:,.0f}. TEST B Franja se queda apagado.')
print()

print(L)
print('3. TEST CREATIVOS: EL COSTO SUBIO 12% Y AUN ASI HAY QUE SEGUIR')
print(L)
ppto, gasto, conv = HOY['TEST Creativos'][:3]
g_dia, c_dia = gasto/DIAS_EF, conv/DIAS_EF
g_ant, c_ant = ANTES['TEST Creativos'][1], ANTES['TEST Creativos'][2]/3
print(f'  Presupuesto: $20.000 -> $25.000 (+25%) el 7-sep')
print(f'  Costo/conv : ${ANTES["TEST Creativos"][0]:,} -> ${gasto/conv:,.0f} '
      f'({gasto/conv/ANTES["TEST Creativos"][0]-1:+.1%})')
print()
print(f'  El promedio engana. El marginal (protocolo 0-AC), con '
      f'{DIAS_EF:.2f} dias efectivos:')
print(f'    4-6 sep : ${g_ant:>7,.0f}/dia -> {c_ant:>4.1f} conv/dia')
print(f'    7-8 sep : ${g_dia:>7,.0f}/dia -> {c_dia:>4.1f} conv/dia')
marg = (g_dia - g_ant) / (c_dia - c_ant)
print(f'    MARGINAL: ${marg:,.0f} por conversacion')
print()
print('  Sensibilidad al dia parcial (no se sabe la hora exacta del export):')
for f in (0.5, 0.66, 0.8, 1.0):
    d = 1 + f
    m = (gasto/d - g_ant) / (conv/d - c_ant)
    print(f'    si el 8-sep va al {f*100:>3.0f}%: {d:.2f} dias -> marginal ${m:>6,.0f}')
print(f'  >>> En TODOS los casos queda debajo del tripwire de ${TRIPWIRE:,}.')
print(f'      Y muy debajo del limite de ${EQUILIBRIO_CONV:,.0f}.')
print()
print(f'  🟢 Y LO MEJOR: la utilizacion paso de 76% a '
      f'{g_dia/ppto*100:.0f}%.')
print('     Dos veces se dijo "ojo, es la nata de un conjunto hambriento".')
print('     Ya NO esta hambriento: gasta casi todo y sigue siendo el mas barato')
print(f'     de la cuenta (${gasto/conv:,.0f} contra ${pc_dom:,.0f} del que le sigue).')
print('     >>> Sigue siendo el candidato a escalar. El +12% es el precio')
print('         normal de crecer, no una senal de alarma.')
print()

print(L)
print('4. 🔴 VALLE: EL PROBLEMA NO ES QUE SEA CARO, ES QUE NO GASTA')
print(L)
ppto_v, gasto_v, conv_v = HOY['Valle del Cauca'][:3]
print(f'  7-8 sep: ${gasto_v:,} y {conv_v} conversacion = ${gasto_v/conv_v:,.0f}')
print(f'  Utilizacion: ${gasto_v/DIAS_EF:,.0f}/dia sobre ${ppto_v:,} = '
      f'{gasto_v/DIAS_EF/ppto_v*100:.0f}%')
print()
acum_g = ANTES['Valle del Cauca'][1]*3 + gasto_v
acum_c = ANTES['Valle del Cauca'][2] + conv_v
print(f'  Acumulado 4-8 sep: ${acum_g:,} / {acum_c} conv = ${acum_g/acum_c:,.0f}')
print(f'  >>> OJO: en PROMEDIO ${acum_g/acum_c:,.0f} esta DEBAJO del equilibrio '
      f'de ${EQUILIBRIO_CONV:,.0f}.')
print('      Valle no esta perdiendo plata. El $5.157 es n=1 y no mata nada.')
print()
ocioso = (ppto_v - gasto_v/DIAS_EF)
print(f'  🔑 EL COSTO REAL DE VALLE ES OTRO: tiene ${ppto_v:,} reservados y')
print(f'     entrega ${gasto_v/DIAS_EF:,.0f}. Son ${ocioso:,.0f}/dia de presupuesto')
print(f'     OCIOSO = ${ocioso*30:,.0f}/mes que no compra nada.')
print('     Es exactamente la fuga de "presupuesto sin gastar" del archivo.')
print()
print(f'  Va en {acum_c}/30 conversaciones del gate. Dos caminos:')
print(f'    (a) BAJARLO a $5.000  -> libera $10.000, mantiene el test vivo,')
print('        pero un conjunto mas chico paga prima de CPM (#78b)')
print('    (b) APAGARLO           -> libera $15.000, mata la tesis del lago')
print('  📌 RECOMENDADO: (a). No se mata un test con n=1, pero tampoco se le')
print('     dejan $15.000 secuestrados a algo que entrega el 21%.')
print()

print(L)
print('5. 🔴 EL COLMENA SE FRENO OTRA VEZ — Y PUEDE SER CULPA NUESTRA')
print(L)
ppto_c, gasto_c, conv_c, impr_c, alc_c = HOY['COLMENA · VIDEO'][:5]
cpm_c = gasto_c / impr_c * 1000
print(f'  7-8 sep: ${gasto_c:,} / {conv_c} conv = ${gasto_c/conv_c:,.0f}  '
      f'(era ${ANTES["COLMENA · VIDEO"][0]:,})')
print(f'  Mismo gasto por dia (${gasto_c/DIAS_EF:,.0f} vs '
      f'${ANTES["COLMENA · VIDEO"][1]:,}) pero '
      f'{conv_c/DIAS_EF:.1f} conv/dia contra {ANTES["COLMENA · VIDEO"][2]/3:.1f}.')
print('  >>> Es el patron de Motorizados de 0-AC: la MISMA plata compra MENOS.')
print('      Marginal negativo. No es que se encarecio: es que no entrega.')
print()
print(f'  🔔 Y EL CPM VOLVIO A SUBIR: ${cpm_c:,.0f}')
print('     Historia del CPM del colmena:')
print('       $7.439  dentro de la campana vieja (ahogado por sus hermanos)')
print('       $5.225  al mudarse a campana propia el 4-sep  <- #83 dijo "era la campana"')
print('       $5.417  ventana 4-7 sep')
print(f'       ${cpm_c:,.0f}  ventana 7-8 sep  <- volvio al punto de partida')
print()
print('  🔴 HIPOTESIS QUE HAY QUE PONER SOBRE LA MESA: apagar el estatico el')
print('     7-sep dejo la campana con UN solo conjunto y $20.000 en vez de')
print('     $40.000. La campana quedo chica y perdio peso en la subasta.')
print('     Apagar el estatico era correcto POR MARGEN (era el 92% de la')
print('     perdida) pero pudo costarle ENTREGA al video.')
print('     ⚠️  Es hipotesis, no conclusion: tambien puede ser lun/mar, o que')
print('         el publico amplio se este agotando. Frecuencia: '
      f'{impr_c/alc_c:.2f} (baja, no parece agotamiento).')
print()
video_g = ANTES['COLMENA · VIDEO'][1]*3 + gasto_c
video_c = ANTES['COLMENA · VIDEO'][2] + conv_c
VENTAS = 2
res = VENTAS*MARGEN_COLMENA - video_g
print(f'  CUENTA ACUMULADA DEL VIDEO DEL COLMENA (4-8 sep):')
print(f'    Gasto            : ${video_g:>8,}  ({video_c} conv, '
      f'${video_g/video_c:,.0f}/conv)')
print(f'    {VENTAS} ventas x ${MARGEN_COLMENA:,} : ${VENTAS*MARGEN_COLMENA:>8,}')
print(f'    RESULTADO        : ${res:>8,}  '
      f'{"🟢 sigue POSITIVO" if res > 0 else "🔴"}')
print(f'    Cierre {VENTAS/video_c*100:.1f}% contra '
      f'{video_g/video_c/MARGEN_COLMENA*100:.1f}% de equilibrio')
print(f'  ⚠️  Pero el colchon se encogio: era +$30.012 ayer, hoy ${res:,}.')
print(f'      Van {video_c} conversaciones y {VENTAS} ventas. Si no aparece una')
print('      tercera venta pronto, el equilibrio lo alcanza.')
print()

print(L)
print('6. 🆕 DOS COLUMNAS QUE RESPONDEN COSAS VIEJAS')
print(L)
print('  (a) "ULTIMO CAMBIO SIGNIFICATIVO" — el reinicio de aprendizaje')
print()
print(f'  {"Conjunto":<21} {"ult. cambio":>12}   que se le hizo despues')
print(f'  {"TEST Creativos":<21} {"2026-08-19":>12}   $20.000 -> $25.000 el 7-sep (+25%)')
print(f'  {"Domiciliarios VIDEO":<21} {"2026-09-02":>12}   $35.000 -> $55.000 el 4-sep (+57%)')
print()
print('  🔑 NI EL +25% NI EL +57% QUEDARON REGISTRADOS COMO CAMBIO')
print('     SIGNIFICATIVO. O sea: subir presupuesto, incluso 57%, NO le')
print('     reinicio el aprendizaje a ninguno de los dos.')
print('     >>> Refuerza 0-M ("el reinicio no se puede predecir") y le quita')
print('         miedo al paso 1 del protocolo de escalamiento. El limite de')
print('         20-25% sigue siendo prudente, pero no por reinicio.')
print()
print('  (b) CONTACTOS REPETIDOS — quien vuelve a escribir')
print()
print(f'  {"Conjunto":<21} {"contactos":>10} {"nuevos":>7} {"repiten":>8} {"%":>7}')
for k, v in HOY.items():
    cont, nue = v[5], v[6]
    if not cont:
        continue
    if k == 'Valle del Cauca':
        print(f'  {k:<21} {cont:>10} {"(vacio)":>7} {"n/d":>8} {"n/d":>7}')
        continue
    rep = cont - nue
    print(f'  {k:<21} {cont:>10} {nue:>7} {rep:>8} {rep/cont:>6.0%}')
print()
print('  ⚠️  Valle vino con la columna "nuevos" VACIA en el export, no en cero.')
print('      No es que repitan el 100%: es un dato que Meta no entrego.')
print('  🔑 El colmena repite al 38% contra 7-10% del resto. Con n=8 es fragil,')
print('     pero encaja: a $149.900 la gente consulta, se va a pensarlo y')
print('     vuelve. >>> Si se confirma, el seguimiento del guion (1 mensaje')
print('     unas horas despues) vale MAS en el colmena que en el tradicional.')
print()

print(L)
print('7. QUE HACER — EN ORDEN')
print(L)
print('  1. ⛔ NO TOCAR EL VIDEO. Se estabilizo en $714 y empato con')
print('     Domiciliarios. Ni subir (0-AD lo descarto) ni bajar.')
print('  2. ⛔ TEST B FRANJA SIGUE APAGADO. El gatillo era $800, esta en $714.')
print('  3. 🔧 VALLE: bajar de $15.000 a $5.000. Libera $10.000 ociosos sin')
print('     matar el test (va 19/30).')
print('  4. 📈 TEST CREATIVOS: siguiente escalon $25.000 -> $30.000 (+20%),')
print('     pero NO HOY. El protocolo pide 48-72 h entre pasos y se subio')
print('     ayer. >>> Miercoles 9 o jueves 10.')
print('  5. 💎 COLMENA: dejarlo en $20.000 dos dias mas. Sigue positivo, pero')
print('     si el CPM no baja de $7.000 el problema es de subasta y toca')
print('     probar de vuelta un segundo conjunto para darle peso a la campana.')
print('  6. 📊 Lo que falta para cerrar el dia: CUANTOS PEDIDOS salieron el')
print('     7 y el 8. Sin eso el CPA por pedido no se puede casar.')
print()
tot_ppto = sum(v[0] for v in HOY.values())
print(f'  Presupuesto declarado hoy: ${tot_ppto:,}/dia')
print(f'  Con Valle a $5.000       : ${tot_ppto-10_000:,}/dia')
print('  (el total NO sube: se mueve plata ociosa, no se agrega)')
