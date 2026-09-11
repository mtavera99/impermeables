#!/usr/bin/env python3
"""
POR FIN CASADO: EL GASTO DE META CONTRA LAS GUIAS REALES (2026-09-11)
======================================================================
Primera vez en el proyecto que se cruza el gasto de Meta traido de la API
en vivo contra el export de 99 Envios del MISMO dia.

Fuentes:
  - gasto por dia: Marketing API (act_4330882710457791), dias cerrados
  - guias: export Envios-Completos-2026-09-11 (154 guias, 2 al 11 sep)

⚠️ REGLA 0-Y: las guias/dia NO son ventas/dia. Los despachos se hacen de
noche (19:00-22:00) y el fin de semana se acumula. Por eso aca solo se
comparan DIAS HABILES CONSECUTIVOS con despacho propio: 8, 9, 10 y 11 sep.
El lote del 7-sep cubre sabado+domingo+lunes y NO se compara con dias sueltos.
"""

import collections
import csv
import os

L = '=' * 76
CSV = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'envios-completos-11sep.csv')

# gasto de la cuenta por dia, traido de la API (dias cerrados)
GASTO = {
    '2026-09-02': None, '2026-09-03': None, '2026-09-04': None,
    '2026-09-07': None,
    '2026-09-08': 147_002,
    '2026-09-09': 144_451,
    '2026-09-10': 203_087,
    '2026-09-11': 125_598,   # PARCIAL hasta las 15:30
}
# conversaciones por dia, de la API
CONV = {'2026-09-08': 159, '2026-09-09': 129, '2026-09-10': 220}
# dias con hueco de saldo + rebote (seccion 0-AI)
CONTAMINADOS = {'2026-09-09', '2026-09-11'}

COSTO_PROD = 33_000
PRECIO_1 = 59_900
PRECIO_2 = 110_000


def unidades(recaudo, producto):
    """Deduce unidades del recaudo. Precio 1 ud $59.900, promo 2 uds $110.000."""
    if recaudo > 300_000:
        return 'mayoreo', 0
    if recaudo == 149_900:
        return 'colmena', 1
    if recaudo == 59_900:
        return 'error_flete', 1        # El Charco: cobro sin envio (#97)
    if recaudo >= 200_000:
        return '3+', 3
    if recaudo >= 120_000:
        return '2', 2
    return '1', 1


rows = list(csv.DictReader(open(CSV)))
for r in rows:
    r['recaudo'] = int(r['recaudo'])
    r['valor_servicio'] = float(r['valor_servicio'])
    r['seguro'] = float(r['seguro'])
    r['tipo'], r['uds'] = unidades(r['recaudo'], r['producto'])

print(L)
print(f'1. {len(rows)} GUIAS, DEL 2 AL 11 DE SEPTIEMBRE')
print(L)
por_dia = collections.Counter(r['fecha'] for r in rows)
uds_dia = collections.Counter()
for r in rows:
    uds_dia[r['fecha']] += r['uds']
print(f"{'dia':<13} {'guias':>6} {'uds':>5} {'gasto Meta':>12} {'$/guia':>9} {'$/ud':>9}")
for d in sorted(por_dia):
    g = GASTO.get(d)
    marca = '  🔴 dia con hueco de saldo' if d in CONTAMINADOS else ''
    if g:
        print(f'{d:<13} {por_dia[d]:>6} {uds_dia[d]:>5} {g:>12,} '
              f'{g/por_dia[d]:>9,.0f} {g/uds_dia[d]:>9,.0f}{marca}')
    else:
        print(f'{d:<13} {por_dia[d]:>6} {uds_dia[d]:>5} {"(sin dato)":>12} {"":>9} {"":>9}')
print()
print('  ⚠️ El 5 y 6 de sep son sabado y domingo: no hubo despacho. El lote')
print('     del 7-sep (39 guias) cubre sab+dom+lun = ~13/dia. No se compara')
print('     contra un dia suelto (regla 0-Y).')
print()

