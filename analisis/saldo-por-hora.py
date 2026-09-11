#!/usr/bin/env python3
"""
DETECTOR DE HUECOS DE SALDO (2026-09-11)
=========================================
La cuenta es PREPAGO ("Fondos disponibles"). Cuando se queda sin saldo:
  1. deja de entregar durante horas
  2. al recargar, Meta ACELERA y gasta de golpe para recuperar el dia
  3. esa hora de rebote compra el inventario mas barato y mas frio que hay
  4. y arruina el $/conv del DIA COMPLETO, de todos los conjuntos a la vez

Eso fue lo que paso el 9-sep (muerta 14-17h, luego $49.334 en UNA hora) y
lo que hizo creer que "Motorizados se estaba muriendo". Ver seccion 0-AI.

USO
  python3 analisis/saldo-por-hora.py                      # ultimos 4 dias
  python3 analisis/saldo-por-hora.py 2026-09-08 2026-09-11

SOLO LECTURA (regla 4-B). Unicamente GET.
"""

import collections
import datetime as dt
import json
import sys

sys.path.insert(0, __file__.rsplit("/", 1)[0])
from importlib import import_module

_lector = import_module("meta-api-lectura".replace("-", "_")) if False else None

# Reusamos la funcion de red del lector oficial para no duplicar el manejo del token.
import importlib.util
import os

_spec = importlib.util.spec_from_file_location(
    "lector", os.path.join(os.path.dirname(os.path.abspath(__file__)), "meta-api-lectura.py")
)
lector = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(lector)

ACT = "act_4330882710457791"
UMBRAL_SECO = 2_000      # una hora por debajo de esto, de dia, es sospechosa
FACTOR_REBOTE = 3.0      # una hora que supera 3x el promedio del dia es un rebote


def main():
    if len(sys.argv) == 3:
        desde, hasta = sys.argv[1], sys.argv[2]
    else:
        hoy = dt.date.today()
        desde, hasta = str(hoy - dt.timedelta(days=3)), str(hoy)

    d = lector.get(
        f"{ACT}/insights",
        {
            "level": "account",
            "fields": "spend,impressions",
            "breakdowns": "hourly_stats_aggregated_by_advertiser_time_zone",
            "time_range": json.dumps({"since": desde, "until": hasta}),
            "time_increment": 1,
            "limit": 500,
        },
    )
    rows = d.get("data", [])
    if not rows:
        print("no hay dato para esa ventana")
        return

    tab = collections.defaultdict(dict)
    for r in rows:
        h = r["hourly_stats_aggregated_by_advertiser_time_zone"][:5]
        tab[r["date_start"]][h] = float(r.get("spend") or 0)

    print("=" * 74)
    print(f"CURVA HORARIA DE GASTO  {desde} -> {hasta}")
    print("=" * 74)

    for dia in sorted(tab):
        horas = tab[dia]
        total = sum(horas.values())
        prom = total / max(len(horas), 1)
        # solo miramos huecos en horario diurno: de madrugada es normal gastar poco
        diurnas = {h: v for h, v in horas.items() if 8 <= int(h[:2]) <= 22}
        secas = sorted(h for h, v in diurnas.items() if v < UMBRAL_SECO)
        picos = sorted(h for h, v in horas.items() if v > prom * FACTOR_REBOTE)

        # 🔑 Un pico NO es un rebote de saldo por si solo: entre las 18 y las 21 hay un
        # pico de audiencia REAL (la gente esta activa). Solo cuenta como rebote si viene
        # INMEDIATAMENTE DESPUES de una racha seca de 2+ horas seguidas de dia.
        rachas = []
        actual = []
        for h in sorted(diurnas):
            if h in secas:
                actual.append(h)
            else:
                if len(actual) >= 2:
                    rachas.append(actual)
                actual = []
        if len(actual) >= 2:
            rachas.append(actual)

        rebotes = []
        for racha in rachas:
            fin = int(racha[-1][:2])
            for p in picos:
                if fin < int(p[:2]) <= fin + 2:   # el rebote llega en las 2 h siguientes
                    rebotes.append(p)
        rebotes = sorted(set(rebotes))

        print(f"\n{dia}   total ${total:>10,.0f}   promedio/hora ${prom:>8,.0f}")
        for h in sorted(horas):
            v = horas[h]
            barra = "#" * int(v / (prom / 8)) if prom else ""
            marca = ""
            if h in secas:
                marca = "  <-- SECO"
            elif h in rebotes:
                marca = f"  <-- REBOTE DE SALDO ({v/prom:.1f}x el promedio)"
            elif h in picos:
                marca = f"  <-- pico de audiencia ({v/prom:.1f}x) - NORMAL"
            print(f"   {h} {v:>10,.0f}  {barra[:46]}{marca}")

        print(f"   {'-'*66}")
        if rachas and rebotes:
            secas_en_racha = [h for r in rachas for h in r]
            perdido = len(secas_en_racha) * prom - sum(diurnas[h] for h in secas_en_racha)
            print(f"   🔴 DIA CONTAMINADO: racha seca {rachas} + rebote en {rebotes}")
            print(f"      entrega perdida estimada: ${perdido:,.0f}")
            print(f"      >>> ESTE DIA NO SE COMPARA CON NINGUNO. Su $/conv esta inflado")
            print(f"          por el rebote y su volumen subestimado por el hueco.")
        elif rachas:
            print(f"   🟠 racha seca de dia {rachas}, pero SIN rebote despues.")
            print(f"      Se quedo sin saldo y no recargo ese dia, o fue audiencia.")
        elif secas:
            print(f"   🟢 horas flojas sueltas {secas}, sin racha. Ruido normal.")
        else:
            print(f"   🟢 dia limpio: sin huecos diurnos. Se puede comparar.")
        if picos and not rebotes:
            print(f"   📌 el pico de {picos} es audiencia real (la gente activa de noche),")
            print(f"      no un rebote: no viene despues de una racha seca.")

    print("\n" + "=" * 74)
    print("REGLA (0-AI): antes de comparar dos dias, mirar su curva horaria.")
    print("Un hueco de saldo + una hora de rebote arruina el $/conv del dia COMPLETO")
    print("y de TODOS los conjuntos a la vez. Eso fue el 9-sep.")
    print("=" * 74)


if __name__ == "__main__":
    main()
