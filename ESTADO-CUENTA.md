# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-17 06:55 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$175,863** |
| gastado hoy (hasta las 6h) | $25,201 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $269,948 |
| saldo proyectado a medianoche | $-68,884 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $269,386 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–6:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-13 | $40,140 | 87 | **$461** | $3,055 | 6.62 |
| 2026-10-14 | $20,321 | 63 | **$323** | $3,221 | 9.99 |
| 2026-10-15 | $17,356 | 51 | **$340** | $2,855 | 8.39 |
| 2026-10-16 | $25,496 | 82 | **$311** | $2,872 | 9.24 |
| 2026-10-17 **HOY** | $25,464 | 67 | **$380** | $2,870 | 7.55 |

🟠 Hoy va 22% más caro que ayer a la misma hora ($380 vs $311).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   380  =  $ 2,870  ÷  7.55
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,870 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.55 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - Q58 | $20,000 | $2,998 | 15% | 3 | $999 | 2.75 |
| Motorizados - Q58 | $20,000 | $2,967 | 15% | 8 | $371 | 8.59 |
| Domiciliarios VIDEO Q58 - | $20,000 | $2,928 | 15% | 5 | $586 | 4.08 |
| Domiciliarios - API | $35,000 | $2,702 | 8% | 8 | $338 | 11.44 |
| Domiciliarios Q58 - | $20,000 | $2,249 | 11% | 9 | $250 | 9.20 |
| Domiciliarios - Expancion - API | $40,000 | $2,063 | 5% | 5 | $413 | 8.22 |
| TEST Creativos - API | $40,000 | $1,688 | 4% | 2 | $844 | 4.09 |
| Motorizados - INTER | $20,000 | $1,505 | 8% | 3 | $502 | 12.15 |
| Motorizados - API | $20,000 | $1,379 | 7% | 3 | $460 | 6.93 |
| Domiciliarios VIDEO - API | $20,000 | $1,352 | 7% | 4 | $338 | 8.21 |
| Domiciliarios INTER - API | $20,000 | $1,307 | 7% | 10 | $131 | 18.90 |
| Domiciliarios - Expancion - INTER | $20,000 | $1,280 | 6% | 5 | $256 | 5.97 |
| Domiciliarios VIDEO INTER - API | $20,000 | $1,053 | 5% | 2 | $526 | 6.33 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $25,471 | 67 | **$380** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,988**/pedido |
| utilidad estimada de lo que va del día | **$82,081** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| Motorizados - Q58 | — | — | — | $584 | $690 | $377 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | $859 | $936 | $999 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | — | $354 | $380 | $586 | 🔴 |
| Domiciliarios - API | $361 | $243 | $295 | $356 | $402 | $338 | 🟢 |
| Domiciliarios Q58 - | — | — | — | $263 | $217 | $250 | 🔴 |
| Domiciliarios - Expancion - API | $400 | $345 | $447 | $690 | $525 | $423 | 🟢 |
| TEST Creativos - API | $509 | $412 | $378 | $386 | $488 | $844 | 🔴 |
| Motorizados - INTER | $389 | $418 | $410 | $330 | $463 | $502 | 🟡 |
| Motorizados - API | $265 | $284 | $278 | $380 | $344 | $467 | 🔴 |
| Domiciliarios INTER - API | $206 | $184 | $291 | $280 | $275 | $137 | 🟢 |
| Domiciliarios VIDEO - API | $269 | $254 | $257 | $289 | $366 | $338 | 🟢 |
| Domiciliarios - Expancion - INTER | $436 | $428 | $569 | $387 | $567 | $256 | 🟢 |
| Domiciliarios VIDEO INTER - API | $373 | $518 | $530 | $445 | $709 | $526 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| Motorizados - Q58 | — | — | — | 5.67 | 5.80 | 8.40 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | 3.50 | 3.78 | 2.75 | 🔴 |
| Domiciliarios VIDEO Q58 - | — | — | — | 8.53 | 7.05 | 4.08 | 🔴 |
| Domiciliarios - API | 9.25 | 16.04 | 12.23 | 9.35 | 8.77 | 11.44 | 🟢 |
| Domiciliarios Q58 - | — | — | — | 15.07 | 14.91 | 9.20 | 🔴 |
| Domiciliarios - Expancion - API | 7.99 | 10.87 | 7.43 | 4.46 | 6.59 | 7.94 | 🟢 |
| TEST Creativos - API | 9.47 | 14.12 | 12.48 | 10.16 | 7.72 | 4.09 | 🔴 |
| Motorizados - INTER | 7.90 | 8.70 | 9.36 | 11.53 | 8.33 | 12.15 | 🟢 |
| Motorizados - API | 11.48 | 12.90 | 11.42 | 8.08 | 9.41 | 6.76 | 🔴 |
| Domiciliarios INTER - API | 9.32 | 11.97 | 7.92 | 8.40 | 9.11 | 18.38 | 🟢 |
| Domiciliarios VIDEO - API | 9.30 | 10.74 | 10.15 | 7.68 | 6.82 | 8.21 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.53 | 5.44 | 4.17 | 6.07 | 3.16 | 5.97 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.58 | 6.42 | 5.73 | 7.26 | 4.81 | 6.33 | 🟢 |

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
| 2026-10-16 | $316,034 | 743 | $425 | $3,114 | 7.32 | $876,670 |

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
