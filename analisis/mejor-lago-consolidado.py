#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EL MEJOR LAGO PARA ABRIR  -  analisis consolidado al 31-ago-2026

Une TODAS las fuentes de guias de la marca en una sola serie continua:

    15-jul a 09-ago   guias-heka.csv            (123 guias, desenlaces RESUELTOS)
    10-ago a 23-ago   guias-99envios*.csv       (dedupe por numero de guia)
    24-ago a 31-ago   envios-31ago.csv          (94 guias, export mas reciente)

Y responde una sola pregunta: de las regiones sub-explotadas, cual conviene
abrir como conjunto con geografia restringida.

Criterios: sub-explotacion (poblacion vs ventas), margen por pedido y
TASA DE ENTREGA REAL (en contrapago, si no entregan no cobras).
"""
import csv
import datetime
import unicodedata
from collections import Counter, defaultdict

COSTO_UNIDAD  = 34_000
COSTO_EMPAQUE = 1_500

POB = {
    "Bogota/Cundinamarca": 11_000_000,
    "Antioquia":            6_800_000,
    "Valle":                4_500_000,
    "Santanderes":          3_300_000,
    "Cauca/Narino":         3_100_000,
    "Caribe resto":         3_000_000,
    "Atlantico":            2_700_000,
    "Eje Cafetero":         2_500_000,
    "Sur (Hui/Caq/Put)":    2_400_000,
    "Bolivar":              2_200_000,
    "Llanos":               1_800_000,
    "Tolima":               1_400_000,
    "Boyaca":               1_200_000,
    "Choco":                  550_000,
}

REGION = {}
def add(region, ciudades):
    for c in ciudades:
        REGION[c] = region

add("Bogota/Cundinamarca", [
    "BOGOTA", "SOACHA", "CHIA", "CAJICA", "FACATATIVA", "TOCANCIPA", "NEMOCON",
    "CHOACHI", "GUTIERREZ", "CUCUNUBA", "ZIPAQUIRA", "GUATAVITA", "MOSQUERA",
    "SESQUILE", "SUESCA", "PUENTE QUETAME"])
add("Antioquia", [
    "MEDELLIN", "BELLO", "ITAGUI", "COPACABANA", "SABANETA", "GUARNE",
    "RIONEGRO", "RIONEGRO (ANT)", "MARINILLA", "EL SANTUARIO",
    "EL CARMEN DE VIBORAL", "LA UNION", "YARUMAL", "SANTA ROSA DE OSOS",
    "SAN PEDRO DE LOS MILAGROS", "SAN ANDRES DE CUERQUIA", "GOMEZ PLATA",
    "MACEO", "PUERTO BERRIO", "PUERTO TRIUNFO", "REMEDIOS", "SEGOVIA",
    "EL BAGRE", "CAUCASIA", "TURBO", "APARTADO", "SAN JUAN DE URABA",
    "URRAO", "HISPANIA", "BURITICA", "CISNEROS", "SAN RAFAEL", "BARBOSA"])
add("Valle", [
    "CALI", "PALMIRA", "BUENAVENTURA", "CARTAGO", "BUGA", "FLORIDA",
    "EL CERRITO", "GUACARI"])
add("Santanderes", [
    "BUCARAMANGA", "GIRON", "BARRANCABERMEJA", "SAN GIL", "MALAGA",
    "SABANA DE TORRES", "OCANA", "CUCUTA", "SAN JOSE DE CUCUTA"])
add("Cauca/Narino", [
    "PASTO", "IPIALES", "TUQUERRES", "LLORENTE", "GUACHUCAL", "CUMBAL",
    "FUNES", "LA CRUZ", "POPAYAN", "GUACHENE", "INZA", "CALDONO", "ROSAS",
    "PUERTO TEJADA", "EL TAMBO", "CORDOBA"])
add("Caribe resto", [
    "SINCELEJO", "COROZAL", "SINCE", "SAMPUES", "SAN JUAN DE BETULIA",
    "MAJAGUAL", "COVENAS", "SANTIAGO DE TOLU", "BUENAVISTA",
    "BUENAVISTA (COR)", "SAN ANDRES DE SOTAVENTO", "MONTERIA", "CERETE",
    "SANTA MARTA", "DIBULLA"])
add("Atlantico", ["BARRANQUILLA", "SOLEDAD"])
add("Eje Cafetero", [
    "PEREIRA", "DOSQUEBRADAS", "MANIZALES", "SANTA ROSA DE CABAL", "ANSERMA",
    "RIOSUCIO", "CHINCHINA", "SUPIA", "APIA", "VITERBO", "NORCASIA",
    "MONTENEGRO"])
add("Sur (Hui/Caq/Put)", [
    "NEIVA", "PITALITO", "ALGECIRAS", "TIMANA", "SALADOBLANCO", "ACEVEDO",
    "FLORENCIA", "DONCELLO", "LA MONTANITA", "MOCOA", "PUERTO ASIS",
    "VALLE DEL GUAMUEZ"])
add("Bolivar", [
    "CARTAGENA", "CARTAGENA DE INDIAS", "ARJONA", "ARJONA B", "MAGANGUE",
    "SAN ESTANISLAO", "CALAMAR", "SANTA ROSA DE LIMA",
    "SAN JACINTO DEL CAUCA"])
add("Llanos", [
    "VILLAVICENCIO", "ACACIAS", "PUERTO GAITAN", "PUERTO LOPEZ",
    "FUENTE DE ORO", "PARATEBUENO", "SAN CARLOS DE GUAROA", "URIBE",
    "BARRANCA DE UPIA", "YOPAL", "AGUAZUL", "TRINIDAD", "TAME",
    "EL RETORNO", "VILLANUEVA (C)"])
add("Tolima", ["LIBANO", "ESPINAL"])
add("Boyaca", [
    "TUNJA", "SAMACA", "PAIPA", "ARCABUCO", "SUTAMARCHAN", "CHITA", "IZA",
    "VENTAQUEMADA", "PUERTO BOYACA"])
add("Choco", ["QUIBDO"])

EXITO = {"ENTREGA EXITOSA", "ENTREGADA"}
FALLA = {"DEVUELTO AL REMITENTE", "DEVOLUCION RATIFICADA",
         "EN PROCESO DE DEVOLUCION"}


def norm(c):
    s = unicodedata.normalize("NFD", c or "")
    s = "".join(ch for ch in s if unicodedata.category(ch) != "Mn").upper()
    s = s.replace("D.C.", "").replace(",", " ").replace(".", " ")
    return " ".join(s.split())


def money(x):
    return f"${x:,.0f}".replace(",", ".")


def serial(n):
    return datetime.date(1899, 12, 30) + datetime.timedelta(days=int(float(n)))


# --------------------------------------------------------------- carga
guias = []          # cada una: region, recaudo, flete, uds, desenlace, fuente
vistos = set()
sin_mapear = Counter()

def push(ciudad, recaudo, flete, estado_txt, fuente, uds=None):
    cn = norm(ciudad)
    reg = REGION.get(cn)
    if reg is None:
        sin_mapear[cn] += 1
        return
    recaudo = float(recaudo); flete = float(flete)
    if uds is None:
        uds = 2 if recaudo > 100_000 else 1
    e = norm(estado_txt)
    desenlace = "exito" if e in EXITO else ("falla" if e in FALLA else "abierto")
    guias.append({"region": reg, "ciudad": cn, "recaudo": recaudo,
                  "flete": flete, "uds": int(uds), "desenlace": desenlace,
                  "fuente": fuente})

# 1) HEKA  15-jul .. 09-ago  (detalle trae el desenlace real)
with open("guias-heka.csv", encoding="utf-8") as fh:
    for r in csv.DictReader(fh):
        if not r["recaudo"].strip():
            continue
        push(r["ciudad"], r["recaudo"], r["flete"] or 0, r["detalle"], "heka")

# 2) 99ENVIOS  10-ago .. 23-ago  (dedupe por guia, corte antes del 24)
for f, campo in [("guias-99envios.csv", "fecha_envio"),
                 ("guias-99envios-19ago.csv", "fecha_envio_utc"),
                 ("guias-99envios-21ago.csv", "fecha_envio_utc"),
                 ("guias-99envios-24ago.csv", "fecha_envio_utc")]:
    with open(f, encoding="utf-8") as fh:
        for r in csv.DictReader(fh):
            g = r["numero_de_guia"].strip()
            if g in vistos:
                continue
            if r[campo][:10] >= "2026-08-24":     # lo cubre el export del 31
                continue
            vistos.add(g)
            push(r["ciudad_destino"], r["valor_comercial"], r["valor_servicio"],
                 r["estado_del_envio"], "99envios", r.get("unidades") or None)

# 3) EXPORT 31-AGO  24-ago .. 31-ago
with open("envios-31ago.csv", encoding="utf-8") as fh:
    for r in csv.DictReader(fh):
        push(r["ciudad"], r["valor_comercial"], r["valor_servicio"],
             r["estado"], "export31")

# --------------------------------------------------------------- reporte
print("=" * 80)
print("EL MEJOR LAGO  ·  analisis consolidado 15-jul a 31-ago-2026")
print("=" * 80)
fu = Counter(g["fuente"] for g in guias)
print(f"\nGuias consolidadas: {len(guias)}")
for k, v in fu.most_common():
    print(f"   {k:<10} {v:>4}")
if sin_mapear:
    print(f"\nSin mapear ({sum(sin_mapear.values())} guias): "
          f"{', '.join(f'{c}({n})' for c, n in sin_mapear.most_common())}")

POB_TOT = sum(POB.values())
por_reg = defaultdict(list)
for g in guias:
    por_reg[g["region"]].append(g)
TOT = len(guias)

print("\n" + "=" * 80)
print("1. SUB-EXPLOTACION CON LA SERIE COMPLETA")
print("=" * 80)
print(f"{'REGION':<22}{'GUIAS':>6}{'% VTA':>8}{'% POB':>8}{'INDICE':>8}   ESTADO")
print("-" * 80)
filas = []
for reg, pob in POB.items():
    n = len(por_reg.get(reg, []))
    sv = n / TOT
    sp = pob / POB_TOT
    filas.append((reg, n, sv, sp, sv / sp))
for reg, n, sv, sp, idx in sorted(filas, key=lambda x: -x[4]):
    est = ("sobre-representada" if idx > 1.3
           else "<<< SUB-EXPLOTADA" if idx < 0.7 else "en su peso")
    print(f"{reg:<22}{n:>6}{sv:>7.1%}{sp:>8.1%}{idx:>8.2f}   {est}")
print("-" * 80)

print("\n" + "=" * 80)
print("2. ENTREGA REAL POR REGION  (solo casos ya resueltos)")
print("=" * 80)
print(f"{'REGION':<22}{'RESUELTAS':>10}{'EXITO':>7}{'FALLA':>7}{'TASA ENTREGA':>14}")
print("-" * 80)
entrega = {}
for reg in POB:
    gs = por_reg.get(reg, [])
    ex = sum(1 for g in gs if g["desenlace"] == "exito")
    fa = sum(1 for g in gs if g["desenlace"] == "falla")
    if ex + fa == 0:
        continue
    tasa = ex / (ex + fa)
    entrega[reg] = (tasa, ex + fa)
    print(f"{reg:<22}{ex+fa:>10}{ex:>7}{fa:>7}{tasa:>13.1%}")
print("-" * 80)
gex = sum(1 for g in guias if g["desenlace"] == "exito")
gfa = sum(1 for g in guias if g["desenlace"] == "falla")
TASA_GLOBAL = gex / (gex + gfa)
print(f"{'GLOBAL':<22}{gex+gfa:>10}{gex:>7}{gfa:>7}{TASA_GLOBAL:>13.1%}")

print("\n" + "=" * 80)
print("3. ECONOMIA POR REGION")
print("=" * 80)
print(f"{'REGION':<22}{'n':>4}{'FLETE':>10}{'RECAUDO':>10}{'MARGEN':>10}"
      f"{'TASA':>7}{'MARGEN ESP.':>13}")
print("-" * 80)
econ = {}
for reg in POB:
    gs = por_reg.get(reg, [])
    if len(gs) < 3:
        continue
    fl = sum(g["flete"] for g in gs) / len(gs)
    rc = sum(g["recaudo"] for g in gs) / len(gs)
    ud = sum(g["uds"] for g in gs) / len(gs)
    margen = rc - fl - COSTO_UNIDAD * ud - COSTO_EMPAQUE
    tasa = entrega.get(reg, (TASA_GLOBAL, 0))[0]
    # margen esperado: si no entrega, no cobra y pierde el flete de ida
    m_esp = tasa * margen - (1 - tasa) * fl
    econ[reg] = dict(n=len(gs), flete=fl, recaudo=rc, uds=ud,
                     margen=margen, tasa=tasa, m_esp=m_esp)
    print(f"{reg:<22}{len(gs):>4}{money(fl):>10}{money(rc):>10}"
          f"{money(margen):>10}{tasa:>6.0%}{money(m_esp):>13}")
print("-" * 80)
print(f"(margen = recaudo - flete - producto {money(COSTO_UNIDAD)}/und - "
      f"empaque {money(COSTO_EMPAQUE)};  margen esperado castiga la no-entrega)")

print("\n" + "=" * 80)
print("4. CANDIDATOS A LAGO  (indice < 0.75 y muestra suficiente)")
print("=" * 80)
cands = []
for reg, n, sv, sp, idx in filas:
    if idx >= 0.75 or reg not in econ:
        continue
    e = econ[reg]
    pot = sp * TOT           # guias que tendria a su peso natural
    upside = (pot - n) * e["m_esp"]
    cands.append((reg, n, idx, POB[reg], e, pot, upside))

if not cands:
    print("  (ninguna region cumple; se listan las 4 de menor indice)")
    orden = sorted([f for f in filas if f[0] in econ], key=lambda x: x[4])[:4]
    for reg, n, sv, sp, idx in orden:
        e = econ[reg]
        pot = sp * TOT
        cands.append((reg, n, idx, POB[reg], e, pot, (pot - n) * e["m_esp"]))

for reg, n, idx, pob, e, pot, upside in sorted(cands, key=lambda x: -x[6]):
    print(f"\n  {reg}")
    print(f"     indice sub-explotacion .... {idx:.2f}")
    print(f"     poblacion ................. {pob/1e6:.1f} M")
    print(f"     guias hoy / a su peso ..... {n}  ->  {pot:.0f}   "
          f"(faltan {pot-n:.0f})")
    print(f"     flete promedio ............ {money(e['flete'])}")
    print(f"     margen por pedido ......... {money(e['margen'])}")
    print(f"     tasa de entrega ........... {e['tasa']:.0%}"
          f"   (n resueltas={entrega.get(reg,(0,0))[1]})")
    print(f"     margen ESPERADO por pedido  {money(e['m_esp'])}")
    print(f"     upside del hueco .......... {money(upside)} "
          f"por cada ciclo de {TOT} guias")
    ciudades = Counter(g["ciudad"] for g in por_reg[reg])
    print(f"     ciudades .................. "
          f"{', '.join(f'{c}({k})' for c, k in ciudades.most_common(6))}")

print("\n" + "=" * 80)
print("5. UMBRAL DE PAUTA POR CANDIDATO")
print("=" * 80)
CIERRE = 0.088     # conversaciones -> pedido, historico
print(f"(cierre historico {CIERRE:.1%}  ->  "
      f"{1/CIERRE:.1f} conversaciones por pedido)\n")
print(f"{'REGION':<22}{'MARGEN ESP.':>13}{'EQUILIBRIO $/conv':>20}"
      f"{'UMBRAL SUGERIDO':>18}")
print("-" * 80)
for reg, n, idx, pob, e, pot, upside in sorted(cands, key=lambda x: -x[6]):
    breakeven = e["m_esp"] * CIERRE
    print(f"{reg:<22}{money(e['m_esp']):>13}{money(breakeven):>20}"
          f"{money(breakeven*0.65):>18}")
print("-" * 80)
print("(umbral sugerido = 65% del equilibrio, para dejar colchon)")
print("=" * 80)
