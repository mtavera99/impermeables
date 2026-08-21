"""¿PUEDEN LAS "CONVERSACIONES VACIAS" EXPLICAR TODA LA CAIDA DEL CIERRE?

CONTEXTO (2026-08-14):
El dueño confirma que hay MUCHISIMOS chats donde la persona nunca escribio
nada: solo se dispara el mensaje prerrellenado del boton del anuncio
("¡Hola! Quiero mas informacion.") y ahi muere.

⚠️ Y aclara algo que invalida el analisis anterior: los 47 chats que mando
   los ELIGIO por tener informacion, justamente NO mando los vacios.
   Entonces el "solo 6% son vacios" que salio en la seccion 0-J es
   PURO ARTEFACTO DE SELECCION. La hipotesis nunca fue refutada: se testeo
   con la muestra equivocada, sabiendolo. Vuelve a estar viva.

LO QUE HACE ESTE SCRIPT:
No mide nada nuevo (falta el dato). Calcula cuanto tendria que valer el
% de conversaciones vacias para que la caida del cierre quede explicada
SIN que nada del negocio se haya roto.
"""

CONV_DIA = 84.9          # conversaciones/dia, estable (Meta 5-14 ago)
DIAS_VALLE = 5           # 10-14 ago
VENTAS_VALLE = 26        # guias de 99 Envios
CIERRE_PICO = 0.13       # ~13% en 5-10 ago (el pico documentado)
GASTO_DIA = 48585        # $/dia (Meta, 10 dias)
MARGEN = 24433

conv_valle = CONV_DIA * DIAS_VALLE
cierre_crudo = VENTAS_VALLE / conv_valle

print('=' * 68)
print('1. EL PROBLEMA CON LA METRICA DE "CIERRE"')
print('=' * 68)
print(f'  Conversaciones en 10-14 ago (est.) : {conv_valle:.0f}')
print(f'  Ventas                             : {VENTAS_VALLE}')
print(f'  Cierre CRUDO                       : {cierre_crudo*100:.1f}%')
print()
print('  Pero el denominador NO son conversaciones: son "inicios de')
print('  conversacion" de Meta. Un toque en el boton del anuncio ya cuenta,')
print('  aunque la persona no escriba una sola palabra propia.')
print()
print('  >>> Si el % de vacios cambia, el "cierre" cambia SIN que nada del')
print('      negocio haya cambiado. Es un problema de MEZCLA, no de venta.')

print()
print('=' * 68)
print('2. CIERRE REAL SEGUN CUANTOS SEAN VACIOS (ventana 10-14 ago)')
print('=' * 68)
print(f'  {"% vacios":>9} {"conv. reales":>13} {"cierre real":>12}   lectura')
for v in (0, 0.20, 0.40, 0.50, 0.60, 0.70):
    reales = conv_valle * (1 - v)
    cr = VENTAS_VALLE / reales
    lec = ''
    if cr >= CIERRE_PICO:
        lec = '<-- iguala o supera el pico'
    elif cr >= 0.102:
        lec = '<-- nivel de 1-4 ago'
    print(f'  {v*100:>8.0f}% {reales:>13.0f} {cr*100:>11.1f}%   {lec}')

print()
print('=' * 68)
print('3. ¿CUANTO TENDRIA QUE HABER CAMBIADO LA MEZCLA?')
print('=' * 68)
print('  Supongamos que en el PICO (5-10 ago) tambien habia vacios, pero menos.')
print()
print(f'  {"vacios en el pico":>18} {"cierre real del pico":>21} {"vacios que harian falta en el valle":>37}')
for vp in (0.20, 0.25, 0.30, 0.40):
    cr_pico = CIERRE_PICO / (1 - vp)
    necesario = 1 - (cierre_crudo / cr_pico)
    print(f'  {vp*100:>17.0f}% {cr_pico*100:>20.1f}% {necesario*100:>36.0f}%')
