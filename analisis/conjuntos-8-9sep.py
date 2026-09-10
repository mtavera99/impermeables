#!/usr/bin/env python3
"""
EXPORT POR CONJUNTO · 8 y 9 de septiembre 2026
===============================================
El dueno reporta que "se subio harto". Se verifica cuanto es real y cuanto es
artefacto de medicion.

⚠️⚠️ TRAMPA MAYOR DE ESTA COMPARACION — LEER ANTES DE CONCLUIR:
La ventana anterior (7-8 sep) y esta (8-9 sep) COMPARTEN el 8-sep, pero en la
anterior el 8-sep estaba PARCIAL y aca esta COMPLETO. Y el 9-sep de aca es un
pedazo muy chico del dia. O sea que:
   ventana 7-8 = lunes completo + martes a medias
   ventana 8-9 = martes completo + un pedacito de miercoles
NO son dos ventanas equivalentes corridas un dia. Y ademas:

🔑 EL SESGO QUE INFLA TODO DIA RECIEN MEDIDO:
El indicador es "messaging_conversation_started_7d". El GASTO se cuenta al
instante; las CONVERSACIONES se atribuyen con retraso (hasta 7 dias despues
del clic). Entonces en cualquier ventana que incluya horas recientes, el
numerador esta completo y el denominador NO. El costo por conversacion sale
INFLADO y va bajando solo con los dias.
PRECEDENTE MEDIDO EN ESTE PROYECTO: el 1-sep aislado marco $12.639 y la
ventana 1-3 sep, ya cerrada, dio $8.257 (0-AB / 0-AC). Un 34% de inflacion
por leer fresco.
"""

L = '=' * 74

# --- 8-9 sep (nombre: ppto, gasto, conv, impresiones, alcance, contactos, nuevos) ---
HOY = {
    'Domiciliarios':       (45_000, 52_554,  63, 14_400, 12_811,  64,  60),
    'Domiciliarios VIDEO': (55_000, 62_838,  72, 17_745, 16_142,  75,  68),
    'Motorizados':         (15_000, 24_161,  25,  6_191,  5_446,  27,  25),
    'TEST Creativos':      (25_000, 30_845,  29,  4_618,  3_968,  33,  29),
    'Valle del Cauca':     ( 5_000,  4_138,   3,    914,    807,   4,   3),
    'COLMENA · VIDEO':     (20_000, 29_243,   9,  3_253,  2_856,   9,   9),
}
# --- 7-8 sep, para comparar ---
AYER = {
    'Domiciliarios':       (45_000, 94_066, 132, 28_608, 24_527),
    'Domiciliarios VIDEO': (55_000, 89_907, 126, 26_551, 24_922),
    'Motorizados':         (15_000, 28_484,  39,  7_086,  6_284),
    'TEST Creativos':      (25_000, 40_149,  66,  7_662,  6_359),
    'Valle del Cauca':     (15_000,  5_157,   1,  1_516,  1_345),
    'COLMENA · VIDEO':     (20_000, 25_539,   6,  3_490,  3_084),
}
VIEJA = [k for k in HOY if 'COLMENA' not in k]

# --- economia vigente (0-AE) ---
MARGEN_UD   = 26_900          # costo $33.000
UDS_PEDIDO  = 1.176           # medido en 51 guias del 7-8 sep
CIERRE      = 0.084
MARGEN_PEDIDO = MARGEN_UD * UDS_PEDIDO      # absorcion ~0 en sencillos
LIMITE_CONV = MARGEN_PEDIDO * CIERRE
MARGEN_COLM = 40_968          # real medido, no $43.306
TRIPWIRE    = 1_200

print(L)
print('1. SÍ SUBIÓ. CUÁNTO Y DÓNDE')
print(L)
print(f'  {"Conjunto":<21} {"$/conv 7-8":>11} {"$/conv 8-9":>11} {"cambio":>9} '
      f'{"CPM 7-8":>9} {"CPM 8-9":>9}')
for k in sorted(HOY, key=lambda x: -(HOY[x][1]/HOY[x][2])):
    pc_h = HOY[k][1]/HOY[k][2]
    pc_a = AYER[k][1]/AYER[k][2]
    cpm_h = HOY[k][1]/HOY[k][3]*1000
    cpm_a = AYER[k][1]/AYER[k][3]*1000
    m = '🔴' if pc_h/pc_a-1 > 0.30 else ('🔔' if pc_h/pc_a > 1 else '🟢')
    print(f'  {k:<21} {pc_a:>11,.0f} {pc_h:>11,.0f} {pc_h/pc_a-1:>8.0%} '
          f'{cpm_a:>9,.0f} {cpm_h:>9,.0f} {m}')

