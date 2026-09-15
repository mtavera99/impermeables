#!/usr/bin/env python3
"""
DESCOMPOSICION DEL ALZA DEL $/conv — seccion 0-BF (15-sep-2026)
================================================================
Responde: ¿cuanto del alza es Amor y Amistad (la subasta) y cuanto es la audiencia?

LA IDENTIDAD QUE LO PARTE EN DOS:

    $/conv  =  CPM  /  conv-por-mil
               ^^^       ^^^^^^^^
            el PRECIO   la CALIDAD
           (la subasta) (la audiencia)

No es una estimacion: es una identidad algebraica. El producto de los dos
factores reproduce el alza real exacta (se imprime la verificacion).

RESULTADO (base 6-11 sep vs lunes 14-sep):
  CPM      x1,41  -> la subasta explica el 40%
  conv/mil x1,62  -> la audiencia explica el 60%

CORRIGE:
  - 0-AU, que dejo "la causa real es Amor y Amistad". Es la causa MINORITARIA.
    Contraejemplo: el domingo 13 tuvo el CPM MAS ALTO de la ventana ($6.877) y
    cerro en $1.032/conv. Si el calendario fuera la causa, ese dia era el peor.
  - 0-AO, que dejo "degradacion UNIFORME en los 4 conjuntos = demanda". El lunes
    14 NO fue uniforme: Motorizados y el colmena tuvieron su MEJOR conv/mil
    mientras los dos conjuntos grandes se derrumbaron.

REPRODUCIR:
  python3 analisis/descomposicion-cpm-vs-audiencia-15sep.py

Requiere META_ADS_TOKEN (solo lectura, regla 4-B). Solo hace GET.
"""

import importlib.util
import json
import os
import sys

_RUTA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "meta-api-lectura.py")
_spec = importlib.util.spec_from_file_location("lector", _RUTA)
lector = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(lector)

ACT = "act_4330882710457791"

# El colmena es OTRO PRODUCTO con OTRO equilibrio (error #12). Siempre aparte.
COLMENA = {"Publico ABIERTO video", "Publico ABIERTO - Creativo", "Domiciliarios | Colmena"}

EQ_TRADICIONAL = 2402      # $/conv de equilibrio del impermeable tradicional
EQ_COLMENA = 3322          # $/conv de equilibrio del colmena
MARGEN_UD = 23244          # margen por unidad, medido en 39 unidades (0-AX)
UDS_POR_PEDIDO = 1.3
CIERRE = 0.084             # tasa de cierre de conversacion -> pedido
TASA_DEV = 0.19
COSTO_DEV = 33648          # costo de una devolucion, derivado de 0-BA

BASE = ["2026-09-06", "2026-09-07", "2026-09-08", "2026-09-09", "2026-09-10", "2026-09-11"]
DIAS = BASE + ["2026-09-12", "2026-09-13", "2026-09-14"]


def conversaciones(fila):
    """Conversaciones de mensajeria iniciadas. El resto de acciones no cuenta."""
    return sum(
        int(float(a.get("value", 0)))
        for a in (fila.get("actions") or [])
        if "messaging_conversation_started" in a.get("action_type", "")
    )


def por_conjunto(dia):
    d = lector.get(
        f"{ACT}/insights",
        {
            "level": "adset",
            "fields": "adset_name,spend,impressions,actions",
            "time_range": json.dumps({"since": dia, "until": dia}),
            "limit": 200,
        },
    )
    return d.get("data", [])


def agregado(dia, solo_colmena=False):
    """Devuelve (gasto, conversaciones, impresiones) del dia."""
    g = c = i = 0
    for f in por_conjunto(dia):
        es_colmena = f.get("adset_name") in COLMENA
        if es_colmena != solo_colmena:
            continue
        g += float(f.get("spend") or 0)
        c += conversaciones(f)
        i += int(f.get("impressions") or 0)
    return g, c, i


def utilidad(gasto, conv):
    """Metodo de 0-BA: margen bruto - pauta - devoluciones."""
    pedidos = conv * CIERRE
    bruto = pedidos * UDS_POR_PEDIDO * MARGEN_UD
    dev = pedidos * TASA_DEV * COSTO_DEV
    return pedidos, bruto - gasto - dev


