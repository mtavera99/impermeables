#!/usr/bin/env python3
"""
EXPORT DE META POR CAMPANA · 4 al 7 de septiembre 2026
======================================================
Export a nivel CAMPANA (2 filas). Trae dos columnas nuevas que no se habian
tenido nunca: ALCANCE y "Nuevos contactos de mensajes".

El 7-sep se obtiene por RESTA contra la ventana 4-6 sep ya documentada en 0-AD.
⚠️ El 7-sep esta INCOMPLETO: el export se saco ~5:30 pm de Bogota.
"""

L = '=' * 70

# ---------- EXPORT 4-7 SEP (4 dias) ----------
VIEJA = dict(nombre='Impermeables · Prospeccion Motociclistas',
             gasto=491_253, conv=719, impresiones=137_176, alcance=96_327,
             contactos=747, nuevos=673)
COLMENA = dict(nombre='Colmena Premium · Prospeccion',
               gasto=100_229, conv=41, impresiones=18_502, alcance=13_525,
               contactos=43, nuevos=37)

# ---------- VENTANA 4-6 SEP YA DOCUMENTADA (0-AD) ----------
VIEJA_46_GASTO   = 105_152 + 145_282 + 154_004   # $404.438
VIEJA_46_CONV    = 593
COLMENA_46_GASTO = 90_707
COLMENA_46_CONV  = 38

# desglose interno del colmena 4-6 (0-AD)
VIDEO_46_GASTO   = 47_078
VIDEO_46_CONV    = 25
EST_46_GASTO     = 43_629
EST_46_CONV      = 13

MARGEN_COLMENA   = 43_306   # bruto por pedido antes de pauta (0-AC)
VENTAS_COLMENA   = 2        # 1 en la ventana 4-6, 1 el 7-sep

print(L)
print('1. LA CUENTA COMPLETA DE LOS 4 DIAS')
print(L)
tot_gasto = VIEJA['gasto'] + COLMENA['gasto']
tot_conv  = VIEJA['conv'] + COLMENA['conv']
print(f'  {"Campana":<34} {"Gasto":>10} {"Conv":>6} {"$/conv":>9}')
for c in (VIEJA, COLMENA):
    print(f'  {c["nombre"][:34]:<34} {c["gasto"]:>10,} {c["conv"]:>6} '
          f'{c["gasto"]/c["conv"]:>9,.0f}')
print(f'  {"CUENTA COMPLETA":<34} {tot_gasto:>10,} {tot_conv:>6} '
      f'{tot_gasto/tot_conv:>9,.0f}')
print()
print(f'  El colmena es el {COLMENA["gasto"]/tot_gasto*100:.0f}% del gasto '
      f'y el {COLMENA["conv"]/tot_conv*100:.0f}% de las conversaciones.')
print()

print(L)
print('2. EL 7-SEP SOLO (por resta) — OJO: DIA INCOMPLETO')
print(L)
vieja_7_gasto = VIEJA['gasto'] - VIEJA_46_GASTO
vieja_7_conv  = VIEJA['conv']  - VIEJA_46_CONV
col_7_gasto   = COLMENA['gasto'] - COLMENA_46_GASTO
col_7_conv    = COLMENA['conv']  - COLMENA_46_CONV

print(f'  {"":<24} {"Gasto":>10} {"Conv":>6} {"$/conv":>9}')
print(f'  {"CAMPANA VIEJA":<24} {vieja_7_gasto:>10,} {vieja_7_conv:>6} '
      f'{vieja_7_gasto/vieja_7_conv:>9,.0f}')
print(f'  {"  vs 4-6 sep":<24} {VIEJA_46_GASTO:>10,} {VIEJA_46_CONV:>6} '
      f'{VIEJA_46_GASTO/VIEJA_46_CONV:>9,.0f}')
delta = (vieja_7_gasto/vieja_7_conv) / (VIEJA_46_GASTO/VIEJA_46_CONV) - 1
print(f'  {"  cambio":<24} {"":>10} {"":>6} {delta*100:>8.1f}%')
print()
print(f'  {"COLMENA (solo video)":<24} {col_7_gasto:>10,} {col_7_conv:>6} '
      f'{col_7_gasto/col_7_conv:>9,.0f}')
print(f'  {"  vs video 4-6 sep":<24} {VIDEO_46_GASTO:>10,} {VIDEO_46_CONV:>6} '
      f'{VIDEO_46_GASTO/VIDEO_46_CONV:>9,.0f}')
