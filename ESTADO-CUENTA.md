# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-15 03:47 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$276,997** |
| gastado hoy (hasta las 3h) | $12,796 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $457,044 |
| saldo proyectado a medianoche | $-167,250 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $365,127 — entra en zona de freno a las 16:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–3:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-11 | $7,826 | 14 | **$559** | $3,744 | 6.70 |
| 2026-11-12 | $6,447 | 9 | **$716** | $3,602 | 5.03 |
| 2026-11-13 | $8,442 | 13 | **$649** | $3,737 | 5.75 |
| 2026-11-14 | $10,447 | 24 | **$435** | $2,874 | 6.60 |
| 2026-11-15 **HOY** | $12,796 | 24 | **$533** | $2,469 | 4.63 |

🟠 Hoy va 22% más caro que ayer a la misma hora ($533 vs $435).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   533  =  $ 2,469  ÷  4.63
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,469 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.63 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Motorizados - Q58 | $29,000 | $1,348 | 5% | 2 | $674 | 1.69 |
| Domiciliarios - API | $35,000 | $1,342 | 4% | 3 | $447 | 24.39 |
| Domiciliarios VIDEO INTER - API | $36,000 | $1,062 | 3% | 0 | — | 0.00 |
| RADIO - Seguridad / Negocios | $40,000 | $1,016 | 3% | 1 | $1,016 | 2.06 |
| RADIO - Moteros | $35,000 | $1,002 | 3% | 0 | — | 0.00 |
| RADIO - Broad | $10,000 | $934 | 9% | 0 | — | 0.00 |
| Domiciliarios - Expancion - INTER | $25,000 | $887 | 4% | 1 | $887 | 1.40 |
| Motorizados - INTER | $25,000 | $666 | 3% | 2 | $333 | 13.16 |
| Domiciliarios Q58 - | $25,000 | $637 | 3% | 3 | $212 | 6.62 |
| Domiciliarios - Expancion - API | $30,000 | $625 | 2% | 3 | $208 | 32.26 |
| Domiciliarios - Expancion - Q58 | $29,000 | $608 | 2% | 2 | $304 | 6.04 |
| Domiciliarios INTER - API | $20,000 | $599 | 3% | 2 | $300 | 8.44 |
| Domiciliarios VIDEO Q58 - | $25,000 | $545 | 2% | 2 | $272 | 5.04 |
| Motorizados - API | $20,000 | $455 | 2% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $448 | 2% | 0 | — | 0.00 |
| TEST Creativos - API | $20,000 | $392 | 2% | 2 | $196 | 21.51 |
| RADIO - Fincas | $20,000 | $230 | 1% | 1 | $230 | 9.62 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $12,796 | 24 | **$533** | $2,402 | **22%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,801**/pedido |
| utilidad estimada de lo que va del día | **$25,730** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | |
|---|---|---|---|---|---|---|---|
| Motorizados - Q58 | $646 | $643 | $913 | $612 | $589 | $674 | 🟡 |
| Domiciliarios - API | $489 | $856 | $757 | $1,151 | $778 | $447 | 🟢 |
| Domiciliarios VIDEO INTER - API | $601 | $713 | $875 | $768 | $645 | — | 🟢 |
| RADIO - Seguridad / Negocios | $1,417 | $1,142 | $937 | $1,073 | $1,218 | $1,016 | 🟢 |
| RADIO - Moteros | $2,246 | $1,757 | $2,042 | $1,314 | $1,533 | — | 🔴 |
| RADIO - Broad | — | $970 | $1,617 | $1,916 | $1,638 | — | 🟢 |
| Domiciliarios - Expancion - INTER | $700 | $623 | $606 | $660 | $652 | $887 | 🔴 |
| Motorizados - INTER | $639 | $484 | $758 | $656 | $514 | $333 | 🟢 |
| Domiciliarios Q58 - | $1,066 | $877 | $1,051 | $1,039 | $1,913 | $212 | 🟢 |
| Domiciliarios - Expancion - API | $711 | $841 | $842 | $1,140 | $1,192 | $208 | 🟢 |
| Domiciliarios - Expancion - Q58 | $290 | $296 | $360 | $348 | $372 | $304 | 🟢 |
| Domiciliarios INTER - API | $306 | $285 | $344 | $361 | $295 | $300 | 🟡 |
| Domiciliarios VIDEO Q58 - | $798 | $603 | $800 | $880 | $709 | $272 | 🟢 |
| Motorizados - API | $597 | $840 | $770 | $793 | $932 | — | 🔴 |
| Domiciliarios VIDEO - API | $532 | $635 | $939 | $564 | $656 | — | 🔴 |
| TEST Creativos - API | $797 | $740 | $894 | $661 | $622 | $196 | 🟢 |
| RADIO - Fincas | $639 | $1,254 | $939 | $1,359 | $1,032 | $230 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | |
|---|---|---|---|---|---|---|---|
| Motorizados - Q58 | 4.43 | 4.00 | 2.66 | 3.43 | 2.80 | 1.69 | 🔴 |
| Domiciliarios - API | 8.23 | 5.31 | 6.19 | 3.74 | 5.40 | 24.39 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.46 | 6.64 | 5.43 | 6.46 | 6.70 | — | 🟡 |
| RADIO - Seguridad / Negocios | 2.80 | 3.47 | 3.92 | 2.84 | 2.75 | 2.06 | 🔴 |
| RADIO - Moteros | 2.45 | 3.35 | 2.69 | 3.80 | 4.32 | — | 🟢 |
| RADIO - Broad | — | 8.34 | 4.62 | 3.51 | 3.77 | — | 🟢 |
| Domiciliarios - Expancion - INTER | 3.66 | 3.69 | 3.71 | 2.96 | 2.79 | 1.40 | 🔴 |
| Motorizados - INTER | 8.52 | 11.33 | 8.51 | 7.89 | 9.81 | 13.16 | 🟢 |
| Domiciliarios Q58 - | 3.41 | 3.18 | 2.21 | 2.20 | 1.05 | 6.62 | 🟢 |
| Domiciliarios - Expancion - API | 6.23 | 5.77 | 5.92 | 4.02 | 4.36 | 32.26 | 🟢 |
| Domiciliarios - Expancion - Q58 | 8.82 | 7.99 | 7.65 | 7.05 | 5.80 | 6.04 | 🟡 |
| Domiciliarios INTER - API | 10.54 | 11.04 | 10.69 | 7.88 | 9.69 | 8.44 | 🟡 |
| Domiciliarios VIDEO Q58 - | 3.69 | 4.55 | 3.42 | 2.51 | 2.84 | 5.04 | 🟢 |
| Motorizados - API | 5.91 | 4.32 | 4.98 | 4.55 | 4.05 | — | 🟡 |
| Domiciliarios VIDEO - API | 6.74 | 6.40 | 3.75 | 5.83 | 5.34 | — | 🟡 |
| TEST Creativos - API | 7.45 | 7.39 | 6.24 | 7.75 | 7.73 | 21.51 | 🟢 |
| RADIO - Fincas | 7.62 | 3.68 | 4.56 | 3.20 | 3.78 | 9.62 | 🟢 |

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
| 2026-11-14 | $430,480 | 599 | $719 | $3,138 | 4.37 | $531,067 |

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
