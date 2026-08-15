"""MEDICION REAL DE CONVERSACIONES VACIAS — 14 de agosto de 2026

Conteo hecho por el dueño el 15-ago sobre el dia anterior:
    90 conversaciones entraron
    52 solo mandaron el mensaje prerrellenado del anuncio  (VACIAS)
    38 fueron conversaciones de verdad

⚠️ POR QUE SOLO UN DIA: el dueño hace seguimiento/remarketing manual al dia
   siguiente y a los dos dias, asi que en la lista de WhatsApp un mismo dia
   acumula hasta ~300 mensajes que MEZCLAN conversaciones nuevas con su propio
   seguimiento a chats viejos. Reconstruir "que entro tal dia" hacia atras es
   impracticable. El 14-ago si se pudo porque es el mas reciente.
   >>> ESO ES UN HALLAZGO APARTE, ver seccion 5 de este script.
"""

CONV = 90
VACIAS = 52
REALES = 38

CONV_DIA_META = 84.9      # promedio Meta 5-14 ago
GASTO_DIA = 48585         # $/dia
GUIAS_14AGO = 4           # guias despachadas el 14-ago
CIERRE_PICO = 0.13        # ~13% en 5-10 ago (crudo, sobre "inicios")
VENTAS_VALLE, CONV_VALLE = 26, 424.5
MARGEN = 24433

tasa_vacia = VACIAS / CONV

print('=' * 68)
print('1. EL DATO, Y UNA VALIDACION IMPORTANTE')
print('=' * 68)
print(f'  Conversaciones el 14-ago      : {CONV}')
print(f'  Vacias (solo toque de boton)  : {VACIAS}  ({tasa_vacia*100:.1f}%)')
print(f'  Reales                        : {REALES}  ({REALES/CONV*100:.1f}%)')
print()
print(f'  Promedio que reporta Meta     : {CONV_DIA_META:.1f}/dia')
print(f'  Lo que conto el dueño         : {CONV}/dia  '
      f'({CONV/CONV_DIA_META*100-100:+.0f}%)')
print()
print('  ✅ VALIDACION CLAVE: los dos numeros coinciden. Eso significa que el')
print('     conteo manual mide LO MISMO que Meta llama "conversacion iniciada".')
print('     Por lo tanto el 57,8% se puede aplicar legitimamente al denominador')
print('     de Meta. No son dos cosas distintas.')

print()
print('=' * 68)
print('2. ✅ LO QUE ESTE DATO SI DEMUESTRA')
print('=' * 68)
print(f'  El fenomeno es GRANDE: {tasa_vacia*100:.0f}% no es marginal, es mayoria.')
print()
print('  (a) EL COSTO POR CONVERSACION ESTA MAL MEDIDO:')
print(f'      costo por "inicio"            : ${GASTO_DIA/CONV:,.0f}')
print(f'      costo por conversacion REAL   : ${GASTO_DIA/REALES:,.0f}')
print(f'      correccion                    : x{(GASTO_DIA/REALES)/(GASTO_DIA/CONV):.1f}')
print()
print('  (b) CUANTO GASTO NO PRODUCE NADA MEDIBLE:')
gasto_vacio = VACIAS * (GASTO_DIA / CONV)
print(f'      {VACIAS} toques x ${GASTO_DIA/CONV:,.0f} = ${gasto_vacio:,.0f} el 14-ago')
print(f'      proyectado al mes            : ${gasto_vacio*30:,.0f}')
print('      ⚠️ No es "plata tirada" (algo de eso es inevitable en el canal),')
print('         pero SI es el margen de mejora si se acota la segmentacion.')
print(f'      Bajar los vacios de {tasa_vacia*100:.0f}% a 40% recuperaria '
      f'${(tasa_vacia-0.40)*CONV*(GASTO_DIA/CONV)*30:,.0f}/mes de gasto efectivo.')
print()
print('  (c) EL CIERRE SOBRE GENTE REAL ES MUCHO MEJOR DE LO QUE PARECIA:')
print(f'      cierre crudo del 14-ago      : {GUIAS_14AGO/CONV*100:.1f}%  '
      f'({GUIAS_14AGO} guias / {CONV})')
print(f'      cierre sobre reales          : {GUIAS_14AGO/REALES*100:.1f}%  '
      f'({GUIAS_14AGO} guias / {REALES})')
