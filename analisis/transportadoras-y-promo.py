# -*- coding: utf-8 -*-
"""
DOS PREGUNTAS DEL DUEÑO (2026-08-21):

1. ¿CUÁNTO CUESTA ELEGIR TRANSPORTADORA? El dueño ACLARA que SÍ elige, y que la
   escoge por eficiencia y por costo según la ubicación.
   ⚠️ ESTO CORRIGE LA SECCIÓN 0-O, que decía "quién despacha lo decide 99 Envíos,
   no el dueño" y sobre esa premisa falsa justificó cobrar el peor caso de cada
   banda. Si el flete es una DECISIÓN y no un sorteo, el tarifario cambia.

2. ¿LA PROMO DE 2 POR $110.000 DEJA PLATA? Existe y a veces se despacha, pero no
   estaba documentada en ningún lado.

Fuente: los 3 exports de 99 Envíos (91 guías únicas, 10-20 ago).
"""
import csv
import collections
import os

DIR = os.path.dirname(os.path.abspath(__file__))
ARCHIVOS = [
    ("guias-99envios.csv", "fecha_envio"),
    ("guias-99envios-19ago.csv", "fecha_envio_utc"),
    ("guias-99envios-21ago.csv", "fecha_envio_utc"),
]

PRECIO_UNIDAD = 59900
PROMO_2 = 110000
COSTO_PRODUCTO = 34000
COSTO_EMPAQUE = 1500
CPA = 6703               # por venta despachada, medido en la sección 0-O
UMBRAL_PRIMA = 8000


def cargar():
    porguia = {}
    for archivo, campo in ARCHIVOS:
        with open(os.path.join(DIR, archivo), encoding="utf-8") as fh:
            for r in csv.DictReader(fh):
                cobrado = float(r["valor_comercial"])
                porguia[r["numero_de_guia"].strip()] = {
                    "ciudad": r["ciudad_destino"].strip().upper(),
                    "flete": float(r["valor_servicio"]),
                    "cobrado": cobrado,
                    "trans": (r.get("transportadora") or "").strip().lower(),
                    "uds": int(r["unidades"]) if r.get("unidades") else (2 if cobrado > 100000 else 1),
                }
    # La columna transportadora del primer export venía como código numérico.
    codigos = {"1": "interrapidisimo", "2": "servientrega", "4": "coordinadora"}
    for g in porguia.values():
        g["trans"] = codigos.get(g["trans"], g["trans"])
    return [g for g in porguia.values() if g["flete"] >= UMBRAL_PRIMA]


