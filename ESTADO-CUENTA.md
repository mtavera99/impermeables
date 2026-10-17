# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-17 00:39 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$198,989** |
| gastado hoy (hasta las 0h) | $2,155 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $265,966 |
| saldo proyectado a medianoche | $-64,822 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $269,306 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–0:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-13 | $10,417 | 18 | **$579** | $2,867 | 4.95 |
| 2026-10-14 | $2,133 | 5 | **$427** | $3,628 | 8.50 |
| 2026-10-15 | $1,748 | 6 | **$291** | $3,138 | 10.77 |
| 2026-10-16 | $2,978 | 6 | **$496** | $2,975 | 5.99 |
| 2026-10-17 **HOY** | $2,155 | 10 | **$216** | $3,188 | 14.79 |

🟢 **Hoy va mejor que ayer a la misma hora** ($216 vs $496).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   216  =  $ 3,188  ÷  14.79
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,188 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 14.79 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Motorizados - Q58 | $20,000 | $397 | 2% | 3 | $132 | 33.71 |
| Domiciliarios - Expancion - Q58 | $20,000 | $330 | 2% | 0 | — | 0.00 |
| Domiciliarios VIDEO Q58 - | $20,000 | $249 | 1% | 1 | $249 | 10.64 |
| Domiciliarios Q58 - | $20,000 | $236 | 1% | 3 | $79 | 34.48 |
| Domiciliarios - API | $35,000 | $160 | 0% | 2 | $80 | 71.43 |
| Domiciliarios - Expancion - API | $40,000 | $144 | 0% | 0 | — | 0.00 |
| Motorizados - API | $20,000 | $119 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $119 | 1% | 0 | — | 0.00 |
| Domiciliarios INTER - API | $20,000 | $100 | 0% | 1 | $100 | 31.25 |
| TEST Creativos - API | $40,000 | $82 | 0% | 0 | — | 0.00 |
| Domiciliarios VIDEO INTER - API | $20,000 | $82 | 0% | 0 | — | 0.00 |
| Domiciliarios - Expancion - INTER | $20,000 | $75 | 0% | 0 | — | 0.00 |
| Motorizados - INTER | $20,000 | $62 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $2,155 | 10 | **$216** | $2,402 | **9%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$3,961**/pedido |
| utilidad estimada de lo que va del día | **$13,898** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| Motorizados - Q58 | — | — | — | $584 | $690 | $132 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | $859 | $936 | — | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | — | $354 | $380 | $249 | 🟢 |
| Domiciliarios Q58 - | — | — | — | $263 | $217 | $79 | 🟢 |
| Domiciliarios - API | $361 | $243 | $295 | $356 | $402 | $80 | 🟢 |
| Domiciliarios - Expancion - API | $400 | $345 | $447 | $690 | $525 | — | 🟢 |
| Motorizados - API | $265 | $284 | $278 | $380 | $344 | — | 🟢 |
| Domiciliarios VIDEO - API | $269 | $254 | $257 | $289 | $366 | — | 🔴 |
| Domiciliarios INTER - API | $206 | $184 | $291 | $280 | $275 | $100 | 🟢 |
| TEST Creativos - API | $509 | $412 | $378 | $386 | $488 | — | 🔴 |
| Domiciliarios VIDEO INTER - API | $373 | $518 | $530 | $445 | $709 | — | 🔴 |
| Domiciliarios - Expancion - INTER | $436 | $428 | $569 | $387 | $567 | — | 🔴 |
| Motorizados - INTER | $389 | $418 | $410 | $330 | $463 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| Motorizados - Q58 | — | — | — | 5.67 | 5.82 | 33.71 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | 3.50 | 3.80 | — | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | 8.53 | 7.08 | 10.64 | 🟢 |
| Domiciliarios Q58 - | — | — | — | 15.07 | 14.95 | 34.48 | 🟢 |
| Domiciliarios - API | 9.25 | 16.04 | 12.23 | 9.35 | 8.81 | 71.43 | 🟢 |
| Domiciliarios - Expancion - API | 7.99 | 10.87 | 7.43 | 4.46 | 6.63 | — | 🟢 |
| Motorizados - API | 11.48 | 12.90 | 11.42 | 8.08 | 9.44 | — | 🟢 |
| Domiciliarios VIDEO - API | 9.30 | 10.74 | 10.15 | 7.68 | 6.86 | — | 🟡 |
| Domiciliarios INTER - API | 9.32 | 11.97 | 7.92 | 8.40 | 9.16 | 31.25 | 🟢 |
| TEST Creativos - API | 9.47 | 14.12 | 12.48 | 10.16 | 7.77 | — | 🔴 |
| Domiciliarios VIDEO INTER - API | 7.58 | 6.42 | 5.73 | 7.26 | 4.83 | — | 🔴 |
| Domiciliarios - Expancion - INTER | 4.53 | 5.44 | 4.17 | 6.07 | 3.19 | — | 🔴 |
| Motorizados - INTER | 7.90 | 8.70 | 9.36 | 11.53 | 8.39 | — | 🔴 |

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
| 2026-10-16 | $316,034 | 743 | $425 | $3,130 | 7.36 | $876,670 |

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
