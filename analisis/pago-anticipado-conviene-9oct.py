"""
¿CONVIENE DAR DESCUENTO POR PAGO ANTICIPADO?

DE DONDE SALE (9-oct). El dueno despacho un pedido a CALI pagado por adelantado
y la transportadora le cobro ~$15.000-16.000, cuando el mismo envio contraentrega
le costaba ~$22.000-25.000. Su pregunta: si el envio prepagado es mucho mas
barato, conviene pasarle parte de ese ahorro al cliente para que prefiera pagar
antes? Y sobre todo: en que momento decirlo sin que se caigan ventas?

ESTE SCRIPT NO INVENTA NINGUN NUMERO. Todo sale del propio repo:
  - bandas, totales y ENVIO_REAL_1/2  -> bot/src/fletes.js
  - COSTO_PRODUCTO = $33.000          -> bot/src/fletes.js:551
  - comision de recaudo = 6,97%       -> analisis/comision-ya-estaba-adentro.py
  - prima del seguro = $2.848         -> analisis/valor-seguro-99.py
  - tasa de devolucion = 22,8%        -> CPA-POR-PRODUCTO.md:57
  - costo de una devolucion = $3.109  -> CPA-POR-PRODUCTO.md (regla 0-AY)

    python3 analisis/pago-anticipado-conviene-9oct.py
"""

# ── Constantes del repo ─────────────────────────────────────────────────────
COSTO_PRODUCTO = 33_000      # fletes.js:551
COMISION_RECAUDO = 0.0697    # comision-ya-estaba-adentro.py: $139,47 por cada $2.000
PRIMA_SEGURO = 2_848         # valor-seguro-99.py
TASA_DEVOLUCION = 0.228      # CPA-POR-PRODUCTO.md:57 (IC 16,8%-30,2%)
COSTO_DEVOLUCION = 3_109     # solo la prima: el seguro cubre el flete de vuelta

# Lo que se cobra y lo que cuesta de verdad, por banda (fletes.js)
BANDAS = {
    "A": {"nombre": "Bogota y sabana",   "total": 73_000, "envio_real": 14_906},
    "B": {"nombre": "Boyaca, Casanare",  "total": 78_000, "envio_real": 21_038},
    "C": {"nombre": "Capitales (CALI)",  "total": 82_000, "envio_real": 25_055},
    "D": {"nombre": "Intermedias",       "total": 83_000, "envio_real": 26_287},
    "E": {"nombre": "Pueblos",           "total": 85_000, "envio_real": 28_697},
}

PESO = 76  # ancho de las lineas


def titulo(n, t):
    print("\n" + "=" * PESO)
    print(f"{n}. {t}")
    print("=" * PESO)


def plata(n):
    return f"${n:,.0f}".replace(",", ".")


# ===========================================================================
titulo(1, "DE QUE ESTA HECHO EL FLETE CONTRAENTREGA")
# ===========================================================================
print("""
  El flete que paga el negocio (valor_servicio de 99 Envios) NO es solo
  transporte. Tiene adentro dos cosas que el pago anticipado elimina:

    a) la COMISION DE RECAUDO: cobrarle al cliente en la puerta y girar la
       plata. Es un 6,97% del valor recaudado. Esto esta MEDIDO: seis ciudades
       distintas con el mismo recaudo pagaron el mismo valor_servicio exacto, y
       cuando el recaudo subio $2.000 el cobro subio $139,47.

    b) la PRIMA DEL SEGURO ANTIDEVOLUCION: $2.848 por guia. Si el cliente ya
       pago, no hay nada que devolver, asi que deja de hacer falta.
""")

print(f'  {"Banda":<6} {"Destino":<20} {"cobra":>9} {"flete COD":>11} '
      f'{"comision":>10} {"seguro":>8} {"flete base":>11} {"AHORRO":>9}')
print("  " + "-" * (PESO - 2))

for clave, b in BANDAS.items():
    comision = b["total"] * COMISION_RECAUDO
    base = b["envio_real"] - comision - PRIMA_SEGURO
    ahorro = b["envio_real"] - base
    b["flete_prepago"] = base
    b["ahorro"] = ahorro
    print(f'  {clave:<6} {b["nombre"]:<20} {plata(b["total"]):>9} '
          f'{plata(b["envio_real"]):>11} {plata(comision):>10} '
          f'{plata(PRIMA_SEGURO):>8} {plata(base):>11} {plata(ahorro):>9}')

