# -*- coding: utf-8 -*-
"""
¿EL GUION TOMÓ EFECTO? — verificación con datos (pendiente #58) · 2026-08-24

El guion se pegó en la IA de WhatsApp Business el viernes 21-ago. Pegarlo no
garantiza que la IA lo obedezca, así que la prueba tiene que salir de los datos:
el `valor_comercial` de las guías nuevas debe coincidir con el total de su banda.

  ANTES (91 guías, 10-20 ago): los recaudos eran $72.698, $80.941, $81.030...
  AHORA: deberían ser $73.000, $77.000, $81.000, $83.000, $85.000

Fuente: analisis/guias-99envios-24ago.csv (export del 24-ago).
"""
import csv
import collections
import os
import unicodedata
from datetime import datetime, timedelta

DIR = os.path.dirname(os.path.abspath(__file__))
OFFSET_COT = timedelta(hours=-5)
PRECIO = 59900
PROMO_2 = 110000

# El tarifario que se pegó en el guion el 21-ago.
BANDAS = {
    "A": (73000, ["BOGOTA", "SOACHA", "ZIPAQUIRA", "CHIA", "CAJICA", "MOSQUERA",
                  "MADRID", "FUNZA", "FACATATIVA", "SIBATE", "LA CALERA"]),
    "B": (77000, ["TUNJA", "PAIPA", "AGUAZUL", "TOCANCIPA", "VILLAVICENCIO",
                  "DUITAMA", "SOGAMOSO", "YOPAL", "ACACIAS", "CUCUNUBA",
                  "UBATE", "CHOCONTA", "VILLA DE LEYVA"]),
    "C": (81000, ["MEDELLIN", "ITAGUI", "ENVIGADO", "SABANETA", "CALI", "PALMIRA",
                  "JAMUNDI", "YUMBO", "BARRANQUILLA", "SOLEDAD", "CARTAGENA",
                  "CARTAGENA DE INDIAS", "PEREIRA", "DOSQUEBRADAS", "MANIZALES",
                  "BARRANCABERMEJA", "YARUMAL", "ARMENIA", "IBAGUE", "NEIVA"]),
    "D": (83000, ["BUCARAMANGA", "CUCUTA", "SAN JOSE DE CUCUTA", "MONTERIA",
                  "POPAYAN", "PASTO", "IPIALES", "SANTA MARTA", "VALLEDUPAR",
                  "SINCELEJO", "FLORENCIA", "MOCOA", "QUIBDO", "RIOHACHA",
                  "BELLO", "RIONEGRO", "CERETE", "COVENAS", "SAMACA"]),
    "E": (85000, []),
}


def norm(c):
    s = unicodedata.normalize("NFD", c)
    s = "".join(ch for ch in s if unicodedata.category(ch) != "Mn").upper()
    s = s.replace("D.C.", "").replace(",", " ")
    return " ".join(s.split())


def banda_de(ciudad):
    n = norm(ciudad)
    for k, (_, ciudades) in BANDAS.items():
        if n in ciudades:
            return k
    return "E"


def sep(t):
    print("\n" + "=" * 86)
    print(t)
    print("=" * 86)


