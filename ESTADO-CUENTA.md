# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-19 22:24 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$122,395** |
| gastado hoy (hasta las 22h) | $367,791 |
| presupuesto activo | $429,000/día |
| cierre proyectado del día | $378,138 |
| saldo proyectado a medianoche | $112,048 |
| objetivo (cubrir un día de 143% + colchón) | $633,470 |

### 🟠 Recargar $143,284 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–22:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-15 | $457,340 | 598 | **$765** | $3,462 | 4.53 |
| 2026-11-16 | $582,776 | 769 | **$758** | $3,464 | 4.57 |
| 2026-11-17 | $343,718 | 474 | **$725** | $3,838 | 5.29 |
| 2026-11-18 | $482,244 | 648 | **$744** | $3,903 | 5.24 |
| 2026-11-19 **HOY** | $367,542 | 505 | **$728** | $3,726 | 5.12 |

🟢 **Hoy va mejor que ayer a la misma hora** ($728 vs $744).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   728  =  $ 3,726  ÷  5.12
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,726 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.12 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $48,000 | $37,111 | 77% | 35 | $1,060 | 3.06 |
| Domiciliarios VIDEO INTER - API | $43,000 | $31,232 | 73% | 28 | $1,115 | 4.12 |
| RADIO - Moteros | $25,000 | $29,769 | 119% | 16 | $1,861 | 2.68 |
| Domiciliarios - API | $35,000 | $27,841 | 80% | 44 | $633 | 10.36 |
| Domiciliarios - Expancion - INTER | $30,000 | $24,602 | 82% | 33 | $746 | 2.62 |
| Domiciliarios - Expancion - API | $20,000 | $23,167 | 116% | 28 | $827 | 8.10 |
| Domiciliarios VIDEO Q58 - | $30,000 | $22,336 | 74% | 27 | $827 | 2.76 |
| Motorizados - Q58 | $29,000 | $22,011 | 76% | 35 | $629 | 4.09 |
| Motorizados - INTER | $25,000 | $20,766 | 83% | 43 | $483 | 11.32 |
| Domiciliarios Q58 - | $25,000 | $20,524 | 82% | 20 | $1,026 | 2.40 |
| Domiciliarios VIDEO - API | $24,000 | $18,284 | 76% | 26 | $703 | 7.98 |
| Domiciliarios - Expancion - Q58 | $15,000 | $17,987 | 120% | 56 | $321 | 9.90 |
| TEST Creativos - API | $20,000 | $17,914 | 90% | 23 | $779 | 8.73 |
| RADIO - Fincas | $20,000 | $17,693 | 88% | 21 | $843 | 5.32 |
| Domiciliarios INTER - API | $20,000 | $16,049 | 80% | 46 | $349 | 9.53 |
| Motorizados - API | $20,000 | $15,989 | 80% | 23 | $695 | 8.28 |
| RADIO - Broad | $0 | $4,186 | — | 1 | $4,186 | 1.72 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $367,461 | 505 | **$728** | $2,402 | **30%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$13,376**/pedido |
| utilidad estimada de lo que va del día | **$443,192** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | 11-19 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,219 | $1,185 | $1,584 | $1,322 | $1,114 | $1,060 | 🟡 |
| Domiciliarios VIDEO INTER - API | $645 | $706 | $653 | $919 | $1,018 | $1,115 | 🟡 |
| RADIO - Moteros | $1,535 | $2,037 | $1,613 | $1,801 | $1,564 | $1,863 | 🔴 |
| Domiciliarios - API | $779 | $736 | $895 | $879 | $834 | $633 | 🟢 |
| Domiciliarios - Expancion - INTER | $652 | $596 | $625 | $640 | $611 | $746 | 🔴 |
| Domiciliarios - Expancion - API | $1,193 | $1,162 | $1,056 | $834 | $879 | $827 | 🟢 |
| Domiciliarios VIDEO Q58 - | $709 | $1,015 | $1,119 | $773 | $1,100 | $827 | 🟢 |
| Motorizados - Q58 | $589 | $813 | $849 | $744 | $589 | $629 | 🟡 |
| Motorizados - INTER | $514 | $652 | $679 | $532 | $573 | $487 | 🟢 |
| Domiciliarios Q58 - | $1,913 | $1,204 | $1,195 | $1,035 | $1,137 | $1,026 | 🟢 |
| Domiciliarios VIDEO - API | $657 | $691 | $525 | $746 | $691 | $703 | 🟡 |
| Domiciliarios - Expancion - Q58 | $372 | $331 | $303 | $319 | $298 | $321 | 🟡 |
| TEST Creativos - API | $622 | $930 | $824 | $689 | $762 | $779 | 🟡 |
| RADIO - Fincas | $1,038 | $887 | $1,274 | $1,080 | $1,358 | $844 | 🟢 |
| Domiciliarios INTER - API | $295 | $340 | $391 | $267 | $311 | $350 | 🟡 |
| Motorizados - API | $935 | $1,022 | $667 | $972 | $697 | $695 | 🟡 |
| RADIO - Broad | $1,649 | $1,970 | $831 | $1,996 | $1,775 | $4,186 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | 11-19 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 2.71 | 3.12 | 2.08 | 2.50 | 2.89 | 3.06 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.64 | 6.78 | 6.76 | 5.38 | 5.03 | 4.12 | 🔴 |
| RADIO - Moteros | 4.23 | 2.95 | 3.83 | 3.67 | 4.30 | 2.67 | 🔴 |
| Domiciliarios - API | 5.36 | 6.47 | 5.41 | 5.57 | 7.13 | 10.36 | 🟢 |
| Domiciliarios - Expancion - INTER | 2.78 | 3.72 | 3.56 | 4.15 | 3.73 | 2.62 | 🔴 |
| Domiciliarios - Expancion - API | 4.33 | 4.63 | 4.84 | 6.25 | 7.27 | 8.10 | 🟢 |
| Domiciliarios VIDEO Q58 - | 2.84 | 2.36 | 1.90 | 3.16 | 2.18 | 2.76 | 🟢 |
| Motorizados - Q58 | 2.80 | 2.54 | 2.83 | 3.35 | 4.00 | 4.09 | 🟡 |
| Motorizados - INTER | 9.71 | 8.13 | 7.24 | 10.22 | 10.81 | 11.27 | 🟡 |
| Domiciliarios Q58 - | 1.05 | 1.78 | 2.17 | 3.11 | 2.38 | 2.40 | 🟡 |
| Domiciliarios VIDEO - API | 5.31 | 5.52 | 7.02 | 5.55 | 7.69 | 7.98 | 🟡 |
| Domiciliarios - Expancion - Q58 | 5.74 | 7.10 | 7.34 | 8.95 | 9.95 | 9.90 | 🟡 |
| TEST Creativos - API | 7.73 | 5.05 | 7.68 | 12.23 | 9.79 | 8.73 | 🟡 |
| RADIO - Fincas | 3.75 | 5.55 | 3.18 | 3.70 | 3.45 | 5.29 | 🟢 |
| Domiciliarios INTER - API | 9.64 | 9.01 | 7.19 | 12.39 | 11.19 | 9.49 | 🔴 |
| Motorizados - API | 4.02 | 3.61 | 6.39 | 4.49 | 6.97 | 8.28 | 🟢 |
| RADIO - Broad | 3.73 | 3.66 | 9.38 | 2.96 | 3.59 | 1.72 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,967 | 599 | $719 | $3,122 | 4.34 | $530,580 |
| 2026-11-15 | $466,194 | 613 | $761 | $3,444 | 4.53 | $517,827 |
| 2026-11-16 | $588,173 | 781 | $753 | $3,462 | 4.60 | $665,530 |
| 2026-11-17 | $355,036 | 497 | $714 | $3,836 | 5.37 | $442,775 |
| 2026-11-18 | $491,621 | 674 | $729 | $3,892 | 5.34 | $590,320 |

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
