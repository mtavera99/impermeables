# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-19 10:35 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$21,233** |
| gastado hoy (hasta las 10h) | $107,272 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $367,180 |
| saldo proyectado a medianoche | $-238,674 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $341,945 — entra en zona de freno a las 11:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–10:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-15 | $54,704 | 153 | **$358** | $3,081 | 8.62 |
| 2026-10-16 | $86,596 | 243 | **$356** | $3,167 | 8.89 |
| 2026-10-17 | $94,924 | 203 | **$468** | $3,174 | 6.79 |
| 2026-10-18 | $83,113 | 192 | **$433** | $3,318 | 7.66 |
| 2026-10-19 **HOY** | $107,272 | 224 | **$479** | $2,828 | 5.90 |

🟠 Hoy va 11% más caro que ayer a la misma hora ($479 vs $433).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   479  =  $ 2,828  ÷  5.90
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,828 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.90 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $15,189 | 38% | 36 | $422 | 9.78 |
| Domiciliarios - Expancion - API | $40,000 | $14,484 | 36% | 34 | $426 | 8.23 |
| Domiciliarios - API | $35,000 | $11,624 | 33% | 19 | $612 | 5.73 |
| Domiciliarios VIDEO - API | $20,000 | $7,958 | 40% | 15 | $531 | 4.77 |
| Domiciliarios Q58 - | $20,000 | $7,301 | 37% | 34 | $215 | 11.00 |
| Domiciliarios - Expancion - Q58 | $20,000 | $7,100 | 36% | 4 | $1,775 | 1.60 |
| Domiciliarios INTER - API | $20,000 | $7,089 | 35% | 25 | $284 | 4.22 |
| Domiciliarios VIDEO INTER - API | $20,000 | $6,871 | 34% | 15 | $458 | 6.63 |
| Motorizados - API | $20,000 | $6,815 | 34% | 9 | $757 | 4.17 |
| Motorizados - Q58 | $20,000 | $6,313 | 32% | 9 | $701 | 4.34 |
| Domiciliarios VIDEO Q58 - | $20,000 | $5,995 | 30% | 10 | $600 | 4.56 |
| Motorizados - INTER | $20,000 | $5,361 | 27% | 10 | $536 | 7.21 |
| Domiciliarios - Expancion - INTER | $20,000 | $5,172 | 26% | 4 | $1,293 | 1.92 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $107,272 | 224 | **$479** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,803**/pedido |
| utilidad estimada de lo que va del día | **$252,305** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $378 | $386 | $488 | $538 | $504 | $422 | 🟢 |
| Domiciliarios - Expancion - API | $447 | $690 | $525 | $478 | $555 | $426 | 🟢 |
| Domiciliarios - API | $295 | $356 | $402 | $395 | $472 | $612 | 🔴 |
| Domiciliarios VIDEO - API | $257 | $289 | $366 | $356 | $355 | $531 | 🔴 |
| Domiciliarios Q58 - | — | $263 | $217 | $192 | $186 | $215 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | $859 | $936 | $773 | $750 | $1,775 | 🔴 |
| Domiciliarios INTER - API | $291 | $280 | $275 | $276 | $284 | $284 | 🟡 |
| Domiciliarios VIDEO INTER - API | $530 | $445 | $709 | $442 | $430 | $458 | 🟡 |
| Motorizados - API | $278 | $380 | $344 | $349 | $419 | $757 | 🔴 |
| Motorizados - Q58 | — | $584 | $690 | $546 | $569 | $701 | 🔴 |
| Domiciliarios VIDEO Q58 - | — | $354 | $380 | $567 | $873 | $600 | 🟢 |
| Motorizados - INTER | $410 | $330 | $463 | $529 | $520 | $536 | 🟡 |
| Domiciliarios - Expancion - INTER | $569 | $387 | $567 | $428 | $586 | $1,293 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | 10-19 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 12.48 | 10.16 | 7.69 | 7.13 | 7.80 | 9.78 | 🟢 |
| Domiciliarios - Expancion - API | 7.43 | 4.46 | 6.55 | 7.26 | 5.94 | 8.23 | 🟢 |
| Domiciliarios - API | 12.23 | 9.35 | 8.72 | 8.99 | 7.56 | 5.73 | 🔴 |
| Domiciliarios VIDEO - API | 10.15 | 7.68 | 6.78 | 8.25 | 7.99 | 4.77 | 🔴 |
| Domiciliarios Q58 - | — | 15.07 | 14.87 | 13.17 | 13.98 | 11.00 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | 3.50 | 3.76 | 4.00 | 4.13 | 1.60 | 🔴 |
| Domiciliarios INTER - API | 7.92 | 8.40 | 9.03 | 9.03 | 9.12 | 4.22 | 🔴 |
| Domiciliarios VIDEO INTER - API | 5.73 | 7.26 | 4.79 | 7.72 | 7.73 | 6.63 | 🟡 |
| Motorizados - API | 11.42 | 8.08 | 9.35 | 8.90 | 7.53 | 4.17 | 🔴 |
| Motorizados - Q58 | — | 5.67 | 5.78 | 5.76 | 5.25 | 4.34 | 🔴 |
| Domiciliarios VIDEO Q58 - | — | 8.53 | 7.02 | 4.81 | 3.08 | 4.56 | 🟢 |
| Motorizados - INTER | 9.36 | 11.53 | 8.26 | 7.18 | 8.38 | 7.21 | 🟡 |
| Domiciliarios - Expancion - INTER | 4.17 | 6.07 | 3.16 | 4.23 | 3.48 | 1.92 | 🔴 |

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
| 2026-10-18 | $386,962 | 870 | $445 | $3,099 | 6.97 | $1,009,609 |

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
