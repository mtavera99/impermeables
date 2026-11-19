# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-19 18:48 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$235,148** |
| gastado hoy (hasta las 18h) | $254,197 |
| presupuesto activo | $429,000/día |
| cierre proyectado del día | $387,816 |
| saldo proyectado a medianoche | $101,529 |
| objetivo (cubrir un día de 143% + colchón) | $633,470 |

### 🟠 Recargar $144,125 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-15 | $357,678 | 431 | **$830** | $3,640 | 4.39 |
| 2026-11-16 | $485,082 | 593 | **$818** | $3,443 | 4.21 |
| 2026-11-17 | $217,639 | 298 | **$730** | $3,844 | 5.26 |
| 2026-11-18 | $361,515 | 470 | **$769** | $4,083 | 5.31 |
| 2026-11-19 **HOY** | $254,197 | 348 | **$730** | $3,830 | 5.24 |

🟢 **Hoy va mejor que ayer a la misma hora** ($730 vs $769).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   730  =  $ 3,830  ÷  5.24
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,830 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.24 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $48,000 | $24,865 | 52% | 28 | $888 | 3.77 |
| RADIO - Moteros | $25,000 | $22,555 | 90% | 11 | $2,050 | 2.42 |
| Domiciliarios VIDEO INTER - API | $43,000 | $19,622 | 46% | 16 | $1,226 | 3.89 |
| Domiciliarios - API | $35,000 | $19,287 | 55% | 35 | $551 | 12.28 |
| Domiciliarios - Expancion - API | $20,000 | $17,767 | 89% | 23 | $772 | 8.99 |
| Domiciliarios - Expancion - INTER | $30,000 | $17,398 | 58% | 24 | $725 | 2.75 |
| Domiciliarios VIDEO Q58 - | $30,000 | $15,585 | 52% | 17 | $917 | 2.60 |
| Motorizados - Q58 | $29,000 | $15,461 | 53% | 25 | $618 | 4.41 |
| Motorizados - INTER | $25,000 | $14,481 | 58% | 25 | $579 | 9.77 |
| Domiciliarios - Expancion - Q58 | $15,000 | $14,235 | 95% | 40 | $356 | 8.97 |
| TEST Creativos - API | $20,000 | $13,648 | 68% | 15 | $910 | 7.64 |
| Domiciliarios Q58 - | $25,000 | $13,624 | 54% | 12 | $1,135 | 2.14 |
| Domiciliarios VIDEO - API | $24,000 | $11,452 | 48% | 18 | $636 | 9.08 |
| Motorizados - API | $20,000 | $10,141 | 51% | 12 | $845 | 6.92 |
| RADIO - Fincas | $20,000 | $10,024 | 50% | 12 | $835 | 5.57 |
| Domiciliarios INTER - API | $20,000 | $9,980 | 50% | 34 | $294 | 11.61 |
| RADIO - Broad | $0 | $4,072 | — | 1 | $4,072 | 1.75 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $254,197 | 348 | **$730** | $2,402 | **30%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$13,427**/pedido |
| utilidad estimada de lo que va del día | **$304,431** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | 11-19 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,219 | $1,185 | $1,584 | $1,322 | $1,113 | $888 | 🟢 |
| RADIO - Moteros | $1,535 | $2,037 | $1,613 | $1,801 | $1,563 | $2,050 | 🔴 |
| Domiciliarios VIDEO INTER - API | $645 | $706 | $653 | $919 | $1,018 | $1,226 | 🔴 |
| Domiciliarios - API | $779 | $736 | $895 | $878 | $833 | $551 | 🟢 |
| Domiciliarios - Expancion - API | $1,193 | $1,162 | $1,056 | $834 | $878 | $772 | 🟢 |
| Domiciliarios - Expancion - INTER | $652 | $596 | $625 | $640 | $611 | $725 | 🔴 |
| Domiciliarios VIDEO Q58 - | $709 | $1,015 | $1,119 | $773 | $1,100 | $917 | 🟢 |
| Motorizados - Q58 | $589 | $813 | $849 | $744 | $589 | $618 | 🟡 |
| Motorizados - INTER | $514 | $652 | $679 | $532 | $573 | $579 | 🟡 |
| Domiciliarios - Expancion - Q58 | $372 | $331 | $303 | $319 | $298 | $356 | 🔴 |
| TEST Creativos - API | $622 | $930 | $824 | $689 | $762 | $910 | 🔴 |
| Domiciliarios Q58 - | $1,913 | $1,204 | $1,195 | $1,035 | $1,137 | $1,135 | 🟡 |
| Domiciliarios VIDEO - API | $657 | $691 | $525 | $746 | $690 | $636 | 🟢 |
| Motorizados - API | $935 | $1,022 | $667 | $972 | $695 | $845 | 🔴 |
| RADIO - Fincas | $1,038 | $887 | $1,274 | $1,080 | $1,357 | $835 | 🟢 |
| Domiciliarios INTER - API | $295 | $340 | $391 | $267 | $311 | $294 | 🟢 |
| RADIO - Broad | $1,649 | $1,970 | $831 | $1,996 | $1,775 | $4,072 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | 11-19 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 2.71 | 3.12 | 2.08 | 2.50 | 2.89 | 3.77 | 🟢 |
| RADIO - Moteros | 4.23 | 2.95 | 3.83 | 3.67 | 4.30 | 2.42 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.64 | 6.78 | 6.76 | 5.38 | 5.03 | 3.89 | 🔴 |
| Domiciliarios - API | 5.36 | 6.47 | 5.41 | 5.58 | 7.13 | 12.28 | 🟢 |
| Domiciliarios - Expancion - API | 4.33 | 4.63 | 4.84 | 6.25 | 7.27 | 8.99 | 🟢 |
| Domiciliarios - Expancion - INTER | 2.78 | 3.72 | 3.56 | 4.15 | 3.73 | 2.75 | 🔴 |
| Domiciliarios VIDEO Q58 - | 2.84 | 2.36 | 1.90 | 3.16 | 2.18 | 2.60 | 🟢 |
| Motorizados - Q58 | 2.80 | 2.54 | 2.83 | 3.35 | 4.00 | 4.41 | 🟢 |
| Motorizados - INTER | 9.71 | 8.13 | 7.24 | 10.22 | 10.81 | 9.77 | 🟡 |
| Domiciliarios - Expancion - Q58 | 5.74 | 7.10 | 7.34 | 8.95 | 9.96 | 8.97 | 🟡 |
| TEST Creativos - API | 7.73 | 5.05 | 7.68 | 12.23 | 9.79 | 7.64 | 🔴 |
| Domiciliarios Q58 - | 1.05 | 1.78 | 2.17 | 3.11 | 2.38 | 2.14 | 🟡 |
| Domiciliarios VIDEO - API | 5.31 | 5.52 | 7.02 | 5.55 | 7.69 | 9.08 | 🟢 |
| Motorizados - API | 4.02 | 3.61 | 6.39 | 4.49 | 6.98 | 6.92 | 🟡 |
| RADIO - Fincas | 3.75 | 5.55 | 3.18 | 3.70 | 3.45 | 5.57 | 🟢 |
| Domiciliarios INTER - API | 9.64 | 9.01 | 7.19 | 12.39 | 11.20 | 11.61 | 🟡 |
| RADIO - Broad | 3.73 | 3.66 | 9.38 | 2.96 | 3.59 | 1.75 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,967 | 599 | $719 | $3,122 | 4.34 | $530,580 |
| 2026-11-15 | $466,194 | 613 | $761 | $3,444 | 4.53 | $517,827 |
| 2026-11-16 | $588,173 | 781 | $753 | $3,462 | 4.60 | $665,530 |
| 2026-11-17 | $354,992 | 497 | $714 | $3,836 | 5.37 | $442,819 |
| 2026-11-18 | $491,400 | 674 | $729 | $3,891 | 5.34 | $590,541 |

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