g_h = sum(HOY[k][1] for k in VIEJA); c_h = sum(HOY[k][2] for k in VIEJA)
g_a = sum(AYER[k][1] for k in VIEJA); c_a = sum(AYER[k][2] for k in VIEJA)
i_h = sum(HOY[k][3] for k in VIEJA); i_a = sum(AYER[k][3] for k in VIEJA)
a_h = sum(HOY[k][4] for k in VIEJA); a_a = sum(AYER[k][4] for k in VIEJA)
print(f'  {"CAMPAÑA VIEJA":<21} {g_a/c_a:>11,.0f} {g_h/c_h:>11,.0f} '
      f'{(g_h/c_h)/(g_a/c_a)-1:>8.0%}')
print()

print(L)
print('2. 🔬 DESCOMPONER EL +28%: LA MITAD NO ES ENCARECIMIENTO')
print(L)
cpm_a, cpm_h = g_a/i_a*1000, g_h/i_h*1000
cr_a, cr_h = c_a/i_a*1000, c_h/i_h*1000
print('  $/conversacion = CPM ÷ (conversaciones por mil impresiones)')
print()
print(f'  {"":<34} {"7-8 sep":>10} {"8-9 sep":>10} {"cambio":>9}')
print(f'  {"CPM (lo que cuesta mostrar)":<34} {cpm_a:>10,.0f} {cpm_h:>10,.0f} '
      f'{cpm_h/cpm_a-1:>8.1%}')
print(f'  {"Conv por mil impresiones":<34} {cr_a:>10.2f} {cr_h:>10.2f} '
      f'{cr_h/cr_a-1:>8.1%}')
print(f'  {"= $/conversacion":<34} {g_a/c_a:>10,.0f} {g_h/c_h:>10,.0f} '
      f'{(g_h/c_h)/(g_a/c_a)-1:>8.1%}')
print()
print(f'  🔑 EL CPM SUBIO {cpm_h/cpm_a-1:.1%}. Eso es REAL: la subasta esta mas cara.')
print(f'     Pero la tasa de conversion cayo {1-cr_h/cr_a:.1%}, y ESO es justo lo que')
print('     el retraso de atribucion produce artificialmente: el gasto del')
print('     9-sep ya esta contado y sus conversaciones todavia no.')
print()
print('  📊 CUANTO PESA CADA COSA:')
print(f'     Si la tasa de conversion NO hubiera caido, el $/conv seria '
      f'${cpm_h/cr_a*1000/1000*1:,.0f}...')
solo_cpm = (g_a/c_a) * (cpm_h/cpm_a)
print(f'     Solo con el CPM mas caro: ${solo_cpm:,.0f} (+{solo_cpm/(g_a/c_a)-1:.0%})')
print(f'     Lo demas hasta ${g_h/c_h:,.0f} lo pone el denominador incompleto.')
print()
print('  🟢 Y LA ALARMA TEMPRANA DEL PROTOCOLO **NO** ESTA SONANDO:')
print(f'     Frecuencia {i_a/a_a:.2f} -> {i_h/a_h:.2f}. Plana.')
print('     Si fuera audiencia quemada, la frecuencia subiria. No subio.')
print('     >>> No estas pagando por mostrarle el anuncio a la misma gente.')
print()

print(L)
print('3. 🟢 LO QUE DE VERDAD IMPORTA: QUÉ TAN LEJOS ESTÁS DEL EQUILIBRIO')
print(L)
print(f'  Con el costo nuevo de $33.000 y {UDS_PEDIDO} uds/pedido:')
print(f'    Margen por pedido       : ${MARGEN_PEDIDO:,.0f}')
print(f'    Cierre                  : {CIERRE:.1%}')
print(f'    LIMITE por conversacion : ${LIMITE_CONV:,.0f}  '
      '(ahi la utilidad llega a CERO)')
print()
print(f'  {"":<26} {"$/conv":>9} {"% del limite":>13} {"CPA/pedido":>12} '
      f'{"utilidad/pedido":>16}')
for et, pc in (('4-6 sep', 682), ('7-8 sep', g_a/c_a), ('8-9 sep (hoy)', g_h/c_h)):
    cpa = pc/CIERRE
    print(f'  {et:<26} {pc:>9,.0f} {pc/LIMITE_CONV:>12.0%} {cpa:>12,.0f} '
          f'{MARGEN_PEDIDO-cpa:>16,.0f}')
