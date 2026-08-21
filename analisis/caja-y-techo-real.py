# -*- coding: utf-8 -*-
"""
¿HASTA DÓNDE SE PUEDE ESCALAR? — con el dato de caja que faltaba (2026-08-21)

El GATE 0 del plan del 19-ago tenía dos candados:
  📦 inventario  → SIGUE SIN MEDIRSE
  💵 días de pago de 99 Envíos → ✅ RESUELTO HOY

Lo que dijo el dueño:
  · 99 Envíos paga CUALQUIER DÍA, retira cuando quiere (no hay ciclo de pago)
  · $2.200.000 disponibles para retirar YA
  · ~$3.000.000 en distribución (despachado, sin cobrar todavía)

Eso importa porque el capital de trabajo amarrado = (días de ciclo) × (salida
diaria). Si el pago fuera a 7 días, el ciclo se alargaba 7 días y la plata
necesaria se multiplicaba. Al ser a demanda, el ciclo es solo el TRÁNSITO.
"""

# --- Estado medido ---
VENTAS_DIA = 12.0            # 24 guías el 19-20 (sección 0-O)
GASTO_DIA = 72553            # export Meta 18-21 (sección 0-M)
CPA = GASTO_DIA / VENTAS_DIA

COSTO_PRODUCTO = 34000
COSTO_EMPAQUE = 1500
MARGEN_UNIDAD = 24400        # a $59.900, con el flete pasado al cliente
RECAUDO_PROMEDIO = 80000     # recaudo típico de 1 unidad (producto + flete)

# --- Lo que aportó el dueño ---
CAJA_DISPONIBLE = 2200000
EN_DISTRIBUCION = 3000000


def separador(t):
    print("\n" + "=" * 80)
    print(t)
    print("=" * 80)


