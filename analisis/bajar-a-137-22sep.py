# -*- coding: utf-8 -*-
"""
EL DUEÑO PREGUNTA (22-sep): "si el envio vale 37, podemos dejar todo el pedido
por 137, no entiendo los 152.000".

Este script responde tres cosas distintas que se estaban mezclando:

  1. ¿De que esta hecho el $152.000?
  2. ¿Cuanto plata deja cada precio, DE VERDAD (antes y despues de pauta)?
  3. ¿Conviene bajarlo? -> y aca esta el punto: NO es lo mismo bajarlo para
     TODOS que bajarlo para rescatar UNA venta que se esta yendo.

Datos: costo $33.000/ud (0-AE, 8-sep) - margen medido $23.244/ud sobre 39
unidades (0-AX, 14-sep), que es ANTES DE PAUTA - envio real 2 uds banda D
$37.832 (226 guias, export 18-sep).
"""

COSTO_PROD = 33000
ENVIO_2_D = 37832          # banda D (Monteria), 2 unidades, medido
ENVIO_1_D = 26287          # banda D, 1 unidad
META_UD = 23244            # margen meta por unidad, ANTES de pauta
PRECIO_1_D = 83000         # total de 1 unidad en banda D
TOTAL_HOY = 152000

# CPA por venta despachada. El archivo madre registra entre $6.046 y $6.703
# medidos, con un techo de decision de $10.000-12.000. Se usa un rango.
CPA_BAJO = 6703
CPA_TECHO = 12000

# Pedidos de 2 unidades al mes: sale de la correccion del 19-sep, donde
# $12.314 por pedido daban $1.091.682/mes.
PEDIDOS_2_MES = round(1091682 / 12314)

L = "=" * 76
m = lambda n: f"${n:,.0f}".replace(",", ".")

print(L)
print("1. DE QUE ESTA HECHO EL $152.000 (Monteria, 2 conjuntos)")
print(L)
print()
costo_total = 2 * COSTO_PROD + ENVIO_2_D
print(f"  Los 2 conjuntos te cuestan .......... {m(2*COSTO_PROD)}   (2 x {m(COSTO_PROD)})")
print(f"  El envio de los 2 ................... {m(ENVIO_2_D)}")
print(f"  ─────────────────────────────────────────────")
print(f"  TE CUESTA EN TOTAL .................. {m(costo_total)}")
print()
print(f"  Le cobras ........................... {m(TOTAL_HOY)}")
print(f"  TE QUEDAN ........................... {m(TOTAL_HOY - costo_total)}  (los dos)")
print(f"                                        {m((TOTAL_HOY - costo_total)/2)}  cada uno")
print()
print("  🔑 Y de ahi TODAVIA falta pagar la pauta, que no esta en esta cuenta.")
print(f"     Cada venta cuesta entre {m(CPA_BAJO)} y {m(CPA_TECHO)} de publicidad.")
print(f"     Asi que lo que REALMENTE te queda de un pedido de 2 a {m(TOTAL_HOY)} es:")
print(f"       entre {m(TOTAL_HOY - costo_total - CPA_TECHO)} y {m(TOTAL_HOY - costo_total - CPA_BAJO)}")
print()

print(L)
print("2. QUE PASA A $137.000 — Y CON QUE HAY QUE COMPARARLO")
print(L)
print()
print("  La comparacion NO es '137.000 contra no vender'. Casi siempre es")
print("  '137.000 los dos' contra 'que se lleve uno solo a 83.000'.")
print()
print(f"{'escenario':<34}{'te queda':>13}{'por unidad':>13}   contra hoy")
print("-" * 76)
filas = [
    ("2 conjuntos a $152.000 (HOY)", TOTAL_HOY - costo_total, 2),
    ("2 conjuntos a $145.000", 145000 - costo_total, 2),
    ("2 conjuntos a $140.000", 140000 - costo_total, 2),
    ("2 conjuntos a $137.000", 137000 - costo_total, 2),
    ("1 conjunto a $83.000", PRECIO_1_D - COSTO_PROD - ENVIO_1_D, 1),
    ("no vende nada", 0, 1),
]
base = TOTAL_HOY - costo_total
for nombre, queda, uds in filas:
    dif = queda - base
    print(f"{nombre:<34}{m(queda):>13}{m(queda/uds):>13}   {m(dif) if dif else '—':>10}")
