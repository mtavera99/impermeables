#!/usr/bin/env python3
"""
TRANSPORTADORAS: DEVOLUCIONES, NOVEDADES Y CUAL CONVIENE DONDE (2026-09-12)
============================================================================
El dueno pidio: "analiza todas las guias, la tasa de devolucion de cada
transportadora y cual me conviene usar mas para cada ubicacion segun
devolucion por encima de costos. Ahora tengo hartas novedades y la mayoria
son de Coordinadora; antes me pasaba con Interrapidisimo".

Fuente: export Envios-Completos-2026-09-12, 349 guias, 10-ago al 11-sep.

🔴 LA TRAMPA MAS GRANDE DE ESTE ANALISIS, Y HAY QUE VERLA PRIMERO:
   las guias de Coordinadora son casi todas de los ultimos 5 dias, y las de
   Interrapidisimo y Servientrega vienen de hace 2-4 semanas. Una guia de
   ayer NO PUEDE estar entregada todavia: esta "en transporte" o con
   novedad abierta. Comparar tal cual mide la EDAD de la guia, no la
   calidad de la transportadora.
   >>> Por eso todo se mide DOS veces: crudo y con MADUREZ CONTROLADA.
"""

import collections
import csv
import datetime as dt
import os

L = '=' * 78
HOY = dt.date(2026, 9, 12)
CSV = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'transportadoras-12sep.csv')

# Estados FINALES
ENTREGADA = {'Entregada'}
DEVUELTA = {'Devolucion ratificada', 'Devolucion Regional',
            'ENTREGADO A REMITENTE', 'Cerrado por incidencia'}
# Estados de NOVEDAD abierta (el paquete esta atascado, no en transito normal)
NOVEDAD = {
    'Intento de entrega', 'Reclame en oficina', 'Reclamo oficina WhatsApp',
    'Se visita no se logra entrega', 'No se localiza direccion',
    'Destinatario no cancela recaudo', 'No se entrega no cancela recaudo',
    'Deterioro en validacion GP', 'Unidad en lugar diferente',
}
# El resto (Transito, En transporte, Admitida, Creado, EN PROCESAMIENTO,
# Reparto, En terminal de destino, Recoleccion programada) = en curso normal

MARGEN_UNIDAD = 26_900     # utilidad bruta por unidad antes de flete (0-AE)


def clasificar(e):
    if e in ENTREGADA:
        return 'entregada'
    if e in DEVUELTA:
        return 'devuelta'
    if e in NOVEDAD:
        return 'novedad'
    return 'en_curso'


rows = []
for r in csv.DictReader(open(CSV)):
    r['flete'] = float(r['flete'])
    r['seguro'] = float(r['seguro'])
    r['recaudo'] = int(r['recaudo'])
    r['dias'] = (HOY - dt.date.fromisoformat(r['fecha'])).days
    r['clase'] = clasificar(r['estado'])
    rows.append(r)

TR = ['interrapidisimo', 'coordinadora', 'servientrega']


def bloque(sub, titulo):
    print(f'\n  {titulo}')
    print(f"  {'transportadora':<17}{'guias':>6}{'entreg':>7}{'devuel':>7}"
          f"{'novedad':>8}{'curso':>7}{'% DEVOL':>9}{'% NOVED':>9}")
    out = {}
    for t in TR:
        d = [r for r in sub if r['transportadora'] == t]
        if not d:
            continue
        c = collections.Counter(r['clase'] for r in d)
        resuelt = c['entregada'] + c['devuelta']
        dev = c['devuelta'] / resuelt if resuelt else 0
        nov = c['novedad'] / len(d)
        out[t] = (len(d), c, dev, nov, resuelt)
        print(f"  {t:<17}{len(d):>6}{c['entregada']:>7}{c['devuelta']:>7}"
              f"{c['novedad']:>8}{c['en_curso']:>7}{dev:>8.1%}{nov:>9.1%}")
    return out


print(L)
print('1. 🔴 PRIMERO LA TRAMPA: LA EDAD DE LAS GUIAS NO ES LA MISMA')
print(L)
print(f"  {'transportadora':<17}{'guias':>6}{'antiguedad media':>18}{'% de los ultimos 5 dias':>26}")
for t in TR:
    d = [r for r in rows if r['transportadora'] == t]
    rec = sum(1 for r in d if r['dias'] <= 5)
    print(f'  {t:<17}{len(d):>6}{sum(r["dias"] for r in d)/len(d):>15.1f} d'
          f'{rec/len(d):>25.0%}')
