#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
¿CUAL ES LA MEJOR OPCION PARA BIKERPRO?

Comparacion con precios verificados en septiembre 2026. Tres familias:
  A) plataformas todo-en-uno (respond.io, Wati, ManyChat)
  B) bot propio + Cloud API + Chatwoot, con distintos modelos de IA
  C) agente de Meta (ya descartado: costaba por DIA lo que esto por mes)

DATO CLAVE QUE CAMBIA TODO: las plataformas cobran por CONTACTO ACTIVO AL MES
(MAC). BikerPro tiene ~4.000 conversaciones/mes. Los planes traen 1.000 MACs
incluidos. O sea que el volumen que hace bueno el negocio es justo el que
hace caras las plataformas.

Fuentes de precio (contenido reformulado):
  respond.io: eesel.ai/blog/respond-io-pricing y chatarmin.com/blog/respond-io-pricing
              Starter $79-99 (SIN IA), Growth $159-199 (con IA), 1.000 MACs
  Wati:       hackceleration.com — el plan de $99 puede llegar a ~$489/mes
              con los recargos por mensaje y add-ons
  ManyChat:   desde 2-mar-2026 el plan gratis bajo a 25 contactos y la IA
              quedo como add-on de $29/mes
  Modelos:    spheron.network (DeepSeek V4-Flash $0.14/$0.28) ·
              cloudzero.com (GPT-5.6 Luna $0.20/$1.20) ·
              morphllm.com (Llama 3.1 8B en Groq $0.05/$0.08) ·
              blog.google + llm-stats (Gemini 3.1 Flash-Lite $0.25/$1.50)

