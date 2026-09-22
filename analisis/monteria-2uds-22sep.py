# -*- coding: utf-8 -*-
"""
EL DUEÑO REPORTO (22-sep): a un cliente de Monteria el bot le cobro un envio de
$42.000 por 2 unidades, cuando la plataforma de 99 Envios cobra ~$37.000.
El cliente se espanto y la venta se perdio.

Este script comprueba si tiene razon y calcula que hacer, separando DOS cosas
que se estaban mezclando:

  1. COMO SE PRESENTA el precio  -> se puede arreglar GRATIS, sin tocar margen
  2. CUANTO SE COBRA             -> bajarlo cuesta margen, y es decision suya

Datos: los mismos de verificar-guion-definitivo-19sep.py, medidos sobre las 226
guias del export del 18-sep.
"""

COSTO_PROD = 33000
META = 23244
PRECIO_PROD_CLIENTE = 59900
PROMO_2_PRODUCTO = 110000          # lo que el bot dice que cuestan los 2 conjuntos

# envio REAL (flete + seguro) medido, por banda
ENVIO_1 = {"A": 14906, "B": 21038, "C": 25055, "D": 26287, "E": 28697}
ENVIO_2 = {"A": 23947, "B": 32597, "C": 38784, "D": 37832, "E": 45214}

TOTAL_1 = {"A": 73000, "B": 78000, "C": 82000, "D": 83000, "E": 85000}
TOTAL_2 = {"A": 137000, "B": 146000, "C": 152000, "D": 152000, "E": 158000}

# el campo `flete` que el bot tiene cargado por banda (flete modal, SIN seguro)
FLETE_BOT_1 = {"A": 12956, "B": 16843, "C": 20771, "D": 22870, "E": 25481}
RECARGO_2DA_UD = 7100              # estimacion cargada en el bot

peso = "=" * 74


def money(n):
    return f"${n:,.0f}".replace(",", ".")


print(peso)
print("1. ¿TIENE RAZON EL DUEÑO? — Monteria es banda D")
print(peso)
print()
residual = TOTAL_2["D"] - PROMO_2_PRODUCTO
print(f"  Lo que el bot le dijo al cliente")
print(f"    2 conjuntos ................ {money(PROMO_2_PRODUCTO)}")
print(f"    envio (el resto del total) . {money(residual)}   <- esto vio el cliente")
print(f"    TOTAL ...................... {money(TOTAL_2['D'])}")
print()
print(f"  Lo que cuesta de verdad")
print(f"    envio real 2 uds banda D ... {money(ENVIO_2['D'])}  (flete + seguro, medido)")
print(f"    lo que reporto el dueño .... {money(37000)}  (plataforma 99 Envios)")
print()
dif = residual - ENVIO_2["D"]
print(f"  >>> El bot dijo {money(dif)} MAS de lo que cuesta el envio.")
print(f"  >>> TIENE RAZON. Y el numero que el reporto ({money(37000)}) coincide")
print(f"      con lo medido ({money(ENVIO_2['D'])}): la diferencia es de {money(ENVIO_2['D']-37000)}.")
print()
print("  ⚠️ Y hay algo peor: el envio es el UNICO numero que el cliente puede")
print("     verificar por fuera. Entro a la plataforma, vio 37.000, y se fue.")
print("     El precio del producto no lo puede comparar con nada.")
print()

print(peso)
print("2. EL BUG DE PRESENTACION: LAS CUENTAS NO CIERRAN EN NINGUNA BANDA")
print(peso)
print()
print("El bot tiene cargado un `flete` por banda y por otro lado un TOTAL.")
print("Cuando desglosa 'producto + envio', los dos numeros NO suman el total:")
print()
print(f"{'banda':<7}{'producto':>10}{'+ flete bot':>13}{'= suma':>11}{'total real':>12}{'descuadre':>12}")
print("-" * 68)
for b in "ABCDE":
    suma = PRECIO_PROD_CLIENTE + FLETE_BOT_1[b]
    desc = TOTAL_1[b] - suma
    print(f"{b:<7}{PRECIO_PROD_CLIENTE:>10,}{FLETE_BOT_1[b]:>13,}{suma:>11,}{TOTAL_1[b]:>12,}{desc:>+12,}")
print()
print("Y en 2 unidades es mucho peor, porque el bot suma un recargo estimado:")
print()
print(f"{'banda':<7}{'producto':>10}{'+ flete 2uds':>14}{'= suma':>11}{'total real':>12}{'descuadre':>12}")
print("-" * 70)
for b in "ABCDE":
    flete2 = FLETE_BOT_1[b] + RECARGO_2DA_UD
    suma = PROMO_2_PRODUCTO + flete2
    desc = TOTAL_2[b] - suma
    print(f"{b:<7}{PROMO_2_PRODUCTO:>10,}{flete2:>14,}{suma:>11,}{TOTAL_2[b]:>12,}{desc:>+12,}")
