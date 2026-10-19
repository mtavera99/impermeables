# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-19 08:34 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$62,943** |
| gastado hoy (hasta las 8h) | $67,308 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $359,536 |
| saldo proyectado a medianoche | $-229,285 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $340,199 — entra en zona de freno a las 11:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–8:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-15 | $35,993 | 109 | **$330** | $3,014 | 9.13 |
| 2026-10-16 | $55,809 | 159 | **$351** | $3,039 | 8.66 |
| 2026-10-17 | $62,142 | 139 | **$447** | $3,018 | 6.75 |
| 2026-10-18 | $50,594 | 119 | **$425** | $3,206 | 7.54 |
| 2026-10-19 **HOY** | $67,308 | 138 | **$488** | $2,960 | 6.07 |

🟠 Hoy va 15% más caro que ayer a la misma hora ($488 vs $425).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   488  =  $ 2,960  ÷  6.07
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,960 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.07 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $10,727 | 27% | 24 | $447 | 8.94 |
| Domiciliarios - Expancion - API | $40,000 | $8,942 | 22% | 21 | $426 | 7.43 |
| Domiciliarios - API | $35,000 | $7,401 | 21% | 14 | $529 | 6.51 |
| Domiciliarios VIDEO - API | $20,000 | $5,484 | 27% | 11 | $499 | 4.63 |
| Domiciliarios VIDEO INTER - API | $20,000 | $4,868 | 24% | 10 | $487 | 6.30 |
| Domiciliarios - Expancion - Q58 | $20,000 | $4,534 | 23% | 3 | $1,511 | 1.87 |
| Domiciliarios Q58 - | $20,000 | $4,271 | 21% | 17 | $251 | 9.31 |
| Motorizados - API | $20,000 | $4,237 | 21% | 5 | $847 | 3.42 |
| Domiciliarios INTER - API | $20,000 | $3,815 | 19% | 12 | $318 | 6.82 |
| Motorizados - Q58 | $20,000 | $3,592 | 18% | 6 | $599 | 4.80 |
| Domiciliarios - Expancion - INTER | $20,000 | $3,204 | 16% | 3 | $1,068 | 2.32 |
| Motorizados - INTER | $20,000 | $3,149 | 16% | 9 | $350 | 11.35 |
| Domiciliarios VIDEO Q58 - | $20,000 | $3,084 | 15% | 2 | $1,542 | 1.78 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $67,308 | 137 | **$491** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,031**/pedido |
| utilidad estimada de lo que va del día | **$152,612** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $378 | $386 | $488 | $538 | $503 | $447 | 🟢 |
| Domiciliarios - Expancion - API | $447 | $690 | $525 | $478 | $554 | $426 | 🟢 |
| Domiciliarios - API | $295 | $356 | $402 | $395 | $471 | $529 | 🟡 |
| Domiciliarios VIDEO - API | $257 | $289 | $366 | $356 | $354 | $499 | 🔴 |
| Domiciliarios VIDEO INTER - API | $530 | $445 | $709 | $442 | $430 | $487 | 🟡 |
| Domiciliarios - Expancion - Q58 | — | $859 | $936 | $773 | $749 | $1,511 | 🔴 |
| Domiciliarios Q58 - | — | $263 | $217 | $192 | $186 | $251 | 🔴 |
| Motorizados - API | $278 | $380 | $344 | $349 | $418 | $847 | 🔴 |
| Domiciliarios INTER - API | $291 | $280 | $275 | $276 | $283 | $318 | 🟡 |
| Motorizados - Q58 | — | $584 | $690 | $546 | $568 | $599 | 🟡 |
| Domiciliarios - Expancion - INTER | $569 | $387 | $567 | $428 | $586 | $1,068 | 🔴 |
| Motorizados - INTER | $410 | $330 | $463 | $529 | $519 | $350 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | $354 | $380 | $567 | $871 | $1,542 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 12.48 | 10.16 | 7.69 | 7.13 | 7.82 | 8.94 | 🟢 |
| Domiciliarios - Expancion - API | 7.43 | 4.46 | 6.55 | 7.26 | 5.96 | 7.43 | 🟢 |
| Domiciliarios - API | 12.23 | 9.35 | 8.72 | 8.99 | 7.58 | 6.51 | 🟡 |
| Domiciliarios VIDEO - API | 10.15 | 7.68 | 6.78 | 8.25 | 8.02 | 4.63 | 🔴 |
| Domiciliarios VIDEO INTER - API | 5.73 | 7.26 | 4.79 | 7.72 | 7.74 | 6.30 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | 3.50 | 3.76 | 4.00 | 4.14 | 1.87 | 🔴 |
| Domiciliarios Q58 - | — | 15.07 | 14.87 | 13.17 | 14.03 | 9.31 | 🔴 |
| Motorizados - API | 11.42 | 8.08 | 9.35 | 8.90 | 7.54 | 3.42 | 🔴 |
| Domiciliarios INTER - API | 7.92 | 8.40 | 9.03 | 9.03 | 9.14 | 6.82 | 🔴 |
| Motorizados - Q58 | — | 5.67 | 5.78 | 5.76 | 5.26 | 4.80 | 🟡 |
| Domiciliarios - Expancion - INTER | 4.17 | 6.07 | 3.16 | 4.23 | 3.48 | 2.32 | 🔴 |
| Motorizados - INTER | 9.36 | 11.53 | 8.26 | 7.18 | 8.39 | 11.35 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | 8.53 | 7.02 | 4.81 | 3.09 | 1.78 | 🔴 |

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
| 2026-10-18 | $386,302 | 870 | $444 | $3,100 | 6.98 | $1,010,269 |

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
