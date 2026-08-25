"""¿CUANDO ARRANCA EL VALLE DE QUINCENA? (pregunta del dueno, martes 25-ago)

CONTEXTO: se le dijo al dueno "el valle es 26-29 ago". Hoy es martes 25 y el
reporta que las ventas bajaron. Dos posibilidades:
  (a) el valle arranco antes de lo que dije -> mi rango estaba mal
  (b) la caida de hoy es ruido normal del dia a dia -> no hay valle todavia

OJO CON EL ORIGEN DEL "26-29": en ciclo-quincena.py esos dias estan ESCRITOS A
MANO como definicion (`if d.day in (11,12,13,14,26,27,28,29)`). NO salieron de
medir nada. Y la seccion 0-I del archivo madre ya habia concluido:
"el corte crudo apunta EN CONTRA: valle pre-pago 9,3 guias/dia vs post-pago 7,8".

Este script hace lo que nunca se hizo: juntar TODAS las guias de TODOS los
exports, ponerlas en el calendario, y preguntarle a los datos si existe un
patron por dia-del-mes -- y si se puede distinguir del ruido.

TRAMPAS QUE HAY QUE ESQUIVAR:
  1. fecha_envio_utc viene en UTC. Colombia = UTC-5. Sin corregir, los envios
     de la tarde/noche se corren al dia siguiente.
  2. Los CSV de 99 Envios traen comas dentro de campos entrecomillados
     ("BOGOTA, D.C.") -> hay que usar csv.DictReader, no split(',').
  3. Los exports se SOLAPAN (19ago, 21ago y 24ago repiten guias) -> hay que
     deduplicar por numero_de_guia o se infla todo.
  4. El dia de HOY esta incompleto. Comparar un dia a medias contra dias
     completos fabrica una caida que no existe.
  5. Dia-del-mes y dia-de-semana se confunden. Hay que mirar los dos.
"""
import csv
import glob
import statistics
from collections import defaultdict
from datetime import date, datetime, timedelta

# ---------------------------------------------------------------- 1. CARGA
guias = {}          # numero_de_guia -> fecha local Colombia
archivo_de = {}     # de que export salio (para auditar)

for path in sorted(glob.glob('guias-99envios*.csv')):
    for r in csv.DictReader(open(path)):
        num = (r.get('numero_de_guia') or '').strip()
        raw = (r.get('fecha_envio_utc') or r.get('fecha_envio') or '').strip()
        if not num or not raw:
            continue
        f = None
        for fmt in ('%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H:%M', '%Y-%m-%dT%H:%M:%S', '%Y-%m-%d'):
            try:
                f = datetime.strptime(raw, fmt)
                break
            except ValueError:
                continue
        if f is None:
            continue
        # UTC -> Colombia (UTC-5). Si el export no traia hora, no se corre.
        local = (f - timedelta(hours=5)).date() if f.hour or f.minute else f.date()
        if num not in guias:
            guias[num] = local
            archivo_de[num] = path

por_dia = defaultdict(int)
for num, f in guias.items():
    por_dia[f] += 1

print('=' * 74)
print('1. TODAS LAS GUIAS DE 99 ENVIOS, DEDUPLICADAS, EN EL CALENDARIO')
print('=' * 74)
tot_filas = sum(sum(1 for _ in csv.DictReader(open(p)))
                for p in glob.glob('guias-99envios*.csv'))
print(f'  Filas leidas en los 4 exports : {tot_filas}')
print(f'  Guias UNICAS (deduplicadas)   : {len(guias)}')
print(f'  -> {tot_filas - len(guias)} filas eran la misma guia repetida en varios exports')
print()

DIAS = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom']
f_min, f_max = min(por_dia), max(por_dia)
d = f_min
while d <= f_max:
    n = por_dia.get(d, 0)
    marca = ''
    if d.day in (15, 30, 31, 1):
        marca = '  <== PAGO'
    elif d.day in (26, 27, 28, 29):
        marca = '  <== el "valle" que yo declare'
    print(f'  {d} {DIAS[d.weekday()]}  {n:2d} {"#" * n}{marca}')
    d += timedelta(days=1)

