"""
CPA EXACTO POR PRODUCTO — cruza el gasto POR ANUNCIO de Meta con los pedidos reales.

REGLA 4-B: SOLO LECTURA. Reusa `meta-api-lectura.py`, cuya unica funcion de red
es un GET. No hay una sola linea que pueda mover un presupuesto.

══════════════════════════════════════════════════════════════════════════════
POR QUE EXISTE
══════════════════════════════════════════════════════════════════════════════
El dueno (5-oct): *"dime el valor del CPA de estos ultimos dias"*, y despues,
con razon: *"no se si hizo el calculo con el total gastado en solo los conjuntos
de anuncios para ese tipo de producto"*.

No. No se podia. El repo sabia el gasto TOTAL de la cuenta y los pedidos por
producto, pero no el gasto DE CADA PRODUCTO. Asi que el CPA por producto habia
que estimarlo repartiendo el gasto total con una proporcion sacada de una sola
lectura del dia. Y esa estimacion decidia donde poner la plata:

    si el impermeable es el 50% del gasto -> CPA $7.476
    si es el 67% .......................... CPA $10.018
    si es el 75% .......................... CPA $11.214

El mismo producto, tres respuestas distintas. Con eso no se decide un
presupuesto.

══════════════════════════════════════════════════════════════════════════════
COMO LO RESUELVE: EL ANUNCIO ES LA LLAVE
══════════════════════════════════════════════════════════════════════════════
Cada pedido guarda de que ANUNCIO vino (`anuncio_id`), y eso ya estaba pensado
para esto — `resumen.js` lo dice: *"con esto el CSV se puede cruzar contra el
gasto por anuncio de Meta Ads y sacar el CPA REAL por anuncio"*. Faltaba el
cruce.

    Meta  -> gasto por anuncio por dia   (level=ad, time_increment=1)
    el bot -> pedidos por anuncio por dia (/pedidos.csv)
    --------------------------------------------------------------
    CPA del producto = suma del gasto de SUS anuncios / sus pedidos

No depende de como se llamen los conjuntos, que era la otra ambiguedad: "INTER"
podia ser intercomunicador o intereses, y adivinarlo habria sido inventar.

══════════════════════════════════════════════════════════════════════════════
COMO SE SABE DE QUE PRODUCTO ES UN ANUNCIO: SE LO PREGUNTA A SUS PEDIDOS
══════════════════════════════════════════════════════════════════════════════
No por el nombre. Por la FORMA de los pedidos que trajo, que es un dato duro:

    el V10 ....... sin talla, sin color, combo de 2, total $113.000-$125.000
    el impermeable con talla y color, 1 unidad, total $73.000-$85.000

Se comprobo contra 199 pedidos reales: esta firma y la del `anuncio_id`
coinciden en 198. El unico desacuerdo es el pedido de Fabian del 29-sep, que
quedo mal atribuido por el bug de `catalogo.js` que se arreglo el 1-oct — o sea
que el metodo encontro el error conocido, que es la mejor senal de que funciona.

🔑 Y LO QUE NO SE PUEDE CLASIFICAR SE DICE, NO SE REPARTE. Un anuncio que gasto
pero no trajo ningun pedido en la ventana no se puede atribuir por sus pedidos.
Ese gasto va aparte, con su propio renglon. Repartirlo "proporcionalmente" seria
volver a la estimacion que este script vino a eliminar.

══════════════════════════════════════════════════════════════════════════════
🔒 DATOS PERSONALES
══════════════════════════════════════════════════════════════════════════════
/pedidos.csv trae nombre, celular y direccion. Este script NO los carga: se
queda solo con las 7 columnas que necesita el cruce (estado, dia, talla, color,
unidades, total, anuncio_id). El archivo que genera no puede filtrar un dato
personal porque nunca lo tuvo en memoria.

USO
  export META_ADS_TOKEN='EAA...'
  export BOT_URL='https://...'  BOT_TOKEN='...'
  python3 analisis/cpa-por-producto.py [dias]        # por defecto 7
"""

import csv
import datetime as dt
import importlib.util
import io
import json
import os
import sys
import urllib.parse
import urllib.request

