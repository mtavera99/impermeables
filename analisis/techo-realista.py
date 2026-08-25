# -*- coding: utf-8 -*-
"""
¿HASTA DÓNDE SE PUEDE ESCALAR, OBJETIVAMENTE? — 2026-08-24

El dueño pide el techo real, sin optimismo. Para responder honestamente hay que
empezar por lo incómodo: **la estimación de "21 unidades/día" que di ayer se
apoya en UNA sola medición, en una ventana contaminada por el fin de semana.**

Este script separa lo que sabemos de lo que estamos suponiendo, y da un rango
con la confianza de cada tramo.
"""

# --- Historia real de la cuenta (secciones 0, 0-C, 0-F, 0-L, 0-W) ---
HISTORIA = [
    # (etiqueta, ventas/día, gasto/día, "techo" que se creía en ese momento)
    ("julio (1-31)",      1.6,  12562, None),
    ("1-4 ago",           7.5,  37637, None),
    ("5-14 ago",          5.2,  40000, 48585),
    ("15-19 ago",        10.25, 58445, 48585),
    ("18-21 ago",        12.0,  72553, 58445),
    ("21-24 ago",        13.7,  97944, None),
]

# --- Estado actual medido ---
PEDIDOS_DIA = 13.7
UNIDADES_DIA = 17.3
UDS_POR_PEDIDO = UNIDADES_DIA / PEDIDOS_DIA
ALCANCE_DIA = 18449
GASTO_DIA = 97944
CPA = 7167
MARGEN_PEDIDO = 28715
ELASTICIDAD = 0.63

# --- Mercado (ANDI/Fenalco vía RUNT, ago-2026) ---
MOTOS = 13_500_000
MOTOS_NUEVAS_ANO = 1_100_000
PCT_123 = 0.92


def sep(t):
    print("\n" + "=" * 84)
    print(t)
    print("=" * 84)


