#!/usr/bin/env python3
"""
COMO VA LA CAMPANA HOY (sabado 12-sep-2026)
============================================
Responde: el dia va bien o va mal, y de quien es la culpa.

La trampa que evita: un sabado NO se compara contra un viernes. Los sabados
tienen su propia curva (menos gente en el trabajo mirando el celular, mas
gente en la calle). Asi que compara sabado contra sabado, y ademas compara
el dia PARCIAL de hoy contra el mismo TRAMO de esos sabados (no contra su
dia completo), que es el error de la ventana censurada que ya nos costo
cuatro correcciones.

SOLO LECTURA (regla 4-B). Unicamente GET.
"""

import datetime as dt
import importlib.util
import json
import os
import sys

_spec = importlib.util.spec_from_file_location(
    "lector", os.path.join(os.path.dirname(os.path.abspath(__file__)), "meta-api-lectura.py")
)
lector = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(lector)

ACT = "act_4330882710457791"
HORA_CORTE = 14          # hasta que hora tenemos dato de hoy
SABADOS = ["2026-08-29", "2026-09-05", "2026-09-12"]


def conv_de(fila):
    """Conversaciones de WhatsApp iniciadas. Es la unica conversion que importa."""
    for a in fila.get("actions") or []:
        if "messaging_conversation_started" in a.get("action_type", ""):
            return float(a["value"])
    return 0.0


def trae(desde, hasta, nivel, por_hora):
    p = {
        "level": nivel,
        "fields": "adset_name,spend,impressions,cpm,actions",
        "time_range": json.dumps({"since": desde, "until": hasta}),
        "time_increment": 1,
        "limit": 500,
    }
    if por_hora:
        p["breakdowns"] = "hourly_stats_aggregated_by_advertiser_time_zone"
    return lector.get(f"{ACT}/insights", p).get("data", [])


def hora_de(fila):
    t = fila.get("hourly_stats_aggregated_by_advertiser_time_zone", "")
    return int(t.split(":")[0]) if t else -1


# ---------------------------------------------------------------- 1. el dia
print("=" * 74)
print("1. SABADO CONTRA SABADO, MISMO TRAMO DEL DIA (00:00 - %02d:59 Bogota)" % HORA_CORTE)
print("=" * 74)
print("   Comparar el dia parcial de hoy contra el dia COMPLETO de otro sabado")
print("   es el error de la ventana censurada. Aqui se recorta el otro sabado.\n")

filas = trae(SABADOS[0], SABADOS[-1], "account", True)
tramo = {}
for f in filas:
    if hora_de(f) <= HORA_CORTE:
        d = tramo.setdefault(f["date_start"], {"g": 0.0, "i": 0, "c": 0.0})
        d["g"] += float(f.get("spend", 0))
        d["i"] += int(f.get("impressions", 0))
        d["c"] += conv_de(f)

print("   fecha         gasto     impres.       CPM   conv   $/conv")
print("   " + "-" * 62)
for fecha in sorted(tramo):
    d = tramo[fecha]
    cpm = d["g"] / d["i"] * 1000 if d["i"] else 0
    pc = d["g"] / d["c"] if d["c"] else 0
    dia = dt.date.fromisoformat(fecha).strftime("%a")
    marca = "  <-- HOY" if fecha == SABADOS[-1] else ""
    print(
        "   %s %s  $%9s  %9s  $%7s  %5.0f  $%7s%s"
        % (fecha, dia, f"{d['g']:,.0f}", f"{d['i']:,}", f"{cpm:,.0f}", d["c"],
           f"{pc:,.0f}" if pc else "  -", marca)
    )

# --------------------------------------------------- 2. quien esta entregando
print()
print("=" * 74)
print("2. HOY, CONJUNTO POR CONJUNTO: CUANTO DEL PRESUPUESTO SE ESTA GASTANDO")
print("=" * 74)

