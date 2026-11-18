# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-17 20:01 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$196,685** |
| gastado hoy (hasta las 19h) | $239,255 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $311,874 |
| saldo proyectado a medianoche | $124,066 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $218,980 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–19:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-13 | $381,334 | 509 | **$749** | $3,422 | 4.57 |
| 2026-11-14 | $371,836 | 499 | **$745** | $3,247 | 4.36 |
| 2026-11-15 | $391,018 | 475 | **$823** | $3,569 | 4.34 |
| 2026-11-16 | $517,724 | 658 | **$787** | $3,452 | 4.39 |
| 2026-11-17 **HOY** | $239,255 | 346 | **$691** | $3,885 | 5.62 |

🟢 **Hoy va mejor que ayer a la misma hora** ($691 vs $787).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   691  =  $ 3,885  ÷  5.62
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,885 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.62 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $21,653 | 54% | 18 | $1,203 | 2.99 |
| RADIO - Moteros | $35,000 | $19,044 | 54% | 10 | $1,904 | 3.54 |
| Domiciliarios - API | $35,000 | $18,211 | 52% | 24 | $759 | 6.45 |
| Domiciliarios VIDEO INTER - API | $36,000 | $18,156 | 50% | 18 | $1,009 | 4.95 |
| Motorizados - INTER | $25,000 | $18,048 | 72% | 35 | $516 | 10.55 |
| Domiciliarios - Expancion - Q58 | $29,000 | $17,594 | 61% | 54 | $326 | 8.71 |
| Domiciliarios VIDEO Q58 - | $25,000 | $14,863 | 59% | 17 | $874 | 2.84 |
| Motorizados - Q58 | $29,000 | $14,619 | 50% | 22 | $664 | 3.80 |
| Domiciliarios - Expancion - API | $30,000 | $13,969 | 47% | 14 | $998 | 5.23 |
| Domiciliarios Q58 - | $25,000 | $12,679 | 51% | 14 | $906 | 3.57 |
| Domiciliarios - Expancion - INTER | $25,000 | $12,114 | 48% | 21 | $577 | 4.83 |
| Domiciliarios INTER - API | $20,000 | $11,880 | 59% | 49 | $242 | 13.65 |
| TEST Creativos - API | $20,000 | $10,492 | 52% | 14 | $749 | 10.79 |
| Domiciliarios VIDEO - API | $20,000 | $10,273 | 51% | 17 | $604 | 6.74 |
| Motorizados - API | $20,000 | $9,881 | 49% | 8 | $1,235 | 3.56 |
| RADIO - Fincas | $20,000 | $8,973 | 45% | 7 | $1,282 | 3.03 |
| RADIO - Broad | $10,000 | $6,806 | 68% | 4 | $1,702 | 3.40 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $239,255 | 346 | **$691** | $2,402 | **29%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$12,711**/pedido |
| utilidad estimada de lo que va del día | **$316,163** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $937 | $1,073 | $1,219 | $1,185 | $1,584 | $1,203 | 🟢 |
| RADIO - Moteros | $2,042 | $1,314 | $1,535 | $2,037 | $1,610 | $1,904 | 🔴 |
| Domiciliarios - API | $757 | $1,151 | $779 | $736 | $894 | $759 | 🟢 |
| Domiciliarios VIDEO INTER - API | $875 | $768 | $645 | $706 | $653 | $1,009 | 🔴 |
| Motorizados - INTER | $758 | $656 | $514 | $652 | $679 | $516 | 🟢 |
| Domiciliarios - Expancion - Q58 | $360 | $348 | $372 | $331 | $303 | $326 | 🟡 |
| Domiciliarios VIDEO Q58 - | $800 | $880 | $709 | $1,015 | $1,119 | $874 | 🟢 |
| Motorizados - Q58 | $913 | $612 | $589 | $813 | $849 | $664 | 🟢 |
| Domiciliarios - Expancion - API | $842 | $1,140 | $1,193 | $1,162 | $1,056 | $998 | 🟢 |
| Domiciliarios Q58 - | $1,051 | $1,039 | $1,913 | $1,204 | $1,195 | $906 | 🟢 |
| Domiciliarios - Expancion - INTER | $606 | $660 | $652 | $596 | $624 | $577 | 🟢 |
| Domiciliarios INTER - API | $344 | $361 | $295 | $340 | $391 | $242 | 🟢 |
| TEST Creativos - API | $894 | $661 | $622 | $930 | $824 | $749 | 🟢 |
| Domiciliarios VIDEO - API | $939 | $564 | $657 | $691 | $525 | $604 | 🔴 |
| Motorizados - API | $770 | $793 | $935 | $1,022 | $667 | $1,235 | 🔴 |
| RADIO - Fincas | $939 | $1,359 | $1,038 | $887 | $1,268 | $1,282 | 🟡 |
| RADIO - Broad | $1,617 | $1,916 | $1,649 | $1,970 | $829 | $1,702 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 3.92 | 2.84 | 2.71 | 3.12 | 2.08 | 2.99 | 🟢 |
| RADIO - Moteros | 2.69 | 3.80 | 4.23 | 2.95 | 3.84 | 3.54 | 🟡 |
| Domiciliarios - API | 6.19 | 3.74 | 5.36 | 6.47 | 5.42 | 6.45 | 🟢 |
| Domiciliarios VIDEO INTER - API | 5.43 | 6.46 | 6.64 | 6.78 | 6.76 | 4.95 | 🔴 |
| Motorizados - INTER | 8.51 | 7.89 | 9.71 | 8.13 | 7.24 | 10.55 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.65 | 7.05 | 5.74 | 7.10 | 7.34 | 8.71 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.42 | 2.51 | 2.84 | 2.36 | 1.90 | 2.84 | 🟢 |
| Motorizados - Q58 | 2.66 | 3.43 | 2.80 | 2.54 | 2.83 | 3.80 | 🟢 |
| Domiciliarios - Expancion - API | 5.92 | 4.02 | 4.33 | 4.63 | 4.84 | 5.23 | 🟢 |
| Domiciliarios Q58 - | 2.21 | 2.20 | 1.05 | 1.78 | 2.17 | 3.57 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.71 | 2.96 | 2.78 | 3.72 | 3.56 | 4.83 | 🟢 |
| Domiciliarios INTER - API | 10.69 | 7.88 | 9.64 | 9.01 | 7.19 | 13.65 | 🟢 |
| TEST Creativos - API | 6.24 | 7.75 | 7.73 | 5.05 | 7.68 | 10.79 | 🟢 |
| Domiciliarios VIDEO - API | 3.75 | 5.83 | 5.31 | 5.52 | 7.02 | 6.74 | 🟡 |
| Motorizados - API | 4.98 | 4.55 | 4.02 | 3.61 | 6.39 | 3.56 | 🔴 |
| RADIO - Fincas | 4.56 | 3.20 | 3.75 | 5.55 | 3.18 | 3.03 | 🟡 |
| RADIO - Broad | 4.62 | 3.51 | 3.73 | 3.66 | 9.40 | 3.40 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-11 | $449,265 | 687 | $654 | $3,664 | 5.60 | $653,545 |
| 2026-11-12 | $423,316 | 553 | $765 | $3,631 | 4.74 | $464,390 |
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,967 | 599 | $719 | $3,122 | 4.34 | $530,580 |
| 2026-11-15 | $466,194 | 613 | $761 | $3,444 | 4.53 | $517,827 |
| 2026-11-16 | $587,787 | 781 | $753 | $3,461 | 4.60 | $665,916 |

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
