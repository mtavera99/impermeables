#!/usr/bin/env python3
"""
EL COLMENA DESPUES DE PAUSAR LA PAUTA · 2026-09-09
===================================================
Pregunta del dueno: "¿se puede vender o no? ¿que hacemos?"

Lo que 6 dias y ~$86.000 dejaron probado, separado en cuatro preguntas
distintas que se venian mezclando en una sola.
"""

L = '=' * 74

# --- lo medido ---
MARGEN_COLM   = 40_968      # real, 2 ventas con flete real (0-AE)
MARGEN_TRAD   = 31_634      # $26.900 x 1,176 uds
CIERRE_TRAD   = 0.084
CONV_DIA      = 160         # campana vieja, medido 8-9 sep (192 conv / 1,2 dias)
CPM_CUENTA    = 3_671
CPM_COLMENA   = 10_062
TASA_COLM     = 3.55        # conversaciones por mil impresiones
TASA_DOM      = 3.24
GASTO_PROBADO = 85_843
CONV_PROBADAS = 37
VENTAS_PROB   = 2

print(L)
print('1. CUATRO PREGUNTAS QUE SE VENIAN MEZCLANDO EN UNA')
print(L)
print('  Se decia "el colmena no funciona". Son cuatro cosas distintas y')
print('  TRES de las cuatro salieron BIEN:')
print()
print(f'  {"Pregunta":<38} {"Veredicto"}')
print(f'  {"─"*38} {"─"*30}')
print(f'  {"¿El producto interesa?":<38} '
      f'✅ SI — tasa {TASA_COLM} conv/mil contra {TASA_DOM} del tradicional')
print(f'  {"¿El precio deja plata?":<38} '
      f'✅ SI — ${MARGEN_COLM:,} contra ${MARGEN_TRAD:,} '
      f'(+{MARGEN_COLM/MARGEN_TRAD-1:.0%})')
print(f'  {"¿La conversacion cierra?":<38} '
      f'✅ SI — 5,4% contra 2,5% que necesitaria a CPM normal')
print(f'  {"¿Se puede COMPRAR el trafico?":<38} '
      f'🔴 NO — CPM ${CPM_COLMENA:,} = {CPM_COLMENA/CPM_CUENTA:.1f}x la cuenta')
print()
print('  🔑 EL PRODUCTO NO FRACASO. FRACASO EL CANAL.')
print('     Y es el unico de los cuatro que no se arregla con plata: se')
print(f'     intento 6 dias con ${GASTO_PROBADO:,} y el CPM subio cada dia')
print('     ($7.318 -> $8.990 -> $10.062).')
print()
print('  La cuenta que lo prueba: si el colmena pagara el CPM normal de la')
print(f'  cuenta (${CPM_CUENTA:,}), su conversacion costaria '
      f'${CPM_CUENTA/TASA_COLM:,.0f}')
print(f'  y con eso necesitaria cerrar {CPM_CUENTA/TASA_COLM/MARGEN_COLM:.1%}. '
      f'Cierra 5,4%. SERIA RENTABLE.')
print(f'  Pero paga ${CPM_COLMENA:,} y su conversacion cuesta '
      f'${CPM_COLMENA/TASA_COLM:,.0f}, que exige {CPM_COLMENA/TASA_COLM/MARGEN_COLM:.1%}.')
print()
print('  >>> ENTONCES LA REGLA ES: el colmena va donde el trafico NO se')
print('      compra en subasta abierta. Hay tres sitios asi.')
print()

