"""
DETALLE DE META ADS POR CAMPANA / CONJUNTO / ANUNCIO — SOLO LECTURA.

REGLA 4-B: este script NO PUEDE ESCRIBIR EN META. Reusa `meta-api-lectura.py`,
cuya unica funcion de red es un GET; no hay una sola linea capaz de hacer POST,
PUT o DELETE, asi que no puede tocar una campana, un anuncio, un conjunto, un
presupuesto ni una configuracion ni con un error de codigo. El permiso que
necesita es `ads_read`; `ads_management` no se usa en ningun punto.

══════════════════════════════════════════════════════════════════════════════
POR QUE EXISTE
══════════════════════════════════════════════════════════════════════════════
El dueno (5-oct) pidio el gasto real desglosado por campana, conjunto Y ANUNCIO,
con ad_id, nombre, gasto, conversaciones y costo por conversacion, para
22-sep a 5-oct y en especial 29-sep a 5-oct.

`estado-cuenta.py` no podia darlo, y no por una falla: consulta `level=adset` y
nunca `level=ad`. Se verifico: la cadena "ad_id" aparece CERO veces tanto en el
script como en ESTADO-CUENTA.md. Tampoco agrupa por campana, y su detalle por
conjunto arranca el 30-sep. O sea que el dato no estaba publicado porque nunca
se habia pedido a la API, no porque el informe se estuviera quedando viejo.

Este script no reemplaza a ese informe ni le cambia nada: es un volcado aparte,
en su propio archivo.

USO
  export META_ADS_TOKEN='EAA...'
  python3 analisis/detalle-meta.py [desde] [hasta]
  python3 analisis/detalle-meta.py 2026-09-22 2026-10-05
"""

import datetime as dt
import importlib.util
import json
import os
import sys

BASE = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(BASE)
SALIDA = os.path.join(RAIZ, "DETALLE-META.md")

ACT = "act_4330882710457791"

_spec = importlib.util.spec_from_file_location("lector", os.path.join(BASE, "meta-api-lectura.py"))
lector = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(lector)


def ahora_bogota():
    return dt.datetime.now(dt.timezone.utc) - dt.timedelta(hours=5)


def conv_de(fila):
    """Conversaciones de WhatsApp iniciadas. Es la accion que mide este negocio."""
    return sum(
        int(float(a.get("value", 0)))
        for a in (fila.get("actions") or [])
        if "messaging_conversation_started" in a.get("action_type", "")
    )


def insights(nivel, desde, hasta, por_dia=False):
    """
    Trae insights con PAGINACION DE VERDAD.

    🔑 Paginar importa acá y no en los otros informes: a nivel de anuncio y con
    14 dias, la cuenta pasa facil de 100 filas. `cpa-por-producto.py` solo avisa
    si Meta pagino; este sigue el cursor, porque un volcado incompleto que no se
    note es peor que no tener el volcado.
    """
    campos = {
        "campaign": "campaign_id,campaign_name,spend,impressions,actions",
        "adset": "campaign_name,adset_id,adset_name,spend,impressions,actions",
        "ad": "campaign_name,adset_name,ad_id,ad_name,spend,impressions,actions",
        "account": "spend,impressions,actions",
    }[nivel]
    params = {
        "level": nivel,
        "fields": campos,
        "time_range": json.dumps({"since": desde, "until": hasta}),
        "limit": 200,
    }
    if por_dia:
        params["time_increment"] = 1

    filas, vueltas = [], 0
    while True:
        d = lector.get(f"{ACT}/insights", params)
        filas.extend(d.get("data", []))
        cursores = (d.get("paging") or {}).get("cursors") or {}
        siguiente = (d.get("paging") or {}).get("next")
        if not siguiente or not cursores.get("after"):
            break
        params = dict(params, after=cursores["after"])
        vueltas += 1
        if vueltas > 20:   # candado: nunca un bucle infinito contra la API
            print("⚠️  corte la paginacion a las 20 vueltas", file=sys.stderr)
            break
    return filas


def agrupar(filas, clave_id, clave_nombre):
    """Suma gasto, impresiones y conversaciones por entidad."""
    acc = {}
    for f in filas:
        k = f.get(clave_id) or f.get(clave_nombre) or "(sin id)"
        a = acc.setdefault(k, {
            "id": f.get(clave_id) or "",
            "nombre": f.get(clave_nombre) or "",
            "campana": f.get("campaign_name") or "",
            "conjunto": f.get("adset_name") or "",
            "gasto": 0.0, "impresiones": 0, "conv": 0,
        })
        a["gasto"] += float(f.get("spend") or 0)
        a["impresiones"] += int(f.get("impressions") or 0)
        a["conv"] += conv_de(f)
    return sorted(acc.values(), key=lambda x: -x["gasto"])


def esc(s):
    """Los nombres traen '|' y eso rompe las columnas de una tabla markdown."""
    return (s or "").replace("|", "\\|")


def fila_md(x, con_id=True):
    cxc = x["gasto"] / x["conv"] if x["conv"] else 0
    pref = f"| `{x['id']}` " if con_id else "| "
    return (
        f"{pref}| {esc(x['nombre'])} | ${x['gasto']:,.0f} | {x['impresiones']:,} | "
        f"{x['conv']} | ${cxc:,.0f} |"
    )


