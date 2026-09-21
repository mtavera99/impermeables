#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
COSTO REAL DEL BOT — corrige mi estimacion de $24.000/mes

El dueno pregunto: "con solo 24.000 pesos vamos a tener saldo suficiente para
hablar con todos nuestros chats Y hacer remarketing?"

Hice mal dos cosas:
 1. Estime el prompt en ~1.000 tokens. MEDIDO: son 4.304 tokens, y viajan en
    CADA llamada. Eso multiplica el costo de entrada por 4.
 2. Meti el remarketing en la misma bolsa. Son dos cosas distintas:
    · responder a quien llega del anuncio -> GRATIS (ventana de 72h)
    · escribirle al pozo de 4.000 -> PLANTILLA DE MARKETING, se cobra por mensaje

Fuentes de precio: business.whatsapp.com/products/platform-pricing (ventana 72h
gratis) · dragapp.com y chatdaddy.tech para tarifas de plantilla por pais.
Contenido reformulado. Las tarifas de Colombia hay que confirmarlas en el
WhatsApp Manager del dueno: cambian por pais y por fecha.
"""

USD_COP = 4000

# --- medido en el repo ---
PROMPT_TOK = 4304          # node -e buildSystemPrompt().length / 3.5
HIST_TOK_PROM = 900        # historial promedio a lo largo de una conversacion
MSG_USUARIO_TOK = 30
SALIDA_TOK = 120
TURNOS_POR_CONV = 10       # una venta contraentrega no se cierra en 2 mensajes

CONV_DIA = 134
CONV_MES = CONV_DIA * 30

# --- precios Gemini Flash (verificar en ai.google.dev/pricing) ---
IN_POR_M = 0.10
OUT_POR_M = 0.40
DESCUENTO_CACHE = 0.25     # el prompt es identico siempre: cacheable

print("=" * 72)
print("COSTO REAL DEL BOT — ¿alcanzan $24.000/mes?")
print("=" * 72)
print()

# ---------- 1. el motor de IA ----------
print("### 1. El motor de IA (Gemini)")
print()
in_por_llamada = PROMPT_TOK + HIST_TOK_PROM + MSG_USUARIO_TOK
print(f"  tokens de entrada por llamada ..... {in_por_llamada:,}")
print(f"    de los cuales el prompt fijo .... {PROMPT_TOK:,} ({PROMPT_TOK/in_por_llamada*100:.0f}%)")
print(f"  tokens de salida por llamada ...... {SALIDA_TOK:,}")
print(f"  llamadas por conversacion ......... {TURNOS_POR_CONV}")
print(f"  conversaciones por mes ............ {CONV_MES:,}")
print()

llamadas_mes = CONV_MES * TURNOS_POR_CONV
in_mes = llamadas_mes * in_por_llamada
out_mes = llamadas_mes * SALIDA_TOK
print(f"  llamadas/mes ...................... {llamadas_mes:,}")
print(f"  tokens de entrada/mes ............. {in_mes/1e6:,.0f} millones")
print(f"  tokens de salida/mes .............. {out_mes/1e6:,.1f} millones")
print()

costo_in = in_mes / 1e6 * IN_POR_M
costo_out = out_mes / 1e6 * OUT_POR_M
sin_cache = costo_in + costo_out
con_cache = costo_in * DESCUENTO_CACHE + costo_out

print(f"{'escenario':<34}{'USD/mes':>10}{'COP/mes':>14}")
print("-" * 58)
print(f"{'sin cache de contexto':<34}{sin_cache:>10.2f}{sin_cache*USD_COP:>14,.0f}")
print(f"{'con cache de contexto':<34}{con_cache:>10.2f}{con_cache*USD_COP:>14,.0f}")
print()
print(f"  ⛔ Lo que yo te dije: $24.000/mes")
print(f"  ✅ Lo real: ${con_cache*USD_COP:,.0f} a ${sin_cache*USD_COP:,.0f}/mes")
print(f"     Me equivoque por {sin_cache*USD_COP/24000:.0f}x en el peor caso.")
print()

# ---------- 2. los mensajes de WhatsApp ----------
print("### 2. Los mensajes de WhatsApp — acá está la diferencia clave")
print()
print("  Hay DOS tipos de mensaje y cuestan muy distinto:")
print()
print(f"{'tipo':<44}{'costo':>14}")
print("-" * 58)
print(f"{'responder a quien llega del ANUNCIO (72h)':<44}{'GRATIS':>14}")
print(f"{'responder dentro de 24h de su mensaje':<44}{'GRATIS*':>14}")
print(f"{'escribirle a un lead VIEJO (plantilla mkt)':<44}{'SE COBRA':>14}")
print()
print("  * desde el 1-oct: 1.000 mensajes de servicio gratis/mes, despues se cobran")
print()
print("  🔑 TU FLUJO PRINCIPAL ES GRATIS. Todo tu trafico entra por")
print("     Click-to-WhatsApp, y esa ventana de 72h no se cobra.")
print()

# ---------- 3. el remarketing ----------
print("### 3. El remarketing a los 4.000 — ESTE es el que cuesta")
print()
LEADS = 4000
TARIFAS = [("barata", 0.0125), ("media", 0.02), ("alta", 0.03)]
print(f"{'tarifa marketing':<20}{'1 mensaje':>16}{'3 mensajes':>16}")
print("-" * 52)
for nom, t in TARIFAS:
    uno = LEADS * t * USD_COP
    tres = LEADS * 3 * t * USD_COP
    print(f"{nom+' (US$'+format(t,'.4f')+')':<20}{uno:>16,.0f}{tres:>16,.0f}")
print()
print("  ⚠️ La tarifa exacta de Colombia hay que verla en tu WhatsApp Manager.")
print("     Colombia esta entre las mas baratas de Latinoamerica, pero igual")
print(f"     el rango va de ${LEADS*0.0125*USD_COP:,.0f} a "
      f"${LEADS*3*0.03*USD_COP:,.0f}.")
print()
print("  🟢 EXCEPCION: los 61 leads calientes de ayer y hoy, si llegaron por")
print("     anuncio, estan dentro de la ventana de 72h -> GRATIS.")
print()

# ---------- 4. el total honesto ----------
print("### 4. El total, separado como debe ser")
print()
RENDER = 7 * USD_COP
CHATWOOT = 19 * USD_COP
print(f"{'concepto':<38}{'COP/mes':>14}")
print("-" * 52)
print(f"{'Cloud API (responder a clientes)':<38}{0:>14,.0f}")
print(f"{'Gemini (con cache)':<38}{con_cache*USD_COP:>14,.0f}")
print(f"{'Render (donde vive el bot)':<38}{RENDER:>14,.0f}")
print(f"{'Chatwoot (bandeja web)':<38}{CHATWOOT:>14,.0f}")
print("-" * 52)
base = con_cache*USD_COP + RENDER + CHATWOOT
print(f"{'OPERACION MENSUAL':<38}{base:>14,.0f}")
print()
print(f"{'+ remarketing 4.000 x 1 mensaje':<38}"
      f"{LEADS*0.02*USD_COP:>14,.0f}  (una vez)")
print()
print(f"  Los $359.900 que recuperaste cubren "
      f"{359900/base:.1f} meses de operacion")
print(f"  o la operacion de 1 mes + el remarketing completo.")
print()

# ---------- 5. vale la pena el remarketing? ----------
print("### 5. ¿Vale la pena pagar el remarketing?")
print()
CIERRE_FRIO = 0.01     # 1% de un pozo frio es optimista pero plausible
MARGEN_UD = 23244
UDS_PED = 1.3
for nom, t in TARIFAS:
    costo = LEADS * t * USD_COP
    pedidos = LEADS * CIERRE_FRIO
    ingreso = pedidos * UDS_PED * MARGEN_UD
    print(f"  tarifa {nom:<8} costo ${costo:>9,.0f} -> "
          f"{pedidos:.0f} pedidos -> margen ${ingreso:,.0f} "
          f"-> neto ${ingreso-costo:+,.0f}")
print()
print(f"  Aun a la tarifa alta y con solo 1% de cierre, el remarketing")
print(f"  se paga varias veces. Pero NO es gratis, y eso es lo que")
print(f"  yo te habia dicho mal.")