print()
print(f'  🔑 A ${g_h/c_h:,.0f} estás en el {g_h/c_h/LIMITE_CONV:.0%} del punto de equilibrio.')
print(f'     Te queda {LIMITE_CONV/(g_h/c_h):.1f}x de espacio antes de perder plata,')
print(f'     y cada pedido todavia deja ${MARGEN_PEDIDO-(g_h/c_h)/CIERRE:,.0f} limpios.')
print()
print('  📌 $909 asusta al lado de $682, pero el numero contra el que hay que')
print(f'     compararlo no es $682: es ${LIMITE_CONV:,.0f}. Ese es el que duele.')
print('     Y ojo: el costo bajando a $33.000 SUBIO ese limite. Hoy aguantas')
print('     mas caro que la semana pasada.')
print()

print(L)
print('4. 🔴 EL PROBLEMA REAL NO ES LA CUENTA: ES TEST CREATIVOS')
print(L)
k = 'TEST Creativos'
pc_a, pc_h = AYER[k][1]/AYER[k][2], HOY[k][1]/HOY[k][2]
print(f'  $541 (4-6) -> $608 (7-8) -> **${pc_h:,.0f}** (8-9)')
print(f'  Contra el resto de la cuenta, que subio {(g_h/c_h)/(g_a/c_a)-1:.0%}, '
      f'este subio {pc_h/pc_a-1:.0%}.')
print()
print(f'  {"":<28} {"7-8 sep":>10} {"8-9 sep":>10}')
print(f'  {"CPM":<28} {AYER[k][1]/AYER[k][3]*1000:>10,.0f} '
      f'{HOY[k][1]/HOY[k][3]*1000:>10,.0f}')
print(f'  {"Alcance":<28} {AYER[k][4]:>10,} {HOY[k][4]:>10,}')
print(f'  {"Frecuencia":<28} {AYER[k][3]/AYER[k][4]:>10.2f} '
      f'{HOY[k][3]/HOY[k][4]:>10.2f}')
print()
print(f'  🔑 SU CPM ES ${HOY[k][1]/HOY[k][3]*1000:,.0f}: el mas caro de la campaña vieja,')
print(f'     {HOY[k][1]/HOY[k][3]*1000/(g_h/i_h*1000)-1:+.0%} sobre el promedio. Y la frecuencia sigue en')
print(f'     {HOY[k][3]/HOY[k][4]:.2f}, o sea que NO es audiencia quemada: es que paga')
print('     carisimo cada impresion. Es el diagnostico de #77 otra vez —')
print('     canibalizacion de audiencia con Domiciliarios— pero ahora')
print('     con $25.000 en vez de $20.000, o sea que duele mas.')
print()
print('  ⛔⛔ POR ESO **NO** SE SUBE A $30.000 HOY. Era el plan de anoche y')
print('     este dato lo cancela.')
print()
print('  📋 El tripwire de 0-AC dice: marginal sobre $1.200 DOS DIAS SEGUIDOS')
print('     -> volver al escalon anterior. Hoy es el primer dia, y esta')
print('     contaminado por atribucion. Entonces:')
print('     · HOY: no subir, no bajar. Se queda en $25.000.')
print('     · MAÑANA: si sigue sobre $1.000 con el dia cerrado, VOLVER a $20.000.')
print()

print(L)
print('5. 🟢 LA PODA DE VALLE FUNCIONÓ EXACTAMENTE COMO SE PREDIJO')
print(L)
k = 'Valle del Cauca'
print(f'  {"":<26} {"antes":>12} {"ahora":>12}')
print(f'  {"Presupuesto":<26} {15_000:>12,} {5_000:>12,}')
print(f'  {"Utilizacion":<26} {"21%":>12} '
      f'{HOY[k][1]/1.2/5_000:>11.0%}')
print(f'  {"$/conversacion":<26} {AYER[k][1]/AYER[k][2]:>12,.0f} '
      f'{HOY[k][1]/HOY[k][2]:>12,.0f}')
print()
print('  Se estimo "deberia quedar en ~62% de utilizacion". Quedo cerca.')
print(f'  Y el costo se desplomo de $5.157 a ${HOY[k][1]/HOY[k][2]:,.0f}, '
      f'debajo del limite de ${LIMITE_CONV:,.0f}.')
print('  🔑 Confirma el diagnostico: Valle nunca fue caro, estaba mal dimensionado.')
print(f'  📌 Y libero ${15_000-5_000:,}/dia que estaban comprando nada.')
print()

print(L)
print('6. 🔴🔴 EL COLMENA SE PASÓ AL ROJO — HAY QUE DECIDIR')
print(L)
k = 'COLMENA · VIDEO'
print(f'  8-9 sep: ${HOY[k][1]:,} y {HOY[k][2]} conversaciones = '
      f'${HOY[k][1]/HOY[k][2]:,.0f}/conv')
print(f'  Y se esta SOBREGIRANDO: ${HOY[k][1]/1.2:,.0f}/dia sobre '
      f'${HOY[k][0]:,} de presupuesto = {HOY[k][1]/1.2/HOY[k][0]:.0%}')
