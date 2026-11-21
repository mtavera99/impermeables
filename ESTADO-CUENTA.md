# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-21 06:23 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$250,328** |
| gastado hoy (hasta las 6h) | $22,941 |
| presupuesto activo | $429,000/día |
| cierre proyectado del día | $393,852 |
| saldo proyectado a medianoche | $-120,582 |
| objetivo (cubrir un día de 143% + colchón) | $633,470 |

### 🔴 RECARGAR $360,201 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–6:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-17 | $19,858 | 24 | **$827** | $3,043 | 3.68 |
| 2026-11-18 | $31,833 | 32 | **$995** | $4,552 | 4.58 |
| 2026-11-19 | $27,479 | 50 | **$550** | $3,682 | 6.70 |
| 2026-11-20 | $29,267 | 55 | **$532** | $3,666 | 6.89 |
| 2026-11-21 **HOY** | $22,941 | 40 | **$574** | $3,454 | 6.02 |

🟠 Hoy va 8% más caro que ayer a la misma hora ($574 vs $532).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   574  =  $ 3,454  ÷  6.02
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,454 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.02 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $3,108 | 9% | 2 | $1,554 | 3.76 |
| Domiciliarios VIDEO - API | $24,000 | $2,266 | 9% | 4 | $566 | 8.11 |
| Domiciliarios VIDEO INTER - API | $43,000 | $2,124 | 5% | 3 | $708 | 6.15 |
| RADIO - Seguridad / Negocios | $48,000 | $1,982 | 4% | 2 | $991 | 2.67 |
| Motorizados - Q58 | $29,000 | $1,873 | 6% | 5 | $375 | 5.62 |
| RADIO - Moteros | $25,000 | $1,788 | 7% | 1 | $1,788 | 2.35 |
| Motorizados - API | $20,000 | $1,642 | 8% | 3 | $547 | 11.32 |
| Domiciliarios - Expancion - INTER | $30,000 | $1,262 | 4% | 2 | $631 | 3.29 |
| Motorizados - INTER | $25,000 | $1,180 | 5% | 5 | $236 | 22.22 |
| Domiciliarios INTER - API | $20,000 | $1,133 | 6% | 3 | $378 | 8.57 |
| Domiciliarios VIDEO Q58 - | $30,000 | $1,028 | 3% | 3 | $343 | 5.84 |
| Domiciliarios - Expancion - API | $20,000 | $894 | 4% | 2 | $447 | 11.05 |
| TEST Creativos - API | $20,000 | $781 | 4% | 1 | $781 | 7.19 |
| RADIO - Fincas | $20,000 | $763 | 4% | 0 | — | 0.00 |
| Domiciliarios Q58 - | $25,000 | $747 | 3% | 1 | $747 | 2.44 |
| Domiciliarios - Expancion - Q58 | $15,000 | $370 | 2% | 3 | $123 | 20.41 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $22,941 | 40 | **$574** | $2,402 | **24%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,543**/pedido |
| utilidad estimada de lo que va del día | **$41,269** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-16 | 11-17 | 11-18 | 11-19 | 11-20 | 11-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $895 | $879 | $834 | $658 | $659 | $1,554 | 🔴 |
| Domiciliarios VIDEO - API | $525 | $746 | $691 | $680 | $576 | $566 | 🟡 |
| Domiciliarios VIDEO INTER - API | $653 | $919 | $1,018 | $1,067 | $852 | $708 | 🟢 |
| RADIO - Seguridad / Negocios | $1,584 | $1,322 | $1,114 | $1,121 | $2,156 | $991 | 🟢 |
| Motorizados - Q58 | $849 | $744 | $589 | $664 | $735 | $375 | 🟢 |
| RADIO - Moteros | $1,613 | $1,801 | $1,565 | $1,834 | $1,866 | $1,788 | 🟡 |
| Motorizados - API | $667 | $972 | $697 | $697 | $991 | $547 | 🟢 |
| Domiciliarios - Expancion - INTER | $625 | $640 | $611 | $728 | $629 | $631 | 🟡 |
| Motorizados - INTER | $679 | $532 | $573 | $475 | $510 | $236 | 🟢 |
| Domiciliarios INTER - API | $391 | $267 | $311 | $339 | $325 | $378 | 🔴 |
| Domiciliarios VIDEO Q58 - | $1,119 | $773 | $1,101 | $891 | $1,032 | $343 | 🟢 |
| Domiciliarios - Expancion - API | $1,056 | $834 | $879 | $859 | $1,006 | $447 | 🟢 |
| TEST Creativos - API | $824 | $689 | $762 | $716 | $1,257 | $781 | 🟢 |
| RADIO - Fincas | $1,274 | $1,080 | $1,358 | $755 | $605 | — | 🟢 |
| Domiciliarios Q58 - | $1,195 | $1,035 | $1,137 | $1,133 | $1,363 | $747 | 🟢 |
| Domiciliarios - Expancion - Q58 | $303 | $319 | $298 | $326 | $237 | $123 | 🟢 |
| RADIO - Broad | $831 | $1,996 | $1,780 | $4,251 | — | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-16 | 11-17 | 11-18 | 11-19 | 11-20 | 11-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 5.41 | 5.57 | 7.12 | 10.08 | 8.97 | 3.76 | 🔴 |
| Domiciliarios VIDEO - API | 7.02 | 5.55 | 7.69 | 8.19 | 9.27 | 8.11 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.76 | 5.38 | 5.03 | 4.30 | 5.35 | 6.15 | 🟢 |
| RADIO - Seguridad / Negocios | 2.08 | 2.50 | 2.89 | 2.81 | 1.61 | 2.67 | 🟢 |
| Motorizados - Q58 | 2.83 | 3.35 | 4.00 | 3.74 | 3.52 | 5.62 | 🟢 |
| RADIO - Moteros | 3.83 | 3.67 | 4.30 | 2.70 | 2.85 | 2.35 | 🔴 |
| Motorizados - API | 6.39 | 4.49 | 6.97 | 8.35 | 5.75 | 11.32 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.56 | 4.15 | 3.73 | 2.61 | 3.28 | 3.29 | 🟡 |
| Motorizados - INTER | 7.24 | 10.22 | 10.80 | 11.41 | 11.13 | 22.22 | 🟢 |
| Domiciliarios INTER - API | 7.19 | 12.39 | 11.19 | 9.66 | 10.62 | 8.57 | 🔴 |
| Domiciliarios VIDEO Q58 - | 1.90 | 3.16 | 2.18 | 2.51 | 2.48 | 5.84 | 🟢 |
| Domiciliarios - Expancion - API | 4.84 | 6.25 | 7.27 | 7.74 | 6.80 | 11.05 | 🟢 |
| TEST Creativos - API | 7.68 | 12.23 | 9.79 | 9.48 | 4.75 | 7.19 | 🟢 |
| RADIO - Fincas | 3.18 | 3.70 | 3.45 | 5.76 | 7.99 | — | 🟢 |
| Domiciliarios Q58 - | 2.17 | 3.11 | 2.38 | 2.14 | 1.78 | 2.44 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.34 | 8.95 | 9.95 | 9.76 | 13.52 | 20.41 | 🟢 |
| RADIO - Broad | 9.38 | 2.96 | 3.58 | 1.69 | — | — | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-15 | $466,194 | 613 | $761 | $3,444 | 4.53 | $517,827 |
| 2026-11-16 | $588,173 | 781 | $753 | $3,462 | 4.60 | $665,530 |
| 2026-11-17 | $355,036 | 497 | $714 | $3,836 | 5.37 | $442,775 |
| 2026-11-18 | $491,703 | 674 | $730 | $3,893 | 5.34 | $590,238 |
| 2026-11-19 | $396,310 | 543 | $730 | $3,642 | 4.99 | $475,343 |
| 2026-11-20 | $402,257 | 543 | $741 | $3,731 | 5.04 | $469,396 |

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