c = BANDAS["C"]
print(f"""
  🔑 VALIDACION CONTRA LO QUE OBSERVO EL DUENO EN CALI:
     el modelo predice flete prepagado de {plata(c["flete_prepago"])}
     y el dueno pago ~$15.000-16.000.  ✅ Cuadra.

  ⚠️ PERO ESTO ES n=1. La comision del 6,97% sale de una pendiente con DOS
     puntos de datos, y la descomposicion asume que comision y seguro se
     eliminan completos. Antes de cambiar precios hay que despachar 5-10 guias
     prepagadas y medir el valor_servicio real. Ver seccion 5.
""")

# ===========================================================================
titulo(2, "CUANTO VALE DE VERDAD UN PEDIDO, COD vs PREPAGO")
# ===========================================================================
print("""
  Aca esta el punto que se habia subestimado. El ahorro del flete es la mitad
  de la historia; la otra mitad es que UN PEDIDO PREPAGADO NO SE DEVUELVE.

  Hoy 22,8% de las guias se devuelven. En esas, el producto vuelve y el seguro
  cubre el flete, pero el MARGEN no se hizo y la pauta ya se gasto.
""")

DESCUENTO = 4_000          # lo que se le pasaria al cliente
INCIDENTES_PREPAGO = 0.02  # prepagados que igual fallan (direccion mala, etc.)

print(f"  Supuestos: descuento al cliente {plata(DESCUENTO)} · "
      f"devolucion COD {TASA_DEVOLUCION:.1%} · incidentes prepago {INCIDENTES_PREPAGO:.0%}\n")
print(f'  {"Banda":<6} {"contrib COD":>12} {"esperado COD":>13} '
      f'{"contrib PRE":>12} {"esperado PRE":>13} {"DIFERENCIA":>12}')
print("  " + "-" * (PESO - 2))

total_dif = 0
for clave, b in BANDAS.items():
    # Contraentrega: se cobra el total, se paga el flete con recaudo y seguro
    contrib_cod = b["total"] - b["envio_real"] - COSTO_PRODUCTO
    esperado_cod = ((1 - TASA_DEVOLUCION) * contrib_cod
                    - TASA_DEVOLUCION * COSTO_DEVOLUCION)

    # Prepago: se cobra el total menos el descuento, y el flete es el base
    contrib_pre = b["total"] - DESCUENTO - b["flete_prepago"] - COSTO_PRODUCTO
    esperado_pre = (1 - INCIDENTES_PREPAGO) * contrib_pre

    dif = esperado_pre - esperado_cod
    total_dif += dif
    b["dif"] = dif
    print(f'  {clave:<6} {plata(contrib_cod):>12} {plata(esperado_cod):>13} '
          f'{plata(contrib_pre):>12} {plata(esperado_pre):>13} '
          f'{"+" + plata(dif):>12}')

print(f"""
  >>> Convertir un pedido de contraentrega a prepago vale entre
      {plata(min(b["dif"] for b in BANDAS.values()))} y {plata(max(b["dif"] for b in BANDAS.values()))} MAS, incluso REGALANDO {plata(DESCUENTO)} al cliente.

  Y eso es con el descuento puesto. El descuento se paga solo: sale del flete
  que ya no se paga, no del margen del producto.
""")

# ===========================================================================
titulo(3, "EL VERDADERO RIESGO NO ES LA CUENTA, ES LA CONVERSION")
# ===========================================================================
print("""
  La aritmetica de arriba es comoda. Lo que puede salir mal es el
  COMPORTAMIENTO: que mencionar el prepago meta friccion en una conversacion
  que ya venia cerrando, y se caigan ventas.

  Y hay precedente propio, documentado en el steering: cuando el dueno pidio
  pago por adelantado A TODOS, se le cayeron ~40% de las ventas. Por eso paso a
  100% contraentrega. Esa decision fue RACIONAL.

  ⚠️ OJO CON LA DIFERENCIA: eso fue EXIGIR prepago. Acá se propone OFRECER un
  descuento opcional, sin quitar la contraentrega. No es lo mismo. Pero el
  precedente obliga a medir en vez de desplegar y rezar.

  Cuanto puede caer la venta antes de que deje de convenir:
""")

base_cod = ((1 - TASA_DEVOLUCION) * (c["total"] - c["envio_real"] - COSTO_PRODUCTO)
            - TASA_DEVOLUCION * COSTO_DEVOLUCION)
pre_c = (1 - INCIDENTES_PREPAGO) * (c["total"] - DESCUENTO - c["flete_prepago"] - COSTO_PRODUCTO)