print()
print(f'  CPM: $7.439 (ahogado) -> $5.225 (campaña propia) -> $5.417 -> '
      f'$7.318 -> **${HOY[k][1]/HOY[k][3]*1000:,.0f}**')
print('  🔑 Ya esta PEOR que cuando estaba ahogado dentro de la campaña vieja.')
print('     La mudanza a campaña propia (#83) se deshizo sola.')
print()
print('  ACUMULADO ESTIMADO DEL VIDEO DEL COLMENA (4 al 9 de sep):')
print('  ⚠️ reconstruido, porque las ventanas se solapan en el 8-sep.')
gasto_acum = 47_078 + 9_522 + 24_000 + 5_243     # 4-6 · 7 · 8 · 9(parcial)
conv_acum  = 25 + 3 + 9
VENTAS = 2
print(f'    Gasto          : ~${gasto_acum:,}')
print(f'    Conversaciones : ~{conv_acum}')
print(f'    Ventas         : {VENTAS}')
print()
for et, mar in (('margen real sin comision', MARGEN_COLM),
                ('margen real con comision 3%', 34_694)):
    res = VENTAS*mar - gasto_acum
    print(f'    {et:<30} ${res:>9,.0f}  {"🔴" if res < 0 else "🟢"}')
print()
cierre_req = (HOY[k][1]/HOY[k][2]) / MARGEN_COLM
print(f'  📐 LA CUENTA QUE DECIDE:')
print(f'     A ${HOY[k][1]/HOY[k][2]:,.0f} por conversacion, el colmena necesita cerrar '
      f'{cierre_req:.1%}')
print(f'     Esta cerrando {VENTAS/conv_acum:.1%} ({VENTAS} de ~{conv_acum})')
print(f'     >>> Le falta {cierre_req/(VENTAS/conv_acum):.1f}x. Y {cierre_req:.1%} es '
      'practicamente el 8,4% del')
print('         tradicional, o sea que le estas pidiendo al producto caro que')
print('         cierre igual que el barato. No va a pasar.')
print()
print('  📋 #85 decia: "veredicto a las ~30 conversaciones (jueves 10 o viernes 11).')
print(f'     Si no cubre el gasto, se apaga. La fecha NO se vuelve a estirar."')
print(f'     >>> Van ~{conv_acum} conversaciones. El gate se cumplio y NO cubre.')
print()
print('  ✅ RECOMENDACION: APAGAR el conjunto del colmena.')
print('     Salvo que hoy haya entrado una TERCERA venta — ahi cambia todo:')
res3 = 3*MARGEN_COLM - gasto_acum
print(f'     con 3 ventas el resultado seria ${res3:,.0f} '
      f'{"🟢 positivo" if res3 > 0 else "🔴"}')
print()
print('  🔑 Y NO ES QUE EL PRODUCTO NO SIRVA. Lo que quedo demostrado en 6 dias')
print('     y ~$86.000 es que NO SE PUEDE COMPRAR TRAFICO PARA EL COLMENA a')
print('     precio de subasta abierta. Su camino es el Paso 2 y 3 de 0-AC:')
print('     el ANGULO ("no te vuelve a pasar") y los QUE YA COMPRARON por')
print('     audiencia personalizada, donde la pauta es casi $0. No mas subasta.')
print()

print(L)
print('7. QUÉ HACER HOY')
print(L)
print('  1. ⛔ NO subir TEST Creativos a $30.000. Cancelado por el dato de hoy.')
print('  2. 🔴 APAGAR el conjunto del colmena (si no entro una 3a venta hoy).')
print(f'     Libera ${HOY["COLMENA · VIDEO"][0]:,}/dia que estan comprando')
print(f'     conversaciones a ${HOY[k][1]/HOY[k][2]:,.0f} contra un equilibrio de ~$2.200.')
print('  3. ⛔ NO tocar Domiciliarios ni el VIDEO. Subieron como toda la')
print('     cuenta, no mas. Y siguen empatados entre si.')
print('  4. 🟢 Valle se queda en $5.000. Funciono.')
print('  5. 📊 MAÑANA, LA MEDICION QUE SI DECIDE: pedir el export de')
print('     4-sep a 10-sep COMPLETO, por conjunto. Una ventana de 7 dias')
print('     cerrada no tiene el sesgo de atribucion y dice si el CPM del +10%')
print('     es tendencia o fue un martes.')
print('  6. 📌 Si se apaga el colmena, la cuenta queda en $145.000/dia.')
print('     NO reasignar esos $20.000 todavia: primero hay que saber si el')
print('     encarecimiento del CPM es estructural.')