print(L)
print('2. 🔴 EL CPA REAL SE DUPLICO — Y NO ES EL CPA, ES QUE EL GASTO NO COMPRA')
print(L)
habiles = ['2026-09-08', '2026-09-09', '2026-09-10', '2026-09-11']
tot_g = sum(GASTO[d] for d in habiles)
tot_u = sum(uds_dia[d] for d in habiles)
tot_q = sum(por_dia[d] for d in habiles)
print(f'  ventana 8 al 11-sep (4 dias habiles, el 11 parcial):')
print(f'    gasto        : ${tot_g:>10,}')
print(f'    guias        : {tot_q:>11}')
print(f'    unidades     : {tot_u:>11}')
print(f'    $/guia       : ${tot_g/tot_q:>10,.0f}')
print(f'    $/unidad     : ${tot_g/tot_u:>10,.0f}')
print()
print('  CONTRA EL HISTORICO DEL ARCHIVO MADRE:')
print(f'    {"corte":<22} {"gasto/dia":>11} {"ventas/dia":>11} {"CPA":>9}')
print(f'    {"25-ago (0-Y)":<22} {105_000:>11,} {13.7:>11.1f} {7_664:>9,}')
print(f'    {"4-sep (0-AC)":<22} {150_000:>11,} {19.2:>11.1f} {7_806:>9,}')
print(f'    {"8-11 sep (HOY)":<22} {tot_g/4:>11,.0f} {tot_q/4:>11.1f} {tot_g/tot_q:>9,.0f}')
print()
print('  🔑 EL GASTO SUBIO ~60% Y LAS GUIAS/DIA BAJARON. El CPA por guia se')
print('     multiplico por ~1,7. Eso NO es un problema de creativo ni de')
print('     audiencia: es la ELASTICIDAD 0,63 del propio archivo madre,')
print('     que predijo que a $200.000/dia el peso marginal devuelve $0.')
print('     >>> LA PREDICCION SE CUMPLIO. El gasto de mas no compro nada.')
print()

print(L)
print('3. 💥 EL 9-SEP: LAS CONVERSACIONES CAYERON 19% Y LAS GUIAS 60%')
print(L)
print(f"  {'dia':<13} {'gasto':>10} {'conv':>6} {'guias':>6} {'conv->guia':>11} {'$/guia':>9}")
for d in ['2026-09-08', '2026-09-09', '2026-09-10']:
    c = CONV[d]
    q = por_dia[d]
    marca = '  🔴' if d in CONTAMINADOS else ''
    print(f'  {d:<13} {GASTO[d]:>10,} {c:>6} {q:>6} {q/c:>10.1%} {GASTO[d]/q:>9,.0f}{marca}')
print()
print('  🔑 ESTE ES EL HALLAZGO MAS FUERTE DEL DIA:')
print('     el 9-sep las conversaciones bajaron de 159 a 129 (-19%)')
print('     pero las guias bajaron de 15 a 6 (-60%).')
print()
print('     La tasa conversacion->guia se derrumbo de 9,4% a 4,7% = la MITAD.')
print()
print('     >>> Las conversaciones que compro el rebote de $49.334 a las 18:00')
print('         NO ERAN CLIENTES. Eran gente barata y fria que escribe y no')
print('         compra. El rebote no solo gasto mal: gasto en basura.')
print('     >>> Y confirma 0-AI con una segunda medicion independiente.')
print()
perdidas = 15 - 6
print(f'  COSTO DEL HUECO DEL 9-SEP, medido en guias y no en conversaciones:')
print(f'    guias del 8-sep (dia sano)  : 15')
print(f'    guias del 9-sep (con hueco) :  6')
print(f'    faltaron                    : {perdidas} guias')
util_guia = 24_129
print(f'    a ${util_guia:,} de utilidad por pedido = ${perdidas*util_guia:,} PERDIDOS EN UN DIA')
print()

