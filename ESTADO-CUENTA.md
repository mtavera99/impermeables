# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-22 03:02 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$212,265** |
| gastado hoy (hasta las 2h) | $5,963 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $360,662 |
| saldo proyectado a medianoche | $-142,434 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🔴 RECARGAR $309,422 — entra en zona de freno a las 16:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–2:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-18 | $9,377 | 26 | **$361** | $2,437 | 6.76 |
| 2026-10-19 | $11,829 | 26 | **$455** | $3,054 | 6.71 |
| 2026-10-20 | $5,372 | 18 | **$298** | $3,364 | 11.27 |
| 2026-10-21 | $10,585 | 28 | **$378** | $4,005 | 10.59 |
| 2026-10-22 **HOY** | $6,018 | 17 | **$354** | $4,088 | 11.55 |

🟢 **Hoy va mejor que ayer a la misma hora** ($354 vs $378).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   354  =  $ 4,088  ÷  11.55
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,088 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 11.55 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $1,011 | 3% | 5 | $202 | 26.88 |
| Domiciliarios - API | $35,000 | $852 | 2% | 3 | $284 | 20.13 |
| Domiciliarios VIDEO - API | $20,000 | $715 | 4% | 0 | — | 0.00 |
| Domiciliarios INTER - API | $25,000 | $492 | 2% | 0 | — | 0.00 |
| Domiciliarios - Expancion - INTER | $25,000 | $482 | 2% | 0 | — | 0.00 |
| Motorizados - API | $20,000 | $467 | 2% | 0 | — | 0.00 |
| Motorizados - Q58 | $25,000 | $415 | 2% | 1 | $415 | 5.43 |
| TEST Creativos - API | $40,000 | $365 | 1% | 3 | $122 | 46.88 |
| Domiciliarios - Expancion - Q58 | $25,000 | $315 | 1% | 1 | $315 | 12.20 |
| Motorizados - INTER | $25,000 | $287 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO INTER - API | $25,000 | $262 | 1% | 1 | $262 | 25.00 |
| Domiciliarios VIDEO Q58 - | $25,000 | $192 | 1% | 0 | — | 0.00 |
| Domiciliarios Q58 - | $25,000 | $165 | 1% | 3 | $55 | 39.47 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $6,020 | 17 | **$354** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,510**/pedido |
| utilidad estimada de lo que va del día | **$21,269** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $478 | $556 | $485 | $583 | $420 | $202 | 🟢 |
| Domiciliarios - API | $395 | $472 | $464 | $484 | $346 | $284 | 🟢 |
| Domiciliarios VIDEO - API | $356 | $357 | $430 | $319 | $267 | — | 🟢 |
| Domiciliarios INTER - API | $276 | $284 | $240 | $324 | $301 | — | 🟢 |
| Domiciliarios - Expancion - INTER | $428 | $586 | $536 | $629 | $600 | — | 🟡 |
| Motorizados - API | $349 | $419 | $579 | $470 | $442 | — | 🟢 |
| Motorizados - Q58 | $546 | $569 | $732 | $545 | $1,019 | $415 | 🟢 |
| TEST Creativos - API | $538 | $504 | $475 | $609 | $530 | $122 | 🟢 |
| Domiciliarios - Expancion - Q58 | $773 | $751 | $1,462 | $1,121 | $1,069 | $315 | 🟢 |
| Motorizados - INTER | $529 | $521 | $480 | $591 | $454 | — | 🟢 |
| Domiciliarios VIDEO INTER - API | $442 | $430 | $534 | $576 | $696 | $262 | 🟢 |
| Domiciliarios VIDEO Q58 - | $567 | $874 | $586 | $642 | $982 | — | 🔴 |
| Domiciliarios Q58 - | $192 | $186 | $166 | $185 | $195 | $55 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | 10-22 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 7.26 | 5.92 | 7.80 | 7.58 | 12.08 | 26.88 | 🟢 |
| Domiciliarios - API | 8.99 | 7.52 | 7.58 | 9.53 | 14.20 | 20.13 | 🟢 |
| Domiciliarios VIDEO - API | 8.25 | 7.95 | 6.55 | 11.78 | 14.84 | — | 🟢 |
| Domiciliarios INTER - API | 9.03 | 9.05 | 6.33 | 11.02 | 12.26 | — | 🟢 |
| Domiciliarios - Expancion - INTER | 4.23 | 3.47 | 5.28 | 4.46 | 5.36 | — | 🟢 |
| Motorizados - API | 8.90 | 7.49 | 5.69 | 8.05 | 9.38 | — | 🟢 |
| Motorizados - Q58 | 5.76 | 5.24 | 4.15 | 5.75 | 3.34 | 5.43 | 🟢 |
| TEST Creativos - API | 7.13 | 7.79 | 9.85 | 8.80 | 11.11 | 46.88 | 🟢 |
| Domiciliarios - Expancion - Q58 | 4.00 | 4.12 | 2.02 | 2.71 | 3.68 | 12.20 | 🟢 |
| Motorizados - INTER | 7.18 | 8.33 | 8.02 | 8.76 | 13.73 | — | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.72 | 7.70 | 6.43 | 7.46 | 6.02 | 25.00 | 🟢 |
| Domiciliarios VIDEO Q58 - | 4.81 | 3.07 | 5.02 | 3.62 | 3.22 | — | 🟡 |
| Domiciliarios Q58 - | 13.17 | 13.92 | 13.71 | 13.11 | 11.17 | 39.47 | 🟢 |

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
| 2026-10-21 | $340,496 | 802 | $425 | $3,981 | 9.38 | $946,918 |

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