print('      ⚠️ Con la salvedad del punto 5 (las ventas de un dia no salen')
print('         solo de las conversaciones de ese dia).')

print()
print('=' * 68)
print('3. 🚨 LO QUE ESTE DATO **NO** DEMUESTRA — Y ES JUSTO LO QUE BUSCABAMOS')
print('=' * 68)
print('  La pregunta era: ¿SUBIO la proporcion de vacios entre el pico y el valle?')
print('  Para eso hacen falta DOS mediciones. Hay UNA.')
print()
print('  Si la tasa de vacios fuera la MISMA en las dos ventanas:')
r = 1 - tasa_vacia
print(f'      cierre real en el valle : {VENTAS_VALLE/(CONV_VALLE*r)*100:.1f}%')
print(f'      cierre real en el pico  : {CIERRE_PICO/r*100:.1f}%')
print('      -> los dos suben, pero LA CAIDA SIGUE INTACTA.')
print()
print('  >>> UNA TASA CONSTANTE NO EXPLICA UNA CAIDA. Solo un CAMBIO la explica.')
print('      El 57,8% arregla como se MIDE el negocio, pero por si solo NO')
print('      resuelve por que el cierre se partio al medio.')
print()
print('  ⚠️ Y el "tomemoslo como el peor dia" no se puede usar como atajo: si')
print('     14-ago fuera el peor, eso APOYARIA la hipotesis, pero suponerlo es')
print('     exactamente el error que ya se cometio dos veces en este proyecto.')
print('     Hay que medir la otra ventana, no asumirla.')

print()
print('=' * 68)
print('4. COMO CONSEGUIR LA SEGUNDA MEDICION (sin pelear con el apelmazamiento)')
print('=' * 68)
print('  El problema del dueño es reconstruir "que entro tal dia" hacia atras.')
print('  Pero para contar vacios NO hace falta saber cuando entro por la lista:')
print()
print('  🔑 UN CHAT VACIO NO TIENE NI UN MENSAJE DEL CLIENTE, NUNCA.')
print('     Entonces al abrirlo se ve completo en una pantalla, y la fecha del')
print('     primer mensaje dice de que dia es. No hay nada que desapelmazar:')
print('     un chat vacio no pudo recibir remarketing conversado.')
print()
print('  OPCION A (retro, ~20 min): buscar en la lista los chats cuyo ultimo')
print('     mensaje sea un seguimiento automatico, abrir ~40 y anotar la fecha')
print('     del primer mensaje. Con eso sale la tasa del pico (5-10 ago).')
print()
print('  OPCION B (hacia adelante, 5 min/dia — LA MAS FACIL Y LA MEJOR):')
print('     seguir contando igual que hoy, todos los dias, una semana.')
print('     La quincena entro el 15. Si el cierre rebota y la tasa de vacios')
print('     NO cambia -> era la quincena. Si el cierre rebota Y los vacios')
print('     bajan -> era la mezcla. **Separa las dos hipotesis sin ambiguedad.**')
print('     Costo: cero. Y ya tenemos el 14-ago como linea base.')

print()
print('=' * 68)
print('5. 🔍 HALLAZGO NUEVO: EL "CIERRE POR DIA" NO SE PUEDE CALCULAR ASI')
print('=' * 68)
print('  El dueño explico que le escribe al cliente al dia siguiente y a los dos')
print('  dias (remarketing manual), y que por eso un dia acumula ~300 mensajes')
print('  mezclados.')
print()
print('  IMPLICACION METODOLOGICA IMPORTANTE:')
print('  • Las ventas de un dia NO salen de las conversaciones de ese dia.')
print('    Salen de una cola de varios dias que el dueño trabaja activamente.')
print('  • Entonces "ventas del dia / conversaciones del dia" es una metrica')
print('    RUIDOSA, y en un solo dia puede estar muy equivocada.')
print('  • Por eso el cierre solo se debe leer en ventanas de >=5 dias, y')
print('    comparando ventanas del MISMO largo.')
print()
print('  💡 Y ADEMAS ES UNA BUENA NOTICIA ESCONDIDA: significa que hay un motor')
print('     de recuperacion manual funcionando. El seguimiento del temblor ya')
print('     habia mostrado que rescatar no-cerrados es la accion de mayor')
print('     retorno. Esto confirma que es parte del proceso normal, no una')
print('     excepcion -> y que el cierre "real" del negocio incluye ese rescate.')
