#!/usr/bin/env python3
"""
ESTADO DE LA CUENTA — generador del ESTADO-CUENTA.md
=====================================================
Lee Meta Ads y escribe ESTADO-CUENTA.md en la raiz del repo, para poder ver
los numeros desde el celular sin entrar a Kiro ni a Ads Manager.

Lo corre el GitHub Action .github/workflows/estado-cuenta.yml cuatro veces al
dia (07:00, 13:00, 17:00 y 23:00 Bogota) y tambien a mano desde la app de GitHub.

REGLA 4-B: SOLO LECTURA. Este script solo hace GET, igual que meta-api-lectura.py.
No puede mover un presupuesto ni pausar nada aunque quisiera: el token no tiene
el permiso `ads_management`.

EL TOKEN NUNCA SE IMPRIME NI SE ESCRIBE EN EL ARCHIVO DE SALIDA.
"""

import datetime as dt
import importlib.util
import json
import os
import sys
import traceback

BASE = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(BASE)
SALIDA = os.path.join(RAIZ, "ESTADO-CUENTA.md")

ACT = "act_4330882710457791"
COLMENA = {"Publico ABIERTO video", "Publico ABIERTO - Creativo", "Domiciliarios | Colmena"}

EQ_TRAD = 2402          # equilibrio del tradicional, $/conversacion
EQ_COLMENA = 3322       # equilibrio del colmena (error #12: cada SKU su umbral)
MARGEN_UD = 23244       # margen por unidad medido en 39 unidades (0-AX)
UDS_PEDIDO = 1.3
CIERRE = 0.084
TASA_DEV = 0.19
COSTO_DEV = 33648
PEOR_DIA = 1.43         # el dia peor gasto 143% del presupuesto (0-BH)
UMBRAL_FRENO = 20000    # Meta deja de entregar bajo ~$16.000-20.000 (0-AN)

_spec = importlib.util.spec_from_file_location("lector", os.path.join(BASE, "meta-api-lectura.py"))
lector = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(lector)


def ahora_bogota():
    return dt.datetime.now(dt.timezone.utc) - dt.timedelta(hours=5)


def esc(nombre):
    """Los nombres de conjunto traen '|' (ej: 'Domiciliarios | Santander') y eso
    rompe las columnas de una tabla markdown. Hay que escaparlo."""
    return (nombre or "").replace("|", "\\|")


def conv(fila):
    return sum(
        int(float(a.get("value", 0)))
        for a in (fila.get("actions") or [])
        if "messaging_conversation_started" in a.get("action_type", "")
    )


def por_conjunto(dia):
    d = lector.get(
        f"{ACT}/insights",
        {"level": "adset", "fields": "adset_name,spend,impressions,actions",
         "time_range": json.dumps({"since": dia, "until": dia}), "limit": 200},
    )
    return d.get("data", [])


def tramo(dia, hasta_hora):
    """Gasto/conv/impresiones del tradicional en 00:00..hasta_hora:59."""
    d = lector.get(
        f"{ACT}/insights",
        {"level": "adset", "fields": "adset_name,spend,impressions,actions",
         "breakdowns": "hourly_stats_aggregated_by_advertiser_time_zone",
         "time_range": json.dumps({"since": dia, "until": dia}), "limit": 500},
    )
    g = c = i = 0
    for f in d.get("data", []):
        if f.get("adset_name") in COLMENA:
            continue
        if int(f["hourly_stats_aggregated_by_advertiser_time_zone"][:2]) > hasta_hora:
            continue
        g += float(f.get("spend") or 0)
        c += conv(f)
        i += int(f.get("impressions") or 0)
    return g, c, i


def curva_horaria(dia):
    d = lector.get(
        f"{ACT}/insights",
        {"level": "account", "fields": "spend",
         "breakdowns": "hourly_stats_aggregated_by_advertiser_time_zone",
         "time_range": json.dumps({"since": dia, "until": dia}), "limit": 50},
    )
    return {int(f["hourly_stats_aggregated_by_advertiser_time_zone"][:2]): float(f.get("spend") or 0)
            for f in d.get("data", [])}


def utilidad(gasto, convs):
    ped = convs * CIERRE
    return ped * UDS_PEDIDO * MARGEN_UD - gasto - ped * TASA_DEV * COSTO_DEV


