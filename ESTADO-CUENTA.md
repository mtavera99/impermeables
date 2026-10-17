# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-17 07:55 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$161,151** |
| gastado hoy (hasta las 7h) | $40,268 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $273,352 |
| saldo proyectado a medianoche | $-71,934 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $269,031 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–7:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-13 | $53,895 | 130 | **$415** | $3,122 | 7.53 |
| 2026-10-14 | $30,944 | 89 | **$348** | $3,262 | 9.38 |
| 2026-10-15 | $26,205 | 81 | **$324** | $2,925 | 9.04 |
| 2026-10-16 | $39,973 | 108 | **$370** | $2,986 | 8.07 |
| 2026-10-17 **HOY** | $40,141 | 98 | **$410** | $2,947 | 7.19 |

🟠 Hoy va 11% más caro que ayer a la misma hora ($410 vs $370).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   410  =  $ 2,947  ÷  7.19
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,947 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.19 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $4,559 | 13% | 11 | $414 | 9.21 |
| Motorizados - Q58 | $20,000 | $4,194 | 21% | 9 | $466 | 6.37 |
| Domiciliarios VIDEO Q58 - | $20,000 | $3,946 | 20% | 8 | $493 | 4.96 |
| Domiciliarios - Expancion - Q58 | $20,000 | $3,923 | 20% | 7 | $560 | 4.92 |
| Domiciliarios - Expancion - API | $40,000 | $3,821 | 10% | 8 | $478 | 7.33 |
| TEST Creativos - API | $40,000 | $3,441 | 9% | 2 | $1,720 | 2.14 |
| Domiciliarios Q58 - | $20,000 | $3,107 | 16% | 12 | $259 | 9.09 |
| Domiciliarios VIDEO - API | $20,000 | $2,673 | 13% | 5 | $535 | 5.62 |
| Motorizados - API | $20,000 | $2,462 | 12% | 4 | $616 | 5.46 |
| Domiciliarios VIDEO INTER - API | $20,000 | $2,216 | 11% | 6 | $369 | 9.16 |
| Domiciliarios INTER - API | $20,000 | $2,121 | 11% | 14 | $152 | 16.71 |
| Motorizados - INTER | $20,000 | $1,913 | 10% | 5 | $383 | 13.85 |
| Domiciliarios - Expancion - INTER | $20,000 | $1,892 | 9% | 7 | $270 | 5.89 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $40,268 | 98 | **$411** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,553**/pedido |
| utilidad estimada de lo que va del día | **$117,047** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $361 | $243 | $295 | $356 | $402 | $414 | 🟡 |
| Motorizados - Q58 | — | — | — | $584 | $690 | $466 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | $354 | $380 | $493 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | — | $859 | $936 | $560 | 🟢 |
| Domiciliarios - Expancion - API | $400 | $345 | $447 | $690 | $525 | $478 | 🟢 |
| TEST Creativos - API | $509 | $412 | $378 | $386 | $488 | $1,720 | 🔴 |
| Domiciliarios Q58 - | — | — | — | $263 | $217 | $259 | 🔴 |
| Domiciliarios VIDEO - API | $269 | $254 | $257 | $289 | $366 | $535 | 🔴 |
| Motorizados - API | $265 | $284 | $278 | $380 | $344 | $616 | 🔴 |
| Domiciliarios VIDEO INTER - API | $373 | $518 | $530 | $445 | $709 | $369 | 🟢 |
| Domiciliarios INTER - API | $206 | $184 | $291 | $280 | $275 | $152 | 🟢 |
| Motorizados - INTER | $389 | $418 | $410 | $330 | $463 | $383 | 🟢 |
| Domiciliarios - Expancion - INTER | $436 | $428 | $569 | $387 | $567 | $270 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 9.25 | 16.04 | 12.23 | 9.35 | 8.76 | 9.21 | 🟢 |
| Motorizados - Q58 | — | — | — | 5.67 | 5.80 | 6.37 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | 8.53 | 7.04 | 4.96 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | — | 3.50 | 3.78 | 4.92 | 🟢 |
| Domiciliarios - Expancion - API | 7.99 | 10.87 | 7.43 | 4.46 | 6.58 | 7.33 | 🟢 |
| TEST Creativos - API | 9.47 | 14.12 | 12.48 | 10.16 | 7.71 | 2.14 | 🔴 |
| Domiciliarios Q58 - | — | — | — | 15.07 | 14.90 | 9.09 | 🔴 |
| Domiciliarios VIDEO - API | 9.30 | 10.74 | 10.15 | 7.68 | 6.81 | 5.62 | 🔴 |
| Motorizados - API | 11.48 | 12.90 | 11.42 | 8.08 | 9.40 | 5.46 | 🔴 |
| Domiciliarios VIDEO INTER - API | 7.58 | 6.42 | 5.73 | 7.26 | 4.80 | 9.16 | 🟢 |
| Domiciliarios INTER - API | 9.32 | 11.97 | 7.92 | 8.40 | 9.11 | 16.71 | 🟢 |
| Motorizados - INTER | 7.90 | 8.70 | 9.36 | 11.53 | 8.33 | 13.85 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.53 | 5.44 | 4.17 | 6.07 | 3.16 | 5.89 | 🟢 |

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
| 2026-10-16 | $316,034 | 743 | $425 | $3,111 | 7.31 | $876,670 |

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
