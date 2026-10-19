# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-19 11:36 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$5,942** |
| gastado hoy (hasta las 11h) | $124,043 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $368,396 |
| saldo proyectado a medianoche | $-238,411 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $340,465 — entra en zona de freno a las 12:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–11:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-15 | $64,377 | 173 | **$372** | $3,095 | 8.32 |
| 2026-10-16 | $102,189 | 271 | **$377** | $3,201 | 8.49 |
| 2026-10-17 | $111,691 | 253 | **$441** | $3,242 | 7.34 |
| 2026-10-18 | $97,664 | 223 | **$438** | $3,317 | 7.57 |
| 2026-10-19 **HOY** | $124,043 | 270 | **$459** | $2,854 | 6.21 |

🟠 Hoy va 5% más caro que ayer a la misma hora ($459 vs $438).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   459  =  $ 2,854  ÷  6.21
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,854 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.21 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $17,095 | 43% | 41 | $417 | 10.13 |
| Domiciliarios - Expancion - API | $40,000 | $16,916 | 42% | 40 | $423 | 8.57 |
| Domiciliarios - API | $35,000 | $13,359 | 38% | 22 | $607 | 5.77 |
| Domiciliarios VIDEO - API | $20,000 | $8,848 | 44% | 21 | $421 | 6.15 |
| Domiciliarios Q58 - | $20,000 | $8,528 | 43% | 41 | $208 | 11.22 |
| Domiciliarios - Expancion - Q58 | $20,000 | $8,494 | 42% | 4 | $2,124 | 1.37 |
| Domiciliarios VIDEO INTER - API | $20,000 | $8,063 | 40% | 15 | $538 | 5.85 |
| Motorizados - API | $20,000 | $7,827 | 39% | 13 | $602 | 5.35 |
| Domiciliarios INTER - API | $20,000 | $7,802 | 39% | 31 | $252 | 4.58 |
| Motorizados - Q58 | $20,000 | $7,432 | 37% | 11 | $676 | 4.52 |
| Domiciliarios VIDEO Q58 - | $20,000 | $7,077 | 35% | 13 | $544 | 5.08 |
| Domiciliarios - Expancion - INTER | $20,000 | $6,322 | 32% | 7 | $903 | 2.81 |
| Motorizados - INTER | $20,000 | $6,280 | 31% | 11 | $571 | 6.48 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $124,043 | 270 | **$459** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,445**/pedido |
| utilidad estimada de lo que va del día | **$309,376** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $378 | $386 | $488 | $538 | $504 | $417 | 🟢 |
| Domiciliarios - Expancion - API | $447 | $690 | $525 | $478 | $555 | $423 | 🟢 |
| Domiciliarios - API | $295 | $356 | $402 | $395 | $472 | $607 | 🔴 |
| Domiciliarios VIDEO - API | $257 | $289 | $366 | $356 | $356 | $421 | 🔴 |
| Domiciliarios Q58 - | — | $263 | $217 | $192 | $186 | $208 | 🟡 |
| Domiciliarios - Expancion - Q58 | — | $859 | $936 | $773 | $751 | $2,124 | 🔴 |
| Domiciliarios VIDEO INTER - API | $530 | $445 | $709 | $442 | $430 | $538 | 🔴 |
| Motorizados - API | $278 | $380 | $344 | $349 | $419 | $602 | 🔴 |
| Domiciliarios INTER - API | $291 | $280 | $275 | $276 | $284 | $252 | 🟢 |
| Motorizados - Q58 | — | $584 | $690 | $546 | $569 | $676 | 🔴 |
| Domiciliarios VIDEO Q58 - | — | $354 | $380 | $567 | $874 | $544 | 🟢 |
| Domiciliarios - Expancion - INTER | $569 | $387 | $567 | $428 | $586 | $903 | 🔴 |
| Motorizados - INTER | $410 | $330 | $463 | $529 | $520 | $571 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 12.48 | 10.16 | 7.69 | 7.13 | 7.80 | 10.13 | 🟢 |
| Domiciliarios - Expancion - API | 7.43 | 4.46 | 6.55 | 7.26 | 5.94 | 8.57 | 🟢 |
| Domiciliarios - API | 12.23 | 9.35 | 8.72 | 8.99 | 7.56 | 5.77 | 🔴 |
| Domiciliarios VIDEO - API | 10.15 | 7.68 | 6.78 | 8.25 | 7.98 | 6.15 | 🔴 |
| Domiciliarios Q58 - | — | 15.07 | 14.87 | 13.17 | 13.98 | 11.22 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | 3.50 | 3.76 | 4.00 | 4.13 | 1.37 | 🔴 |
| Domiciliarios VIDEO INTER - API | 5.73 | 7.26 | 4.79 | 7.72 | 7.73 | 5.85 | 🔴 |
| Motorizados - API | 11.42 | 8.08 | 9.35 | 8.90 | 7.53 | 5.35 | 🔴 |
| Domiciliarios INTER - API | 7.92 | 8.40 | 9.03 | 9.03 | 9.11 | 4.58 | 🔴 |
| Motorizados - Q58 | — | 5.67 | 5.78 | 5.76 | 5.25 | 4.52 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | 8.53 | 7.02 | 4.81 | 3.08 | 5.08 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.17 | 6.07 | 3.16 | 4.23 | 3.48 | 2.81 | 🔴 |
| Motorizados - INTER | 9.36 | 11.53 | 8.26 | 7.18 | 8.37 | 6.48 | 🔴 |

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
| 2026-10-18 | $387,171 | 870 | $445 | $3,099 | 6.96 | $1,009,400 |

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
