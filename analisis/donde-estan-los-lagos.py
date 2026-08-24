# -*- coding: utf-8 -*-
"""
¿POR QUÉ ESPERAR AL 31 PARA ABRIR LAGOS? Y ¿DÓNDE ESTÁN ESOS LAGOS? — 2026-08-24

El dueño pregunta por qué no abrir canales nuevos ya. Al examinarlo aparecen dos
cosas, y la segunda es más importante que la primera:

  1. El valle es una razón MÁS DÉBIL de lo que dije para un canal nuevo — pero
     hay una razón mejor que no había dicho.
  2. 🔴 "ABRIR GEOGRAFÍA" PUEDE SER UN DIAGNÓSTICO EQUIVOCADO. El negocio ya
     vende en todo el país. Este script revisa dónde están las ventas de verdad.
"""
import csv
import collections
import os
import unicodedata

DIR = os.path.dirname(os.path.abspath(__file__))

ARCHIVOS = [
    ("guias-99envios.csv", "fecha_envio", True),
    ("guias-99envios-19ago.csv", "fecha_envio_utc", True),
    ("guias-99envios-21ago.csv", "fecha_envio_utc", False),
    ("guias-99envios-24ago.csv", "fecha_envio_utc", False),
]

# Departamento de cada ciudad vista en las guías, y población aproximada del
# departamento (DANE, orden de magnitud) para comparar contra las ventas.
DEPTO = {
    "BOGOTA": ("Bogotá/Cundinamarca", 11_000_000), "SOACHA": ("Bogotá/Cundinamarca", 11_000_000),
    "ZIPAQUIRA": ("Bogotá/Cundinamarca", 11_000_000), "CHIA": ("Bogotá/Cundinamarca", 11_000_000),
    "CAJICA": ("Bogotá/Cundinamarca", 11_000_000), "FACATATIVA": ("Bogotá/Cundinamarca", 11_000_000),
    "TOCANCIPA": ("Bogotá/Cundinamarca", 11_000_000), "CUCUNUBA": ("Bogotá/Cundinamarca", 11_000_000),
    "MEDELLIN": ("Antioquia", 6_800_000), "BELLO": ("Antioquia", 6_800_000),
    "RIONEGRO": ("Antioquia", 6_800_000), "COPACABANA": ("Antioquia", 6_800_000),
    "YARUMAL": ("Antioquia", 6_800_000), "TURBO": ("Antioquia", 6_800_000),
    "GOMEZ PLATA": ("Antioquia", 6_800_000), "REMEDIOS": ("Antioquia", 6_800_000),
    "MACEO": ("Antioquia", 6_800_000), "EL SANTUARIO": ("Antioquia", 6_800_000),
    "LA UNION": ("Antioquia", 6_800_000), "CAUCASIA": ("Antioquia", 6_800_000),
    "HISPANIA": ("Antioquia", 6_800_000), "GUARNE": ("Antioquia", 6_800_000),
    "SANTA ROSA DE OSOS": ("Antioquia", 6_800_000), "PUERTO BERRIO": ("Antioquia", 6_800_000),
    "CALI": ("Valle", 4_500_000), "PALMIRA": ("Valle", 4_500_000),
    "BUENAVENTURA": ("Valle", 4_500_000), "GUACARI": ("Valle", 4_500_000),
    "EL CERRITO": ("Valle", 4_500_000),
    "BARRANQUILLA": ("Atlántico", 2_700_000), "SOLEDAD": ("Atlántico", 2_700_000),
    "CARTAGENA DE INDIAS": ("Bolívar", 2_200_000), "MAGANGUE": ("Bolívar", 2_200_000),
    "SAN ESTANISLAO": ("Bolívar", 2_200_000),
    "PEREIRA": ("Eje Cafetero", 2_500_000), "DOSQUEBRADAS": ("Eje Cafetero", 2_500_000),
    "MANIZALES": ("Eje Cafetero", 2_500_000), "SANTA ROSA DE CABAL": ("Eje Cafetero", 2_500_000),
    "ANSERMA": ("Eje Cafetero", 2_500_000), "RIOSUCIO": ("Eje Cafetero", 2_500_000),
    "BUCARAMANGA": ("Santanderes", 3_300_000), "BARRANCABERMEJA": ("Santanderes", 3_300_000),
    "SAN GIL": ("Santanderes", 3_300_000), "MALAGA": ("Santanderes", 3_300_000),
    "OCANA": ("Santanderes", 3_300_000), "SAN JOSE DE CUCUTA": ("Santanderes", 3_300_000),
    "VILLAVICENCIO": ("Llanos", 1_800_000), "PUERTO GAITAN": ("Llanos", 1_800_000),
    "SAN CARLOS DE GUAROA": ("Llanos", 1_800_000), "PARATEBUENO": ("Llanos", 1_800_000),
    "AGUAZUL": ("Llanos", 1_800_000), "URIBE": ("Llanos", 1_800_000),
    "TUNJA": ("Boyacá", 1_200_000), "SAMACA": ("Boyacá", 1_200_000), "PAIPA": ("Boyacá", 1_200_000),
    "SANTA MARTA": ("Caribe resto", 3_000_000), "DIBULLA": ("Caribe resto", 3_000_000),
    "MONTERIA": ("Caribe resto", 3_000_000), "CERETE": ("Caribe resto", 3_000_000),
    "COVENAS": ("Caribe resto", 3_000_000), "SINCELEJO": ("Caribe resto", 3_000_000),
    "SANTIAGO DE TOLU": ("Caribe resto", 3_000_000),
    "SAN ANDRES DE SOTAVENTO": ("Caribe resto", 3_000_000), "BUENAVISTA": ("Caribe resto", 3_000_000),
    "POPAYAN": ("Cauca/Nariño", 3_100_000), "GUACHENE": ("Cauca/Nariño", 3_100_000),
    "INZA": ("Cauca/Nariño", 3_100_000), "TUQUERRES": ("Cauca/Nariño", 3_100_000),
    "IPIALES": ("Cauca/Nariño", 3_100_000), "LLORENTE": ("Cauca/Nariño", 3_100_000),
    "FUNES": ("Cauca/Nariño", 3_100_000), "EL TAMBO": ("Cauca/Nariño", 3_100_000),
    "FLORENCIA": ("Sur (Huila/Caquetá/Putumayo)", 2_400_000),
    "MOCOA": ("Sur (Huila/Caquetá/Putumayo)", 2_400_000),
    "ALGECIRAS": ("Sur (Huila/Caquetá/Putumayo)", 2_400_000),
    "PUERTO ASIS": ("Sur (Huila/Caquetá/Putumayo)", 2_400_000),
    "ACEVEDO": ("Sur (Huila/Caquetá/Putumayo)", 2_400_000),
    "LA MONTANITA": ("Sur (Huila/Caquetá/Putumayo)", 2_400_000),
}
POB_COLOMBIA = 52_000_000


