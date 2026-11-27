# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-26 23:48 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$254,984** |
| gastado hoy (hasta las 23h) | $490,301 |
| presupuesto activo | $483,000/día |
| cierre proyectado del día | $490,301 |
| saldo proyectado a medianoche | $254,984 |
| objetivo (cubrir un día de 143% + colchón) | $710,690 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–23:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-22 | $596,839 | 823 | **$725** | $3,464 | 4.78 |
| 2026-11-23 | $569,893 | 780 | **$731** | $3,415 | 4.67 |
| 2026-11-24 | $459,272 | 512 | **$897** | $4,085 | 4.55 |
| 2026-11-25 | $333,709 | 429 | **$778** | $3,863 | 4.97 |
| 2026-11-26 **HOY** | $490,110 | 590 | **$831** | $4,034 | 4.86 |

🟠 Hoy va 7% más caro que ayer a la misma hora ($831 vs $778).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   831  =  $ 4,034  ÷  4.86
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,034 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.86 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $48,000 | $48,060 | 100% | 33 | $1,456 | 2.79 |
| [EXP] Llanos y Boyacá · Radios Baofeng | $48,000 | $47,986 | 100% | 24 | $1,999 | 1.75 |
| Domiciliarios - Expancion - Q58 | $30,000 | $33,718 | 112% | 98 | $344 | 10.15 |
| Motorizados - INTER | $30,000 | $32,564 | 109% | 42 | $775 | 7.99 |
| Domiciliarios - API | $35,000 | $31,544 | 90% | 31 | $1,018 | 5.48 |
| Domiciliarios - Expancion - INTER | $30,000 | $31,386 | 105% | 45 | $697 | 4.10 |
| Domiciliarios VIDEO Q58 - | $30,000 | $30,545 | 102% | 32 | $955 | 3.79 |
| Motorizados - Q58 | $29,000 | $29,815 | 103% | 38 | $785 | 3.81 |
| RADIO - Moteros | $25,000 | $26,402 | 106% | 15 | $1,760 | 4.34 |
| Domiciliarios Q58 - | $25,000 | $25,512 | 102% | 16 | $1,594 | 2.34 |
| Domiciliarios INTER - API | $25,000 | $24,824 | 99% | 66 | $376 | 9.07 |
| [EXP] Sur Lluvioso · Impermeable Tradicional | $24,000 | $23,626 | 98% | 18 | $1,313 | 3.40 |
| Domiciliarios VIDEO - API | $24,000 | $22,795 | 95% | 27 | $844 | 6.02 |
| RADIO - Fincas | $20,000 | $21,836 | 109% | 15 | $1,456 | 2.74 |
| TEST Creativos - API | $20,000 | $21,279 | 106% | 28 | $760 | 7.87 |
| [EXP] Costa Caribe · V10 Intercomunicadores | $20,000 | $19,768 | 99% | 43 | $460 | 7.03 |
| Motorizados - API | $20,000 | $18,559 | 93% | 19 | $977 | 5.44 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $490,219 | 590 | **$831** | $2,402 | **35%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$15,274**/pedido |
| utilidad estimada de lo que va del día | **$456,881** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-21 | 11-22 | 11-23 | 11-24 | 11-25 | 11-26 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,409 | $1,314 | $1,159 | $2,019 | $1,036 | $1,456 | 🔴 |
| [EXP] Llanos y Boyacá · Radios Baofeng | $1,296 | $1,461 | $1,586 | $2,602 | $1,390 | $1,999 | 🔴 |
| Domiciliarios - Expancion - Q58 | $362 | $346 | $319 | $476 | $312 | $344 | 🟡 |
| Motorizados - INTER | $519 | $582 | $627 | $544 | $541 | $775 | 🔴 |
| Domiciliarios - API | $830 | $919 | $604 | $829 | $747 | $1,018 | 🔴 |
| Domiciliarios - Expancion - INTER | $661 | $712 | $668 | $1,413 | $764 | $697 | 🟢 |
| Domiciliarios VIDEO Q58 - | $949 | $1,017 | $759 | $937 | $1,003 | $955 | 🟡 |
| Motorizados - Q58 | $784 | $1,124 | $938 | $972 | $758 | $785 | 🟡 |
| RADIO - Moteros | $1,934 | $2,147 | $4,331 | $1,886 | $3,220 | $1,760 | 🟢 |
| Domiciliarios Q58 - | $1,112 | $1,005 | $982 | $1,240 | $1,360 | $1,595 | 🔴 |
| Domiciliarios INTER - API | $311 | $365 | $414 | $392 | $467 | $376 | 🟢 |
| [EXP] Sur Lluvioso · Impermeable Tradicional | $826 | $843 | $830 | $1,667 | $1,245 | $1,313 | 🟡 |
| Domiciliarios VIDEO - API | $650 | $400 | $730 | $773 | $718 | $844 | 🔴 |
| RADIO - Fincas | $1,208 | $1,266 | $1,413 | $1,475 | $772 | $1,456 | 🔴 |
| TEST Creativos - API | $581 | $780 | $647 | $1,383 | $1,006 | $760 | 🟢 |
| [EXP] Costa Caribe · V10 Intercomunicadores | $360 | $424 | $418 | $427 | $539 | $460 | 🟢 |
| Motorizados - API | $517 | $647 | $556 | $946 | $717 | $977 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-21 | 11-22 | 11-23 | 11-24 | 11-25 | 11-26 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 2.48 | 2.74 | 2.85 | 2.15 | 3.68 | 2.79 | 🔴 |
| [EXP] Llanos y Boyacá · Radios Baofeng | 1.41 | 1.59 | 1.66 | 1.33 | 2.12 | 1.75 | 🔴 |
| Domiciliarios - Expancion - Q58 | 6.40 | 8.62 | 9.05 | 6.93 | 10.84 | 10.15 | 🟡 |
| Motorizados - INTER | 8.75 | 9.23 | 8.40 | 11.03 | 11.62 | 7.99 | 🔴 |
| Domiciliarios - API | 7.43 | 5.75 | 8.87 | 7.01 | 7.73 | 5.48 | 🔴 |
| Domiciliarios - Expancion - INTER | 2.99 | 3.48 | 3.42 | 1.84 | 3.67 | 4.10 | 🟢 |
| Domiciliarios VIDEO Q58 - | 2.37 | 3.09 | 4.08 | 4.19 | 3.81 | 3.79 | 🟡 |
| Motorizados - Q58 | 2.76 | 2.29 | 2.72 | 3.16 | 3.83 | 3.81 | 🟡 |
| RADIO - Moteros | 2.29 | 2.38 | 1.22 | 3.03 | 1.99 | 4.34 | 🟢 |
| Domiciliarios Q58 - | 2.38 | 3.34 | 3.65 | 3.27 | 2.23 | 2.34 | 🟡 |
| Domiciliarios INTER - API | 7.01 | 8.15 | 7.23 | 9.07 | 7.59 | 9.07 | 🟢 |
| [EXP] Sur Lluvioso · Impermeable Tradicional | 4.87 | 4.88 | 4.80 | 2.66 | 3.53 | 3.40 | 🟡 |
| Domiciliarios VIDEO - API | 7.40 | 10.25 | 5.60 | 6.78 | 7.37 | 6.02 | 🔴 |
| RADIO - Fincas | 2.55 | 3.24 | 2.61 | 3.21 | 5.07 | 2.74 | 🔴 |
| TEST Creativos - API | 9.15 | 8.35 | 8.07 | 4.72 | 5.19 | 7.87 | 🟢 |
| [EXP] Costa Caribe · V10 Intercomunicadores | 7.59 | 7.44 | 7.36 | 8.56 | 6.05 | 7.03 | 🟢 |
| Motorizados - API | 10.36 | 7.87 | 8.85 | 5.30 | 6.82 | 5.44 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-20 | $404,941 | 543 | $746 | $3,732 | 5.00 | $466,712 |
| 2026-11-21 | $415,924 | 584 | $712 | $3,109 | 4.37 | $521,544 |
| 2026-11-22 | $596,839 | 823 | $725 | $3,464 | 4.78 | $724,285 |
| 2026-11-23 | $569,893 | 780 | $731 | $3,415 | 4.67 | $682,205 |
| 2026-11-24 | $459,272 | 512 | $897 | $4,085 | 4.55 | $362,618 |
| 2026-11-25 | $333,709 | 429 | $778 | $3,863 | 4.97 | $354,945 |

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
