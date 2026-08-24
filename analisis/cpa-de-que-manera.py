# -*- coding: utf-8 -*-
"""
¿CUÁL ES EL CPA DE VERDAD? — 2026-08-24

El dueño dice que a él le sale más barato. Muy probablemente tenga razón, porque
el "CPA" no es un número: depende de tres decisiones que no se habían explicitado.

  1. EL DENOMINADOR: ¿pedidos o unidades? Con el share de 2 unidades al 26,8%,
     41 pedidos son 52 unidades. Elegir uno u otro cambia el CPA un 27%.
  2. LA VENTANA DE GASTO: el export de Meta va del 21 al 24, pero el 24 está
     incompleto (~49% del día). Incluirlo o no cambia el gasto un 17%.
  3. 🔴 GUÍAS FALTANTES: el export de 99 Envíos se sacó el 24-ago a la 01:29 de
     la mañana. **Todo lo que se haya despachado el lunes durante el día NO está.**
     Pero el gasto del lunes SÍ está contado. Eso infla el CPA.
"""

GASTO_VENTANA = 346176        # Meta 21-24 ago, los 3 conjuntos
PPTO = {"Motorizados": 15000, "Domiciliarios": 70000, "TEST Creativos": 20000}
GASTO_DOM = 229306
ASIGNADO_DOM_21_23 = 55000 + 70000 * 2   # el 21 corrió a $55.000

GUIAS = 41
UNIDADES = 52
MARGEN_PEDIDO = 28715


def sep(t):
    print("\n" + "=" * 82)
    print(t)
    print("=" * 82)


def main():
    # Cuánto del día 24 alcanzó a gastarse
    parcial = GASTO_DOM - ASIGNADO_DOM_21_23
    frac24 = parcial / PPTO["Domiciliarios"]
    gasto_24 = sum(v * frac24 for v in PPTO.values())
    gasto_21_23 = GASTO_VENTANA - gasto_24

    sep("1. LAS TRES DECISIONES QUE CAMBIAN EL NÚMERO")
    print(f"  Gasto del export completo (21-24):   ${GASTO_VENTANA:,}")
    print(f"  El día 24 iba en {frac24:.0%} → aportó:        ${gasto_24:,.0f}")
    print(f"  Gasto solo del 21 al 23:             ${gasto_21_23:,.0f}")
    print(f"\n  Pedidos (guías) despachados:  {GUIAS}")
    print(f"  Unidades vendidas:            {UNIDADES}   ({UNIDADES/GUIAS:.2f} por pedido)")

    sep("2. LA MATRIZ — TODOS SON 'EL CPA', Y VAN DE $5.668 A $8.443")
    print(f"  {'':34} {'÷ 41 PEDIDOS':>15} {'÷ 52 UNIDADES':>15}")
    print("-" * 82)
    filas = [
        ("gasto 21-24 (incluye el 24 parcial)", GASTO_VENTANA),
        ("gasto 21-23 (solo días completos)", gasto_21_23),
    ]
    for nombre, g in filas:
        print(f"  {nombre:34} ${g/GUIAS:>14,.0f} ${g/UNIDADES:>14,.0f}")
    print("-" * 82)
    print(f"""
  🔑 Son 4 números distintos para la misma realidad, con 49% de diferencia entre
     el más alto y el más bajo. **Yo te reporté el $8.443, que es el peor de los
     cuatro**, y lo llamé "pesimista" sin explicar que el optimista era $5.668.""")

    sep("3. 🔴 Y HAY UN ERROR MÍO MÁS GRAVE QUE LA ELECCIÓN DE MÉTODO")
    print("""  El export de 99 Envíos se generó el 24-ago a las 06:29 UTC, que son la
  01:29 de la mañana en Colombia. La última guía del archivo es de esa hora.

  → Todo lo despachado el lunes 24 DURANTE EL DÍA no está en mis 41 guías.
  → Pero el gasto publicitario del lunes 24 SÍ está en los $346.176.

  **Estoy dividiendo gasto de 3,5 días entre las ventas de 3 días.** Eso infla
  el CPA por construcción, y es un error de método, no una elección conservadora.""")
    print(f"\n  Si el lunes se despacharon guías, el CPA baja así:")
    print(f"  {'GUÍAS DEL LUNES':>17} {'TOTAL':>7} {'CPA (÷ pedidos)':>17} {'CPA (÷ unidades)':>18}")
    print("-" * 82)
    for extra in [0, 5, 10, 15, 20]:
        g = GUIAS + extra
        u = UNIDADES + round(extra * UNIDADES / GUIAS)
        print(f"  {extra:>17} {g:>7} ${GASTO_VENTANA/g:>16,.0f} ${GASTO_VENTANA/u:>17,.0f}")
    print("-" * 82)

    sep("4. ¿CUÁL HAY QUE USAR PARA DECIDIR?")
    margen_unidad = GUIAS * MARGEN_PEDIDO / UNIDADES
    print(f"""  Las dos formas son válidas. Lo que NO se puede es mezclarlas:

    POR PEDIDO      CPA ${GASTO_VENTANA/GUIAS:,.0f}  contra margen de ${MARGEN_PEDIDO:,} por pedido
    POR UNIDAD      CPA ${GASTO_VENTANA/UNIDADES:,.0f}  contra margen de ${margen_unidad:,.0f} por unidad

  Las dos dan la misma utilidad al final:""")
    for nombre, cpa, margen, n in [
        ("por pedido", GASTO_VENTANA / GUIAS, MARGEN_PEDIDO, GUIAS / 3),
        ("por unidad", GASTO_VENTANA / UNIDADES, margen_unidad, UNIDADES / 3),
    ]:
        print(f"    {nombre:12} ({margen-cpa:>8,.0f} de neto) × {n:>5.1f}/día = "
              f"${(margen-cpa)*n:>9,.0f}/día")

    print(f"""
  🔑 PARA DECIDIR SI SUBIR PRESUPUESTO, la correcta es **POR PEDIDO**: un clic
     de publicidad produce un PEDIDO, no una unidad. Si se mide por unidad, el
     CPA "mejora" solo porque la gente compra de a dos — y eso no lo causó la
     publicidad, lo causó el guion.

  ⚠️ PERO ESO NO SALVA MI NÚMERO. El $8.443 sigue estando inflado por el punto 3
     (gasto de 3,5 días contra ventas de 3). El CPA por pedido honesto está entre
     ${gasto_21_23/GUIAS:,.0f} y ${GASTO_VENTANA/GUIAS:,.0f}, y más cerca del piso si el lunes hubo despacho.""")

    sep("5. ¿CAMBIA LA CONCLUSIÓN SOBRE ESCALAR?")
    print("""  No, y vale explicar por qué: la conclusión no venía del NIVEL del CPA sino de
  la ELASTICIDAD, que es un cociente de cambios.

  Elasticidad = (Δ costo por conversación) / (Δ gasto) = 22,2% / 36,7% = 0,61

  Ninguno de los dos términos usa las guías ni las unidades: salen del export de
  Meta (costo por conversación y gasto). **El error del denominador no toca ese
  cálculo.** La curva plana sigue plana.

  📌 Lo que SÍ cambia es el punto de partida: si el CPA real es ~$6.000 y no
     $8.443, hay algo más de recorrido antes del óptimo de lo que dije. Pero el
     retorno marginal de $0,45 por peso en el próximo escalón no se mueve.""")


if __name__ == "__main__":
    main()
