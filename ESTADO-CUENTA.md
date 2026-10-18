# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-18 15:53 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$103,229** |
| gastado hoy (hasta las 15h) | $162,392 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $299,810 |
| saldo proyectado a medianoche | $-34,188 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $204,829 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-14 | $134,348 | 329 | **$408** | $3,390 | 8.30 |
| 2026-10-15 | $104,229 | 267 | **$390** | $3,031 | 7.76 |
| 2026-10-16 | $167,972 | 398 | **$422** | $3,287 | 7.79 |
| 2026-10-17 | $184,086 | 412 | **$447** | $3,247 | 7.27 |
| 2026-10-18 **HOY** | $162,525 | 366 | **$444** | $3,264 | 7.35 |

🟢 **Hoy va mejor que ayer a la misma hora** ($444 vs $447).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   444  =  $ 3,264  ÷  7.35
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,264 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.35 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $21,207 | 53% | 40 | $530 | 6.64 |
| TEST Creativos - API | $40,000 | $19,824 | 50% | 46 | $431 | 9.18 |
| Domiciliarios - API | $35,000 | $18,081 | 52% | 38 | $476 | 7.95 |
| Domiciliarios - Expancion - Q58 | $20,000 | $12,452 | 62% | 18 | $692 | 4.67 |
| Motorizados - Q58 | $20,000 | $12,338 | 62% | 22 | $561 | 5.61 |
| Motorizados - INTER | $20,000 | $10,505 | 53% | 23 | $457 | 9.77 |
| Domiciliarios VIDEO Q58 - | $20,000 | $10,441 | 52% | 11 | $949 | 3.05 |
| Motorizados - API | $20,000 | $10,039 | 50% | 23 | $436 | 7.45 |
| Domiciliarios VIDEO INTER - API | $20,000 | $9,973 | 50% | 22 | $453 | 7.54 |
| Domiciliarios VIDEO - API | $20,000 | $9,690 | 48% | 27 | $359 | 9.11 |
| Domiciliarios Q58 - | $20,000 | $9,623 | 48% | 52 | $185 | 13.59 |
| Domiciliarios INTER - API | $20,000 | $9,530 | 48% | 31 | $307 | 9.01 |
| Domiciliarios - Expancion - INTER | $20,000 | $8,885 | 44% | 15 | $592 | 3.75 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $162,588 | 368 | **$442** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,122**/pedido |
| utilidad estimada de lo que va del día | **$428,146** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $345 | $447 | $690 | $525 | $478 | $530 | 🟡 |
| TEST Creativos - API | $412 | $378 | $386 | $488 | $538 | $432 | 🟢 |
| Domiciliarios - API | $243 | $295 | $356 | $402 | $395 | $479 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | $859 | $936 | $772 | $692 | 🟢 |
| Motorizados - Q58 | — | — | $584 | $690 | $546 | $561 | 🟡 |
| Motorizados - INTER | $418 | $410 | $330 | $463 | $529 | $457 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | $354 | $380 | $566 | $949 | 🔴 |
| Domiciliarios VIDEO INTER - API | $518 | $530 | $445 | $709 | $442 | $460 | 🟡 |
| Motorizados - API | $284 | $278 | $380 | $344 | $349 | $436 | 🔴 |
| Domiciliarios VIDEO - API | $254 | $257 | $289 | $366 | $356 | $359 | 🟡 |
| Domiciliarios Q58 - | — | — | $263 | $217 | $192 | $185 | 🟡 |
| Domiciliarios INTER - API | $184 | $291 | $280 | $275 | $276 | $307 | 🟡 |
| Domiciliarios - Expancion - INTER | $428 | $569 | $387 | $567 | $428 | $592 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 10.87 | 7.43 | 4.46 | 6.55 | 7.26 | 6.64 | 🟡 |
| TEST Creativos - API | 14.12 | 12.48 | 10.16 | 7.69 | 7.14 | 9.14 | 🟢 |
| Domiciliarios - API | 16.04 | 12.23 | 9.35 | 8.72 | 9.00 | 7.90 | 🟡 |
| Domiciliarios - Expancion - Q58 | — | — | 3.50 | 3.76 | 4.00 | 4.67 | 🟢 |
| Motorizados - Q58 | — | — | 5.67 | 5.78 | 5.76 | 5.61 | 🟡 |
| Motorizados - INTER | 8.70 | 9.36 | 11.53 | 8.26 | 7.18 | 9.77 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | 8.53 | 7.02 | 4.82 | 3.05 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.42 | 5.73 | 7.26 | 4.79 | 7.73 | 7.48 | 🟡 |
| Motorizados - API | 12.90 | 11.42 | 8.08 | 9.35 | 8.91 | 7.45 | 🔴 |
| Domiciliarios VIDEO - API | 10.74 | 10.15 | 7.68 | 6.78 | 8.26 | 9.11 | 🟢 |
| Domiciliarios Q58 - | — | — | 15.07 | 14.87 | 13.17 | 13.59 | 🟡 |
| Domiciliarios INTER - API | 11.97 | 7.92 | 8.40 | 9.03 | 9.04 | 9.01 | 🟡 |
| Domiciliarios - Expancion - INTER | 5.44 | 4.17 | 6.07 | 3.16 | 4.24 | 3.75 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-12 | $264,255 | 759 | $348 | $2,947 | 8.46 | $954,133 |
| 2026-10-13 | $246,905 | 791 | $312 | $3,492 | 11.19 | $1,022,851 |
| 2026-10-14 | $233,678 | 645 | $362 | $3,194 | 8.82 | $801,711 |
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,859 | 743 | $418 | $3,081 | 7.36 | $881,845 |

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
