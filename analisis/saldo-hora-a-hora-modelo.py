#!/usr/bin/env python3
"""
MODELO DE SALDO HORA POR HORA, Y SU VALIDACION
==============================================
Idea: en una cuenta PREPAGO el saldo baja con el gasto y sube con las recargas.
"Cuenta facturada" NO es una salida extra de plata: es la factura de un gasto
que ya se descontó. Si se restan las dos cosas se descuenta doble.

Como no podemos leer el saldo (permiso denegado), lo reconstruimos:

    saldo(t) = ancla + recargas hasta t - gasto hasta t

y el ancla ya no se adivina: el saldo real se lee como spend_cap - amount_spent
(ver nota abajo). Con eso el libro queda amarrado a un dato duro.

VALIDACION (lo que hace que esto sea creíble y no un cuento): con el ancla
puesta, el modelo tiene que predecir SOLO las horas secas que de verdad
pasaron, sin inventar otras. Eso se imprime abajo.

SOLO LECTURA (regla 4-B). Unicamente GET.
"""

import datetime as dt
import importlib.util
import json
import os

_spec = importlib.util.spec_from_file_location(
    "lector", os.path.join(os.path.dirname(os.path.abspath(__file__)), "meta-api-lectura.py")
)
lector = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(lector)

_spec2 = importlib.util.spec_from_file_location(
    "libro", os.path.join(os.path.dirname(os.path.abspath(__file__)), "saldo-reconstruido-12sep.py")
)
libro = importlib.util.module_from_spec(_spec2)
_spec2.loader.exec_module(libro)

ACT = "act_4330882710457791"
DESDE, HASTA = "2026-09-05", "2026-09-12"
TZ_OFFSET = -5           # Bogota = UTC-5
SECO = 2_000             # gasto por hora por debajo de esto, de dia, = sin entrega

# ---------------------------------------------------------------------------
# HALLAZGO 12-sep: el saldo SI se puede leer, aunque el campo `balance` este
# prohibido. En una cuenta prepago:
#
#       saldo disponible  =  spend_cap  -  amount_spent
#
# `spend_cap` no es un tope que alguien puso a mano: sube solo, exactamente
# el monto de cada recarga (paso de 4.582.000 a 4.682.000 el 12-sep, que es
# la recarga de +100.000 de las 02:41). Y la resta dio 95.442 el 11-sep,
# cuando la pantalla de facturacion mostraba "Saldo actual 93.973".
#
# Eso convierte el modelo en un ancla DURA: ya no hay que adivinar.
# ---------------------------------------------------------------------------


def saldo_real_ahora():
    d = lector.get(ACT, {"fields": "spend_cap,amount_spent"})
    return float(d.get("spend_cap") or 0) - float(d.get("amount_spent") or 0)


def gasto_por_hora():
    d = lector.get(f"{ACT}/insights", {
        "level": "account", "fields": "spend",
        "breakdowns": "hourly_stats_aggregated_by_advertiser_time_zone",
        "time_range": json.dumps({"since": DESDE, "until": HASTA}),
        "time_increment": 1, "limit": 1000,
    })
    out = {}
    for f in d.get("data", []):
        h = f.get("hourly_stats_aggregated_by_advertiser_time_zone", "")
        if not h:
            continue
        t = dt.datetime.fromisoformat(f["date_start"]) + dt.timedelta(hours=int(h.split(":")[0]))
        out[t] = float(f.get("spend", 0))
    return out


def recargas():
    """Recargas en hora Bogota. /activities devuelve UTC (+0000)."""
    out = []
    for a in libro.actividades("2026-09-04", "2026-09-13"):
        t = (a.get("translated_event_type") or a.get("event_type") or "")
        if "Dinero agregado" not in t and a.get("event_type") != "add_funds":
            continue
        e = libro.ex(a)
        monto = float(e.get("amount") or e.get("provider_amount") or 0)
        tu = dt.datetime.strptime(a["event_time"][:19], "%Y-%m-%dT%H:%M:%S")
        out.append((tu + dt.timedelta(hours=TZ_OFFSET), monto))
    return sorted(out)


g = gasto_por_hora()
r = recargas()
horas = sorted(g)

# ---- construir el saldo relativo (sin ancla) y luego desplazarlo
rel, acum = {}, 0.0
for t in horas:
    entra = sum(m for tt, m in r if t <= tt < t + dt.timedelta(hours=1))
    acum += entra - g[t]
    rel[t] = acum

# ancla DURA: el saldo real de este momento, leido de la API
ancla_v = saldo_real_ahora()
desp = ancla_v - rel[horas[-1]]
saldo = {t: rel[t] + desp for t in horas}

