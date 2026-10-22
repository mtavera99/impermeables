# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-22 08:04 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$170,197** |
| gastado hoy (hasta las 7h) | $45,854 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $355,956 |
| saldo proyectado a medianoche | $-139,906 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🔴 RECARGAR $311,599 — entra en zona de freno a las 16:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–7:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-18 | $34,975 | 92 | **$380** | $3,100 | 8.16 |
| 2026-10-19 | $61,305 | 126 | **$487** | $2,888 | 5.94 |
| 2026-10-20 | $42,602 | 87 | **$490** | $3,134 | 6.40 |
| 2026-10-21 | $64,009 | 147 | **$435** | $3,743 | 8.60 |
| 2026-10-22 **HOY** | $46,304 | 120 | **$386** | $3,835 | 9.94 |

🟢 **Hoy va mejor que ayer a la misma hora** ($386 vs $435).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   386  =  $ 3,835  ÷  9.94
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,835 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.94 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $7,196 | 18% | 17 | $423 | 11.22 |
| Domiciliarios - API | $35,000 | $6,735 | 19% | 23 | $293 | 14.12 |
| TEST Creativos - API | $40,000 | $6,491 | 16% | 20 | $325 | 17.36 |
| Domiciliarios VIDEO - API | $20,000 | $4,767 | 24% | 10 | $477 | 5.99 |
| Motorizados - API | $20,000 | $3,302 | 17% | 4 | $826 | 4.34 |
| Domiciliarios - Expancion - INTER | $25,000 | $3,034 | 12% | 1 | $3,034 | 1.08 |
| Domiciliarios VIDEO INTER - API | $25,000 | $2,921 | 12% | 4 | $730 | 7.05 |
| Domiciliarios INTER - API | $25,000 | $2,746 | 11% | 9 | $305 | 9.35 |
| Motorizados - Q58 | $25,000 | $2,466 | 10% | 11 | $224 | 12.36 |
| Domiciliarios - Expancion - Q58 | $25,000 | $2,020 | 8% | 5 | $404 | 9.38 |
| Motorizados - INTER | $25,000 | $1,774 | 7% | 4 | $444 | 14.29 |
| Domiciliarios VIDEO Q58 - | $25,000 | $1,706 | 7% | 1 | $1,706 | 2.15 |
| Domiciliarios Q58 - | $25,000 | $1,331 | 5% | 11 | $121 | 18.18 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $46,489 | 120 | **$387** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,121**/pedido |
| utilidad estimada de lo que va del día | **$146,141** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $478 | $556 | $485 | $583 | $422 | $423 | 🟡 |
| Domiciliarios - API | $395 | $472 | $464 | $484 | $347 | $293 | 🟢 |
| TEST Creativos - API | $538 | $504 | $475 | $609 | $533 | $325 | 🟢 |
| Domiciliarios VIDEO - API | $356 | $357 | $430 | $319 | $268 | $477 | 🔴 |
| Motorizados - API | $349 | $419 | $579 | $470 | $444 | $826 | 🔴 |
| Domiciliarios - Expancion - INTER | $428 | $586 | $536 | $629 | $602 | $3,034 | 🔴 |
| Domiciliarios VIDEO INTER - API | $442 | $430 | $534 | $576 | $698 | $730 | 🟡 |
| Domiciliarios INTER - API | $276 | $284 | $240 | $324 | $303 | $305 | 🟡 |
| Motorizados - Q58 | $546 | $569 | $732 | $545 | $1,022 | $224 | 🟢 |
| Domiciliarios - Expancion - Q58 | $773 | $751 | $1,462 | $1,121 | $1,073 | $404 | 🟢 |
| Motorizados - INTER | $529 | $521 | $480 | $591 | $458 | $444 | 🟡 |
| Domiciliarios VIDEO Q58 - | $567 | $874 | $586 | $642 | $988 | $1,706 | 🔴 |
| Domiciliarios Q58 - | $192 | $186 | $166 | $185 | $196 | $121 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.26 | 5.92 | 7.80 | 7.58 | 12.04 | 11.22 | 🟡 |
| Domiciliarios - API | 8.99 | 7.52 | 7.58 | 9.53 | 14.15 | 14.12 | 🟡 |
| TEST Creativos - API | 7.13 | 7.79 | 9.85 | 8.80 | 11.07 | 17.36 | 🟢 |
| Domiciliarios VIDEO - API | 8.25 | 7.95 | 6.55 | 11.78 | 14.75 | 5.99 | 🔴 |
| Motorizados - API | 8.90 | 7.49 | 5.69 | 8.05 | 9.35 | 4.34 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.23 | 3.47 | 5.28 | 4.46 | 5.34 | 1.08 | 🔴 |
| Domiciliarios VIDEO INTER - API | 7.72 | 7.70 | 6.43 | 7.46 | 6.00 | 7.05 | 🟢 |
| Domiciliarios INTER - API | 9.03 | 9.05 | 6.33 | 11.02 | 12.22 | 9.35 | 🔴 |
| Motorizados - Q58 | 5.76 | 5.24 | 4.15 | 5.75 | 3.33 | 12.36 | 🟢 |
| Domiciliarios - Expancion - Q58 | 4.00 | 4.12 | 2.02 | 2.71 | 3.67 | 9.38 | 🟢 |
| Motorizados - INTER | 7.18 | 8.33 | 8.02 | 8.76 | 13.64 | 14.29 | 🟡 |
| Domiciliarios VIDEO Q58 - | 4.81 | 3.07 | 5.02 | 3.62 | 3.20 | 2.15 | 🔴 |
| Domiciliarios Q58 - | 13.17 | 13.92 | 13.71 | 13.11 | 11.12 | 18.18 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $341,955 | 802 | $426 | $3,982 | 9.34 | $945,459 |

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
