#!/usr/bin/env python3
"""
¿A CUANTOS HAY QUE ESCRIBIRLES DE VERDAD? (2026-09-10)
=======================================================
Confirmado por el dueno:
  · las 37 conversaciones son el total de la campana del colmena
  · la guia de Puerto Gaitan SI es un colmena (no quedo especificada)
    -> son 3 VENTAS CONFIRMADAS

La pregunta del dueno: "¿le enviamos un mensaje a todos?"
La respuesta corta es NO a todos. Y el motivo es un dato que ya esta medido
en este mismo archivo desde agosto.
"""
L = '=' * 72
CONVERS, VENTAS = 37, 3
VACIAS = 0.578          # 0-K: 52 de 90 conversaciones no tienen ni un mensaje del cliente
MARGEN = 40_968

print(L); print('1. LAS 37 NO SON 37 LEADS'); print(L)
print(f'  Conversaciones de la campana del colmena : {CONVERS}')
print(f'  Tasa de conversaciones VACIAS medida     : {VACIAS:.1%}  (0-K, 14-ago)')
print()
reales = round(CONVERS * (1 - VACIAS))
print(f'  🔑 Una conversacion vacia NO tiene ni un mensaje del cliente: es un')
print(f'     clic que nunca escribio. A esos no hay a quien escribirle.')
print()
print(f'  Conversaciones REALES estimadas          : ~{reales}')
print(f'  Menos las {VENTAS} que ya compraron            : ~{reales-VENTAS}')
print(f'  >>> UNIVERSO REAL DE SEGUIMIENTO         : ~{reales-VENTAS} personas')
print()
pend = reales - VENTAS
print(f'  ⚠️ El 57,8% es de una muestra de agosto del TRADICIONAL. Para el')
print(f'     colmena podria ser distinto. Es estimacion, no censo: el dueno')
print(f'     lo confirma abriendo la bandeja y contando cuantos escribieron.')

print(); print(L); print('2. Y ESO MEJORA MUCHO LA TASA DE RETORNO'); print(L)
print(f'  Antes calcule 1 de 34 = {1/34:.1%} (contando las vacias como leads)')
print(f'  Con el universo real  : 1 de {pend} = {1/pend:.1%}')
print()
print('  🔑 No es un detalle: cambia si vale la pena la hora del dueno.')

print(); print(L); print('3. LA CUENTA DE SI VALE LA PENA'); print(L)
minutos = pend * 1.5
print(f'  Mensajes a enviar        : {pend}')
print(f'  Tiempo (1,5 min c/u)     : ~{minutos:.0f} minutos')
print(f'  Valor de UNA venta       : ${MARGEN:,} limpios (CPA $0)')
print()
esperadas = pend * (1/pend)          # el piso: lo que ya paso sin hacer nada
print(f'  Al {1/pend:.1%} de retorno espontaneo, hacer NADA ya daba ~{esperadas:.0f} venta.')
print(f'  Con seguimiento activo, el piso razonable es el doble: ~{esperadas*2:.0f}.')
print(f'    escenario piso   ({esperadas:.0f} venta) : ${MARGEN*esperadas:>10,.0f}')
print(f'    escenario base   ({esperadas*2:.0f} ventas): ${MARGEN*esperadas*2:>10,.0f}')
print(f'    escenario bueno  ({esperadas*3:.0f} ventas): ${MARGEN*esperadas*3:>10,.0f}')
print()
print(f'  >>> ${MARGEN*esperadas*2/(minutos/60):,.0f} POR HORA en el escenario base.')
print('      Es, por lejos, la hora mejor pagada del negocio.')

print(); print(L); print('4. ⛔ POR QUE **NO** A LOS 37 DE UNA'); print(L)
print('  · A las vacias no hay a quien escribirle: nunca dijeron nada.')
print('  · Un mensaje identico a 30+ numeros el mismo dia es el patron que')
print('    WhatsApp lee como difusion. Reportes -> numero bloqueado.')
print('  · Y ese numero (313 861 5813) NO es "un canal": es el unico canal.')
print(f'    Perderlo cuesta el negocio entero por ${MARGEN*2:,.0f} de upside.')
print('  🔑 La asimetria es brutal: arriba hay ~$82.000, abajo esta todo.')
print()
print('  ✅ Responder DENTRO de una conversacion que el cliente abrio es')
print('     otra cosa: es un hilo existente, no un mensaje frio. Eso es')
print('     seguro. El riesgo aparece con el volumen y con el copiar-pegar.')

print(); print(L); print('5. CON 3 VENTAS CONFIRMADAS, LA CAMPANA QUEDA ASI'); print(L)
GASTO = 85_843
print(f'  Ventas confirmadas       : {VENTAS}')
print(f'    San Francisco  -> ENTREGADA Y PAGADA')
print(f'    Puerto Gaitan  -> en terminal de destino (confirmado colmena por el dueno)')
print(f'    La nueva       -> PREPAGADA')
print(f'  Cierre                   : {VENTAS/CONVERS:.1%} sobre las 37')
print(f'  Cierre sobre reales      : {VENTAS/reales:.1%} sobre ~{reales} 🔑')
print(f'  Margen total             : ${MARGEN*VENTAS:,}')
print(f'  Contra el gasto          : +${MARGEN*VENTAS-GASTO:,}')
print()
print(f'  🔑 SOBRE CONVERSACIONES REALES EL COLMENA CIERRA {VENTAS/reales:.1%}.')
print('     El tradicional cierra 8,4% sobre conversaciones TOTALES. Comparar')
print('     esos dos numeros es comparar peras con manzanas, y yo lo hice.')
print('     Para comparar bien hace falta el % de vacias del colmena.')
print('     📌 Queda como lo unico que falta para cerrar el caso del colmena.')