presup = {
    "Domiciliarios VIDEO": 55_000,
    "Domiciliarios": 45_000,
    "TEST Creativos": 25_000,
    "Motorizados": 9_000,
    "Domiciliarios | Tolima Huila": 5_000,
    "Domiciliarios | Eje Cafetero": 5_000,
    "Domiciliarios | Santander": 5_000,
    "Domiciliarios | Valle del cauca": 5_000,
}

hoy = SABADOS[-1]
por_conj = {}
for f in trae(hoy, hoy, "adset", False):
    n = f["adset_name"]
    d = por_conj.setdefault(n, {"g": 0.0, "i": 0, "c": 0.0})
    d["g"] += float(f.get("spend", 0))
    d["i"] += int(f.get("impressions", 0))
    d["c"] += conv_de(f)

# a las 14:48 de un dia de 24h, lo "esperado" a ritmo parejo es 62% del presupuesto
frac = (HORA_CORTE + 0.8) / 24
print("   A esta hora (%.0f%% del dia corrido) un conjunto a ritmo parejo\n"
      "   deberia ir en ~%.0f%% de su presupuesto.\n" % (frac * 100, frac * 100))
print("   conjunto                          presup     gastado   uso   conv   $/conv")
print("   " + "-" * 70)
tg = tc = tp = 0.0
for n, p in sorted(presup.items(), key=lambda x: -x[1]):
    d = por_conj.get(n, {"g": 0.0, "i": 0, "c": 0.0})
    uso = d["g"] / p * 100 if p else 0
    pc = d["g"] / d["c"] if d["c"] else 0
    señal = "🔴" if uso < frac * 100 * 0.5 else ("🟡" if uso < frac * 100 * 0.8 else "🟢")
    print(
        "   %s %-30s %7s  %10s  %3.0f%%  %5.0f  $%7s"
        % (señal, n[:30], f"{p:,}", f"{d['g']:,.0f}", uso, d["c"],
           f"{pc:,.0f}" if pc else "  -")
    )
    tg += d["g"]
    tc += d["c"]
    tp += p
# lo que gasto algo que NO esta en la lista de activos (colmena encendida a medias, etc.)
extra = {n: d for n, d in por_conj.items() if n not in presup and d["g"] > 0}
for n, d in extra.items():
    print("   ⚪ %-30s      -   %10s    -   %5.0f  (conjunto fuera de la lista activa)"
          % (n[:30], f"{d['g']:,.0f}", d["c"]))
    tg += d["g"]
    tc += d["c"]
print("   " + "-" * 70)
print("   %-33s %7s  %10s  %3.0f%%  %5.0f  $%7s"
      % ("TOTAL", f"{tp:,}", f"{tg:,.0f}", tg / tp * 100, tc,
         f"{tg/tc:,.0f}" if tc else "  -"))

# --------------------------------------------- 3. las 4 regiones, ultimos dias
print()
print("=" * 74)
print("3. LAS 4 REGIONES DIA POR DIA (venian frenadas el 11-sep)")
print("=" * 74)
desde = str(dt.date.fromisoformat(hoy) - dt.timedelta(days=4))
reg = {}
for f in trae(desde, hoy, "adset", False):
    n = f["adset_name"]
    if "|" not in n or "Colmena" in n:
        continue
    reg.setdefault(n, {})[f["date_start"]] = float(f.get("spend", 0))
fechas = sorted({d for v in reg.values() for d in v})
print("   conjunto (presup $5.000/dia)   " + "  ".join(
    dt.date.fromisoformat(d).strftime("%d-%a") for d in fechas))
print("   " + "-" * 70)
for n in sorted(reg):
    celdas = []
    for d in fechas:
        g = reg[n].get(d, 0)
        celdas.append("%5.0f%%" % (g / 5000 * 100))
    print("   %-29s " % n[:29] + " ".join(f"{c:>7}" for c in celdas))
print("\n   (hoy va a mitad de dia: 60-70% seria ritmo normal, no 100%)")
print()
