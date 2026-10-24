# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-24 01:47 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$99,621** |
| gastado hoy (hasta las 1h) | $4,333 |
| presupuesto activo | $335,000/día |
| cierre proyectado del día | $305,216 |
| saldo proyectado a medianoche | $-201,262 |
| objetivo (cubrir un día de 143% + colchón) | $499,050 |

### 🔴 RECARGAR $395,096 — entra en zona de freno a las 10:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–1:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-20 | $4,380 | 15 | **$292** | $3,387 | 11.60 |
| 2026-10-21 | $8,871 | 23 | **$386** | $4,120 | 10.68 |
| 2026-10-22 | $4,913 | 14 | **$351** | $4,007 | 11.42 |
| 2026-10-23 | $4,624 | 11 | **$420** | $3,831 | 9.11 |
| 2026-10-24 **HOY** | $4,338 | 10 | **$434** | $3,756 | 8.66 |

🟠 Hoy va 3% más caro que ayer a la misma hora ($434 vs $420).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   434  =  $ 3,756  ÷  8.66
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,756 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.66 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $526 | 1% | 0 | — | 0.00 |
| Domiciliarios INTER - API | $25,000 | $515 | 2% | 0 | — | 0.00 |
| Domiciliarios - Expancion - INTER | $25,000 | $508 | 2% | 3 | $169 | 20.00 |
| Motorizados - Q58 | $20,000 | $444 | 2% | 1 | $444 | 6.33 |
| Domiciliarios - API | $35,000 | $420 | 1% | 0 | — | 0.00 |
| Domiciliarios - Expancion - Q58 | $20,000 | $348 | 2% | 2 | $174 | 20.20 |
| Domiciliarios VIDEO INTER - API | $25,000 | $310 | 1% | 0 | — | 0.00 |
| Motorizados - API | $20,000 | $278 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO Q58 - | $25,000 | $259 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $244 | 1% | 2 | $122 | 24.69 |
| TEST Creativos - API | $30,000 | $219 | 1% | 0 | — | 0.00 |
| Domiciliarios Q58 - | $25,000 | $152 | 1% | 1 | $152 | 13.33 |
| Motorizados - INTER | $25,000 | $116 | 0% | 1 | $116 | 58.82 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $4,339 | 10 | **$434** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,976**/pedido |
| utilidad estimada de lo que va del día | **$11,714** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $485 | $583 | $424 | $444 | $510 | — | 🔴 |
| Domiciliarios INTER - API | $240 | $324 | $304 | $314 | $328 | — | 🟡 |
| Domiciliarios - Expancion - INTER | $536 | $629 | $604 | $721 | $655 | $169 | 🟢 |
| Motorizados - Q58 | $732 | $545 | $1,025 | $599 | $509 | $444 | 🟢 |
| Domiciliarios - API | $464 | $484 | $348 | $370 | $411 | — | 🟡 |
| Domiciliarios - Expancion - Q58 | $1,462 | $1,121 | $1,077 | $892 | $1,108 | $174 | 🟢 |
| Domiciliarios VIDEO INTER - API | $534 | $576 | $701 | $742 | $641 | — | 🟢 |
| Motorizados - API | $579 | $470 | $446 | $378 | $451 | — | 🔴 |
| Domiciliarios VIDEO Q58 - | $586 | $642 | $995 | $1,091 | $674 | — | 🟢 |
| Domiciliarios VIDEO - API | $430 | $319 | $269 | $292 | $334 | $122 | 🟢 |
| TEST Creativos - API | $475 | $609 | $535 | $379 | $478 | — | 🔴 |
| Domiciliarios Q58 - | $166 | $185 | $197 | $159 | $214 | $152 | 🟢 |
| Motorizados - INTER | $480 | $591 | $460 | $545 | $703 | $116 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.80 | 7.58 | 11.99 | 10.38 | 8.23 | — | 🔴 |
| Domiciliarios INTER - API | 6.33 | 11.02 | 12.17 | 9.39 | 7.64 | — | 🔴 |
| Domiciliarios - Expancion - INTER | 5.28 | 4.46 | 5.33 | 4.21 | 4.87 | 20.00 | 🟢 |
| Motorizados - Q58 | 4.15 | 5.75 | 3.32 | 5.14 | 5.87 | 6.33 | 🟢 |
| Domiciliarios - API | 7.58 | 9.53 | 14.10 | 12.13 | 9.74 | — | 🔴 |
| Domiciliarios - Expancion - Q58 | 2.02 | 2.71 | 3.65 | 4.52 | 3.97 | 20.20 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.43 | 7.46 | 5.98 | 5.52 | 6.48 | — | 🟢 |
| Motorizados - API | 5.69 | 8.05 | 9.31 | 10.45 | 8.69 | — | 🔴 |
| Domiciliarios VIDEO Q58 - | 5.02 | 3.62 | 3.19 | 2.96 | 5.02 | — | 🟢 |
| Domiciliarios VIDEO - API | 6.55 | 11.78 | 14.69 | 10.98 | 9.29 | 24.69 | 🟢 |
| TEST Creativos - API | 9.85 | 8.80 | 11.03 | 14.31 | 8.95 | — | 🔴 |
| Domiciliarios Q58 - | 13.71 | 13.11 | 11.07 | 12.89 | 10.83 | 13.33 | 🟢 |
| Motorizados - INTER | 8.02 | 8.76 | 13.59 | 11.01 | 8.12 | 58.82 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,261 | 759 | $418 | $3,709 | 8.87 | $901,127 |
| 2026-10-23 | $294,061 | 630 | $467 | $3,551 | 7.61 | $717,249 |

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
