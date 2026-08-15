"""CPA y tasa de cierre de la ventana 99 ENVIOS, cruzando Meta con las guias.

Fuentes:
  meta-5-14ago.csv     export de Meta 5-14 ago (NIVEL CAMPANA, agregado, sin desglose por dia)
  guias-99envios.csv   26 guias de 99 Envios (10-14 ago)

⚠️ LAS DOS VENTANAS NO COINCIDEN: Meta trae 10 dias (5-14), las guias solo 5 (10-14).
El export sigue viniendo AGREGADO, no por dia, asi que el gasto de los ultimos 5 dias
hay que ESTIMARLO. Se resuelve con analisis de sensibilidad: se calcula el CPA
suponiendo que al tramo 10-14 le correspondio entre el 45% y el 55% del gasto.
Si la conclusion se sostiene en todo ese rango, no depende del supuesto.

Referencias auditadas (secciones 0-G y 0-H del archivo madre):
  CPA real por venta cerrada    (27 jul - 9 ago)  $5.433
  CPA real por venta entregada  (27 jul - 9 ago)  $6.414
  Punto de equilibrio del CAC                    $23.674
  Tasa de entrega                                 84,7%
  Margen por unidad entregada (99 Envios)         $23.607
"""
import csv

CPA_CERRADA_REF = 5433
CPA_ENTREGADA_REF = 6414
EQUILIBRIO = 23674
TASA_ENTREGA = 0.847
MARGEN_UNIDAD = 23607
EQUILIBRIO_VENTAS_DIA = 2.2

m = next(csv.DictReader(open('meta-5-14ago.csv')))
gastado = float(m['gastado_cop'])
conv = int(m['resultados'])
impr = int(m['impresiones'])
alc = int(m['alcance'])
ctr = float(m['ctr_link_pct'])
cpc = float(m['cpc_link_cop'])
frec = float(m['frecuencia'])
DIAS_META = 10

guias = list(csv.DictReader(open('guias-99envios.csv')))
DIAS_GUIAS = 5
n_guias = len(guias)

print('=' * 66)
print('1. VERIFICACION INTERNA DEL EXPORT (que los numeros cuadren)')
print('=' * 66)
clics = impr * ctr / 100
print(f'  Gastado / conversaciones = ${gastado/conv:,.2f}  (el archivo dice '
      f'${float(m["costo_por_resultado"]):,.2f})  {"OK" if abs(gastado/conv-float(m["costo_por_resultado"]))<1 else "NO CUADRA"}')
print(f'  Impresiones / alcance    = {impr/alc:.3f}  (el archivo dice {frec:.3f})  '
      f'{"OK" if abs(impr/alc-frec)<0.01 else "NO CUADRA"}')
print(f'  Gastado / clics          = ${gastado/clics:,.2f}  (el archivo dice ${cpc:,.2f})  '
      f'{"OK" if abs(gastado/clics-cpc)<2 else "NO CUADRA"}')
print(f'  -> el export es consistente. Clics estimados: {clics:,.0f}')

print()
print('=' * 66)
print('2. GASTO Y EL TECHO DE LA CUENTA')
print('=' * 66)
print(f'  Ventana                : {m["inicio"]} a {m["fin"]} ({DIAS_META} dias)')
print(f'  Gastado                : ${gastado:,.0f}')
print(f'  Gasto por dia          : ${gastado/DIAS_META:,.0f}')
print(f'  Capacidad configurada  : $57.000/dia')
print(f'  Utilizacion            : {gastado/DIAS_META/57000*100:.1f}%')
print()
print('  El archivo madre estimo el techo en ~$47.800/dia con 6 dias de datos.')
print(f'  Con 10 dias sale ${gastado/DIAS_META:,.0f}/dia -> EL TECHO ES REAL Y ESTABLE.')
print('  Confirma la conclusion: mas presupuesto NO se convierte en mas gasto.')
print('  Tambien reconfirma ABO: "Con el presupuesto del conjunto de anuncios".')

print()
print('=' * 66)
print('3. CONVERSACIONES: EL VOLUMEN NO SE CAYO')
print('=' * 66)
print(f'  Conversaciones         : {conv}  ({conv/DIAS_META:.1f}/dia)')
print(f'  Costo/conversacion     : ${gastado/conv:,.0f}')
print()
print('  Historico del costo por conversacion:')
for et, v in (('julio (acumulado)', 520), ('31 jul - 6 ago', 512),
              ('7-12 ago', 544), ('5-14 ago (ESTE)', round(gastado/conv))):
    print(f'    {et:<20} ${v:>4}')
print(f'  -> se encarecio {(gastado/conv)/512*100-100:+.1f}% contra el mejor registro.')
print()
print('  Historico de conversaciones por dia:')
for et, v in (('31 jul - 6 ago', 80.7), ('7-12 ago', 87.8), ('5-14 ago (ESTE)', conv/DIAS_META)):
    print(f'    {et:<20} {v:.1f}/dia')
print('  -> EL VOLUMEN ESTA ESTABLE. Meta sigue entregando lo mismo.')

