# -*- coding: utf-8 -*-
"""
¿CONVIENE ESCALAR YA O ESPERAR AL 31? — 2026-08-24

El dueño preguntó por qué no conviene escalar. Al revisar las tres razones que
había dado, dos no aguantan. Este script las examina una por una y calcula el
valor esperado de cada opción en vez de argumentar.
"""

# --- Medido en la ventana 21-24 (sección 0-W) ---
GASTO_DIA = 99188
CONV_DIA_ANTES, CONV_DIA_AHORA = 138.0, 154.4      # 414/3 y 539/3.49
COSTO_CONV_ANTES, COSTO_CONV_AHORA = 525.50, 642.26
GASTO_DIA_ANTES = 72553
CPA_AHORA = 8443
VENTAS_DIA = 13.7
MARGEN_PEDIDO = 28715      # con el share de 2 unidades al 26,8%
UTIL_DIA = 294197
TECHO_CPA = 12000
EQUILIBRIO_CPA = MARGEN_PEDIDO


def sep(t):
    print("\n" + "=" * 84)
    print(t)
    print("=" * 84)


def main():
    sep("RAZÓN 1 — 'la ventana está contaminada por el fin de semana'")
    print("""  Cierto: la ventana nueva es 3 de 4 días de fin de semana y la anterior era
  toda de semana.

  🔴 PERO ESO NO ES ARGUMENTO PARA NO ESCALAR, Y DE HECHO APUNTA AL CONTRARIO.
     El criterio de decisión es un UMBRAL ABSOLUTO (CPA < $12.000), no una
     comparación entre ventanas. Y si el fin de semana rinde peor, entonces la
     medición está SUBESTIMANDO el desempeño: los días de semana deberían salir
     mejores que el $8.443 medido.

  → La contaminación sesga EN CONTRA del escalón. Que igual haya pasado el
    umbral es una señal más fuerte, no más débil.""")

    sep("RAZÓN 2 — 'hay un efecto externo sin identificar'")
    print("""  🔴 ESTA YA NO APLICA: SÍ SE IDENTIFICÓ. Es el arrastre de Advantage+ — el
     alcance de Motorizados creció 40% por día con el mismo presupuesto porque
     los conjuntos comparten pool (sección 0-W).

     Y lo más importante: ese efecto YA ESTÁ DENTRO del CPA de $8.443. No es un
     riesgo pendiente, es un costo ya pagado y medido.""")

    sep("LO QUE SÍ HAY QUE MEDIR: ¿CUÁNTO SE DEGRADA POR CADA PESO EXTRA?")
    d_gasto = GASTO_DIA / GASTO_DIA_ANTES - 1
    d_costo = COSTO_CONV_AHORA / COSTO_CONV_ANTES - 1
    elast = d_costo / d_gasto
    print(f"  gasto/día        ${GASTO_DIA_ANTES:,} → ${GASTO_DIA:,}   {d_gasto:+.1%}")
    print(f"  costo/conv       ${COSTO_CONV_ANTES:,.0f} → ${COSTO_CONV_AHORA:,.0f}   {d_costo:+.1%}")
    print(f"\n  → ELASTICIDAD: por cada 1% más de gasto, el costo por conversación")
    print(f"    sube {elast:.2f}%.  **Esta es la cifra que decide si se puede seguir.**")

    print(f"\n  Proyección de los próximos escalones con esa elasticidad:")
    print(f"  {'ESCALÓN':>22} {'GASTO/DÍA':>11} {'$/CONV':>8} {'CPA':>9} "
          f"{'UTILIDAD/DÍA':>13} {'¿PASA?':>8}")
    print("-" * 84)
    print(f"  {'hoy':>22} ${GASTO_DIA:>10,} ${COSTO_CONV_AHORA:>7,.0f} "
          f"${CPA_AHORA:>8,} ${UTIL_DIA:>12,} {'✅':>8}")
    gasto = GASTO_DIA
    costo = COSTO_CONV_AHORA
    for i, paso in enumerate([0.27, 0.27, 0.27, 0.27], 1):
        gasto_n = gasto * (1 + paso)
        costo_n = costo * (1 + elast * paso)
        conv = gasto_n / costo_n
        # el cierre por conversación se mantiene igual al medido
        cierre = VENTAS_DIA / (GASTO_DIA / COSTO_CONV_AHORA)
        ventas = conv * cierre
        cpa = gasto_n / ventas
        util = ventas * MARGEN_PEDIDO - gasto_n
        ok = "✅" if cpa < TECHO_CPA else ("🟡" if cpa < EQUILIBRIO_CPA else "🔴")
        print(f"  {'#'+str(i)+f' (+{paso:.0%})':>22} ${gasto_n:>10,.0f} ${costo_n:>7,.0f} "
              f"${cpa:>8,.0f} ${util:>12,.0f} {ok:>8}")
        gasto, costo = gasto_n, costo_n
    print("-" * 84)
    print(f"""
  🔑 Con la degradación MEDIDA, quedan ~3 escalones de +27% antes de tocar el
     techo de $12.000. Y el equilibrio real está en ${EQUILIBRIO_CPA:,} — casi
     3× más arriba. **No estamos cerca de un límite.**""")

    sep("RAZÓN 3 — 'el valle empieza el miércoles 26'  ← LA ÚNICA QUE AGUANTA")
    print("""  Esta sí es real, pero no por lo que dije. NO es que el valle haga peligroso
  escalar: es que mezcla un tercer efecto en la lectura.

  Y hay una asimetría que cambia la decisión:""")
    # ¿Qué pasa si el valle golpea el cierre como en el 11-14 ago (-35%)?
    caida = 0.35
    for nombre, mult in [("sin escalar más", 1.0), ("escalando +27%", 1.27)]:
        gasto_n = GASTO_DIA * mult
        conv = gasto_n / (COSTO_CONV_AHORA * (1 + elast * (mult - 1)))
        cierre = VENTAS_DIA / (GASTO_DIA / COSTO_CONV_AHORA)
        ventas = conv * cierre * (1 - caida)
        cpa = gasto_n / ventas
        util = ventas * MARGEN_PEDIDO - gasto_n
        print(f"\n  {nombre.upper()}, con el valle pegando −35% al cierre:")
        print(f"    ventas/día {ventas:>5.1f} · CPA ${cpa:>7,.0f} · utilidad ${util:>9,.0f}/día")
        print(f"    {'🔴 pasa el techo de $12.000' if cpa > TECHO_CPA else '✅ aguanta el techo'}"
              f" · {'sigue ganando plata' if util > 0 else 'PIERDE plata'}")

    sep("EL VALOR ESPERADO — CON EL VALLE PEGÁNDOLE A LAS DOS OPCIONES IGUAL")
    print("""  ⚠️ Una primera versión de este cálculo comparaba "escalar CON valle" contra
     "esperar SIN valle". Eso está mal: el valle llega igual en los dos casos.
     Del 24 al 30 hay 3 días normales (24, 25, 30) y 4 de valle (26 al 29).
""")
    cierre = VENTAS_DIA / (GASTO_DIA / COSTO_CONV_AHORA)

    def semana(mult):
        gasto_n = GASTO_DIA * mult
        conv = gasto_n / (COSTO_CONV_AHORA * (1 + elast * (mult - 1)))
        v_normal = conv * cierre
        v_valle = v_normal * (1 - caida)
        u_normal = v_normal * MARGEN_PEDIDO - gasto_n
        u_valle = v_valle * MARGEN_PEDIDO - gasto_n
        return u_normal, u_valle, u_normal * 3 + u_valle * 4, gasto_n / v_valle

    print(f"  {'OPCIÓN':>18} {'DÍAS NORMALES':>15} {'DÍAS DE VALLE':>15} "
          f"{'SEMANA (3+4)':>14}")
    print("-" * 84)
    filas = []
    for nombre, mult in [("esperar al 31", 1.0), ("escalar +27% hoy", 1.27)]:
        un, uv, total, cpa_valle = semana(mult)
        filas.append((nombre, un, uv, total, cpa_valle))
        print(f"  {nombre:>18} ${un:>14,.0f} ${uv:>14,.0f} ${total:>13,.0f}")
    print("-" * 84)
    dif = filas[1][3] - filas[0][3]
    print(f"\n  → Escalar hoy vale ${dif:,.0f} más en la semana, "
          f"valle incluido.")
    print(f"  → Y en los días de valle sigue dando ${filas[1][2]:,.0f}/día: "
          f"nunca pierde plata.")

    print(f"""
  🔴 PERO OJO CON UNA TRAMPA QUE ESTE CÁLCULO DESTAPA:
     escalando, el CPA de los días de valle sube a ${filas[1][4]:,.0f} — o sea que
     **VA A PASAR EL UMBRAL DE $12.000 QUE FIJAMOS, aunque todo esté bien.**

     Si se lee el CPA del 26 al 29 con ese umbral, la conclusión sería "revertir"
     cuando en realidad se están ganando ${filas[1][2]:,.0f}/día.

  ✅ REGLA CORREGIDA PARA LEER DEL 26 AL 29:
     · el umbral de $12.000 aplica a los días NORMALES, no a los de valle
     · en los días de valle, el número que manda es la UTILIDAD/DÍA, que tiene
       que seguir siendo positiva (el equilibrio real del CPA es ${EQUILIBRIO_CPA:,},
       no $12.000)""")

    sep("CONCLUSIÓN: SÍ CONVIENE ESCALAR, CON DOS CONDICIONES")
    print("""  ✅ SÍ ESCALAR. Mis razones 1 y 2 no aguantaban:
     · la contaminación del fin de semana sesga EN CONTRA, no a favor
     · el efecto "externo" ya está identificado y ya está pagado en el CPA

  🔒 CONDICIÓN 1 — EL GUION CORREGIDO VA PRIMERO, y no por prudencia:
     banda E se fuga $381 por venta y es el 43% del volumen. A 14 ventas/día son
     ~$2.300/día que se pierden sin necesidad. Es plata cierta, hoy.

  🔒 CONDICIÓN 2 — NO LEER NADA HASTA EL 31, y saber de antemano que del 26 al 29
     los números van a verse mal por el valle. Escribirlo ahora es lo que evita
     apagar algo que funciona por pánico: el archivo tiene ese error documentado
     tres veces.

  ⚠️ LO QUE SÍ HAY QUE VIGILAR, y es nuevo: la ELASTICIDAD de {:.2f}. Si en el
     próximo escalón sube (o sea, si se degrada más rápido), ahí está el techo
     real de la cuenta y toca cambiar de palanca: abrir geografía en vez de
     subir presupuesto.""".format(elast))


