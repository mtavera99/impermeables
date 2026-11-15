# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-15 01:47 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$281,809** |
| gastado hoy (hasta las 1h) | $8,246 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $455,396 |
| saldo proyectado a medianoche | $-165,341 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $364,865 — entra en zona de freno a las 16:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–1:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-11 | $5,245 | 9 | **$583** | $3,715 | 6.37 |
| 2026-11-12 | $4,301 | 4 | **$1,075** | $3,560 | 3.31 |
| 2026-11-13 | $5,862 | 12 | **$488** | $3,388 | 6.94 |
| 2026-11-14 | $7,136 | 15 | **$476** | $2,778 | 5.84 |
| 2026-11-15 **HOY** | $8,246 | 17 | **$485** | $2,536 | 5.23 |

🟠 Hoy va 2% más caro que ayer a la misma hora ($485 vs $476).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   485  =  $ 2,536  ÷  5.23
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,536 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.23 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $1,123 | 3% | 3 | $374 | 34.88 |
| Motorizados - Q58 | $29,000 | $853 | 3% | 1 | $853 | 1.36 |
| RADIO - Broad | $10,000 | $843 | 8% | 0 | — | 0.00 |
| Domiciliarios VIDEO INTER - API | $36,000 | $690 | 2% | 0 | — | 0.00 |
| Domiciliarios - Expancion - INTER | $25,000 | $554 | 2% | 0 | — | 0.00 |
| RADIO - Seguridad / Negocios | $40,000 | $548 | 1% | 1 | $548 | 3.51 |
| Domiciliarios VIDEO Q58 - | $25,000 | $445 | 2% | 2 | $222 | 6.90 |
| RADIO - Moteros | $35,000 | $434 | 1% | 0 | — | 0.00 |
| Domiciliarios - Expancion - Q58 | $29,000 | $416 | 1% | 1 | $416 | 4.41 |
| Motorizados - INTER | $25,000 | $399 | 2% | 2 | $200 | 20.41 |
| Domiciliarios Q58 - | $25,000 | $394 | 2% | 1 | $394 | 3.73 |
| Domiciliarios INTER - API | $20,000 | $350 | 2% | 1 | $350 | 7.19 |
| Domiciliarios - Expancion - API | $30,000 | $340 | 1% | 2 | $170 | 35.09 |
| Motorizados - API | $20,000 | $299 | 1% | 0 | — | 0.00 |
| TEST Creativos - API | $20,000 | $285 | 1% | 2 | $142 | 27.78 |
| Domiciliarios VIDEO - API | $20,000 | $142 | 1% | 0 | — | 0.00 |
| RADIO - Fincas | $20,000 | $131 | 1% | 1 | $131 | 16.13 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $8,246 | 17 | **$485** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,917**/pedido |
| utilidad estimada de lo que va del día | **$19,043** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $489 | $856 | $757 | $1,151 | $778 | $374 | 🟢 |
| Motorizados - Q58 | $646 | $643 | $913 | $612 | $589 | $853 | 🔴 |
| RADIO - Broad | — | $970 | $1,617 | $1,916 | $1,638 | — | 🟢 |
| Domiciliarios VIDEO INTER - API | $601 | $713 | $875 | $768 | $644 | — | 🟢 |
| Domiciliarios - Expancion - INTER | $700 | $623 | $606 | $660 | $652 | — | 🟡 |
| RADIO - Seguridad / Negocios | $1,417 | $1,142 | $937 | $1,073 | $1,218 | $548 | 🟢 |
| Domiciliarios VIDEO Q58 - | $798 | $603 | $800 | $880 | $709 | $222 | 🟢 |
| RADIO - Moteros | $2,246 | $1,757 | $2,042 | $1,314 | $1,533 | — | 🔴 |
| Domiciliarios - Expancion - Q58 | $290 | $296 | $360 | $348 | $372 | $416 | 🟡 |
| Motorizados - INTER | $639 | $484 | $758 | $656 | $513 | $200 | 🟢 |
| Domiciliarios Q58 - | $1,066 | $877 | $1,051 | $1,039 | $1,913 | $394 | 🟢 |
| Domiciliarios INTER - API | $306 | $285 | $344 | $361 | $294 | $350 | 🔴 |
| Domiciliarios - Expancion - API | $711 | $841 | $842 | $1,140 | $1,192 | $170 | 🟢 |
| Motorizados - API | $597 | $840 | $770 | $793 | $932 | — | 🔴 |
| TEST Creativos - API | $797 | $740 | $894 | $661 | $622 | $142 | 🟢 |
| Domiciliarios VIDEO - API | $532 | $635 | $939 | $564 | $655 | — | 🔴 |
| RADIO - Fincas | $639 | $1,254 | $939 | $1,359 | $1,032 | $131 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 8.23 | 5.31 | 6.19 | 3.74 | 5.41 | 34.88 | 🟢 |
| Motorizados - Q58 | 4.43 | 4.00 | 2.66 | 3.43 | 2.80 | 1.36 | 🔴 |
| RADIO - Broad | — | 8.34 | 4.62 | 3.51 | 3.77 | — | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.46 | 6.64 | 5.43 | 6.46 | 6.71 | — | 🟡 |
| Domiciliarios - Expancion - INTER | 3.66 | 3.69 | 3.71 | 2.96 | 2.79 | — | 🟡 |
| RADIO - Seguridad / Negocios | 2.80 | 3.47 | 3.92 | 2.84 | 2.75 | 3.51 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.69 | 4.55 | 3.42 | 2.51 | 2.85 | 6.90 | 🟢 |
| RADIO - Moteros | 2.45 | 3.35 | 2.69 | 3.80 | 4.32 | — | 🟢 |
| Domiciliarios - Expancion - Q58 | 8.82 | 7.99 | 7.65 | 7.05 | 5.80 | 4.41 | 🔴 |
| Motorizados - INTER | 8.52 | 11.33 | 8.51 | 7.89 | 9.81 | 20.41 | 🟢 |
| Domiciliarios Q58 - | 3.41 | 3.18 | 2.21 | 2.20 | 1.05 | 3.73 | 🟢 |
| Domiciliarios INTER - API | 10.54 | 11.04 | 10.69 | 7.88 | 9.69 | 7.19 | 🔴 |
| Domiciliarios - Expancion - API | 6.23 | 5.77 | 5.92 | 4.02 | 4.36 | 35.09 | 🟢 |
| Motorizados - API | 5.91 | 4.32 | 4.98 | 4.55 | 4.05 | — | 🟡 |
| TEST Creativos - API | 7.45 | 7.39 | 6.24 | 7.75 | 7.73 | 27.78 | 🟢 |
| Domiciliarios VIDEO - API | 6.74 | 6.40 | 3.75 | 5.83 | 5.34 | — | 🟡 |
| RADIO - Fincas | 7.62 | 3.68 | 4.56 | 3.20 | 3.79 | 16.13 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-09 | $471,508 | 752 | $627 | $3,268 | 5.21 | $735,643 |
| 2026-11-10 | $377,307 | 577 | $654 | $3,781 | 5.78 | $548,925 |
| 2026-11-11 | $449,265 | 687 | $654 | $3,664 | 5.60 | $653,545 |
| 2026-11-12 | $423,316 | 553 | $765 | $3,631 | 4.74 | $464,390 |
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,394 | 599 | $719 | $3,139 | 4.37 | $531,153 |

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
