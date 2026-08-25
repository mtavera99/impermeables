# -*- coding: utf-8 -*-
"""
¿SE PUEDEN VENDER 50 UNIDADES DIARIAS? — 2026-08-24

Meta del dueño. La pregunta tiene respuesta con números, y la respuesta corta es
SÍ, pero NO por el camino que uno pensaría. Este script separa cuatro preguntas
que suelen mezclarse:

  1. ¿Alcanza el MERCADO en Colombia?          (sí, y por muchísimo)
  2. ¿Se llega subiendo el PRESUPUESTO?        (no, es matemáticamente imposible)
  3. ¿Qué haría falta de verdad?               (multiplicar la AUDIENCIA ~3x)
  4. ¿Qué se rompe primero en la operación?    (la atención, no la plata)
"""

# --- Estado actual, medido (secciones 0-V y 0-W) ---
UNIDADES_DIA = 17.3
PEDIDOS_DIA = 13.7
UDS_POR_PEDIDO = UNIDADES_DIA / PEDIDOS_DIA
CONV_DIA = 154.4
CIERRE = PEDIDOS_DIA / CONV_DIA
COSTO_CONV = 642.26
GASTO_DIA = 97944
MARGEN_PEDIDO = 28715
UTIL_DIA = 294492
ELASTICIDAD = 0.63
ALCANCE_DIA = (10993 + 46031 + 7363) / 3.49     # personas/día, los 3 conjuntos
EMPAQUE = 1500
DIAS_CICLO = 3.1
CAJA = 5200000

META_UNIDADES = 50

# --- Mercado colombiano (búsqueda web, ago-2026) ---
MOTOS_CIRCULANDO = 13_500_000     # RUNT: ~13 millones, 62-63% del parque
MOTOS_NUEVAS_ANO = 1_100_000      # 2025; 2026 va +30% (787.182 en 7 meses)
PCT_ESTRATOS_123 = 0.92           # de quienes compran moto en Colombia


def sep(t):
    print("\n" + "=" * 84)
    print(t)
    print("=" * 84)


