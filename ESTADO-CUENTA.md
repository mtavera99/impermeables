# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-22 09:05 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$153,947** |
| gastado hoy (hasta las 9h) | $62,370 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $340,618 |
| saldo proyectado a medianoche | $-124,301 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🔴 RECARGAR $311,333 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–9:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-18 | $66,760 | 159 | **$420** | $3,263 | 7.77 |
| 2026-10-19 | $101,877 | 211 | **$483** | $2,573 | 5.33 |
| 2026-10-20 | $70,584 | 144 | **$490** | $3,192 | 6.51 |
| 2026-10-21 | $100,052 | 222 | **$451** | $3,882 | 8.61 |
| 2026-10-22 **HOY** | $62,259 | 160 | **$389** | $3,823 | 9.82 |

🟢 **Hoy va mejor que ayer a la misma hora** ($389 vs $451).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   389  =  $ 3,823  ÷  9.82
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,823 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.82 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $9,183 | 23% | 25 | $367 | 12.76 |
| Domiciliarios - API | $35,000 | $9,103 | 26% | 31 | $294 | 14.33 |
| TEST Creativos - API | $40,000 | $8,735 | 22% | 26 | $336 | 16.61 |
| Domiciliarios VIDEO - API | $20,000 | $5,965 | 30% | 13 | $459 | 6.24 |
| Motorizados - API | $20,000 | $4,448 | 22% | 8 | $556 | 6.34 |
| Domiciliarios - Expancion - INTER | $25,000 | $4,055 | 16% | 1 | $4,055 | 0.75 |
| Domiciliarios INTER - API | $25,000 | $3,796 | 15% | 13 | $292 | 9.92 |
| Domiciliarios VIDEO INTER - API | $25,000 | $3,693 | 15% | 5 | $739 | 6.54 |
| Motorizados - Q58 | $25,000 | $3,332 | 13% | 11 | $303 | 9.71 |
| Domiciliarios - Expancion - Q58 | $25,000 | $2,882 | 12% | 5 | $576 | 6.49 |
| Motorizados - INTER | $25,000 | $2,703 | 11% | 5 | $541 | 12.89 |
| Domiciliarios VIDEO Q58 - | $25,000 | $2,513 | 10% | 3 | $838 | 4.12 |
| Domiciliarios Q58 - | $25,000 | $1,879 | 8% | 13 | $145 | 15.72 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $62,287 | 159 | **$392** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,201**/pedido |
| utilidad estimada de lo que va del día | **$192,948** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $478 | $556 | $485 | $583 | $422 | $367 | 🟢 |
| Domiciliarios - API | $395 | $472 | $464 | $484 | $347 | $294 | 🟢 |
| TEST Creativos - API | $538 | $504 | $475 | $609 | $534 | $336 | 🟢 |
| Domiciliarios VIDEO - API | $356 | $357 | $430 | $319 | $269 | $459 | 🔴 |
| Motorizados - API | $349 | $419 | $579 | $470 | $444 | $556 | 🔴 |
| Domiciliarios - Expancion - INTER | $428 | $586 | $536 | $629 | $602 | $4,055 | 🔴 |
| Domiciliarios INTER - API | $276 | $284 | $240 | $324 | $303 | $292 | 🟡 |
| Domiciliarios VIDEO INTER - API | $442 | $430 | $534 | $576 | $699 | $739 | 🟡 |
| Motorizados - Q58 | $546 | $569 | $732 | $545 | $1,023 | $303 | 🟢 |
| Domiciliarios - Expancion - Q58 | $773 | $751 | $1,462 | $1,121 | $1,075 | $576 | 🟢 |
| Motorizados - INTER | $529 | $521 | $480 | $591 | $458 | $541 | 🔴 |
| Domiciliarios VIDEO Q58 - | $567 | $874 | $586 | $642 | $990 | $838 | 🟢 |
| Domiciliarios Q58 - | $192 | $186 | $166 | $185 | $196 | $145 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.26 | 5.92 | 7.80 | 7.58 | 12.04 | 12.76 | 🟢 |
| Domiciliarios - API | 8.99 | 7.52 | 7.58 | 9.53 | 14.14 | 14.33 | 🟡 |
| TEST Creativos - API | 7.13 | 7.79 | 9.85 | 8.80 | 11.05 | 16.61 | 🟢 |
| Domiciliarios VIDEO - API | 8.25 | 7.95 | 6.55 | 11.78 | 14.73 | 6.24 | 🔴 |
| Motorizados - API | 8.90 | 7.49 | 5.69 | 8.05 | 9.34 | 6.34 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.23 | 3.47 | 5.28 | 4.46 | 5.34 | 0.75 | 🔴 |
| Domiciliarios INTER - API | 9.03 | 9.05 | 6.33 | 11.02 | 12.20 | 9.92 | 🔴 |
| Domiciliarios VIDEO INTER - API | 7.72 | 7.70 | 6.43 | 7.46 | 6.00 | 6.54 | 🟢 |
| Motorizados - Q58 | 5.76 | 5.24 | 4.15 | 5.75 | 3.32 | 9.71 | 🟢 |
| Domiciliarios - Expancion - Q58 | 4.00 | 4.12 | 2.02 | 2.71 | 3.66 | 6.49 | 🟢 |
| Motorizados - INTER | 7.18 | 8.33 | 8.02 | 8.76 | 13.63 | 12.89 | 🟡 |
| Domiciliarios VIDEO Q58 - | 4.81 | 3.07 | 5.02 | 3.62 | 3.20 | 4.12 | 🟢 |
| Domiciliarios Q58 - | 13.17 | 13.92 | 13.71 | 13.11 | 11.11 | 15.72 | 🟢 |

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
| 2026-10-21 | $342,272 | 802 | $427 | $3,982 | 9.33 | $945,142 |

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
