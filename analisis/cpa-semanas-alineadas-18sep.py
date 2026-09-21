#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
CPA con SEMANAS ALINEADAS — corrige mi propio sesgo del intento anterior.

Lo que hice mal hace un momento:
  Compare "bloque 1 = pauta 2-11 sep / despachos 2-11 sep" contra
  "bloque 2 = pauta 12-18 / despachos 14-18".
  El bloque 1 incluia los despachos del 2, 3 y 4 de sep SIN incluir la pauta
  del fin de semana 29-31 de agosto que los genero. O sea: le conte los pedidos
  y no le conte la plata. Su CPA salio falsamente bajo y el bloque 2 parecio
  237% peor.

La estructura correcta, dado que NO se despacha sabado ni domingo:
  semana = pauta de SABADO a VIERNES  +  despachos de LUNES a VIERNES
Asi cada peso de pauta queda en la misma semana que el pedido que produjo.

Con el export del 18-sep (arranca el 2-sep, miercoles) solo hay DOS semanas
que cumplen la estructura completa. Dos es poco, y se dice.
"""
import csv, os, json, urllib.request, urllib.parse

TOKEN = os.environ.get("META_ADS_TOKEN")
ACT = "act_4330882710457791"
V = "v21.0"
ARCH = "analisis/envios-completos-18sep.csv"

ENTREGADA = {"ENTREGADA"}
DEVUELTA = {"DEVOLUCION RATIFICADA", "DEVUELTO", "DEVOLUCION REGIONAL"}
COSTO_PROD_UD = 33000
CONV_TYPES = ("onsite_conversion.messaging_conversation_started_7d",
              "onsite_conversion.total_messaging_connection")


def get(path, params):
    params = dict(params)
    params["access_token"] = TOKEN
    url = f"https://graph.facebook.com/{V}/{path}?" + urllib.parse.urlencode(params)
    with urllib.request.urlopen(url, timeout=60) as r:
        return json.load(r)


gasto, conv = {}, {}
d = get(f"{ACT}/insights", {
    "level": "account", "fields": "spend,actions,date_start", "time_increment": 1,
    "time_range": json.dumps({"since": "2026-09-01", "until": "2026-09-18"}),
    "limit": 500})
for r in d.get("data", []):
    gasto[r["date_start"]] = float(r["spend"])
    c = 0
    for a in r.get("actions", []) or []:
        if a["action_type"] in CONV_TYPES:
            c = max(c, int(float(a["value"])))
    conv[r["date_start"]] = c

ped = []
with open(ARCH, encoding="utf-8") as fh:
    for r in csv.DictReader(fh):
        try:
            rec = float(r["recaudo"])
        except ValueError:
            continue
        e = r["estado"].strip().upper()
        ped.append({"fecha": r["fecha"], "recaudo": rec,
                    "envio": float(r["flete"]) + float(r["seguro"]),
                    "uds": 1 if rec <= 100000 else 2,
                    "cls": "entregada" if e in ENTREGADA else (
                        "devuelta" if e in DEVUELTA else "abierta")})

SEMANAS = [
    ("SEMANA A", ["2026-09-05", "2026-09-06", "2026-09-07", "2026-09-08",
                  "2026-09-09", "2026-09-10", "2026-09-11"],
     ["2026-09-07", "2026-09-08", "2026-09-09", "2026-09-10", "2026-09-11"]),
    ("SEMANA B", ["2026-09-12", "2026-09-13", "2026-09-14", "2026-09-15",
                  "2026-09-16", "2026-09-17", "2026-09-18"],
     ["2026-09-14", "2026-09-15", "2026-09-16", "2026-09-17", "2026-09-18"]),
]

print("=" * 74)
print("CPA CON SEMANAS ALINEADAS (pauta sab-vie · despachos lun-vie)")
print("=" * 74)
print()

res = []
for nom, dias_g, dias_d in SEMANAS:
    g = sum(gasto.get(k, 0) for k in dias_g)
    c = sum(conv.get(k, 0) for k in dias_g)
    xs = [p for p in ped if p["fecha"] in dias_d]
    ent = [p for p in xs if p["cls"] == "entregada"]
    dev = [p for p in xs if p["cls"] == "devuelta"]
    ab = [p for p in xs if p["cls"] == "abierta"]
    res.append(dict(nom=nom, g=g, c=c, n=len(xs), ent=len(ent), dev=len(dev),
                    ab=len(ab), uds=sum(p["uds"] for p in xs),
                    recaudo=sum(p["recaudo"] for p in xs),
                    envio=sum(p["envio"] for p in xs),
                    dias_g=dias_g, dias_d=dias_d))
    print(f"  {nom}: pauta {dias_g[0][5:]}–{dias_g[-1][5:]} · "
          f"despachos {dias_d[0][5:]}–{dias_d[-1][5:]}")
    print(f"    gasto ${g:,.0f} · {c} conv · {len(xs)} pedidos · "
          f"{sum(p['uds'] for p in xs)} uds")
    print(f"    entregados {len(ent)} · devueltos {len(dev)} · sin cerrar {len(ab)}")
    print()

A, B = res

print("### Los tres numeros")
print()
print(f"{'':<26}{'SEMANA A':>12}{'SEMANA B':>12}{'cambio':>13}")
print("-" * 63)


def fila(nom, v1, v2, fmt="${:,.0f}", bueno_si_baja=True):
    ch = (v2 - v1) / v1 * 100
    ok = (ch < 0) if bueno_si_baja else (ch > 0)
    print(f"{nom:<26}{fmt.format(v1):>12}{fmt.format(v2):>12}"
          f"{f'{ch:+.1f}% ' + ('🟢' if ok else '🔴'):>13}")


fila("$ por conversacion", A["g"]/A["c"], B["g"]/B["c"])
fila("cierre conv -> pedido", A["n"]/A["c"]*100, B["n"]/B["c"]*100,
     "{:.1f}%", bueno_si_baja=False)
print("-" * 63)
fila("CPA bruto (por pedido)", A["g"]/A["n"], B["g"]/B["n"])
fila("CPA por unidad", A["g"]/A["uds"], B["g"]/B["uds"])
print()
print("  🔑 El $/conversacion subio, el cierre subio, y casi se cancelan.")
print()

# ---------- ticket ----------
print("### El otro lado: ¿cuanto entra por pedido? (tarifario nuevo)")
print()
fila("recaudo por pedido", A["recaudo"]/A["n"], B["recaudo"]/B["n"],
     bueno_si_baja=False)
fila("uds por pedido", A["uds"]/A["n"], B["uds"]/B["n"], "{:.2f}",
     bueno_si_baja=False)
fila("recaudo por unidad", A["recaudo"]/A["uds"], B["recaudo"]/B["uds"],
     bueno_si_baja=False)
fila("envio por pedido", A["envio"]/A["n"], B["envio"]/B["n"])
print()

# ---------- margen unitario ----------
print("### Margen por unidad despachada (recaudo − producto − envio − pauta)")
print()
for x in (A, B):
    bruto = (x["recaudo"] - COSTO_PROD_UD*x["uds"] - x["envio"]) / x["uds"]
    pauta = x["g"] / x["uds"]
    print(f"  {x['nom']}: bruto ${bruto:,.0f} − pauta ${pauta:,.0f} = "
          f"${bruto - pauta:,.0f}/ud")
print()
mA = (A["recaudo"] - COSTO_PROD_UD*A["uds"] - A["envio"])/A["uds"] - A["g"]/A["uds"]
mB = (B["recaudo"] - COSTO_PROD_UD*B["uds"] - B["envio"])/B["uds"] - B["g"]/B["uds"]
print(f"  Cambio: ${mB - mA:+,.0f}/ud  ({(mB-mA)/mA*100:+.0f}%)")
print()

# ---------- CPA neto con la misma madurez ----------
print("### CPA neto (por pedido ENTREGADO), con el mismo trato de madurez")
print()
print(f"  A: {A['ab']}/{A['n']} sin cerrar ({A['ab']/A['n']*100:.0f}%)  ·  "
      f"B: {B['ab']}/{B['n']} sin cerrar ({B['ab']/B['n']*100:.0f}%)")
print()
print(f"{'devolucion en las abiertas':<28}{'SEMANA A':>12}{'SEMANA B':>12}{'cambio':>10}")
print("-" * 62)
for t in (0.0, 0.19, 0.25):
    ea = A["ent"] + A["ab"]*(1-t)
    eb = B["ent"] + B["ab"]*(1-t)
    ca, cb = A["g"]/ea, B["g"]/eb
    print(f"{f'si se devuelve {t*100:.0f}%':<28}{ca:>12,.0f}{cb:>12,.0f}"
          f"{(cb-ca)/ca*100:>+9.0f}%")
print()
print("  (a 19%, que es la tasa medida de la cuenta)")
print()

# ---------- por dia dentro de cada semana ----------
print("### Dentro de la semana B, dia por dia (pauta vs despacho del dia)")
print()
print(f"{'fecha':<12}{'gasto':>10}{'conv':>6}{'$/conv':>9}")
print("-" * 37)
for k in B["dias_g"]:
    g = gasto.get(k, 0)
    c = conv.get(k, 0)
    print(f"{k:<12}{g:>10,.0f}{c:>6}{(g/c if c else 0):>9,.0f}")