print()
print('  Lectura: si en el pico ~25% eran vacios y en el valle subieron a ~65%,')
print('  LA CAIDA DEL 13% AL 6,1% QUEDA EXPLICADA COMPLETA, sin que se haya')
print('  roto nada: ni la IA, ni el guion, ni el clima, ni la quincena.')
print('  ⚠️ Es un cambio de mezcla GRANDE. Hay que medirlo, no asumirlo.')

print()
print('=' * 68)
print('4. POR QUE ESTA HIPOTESIS EXPLICA LO QUE LAS OTRAS NO')
print('=' * 68)
obs = [
    ('El volumen de conversaciones NO cayo (84,9/dia)',
     'Meta sigue entregando la misma cantidad de "inicios"'),
    ('El cierre se cayo a la mitad',
     'cambio la COMPOSICION: mas toques vacios, misma gente real'),
    ('El costo/conversacion subio 11,8% ($512 -> $572)',
     'se paga mas por trafico de peor calidad'),
    ('El CTR bajo (1,78% -> 1,63%) y el CPC subio',
     'publico mas amplio = menos calificado'),
    ('El clic->chat cayo 53% -> 43%',
     'YA ESTABA DOCUMENTADO y apunta al mismo lado'),
    ('Nada en la operacion parece roto',
     'porque nada esta roto'),
]
for o, e in obs:
    print(f'  • {o}')
    print(f'      -> {e}')
print()
print('  🔑 EL MECANISMO YA ESTA ESCRITO EN EL ARCHIVO (seccion 0 y 11):')
print('     "Meta salio a publicos mas amplios (alcance 18.362 -> 52.074 ->')
print('      69.469) y al ir mas lejos entra gente menos calificada."')
print('     Se documento como algo "normal al escalar y no grave".')
print('     >>> Pero si eso llena el embudo de toques vacios, SI es grave:')
print('         es exactamente el mecanismo que tumba el cierre.')

print()
print('=' * 68)
print('5. LO QUE CAMBIA SI SE CONFIRMA')
print('=' * 68)
print('  (a) El CPA hay que medirlo por CONVERSACION REAL, no por "inicio".')
for v in (0.40, 0.60):
    print(f'      con {v*100:.0f}% vacios: costo por conversacion REAL = '
          f'${GASTO_DIA/(CONV_DIA*(1-v)):,.0f} (no $572)')
print()
print('  (b) El problema NO esta despues del clic: esta EN EL CLIC.')
print('      Volveria a ser un problema de Meta, no de cierre.')
print('  (c) El arreglo NO es tocar el guion ni la IA, es la SEGMENTACION:')
print('      acotar publico, o cambiar el evento de optimizacion para que')
print('      Meta no compre toques baratos que no conversan.')
print('  (d) Las hipotesis (A) quincena, (C) clima y (D) horas del dueño')
print('      pasan a segundo plano: ninguna explica el volumen estable.')

print()
print('=' * 68)
print('6. COMO MEDIRLO BARATO (sin exportar 800 chats)')
print('=' * 68)
print('  Un chat vacio tiene una firma visual clara en la lista de WhatsApp:')
print('  el ULTIMO mensaje es uno de los seguimientos automaticos del negocio')
print('  ("¿Te resuelvo alguna duda...", "Aun tengo tu color disponible").')
print('  El cliente nunca aparece como autor del ultimo mensaje.')
print()
print('  OPCION 1 (la mas rigurosa, mismo trabajo que la tanda anterior):')
print('    exportar ~40 chats por RECENCIA PURA, sin mirar el contenido.')
print('    Al no elegirlos, la tasa que salga es limpia.')
print()
print('  OPCION 2 (5 minutos, sin exportar nada):')
print('    contar en la lista de chats, para un rango de fechas, cuantos')
print('    tienen como ultimo mensaje un seguimiento automatico.')
print('    Un conteo aproximado ya sirve: la diferencia entre 20% y 60%')
print('    se ve a simple vista y decide el diagnostico.')
print()
print('  OPCION 3 (la definitiva, a futuro):')
print('    conectar la Cloud API -> queda registrado automaticamente y esta')
print('    metrica se calcula sola todos los dias.')
