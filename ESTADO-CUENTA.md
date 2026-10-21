# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-21 08:01 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$131,907** |
| gastado hoy (hasta las 7h) | $58,013 |
| presupuesto activo | $355,000/día |
| cierre proyectado del día | $369,434 |
| saldo proyectado a medianoche | $-179,514 |
| objetivo (cubrir un día de 143% + colchón) | $527,650 |

### 🔴 RECARGAR $337,730 — entra en zona de freno a las 14:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–7:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-17 | $45,987 | 108 | **$426** | $2,937 | 6.90 |
| 2026-10-18 | $34,975 | 92 | **$380** | $3,100 | 8.16 |
| 2026-10-19 | $61,305 | 126 | **$487** | $2,888 | 5.94 |
| 2026-10-20 | $42,602 | 87 | **$490** | $3,134 | 6.40 |
| 2026-10-21 **HOY** | $58,013 | 134 | **$433** | $3,764 | 8.69 |

🟢 **Hoy va mejor que ayer a la misma hora** ($433 vs $490).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   433  =  $ 3,764  ÷  8.69
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,764 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.69 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $7,963 | 20% | 10 | $796 | 6.31 |
| Domiciliarios - API | $35,000 | $6,404 | 18% | 20 | $320 | 15.47 |
| Domiciliarios VIDEO - API | $20,000 | $5,410 | 27% | 17 | $318 | 12.59 |
| Domiciliarios Q58 - | $25,000 | $5,363 | 21% | 27 | $199 | 10.92 |
| Domiciliarios VIDEO INTER - API | $25,000 | $5,137 | 21% | 10 | $514 | 8.46 |
| Domiciliarios VIDEO Q58 - | $25,000 | $4,001 | 16% | 5 | $800 | 2.86 |
| Domiciliarios INTER - API | $25,000 | $3,960 | 16% | 12 | $330 | 13.04 |
| Motorizados - Q58 | $25,000 | $3,703 | 15% | 1 | $3,703 | 0.84 |
| Motorizados - INTER | $25,000 | $3,663 | 15% | 6 | $610 | 12.35 |
| Motorizados - API | $20,000 | $3,662 | 18% | 10 | $366 | 9.73 |
| TEST Creativos - API | $40,000 | $3,629 | 9% | 10 | $363 | 13.64 |
| Domiciliarios - Expancion - INTER | $25,000 | $2,791 | 11% | 4 | $698 | 4.32 |
| Domiciliarios - Expancion - Q58 | $25,000 | $2,327 | 9% | 1 | $2,327 | 2.03 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $58,013 | 133 | **$436** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,018**/pedido |
| utilidad estimada de lo que va del día | **$155,486** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $525 | $478 | $556 | $485 | $579 | $796 | 🔴 |
| Domiciliarios - API | $402 | $395 | $472 | $464 | $481 | $320 | 🟢 |
| Domiciliarios VIDEO - API | $366 | $356 | $357 | $430 | $318 | $301 | 🟢 |
| Domiciliarios Q58 - | $217 | $192 | $186 | $166 | $184 | $199 | 🟡 |
| Domiciliarios VIDEO INTER - API | $709 | $442 | $430 | $534 | $575 | $514 | 🟢 |
| Domiciliarios VIDEO Q58 - | $380 | $567 | $874 | $586 | $641 | $800 | 🔴 |
| Domiciliarios INTER - API | $275 | $276 | $284 | $240 | $323 | $330 | 🟡 |
| Motorizados - Q58 | $690 | $546 | $569 | $732 | $543 | $3,703 | 🔴 |
| Motorizados - INTER | $463 | $529 | $521 | $479 | $589 | $610 | 🟡 |
| Motorizados - API | $344 | $349 | $419 | $579 | $469 | $366 | 🟢 |
| TEST Creativos - API | $488 | $538 | $504 | $475 | $607 | $363 | 🟢 |
| Domiciliarios - Expancion - INTER | $567 | $428 | $586 | $535 | $627 | $698 | 🟡 |
| Domiciliarios - Expancion - Q58 | $936 | $773 | $751 | $1,462 | $1,116 | $1,164 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-16 | 10-17 | 10-18 | 10-19 | 10-20 | 10-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 6.55 | 7.26 | 5.92 | 7.80 | 7.63 | 6.31 | 🔴 |
| Domiciliarios - API | 8.72 | 8.99 | 7.52 | 7.58 | 9.59 | 15.47 | 🟢 |
| Domiciliarios VIDEO - API | 6.78 | 8.25 | 7.95 | 6.55 | 11.88 | 13.33 | 🟢 |
| Domiciliarios Q58 - | 14.87 | 13.17 | 13.92 | 13.71 | 13.19 | 10.92 | 🔴 |
| Domiciliarios VIDEO INTER - API | 4.79 | 7.72 | 7.70 | 6.43 | 7.50 | 8.46 | 🟢 |
| Domiciliarios VIDEO Q58 - | 7.02 | 4.81 | 3.07 | 5.02 | 3.62 | 2.86 | 🔴 |
| Domiciliarios INTER - API | 9.03 | 9.03 | 9.05 | 6.33 | 11.11 | 13.04 | 🟢 |
| Motorizados - Q58 | 5.78 | 5.76 | 5.24 | 4.15 | 5.78 | 0.84 | 🔴 |
| Motorizados - INTER | 8.26 | 7.18 | 8.33 | 8.02 | 8.81 | 12.35 | 🟢 |
| Motorizados - API | 9.35 | 8.90 | 7.49 | 5.69 | 8.09 | 9.73 | 🟢 |
| TEST Creativos - API | 7.69 | 7.13 | 7.79 | 9.85 | 8.83 | 13.64 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.16 | 4.23 | 3.47 | 5.28 | 4.48 | 4.32 | 🟡 |
| Domiciliarios - Expancion - Q58 | 3.76 | 4.00 | 4.12 | 2.02 | 2.73 | 4.07 | 🟢 |

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
| 2026-10-20 | $383,328 | 837 | $458 | $3,527 | 7.70 | $960,270 |

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
