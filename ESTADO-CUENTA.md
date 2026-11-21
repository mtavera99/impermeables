# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-20 23:29 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$181,670** |
| gastado hoy (hasta las 23h) | $393,332 |
| presupuesto activo | $429,000/día |
| cierre proyectado del día | $393,332 |
| saldo proyectado a medianoche | $181,670 |
| objetivo (cubrir un día de 143% + colchón) | $633,470 |

### 🟠 Recargar $58,468 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–23:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-16 | $588,173 | 781 | **$753** | $3,462 | 4.60 |
| 2026-11-17 | $355,036 | 497 | **$714** | $3,836 | 5.37 |
| 2026-11-18 | $491,703 | 674 | **$730** | $3,893 | 5.34 |
| 2026-11-19 | $396,310 | 543 | **$730** | $3,642 | 4.99 |
| 2026-11-20 **HOY** | $393,332 | 532 | **$739** | $3,759 | 5.08 |

🟠 Hoy va 1% más caro que ayer a la misma hora ($739 vs $730).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   739  =  $ 3,759  ÷  5.08
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,759 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.08 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $48,000 | $46,417 | 97% | 22 | $2,110 | 1.66 |
| Domiciliarios VIDEO INTER - API | $43,000 | $39,898 | 93% | 48 | $831 | 5.51 |
| Domiciliarios - API | $35,000 | $31,802 | 91% | 48 | $663 | 8.96 |
| Domiciliarios VIDEO Q58 - | $30,000 | $28,207 | 94% | 28 | $1,007 | 2.57 |
| Domiciliarios - Expancion - INTER | $30,000 | $26,087 | 87% | 43 | $607 | 3.43 |
| Motorizados - Q58 | $29,000 | $25,431 | 88% | 34 | $748 | 3.51 |
| RADIO - Moteros | $25,000 | $23,844 | 95% | 12 | $1,987 | 2.70 |
| Domiciliarios VIDEO - API | $24,000 | $23,465 | 98% | 42 | $559 | 9.47 |
| Domiciliarios Q58 - | $25,000 | $22,913 | 92% | 17 | $1,348 | 1.81 |
| Motorizados - INTER | $25,000 | $21,555 | 86% | 42 | $513 | 11.16 |
| Domiciliarios - Expancion - API | $20,000 | $18,685 | 93% | 18 | $1,038 | 6.54 |
| Motorizados - API | $20,000 | $18,506 | 93% | 19 | $974 | 5.86 |
| Domiciliarios INTER - API | $20,000 | $17,852 | 89% | 51 | $350 | 9.87 |
| TEST Creativos - API | $20,000 | $17,440 | 87% | 14 | $1,246 | 4.83 |
| Domiciliarios - Expancion - Q58 | $15,000 | $15,963 | 106% | 68 | $235 | 13.68 |
| RADIO - Fincas | $20,000 | $15,267 | 76% | 26 | $587 | 8.28 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $393,332 | 532 | **$739** | $2,402 | **31%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$13,591**/pedido |
| utilidad estimada de lo que va del día | **$460,663** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-15 | 11-16 | 11-17 | 11-18 | 11-19 | 11-20 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,185 | $1,584 | $1,322 | $1,114 | $1,121 | $2,110 | 🔴 |
| Domiciliarios VIDEO INTER - API | $706 | $653 | $919 | $1,018 | $1,067 | $831 | 🟢 |
| Domiciliarios - API | $736 | $895 | $879 | $834 | $658 | $663 | 🟡 |
| Domiciliarios VIDEO Q58 - | $1,015 | $1,119 | $773 | $1,101 | $891 | $1,007 | 🟡 |
| Domiciliarios - Expancion - INTER | $596 | $625 | $640 | $611 | $728 | $607 | 🟢 |
| Motorizados - Q58 | $813 | $849 | $744 | $589 | $664 | $748 | 🟡 |
| RADIO - Moteros | $2,037 | $1,613 | $1,801 | $1,565 | $1,834 | $1,987 | 🟡 |
| Domiciliarios VIDEO - API | $691 | $525 | $746 | $691 | $680 | $559 | 🟢 |
| Domiciliarios Q58 - | $1,204 | $1,195 | $1,035 | $1,137 | $1,133 | $1,348 | 🔴 |
| Motorizados - INTER | $652 | $679 | $532 | $573 | $475 | $513 | 🟡 |
| Domiciliarios - Expancion - API | $1,162 | $1,056 | $834 | $879 | $859 | $1,038 | 🔴 |
| Motorizados - API | $1,022 | $667 | $972 | $697 | $697 | $974 | 🔴 |
| Domiciliarios INTER - API | $340 | $391 | $267 | $311 | $339 | $350 | 🟡 |
| TEST Creativos - API | $930 | $824 | $689 | $762 | $716 | $1,246 | 🔴 |
| Domiciliarios - Expancion - Q58 | $331 | $303 | $319 | $298 | $326 | $235 | 🟢 |
| RADIO - Fincas | $887 | $1,274 | $1,080 | $1,358 | $755 | $587 | 🟢 |
| RADIO - Broad | $1,970 | $831 | $1,996 | $1,780 | $4,251 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-15 | 11-16 | 11-17 | 11-18 | 11-19 | 11-20 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 3.12 | 2.08 | 2.50 | 2.89 | 2.81 | 1.66 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.78 | 6.76 | 5.38 | 5.03 | 4.30 | 5.51 | 🟢 |
| Domiciliarios - API | 6.47 | 5.41 | 5.57 | 7.12 | 10.08 | 8.96 | 🟡 |
| Domiciliarios VIDEO Q58 - | 2.36 | 1.90 | 3.16 | 2.18 | 2.51 | 2.57 | 🟡 |
| Domiciliarios - Expancion - INTER | 3.72 | 3.56 | 4.15 | 3.73 | 2.61 | 3.43 | 🟢 |
| Motorizados - Q58 | 2.54 | 2.83 | 3.35 | 4.00 | 3.74 | 3.51 | 🟡 |
| RADIO - Moteros | 2.95 | 3.83 | 3.67 | 4.30 | 2.70 | 2.70 | 🟡 |
| Domiciliarios VIDEO - API | 5.52 | 7.02 | 5.55 | 7.69 | 8.19 | 9.47 | 🟢 |
| Domiciliarios Q58 - | 1.78 | 2.17 | 3.11 | 2.38 | 2.14 | 1.81 | 🔴 |
| Motorizados - INTER | 8.13 | 7.24 | 10.22 | 10.80 | 11.41 | 11.16 | 🟡 |
| Domiciliarios - Expancion - API | 4.63 | 4.84 | 6.25 | 7.27 | 7.74 | 6.54 | 🔴 |
| Motorizados - API | 3.61 | 6.39 | 4.49 | 6.97 | 8.35 | 5.86 | 🔴 |
| Domiciliarios INTER - API | 9.01 | 7.19 | 12.39 | 11.19 | 9.66 | 9.87 | 🟡 |
| TEST Creativos - API | 5.05 | 7.68 | 12.23 | 9.79 | 9.48 | 4.83 | 🔴 |
| Domiciliarios - Expancion - Q58 | 7.10 | 7.34 | 8.95 | 9.95 | 9.76 | 13.68 | 🟢 |
| RADIO - Fincas | 5.55 | 3.18 | 3.70 | 3.45 | 5.76 | 8.28 | 🟢 |
| RADIO - Broad | 3.66 | 9.38 | 2.96 | 3.58 | 1.69 | — | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-14 | $430,967 | 599 | $719 | $3,122 | 4.34 | $530,580 |
| 2026-11-15 | $466,194 | 613 | $761 | $3,444 | 4.53 | $517,827 |
| 2026-11-16 | $588,173 | 781 | $753 | $3,462 | 4.60 | $665,530 |
| 2026-11-17 | $355,036 | 497 | $714 | $3,836 | 5.37 | $442,775 |
| 2026-11-18 | $491,703 | 674 | $730 | $3,893 | 5.34 | $590,238 |
| 2026-11-19 | $396,310 | 543 | $730 | $3,642 | 4.99 | $475,343 |

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