def presupuesto_activo():
    d = lector.get(f"{ACT}/adsets", {"fields": "name,effective_status,daily_budget", "limit": 100})
    filas = [(x.get("name", ""), int(x.get("daily_budget") or 0))
             for x in d.get("data", []) if x.get("effective_status") == "ACTIVE"]
    return sum(p for _, p in filas), filas


def construir():
    L = []
    hoy_dt = ahora_bogota()
    hoy = hoy_dt.strftime("%Y-%m-%d")
    hora = hoy_dt.hour

    # ---------- saldo ----------
    cta = lector.get(ACT, {"fields": "spend_cap,amount_spent,account_status"})
    sc = float(cta.get("spend_cap") or 0)
    am = float(cta.get("amount_spent") or 0)
    saldo = sc - am
    activo = cta.get("account_status") == 1 or str(cta.get("account_status")) == "1"

    presu, conjuntos = presupuesto_activo()

    # ---------- hoy, hora por hora ----------
    H = curva_horaria(hoy)
    gastado = sum(H.values())
    ult = max(H) if H else 0

    # perfil de los 2 dias anteriores para proyectar lo que falta
    prev = []
    for k in (1, 2):
        d = (hoy_dt - dt.timedelta(days=k)).strftime("%Y-%m-%d")
        c = curva_horaria(d)
        if c:
            prev.append(c)
    falta = 0.0
    freno = None
    if prev:
        acum = 0.0
        for h in range(ult + 1, 24):
            g = sum(c.get(h, 0) for c in prev) / len(prev)
            acum += g
            if freno is None and saldo - acum <= UMBRAL_FRENO:
                freno = h
        falta = acum
    cierre_proy = gastado + falta
    saldo_medianoche = saldo - falta

    objetivo = presu * PEOR_DIA + UMBRAL_FRENO
    disponible_hoy = saldo + gastado
    recargar = max(0, objetivo - disponible_hoy)

    # ---------- encabezado ----------
    L.append("# 📊 Estado de la cuenta — BikerPro")
    L.append("")
    L.append(f"> **Última lectura: {hoy_dt.strftime('%Y-%m-%d %H:%M')} Bogotá.** "
             f"Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.")
    L.append("> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.")
    L.append("")
    L.append("---")
    L.append("")

    # ---------- alerta de caja, primero porque es lo unico con hora de vencimiento ----------
    L.append("## 💰 Caja")
    L.append("")
    L.append("| | |")
    L.append("|---|---|")
    L.append(f"| **saldo ahora** | **${saldo:,.0f}** |")
    L.append(f"| gastado hoy (hasta las {ult}h) | ${gastado:,.0f} |")
    L.append(f"| presupuesto activo | ${presu:,.0f}/día |")
    if prev:
        L.append(f"| cierre proyectado del día | ${cierre_proy:,.0f} |")
        L.append(f"| saldo proyectado a medianoche | ${saldo_medianoche:,.0f} |")
    L.append(f"| objetivo (cubrir un día de {PEOR_DIA*100:.0f}% + colchón) | ${objetivo:,.0f} |")
    L.append("")
    if not activo:
        L.append(f"### ⛔ LA CUENTA NO ESTÁ ACTIVA (`account_status={cta.get('account_status')}`)")
    elif recargar > 0 and freno is not None:
        L.append(f"### 🔴 RECARGAR ${recargar:,.0f} — entra en zona de freno a las {freno}:00")
        L.append("")
        L.append("Las 18h a 23h son el bloque donde las conversaciones se abaratan. "
                 "Quedarse sin saldo ahí es la fuga más cara que tiene la operación.")
    elif recargar > 0:
        L.append(f"### 🟠 Recargar ${recargar:,.0f} para cubrir un día malo")
        L.append("")
        L.append("Hoy aguanta, pero no cubre un día de sobre-entrega alta.")
    else:
        L.append("### 🟢 Saldo suficiente. No hace falta recargar.")
    L.append("")
    L.append("⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco "
             "dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.")
    L.append("")
    L.append("---")
    L.append("")

    # ---------- hoy vs dias anteriores, mismo tramo ----------
    L.append(f"## 📈 Hoy contra los días anteriores — mismo tramo 00:00–{ult}:59")
    L.append("")
    L.append("*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*")
    L.append("")
    L.append("| día | gasto | conv | $/conv | CPM | conv/mil |")
    L.append("|---|---|---|---|---|---|")
    serie = []
    for k in range(4, -1, -1):
        d = (hoy_dt - dt.timedelta(days=k)).strftime("%Y-%m-%d")
        g, c, i = tramo(d, ult)
        if not c:
            continue
        serie.append((d, g, c, g / c, g / i * 1000 if i else 0, c / i * 1000 if i else 0))
        marca = " **HOY**" if k == 0 else ""
        L.append(f"| {d}{marca} | ${g:,.0f} | {c} | **${g/c:,.0f}** | ${g/i*1000 if i else 0:,.0f} | "
                 f"{c/i*1000 if i else 0:.2f} |")
    L.append("")
    if len(serie) >= 2:
        hoy_pc = serie[-1][3]
        ayer_pc = serie[-2][3]
        if hoy_pc < ayer_pc:
            L.append(f"🟢 **Hoy va mejor que ayer a la misma hora** (${hoy_pc:,.0f} vs ${ayer_pc:,.0f}).")
        else:
            L.append(f"🟠 Hoy va {(hoy_pc/ayer_pc-1)*100:.0f}% más caro que ayer a la misma hora "
                     f"(${hoy_pc:,.0f} vs ${ayer_pc:,.0f}).")
        L.append("")

    # ---------- descomposicion ----------
    if serie:
        _, g, c, pc, cpm, cxm = serie[-1]
        L.append("### La descomposición — dónde está el problema")
        L.append("")
        L.append("```")
        L.append("$/conv  =  CPM  ÷  conv-por-mil")
        L.append(f"${pc:>6,.0f}  =  ${cpm:>6,.0f}  ÷  {cxm:.2f}")
        L.append("```")
        L.append("")
        L.append("| | valor | referencia sana | |")
        L.append("|---|---|---|---|")
        L.append(f"| **CPM** (el precio de la subasta) | ${cpm:,.0f} | ~$3.615 | "
                 f"{'🟢 normal' if cpm < 4200 else '🔴 alto'} |")
        L.append(f"| **conv/mil** (la calidad de la audiencia) | {cxm:.2f} | 5,33 | "
                 f"{'🟢' if cxm >= 4.5 else ('🟠' if cxm >= 3.5 else '🔴 bajo')} |")
        L.append("")
        if cpm < 4200 and cxm < 3.5:
            L.append("🔑 **El CPM está normal y el conv/mil bajo: todo el problema es AUDIENCIA, "
                     "no precio.** Esperar no lo arregla — hace falta público nuevo "
                     "(el lookalike de compradores es la jugada pendiente).")
        elif cpm >= 4200:
            L.append("🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). "
                     "Antes de culpar a la cuenta, mirar el calendario.")
        L.append("")
    L.append("---")
    L.append("")

    # ---------- por conjunto ----------
    L.append("## 🎯 Por conjunto, hoy")
    L.append("")
    presu_map = dict(conjuntos)
    filas = por_conjunto(hoy)
    L.append("| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |")
    L.append("|---|---|---|---|---|---|---|")
    for f in sorted(filas, key=lambda x: -float(x.get("spend") or 0)):
        n = f.get("adset_name", "")
        g = float(f.get("spend") or 0)
        c = conv(f)
        i = int(f.get("impressions") or 0)
        p = presu_map.get(n, 0)
        L.append(f"| {esc(n)} | ${p:,.0f} | ${g:,.0f} | {f'{g/p*100:.0f}%' if p else '—'} | {c} | "
                 f"{f'${g/c:,.0f}' if c else '—'} | {c/i*1000 if i else 0:.2f} |")
    L.append("")

    # ---------- cada producto contra SU equilibrio ----------
    gt = ct = 0
    gc = cc = 0
    for f in filas:
        g = float(f.get("spend") or 0)
        c = conv(f)
        if f.get("adset_name") in COLMENA:
            gc += g; cc += c
        else:
            gt += g; ct += c
    L.append("### Cada producto contra SU propio equilibrio")
    L.append("")
    L.append("*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*")
    L.append("")
    L.append("| producto | gasto | conv | $/conv | su equilibrio | |")
    L.append("|---|---|---|---|---|---|")
    if ct:
        pct = gt / ct / EQ_TRAD
        L.append(f"| **TRADICIONAL** | ${gt:,.0f} | {ct} | **${gt/ct:,.0f}** | ${EQ_TRAD:,} | "
                 f"**{pct*100:.0f}%** {'🟢' if pct < 0.75 else ('🟠' if pct < 1 else '🔴 PIERDE')} |")
    if cc:
        pcc = gc / cc / EQ_COLMENA
        L.append(f"| **COLMENA** | ${gc:,.0f} | {cc} | **${gc/cc:,.0f}** | ${EQ_COLMENA:,} | "
                 f"**{pcc*100:.0f}%** {'🟢' if pcc < 0.75 else ('🟠' if pcc < 1 else '🔴 PIERDE')} |")
    L.append("")
    if ct:
        L.append(f"| | |")
        L.append(f"|---|---|")
        L.append(f"| CPA implícito (cierre {CIERRE*100:.1f}%) | **${gt/ct/CIERRE:,.0f}**/pedido |")
        L.append(f"| utilidad estimada de lo que va del día | **${utilidad(gt, ct):,.0f}** |")
        L.append("")
    L.append("---")
    L.append("")

    # ---------- CADA CONJUNTO POR SEPARADO, dia por dia ----------
    # El promedio de la cuenta esconde conjuntos que se rompen y conjuntos que mejoran
    # al mismo tiempo. Esto los separa. Y como los conjuntos NO comparten toda la
    # segmentacion (Expancion son 8 departamentos, los tres grandes son Bogota+Medellin),
    # cada linea se lee sola: no hay que preocuparse por "contaminacion" entre ellos.
    dias_hist = [(hoy_dt - dt.timedelta(days=k)).strftime("%Y-%m-%d") for k in range(5, -1, -1)]
    hist = {}
    for d in dias_hist:
        for f in por_conjunto(d):
            n = f.get("adset_name", "")
            g = float(f.get("spend") or 0)
            c = conv(f)
            i = int(f.get("impressions") or 0)
            hist.setdefault(n, {})[d] = (g, c, g / c if c else 0, c / i * 1000 if i else 0)

    # solo los conjuntos con gasto en los ultimos 3 dias: los pausados sin dato
    # solo agregan ruido a la tabla
    recientes = set(dias_hist[-3:])
    hist = {n: v for n, v in hist.items()
            if any(v.get(d, (0,))[0] > 100 for d in recientes)}
    orden = sorted(hist, key=lambda n: -hist[n].get(dias_hist[-1], (0,))[0])
    L.append("## 🔍 Cada conjunto por separado — la tendencia real")
    L.append("")
    L.append("*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora "
             "al mismo tiempo. Acá va cada uno solo.)*")
    L.append("")
    L.append("### $/conv por día")
    L.append("")
    L.append("| conjunto | " + " | ".join(d[5:] for d in dias_hist) + " | |")
    L.append("|---" * (len(dias_hist) + 2) + "|")
    for n in orden:
        vals = [hist[n].get(d) for d in dias_hist]
        celdas = [f"${v[2]:,.0f}" if v and v[2] else "—" for v in vals]
        # flecha: compara el ultimo dia con dato contra el anterior con dato
        con = [v[2] for v in vals if v and v[2]]
        flecha = ""
        if len(con) >= 2:
            flecha = "🟢" if con[-1] < con[-2] * 0.95 else ("🔴" if con[-1] > con[-2] * 1.15 else "🟡")
        L.append(f"| {esc(n)} | " + " | ".join(celdas) + f" | {flecha} |")
    L.append("")
    L.append("### conv/mil por día *(la calidad de la audiencia de cada uno)*")
    L.append("")
    L.append("| conjunto | " + " | ".join(d[5:] for d in dias_hist) + " | |")
    L.append("|---" * (len(dias_hist) + 2) + "|")
    for n in orden:
        vals = [hist[n].get(d) for d in dias_hist]
        celdas = [f"{v[3]:.2f}" if v and v[3] else "—" for v in vals]
        con = [v[3] for v in vals if v and v[3]]
        flecha = ""
        if len(con) >= 2:
            flecha = "🟢" if con[-1] > con[-2] * 1.05 else ("🔴" if con[-1] < con[-2] * 0.85 else "🟡")
        L.append(f"| {esc(n)} | " + " | ".join(celdas) + f" | {flecha} |")
    L.append("")
    L.append("🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta "
             "contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). "
             "Eso es canibalización, y se arregla diferenciando la segmentación.")
    L.append("")
    L.append("---")
    L.append("")

    # ---------- ultimos dias cerrados ----------
    L.append("## 📅 Los últimos días cerrados")
    L.append("")
    L.append("| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |")
    L.append("|---|---|---|---|---|---|---|")
    for k in range(6, 0, -1):
        d = (hoy_dt - dt.timedelta(days=k)).strftime("%Y-%m-%d")
        g = c = i = 0
        for f in por_conjunto(d):
            if f.get("adset_name") in COLMENA:
                continue
            g += float(f.get("spend") or 0)
            c += conv(f)
            i += int(f.get("impressions") or 0)
        if not c:
            continue
        L.append(f"| {d} | ${g:,.0f} | {c} | ${g/c:,.0f} | ${g/i*1000 if i else 0:,.0f} | "
                 f"{c/i*1000 if i else 0:.2f} | ${utilidad(g, c):,.0f} |")
    L.append("")
    L.append("---")
    L.append("")
    L.append("## ⚠️ Lo que este archivo NO hace")
    L.append("")
    L.append("| | |")
    L.append("|---|---|")
    L.append("| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |")
    L.append("| ❌ no decide | los umbrales son referencias, no órdenes |")
    L.append("| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |")
    L.append("")
    L.append(f"*Cuenta `{ACT}` · BikerPro · COP · America/Bogota*")
    return "\n".join(L) + "\n"


