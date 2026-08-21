# -*- coding: utf-8 -*-
"""
EL INVENTARIO NO ES NI FRENO NI OBLIGACIÓN: ESTÁ EN CONSIGNACIÓN (2026-08-21)

Datos del dueño, que cierran el GATE 0 completo:
  · 5.000 unidades en bodega, EN CONSIGNACIÓN
  · el proveedor manda más cantidad avisando el día anterior

⚠️ ESTE SCRIPT SE ESCRIBIÓ PRIMERO ASUMIENDO QUE EL INVENTARIO ESTABA COMPRADO,
y sobre ese supuesto calculó $170.000.000 de capital dormido y una urgencia de
rotación. El dueño aclaró que es CONSIGNACIÓN. Se retira esa conclusión:
no hay capital inmovilizado, no hay urgencia financiera, y el riesgo de
estacionalidad deja de ser un riesgo de balance.
Queda escrito para no volver a razonar sobre un supuesto sin confirmarlo.

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
    sep("1. EN CONSIGNACIÓN: EL STOCK NO CUESTA NADA TENERLO")
    valor = UNIDADES_BODEGA * COSTO_PRODUCTO
    print(f"""  5.000 unidades × ${COSTO_PRODUCTO:,} = ${valor:,} de mercancía en bodega
  que NO está pagada. El proveedor la financia.

  ✅ ENTONCES SE CAE LA PREOCUPACIÓN QUE HABÍA PLANTEADO:
     · NO hay ${valor:,} de capital dormido
     · NO hay urgencia financiera por rotar el inventario
     · NO hay riesgo de obsolescencia ni de temporada en el balance propio
     · Y la "contradicción" de comprar 5.000 teniendo reposición a 1 día
       desaparece: no se compraron, se recibieron.

  🔑 LO QUE SÍ SIGNIFICA: las 5.000 unidades son una OPCIÓN GRATIS. Se puede
     crecer 10× sin poner un peso de producto por adelantado. Es la mejor
     posición posible para escalar.

  📌 Queda una sola cosa por confirmar, y define cuánta caja hace falta:
     ¿el pago al proveedor es al DESPACHAR o después de COBRAR?
     Abajo se calculan los dos escenarios.

  Cuánto tarda en venderse el stock, según el ritmo (ya no es un riesgo,
  pero sirve para saber cuándo hay que pedir reposición):""")
    print(f"  {'VENTAS/DÍA':>11} {'PUBLICIDAD/DÍA':>15} {'DÍAS':>7} {'MESES':>7}")
    print("-" * 82)
    for v in [12, 19, 24, 30, 40, 60, 80]:
        dias = UNIDADES_BODEGA / v
        pub = v * CPA
        marca = "  ← hoy" if v == 12 else ("  ← escalón 2" if v == 19 else "")
        print(f"  {v:>11} ${pub:>14,.0f} {dias:>7.0f} {dias/30:>7.1f}{marca}")
    print("-" * 82)
    print(f"""
  📌 A 12 ventas/día el stock alcanza para ~14 meses. En consignación eso no es
     un problema: es margen de maniobra. Y con reposición a 1 día de aviso,
     tampoco hay que vigilarlo de cerca.""")

    sep("2. LA CAJA EN CONSIGNACIÓN: EL REQUERIMIENTO SE DERRUMBA")
    print(f"""  Si el producto no se paga por adelantado, la salida diaria de caja cambia
  por completo. Los dos escenarios posibles:

  ESCENARIO A — se le paga al proveedor AL DESPACHAR
    salida/día = producto + empaque + publicidad""")
    salida_a = VENTAS_DIA * (COSTO_PRODUCTO + COSTO_EMPAQUE) + GASTO_DIA
    cap_a = DIAS_CICLO * salida_a
    print(f"    = ${salida_a:,.0f}/día  →  capital necesario ${cap_a:,.0f}")

    print(f"""
  ESCENARIO B — se le paga DESPUÉS DE COBRAR (consignación pura)
    salida/día = empaque + publicidad (el producto se paga con lo cobrado)""")
    salida_b = VENTAS_DIA * COSTO_EMPAQUE + GASTO_DIA
    cap_b = DIAS_CICLO * salida_b
    print(f"    = ${salida_b:,.0f}/día  →  capital necesario ${cap_b:,.0f}")

    liquido = CAJA_DISPONIBLE + EN_DISTRIBUCION
    print(f"""
  Capital disponible: ${liquido:,}
    holgura escenario A: {liquido/cap_a:>5.1f}×
    holgura escenario B: {liquido/cap_b:>5.1f}×

  🔑 EN LOS DOS CASOS LA CAJA DEJA DE SER UNA RESTRICCIÓN PRÁCTICA. En el
     escenario B es {liquido/cap_b:.0f}× lo necesario: el negocio podría multiplicar el volumen
     varias veces sin que la plata sea el problema.""")

    # Techo de caja en cada escenario
    print(f"\n  {'ESCENARIO':>12} {'TECHO DE PUBLICIDAD/DÍA':>26} {'VENTAS/DÍA':>12}")
    print("-" * 82)
    for nombre, costo_var in [("A (al despachar)", COSTO_PRODUCTO + COSTO_EMPAQUE),
                              ("B (al cobrar)", COSTO_EMPAQUE)]:
        factor = DIAS_CICLO * (costo_var / CPA + 1)
        pub_max = liquido / factor
        print(f"  {nombre:>12} ${pub_max:>25,.0f} {pub_max/CPA:>12.0f}")
    print("-" * 82)

    sep("3. LA ESTACIONALIDAD BAJA DE CATEGORÍA (pero no desaparece)")
    print("""  Son impermeables y la temporada fuerte de lluvia en la zona andina va
  aproximadamente de SEPTIEMBRE a NOVIEMBRE.

  ✅ YA NO ES UN RIESGO DE BALANCE. En consignación, si la temporada se acaba con
     stock encima, el producto no es plata propia parada: es del proveedor.

  ✅ SIGUE SIENDO UNA OPORTUNIDAD DE TIMING, Y ES FUERTE: se está entrando a la
     mejor ventana de demanda del año. Escalar ahora la aprovecha; escalar en
     enero pelea contra el clima.

  📌 El clima sigue siendo la hipótesis (C) de las secciones 0-F y 0-I, nunca
     revisada. Vale mirarla, pero como palanca de crecimiento (¿cuándo pisar el
     acelerador?), no como riesgo de inventario.""")

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