def pregunta_1(guias):
    print("=" * 84)
    print("PREGUNTA 1 — SI EL DUEÑO ELIGE TRANSPORTADORA, ¿CUÁNTO CUESTA CADA ELECCIÓN?")
    print("=" * 84)

    una = [g for g in guias if g["uds"] == 1]

    # Tarifa por (ciudad, transportadora). Con esto se ve, para cada destino,
    # cuáles transportadoras están disponibles y a qué precio.
    tarifa = collections.defaultdict(dict)
    for g in una:
        prev = tarifa[g["ciudad"]].get(g["trans"])
        if prev is None or g["flete"] < prev:
            tarifa[g["ciudad"]][g["trans"]] = g["flete"]

    print("\nDestinos donde se usó MÁS DE UNA transportadora (ahí se ve el precio de elegir):")
    print(f"{'CIUDAD':22} {'coordinadora':>13} {'interrapid.':>13} {'servientrega':>13} {'AHORRO MÁX':>11}")
    print("-" * 84)
    comparables = 0
    for ciudad in sorted(tarifa):
        t = tarifa[ciudad]
        if len(t) < 2:
            continue
        comparables += 1
        co = t.get("coordinadora")
        ir = t.get("interrapidisimo")
        se = t.get("servientrega")
        vals = [v for v in t.values()]
        ahorro = max(vals) - min(vals)
        f = lambda v: f"${v:,.0f}" if v else "—"
        print(f"{ciudad:22} {f(co):>13} {f(ir):>13} {f(se):>13} {'$'+format(ahorro,',.0f'):>11}")
    if not comparables:
        print("  (ninguno)")

    # ¿Cuánto se pagó de más por no usar siempre la más barata DISPONIBLE?
    print("\n" + "-" * 84)
    print("COSTO DE LAS ELECCIONES: guías donde había una transportadora más barata")
    print("-" * 84)
    sobrecosto = 0.0
    detalle = collections.Counter()
    for g in una:
        opciones = tarifa[g["ciudad"]]
        if len(opciones) < 2:
            continue
        mejor = min(opciones.values())
        if g["flete"] > mejor + 50:
            dif = g["flete"] - mejor
            sobrecosto += dif
            detalle[(g["ciudad"], g["trans"])] += 1
    for (ciudad, trans), n in detalle.most_common():
        mejor = min(tarifa[ciudad].values())
        usado = tarifa[ciudad][trans]
        print(f"  {ciudad:22} {n}× por {trans:16} ${usado:,.0f} "
              f"(la más barata: ${mejor:,.0f} → +${usado-mejor:,.0f} c/u)")
    print(f"\n  SOBRECOSTO TOTAL en las guías comparables: ${sobrecosto:,.0f}")
    print("  ⚠️ NO es plata perdida: parte es elegir a propósito una transportadora")
    print("     más confiable. Pero ahora está medido y la decisión se puede tomar")
    print("     sabiendo el precio.")

    # Perfil de cada transportadora
    print("\n" + "-" * 84)
    print("PERFIL DE CADA TRANSPORTADORA")
    print("-" * 84)
    portrans = collections.defaultdict(list)
    for g in una:
        portrans[g["trans"]].append(g)
    for t in sorted(portrans, key=lambda x: -len(portrans[x])):
        gs = portrans[t]
        fl = [g["flete"] for g in gs]
        ciudades = sorted({g["ciudad"] for g in gs})
        print(f"\n  {t.upper()}  ({len(gs)} guías)")
        print(f"    flete ${min(fl):,.0f} – ${max(fl):,.0f} · promedio ${sum(fl)/len(fl):,.0f}")
        print(f"    destinos: {len(ciudades)}")
        if t == "coordinadora":
            print(f"    ⚠️ SOLO {len(ciudades)} destinos vistos: {', '.join(ciudades)}")
            print("       No se sabe si cubre el resto del país. ES LA PREGUNTA CLAVE.")

    # Precio de banda si SIEMPRE se pudiera elegir la más barata
    print("\n" + "-" * 84)
    print("SI SE PUDIERA ELEGIR SIEMPRE LA MÁS BARATA, ¿BAJARÍA EL TARIFARIO?")
    print("-" * 84)
    for ciudad in ["BOGOTÁ, D.C.", "CHÍA", "SOACHA", "BELLO", "GUACARÍ"]:
        if ciudad not in tarifa:
            continue
        t = tarifa[ciudad]
        mejor_t = min(t, key=t.get)
        mejor_v = t[mejor_t]
        total_actual = None
        # bandas del tarifario vigente
        for lim, tot in [(14000, 73000), (18000, 77000), (21500, 81000),
                         (23500, 83000), (99999, 85000)]:
            if mejor_v < lim:
                total_actual = tot
                break
        nec = PRECIO_UNIDAD + mejor_v
        print(f"  {ciudad:22} más barata: {mejor_t:16} ${mejor_v:,.0f} → "
              f"necesita ${nec:,.0f} · banda cobra ${total_actual:,.0f}")


