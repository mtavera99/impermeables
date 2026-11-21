# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-21 17:28 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$329,302** |
| gastado hoy (hasta las 17h) | $241,801 |
| presupuesto activo | $280,000/día |
| cierre proyectado del día | $404,249 |
| saldo proyectado a medianoche | $166,854 |
| objetivo (cubrir un día de 143% + colchón) | $420,400 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-17 | $192,565 | 267 | **$721** | $3,788 | 5.25 |
| 2026-11-18 | $319,447 | 412 | **$775** | $4,134 | 5.33 |
| 2026-11-19 | $244,504 | 326 | **$750** | $3,817 | 5.09 |
| 2026-11-20 | $231,591 | 325 | **$713** | $3,973 | 5.58 |
| 2026-11-21 **HOY** | $241,801 | 358 | **$675** | $3,981 | 5.89 |

🟢 **Hoy va mejor que ayer a la misma hora** ($675 vs $713).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   675  =  $ 3,981  ÷  5.89
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,981 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.89 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $48,000 | $27,196 | 57% | 17 | $1,600 | 2.38 |
| Domiciliarios - API | $35,000 | $23,873 | 68% | 30 | $796 | 8.34 |
| Domiciliarios VIDEO INTER - API | $0 | $18,194 | — | 22 | $827 | 5.37 |
| Domiciliarios Q58 - | $25,000 | $17,407 | 70% | 16 | $1,088 | 2.78 |
| Motorizados - INTER | $25,000 | $16,754 | 67% | 34 | $493 | 11.61 |
| Domiciliarios VIDEO Q58 - | $0 | $15,381 | — | 16 | $961 | 2.77 |
| Domiciliarios - Expancion - INTER | $0 | $15,143 | — | 29 | $522 | 4.66 |
| Domiciliarios VIDEO - API | $24,000 | $14,151 | 59% | 21 | $674 | 7.62 |
| Domiciliarios INTER - API | $20,000 | $13,494 | 67% | 47 | $287 | 10.16 |
| Motorizados - Q58 | $0 | $13,481 | — | 18 | $749 | 3.74 |
| TEST Creativos - API | $0 | $12,727 | — | 23 | $553 | 12.55 |
| Motorizados - API | $20,000 | $12,701 | 64% | 23 | $552 | 10.46 |
| RADIO - Moteros | $0 | $11,458 | — | 7 | $1,637 | 3.69 |
| RADIO - Fincas | $0 | $10,363 | — | 11 | $942 | 4.67 |
| Domiciliarios - Expancion - API | $0 | $9,550 | — | 12 | $796 | 8.78 |
| Domiciliarios - Expancion - Q58 | $15,000 | $8,531 | 57% | 32 | $267 | 10.91 |
| [EXP] Llanos y Boyacá · Radios Baofeng | $48,000 | $1,397 | 3% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $241,801 | 358 | **$675** | $2,402 | **28%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$12,416**/pedido |
| utilidad estimada de lo que va del día | **$332,880** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-16 | 11-17 | 11-18 | 11-19 | 11-20 | 11-21 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,584 | $1,322 | $1,114 | $1,121 | $2,173 | $1,600 | 🟢 |
| Domiciliarios - API | $895 | $879 | $834 | $659 | $662 | $796 | 🔴 |
| Domiciliarios VIDEO INTER - API | $653 | $919 | $1,018 | $1,067 | $859 | $827 | 🟡 |
| Domiciliarios Q58 - | $1,195 | $1,035 | $1,137 | $1,133 | $1,364 | $1,088 | 🟢 |
| Motorizados - INTER | $679 | $532 | $573 | $475 | $514 | $493 | 🟡 |
| Domiciliarios VIDEO Q58 - | $1,119 | $773 | $1,101 | $891 | $1,035 | $961 | 🟢 |
| Domiciliarios - Expancion - INTER | $625 | $640 | $611 | $728 | $632 | $522 | 🟢 |
| Domiciliarios VIDEO - API | $525 | $746 | $691 | $680 | $578 | $674 | 🔴 |
| Domiciliarios INTER - API | $391 | $267 | $311 | $339 | $327 | $287 | 🟢 |
| Motorizados - Q58 | $849 | $744 | $589 | $664 | $739 | $749 | 🟡 |
| TEST Creativos - API | $824 | $689 | $762 | $716 | $1,259 | $553 | 🟢 |
| Motorizados - API | $667 | $972 | $697 | $697 | $996 | $552 | 🟢 |
| RADIO - Moteros | $1,613 | $1,801 | $1,565 | $1,834 | $1,894 | $1,637 | 🟢 |
| RADIO - Fincas | $1,274 | $1,080 | $1,358 | $756 | $608 | $942 | 🔴 |
| Domiciliarios - Expancion - API | $1,056 | $834 | $879 | $859 | $1,010 | $796 | 🟢 |
| Domiciliarios - Expancion - Q58 | $303 | $319 | $298 | $326 | $240 | $267 | 🟡 |
| [EXP] Llanos y Boyacá · Radios Baofeng | — | — | — | — | — | — |  |
| RADIO - Broad | $831 | $1,996 | $1,780 | $4,251 | — | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-16 | 11-17 | 11-18 | 11-19 | 11-20 | 11-21 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 2.08 | 2.50 | 2.89 | 2.81 | 1.60 | 2.38 | 🟢 |
| Domiciliarios - API | 5.41 | 5.57 | 7.12 | 10.08 | 8.91 | 8.34 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.76 | 5.38 | 5.03 | 4.30 | 5.30 | 5.37 | 🟡 |
| Domiciliarios Q58 - | 2.17 | 3.11 | 2.38 | 2.14 | 1.78 | 2.78 | 🟢 |
| Motorizados - INTER | 7.24 | 10.22 | 10.80 | 11.41 | 11.01 | 11.61 | 🟢 |
| Domiciliarios VIDEO Q58 - | 1.90 | 3.16 | 2.18 | 2.51 | 2.47 | 2.77 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.56 | 4.15 | 3.73 | 2.61 | 3.27 | 4.66 | 🟢 |
| Domiciliarios VIDEO - API | 7.02 | 5.55 | 7.69 | 8.19 | 9.23 | 7.62 | 🔴 |
| Domiciliarios INTER - API | 7.19 | 12.39 | 11.19 | 9.66 | 10.57 | 10.16 | 🟡 |
| Motorizados - Q58 | 2.83 | 3.35 | 4.00 | 3.74 | 3.51 | 3.74 | 🟢 |
| TEST Creativos - API | 7.68 | 12.23 | 9.79 | 9.48 | 4.74 | 12.55 | 🟢 |
| Motorizados - API | 6.39 | 4.49 | 6.97 | 8.35 | 5.72 | 10.46 | 🟢 |
| RADIO - Moteros | 3.83 | 3.67 | 4.30 | 2.70 | 2.82 | 3.69 | 🟢 |
| RADIO - Fincas | 3.18 | 3.70 | 3.45 | 5.76 | 7.93 | 4.67 | 🔴 |
| Domiciliarios - Expancion - API | 4.84 | 6.25 | 7.27 | 7.74 | 6.76 | 8.78 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.34 | 8.95 | 9.95 | 9.76 | 13.37 | 10.91 | 🔴 |
| [EXP] Llanos y Boyacá · Radios Baofeng | — | — | — | — | — | — |  |
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
| 2026-11-19 | $396,366 | 543 | $730 | $3,642 | 4.99 | $475,287 |
| 2026-11-20 | $404,625 | 543 | $745 | $3,731 | 5.01 | $467,028 |

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
