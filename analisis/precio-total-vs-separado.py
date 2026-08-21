# -*- coding: utf-8 -*-
"""
¿DECIR "$59.900 + ENVÍO" O "$81.000 TODO INCLUIDO"? — 2026-08-21

Pregunta del dueño. No es de gusto: las dos formas mueven dos cosas distintas
en direcciones opuestas, y se puede calcular dónde está el punto de equilibrio.

  · Precio SEPARADO ($59.900 + envío) → ancla más baja → más gente sigue la
    conversación, pero la sorpresa del total pasa EN LA PUERTA → más rechazo.
  · Precio TOTAL ($81.000 al recibir) → la sorpresa pasa EN EL CHAT → se cae
    gente antes, pero la que sigue ya aceptó el número real → menos rechazo.

La pregunta real: ¿cuánto tiene que subir el cierre para pagar el rechazo extra?
"""

# --- Datos medidos del negocio ---
PRECIO = 59900
MARGEN_UNIDAD = 24400          # a $59.900, con el flete pasado al cliente
CPA = 6046                     # por venta despachada (sección 0-O)
EMPAQUE = 1500
PRIMA_SEGURO = 2500            # promedio de las primas vistas ($1.742-$3.111)
RECHAZO_BASE = 0.153           # sección 0-E, auditado con el historial Heka
CIERRE_BASE = 0.094            # sección 0-L


def sep(t):
    print("\n" + "=" * 80)
    print(t)
    print("=" * 80)


def costo_rechazo():
    """
    Lo que cuesta UNA devolución hoy. Cambió mucho y casi nadie lo ha notado.
    """
    return PRIMA_SEGURO + EMPAQUE


def ev_por_venta_cerrada(rechazo):
    """Valor esperado de una venta CERRADA, ya descontado el CPA."""
    entregada = MARGEN_UNIDAD - CPA
    devuelta = -(costo_rechazo() + CPA)   # el CPA se gastó igual
    return (1 - rechazo) * entregada + rechazo * devuelta


