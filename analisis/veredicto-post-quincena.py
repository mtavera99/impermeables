"""VEREDICTO POST-QUINCENA — ventana 14-19 ago vs 10-14 ago

Cruza el export de Meta del 14-19 ago con las ventas para resolver el criterio
que se fijo POR ESCRITO ANTES de ver los datos (seccion 0-I / 0-K):

    cierre rebota a 10-13%  -> era el CICLO DE PAGO
    cierre sigue en ~6%     -> pasar a clima y horas de venta del dueño
    y el discriminador: si rebota Y los vacios bajan -> era la MEZCLA (hip. E)

VENTAS: cuando lleguen, poner el numero en VENTAS y correr de nuevo.
        Mientras esta en None, imprime la tabla de decision completa.
"""

VENTAS = None          # <-- guias despachadas del 15 al 18 (o 14-19)

# --- export Meta 14-19 ago ---
GASTO, CONV = 281820, 528
CTR, CPC, FREC = 1.844606, 237.222222, 1.545906
IMPR, ALC = 64404, 41661

# --- ventana anterior (10-14 ago, el valle) ---
V_GASTO_DIA, V_CONV_DIA = 48585, 84.9
V_VENTAS, V_DIAS = 26, 5
V_COSTO_CONV, V_CTR, V_CPC = 572, 1.625348, 245.63
V_CLICCHAT = 42.9

VACIAS_14AGO = 0.578   # medido: 52 de 90
CIERRE_PICO = 0.13
MARGEN, CPA_EQUILIBRIO = 24433, 23674

clics = IMPR * CTR / 100
clicchat = CONV / clics * 100

print('=' * 70)
print('1. VERIFICACION DEL EXPORT')
print('=' * 70)
print(f'  Gastado/conversaciones = ${GASTO/CONV:,.2f}  (archivo: $533.75)  '
      f'{"OK" if abs(GASTO/CONV-533.75)<1 else "NO"}')
print(f'  Impresiones/alcance    = {IMPR/ALC:.3f}  (archivo: {FREC:.3f})  '
      f'{"OK" if abs(IMPR/ALC-FREC)<0.01 else "NO"}')
print(f'  Gastado/clics          = ${GASTO/clics:,.2f}  (archivo: ${CPC:,.2f})  '
      f'{"OK" if abs(GASTO/clics-CPC)<2 else "NO"}')

print()
print('=' * 70)
print('2. ⚠️ DOS AVISOS DE LECTURA ANTES DE COMPARAR')
print('=' * 70)
print('  (a) LA VENTANA SE SOLAPA: el export anterior era 5-14 ago y este es')
print('      14-19 ago. EL 14 ESTA EN LOS DOS. El 14 fue un dia del valle,')
print('      asi que "contamina" hacia abajo esta ventana nueva.')
print('  (b) SON LAS 00:40 DEL 19 EN COLOMBIA -> el 19 aporta ~40 minutos.')
print('      En la practica son 5 dias completos (14,15,16,17,18), no 6.')
print('      Se muestran las dos lecturas porque cambia el gasto/dia.')
print()
for dias, et in ((6, '6 dias (como dice el export)'), (5, '5 dias efectivos')):
    print(f'  {et}:')
    print(f'      gasto/dia          : ${GASTO/dias:,.0f}   '
          f'(antes ${V_GASTO_DIA:,})')
    print(f'      conversaciones/dia : {CONV/dias:.1f}   (antes {V_CONV_DIA:.1f})')

print()
print('=' * 70)
print('3. ✅ LA CALIDAD DEL TRAFICO MEJORO EN TODAS LAS METRICAS')
print('=' * 70)
filas = [
    ('CTR (link)', V_CTR, CTR, '%', True),
    ('CPC (link)', V_CPC, CPC, '$', False),
    ('Costo/conversacion', V_COSTO_CONV, GASTO/CONV, '$', False),
    ('Clic->chat', V_CLICCHAT, clicchat, '%', True),
]
print(f'  {"metrica":<22} {"10-14 ago":>11} {"14-19 ago":>11} {"cambio":>9}')
for et, antes, ahora, u, mas_es_mejor in filas:
    d = (ahora/antes - 1) * 100
    ok = '✅' if (d > 0) == mas_es_mejor else '🔴'
    if u == '$':
        print(f'  {et:<22} ${antes:>10,.0f} ${ahora:>10,.0f} {d:>+8.1f}% {ok}')
    else:
        print(f'  {et:<22} {antes:>10.2f}% {ahora:>10.2f}% {d:>+8.1f}% {ok}')