BASE = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(BASE)
SALIDA = os.path.join(RAIZ, "CPA-POR-PRODUCTO.md")

ACT = "act_4330882710457791"

# ── Las columnas del CSV que SI se cargan. Todo lo demas se descarta al leer.
COLUMNAS = ["estado", "dia_bogota", "talla", "color", "unidades", "total", "anuncio_id"]

# ══════════════════════════════════════════════════════════════════════════════
# COSTOS — LA FUENTE DE VERDAD ESTA EN EL CODIGO DEL BOT, NO ACA
#
# 🔴 Estos numeros estan DUPLICADOS de bot/src/. Es una deuda consciente: este
# script corre en Python y los del bot viven en JavaScript. Para que la copia no
# se quede vieja —que es exactamente el error que costo $437.724 cuando el costo
# del V10 siguio en $35.000 despues de bajar a $32.000— pasan dos cosas:
#
#   1. el informe IMPRIME estos valores en una tabla, asi que una copia vieja se
#      ve en el archivo en vez de esconderse en el calculo;
#   2. bot/test-costos-no-se-desincronizan.js compara estas lineas contra
#      fletes.js y catalogo.js y FALLA si alguien cambia uno y no el otro.
# ══════════════════════════════════════════════════════════════════════════════
COSTO_IMPERMEABLE = 33000   # bot/src/fletes.js  -> COSTO_PRODUCTO
COSTO_V10_UNIDAD = 32000    # bot/src/catalogo.js -> intercom_v10_2x.costoUnitario

# Lo que de verdad cuesta mandar el paquete, por banda. bot/src/fletes.js.
# ⚠️ ES EL COSTO, NO LO QUE SE LE COBRA AL CLIENTE. La diferencia entre los dos es
# el flete que absorbe el negocio, y es justo lo que se olvida al calcular a mano:
# en banda C se le cobran $22.100 de envio y cuesta $25.055.
ENVIO_REAL_1 = {"A": 14906, "B": 21038, "C": 25055, "D": 26287, "E": 28697}
ENVIO_REAL_2 = {"A": 23947, "B": 32597, "C": 38784, "D": 37832, "E": 45214}

# El total que paga el cliente ESTA determinado por su banda, asi que la banda se
# deduce del total sin necesidad de traer la tabla de ciudades (que son cientos).
TOTAL_POR_BANDA = {
    "IMPERMEABLE": {"A": 73000, "B": 78000, "C": 82000, "D": 83000, "E": 85000},
    "V10": {"A": 113000, "B": 118000, "C": 122000, "D": 123000, "E": 125000},
}

# Costo de una devolucion LIQUIDADA: solo la prima del seguro. Regla 0-AY —
# "nunca le cobraron ningun flete de devolucion" — y el producto vuelve y se
# revende. Medido en analisis/devoluciones-30sep.py sobre 54 devoluciones reales.
COSTO_DEVOLUCION = 3109

# Tasa de devolucion medida sobre 386 guias con corte al 30-sep (IC 16,8-30,2%).
# ⚠️ Es la de la cohorte del impermeable. El V10 empezo a vender a fin de
# septiembre, asi que su tasa propia no madura hasta ~22-oct.
TASA_DEVOLUCION = 0.228

_spec = importlib.util.spec_from_file_location("lector", os.path.join(BASE, "meta-api-lectura.py"))
lector = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(lector)


def ahora_bogota():
    return dt.datetime.now(dt.timezone.utc) - dt.timedelta(hours=5)


def conv_de(fila):
    return sum(
        int(float(a.get("value", 0)))
        for a in (fila.get("actions") or [])
        if "messaging_conversation_started" in a.get("action_type", "")
    )