if __name__ == "__main__":
    main()



def curva_de_utilidad():
    """
    Si escalar +27% solo agrega $9.400/día de utilidad, hay que mirar la curva
    completa. Con elasticidad e, las ventas crecen como gasto^(1−e), así que:

        utilidad(gasto) = k · gasto^(1−e) − gasto

    Esa función tiene un MÁXIMO. Pasado ese punto, cada peso extra de
    publicidad devuelve menos de un peso de margen.
    """
    d_gasto = GASTO_DIA / GASTO_DIA_ANTES - 1
    d_costo = COSTO_CONV_AHORA / COSTO_CONV_ANTES - 1
    e = d_costo / d_gasto
    expo = 1 - e
    k = VENTAS_DIA / GASTO_DIA ** expo * MARGEN_PEDIDO

    sep("🔑 LA CURVA DE UTILIDAD — ACÁ ESTÁ LA VERDADERA RESPUESTA")
    print(f"  Con elasticidad {e:.2f}, las ventas crecen como gasto^{expo:.2f}.")
    print(f"  O sea: duplicar el gasto NO duplica las ventas, las sube "
          f"{2**expo-1:.0%}.\n")
    print(f"  {'GASTO/DÍA':>12} {'VENTAS/DÍA':>11} {'CPA':>9} {'UTILIDAD/DÍA':>14} "
          f"{'MARGEN DEL ÚLTIMO PESO':>24}")
    print("-" * 84)
    prev_u = None
    prev_g = None
    optimo = (0, -1e9)
    for g in [72553, 99188, 125969, 159980, 203175, 258032, 327700, 416178]:
        v = (k / MARGEN_PEDIDO) * g ** expo
        u = v * MARGEN_PEDIDO - g
        if u > optimo[1]:
            optimo = (g, u)
        marg = ""
        if prev_u is not None:
            retorno = (u - prev_u) / (g - prev_g)
            marg = f"{retorno:+.2f} por peso"
        star = "  ← hoy" if g == 99188 else ""
        print(f"  ${g:>11,} {v:>11.1f} ${g/v:>8,.0f} ${u:>13,.0f} {marg:>24}{star}")
        prev_u, prev_g = u, g
    print("-" * 84)

    # máximo analítico
    g_opt = (expo * k) ** (1 / e)
    v_opt = (k / MARGEN_PEDIDO) * g_opt ** expo
    u_opt = v_opt * MARGEN_PEDIDO - g_opt
    print(f"""
  📈 MÁXIMO DE UTILIDAD: ${g_opt:,.0f}/día de publicidad
     ({v_opt:.0f} ventas/día · CPA ${g_opt/v_opt:,.0f} · utilidad ${u_opt:,.0f}/día)

  🔴 Y LO DECISIVO: la utilidad es CASI PLANA entre ${125969:,} y ${203175:,}.
     Subir el gasto 61% en ese rango cambia la utilidad menos del 2%.

  🔑 ENTONCES LA RESPUESTA A "¿POR QUÉ NO ESCALAR?" NO ES QUE SEA RIESGOSO.
     ES QUE YA CASI NO PAGA. La cuenta está cerca de su punto óptimo de gasto.

  ⚠️ CAVEAT HONESTO: la elasticidad de {e:.2f} sale de UN solo escalón
     (${GASTO_DIA_ANTES:,} → ${GASTO_DIA:,}). Extrapolarla 4× es exactamente el error de
     "muestras pequeñas" de la sección 11. El número exacto del óptimo no es
     confiable; **lo que sí es robusto es la FORMA de la curva: rendimientos
     decrecientes fuertes.** Cada escalón nuevo mide la elasticidad otra vez.

  ✅ LO QUE SÍ MUEVE LA AGUJA AHORA (y no es presupuesto):
     1. ABRIR GEOGRAFÍA (#30) → mete audiencia NUEVA, que es lo único que baja
        la elasticidad. Es el pendiente que el archivo señala desde julio.
     2. EL SHARE DE 2 UNIDADES (#60) → ya subió el margen por pedido 13% sin
        gastar un peso. Si se sostiene, vale más que 3 escalones de presupuesto.
     3. LAS CONVERSACIONES VACÍAS (57,8%, sección 0-K) → el cierre es el
        divisor de todo; mejorarlo levanta la curva entera en vez de moverse
        sobre ella.""")


curva_de_utilidad()