# ------------------------------------------------- 2. RUIDO DEL DIA A DIA
print()
print('=' * 74)
print('2. ¿CUANTO SE MUEVEN LAS VENTAS DE UN DIA A OTRO POR PURO RUIDO?')
print('=' * 74)
serie = [por_dia[k] for k in sorted(por_dia) if por_dia[k] > 0]
if len(serie) >= 3:
    media = statistics.mean(serie)
    desv = statistics.stdev(serie)
    print(f'  Dias con ventas      : {len(serie)}')
    print(f'  Promedio             : {media:.1f} guias/dia')
    print(f'  Desviacion estandar  : {desv:.1f} guias/dia  ({desv/media*100:.0f}% del promedio)')
    print()
    print(f'  -> Un dia CUALQUIERA cae normalmente hasta {max(0, media - desv):.1f} guias')
    print(f'     sin que pase nada raro. Y hasta {max(0, media - 2*desv):.1f} sin ser alarmante.')
    print()
    print('  CONSECUENCIA: para afirmar "empezo el valle" con UN solo dia, la caida')
    print(f'  tendria que bajar de {max(0, media - 2*desv):.1f} guias. Con 2 dias seguidos flojos ya')
    print('  la cosa cambia: dos dias bajo el promedio seguidos son mucho menos probables.')
    # variacion dia-a-dia consecutiva
    fechas_ord = sorted(k for k in por_dia if por_dia[k] > 0)
    saltos = []
    for a, b in zip(fechas_ord, fechas_ord[1:]):
        if (b - a).days == 1:
            saltos.append(abs(por_dia[b] - por_dia[a]) / max(por_dia[a], 1) * 100)
    if saltos:
        print()
        print(f'  Cambio tipico entre dos dias seguidos: {statistics.median(saltos):.0f}% (mediana)')
        print(f'  El mayor salto observado             : {max(saltos):.0f}%')
        print('  -> Si hoy bajo menos que eso, es ruido, no señal.')

# ------------------------------------- 3. DIA DEL MES: ¿HAY PATRON O NO?
print()
print('=' * 74)
print('3. LA PRUEBA DE FONDO: ¿EL DIA DEL MES PREDICE LAS VENTAS?')
print('=' * 74)

# juntamos Heka (jul) para tener mas dias del mes cubiertos
EXCEL_EPOCH = date(1899, 12, 30)
heka_por_dia = defaultdict(int)
try:
    for r in csv.DictReader(open('guias-heka.csv')):
        heka_por_dia[EXCEL_EPOCH + timedelta(days=int(r['fecha']))] += 1
except (FileNotFoundError, KeyError, ValueError):
    pass

print(f'  Heka  : {sum(heka_por_dia.values())} guias, {min(heka_por_dia)} a {max(heka_por_dia)}')
print(f'  99 Env: {len(guias)} guias, {f_min} a {f_max}')
print()
print('  ⚠️ NO se pueden sumar crudo: son periodos con presupuesto, guion y precio')
print('     distintos. Se normaliza cada periodo por SU PROPIO promedio, y se compara')
print('     el indice relativo (1,00 = un dia promedio DE ESE periodo).')
print()

def indices(serie_dict, dmin, dmax):
    """indice relativo por dia-del-mes dentro de un periodo, saltando dias sin campaña"""
    activos = {k: v for k, v in serie_dict.items() if dmin <= k <= dmax and v > 0}
    if not activos:
        return {}
    prom = statistics.mean(activos.values())
    out = defaultdict(list)
    for k, v in activos.items():
        out[k.day].append(v / prom)
    return out

acum = defaultdict(list)
# Heka: solo el tramo post-relanzamiento (25-jul en adelante) para no meter la pausa
for dm, vals in indices(heka_por_dia, date(2026, 7, 25), date(2026, 8, 9)).items():
    acum[dm] += vals
for dm, vals in indices(por_dia, f_min, f_max).items():
    acum[dm] += vals

print('  dia   indice   n   lectura')
print('  ' + '-' * 52)
for dm in sorted(acum):
    vals = acum[dm]
    idx = statistics.mean(vals)
    barra = '#' * max(1, round(idx * 12))
    nota = ''
    if dm in (26, 27, 28, 29):
        nota = ' <== "valle" declarado'
    elif dm in (15, 30, 31, 1):
        nota = ' <== pago'
    print(f'  {dm:2d}   {idx:5.2f}  {len(vals)}   {barra}{nota}')

print()
pre = [v for dm in (11, 12, 13, 14, 26, 27, 28, 29) for v in acum.get(dm, [])]
post = [v for dm in (15, 16, 17, 18, 30, 31, 1, 2) for v in acum.get(dm, [])]
if pre and post:
    print(f'  Dias PRE-pago  (11-14, 26-29): indice {statistics.mean(pre):.2f}  (n={len(pre)})')
    print(f'  Dias POST-pago (15-18, 30-2) : indice {statistics.mean(post):.2f}  (n={len(post)})')
    dif = (statistics.mean(pre) / statistics.mean(post) - 1) * 100
    print()
    if abs(dif) < 10:
        print(f'  → Diferencia: {dif:+.0f}%. ES RUIDO. Los datos NO muestran valle de quincena.')
    elif dif < 0:
        print(f'  → Los dias pre-pago venden {abs(dif):.0f}% MENOS. El valle existe.')
    else:
        print(f'  → Los dias pre-pago venden {dif:.0f}% MAS. El valle va AL REVES de lo que dije.')