def main():
    pedidos_meta = META_UNIDADES / UDS_POR_PEDIDO
    conv_meta = pedidos_meta / CIERRE

    sep("1. ¿ALCANZA EL MERCADO? — SÍ, Y NO ESTÁ NI CERCA DE SER EL PROBLEMA")
    print(f"""  Datos del mercado colombiano (ANDI/Fenalco vía RUNT, ago-2026):
    · ~{MOTOS_CIRCULANDO/1e6:.0f} millones de motos circulando (62-63% del parque automotor)
    · ~{MOTOS_NUEVAS_ANO/1e6:.1f} millones de motos NUEVAS por año, y 2026 va +30%
      (787.182 matrículas de enero a julio; julio fue récord con 131.936)
    · **{PCT_ESTRATOS_123:.0%} de quienes compran moto viven en estratos 1, 2 y 3**
""")
    # Demanda anual estimada de impermeables
    for pct_usa, ciclo in [(0.40, 3), (0.55, 2.5), (0.70, 2)]:
        demanda_ano = MOTOS_CIRCULANDO * pct_usa / ciclo
        demanda_dia = demanda_ano / 365
        share = META_UNIDADES / demanda_dia
        print(f"  si {pct_usa:.0%} usa impermeable y lo cambia cada {ciclo} años →"
              f" {demanda_dia:,.0f} unidades/día en el país")
        print(f"     vender {META_UNIDADES} = {share:.2%} del mercado nacional")
    print(f"""
  🔑 Vender 50 al día es entre el 0,4% y el 0,7% del mercado nacional.
     **El mercado no es el techo, ni de lejos.** Y el segmento coincide exacto:
     el {PCT_ESTRATOS_123:.0%} de los compradores de moto son estratos 1-2-3, que es justo el
     cliente de un impermeable de $85.000 pagado contraentrega.

  📌 Sobre la competencia: hay tiendas físicas, marketplaces y otros que venden
     por redes. Pero con 0,7% de participación objetivo, **la competencia no es
     lo que te limita** — no estás peleando por un mercado que se agota.""")

    sep("2. ¿SE LLEGA SUBIENDO EL PRESUPUESTO? — NO. Y ES MATEMÁTICO, NO OPINIÓN")
    print(f"  Hoy: {PEDIDOS_DIA} pedidos/día · {UNIDADES_DIA} unidades/día")
    print(f"  Meta: {pedidos_meta:.1f} pedidos/día · {META_UNIDADES} unidades/día "
          f"({pedidos_meta/PEDIDOS_DIA:.1f}× más pedidos)\n")
    # Con la elasticidad medida, cuánto habría que gastar en la MISMA audiencia
    ratio_conv = conv_meta / CONV_DIA
    expo = 1 - ELASTICIDAD
    ratio_gasto = ratio_conv ** (1 / expo)
    gasto_nec = GASTO_DIA * ratio_gasto
    cpa_nec = gasto_nec / pedidos_meta
    print(f"  Conversaciones necesarias: {conv_meta:.0f}/día "
          f"({ratio_conv:.2f}× las {CONV_DIA:.0f} de hoy)")
    print(f"\n  Con la elasticidad medida de {ELASTICIDAD} en la MISMA audiencia:")
    print(f"    gasto necesario   ${gasto_nec:,.0f}/día  ({ratio_gasto:.1f}× el de hoy)")
    print(f"    CPA resultante    ${cpa_nec:,.0f} por pedido")
    print(f"    margen por pedido ${MARGEN_PEDIDO:,}")
    print(f"    → utilidad        ${pedidos_meta*MARGEN_PEDIDO - gasto_nec:,.0f}/día 🔴 PIERDE PLATA")
    print(f"""
  🔴 **IMPOSIBLE POR ESA VÍA.** Para triplicar las ventas en la misma audiencia
     habría que gastar {ratio_gasto:.0f} veces más, y el CPA llegaría a ${cpa_nec:,.0f} contra un
     margen de ${MARGEN_PEDIDO:,}. Perderías ${abs(pedidos_meta*MARGEN_PEDIDO - gasto_nec):,.0f} por día.

  📌 Por eso el techo de la audiencia actual está en ~{16.4*UDS_POR_PEDIDO:.0f} unidades/día
     (el punto de utilidad máxima, ~$178.000/día de pauta). **Casi la mitad de tu
     meta, y ya estás al 84% de ese techo.**""")

    sep("3. ¿QUÉ HARÍA FALTA DE VERDAD? — LA MISMA EFICIENCIA, TRES VECES EL LAGO")
    gasto_meta = conv_meta * COSTO_CONV
    cpa_meta = gasto_meta / pedidos_meta
    util_meta = pedidos_meta * MARGEN_PEDIDO - gasto_meta
    print(f"""  Si consiguieras las {conv_meta:.0f} conversaciones/día MANTENIENDO el costo por
  conversación de hoy (${COSTO_CONV:,.0f}) — o sea con audiencia NUEVA, no más presión
  sobre la misma:

    gasto           ${gasto_meta:,.0f}/día
    CPA por pedido  ${cpa_meta:,.0f}    ✅ igual que hoy (${GASTO_DIA/PEDIDOS_DIA:,.0f})
    UTILIDAD        ${util_meta:,.0f}/día  ≈ ${util_meta*30/1e6:.1f} millones/mes

  Contra los ${UTIL_DIA:,.0f}/día de hoy (${UTIL_DIA*30/1e6:.1f} M/mes) → **{util_meta/UTIL_DIA:.1f}× la utilidad.**

  🔑 ESA ES LA RESPUESTA A TU PREGUNTA: **50 al día es perfectamente posible y
     deja ~${util_meta*30/1e6:.0f} millones al mes. Pero el camino no es más plata en Meta:
     es más LAGOS donde pescar.**

  ¿Cuánta audiencia nueva? Hoy los 3 conjuntos alcanzan ~{ALCANCE_DIA:,.0f} personas/día.""")
    print(f"    para {META_UNIDADES} unidades/día haría falta alcanzar "
          f"~{ALCANCE_DIA*ratio_conv:,.0f} personas/día ({ALCANCE_DIA*ratio_conv*30/1e6:.1f} millones/mes)")
    print(f"    = {ALCANCE_DIA*ratio_conv*30/MOTOS_CIRCULANDO:.1%} de las motos del país por mes → "
          f"exigente pero disponible")

    sep("4. ¿QUÉ SE ROMPE PRIMERO? — NO ES LA PLATA NI EL PRODUCTO")
    salida = pedidos_meta * EMPAQUE + gasto_meta
    capital = DIAS_CICLO * salida
    print(f"  {'RESTRICCIÓN':22} {'HOY':>14} {'A 50 UDS/DÍA':>16} {'¿AGUANTA?':>26}")
    print("-" * 84)
    filas = [
        ("Inventario (uds/mes)", f"{UNIDADES_DIA*30:,.0f}", f"{META_UNIDADES*30:,.0f}",
         "✅ 5.000 en bodega + 1 día"),
        ("Caja de trabajo", f"${DIAS_CICLO*(PEDIDOS_DIA*EMPAQUE+GASTO_DIA):,.0f}",
         f"${capital:,.0f}", f"✅ hay ${CAJA:,.0f}"),
        ("Paquetes/día", f"{PEDIDOS_DIA:.0f}", f"{pedidos_meta:.0f}",
         "⚠️ el récord fue 31 en un lote"),
        ("Conversaciones/día", f"{CONV_DIA:.0f}", f"{conv_meta:.0f}",
         "🔴 3× — NO lo hace una persona"),
        ("Audiencia (personas/día)", f"{ALCANCE_DIA:,.0f}", f"{ALCANCE_DIA*ratio_conv:,.0f}",
         "🔴 3× — hay que abrir canales"),
    ]
    for a, b, c, d in filas:
        print(f"  {a:22} {b:>14} {c:>16} {d:>26}")
    print("-" * 84)
    print(f"""
  🔑 EL ORDEN DE LOS FRENOS SE INVIRTIÓ. Hace un mes eran inventario y caja;
     hoy esos dos sobran de largo. Los dos que faltan son:

     1. 🔴 **AUDIENCIA** — {conv_meta:.0f} conversaciones/día pide 3 lagos nuevos
     2. 🔴 **ATENCIÓN** — {conv_meta:.0f} conversaciones/día NO las atiende una persona,
        ni con la IA de válvula. **Esto es contratar, no optimizar.**

  ⚠️ Y ojo el orden: si se abre audiencia sin resolver atención, el cierre se
     cae y el CPA se dispara. **La atención tiene que ir primero o en paralelo.**""")

    sep("5. EL CAMINO, EN ETAPAS QUE SE PUEDEN MEDIR")
    etapas = [
        ("hoy", 17.3, "—", "Meta, 3 conjuntos, 1 persona + IA"),
        ("etapa 1", 24, "abrir geografía en Meta (#30)", "sigue 1 persona + IA"),
        ("etapa 2", 32, "+ TikTok Ads (plan ya escrito)", "1 ayudante de despacho"),
        ("etapa 3", 42, "+ creativos y ángulos nuevos", "1 persona de atención"),
        ("META", 50, "+ los 3 canales maduros", "equipo de 3-4"),
    ]
    print(f"  {'ETAPA':>9} {'UDS/DÍA':>9} {'PALANCA':>32} {'OPERACIÓN':>28}")
    print("-" * 84)
    for n, u, p, o in etapas:
        print(f"  {n:>9} {u:>9.0f} {p:>32} {o:>28}")
    print("-" * 84)
    print(f"""
  📌 Cada etapa se valida igual que el escalón: se mueve UNA cosa, se esperan
     4 días, y se mira si el CPA por pedido sigue bajo ${MARGEN_PEDIDO*0.42:,.0f}.

  ⚠️ LO QUE NO HAY QUE HACER: perseguir las 50 subiendo presupuesto. El punto 2
     muestra que ese camino termina perdiendo plata mucho antes de llegar.""")


if __name__ == "__main__":
    main()