print()
print('  🔑 LA CAMPANA VIEJA NO SE MOVIO. 126 conversaciones en un lunes')
print('     parcial al mismo costo que el fin de semana. Es la 4a lectura')
print('     seguida en la banda $673-$689 con n=719. Eso ya no es ruido.')
print()
print(f'  ⚠️  El colmena hoy: {col_7_conv} conversaciones con n={col_7_conv}. '
      'NO se puede leer.')
print(f'      Gasto de ${col_7_gasto:,} sobre $20.000 de presupuesto = '
      f'{col_7_gasto/20_000*100:.0f}% a las 5:30 pm.')
print()

print(L)
print('3. EL ALCANCE: LA ALARMA TEMPRANA DE 0-AC **NO** ESTA SONANDO')
print(L)
print('  El protocolo dice: si sube el presupuesto y el ALCANCE no crece,')
print('  se esta pagando por mostrarle el anuncio otra vez a la misma gente.')
print()
print(f'  {"":<24} {"Impresiones":>12} {"Alcance":>10} {"Frecuencia":>11} {"CPM":>9}')
for c in (VIEJA, COLMENA):
    frec = c['impresiones'] / c['alcance']
    cpm  = c['gasto'] / c['impresiones'] * 1000
    print(f'  {c["nombre"][:24]:<24} {c["impresiones"]:>12,} {c["alcance"]:>10,} '
          f'{frec:>11.2f} {cpm:>9,.0f}')
print()
frec_vieja = VIEJA['impresiones'] / VIEJA['alcance']
print(f'  🟢 Frecuencia {frec_vieja:.2f} en 4 dias con '
      f'{VIEJA["alcance"]:,} personas alcanzadas.')
print('     Historicamente 1,31-1,42 = SIN desgaste de audiencia.')
print('     >>> Lo del VIDEO no es saturacion de publico. Es el creativo.')
print()
cpm_v = VIEJA['gasto'] / VIEJA['impresiones'] * 1000
cpm_c = COLMENA['gasto'] / COLMENA['impresiones'] * 1000
print(f'  🔔 CPM del colmena ${cpm_c:,.0f} contra ${cpm_v:,.0f} de la vieja '
      f'= +{(cpm_c/cpm_v-1)*100:.0f}%.')
print(f'     Venia de $7.439 cuando estaba dentro de la campana vieja,')
print(f'     bajo a $5.225 al mudarse, y ahora esta en ${cpm_c:,.0f}.')
print('     Sacarlo de la campana vieja funciono, pero sigue pagando prima')
print('     de campana chica y nueva.')
print()

print(L)
print('4. COLUMNA NUEVA: CUANTOS SON GENTE NUEVA')
print(L)
print(f'  {"":<24} {"Contactos":>10} {"Nuevos":>8} {"Repetidos":>10} {"% nuevo":>9}')
for c in (VIEJA, COLMENA):
    rep = c['contactos'] - c['nuevos']
    print(f'  {c["nombre"][:24]:<24} {c["contactos"]:>10,} {c["nuevos"]:>8,} '
          f'{rep:>10,} {c["nuevos"]/c["contactos"]*100:>8.0f}%')
print()
rep_vieja = VIEJA['contactos'] - VIEJA['nuevos']
print(f'  🆕 {rep_vieja} personas de la campana vieja YA habian escrito antes '
      'y volvieron.')
print('     Es la primera vez que se puede ver ese numero.')
print('     >>> Es evidencia directa para el pendiente #77 (audiencia')
print('         personalizada con los que ya compraron): la gente SI vuelve.')
print()
print('  ⚠️  Y ojo con el desfase: "Contactos de mensajes totales" (747) no es')
print('      igual a "Resultados" (719). Son 28 de diferencia = 3,9%.')
print('      Para decidir usar SIEMPRE la misma columna. Aca se usa Resultados,')
print('      que es la que se ha usado todo el proyecto.')
print()

print(L)
print('5. EL VEREDICTO DEL COLMENA (#85) — EL GATE YA SE ALCANZO')
print(L)
print(f'  El gate era ~30 conversaciones. Van {COLMENA["conv"]}. '
      'La decision es HOY, no el jueves.')
