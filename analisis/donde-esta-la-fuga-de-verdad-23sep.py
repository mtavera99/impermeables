# -*- coding: utf-8 -*-
"""
DONDE ESTA LA FUGA DE VERDAD — 23-sep

CONTEXTO: el 23-sep propuse que la fuga estaba en el PRIMER MENSAJE. El
razonamiento era: el 44,8% de las 6.317 conversaciones del agente viejo murio
sin que el cliente escribiera nada propio, asi que el arranque debia ser la
palanca del 10%.

Le pedi al dueño el dato equivalente del bot nuevo. Lo midio en el shell de
Render sobre conversations.json:

    conversaciones: 218 | escribieron UNA vez: 105 (48%) | siguieron: 113

Y ese numero TUMBA mi hipotesis. Este script hace la cuenta de por que, y donde
si esta la plata.

    python3 analisis/donde-esta-la-fuga-de-verdad-23sep.py
"""

from math import sqrt

LINEA = "═" * 78


def titulo(t):
    print("\n" + LINEA)
    print(t)
    print(LINEA)


# ═════════════════════════════════════════════════════════════════════════════
# 1. ¿ES PEOR EL BOT NUEVO QUE EL AGENTE VIEJO EN EL ARRANQUE?
# ═════════════════════════════════════════════════════════════════════════════
titulo("1. EL ARRANQUE DEL BOT NUEVO CONTRA EL DEL AGENTE VIEJO")

# Bot nuevo, medido en Render el 23-sep
BOT_N = 218
BOT_UNA_VEZ = 105

# Agente viejo, medido en el export de 6.317 chats (EXPORT-AGENTE-META-21SEP.md)
VIEJO_N = 6317
VIEJO_VACIAS = 2827

p_bot = BOT_UNA_VEZ / BOT_N
p_viejo = VIEJO_VACIAS / VIEJO_N

# Margen de error del bot: la muestra es chica y eso hay que decirlo
se = sqrt(p_bot * (1 - p_bot) / BOT_N)
lo, hi = p_bot - 1.96 * se, p_bot + 1.96 * se

# Prueba de si la diferencia es real o es ruido
z = (p_bot - p_viejo) / sqrt(p_viejo * (1 - p_viejo) / BOT_N)

print(f"  bot nuevo    {p_bot:6.1%}   ({BOT_UNA_VEZ} de {BOT_N})")
print(f"  agente viejo {p_viejo:6.1%}   ({VIEJO_VACIAS} de {VIEJO_N})")
print(f"\n  margen de error del bot (95%): ±{1.96 * se:.1%} puntos")
print(f"  o sea, el numero real del bot esta entre {lo:.1%} y {hi:.1%}")
print(f"\n  ¿el 44,8% del viejo cae dentro de ese rango?  "
      f"{'SI' if lo < p_viejo < hi else 'NO'}")
print(f"  z = {z:.2f}  →  la diferencia es "
      f"{'REAL' if abs(z) > 1.96 else 'RUIDO, no se puede distinguir'}")

print("""
  🔴 CONCLUSION: mi hipotesis estaba equivocada.

  El bot nuevo pierde en el arranque la MISMA proporcion que el agente viejo.
  No hay nada roto ahi. Arreglar el primer mensaje no traia el 10%.

  ⚠️ OJO CON ESTO: los dos numeros no miden exactamente lo mismo.
     · el 44,8% del viejo = nunca escribio nada PROPIO (podia mandar el texto
       del anuncio dos veces y seguia contando como vacia)
     · el 48% del bot = mando UN solo mensaje y no volvio (si ese mensaje era
       una pregunta real, aca cuenta y en el viejo no)
  Son poblaciones casi iguales pero no identicas. Razon de mas para no leer la
  diferencia de 3,2 puntos como una señal: no lo es.
""")

# ═════════════════════════════════════════════════════════════════════════════
# 2. ENTONCES DONDE SE PIERDE LA PLATA
# ═════════════════════════════════════════════════════════════════════════════
titulo("2. LA DESCOMPOSICION: EL CIERRE SON DOS NUMEROS, NO UNO")

print("""
  cierre total  =  % que contesta al bot  ×  % que cierra DE LOS QUE contestan

  El primer factor es el arranque. El segundo es todo lo demas: la cotizacion,
  las objeciones, el cuadro de confirmacion, el ultimo empujon.
""")

contesta_bot = 1 - p_bot          # 51,8% le sigue la charla al bot
contesta_viejo = 1 - p_viejo      # 55,2% le seguia la charla al agente viejo

CIERRE_BOT = 8 / 168              # 22-sep: 8 pedidos, 168 conversaciones
CIERRE_VIEJO = 0.084              # historico del negocio
META = 0.10

cierra_bot = CIERRE_BOT / contesta_bot
cierra_viejo = CIERRE_VIEJO / contesta_viejo
cierra_meta = META / contesta_bot

