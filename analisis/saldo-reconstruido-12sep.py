#!/usr/bin/env python3
"""
LIBRO DE SALDO RECONSTRUIDO  (hallazgo del 12-sep-2026)
=======================================================
El campo `balance` de la cuenta esta prohibido para el token de solo lectura
((#10) Permission Denied). PERO el endpoint /activities SI se lee con ads_read,
y ahi quedan grabados los dos movimientos que mueven el saldo:

    "Dinero agregado al saldo"  -> recarga (entra plata)
    "Cuenta facturada"          -> Meta cobra el consumo (sale plata)

Con eso se arma el libro de caja y se puede AVISAR ANTES de que la cuenta se
seque, en vez de descubrir el hueco al dia siguiente mirando la curva horaria.

Tambien saca el historial de cambios de presupuesto, que es la unica forma de
saber "quien movio que y cuando" sin depender de la memoria.

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


def actividades(desde, hasta):
    """Pagina /activities completo en la ventana pedida."""
    salida, params = [], {
        "fields": "event_type,event_time,object_name,extra_data,translated_event_type",
        "since": desde, "until": hasta, "limit": 500,
    }
    d = lector.get(f"{ACT}/activities", params)
    salida += d.get("data", [])
    # el cursor 'after' viene en paging; seguimos hasta 10 paginas por seguridad
    for _ in range(10):
        sig = (d.get("paging") or {}).get("cursors", {}).get("after")
        if not sig or not d.get("data"):
            break
        p = dict(params, after=sig)
        d = lector.get(f"{ACT}/activities", p)
        nuevos = d.get("data", [])
        if not nuevos:
            break
        salida += nuevos
    return salida


def ex(a):
    try:
        return json.loads(a.get("extra_data") or "{}")
    except Exception:
        return {}


def main():
    hasta = sys.argv[2] if len(sys.argv) > 2 else str(dt.date.today() + dt.timedelta(days=1))
    desde = sys.argv[1] if len(sys.argv) > 1 else str(dt.date.today() - dt.timedelta(days=10))

    actos = actividades(desde, hasta)
    print("=" * 78)
    print("LIBRO DE CAJA DE LA CUENTA PUBLICITARIA  %s -> %s" % (desde, hasta))
    print("=" * 78)
    print("  (%d eventos leidos de /activities)\n" % len(actos))

    mov = []
    for a in actos:
        t = (a.get("translated_event_type") or a.get("event_type") or "")
        e = ex(a)
        if "Dinero agregado" in t or a.get("event_type") == "add_funds":
            mon = e.get("amount") or e.get("provider_amount") or 0
            mov.append((a["event_time"], +float(mon), "RECARGA"))
        elif "facturada" in t or a.get("event_type") == "account_billed":
            mon = e.get("new_value") or 0
            mov.append((a["event_time"], -float(mon), "COBRO DE META"))

    if not mov:
        print("  no aparecio ningun movimiento de saldo en la ventana.")
    else:
        mov.sort()
        print("  fecha y hora (zona de la cuenta)      movimiento        monto      acumulado")
        print("  " + "-" * 72)
        acum = 0.0
        for t, m, q in mov:
            acum += m
            print("  %-36s  %-14s  %s%9s   %10s"
                  % (t, q, "+" if m > 0 else "-", f"{abs(m):,.0f}", f"{acum:,.0f}"))
        print("  " + "-" * 72)
        print("  NETO en la ventana: %s%s" % ("+" if acum >= 0 else "-", f"{abs(acum):,.0f}"))
        print("\n  OJO: el acumulado NO es el saldo. Es el neto de lo que entro menos lo")
        print("  que Meta ya cobro. Meta cobra con retraso (por umbral o por dia), asi")
        print("  que el consumo de HOY casi nunca esta cobrado todavia.")

        # cuanto lleva gastado despues del ultimo cobro -> eso es lo que falta cobrar
        ult_cobro = max((t for t, m, q in mov if m < 0), default=None)
        if ult_cobro:
            print("\n  ultimo cobro registrado: %s" % ult_cobro)

    # ------------------------------------------------ cambios de presupuesto
    print()
    print("=" * 78)
    print("CAMBIOS DE PRESUPUESTO Y DE ESTADO (quien movio que)")
    print("=" * 78)
    filas = []
    for a in actos:
        t = (a.get("translated_event_type") or a.get("event_type") or "")
        e = ex(a)
        tipo = e.get("type", "")
        if ("presupuesto" in t.lower() and "programaci" not in t.lower()) or "budget" in str(tipo):
            v, n = e.get("old_value"), e.get("new_value")
            if isinstance(v, dict) or isinstance(n, dict):
                v = (v or {}).get("new_value", v) if isinstance(v, dict) else v
                n = (n or {}).get("new_value", n) if isinstance(n, dict) else n
            filas.append((a["event_time"], "PRESUPUESTO", a.get("object_name", ""), f"{v} -> {n}"))
        elif "Estado de la campa" in t or "Estado del conjunto" in t:
            filas.append((a["event_time"], "ESTADO", a.get("object_name", ""),
                          "%s -> %s" % (e.get("old_value"), e.get("new_value"))))
    filas.sort(reverse=True)
    if not filas:
        print("  sin cambios de presupuesto ni de estado en la ventana.")
    for t, q, o, c in filas[:40]:
        print("  %-30s %-11s %-32s %s" % (t, q, o[:32], str(c)[:40]))
    print()


if __name__ == "__main__":
    main()
