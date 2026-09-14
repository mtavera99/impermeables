#!/usr/bin/env python3
"""
EL REZAGO DE LAS DEVOLUCIONES, Y POR QUE LA PLATAFORMA DICE 16% (2026-09-12)
=============================================================================
El dueno dijo tres cosas y las tres son correctas:

 1. "muchas devoluciones en teoria son pasadas y llegan y se suman ahora"
    -> SI. Y eso TUMBA mi conclusion de que la tasa venia bajando.
 2. "la plataforma cuenta el 16% sobre las entregas, no sobre todo lo subido"
    -> SI. Hay tres denominadores posibles y dan tres numeros distintos.
 3. "¿cuanto es el porcentaje de devolucion de Coordinadora?"
    -> No se puede saber todavia, y aca esta el calculo de por que.

DATO NUEVO: la fecha_actualizacion de cada devolucion, que permite medir
CUANTOS DIAS TARDA una devolucion en ratificarse. Sin eso, cualquier
comparacion por cohorte esta sesgada.
"""

import collections

L = '=' * 78

# (fecha_envio, dias hasta que se ratifico la devolucion, ciudad, transportadora)
# Extraido del export del 12-sep cruzando fecha_envio con fecha_actualizacion
DEV = [
    ('2026-09-07', 4, 'IBAGUE', 'inter'), ('2026-09-07', 4, 'TOCANCIPA', 'inter'),
    ('2026-09-04', 8, 'APARTADO', 'inter'), ('2026-09-04', 7, 'FLORIDABLANCA', 'inter'),
    ('2026-09-04', 3, 'PALMAR DE VARELA', 'inter'), ('2026-09-03', 4, 'BARRANQUILLA', 'inter'),
    ('2026-09-02', 10, 'CHINCHINA', 'inter'), ('2026-09-02', 5, 'BOGOTA', 'inter'),
    ('2026-09-02', 9, 'CARTAGENA', 'inter'), ('2026-08-31', 8, 'MEDELLIN', 'servi'),
    ('2026-08-31', 11, 'MAJAGUAL', 'inter'), ('2026-08-31', 12, 'SAMACA', 'inter'),
    ('2026-08-28', 7, 'BOGOTA', 'inter'), ('2026-08-27', 13, 'BUENAVENTURA', 'servi'),
    ('2026-08-26', 12, 'PEREIRA', 'servi'), ('2026-08-26', 13, 'CERETE', 'inter'),
    ('2026-08-24', 14, 'SOLEDAD', 'servi'), ('2026-08-24', 10, 'SAN ESTANISLAO', 'inter'),
    ('2026-08-24', 3, 'CHIA', 'inter'), ('2026-08-24', 16, 'CAJICA', 'inter'),
    ('2026-08-24', 10, 'PUERTO ASIS', 'inter'), ('2026-08-24', 8, 'GUARNE', 'inter'),
    ('2026-08-21', 7, 'BOGOTA', 'inter'), ('2026-08-21', 10, 'LA MONTANITA', 'inter'),
    ('2026-08-21', 6, 'EL CERRITO', 'inter'), ('2026-08-20', 15, 'MEDELLIN', 'servi'),
    ('2026-08-20', 12, 'BOGOTA', 'coord'), ('2026-08-20', 13, 'CARTAGENA', 'servi'),
    ('2026-08-20', 20, 'PARATEBUENO', 'inter'), ('2026-08-20', 12, 'MEDELLIN', 'servi'),
    ('2026-08-19', 8, 'SANTIAGO DE TOLU', 'inter'),
    ('2026-08-19', 12, 'SAN ANDRES DE SOTAVENTO', 'inter'),
    ('2026-08-19', 21, 'CARTAGENA', 'inter'), ('2026-08-19', 19, 'HISPANIA', 'inter'),
    ('2026-08-18', 24, 'CAUCASIA', 'servi'), ('2026-08-18', 6, 'TURBO', 'inter'),
    ('2026-08-18', 14, 'BARRANCABERMEJA', 'servi'), ('2026-08-18', 21, 'ANSERMA', 'inter'),
    ('2026-08-18', 21, 'ZIPAQUIRA', 'inter'), ('2026-08-18', 2, 'BOGOTA', 'inter'),
    ('2026-08-18', 21, 'LLORENTE', 'inter'), ('2026-08-18', 10, 'SAN GIL', 'inter'),
    ('2026-08-14', 4, 'BOGOTA', 'inter'), ('2026-08-13', 6, 'BOGOTA', 'inter'),
    ('2026-08-13', 5, 'SANTA MARTA', 'inter'), ('2026-08-10', 9, 'CARTAGENA', 'inter'),
]

