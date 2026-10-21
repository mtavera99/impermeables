# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-21 09:02 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$113,855** |
| gastado hoy (hasta las 8h) | $75,818 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $370,330 |
| saldo proyectado a medianoche | $-180,656 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🔴 RECARGAR $337,977 — entra en zona de freno a las 14:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–8:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-17 | $62,142 | 139 | **$447** | $3,018 | 6.75 |
| 2026-10-18 | $50,603 | 119 | **$425** | $3,206 | 7.54 |
| 2026-10-19 | $81,059 | 167 | **$485** | $2,793 | 5.75 |
| 2026-10-20 | $57,087 | 107 | **$534** | $3,125 | 5.86 |
| 2026-10-21 **HOY** | $75,818 | 180 | **$421** | $3,812 | 9.05 |

🟢 **Hoy va mejor que ayer a la misma hora** ($421 vs $534).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   421  =  $ 3,812  ÷  9.05
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,812 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.05 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $10,688 | 27% | 21 | $509 | 9.93 |
| Domiciliarios - API | $35,000 | $8,629 | 25% | 26 | $332 | 14.96 |
| Domiciliarios Q58 - | $25,000 | $6,513 | 26% | 31 | $210 | 10.29 |
| Domiciliarios VIDEO INTER - API | $25,000 | $6,384 | 26% | 10 | $638 | 6.52 |
| Domiciliarios VIDEO - API | $20,000 | $6,360 | 32% | 21 | $303 | 13.13 |
| TEST Creativos - API | $40,000 | $5,471 | 14% | 13 | $421 | 12.96 |
| Motorizados - API | $20,000 | $5,175 | 26% | 13 | $398 | 9.45 |
| Domiciliarios INTER - API | $25,000 | $5,175 | 21% | 15 | $345 | 12.20 |
| Domiciliarios VIDEO Q58 - | $25,000 | $5,051 | 20% | 8 | $631 | 3.70 |
| Motorizados - Q58 | $25,000 | $4,884 | 20% | 1 | $4,884 | 0.67 |
| Motorizados - INTER | $25,000 | $4,712 | 19% | 9 | $524 | 13.49 |
| Domiciliarios - Expancion - INTER | $25,000 | $3,744 | 15% | 8 | $468 | 6.33 |
| Domiciliarios - Expancion - Q58 | $25,000 | $3,006 | 12% | 3 | $1,002 | 4.42 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $75,792 | 179 | **$423** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,783**/pedido |
| utilidad estimada de lo que va del día | **$211,548** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $525 | $478 | $556 | $485 | $580 | $509 | 🟢 |
| Domiciliarios - API | $402 | $395 | $472 | $464 | $482 | $332 | 🟢 |
| Domiciliarios Q58 - | $217 | $192 | $186 | $166 | $184 | $210 | 🟡 |
| Domiciliarios VIDEO INTER - API | $709 | $442 | $430 | $534 | $575 | $638 | 🟡 |
| Domiciliarios VIDEO - API | $366 | $356 | $357 | $430 | $318 | $303 | 🟡 |
| TEST Creativos - API | $488 | $538 | $504 | $475 | $607 | $421 | 🟢 |
| Motorizados - API | $344 | $349 | $419 | $579 | $470 | $398 | 🟢 |
| Domiciliarios INTER - API | $275 | $276 | $284 | $240 | $323 | $345 | 🟡 |
| Domiciliarios VIDEO Q58 - | $380 | $567 | $874 | $586 | $641 | $631 | 🟡 |
| Motorizados - Q58 | $690 | $546 | $569 | $732 | $544 | $4,884 | 🔴 |
| Motorizados - INTER | $463 | $529 | $521 | $479 | $590 | $524 | 🟢 |
| Domiciliarios - Expancion - INTER | $567 | $428 | $586 | $535 | $628 | $468 | 🟢 |
| Domiciliarios - Expancion - Q58 | $936 | $773 | $751 | $1,462 | $1,118 | $1,002 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 6.55 | 7.26 | 5.92 | 7.80 | 7.62 | 9.93 | 🟢 |
| Domiciliarios - API | 8.72 | 8.99 | 7.52 | 7.58 | 9.58 | 14.96 | 🟢 |
| Domiciliarios Q58 - | 14.87 | 13.17 | 13.92 | 13.71 | 13.18 | 10.29 | 🔴 |
| Domiciliarios VIDEO INTER - API | 4.79 | 7.72 | 7.70 | 6.43 | 7.50 | 6.52 | 🟡 |
| Domiciliarios VIDEO - API | 6.78 | 8.25 | 7.95 | 6.55 | 11.87 | 13.13 | 🟢 |
| TEST Creativos - API | 7.69 | 7.13 | 7.79 | 9.85 | 8.82 | 12.96 | 🟢 |
| Motorizados - API | 9.35 | 8.90 | 7.49 | 5.69 | 8.08 | 9.45 | 🟢 |
| Domiciliarios INTER - API | 9.03 | 9.03 | 9.05 | 6.33 | 11.09 | 12.20 | 🟢 |
| Domiciliarios VIDEO Q58 - | 7.02 | 4.81 | 3.07 | 5.02 | 3.62 | 3.70 | 🟡 |
| Motorizados - Q58 | 5.78 | 5.76 | 5.24 | 4.15 | 5.77 | 0.67 | 🔴 |
| Motorizados - INTER | 8.26 | 7.18 | 8.33 | 8.02 | 8.80 | 13.49 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.16 | 4.23 | 3.47 | 5.28 | 4.47 | 6.33 | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.76 | 4.00 | 4.12 | 2.02 | 2.72 | 4.42 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,890 | 743 | $418 | $3,079 | 7.36 | $881,814 |
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,422 | 796 | $431 | $3,066 | 7.11 | $934,360 |
| 2026-10-20 | $383,744 | 837 | $458 | $3,527 | 7.69 | $959,854 |

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
