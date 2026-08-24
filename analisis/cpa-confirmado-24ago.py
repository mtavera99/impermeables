# -*- coding: utf-8 -*-
"""
CPA CONFIRMADO CON LOS DATOS DEL DUEÑO — 2026-08-24

El dueño trajo el gasto real de los 3 días completos (21, 22 y 23):
  gasto publicitario  $293.831
  guías               41  (por pedido, no por unidad)

Eso resuelve la discusión del CPA y de paso valida el método: mi estimación del
gasto de esos 3 días era $294.717, o sea que me pasé por $886 (0,3%). El
problema NO fue el cálculo del gasto sino que REPORTÉ EL NÚMERO EQUIVOCADO:
lideré con el $8.443, que mete el gasto del lunes 24 contra ventas que todavía
no estaban despachadas.
"""

# --- Confirmado por el dueño ---
GASTO_3DIAS = 293831
GUIAS = 41
DIAS = 3

# --- Medido en los exports ---
UNIDADES = 52
COSTO_CONV_ANTES, COSTO_CONV_AHORA = 525.50, 642.26
GASTO_DIA_ANTES = 72553
VENTAS_DIA_ANTES = 12.0
MARGEN_1UD, MARGEN_2UD = 24400, 40500
SHARE_2UD_ANTES, SHARE_2UD_AHORA = 0.068, 0.268
TECHO_CPA = 12000

# Lo que yo había estimado, para dejar el contraste
MI_ESTIMACION_GASTO = 294717
MI_CPA_REPORTADO = 8443


def sep(t):
    print("\n" + "=" * 82)
    print(t)
    print("=" * 82)