# guias totales por cohorte (del export, tradicional + todo)
COHORTES = [
    ('10 al 21-ago', '2026-08-10', '2026-08-21', 101, 33),   # nombre, desde, hasta, guias, edad del mas nuevo
    ('24 al 31-ago', '2026-08-24', '2026-08-31', 94, 12),
    ('2 al 11-sep', '2026-09-02', '2026-09-11', 154, 1),
]

print(L)
print('1. 🔑 CUANTO TARDA UNA DEVOLUCION EN APARECER')
print(L)
lags = sorted(d[1] for d in DEV)
print(f'  {len(lags)} devoluciones medidas, desde el despacho hasta que se ratifica:')
print()
print(f'    minimo   : {lags[0]:>2} dias')
print(f'    mediana  : {lags[len(lags)//2]:>2} dias')
print(f'    promedio : {sum(lags)/len(lags):>4.1f} dias')
print(f'    maximo   : {lags[-1]:>2} dias')
print()
for corte in (7, 10, 14, 21):
    n = sum(1 for x in lags if x <= corte)
    print(f'    a los {corte:>2} dias ya aparecio el {n/len(lags):>5.0%} de las devoluciones')
print()
print('  🔴 ESTO ES LO QUE TUMBA MI CONCLUSION DE AYER.')
print('     Yo dije "la tasa baja: 25,5% -> 15,1% -> 10,3%". Pero esas tasas')
print('     son por FECHA DE DESPACHO, y una guia de hace 3 dias todavia no')
print('     tuvo tiempo de devolverse. El cohorte de septiembre esta a mitad')
print('     de cocción. Comparar cohortes de distinta edad es el mismo error')
print('     de ventana censurada, por cuarta vez hoy.')
print()

print(L)
print('2. LA MISMA TABLA, PERO HONESTA: ¿CUANTO LE FALTA A CADA COHORTE?')
print(L)
madurez = {7: 0.0, 10: 0.0, 14: 0.0, 21: 0.0}
for c in madurez:
    madurez[c] = sum(1 for x in lags if x <= c) / len(lags)
print(f"  {'cohorte':<15}{'guias':>6}{'edad del mas nuevo':>20}{'% de devol. ya visible':>24}")
for nom, a, b, n, edad in COHORTES:
    if edad >= 21:
        vis = 1.0
    elif edad >= 14:
        vis = madurez[14] + (madurez[21] - madurez[14]) * (edad - 14) / 7
    elif edad >= 10:
        vis = madurez[10] + (madurez[14] - madurez[10]) * (edad - 10) / 4
    else:
        vis = madurez[7] * edad / 7
    print(f'  {nom:<15}{n:>6}{str(edad)+" dias":>20}{vis:>23.0%}')
print()
print('  >>> El cohorte de septiembre tiene guias de 1 dia. Su tasa real va a')
print('      SUBIR bastante en las proximas 2-3 semanas. El 10,3% no es una')
print('      mejora: es un numero incompleto.')
print()