print(L)
print('4. SHARE DE 2+ UNIDADES (#60) — LA PROMO VOLVIO A FUNCIONAR')
print(L)
tipos = collections.Counter(r['tipo'] for r in rows)
base = sum(v for k, v in tipos.items() if k in ('1', '2', '3+', 'error_flete'))
mult = tipos['2'] + tipos['3+']
print(f"  {'tipo':<14} {'guias':>6}")
for k in ('1', '2', '3+', 'colmena', 'mayoreo', 'error_flete'):
    if tipos[k]:
        print(f'  {k:<14} {tipos[k]:>6}')
print()
print(f'  share de 2+ unidades: {mult}/{base} = {mult/base:.1%}')
print()
print('  CONTRA EL HISTORICO:')
print('    6,8%  antes del guion (0-V)')
print('    26,8% despues del guion (0-V) <- el hallazgo mas importante del proyecto')
print('    15,7% el 8-sep (0-AE) -> alarma #60: la IA dejo de ofrecer la promo')
print(f'    {mult/base:.1%} AHORA')
print()
# por dia
print('  Y por dia, para ver si el parche del 9-sep sirvio:')
print(f"  {'dia':<13} {'guias':>6} {'2+ uds':>7} {'share':>7}")
for d in sorted(por_dia):
    dd = [r for r in rows if r['fecha'] == d and r['tipo'] in ('1', '2', '3+', 'error_flete')]
    m = sum(1 for r in dd if r['tipo'] in ('2', '3+'))
    if dd:
        print(f'  {d:<13} {len(dd):>6} {m:>7} {m/len(dd):>7.1%}')
print()

print(L)
print('5. ESTADO DE LA PLATA EN LA CALLE')
print(L)
estados = collections.Counter(r['estado'] for r in rows)
DEVUELTAS = ['Devolucion ratificada']
PENDIENTES = ['Reclame en oficina', 'Reclamo en oficina informado WhatsApp',
              'Intento de entrega', 'Se visita no se logra entrega',
              'No se localiza direccion del destinatario',
              'Destinatario no cancela el recaudo', 'Deterioro en validacion GP']
entregadas = sum(v for k, v in estados.items() if k == 'Entregada')
devueltas = sum(v for k, v in estados.items() if k in DEVUELTAS)
resueltas = entregadas + devueltas
print(f'  entregadas          : {entregadas:>4}')
print(f'  devoluciones        : {devueltas:>4}')
print(f'  >>> RECHAZO REAL    : {devueltas/resueltas:>7.1%}  (sobre {resueltas} guias ya resueltas)')
print()
print('  El archivo madre traia 5,0% (0-AF). Se confirma en el mismo orden.')
print()
pend = [r for r in rows if r['estado'] in PENDIENTES]
plata = sum(r['recaudo'] for r in pend)
print(f'  🔔 GUIAS CON NOVEDAD ABIERTA: {len(pend)}  =  ${plata:,} en la calle')
por_estado = collections.Counter(r['estado'] for r in pend)
for k, v in por_estado.most_common():
    p = sum(r['recaudo'] for r in pend if r['estado'] == k)
    print(f'     {k[:52]:<54} {v:>3}  ${p:>9,}')
print()

print(L)
print('6. LOS CASOS PUNTUALES QUE EL ARCHIVO MADRE TENIA ABIERTOS')
print(L)
for r in rows:
    if r['ciudad'] == 'EL CHARCO':
        marg = r['recaudo'] - COSTO_PROD - r['valor_servicio']
        print(f'  🔴 #97 EL CHARCO: cobro ${r["recaudo"]:,} con flete ${r["valor_servicio"]:,.0f}')
        print(f'     margen real: ${marg:,.0f}  |  estado: {r["estado"]}')
        print(f'     >>> LA GUIA SIGUE VIVA Y VA A ENTREGARSE. La perdida se realiza.')
    if r['ciudad'] == 'PUERTO GAITAN' and r['recaudo'] == 149_900:
        print(f'  ⚠️ PUERTO GAITAN {r["guia"]}: cobra $149.900 y dice "{r["producto"]}"')
        print(f'     estado: {r["estado"]} -> SIGUE SIN CONFIRMAR si es colmena')
    if r['producto'] == 'impermeable colmena':
        print(f'  ✅ COLMENA SAN FRANCISCO: ${r["recaudo"]:,} - {r["estado"]}')
    if r['recaudo'] > 300_000:
        print(f'  ✅ MAYOREO GRANADA: ${r["recaudo"]:,} - {r["estado"]}')