def pregunta_2(guias):
    print("\n\n" + "=" * 84)
    print("PREGUNTA 2 — LA PROMO 2 x $110.000: ¿DEJA PLATA Y SE ESTÁ COBRANDO BIEN?")
    print("=" * 84)

    dos = [g for g in guias if g["uds"] == 2]

    print("\n¿SE ESTÁ APLICANDO LA PROMO? (producto cobrado = recaudo − flete)")
    print(f"{'CIUDAD':22} {'FLETE':>9} {'RECAUDO':>10} {'PRODUCTO':>10} {'vs PROMO':>10} {'vs 2 FULL':>10}")
    print("-" * 84)
    full = PRECIO_UNIDAD * 2
    for g in sorted(dos, key=lambda x: -(x["cobrado"] - x["flete"])):
        producto = g["cobrado"] - g["flete"]
        print(f"{g['ciudad']:22} {g['flete']:>9,.0f} {g['cobrado']:>10,.0f} "
              f"{producto:>10,.0f} {producto-PROMO_2:>+10,.0f} {producto-full:>+10,.0f}")
    print("-" * 84)
    print(f"  Promo declarada: ${PROMO_2:,} · 2 unidades a precio lleno: ${full:,}")
    print("\n  🔴 NINGUNO de los 6 pedidos cobró exactamente ni la promo ni el precio lleno.")
    print("     Los productos cobrados van de $107.013 a $119.981. La promo EXISTE pero")
    print("     no se está aplicando de forma consistente — y se desvía en AMBOS sentidos.")

    # ¿Se está pasando el flete al cliente en los pedidos de promo?
    print("\n¿SE LE ESTÁ PASANDO EL FLETE AL CLIENTE EN LA PROMO?")
    print("  (si la regla es $110.000 + flete real, el recaudo debería ser exactamente eso)")
    print("-" * 84)
    fuga = 0.0
    for g in sorted(dos, key=lambda x: x["cobrado"] - (PROMO_2 + x["flete"])):
        deberia = PROMO_2 + g["flete"]
        dif = g["cobrado"] - deberia
        marca = " 🔴 absorbió flete" if dif < -500 else ("" if dif < 500 else " (cobró de más)")
        if dif < 0:
            fuga += -dif
        print(f"  {g['ciudad']:22} debía ${deberia:>9,.0f} · cobró ${g['cobrado']:>9,.0f} "
              f"· {dif:>+8,.0f}{marca}")
    print(f"\n  Flete absorbido en pedidos de 2 unidades: ${fuga:,.0f}")

    # Economía de la promo
    print("\n" + "-" * 84)
    print("¿LA PROMO DEJA PLATA? (margen por PEDIDO, con el flete pasado al cliente)")
    print("-" * 84)
    escenarios = [
        ("1 unidad a $59.900", PRECIO_UNIDAD, 1),
        ("2 unidades PROMO $110.000", PROMO_2, 2),
        ("2 unidades a precio lleno", full, 2),
    ]
    for nombre, ingreso, uds in escenarios:
        # Un solo paquete → un solo empaque, aunque vayan 2 unidades.
        costo = COSTO_PRODUCTO * uds + COSTO_EMPAQUE
        margen = ingreso - costo
        neto = margen - CPA
        print(f"  {nombre:28} margen ${margen:>7,.0f} · menos CPA ${CPA:,} → "
              f"NETO ${neto:>7,.0f}")

    m_promo = PROMO_2 - (COSTO_PRODUCTO * 2 + COSTO_EMPAQUE) - CPA
    m_uno = PRECIO_UNIDAD - (COSTO_PRODUCTO + COSTO_EMPAQUE) - CPA
    m_full2 = full - (COSTO_PRODUCTO * 2 + COSTO_EMPAQUE) - CPA
    print(f"\n  ✅ La promo deja {m_promo/m_uno:.2f}× lo que deja una venta de 1 unidad.")
    print(f"  ⚠️ Pero deja ${m_full2-m_promo:,.0f} MENOS que vender las 2 a precio lleno")
    print(f"     (el descuento de ${full-PROMO_2:,.0f} sale entero del margen).")

    print("\n  MARGEN DE LA SEGUNDA UNIDAD SOLA (sin publicidad adicional):")
    flete_extra = 7100
    for nombre, precio2 in [("en promo", PROMO_2 - PRECIO_UNIDAD),
                            ("a precio lleno", PRECIO_UNIDAD)]:
        m = precio2 - COSTO_PRODUCTO
        print(f"    {nombre:16} se cobra ${precio2:,} − producto ${COSTO_PRODUCTO:,} "
              f"= ${m:,}")
    print(f"\n    (el flete extra de la 2ª unidad, ~${flete_extra:,}, lo paga el cliente)")

    print("\n  🔑 EL GANCHO QUE NO CUESTA MARGEN: EL FLETE COMPARTIDO.")
    print("     2 pedidos separados a Medellín = 2 × $20.771 = $41.542 de flete.")
    print("     1 pedido de 2 unidades = $27.891. **El cliente se ahorra $13.651 de flete**")
    print("     sin que el negocio regale un peso de producto.")
    print("     Y hay evidencia de que la promo no siempre hace falta: el pedido de")
    print("     CARTAGENA pagó $119.981, o sea 2 unidades a PRECIO LLENO.")


def main():
    guias = cargar()
    print(f"Guías válidas: {len(guias)} "
          f"({len([g for g in guias if g['uds']==1])} de 1 unidad, "
          f"{len([g for g in guias if g['uds']==2])} de 2)\n")
    pregunta_1(guias)
    pregunta_2(guias)


if __name__ == "__main__":
    main()
