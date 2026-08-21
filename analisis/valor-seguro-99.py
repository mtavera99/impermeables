"""¿CUANTO VALE EL SEGURO ANTIDEVOLUCION DE 99 ENVIOS?

CORRECCION DEL 2026-08-15 (la aporto el dueno, y desarma el analisis anterior).

Lo que se habia concluido mal:
  "99 Envios cobra $20.894 y Heka cobraba $21.000 -> es lo mismo, el ahorro no
   se ve en los datos."
  Eso comparaba precio contra precio, como si el servicio fuera el mismo.

Lo que el dueno senalo:
  En Heka NO se pagaba seguro antidevolucion, y por eso el flete de cada
  devolucion era PERDIDA PURA. En 99 Envios ese seguro SI se esta pagando y
  va incluido en el mismo precio.
  -> No es "el mismo precio por lo mismo". Es EL MISMO PRECIO CON COBERTURA.

Ademas resuelve la ambiguedad que habia quedado abierta: el `valor_seguro_99`
esta DENTRO del `valor_servicio` (lectura (a)), no aparte. Entonces:
  flete puro 99 Envios = $20.894 - $2.848 = $18.046  ->  -14,1% vs Heka
  y encima la cobertura sale gratis contra lo que se pagaba antes.

Este script pone numero a la cobertura y corrige la auditoria de Heka, que
NUNCA le descontó el flete a las 15 devoluciones.
"""
import csv

P_RECHAZO = 0.153        # tasa auditada, seccion 0-G
FLETE_HEKA = 21000       # flete promedio del periodo Heka
N_DEV_HEKA = 15          # devoluciones del periodo Heka (98 guias resueltas)
GANANCIA_HEKA = 1981878  # ganancia central del periodo Heka, seccion 0-G
VENTAS_MES = 300

rows = list(csv.DictReader(open('guias-99envios.csv')))
n = len(rows)
servicio = sum(float(r['valor_servicio']) for r in rows) / n
prima = sum(float(r['valor_seguro_99']) for r in rows) / n
flete_puro = servicio - prima

print('=' * 66)
print('1. LA DESCOMPOSICION CORRECTA DEL PRECIO')
print('=' * 66)
print(f'  Cobro total 99 Envios por guia : ${servicio:,.0f}')
print(f'    - flete puro                 : ${flete_puro:,.0f}')
print(f'    - prima del seguro           : ${prima:,.0f}  ({prima/servicio*100:.1f}%)')
print()
print(f'  Heka: flete                    : ${FLETE_HEKA:,}   (sin cobertura)')
print()
print(f'  FLETE contra FLETE             : ${flete_puro:,.0f} vs ${FLETE_HEKA:,} = '
      f'{flete_puro/FLETE_HEKA*100-100:+.1f}%')
print(f'  PRECIO TOTAL                   : ${servicio:,.0f} vs ${FLETE_HEKA:,} = '
      f'{servicio/FLETE_HEKA*100-100:+.1f}%')
print()
print('  >>> El flete SI es 14% mas barato, como decia el dueno. Lo que pasa es')
print('      que el ahorro se esta gastando en la prima, y queda a precio parejo')
print('      PERO CON EL RIESGO CUBIERTO. Eso no es empatar: es ganar.')

print()
print('=' * 66)
print('2. ¿LA PRIMA SE PAGA SOLA? (punto de equilibrio del seguro)')
print('=' * 66)
print(f'  Prima por guia (siempre se paga)   : ${prima:,.0f}')
print(f'  Probabilidad de devolucion         : {P_RECHAZO*100:.1f}%')
print()
be = prima / (P_RECHAZO * flete_puro)
print(f'  Para empatar, el seguro tiene que reembolsar {be:.2f}x el flete de ida')
print(f'  (o sea ${be*flete_puro:,.0f} por devolucion).')
print()
print('  El archivo madre (seccion 0-E) dice que cubre "flete de ida Y de vuelta"')
print(f'  = 2x el flete = ${2*flete_puro:,.0f} por devolucion.')
print(f'  >>> {2/be:.1f} VECES por encima del punto de equilibrio. La prima se paga sola.')

