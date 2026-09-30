#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
DEVOLUCIONES AL 30-SEP: ¿se inflo de verdad, o es el acumulado?

El dueno vio subir el numero en el panel de 99 Envios y pregunto si empeoramos
o si "eso va pasando por el acumulado". Las dos cosas pueden ser ciertas a la
vez, y este script las separa.

POR QUE EL NUMERO CRUDO SIEMPRE SUBE CON EL TIEMPO
--------------------------------------------------
Una entrega cierra en 2-5 dias. Una devolucion cierra en 2-4 semanas (intento
fallido + espera en oficina + ratificacion + regreso). Entonces:

  - una semana recien despachada ya tiene casi todas sus entregas contadas
    y casi ninguna de sus devoluciones -> se ve MEJOR de lo que es
  - a medida que esa semana madura, las devoluciones van apareciendo
    -> el numero SUBE sin que nada haya empeorado

Eso es el "acumulado" del que habla el dueno, y es real. Por eso mirar el
numero global del panel un mes despues SIEMPRE da mas alto que mirarlo fresco.

LAS TRES TRAMPAS QUE ESTE SCRIPT EVITA (ya nos costaron errores documentados)
----------------------------------------------------------------------------
 1. error #18 (seccion 0-AY): contar como devolucion algo que 99 Envios
    todavia no liquido. Una devolucion esta LIQUIDADA cuando
    valor_servicio == valor_seguro_99 (verificado 8 de 8). Sin este filtro
    el numero se infla.
 2. madurez confundida con fecha: en estos exports los tramos de edad
    coinciden 1:1 con las semanas. Hay que cortar por madurez (>=15 dias),
    no por calendario.
 3. leer diferencias que son ruido: con 60-70 guias por semana, 16% y 28%
    pueden ser el mismo numero con distinta suerte. Sin intervalo de
    confianza no se puede afirmar "mejoro" ni "empeoro".

USO
---
    python3 analisis/devoluciones-30sep.py <archivo.csv> [AAAA-MM-DD]

El segundo argumento es la fecha del export (la foto de los estados). Si no se
pasa, se usa la de hoy. El script acepta tanto el export crudo de 99 Envios
como la convencion del repo, y detecta las columnas solo.