⚠️ Estos precios cambian cada pocas semanas. Verificar antes de contratar.
"""

USD_COP = 4000
CONV_MES = 134 * 30          # 4.020
TURNOS = 10
LLAMADAS = CONV_MES * TURNOS

# --- dos escenarios de arquitectura ---
# ACTUAL: el prompt completo (4.304 tok) en cada llamada
# OPTIMIZADO: prompt recortado a 2.200 + cache + solo 4 turnos de historial +
#             reglas deterministas resuelven el 50% de los mensajes sin IA
TOK_ACTUAL_IN = 4304 + 900 + 30
TOK_OPTIM_IN = 2200 + 600 + 30
TOK_OUT = 120
FRAC_SIN_IA = 0.50           # cotizaciones y saludos los resuelve cotizar()
CACHE_F = 0.25

MODELOS = [
    # nombre,                 in $/M, out $/M, nota
    ("Llama 3.1 8B (Groq)",     0.05, 0.08, "muy barato, modelo chico"),
    ("DeepSeek V4-Flash",       0.14, 0.28, "barato y capaz"),
    ("GPT-5.6 Luna",            0.20, 1.20, "solido"),
    ("Gemini 3.1 Flash-Lite",   0.25, 1.50, "el que veniamos usando"),
    ("Gemini 3.5 Flash-Lite",   0.30, 2.50, ""),
    ("Gemini 3.8 Flash",        0.75, 3.75, "innecesario para un guion"),
]

RENDER = 7 * USD_COP
CHATWOOT = 19 * USD_COP


def costo_ia(pin, pout, optimizado):
    if optimizado:
        llam = LLAMADAS * (1 - FRAC_SIN_IA)
        tok_in = TOK_OPTIM_IN
        frac_cache = 2200 / TOK_OPTIM_IN
    else:
        llam = LLAMADAS
        tok_in = TOK_ACTUAL_IN
        frac_cache = 0.0
    total_in = llam * tok_in
    total_out = llam * TOK_OUT
    if frac_cache:
        c_in = (total_in*frac_cache/1e6*pin*CACHE_F
                + total_in*(1-frac_cache)/1e6*pin)
    else:
        c_in = total_in/1e6*pin
    return (c_in + total_out/1e6*pout) * USD_COP


print("=" * 76)
print("¿CUAL ES LA MEJOR OPCION? — 4.020 conversaciones/mes")
print("=" * 76)
print()

# ---------- A. plataformas ----------
print("### A · PLATAFORMAS TODO-EN-UNO")
print()
print("  Cobran por CONTACTO ACTIVO/MES. Los planes traen 1.000 incluidos y")
print("  BikerPro tiene ~4.000. El excedente es lo que dispara la cuenta.")
print()
PLAT = [
    ("respond.io Starter",  99, False, "inbox sin IA — no sirve"),
    ("respond.io Growth",  199, True,  "con IA, 1.000 MACs incluidos"),
    ("respond.io Advanced",349, True,  ""),
    ("Wati (real)",        489, True,  "el plan de $99 con recargos llega aca"),
    ("ManyChat + add-on IA",  29+25, True, "plan gratis quedo en 25 contactos"),
]
print(f"{'plataforma':<26}{'USD/mes':>9}{'COP/mes':>13}{'¿IA?':>7}  nota")
print("-" * 76)
for nom, usd, ia, nota in PLAT:
    print(f"{nom:<26}{usd:>9}{usd*USD_COP:>13,.0f}{'si' if ia else 'NO':>7}  {nota}")
print()
print("  ⚠️ Todos esos precios son con 1.000 MACs. A 4.000 MACs hay que sumar")
print("     el excedente, que en respond.io y Wati escala fuerte. Pedir cotizacion")
print("     real antes de decidir: el numero de la web NO es el que vas a pagar.")
print()

# ---------- B. bot propio ----------
print("### B · BOT PROPIO + CLOUD API + CHATWOOT")
print()
print(f"{'modelo de IA':<26}{'hoy':>13}{'optimizado':>13}  nota")
print("-" * 70)
filas = []
for nom, pin, pout, nota in MODELOS:
    hoy = costo_ia(pin, pout, False) + RENDER + CHATWOOT
    opt = costo_ia(pin, pout, True) + RENDER + CHATWOOT
    filas.append((nom, hoy, opt))
    print(f"{nom:<26}{hoy:>13,.0f}{opt:>13,.0f}  {nota}")
print()
print("  'optimizado' = prompt recortado a la mitad + cache de contexto +")
print("  reglas deterministas resolviendo 50% de los mensajes sin llamar a la IA")
print("  (tu bot YA tiene cotizar(): la ciudad y el precio no necesitan IA).")
print()

# ---------- C. Meta ----------
print("### C · AGENTE DE META  (descartado)")
print()
print(f"  $128.000 a $321.000 por DIA = "
      f"${128000*30:,} a ${321000*30:,} por mes")
print("  Y con cuota secreta que reventaste en menos de una semana.")
print()

# ---------- veredicto ----------
print("=" * 76)
print("VEREDICTO")
print("=" * 76)
print()
mejor = min(filas, key=lambda x: x[2])
razonable = [f for f in filas if "DeepSeek" in f[0]][0]
plat_min = min(p[1] for p in PLAT if p[2]) * USD_COP
print(f"  Opcion mas barata que sirve ..... {razonable[0]}")
print(f"    hoy ${razonable[1]:,.0f}/mes  ·  optimizado ${razonable[2]:,.0f}/mes")
print()
print(f"  Plataforma mas barata con IA .... ${plat_min:,.0f}/mes")
print(f"    y eso con 1.000 MACs, no con tus 4.000")
print()
ahorro = plat_min - razonable[2]
print(f"  Diferencia a favor del bot propio: ${ahorro:,.0f}/mes = "
      f"${ahorro*12:,.0f}/año")
print()
print("  Y lo que no se paga con plata:")
print("    · tu guion, tus 5 bandas de flete, tus destinos dificiles y")
print("      tus ciudades ambiguas YA estan programados. En una plataforma")
print("      hay que rehacer todo eso a mano, y es tu ventaja competitiva.")
print("    · sin cuotas secretas: pagas tokens, ves el consumo")
print("    · si una plataforma sube precios o te limita, migrar duele")
print()
print("  Riesgo honesto del bot propio:")
print("    · si se cae, no hay soporte que llamar")
print("    · depende de que alguien lo mantenga")
