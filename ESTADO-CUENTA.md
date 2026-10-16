# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-16 09:36 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$106,372** |
| gastado hoy (hasta las 9h) | $60,730 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $237,060 |
| saldo proyectado a medianoche | $-69,958 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $303,348 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–9:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-12 | $54,959 | 136 | **$404** | $3,147 | 7.79 |
| 2026-10-13 | $84,167 | 237 | **$355** | $3,280 | 9.24 |
| 2026-10-14 | $51,284 | 140 | **$366** | $3,336 | 9.11 |
| 2026-10-15 | $45,432 | 132 | **$344** | $3,038 | 8.83 |
| 2026-10-16 **HOY** | $61,051 | 174 | **$351** | $3,129 | 8.92 |

🟠 Hoy va 2% más caro que ayer a la misma hora ($351 vs $344).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   351  =  $ 3,129  ÷  8.92
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,129 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.92 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | $20,000 | $11,570 | 58% | 44 | $263 | 11.82 |
| Domiciliarios VIDEO Q58 - | $20,000 | $7,394 | 37% | 22 | $336 | 8.23 |
| Domiciliarios - Expancion - API | $40,000 | $6,871 | 17% | 17 | $404 | 9.45 |
| Domiciliarios - API | $35,000 | $5,421 | 15% | 15 | $361 | 10.02 |
| TEST Creativos - API | $40,000 | $5,253 | 13% | 8 | $657 | 5.09 |
| Domiciliarios VIDEO - API | $20,000 | $3,846 | 19% | 13 | $296 | 8.57 |
| Domiciliarios VIDEO INTER - API | $20,000 | $3,673 | 18% | 6 | $612 | 5.48 |
| Motorizados - Q58 | $20,000 | $3,555 | 18% | 5 | $711 | 5.62 |
| Motorizados - API | $20,000 | $3,405 | 17% | 13 | $262 | 13.73 |
| Domiciliarios - Expancion - INTER | $20,000 | $3,095 | 15% | 8 | $387 | 5.44 |
| Domiciliarios INTER - API | $20,000 | $2,842 | 14% | 14 | $203 | 11.61 |
| Motorizados - INTER | $20,000 | $2,244 | 11% | 8 | $280 | 13.89 |
| Domiciliarios - Expancion - Q58 | $20,000 | $2,130 | 11% | 1 | $2,130 | 1.61 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $61,299 | 174 | **$352** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,476**/pedido |
| utilidad estimada de lo que va del día | **$218,015** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | — | — | — | — | $262 | $263 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | — | — | $352 | $336 | 🟡 |
| Domiciliarios - Expancion - API | $550 | $400 | $345 | $447 | $688 | $411 | 🟢 |
| Domiciliarios - API | $451 | $361 | $243 | $295 | $355 | $361 | 🟡 |
| TEST Creativos - API | $510 | $509 | $412 | $378 | $386 | $657 | 🔴 |
| Domiciliarios VIDEO - API | $276 | $269 | $254 | $257 | $288 | $296 | 🟡 |
| Domiciliarios VIDEO INTER - API | $515 | $373 | $518 | $530 | $444 | $621 | 🔴 |
| Motorizados - Q58 | — | — | — | — | $578 | $711 | 🔴 |
| Motorizados - API | $447 | $265 | $284 | $278 | $378 | $262 | 🟢 |
| Domiciliarios - Expancion - INTER | $603 | $436 | $428 | $569 | $386 | $391 | 🟡 |
| Domiciliarios INTER - API | $242 | $206 | $184 | $291 | $278 | $203 | 🟢 |
| Motorizados - INTER | $365 | $389 | $418 | $410 | $329 | $280 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | — | $857 | $2,130 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | — | — | — | — | 15.19 | 11.82 | 🔴 |
| Domiciliarios VIDEO Q58 - | — | — | — | — | 8.58 | 8.23 | 🟡 |
| Domiciliarios - Expancion - API | 6.36 | 7.99 | 10.87 | 7.43 | 4.47 | 9.33 | 🟢 |
| Domiciliarios - API | 7.58 | 9.25 | 16.04 | 12.23 | 9.38 | 10.02 | 🟢 |
| TEST Creativos - API | 8.95 | 9.47 | 14.12 | 12.49 | 10.18 | 5.09 | 🔴 |
| Domiciliarios VIDEO - API | 9.99 | 9.30 | 10.74 | 10.15 | 7.70 | 8.57 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.48 | 7.58 | 6.42 | 5.73 | 7.29 | 5.44 | 🔴 |
| Motorizados - Q58 | — | — | — | — | 5.71 | 5.62 | 🟡 |
| Motorizados - API | 6.89 | 11.48 | 12.90 | 11.42 | 8.11 | 13.73 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.35 | 4.53 | 5.44 | 4.17 | 6.08 | 5.38 | 🟡 |
| Domiciliarios INTER - API | 9.48 | 9.32 | 11.97 | 7.92 | 8.45 | 11.61 | 🟢 |
| Motorizados - INTER | 10.05 | 7.90 | 8.70 | 9.36 | 11.56 | 13.89 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | — | 3.51 | 1.61 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-10 | $185,284 | 496 | $374 | $3,442 | 9.21 | $610,922 |
| 2026-10-11 | $235,745 | 555 | $425 | $3,167 | 7.46 | $655,171 |
| 2026-10-12 | $264,255 | 759 | $348 | $2,947 | 8.46 | $954,133 |
| 2026-10-13 | $246,905 | 791 | $312 | $3,492 | 11.19 | $1,022,851 |
| 2026-10-14 | $233,678 | 645 | $362 | $3,194 | 8.82 | $801,711 |
| 2026-10-15 | $215,702 | 561 | $384 | $3,061 | 7.96 | $684,846 |

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
