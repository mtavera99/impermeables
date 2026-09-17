#!/usr/bin/env python3
"""
LA FUGA DE LAS 2 UNIDADES — medida sobre 206 guias (export 2026-09-16)
======================================================================
Confirma y CUANTIFICA lo que 0-AE dejo dicho a medias ("la fuga de flete esta
solo en la promo de 2 uds"), ahora con muestra grande y flete REAL del export.

HALLAZGO: el envio de 2 unidades NO se comparte tanto como asume el tarifario.
Los pedidos de 1 unidad quedan por ENCIMA de la referencia de $23.244/unidad.
Los de 2 unidades quedan TODOS por debajo, sin una sola excepcion.

Los datos son del export 'Envios-Completos-2026-09-16', columna valor_servicio
(flete real cobrado por 99 Envios) contra valor_comercial (lo que paga el cliente).

Sin PII: solo ciudad, valor y flete.
"""

COSTO_UD = 33000        # costo del producto por unidad (0-AE, desde el 8-sep)
REF_MARGEN = 23244      # margen/unidad medido en 39 unidades (0-AX)

# ---- TODOS los pedidos de 2 unidades del export (ciudad, cobrado, flete_real) ----
DOS = [
    ("QUIBDO", 140000, 38161.00), ("YOPAL", 136000, 26013.72),
    ("SAN VICENTE DEL CAGUAN", 143000, 35326.43), ("ZAMBRANO", 135000, 38970.67),
    ("SAN ANDRES", 185000, 78922.02), ("BUENAVENTURA", 138000, 32581.37),
    ("COTORRA", 143000, 38386.14), ("SOACHA", 128000, 20993.75),
    ("VILLAVIEJA", 143000, 32685.04), ("CONCORDIA", 143000, 36208.88),
    ("BOGOTA", 128000, 20993.75), ("ARMENIA", 138000, 32312.45),
    ("ARAUQUITA", 143000, 35033.60), ("NECHI", 143000, 45562.32),
    ("SAN ROQUE", 135000, 33863.18), ("SAN ALBERTO", 143000, 34449.95),
    ("VILLAVICENCIO", 136000, 28260.69), ("MONTERIA", 138000, 28400.16),
    ("EL BAGRE", 143000, 35605.31), ("SAN DIEGO", 143000, 35123.24),
    ("SANTA MARTA", 138000, 28400.16), ("NEIVA", 138000, 28400.16),
    ("BOGOTA", 128000, 20647.14), ("BARRANCABERMEJA", 138000, 34083.34),
    ("MOCOA", 143000, 34449.95), ("BOGOTA", 128000, 20647.14),
    ("TADO", 143000, 71667.48), ("RIONEGRO", 139000, 28469.90),
    ("LA PLATA", 143000, 34449.95), ("MADRID", 128000, 20647.14),
    ("CHOCONTA", 136000, 25372.29), ("LEIVA", 143000, 38588.33),
    ("BOGOTA", 128000, 20647.14), ("CERRITO", 143000, 35605.31),
    ("SUAITA", 140000, 35385.14), ("PUERTO GAITAN", 143000, 34449.95),
    ("CHIA", 128000, 20647.14), ("BOGOTA", 128000, 20647.14),
    ("MONTERREY", 143000, 34449.95),
]

# ---- pedidos de 1 unidad del export, para comparar ----
UNO = [
    ("MONTERIA", 81000, 23461.09), ("TURBO", 85000, 26131.42),
    ("PUERTO COLOMBIA", 81000, 23461.09), ("ZIPAQUIRA", 73000, 13283.83),
    ("MEDELLIN", 81000, 23461.09), ("CHIGORODO", 85000, 26131.42),
    ("BUENAVENTURA", 81000, 23461.09), ("BUENAVENTURA", 81000, 23266.86),
    ("BUENAVENTURA", 81000, 22878.42), ("SINCELEJO", 81000, 23266.86),
    ("SINCELEJO", 83000, 21034.86), ("QUIBDO", 83000, 25334.59),
    ("QUIBDO", 85000, 25481.04), ("PLATO", 85000, 26131.42),
    ("SABANAGRANDE", 85000, 23761.94), ("YUMBO", 85000, 23761.94),
    ("MADRID", 73000, 13283.83), ("BOGOTA", 73000, 13283.83),
    ("TOCANCIPA", 77000, 17237.02), ("MEDELLIN", 81000, 22878.42),
    ("PEREIRA", 85000, 23564.73), ("SAN JOSE DE CUCUTA", 83000, 23416.30),
    ("GALAPA", 85000, 23171.31), ("YOPAL", 77000, 16810.73),
]


def analiza(lote, uds, titulo):
    filas = [(c, (cob - COSTO_UD * uds - f) / uds, f, cob) for c, cob, f in lote]
    prom = sum(m for _, m, _, _ in filas) / len(filas)
    sobre = sum(1 for _, m, _, _ in filas if m >= REF_MARGEN)
    print(f"\n{titulo}   (n={len(filas)})")
    print(f"   margen/unidad PROMEDIO: ${prom:>8,.0f}   = {prom / REF_MARGEN * 100:>3.0f}% de la referencia")
    print(f"   pedidos SOBRE la referencia de $23.244: {sobre} de {len(filas)}")
    print(f"   {'los 6 peores:':<24}{'flete':>11}{'margen/ud':>12}")
    for c, m, f, _ in sorted(filas, key=lambda x: x[1])[:6]:
        print(f"      {c:<21}{f:>11,.0f}{m:>12,.0f}")
    return prom, filas


def main():
    print("=" * 74)
    print("LA FUGA DE LAS 2 UNIDADES — 206 guias del export del 16-sep")
    print("=" * 74)
    p2, f2 = analiza(DOS, 2, "=== PEDIDOS DE 2 UNIDADES ===")
    p1, f1 = analiza(UNO, 1, "=== PEDIDOS DE 1 UNIDAD ===")

    print("\n" + "=" * 74)
    print(f"1 unidad  -> ${p1:>8,.0f} por unidad   ({p1 / REF_MARGEN * 100:.0f}% de la referencia)")
    print(f"2 unidades-> ${p2:>8,.0f} por unidad   ({p2 / REF_MARGEN * 100:.0f}% de la referencia)")
    print(f"\n>>> CADA PEDIDO DE 2 UNIDADES DEJA ${(p1 - p2) * 2:,.0f} MENOS que dos pedidos de 1 <<<")

    # cuanto se cobra de envio en cada caso vs cuanto cuesta
    env2 = sum(cob - 110000 for _, cob, _ in DOS if cob not in (185000,)) / len([1 for _, cob, _ in DOS if cob not in (185000,)])
    fl2 = sum(f for _, cob, f in DOS if cob not in (185000,)) / len([1 for _, cob, f in DOS if cob not in (185000,)])
    env1 = sum(cob - 59900 for _, cob, _ in UNO) / len(UNO)
    fl1 = sum(f for _, _, f in UNO) / len(UNO)
    print("\n--- por que pasa: el envio cobrado no cubre el flete en los de 2 ---")
    print(f"   1 unidad : cobra ${env1:>8,.0f} de envio, el flete cuesta ${fl1:>9,.0f}  -> {env1 - fl1:+9,.0f}")
    print(f"   2 unidades: cobra ${env2:>8,.0f} de envio, el flete cuesta ${fl2:>9,.0f}  -> {env2 - fl2:+9,.0f}")
    print("\n   El tarifario asume que el envio de 2 sale ~1,33x el de 1.")
    print(f"   El dato real dice {fl2 / fl1:.2f}x. Por eso se fuga.")


if __name__ == "__main__":
    main()
