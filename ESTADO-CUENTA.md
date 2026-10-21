# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-21 07:01 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$152,167** |
| gastado hoy (hasta las 6h) | $37,749 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $366,404 |
| saldo proyectado a medianoche | $-176,488 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🔴 RECARGAR $337,734 — entra en zona de freno a las 14:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–6:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-17 | $29,596 | 75 | **$395** | $2,829 | 7.17 |
| 2026-10-18 | $21,889 | 60 | **$365** | $2,810 | 7.70 |
| 2026-10-19 | $42,615 | 86 | **$496** | $2,897 | 5.85 |
| 2026-10-20 | $26,191 | 50 | **$524** | $3,292 | 6.28 |
| 2026-10-21 **HOY** | $38,014 | 87 | **$437** | $3,681 | 8.43 |

🟢 **Hoy va mejor que ayer a la misma hora** ($437 vs $524).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   437  =  $ 3,681  ÷  8.43
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,681 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.43 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $4,696 | 12% | 6 | $783 | 5.95 |
| Domiciliarios Q58 - | $25,000 | $4,079 | 16% | 18 | $227 | 9.97 |
| Domiciliarios - API | $35,000 | $4,010 | 11% | 12 | $334 | 14.76 |
| Domiciliarios VIDEO - API | $20,000 | $3,811 | 19% | 9 | $423 | 9.44 |
| Domiciliarios VIDEO INTER - API | $25,000 | $3,255 | 13% | 6 | $542 | 8.04 |
| Domiciliarios INTER - API | $25,000 | $2,677 | 11% | 8 | $335 | 13.22 |
| Motorizados - INTER | $25,000 | $2,654 | 11% | 6 | $442 | 19.35 |
| Domiciliarios VIDEO Q58 - | $25,000 | $2,609 | 10% | 5 | $522 | 4.16 |
| Motorizados - Q58 | $25,000 | $2,601 | 10% | 1 | $2,601 | 1.17 |
| Motorizados - API | $20,000 | $2,184 | 11% | 4 | $546 | 6.29 |
| TEST Creativos - API | $40,000 | $2,176 | 5% | 9 | $242 | 18.95 |
| Domiciliarios - Expancion - INTER | $25,000 | $1,903 | 8% | 3 | $634 | 4.99 |
| Domiciliarios - Expancion - Q58 | $25,000 | $1,426 | 6% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $38,081 | 87 | **$438** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,046**/pedido |
| utilidad estimada de lo que va del día | **$101,576** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $525 | $478 | $556 | $485 | $578 | $806 | 🔴 |
| Domiciliarios Q58 - | $217 | $192 | $186 | $166 | $184 | $227 | 🔴 |
| Domiciliarios - API | $402 | $395 | $472 | $464 | $480 | $334 | 🟢 |
| Domiciliarios VIDEO - API | $366 | $356 | $357 | $430 | $315 | $423 | 🔴 |
| Domiciliarios VIDEO INTER - API | $709 | $442 | $430 | $534 | $574 | $542 | 🟢 |
| Domiciliarios INTER - API | $275 | $276 | $284 | $240 | $322 | $335 | 🟡 |
| Motorizados - INTER | $463 | $529 | $521 | $479 | $588 | $442 | 🟢 |
| Domiciliarios VIDEO Q58 - | $380 | $567 | $874 | $586 | $640 | $522 | 🟢 |
| Motorizados - Q58 | $690 | $546 | $569 | $732 | $542 | $2,601 | 🔴 |
| TEST Creativos - API | $488 | $538 | $504 | $475 | $606 | $245 | 🟢 |
| Motorizados - API | $344 | $349 | $419 | $579 | $468 | $546 | 🔴 |
| Domiciliarios - Expancion - INTER | $567 | $428 | $586 | $535 | $627 | $634 | 🟡 |
| Domiciliarios - Expancion - Q58 | $936 | $773 | $751 | $1,462 | $1,114 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 6.55 | 7.26 | 5.92 | 7.80 | 7.64 | 5.76 | 🔴 |
| Domiciliarios Q58 - | 14.87 | 13.17 | 13.92 | 13.71 | 13.21 | 9.97 | 🔴 |
| Domiciliarios - API | 8.72 | 8.99 | 7.52 | 7.58 | 9.60 | 14.76 | 🟢 |
| Domiciliarios VIDEO - API | 6.78 | 8.25 | 7.95 | 6.55 | 11.93 | 9.44 | 🔴 |
| Domiciliarios VIDEO INTER - API | 4.79 | 7.72 | 7.70 | 6.43 | 7.51 | 8.04 | 🟢 |
| Domiciliarios INTER - API | 9.03 | 9.03 | 9.05 | 6.33 | 11.14 | 13.22 | 🟢 |
| Motorizados - INTER | 8.26 | 7.18 | 8.33 | 8.02 | 8.83 | 19.35 | 🟢 |
| Domiciliarios VIDEO Q58 - | 7.02 | 4.81 | 3.07 | 5.02 | 3.62 | 4.16 | 🟢 |
| Motorizados - Q58 | 5.78 | 5.76 | 5.24 | 4.15 | 5.79 | 1.17 | 🔴 |
| TEST Creativos - API | 7.69 | 7.13 | 7.79 | 9.85 | 8.84 | 18.44 | 🟢 |
| Motorizados - API | 9.35 | 8.90 | 7.49 | 5.69 | 8.10 | 6.29 | 🔴 |
| Domiciliarios - Expancion - INTER | 3.16 | 4.23 | 3.47 | 5.28 | 4.48 | 4.99 | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.76 | 4.00 | 4.12 | 2.02 | 2.73 | — | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,422 | 796 | $431 | $3,066 | 7.11 | $934,360 |
| 2026-10-20 | $382,707 | 837 | $457 | $3,526 | 7.71 | $960,891 |

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
