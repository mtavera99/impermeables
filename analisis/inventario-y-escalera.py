# -*- coding: utf-8 -*-
"""
EL INVENTARIO NO ES UN FRENO — ES UNA OBLIGACIÓN (2026-08-21)

Datos del dueño, que cierran el GATE 0 completo:
  · 5.000 unidades en bodega
  · el proveedor manda más cantidad avisando el día anterior

Los 3 frenos históricos del negocio quedan los 3 abiertos:
  ⏱️ tiempo     ✅ resuelto (IA de WhatsApp como válvula, sección 5-B)
  💵 caja       ✅ resuelto (99 Envíos paga a demanda, sección 0-Q)
  📦 inventario ✅ resuelto (5.000 unidades + reposición a 1 día)

Pero 5.000 unidades a 12 ventas/día son 14 MESES de stock. El problema deja de
ser "¿alcanza el producto?" y pasa a ser "¿cuánto tarda en venderse esto?".
Y el producto es ESTACIONAL: son impermeables.
"""

UNIDADES_BODEGA = 5000
COSTO_PRODUCTO = 34000
COSTO_EMPAQUE = 1500
MARGEN_UNIDAD = 24400

VENTAS_DIA = 12.0
GASTO_DIA = 72553
CPA = GASTO_DIA / VENTAS_DIA

CAJA_DISPONIBLE = 2200000
EN_DISTRIBUCION = 3000000
DIAS_CICLO = 3.1


def sep(t):
    print("\n" + "=" * 82)
    print(t)
    print("=" * 82)