def gasto_por_anuncio(desde, hasta):
    """Gasto, impresiones y conversaciones de CADA anuncio, CADA dia."""
    d = lector.get(
        f"{ACT}/insights",
        {
            "level": "ad",
            "fields": "ad_id,ad_name,adset_name,spend,impressions,actions",
            "time_range": json.dumps({"since": desde, "until": hasta}),
            "time_increment": 1,
            "limit": 500,
        },
    )
    filas = d.get("data", [])
    # 🔑 Si Meta pagino, el informe estaria incompleto SIN DECIRLO. Mejor avisar.
    if (d.get("paging") or {}).get("next"):
        print("⚠️  Meta pagino la respuesta: hay mas anuncios de los que se leyeron.", file=sys.stderr)
    return [
        {
            "ad_id": str(f.get("ad_id") or ""),
            "ad_name": f.get("ad_name") or "",
            "adset_name": f.get("adset_name") or "",
            "dia": f.get("date_start") or "",
            "gasto": float(f.get("spend") or 0),
            "impresiones": int(f.get("impressions") or 0),
            "conv": conv_de(f),
        }
        for f in filas
    ]


def pedidos_del_bot():
    """Lee /pedidos.csv y devuelve SOLO las columnas del cruce. Sin datos personales."""
    url = os.environ.get("BOT_URL", "").rstrip("/")
    tok = os.environ.get("BOT_TOKEN", "")
    if not url or not tok:
        sys.exit("FALTAN BOT_URL y/o BOT_TOKEN para leer los pedidos.")
    pedido = urllib.request.Request(
        f"{url}/pedidos.csv?token={urllib.parse.quote(tok)}", method="GET"
    )
    with urllib.request.urlopen(pedido, timeout=120) as r:
        crudo = r.read().decode("utf-8-sig", errors="replace")
    filas = []
    for f in csv.DictReader(io.StringIO(crudo)):
        filas.append({c: (f.get(c) or "").strip() for c in COLUMNAS})
    del crudo  # que no quede el CSV completo (con PII) vivo en memoria
    return filas


def producto_del_pedido(p):
    """
    De que producto es este pedido, por su FORMA. None si no se puede afirmar.

    La firma es dura: el impermeable PIDE talla y color (`pideTalla: true`), el
    V10 no pide ninguno de los dos. Y el combo de 2 V10 cae en $113.000-$125.000,
    muy por encima del $73.000-$85.000 de un impermeable suelto.

    ⚠️ Deliberadamente devuelve None en vez de adivinar cuando la firma no
    alcanza: un V10 de UNA unidad no tiene talla pero tampoco llega a $110.000.
    Esos los resuelve despues `clasificar_anuncios` mirando de que anuncio vino,
    que es un dato mas fuerte que el total.
    """
    talla = p.get("talla", "")
    color = p.get("color", "")
    total = float(p.get("total") or 0)
    if talla or color:
        # Con talla o color es ropa. (Y si la talla NOMBRA otro producto, es el
        # bug de atribucion del 1-oct: se marca aparte para no taparlo.)
        if "interc" in talla.lower() or "v10" in talla.lower():
            return "MAL_ATRIBUIDO"
        return "IMPERMEABLE"
    if total >= 110000:
        return "V10"
    return None


def banda_del_total(total, producto):
    """La banda de envio, deducida del total que pago el cliente."""
    tabla = TOTAL_POR_BANDA.get(producto) or TOTAL_POR_BANDA["IMPERMEABLE"]
    return min(tabla, key=lambda b: abs(float(total or 0) - tabla[b]))


def contribucion(p, producto):
    """
    Lo que deja UN pedido si se entrega, antes de pauta.

        total que paga el cliente  −  costo del producto  −  envio REAL

    🔑 El envio va con el costo REAL, no con lo que se le cobro al cliente. Si se
    usara lo cobrado, la contribucion saldria inflada en $1.800-$3.600 por pedido
    — es el flete que el negocio absorbe, y el error mas facil de cometer acá.
    """
    total = float(p.get("total") or 0)
    try:
        uds = max(1, int(float(p.get("unidades") or 1)))
    except ValueError:
        uds = 1
    b = banda_del_total(total, producto)
    if producto == "V10":
        # Politica de paquete unico: 1 o 2 intercomunicadores van en un solo
        # paquete chico, asi que pagan el flete de uno. catalogo.js lo marca
        # `provisional: true` — se valida cuando haya facturas del producto.
        envio = ENVIO_REAL_1[b]
        costo = COSTO_V10_UNIDAD * uds
    else:
        envio = ENVIO_REAL_2[b] if uds >= 2 else ENVIO_REAL_1[b]
        costo = COSTO_IMPERMEABLE * uds
    return total - costo - envio


