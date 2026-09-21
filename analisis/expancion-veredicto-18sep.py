#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
¿Está funcionando muy bien 'Domiciliarios - Expancion'?
SOLO LECTURA (GET). Regla 4-B: el agente lee, el dueño ejecuta.

La pregunta real no es "¿rinde?" sino "¿se le puede meter plata?".
Un conjunto que rinde pero no gasta su presupuesto NO es escalable:
si no usa la plata que ya tiene, subirle el presupuesto no hace nada.

OJO con dos trampas medidas en esta misma sesión:
 - En COP, daily_budget viene SIN decimales: 15000 = $15.000. NO dividir por 100.
 - date_preset=last_7d NO incluye hoy. Hay que pedir 'today' aparte.
"""
import os, json, urllib.request, urllib.parse
from collections import defaultdict

TOKEN = os.environ.get("META_ADS_TOKEN")
ACT = "act_4330882710457791"
V = "v21.0"

MARGEN_UD = 23244
UDS_PEDIDO = 1.3
CIERRE = 0.084
EQUILIBRIO_TRAD = 2402
CONV_TYPES = (
    "onsite_conversion.messaging_conversation_started_7d",
    "onsite_conversion.total_messaging_connection",
)


def get(path, params):
    params = dict(params)
    params["access_token"] = TOKEN
    url = f"https://graph.facebook.com/{V}/{path}?" + urllib.parse.urlencode(params)
    with urllib.request.urlopen(url, timeout=60) as r:
        return json.load(r)


def esc(s):
    return str(s).replace("|", "\\|")


def conv_de(r):
    c = 0
    for a in r.get("actions", []) or []:
        if a["action_type"] in CONV_TYPES:
            c = max(c, int(float(a["value"])))
    return c


def metricas(gasto, conv, imp):
    return {
        "gasto": gasto,
        "conv": conv,
        "imp": imp,
        "cpconv": gasto / conv if conv else None,
        "cmil": conv / (imp / 1000) if imp else 0,
        "cpm": gasto / (imp / 1000) if imp else 0,
    }


# ---------- moneda: confirmar el offset en vez de suponerlo ----------
cta = get(ACT, {"fields": "currency,name,amount_spent,spend_cap"})
print(f"Cuenta: {cta['name']} · moneda {cta['currency']}")
print()

# ---------- presupuestos vigentes ----------
sets, after = {}, None
while True:
    p = {"fields": "id,name,daily_budget,effective_status,created_time", "limit": 100}
    if after:
        p["after"] = after
    d = get(f"{ACT}/adsets", p)
    for s in d.get("data", []):
        sets[s["name"]] = s
    cur = d.get("paging", {}).get("cursors", {})
    after = cur.get("after")
    if not d.get("paging", {}).get("next"):
        break

# ---------- insights día por día + hoy aparte ----------
filas = defaultdict(dict)
dias = set()

for preset, incr in (("last_7d", 1), ("today", 1)):
    d = get(
        f"{ACT}/insights",
        {
            "level": "adset",
            "fields": "adset_name,spend,impressions,actions,date_start",
            "time_increment": incr,
            "date_preset": preset,
            "limit": 500,
        },
    )
    for r in d.get("data", []):
        f = r["date_start"]
        dias.add(f)
        filas[r["adset_name"]][f] = metricas(
            float(r["spend"]), conv_de(r), int(r["impressions"])
        )

dias = sorted(dias)
hoy, ayer = dias[-1], dias[-2]
ult4 = dias[-4:]

print("=" * 78)
print(f"EXPANCION: ¿rinde, y se le puede meter plata? — hoy = {hoy}")
print("=" * 78)
print()

nom_exp = [n for n in filas if "Expancion" in n or "Expansion" in n]

# ---------- 1. Expancion día por día ----------
print("### 1. Domiciliarios - Expancion, día por día")
print()
print(f"{'fecha':<12}{'gasto':>10}{'conv':>6}{'$/conv':>10}{'conv/mil':>10}{'CPM':>9}")
print("-" * 57)
for n in nom_exp:
    for f in dias:
        if f in filas[n]:
            d = filas[n][f]
            cp = f"${d['cpconv']:,.0f}" if d["cpconv"] else "SIN CONV"
            print(
                f"{f:<12}{d['gasto']:>10,.0f}{d['conv']:>6}{cp:>10}"
                f"{d['cmil']:>10.2f}{d['cpm']:>9,.0f}"
            )
print()

# ---------- 2. uso de presupuesto: la pregunta que importa ----------
print("### 2. ¿Gasta lo que tiene? (uso del presupuesto diario)")
print(f"    ayer = {ayer} (día cerrado) · hoy = {hoy} (parcial, 18:13)")
print()
print(f"{'conjunto':<30}{'presup':>9}{'ayer':>9}{'uso':>6}{'hoy':>9}{'uso':>6}")
print("-" * 69)
usos = []
for nb, s in sets.items():
    if s.get("effective_status") != "ACTIVE":
        continue
    pres = int(s.get("daily_budget", 0)) if s.get("daily_budget") else 0
    ga = filas.get(nb, {}).get(ayer, {}).get("gasto", 0)
    gh = filas.get(nb, {}).get(hoy, {}).get("gasto", 0)
    usos.append((nb, pres, ga, ga / pres if pres else 0, gh, gh / pres if pres else 0))
for nb, pres, ga, ua, gh, uh in sorted(usos, key=lambda x: -x[5]):
    print(
        f"{esc(nb):<30}{pres:>9,.0f}{ga:>9,.0f}{ua*100:>5.0f}%{gh:>9,.0f}{uh*100:>5.0f}%"
    )
print()

# ---------- 3. ranking de hoy ----------
print(f"### 3. Hoy {hoy} — ranking por $/conv (parcial)")
print()
print(f"{'conjunto':<30}{'gasto':>10}{'conv':>6}{'$/conv':>10}{'conv/mil':>10}")
print("-" * 66)
tg = tc = ti = 0
orden = [(n, dd[hoy]) for n, dd in filas.items() if hoy in dd and dd[hoy]["gasto"] > 0]
for n, d in sorted(orden, key=lambda x: (x[1]["cpconv"] is None, x[1]["cpconv"] or 0)):
    cp = f"${d['cpconv']:,.0f}" if d["cpconv"] else "SIN CONV"
    print(f"{esc(n):<30}{d['gasto']:>10,.0f}{d['conv']:>6}{cp:>10}{d['cmil']:>10.2f}")
    tg += d["gasto"]; tc += d["conv"]; ti += d["imp"]
print("-" * 66)
print(
    f"{'TOTAL':<30}{tg:>10,.0f}{tc:>6}"
    f"{'$'+format(tg/tc if tc else 0,',.0f'):>10}{tc/(ti/1000) if ti else 0:>10.2f}"
)
print()

# ---------- 4. Motorizados: la tendencia ----------
print("### 4. Motorizados — 4 días")
print()
for n in [x for x in filas if "Motorizados" in x]:
    print(f"{'fecha':<12}{'gasto':>10}{'conv':>6}{'$/conv':>10}{'conv/mil':>10}")
    print("-" * 48)
    for f in ult4:
        if f in filas[n]:
            d = filas[n][f]
            cp = f"${d['cpconv']:,.0f}" if d["cpconv"] else "SIN CONV"
            print(f"{f:<12}{d['gasto']:>10,.0f}{d['conv']:>6}{cp:>10}{d['cmil']:>10.2f}")
print()

# ---------- 5. plata ----------
print("### 5. ¿Cuánta plata deja Expancion?")
print()
for n in nom_exp:
    for f in dias:
        if f in filas[n] and filas[n][f]["conv"]:
            d = filas[n][f]
            ped = d["conv"] * CIERRE
            uds = ped * UDS_PEDIDO
            bruto = uds * MARGEN_UD
            print(
                f"{f}: {d['conv']} conv → {ped:.1f} pedidos → {uds:.1f} uds → "
                f"bruto ${bruto:,.0f} − pauta ${d['gasto']:,.0f} = "
                f"utilidad ${bruto - d['gasto']:,.0f}"
            )
print()
print(f"Equilibrio tradicional: ${EQUILIBRIO_TRAD:,}/conv")