print(f'  {"% que prepaga":>14} {"valor medio/pedido":>20} {"caida tolerable":>18}')
print("  " + "-" * (PESO - 2))
for adopcion in (0.10, 0.20, 0.25, 0.40, 0.60):
    medio = adopcion * pre_c + (1 - adopcion) * base_cod
    tolerable = 1 - base_cod / medio
    print(f'  {adopcion:>13.0%} {plata(medio):>20} {tolerable:>17.1%}')

print(f"""
  (banda C / Cali. "caida tolerable" = cuanto puede bajar el numero total de
   pedidos y todavia quedar igual que hoy.)

  >>> Con una adopcion del 25%, las ventas pueden caer hasta ~12% y el negocio
      queda igual. Es un colchon ancho — pero solo si el descuento NO espanta.
""")

# ===========================================================================
titulo(4, "EL RIESGO QUE MAS LE PREOCUPA AL DUENO (y por que esta cubierto)")
# ===========================================================================
print("""
  "Puede llegar una persona y decir: yo le compro, pero deme contraentrega con
   el valor de pago anticipado."

  Eso NO puede pasar por construccion, y no por disciplina del bot:

    1. El pedido anticipado queda frenado por el motivo de revision
       `pago_anticipado_sin_verificar` (store.js). NO SE DESPACHA hasta que el
       dueno confirme que la plata entro.
    2. Si la plata no entra, el pedido no sale. Asi que el precio con descuento
       NUNCA llega a una guia con recaudo.
    3. Si el cliente se arrepiente y quiere contraentrega, se re-cotiza al
       precio de lista. El descuento existe PORQUE el pago viene primero.

  Y el peor caso es el statu quo: si insiste en contraentrega, se le vende al
  precio de hoy. No se pierde la venta, se pierde el ahorro.

  🔴 LO QUE SI HAY QUE BLINDAR EN CODIGO (hoy no existe):
     cotizar() no recibe la forma de pago, asi que no hay nada que impida que
     un total prepago se use en un pedido contraentrega. Hace falta que
     cotizar() devuelva los dos precios por separado y una prueba que verifique
     que el de contraentrega nunca hereda el del prepago.
""")

# ===========================================================================
titulo(5, "QUE FALTA MEDIR ANTES DE TOCAR PRECIOS")
# ===========================================================================
print(f"""
  1. 🔴 BLOQUEADOR: no hay NI UNA guia prepagada con valor_servicio registrado
     en el repo. El caso de Cali es anecdotico. Hay que despachar 5-10 guias
     prepagadas, anotar el valor_servicio, y comparar contra la misma ciudad en
     contraentrega. O mas rapido: pedirle a 99 Envios la tarifa "sin recaudo".

  2. El 6,97% sale de una pendiente con n=2. Si la comision tiene parte fija,
     la tasa media es menor y el ahorro baja.

  3. No existe ningun script que cuente anticipado vs contraentrega. Sin linea
     base no se puede saber si el descuento movio algo. El dato ya se guarda
     (store.esPagoAnticipado y la marca del chat): falta agregarlo.

  4. Costo operativo que nadie conto: cada pedido anticipado obliga al dueno a
     verificar la plata a mano. A 20 pedidos/dia, un 30% de adopcion son 6
     verificaciones diarias. Y abre algo que hoy no existe: DEVOLVER plata si
     el pedido se cae.
""")

# ===========================================================================
titulo(6, "CONCLUSION")
# ===========================================================================
dif_c = BANDAS["C"]["dif"]
print(f"""
  CONVIENE, y por bastante mas de lo que el repo estimaba en septiembre
  (ahi se calculo el beneficio del prepago en ~$4.052 y por eso se descarto el
  descuento). Con la comision y el seguro adentro, el beneficio real por pedido
  convertido en banda C es ~{plata(dif_c)} CON el descuento de {plata(DESCUENTO)} ya regalado.

  La diferencia con la estimacion vieja es que esa no contaba el seguro
  antidevolucion ni valoraba bien la devolucion evitada.

  PERO no se despliega como politica general todavia:
    · el ahorro real es n=1 y hay que medirlo (seccion 5)
    · el precedente de "se cayeron las ventas" fue con prepago OBLIGATORIO
    · y falta el blindaje en cotizar() (seccion 4)

  RECOMENDACION: empezar por donde el ahorro es mayor y el riesgo menor —
  las bandas D y E (pueblos), donde el flete es mas caro, la devolucion mas
  probable y el cliente ya espera condiciones distintas. Medir ahi 2 semanas
  antes de abrirlo a Bogota y capitales.
""")