def main():
    sep("1. LO PRIMERO: 5.000 UNIDADES ES MUCHÍSIMO STOCK")
    valor = UNIDADES_BODEGA * COSTO_PRODUCTO
    print(f"  5.000 unidades × ${COSTO_PRODUCTO:,} de costo = ${valor:,} en inventario")
    print(f"  Caja líquida del negocio:                     "
          f"${CAJA_DISPONIBLE + EN_DISTRIBUCION:,}")
    print(f"  → El inventario vale {valor/(CAJA_DISPONIBLE+EN_DISTRIBUCION):.0f}× la caja líquida.")
    print(f"\n  CUÁNTO TARDA EN VENDERSE, según el ritmo:")
    print(f"  {'VENTAS/DÍA':>11} {'PUBLICIDAD/DÍA':>15} {'DÍAS':>7} {'MESES':>7}")
    print("-" * 82)
    for v in [12, 19, 24, 30, 40, 60, 80]:
        dias = UNIDADES_BODEGA / v
        pub = v * CPA
        marca = "  ← hoy" if v == 12 else ("  ← escalón 2" if v == 19 else "")
        print(f"  {v:>11} ${pub:>14,.0f} {dias:>7.0f} {dias/30:>7.1f}{marca}")
    print("-" * 82)
    print(f"""
  🔑 A 12 VENTAS/DÍA ESE STOCK DURA 14 MESES. Eso no es un colchón, es capital
     dormido: ${valor:,} quietos mientras se venden 360 unidades al mes.
     A 40 ventas/día baja a 4 meses. **La urgencia de escalar acaba de subir
     muchísimo, y por una razón distinta a la de ayer.**""")

    sep("2. ⚠️ EL RIESGO QUE NADIE HA MIRADO: LA ESTACIONALIDAD")
    print("""  Son IMPERMEABLES. La demanda depende de que llueva.
  Colombia tiene régimen bimodal: dos temporadas de lluvia al año, y la fuerte
  en la zona andina va aproximadamente de SEPTIEMBRE a NOVIEMBRE.

  ✅ LA BUENA: estamos entrando a la mejor temporada del año. Escalar AHORA
     agarra la ventana de mayor demanda natural.
  🔴 LA MALA: 14 meses de stock significa cruzar una temporada SECA completa con
     inventario encima. Si el ritmo no sube, buena parte de esas 5.000 unidades
     se va a quedar esperando la lluvia del año siguiente.

  📌 El archivo lleva desde el 12-ago con el clima como hipótesis (C) de la
     sección 0-F y 0-I, marcada "nunca revisada". **Con 5.000 unidades en bodega
     dejó de ser una curiosidad analítica: es la variable que define el plan.**""")

    sep("3. 🚨 EL DATO QUE CONTRADICE LA COMPRA: EL PROVEEDOR REPONE EN 1 DÍA")
    stock_optimo_semana = VENTAS_DIA * 7
    print(f"""  Si el proveedor manda más avisando el día anterior, el stock necesario es de
  días, no de meses. Con 1 día de reposición, tener 1-2 semanas de inventario ya
  es holgado:

    a 12 ventas/día  → 1 semana = {stock_optimo_semana:.0f} unidades (${stock_optimo_semana*COSTO_PRODUCTO:,.0f})
    a 19 ventas/día  → 1 semana = {19*7} unidades (${19*7*COSTO_PRODUCTO:,})
    a 40 ventas/día  → 1 semana = {40*7} unidades (${40*7*COSTO_PRODUCTO:,})

  Contra las 5.000 que hay (${valor:,}).

  ⚠️ Las dos cosas juntas no encajan: si se puede reponer en 1 día, comprar
     5.000 unidades inmovilizó capital que no hacía falta inmovilizar.

  → PREGUNTA QUE IMPORTA, y es hacia adelante: **¿el precio de $34.000 es POR
    COMPRAR EN VOLUMEN?** Si comprar 200 cuesta más por unidad, la compra fue
    racional (se pagó por descuento). Si cuesta lo mismo, la lección para la
    próxima es no volver a hacerlo: **ese capital rinde mucho más en publicidad
    que en una bodega.**""")

    print(f"\n  Para dimensionarlo: ${valor:,} en publicidad, al CPA actual de")
    print(f"  ${CPA:,.0f}, compran {valor/CPA:,.0f} ventas — que a ${MARGEN_UNIDAD:,} de margen")
    print(f"  son ${valor/CPA*MARGEN_UNIDAD:,.0f} de utilidad bruta.")

    sep("4. LA ESCALERA: YA NO HAY NADA QUE LA BLOQUEE")
    print("""  Los 3 frenos están abiertos. El único límite que queda es si Meta puede
  entregar tráfico de calidad a más volumen — y eso solo se sabe subiendo.

  Regla de cada escalón (fijada de antemano, para no improvisar):
    · subir SOLO presupuesto, nada más (una variable a la vez)
    · esperar 3-4 días ANTES de juzgar (puede haber reinicio de aprendizaje)
    · seguir si el CPA por venta despachada queda bajo $12.000
    · Motorizados NO se toca hasta el 29-ago (es el termómetro del valle)
""")
    print(f"  {'ESCALÓN':>8} {'PUBLICIDAD/DÍA':>15} {'VENTAS/DÍA':>11} "
          f"{'CAPITAL NEC.':>13} {'UTILIDAD/DÍA':>13}")
    print("-" * 82)
    pub = GASTO_DIA
    for i in range(6):
        ventas = pub / CPA
        salida = ventas * (COSTO_PRODUCTO + COSTO_EMPAQUE) + pub
        capital = DIAS_CICLO * salida
        util = ventas * MARGEN_UNIDAD - pub
        etiqueta = "hoy" if i == 0 else f"#{i}"
        print(f"  {etiqueta:>8} ${pub:>14,.0f} {ventas:>11.1f} ${capital:>12,.0f} "
              f"${util:>12,.0f}")
        pub *= 1.5
    print("-" * 82)
    print("""
  🔑 LA CAJA SE AUTOFINANCIA. En el escalón 2 la utilidad es ~$348.000/día: en
     3 días genera el ~$1.000.000 extra de capital de trabajo que pide el escalón
     siguiente. **No hay que esperar a tener la plata: el negocio la produce.**
     Por eso el techo de caja de $242.157/día de la sección 0-Q es conservador —
     asume caja congelada, y la caja está creciendo.""")

    sep("5. ENTONCES, ¿QUÉ ES EL FRENO AHORA?")
    print("""  🔴 LA GEOGRAFÍA EN META, y está documentado desde julio.
     La cuenta se topa porque los 3 conjuntos se estorban bajo Advantage+, y
     **bajo Advantage+ la geografía es lo único que diferencia conjuntos de
     verdad** (sección 11 + pendiente #30). Motorizados usa solo el 84% de su
     presupuesto con frecuencia 1,23: audiencia CHICA, no quemada.

  ✅ Y para abrir geografía había UN bloqueo: el guion prometía un envío que no
     existía, así que abrir ciudades nuevas replicaba la fuga a escala
     (pendiente #38). **Eso ya está arreglado en el repo (sección 0-N).**
     ⚠️ Falta pegarlo en la IA de WhatsApp Business (pendiente #43). **Ese paso
     manual es ahora lo que bloquea el crecimiento, no el inventario ni la caja.**

  → ORDEN CORRECTO: (1) pegar el guion nuevo · (2) escalón 2 en Domiciliarios ·
    (3) leer el valle del 26-29 · (4) abrir geografía · (5) ampliar Motorizados.""")


if __name__ == "__main__":
    main()