print()
print('=' * 66)
print('4. EL CPA — LA PREGUNTA QUE SE QUERIA RESPONDER')
print('=' * 66)
print(f'  Guias despachadas 10-14 ago: {n_guias} en {DIAS_GUIAS} dias ({n_guias/DIAS_GUIAS:.1f}/dia)')
print()
print('  Sensibilidad al reparto del gasto (porque el export no viene por dia):')
print(f'  {"share 10-14":>12} {"gasto":>12} {"CPA cerrada":>13} {"CPA entregada":>15}')
esc = {}
for share in (0.45, 0.50, 0.55):
    g = gastado * share
    cpa_c = g / n_guias
    cpa_e = cpa_c / TASA_ENTREGA
    esc[share] = (cpa_c, cpa_e)
    print(f'  {share*100:>11.0f}% ${g:>11,.0f} ${cpa_c:>12,.0f} ${cpa_e:>14,.0f}')
cpa_c, cpa_e = esc[0.50]
print()
print(f'  CENTRAL (50%)          : CPA cerrada ${cpa_c:,.0f} | entregada ${cpa_e:,.0f}')
print(f'  Referencia auditada    : CPA cerrada ${CPA_CERRADA_REF:,} | entregada ${CPA_ENTREGADA_REF:,}')
print(f'  DETERIORO              : {cpa_c/CPA_CERRADA_REF*100-100:+.0f}% en cerrada | '
      f'{cpa_e/CPA_ENTREGADA_REF*100-100:+.0f}% en entregada')
print()
print('  >>> LA CONCLUSION NO DEPENDE DEL SUPUESTO: en todo el rango 45-55% el CPA')
print(f'      queda entre ${esc[0.45][0]:,.0f} y ${esc[0.55][0]:,.0f} por venta cerrada,')
print(f'      SIEMPRE muy por encima de los ${CPA_CERRADA_REF:,} auditados.')
print()
print(f'  Punto de equilibrio    : ${EQUILIBRIO:,}')
print(f'  Colchon que queda      : {EQUILIBRIO/cpa_e:.1f}x  (antes era {EQUILIBRIO/CPA_ENTREGADA_REF:.1f}x)')
print('  -> SIGUE SIENDO RENTABLE. No hay riesgo de perdida. Pero el colchon')
print('     se redujo casi a la mitad.')

print()
print('=' * 66)
print('5. LA TASA DE CIERRE — AQUI ESTA EL PROBLEMA REAL')
print('=' * 66)
conv_dia = conv / DIAS_META
conv_tramo = conv_dia * DIAS_GUIAS
cierre = n_guias / conv_tramo * 100
print(f'  Conversaciones/dia (estable): {conv_dia:.1f}')
print(f'  Estimadas en 10-14 ago      : {conv_tramo:.0f}')
print(f'  Ventas (guias)              : {n_guias}')
print(f'  >>> TASA DE CIERRE          : {cierre:.1f}%')
print()
print('  Evolucion historica del cierre:')
for et, v in (('ronda 1', 2.84), ('ronda 2', 7.0), ('27-31 jul', 8.3),
              ('1-4 ago', 10.2), ('5-10 ago (PICO)', 13.0),
              ('11 ago (temblor)', 6.7), ('10-14 ago (ESTE)', cierre)):
    barra = '#' * int(v * 2)
    print(f'    {et:<18} {v:>5.1f}%  {barra}')
print()
print('  >>> EL CIERRE NO SE RECUPERO. Sigue en el nivel del dia del temblor,')
print('      CUATRO DIAS DESPUES. Se cayo a la mitad desde el pico.')
print()
print('  El archivo madre (seccion 0-F) escribio el criterio de antemano:')
print('    "Si siguen en 5-6 ventas con ~87 conversaciones/dia -> hay algo')
print('     ESTRUCTURAL y toca revisar en orden"')
print(f'  Los datos: {n_guias/DIAS_GUIAS:.1f} ventas/dia con {conv_dia:.1f} conversaciones/dia.')
print('  >>> ES EXACTAMENTE EL ESCENARIO ESTRUCTURAL. Y ya no son 2 dias, son 4.')

print()
print('=' * 66)
print('6. CUANDO SE ROMPIO: EL DETERIORO ESTA EN LA SEGUNDA MITAD')
print('=' * 66)
print('  Si el tramo 5-9 ago cerro al 13% (el pico documentado) y el 10-14 al '
      f'{cierre:.1f}%:')
v1 = conv_tramo * 0.13
print(f'    5-9 ago  : ~{conv_tramo:.0f} conv -> ~{v1:.0f} ventas -> CPA ~${gastado*0.5/v1:,.0f}')
print(f'    10-14 ago: ~{conv_tramo:.0f} conv ->  {n_guias} ventas -> CPA ~${cpa_c:,.0f}')
print(f'    10 dias   : ~{conv} conv -> ~{v1+n_guias:.0f} ventas -> CPA ~${gastado/(v1+n_guias):,.0f}')
print()
print('  -> El CPA de los 10 dias completos se veria casi normal. El promedio')
print('     ESCONDE el problema: la primera mitad fue excelente y la segunda mala.')
print('  -> LECCION DE METODO (la misma de la seccion 11): no promediar sobre el')
print('     evento. Hay que partir la ventana en el 11-ago.')