print("=" * 82)
print("SALDO RECONSTRUIDO HORA POR HORA (hora Bogota)")
print("=" * 82)
print("   ancla dura: spend_cap - amount_spent = $%s  (ahora mismo)" % f"{ancla_v:,.0f}")
print("\nRECARGAS DETECTADAS (hora Bogota):")
for t, m in r:
    print("   %s   +%9s" % (t.strftime("%Y-%m-%d %H:%M"), f"{m:,.0f}"))

print("\n" + "-" * 82)
print("VALIDACION: horas secas OBSERVADAS vs horas que el modelo dice sin saldo")
print("-" * 82)
obs, pred = set(), set()
for t in horas:
    if 6 <= t.hour <= 22:                      # solo horas de dia
        if g[t] < SECO:
            obs.add(t)
        if saldo[t] <= 3_000:                  # el modelo dice: no hay con que pagar
            pred.add(t)
aciertos = sorted(obs & pred)
falsa_alarma = sorted(pred - obs)
no_visto = sorted(obs - pred)
print("   secas observadas y predichas (aciertos): %d" % len(aciertos))
for t in aciertos:
    print("      ✅ %s  gasto $%-7s saldo modelado $%s"
          % (t.strftime("%d-%b %H:%M"), f"{g[t]:,.0f}", f"{saldo[t]:,.0f}"))
print("   el modelo grita y NO estaba seca (falsa alarma): %d" % len(falsa_alarma))
for t in falsa_alarma[:8]:
    print("      ⚠️  %s  gasto $%-7s saldo modelado $%s"
          % (t.strftime("%d-%b %H:%M"), f"{g[t]:,.0f}", f"{saldo[t]:,.0f}"))
print("   estaba seca y el modelo NO lo vio: %d" % len(no_visto))
for t in no_visto[:8]:
    print("      ❌ %s  gasto $%-7s saldo modelado $%s"
          % (t.strftime("%d-%b %H:%M"), f"{g[t]:,.0f}", f"{saldo[t]:,.0f}"))

# ---- saldo al arrancar cada dia vs cuanto entregaron los conjuntos chicos
print("\n" + "-" * 82)
print("SALDO AL EMPEZAR EL DIA (06:00)  vs  ENTREGA DE LOS CONJUNTOS DE $5.000")
print("-" * 82)
d = lector.get(f"{ACT}/insights", {
    "level": "adset", "fields": "adset_name,spend",
    "time_range": json.dumps({"since": DESDE, "until": HASTA}),
    "time_increment": 1, "limit": 500,
})
chicos, cuenta = {}, {}
for f in d.get("data", []):
    n, fe = f["adset_name"], f["date_start"]
    cuenta[fe] = cuenta.get(fe, 0.0) + float(f.get("spend", 0))
    if "|" in n and "Colmena" not in n:
        chicos.setdefault(fe, {"g": 0.0, "n": 0})
        chicos[fe]["g"] += float(f.get("spend", 0))
        chicos[fe]["n"] += 1
print("   dia        saldo 06:00   gasto cuenta   uso 154k   regiones ($5k c/u)")
print("   " + "-" * 68)
for fe in sorted(cuenta):
    t6 = dt.datetime.fromisoformat(fe) + dt.timedelta(hours=6)
    s = saldo.get(t6)
    c = chicos.get(fe)
    uso_r = (c["g"] / (5000 * c["n"]) * 100) if c and c["n"] else None
    print("   %s %s  %12s   %8.0f%%   %s"
          % (fe, dt.date.fromisoformat(fe).strftime("%a"),
             f"${s:,.0f}" if s is not None else "     -",
             cuenta[fe] / 154000 * 100,
             ("%3.0f%% (%d conj)" % (uso_r, c["n"])) if uso_r is not None else "-"))

# ---- proyeccion de hoy
print("\n" + "-" * 82)
print("HOY: CUANTO SALDO QUEDA Y PARA CUANTAS HORAS")
print("-" * 82)
ult = horas[-1]
s_ahora = saldo[ult]
ritmo = sum(g[t] for t in horas if t >= ult - dt.timedelta(hours=5)) / 6
print("   ultima hora con dato:      %s" % ult.strftime("%Y-%m-%d %H:%M"))
print("   saldo estimado ahi:        $%s" % f"{s_ahora:,.0f}")
print("   ritmo de las ultimas 6h:   $%s / hora" % f"{ritmo:,.0f}")
if ritmo > 0:
    print("   alcanza para:              %.1f horas  -> se seca ~%s"
          % (s_ahora / ritmo, (ult + dt.timedelta(hours=1 + s_ahora / ritmo)).strftime("%H:%M")))
print("\n   ⚠️  es una ESTIMACION. El unico dato duro esta en el Centro de facturacion.")
print()
