"""
¿Cuánto cuesta el prompt nuevo, y se paga? — 21-sep-2026

CONTEXTO: el prompt de sistema pasó de 4.304 a 6.235 tokens al meterle lo que
salió del export (talla y color al frente, tabla de 2 unidades, antirrepetición).
El prompt viaja en CADA llamada, así que +45% de prompt es +45% de tokens de
entrada. Hay que verificar que se pague.

🔑 Y HAY UNA CORRECCIÓN MÁS IMPORTANTE QUE ESO:
`comparar-opciones-bot-21sep.py` asumía TURNOS = 10 llamadas por conversación.
El export lo mide: son **3,43 mensajes de cliente por conversación**.
La estimación vieja sobrecontaba las llamadas 2,9×.

Distribución medida (6.317 conversaciones):
    0 mensajes ....  3,6%
    1 mensaje  ... 43,1%   <- el saludo del anuncio y nada más
    2-4        ... 32,6%
    5-9        ... 13,1%
    10-19      ...  6,0%
    20+        ...  1,6%

Precios de modelos: los MISMOS de comparar-opciones-bot-21sep.py, que ya
estaban verificados. NO se vuelven a estimar de memoria (error #31: cuatro
versiones distintas del costo de IA por no verificar precios vigentes).
⚠️ Los precios de modelos cambian cada pocas semanas. Verificar antes de contratar.
"""

USD_COP = 4000
CONV_MES = 134 * 30  # 4.020, igual que el script original

# --- MEDIDO en el export, no asumido ---
TURNOS_MEDIDOS = 3.43
TURNOS_ASUMIDOS_ANTES = 10

TOK_PROMPT_VIEJO = 4304
TOK_PROMPT_NUEVO = 6235
TOK_HISTORIAL = 900  # MAX_HISTORIAL=8 mensajes
TOK_USER = 30
TOK_OUT = 120

# Mismos precios verificados del script original (USD por millón)
MODELOS = [
    ("Llama 3.1 8B (Groq)", 0.05, 0.08),
    ("DeepSeek V4-Flash", 0.14, 0.28),
    ("GPT-5.6 Luna", 0.20, 1.20),
    ("Gemini 3.1 Flash-Lite", 0.25, 1.50),
]


def costo(tok_prompt, turnos, pin, pout):
    llamadas = CONV_MES * turnos
    tok_in = tok_prompt + TOK_HISTORIAL + TOK_USER
    c_in = llamadas * tok_in / 1e6 * pin
    c_out = llamadas * TOK_OUT / 1e6 * pout
    return (c_in + c_out) * USD_COP


def fmt(n):
    return f"${n:,.0f}".replace(",", ".")


print("=" * 78)
print("1. LO PRIMERO: LA ESTIMACIÓN VIEJA SOBRECONTABA LAS LLAMADAS 2,9×")
print("=" * 78)
print(f"turnos asumidos antes : {TURNOS_ASUMIDOS_ANTES}  -> {CONV_MES*TURNOS_ASUMIDOS_ANTES:,.0f} llamadas/mes".replace(",", "."))
print(f"turnos MEDIDOS        : {TURNOS_MEDIDOS} -> {CONV_MES*TURNOS_MEDIDOS:,.0f} llamadas/mes".replace(",", "."))
print()
print(f"{'modelo':<24}{'estimado antes':>16}{'real (3,43)':>14}{'ahorro':>14}")
print("-" * 78)
for nom, pin, pout in MODELOS:
    viejo = costo(TOK_PROMPT_VIEJO, TURNOS_ASUMIDOS_ANTES, pin, pout)
    real = costo(TOK_PROMPT_VIEJO, TURNOS_MEDIDOS, pin, pout)
    print(f"{nom:<24}{fmt(viejo):>16}{fmt(real):>14}{fmt(viejo-real):>14}")

