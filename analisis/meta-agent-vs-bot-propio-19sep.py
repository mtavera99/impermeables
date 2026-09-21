#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
¿CUANTO COSTARIA EL AGENTE DE META, Y CUANTO EL BOT PROPIO?

Hallazgo de la busqueda (19-sep-2026):
  · Meta Business Agent (el agente del app de WhatsApp Business) dejo de ser
    gratis el 1-AGO-2026. Ahora cobra US$2,00 por millon de tokens, y Meta
    NO entrega ni una respuesta sin metodo de pago en BILLING HUB.
  · Meta One (lo que el dueno pago, lanzado el 15-sep-2026) es la suscripcion
    de features de IA / verificacion / sesiones. NO paga el Business Agent.
    -> Por eso se desbloqueo todo MENOS el agente.
  · Desde el 1-OCT-2026 los mensajes de servicio tambien se cobran, y sin
    metodo de pago en Billing Hub antes del 30-SEP Meta SUSPENDE la entrega
    de mensajes de servicio (humanos incluidos), sin periodo de gracia.
  · La ventana de 72h que abre un anuncio Click-to-WhatsApp sigue siendo
    GRATIS en entrega. Eso protege el flujo principal, no el re-contacto.

Fuentes: sleekflow.io/blog/meta-business-agent-pricing-changes-2026 ·
Forbes 18-sep-2026 (Meta compra Stilla.ai) · meta.com/help (Meta One Premium)
Contenido reformulado por licencias.