print(L)
print('3. ✅ LA COMPARACION QUE SI SIRVE: TASA A UNA EDAD FIJA')
print(L)
print('  Se cuentan solo las devoluciones que aparecieron dentro de los primeros')
print('  N dias, sobre TODAS las guias del cohorte. Asi los cohortes se comparan')
print('  a la MISMA edad. Un cohorte solo entra si ya cumplio esos N dias.')
print()
res = {}
for corte in (10, 14):
    print(f'  --- TASA A {corte} DIAS ---')
    print(f"  {'cohorte':<15}{'guias':>6}{'devol.':>8}{'TASA':>9}")
    for nom, a, b, n, edad in COHORTES:
        if edad < corte:
            print(f'  {nom:<15}{n:>6}{"—":>8}{"aun no":>9}')
            continue
        d = sum(1 for f, lag, _, _ in DEV if a <= f <= b and lag <= corte)
        res[(nom, corte)] = d / n
        print(f'  {nom:<15}{n:>6}{d:>8}{d/n:>8.1%}')
    print()
a10 = res.get(('10 al 21-ago', 10))
b10 = res.get(('24 al 31-ago', 10))
if a10 and b10:
    print(f'  🔑 A 10 DIAS, QUE ES DONDE SE PUEDEN COMPARAR LOS DOS COHORTES DE AGOSTO:')
    print(f'     {a10:.1%}  ->  {b10:.1%}   =  una mejora real del {1-b10/a10:.0%}')
    print()
    print('  >>> LA MEJORA EXISTE Y ESTA MEDIDA BIEN. Pero es entre los dos')
    print('      cohortes de AGOSTO. De septiembre no se sabe nada todavia:')
    print('      hay que esperar al 22-sep para medirlo a 10 dias completos.')
print()

print(L)
print('4. 💡 POR QUE LA PLATAFORMA DICE 16%: SON TRES DENOMINADORES DISTINTOS')
print(L)
TOT, ENTREG, DEVUELT = 349, 221, 46
print(f'  De las {TOT} guias del export: {ENTREG} entregadas, {DEVUELT} devueltas,')
print(f'  {TOT-ENTREG-DEVUELT} todavia abiertas (en transito o con novedad).')
print()
print(f"  {'como se calcula':<44}{'resultado':>10}   que mide")
print(f'  {"devoluciones / ENTREGAS":<44}{DEVUELT/ENTREG:>9.1%}   infla: el que devuelve no entrega')
print(f'  {"devoluciones / RESUELTAS (entreg+devuel)":<44}{DEVUELT/(ENTREG+DEVUELT):>9.1%}   ⬅ la tasa de resultado REAL')
print(f'  {"devoluciones / TODO LO SUBIDO":<44}{DEVUELT/TOT:>9.1%}   subestima: mete lo que va en camino')
print()
print(f'  🎯 EL 16% DE LA PLATAFORMA CAE ENTRE {DEVUELT/TOT:.1%} Y {DEVUELT/ENTREG:.1%}, y lo mas')
print(f'     cerca esta de {DEVUELT/(ENTREG+DEVUELT):.1%} (sobre resueltas). No puedo decir con')
print('     certeza cual formula usan: depende tambien de que ventana de fechas')
print('     tomen. Lo que SI es seguro es que su numero NO es "devoluciones')
print('     sobre todo lo subido", porque ese da mas bajo.')
print()
print('  📌 PARA CUADRARLO EXACTO habria que preguntarles dos cosas:')
print('     (a) ¿el denominador son entregas, resueltas o todo lo subido?')
print('     (b) ¿que rango de fechas toma ese 16%?')
print()
print('  📌 Y tenes razon en lo otro: ese 16% mezcla despachos de hace un mes')
print('     con los de ayer. Es un acumulado historico, no "como voy hoy".')
print()