def main():
    cpa = GASTO_3DIAS / GUIAS
    gasto_dia = GASTO_3DIAS / DIAS
    ventas_dia = GUIAS / DIAS
    margen_ped = (1 - SHARE_2UD_AHORA) * MARGEN_1UD + SHARE_2UD_AHORA * MARGEN_2UD
    margen_ped_antes = (1 - SHARE_2UD_ANTES) * MARGEN_1UD + SHARE_2UD_ANTES * MARGEN_2UD
    util = ventas_dia * margen_ped - gasto_dia
    util_antes = VENTAS_DIA_ANTES * margen_ped_antes - GASTO_DIA_ANTES

    sep("1. EL NÚMERO, CERRADO")
    print(f"  Gasto publicitario 21-23   ${GASTO_3DIAS:,}")
    print(f"  Guías (pedidos)                  {GUIAS}")
    print(f"  ─────────────────────────────────────────")
    print(f"  🔒 CPA POR PEDIDO          ${cpa:,.0f}")
    print(f"     techo fijado            ${TECHO_CPA:,}   → {cpa/TECHO_CPA-1:+.0%} bajo el techo")
    print(f"\n  Contraste con lo que yo reporté:")
    print(f"    mi estimación del gasto  ${MI_ESTIMACION_GASTO:,}  "
          f"(me pasé ${MI_ESTIMACION_GASTO-GASTO_3DIAS:,}, {MI_ESTIMACION_GASTO/GASTO_3DIAS-1:+.1%})")
    print(f"    el CPA que reporté       ${MI_CPA_REPORTADO:,}  "
          f"({MI_CPA_REPORTADO/cpa-1:+.0%} sobre el real)")
    print(f"""
  🔑 La estimación del GASTO estaba bien (0,3% de error). El problema fue de
     REPORTE: lideré con el $8.443, que divide gasto de 3,5 días entre ventas de
     3 días. El número correcto siempre estuvo en la tabla, pero como
     "alternativa ajustada" en vez de como el principal.""")

    sep("2. LA FOTO REAL DEL ESCALÓN")
    print(f"  {'':26} {'ANTES':>12} {'AHORA':>12} {'CAMBIO':>9}")
    print("-" * 82)
    lineas = [
        ("gasto/día", GASTO_DIA_ANTES, gasto_dia, "money"),
        ("ventas/día (pedidos)", VENTAS_DIA_ANTES, ventas_dia, "num"),
        ("unidades/día", VENTAS_DIA_ANTES * 1.07, UNIDADES / DIAS, "num"),
        ("CPA por pedido", GASTO_DIA_ANTES / VENTAS_DIA_ANTES, cpa, "money"),
        ("margen por pedido", margen_ped_antes, margen_ped, "money"),
        ("UTILIDAD/DÍA", util_antes, util, "money"),
    ]
    for nombre, a, b, tipo in lineas:
        if tipo == "money":
            print(f"  {nombre:26} ${a:>11,.0f} ${b:>11,.0f} {b/a-1:>+8.1%}")
        else:
            print(f"  {nombre:26} {a:>12.1f} {b:>12.1f} {b/a-1:>+8.1%}")
    print("-" * 82)
    print(f"""
  ✅ El escalón sumó ${util-util_antes:,.0f}/día ({util/util_antes-1:+.0%}).
  🔑 Y ojo el desglose: el CPA por pedido EMPEORÓ {cpa/(GASTO_DIA_ANTES/VENTAS_DIA_ANTES)-1:+.0%}, pero el margen por
     pedido MEJORÓ {margen_ped/margen_ped_antes-1:+.0%} gracias al share de 2 unidades. **Lo segundo
     compensó lo primero.** Sin el cambio del guion, este escalón habría dado
     mucho menos.""")

    # ¿cuánto habría dado el escalón sin el efecto del guion?
    util_sin_guion = ventas_dia * margen_ped_antes - gasto_dia
    print(f"     Escalón SIN el share nuevo: ${util_sin_guion:,.0f}/día "
          f"(solo {util_sin_guion-util_antes:+,.0f} vs antes)")
    print(f"     Escalón CON el share nuevo: ${util:,.0f}/día "
          f"({util-util_antes:+,.0f})")
    aporte_guion = util - util_sin_guion
    print(f"     → **${aporte_guion:,.0f}/día de los ${util-util_antes:,.0f} los puso el GUION, "
          f"no el presupuesto** ({aporte_guion/(util-util_antes):.0%}).")

    sep("3. ¿SE MUEVE LA CURVA CON EL GASTO CORRECTO?")
    d_gasto = gasto_dia / GASTO_DIA_ANTES - 1
    d_costo = COSTO_CONV_AHORA / COSTO_CONV_ANTES - 1
    elast = d_costo / d_gasto
    print(f"  gasto/día    ${GASTO_DIA_ANTES:,} → ${gasto_dia:,.0f}   {d_gasto:+.1%}")
    print(f"  costo/conv   ${COSTO_CONV_ANTES:,.0f} → ${COSTO_CONV_AHORA:,.0f}   {d_costo:+.1%}")
    print(f"\n  ELASTICIDAD: {elast:.2f}   (antes había calculado 0,61)")
    print(f"  → apenas se mueve, porque el costo por conversación es un cociente")
    print(f"    dentro de la misma ventana y no depende de las guías.\n")

    expo = 1 - elast
    k = ventas_dia / gasto_dia ** expo
    print(f"  {'GASTO/DÍA':>12} {'VENTAS/DÍA':>11} {'CPA':>9} {'UTILIDAD/DÍA':>14} "
          f"{'EL ÚLTIMO PESO':>16}")
    print("-" * 82)
    prev = None
    for g in [72553, int(gasto_dia), 125000, 160000, 200000, 250000]:
        v = k * g ** expo
        u = v * margen_ped - g
        marg = f"{(u-prev[1])/(g-prev[0]):+.2f}" if prev else ""
        star = "  ← hoy" if g == int(gasto_dia) else ""
        print(f"  ${g:>11,} {v:>11.1f} ${g/v:>8,.0f} ${u:>13,.0f} {marg:>16}{star}")
        prev = (g, u)
    print("-" * 82)
    g_opt = (expo * k * margen_ped) ** (1 / elast)
    v_opt = k * g_opt ** expo
    print(f"""
  📈 Óptimo en ${g_opt:,.0f}/día (antes calculé $208.000).
  🔴 LA CONCLUSIÓN NO CAMBIA: el retorno marginal ya viene cayendo y la curva
     se aplana. Subir presupuesto sigue siendo la palanca más floja de las tres.""")


if __name__ == "__main__":
    main()
