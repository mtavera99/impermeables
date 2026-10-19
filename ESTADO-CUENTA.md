# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-19 09:35 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$41,281** |
| gastado hoy (hasta las 9h) | $88,355 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $364,584 |
| saldo proyectado a medianoche | $-234,948 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $340,814 — entra en zona de freno a las 11:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–9:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-15 | $45,432 | 132 | **$344** | $3,038 | 8.83 |
| 2026-10-16 | $71,989 | 199 | **$362** | $3,138 | 8.67 |
| 2026-10-17 | $78,311 | 172 | **$455** | $3,114 | 6.84 |
| 2026-10-18 | $66,760 | 159 | **$420** | $3,263 | 7.77 |
| 2026-10-19 **HOY** | $88,355 | 182 | **$485** | $2,793 | 5.75 |

🟠 Hoy va 16% más caro que ayer a la misma hora ($485 vs $420).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   485  =  $ 2,793  ÷  5.75
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,793 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.75 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $13,043 | 33% | 27 | $483 | 8.41 |
| Domiciliarios - Expancion - API | $40,000 | $11,809 | 30% | 30 | $394 | 8.53 |
| Domiciliarios - API | $35,000 | $9,276 | 27% | 18 | $515 | 6.58 |
| Domiciliarios VIDEO - API | $20,000 | $6,946 | 35% | 11 | $631 | 3.90 |
| Domiciliarios INTER - API | $20,000 | $6,249 | 31% | 22 | $284 | 4.48 |
| Domiciliarios VIDEO INTER - API | $20,000 | $5,939 | 30% | 14 | $424 | 7.15 |
| Motorizados - API | $20,000 | $5,744 | 29% | 8 | $718 | 4.30 |
| Domiciliarios - Expancion - Q58 | $20,000 | $5,744 | 29% | 3 | $1,915 | 1.46 |
| Domiciliarios Q58 - | $20,000 | $5,726 | 29% | 23 | $249 | 9.32 |
| Motorizados - Q58 | $20,000 | $4,944 | 25% | 8 | $618 | 4.77 |
| Domiciliarios VIDEO Q58 - | $20,000 | $4,579 | 23% | 6 | $763 | 3.54 |
| Domiciliarios - Expancion - INTER | $20,000 | $4,283 | 21% | 3 | $1,428 | 1.78 |
| Motorizados - INTER | $20,000 | $4,073 | 20% | 9 | $453 | 8.65 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $88,355 | 182 | **$485** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,924**/pedido |
| utilidad estimada de lo que va del día | **$203,801** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $378 | $386 | $488 | $538 | $504 | $483 | 🟡 |
| Domiciliarios - Expancion - API | $447 | $690 | $525 | $478 | $555 | $394 | 🟢 |
| Domiciliarios - API | $295 | $356 | $402 | $395 | $472 | $515 | 🟡 |
| Domiciliarios VIDEO - API | $257 | $289 | $366 | $356 | $354 | $631 | 🔴 |
| Domiciliarios INTER - API | $291 | $280 | $275 | $276 | $283 | $284 | 🟡 |
| Domiciliarios VIDEO INTER - API | $530 | $445 | $709 | $442 | $430 | $424 | 🟡 |
| Motorizados - API | $278 | $380 | $344 | $349 | $419 | $718 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | $859 | $936 | $773 | $750 | $1,915 | 🔴 |
| Domiciliarios Q58 - | — | $263 | $217 | $192 | $186 | $249 | 🔴 |
| Motorizados - Q58 | — | $584 | $690 | $546 | $569 | $618 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | $354 | $380 | $567 | $872 | $763 | 🟢 |
| Domiciliarios - Expancion - INTER | $569 | $387 | $567 | $428 | $586 | $1,428 | 🔴 |
| Motorizados - INTER | $410 | $330 | $463 | $529 | $520 | $453 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 12.48 | 10.16 | 7.69 | 7.13 | 7.81 | 8.41 | 🟢 |
| Domiciliarios - Expancion - API | 7.43 | 4.46 | 6.55 | 7.26 | 5.95 | 8.53 | 🟢 |
| Domiciliarios - API | 12.23 | 9.35 | 8.72 | 8.99 | 7.57 | 6.58 | 🟡 |
| Domiciliarios VIDEO - API | 10.15 | 7.68 | 6.78 | 8.25 | 8.00 | 3.90 | 🔴 |
| Domiciliarios INTER - API | 7.92 | 8.40 | 9.03 | 9.03 | 9.13 | 4.48 | 🔴 |
| Domiciliarios VIDEO INTER - API | 5.73 | 7.26 | 4.79 | 7.72 | 7.74 | 7.15 | 🟡 |
| Motorizados - API | 11.42 | 8.08 | 9.35 | 8.90 | 7.54 | 4.30 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | 3.50 | 3.76 | 4.00 | 4.14 | 1.46 | 🔴 |
| Domiciliarios Q58 - | — | 15.07 | 14.87 | 13.17 | 14.00 | 9.32 | 🔴 |
| Motorizados - Q58 | — | 5.67 | 5.78 | 5.76 | 5.26 | 4.77 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | 8.53 | 7.02 | 4.81 | 3.09 | 3.54 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.17 | 6.07 | 3.16 | 4.23 | 3.48 | 1.78 | 🔴 |
| Motorizados - INTER | 9.36 | 11.53 | 8.26 | 7.18 | 8.38 | 8.65 | 🟡 |

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
| 2026-10-18 | $386,638 | 870 | $444 | $3,099 | 6.97 | $1,009,933 |

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
