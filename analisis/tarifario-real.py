# -*- coding: utf-8 -*-
"""
TARIFARIO REAL DE 99 ENVÍOS — construido con las 79 guías auditadas (10-19 ago 2026).

Objetivo: reemplazar la tabla inventada de `bot/src/fletes.js` (Cali $13.000, Cartagena
$15.000, default $18.000) por los fletes que 99 Envíos cobra DE VERDAD, y calcular
cuánto se debe cobrar al cliente para dejar de absorber flete (pendientes #35 y #38a).

Fuentes: guias-99envios.csv (10-14 ago) + guias-99envios-19ago.csv (14-19 ago)
Campos:  valor_servicio  = flete que cobra 99 Envíos
         valor_comercial = lo que se le cobró al cliente (recaudo contraentrega)
"""
import csv
import collections

PRECIO = 59900
ARCHIVOS = ["guias-99envios.csv", "guias-99envios-19ago.csv"]

# Guías donde valor_servicio es una PRIMA de seguro (devolución), no un flete.
# Sección 0-L: en una devolución solo se paga la prima ($1.742 / $3.111).
UMBRAL_PRIMA = 8000


def cargar():
    filas = []
    for archivo in ARCHIVOS:
        with open(archivo, encoding="utf-8") as fh:
            for r in csv.DictReader(fh):
                filas.append({
                    "ciudad": r["ciudad_destino"].strip().upper(),
                    "flete": float(r["valor_servicio"]),
                    "cobrado": float(r["valor_comercial"]),
                    "unidades": int(r["unidades"]),
                    "estado": r["estado_del_envio"],
                })
    return filas