def norm(c):
    s = unicodedata.normalize("NFD", c)
    s = "".join(ch for ch in s if unicodedata.category(ch) != "Mn").upper()
    return " ".join(s.replace("D.C.", "").replace(",", " ").split())


def sep(t):
    print("\n" + "=" * 84)
    print(t)
    print("=" * 84)


def main():
    guias = {}
    for archivo, campo, tiene_uds in ARCHIVOS:
        with open(os.path.join(DIR, archivo), encoding="utf-8") as fh:
            for r in csv.DictReader(fh):
                cob = float(r["valor_comercial"])
                guias[r["numero_de_guia"].strip()] = {
                    "ciudad": norm(r["ciudad_destino"]),
                    "flete": float(r["valor_servicio"]),
                    "uds": int(r["unidades"]) if tiene_uds and r.get("unidades")
                           else (2 if cob > 100000 else 1),
                }
    guias = {k: v for k, v in guias.items() if v["flete"] >= 8000}

    sep("1. 🔴 EL NEGOCIO YA ES NACIONAL — 'ABRIR CIUDADES' ES UN DIAGNÓSTICO VIEJO")
    ciudades = sorted({g["ciudad"] for g in guias.values()})
    deptos = collections.Counter()
    sin_mapear = []
    for g in guias.values():
        d = DEPTO.get(g["ciudad"])
        if d:
            deptos[d[0]] += 1
        else:
            sin_mapear.append(g["ciudad"])
    print(f"  {len(guias)} guías únicas → **{len(ciudades)} ciudades distintas** en "
          f"{len(deptos)} regiones del país.")
    if sin_mapear:
        print(f"  (sin mapear: {', '.join(sorted(set(sin_mapear)))})")
    print(f"""
  🔑 El pendiente #30 del archivo dice "abrir ciudades nuevas". **Pero ya se
     vende en {len(ciudades)} ciudades de {len(deptos)} regiones, de Dibulla a Túquerres y de
     Puerto Asís a Magangué. No hay geografía nueva que abrir: ya es nacional.**

  → Entonces "abrir lagos" NO significa entrar a mercados nuevos. Significa algo
    distinto, y hay que decirlo bien para no perseguir lo equivocado.""")

    sep("2. DÓNDE ESTÁN LAS VENTAS CONTRA DÓNDE ESTÁ LA GENTE")
    print(f"  {'REGIÓN':32} {'GUÍAS':>6} {'% VENTAS':>9} {'% POBLACIÓN':>12} {'ÍNDICE':>8}")
    print("-" * 84)
    total = sum(deptos.values())
    pobs = {}
    for c, (d, p) in DEPTO.items():
        pobs[d] = p
    filas = []
    for d, n in deptos.items():
        share_v = n / total
        share_p = pobs[d] / POB_COLOMBIA
        filas.append((d, n, share_v, share_p, share_v / share_p))
    for d, n, sv, sp, idx in sorted(filas, key=lambda x: -x[4]):
        marca = ("  🟢 sobre-representada" if idx > 1.3
                 else ("  🔴 SUB-EXPLOTADA" if idx < 0.7 else ""))
        print(f"  {d:32} {n:>6} {sv:>8.1%} {sp:>11.1%} {idx:>8.2f}{marca}")
    print("-" * 84)
    subs = [f for f in filas if f[4] < 0.7]
    if subs:
        pot = sum(f[3] for f in subs) * total
        actual = sum(f[1] for f in subs)
        print(f"""
  🔑 **ACÁ ESTÁN LOS LAGOS.** Las regiones marcadas en rojo tienen {sum(f[3] for f in subs):.0%} de la
     población del país y solo {sum(f[2] for f in subs):.0%} de las ventas. Si llegaran a su peso
     natural serían ~{pot:.0f} guías en vez de {actual}, o sea **{pot/actual:.1f}× en esas zonas.**

  📌 Y esto NO se arregla "abriendo" esas ciudades: ya están abiertas. Se arregla
     FORZANDO a Meta a gastar ahí, que es otra cosa.""")

    sep("3. POR QUÉ META CONCENTRA, Y CÓMO SE LO FUERZA")
    print("""  Bajo Advantage+ con segmentación nacional, Meta gasta donde le sale más barata
  la conversación. Eso concentra la pauta en unos pocos bolsillos y deja el resto
  del país sin tocar — aunque técnicamente esté "abierto".

  🔑 Por eso la sección 11 dice que bajo Advantage+ **la geografía es lo único que
     diferencia conjuntos de verdad**: no porque haya que abrir mercados, sino
     porque un conjunto por región OBLIGA a Meta a gastar en cada una.

  → **"Abrir un lago" = crear un conjunto con geografía RESTRINGIDA a una región
    sub-explotada, con su propio presupuesto.** Meta ya no puede huir al bolsillo
    barato: tiene que gastar ahí.

  ✅ Y eso además responde la pregunta de la elasticidad: cada conjunto regional
     tiene su propia curva y su propia audiencia fresca.""")

    sep("4. ENTONCES, ¿POR QUÉ NO HOY? — MIS RAZONES, REVISADAS")
    print("""  RAZÓN QUE DI: "el valle del 26-29 mezcla un tercer efecto".
  → Es más débil de lo que la presenté. El valle golpea el CIERRE (la gente no
    compra antes de la quincena), pero Meta optimiza por CONVERSACIONES INICIADAS,
    no por ventas. **La fase de aprendizaje del conjunto nuevo no se daña con el
    valle**, porque las conversaciones siguen llegando.

  RAZÓN QUE NO HABÍA DICHO Y ES LA QUE SÍ AGUANTA:
  🔴 **un conjunto nuevo no tiene línea base.** Cuando subimos presupuesto, el
     conjunto tenía historia propia contra la cual comparar. Un conjunto regional
     nuevo arranca de cero: si sus primeros 4 días son días de valle, no hay forma
     de saber si la región es mala o si el timing fue malo. **Y esa es justo la
     decisión que hay que tomar: seguir o cerrar esa región.**

  RAZÓN VERDADERA, LA MÁS PROSAICA:
  🔴 **todavía no está elegida la región ni el criterio.** El archivo dice que el
     criterio correcto es "rechazo esperado − flete absorbido" (sección 0-H) y esa
     cuenta no se ha hecho por región. **Elegir mal es exactamente cómo nació la
     fuga de flete**: se abrió a destinos caros sin mirar el costo.

  → **Se puede arrancar antes del 31 SI se hace primero la cuenta de qué región
    conviene.** Eso sí se puede hacer hoy mismo, y no depende del valle.""")

    sep("5. LA CUENTA POR REGIÓN QUE FALTABA")
    print(f"  {'REGIÓN':32} {'GUÍAS':>6} {'FLETE PROM':>11} {'MARGEN/PEDIDO':>14} {'ÍNDICE':>8}")
    print("-" * 84)
    porreg = collections.defaultdict(list)
    for g in guias.values():
        d = DEPTO.get(g["ciudad"])
        if d:
            porreg[d[0]].append(g)
    idxs = {f[0]: f[4] for f in filas}
    ranking = []
    for d, gs in porreg.items():
        fl = sum(x["flete"] for x in gs) / len(gs)
        # margen aproximado: recaudo de banda − flete − producto − empaque
        margen = 85000 - fl - 34000 - 1500 if fl > 23500 else 81000 - fl - 34000 - 1500
        ranking.append((d, len(gs), fl, margen, idxs[d]))
    for d, n, fl, m, idx in sorted(ranking, key=lambda x: (x[4], -x[3])):
        # prioridad: sub-explotada Y con buen margen
        pri = "  🎯 PRIORIDAD" if idx < 0.7 and m > 20000 else ""
        print(f"  {d:32} {n:>6} ${fl:>10,.0f} ${m:>13,.0f} {idx:>8.2f}{pri}")
    print("-" * 84)
    print("""
  🎯 Las marcadas son las candidatas: población grande, ventas bajas y margen
     sano. **Ahí es donde conviene forzar a Meta a gastar.**

  ⚠️ Ojo: el flete promedio por región sale de POCAS guías en varios casos, así
     que el margen es orientativo. Lo robusto es el índice de sub-explotación,
     que sale de comparar contra población y no de mi estimación de flete.""")


if __name__ == "__main__":
    main()
