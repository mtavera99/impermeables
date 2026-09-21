#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CPA REAL — ¿ya mejoramos?

Ojo con tres trampas de este calculo:

 1. NO SE DESPACHA SABADO NI DOMINGO. El export no tiene 5, 6, 12 ni 13 de sep.
    Las ventas del fin de semana salen el lunes. Por eso el lunes 7-sep tiene
    39 guias: son viernes+sabado+domingo juntos. Comparar "gasto del dia contra
    pedidos del dia" mezclaria 3 dias de pauta con 1 de despacho.
    -> Se compara por BLOQUES que incluyan los fines de semana completos.

 2. CPA BRUTO != CPA NETO. El pedido que se devuelve no es una adquisicion.
    El CPA que importa es gasto / pedidos ENTREGADOS.

 3. MADUREZ. El bloque reciente todavia tiene guias sin cerrar, asi que su
    CPA neto se ve MEJOR de lo que va a terminar (menos devoluciones contadas).
    Se reporta el rango, no un punto.
"""
import csv, os, json, urllib.request, urllib.parse
from collections import defaultdict
from datetime import datetime, timedelta

TOKEN = os.environ.get("META_ADS_TOKEN")
ACT = "act_4330882710457791"
V = "v21.0"
ARCH = "analisis/envios-completos-18sep.csv"

ENTREGADA = {"ENTREGADA"}
DEVUELTA = {"DEVOLUCION RATIFICADA", "DEVUELTO", "DEVOLUCION REGIONAL"}

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


# ---------- gasto y conversaciones por dia ----------
gasto, conv = {}, {}
d = get(f"{ACT}/insights", {
    "level": "account", "fields": "spend,impressions,actions,date_start",
    "time_increment": 1, "time_range": json.dumps(
        {"since": "2026-09-01", "until": "2026-09-18"}), "limit": 500,
})
for r in d.get("data", []):
    f = r["date_start"]
    gasto[f] = float(r["spend"])
    c = 0
    for a in r.get("actions", []) or []:
        if a["action_type"] in CONV_TYPES:
            c = max(c, int(float(a["value"])))
    conv[f] = c

# ---------- pedidos del export ----------
ped = []
with open(ARCH, encoding="utf-8") as fh:
    for r in csv.DictReader(fh):
        try:
            rec = float(r["recaudo"])
        except ValueError:
            continue
        e = r["estado"].strip().upper()
        ped.append({
            "fecha": r["fecha"],
            "recaudo": rec,
            "uds": 1 if rec <= 100000 else 2,
            "cls": "entregada" if e in ENTREGADA else (
                "devuelta" if e in DEVUELTA else "abierta"),
        })

print("=" * 76)
print("CPA REAL — ¿ya mejoramos?")
print("=" * 76)
print()

# ---------- dia por dia, para ver el problema ----------
print("### Por que no se puede leer dia por dia")
print()
print(f"{'fecha':<12}{'dia':<5}{'gasto':>10}{'conv':>6}{'guias':>7}  nota")
print("-" * 62)
DIAS = ["lun", "mar", "mie", "jue", "vie", "sab", "dom"]
porfecha = defaultdict(int)
for p in ped:
    porfecha[p["fecha"]] += 1
f0 = datetime(2026, 9, 2)
while f0 <= datetime(2026, 9, 18):
    k = f0.strftime("%Y-%m-%d")
    g = gasto.get(k, 0)
    n = porfecha.get(k, 0)
    nota = ""
    if n == 0 and g > 0:
        nota = "<-- se gasto y NO se despacho"
    elif n >= 28:
        nota = "<-- lote acumulado"
    print(f"{k:<12}{DIAS[f0.weekday()]:<5}{g:>10,.0f}{conv.get(k,0):>6}{n:>7}  {nota}")
    f0 += timedelta(days=1)
print()

# ---------- bloques ----------
def bloque(nom, g_ini, g_fin, d_ini, d_fin):
    gs = sum(v for k, v in gasto.items() if g_ini <= k <= g_fin)
    cv = sum(v for k, v in conv.items() if g_ini <= k <= g_fin)
    xs = [p for p in ped if d_ini <= p["fecha"] <= d_fin]
    ent = sum(1 for p in xs if p["cls"] == "entregada")
    dev = sum(1 for p in xs if p["cls"] == "devuelta")
    ab = len(xs) - ent - dev
    uds = sum(p["uds"] for p in xs)
    uds_ent = sum(p["uds"] for p in xs if p["cls"] == "entregada")
    return dict(nom=nom, gasto=gs, conv=cv, n=len(xs), ent=ent, dev=dev, ab=ab,
                uds=uds, uds_ent=uds_ent,
                g_rango=f"{g_ini[5:]} a {g_fin[5:]}", d_rango=f"{d_ini[5:]} a {d_fin[5:]}")


B1 = bloque("BLOQUE 1", "2026-09-02", "2026-09-11", "2026-09-02", "2026-09-11")
B2 = bloque("BLOQUE 2", "2026-09-12", "2026-09-18", "2026-09-14", "2026-09-18")

print("### Los dos bloques comparables")
print()
for b in (B1, B2):
    print(f"  {b['nom']}  pauta {b['g_rango']}  ·  despachos {b['d_rango']}")
    print(f"    gasto ............... ${b['gasto']:,.0f}")
    print(f"    conversaciones ...... {b['conv']}")
    print(f"    pedidos despachados . {b['n']}")
    print(f"    entregados .......... {b['ent']}")
    print(f"    devueltos ........... {b['dev']}")
    print(f"    sin cerrar .......... {b['ab']}")
    print()

print("### CPA")
print()
print(f"{'':<22}{'BLOQUE 1':>14}{'BLOQUE 2':>14}{'cambio':>12}")
print("-" * 62)


def linea(nom, v1, v2, fmt="${:,.0f}", inv=False):
    if v1 and v2:
        ch = (v2 - v1) / v1 * 100
        flecha = "🟢" if (ch < 0) != inv else "🔴"
        s = f"{ch:+.0f}% {flecha}"
    else:
        s = "—"
    print(f"{nom:<22}{fmt.format(v1):>14}{fmt.format(v2):>14}{s:>12}")


linea("$/conversacion", B1["gasto"]/B1["conv"], B2["gasto"]/B2["conv"])
linea("CPA bruto (despach)", B1["gasto"]/B1["n"], B2["gasto"]/B2["n"])
linea("CPA neto (entregado)", B1["gasto"]/B1["ent"], B2["gasto"]/B2["ent"])
print()
print(f"{'cierre conv->pedido':<22}{B1['n']/B1['conv']*100:>13.1f}%"
      f"{B2['n']/B2['conv']*100:>13.1f}%")
print(f"{'uds por pedido':<22}{B1['uds']/B1['n']:>14.2f}{B2['uds']/B2['n']:>14.2f}")
print()

# ---------- el aviso de madurez ----------
print("### ⚠️ El CPA neto del bloque 2 esta INFLADO a favor")
print()
print(f"  Bloque 1: {B1['ab']}/{B1['n']} guias sin cerrar "
      f"({B1['ab']/B1['n']*100:.0f}%)")
print(f"  Bloque 2: {B2['ab']}/{B2['n']} guias sin cerrar "
      f"({B2['ab']/B2['n']*100:.0f}%)  <-- muchas mas")
print()
print("  Si las del bloque 2 que estan abiertas se devuelven a la tasa de 19%,")
print("  sus entregados finales serian:")
for t in (0.0, 0.19, 0.30):
    ent_fin = B2["ent"] + B2["ab"] * (1 - t)
    print(f"    con {t*100:>2.0f}% de devolucion en las abiertas: "
          f"{ent_fin:.0f} entregados -> CPA neto ${B2['gasto']/ent_fin:,.0f}")
print()
ent_fin1 = B1["ent"] + B1["ab"] * 0.81
print(f"  Bloque 1 con el mismo trato: {ent_fin1:.0f} entregados -> "
      f"CPA neto ${B1['gasto']/ent_fin1:,.0f}")
print()

# ---------- CPA por unidad ----------
print("### CPA por UNIDAD (lo que se compara contra el margen de $23.244)")
print()
for b in (B1, B2):
    uds_fin = b["uds_ent"] + (b["uds"] - b["uds_ent"]) * 0 if False else b["uds_ent"]
    print(f"  {b['nom']}: ${b['gasto']/b['uds_ent']:,.0f} por unidad entregada "
          f"({b['uds_ent']} uds)")
print()
print("  Margen por unidad: $23.244")
for b in (B1, B2):
    cpa_u = b["gasto"] / b["uds_ent"]
    print(f"  {b['nom']}: margen ${23244 - cpa_u:,.0f}/ud "
          f"({cpa_u/23244*100:.0f}% del margen se va en pauta)")
