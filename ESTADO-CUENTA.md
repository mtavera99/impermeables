# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-16 15:42 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$258,369** |
| gastado hoy (hasta las 15h) | $365,789 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $560,156 |
| saldo proyectado a medianoche | $64,002 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $30,762 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-12 | $206,745 | 287 | **$720** | $4,003 | 5.56 |
| 2026-11-13 | $243,946 | 326 | **$748** | $3,471 | 4.64 |
| 2026-11-14 | $246,640 | 331 | **$745** | $3,344 | 4.49 |
| 2026-11-15 | $261,165 | 301 | **$868** | $3,847 | 4.43 |
| 2026-11-16 **HOY** | $365,789 | 441 | **$829** | $3,443 | 4.15 |

🟢 **Hoy va mejor que ayer a la misma hora** ($829 vs $868).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   829  =  $ 3,443  ÷  4.15
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,443 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.15 | 5,33 | 🟠 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $35,183 | 88% | 20 | $1,759 | 1.87 |
| Domiciliarios VIDEO INTER - API | $36,000 | $31,815 | 88% | 42 | $758 | 5.69 |
| Domiciliarios - API | $35,000 | $29,929 | 86% | 35 | $855 | 5.83 |
| RADIO - Moteros | $35,000 | $27,839 | 80% | 12 | $2,320 | 2.69 |
| Domiciliarios - Expancion - API | $30,000 | $25,667 | 86% | 24 | $1,069 | 4.76 |
| Motorizados - Q58 | $29,000 | $23,292 | 80% | 29 | $803 | 2.96 |
| Domiciliarios - Expancion - Q58 | $29,000 | $22,181 | 76% | 57 | $389 | 5.55 |
| Motorizados - INTER | $25,000 | $21,820 | 87% | 31 | $704 | 6.79 |
| Domiciliarios VIDEO Q58 - | $25,000 | $20,568 | 82% | 15 | $1,371 | 1.58 |
| Domiciliarios - Expancion - INTER | $25,000 | $19,567 | 78% | 26 | $753 | 2.88 |
| Domiciliarios Q58 - | $25,000 | $18,744 | 75% | 14 | $1,339 | 1.91 |
| Domiciliarios INTER - API | $20,000 | $17,519 | 88% | 43 | $407 | 6.71 |
| Domiciliarios VIDEO - API | $20,000 | $17,403 | 87% | 29 | $600 | 5.96 |
| Motorizados - API | $20,000 | $16,318 | 82% | 26 | $628 | 6.89 |
| TEST Creativos - API | $20,000 | $16,070 | 80% | 14 | $1,148 | 5.49 |
| RADIO - Fincas | $20,000 | $14,288 | 71% | 16 | $893 | 4.48 |
| RADIO - Broad | $10,000 | $7,586 | 76% | 8 | $948 | 8.21 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $365,789 | 441 | **$829** | $2,402 | **35%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$15,247**/pedido |
| utilidad estimada de lo que va del día | **$342,128** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,142 | $937 | $1,073 | $1,219 | $1,183 | $1,759 | 🔴 |
| Domiciliarios VIDEO INTER - API | $713 | $875 | $768 | $645 | $705 | $758 | 🟡 |
| Domiciliarios - API | $856 | $757 | $1,151 | $779 | $735 | $855 | 🔴 |
| RADIO - Moteros | $1,757 | $2,042 | $1,314 | $1,535 | $2,032 | $2,320 | 🟡 |
| Domiciliarios - Expancion - API | $841 | $842 | $1,140 | $1,193 | $1,160 | $1,069 | 🟢 |
| Motorizados - Q58 | $643 | $913 | $612 | $589 | $813 | $803 | 🟡 |
| Domiciliarios - Expancion - Q58 | $296 | $360 | $348 | $372 | $330 | $389 | 🔴 |
| Motorizados - INTER | $484 | $758 | $656 | $514 | $650 | $704 | 🟡 |
| Domiciliarios VIDEO Q58 - | $603 | $800 | $880 | $709 | $1,015 | $1,371 | 🔴 |
| Domiciliarios - Expancion - INTER | $623 | $606 | $660 | $652 | $596 | $753 | 🔴 |
| Domiciliarios Q58 - | $877 | $1,051 | $1,039 | $1,913 | $1,203 | $1,339 | 🟡 |
| Domiciliarios INTER - API | $285 | $344 | $361 | $295 | $340 | $407 | 🔴 |
| Domiciliarios VIDEO - API | $635 | $939 | $564 | $657 | $690 | $600 | 🟢 |
| Motorizados - API | $840 | $770 | $793 | $935 | $1,016 | $628 | 🟢 |
| TEST Creativos - API | $740 | $894 | $661 | $622 | $930 | $1,148 | 🔴 |
| RADIO - Fincas | $1,254 | $939 | $1,359 | $1,038 | $886 | $893 | 🟡 |
| RADIO - Broad | $970 | $1,617 | $1,916 | $1,649 | $1,968 | $948 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 3.47 | 3.92 | 2.84 | 2.71 | 3.12 | 1.87 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.64 | 5.43 | 6.46 | 6.64 | 6.79 | 5.69 | 🔴 |
| Domiciliarios - API | 5.31 | 6.19 | 3.74 | 5.36 | 6.47 | 5.83 | 🟡 |
| RADIO - Moteros | 3.35 | 2.69 | 3.80 | 4.23 | 2.95 | 2.69 | 🟡 |
| Domiciliarios - Expancion - API | 5.77 | 5.92 | 4.02 | 4.33 | 4.64 | 4.76 | 🟡 |
| Motorizados - Q58 | 4.00 | 2.66 | 3.43 | 2.80 | 2.54 | 2.96 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.99 | 7.65 | 7.05 | 5.74 | 7.11 | 5.55 | 🔴 |
| Motorizados - INTER | 11.33 | 8.51 | 7.89 | 9.71 | 8.14 | 6.79 | 🔴 |
| Domiciliarios VIDEO Q58 - | 4.55 | 3.42 | 2.51 | 2.84 | 2.36 | 1.58 | 🔴 |
| Domiciliarios - Expancion - INTER | 3.69 | 3.71 | 2.96 | 2.78 | 3.72 | 2.88 | 🔴 |
| Domiciliarios Q58 - | 3.18 | 2.21 | 2.20 | 1.05 | 1.78 | 1.91 | 🟢 |
| Domiciliarios INTER - API | 11.04 | 10.69 | 7.88 | 9.64 | 9.02 | 6.71 | 🔴 |
| Domiciliarios VIDEO - API | 6.40 | 3.75 | 5.83 | 5.31 | 5.53 | 5.96 | 🟢 |
| Motorizados - API | 4.32 | 4.98 | 4.55 | 4.02 | 3.62 | 6.89 | 🟢 |
| TEST Creativos - API | 7.39 | 6.24 | 7.75 | 7.73 | 5.05 | 5.49 | 🟢 |
| RADIO - Fincas | 3.68 | 4.56 | 3.20 | 3.75 | 5.55 | 4.48 | 🔴 |
| RADIO - Broad | 8.34 | 4.62 | 3.51 | 3.73 | 3.66 | 8.21 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-10 | $377,307 | 577 | $654 | $3,781 | 5.78 | $548,925 |
| 2026-11-11 | $449,265 | 687 | $654 | $3,664 | 5.60 | $653,545 |
| 2026-11-12 | $423,316 | 553 | $765 | $3,631 | 4.74 | $464,390 |
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,967 | 599 | $719 | $3,122 | 4.34 | $530,580 |
| 2026-11-15 | $465,572 | 613 | $759 | $3,442 | 4.53 | $518,449 |

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