print()
print('  🔑 Coordinadora tiene el 71% de sus guias de los ultimos 5 dias.')
print('     Interrapidisimo tiene casi todas de hace 2-4 semanas.')
print('  >>> Una guia de ayer no puede estar entregada. Si comparas crudo,')
print('      Coordinadora SIEMPRE va a parecer peor. No es la transportadora:')
print('      es el reloj.')

print()
print(L)
print('2. LA COMPARACION CRUDA (la que enganaria) vs LA CONTROLADA')
print(L)
crudo = bloque(rows, 'A) CRUDO — todas las guias (⚠️ SESGADO POR EDAD)')
maduro = bloque([r for r in rows if r['dias'] >= 10],
                'B) SOLO GUIAS CON 10+ DIAS DE MADUREZ (✅ comparable)')

print()
print('  🔑 LO QUE CAMBIA AL CONTROLAR LA EDAD:')
for t in TR:
    if t in crudo and t in maduro:
        print(f'     {t:<17} novedad abierta: {crudo[t][3]:>5.1%} crudo  ->  '
              f'{maduro[t][3]:>5.1%} maduro')
print()
print('  >>> LA SENSACION DE "HARTAS NOVEDADES DE COORDINADORA" ES REAL EN EL')
print('      TABLERO, PERO ES PORQUE SON GUIAS NUEVAS. Con 10+ dias de madurez')
print('      la foto es distinta.')

print()
print(L)
print('3. TASA DE DEVOLUCION SOBRE GUIAS RESUELTAS (el numero que importa)')
print(L)
print('  Solo cuenta lo que ya termino: entregada o devuelta.')
print()
for t in TR:
    if t not in maduro:
        continue
    n, c, dev, nov, resuelt = maduro[t]
    print(f'  {t:<17} {c["devuelta"]:>2} devueltas de {resuelt:>3} resueltas = {dev:>5.1%}')
print()
tot_r = sum(maduro[t][4] for t in maduro)
tot_d = sum(maduro[t][1]['devuelta'] for t in maduro)
print(f'  TOTAL DEL NEGOCIO: {tot_d} de {tot_r} = {tot_d/tot_r:.1%}')
print()
print('  📌 El archivo madre traia 5,0% (0-AF, export de 141 guias) y 9,7%')
print('     (0-AK). Con 349 guias y madurez controlada, este es el numero')
print('     mas solido que se ha calculado hasta ahora.')

print()
print(L)
print('4. ⚖️ MISMA CIUDAD, DISTINTA TRANSPORTADORA — LA UNICA COMPARACION JUSTA')
print(L)
print('  El destino no se asigna al azar: cada transportadora recibe ciudades')
print('  distintas. Asi que solo sirven las ciudades donde se usaron VARIAS.')
print()
porciudad = collections.defaultdict(lambda: collections.defaultdict(list))
for r in rows:
    porciudad[r['ciudad']][r['transportadora']].append(r)
comparables = {c: v for c, v in porciudad.items() if len(v) >= 2 and
               sum(len(x) for x in v.values()) >= 6}
print(f"  {'ciudad':<24}{'transportadora':<17}{'guias':>6}{'devol':>7}{'noved':>7}{'flete medio':>13}")
for c in sorted(comparables, key=lambda x: -sum(len(v) for v in porciudad[x].values())):
    for t in TR:
        d = porciudad[c].get(t)
        if not d:
            continue
        cc = collections.Counter(r['clase'] for r in d)
        res = cc['entregada'] + cc['devuelta']
        fl = [r['flete'] for r in d if r['flete'] > 5000]
        print(f'  {c[:23]:<24}{t:<17}{len(d):>6}'
              f'{(str(cc["devuelta"])+"/"+str(res)):>7}'
              f'{cc["novedad"]:>7}'
              f'{(sum(fl)/len(fl) if fl else 0):>13,.0f}')
    print()

print(L)
print('5. 💰 CUANTO CUESTA UNA DEVOLUCION DE VERDAD')
print(L)
devs = [r for r in rows if r['clase'] == 'devuelta']
print(f'  devoluciones en la ventana: {len(devs)}')
print()
print('  🔑 HALLAZGO: en una devolucion, el flete cobrado ES el seguro.')
print(f"  {'ciudad':<20}{'flete cobrado':>14}{'seguro':>9}{'iguales?':>10}")
for r in devs[:8]:
    ig = 'SI' if abs(r['flete'] - r['seguro']) < 1 else 'no'
    print(f'  {r["ciudad"][:19]:<20}{r["flete"]:>14,.0f}{r["seguro"]:>9,.0f}{ig:>10}')
