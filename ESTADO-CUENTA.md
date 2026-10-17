# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-17 02:40 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$192,403** |
| gastado hoy (hasta las 2h) | $7,963 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $269,407 |
| saldo proyectado a medianoche | $-69,041 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $270,084 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–2:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-13 | $18,280 | 37 | **$494** | $2,894 | 5.86 |
| 2026-10-14 | $4,221 | 12 | **$352** | $3,674 | 10.44 |
| 2026-10-15 | $3,294 | 9 | **$366** | $2,984 | 8.15 |
| 2026-10-16 | $6,165 | 16 | **$385** | $2,926 | 7.59 |
| 2026-10-17 **HOY** | $7,963 | 31 | **$257** | $3,044 | 11.85 |

🟢 **Hoy va mejor que ayer a la misma hora** ($257 vs $385).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   257  =  $ 3,044  ÷  11.85
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,044 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 11.85 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Motorizados - Q58 | $20,000 | $1,291 | 6% | 3 | $430 | 9.23 |
| Domiciliarios - Expancion - Q58 | $20,000 | $1,218 | 6% | 3 | $406 | 6.74 |
| Domiciliarios VIDEO Q58 - | $20,000 | $968 | 5% | 3 | $323 | 7.75 |
| Domiciliarios Q58 - | $20,000 | $809 | 4% | 4 | $202 | 12.12 |
| Motorizados - INTER | $20,000 | $749 | 4% | 1 | $749 | 14.29 |
| Domiciliarios - Expancion - INTER | $20,000 | $471 | 2% | 2 | $236 | 6.85 |
| Domiciliarios - API | $35,000 | $396 | 1% | 6 | $66 | 55.56 |
| Motorizados - API | $20,000 | $394 | 2% | 1 | $394 | 8.20 |
| Domiciliarios - Expancion - API | $40,000 | $384 | 1% | 1 | $384 | 7.75 |
| Domiciliarios VIDEO - API | $20,000 | $357 | 2% | 3 | $119 | 28.30 |
| Domiciliarios INTER - API | $20,000 | $314 | 2% | 3 | $105 | 23.62 |
| Domiciliarios VIDEO INTER - API | $20,000 | $308 | 2% | 1 | $308 | 10.99 |
| TEST Creativos - API | $40,000 | $304 | 1% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $7,963 | 31 | **$257** | $2,402 | **11%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$4,722**/pedido |
| utilidad estimada de lo que va del día | **$41,800** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| Motorizados - Q58 | — | — | — | $584 | $690 | $430 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | $859 | $936 | $406 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | $354 | $380 | $323 | 🟢 |
| Domiciliarios Q58 - | — | — | — | $263 | $217 | $202 | 🟢 |
| Motorizados - INTER | $389 | $418 | $410 | $330 | $463 | $749 | 🔴 |
| Domiciliarios - Expancion - INTER | $436 | $428 | $569 | $387 | $567 | $236 | 🟢 |
| Domiciliarios - API | $361 | $243 | $295 | $356 | $402 | $66 | 🟢 |
| Motorizados - API | $265 | $284 | $278 | $380 | $344 | $394 | 🟡 |
| Domiciliarios - Expancion - API | $400 | $345 | $447 | $690 | $525 | $384 | 🟢 |
| Domiciliarios VIDEO - API | $269 | $254 | $257 | $289 | $366 | $119 | 🟢 |
| Domiciliarios INTER - API | $206 | $184 | $291 | $280 | $275 | $105 | 🟢 |
| Domiciliarios VIDEO INTER - API | $373 | $518 | $530 | $445 | $709 | $308 | 🟢 |
| TEST Creativos - API | $509 | $412 | $378 | $386 | $488 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| Motorizados - Q58 | — | — | — | 5.67 | 5.82 | 9.23 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | 3.50 | 3.79 | 6.74 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | 8.53 | 7.06 | 7.75 | 🟢 |
| Domiciliarios Q58 - | — | — | — | 15.07 | 14.94 | 12.12 | 🔴 |
| Motorizados - INTER | 7.90 | 8.70 | 9.36 | 11.53 | 8.38 | 14.29 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.53 | 5.44 | 4.17 | 6.07 | 3.17 | 6.85 | 🟢 |
| Domiciliarios - API | 9.25 | 16.04 | 12.23 | 9.35 | 8.80 | 55.56 | 🟢 |
| Motorizados - API | 11.48 | 12.90 | 11.42 | 8.08 | 9.43 | 8.20 | 🟡 |
| Domiciliarios - Expancion - API | 7.99 | 10.87 | 7.43 | 4.46 | 6.62 | 7.75 | 🟢 |
| Domiciliarios VIDEO - API | 9.30 | 10.74 | 10.15 | 7.68 | 6.85 | 28.30 | 🟢 |
| Domiciliarios INTER - API | 9.32 | 11.97 | 7.92 | 8.40 | 9.15 | 23.62 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.58 | 6.42 | 5.73 | 7.26 | 4.83 | 10.99 | 🟢 |
| TEST Creativos - API | 9.47 | 14.12 | 12.48 | 10.16 | 7.75 | — | 🔴 |

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
| 2026-10-16 | $316,034 | 743 | $425 | $3,123 | 7.34 | $876,670 |

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