print()
print("🔑 Un cliente que haga la resta ve numeros que no cuadran. En banda E de")
print("   1 unidad la suma da MAS que el total que se le cobra, que es absurdo.")
print()

print(peso)
print("3. EL ARREGLO GRATIS: PONER EL MARGEN EN EL PRODUCTO, NO EN EL ENVIO")
print(peso)
print()
print("El envio se puede verificar; el precio de 'dos conjuntos' no. Entonces se")
print("muestra el envio REAL y el resto va en la linea del producto. El total NO")
print("cambia, el margen NO cambia, y nada de lo que se dice queda inflado.")
print()
print(f"{'banda':<7}{'envio a mostrar':>17}{'producto a mostrar':>20}{'total':>11}{'c/u':>10}")
print("-" * 66)
for b in "ABCDE":
    envio_m = round(ENVIO_2[b] / 1000) * 1000
    prod_m = TOTAL_2[b] - envio_m
    print(f"{b:<7}{envio_m:>17,}{prod_m:>20,}{TOTAL_2[b]:>11,}{prod_m/2:>10,.0f}")
print()
print("Asi el argumento de venta MEJORA, porque aparece el descuento real:")
prod_m_d = TOTAL_2["D"] - round(ENVIO_2["D"] / 1000) * 1000
print(f"  2 sueltos: 2 x {money(PRECIO_PROD_CLIENTE)} = {money(2*PRECIO_PROD_CLIENTE)}")
print(f"  llevando 2: {money(prod_m_d)}  ->  {money(prod_m_d/2)} cada uno")
print(f"  ahorro en el producto: {money(2*PRECIO_PROD_CLIENTE - prod_m_d)}")
print()

print(peso)
print("4. SI ADEMAS QUIERE BAJAR EL PRECIO (esto SI cuesta margen)")
print(peso)
print()
print("Banda D, 2 unidades. El margen por unidad sale de:")
print(f"  (total - 2x{money(COSTO_PROD)} - {money(ENVIO_2['D'])}) / 2")
print()
print(f"{'total':>10}{'envio que ve':>15}{'margen/ud':>12}{'vs meta':>11}{'x2 uds':>11}  veredicto")
print("-" * 76)
for total in [152000, 151000, 150000, 148000, 147000, 145000, 143000, 140000]:
    envio_visible = total - prod_m_d if False else total - (TOTAL_2["D"] - round(ENVIO_2["D"]/1000)*1000)
    m = (total - 2 * COSTO_PROD - ENVIO_2["D"]) / 2
    vs = m - META
    if vs >= 0:
        v = "OK, sobre la meta"
    elif m >= 20000:
        v = "aceptable si cierra la venta"
    elif m >= 18000:
        v = "flaco, solo para no perder el cliente"
    else:
        v = "NO, se come el negocio"
    marca = "  <- HOY" if total == 152000 else ""
    print(f"{total:>10,}{envio_visible:>15,}{m:>12,.0f}{vs:>+11,.0f}{2*m:>11,.0f}  {v}{marca}")
print()
print("Lo que pidio el dueño, traducido:")
for envio_obj, etiqueta in [(37000, "el envio real"), (35000, "su idea de 35.000"), (30000, "su idea de 30.000")]:
    total = prod_m_d + envio_obj
    m = (total - 2 * COSTO_PROD - ENVIO_2["D"]) / 2
    print(f"  mostrar envio de {money(envio_obj)} ({etiqueta}): total {money(total)}, "
          f"margen {money(m)}/ud ({money(m-META)} vs meta)")
print()

print(peso)
print("5. LA DECISION, CON NUMEROS")
print(peso)
print()
print("  El arreglo de presentacion es GRATIS y hay que hacerlo ya: el cliente")
print(f"  de Monteria veria {money(round(ENVIO_2['D']/1000)*1000)} de envio en vez de {money(residual)},")
print("  que es lo que vio en la plataforma. Margen intacto.")
print()
m_hoy = (TOTAL_2["D"] - 2 * COSTO_PROD - ENVIO_2["D"]) / 2
print(f"  Bajar el precio es OTRA decision. Hoy la banda D deja {money(m_hoy)}/ud,")
print(f"  o sea {money(m_hoy - META)} sobre la meta: hay muy poco colchon.")
print("  Cada $1.000 que baje el total le quita $500 al margen de cada unidad.")
print()
print("  ⚠️ Y una advertencia sobre la banda D: su envio de 2 uds")
print(f"  ({money(ENVIO_2['D'])}) es MAS BARATO que el de la banda C ({money(ENVIO_2['C'])}),")
print("  aunque en 1 unidad sea al contrario. Las dos estan a 152.000: por")
print(f"  formula la D podria estar en {money(151000)} y seguir sobre la meta.")