def resumen_una_linea():
    """Linea corta para el mensaje del commit: asi la lista de commits del repo
    se lee como una bitacora horaria sin tener que abrir el archivo."""
    try:
        hoy_dt = ahora_bogota()
        hoy = hoy_dt.strftime("%Y-%m-%d")
        cta = lector.get(ACT, {"fields": "spend_cap,amount_spent"})
        saldo = float(cta.get("spend_cap") or 0) - float(cta.get("amount_spent") or 0)
        g = c = 0
        for f in por_conjunto(hoy):
            if f.get("adset_name") in COLMENA:
                continue
            g += float(f.get("spend") or 0)
            c += conv(f)
        pc = f"${g/c:,.0f}/conv" if c else "sin conv"
        alerta = " 🔴RECARGAR" if saldo < 60000 else ""
        return (f"Estado {hoy_dt.strftime('%d-%b %H:%M')} · {pc} · "
                f"gasto ${g:,.0f} · saldo ${saldo:,.0f}{alerta}")
    except Exception:
        return f"Estado {ahora_bogota().strftime('%d-%b %H:%M')} Bogota"


def main():
    try:
        texto = construir()
    except SystemExit as e:
        texto = ("# 📊 Estado de la cuenta — BikerPro\n\n"
                 f"> ⛔ **No se pudo leer la cuenta** ({ahora_bogota():%Y-%m-%d %H:%M} Bogotá).\n\n"
                 f"```\n{e}\n```\n\n"
                 "Suele ser el secreto `META_ADS_TOKEN` vencido o sin el permiso `ads_read`.\n"
                 "Se regenera en https://business.facebook.com/settings/system-users\n")
    except Exception:
        texto = ("# 📊 Estado de la cuenta — BikerPro\n\n"
                 f"> ⛔ **Error leyendo la cuenta** ({ahora_bogota():%Y-%m-%d %H:%M} Bogotá).\n\n"
                 f"```\n{traceback.format_exc()[-1500:]}\n```\n")
    with open(SALIDA, "w", encoding="utf-8") as f:
        f.write(texto)
    # el workflow usa esta linea como mensaje del commit
    try:
        with open("/tmp/estado-resumen.txt", "w", encoding="utf-8") as f:
            f.write(resumen_una_linea())
    except OSError:
        pass
    print(f"escrito {SALIDA} ({len(texto)} bytes)")


if __name__ == "__main__":
    main()