print()
margen_total = VENTAS_COLMENA * MARGEN_COLMENA
res_campana  = margen_total - COLMENA['gasto']
print(f'  CAMPANA COMPLETA (video + estatico)')
print(f'    Gasto                : ${COLMENA["gasto"]:>9,}')
print(f'    {VENTAS_COLMENA} ventas x ${MARGEN_COLMENA:,}    : ${margen_total:>9,}')
print(f'    RESULTADO            : ${res_campana:>9,}')
cierre = VENTAS_COLMENA / COLMENA['conv']
equil  = (COLMENA['gasto']/COLMENA['conv']) / MARGEN_COLMENA
print(f'    Cierre {cierre*100:.1f}% contra {equil*100:.1f}% de equilibrio '
      f'({cierre/equil*100:.0f}% del umbral)')
print()

video_gasto = VIDEO_46_GASTO + col_7_gasto
video_conv  = VIDEO_46_CONV + col_7_conv
res_video   = margen_total - video_gasto
print(f'  SOLO EL VIDEO (lo unico que sigue vivo)')
print(f'    Gasto 4-6 + hoy      : ${video_gasto:>9,}  ({video_conv} conv, '
      f'${video_gasto/video_conv:,.0f}/conv)')
print(f'    {VENTAS_COLMENA} ventas             : ${margen_total:>9,}')
print(f'    RESULTADO            : ${res_video:>9,}  '
      f'{"🟢 POSITIVO" if res_video > 0 else "🔴"}')
c_v = VENTAS_COLMENA / video_conv
e_v = (video_gasto/video_conv) / MARGEN_COLMENA
print(f'    Cierre {c_v*100:.1f}% contra {e_v*100:.1f}% de equilibrio')
print()
res_est = 0 - EST_46_GASTO
print(f'  SOLO EL ESTATICO (apagado el 7-sep)')
print(f'    Gasto                : ${EST_46_GASTO:>9,}  ({EST_46_CONV} conv)')
print(f'    0 ventas             : ${0:>9,}')
print(f'    RESULTADO            : ${res_est:>9,}  🔴')
print()
print(f'  Suma de control: ${res_video:,} + ${res_est:,} = '
      f'${res_video + res_est:,} = ${res_campana:,} ✓')
print()
print('  🔑 LA CAMPANA PIERDE, EL CONJUNTO QUE QUEDA VIVO GANA.')
print('     Apagar el estatico no fue una correccion menor: era TODA la perdida.')
print()
print('  ⚠️  CAVEAT QUE NO SE PUEDE IGNORAR: son 2 ventas. Con n=2 el intervalo')
print('      de confianza del cierre va de ~1% a ~24%. El signo es alentador,')
print('      la magnitud no se puede afirmar. Y de las 28 conversaciones del')
print('      video, 25 corrieron con la IA que pedia CEDULA.')
print()

print(L)
print('6. LO QUE ESTE EXPORT **NO** PUEDE RESPONDER')
print(L)
print('  ❌ Si el VIDEO de Domiciliarios sigue deteriorandose. Vino a nivel')
print('     CAMPANA (2 filas), asi que Domiciliarios, VIDEO, TEST Creativos,')
print('     Motorizados y Valle estan sumados en una sola linea.')
print('     >>> Para eso hace falta el export desde la pestana "CONJUNTOS DE')
print('         ANUNCIOS" x DIA, sin desglose por region (pendientes #45 y 0-AD).')
print()
print('  ❌ El CPA por pedido. Falta el conteo de pedidos del 4 al 7.')
print('     La columna "Compras" viene VACIA porque no hay pixel ni API de')
print('     conversiones: todas las ventas se cierran a mano en WhatsApp.')
print()
print('  ❌ De cual campana salio el pedido al mayor de 12 unidades.')
print()
print(L)
print('7. QUE HACER')
print(L)
print('  1. COLMENA: dejar el video corriendo en $20.000. Paso el gate y da')
print(f'     ${res_video:,} positivos. NO apagar la campana.')
print('  2. Manana martes 8 con dia completo: leer el video del colmena de nuevo.')
print('     Hoy marco $3.174/conv con n=3 — si eso se sostiene 2 dias, el')
print('     equilibrio sube a ~7,3% y el 7,1% actual ya no alcanza.')
print('  3. NO tocar la campana vieja. Cuarta lectura seguida en $673-$689.')
print('  4. Pedir el export por CONJUNTO x DIA para decidir el VIDEO.')
print('  5. Alcance 1,42: la audiencia NO esta quemada. Si algun dia se escala,')
print('     el freno no va a ser saturacion de publico.')