iguales = sum(1 for r in devs if abs(r['flete'] - r['seguro']) < 1)
print(f'\n  >>> {iguales} de {len(devs)} devoluciones cobran EXACTAMENTE el seguro.')
print('      Confirma 0-AF: cuando hay devolucion, 99 Envios NO cobra el flete')
print('      completo, cobra el seguro. Entonces:')
print()
costo_dev = sum(r['seguro'] for r in devs) / len(devs)
print(f'      COSTO DIRECTO de una devolucion: ~${costo_dev:,.0f} (el seguro)')
print(f'      + el producto vuelve (no se pierde inventario)')
print(f'      + se pierde la utilidad de la venta: ${MARGEN_UNIDAD:,}')
print(f'      >>> COSTO TOTAL POR DEVOLUCION: ~${costo_dev + MARGEN_UNIDAD:,.0f}')

print()
print(L)
print('6. 🎯 LA REGLA DE DECISION: DEVOLUCION vs DIFERENCIA DE FLETE')
print(L)
print('  La pregunta correcta no es "quien devuelve menos" sino:')
print()
print('     ¿la transportadora mas barata me ahorra mas en flete')
print('      de lo que me cuesta su devolucion extra?')
print()
print(f'  Costo esperado por guia = flete + (tasa_devolucion x ${costo_dev + MARGEN_UNIDAD:,.0f})')
print()
print(f"  {'transportadora':<17}{'flete medio':>13}{'tasa dev':>10}{'costo dev esperado':>20}{'COSTO TOTAL':>14}")
best = None
for t in TR:
    if t not in maduro:
        continue
    d = [r for r in rows if r['transportadora'] == t and r['flete'] > 5000]
    fl = sum(r['flete'] for r in d) / len(d)
    tasa = maduro[t][2]
    esp = tasa * (costo_dev + MARGEN_UNIDAD)
    tot = fl + esp
    print(f'  {t:<17}{fl:>13,.0f}{tasa:>10.1%}{esp:>20,.0f}{tot:>14,.0f}')
    if best is None or tot < best[1]:
        best = (t, tot)
print()
print(f'  >>> MAS BARATA EN COSTO TOTAL: {best[0]} (${best[1]:,.0f} por guia)')
print()
print('  ⚠️ PERO ESTE PROMEDIO NACIONAL NO SIRVE PARA DECIDIR POR CIUDAD:')
print('     el flete medio depende de a que ciudades manda cada una. Para')
print('     decidir por destino hay que usar la tabla de la seccion 4.')

print()
print(L)
print('7. 🔴 LOS DESTINOS QUE HAY QUE MIRAR APARTE')
print(L)
print('  Ciudades con 2+ novedades o devoluciones, sin importar transportadora:')
print()
malos = []
for c, v in porciudad.items():
    todas = [r for t in v for r in v[t]]
    mal = sum(1 for r in todas if r['clase'] in ('devuelta', 'novedad'))
    if mal >= 2:
        malos.append((mal, len(todas), c, todas))
print(f"  {'ciudad':<24}{'guias':>6}{'mal':>5}{'% mal':>8}  transportadoras")
for mal, n, c, todas in sorted(malos, reverse=True):
    ts = ','.join(sorted({r['transportadora'][:4] for r in todas}))
    print(f'  {c[:23]:<24}{n:>6}{mal:>5}{mal/n:>7.0%}  {ts}')
print()
print('  🔑 Si una ciudad falla con TODAS las transportadoras, el problema no')
print('     es la transportadora: es la ciudad (o la direccion que da el')
print('     cliente, o que es zona de difícil acceso).')

print()
print(L)
print('LO QUE ESTE ANALISIS NO PUEDE DECIR')
print(L)
print('  - No hay asignacion aleatoria: la transportadora se elige por destino,')
print('    asi que las diferencias globales mezclan calidad con geografia.')
print('  - Servientrega ya no se usa (ultima guia 31-ago). Sirve de referencia')
print('    historica, no para decidir hacia adelante.')
print('  - Coordinadora tiene pocas guias maduras. Su numero va a moverse')
print('    bastante con una semana mas de datos.')
print('  - No se sabe si la novedad la causo la transportadora o una direccion')
print('    mal tomada en el chat. Eso solo se sabe leyendo los casos.')
print(L)
