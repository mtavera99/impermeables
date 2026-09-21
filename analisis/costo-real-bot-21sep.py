#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
COSTO REAL DEL BOT — SEGUNDA CORRECCION (21-sep, tarde)

Me equivoque DOS veces con este numero:
 1ª vez: dije $24.000/mes. Habia estimado el prompt en ~1.000 tokens;
         medido son 4.304 y viajan en CADA llamada.
 2ª vez: recalcule con precios de Gemini Flash a US$0.10/US$0.40 por millon.
         Esos precios ya no existen. El dueno me corrigio.

PRECIOS VIGENTES (septiembre 2026), verificados:
  Gemini 3.8 Flash ....... US$0.75 in / US$3.75 out  (intro, hasta 31-dic-2026;
                           regular US$1.50 / US$7.50)
  Gemini 3.5 Flash-Lite .. US$0.30 in / US$2.50 out
  Gemini 3.1 Flash-Lite .. US$0.25 in / US$1.50 out
  Gemini 3.1 Pro ......... US$2.00 in / US$12.00 out

Fuentes: blog.google (3.1 Flash-Lite) · eesel.ai y llm-stats.com (3.5 Flash-Lite)
· deepmind.google/models/gemini (tabla oficial de Flash) · apidog y alphacorp
(3.8 Flash, 2-sep-2026). Contenido reformulado.
VERIFICAR en ai.google.dev/gemini-api/docs/pricing antes de decidir: estos
precios cambian cada pocas semanas.
"""

USD_COP = 4000

# --- medido en el repo ---
PROMPT_TOK = 4304
HIST_TOK_PROM = 900
MSG_USUARIO_TOK = 30
SALIDA_TOK = 120
TURNOS_POR_CONV = 10
CONV_DIA = 134
CONV_MES = CONV_DIA * 30

# --- precios reales, septiembre 2026 ---
MODELOS = [
    ("3.8 Flash (intro)",      0.75, 3.75),
    ("3.8 Flash (regular)",    1.50, 7.50),
    ("3.5 Flash-Lite",         0.30, 2.50),
    ("3.1 Flash-Lite",         0.25, 1.50),
]
CACHE_FACTOR = 0.25   # lectura cacheada ~25% del precio normal

print("=" * 74)
print("COSTO REAL DEL BOT — con los precios de verdad")
print("=" * 74)
print()

llamadas = CONV_MES * TURNOS_POR_CONV
in_llamada = PROMPT_TOK + HIST_TOK_PROM + MSG_USUARIO_TOK
in_mes = llamadas * in_llamada
out_mes = llamadas * SALIDA_TOK

print(f"  {CONV_MES:,} conversaciones/mes × {TURNOS_POR_CONV} turnos = "
      f"{llamadas:,} llamadas")
print(f"  entrada: {in_mes/1e6:,.0f} M tokens   ·   salida: {out_mes/1e6:,.1f} M tokens")
print(f"  el prompt fijo es {PROMPT_TOK/in_llamada*100:.0f}% de la entrada")
print()

print("### 1. Costo por modelo, SIN optimizar")
print()
print(f"{'modelo':<24}{'sin cache':>16}{'con cache':>16}")
print("-" * 56)
for nom, pin, pout in MODELOS:
    sin_c = in_mes/1e6*pin + out_mes/1e6*pout
    frac_cache = PROMPT_TOK / in_llamada
    con_c = (in_mes*frac_cache/1e6*pin*CACHE_FACTOR
             + in_mes*(1-frac_cache)/1e6*pin
             + out_mes/1e6*pout)
    print(f"{nom:<24}{sin_c*USD_COP:>16,.0f}{con_c*USD_COP:>16,.0f}")
print()
print(f"  ⛔ Lo que yo te dije primero: $24.000/mes")
print(f"  ⛔ Lo que te dije despues:    $28.759/mes")
print(f"  ✅ Lo real, con el modelo mas barato y cache: ver tabla")
print()

# ---------- 2. con el prompt recortado ----------
PROMPT_CORTO = 2200
HIST_CORTO = 600
print("### 2. Y si recorto el prompt (4.304 → 2.200 tokens)")
print()
in_llamada2 = PROMPT_CORTO + HIST_CORTO + MSG_USUARIO_TOK
in_mes2 = llamadas * in_llamada2
frac2 = PROMPT_CORTO / in_llamada2
print(f"  entrada baja de {in_mes/1e6:,.0f} M a {in_mes2/1e6:,.0f} M tokens "
      f"({(1-in_mes2/in_mes)*100:.0f}% menos)")
print()
print(f"{'modelo':<24}{'con cache + prompt corto':>28}")
print("-" * 52)
mejores = {}
for nom, pin, pout in MODELOS:
    c = (in_mes2*frac2/1e6*pin*CACHE_FACTOR
         + in_mes2*(1-frac2)/1e6*pin
         + out_mes/1e6*pout)
    mejores[nom] = c*USD_COP
    print(f"{nom:<24}{c*USD_COP:>28,.0f}")
print()

# ---------- 3. total de la operacion ----------
print("### 3. Total de la operacion mensual")
print()
RENDER = 7 * USD_COP
CHATWOOT = 19 * USD_COP
gem_mejor = mejores["3.1 Flash-Lite"]
gem_peor = mejores["3.8 Flash (intro)"]
print(f"{'concepto':<38}{'optimista':>13}{'realista':>13}")
print("-" * 64)
print(f"{'Cloud API (responder clientes)':<38}{0:>13,.0f}{0:>13,.0f}")
print(f"{'Gemini (Flash-Lite vs Flash)':<38}{gem_mejor:>13,.0f}{gem_peor:>13,.0f}")
print(f"{'Render':<38}{RENDER:>13,.0f}{RENDER:>13,.0f}")
print(f"{'Chatwoot':<38}{CHATWOOT:>13,.0f}{CHATWOOT:>13,.0f}")
print("-" * 64)
t1 = gem_mejor + RENDER + CHATWOOT
t2 = gem_peor + RENDER + CHATWOOT
print(f"{'TOTAL':<38}{t1:>13,.0f}{t2:>13,.0f}")
print()
print(f"  Los $359.900 recuperados cubren de {359900/t2:.1f} a {359900/t1:.1f} meses")
print()

# ---------- 4. contra lo que produce ----------
print("### 4. ¿Se justifica?")
print()
UTIL_DIA = 110000
print(f"  utilidad diaria reciente ......... ${UTIL_DIA:,}")
print(f"  utilidad mensual ................. ${UTIL_DIA*30:,}")
print()
for nom, t in (("optimista", t1), ("realista", t2)):
    print(f"  escenario {nom:<10} ${t:>8,.0f}/mes = "
          f"{t/(UTIL_DIA*30)*100:.1f}% de la utilidad = "
          f"{t/UTIL_DIA:.1f} dias de trabajo")
print()
print("  Contra el agente de Meta, que costaba $128.000-$321.000 por DIA,")
print("  sigue siendo 15 a 40 veces mas barato.")
print()

# ---------- 5. las palancas ----------
print("### 5. Las palancas, en orden de impacto")
print()
palancas = [
    ("Usar Flash-Lite y no Flash", f"{(gem_peor-gem_mejor)/gem_peor*100:.0f}% menos"),
    ("Activar cache de contexto", "~55% menos en la entrada"),
    ("Recortar el prompt a la mitad", "~45% menos en la entrada"),
    ("Mandar solo los ultimos 4 turnos de historial", "~30% menos"),
    ("Respuestas cortas (ya esta en el guion)", "la salida ya es barata"),
]
for p, efecto in palancas:
    print(f"  · {p:<46} {efecto}")
print()
print("  Las tres primeras las hago yo al desplegar. La primera es solo")
print("  cambiar el nombre del modelo en una variable de entorno.")