PII: el export crudo trae nombre, direccion y telefono del cliente. Este repo
es PUBLICO. El script escribe una copia limpia con las 9 columnas de la
convencion y NUNCA copia las columnas personales.
"""
import csv
import math
import os
import sys
from datetime import datetime, timedelta

# ---------------------------------------------------------------- parametros
MADUREZ_MIN = 15          # dias para considerar una cohorte legible
BASE_10SEP = 0.050        # 5,0% medido el 10-sep (misma base: 99 Envios)
BASE_HEKA = 0.196         # ~19,6% en epoca de Heka (OTRA base, no mezclar)
COSTO_DEV = 3109          # costo de una devolucion liquidada
MARGEN_UD = 23244
UDS_PEDIDO = 1.3
UDS_DIA = 20

SALIDA = "analisis/envios-completos-30sep.csv"
COLUMNAS = ["fecha", "guia", "transportadora", "producto", "ciudad",
            "recaudo", "estado", "flete", "seguro"]

# Alias de columnas: convencion del repo | export crudo de 99 Envios
ALIAS = {
    "fecha":          ["fecha", "fecha_envio", "fecha de envio", "fecha_de_envio",
                       "fecha creacion", "fecha_creacion"],
    "guia":           ["guia", "numero_de_guia", "numero de guia", "guia_numero",
                       "numero_guia", "no. guia"],
    "transportadora": ["transportadora", "transportadora_nombre", "operador"],
    "producto":       ["producto", "descripcion", "descripcion_producto"],
    "ciudad":         ["ciudad", "ciudad_destino", "ciudad de destino",
                       "destino", "ciudad_destino_nombre"],
    "recaudo":        ["recaudo", "valor_comercial", "valor comercial",
                       "valor_recaudo", "valor a recaudar", "valor_a_recaudar"],
    "estado":         ["estado", "estado_del_envio", "estado del envio",
                       "estado_envio", "ultimo_estado"],
    "flete":          ["flete", "valor_servicio", "valor del servicio",
                       "valor_del_servicio", "costo_envio"],
    "seguro":         ["seguro", "valor_seguro_99", "valor seguro",
                       "valor_seguro", "seguro_99"],
}

ENTREGADA = {"ENTREGADA"}
DEVUELTA = {"DEVOLUCION RATIFICADA", "ENTREGADO A REMITENTE",
            "DEVOLUCION REGIONAL", "DEVUELTA", "DEVOLUCION",
            "NO SE ENTREGA NO CANCELA RECAUDO",
            "DESTINATARIO NO CANCELA RECAUDO"}
RIESGO = {"RECLAMO OFICINA WHATSAPP", "RECLAME EN OFICINA", "INTENTO DE ENTREGA",
          "SE VISITA NO SE LOGRA ENTREGA", "NO SE LOCALIZA DIRECCION",
          "UNIDAD EN LUGAR DIFERENTE", "CERRADO POR INCIDENCIA",
          "DETERIORO EN VALIDACION GP", "TELEMERCADEO"}


# ---------------------------------------------------------------- utilidades
def wilson(k, n, z=1.96):
    """IC 95% de una proporcion. Wilson sirve con n chico; el normal no."""
    if n == 0:
        return (0.0, 0.0)
    p = k / n
    d = 1 + z * z / n
    c = (p + z * z / (2 * n)) / d
    h = z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / d
    return (max(0.0, c - h), min(1.0, c + h))


def z_test(k1, n1, k2, n2):
    """Compara dos proporciones. Devuelve (diferencia, z, p)."""
    if n1 == 0 or n2 == 0:
        return (0.0, 0.0, 1.0)
    p1, p2 = k1 / n1, k2 / n2
    pp = (k1 + k2) / (n1 + n2)
    se = math.sqrt(pp * (1 - pp) * (1 / n1 + 1 / n2))
    if se == 0:
        return (p1 - p2, 0.0, 1.0)
    z = (p1 - p2) / se
    p = 2 * (1 - 0.5 * (1 + math.erf(abs(z) / math.sqrt(2))))
    return (p1 - p2, z, p)


def norm(s):
    """Normaliza un encabezado: minusculas, sin acentos, sin puntuacion."""
    s = (s or "").strip().lower()
    for a, b in (("á", "a"), ("é", "e"), ("í", "i"), ("ó", "o"), ("ú", "u"),
                 ("ñ", "n"), ("ü", "u")):
        s = s.replace(a, b)
    return s.replace("_", " ").replace(".", "").replace("-", " ").strip()


def mapear(encabezados):
    """Encuentra, para cada columna de la convencion, cual del archivo la sirve."""
    disponibles = {norm(h): h for h in encabezados}
    mapa = {}
    for destino, opciones in ALIAS.items():
        for op in opciones:
            if norm(op) in disponibles:
                mapa[destino] = disponibles[norm(op)]
                break
    return mapa


def numero(v):
    """'$ 39.723,85' -> 39723.85 · tolera formato colombiano y el de Excel."""
    if v is None:
        return None
    s = str(v).strip().replace("$", "").replace(" ", "").replace("\u00a0", "")
    if not s:
        return None
    if "," in s and "." in s:
        # el ultimo separador que aparece es el decimal
        s = s.replace(".", "").replace(",", ".") if s.rfind(",") > s.rfind(".") \
            else s.replace(",", "")
    elif "," in s:
        ent, _, dec = s.rpartition(",")
        s = f"{ent}.{dec}" if len(dec) <= 2 else s.replace(",", "")
    try:
        return float(s)
    except ValueError:
        return None


def fecha(v):
    s = str(v or "").strip()[:19]
    for f in ("%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%S", "%Y-%m-%d",
              "%d/%m/%Y %H:%M:%S", "%d/%m/%Y", "%m/%d/%Y", "%d-%m-%Y"):
        try:
            return datetime.strptime(s[:len(datetime.now().strftime(f))], f)
        except ValueError:
            continue
    try:
        return datetime.strptime(s[:10], "%Y-%m-%d")
    except ValueError:
        return None


def clasificar(estado, flete, seguro):
    """
    Devuelve (clase, liquidada).

    clase: entregada | devuelta | riesgo | transito
    liquidada: solo aplica a devueltas. Regla dura de la seccion 0-AY:
               una devolucion esta liquidada cuando flete == seguro.

    ⚠️ Los estados se cazan por RAIZ y no por coincidencia exacta. El archivo
    real de 99 Envios trae sufijos que la lista cerrada no preveia:
    "Reclamo en oficina informado WhatsApp - Recordatorio 48h",
    "Reclamo en oficina informado WhatsApp - Mensaje inicial". Con igualdad
    exacta esas filas caian en "transito" y el TECHO salia subestimado, que es
    el error mas caro posible en este analisis: haria parecer que hay menos
    riesgo del que hay.
    """
    e = norm(estado).upper()
    if e in {norm(x).upper() for x in ENTREGADA}:
        return ("entregada", None)
    if e in {norm(x).upper() for x in DEVUELTA} or "DEVUEL" in e or "DEVOLUC" in e:
        liq = None
        if flete is not None and seguro is not None and seguro > 0:
            liq = abs(flete - seguro) < 1.0
        return ("devuelta", liq)
    if e in {norm(x).upper() for x in RIESGO}:
        return ("riesgo", None)
    # Raices de riesgo: el paquete existe pero la entrega se trabo.
    for raiz in ("RECLAM", "INTENTO DE ENTREGA", "CERRADO POR INCIDENCIA",
                 "NO SE LOCALIZA", "LUGAR DIFERENTE", "TELEMERCADEO",
                 "NO SE ENTREGA", "NO CANCELA RECAUDO", "DETERIORO"):
        if raiz in e:
            return ("riesgo", None)
    return ("transito", None)


# ---------------------------------------------------------------- 0. cargar
def main():
    if len(sys.argv) < 2:
        print(__doc__)
        print("FALTA EL ARCHIVO. Ejemplo:")
        print("  python3 analisis/devoluciones-30sep.py ~/envios-completos.csv 2026-09-30")
        return 1

    arch = os.path.expanduser(sys.argv[1])
    if not os.path.exists(arch):
        print(f"No existe: {arch}")
        return 1
    corte = fecha(sys.argv[2]) if len(sys.argv) > 2 else datetime.now()
    corte = corte or datetime.now()

    with open(arch, encoding="utf-8-sig", newline="") as f:
        muestra = f.read(8192)
        f.seek(0)
        try:
            dial = csv.Sniffer().sniff(muestra, delimiters=",;\t|")
        except csv.Error:
            dial = csv.excel
        lector = csv.DictReader(f, dialect=dial)
        crudas = list(lector)
        encabezados = lector.fieldnames or []

    mapa = mapear(encabezados)
    faltan = [c for c in ("fecha", "estado") if c not in mapa]
    if faltan:
        print("No pude identificar columnas obligatorias:", ", ".join(faltan))
        print("\nEncabezados del archivo:")
        for h in encabezados:
            print("  -", h)
        print("\nAgregalos al diccionario ALIAS de este script.")
        return 1

    tiene_seguro = "seguro" in mapa and "flete" in mapa

    filas = []
    for r in crudas:
        fch = fecha(r.get(mapa["fecha"]))
        if fch is None:
            continue
        rec = numero(r.get(mapa["recaudo"])) if "recaudo" in mapa else None
        if rec is not None and rec <= 0:
            continue                      # sin recaudo no es venta contra entrega
        flete = numero(r.get(mapa["flete"])) if "flete" in mapa else None
        seg = numero(r.get(mapa["seguro"])) if "seguro" in mapa else None
        est = r.get(mapa["estado"], "")
        cls, liq = clasificar(est, flete, seg)
        filas.append({
            "fecha": fch,
            "edad": (corte - fch).days,
            "guia": (r.get(mapa["guia"], "") if "guia" in mapa else "").strip(),
            "transportadora": norm(r.get(mapa["transportadora"], "")) if "transportadora" in mapa else "",
            "producto": (r.get(mapa["producto"], "") if "producto" in mapa else "").strip(),
            "ciudad": (r.get(mapa["ciudad"], "") if "ciudad" in mapa else "").strip().upper(),
            "recaudo": rec, "estado": (est or "").strip(),
            "flete": flete, "seguro": seg,
            "cls": cls, "liquidada": liq,
        })

    if not filas:
        print("El archivo no tiene filas utilizables (revisa fecha y recaudo).")
        return 1

    filas.sort(key=lambda x: x["fecha"])
    ini, fin = filas[0]["fecha"], filas[-1]["fecha"]

    print("=" * 78)
    print("DEVOLUCIONES AL 30-SEP — ¿empeoro, o es el acumulado?")
    print("=" * 78)
    print()
    print(f"  archivo ........ {os.path.basename(arch)}")
    print(f"  guias .......... {len(filas):,} (de {len(crudas):,} filas del export)")
    print(f"  rango .......... {ini:%Y-%m-%d} a {fin:%Y-%m-%d}")
    print(f"  fecha de corte . {corte:%Y-%m-%d} (foto de los estados)")
    print(f"  columnas ....... {', '.join(sorted(mapa))}")
    if not tiene_seguro:
        print()
        print("  ⚠️  Sin columnas de flete/seguro no se puede aplicar el filtro de")
        print("      liquidacion (error #18). El numero va a salir INFLADO.")
    print()

    # ---------------------------------------------------- 1. liquidacion
    print("### 1. Cuales devoluciones estan liquidadas de verdad")
    print()
    dev = [x for x in filas if x["cls"] == "devuelta"]
    liq = [x for x in dev if x["liquidada"] is True]
    noliq = [x for x in dev if x["liquidada"] is False]
    indet = [x for x in dev if x["liquidada"] is None]
    print(f"  marcadas como devolucion en el export ..... {len(dev)}")
    if tiene_seguro:
        print(f"    liquidadas (flete == seguro) ............ {len(liq)}")
        print(f"    todavia NO liquidadas ................... {len(noliq)}")
        if indet:
            print(f"    sin datos para decidir .................. {len(indet)}")
        print()
        print("  Regla de la seccion 0-AY: en una devolucion 99 Envios cobra solo la")
        print("  prima del seguro, no el flete. Si flete != seguro, la devolucion")
        print("  todavia esta en tramite y contarla es el error #18.")
    else:
        print("  (no verificable en este archivo)")
    print()

    # devoluciones confirmadas: liquidadas si hay datos, todas si no los hay
    def es_dev(x):
        if not tiene_seguro:
            return x["cls"] == "devuelta"
        return x["cls"] == "devuelta" and x["liquidada"] is True

    # ---------------------------------------------------- 2. madurez
    print(f"### 2. El acumulado: las devoluciones aparecen tarde")
    print()
    print(f"{'edad':<13}{'guias':>7}{'entreg':>8}{'devuel':>8}{'abiert':>8}"
          f"{'% cerrado':>11}{'dev/cerr':>10}")
    print("-" * 65)
    BUCKETS = [(0, 6, "0-6 dias"), (7, 14, "7-14 dias"), (15, 21, "15-21 dias"),
               (22, 35, "22-35 dias"), (36, 9999, "36+ dias")]
    serie_edad = []
    for lo, hi, nom in BUCKETS:
        xs = [x for x in filas if lo <= x["edad"] <= hi]
        if not xs:
            continue
        e = sum(1 for x in xs if x["cls"] == "entregada")
        d = sum(1 for x in xs if es_dev(x))
        cerr = e + d
        ab = len(xs) - cerr
        tasa = d / cerr if cerr else 0
        serie_edad.append((nom, d, cerr, tasa))
        print(f"{nom:<13}{len(xs):>7}{e:>8}{d:>8}{ab:>8}"
              f"{cerr/len(xs)*100:>10.0f}%{tasa*100:>9.1f}%")
    print()
    if len(serie_edad) >= 2:
        sube = serie_edad[-1][3] > serie_edad[0][3]
        veredicto = ("parte del alza que vio el dueno ES el acumulado madurando"
                     if sube else "el acumulado no explica el alza")
        print(f"  dev/cerr va de {serie_edad[0][3]*100:.1f}% ({serie_edad[0][0]}) "
              f"a {serie_edad[-1][3]*100:.1f}% ({serie_edad[-1][0]})")
        print(f"  -> {'SI' if sube else 'NO'} sube con la edad: {veredicto}")
    print()

    # ---------------------------------------------------- 3. semanas legibles
    print(f"### 3. Semanas con madurez >= {MADUREZ_MIN} dias, con intervalo de confianza")
    print()
    print("  Solo estas se pueden juzgar. Las mas frescas se ven bien porque")
    print("  estan verdes, no porque hayan mejorado.")
    print()
    print(f"{'semana (lun)':<14}{'guias':>7}{'cerr':>6}{'dev':>5}{'tasa':>8}{'IC 95%':>21}")
    print("-" * 61)
    semanas = {}
    for x in filas:
        lun = x["fecha"] - timedelta(days=x["fecha"].weekday())
        semanas.setdefault(lun.date(), []).append(x)
    legibles = []
    frescas = []
    for lun in sorted(semanas):
        xs = semanas[lun]
        edad = (corte.date() - lun).days - 6      # madurez del ultimo dia
        e = sum(1 for x in xs if x["cls"] == "entregada")
        d = sum(1 for x in xs if es_dev(x))
        cerr = e + d
        if edad < MADUREZ_MIN or cerr == 0:
            frescas.append((lun, xs, edad, d, cerr))
            continue
        lo, hi = wilson(d, cerr)
        legibles.append((lun, d, cerr))
        print(f"{str(lun):<14}{len(xs):>7}{cerr:>6}{d:>5}{d/cerr*100:>7.1f}%"
              f"{f'{lo*100:.1f}% – {hi*100:.1f}%':>21}")
    if not legibles:
        print("  (ninguna semana alcanza la madurez minima en este archivo)")
    print()
    if frescas:
        print("  Sin veredicto todavia (muy frescas):")
        for lun, xs, edad, d, cerr in frescas:
            print(f"    {lun} — {edad}d de madurez, {cerr}/{len(xs)} cerradas, "
                  f"{d} devoluciones hasta ahora")
        print()

    # ---------------------------------------------------- 4. el numero
    print("### 4. EL NUMERO de la cuenta")
    print()
    tot_d = sum(d for _, d, _ in legibles)
    tot_n = sum(n for _, _, n in legibles)
    if tot_n:
        lo, hi = wilson(tot_d, tot_n)
        print(f"  Sobre todo lo legible (madurez >= {MADUREZ_MIN} dias):")
        print(f"    {tot_d} devoluciones / {tot_n} guias cerradas = {tot_d/tot_n*100:.1f}%")
        print(f"    IC 95%: {lo*100:.1f}% – {hi*100:.1f}%")
        print()
        print(f"  Contra el 5,0% medido el 10-sep (misma base, 99 Envios):")
        d5, z5, p5 = z_test(tot_d, tot_n, round(BASE_10SEP * 200), 200)
        if lo <= BASE_10SEP <= hi:
            print(f"    el 5,0% CAE DENTRO del intervalo -> no se puede afirmar")
            print(f"    que haya empeorado; es el mismo numero con otra suerte")
        elif lo > BASE_10SEP:
            print(f"    el 5,0% queda POR DEBAJO del intervalo -> si subio de verdad")
            print(f"    (+{(tot_d/tot_n - BASE_10SEP)*100:.1f} puntos)")
        else:
            print(f"    el 5,0% queda POR ENCIMA del intervalo -> mejoramos")
        print()
        print(f"  Contra el ~19,6% de la epoca de Heka: OTRA base (otro operador,")
        print(f"  otro guion, otras ciudades). Sirve de referencia historica, no")
        print(f"  para restar.")
    else:
        print("  No hay base madura suficiente para dar un numero.")
    print()

    # ---------------------------------------------------- 5. techo
    if tot_n:
        print("### 5. Hacia donde va (el piso y el techo)")
        print()
        abiertas = [x for x in filas if x["cls"] in ("riesgo", "transito")]
        rie = sum(1 for x in abiertas if x["cls"] == "riesgo")
        tasa_madura = tot_d / tot_n
        d_conf = sum(1 for x in filas if es_dev(x))
        n_tot = len(filas)
        piso = d_conf / n_tot
        esp = (d_conf + len(abiertas) * tasa_madura) / n_tot
        techo = (d_conf + rie + (len(abiertas) - rie) * tasa_madura) / n_tot
        print(f"  {len(abiertas)} guias sin cerrar ({rie} de ellas en novedad)")
        print()
        print(f"  piso (solo lo ya confirmado) ................ {piso*100:>5.1f}%")
        print(f"  esperado (abiertas se portan normal) ........ {esp*100:>5.1f}%")
        print(f"  techo (las de novedad se caen todas) ........ {techo*100:>5.1f}%")
        print()

        # ------------------------------------------------ 6. plata
        print("### 6. Cuanto vale en plata")
        print()
        ped_dia = UDS_DIA / UDS_PEDIDO
        marg_ped = MARGEN_UD * UDS_PEDIDO
        por_punto = 0.01 * ped_dia * (marg_ped + COSTO_DEV)
        print(f"  1 punto de devolucion = ${por_punto:,.0f}/dia = "
              f"${por_punto*30:,.0f}/mes")
        print()
        delta = (tasa_madura - BASE_10SEP) * 100
        print(f"  Moverse del 5,0% al {tasa_madura*100:.1f}% actual = "
              f"{delta:+.1f} puntos = ${-delta*por_punto*30:,.0f}/mes")
        print()

        # ------------------------------------------------ 7. transportadora
        porcia = {}
        for x in filas:
            if x["edad"] < MADUREZ_MIN or not x["transportadora"]:
                continue
            t = porcia.setdefault(x["transportadora"], [0, 0])
            if x["cls"] == "entregada":
                t[1] += 1
            elif es_dev(x):
                t[0] += 1
                t[1] += 1
        if porcia:
            print(f"### 7. Por transportadora (solo madurez >= {MADUREZ_MIN} dias)")
            print()
            print(f"{'transportadora':<18}{'cerr':>6}{'dev':>5}{'tasa':>8}{'IC 95%':>21}")
            print("-" * 58)
            for t, (d, n) in sorted(porcia.items(), key=lambda kv: -kv[1][1]):
                if n == 0:
                    continue
                lo, hi = wilson(d, n)
                print(f"{t[:17]:<18}{n:>6}{d:>5}{d/n*100:>7.1f}%"
                      f"{f'{lo*100:.1f}% – {hi*100:.1f}%':>21}")
            print()
            print("  Si los intervalos se solapan, la diferencia entre")
            print("  transportadoras no es decidible con esta base.")
            print()

    # ---------------------------------------------------- copia sin PII
    with open(SALIDA, "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        w.writerow(COLUMNAS)
        for x in filas:
            w.writerow([x["fecha"].strftime("%Y-%m-%d"), x["guia"],
                        x["transportadora"], x["producto"], x["ciudad"],
                        "" if x["recaudo"] is None else f"{x['recaudo']:g}",
                        x["estado"],
                        "" if x["flete"] is None else f"{x['flete']:g}",
                        "" if x["seguro"] is None else f"{x['seguro']:g}"])
    print("-" * 78)
    print(f"Copia sin datos personales -> {SALIDA}")
    print("(solo las 9 columnas de la convencion; nombre, direccion y telefono")
    print(" del cliente NO se copian: este repo es publico)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