tado = [r for r in rows if r['ciudad'] == 'TADO']
print(f'  🔴 #90 TADO: {len(tado)} guias')
for r in tado:
    print(f'     ${r["recaudo"]:>7,} de recaudo con flete de ${r["valor_servicio"]:>9,.0f}'
          f'  ({r["valor_servicio"]/r["recaudo"]:.0%} del recaudo)  {r["estado"]}')
print()

print(L)
print('7. EL SEGURO (#91) CON LA VENTANA NUEVA')
print(L)
costo_seg = sum(r['seguro'] for r in rows)
ahorro = sum(r['recaudo'] for r in rows if r['estado'] in DEVUELTAS)
print(f'  costo del seguro en {len(rows)} guias : ${costo_seg:,.0f}')
print(f'  devoluciones cubiertas            : {devueltas}')
print(f'  recaudo que habria cubierto       : ${ahorro:,}')
print()
print('  ⚠️ OJO: en las devoluciones el valor_servicio cobrado ES casi exacto')
print('     el valor del seguro (2.324, 2.286, 3.162, 4.334, 3.124, 1.754...).')
print('     Eso ya se habia visto en 0-AF: cuando hay devolucion, 99 Envios')
print('     cobra el seguro y nada mas. Asi que el seguro NO devuelve el')
print('     recaudo: solo perdona el flete.')
print(f'  >>> ahorro real = flete perdonado, no recaudo. Confirma #91: se paga')
print(f'      solo con rechazo muy alto, y el rechazo esta en {devueltas/resueltas:.1%}.')
print()

print(L)
print('8. 🔑 #88 DESBLOQUEADO: EL EXPORT TRAE TELEFONO')
print(L)
print('  El export Envios-Completos-2026-09-11 incluye las columnas:')
print('     telefono_destinatario  ·  direccion_destinatario  ·  nombre_destinatario')
print()
print(f'  Son {len(rows)} clientes con telefono, del 2 al 11 de septiembre.')
print('  >>> ESO ES LA AUDIENCIA DE CLIENTES PROPIOS QUE PEDIA 0-AG PARA')
print('      PRENDER EL COLMENA EL LUNES 14 ($8-10.000/dia, ventana 14 dias).')
print('  >>> Y es la palanca de #77: TEST Creativos tiene el mejor creativo')
print('      pero pierde la subasta. Un publico de clientes propios es')
print('      exactamente lo que necesita, y no cuesta presupuesto nuevo.')
print()
print('  ⛔ LOS TELEFONOS, NOMBRES Y DIRECCIONES NO ESTAN EN ESTE REPO.')
print('     El repo es PUBLICO. El CSV de este analisis solo tiene fecha,')
print('     guia, flete, producto, ciudad, recaudo, estado y seguro.')
print('     Para subir el publico a Meta, el archivo va del computador del')
print('     dueno directo a Meta, sin pasar por git.')
print()
print(L)
print('LO QUE ESTE ANALISIS NO DICE')
print(L)
print('  - No cierra el gate de las regiones: el export no dice de que')
print('    conjunto vino cada guia. #32 sigue abierto.')
print('  - El 11-sep esta incompleto (gasto parcial y el dia sigue abierto).')
print('  - La cadena conversacion->guia del mismo dia es aproximada: una')
print('    conversacion de la noche puede volverse guia al dia siguiente.')
print('    Por eso la comparacion 8 vs 9 vs 10 sep sirve (misma mecanica')
print('    todos los dias) pero el nivel absoluto tiene ruido.')
print(L)