print()
uno = PRECIO_1_D - COSTO_PROD - ENVIO_1_D
dos137 = 137000 - costo_total
print(f"  >>> Vender 2 a {m(137000)} deja {m(dos137)}, que es {m(dos137-uno)} MAS que")
print(f"      venderle 1 solo a {m(PRECIO_1_D)} ({m(uno)}).")
print(f"  >>> Entonces SI, {m(137000)} sigue siendo mejor negocio que perder la")
print("      segunda unidad. Tu instinto no esta equivocado.")
print()

print(L)
print("3. ⛔ PERO: BAJARLO PARA TODOS NO ES LO MISMO QUE RESCATAR UNA VENTA")
print(L)
print()
regalo = TOTAL_HOY - 137000
print(f"  Bajar la lista de {m(TOTAL_HOY)} a {m(137000)} son {m(regalo)} menos POR PEDIDO.")
print(f"  Y se los regalas TAMBIEN a todos los que hubieran pagado {m(TOTAL_HOY)}")
print("  sin chistar, que son la mayoria.")
print()
print(f"  Pedidos de 2 unidades al mes (medido): {PEDIDOS_2_MES}")
print()
print(f"{'si bajas la lista a':<24}{'regalo x pedido':>17}{'al mes':>16}{'al año':>16}")
print("-" * 73)
for t in [150000, 148000, 145000, 143000, 140000, 137000]:
    r = TOTAL_HOY - t
    print(f"{m(t):<24}{m(r):>17}{m(r*PEDIDOS_2_MES):>16}{m(r*PEDIDOS_2_MES*12):>16}")
print()
print(f"  🔴 Bajar la lista a {m(137000)} cuesta {m(regalo*PEDIDOS_2_MES)} AL MES.")
print("     Eso es mas de lo que se recupero arreglando el tarifario el 19-sep.")
print()
print("  ✅ LO QUE SI CONVIENE: dejar la lista en 152.000 y darle al bot un")
print("     PRECIO DE RESCATE que pueda usar SOLO cuando el cliente ya dijo que")
print("     esta caro o se esta yendo. Ahi el descuento se paga solo, porque la")
print("     alternativa real es perder la venta o vender una sola unidad.")
print()

print(L)
print("4. LA PROPUESTA CONCRETA")
print(L)
print()
RESCATE = 145000
print(f"  Precio de lista (lo que cotiza siempre) ......... {m(TOTAL_HOY)}")
print(f"  Precio de rescate (solo si se va a caer) ....... {m(RESCATE)}")
print()
q_r = RESCATE - costo_total
print(f"  A {m(RESCATE)} te quedan {m(q_r)} los dos ({m(q_r/2)} cada uno).")
print(f"  Despues de pauta: entre {m(q_r - CPA_TECHO)} y {m(q_r - CPA_BAJO)}.")
print(f"  Sigue siendo {m(q_r - uno)} mas que venderle una sola unidad.")
print()
print(f"  Y el piso absoluto: por debajo de {m(costo_total + uno)} vender DOS deja")
print(f"  menos que vender UNA. Ese es el limite que no se cruza nunca.")
print()
print("  ⚠️ Con una condicion, y es la que hace que esto no se desmadre:")
print("     el descuento lo ofrece el bot SOLO si el cliente ya puso la objecion")
print("     de precio. Nunca de entrada. Si se ofrece de entrada, se convierte en")
print("     la lista nueva y volvemos al regalo de arriba.")