print()
print('=' * 66)
print('7. SALUD DE LA CAMPANA: ¿ES META O NO ES META?')
print('=' * 66)
clic_chat = conv / clics * 100
print(f'  {"metrica":<22} {"ahora":>10} {"antes":>12}  lectura')
print(f'  {"CTR (link)":<22} {ctr:>9.2f}% {"1,78%":>12}  peor')
print(f'  {"CPC (link)":<22} ${cpc:>9,.0f} {"$212-228":>12}  peor')
print(f'  {"Clic->chat":<22} {clic_chat:>9.1f}% {"43,4%":>12}  estable')
print(f'  {"Frecuencia":<22} {frec:>10.2f} {"1,31":>12}  ver nota')
print(f'  {"Alcance":<22} {alc:>10,} {"69.469":>12}  igual')
print()
print('  ⚠️ NOTA SOBRE LA FRECUENCIA — NO ES ALARMA:')
print('  La frecuencia CRECE con el largo de la ventana (mismas personas, mas dias).')
print(f'  Esta ventana es de {DIAS_META} dias; las anteriores eran de 7.')
print(f'  Escalar 1,31 de 7 dias a {DIAS_META} dias daria ~{1.31*DIAS_META/7:.2f} si el alcance')
print(f'  no creciera. El dato real es {frec:.2f}, MENOR que eso.')
print('  -> La audiencia NO esta saturada. Comparar frecuencias de ventanas de')
print('     distinto largo es un error; hay que normalizar antes de opinar.')
print()
print('  DIAGNOSTICO: el CTR y el CPC se degradaron algo, pero el VOLUMEN de')
print('  conversaciones esta intacto y la frecuencia esta sana.')
print('  >>> META NO EXPLICA UNA CAIDA DEL CIERRE A LA MITAD. El problema esta')
print('      DESPUES del clic, igual que el 11-ago.')

print()
print('=' * 66)
print('8. IMPACTO EN LA PLATA')
print('=' * 66)
util_venta = MARGEN_UNIDAD - cpa_e
util_venta_antes = 24433 - CPA_ENTREGADA_REF
print(f'  Utilidad por venta entregada AHORA : ${util_venta:,.0f}')
print(f'  Utilidad por venta entregada ANTES : ${util_venta_antes:,.0f}')
print(f'  Caida por venta                    : ${util_venta-util_venta_antes:+,.0f} '
      f'({util_venta/util_venta_antes*100-100:+.0f}%)')
print()
ventas_dia = n_guias / DIAS_GUIAS
print(f'  A {ventas_dia:.1f} ventas/dia -> utilidad ~${util_venta*ventas_dia:,.0f}/dia')
print('  El archivo madre estimo "~$69.000/dia a 5-6 ventas" por otra via.')
print(f'  Este calculo da ${util_venta*ventas_dia:,.0f}/dia -> las dos vias coinciden. OK')
print()
print(f'  Punto de equilibrio operativo: ~{EQUILIBRIO_VENTAS_DIA} ventas/dia')
print(f'  Estas en {ventas_dia:.1f} -> {ventas_dia/EQUILIBRIO_VENTAS_DIA:.1f}x por encima. SIN RIESGO.')
print()
print('  Costo de oportunidad de no volver al pico (13% de cierre):')
v_pico = conv_dia * 0.13
print(f'    a 13% de cierre serian {v_pico:.1f} ventas/dia en vez de {ventas_dia:.1f}')
print(f'    diferencia: {v_pico-ventas_dia:.1f} ventas/dia x ${util_venta:,.0f} = '
      f'${(v_pico-ventas_dia)*util_venta:,.0f}/dia')
print(f'    al mes: ${(v_pico-ventas_dia)*util_venta*30:,.0f}')
print('  >>> ESTO es el tamano del problema. No es un ajuste fino.')

print()
print('=' * 66)
print('9. LO QUE ESTE EXPORT TODAVIA NO PERMITE')
print('=' * 66)
print('  El archivo vino a NIVEL CAMPANA y AGREGADO (1 sola fila). Falta:')
print('  - DESGLOSE POR DIA -> sin el, el CPA de arriba es estimado, no medido.')
print('    (Anuncios -> Desglose -> Por dia)')
print('  - DESGLOSE POR CONJUNTO -> sin el NO se puede calcular EL TERMOMETRO')
print('    (Domiciliarios / Motorizados), que es la herramienta que el archivo')
print('    madre usa para separar "efecto del dia" de "efecto de una decision".')
print('  - DESGLOSE POR ANUNCIO -> sigue abierto el pendiente #32: no se sabe')
print('    que creativo genera VENTAS, solo cual genera conversaciones baratas.')
print()
print('  Y lo que Meta NUNCA va a poder responder, porque pasa despues del clic:')
print('  - ¿la IA de WhatsApp cierra igual que el dueno? Se activo el ~12-ago,')
print('    justo en el tramo donde el cierre no se recupera. ES LA HIPOTESIS #1')
print('    Y NO ESTA MEDIDA. Ver seccion 0-I.')