def clasificar_anuncios(pedidos):
    """Cada anuncio hereda el producto de los pedidos que trajo."""
    cuenta = {}
    for p in pedidos:
        a = p.get("anuncio_id", "")
        if not a:
            continue
        prod = producto_del_pedido(p)
        if prod in (None, "MAL_ATRIBUIDO"):
            continue
        cuenta.setdefault(a, {}).setdefault(prod, 0)
        cuenta[a][prod] += 1
    salida = {}
    mezclados = []
    for a, c in cuenta.items():
        ganador = max(c, key=c.get)
        salida[a] = ganador
        if len(c) > 1:
            mezclados.append((a, dict(c)))
    return salida, mezclados


def construir(dias):
    hoy = ahora_bogota().date()
    # Solo dias CERRADOS: un dia a medias mezcla medio gasto con pedidos completos.
    hasta = hoy - dt.timedelta(days=1)
    desde = hasta - dt.timedelta(days=dias - 1)

    anuncios = gasto_por_anuncio(desde.isoformat(), hasta.isoformat())
    pedidos = pedidos_del_bot()
    deAnuncio, mezclados = clasificar_anuncios(pedidos)

    # ── pedidos por dia y producto (sin anulados)
    ped = {}
    recaudo = {}
    contrib = {}
    malAtribuidos = 0
    porElAnuncio = 0   # pedidos cuya forma no alcanzo y los resolvio su anuncio
    for p in pedidos:
        d = p.get("dia_bogota", "")
        if not (desde.isoformat() <= d <= hasta.isoformat()):
            continue
        if p.get("estado") == "ANULADO":
            continue
        prod = producto_del_pedido(p)
        if prod == "MAL_ATRIBUIDO":
            malAtribuidos += 1
            continue
        if prod is None:
            # 🔑 La forma no alcanzo (el caso tipico: un V10 de UNA unidad, que no
            # tiene talla pero tampoco llega a $110.000). Lo resuelve el ANUNCIO
            # del que vino, que ya quedo clasificado por sus pedidos de combo.
            # Esto no es adivinar: es usar el dato mas fuerte que hay.
            prod = deAnuncio.get(p.get("anuncio_id", ""))
            if prod:
                porElAnuncio += 1
            else:
                prod = "SIN CLASIFICAR"
        ped[(d, prod)] = ped.get((d, prod), 0) + 1
        recaudo[(d, prod)] = recaudo.get((d, prod), 0) + float(p.get("total") or 0)
        if prod in ("V10", "IMPERMEABLE"):
            contrib[(d, prod)] = contrib.get((d, prod), 0.0) + contribucion(p, prod)

    # ── gasto por dia y producto, segun el anuncio
    gasto, convs, sinPedidos = {}, {}, {}
    for a in anuncios:
        prod = deAnuncio.get(a["ad_id"])
        if prod is None:
            # El anuncio gasto pero no trajo pedidos en la ventana: su gasto NO se
            # reparte. Va aparte, con el nombre del conjunto para poder mirarlo.
            k = a["adset_name"] or "(sin conjunto)"
            s = sinPedidos.setdefault(k, {"gasto": 0.0, "conv": 0})
            s["gasto"] += a["gasto"]
            s["conv"] += a["conv"]
            continue
        gasto[(a["dia"], prod)] = gasto.get((a["dia"], prod), 0.0) + a["gasto"]
        convs[(a["dia"], prod)] = convs.get((a["dia"], prod), 0) + a["conv"]

    productos = ["V10", "IMPERMEABLE"]
    L = []
    L.append("# 🎯 CPA exacto por producto — BikerPro")
    L.append("")
    L.append(f"> **Ultima lectura: {ahora_bogota().strftime('%Y-%m-%d %H:%M')} Bogota.** "
             f"Ventana **{desde} a {hasta}** (solo dias cerrados).")
    L.append("> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.")
    L.append("")
    L.append("El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido "
             "guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.")
    L.append("")

    # ── por producto, el total de la ventana
    L.append("## Resumen de la ventana")
    L.append("")
    L.append("| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |")
    L.append("|---|---|---|---|---|---|---|---|")
    tot = {}
    for prod in productos:
        g = sum(v for (d, p), v in gasto.items() if p == prod)
        c = sum(v for (d, p), v in convs.items() if p == prod)
        n = sum(v for (d, p), v in ped.items() if p == prod)
        r = sum(v for (d, p), v in recaudo.items() if p == prod)
        k = sum(v for (d, p), v in contrib.items() if p == prod)
        tot[prod] = {"gasto": g, "conv": c, "ped": n, "recaudo": r, "contrib": k}
        L.append(
            f"| **{prod}** | ${g:,.0f} | {c} | {n} | **${(g/n if n else 0):,.0f}** | "
            f"${(g/c if c else 0):,.0f} | {(n/c*100 if c else 0):.2f}% | ${r:,.0f} |"
        )
    L.append("")

    # ── el gasto que no se pudo atribuir: se dice, no se reparte
    gSin = sum(v["gasto"] for v in sinPedidos.values())
    gAtr = sum(tot[p]["gasto"] for p in productos)
    confianza = gAtr / (gAtr + gSin) * 100 if (gAtr + gSin) else 0
    L.append("### 🔎 Cuanta confianza tienen estos numeros")
    L.append("")
    L.append(f"| | |")
    L.append(f"|---|---|")
    L.append(f"| gasto atribuido a un producto | **${gAtr:,.0f}** ({confianza:.1f}%) |")
    L.append(f"| gasto de anuncios sin pedidos en la ventana | ${gSin:,.0f} |")
    L.append(f"| anuncios clasificados por la forma de sus pedidos | {len(deAnuncio)} |")
    L.append(f"| anuncios con pedidos de los DOS productos | {len(mezclados)} "
             f"{'✅' if not mezclados else '⚠️'} |")
    if porElAnuncio:
        L.append(f"| pedidos resueltos por su anuncio (V10 de 1 unidad) | {porElAnuncio} |")
    sinClasificar = sum(v for (d, p), v in ped.items() if p == "SIN CLASIFICAR")
    L.append(f"| pedidos que no se pudieron clasificar | {sinClasificar} "
             f"{'✅' if not sinClasificar else '⚠️'} |")
    L.append("")
    if gSin > 0:
        L.append("Ese gasto **no se reparte entre los productos**: repartirlo seria volver a "
                 "estimar, que es justo lo que este informe vino a eliminar. Si la cifra es "
                 "grande, el CPA de arriba esta medido sobre menos gasto del real.")
        L.append("")
        L.append("| conjunto | gasto sin atribuir | conv |")
        L.append("|---|---|---|")
        for k, v in sorted(sinPedidos.items(), key=lambda x: -x[1]["gasto"]):
            L.append(f"| {k.replace('|', chr(92) + '|')} | ${v['gasto']:,.0f} | {v['conv']} |")
        L.append("")

    if mezclados:
        L.append("### ⚠️ Anuncios con pedidos de los DOS productos")
        L.append("")
        L.append("Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio "
                 "cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).")
        L.append("")
        for a, c in mezclados:
            L.append(f"- `{a}` -> {c}")
        L.append("")
    if malAtribuidos:
        L.append(f"🔴 **{malAtribuidos} pedido(s) con la talla nombrando otro producto.** "
                 "Son los del bug de atribucion: no entran en ningun producto para no "
                 "contaminar el calculo, y hay que corregirlos a mano en el panel.")
        L.append("")

    # ── dia por dia
    L.append("## Dia por dia")
    L.append("")
    L.append("| dia | gasto V10 | ped | CPA V10 | gasto imper | ped | CPA imper |")
    L.append("|---|---|---|---|---|---|---|")
    d = desde
    while d <= hasta:
        k = d.isoformat()
        gv, nv = gasto.get((k, "V10"), 0), ped.get((k, "V10"), 0)
        gi, ni = gasto.get((k, "IMPERMEABLE"), 0), ped.get((k, "IMPERMEABLE"), 0)
        L.append(
            f"| {k} | ${gv:,.0f} | {nv} | {('$%s' % format(gv/nv, ',.0f')) if nv else '—'} "
            f"| ${gi:,.0f} | {ni} | {('$%s' % format(gi/ni, ',.0f')) if ni else '—'} |"
        )
        d += dt.timedelta(days=1)
    L.append("")

    # ── utilidad y equilibrio de CADA producto
    L.append("## Cada producto contra SU propio equilibrio")
    L.append("")
    L.append("*(Nunca el promedio de la cuenta como umbral — error #12.)*")
    L.append("")
    L.append("| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |")
    L.append("|---|---|---|---|---|---|")
    utilTotal = 0.0
    for prod in productos:
        t = tot[prod]
        if not t["ped"]:
            continue
        # 🔑 La contribucion se suma PEDIDO POR PEDIDO (ver `contribucion`), con el
        # costo del producto Y el envio REAL de su banda. Promediar el recaudo y
        # restarle solo el costo del producto —como hice en la primera version—
        # olvida el flete y infla la utilidad al doble.
        contribProm = t["contrib"] / t["ped"]
        eq = contribProm * (1 - TASA_DEVOLUCION) - TASA_DEVOLUCION * COSTO_DEVOLUCION
        cpa = t["gasto"] / t["ped"]
        util = (eq - cpa) * t["ped"]
        utilTotal += util
        marca = "🟢" if eq / cpa >= 3 else "🟡" if eq / cpa >= 1.5 else "🔴"
        L.append(
            f"| **{prod}** | ${contribProm:,.0f} | **${eq:,.0f}** | ${cpa:,.0f} | "
            f"{marca} {eq/cpa:.1f}x | ${util:,.0f} |"
        )
    L.append("")
    L.append(f"**Utilidad de la ventana: ${utilTotal:,.0f}** "
             f"(${utilTotal/dias:,.0f}/dia)")
    L.append("")

    # ── los supuestos, impresos. Una constante vieja tiene que VERSE.
    L.append("## Con que numeros se calculo")
    L.append("")
    L.append("*(Van impresos a proposito: una constante que se queda vieja tiene que verse "
             "en el informe, no esconderse en el calculo. Eso fue lo que costo $437.724 "
             "cuando el costo del V10 siguio en $35.000 despues de bajar a $32.000.)*")
    L.append("")
    L.append("| | valor | de donde sale |")
    L.append("|---|---|---|")
    L.append(f"| costo impermeable | ${COSTO_IMPERMEABLE:,}/ud | `bot/src/fletes.js` COSTO_PRODUCTO |")
    L.append(f"| costo intercomunicador | ${COSTO_V10_UNIDAD:,}/ud | `bot/src/catalogo.js` costoUnitario |")
    L.append(f"| tasa de devolucion | {TASA_DEVOLUCION*100:.1f}% | 386 guias, corte 30-sep (IC 16,8-30,2%) |")
    L.append(f"| costo de una devolucion | ${COSTO_DEVOLUCION:,} | solo la prima — regla 0-AY |")
    L.append("")
    L.append("⚠️ La tasa de devolucion es la de la cohorte del **impermeable**. El V10 empezo a "
             "vender a fin de septiembre, asi que su tasa propia no madura hasta ~22-oct. "
             "Mientras tanto, su colchon es el numero menos firme de este informe.")
    L.append("")
    L.append(f"*Cuenta `{ACT}` · COP · America/Bogota*")
    return "\n".join(L) + "\n"


def main():
    dias = int(sys.argv[1]) if len(sys.argv) > 1 and sys.argv[1].isdigit() else 7
    try:
        texto = construir(dias)
    except SystemExit:
        raise
    except Exception:
        print("FALLO construyendo el informe:", file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)
    with open(SALIDA, "w", encoding="utf-8") as f:
        f.write(texto)
    print(f"escrito {SALIDA}")
    # Resumen de una linea para el mensaje del commit.
    for linea in texto.splitlines():
        if linea.startswith("**Utilidad de la ventana"):
            with open("/tmp/cpa-resumen.txt", "w", encoding="utf-8") as g:
                g.write("CPA por producto · " + linea.replace("**", ""))
            break


if __name__ == "__main__":
    main()