# ------------------------------------------------ 4. DIA DE SEMANA (confusor)
print()
print('=' * 74)
print('4. EL CONFUSOR: ¿NO SERA EL DIA DE LA SEMANA?')
print('=' * 74)
print('  Hoy es MARTES. Si los martes son flojos de por si, la caida no tiene')
print('  nada que ver con la quincena.')
print()
sem = defaultdict(list)
for serie_dict, dmin, dmax in ((heka_por_dia, date(2026, 7, 25), date(2026, 8, 9)),
                               (por_dia, f_min, f_max)):
    activos = {k: v for k, v in serie_dict.items() if dmin <= k <= dmax and v > 0}
    if not activos:
        continue
    prom = statistics.mean(activos.values())
    for k, v in activos.items():
        sem[k.weekday()].append(v / prom)

for wd in range(7):
    vals = sem.get(wd, [])
    if not vals:
        print(f'  {DIAS[wd]}   sin datos')
        continue
    idx = statistics.mean(vals)
    marca = '  <== HOY' if wd == 1 else ''
    print(f'  {DIAS[wd]}  {idx:5.2f}  n={len(vals)}  {"#" * max(1, round(idx * 12))}{marca}')

print()
print('=' * 74)
print('4-BIS. 🔴 LA TRAMPA QUE INVALIDA TODO LO DE ARRIBA')
print('=' * 74)
print('  En los 4 exports, SABADO y DOMINGO tienen 0 guias SIEMPRE. Con pauta')
print('  prendida es imposible vender 0 dos dias seguidos, todas las semanas.')
print()
print('  → `fecha_envio` NO es la fecha de VENTA: es la fecha en que se genero')
print('    la guia (el despacho). El fin de semana no se generan guias, y la')
print('    demanda del sabado y domingo se descarga el lunes o el martes.')
print()
flush = [v for v in por_dia.values() if v >= 25]
normal = [v for k, v in por_dia.items() if 0 < v < 25]
if flush and normal:
    m_norm = statistics.median(normal)
    m_flush = statistics.mean(flush)
    print(f'  Dias de DESCARGA post-finde : {sorted(flush, reverse=True)}  (promedio {m_flush:.0f})')
    print(f'  Dias NORMALES               : {sorted(normal)}  (mediana {m_norm:.0f})')
    print(f'  → Un dia de descarga vale {m_flush/m_norm:.1f}x un dia normal.')
    print()
    print('  Y el dia de la descarga SE MUEVE:')
    print('    semana 17-21: lun 17 = 9  → la descarga cayo el MARTES 18 (32)')
    print('    semana 24-28: lun 24 = 31 → la descarga cayo el LUNES 24')
    print()
    print('  ⚠️ CONSECUENCIA PARA HOY (martes 25): como la descarga ya se hizo el')
    print('     lunes 24, el martes 25 arranca limpio, con solo su propia demanda.')
    caida = (1 - m_norm / m_flush) * 100
    print(f'     Un martes 25 NORMAL deberia dar ~{m_norm:.0f} guias, que contra las')
    print(f'     {max(flush):.0f} del lunes se ve como una caida del {caida:.0f}% -- Y NO ES VALLE.')
    print(f'     Solo seria señal real si baja de ~{m_norm * 0.6:.0f} guias.')
print()
print('  Esto tambien contamina la seccion 3: el indice "post-pago" de 1,15 se')
print('  sostiene sobre la descarga de 32 guias del 18-ago, que no es demanda del')
print('  18 sino del fin de semana anterior. El -40% pre/post NO es confiable.')

print()
print('=' * 74)
print('5. VEREDICTO')
print('=' * 74)
mar = statistics.mean(sem[1]) if sem.get(1) else None
if mar is not None:
    if mar < 0.95:
        print(f'  Los martes rinden {(1-mar)*100:.0f}% MENOS que un dia promedio. Parte de la')
        print('  caida de hoy es el dia de la semana, no la quincena.')
    else:
        print(f'  Los martes rinden {mar:.2f} (normal o mejor). El dia de la semana NO')
        print('  explica la caida de hoy.')
print()
print('  Lo que SI se puede afirmar con estos datos:')
print('   - El rango "26-29" nunca se midio: estaba escrito a mano en un script.')
print('   - Con 1 solo dia flojo no se distingue valle de ruido.')
print('   - El valle, si existe, se confirma con 2-3 dias seguidos bajo el promedio,')
print('     no con el primero.')
