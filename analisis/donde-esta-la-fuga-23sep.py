# -*- coding: utf-8 -*-
"""
EL DUEÑO PIDIO (23-sep): "escanea ayer y hoy, mira el archivo madre, dime que
puede estar el fallo, optimizalo... que manejemos la mejor tasa de cierre con
buen margen".

Este script cruza lo medido en el archivo madre con lo que paso ayer y dice
donde esta la plata, en orden.

FUENTES (todas medidas, ninguna estimada):
  - archivo madre: share historico de 2 unidades 26,8% (linea 231) y el valor
    del guion por ese gancho: +$44.007/dia = 72% del valor del guion (4486)
  - export de 6.317 conversaciones (21-sep): objeciones reales y vacias
  - cierre del 22-sep: 8 pedidos / 168 conversaciones / share 2 uds = 0%
  - envio real por banda medido sobre 226 guias (export 18-sep)
"""

COSTO = 33000
META_UD = 23244

ENVIO_1 = {"A": 14906, "B": 21038, "C": 25055, "D": 26287, "E": 28697}
ENVIO_2 = {"A": 23947, "B": 32597, "C": 38784, "D": 37832, "E": 45214}
TOTAL_1 = {"A": 73000, "B": 78000, "C": 82000, "D": 83000, "E": 85000}
TOTAL_2 = {"A": 137000, "B": 146000, "C": 152000, "D": 140000, "E": 158000}
NOMBRE = {"A": "Bogota y sabana", "B": "Boyaca/Casanare/Meta", "C": "Capitales grandes",
          "D": "Ciudades intermedias", "E": "Pueblos y zona extendida"}

PEDIDOS_DIA = 8          # medido ayer
SHARE_HIST = 0.268       # archivo madre linea 231
SHARE_AYER = 0.0         # cierre del 22-sep

L = "=" * 78
m = lambda n: f"${n:,.0f}".replace(",", ".")

print(L)
print("1. 🔴 LA FUGA #1: LA SEGUNDA UNIDAD DESAPARECIO")
print(L)
print()
print(f"  Share historico de pedidos de 2 unidades ... {SHARE_HIST*100:.1f}%")
print(f"  Share de ayer .............................. {SHARE_AYER*100:.1f}%")
print()
print("  Y el archivo madre ya midio cuanto vale ese gancho:")
print("    'El guion (share de 2 unidades) -> +$44.007/dia = 72% del valor del guion'")
print()
print("  🔑 O sea: el 72% de lo que aporta el guion se apago ayer.")
print()

print(L)
print("2. POR QUE LA SEGUNDA UNIDAD ES EL MEJOR NEGOCIO QUE TIENE")
print(L)
print()
print("  La segunda unidad NO paga pauta: el cliente ya esta pagado.")
print("  Lo unico que cuesta es el producto y el envio EXTRA (el envio se comparte).")
print()
print(f"{'banda':<24}{'2a ud le cuesta':>17}{'te cuesta':>12}{'te deja':>11}{'vs 1a ud':>11}")
print("-" * 78)
marg2 = {}
for b in "ABCDE":
    precio2a = TOTAL_2[b] - TOTAL_1[b]
    costo2a = COSTO + (ENVIO_2[b] - ENVIO_1[b])
    deja = precio2a - costo2a
    marg2[b] = deja
    marg1 = TOTAL_1[b] - COSTO - ENVIO_1[b]
    dif = deja - marg1
    signo = ("+" if dif >= 0 else "-") + m(abs(dif))
    print(f"{NOMBRE[b]:<24}{m(precio2a):>17}{m(costo2a):>12}{m(deja):>11}{signo:>11}")
print()
print("  >>> En A, B, C y E la segunda unidad deja CASI LO MISMO que la primera,")
print("      sin gastar un peso mas de publicidad. Es la venta mas rentable que hay.")
print()
print(f"  ⚠️ En banda D deja solo {m(marg2['D'])}, la mitad que en las otras, porque")
print(f"     ayer se bajo de $152.000 a $140.000. Vale reconsiderarlo (ver punto 5).")
print()