def main():
    sep("1. EL DATO QUE CAMBIA EL CÁLCULO: UNA DEVOLUCIÓN YA CASI NO CUESTA")
    print(f"""  Con el Seguro 99 (confirmado con datos, sección 0-L), en una devolución
  se paga SOLO LA PRIMA: el flete de ida Y vuelta queda cubierto completo.
  Y como el producto está EN CONSIGNACIÓN, el conjunto devuelto vuelve al stock
  sin pérdida.

  Costo real de una devolución hoy:
    prima del seguro     ${PRIMA_SEGURO:>8,}
    empaque perdido      ${EMPAQUE:>8,}
    producto             ${0:>8,}  (vuelve al stock, es consignación)
    flete ida y vuelta   ${0:>8,}  (lo cubre el seguro)
    ─────────────────────────────
    TOTAL                ${costo_rechazo():>8,}

  🔑 ANTES una devolución costaba ~$25.900 (producto + flete perdidos). Hoy
     cuesta ${costo_rechazo():,}. **Es 10 veces más barata.**
     Eso inclina la respuesta, porque el rechazo dejó de ser el enemigo.""")

    sep("2. CUÁNTO VALE UNA VENTA CERRADA SEGÚN EL RECHAZO")
    print(f"  {'RECHAZO':>9} {'VALOR ESPERADO POR VENTA CERRADA':>34} {'vs BASE':>10}")
    print("-" * 80)
    base = ev_por_venta_cerrada(RECHAZO_BASE)
    for r in [0.10, RECHAZO_BASE, 0.20, 0.25, 0.30, 0.40]:
        ev = ev_por_venta_cerrada(r)
        marca = "  ← hoy" if abs(r - RECHAZO_BASE) < 1e-9 else ""
        print(f"  {r:>8.1%} ${ev:>33,.0f} {ev/base-1:>9.1%}{marca}")
    print("-" * 80)
    print(f"""
  Perder ventas cuesta MUCHO más que que te las devuelvan: cada venta cerrada
  vale ${base:,.0f}, y subir el rechazo del 15,3% al 25% solo le quita
  {1-ev_por_venta_cerrada(0.25)/base:.1%}.""")

    sep("3. EL PUNTO DE EQUILIBRIO: ¿CUÁNTO CIERRE HAY QUE GANAR?")
    print(f"""  Si el precio SEPARADO sube el rechazo (porque la sorpresa pasa en la puerta),
  ¿cuánto tiene que subir el cierre para que valga la pena?

  Utilidad por conversación = cierre × valor esperado por venta cerrada
""")
    print(f"  {'SI EL RECHAZO SUBE A':>21} {'EL CIERRE DEBE SUBIR AL MENOS':>32} {'O SEA, DE 9,4% A':>18}")
    print("-" * 80)
    for r in [0.18, 0.20, 0.25, 0.30, 0.40]:
        ev = ev_por_venta_cerrada(r)
        factor = base / ev
        print(f"  {r:>20.1%} {factor-1:>31.1%} {CIERRE_BASE*factor:>17.1%}")
    print("-" * 80)
    print("""
  🔑 SON UMBRALES BAJOS. Si mostrar $59.900 en vez de $81.000 hace que el cierre
     suba del 9,4% a apenas el 10,4%, ya paga un rechazo del 20%.
     → El precio separado tiene la matemática a favor. Pero ver el punto 4.""")

    sep("4. ⚠️ EL PROBLEMA QUE NO ESTÁ EN ESTA CUENTA, Y ES EL DECISIVO")
    print(f"""  Los números de arriba tratan el rechazo como un costo de ${costo_rechazo():,}. Pero
  una devolución cuesta tres cosas que no aparecen en ninguna planilla:

  1. 🔴 TU TIEMPO. Cada novedad son llamadas, seguimiento, gestión. El archivo
     tiene AHORA MISMO 17 guías trabadas y 7 que estuvieron 10 días sin resolver.
     **El cuello de botella histórico de este negocio ha sido tu tiempo**, no la
     plata. Un modelo que genera más devoluciones te consume justo el recurso más
     escaso.

  2. 🔴 EL FLETE ABSORBIDO. Esta es la trampa medida: la sección 0-H probó que se
     absorbían $3.900-4.900 por venta en destinos caros. ¿Por qué? Porque el guion
     había prometido un envío barato y **al llegar el momento nadie quiere romper
     la promesa**. El precio separado CREA esa promesa. El total no la crea.

  3. 🔴 LA OBJECIÓN "¿POR QUÉ PAGO ENVÍO?" está documentada en la sección 7 como
     objeción recurrente. **Esa objeción solo existe si separás el precio.**

  📌 Y hay un dato duro que apunta al mismo lado: la sección 0-J analizó 47 chats
     y encontró que la conversación se decide en COLOR (77%) y TALLA (64%),
     no en precio. **El precio no es donde se gana la venta, así que simplificarlo
     libera la conversación para lo que sí importa.**""")

    sep("5. RECOMENDACIÓN: NO ES BINARIO — DECIR LOS DOS, EN ESTE ORDEN")
    flete_cali = 21100
    print(f"""  El error de la pregunta es asumir que hay que elegir. La mejor versión usa
  los dos números en una sola frase, y CIERRA en el total:

    ✅ "El conjunto es ${PRECIO:,} y el envío a Cali son ${flete_cali:,},
        así que te llega a $81.000 al recibir, todo incluido 📦"

  Por qué esta forma gana a las dos puras:
    · Respeta el ancla del anuncio (que dice ${PRECIO:,}) → no se siente engaño
    · Muestra la cuenta → transparencia, no hay sorpresa en la puerta
    · Termina en el número que el cliente va a pagar de verdad → cero ambigüedad
    · Y de paso justifica por qué varía: "el envío depende de tu ciudad"

  ⚠️ LO QUE SÍ HAY QUE EVITAR SIEMPRE, y es lo que estaba roto:
     decir un RANGO ("el envío es de $15.000 a $20.000") antes de saber la ciudad.
     Eso no es una forma de presentar el precio, es una promesa que no se puede
     cumplir, y es la causa medida de la fuga de flete.

  📌 CÓMO SALIR DE LA DUDA DE VERDAD (barato, 1 semana):
     El pendiente #39 ya propone poner un texto de apertura DISTINTO por anuncio.
     Con eso se puede correr el test real: una semana con total, una con separado,
     y comparar cierre Y rechazo. **Es la única forma de saberlo con este negocio
     y no con teoría.**""")


if __name__ == "__main__":
    main()