def main():
    separador("1. EL CICLO DE CAJA REAL (deducido de los $3.000.000 en tránsito)")

    valor_despachado_dia = VENTAS_DIA * RECAUDO_PROMEDIO
    dias_ciclo = EN_DISTRIBUCION / valor_despachado_dia
    print(f"  Se despacha por día:        ${valor_despachado_dia:,.0f} de recaudo")
    print(f"  Hay en distribución:        ${EN_DISTRIBUCION:,.0f}")
    print(f"  → DÍAS DE CICLO:            {dias_ciclo:.1f} días")
    print(f"\n  Es coherente con la entrega de 1 a 3 días hábiles. Y como 99 Envíos")
    print(f"  paga a demanda, el ciclo NO se alarga por esperar el pago:")
    print(f"  el único capital amarrado es lo que está viajando.")

    salida_dia = (VENTAS_DIA * (COSTO_PRODUCTO + COSTO_EMPAQUE)) + GASTO_DIA
    capital_necesario = dias_ciclo * salida_dia
    total_liquido = CAJA_DISPONIBLE + EN_DISTRIBUCION

    print(f"\n  Salida de caja por día:     ${salida_dia:,.0f}")
    print(f"    producto+empaque  ${VENTAS_DIA*(COSTO_PRODUCTO+COSTO_EMPAQUE):>10,.0f}")
    print(f"    publicidad        ${GASTO_DIA:>10,.0f}")
    print(f"  Capital de trabajo necesario HOY: ${capital_necesario:,.0f}")
    print(f"  Capital que hay:                  ${total_liquido:,.0f}"
          f"  (${CAJA_DISPONIBLE:,.0f} retirable + ${EN_DISTRIBUCION:,.0f} en tránsito)")
    holgura = total_liquido / capital_necesario
    print(f"  → HOLGURA: {holgura:.1f}× lo que se necesita")

    separador("2. ¿HASTA DÓNDE AGUANTA LA CAJA? (el techo que impone la plata)")
    print(f"  {'PUBLICIDAD/DÍA':>15} {'VENTAS/DÍA':>11} {'SALIDA/DÍA':>12} "
          f"{'CAPITAL NEC.':>13} {'¿ALCANZA?':>11}")
    print("-" * 80)
    # Se asume que el CPA se mantiene. Es optimista, así que abajo se estresa.
    for mult in [1.0, 1.25, 1.58, 2.0, 2.5, 3.0, 4.0]:
        pub = GASTO_DIA * mult
        ventas = pub / CPA
        salida = ventas * (COSTO_PRODUCTO + COSTO_EMPAQUE) + pub
        capital = dias_ciclo * salida
        ok = "✅ sí" if capital <= total_liquido else "🔴 NO"
        marca = "  ← escalón 2 (+58%)" if abs(mult - 1.58) < 0.01 else ""
        print(f"  ${pub:>14,.0f} {ventas:>11.1f} ${salida:>11,.0f} "
              f"${capital:>12,.0f} {ok:>11}{marca}")
    print("-" * 80)

    # Punto exacto donde la caja se vuelve el freno
    # capital = dias_ciclo * (pub/CPA*(prod+emp) + pub) = total_liquido
    factor = dias_ciclo * ((COSTO_PRODUCTO + COSTO_EMPAQUE) / CPA + 1)
    pub_max = total_liquido / factor
    ventas_max = pub_max / CPA
    print(f"\n  🔑 TECHO QUE IMPONE LA CAJA: ${pub_max:,.0f}/día de publicidad")
    print(f"     ({ventas_max:.0f} ventas/día · {pub_max/GASTO_DIA:.1f}× el gasto actual)")

    separador("3. ⚠️ PERO LA CAJA YA NO ES EL FRENO — LO ES EL INVENTARIO")
    print(f"  A {VENTAS_DIA:.0f} ventas/día se consumen ~{VENTAS_DIA*7:.0f} conjuntos por semana.")
    for mult, etiqueta in [(1.58, "escalón 2 (+58%)"), (2.0, "el doble"),
                           (pub_max / GASTO_DIA, "el techo de caja")]:
        ventas = GASTO_DIA * mult / CPA
        print(f"    {etiqueta:22} {ventas:>5.1f} ventas/día → "
              f"{ventas*7:>5.0f} conjuntos/semana · {ventas*30:>5.0f} al mes")
    print(f"""
  🔴 EL INVENTARIO ES EL ÚNICO CANDADO DEL GATE 0 QUE SIGUE CERRADO.
     La caja acaba de dejar de ser un problema: hay {holgura:.1f}× de holgura y el
     techo que impone está en ${pub_max:,.0f}/día, muy por encima de cualquier
     escalón razonable.
     → Escalar sin saber el stock = prender anuncios sin producto que despachar,
       que es peor que no escalar: quema publicidad Y quema clientes.""")

    separador("4. ESTRÉS: ¿Y SI EL CPA SE DETERIORA AL ESCALAR?")
    print("  Escalar suele empeorar el CPA (Meta busca gente menos calificada).")
    print(f"  Equilibrio: el CPA no puede pasar del margen por venta (${MARGEN_UNIDAD:,}).\n")
    print(f"  {'CPA':>10} {'vs HOY':>9} {'COLCHÓN':>9} {'UTILIDAD/DÍA a 19 ventas':>26}")
    print("-" * 80)
    ventas_esc2 = GASTO_DIA * 1.58 / CPA
    for cpa_test in [CPA, 8000, 10000, 12000, 15000, 20000, MARGEN_UNIDAD]:
        colchon = MARGEN_UNIDAD / cpa_test
        util = ventas_esc2 * (MARGEN_UNIDAD - cpa_test)
        estado = "🔴 equilibrio" if cpa_test >= MARGEN_UNIDAD else ""
        print(f"  ${cpa_test:>9,.0f} {cpa_test/CPA:>8.1f}× {colchon:>8.2f}× "
              f"${util:>25,.0f} {estado}")
    print("-" * 80)
    print(f"""
  El CPA puede empeorar {MARGEN_UNIDAD/CPA:.1f}× antes de dejar de ganar plata. Eso es
  muchísimo margen de error: es lo que hace que el escalón 2 sea una apuesta
  barata, incluso si el CPA se degrada.""")

    separador("5. 📌 UN RIESGO NUEVO QUE APARECE CON ESTE DATO")
    print(f"""  Si se puede retirar cuando se quiera, dejar ${CAJA_DISPONIBLE:,.0f} quietos en la
  plataforma es exposición innecesaria: esa plata no rinde nada ahí y depende de
  que 99 Envíos siga operando bien.

  ⚠️ Ya pasó con Heka: se acumularon $2.788.601 y hubo que ir a retirarlos
  (sección 0-G, pendiente #24). Es el mismo patrón repitiéndose.

  → Sugerencia: retirar por rutina (semanal, o cuando pase de ~$1.000.000) en vez
    de cuando se acumula. No cambia la rentabilidad, baja el riesgo de contraparte.""")


if __name__ == "__main__":
    main()