print(L)
print("3. 🔴 EL ERROR QUE INTRODUJE AYER, Y ES LA CAUSA MAS PROBABLE")
print(L)
print()
print("  El gancho que hizo subir el share de 6,8% a 26,8% (3,9x) fue, textual:")
print('     "pagas UN solo envio — te ahorras como $13.000"')
print()
print("  Ayer, al arreglar el desglose, cambie ese texto del guion por:")
print('     "se ahorra $5.800 en el producto"')
print()
print("  Son DOS errores en uno:")
print("    a) el numero es 2,2x mas chico ($5.800 contra $13.000)")
print("    b) movio el ahorro del ENVIO al PRODUCTO, y el del envio es el que")
print("       el cliente entiende de una: 'pago un solo envio en vez de dos'")
print()
print("  Y el ahorro REAL contra comprar dos sueltos es todavia mayor:")
print()
print(f"{'banda':<24}{'2 sueltos':>12}{'promo':>11}{'ahorro REAL':>14}{'lo que decia':>14}")
print("-" * 78)
for b in "ABCDE":
    dos = 2 * TOTAL_1[b]
    ahorro = dos - TOTAL_2[b]
    producto2 = TOTAL_2[b] - (ENVIO_2[b] // 1000 * 1000)
    ahorro_prod = 2 * 59900 - producto2
    print(f"{NOMBRE[b]:<24}{m(dos):>12}{m(TOTAL_2[b]):>11}{m(ahorro):>14}{m(ahorro_prod):>14}")
print()
print("  >>> Se le estaba diciendo el numero mas chico de los tres posibles.")
print()

print(L)
print("4. CUANTO VALE ARREGLARLO (sin tocar un solo precio)")
print(L)
print()
promedio = sum(marg2[b] for b in "ABCE") / 4
print(f"  Margen de la 2a unidad (promedio A/B/C/E) ... {m(promedio)}")
print(f"  Pedidos por dia (medido ayer) ............... {PEDIDOS_DIA}")
print()
print(f"{'si el share de 2 uds vuelve a':<32}{'2as uds/dia':>13}{'margen extra/dia':>19}{'al mes':>14}")
print("-" * 78)
for sh in [0.05, 0.10, 0.15, 0.20, 0.268, 0.375]:
    n = PEDIDOS_DIA * sh
    extra = n * promedio
    etiqueta = f"{sh*100:.1f}%"
    if abs(sh - 0.268) < 0.001:
        etiqueta += "  (el historico)"
    if abs(sh - 0.375) < 0.001:
        etiqueta += "  (el mejor dia medido)"
    print(f"{etiqueta:<32}{n:>13.1f}{m(extra):>19}{m(extra*30):>14}")
print()
print("  🔑 Volver al 26,8% son ~$47.000/dia = ~$1.400.000/mes. Y cuadra con el")
print("     +$44.007/dia que el archivo madre ya habia medido por ese mismo gancho.")
print("     No cuesta margen: es cambiar lo que el bot DICE.")
print()

print(L)
print("5. LO QUE NO HAY QUE HACER: BAJAR PRECIOS A CIEGAS")
print(L)
print()
print("  El dueño pregunto si apretar mas los envios para vender mas. Los numeros")
print("  dicen que ahi NO esta la fuga:")
print()
print("    · precio es solo el 8,1% de lo que pregunta la gente (export 6.317 chats)")
print("    · talla (17,8%) + color (10,3%) = 28,1%, o sea 3,5x el precio")
print()
print("  Y cada $1.000 de rebaja general cuesta, con 8 pedidos/dia:")
print(f"       {m(1000*PEDIDOS_DIA)}/dia = {m(1000*PEDIDOS_DIA*30)}/mes")
print()
print("  Para que una rebaja de $5.000 se pague sola, el cierre tiene que subir:")
for rebaja in [3000, 5000, 8000]:
    # margen promedio por pedido de 1 ud
    marg_prom = sum(TOTAL_1[b] - COSTO - ENVIO_1[b] for b in "ABCDE") / 5
    nuevo = marg_prom - rebaja
    lift = (marg_prom / nuevo - 1) * 100
    print(f"    rebaja de {m(rebaja)} -> el cierre tiene que subir {lift:.1f}% para empatar")
print()
print("  >>> Subir el cierre 20-30% con precio es dificil. Subir el share de 2")
print("      unidades ya se hizo una vez y se midio: 3,9x. Ahi esta la palanca.")
print()

print(L)
print("6. EL ORDEN EN QUE YO LO HARIA")
print(L)
print()
acciones = [
    ("1", "Arreglar el gancho de 2 unidades en el guion", "~$47.000/dia", "codigo, hoy"),
    ("2", "Poner talla y colores EN EL ANUNCIO", "28,1% de las dudas", "Meta, gratis"),
    ("3", "Recargar Meta Ads antes del mediodia", "evita perder 18-23h", "urgente hoy"),
    ("4", "Reconsiderar banda D: $140.000 -> $145.000", f"+{m(2500)}/pedido de 2", "decision"),
    ("5", "Cargar las ciudades que caen al default E", "$2.000-3.000 de sobreprecio", "medir primero"),
]
print(f"{'#':<3}{'que':<46}{'vale':<22}{'donde'}")
print("-" * 78)
for n, q, v, d in acciones:
    print(f"{n:<3}{q:<46}{v:<22}{d}")
print()
print("  ⛔ Lo que NO haria: una rebaja general de precios. La fuga medida no")
print("     esta en el precio, y una rebaja se la regala tambien a los que")
print("     compran sin chistar.")