def bloque(L, titulo, desde, hasta):
    L.append(f"## {titulo}")
    L.append("")
    L.append(f"*Ventana `{desde}` a `{hasta}`.*")
    L.append("")

    total = {"gasto": 0.0, "impresiones": 0, "conv": 0}
    for nivel, etq, clave_id, clave_nombre in [
        ("campaign", "Por campaña", "campaign_id", "campaign_name"),
        ("adset", "Por conjunto de anuncios", "adset_id", "adset_name"),
        ("ad", "Por anuncio", "ad_id", "ad_name"),
    ]:
        filas = insights(nivel, desde, hasta)
        grupos = agrupar(filas, clave_id, clave_nombre)
        L.append(f"### {etq}")
        L.append("")
        if not grupos:
            L.append("*(Meta no devolvio datos para esta ventana en este nivel.)*")
            L.append("")
            continue
        if nivel == "ad":
            L.append("| ad_id | anuncio | conjunto | campaña | gasto | impresiones | conv | $/conv |")
            L.append("|---|---|---|---|---|---|---|---|")
            for x in grupos:
                cxc = x["gasto"] / x["conv"] if x["conv"] else 0
                L.append(
                    f"| `{x['id']}` | {esc(x['nombre'])} | {esc(x['conjunto'])} | "
                    f"{esc(x['campana'])} | ${x['gasto']:,.0f} | {x['impresiones']:,} | "
                    f"{x['conv']} | ${cxc:,.0f} |"
                )
        else:
            L.append(f"| {'campaign_id' if nivel == 'campaign' else 'adset_id'} | nombre | gasto | impresiones | conv | $/conv |")
            L.append("|---|---|---|---|---|---|")
            for x in grupos:
                L.append(fila_md(x))
        L.append("")
        if nivel == "campaign":
            for k in total:
                total[k] = sum(x[k] for x in grupos)

    L.append("**Total de la ventana:** "
             f"gasto **${total['gasto']:,.0f}** · {total['impresiones']:,} impresiones · "
             f"**{total['conv']} conversaciones** · "
             f"**${(total['gasto']/total['conv'] if total['conv'] else 0):,.0f}/conv**")
    L.append("")

    # Dia por dia, a nivel cuenta: para ver donde se movio el gasto.
    porDia = insights("account", desde, hasta, por_dia=True)
    if porDia:
        L.append("### Día por día (cuenta completa)")
        L.append("")
        L.append("| día | gasto | impresiones | conv | $/conv |")
        L.append("|---|---|---|---|---|")
        for f in sorted(porDia, key=lambda x: x.get("date_start") or ""):
            g = float(f.get("spend") or 0)
            c = conv_de(f)
            L.append(
                f"| {f.get('date_start')} | ${g:,.0f} | {int(f.get('impressions') or 0):,} | "
                f"{c} | ${(g/c if c else 0):,.0f} |"
            )
        L.append("")


def construir(desde, hasta):
    L = []
    L.append("# 📋 Detalle de Meta Ads — campaña / conjunto / anuncio")
    L.append("")
    L.append(f"> **Lectura: {ahora_bogota().strftime('%Y-%m-%d %H:%M')} Bogotá.** "
             f"Generado por `analisis/detalle-meta.py`.")
    L.append("> **🔒 SOLO LECTURA.** Reusa el lector GET del repo: no puede modificar una "
             "campaña, un anuncio, un conjunto, un presupuesto ni una configuración. "
             "Permiso usado: `ads_read`. **`ads_management` no se usa.**")
    L.append("")
    L.append("⚠️ **El último día puede estar abierto.** Si la ventana incluye hoy, ese día "
             "trae el gasto parcial hasta la hora de la lectura, no el cierre.")
    L.append("")
    L.append("ℹ️ `conv` = conversaciones de WhatsApp iniciadas "
             "(`messaging_conversation_started`), que es la acción que mide este negocio.")
    L.append("")

    # La ventana corta primero: es la que el dueno pidio "especialmente".
    corta_desde = "2026-09-29"
    if desde <= corta_desde <= hasta:
        bloque(L, "🎯 29-sep a 5-oct (la ventana pedida en especial)", corta_desde, hasta)
        L.append("---")
        L.append("")
    bloque(L, f"📅 {desde} a {hasta} (ventana completa)", desde, hasta)

    L.append("---")
    L.append("")
    L.append("## 🔒 Qué NO hace este script")
    L.append("")
    L.append("| | |")
    L.append("|---|---|")
    L.append("| ✅ solo lee | la única función de red es un `GET` de `meta-api-lectura.py` |")
    L.append("| ❌ no escribe en Meta | no hay `POST`, `PUT` ni `DELETE` en ninguna línea |")
    L.append("| ❌ no toca el bot | no lee ni escribe nada de `bot/` |")
    L.append("| ❌ no cambia datos históricos | solo agrega este archivo |")
    L.append("")
    L.append(f"*Cuenta `{ACT}` · COP · America/Bogota*")
    return "\n".join(L) + "\n"


def main():
    hoy = ahora_bogota().date()
    desde = sys.argv[1] if len(sys.argv) > 1 else "2026-09-22"
    hasta = sys.argv[2] if len(sys.argv) > 2 else hoy.isoformat()
    try:
        texto = construir(desde, hasta)
    except SystemExit:
        raise
    except Exception:
        print("FALLO construyendo el detalle:", file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)
    with open(SALIDA, "w", encoding="utf-8") as f:
        f.write(texto)
    print(f"escrito {SALIDA} ({len(texto)} bytes)")
    with open("/tmp/detalle-resumen.txt", "w", encoding="utf-8") as g:
        g.write(f"Detalle Meta por campana/conjunto/anuncio · {desde} a {hasta}")


if __name__ == "__main__":
    main()
