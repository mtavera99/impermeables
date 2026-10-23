# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-23 03:03 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$295,866** |
| gastado hoy (hasta las 2h) | $5,249 |
| presupuesto activo | $335,000/día |
| cierre proyectado del día | $325,558 |
| saldo proyectado a medianoche | $-24,442 |
| objetivo (cubrir un día de 143% + colchón) | $499,050 |

### 🔴 RECARGAR $197,935 — entra en zona de freno a las 20:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–2:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-19 | $11,829 | 26 | **$455** | $3,054 | 6.71 |
| 2026-10-20 | $5,372 | 18 | **$298** | $3,364 | 11.27 |
| 2026-10-21 | $10,585 | 28 | **$378** | $4,005 | 10.59 |
| 2026-10-22 | $6,397 | 19 | **$337** | $4,127 | 12.26 |
| 2026-10-23 **HOY** | $5,249 | 16 | **$328** | $3,798 | 11.58 |

🟢 **Hoy va mejor que ayer a la misma hora** ($328 vs $337).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   328  =  $ 3,798  ÷  11.58
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,798 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 11.58 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios INTER - API | $25,000 | $625 | 2% | 3 | $208 | 14.78 |
| Domiciliarios - Expancion - Q58 | $20,000 | $604 | 3% | 1 | $604 | 8.06 |
| Domiciliarios - Expancion - INTER | $25,000 | $600 | 2% | 2 | $300 | 12.35 |
| Domiciliarios - Expancion - API | $40,000 | $526 | 1% | 0 | — | 0.00 |
| Motorizados - API | $20,000 | $495 | 2% | 1 | $495 | 9.43 |
| Motorizados - Q58 | $20,000 | $459 | 2% | 0 | — | 0.00 |
| Motorizados - INTER | $25,000 | $393 | 2% | 2 | $196 | 37.04 |
| Domiciliarios - API | $35,000 | $391 | 1% | 2 | $196 | 21.98 |
| Domiciliarios VIDEO - API | $20,000 | $346 | 2% | 1 | $346 | 10.00 |
| Domiciliarios VIDEO INTER - API | $25,000 | $318 | 1% | 0 | — | 0.00 |
| TEST Creativos - API | $30,000 | $267 | 1% | 2 | $134 | 31.75 |
| Domiciliarios Q58 - | $25,000 | $140 | 1% | 2 | $70 | 27.40 |
| Domiciliarios VIDEO Q58 - | $25,000 | $85 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $5,249 | 16 | **$328** | $2,402 | **14%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,031**/pedido |
| utilidad estimada de lo que va del día | **$20,435** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios INTER - API | $284 | $240 | $324 | $304 | $310 | $208 | 🟢 |
| Domiciliarios - Expancion - Q58 | $751 | $1,462 | $1,121 | $1,077 | $883 | $604 | 🟢 |
| Domiciliarios - Expancion - INTER | $586 | $536 | $629 | $604 | $716 | $300 | 🟢 |
| Domiciliarios - Expancion - API | $556 | $485 | $583 | $424 | $438 | — | 🟡 |
| Motorizados - API | $419 | $579 | $470 | $446 | $372 | $495 | 🔴 |
| Motorizados - Q58 | $569 | $732 | $545 | $1,025 | $593 | — | 🟢 |
| Motorizados - INTER | $521 | $480 | $591 | $460 | $537 | $196 | 🟢 |
| Domiciliarios - API | $472 | $464 | $484 | $348 | $367 | $196 | 🟢 |
| Domiciliarios VIDEO - API | $357 | $430 | $319 | $269 | $290 | $346 | 🔴 |
| Domiciliarios VIDEO INTER - API | $430 | $534 | $576 | $701 | $738 | — | 🟡 |
| TEST Creativos - API | $504 | $475 | $609 | $535 | $377 | $134 | 🟢 |
| Domiciliarios Q58 - | $186 | $166 | $185 | $197 | $156 | $70 | 🟢 |
| Domiciliarios VIDEO Q58 - | $874 | $586 | $642 | $995 | $1,086 | — | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios INTER - API | 9.05 | 6.33 | 11.02 | 12.17 | 9.50 | 14.78 | 🟢 |
| Domiciliarios - Expancion - Q58 | 4.12 | 2.02 | 2.71 | 3.65 | 4.55 | 8.06 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.47 | 5.28 | 4.46 | 5.33 | 4.23 | 12.35 | 🟢 |
| Domiciliarios - Expancion - API | 5.92 | 7.80 | 7.58 | 11.99 | 10.46 | — | 🟡 |
| Motorizados - API | 7.49 | 5.69 | 8.05 | 9.31 | 10.53 | 9.43 | 🟡 |
| Motorizados - Q58 | 5.24 | 4.15 | 5.75 | 3.32 | 5.19 | — | 🟢 |
| Motorizados - INTER | 8.33 | 8.02 | 8.76 | 13.59 | 11.22 | 37.04 | 🟢 |
| Domiciliarios - API | 7.52 | 7.58 | 9.53 | 14.10 | 12.21 | 21.98 | 🟢 |
| Domiciliarios VIDEO - API | 7.95 | 6.55 | 11.78 | 14.69 | 11.04 | 10.00 | 🟡 |
| Domiciliarios VIDEO INTER - API | 7.70 | 6.43 | 7.46 | 5.98 | 5.55 | — | 🟡 |
| TEST Creativos - API | 7.79 | 9.85 | 8.80 | 11.03 | 14.36 | 31.75 | 🟢 |
| Domiciliarios Q58 - | 13.92 | 13.71 | 13.11 | 11.07 | 13.10 | 27.40 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.07 | 5.02 | 3.62 | 3.19 | 2.97 | — | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $314,198 | 759 | $414 | $3,704 | 8.95 | $904,190 |

---

## 🔢 Con qué números se calculó lo de arriba

*(Van impresos a propósito: el 5-oct tres de estos estaban viejos y este informe sobreestimaba la utilidad del día en un 78% sin que se notara.)*

| supuesto | valor | medido en |
|---|---|---|
| cierre (pedidos / conversaciones) | **5.44%** | 188 pedidos / 3.454 conv · 6 días cerrados al 4-oct |
| tasa de devolución | **22.8%** | 386 guías, corte 30-sep (IC 16,8–30,2%) |
| costo de una devolución | **$3,109** | solo la prima del seguro — regla 0-AY |
| margen por unidad | $23,244 | 39 unidades (0-AX) |
| unidades por pedido | 1.3 | |

⚠️ **El margen y las unidades son los del impermeable.** Con dos productos vendiendo mitad y mitad, un solo margen promedia cosas distintas: el CPA y la utilidad de cada producto están en [`CPA-POR-PRODUCTO.md`](CPA-POR-PRODUCTO.md), que cruza el gasto **por anuncio** contra los pedidos y no estima nada.

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
