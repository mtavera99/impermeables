"""¿EL CICLO DE PAGO (QUINCENA) EXPLICA LA CAIDA DEL CIERRE?

CORRECCION DEL 2026-08-14 (la aporto el dueno):
  La seccion 0-I se escribio diciendo "la quincena del 15 ya paso" para descartarla
  y dejar a la IA de WhatsApp como hipotesis #1. ESO ERA FALSO:
  en Colombia hoy es 14 de agosto -> LA QUINCENA NO HA PASADO, es MANANA.
  (El sandbox corre en UTC y ya marcaba 15-ago; la hora local es UTC-5.)

  Consecuencia grave para el analisis: la ventana medida (10-14 ago) cae ENTERA
  en el valle de menos efectivo del mes, justo ANTES del pago del 15.
  Y en contraentrega el cliente necesita los ~$60.000 EN EFECTIVO el dia que
  llega el mensajero. O sea: hay una explicacion competidora que cubre TODA la
  ventana y que no requiere culpar a la IA.

Este script intenta falsear la hipotesis con el historial de Heka (15 jul - 9 ago).
"""
import csv
from collections import defaultdict
from datetime import date, timedelta

EXCEL_EPOCH = date(1899, 12, 30)

rows = list(csv.DictReader(open('guias-heka.csv')))
for r in rows:
    r['f'] = EXCEL_EPOCH + timedelta(days=int(r['fecha']))

por_dia = defaultdict(int)
for r in rows:
    por_dia[r['f']] += 1

f_min, f_max = min(por_dia), max(por_dia)
print('=' * 68)
print('1. GUIAS POR DIA EN EL PERIODO HEKA')
print('=' * 68)
print(f'  Rango: {f_min} a {f_max}   ({len(rows)} guias)')
print()
d = f_min
while d <= f_max:
    n = por_dia.get(d, 0)
    dia_sem = ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom'][d.weekday()]
    marca = ''
    if d.day in (15, 30, 31):
        marca = '  <== DIA DE PAGO'
    elif d.day in (11, 12, 13, 14, 26, 27, 28, 29):
        marca = '  (valle: antes del pago)'
    print(f'  {d} {dia_sem}  {n:2d} {"#" * n}{marca}')
    d += timedelta(days=1)

print()
print('=' * 68)
print('2. EL PROBLEMA: LA CAMPANA ESTUVO PAUSADA JUSTO EN LA PRUEBA CLAVE')
print('=' * 68)
ceros = [d for d in (f_min + timedelta(days=i) for i in range((f_max-f_min).days+1))
         if por_dia.get(d, 0) == 0]
print(f'  Dias con 0 guias: {len(ceros)}')
if ceros:
    print(f'  Del {min(ceros)} al {max(ceros)}')
print()
print('  La seccion 0-G ya lo habia notado: el hueco del 17 al 26 de julio es la')
print('  campana PAUSADA antes del relanzamiento del 25-jul.')
print('  >>> Ese hueco tapa exactamente la ventana 15-20 jul, que es el tramo')
print('      POST-PAGO que habria servido para comprobar el rebote de quincena.')
print('      El unico dia de pago con datos limpios es el 30-31 jul.')

print()
print('=' * 68)
print('3. VALLE PRE-PAGO vs RESTO (con los dias que si tienen datos)')
print('=' * 68)
VALLE = {11, 12, 13, 14, 26, 27, 28, 29}
POST = {15, 16, 17, 18, 19, 20, 1, 2, 3, 4, 5}
grupos = defaultdict(list)
for d, n in por_dia.items():
    if n == 0:
        continue
    if d.day in VALLE:
        grupos['valle pre-pago'].append((d, n))
    elif d.day in POST:
        grupos['post-pago'].append((d, n))
    else:
        grupos['resto del mes'].append((d, n))

print(f'  {"grupo":<18} {"dias":>5} {"guias":>7} {"guias/dia":>11}')
for k in ('valle pre-pago', 'post-pago', 'resto del mes'):
    g = grupos[k]
    if g:
        tot = sum(n for _, n in g)
        print(f'  {k:<18} {len(g):>5} {tot:>7} {tot/len(g):>11.1f}')

print()
print('  ⚠️ ESTE CUADRO NO PRUEBA NADA, Y HAY QUE DECIRLO:')
print('  - El presupuesto SUBIO durante el periodo ($30k -> $36k -> $45k -> $57k),')
print('    asi que las guias/dia crecen por razones que no tienen que ver con la')
print('    quincena. Los dias tardios estan inflados por presupuesto, no por pago.')
print('  - El cierre tambien venia subiendo solo (2,84% -> 7% -> 8,3% -> 10,2%).')
print('  - La pausa del 17-26 jul borra el mejor tramo de comparacion.')
print('  - Son pocos dias por grupo.')
print('  >>> Con este historial NO se puede confirmar ni descartar la quincena.')
print('      Cualquier conclusion aqui seria el mismo error de muestra pequena')
print('      que la seccion 11 ya documenta tres veces.')

print()
print('=' * 68)
print('4. LO QUE SI SE PUEDE AFIRMAR')
print('=' * 68)
print('  (a) La ventana 10-14 ago cae COMPLETA en el valle pre-pago.')
print('      No es "un pedacito": son los 5 dias, todos.')
print('  (b) El pico de ~13% de cierre (5-10 ago) cae en el tramo POST-pago del')
print('      30-31 jul + primeros dias, cuando la gente SI tenia efectivo.')
print('  (c) Entonces el patron "pico y luego valle" es exactamente lo que')
print('      predeciria el ciclo de pago, SIN necesidad de culpar a la IA.')
print('  (d) La IA se activo ~12-ago, o sea DENTRO del valle. Las dos causas')
print('      estan superpuestas en el tiempo y con estos datos son')
print('      INDISTINGUIBLES. No se puede rankear una sobre la otra.')

print()
print('=' * 68)
print('5. LA PREDICCION QUE SEPARA LAS HIPOTESIS (y es gratis)')
print('=' * 68)
print('  Manana 15-ago entra la quincena. A partir de ahi:')
print()
print('  SI EL CIERRE REBOTA a 10-13% en 1-3 dias  -> era el CICLO DE PAGO.')
print('     La IA queda absuelta. No hay problema estructural. No tocar nada.')
print()
print('  SI EL CIERRE SIGUE en ~6% con el volumen normal -> la quincena NO era')
print('     la causa, y la IA pasa a ser la sospechosa #1 de verdad.')
print('     Ahi si vale la pena el test de atender a mano.')
print()
print('  >>> El chequeo del 17-ago cae 2 dias despues del pago: es el momento')
print('      exacto para leerlo. El congelamiento no solo no molesta, AYUDA.')
print('  >>> Y esperar no cuesta nada: a 5,2 ventas/dia el negocio sigue')
print('      ganando ~$65.000/dia, 2,4x sobre el punto de equilibrio.')
print()
print('  ⚠️ OJO AL LEERLO: el rebote de quincena y el rebote post-temblor')
print('     tambien se superponen. Si rebota, no se sabra cual de los dos fue.')
print('     Para eso sirve el SIGUIENTE valle (26-29 ago): si el cierre vuelve')
print('     a caer ahi, el ciclo de pago queda demostrado y pasa a ser una')
print('     variable permanente de planeacion, no una excusa de una vez.')