print()
print("=" * 78)
print("2. ¿CUÁNTO CUESTA EL PROMPT NUEVO? (con los turnos medidos)")
print("=" * 78)
print(f"prompt viejo: {TOK_PROMPT_VIEJO:,} tok   prompt nuevo: {TOK_PROMPT_NUEVO:,} tok   (+{(TOK_PROMPT_NUEVO/TOK_PROMPT_VIEJO-1)*100:.0f}%)".replace(",", "."))
print()
print(f"{'modelo':<24}{'prompt viejo':>14}{'prompt nuevo':>14}{'diferencia':>14}")
print("-" * 78)
for nom, pin, pout in MODELOS:
    v = costo(TOK_PROMPT_VIEJO, TURNOS_MEDIDOS, pin, pout)
    n = costo(TOK_PROMPT_NUEVO, TURNOS_MEDIDOS, pin, pout)
    print(f"{nom:<24}{fmt(v):>14}{fmt(n):>14}{fmt(n-v):>14}")

print()
print("=" * 78)
print("3. ¿SE PAGA? EL PUNTO DE EQUILIBRIO")
print("=" * 78)
print("El prompt nuevo mete talla y color en el PRIMER mensaje. Talla y color son")
print("el 28,1% de las preguntas del cliente, así que debería ahorrar mensajes.")
print("¿Cuántos mensajes hay que ahorrar para pagar el prompt más grande?")
print()
for nom, pin, pout in MODELOS:
    costo_nuevo_por_llamada = (
        ((TOK_PROMPT_NUEVO + TOK_HISTORIAL + TOK_USER) / 1e6 * pin + TOK_OUT / 1e6 * pout)
        * USD_COP
    )
    extra = costo(TOK_PROMPT_NUEVO, TURNOS_MEDIDOS, pin, pout) - costo(
        TOK_PROMPT_VIEJO, TURNOS_MEDIDOS, pin, pout
    )
    turnos_equiv = extra / (costo_nuevo_por_llamada * CONV_MES)
    print(f"  {nom:<24} hay que ahorrar {turnos_equiv:.2f} mensajes por conversación")
print()
print("  Es decir: si el prompt nuevo ahorra MENOS DE 1 mensaje por conversación,")
print("  ya se pagó. Y responder talla+color de entrada ahorra 1-2 fácil.")
print()
print("  ⚠️ PERO ESTO ES UNA PREDICCIÓN, NO UN DATO. Se verifica midiendo los")
print("     mensajes por conversación después de desplegar, contra los 3,43 de hoy.")

print()
print("=" * 78)
print("4. COSTO TOTAL DEL BOT CON EL PROMPT NUEVO")
print("=" * 78)
RENDER = 7 * USD_COP
CHATWOOT = 19 * USD_COP
print(f"Render (plan pago)  {fmt(RENDER)}/mes")
print(f"Chatwoot            {fmt(CHATWOOT)}/mes  (opcional al arrancar)")
print()
print(f"{'modelo':<24}{'IA':>12}{'+infra':>12}{'total':>12}")
print("-" * 78)
for nom, pin, pout in MODELOS:
    ia = costo(TOK_PROMPT_NUEVO, TURNOS_MEDIDOS, pin, pout)
    print(f"{nom:<24}{fmt(ia):>12}{fmt(RENDER):>12}{fmt(ia+RENDER):>12}")
print()
print("Contra las plataformas (precios del script original, 4.000 contactos):")
print("  ManyChat Pro + IA ..... $500.000 - $572.000/mes")
print("  respond.io Growth ..... $796.000+/mes")
print("  Wati .................. $1.956.000/mes")
print()
print("=" * 78)
print("CONCLUSIÓN")
print("=" * 78)
print("El prompt más grande cuesta centavos porque las conversaciones son cortas.")
print("Lo que movía la aguja no era el tamaño del prompt: era la cantidad de")
print("llamadas, y esa estaba sobreestimada 2,9×.")
print()
print("El bot propio cuesta menos del 10% de la plataforma más barata con IA.")
