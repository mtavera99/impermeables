# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-19 18:39 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$25,192** |
| gastado hoy (hasta las 18h) | $242,309 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $338,879 |
| saldo proyectado a medianoche | $-71,378 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $202,949 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-15 | $137,097 | 344 | **$399** | $3,037 | 7.62 |
| 2026-10-16 | $229,473 | 509 | **$451** | $3,267 | 7.25 |
| 2026-10-17 | $256,249 | 586 | **$437** | $3,185 | 7.28 |
| 2026-10-18 | $248,791 | 535 | **$465** | $3,231 | 6.95 |
| 2026-10-19 **HOY** | $242,309 | 578 | **$419** | $2,955 | 7.05 |

🟢 **Hoy va mejor que ayer a la misma hora** ($419 vs $465).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   419  =  $ 2,955  ÷  7.05
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,955 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.05 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $31,904 | 80% | 74 | $431 | 10.35 |
| Domiciliarios - Expancion - API | $40,000 | $30,831 | 77% | 68 | $453 | 8.49 |
| Domiciliarios - API | $35,000 | $25,594 | 73% | 56 | $457 | 7.78 |
| Domiciliarios Q58 - | $20,000 | $18,418 | 92% | 110 | $167 | 13.77 |
| Domiciliarios - Expancion - Q58 | $20,000 | $16,090 | 80% | 9 | $1,788 | 1.61 |
| Motorizados - Q58 | $20,000 | $16,048 | 80% | 21 | $764 | 3.99 |
| Domiciliarios VIDEO INTER - API | $20,000 | $15,291 | 76% | 33 | $463 | 7.00 |
| Motorizados - INTER | $20,000 | $15,193 | 76% | 31 | $490 | 7.40 |
| Domiciliarios VIDEO - API | $20,000 | $15,016 | 75% | 32 | $469 | 5.76 |
| Domiciliarios INTER - API | $20,000 | $14,941 | 75% | 64 | $233 | 5.46 |
| Motorizados - API | $20,000 | $14,930 | 75% | 27 | $553 | 5.97 |
| Domiciliarios - Expancion - INTER | $20,000 | $14,378 | 72% | 28 | $514 | 5.33 |
| Domiciliarios VIDEO Q58 - | $20,000 | $13,675 | 68% | 25 | $547 | 5.15 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $242,309 | 578 | **$419** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,706**/pedido |
| utilidad estimada de lo que va del día | **$685,528** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $378 | $386 | $488 | $538 | $504 | $431 | 🟢 |
| Domiciliarios - Expancion - API | $447 | $690 | $525 | $478 | $556 | $453 | 🟢 |
| Domiciliarios - API | $295 | $356 | $402 | $395 | $472 | $457 | 🟡 |
| Domiciliarios Q58 - | — | $263 | $217 | $192 | $186 | $167 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | $859 | $936 | $773 | $751 | $1,788 | 🔴 |
| Motorizados - Q58 | — | $584 | $690 | $546 | $569 | $764 | 🔴 |
| Domiciliarios VIDEO INTER - API | $530 | $445 | $709 | $442 | $430 | $463 | 🟡 |
| Motorizados - INTER | $410 | $330 | $463 | $529 | $521 | $490 | 🟢 |
| Domiciliarios VIDEO - API | $257 | $289 | $366 | $356 | $357 | $469 | 🔴 |
| Domiciliarios INTER - API | $291 | $280 | $275 | $276 | $284 | $233 | 🟢 |
| Motorizados - API | $278 | $380 | $344 | $349 | $419 | $553 | 🔴 |
| Domiciliarios - Expancion - INTER | $569 | $387 | $567 | $428 | $586 | $514 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | $354 | $380 | $567 | $874 | $547 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 12.48 | 10.16 | 7.69 | 7.13 | 7.79 | 10.35 | 🟢 |
| Domiciliarios - Expancion - API | 7.43 | 4.46 | 6.55 | 7.26 | 5.93 | 8.49 | 🟢 |
| Domiciliarios - API | 12.23 | 9.35 | 8.72 | 8.99 | 7.53 | 7.78 | 🟡 |
| Domiciliarios Q58 - | — | 15.07 | 14.87 | 13.17 | 13.93 | 13.77 | 🟡 |
| Domiciliarios - Expancion - Q58 | — | 3.50 | 3.76 | 4.00 | 4.12 | 1.61 | 🔴 |
| Motorizados - Q58 | — | 5.67 | 5.78 | 5.76 | 5.24 | 3.99 | 🔴 |
| Domiciliarios VIDEO INTER - API | 5.73 | 7.26 | 4.79 | 7.72 | 7.71 | 7.00 | 🟡 |
| Motorizados - INTER | 9.36 | 11.53 | 8.26 | 7.18 | 8.34 | 7.40 | 🟡 |
| Domiciliarios VIDEO - API | 10.15 | 7.68 | 6.78 | 8.25 | 7.95 | 5.76 | 🔴 |
| Domiciliarios INTER - API | 7.92 | 8.40 | 9.03 | 9.03 | 9.06 | 5.46 | 🔴 |
| Motorizados - API | 11.42 | 8.08 | 9.35 | 8.90 | 7.50 | 5.97 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.17 | 6.07 | 3.16 | 4.23 | 3.47 | 5.33 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | 8.53 | 7.02 | 4.81 | 3.07 | 5.15 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-13 | $246,905 | 791 | $312 | $3,492 | 11.19 | $1,022,851 |
| 2026-10-14 | $233,678 | 645 | $362 | $3,194 | 8.82 | $801,711 |
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,091 | 6.94 | $1,009,281 |

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