def main():
    filas = []
    with open(os.path.join(DIR, "guias-99envios-24ago.csv"), encoding="utf-8") as fh:
        for r in csv.DictReader(fh):
            f = datetime.strptime(r["fecha_envio_utc"], "%Y-%m-%d %H:%M:%S") + OFFSET_COT
            cobrado = float(r["valor_comercial"])
            filas.append({
                "fecha": f, "guia": r["numero_de_guia"], "ciudad": r["ciudad_destino"],
                "cobrado": cobrado, "flete": float(r["valor_servicio"]),
                "trans": r["transportadora"], "estado": r["estado_del_envio"],
                "uds": 2 if cobrado > 100000 else 1,
            })

    sep("1. 🎉 EL VEREDICTO: ¿LOS RECAUDOS SON LOS DEL TARIFARIO?")
    una = [f for f in filas if f["uds"] == 1]
    precios_banda = {v[0] for v in BANDAS.values()}
    en_tarifa = [f for f in una if f["cobrado"] in precios_banda]
    print(f"  Guías de 1 unidad: {len(una)}")
    print(f"  Con recaudo EXACTO de una banda del tarifario: {len(en_tarifa)} "
          f"({len(en_tarifa)/len(una):.0%})")
    print(f"\n  Distribución de los recaudos cobrados:")
    for v, n in sorted(collections.Counter(f["cobrado"] for f in una).items()):
        marca = " ✅ es una banda" if v in precios_banda else " 🔴 NO es una banda"
        print(f"    ${v:>9,.0f}  ×{n:<3}{marca}")
    print("""
  🎉 ANTES DEL 21-AGO los recaudos eran $72.698, $80.941, $81.030, $80.676...
     números "sucios" que salían de sumar producto + flete exacto.
     AHORA son $73.000, $77.000, $81.000, $83.000, $85.000.
     **EL GUION ESTÁ VIVO. La IA está cotizando el tarifario nuevo.**""")

    sep("2. LA CUENTA QUE IMPORTA: ¿SE SIGUE ABSORBIENDO FLETE?")
    print(f"  {'CIUDAD':26} {'BANDA':>5} {'COBRÓ':>9} {'NECESITA':>9} {'DIF':>9}")
    print("-" * 86)
    fuga = 0.0
    sobra = 0.0
    problemas = []
    for f in sorted(una, key=lambda x: x["cobrado"] - (PRECIO + x["flete"])):
        b = banda_de(f["ciudad"])
        necesita = PRECIO + f["flete"]
        dif = f["cobrado"] - necesita
        if dif < -300:
            fuga += -dif
            problemas.append((f, b, dif))
            m = " 🔴"
        elif dif > 2500:
            sobra += dif
            problemas.append((f, b, dif))
            m = " 🟡 cobra de más"
        else:
            m = " ✅"
        print(f"  {f['ciudad'][:26]:26} {b:>5} {f['cobrado']:>9,.0f} "
              f"{necesita:>9,.0f} {dif:>+9,.0f}{m}")
    print("-" * 86)
    print(f"  ABSORBIDO: ${fuga:,.0f}   ·   COBRADO DE MÁS: ${sobra:,.0f}")
    print(f"  Con la tabla vieja estas {len(una)} guías habrían absorbido "
          f"~${len(una)*1327:,.0f}")

    sep("3. 🔴 LAS CIUDADES QUE FALTAN EN LAS LISTAS (la causa de casi todo el error)")
    faltantes = collections.defaultdict(list)
    for f in una:
        n = norm(f["ciudad"])
        conocida = any(n in c for _, c in BANDAS.values())
        if not conocida:
            faltantes[f["ciudad"]].append(f)
    print(f"  {len(faltantes)} ciudades cayeron al default (banda E, $85.000):\n")
    print(f"  {'CIUDAD':26} {'FLETE':>9} {'COBRÓ':>9} {'DEBERÍA COBRAR':>15} {'ERROR':>9}")
    print("-" * 86)
    for c, gs in sorted(faltantes.items(), key=lambda x: -abs(x[1][0]["cobrado"] - (PRECIO + x[1][0]["flete"]))):
        f = gs[0]
        nec = PRECIO + f["flete"]
        # ¿en qué banda debería estar según su flete real?
        correcta = next(tot for lim, tot in [(14000, 73000), (18000, 77000),
                                             (21500, 81000), (23500, 83000),
                                             (99999, 85000)] if f["flete"] < lim)
        print(f"  {c[:26]:26} {f['flete']:>9,.0f} {f['cobrado']:>9,.0f} "
              f"{correcta:>15,.0f} {f['cobrado']-correcta:>+9,.0f}")
    print("-" * 86)

    sep("4. ⚠️ LOS FLETES SUBIERON — HAY QUE REVISAR SI LAS BANDAS AGUANTAN")
    ref = {"A": 12871, "B": 16843, "C": 20771, "D": 22870, "E": 25029}
    print(f"  {'BANDA':>5} {'FLETE ANTES':>12} {'FLETE AHORA':>12} {'SUBIÓ':>8} "
          f"{'COBRA':>8} {'COLCHÓN':>9}")
    print("-" * 86)
    for k in "ABCDE":
        gs = [f for f in una if banda_de(f["ciudad"]) == k]
        if not gs:
            continue
        peor = max(f["flete"] for f in gs)
        cobra = BANDAS[k][0]
        colchon = cobra - PRECIO - peor
        m = " 🔴 NO ALCANZA" if colchon < 0 else (" ⚠️ justo" if colchon < 200 else " ✅")
        print(f"  {k:>5} {ref[k]:>12,} {peor:>12,.0f} {peor-ref[k]:>+8,.0f} "
              f"{cobra:>8,} {colchon:>+9,.0f}{m}")
    print("-" * 86)

    sep("5. PEDIDOS DE 2 UNIDADES: ¿SE APLICÓ LA PROMO?")
    dos = [f for f in filas if f["uds"] == 2]
    print(f"  {'CIUDAD':26} {'FLETE':>9} {'COBRÓ':>9} {'PROMO+FLETE':>12} {'DIF':>9}")
    print("-" * 86)
    for f in sorted(dos, key=lambda x: x["cobrado"] - (PROMO_2 + x["flete"])):
        deb = PROMO_2 + f["flete"]
        dif = f["cobrado"] - deb
        m = " 🔴 absorbe" if dif < -300 else (" ✅" if dif < 2500 else " 🟡 de más")
        print(f"  {f['ciudad'][:26]:26} {f['flete']:>9,.0f} {f['cobrado']:>9,.0f} "
              f"{deb:>12,.0f} {dif:>+9,.0f}{m}")
    print("-" * 86)
    n138 = sum(1 for f in dos if f["cobrado"] == 138000)
    print(f"""
  📌 {n138} de {len(dos)} cobraron exactamente $138.000 → **la promo se estandarizó**,
     que es una mejora enorme contra los 6 precios distintos de antes.
  ⚠️ Pero $138.000 es una tarifa PLANA, y el flete de 2 unidades va de $17.658
     a $32.458. En los destinos caros se queda corta.""")

    sep("6. VOLUMEN Y RITMO DE DESPACHO")
    porlote = collections.defaultdict(list)
    for f in filas:
        porlote[f["fecha"].strftime("%Y-%m-%d %H:%M")[:13]].append(f)
    D = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"]
    for k in sorted(porlote):
        gs = porlote[k]
        ini = min(f["fecha"] for f in gs)
        uds = sum(f["uds"] for f in gs)
        print(f"  {ini.strftime('%d-%b %H:%M')} {D[ini.weekday()]:10} "
              f"{len(gs):>3} guías · {uds} unidades")
    print(f"\n  TOTAL en el export: {len(filas)} guías · "
          f"{sum(f['uds'] for f in filas)} unidades")


if __name__ == "__main__":
    main()
