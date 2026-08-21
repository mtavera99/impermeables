# -*- coding: utf-8 -*-
"""
CHEQUEO DEL ESCALÓN 1 — ¿se justifica el escalón 2?

Contexto: el 19-ago se subió el presupuesto de $57.000 a $90.000/día
(Domiciliarios $30.000→$55.000, TEST $12.000→$20.000, Motorizados intacto).
Gasto medido: $80.432/día. Regla fijada de antemano: 20+ guías en dos días
(19 y 20 de agosto) justifican el escalón 2.

Fuente: analisis/guias-99envios-21ago.csv (export del 21-ago, 65 guías, 17-20 ago).

⚠️ DOS TRAMPAS QUE ESTE SCRIPT EVITA A PROPÓSITO:
1. ZONA HORARIA. `fecha_envio` viene en UTC y el despacho se hace de noche, así
   que un lote arranca 23:20 y termina 01:40 del día siguiente. Agrupar por día
   UTC parte los lotes por la mitad y da conteos falsos.
2. GUÍAS REPETIDAS. Este export se solapa con guias-99envios-19ago.csv en el
   18-ago. Hay que deduplicar por numero_de_guia antes de contar cualquier cosa.
"""
import csv
import collections
import os
from datetime import datetime, timedelta

# Los CSV viven junto a este script, así que se resuelven contra su carpeta.
# Con rutas relativas simples el script solo corre si estás parado en /analisis.
DIR = os.path.dirname(os.path.abspath(__file__))

PRECIO = 59900
COSTO_PRODUCTO = 34000     # costo unitario auditado (sección 0-G)
COSTO_EMPAQUE = 1500
GASTO_DIA = 80432          # medido en el export de Meta 18-21 ago
UMBRAL_PRIMA = 8000        # por debajo de esto, valor_servicio es prima de devolución
OFFSET_COT = timedelta(hours=-5)   # Colombia = UTC-5, sin horario de verano

ARCHIVO_NUEVO = "guias-99envios-21ago.csv"
ARCHIVOS_VIEJOS = ["guias-99envios.csv", "guias-99envios-19ago.csv"]


def cargar(archivo, campo_fecha):
    filas = []
    with open(os.path.join(DIR, archivo), encoding="utf-8") as fh:
        for r in csv.DictReader(fh):
            filas.append({
                "fecha_utc": datetime.strptime(r[campo_fecha], "%Y-%m-%d %H:%M:%S"),
                "guia": r["numero_de_guia"].strip(),
                "transportadora": r.get("transportadora", "").strip(),
                "ciudad": r["ciudad_destino"].strip().upper(),
                "cobrado": float(r["valor_comercial"]),
                "flete": float(r["valor_servicio"]),
                "estado": r["estado_del_envio"].strip(),
            })
    return filas


