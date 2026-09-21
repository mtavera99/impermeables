#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
¿Como vamos en devoluciones?

Toda la cuenta corre sobre la constante DEVOL = 19%. Este script NO la asume:
la mide sobre 349 guias reales (10-ago a 11-sep) y revisa si sigue vigente.

Reglas de medicion:
 - Solo cuentan guias CERRADAS (entregada o devuelta). Las que estan en transito
   todavia no votaron; meterlas al denominador baja la tasa artificialmente.
 - La devolucion no cuesta el margen perdido: cuesta el FLETE DE IDA + el de
   VUELTA, que ya se pagaron. Por eso se calcula con flete real, no con $33.648.
"""
import csv
from collections import defaultdict
from datetime import datetime

ARCH = "analisis/transportadoras-12sep.csv"
COSTO_PROD_UD = 33000

NUCLEO = {"BOGOTA", "BOGOTA D.C.", "BOGOTA DC", "SOACHA", "MEDELLIN", "BELLO",
          "ITAGUI", "ENVIGADO", "SABANETA", "LA ESTRELLA", "COPACABANA",
          "CALDAS", "GIRARDOTA", "BARBOSA"}

ENTREGADA = {"ENTREGADA"}
DEVUELTA = {"DEVOLUCION RATIFICADA", "ENTREGADO A REMITENTE", "DEVOLUCION REGIONAL",
            "NO SE ENTREGA NO CANCELA RECAUDO", "DESTINATARIO NO CANCELA RECAUDO"}
# señales tempranas: aun no son devolucion pero van camino a serla
RIESGO = {"RECLAMO OFICINA WHATSAPP", "RECLAME EN OFICINA", "INTENTO DE ENTREGA",
          "SE VISITA NO SE LOGRA ENTREGA", "NO SE LOCALIZA DIRECCION",
          "UNIDAD EN LUGAR DIFERENTE", "CERRADO POR INCIDENCIA",
          "DETERIORO EN VALIDACION GP"}


def cls(e):
    e = (e or "").strip().upper()
    if e in ENTREGADA:
        return "entregada"
    if e in DEVUELTA:
        return "devuelta"
    if e in RIESGO:
        return "riesgo"
    return "transito"


filas = []
with open(ARCH, encoding="utf-8") as f:
    for r in csv.DictReader(f):
        try:
            rec = float(r["recaudo"] or 0)
            fl = float(r["flete"] or 0)
            sg = float(r["seguro"] or 0)
            fecha = datetime.strptime(r["fecha"], "%Y-%m-%d")
        except (ValueError, TypeError):
            continue
        if rec <= 0:
            continue
        ciu = (r["ciudad"] or "").strip().upper()
        filas.append({
            "fecha": fecha, "ciudad": ciu, "recaudo": rec, "envio": fl + sg,
            "flete": fl, "transp": (r["transportadora"] or "").strip().lower(),
            "cls": cls(r["estado"]), "estado": (r["estado"] or "").strip(),
            "zona": "nucleo" if ciu in NUCLEO else "region",
            "uds": 1 if rec <= 100000 else 2,
        })

tot = len(filas)
print("=" * 74)
print(f"DEVOLUCIONES — {tot} guias, {min(f['fecha'] for f in filas):%d-%b} a "
      f"{max(f['fecha'] for f in filas):%d-%b}")
print("=" * 74)
print()


def tasa(xs):
    e = sum(1 for x in xs if x["cls"] == "entregada")
    d = sum(1 for x in xs if x["cls"] == "devuelta")
    return e, d, (d / (e + d) if (e + d) else 0)


# ---------- 1. foto general ----------
cnt = defaultdict(int)
for x in filas:
    cnt[x["cls"]] += 1
e, d, t = tasa(filas)
print("### 1. Foto general")
print()
print(f"  entregadas .......... {cnt['entregada']:>4}")
print(f"  devueltas ........... {cnt['devuelta']:>4}")
print(f"  en riesgo ........... {cnt['riesgo']:>4}  (oficina / intento fallido)")
print(f"  en transito ......... {cnt['transito']:>4}")
print(f"  {'-'*30}")
print(f"  CERRADAS ............ {e+d:>4}")
print()
print(f"  >>> Devolucion real sobre cerradas: {t*100:.1f}%")
print(f"      Constante que usamos:           19,0%")
print(f"      Diferencia:                     {(t-0.19)*100:+.1f} puntos")
print()
peor = (cnt["devuelta"] + cnt["riesgo"]) / (e + d + cnt["riesgo"]) if (e+d) else 0
print(f"  Si TODA la bolsa de riesgo se cae:  {peor*100:.1f}%  (techo del escenario malo)")
print()

# ---------- 2. tendencia semanal ----------
print("### 2. ¿Va mejorando o empeorando? (por semana de despacho)")
print()
sem = defaultdict(list)
for x in filas:
    sem[x["fecha"].isocalendar()[1]].append(x)
print(f"{'semana':<24}{'cerradas':>9}{'devuel':>8}{'% devol':>9}")
print("-" * 50)
for s in sorted(sem):
    xs = sem[s]
    e2, d2, t2 = tasa(xs)
    if e2 + d2 == 0:
        continue
    ini = min(x["fecha"] for x in xs)
    fin = max(x["fecha"] for x in xs)
    print(f"{f'{ini:%d-%b} a {fin:%d-%b}':<24}{e2+d2:>9}{d2:>8}{t2*100:>8.1f}%")
print()

# ---------- 3. por transportadora ----------
print("### 3. Por transportadora")
print()
print(f"{'transportadora':<18}{'cerradas':>9}{'devuel':>8}{'% devol':>9}{'flete prom':>12}")
print("-" * 56)
por_t = defaultdict(list)
for x in filas:
    por_t[x["transp"]].append(x)
for tr in sorted(por_t, key=lambda k: -len(por_t[k])):
    xs = por_t[tr]
    e2, d2, t2 = tasa(xs)
    if e2 + d2 < 5:
        continue
    fl = sum(x["envio"] for x in xs) / len(xs)
    print(f"{tr:<18}{e2+d2:>9}{d2:>8}{t2*100:>8.1f}%{fl:>12,.0f}")
print()

# ---------- 4. nucleo vs region ----------
print("### 4. Nucleo urbano vs region")
print()
print(f"{'zona':<10}{'cerradas':>9}{'devuel':>8}{'% devol':>9}")
print("-" * 36)
for z in ("nucleo", "region"):
    xs = [x for x in filas if x["zona"] == z]
    e2, d2, t2 = tasa(xs)
    print(f"{z:<10}{e2+d2:>9}{d2:>8}{t2*100:>8.1f}%")
print()

# ---------- 5. 1 unidad vs 2 unidades ----------
print("### 5. ¿Se devuelven mas los pedidos de 2 unidades?")
print()
print(f"{'pedido':<12}{'cerradas':>9}{'devuel':>8}{'% devol':>9}{'recaudo prom':>14}")
print("-" * 52)
for u in (1, 2):
    xs = [x for x in filas if x["uds"] == u]
    e2, d2, t2 = tasa(xs)
    rec = sum(x["recaudo"] for x in xs) / len(xs)
    print(f"{f'{u} unidad' + ('es' if u > 1 else ''):<12}"
          f"{e2+d2:>9}{d2:>8}{t2*100:>8.1f}%{rec:>14,.0f}")
print()

# ---------- 6. cuanto cuesta en plata ----------
print("### 6. Cuanto nos cuesta en plata")
print()
devs = [x for x in filas if x["cls"] == "devuelta"]
if devs:
    flete_ida = sum(x["envio"] for x in devs)
    flete_vuelta = flete_ida  # la vuelta se paga otra vez
    print(f"  {len(devs)} devoluciones en el periodo")
    print(f"  flete de ida ya pagado ....... ${flete_ida:,.0f}")
    print(f"  flete de retorno ............. ${flete_vuelta:,.0f}")
    print(f"  {'-'*38}")
    print(f"  COSTO DIRECTO ................ ${flete_ida+flete_vuelta:,.0f}")
    print(f"  por devolucion ............... ${(flete_ida+flete_vuelta)/len(devs):,.0f}")
    print(f"  constante que usamos ......... $33.648")
    print()
    ent = [x for x in filas if x["cls"] == "entregada"]
    uds_ent = sum(x["uds"] for x in ent)
    print(f"  Repartido entre las {uds_ent} unidades entregadas:")
    print(f"    ${(flete_ida+flete_vuelta)/uds_ent:,.0f} de lastre por unidad vendida")
print()

# ---------- 7. ciudades que devuelven ----------
print("### 7. Ciudades con 2+ devoluciones")
print()
por_c = defaultdict(list)
for x in filas:
    por_c[x["ciudad"]].append(x)
malas = []
for c, xs in por_c.items():
    e2, d2, t2 = tasa(xs)
    if d2 >= 2:
        malas.append((c, e2 + d2, d2, t2, sum(x["envio"] for x in xs) / len(xs)))
print(f"{'ciudad':<22}{'cerradas':>9}{'devuel':>8}{'% devol':>9}{'envio prom':>12}")
print("-" * 60)
for c, cerr, d2, t2, fl in sorted(malas, key=lambda x: (-x[2], -x[3])):
    print(f"{c[:21]:<22}{cerr:>9}{d2:>8}{t2*100:>8.1f}%{fl:>12,.0f}")
print()

# ---------- 8. bolsa abierta ----------
print("### 8. Lo que todavia esta en el aire")
print()
ab = [x for x in filas if x["cls"] in ("riesgo", "transito")]
print(f"  {len(ab)} guias sin cerrar, ${sum(x['recaudo'] for x in ab):,.0f} en recaudo")
est = defaultdict(int)
for x in ab:
    est[x["estado"]] += 1
for k, v in sorted(est.items(), key=lambda x: -x[1]):
    print(f"    {v:>3}  {k}")