print()
print('=' * 66)
print('3. CUANTO VALE LA COBERTURA, SEGUN QUE TANTO REEMBOLSE')
print('=' * 66)
print(f'  {"que reembolsa":<28} {"valor esperado":>15} {"neto/guia":>11} {"al mes":>13}')
esc = {}
for et, mult in (('solo el flete de ida', 1.0),
                 ('ida + media vuelta', 1.5),
                 ('ida + vuelta completa', 2.0)):
    ve = P_RECHAZO * flete_puro * mult
    neto = ve - prima
    esc[mult] = neto
    print(f'  {et:<28} ${ve:>14,.0f} ${neto:>10,.0f} ${neto*VENTAS_MES:>12,.0f}')
print()
print('  Lectura: hasta en el peor caso (solo la ida) el seguro sale a la par.')
print('  En el caso que describe el archivo (ida + vuelta) deja '
      f'${esc[2.0]:,.0f} por guia')
print(f'  = ${esc[2.0]*VENTAS_MES:,.0f} al mes a {VENTAS_MES} ventas.')
print('  >>> NO HAY ESCENARIO EN QUE EL SEGURO SALGA MAL. Es asimetrico a favor.')

print()
print('=' * 66)
print('4. LA AUDITORIA DE HEKA ESTABA INCOMPLETA (correccion a la seccion 0-G)')
print('=' * 66)
print('  analizar-final.py le descontó a cada devolucion SOLO el empaque ($1.500)')
print('  y la publicidad. NUNCA le descontó el flete.')
print('  Pero en contraentrega el flete se recupera del cliente al entregar; si el')
print('  cliente NO recibe, no hay recaudo y el flete lo come el vendedor.')
print(f'  Con {N_DEV_HEKA} devoluciones sin seguro, eso es plata que falta en el calculo:')
print()
print(f'  {"escenario":<26} {"flete no contado":>17} {"ganancia Heka real":>20}')
for et, mult in (('solo ida', 1.0), ('ida + media vuelta', 1.5), ('ida + vuelta', 2.0)):
    falta = N_DEV_HEKA * FLETE_HEKA * mult
    print(f'  {et:<26} ${falta:>16,.0f} ${GANANCIA_HEKA-falta:>19,.0f}')
print()
print(f'  Publicada en la seccion 0-G: ${GANANCIA_HEKA:,}')
print(f'  Real, si cubria ida+vuelta : ${GANANCIA_HEKA-N_DEV_HEKA*FLETE_HEKA*2:,} '
      f'({(GANANCIA_HEKA-N_DEV_HEKA*FLETE_HEKA*2)/GANANCIA_HEKA*100-100:+.0f}%)')
print()
print('  >>> DOBLE EFECTO: el periodo Heka gano MENOS de lo que se publico, Y el')
print('      cambio a 99 Envios fue mejor decision de lo que parecia. Las dos')
print('      correcciones apuntan al mismo lado.')

print()
print('=' * 66)
print('5. VEREDICTO SOBRE EL CAMBIO DE TRANSPORTADORA')
print('=' * 66)
print('  ✅ El flete es 14,1% mas barato ($18.046 vs $21.000).')
print('  ✅ La cobertura antidevolucion entra sin subir el precio total.')
print(f'  ✅ Esa cobertura vale entre $0 y ${esc[2.0]:,.0f} por guia segun el alcance real.')
print(f'  ✅ Y tapa un hueco que en Heka costaba ~${N_DEV_HEKA*FLETE_HEKA*2:,} '
      f'cada {N_DEV_HEKA} devoluciones.')
print()
print('  >>> EL CAMBIO A 99 ENVIOS FUE CORRECTO. El analisis anterior de este')
print('      repositorio lo puso en duda por comparar precio con precio en vez')
print('      de comparar precio con (precio + cobertura). Queda corregido.')
print()
print('  ⚠️ LO QUE SIGUE ABIERTO (y ahora es una pregunta mas precisa):')
print('     No "¿el seguro esta incluido?" -> eso ya lo respondio el dueno: SI.')
print('     Sino: ¿QUE REEMBOLSA EXACTAMENTE el Seguro 99?')
print('       (a) solo el flete de ida        -> sale a la par')
print('       (b) ida y vuelta               -> deja ~$800k/mes')
print('       (c) ¿tambien el valor del producto si se pierde o se dana?')
print('     Y aparte sigue faltando: % de comision por recaudo y dias de pago.')
