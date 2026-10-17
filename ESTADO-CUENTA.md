# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-17 08:56 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$144,287** |
| gastado hoy (hasta las 8h) | $55,267 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $275,540 |
| saldo proyectado a medianoche | $-75,986 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $270,896 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–8:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-13 | $69,374 | 185 | **$375** | $3,187 | 8.50 |
| 2026-10-14 | $41,343 | 106 | **$390** | $3,320 | 8.51 |
| 2026-10-15 | $35,993 | 109 | **$330** | $3,014 | 9.13 |
| 2026-10-16 | $55,809 | 159 | **$351** | $3,039 | 8.66 |
| 2026-10-17 **HOY** | $55,267 | 124 | **$446** | $3,010 | 6.75 |

🟠 Hoy va 27% más caro que ayer a la misma hora ($446 vs $351).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   446  =  $ 3,010  ÷  6.75
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,010 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.75 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $6,657 | 19% | 14 | $476 | 8.19 |
| TEST Creativos - API | $40,000 | $6,042 | 15% | 3 | $2,014 | 1.94 |
| Domiciliarios - Expancion - API | $40,000 | $5,770 | 14% | 12 | $481 | 7.45 |
| Motorizados - Q58 | $20,000 | $5,295 | 26% | 10 | $530 | 5.66 |
| Domiciliarios VIDEO Q58 - | $20,000 | $4,955 | 25% | 10 | $496 | 5.02 |
| Domiciliarios - Expancion - Q58 | $20,000 | $4,638 | 23% | 8 | $580 | 4.76 |
| Domiciliarios VIDEO - API | $20,000 | $3,861 | 19% | 8 | $483 | 6.22 |
| Domiciliarios Q58 - | $20,000 | $3,654 | 18% | 14 | $261 | 8.99 |
| Motorizados - API | $20,000 | $3,367 | 17% | 5 | $673 | 4.90 |
| Domiciliarios VIDEO INTER - API | $20,000 | $3,041 | 15% | 8 | $380 | 8.67 |
| Domiciliarios INTER - API | $20,000 | $2,866 | 14% | 17 | $169 | 15.12 |
| Domiciliarios - Expancion - INTER | $20,000 | $2,780 | 14% | 8 | $348 | 4.82 |
| Motorizados - INTER | $20,000 | $2,341 | 12% | 6 | $390 | 12.53 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $55,267 | 123 | **$449** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,260**/pedido |
| utilidad estimada de lo que va del día | **$142,179** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $361 | $243 | $295 | $356 | $402 | $476 | 🔴 |
| TEST Creativos - API | $509 | $412 | $378 | $386 | $488 | $2,014 | 🔴 |
| Domiciliarios - Expancion - API | $400 | $345 | $447 | $690 | $525 | $481 | 🟢 |
| Motorizados - Q58 | — | — | — | $584 | $690 | $530 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | $354 | $380 | $496 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | — | $859 | $936 | $580 | 🟢 |
| Domiciliarios VIDEO - API | $269 | $254 | $257 | $289 | $366 | $483 | 🔴 |
| Domiciliarios Q58 - | — | — | — | $263 | $217 | $261 | 🔴 |
| Motorizados - API | $265 | $284 | $278 | $380 | $344 | $673 | 🔴 |
| Domiciliarios VIDEO INTER - API | $373 | $518 | $530 | $445 | $709 | $380 | 🟢 |
| Domiciliarios INTER - API | $206 | $184 | $291 | $280 | $275 | $169 | 🟢 |
| Domiciliarios - Expancion - INTER | $436 | $428 | $569 | $387 | $567 | $348 | 🟢 |
| Motorizados - INTER | $389 | $418 | $410 | $330 | $463 | $390 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 9.25 | 16.04 | 12.23 | 9.35 | 8.75 | 8.19 | 🟡 |
| TEST Creativos - API | 9.47 | 14.12 | 12.48 | 10.16 | 7.71 | 1.94 | 🔴 |
| Domiciliarios - Expancion - API | 7.99 | 10.87 | 7.43 | 4.46 | 6.58 | 7.45 | 🟢 |
| Motorizados - Q58 | — | — | — | 5.67 | 5.79 | 5.66 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | — | 8.53 | 7.04 | 5.02 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | — | 3.50 | 3.77 | 4.76 | 🟢 |
| Domiciliarios VIDEO - API | 9.30 | 10.74 | 10.15 | 7.68 | 6.80 | 6.22 | 🟡 |
| Domiciliarios Q58 - | — | — | — | 15.07 | 14.89 | 8.99 | 🔴 |
| Motorizados - API | 11.48 | 12.90 | 11.42 | 8.08 | 9.39 | 4.90 | 🔴 |
| Domiciliarios VIDEO INTER - API | 7.58 | 6.42 | 5.73 | 7.26 | 4.80 | 8.67 | 🟢 |
| Domiciliarios INTER - API | 9.32 | 11.97 | 7.92 | 8.40 | 9.10 | 15.12 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.53 | 5.44 | 4.17 | 6.07 | 3.16 | 4.82 | 🟢 |
| Motorizados - INTER | 7.90 | 8.70 | 9.36 | 11.53 | 8.32 | 12.53 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-11 | $235,745 | 555 | $425 | $3,167 | 7.46 | $655,171 |
| 2026-10-12 | $264,255 | 759 | $348 | $2,947 | 8.46 | $954,133 |
| 2026-10-13 | $246,905 | 791 | $312 | $3,492 | 11.19 | $1,022,851 |
| 2026-10-14 | $233,678 | 645 | $362 | $3,194 | 8.82 | $801,711 |
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,108 | 7.31 | $876,670 |

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