print(L)
print('2. 🥇 CANAL 1 — DENTRO DE LA CONVERSACIÓN QUE YA ESTÁS PAGANDO')
print(L)
print('  Esta es la jugada. Y es GRATIS.')
print()
print(f'  Ya pagas ~{CONV_DIA} conversaciones al dia sobre el tradicional.')
print('  Ese trafico ya esta comprado. Si una parte de los que COMPRAN elige')
print('  el colmena en vez del tradicional, el colmena vende con pauta $0.')
print()
pedidos_dia = CONV_DIA * CIERRE_TRAD
delta = MARGEN_COLM - MARGEN_TRAD
print(f'  Pedidos/dia hoy        : {pedidos_dia:.1f}')
print(f'  Margen tradicional     : ${MARGEN_TRAD:,}')
print(f'  Margen colmena         : ${MARGEN_COLM:,}')
print(f'  DIFERENCIA por pedido  : ${delta:,}  <- esto es lo que ganas por cambiarlo')
print()
print(f'  {"Si eligen colmena...":<22} {"colmenas/dia":>13} {"extra/dia":>12} {"extra/mes":>13}')
for pct in (0.05, 0.10, 0.15, 0.20):
    n = pedidos_dia * pct
    print(f'  {pct:>19.0%}    {n:>13.2f} {n*delta:>12,.0f} {n*delta*30:>13,.0f}')
print()
print('  🔑 COMPARALO CON LO QUE LA PAUTA LOGRO:')
print(f'     La campana pagada: {VENTAS_PROB} ventas en 6 dias = '
      f'{VENTAS_PROB/6:.2f} colmenas/dia, gastando ~$24.000/dia.')
print(f'     El upsell al 5%  : {pedidos_dia*0.05:.2f} colmenas/dia, gastando $0.')
print(f'     >>> {pedidos_dia*0.05/(VENTAS_PROB/6):.1f}x MAS VENTAS DE COLMENA, SIN PAUTA.')
print()
print('  ⚠️  EL RIESGO, Y HAY QUE MEDIRLO: si al ofrecerlo se ESPANTA alguien')
print('     que iba a comprar el tradicional, perdes todo su margen.')
perdida = MARGEN_TRAD
print(f'     Cada venta perdida cuesta ${perdida:,}.')
print(f'     Cada sustitucion gana ${delta:,}.')
print(f'     >>> Hacen falta {perdida/delta:.1f} sustituciones para pagar 1 venta')
print(f'         perdida. Si el ofrecimiento mata mas de 1 de cada '
      f'{perdida/delta+1:.1f} ventas, va en contra.')
print()
print('  📌 POR ESO LA REGLA ES "OFRECER CON SEÑAL, NUNCA EMPUJAR":')
print('     · SI cuando el cliente pregunta por durabilidad, o dice que el')
print('       anterior se le rompio, o menciona carretera / intermunicipal /')
print('       viajes largos, o pregunta si hay algo mejor')
print('     · NUNCA cuando el cliente objeto el precio. Ahi el colmena')
print('       lo remata.')
print('     · NUNCA antes de que haya decidido comprar el tradicional. Primero')
print('       se asegura la venta barata, despues se ofrece el upgrade.')
print('     · UNA sola vez. Si dice no, se sigue con el tradicional sin insistir.')
print()

print(L)
print('3. 🥈 CANAL 2 — LOS QUE YA TE COMPRARON')
print(L)
print('  Es el cliente perfecto del colmena y esta escrito desde el 4-sep')
print('  (Paso 3 de 0-AC), sin ejecutar.')
print()
print('  Por que encaja tan bien:')
print('    · Ya te pagaron en efectivo en la puerta -> confianza resuelta,')
print('      que era la fuga #3 de las 37 conversaciones perdidas')
print('    · Ya tienen un impermeable barato -> el argumento del colmena es')
print('      exactamente "cuando ese se te abra, este no te vuelve a pasar"')
print('    · Son motociclistas confirmados, no publico parecido')
print()
CONTACTOS = 300
for tasa in (0.02, 0.03, 0.05):
    print(f'    {CONTACTOS} contactos x {tasa:.0%} = {CONTACTOS*tasa:.0f} ventas '
          f'= ${CONTACTOS*tasa*MARGEN_COLM:,.0f}')