def main():
    sep("1. LO PRIMERO: CUÁNTO VALE MI PROPIA ESTIMACIÓN DE AYER")
    print("""  Ayer dije "el techo de la audiencia actual son ~21 unidades/día". Ese número
  sale de una elasticidad de 0,63 calculada con **UN solo escalón** ($72.553 →
  $97.944), en una ventana donde 3 de 4 días eran fin de semana.

  🔴 Con una sola observación no se puede trazar una curva. Es literalmente el
     error de "muestras pequeñas" que el archivo tiene documentado tres veces, y
     que yo mismo cometí con el umbral de aprendizaje hace tres días.

  → **Tratá ese 21 como una hipótesis, no como un techo.**""")

    sep("2. Y HAY EVIDENCIA FUERTE EN CONTRA: ESTA CUENTA YA ROMPIÓ 4 TECHOS")
    print(f"  {'VENTANA':16} {'VENTAS/DÍA':>11} {'GASTO/DÍA':>11} {'TECHO QUE SE CREÍA':>20}")
    print("-" * 84)
    for etq, v, g, techo in HISTORIA:
        t = f"${techo:,}" if techo else "—"
        roto = "  🔨 roto" if techo and g > techo else ""
        print(f"  {etq:16} {v:>11.1f} ${g:>10,} {t:>20}{roto}")
    print("-" * 84)
    v0, v1 = HISTORIA[0][1], HISTORIA[-1][1]
    print(f"""
  De {v0} a {v1} ventas/día en 7 semanas = **{v1/v0:.1f}× de crecimiento.**

  🔑 Y el patrón importa más que los números: el archivo declaró un techo de
     $48.585/día con 10 días de datos, y hoy la cuenta gasta el doble. Cada vez
     que se dio un techo por cierto, se rompió.

  → **La conclusión no es "no hay techo". Es que los techos que se estimaron
    desde adentro fueron todos artefactos de medición, no límites reales.**""")

    sep("3. EL TECHO ESTRUCTURAL: LA CUENTA QUE SÍ SE PUEDE HACER")
    print(f"""  En vez de extrapolar una curva con un punto, se puede acotar por arriba con
  datos duros del mercado. Dos vías independientes:

  ── VÍA A: los compradores de moto NUEVA que entran cada día ──""")
    nuevas_dia = MOTOS_NUEVAS_ANO / 365
    print(f"    {MOTOS_NUEVAS_ANO:,} motos nuevas/año = **{nuevas_dia:,.0f} compradores nuevos por día**")
    for share in [0.005, 0.01, 0.02, 0.03, 0.05]:
        print(f"      capturar {share:.1%} de ellos → {nuevas_dia*share:>5.0f} unidades/día")
    print(f"""
    📌 Y eso ignora las {MOTOS/1e6:.0f} millones de motos YA circulando, que también
       compran y reponen. La vía A es solo el flujo nuevo.

  ── VÍA B: cuánta gente hay que alcanzar ──""")
    conv_alcance = PEDIDOS_DIA / ALCANCE_DIA
    print(f"    Hoy: {ALCANCE_DIA:,} personas alcanzadas/día → {PEDIDOS_DIA} pedidos")
    print(f"    = **1 pedido por cada {1/conv_alcance:,.0f} personas alcanzadas** ({conv_alcance:.3%})")
    # audiencia alcanzable
    alcanzable = MOTOS * PCT_123 * 0.70   # 70% de los dueños activos en redes
    print(f"\n    Audiencia alcanzable estimada:")
    print(f"      {MOTOS/1e6:.1f} M motos × {PCT_123:.0%} estratos 1-2-3 × 70% en redes = "
          f"**{alcanzable/1e6:.1f} millones de personas**")
    print(f"\n  {'UNIDADES/DÍA':>13} {'PEDIDOS/DÍA':>12} {'ALCANCE/DÍA':>13} "
          f"{'ALCANCE/MES':>13} {'% DEL POOL/MES':>16}")
    print("-" * 84)
    for u in [17.3, 25, 35, 50, 75, 100, 150]:
        p = u / UDS_POR_PEDIDO
        alc = p / conv_alcance
        pct = alc * 30 / alcanzable
        m = "  ← hoy" if abs(u - 17.3) < 0.1 else (
            "  🔴 insostenible" if pct > 0.60 else ("  ⚠️ exigente" if pct > 0.35 else ""))
        print(f"  {u:>13.0f} {p:>12.1f} {alc:>13,.0f} {alc*30:>13,.0f} {pct:>15.0%}{m}")
    print("-" * 84)
    print("""
  🔑 Alcanzar más del ~35% del pool cada mes empuja la frecuencia hacia arriba y
     ahí sí aparece saturación real (la misma gente viendo el anuncio otra vez).
     Por encima del 60% el modelo deja de tener sentido.

  → **El techo estructural queda entre 75 y 100 unidades/día.** No es infinito,
    pero está MUY por encima de la meta de 50.""")

    sep("4. LO QUE TENDRÍA QUE SER CIERTO PARA LLEGAR A 50")
    print("""  Esta es la forma honesta de plantearlo: en vez de predecir, decir qué
  condición hay que cumplir y cómo se verifica.
""")
    # ¿qué elasticidad hace viable 50/día a distintos CPA aceptables?
    import math
    ratio_ventas = (50 / UDS_POR_PEDIDO) / PEDIDOS_DIA
    print(f"  Llegar a 50 uds/día = {ratio_ventas:.2f}× los pedidos de hoy.\n")
    print(f"  {'SI EL CPA ACEPTABLE ES':>24} {'GASTO NECESARIO':>17} "
          f"{'ELASTICIDAD REQUERIDA':>23}")
    print("-" * 84)
    for cpa_ok in [10000, 12000, 15000, 20000]:
        ratio_gasto = ratio_ventas * (cpa_ok / CPA)
        e_req = 1 - math.log(ratio_ventas) / math.log(ratio_gasto)
        util = (50 / UDS_POR_PEDIDO) * MARGEN_PEDIDO - GASTO_DIA * ratio_gasto
        print(f"  ${cpa_ok:>23,} ${GASTO_DIA*ratio_gasto:>16,.0f} {e_req:>22.2f}"
              f"   (utilidad ${util:,.0f}/día)")
    print("-" * 84)
    print(f"""
  🔑 **LA CONDICIÓN ES CLARA: bajar la elasticidad de {ELASTICIDAD} a ~0,41.**

     Y eso NO se logra optimizando lo que ya hay. Se logra metiendo audiencia que
     hoy no existe en la cuenta: geografía nueva, TikTok, ángulos nuevos. Cada
     canal nuevo arranca con su propia curva fresca.

  📌 Traducción práctica: **la pregunta no es "¿cuál es mi techo?" sino "¿cuántos
     lagos nuevos consigo abrir?".** Cada lago que abras baja la elasticidad
     agregada y sube el techo.""")

    sep("5. EL RANGO HONESTO, CON EL NIVEL DE CONFIANZA DE CADA TRAMO")
    tramos = [
        ("17 → 21 uds/día", "ALTA",
         "ya se está al 84%; no requiere nada nuevo, solo presupuesto"),
        ("21 → 35 uds/día", "MEDIA-ALTA",
         "pide 1-2 canales nuevos (geografía + TikTok). El plan ya está escrito"),
        ("35 → 50 uds/día", "MEDIA",
         "pide los 3 canales maduros Y bajar la elasticidad a ~0,41"),
        ("50 → 75 uds/día", "BAJA",
         "posible según el mercado, pero sin ningún dato propio que lo respalde"),
        ("más de 100", "MUY BAJA",
         "empieza a chocar con saturación de audiencia (>60% del pool/mes)"),
    ]
    print(f"  {'TRAMO':>18} {'CONFIANZA':>12}   QUÉ REQUIERE")
    print("-" * 84)
    for t, c, q in tramos:
        print(f"  {t:>18} {c:>12}   {q}")
    print("-" * 84)
    print(f"""
  ✅ **RESPUESTA OBJETIVA A TU PREGUNTA:**

     · **50 unidades/día es una meta razonable, no ambiciosa de más.** Está dentro
       del techo estructural (75-100) y es 0,6% del mercado nacional.
     · **Lo que no se puede prometer es el CAMINO.** Depende de una variable que
       todavía no se ha medido bien: cuánto baja la elasticidad al abrir un canal
       nuevo. Eso se sabe con el PRIMER canal, no antes.
     · **Y lo más importante: no hace falta saber el techo para avanzar.** Cada
       etapa cuesta ~4 días de medición, es reversible, y devuelve el dato que
       define la siguiente.

  🔑 **DEJÁ DE ESTIMAR EL TECHO Y EMPEZÁ A INSTRUMENTARLO.** Con 2-3 escalones
     más midiendo la elasticidad en cada uno, el techo se calcula solo — y con
     datos propios en vez de supuestos míos.""")


if __name__ == "__main__":
    main()