print(f"  {'':<22}{'contesta':>10}{'cierra de':>12}{'cierre':>10}")
print(f"  {'':<22}{'al bot':>10}{'esos':>12}{'total':>10}")
print("  " + "─" * 54)
print(f"  {'bot nuevo (22-sep)':<22}{contesta_bot:>10.1%}{cierra_bot:>12.1%}{CIERRE_BOT:>10.1%}")
print(f"  {'agente viejo + tu mano':<22}{contesta_viejo:>10.1%}{cierra_viejo:>12.1%}{CIERRE_VIEJO:>10.1%}")
print(f"  {'META':<22}{contesta_bot:>10.1%}{cierra_meta:>12.1%}{META:>10.1%}")

print(f"""
  🔑 ACA ESTA TODO:

  El bot engancha IGUAL que el viejo ({contesta_bot:.0%} contra {contesta_viejo:.0%}: lo mismo).
  Pero de los que enganchan, cierra {cierra_bot:.1%} donde el viejo + tu mano cerraba
  {cierra_viejo:.1%}. Eso es {cierra_viejo / cierra_bot:.1f} veces menos.

  La fuga NO esta en la puerta de entrada. Esta en el medio y en el final —
  exactamente la parte que vos haciais a mano.

  Y coincide con lo que vos mismo dijiste: "ese 8,5 era mitad mio y mitad del
  bot". Los numeros te dan la razon. Lo que falta es tu mitad.
""")

# ═════════════════════════════════════════════════════════════════════════════
# 3. CUANTO VALE CADA PALANCA
# ═════════════════════════════════════════════════════════════════════════════
titulo("3. CUANTO VALE CADA PALANCA, EN PEDIDOS Y EN PLATA")

CONV_DIA = 168          # conversaciones por dia (22-sep)
MARGEN_UD = 23244       # META_UD: margen por unidad

print(f"  Base: {CONV_DIA} conversaciones/dia, margen ${MARGEN_UD:,} por unidad\n")
print(f"  {'escenario':<46}{'pedidos/dia':>13}{'margen/dia':>14}")
print("  " + "─" * 73)


def fila(nombre, engancha, cierra):
    cierre = engancha * cierra
    pedidos = cierre * CONV_DIA
    print(f"  {nombre:<46}{pedidos:>13.1f}{'$' + format(round(pedidos * MARGEN_UD), ','):>14}")
    return pedidos


hoy = fila("hoy", contesta_bot, cierra_bot)
p_viejo_nivel = fila("si el bot cerrara como el viejo + tu mano", contesta_bot, cierra_viejo)
p_meta = fila("META del 10%", contesta_bot, cierra_meta)

print("  " + "─" * 73)
print(f"\n  Recuperar solo TU MITAD vale +{p_viejo_nivel - hoy:.1f} pedidos/dia "
      f"= ${round((p_viejo_nivel - hoy) * MARGEN_UD):,}/dia")
print(f"  Llegar al 10% vale          +{p_meta - hoy:.1f} pedidos/dia "
      f"= ${round((p_meta - hoy) * MARGEN_UD):,}/dia")

# ¿Y si en vez de eso mejoramos el arranque? Compara las dos palancas.
print("\n  Para comparar — si el arranque mejorara y el enganche subiera 5 puntos")
print("  (de 51,8% a 56,8%) pero el cierre de los enganchados NO cambiara:")
p_solo_arranque = (contesta_bot + 0.05) * cierra_bot * CONV_DIA
print(f"    → {p_solo_arranque:.1f} pedidos/dia "
      f"(+{p_solo_arranque - hoy:.1f}) = ${round((p_solo_arranque - hoy) * MARGEN_UD):,}/dia")
print(f"\n  Contra +{p_meta - hoy:.1f} pedidos de arreglar el cierre. "
      f"La segunda palanca es {(p_meta - hoy) / (p_solo_arranque - hoy):.0f}x mas grande.")

# ═════════════════════════════════════════════════════════════════════════════
# 4. QUE SIGUE
# ═════════════════════════════════════════════════════════════════════════════
titulo("4. QUE HAY QUE MIRAR AHORA")

print("""
  El bot YA mide en que paso se cae cada cliente: bot/src/embudo.js, y el panel
  lo dibuja en la seccion "📉 Donde se caen los clientes". No hay que construir
  nada ni correr ningun comando: esta ahi.

  Las tres etapas despues del arranque, y que significa cada fuga:

    Recibieron precio      ← si se caen ANTES de esto, no llegan a dar la ciudad
    Llegaron a los datos   ← si se caen ACA, el problema es el PRECIO o la confianza
    Cerraron el pedido     ← si se caen ACA, el precio ya lo aceptaron: falta el
                             ultimo empujon

  El panel ya dice cual de las tres es la mas grande y que hacer con cada una.
  Ese es el dato que decide el proximo cambio, y es el unico que falta.

  ⚠️ Lo que NO hay que hacer con esto: bajar precios. Ya esta medido que el
  precio es el 8,1% de las dudas y que una rebaja de $5.000 exige +26,3% de
  cierre solo para empatar. Primero hay que ver el embudo.
""")

print(LINEA)
print("En una linea: el arranque estaba bien. Lo que falta es tu mitad del")
print("trabajo, y esta en la cotizacion y en el cierre, no en el saludo.")
print(LINEA + "\n")