def main():
    nuevas = cargar(ARCHIVO_NUEVO, "fecha_envio_utc")
    for f in nuevas:
        f["fecha_cot"] = f["fecha_utc"] + OFFSET_COT
        # Sin columna de unidades en este export: se infiere del recaudo.
        f["unidades"] = 2 if f["cobrado"] > 100000 else 1

    # ---------- SOLAPAMIENTO CON LOS EXPORTS ANTERIORES ----------
    vistas = set()
    for archivo, campo in [(ARCHIVOS_VIEJOS[0], "fecha_envio"),
                           (ARCHIVOS_VIEJOS[1], "fecha_envio_utc")]:
        for f in cargar(archivo, campo):
            vistas.add(f["guia"])

    repetidas = [f for f in nuevas if f["guia"] in vistas]
    print(f"Guías en el export nuevo: {len(nuevas)}")
    print(f"Ya estaban en exports anteriores: {len(repetidas)} "
          f"→ {len(nuevas) - len(repetidas)} son nuevas de verdad\n")

    # ---------- CONTEO POR DÍA, HORA COLOMBIA ----------
    print("=" * 78)
    print("GUÍAS POR DÍA (hora Colombia, no UTC)")
    print("=" * 78)
    pordia = collections.defaultdict(list)
    for f in nuevas:
        pordia[f["fecha_cot"].date()].append(f)

    for dia in sorted(pordia):
        gs = pordia[dia]
        horas = sorted(g["fecha_cot"].strftime("%H:%M") for g in gs)
        uds = sum(g["unidades"] for g in gs)
        print(f"  {dia}  {len(gs):>2} guías ({uds} unidades)   despacho {horas[0]}–{horas[-1]}")

    # Los lotes cruzan la medianoche: se muestran también agrupados por lote real.
    print("\nMismo dato agrupado por LOTE de despacho (un lote = una sesión seguida):")
    ordenadas = sorted(nuevas, key=lambda f: f["fecha_cot"])
    lotes, actual = [], [ordenadas[0]]
    for prev, cur in zip(ordenadas, ordenadas[1:]):
        if (cur["fecha_cot"] - prev["fecha_cot"]) > timedelta(hours=6):
            lotes.append(actual)
            actual = []
        actual.append(cur)
    lotes.append(actual)
    for lote in lotes:
        ini, fin = lote[0]["fecha_cot"], lote[-1]["fecha_cot"]
        print(f"  {ini.strftime('%d-%b %H:%M')} → {fin.strftime('%d-%b %H:%M')}   "
              f"{len(lote):>2} guías")

    # ---------- EL VEREDICTO ----------
    dias_clave = [d for d in sorted(pordia) if d.day in (19, 20)]
    guias_1920 = sum(len(pordia[d]) for d in dias_clave)
    print("\n" + "=" * 78)
    print("VEREDICTO DEL ESCALÓN 1")
    print("=" * 78)
    print(f"Guías despachadas el 19 y 20 de agosto: {guias_1920}")
    print(f"Umbral fijado de antemano: 20")
    ventas_dia = guias_1920 / 2
    cpa = GASTO_DIA / ventas_dia if ventas_dia else 0
    print(f"\n  ventas/día        {ventas_dia:.1f}")
    print(f"  gasto/día         ${GASTO_DIA:,.0f}")
    print(f"  CPA por despacho  ${cpa:,.0f}")
    print(f"\n  {'✅ ESCALÓN 2 JUSTIFICADO' if guias_1920 >= 20 else '🔴 NO alcanza el umbral'}"
          f"  ({guias_1920} vs 20 guías · CPA ${cpa:,.0f} vs techo $10.000)")

    # ---------- TRANSPORTADORAS ----------
    print("\n" + "=" * 78)
    print("🆕 TRANSPORTADORAS: APARECIÓ UNA TERCERA")
    print("=" * 78)
    portrans = collections.defaultdict(list)
    for f in nuevas:
        if f["flete"] >= UMBRAL_PRIMA:
            portrans[f["transportadora"]].append(f)
    for t in sorted(portrans, key=lambda x: -len(portrans[x])):
        gs = portrans[t]
        fl = [g["flete"] for g in gs]
        print(f"  {t:16} {len(gs):>2} guías · flete ${min(fl):,.0f}–${max(fl):,.0f} "
              f"· promedio ${sum(fl)/len(fl):,.0f}")

    print("\n  Comparación en el MISMO destino (Bogotá y sabana):")
    for ciudad in ["BOGOTÁ, D.C.", "CHÍA", "SOACHA"]:
        gs = [f for f in nuevas if f["ciudad"] == ciudad and f["flete"] >= UMBRAL_PRIMA]
        for g in sorted(gs, key=lambda x: x["flete"]):
            print(f"    {ciudad:14} {g['transportadora']:16} ${g['flete']:>9,.0f}")

    # ---------- COBERTURA DEL TARIFARIO ----------
    print("\n" + "=" * 78)
    print("🔴 CONTROL DEL TARIFARIO NUEVO CONTRA ESTAS GUÍAS")
    print("=" * 78)
    # Bandas tal como quedaron en bot/src/fletes.js
    BANDAS = {
        "A": (73000, ["BOGOTA", "SOACHA", "ZIPAQUIRA", "CHIA", "CAJICA", "MOSQUERA",
                      "MADRID", "FUNZA", "FACATATIVA", "SIBATE", "LA CALERA"]),
        "B": (77000, ["TUNJA", "PAIPA", "AGUAZUL", "TOCANCIPA", "VILLAVICENCIO",
                      "DUITAMA", "SOGAMOSO", "YOPAL", "ACACIAS"]),
        "C": (81000, ["MEDELLIN", "CALI", "BARRANQUILLA", "SOLEDAD", "CARTAGENA",
                      "CARTAGENA DE INDIAS", "PEREIRA", "MANIZALES", "BARRANCABERMEJA",
                      "YARUMAL", "ARMENIA", "IBAGUE", "NEIVA"]),
        "D": (83000, ["BUCARAMANGA", "MONTERIA", "POPAYAN", "SANTA MARTA", "IPIALES",
                      "FLORENCIA", "MOCOA", "BELLO", "RIONEGRO", "CERETE", "COVENAS",
                      "SAMACA", "CUCUTA", "PASTO", "VALLEDUPAR", "SINCELEJO", "QUIBDO",
                      "RIOHACHA"]),
        "E": (85000, []),
    }

    def normalizar(c):
        import unicodedata
        s = unicodedata.normalize("NFD", c)
        s = "".join(ch for ch in s if unicodedata.category(ch) != "Mn").upper()
        s = s.replace("D.C.", "").replace(",", " ")
        return " ".join(s.split())

    def banda_de(ciudad):
        n = normalizar(ciudad)
        for clave, (_, ciudades) in BANDAS.items():
            if n in ciudades:
                return clave
        return None

    sobrecobro, subcobro, no_reconocidas = [], [], set()
    for f in nuevas:
        if f["flete"] < UMBRAL_PRIMA or f["unidades"] != 1:
            continue
        clave = banda_de(f["ciudad"])
        if clave is None:
            no_reconocidas.add(f["ciudad"])
            clave = "E"
        cobrar = BANDAS[clave][0]
        necesario = PRECIO + f["flete"]
        dif = cobrar - necesario
        if dif > 2000:
            sobrecobro.append((f["ciudad"], clave, cobrar, necesario, dif))
        elif dif < 0:
            subcobro.append((f["ciudad"], clave, cobrar, necesario, -dif))

    print("\n🔴 SOBRECOBRO — ciudades reales que caen al default y pagan de más:")
    if sobrecobro:
        for c, k, cob, nec, d in sorted(set(sobrecobro), key=lambda x: -x[4]):
            print(f"  {c:26} banda {k} → cobra ${cob:,} pero necesita ${nec:,.0f} "
                  f"→ SOBRA ${d:,.0f}")
    else:
        print("  ninguno ✅")

    print("\n🟡 SUBCOBRO — guías donde el tarifario se queda corto:")
    if subcobro:
        for c, k, cob, nec, d in sorted(set(subcobro), key=lambda x: -x[4]):
            print(f"  {c:26} banda {k} → cobra ${cob:,} pero necesita ${nec:,.0f} "
                  f"→ FALTA ${d:,.0f}")
    else:
        print("  ninguno ✅")

    print("\nCiudades que NO estaban en ninguna lista (cayeron al default banda E):")
    print("  " + ", ".join(sorted(no_reconocidas)) if no_reconocidas else "  ninguna")

    # ---------- ESTADOS ----------
    print("\n" + "=" * 78)
    print("ESTADO DE LAS GUÍAS")
    print("=" * 78)
    for estado, n in collections.Counter(f["estado"] for f in nuevas).most_common():
        print(f"  {n:>2}  {estado}")

    # Las trabadas hay que mirarlas contra TODOS los exports: una guía trabada del
    # 13-ago no aparece en este archivo, y es justo la que más tiempo lleva.
    todas = {}
    for archivo, campo in [(ARCHIVOS_VIEJOS[0], "fecha_envio"),
                           (ARCHIVOS_VIEJOS[1], "fecha_envio_utc"),
                           (ARCHIVO_NUEVO, "fecha_envio_utc")]:
        for f in cargar(archivo, campo):
            f["fecha_cot"] = f["fecha_utc"] + OFFSET_COT
            f["unidades"] = 2 if f["cobrado"] > 100000 else 1
            # El export más nuevo manda: trae el estado más reciente de cada guía.
            todas[f["guia"]] = f

    ESTADOS_TRABA = ("Reclame en oficina", "Intento de entrega", "Centro acopio",
                     "Telemercadeo", "Novedad")
    trabadas = [f for f in todas.values() if f["estado"] in ESTADOS_TRABA]

    print("\n" + "=" * 78)
    print(f"🔴 GUÍAS TRABADAS EN TODO EL HISTORIAL 99 ENVÍOS ({len(todas)} guías únicas)")
    print("=" * 78)
    hoy = datetime(2026, 8, 21, 12, 0)
    total_riesgo = 0
    for f in sorted(trabadas, key=lambda x: x["fecha_cot"]):
        dias = (hoy - f["fecha_cot"]).days
        # Margen REAL: hay que descontar producto y empaque, no solo el flete.
        margen = (f["cobrado"] - f["flete"]
                  - (COSTO_PRODUCTO + COSTO_EMPAQUE) * f["unidades"])
        total_riesgo += margen
        alerta = " 🚨" if dias >= 5 else ""
        print(f"  {f['ciudad']:26} {f['estado']:20} {dias:>2} días  "
              f"margen ${margen:>8,.0f}  guía {f['guia']}{alerta}")
    print(f"\n  MARGEN REAL EN RIESGO: ${total_riesgo:,.0f}")
    print(f"  (margen = recaudo − flete − producto ${COSTO_PRODUCTO:,} − empaque "
          f"${COSTO_EMPAQUE:,}, por unidad)")
    viejas = [f for f in trabadas if (hoy - f["fecha_cot"]).days >= 5]
    if viejas:
        print(f"\n  🚨 {len(viejas)} llevan 5+ días trabadas — son las que caducan:")
        for f in sorted(viejas, key=lambda x: x["fecha_cot"]):
            print(f"     {f['ciudad']} ({(hoy - f['fecha_cot']).days} días) guía {f['guia']}")


if __name__ == "__main__":
    main()