print(L)
print('5. ❓ COORDINADORA: EL NUMERO QUE PEDISTE, Y POR QUE NO ALCANZA')
print(L)
print('  Coordinadora en toda la ventana: 42 guias.')
print('    entregadas : 11')
print('    devueltas  :  1   (Bogota, 20-ago, "Cerrado por incidencia")')
print('    resueltas  : 12')
print('    abiertas   : 30   (18 con novedad, 12 en transito normal)')
print()
p = 1 / 12
print(f'  TASA OBSERVADA: 1 de 12 = {p:.1%}')
print()
# intervalo de confianza binomial (Wilson, 95%)
import math
n = 12
z = 1.96
c = (p + z*z/(2*n)) / (1 + z*z/n)
h = z * math.sqrt(p*(1-p)/n + z*z/(4*n*n)) / (1 + z*z/n)
print(f'  INTERVALO DE CONFIANZA 95%: entre {max(0,c-h):.1%} y {c+h:.1%}')
print()
print('  🔴 ESE INTERVALO ES TAN ANCHO QUE NO SIRVE PARA DECIDIR NADA.')
print('     Con 12 guias resueltas, la tasa real de Coordinadora podria ser')
print(f'     {max(0,c-h):.0%} (excelente) o {c+h:.0%} (desastrosa) y los datos no distinguen.')
print()
print('  ¿CUANTAS GUIAS HACEN FALTA? Para saber si Coordinadora esta arriba o')
print('  abajo del 13% del negocio con confianza razonable:')
for objetivo in (30, 50, 80):
    hh = z * math.sqrt(0.13*0.87/objetivo)
    print(f'     con {objetivo:>2} guias resueltas -> margen de error ±{hh:.0%}')
print()
print('  >>> Con ~50 guias resueltas ya se puede decidir. Coordinadora tiene 12.')
print('      A 7 guias por dia le faltan unos 10-14 dias. VEREDICTO: fin de mes.')
print()

print(L)
print('6. 🔍 LO QUE SI SE PUEDE VER DE COORDINADORA HOY (y no es la devolucion)')
print(L)
print('  Coordinadora tiene 18 novedades abiertas de 42 guias. Miremos DE QUE')
print('  TIPO son, porque el tipo dice de quien es la culpa:')
print()
TIPOS = [
    ('Unidad en lugar diferente a terminal destino', 6, 'ERROR DE LA TRANSPORTADORA'),
    ('Se visita, no se logra entrega', 5, 'cliente no estaba / no contesta'),
    ('No se localiza direccion del destinatario', 4, 'DIRECCION MALA (del chat)'),
    ('No cancela el recaudo', 2, 'cliente sin plata / se arrepintio'),
    ('Deterioro en validacion', 1, 'ERROR DE LA TRANSPORTADORA'),
]
for t, n, culpa in TIPOS:
    print(f'    {n:>2}  {t[:46]:<48} {culpa}')
print()
print('  🔑 6 de 18 son "unidad en lugar diferente al terminal destino": eso es')
print('     que Coordinadora mando el paquete a la bodega equivocada. ESO SI ES')
print('     CULPA DE LA TRANSPORTADORA y es la señal mas fuerte contra ella.')
print('     Otras 4 son direccion mala, que es culpa del guion, no de ellos.')
print()
print('  >>> ASI QUE TU SOSPECHA TIENE UN FUNDAMENTO CONCRETO, pero no esta')
print('      en la devolucion: esta en el ENRUTAMIENTO. 6 paquetes mal')
print('      enrutados en 42 guias = 14%. Eso hay que reclamarlo.')
print()

print(L)
print('7. 🟢 Y SOBRE SERVIENTREGA EN ANTIOQUIA: TU MEMORIA ES CORRECTA')
print(L)
print('  Servientrega en MEDELLIN: 15 guias, 3 devoluciones de 13 resueltas = 23%')
print('  Y las 3 son "ENTREGADO A REMITENTE", que es su forma de decir')
print('  "me lo devolvi al remitente".')
print()
print('  Interrapidisimo en Medellin: 2 guias, 0 devoluciones')
print('  Coordinadora en Medellin  : 3 guias, 0 de 1 resuelta, 2 novedades')
print()
print('  📌 El archivo madre ya lo tenia (0-AA): Servientrega tenia 58,3% de')
print('     atasco contra 2,6% de Interrapidisimo AL MISMO FLETE, y por eso se')
print('     dejo de usar el 31-ago. Los datos de este export lo confirman.')
print('     >>> Esa decision estuvo bien tomada. No volver a Servientrega.')
print(L)