def bloque_1_serie_diaria():
    print("=" * 78)
    print("1. LA SERIE DEL TRADICIONAL, DIA POR DIA (el colmena va aparte)")
    print("=" * 78)
    print(f"{'dia':<12}{'impr':>9}{'conv':>6}{'CPM':>8}{'conv/mil':>10}{'$/conv':>9}{'utilidad':>11}")
    serie = {}
    for dia in DIAS:
        g, c, i = agregado(dia)
        cpm = g / i * 1000 if i else 0
        cxm = c / i * 1000 if i else 0
        pc = g / c if c else 0
        _, u = utilidad(g, c)
        serie[dia] = (g, c, i, cpm, cxm, pc)
        print(f"{dia:<12}{i:>9,}{c:>6}{cpm:>8,.0f}{cxm:>10.2f}{pc:>9,.0f}{u:>11,.0f}")
    return serie


def bloque_2_descomposicion(serie):
    print()
    print("=" * 78)
    print("2. LA DESCOMPOSICION:  $/conv = CPM / conv-por-mil")
    print("=" * 78)
    gb = sum(serie[d][0] for d in BASE)
    cb = sum(serie[d][1] for d in BASE)
    ib = sum(serie[d][2] for d in BASE)
    cpm0, cxm0 = gb / ib * 1000, cb / ib * 1000
    pc0 = cpm0 / cxm0
    _, _, _, cpm1, cxm1, pc1 = serie["2026-09-14"]

    print(f"  BASE (6-11 sep) : CPM ${cpm0:>7,.0f} | conv/mil {cxm0:>5.2f} | $/conv ${pc0:>6,.0f}")
    print(f"  LUNES 14-sep    : CPM ${cpm1:>7,.0f} | conv/mil {cxm1:>5.2f} | $/conv ${pc1:>6,.0f}")

    f_cpm = cpm1 / cpm0          # cuanto multiplico el precio
    f_cxm = cxm0 / cxm1          # cuanto multiplico la caida de calidad
    print()
    print(f"  factor por CPM      x{f_cpm:.2f}   <- la SUBASTA (Amor y Amistad)")
    print(f"  factor por conv/mil x{f_cxm:.2f}   <- la AUDIENCIA (NO es Amor y Amistad)")
    print(f"  producto            x{f_cpm * f_cxm:.2f}   (alza real x{pc1 / pc0:.2f})  <- verificacion")

    peso_cpm = (f_cpm - 1) / ((f_cpm - 1) + (f_cxm - 1)) * 100
    print()
    print(f"  >>> LA SUBASTA EXPLICA EL {peso_cpm:.0f}% Y LA AUDIENCIA EL {100 - peso_cpm:.0f}% <<<")
    print()
    print("  CONTRAEJEMPLO QUE MATA 'ES TODO AMOR Y AMISTAD':")
    for d in ("2026-09-13", "2026-09-14"):
        _, _, _, cpm, cxm, pc = serie[d]
        print(f"    {d}: CPM ${cpm:>7,.0f} | conv/mil {cxm:>5.2f} | $/conv ${pc:>6,.0f}")
    print("    El domingo pago un CPM MAS CARO y cerro MUCHO mejor. El precio no fue la causa.")


def bloque_3_por_conjunto():
    print()
    print("=" * 78)
    print("3. ¿FUE UNIFORME? (esto corrige 0-AO)")
    print("=" * 78)
    dias = ["2026-09-08", "2026-09-11", "2026-09-12", "2026-09-13", "2026-09-14"]
    D = {}
    for dia in dias:
        for f in por_conjunto(dia):
            i = int(f.get("impressions") or 0)
            if i < 300:                       # menos de 300 impresiones no es dato
                continue
            g, c = float(f.get("spend") or 0), conversaciones(f)
            D.setdefault(f.get("adset_name"), {})[dia] = (g / i * 1000, c / i * 1000, g / c if c else 0)

    for titulo, idx in (("CPM (el precio: sube para TODOS = es la subasta)", 0),
                        ("conv/mil (la calidad: NO fue uniforme)", 1)):
        print(f"\n  --- {titulo} ---")
        print(f"  {'conjunto':<28}" + "".join(f"{d[5:]:>9}" for d in dias))
        for n, v in D.items():
            fmt = ",.0f" if idx == 0 else ".2f"
            print(f"  {n[:27]:<28}" + "".join(
                f"{v[d][idx]:>9{fmt}}" if d in v else f"{'-':>9}" for d in dias))

    print("\n  --- $/conv del lunes 14 por conjunto (quien compra barato y quien caro) ---")
    print(f"  {'conjunto':<28}{'$/conv':>9}{'CPM':>9}{'conv/mil':>10}")
    ultimo = [(n, v["2026-09-14"]) for n, v in D.items() if "2026-09-14" in v]
    for n, (cpm, cxm, pc) in sorted(ultimo, key=lambda x: x[1][2]):
        print(f"  {n[:27]:<28}{pc:>9,.0f}{cpm:>9,.0f}{cxm:>10.2f}")
    print("\n  Motorizados pago el CPM MAS CARO y trajo las conversaciones MAS BARATAS.")
    print("  El mercado estaba igual de malo para el. El problema no es el mercado.")


