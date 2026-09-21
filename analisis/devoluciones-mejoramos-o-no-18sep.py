#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
¿MEJORAMOS EN DEVOLUCIONES O ES ESPEJISMO?

La serie semanal cruda dice: 16% -> 27,9% -> 16,9% -> 12,0% -> 12,1%.
Parece una mejora clarisima. Pero hay un sesgo que la puede estar inventando:

  UNA ENTREGA CIERRA RAPIDO. UNA DEVOLUCION CIERRA LENTO.
  (entrega: 2-5 dias | devolucion: intento fallido + espera en oficina +
   ratificacion = 2 a 4 semanas)

Entonces en una semana recien despachada ya cerraron casi todas las entregas
pero casi ninguna devolucion todavia. El % de devolucion sobre CERRADAS sale
bajo por construccion, no porque hayamos mejorado.

Este script separa mejora real de inmadurez:
 1. mide cuanto ha madurado cada semana
 2. mide devoluciones sobre el TOTAL despachado (piso que solo puede subir)
 3. compara solo cohortes con madurez parecida
"""
import csv
from collections import defaultdict
from datetime import datetime

ARCH = "analisis/transportadoras-12sep.csv"
CORTE = datetime(2026, 9, 12)   # fecha del export = foto de los estados

ENTREGADA = {"ENTREGADA"}
DEVUELTA = {"DEVOLUCION RATIFICADA", "ENTREGADO A REMITENTE", "DEVOLUCION REGIONAL",
            "NO SE ENTREGA NO CANCELA RECAUDO", "DESTINATARIO NO CANCELA RECAUDO"}
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
            fecha = datetime.strptime(r["fecha"], "%Y-%m-%d")
        except (ValueError, TypeError):
            continue
        if rec <= 0:
            continue
        filas.append({"fecha": fecha, "cls": cls(r["estado"]),
                      "edad": (CORTE - fecha).days, "recaudo": rec})

# ---------- semanas ----------
SEM = [
    ("10-14 Ago", datetime(2026, 8, 10), datetime(2026, 8, 14)),
    ("18-21 Ago", datetime(2026, 8, 18), datetime(2026, 8, 21)),
    ("24-28 Ago", datetime(2026, 8, 24), datetime(2026, 8, 28)),
    ("31Ago-04Sep", datetime(2026, 8, 31), datetime(2026, 9, 4)),
    ("07-11 Sep", datetime(2026, 9, 7), datetime(2026, 9, 11)),
]


def sub(ini, fin):
    return [x for x in filas if ini <= x["fecha"] <= fin]


print("=" * 78)
print("¿MEJORAMOS EN DEVOLUCIONES? — separando mejora real de inmadurez")
print("=" * 78)
print()

# ---------- 1. cuanto ha madurado cada semana ----------
print("### 1. Primero: ¿que tan maduras estan las semanas?")
print()
print(f"{'semana':<14}{'edad':>6}{'total':>7}{'cerradas':>10}{'% cerrado':>11}"
      f"{'abiertas':>10}")
print("-" * 58)
info = {}
for nom, ini, fin in SEM:
    xs = sub(ini, fin)
    if not xs:
        continue
    ent = sum(1 for x in xs if x["cls"] == "entregada")
    dev = sum(1 for x in xs if x["cls"] == "devuelta")
    rie = sum(1 for x in xs if x["cls"] == "riesgo")
    tra = sum(1 for x in xs if x["cls"] == "transito")
    n = len(xs)
    edad = (CORTE - fin).days
    cerr = ent + dev
    info[nom] = dict(n=n, ent=ent, dev=dev, rie=rie, tra=tra, cerr=cerr, edad=edad)
    print(f"{nom:<14}{edad:>5}d{n:>7}{cerr:>10}{cerr/n*100:>10.0f}%{n-cerr:>10}")
print()
print("  Ahi esta el problema: las semanas viejas estan casi 100% resueltas y")
print("  la ultima apenas va por la mitad. No son comparables.")
print()

# ---------- 2. las tres formas de medir ----------
print("### 2. La misma semana medida de tres formas")
print()
print(f"{'semana':<14}{'% s/cerradas':>14}{'% s/total':>12}{'techo':>9}")
print("-" * 49)
print(f"{'':14}{'(lo optimista)':>14}{'(el piso)':>12}{'(malo)':>9}")
print("-" * 49)
for nom, _, _ in SEM:
    if nom not in info:
        continue
    i = info[nom]
    sobre_cerr = i["dev"] / i["cerr"] if i["cerr"] else 0
    sobre_tot = i["dev"] / i["n"]
    techo = (i["dev"] + i["rie"]) / i["n"]
    print(f"{nom:<14}{sobre_cerr*100:>13.1f}%{sobre_tot*100:>11.1f}%{techo*100:>8.1f}%")
print()

# ---------- 3. velocidad de cierre: entrega vs devolucion ----------
print("### 3. La prueba del sesgo: ¿cierran igual de rapido?")
print()
print("  Reparto de los estados segun la edad de la guia:")
print()
print(f"{'edad':<12}{'n':>5}{'entreg':>8}{'devuel':>8}{'abiert':>8}"
      f"{'% cerrado':>11}{'dev/cerr':>10}")
print("-" * 62)
BUCKETS = [(0, 5, "0-5 dias"), (6, 12, "6-12 dias"), (13, 20, "13-20 dias"),
           (21, 40, "21+ dias")]
for lo, hi, nom in BUCKETS:
    xs = [x for x in filas if lo <= x["edad"] <= hi]
    if not xs:
        continue
    ent = sum(1 for x in xs if x["cls"] == "entregada")
    dev = sum(1 for x in xs if x["cls"] == "devuelta")
    ab = len(xs) - ent - dev
    cerr = ent + dev
    print(f"{nom:<12}{len(xs):>5}{ent:>8}{dev:>8}{ab:>8}"
          f"{cerr/len(xs)*100:>10.0f}%{(dev/cerr*100 if cerr else 0):>9.1f}%")
print()
print("  Si 'dev/cerr' SUBE con la edad, queda demostrado que las devoluciones")
print("  aparecen tarde y que las semanas frescas se ven mejores de lo que son.")
print()

# ---------- 4. comparacion justa: misma madurez ----------
print("### 4. Comparacion justa: todas a la misma madurez")
print()
print("  Tomo solo las semanas con 21+ dias de maduracion (ya resueltas)")
print("  y las comparo entre si. Lo demas todavia no se puede juzgar.")
print()
maduras = [(n, info[n]) for n, _, _ in SEM if n in info and info[n]["edad"] >= 21]
inmaduras = [(n, info[n]) for n, _, _ in SEM if n in info and info[n]["edad"] < 21]
print(f"{'semana':<14}{'edad':>6}{'cerradas':>10}{'devuel':>8}{'% devol':>9}")
print("-" * 47)
for n, i in maduras:
    print(f"{n:<14}{i['edad']:>5}d{i['cerr']:>10}{i['dev']:>8}"
          f"{i['dev']/i['cerr']*100:>8.1f}%")
if maduras:
    tc = sum(i["cerr"] for _, i in maduras)
    td = sum(i["dev"] for _, i in maduras)
    print("-" * 47)
    print(f"{'PROMEDIO MADURO':<14}{'':>6}{tc:>10}{td:>8}{td/tc*100:>8.1f}%")
print()
print("  Todavia sin veredicto (muy frescas):")
for n, i in inmaduras:
    print(f"    {n} — {i['edad']}d, {i['cerr']}/{i['n']} cerradas "
          f"({i['cerr']/i['n']*100:.0f}%), {i['rie']} en riesgo")
print()

# ---------- 5. proyeccion de la ultima semana ----------
print("### 5. ¿En que va a terminar la ultima semana?")
print()
# tasa de conversion riesgo->devolucion observada en cohortes maduras
xm = [x for x in filas if x["edad"] >= 21]
ent_m = sum(1 for x in xm if x["cls"] == "entregada")
dev_m = sum(1 for x in xm if x["cls"] == "devuelta")
tasa_madura = dev_m / (ent_m + dev_m) if (ent_m + dev_m) else 0
for nom in ("31Ago-04Sep", "07-11 Sep"):
    if nom not in info:
        continue
    i = info[nom]
    abiertas = i["n"] - i["cerr"]
    # escenario A: las abiertas se comportan como la tasa madura
    dev_a = i["dev"] + abiertas * tasa_madura
    # escenario B: las de riesgo caen todas, las de transito a tasa madura
    dev_b = i["dev"] + i["rie"] + i["tra"] * tasa_madura
    print(f"  {nom}: hoy {i['dev']}/{i['cerr']} = {i['dev']/i['cerr']*100:.1f}%")
    print(f"     si las {abiertas} abiertas se portan normal ..... "
          f"{dev_a/i['n']*100:.1f}% final")
    print(f"     si las {i['rie']} de riesgo se caen todas ....... "
          f"{dev_b/i['n']*100:.1f}% final")
    print()

print(f"  Referencia (cohortes maduras, 21+ dias): {tasa_madura*100:.1f}%")
print(f"  Constante del modelo: 19,0%")
print()

# ---------- 6. veredicto ----------
print("### 6. Veredicto")
print()
if maduras:
    prim = maduras[0][1]
    ult_mad = maduras[-1][1]
    d1 = prim["dev"] / prim["cerr"] * 100
    d2 = ult_mad["dev"] / ult_mad["cerr"] * 100
    print(f"  Entre cohortes YA MADURAS: {maduras[0][0]} {d1:.1f}% -> "
          f"{maduras[-1][0]} {d2:.1f}%  ({d2-d1:+.1f} puntos)")
print()
print("  El 12% de las dos ultimas semanas NO es comparable con el 27,9% de")
print("  agosto. Hay que esperar a que maduren para cantar victoria.")
