"""LA DEMANDA REAL POR DIA, CON LA CORRECCION DEL DUENO (2026-08-25)

El dueno corrigio dos cosas de mi analisis anterior, y las dos se confirman con
las HORAS de creacion de las guias:

  1. El LUNES 17 fue FESTIVO en Colombia (Asuncion, corrido al lunes por Ley
     Emiliani). No se pudo despachar. Por eso el lote salio el martes 18.
     -> ese lote cubre 3 dias de venta: sab 15 + dom 16 + lun 17 festivo.

  2. Las 31 guias del lunes 24 son SOLO sabado 22 + domingo 23 (2 dias).
     Las ventas del lunes 24 las guardo para despachar hoy martes 25.

  Y su conclusion: "si comparamos al fin de semana mas reciente logramos las
  mismas guias pero en solo dos dias, o sea funciono". <- hay que verificarlo.

LA EVIDENCIA QUE LO CONFIRMA (horas locales de creacion):
  lun 17 festivo : 9 guias, TODAS a las 23h        <- arranca el lote
  mar 18         : 20 guias a las 0h-1h            <- MISMO lote, cruza medianoche
                 + 12 guias a las 14h-15h          <- el dia normal del martes
  lun 24         : 31 guias, TODAS a la 1h         <- un solo lote

  -> El lote del finde festivo son 9+20 = 29 guias, NO 32. Las 12 de la tarde
     del martes 18 son demanda del martes, no del fin de semana.
     Mi conteo anterior de "32 vs 31" mezclaba las dos cosas.

DATO DE HOY (reportado por el dueno, martes 25):
  8 guias para despachar (= las ventas del lunes 24), de las cuales 3 son DOBLES.
"""
import statistics

# ------------------------------------------------------------------ DATOS
# Lotes de fin de semana, separados por las horas de creacion
LOTE_FINDE_FESTIVO = 9 + 20      # sab 15 + dom 16 + lun 17 festivo -> 3 dias
DIAS_FESTIVO = 3
LOTE_FINDE_NORMAL = 31           # sab 22 + dom 23 -> 2 dias
DIAS_NORMAL = 2

# Dias habiles con su propia demanda (ya limpios de lote de finde)
HABILES = {
    'mar 18': 12,   # las de 14h-15h, no las de 0h-1h
    'mie 19': 8,
    'jue 20': 16,
    'vie 21': 10,
    'lun 24': 8,    # las que despacha HOY, reportadas por el dueno
}

HOY_GUIAS = 8
HOY_DOBLES = 3
SHARE_2UDS_BASE = 0.268   # seccion 0-V

print('=' * 74)
print('1. ¿"FUNCIONO"? LOS DOS FINDES, POR DIA DE VENTA')
print('=' * 74)
r_fest = LOTE_FINDE_FESTIVO / DIAS_FESTIVO
r_norm = LOTE_FINDE_NORMAL / DIAS_NORMAL
print(f'  Finde 15-17 (sab+dom+lun festivo) : {LOTE_FINDE_FESTIVO} guias / {DIAS_FESTIVO} dias = {r_fest:5.1f} guias/dia')
print(f'  Finde 22-23 (sab+dom)             : {LOTE_FINDE_NORMAL} guias / {DIAS_NORMAL} dias = {r_norm:5.1f} guias/dia')
print()
mej = (r_norm / r_fest - 1) * 100
print(f'  → MEJORA REAL: {mej:+.0f}% por dia de venta.')
print()
print('  ✅ EL DUENO TIENE RAZON, y de hecho se queda corto: el dijo "las mismas')
print(f'     guias en 2 dias en vez de 3" (seria +50%). Separando el lote por horas')
print(f'     el finde festivo fueron 29, no 32, asi que la mejora es {mej:+.0f}%.')
print()
print('  ⚠️ UNA SALVEDAD HONESTA: las ventas del viernes despues de las 17h caen')
print('     en el lote del lunes (el viernes 21 despacho a las 17h). Eso puede')
print('     inflar algo el lado del "finde". La direccion es solida, el tamano no.')

print()
print('=' * 74)
print('2. ¿LAS 8 DE HOY SON UNA CAIDA?')
print('=' * 74)
serie = list(HABILES.values())
media = statistics.mean(serie)
desv = statistics.stdev(serie)
print('  Dias habiles limpios (solo su propia demanda):')
for k, v in HABILES.items():
    print(f'    {k}  {v:2d} {"#" * v}')