def main():
    filas = cargar()
    print(f"Guías cargadas: {len(filas)}\n")

    primas = [f for f in filas if f["flete"] < UMBRAL_PRIMA]
    validas = [f for f in filas if f["flete"] >= UMBRAL_PRIMA]
    print(f"⚠️  {len(primas)} guía(s) excluida(s) por ser PRIMA de devolución, no flete: "
          + ", ".join(f"{f['ciudad']} ${f['flete']:,.0f}" for f in primas))
    print("    (Si se promedian, ensucian el tarifario: bajan Bogotá y Santa Marta "
          "artificialmente.)\n")

    # ---------- 1 UNIDAD: el tarifario base ----------
    una = [f for f in validas if f["unidades"] == 1]
    porciudad = collections.defaultdict(list)
    for f in una:
        porciudad[f["ciudad"]].append(f)

    print("=" * 92)
    print("TARIFARIO REAL — 1 UNIDAD")
    print("=" * 92)
    print(f"{'CIUDAD':26} {'n':>2} {'FLETE':>9} {'COBRADO':>9} {'DEBIÓ SER':>10} {'ABSORBIDO':>10}")
    print("-" * 92)

    absorcion_total = 0.0
    for ciudad in sorted(porciudad, key=lambda c: -sum(x["flete"] for x in porciudad[c]) / len(porciudad[c])):
        gs = porciudad[ciudad]
        flete = sum(x["flete"] for x in gs) / len(gs)
        cobrado = sum(x["cobrado"] for x in gs) / len(gs)
        debio = PRECIO + flete
        absorbido = debio - cobrado
        absorcion_total += max(absorbido, 0) * len(gs)
        marca = " 🔴" if absorbido > 2000 else ""
        print(f"{ciudad:26} {len(gs):>2} {flete:>9,.0f} {cobrado:>9,.0f} {debio:>10,.0f} "
              f"{absorbido:>10,.0f}{marca}")

    print("-" * 92)
    print(f"Flete promedio (1 ud): ${sum(f['flete'] for f in una)/len(una):,.0f}")
    print(f"Absorción total en las {len(una)} guías de 1 ud: ${absorcion_total:,.0f}")

    # ---------- BANDAS ----------
    # Los fletes NO son un continuo: se agrupan en 5 escalones nítidos.
    bandas = [
        ("A · Bogotá y sabana",      0,     14000),
        ("B · Boyacá/Casanare/Meta", 14000, 18000),
        ("C · Capitales grandes",    18000, 21500),
        ("D · Intermedias",          21500, 23500),
        ("E · Pueblos / extendida",  23500, 99999),
    ]
    print("\n" + "=" * 92)
    print("LOS 5 ESCALONES (así hay que cargarlos en el guion, no ciudad por ciudad)")
    print("=" * 92)

    # Cada CIUDAD cae en una sola banda, según su flete MODAL (el más repetido).
    # Bandear guía por guía parte ciudades en dos: Bogotá tiene 12 guías a $12.871
    # y 1 a $14.674, y aparecía en la banda A y en la B a la vez.
    banda_de_ciudad = {}
    for ciudad, gs in porciudad.items():
        fletes = [g["flete"] for g in gs]
        modal = collections.Counter(fletes).most_common(1)[0][0]
        for nombre, lo, hi in bandas:
            if lo <= modal < hi:
                banda_de_ciudad[ciudad] = nombre
                break

    tarifario = {}
    for nombre, lo, hi in bandas:
        ciudades = sorted(c for c, b in banda_de_ciudad.items() if b == nombre)
        if not ciudades:
            continue
        gs = [g for c in ciudades for g in porciudad[c]]
        # El techo se toma de los datos (el flete MÁS CARO visto en la banda), no a mano:
        # así el precio al cliente cubre el peor caso de la banda y nunca se absorbe.
        peor = max(g["flete"] for g in gs)
        modal = collections.Counter(g["flete"] for g in gs).most_common(1)[0][0]

        def al_millar(flete):
            return int(-(-(PRECIO + flete) // 1000) * 1000)

        precio_peor, precio_modal = al_millar(peor), al_millar(modal)
        # Cuánto se absorbería cobrando el precio basado en el flete MODAL.
        fuga_modal = sum(max((PRECIO + g["flete"]) - precio_modal, 0) for g in gs)

        # Regla: cubrir el peor caso, SALVO que el peor caso sea un outlier aislado y
        # subir el precio de toda la banda cueste más conversión que la fuga que evita.
        outliers = [g for g in gs if g["flete"] > modal]
        aislado = len(outliers) / len(gs) < 0.10
        elegido = precio_modal if aislado else precio_peor
        tarifario[nombre] = (elegido, peor, ciudades)

        print(f"\n{nombre}")
        print(f"  guías: {len(gs)}  ·  flete observado: "
              f"${min(g['flete'] for g in gs):,.0f} – ${peor:,.0f}  ·  modal ${modal:,.0f}")
        print(f"  🔒 COBRAR AL CLIENTE: ${elegido:,.0f}")
        if aislado and precio_modal != precio_peor:
            print(f"     (cubrir el peor caso pediría ${precio_peor:,.0f}, pero solo "
                  f"{len(outliers)} de {len(gs)} guías lo necesitan → se absorben "
                  f"${fuga_modal:,.0f} en total y se protege la conversión del resto)")
        else:
            print(f"     (producto ${PRECIO:,.0f} + peor flete ${peor:,.0f} = "
                  f"${PRECIO+peor:,.0f} → colchón ${elegido-PRECIO-peor:,.0f})")
        print(f"  ciudades vistas: {', '.join(ciudades)}")

    # ---------- QUÉ HABRÍA PASADO CON ESTE TARIFARIO ----------
    print("\n" + "-" * 92)
    print("CONTROL: absorción que habría habido cobrando el tarifario nuevo")
    absorbido_nuevo = 0.0
    for ciudad, gs in porciudad.items():
        cobrar = tarifario[banda_de_ciudad[ciudad]][0]
        for g in gs:
            absorbido_nuevo += max((PRECIO + g["flete"]) - cobrar, 0)
    print(f"  antes: ${absorcion_total:,.0f}   ahora: ${absorbido_nuevo:,.0f}")

    # ---------- 2 UNIDADES: el hallazgo nuevo ----------
    dos = [f for f in validas if f["unidades"] == 2]
    print("\n" + "=" * 92)
    print("🚨 HALLAZGO NUEVO — EL PRECIO DE 2 UNIDADES NO EXISTE: CADA VENTA COBRÓ DISTINTO")
    print("=" * 92)
    print(f"{'CIUDAD':26} {'FLETE':>9} {'COBRADO':>9} {'PRODUCTO':>10} {'C/UNIDAD':>10}")
    print("-" * 92)
    unitarios = []
    for f in sorted(dos, key=lambda x: -(x["cobrado"] - x["flete"])):
        producto = f["cobrado"] - f["flete"]
        unit = producto / 2
        unitarios.append(unit)
        print(f"{f['ciudad']:26} {f['flete']:>9,.0f} {f['cobrado']:>9,.0f} "
              f"{producto:>10,.0f} {unit:>10,.0f}")
    print("-" * 92)
    lo, hi = min(unitarios), max(unitarios)
    print(f"Precio unitario en pedidos de 2: ${lo:,.0f} – ${hi:,.0f}  "
          f"(dispersión {(hi/lo - 1)*100:.1f}%)")
    print(f"Sobre {len(dos)} pedidos de 2 unidades, la diferencia entre el mejor y el peor")
    print(f"caso es ${(hi-lo)*2:,.0f} por pedido. NO hay política de precio para la 2ª unidad:")
    print("cada cierre improvisó. Esto bloquea el pendiente #40 (ofrecer la 2ª unidad):")
    print("no se puede ofrecer sistemáticamente algo que no tiene precio definido.")
    print("\nDato útil: el flete de 2 unidades NO se duplica.")
    for f in dos:
        base = next((g["flete"] for g in una if g["ciudad"] == f["ciudad"]), None)
        if base:
            print(f"  {f['ciudad']:26} 1 ud ${base:,.0f} → 2 ud ${f['flete']:,.0f} "
                  f"(+${f['flete']-base:,.0f}, no +${base:,.0f})")
    print("\n→ El gancho de la 2ª unidad es REAL: el flete se comparte casi completo.")


if __name__ == "__main__":
    main()