print()
print('  🔑 EL CTR SUBIO +13,5% Y VOLVIO A NIVELES DE JULIO (1,89%).')
print('     Venia cayendo sin parar: 2,12 -> 1,78 -> 1,63. Se dio vuelta.')
print('  🔑 El costo por conversacion BAJO a $534 (venia 512 -> 544 -> 572).')
print('     Es el mejor numero desde la primera semana de agosto.')
print()
print(f'  Impresiones/dia: {IMPR/6:,.0f} (antes {121697/10:,.0f}) '
      f'-> {IMPR/6/(121697/10)*100-100:+.0f}%')
print(f'  Alcance/dia    : {ALC/6:,.0f} (antes {68882/10:,.0f}) '
      f'-> {ALC/6/(68882/10)*100-100:+.0f}%')
print('  >>> MENOS impresiones por dia pero MAS conversaciones y mejor CTR.')
print('      No es que Meta este mostrando mas: esta acertando mas.')

print()
print('=' * 70)
print('4. 🚨 LO QUE FALTA: SIN VENTAS NO HAY VEREDICTO')
print('=' * 70)
print('  Todo lo de arriba es la BOCA del embudo. El criterio que se fijo de')
print('  antemano es sobre el CIERRE, y el cierre necesita las ventas.')
print('  ⚠️ Y ojo: la mejora del CTR NO implica mejor cierre. El pico de 13%')
print('     convivio con un CTR de 1,78%, peor que este. Son cosas distintas.')

if VENTAS is None:
    print()
    print('=' * 70)
    print('5. TABLA DE DECISION — buscar el numero de guias en la columna 1')
    print('=' * 70)
    print(f'  {"guias":>6} {"g/dia":>7} {"cierre":>8} {"real*":>7} {"CPA":>9}  VEREDICTO')
    print(f'  {"":>6} {"":>7} {"crudo":>8} {"":>7} {"":>9}')
    for v in (26, 32, 38, 42, 48, 53, 58, 64):
        cierre = v / CONV
        real = v / (CONV * (1 - VACIAS_14AGO))
        cpa = GASTO / v
        if cierre >= 0.10:
            ver = 'REBOTE CLARO -> era el ciclo de pago'
        elif cierre >= 0.08:
            ver = 'rebote parcial -> ambiguo, esperar el 26-29'
        elif cierre >= 0.07:
            ver = 'rebote debil -> sospechar clima/horas'
        else:
            ver = 'SIN REBOTE -> no era la quincena'
        print(f'  {v:>6} {v/5:>7.1f} {cierre*100:>7.1f}% {real*100:>6.1f}% '
              f'${cpa:>8,.0f}  {ver}')
    print()
    print('  * "real" = cierre sobre conversaciones no vacias, suponiendo que la')
    print('    tasa de vacias sigue en 57,8% (lo medido el 14-ago). Si bajo, el')
    print('    cierre real es menor que esa columna; si subio, mayor.')
    print()
    print(f'  Referencias: valle 10-14 ago = {V_VENTAS} guias en {V_DIAS} dias '
          f'({V_VENTAS/V_DIAS:.1f}/dia, cierre 6,1%)')
    print(f'               antes del temblor = 10-12 ventas/dia')
    print(f'               equilibrio operativo = 2,2 ventas/dia')
    print(f'               CPA de equilibrio = ${CPA_EQUILIBRIO:,}')
else:
    cierre = VENTAS / CONV
    real = VENTAS / (CONV * (1 - VACIAS_14AGO))
    print()
    print('=' * 70)
    print('5. VEREDICTO')
    print('=' * 70)
    print(f'  Guias                    : {VENTAS}  ({VENTAS/5:.1f}/dia)')
    print(f'  Cierre crudo             : {cierre*100:.1f}%   (valle: 6,1%)')
    print(f'  Cierre sobre reales      : {real*100:.1f}%')
    print(f'  CPA por venta cerrada    : ${GASTO/VENTAS:,.0f}   (valle: $9.343)')
    print(f'  CPA por venta entregada  : ${GASTO/VENTAS/0.847:,.0f}   (valle: $11.031)')
    print(f'  Utilidad/dia aprox       : ${(MARGEN-GASTO/VENTAS/0.847)*VENTAS/5:,.0f}')