print()
print(f'  Promedio habil : {media:.1f} guias/dia')
print(f'  Desviacion     : {desv:.1f}')
z = (HOY_GUIAS - media) / desv
print()
print(f'  Las {HOY_GUIAS} de hoy estan a {z:+.2f} desviaciones del promedio.')
print(f'  El miercoles 19 tambien dio {HABILES["mie 19"]}. Es el mismo nivel.')
print()
if abs(z) < 1.5:
    print('  ✅ NO ES UNA CAIDA. Es un dia habil normal.')
print(f'  Solo seria alarma si baja de {max(0, media - 2*desv):.0f} guias.')

print()
print('=' * 74)
print('3. EL FINDE VENDE MAS QUE EL DIA HABIL (hallazgo nuevo)')
print('=' * 74)
print(f'  Fin de semana : {r_norm:5.1f} guias/dia')
print(f'  Dia habil     : {media:5.1f} guias/dia')
print(f'  → El finde rinde {(r_norm/media - 1)*100:+.0f}% mas por dia.')
print()
print('  📌 IMPLICACION: el presupuesto es plano toda la semana, pero la demanda')
print('     no. Subir el finde y bajar el habil NO es "subir presupuesto" (que ya')
print('     se descarto por elasticidad 0,63): es MOVER el mismo dinero a donde')
print('     rinde mas. Es gratis.')
print('     ⚠️ Pero primero hay que confirmarlo con el desglose diario de Meta del')
print('        lunes 31. Con 2 findes medidos no alcanza para mover plata.')

print()
print('=' * 74)
print('4. EL CONFUSOR DEL GUION: ¿SE CAYO EL SHARE DE 2 UNIDADES?')
print('=' * 74)
share = HOY_DOBLES / HOY_GUIAS
uds = HOY_GUIAS + HOY_DOBLES
print(f'  Hoy: {HOY_GUIAS} pedidos, {HOY_DOBLES} dobles → {uds} unidades ({uds/HOY_GUIAS:.2f} uds/pedido)')
print(f'  Share de 2 uds hoy   : {share*100:.1f}%')
print(f'  Share de 2 uds antes : {SHARE_2UDS_BASE*100:.1f}%  (seccion 0-V)')
print()
# Wilson 95%
z95 = 1.96
n = HOY_GUIAS
p = share
den = 1 + z95**2 / n
centro = (p + z95**2 / (2*n)) / den
margen = z95 * ((p*(1-p)/n + z95**2/(4*n**2)) ** 0.5) / den
lo, hi = max(0, centro - margen), min(1, centro + margen)
print(f'  Intervalo de confianza 95% (Wilson, n={n}): {lo*100:.0f}% a {hi*100:.0f}%')
print()
if lo <= SHARE_2UDS_BASE <= hi:
    print(f'  ⚠️ El {SHARE_2UDS_BASE*100:.1f}% de antes CAE DENTRO del intervalo.')
    print('     Entonces con 8 pedidos NO se puede concluir que mejoro.')
    print('     Pero SI se puede decir algo util:')
    print('     ✅ NO hay ninguna señal de que el guion nuevo haya dañado la promo de 2.')
    print('        Era el riesgo que se levanto ayer, y de momento no aparece.')
print()
print(f'  Para decidir de verdad hacen falta ~{round(SHARE_2UDS_BASE*(1-SHARE_2UDS_BASE)*(z95/0.10)**2)} pedidos')
print('  (para un margen de +/-10 puntos). O sea: la lectura del lunes 31.')

print()
print('=' * 74)
print('5. UN DESCUADRE QUE HAY QUE ARREGLAR EL LUNES')
print('=' * 74)
print('  El CPA de $7.167 salio de $293.831 / 41 guias, pero los dos lados no')
print('  cubren el mismo periodo:')
print('   - el export de Meta 21-24 ago trae $346.176 gastados, no $293.831')
print('     ($346.176 / $105.000 de presupuesto diario = 3,3 dias)')
print('   - y las 41 guias eran 10 del viernes 21 + 31 del lote sab+dom')
print('     → la demanda del viernes esta contada, pero el gasto del viernes no')
print('       necesariamente, y la del lunes 24 (las 8 de hoy) NO esta contada')
print()
print('  📌 NO se recalcula a ciegas. Se arregla el lunes 31 con el desglose')
print('     POR DIA, casando cada dia de gasto con su dia de venta (y metiendo')
print('     el lote de finde en los dias que le corresponden).')
print('     El CPA de $7.167 queda como PROVISIONAL, no como confirmado.')