OJO: los tokens por respuesta son una ESTIMACION del proveedor (20-25 mil).
Se calcula un rango, no un numero.
"""
import os, json, urllib.request, urllib.parse

TOKEN = os.environ.get("META_ADS_TOKEN")
ACT = "act_4330882710457791"
V = "v21.0"
USD_COP = 4000          # aprox; ajustar si cambia
USD_POR_MILLON_TOK = 2.00
TOK_POR_RESPUESTA = (20000, 25000)
RESP_POR_CONV = (6, 12)  # una venta de contraentrega no se cierra en 2 mensajes

CONV_TYPES = ("onsite_conversion.messaging_conversation_started_7d",
              "onsite_conversion.total_messaging_connection")


def get(path, params):
    params = dict(params)
    params["access_token"] = TOKEN
    url = f"https://graph.facebook.com/{V}/{path}?" + urllib.parse.urlencode(params)
    with urllib.request.urlopen(url, timeout=60) as r:
        return json.load(r)


# ---------- volumen real de conversaciones ----------
d = get(f"{ACT}/insights", {
    "level": "account", "fields": "spend,actions,date_start", "time_increment": 1,
    "time_range": json.dumps({"since": "2026-09-13", "until": "2026-09-19"}),
    "limit": 100})
dias = []
for r in d.get("data", []):
    c = 0
    for a in r.get("actions", []) or []:
        if a["action_type"] in CONV_TYPES:
            c = max(c, int(float(a["value"])))
    dias.append((r["date_start"], float(r["spend"]), c))
dias.sort()

conv_dia = sum(c for _, _, c in dias[:-1]) / max(1, len(dias) - 1)   # sin hoy
gasto_dia = sum(g for _, g, _ in dias[:-1]) / max(1, len(dias) - 1)

print("=" * 74)
print("AGENTE DE META vs BOT PROPIO — cuanto cuesta cada uno")
print("=" * 74)
print()
print("### Tu volumen real (ultimos dias cerrados)")
print()
print(f"{'fecha':<12}{'gasto':>11}{'conv':>7}")
print("-" * 30)
for f, g, c in dias:
    print(f"{f:<12}{g:>11,.0f}{c:>7}")
print("-" * 30)
print(f"{'promedio/dia':<12}{gasto_dia:>11,.0f}{conv_dia:>7.0f}")
print()

# ---------- costo del agente de Meta ----------
print("### 1. Lo que costaria el agente de Meta (US$2 por millon de tokens)")
print()
print(f"{'respuestas/conv':<18}{'tokens/resp':>13}{'COP/dia':>14}{'COP/mes':>14}")
print("-" * 59)
rangos = []
for rc in RESP_POR_CONV:
    for tk in TOK_POR_RESPUESTA:
        resp_dia = conv_dia * rc
        usd_dia = resp_dia * tk / 1_000_000 * USD_POR_MILLON_TOK
        cop_dia = usd_dia * USD_COP
        rangos.append(cop_dia)
        print(f"{rc:<18}{tk:>13,}{cop_dia:>14,.0f}{cop_dia*30:>14,.0f}")
print()
lo, hi = min(rangos), max(rangos)
print(f"  Rango: ${lo:,.0f} a ${hi:,.0f} por dia")
print(f"         ${lo*30:,.0f} a ${hi*30:,.0f} por mes")
print()
print(f"  Contra tu pauta de ${gasto_dia:,.0f}/dia, eso es "
      f"{lo/gasto_dia*100:.0f}%–{hi/gasto_dia*100:.0f}% de la pauta.")
print()

# ---------- efecto en el CPA ----------
print("### 2. Lo que le haria a tu CPA")
print()
CIERRE = 0.084
UDS_PED = 1.3
MARGEN_UD = 23244
ped_dia = conv_dia * CIERRE
uds_dia = ped_dia * UDS_PED
print(f"  {conv_dia:.0f} conv/dia -> {ped_dia:.1f} pedidos -> {uds_dia:.1f} uds")
print()
print(f"{'escenario':<26}{'costo IA/dia':>14}{'$/ud extra':>13}{'margen/ud':>12}")
print("-" * 65)
print(f"{'bot propio (Gemini+Render)':<26}{28000/30:>14,.0f}"
      f"{28000/30/uds_dia:>13,.0f}{MARGEN_UD - 28000/30/uds_dia:>12,.0f}")
for cop_dia in (lo, hi):
    print(f"{'agente de Meta':<26}{cop_dia:>14,.0f}"
          f"{cop_dia/uds_dia:>13,.0f}{MARGEN_UD - cop_dia/uds_dia:>12,.0f}")
print()
print(f"  El margen por unidad es ${MARGEN_UD:,} ANTES de pauta.")
print(f"  Hoy la pauta se lleva ~$11.300/ud. Quedan ~$11.900.")
print(f"  El agente de Meta se llevaria ${lo/uds_dia:,.0f}–${hi/uds_dia:,.0f}/ud mas.")
print()

# ---------- lo que ya pago ----------
print("### 3. Lo que pagaste, y para que sirve")
print()
print("  $359.900 de Meta One (via Google Play):")
print("    ✅ verificacion, mas sesiones, features de IA de las apps")
print("    ❌ NO paga el Business Agent — ese se cobra aparte en Billing Hub")
print()
print("  Es decir: el pago SI funciono, pero no compra lo que necesitas.")
print(f"  El agente se paga con TARJETA en Billing Hub (WhatsApp Manager),")
print("  no por Google Play.")
print()

# ---------- la fecha limite ----------
print("### 4. ⛔ La fecha que importa: 30 de septiembre (faltan 11 dias)")
print()
print("  Desde el 1-oct, sin metodo de pago en Billing Hub, Meta suspende la")
print("  entrega de MENSAJES DE SERVICIO. Eso incluye los que manda un HUMANO")
print("  dentro de la ventana de 24h. No hay periodo de gracia.")
print()
print("  🟢 Lo que NO se afecta: la ventana de 72h que abre un anuncio")
print("     Click-to-WhatsApp. Tu flujo principal (anuncio -> WhatsApp) sigue")
print("     entregando gratis.")
print()
print("  🔴 Lo que SI se afecta: el re-contacto. Los mensajes a los 4.000+")
print("     que no compraron y los 61 leads calientes caen FUERA de esa")
print("     ventana. Sin tarjeta en Billing Hub, esos no salen.")
print()

# ---------- que hacer ya ----------
print("### 5. Orden de lo que conviene hacer")
print()
pasos = [
    ("HOY", "Mensaje de bienvenida + ausencia en el app (gratis, no bloqueado)",
     "corta el trabajo manual del primer toque sin depender del agente"),
    ("HOY", "Bajar/apagar pauta en las horas que no puedes responder",
     f"pagar ${gasto_dia/24:,.0f}/hora por conversaciones que nadie contesta es fuga pura"),
    ("esta semana", "Tarjeta en Billing Hub (WhatsApp Manager)",
     "es requisito para el 1-oct, independiente de que bot uses"),
    ("esta semana", "Bot propio en el NUMERO DE PRUEBA de Meta",
     "riesgo cero, tu numero real no se toca"),
    ("cuando funcione", "Decidir con calma si migrar el numero real",
     "migrar saca el numero del app de WhatsApp Business: no se hace de afan"),
]
for cuando, que, porque in pasos:
    print(f"  [{cuando}] {que}")
    print(f"      -> {porque}")
print()
print("  ⛔ Lo que NO conviene: migrar el numero real hoy, sin dormir y con la")
print("     campana corriendo. El 100% de las ventas entra por ese numero.")
