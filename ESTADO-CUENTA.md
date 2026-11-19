# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-18 22:39 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$314,705** |
| gastado hoy (hasta las 22h) | $467,171 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $475,526 |
| saldo proyectado a medianoche | $306,350 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–22:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-14 | $427,504 | 595 | **$718** | $3,136 | 4.37 |
| 2026-11-15 | $457,340 | 598 | **$765** | $3,462 | 4.53 |
| 2026-11-16 | $582,776 | 769 | **$758** | $3,464 | 4.57 |
| 2026-11-17 | $343,598 | 474 | **$725** | $3,837 | 5.29 |
| 2026-11-18 **HOY** | $467,949 | 640 | **$731** | $3,931 | 5.38 |

🟠 Hoy va 1% más caro que ayer a la misma hora ($731 vs $725).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   731  =  $ 3,931  ÷  5.38
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,931 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.38 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $42,036 | 105% | 38 | $1,106 | 2.90 |
| Domiciliarios - API | $35,000 | $40,053 | 114% | 50 | $801 | 7.38 |
| Domiciliarios VIDEO INTER - API | $36,000 | $37,254 | 103% | 37 | $1,007 | 5.13 |
| RADIO - Moteros | $35,000 | $37,089 | 106% | 22 | $1,686 | 4.04 |
| Domiciliarios - Expancion - API | $30,000 | $32,887 | 110% | 39 | $843 | 7.56 |
| Motorizados - Q58 | $29,000 | $30,589 | 105% | 51 | $600 | 3.99 |
| Domiciliarios - Expancion - Q58 | $29,000 | $29,480 | 102% | 99 | $298 | 10.02 |
| Domiciliarios Q58 - | $25,000 | $27,403 | 110% | 25 | $1,096 | 2.54 |
| Domiciliarios - Expancion - INTER | $25,000 | $26,796 | 107% | 42 | $638 | 3.67 |
| Domiciliarios VIDEO Q58 - | $25,000 | $25,159 | 101% | 23 | $1,094 | 2.24 |
| Motorizados - INTER | $25,000 | $22,686 | 91% | 39 | $582 | 10.72 |
| Domiciliarios VIDEO - API | $20,000 | $22,378 | 112% | 31 | $722 | 7.33 |
| RADIO - Fincas | $20,000 | $21,853 | 109% | 15 | $1,457 | 3.26 |
| Motorizados - API | $20,000 | $21,832 | 109% | 32 | $682 | 7.08 |
| Domiciliarios INTER - API | $20,000 | $20,508 | 103% | 66 | $311 | 11.26 |
| TEST Creativos - API | $20,000 | $19,861 | 99% | 25 | $794 | 9.44 |
| RADIO - Broad | $10,000 | $9,920 | 99% | 6 | $1,653 | 3.79 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $467,784 | 640 | **$731** | $2,402 | **30%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$13,436**/pedido |
| utilidad estimada de lo que va del día | **$559,579** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,073 | $1,219 | $1,185 | $1,584 | $1,321 | $1,110 | 🟢 |
| Domiciliarios - API | $1,151 | $779 | $736 | $895 | $878 | $801 | 🟢 |
| Domiciliarios VIDEO INTER - API | $768 | $645 | $706 | $653 | $919 | $1,007 | 🟡 |
| RADIO - Moteros | $1,314 | $1,535 | $2,037 | $1,613 | $1,801 | $1,686 | 🟢 |
| Domiciliarios - Expancion - API | $1,140 | $1,193 | $1,162 | $1,056 | $833 | $843 | 🟡 |
| Motorizados - Q58 | $612 | $589 | $813 | $849 | $744 | $600 | 🟢 |
| Domiciliarios - Expancion - Q58 | $348 | $372 | $331 | $303 | $319 | $298 | 🟢 |
| Domiciliarios Q58 - | $1,039 | $1,913 | $1,204 | $1,195 | $1,035 | $1,096 | 🟡 |
| Domiciliarios - Expancion - INTER | $660 | $652 | $596 | $625 | $640 | $639 | 🟡 |
| Domiciliarios VIDEO Q58 - | $880 | $709 | $1,015 | $1,119 | $773 | $1,094 | 🔴 |
| Motorizados - INTER | $656 | $514 | $652 | $679 | $532 | $582 | 🟡 |
| Domiciliarios VIDEO - API | $564 | $657 | $691 | $525 | $746 | $722 | 🟡 |
| RADIO - Fincas | $1,359 | $1,038 | $887 | $1,274 | $1,079 | $1,457 | 🔴 |
| Motorizados - API | $793 | $935 | $1,022 | $667 | $971 | $682 | 🟢 |
| Domiciliarios INTER - API | $361 | $295 | $340 | $391 | $267 | $311 | 🔴 |
| TEST Creativos - API | $661 | $622 | $930 | $824 | $689 | $794 | 🔴 |
| RADIO - Broad | $1,916 | $1,649 | $1,970 | $831 | $1,996 | $1,653 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 2.84 | 2.71 | 3.12 | 2.08 | 2.50 | 2.90 | 🟢 |
| Domiciliarios - API | 3.74 | 5.36 | 6.47 | 5.41 | 5.58 | 7.38 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.46 | 6.64 | 6.78 | 6.76 | 5.38 | 5.13 | 🟡 |
| RADIO - Moteros | 3.80 | 4.23 | 2.95 | 3.83 | 3.67 | 4.04 | 🟢 |
| Domiciliarios - Expancion - API | 4.02 | 4.33 | 4.63 | 4.84 | 6.25 | 7.56 | 🟢 |
| Motorizados - Q58 | 3.43 | 2.80 | 2.54 | 2.83 | 3.35 | 3.99 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.05 | 5.74 | 7.10 | 7.34 | 8.95 | 10.02 | 🟢 |
| Domiciliarios Q58 - | 2.20 | 1.05 | 1.78 | 2.17 | 3.11 | 2.54 | 🔴 |
| Domiciliarios - Expancion - INTER | 2.96 | 2.78 | 3.72 | 3.56 | 4.15 | 3.65 | 🟡 |
| Domiciliarios VIDEO Q58 - | 2.51 | 2.84 | 2.36 | 1.90 | 3.16 | 2.24 | 🔴 |
| Motorizados - INTER | 7.89 | 9.71 | 8.13 | 7.24 | 10.22 | 10.72 | 🟡 |
| Domiciliarios VIDEO - API | 5.83 | 5.31 | 5.52 | 7.02 | 5.55 | 7.33 | 🟢 |
| RADIO - Fincas | 3.20 | 3.75 | 5.55 | 3.18 | 3.70 | 3.26 | 🟡 |
| Motorizados - API | 4.55 | 4.02 | 3.61 | 6.39 | 4.49 | 7.08 | 🟢 |
| Domiciliarios INTER - API | 7.88 | 9.64 | 9.01 | 7.19 | 12.39 | 11.26 | 🟡 |
| TEST Creativos - API | 7.75 | 7.73 | 5.05 | 7.68 | 12.23 | 9.44 | 🔴 |
| RADIO - Broad | 3.51 | 3.73 | 3.66 | 9.38 | 2.96 | 3.79 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-12 | $423,316 | 553 | $765 | $3,631 | 4.74 | $464,390 |
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,967 | 599 | $719 | $3,122 | 4.34 | $530,580 |
| 2026-11-15 | $466,194 | 613 | $761 | $3,444 | 4.53 | $517,827 |
| 2026-11-16 | $588,173 | 781 | $753 | $3,462 | 4.60 | $665,530 |
| 2026-11-17 | $354,915 | 497 | $714 | $3,835 | 5.37 | $442,896 |

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
