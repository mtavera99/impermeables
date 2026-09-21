#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
¿A que horas llegan las conversaciones, y cuanto cuesta la hora que nadie contesta?

Con el agente bloqueado, una conversacion que entra a las 3am y se contesta a
las 8am es una conversacion que probablemente ya se perdio. Eso no es un costo
de oportunidad abstracto: es pauta ya pagada.
SOLO LECTURA.
"""
import os, json, urllib.request, urllib.parse
from collections import defaultdict

TOKEN = os.environ.get("META_ADS_TOKEN")
ACT = "act_4330882710457791"
V = "v21.0"
CONV_TYPES = ("onsite_conversion.messaging_conversation_started_7d",
              "onsite_conversion.total_messaging_connection")


def get(path, params):
    params = dict(params)
    params["access_token"] = TOKEN
    url = f"https://graph.facebook.com/{V}/{path}?" + urllib.parse.urlencode(params)
    with urllib.request.urlopen(url, timeout=90) as r:
        return json.load(r)


d = get(f"{ACT}/insights", {
    "level": "account", "fields": "spend,impressions,actions",
    "breakdowns": "hourly_stats_aggregated_by_advertiser_time_zone",
    "time_range": json.dumps({"since": "2026-09-13", "until": "2026-09-18"}),
    "limit": 200})

horas = defaultdict(lambda: {"g": 0.0, "c": 0, "i": 0})
for r in d.get("data", []):
    h = r["hourly_stats_aggregated_by_advertiser_time_zone"]
    hh = int(h.split(":")[0])
    c = 0
    for a in r.get("actions", []) or []:
        if a["action_type"] in CONV_TYPES:
            c = max(c, int(float(a["value"])))
    horas[hh]["g"] += float(r["spend"])
    horas[hh]["c"] += c
    horas[hh]["i"] += int(r["impressions"])

tot_g = sum(v["g"] for v in horas.values())
tot_c = sum(v["c"] for v in horas.values())

print("=" * 70)
print("CONVERSACIONES POR HORA — 13 al 18 de sep (6 dias, hora Bogota)")
print("=" * 70)
print()
print(f"{'hora':<7}{'gasto':>11}{'conv':>7}{'$/conv':>10}{'% gasto':>9}{'% conv':>8}")
print("-" * 54)
for h in range(24):
    v = horas.get(h)
    if not v:
        continue
    cp = v["g"]/v["c"] if v["c"] else 0
    print(f"{h:02d}:00  {v['g']:>11,.0f}{v['c']:>7}"
          f"{(f'${cp:,.0f}' if v['c'] else '—'):>10}"
          f"{v['g']/tot_g*100:>8.1f}%{v['c']/tot_c*100:>7.1f}%")
print("-" * 54)
print(f"{'TOTAL':<7}{tot_g:>11,.0f}{tot_c:>7}{'$'+format(tot_g/tot_c,',.0f'):>10}")
print()

# ---------- bloques ----------
BLOQUES = [
    ("madrugada 00-06", range(0, 7), "dormido"),
    ("manana 07-11", range(7, 12), "despierto"),
    ("tarde 12-17", range(12, 18), "despierto"),
    ("noche 18-23", range(18, 24), "despierto"),
]
print("### Por bloque")
print()
print(f"{'bloque':<18}{'gasto':>12}{'conv':>7}{'$/conv':>10}{'% gasto':>9}")
print("-" * 56)
for nom, rg, _ in BLOQUES:
    g = sum(horas[h]["g"] for h in rg if h in horas)
    c = sum(horas[h]["c"] for h in rg if h in horas)
    print(f"{nom:<18}{g:>12,.0f}{c:>7}{(f'${g/c:,.0f}' if c else '—'):>10}"
          f"{g/tot_g*100:>8.1f}%")
print()

mad_g = sum(horas[h]["g"] for h in range(0, 7) if h in horas)
mad_c = sum(horas[h]["c"] for h in range(0, 7) if h in horas)
print("### La madrugada, en plata")
print()
print(f"  gasto 00:00–06:59 en 6 dias ..... ${mad_g:,.0f}")
print(f"  por dia ......................... ${mad_g/6:,.0f}")
print(f"  por mes ......................... ${mad_g/6*30:,.0f}")
print(f"  conversaciones .................. {mad_c} ({mad_c/tot_c*100:.1f}% del total)")
if mad_c:
    print(f"  $/conv de la madrugada .......... ${mad_g/mad_c:,.0f}")
    resto_g = tot_g - mad_g
    resto_c = tot_c - mad_c
    print(f"  $/conv del resto del dia ........ ${resto_g/resto_c:,.0f}")
    dif = mad_g/mad_c - resto_g/resto_c
    print(f"  diferencia ...................... ${dif:+,.0f} "
          f"({'mas caro' if dif > 0 else 'mas barato'})")
print()
print("  🔑 Si la madrugada es MAS BARATA por conversacion, apagarla no es")
print("     obvio: seria apagar las conversaciones mas baratas. Lo que hay que")
print("     medir no es el precio, es si esas conversaciones CIERRAN cuando se")
print("     contestan 5 horas despues.")