def bloque_4_cierre_del_lunes():
    print()
    print("=" * 78)
    print("4. CIERRE DEL LUNES 14, POR PRODUCTO (cada uno contra SU equilibrio)")
    print("=" * 78)
    for etiqueta, es_colmena, eq in (("TRADICIONAL", False, EQ_TRADICIONAL),
                                     ("COLMENA    ", True, EQ_COLMENA)):
        g, c, _ = agregado("2026-09-14", solo_colmena=es_colmena)
        if not c:
            continue
        pc = g / c
        estado = "🟢" if pc / eq < 0.75 else ("🟡" if pc < eq else "🔴 PIERDE")
        print(f"  {etiqueta}: ${g:>9,.0f} / {c:>3} conv = ${pc:>6,.0f}/conv"
              f" | equilibrio ${eq:,} = {pc / eq * 100:>3.0f}% {estado}")
        if not es_colmena:
            print(f"               CPA implicito: ${pc / CIERRE:,.0f}/pedido")
    gt, ct, _ = agregado("2026-09-14")
    gc, cc, _ = agregado("2026-09-14", solo_colmena=True)
    print(f"\n  GASTO TOTAL DEL DIA: ${gt + gc:,.0f} sobre presupuesto de $170.000"
          f" = {(gt + gc) / 170000 * 100:.0f}% de sobre-entrega")
    print("  (0-AS habia predicho 124-139%. Se paso del techo.)")


def bloque_5_proyeccion_q4(serie):
    print()
    print("=" * 78)
    print("5. PROYECCION Q4: el mismo evento gana o pierde segun el conv/mil")
    print("=" * 78)
    gb = sum(serie[d][0] for d in BASE)
    ib = sum(serie[d][2] for d in BASE)
    cb = sum(serie[d][1] for d in BASE)
    cpm0, cxm_sano = gb / ib * 1000, cb / ib * 1000
    cxm_malo = serie["2026-09-14"][4]

    escenarios = [
        ("hoy, sin evento", 1.00),
        ("Amor y Amistad (MEDIDO en la cuenta)", 1.41),
        ("Black Friday, rango bajo (+50%)", 1.50),
        ("Black Friday, rango alto (+80%)", 1.80),
        ("Cyber Monday (+138%)", 2.38),
    ]
    print(f"  CPM base ${cpm0:,.0f} | conv/mil sano {cxm_sano:.2f} | conv/mil del 14 {cxm_malo:.2f}"
          f" | equilibrio ${EQ_TRADICIONAL:,}\n")
    print(f"  {'escenario':<38}{'CPM':>8}{'$/conv sano':>13}{'$/conv malo':>13}")
    for n, m in escenarios:
        cpm = cpm0 * m
        a, b = cpm / cxm_sano, cpm / cxm_malo
        print(f"  {n:<38}{cpm:>8,.0f}{a:>12,.0f}{'🔴' if a > EQ_TRADICIONAL else ' '}"
              f"{b:>12,.0f}{'🔴' if b > EQ_TRADICIONAL else ' '}")

    print(f"\n  --- utilidad por cada 100 conversaciones ---")
    print(f"  {'escenario':<38}{'audiencia sana':>16}{'audiencia del 14':>18}")
    bruto = 100 * CIERRE * UDS_POR_PEDIDO * MARGEN_UD
    for n, m in escenarios:
        cpm = cpm0 * m
        ua = bruto - 100 * (cpm / cxm_sano)
        ub = bruto - 100 * (cpm / cxm_malo)
        print(f"  {n:<38}{ua:>16,.0f}{ub:>18,.0f}")
    print("\n  >>> El Cyber Monday GANA o PIERDE ~$60.000 por cada 100 conversaciones")
    print("      segun el conv/mil. No depende de Meta ni de la fecha: depende del rebalanceo. <<<")
    print("\n  ⚠️ Los multiplicadores de Black Friday/Cyber Monday son referencias de industria,")
    print("     NO medidos en esta cuenta. El unico propio es el x1,41 de Amor y Amistad.")


def main():
    if not os.environ.get("META_ADS_TOKEN", "").strip() and not os.path.exists(lector.TOKEN_FILE):
        sys.exit("FALTA EL TOKEN. Ver seccion 4-B. No inventar metricas.")
    serie = bloque_1_serie_diaria()
    bloque_2_descomposicion(serie)
    bloque_3_por_conjunto()
    bloque_4_cierre_del_lunes()
    bloque_5_proyeccion_q4(serie)
    print()


if __name__ == "__main__":
    main()
