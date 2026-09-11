#!/usr/bin/env python3
"""
Lector SOLO LECTURA de Meta Marketing API para BikerPro.

Cumple la regla 4-B del archivo madre: el agente LEE, el dueno EJECUTA.
Candado tecnico, no disciplina: este script solo sabe hacer GET.
No existe una sola linea que pueda hacer POST, PUT o DELETE.

USO
  export META_ADS_TOKEN='EAA...'            # o dejarlo en /projects/.meta-ads-token
  python3 analisis/meta-api-lectura.py cuentas
  python3 analisis/meta-api-lectura.py conjuntos act_123456789
  python3 analisis/meta-api-lectura.py insights act_123456789 2026-09-08 2026-09-10

EL TOKEN NUNCA SE ESCRIBE EN ESTE ARCHIVO NI SE IMPRIME.
"""

import json
import os
import sys
import urllib.parse
import urllib.request

TOKEN_FILE = "/projects/.meta-ads-token"
# v21.0 es la mas antigua que probamos; se detecta la mas nueva disponible en runtime.
VERSIONES = ["v25.0", "v24.0", "v23.0", "v22.0", "v21.0"]

# 🔴 MONEDAS SIN DECIMALES (11-sep): Meta devuelve los presupuestos en la "unidad menor"
# de la moneda. En USD la unidad menor es el centavo -> hay que dividir por 100.
# En COP NO HAY centavos: la unidad menor es el peso -> dividir por 100 da un numero
# 100 veces mas chico. La version anterior de este script dividia siempre por 100 y
# mostraba "Domiciliarios VIDEO $550" cuando el presupuesto real es $55.000.
CERO_DECIMALES = {
    "COP", "JPY", "KRW", "VND", "CLP", "ISK", "PYG", "UGX", "VUV",
    "XAF", "XOF", "XPF", "BIF", "DJF", "GNF", "KMF", "MGA", "RWF", "TWD",
}


def token():
    t = os.environ.get("META_ADS_TOKEN", "").strip()
    if not t and os.path.exists(TOKEN_FILE):
        with open(TOKEN_FILE) as f:
            t = f.read().strip()
    if not t:
        sys.exit(
            "FALTA EL TOKEN.\n"
            "  Opcion A (recomendada): guardalo como secreto del sandbox META_ADS_TOKEN\n"
            f"  Opcion B: escribilo en {TOKEN_FILE} (esta FUERA del repo, no se puede commitear)"
        )
    return t


def get(path, params=None):
    """UNICA funcion de red del script. Metodo GET, sin excepcion."""
    params = dict(params or {})
    params["access_token"] = token()
    ultimo_error = None
    for v in VERSIONES:
        url = f"https://graph.facebook.com/{v}/{path}?" + urllib.parse.urlencode(params)
        req = urllib.request.Request(url, method="GET")
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.loads(r.read().decode())
        except urllib.error.HTTPError as e:
            cuerpo = e.read().decode()
            # "unsupported version" -> probar la siguiente. Otro error -> es real, cortar.
            if "version" in cuerpo.lower() and e.code == 400:
                ultimo_error = cuerpo
                continue
            sys.exit(f"ERROR HTTP {e.code} en {v}/{path}\n{cuerpo}")
    sys.exit(f"Ninguna version de la API respondio.\n{ultimo_error}")


def cuentas():
    d = get("me/adaccounts", {"fields": "id,name,account_status,currency,amount_spent", "limit": 50})
    filas = d.get("data", [])
    if not filas:
        print("no hay dato: el token no ve ninguna cuenta publicitaria")
        return
    print(f"{'act_id':<22} {'estado':<8} {'moneda':<7} nombre")
    for c in filas:
        print(f"{c['id']:<22} {str(c.get('account_status','?')):<8} {c.get('currency','?'):<7} {c.get('name','')}")


def divisor(act):
    """Cuanto vale la unidad menor de la moneda de la cuenta. COP -> 1, USD -> 100."""
    moneda = get(act, {"fields": "currency"}).get("currency", "")
    return moneda, (1 if moneda in CERO_DECIMALES else 100)


def conjuntos(act):
    moneda, div = divisor(act)
    d = get(
        f"{act}/adsets",
        {"fields": "name,status,effective_status,daily_budget,targeting{geo_locations}", "limit": 100},
    )
    filas = d.get("data", [])
    if not filas:
        print("no hay dato")
        return
    print(f"moneda de la cuenta: {moneda} (unidad menor = /{div})\n")
    print(f"{'presup/dia':>12}  {'estado':<16} conjunto")
    activos = 0
    for s in sorted(filas, key=lambda x: -int(x.get("daily_budget") or 0)):
        p = int(s.get("daily_budget") or 0) / div
        est = s.get("effective_status", "")
        if est == "ACTIVE":
            activos += p
        print(f"{p:>12,.0f}  {est:<16} {s.get('name','')}")
    print("-" * 50)
    print(f"{activos:>12,.0f}  {'ACTIVE (total)':<16} <- comparar contra el gasto real")


def insights(act, desde, hasta):
    d = get(
        f"{act}/insights",
        {
            "level": "adset",
            "fields": "adset_name,spend,impressions,cpm,frequency,reach,actions,cost_per_action_type",
            "time_range": json.dumps({"since": desde, "until": hasta}),
            "limit": 200,
        },
    )
    filas = d.get("data", [])
    if not filas:
        print("no hay dato para esa ventana")
        return
    print(f"VENTANA {desde} -> {hasta}  (dias CERRADOS unicamente; un dia abierto no se lee)")
    print(f"{'gasto':>10} {'impr':>9} {'CPM':>8} {'conv':>6} {'$/conv':>9} {'conv/mil':>9}  conjunto")
    tot_g = tot_c = tot_i = 0
    for f in filas:
        gasto = float(f.get("spend") or 0)
        impr = int(f.get("impressions") or 0)
        cpm = float(f.get("cpm") or 0)
        conv = 0
        for a in f.get("actions") or []:
            if "messaging_conversation_started" in a.get("action_type", ""):
                conv += int(float(a.get("value", 0)))
        costo = gasto / conv if conv else 0
        cxm = conv / impr * 1000 if impr else 0
        tot_g += gasto
        tot_c += conv
        tot_i += impr
        print(
            f"{gasto:>10,.0f} {impr:>9,} {cpm:>8,.0f} {conv:>6} {costo:>9,.0f} {cxm:>9.2f}"
            f"  {f.get('adset_name','')}"
        )
    print("-" * 80)
    print(
        f"{tot_g:>10,.0f} {tot_i:>9,} {'':>8} {tot_c:>6} "
        f"{(tot_g/tot_c if tot_c else 0):>9,.0f} {(tot_c/tot_i*1000 if tot_i else 0):>9.2f}  TOTAL CUENTA"
    )
    print(
        "\n🔑 conv/mil = conversaciones por cada 1.000 impresiones. Es la calidad de la audiencia.\n"
        "   $/conv = CPM / conv-por-mil. Si el $/conv sube con CPM ESTABLE, el problema es la\n"
        "   AUDIENCIA (se esta yendo a bolsillos mas frios), no la subasta."
    )
    print("\nEquilibrio del tradicional: $2.657/conv | del colmena: $3.322/conv")


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    cmd = sys.argv[1]
    if cmd == "cuentas":
        cuentas()
    elif cmd == "conjuntos" and len(sys.argv) == 3:
        conjuntos(sys.argv[2])
    elif cmd == "insights" and len(sys.argv) == 5:
        insights(sys.argv[2], sys.argv[3], sys.argv[4])
    else:
        sys.exit(__doc__)


if __name__ == "__main__":
    main()
