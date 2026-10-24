# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-24 11:03 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$37,893** |
| gastado hoy (hasta las 10h) | $111,544 |
| presupuesto activo | $400,000/día |
| cierre proyectado del día | $328,617 |
| saldo proyectado a medianoche | $-179,180 |
| objetivo (cubrir un día de 143% + colchón) | $592,000 |

### 🔴 RECARGAR $442,563 — entra en zona de freno a las 12:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–10:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-20 | $85,152 | 169 | **$504** | $3,236 | 6.42 |
| 2026-10-21 | $119,310 | 263 | **$454** | $3,946 | 8.70 |
| 2026-10-22 | $102,878 | 244 | **$422** | $3,820 | 9.06 |
| 2026-10-23 | $76,658 | 158 | **$485** | $3,367 | 6.94 |
| 2026-10-24 **HOY** | $111,544 | 212 | **$526** | $3,530 | 6.71 |

🟠 Hoy va 8% más caro que ayer a la misma hora ($526 vs $485).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   526  =  $ 3,530  ÷  6.71
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,530 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.71 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $10,368 | 30% | 21 | $494 | 7.77 |
| Domiciliarios - Expancion - API | $40,000 | $10,325 | 26% | 14 | $738 | 4.85 |
| RADIO - Seguridad / Negocios | $25,000 | $9,793 | 39% | 11 | $890 | 5.20 |
| TEST Creativos - API | $30,000 | $8,846 | 29% | 22 | $402 | 8.99 |
| RADIO - Fincas | $20,000 | $7,299 | 36% | 12 | $608 | 8.33 |
| Domiciliarios - Expancion - INTER | $25,000 | $7,162 | 29% | 13 | $551 | 5.19 |
| Domiciliarios VIDEO Q58 - | $25,000 | $6,422 | 26% | 6 | $1,070 | 3.12 |
| Domiciliarios VIDEO - API | $20,000 | $6,390 | 32% | 20 | $320 | 8.23 |
| Domiciliarios Q58 - | $25,000 | $6,379 | 26% | 28 | $228 | 8.71 |
| RADIO - Moteros | $20,000 | $6,154 | 31% | 6 | $1,026 | 4.92 |
| Motorizados - API | $20,000 | $5,842 | 29% | 10 | $584 | 6.24 |
| Domiciliarios VIDEO INTER - API | $25,000 | $5,637 | 23% | 13 | $434 | 8.56 |
| Motorizados - INTER | $25,000 | $5,390 | 22% | 9 | $599 | 8.95 |
| Domiciliarios - Expancion - Q58 | $20,000 | $5,248 | 26% | 7 | $750 | 5.40 |
| Motorizados - Q58 | $20,000 | $5,186 | 26% | 10 | $519 | 5.83 |
| Domiciliarios INTER - API | $25,000 | $5,103 | 20% | 10 | $510 | 6.36 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $111,544 | 212 | **$526** | $2,402 | **22%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,672**/pedido |
| utilidad estimada de lo que va del día | **$228,770** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $464 | $484 | $348 | $370 | $416 | $494 | 🔴 |
| Domiciliarios - Expancion - API | $485 | $583 | $424 | $444 | $515 | $738 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | $890 |  |
| TEST Creativos - API | $475 | $609 | $535 | $379 | $480 | $402 | 🟢 |
| RADIO - Fincas | — | — | — | — | — | $608 |  |
| Domiciliarios - Expancion - INTER | $536 | $629 | $604 | $721 | $661 | $551 | 🟢 |
| Domiciliarios VIDEO Q58 - | $586 | $642 | $995 | $1,091 | $678 | $1,070 | 🔴 |
| Domiciliarios VIDEO - API | $430 | $319 | $269 | $292 | $337 | $320 | 🟢 |
| Domiciliarios Q58 - | $166 | $185 | $197 | $159 | $216 | $228 | 🟡 |
| RADIO - Moteros | — | — | — | — | — | $1,026 |  |
| Motorizados - API | $579 | $470 | $446 | $379 | $454 | $584 | 🔴 |
| Domiciliarios VIDEO INTER - API | $534 | $576 | $701 | $742 | $645 | $434 | 🟢 |
| Motorizados - INTER | $480 | $591 | $460 | $545 | $712 | $599 | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,462 | $1,121 | $1,077 | $892 | $1,115 | $750 | 🟢 |
| Motorizados - Q58 | $732 | $545 | $1,025 | $599 | $512 | $519 | 🟡 |
| Domiciliarios INTER - API | $240 | $324 | $304 | $314 | $330 | $510 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 7.58 | 9.53 | 14.10 | 12.13 | 9.64 | 7.77 | 🔴 |
| Domiciliarios - Expancion - API | 7.80 | 7.58 | 11.99 | 10.38 | 8.16 | 4.85 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | 5.20 |  |
| TEST Creativos - API | 9.85 | 8.80 | 11.03 | 14.31 | 8.92 | 8.99 | 🟡 |
| RADIO - Fincas | — | — | — | — | — | 8.33 |  |
| Domiciliarios - Expancion - INTER | 5.28 | 4.46 | 5.33 | 4.21 | 4.84 | 5.19 | 🟢 |
| Domiciliarios VIDEO Q58 - | 5.02 | 3.62 | 3.19 | 2.96 | 4.99 | 3.12 | 🔴 |
| Domiciliarios VIDEO - API | 6.55 | 11.78 | 14.69 | 10.98 | 9.20 | 8.23 | 🟡 |
| Domiciliarios Q58 - | 13.71 | 13.11 | 11.07 | 12.89 | 10.72 | 8.71 | 🔴 |
| RADIO - Moteros | — | — | — | — | — | 4.92 |  |
| Motorizados - API | 5.69 | 8.05 | 9.31 | 10.45 | 8.62 | 6.24 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.43 | 7.46 | 5.98 | 5.52 | 6.45 | 8.56 | 🟢 |
| Motorizados - INTER | 8.02 | 8.76 | 13.59 | 11.01 | 8.03 | 8.95 | 🟢 |
| Domiciliarios - Expancion - Q58 | 2.02 | 2.71 | 3.65 | 4.52 | 3.94 | 5.40 | 🟢 |
| Motorizados - Q58 | 4.15 | 5.75 | 3.32 | 5.14 | 5.83 | 5.83 | 🟡 |
| Domiciliarios INTER - API | 6.33 | 11.02 | 12.17 | 9.39 | 7.59 | 6.36 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $296,406 | 630 | $470 | $3,552 | 7.55 | $714,904 |

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