print()
print('  🔑 Y aca el CPM alto NO importa igual, porque lo que cambia es el')
print('     DENOMINADOR: un publico tibio convierte mucho mejor por impresion.')
print('     El costo por conversacion baja aunque el CPM suba.')
print()
print('  🔴🔴 PERO HAY UNA FORMA CORRECTA Y UNA QUE PUEDE COSTARTE EL NEGOCIO:')
print('     ✅ AUDIENCIA PERSONALIZADA DE META (subir la lista de telefonos')
print('        como audiencia y pautarle a ella).')
print('     ⛔ NUNCA escribirles por WhatsApp uno por uno. Mensajes no')
print('        solicitados = reportes = numero bloqueado. Y ese numero ES el')
print('        canal de ventas completo. No vale el riesgo por $368.000.')
print()

print(L)
print('4. 🥉 CANAL 3 — TIKTOK ORGÁNICO (CPM = $0)')
print(L)
print('  El colmena es un producto VISUAL: 3 piezas, los zapatones, y el')
print('  gancho de que "no parece impermeable, parece sudadera".')
print('  Eso se muestra en video mejor que en una foto de feed.')
print()
print('  Ya existe en el repo: TIKTOK-GUIONES-Y-SETUP.md y carrusel-colmena.html.')
print('  🔑 Y lo mas importante: en organico el CPM es CERO, que es justo')
print('     el unico problema que tiene el colmena.')
print()
print('  ⚠️ Es el mas lento de los tres y el menos predecible. No lo pongas')
print('     primero. Pero es el unico que puede escalar sin pauta.')
print()

print(L)
print('5. ⛔ LO QUE NO SE VUELVE A HACER')
print(L)
print(f'  · NO volver a pautar el colmena en subasta abierta. Esta pagado con')
print(f'    ${GASTO_PROBADO:,} y {CONV_PROBADAS} conversaciones de evidencia.')
print('  · NO bajarle el precio. Su margen es el 30% mayor del negocio y el')
print('    precio nunca fue el problema (solo 1 de las 5 fugas era precio).')
print('  · NO ponerle mas presupuesto "para que arranque". El CPM subio')
print('    justamente mientras mas se le metia.')
print('  · NO meterlo de vuelta en la campana vieja: ahi empezo ahogado a')
print('    41 impresiones (#83).')
print()

print(L)
print('6. EL PLAN, EN ORDEN')
print(L)
print('  PASO 1 (esta semana, gratis) — el upsell en la conversacion.')
print('    Agregar al guion el bloque de "cuando ofrecer el colmena", con las')
print('    reglas de senal. Es un pegado de 5 minutos.')
print(f'    Meta realista: 5-10% de los pedidos -> ${pedidos_dia*0.075*delta*30:,.0f}/mes.')
print()
print('  PASO 2 (cuando el upsell tenga 2 semanas) — audiencia personalizada.')
print('    Exportar los telefonos de clientes, subirlos como audiencia en')
print('    Meta, y pautarle SOLO a ella con el angulo "no te vuelve a pasar".')
print('    Presupuesto chico: $8.000-10.000/dia, no $20.000.')
print()
print('  PASO 3 (paralelo, sin prisa) — TikTok organico.')
print()
print('  📊 COMO SE MIDE EL PASO 1: contar cuantos pedidos del dia son colmena')
print('     y cuantos tradicional. Es una columna en la hoja manual (#81).')
print('     Sin eso no se sabe si funciono.')
print()
print(L)
print('7. LA RESPUESTA CORTA')
print(L)
print('  ¿Se puede vender el colmena?  SI.')
print('  ¿Se puede vender con pauta?   NO, y ya esta probado.')
print('  ¿Que se hace?                 Se vende dentro de las conversaciones')
print('                                que ya pagas para el tradicional.')
print(f'  ¿Cuanto vale eso?             ${pedidos_dia*0.075*delta*30:,.0f}/mes al 7,5%, con pauta $0.')
print('  ¿Que se deja de hacer?        Comprarle trafico en subasta abierta.')
