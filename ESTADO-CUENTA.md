# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-26 20:34 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$19,474** |
| gastado hoy (hasta las 20h) | $421,331 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $461,074 |
| saldo proyectado a medianoche | $-20,269 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🔴 RECARGAR $136,895 — entra en zona de freno a las 21:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–20:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-22 | $283,896 | 669 | **$424** | $3,722 | 8.77 |
| 2026-10-23 | $260,649 | 528 | **$494** | $3,559 | 7.21 |
| 2026-10-24 | $363,809 | 699 | **$520** | $3,553 | 6.83 |
| 2026-10-25 | $345,382 | 757 | **$456** | $3,565 | 7.81 |
| 2026-10-26 **HOY** | $421,331 | 846 | **$498** | $3,339 | 6.71 |

🟠 Hoy va 9% más caro que ayer a la misma hora ($498 vs $456).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   498  =  $ 3,339  ÷  6.71
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,339 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.71 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $44,186 | 110% | 64 | $690 | 5.86 |
| Domiciliarios - API | $35,000 | $37,080 | 106% | 75 | $494 | 8.49 |
| Domiciliarios VIDEO Q58 - | $25,000 | $31,837 | 127% | 39 | $816 | 4.11 |
| Domiciliarios Q58 - | $25,000 | $29,814 | 119% | 135 | $221 | 8.75 |
| Domiciliarios - Expancion - INTER | $25,000 | $29,364 | 117% | 38 | $773 | 3.70 |
| Domiciliarios INTER - API | $25,000 | $29,330 | 117% | 83 | $353 | 7.60 |
| Domiciliarios VIDEO INTER - API | $25,000 | $25,415 | 102% | 47 | $541 | 7.86 |
| Motorizados - INTER | $25,000 | $24,396 | 98% | 42 | $581 | 9.61 |
| Motorizados - Q58 | $20,000 | $24,359 | 122% | 31 | $786 | 4.13 |
| TEST Creativos - API | $20,000 | $24,028 | 120% | 50 | $481 | 9.28 |
| RADIO - Seguridad / Negocios | $25,000 | $23,154 | 93% | 25 | $926 | 4.74 |
| RADIO - Fincas | $20,000 | $22,336 | 112% | 26 | $859 | 4.35 |
| Motorizados - API | $20,000 | $20,925 | 105% | 47 | $445 | 8.35 |
| Domiciliarios - Expancion - Q58 | $20,000 | $20,725 | 104% | 82 | $253 | 9.08 |
| Domiciliarios VIDEO - API | $20,000 | $20,322 | 102% | 49 | $415 | 7.02 |
| RADIO - Moteros | $20,000 | $14,060 | 70% | 13 | $1,082 | 3.10 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $421,331 | 846 | **$498** | $2,402 | **21%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,155**/pedido |
| utilidad estimada de lo que va del día | **$936,714** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $424 | $444 | $517 | $691 | $518 | $690 | 🔴 |
| Domiciliarios - API | $348 | $370 | $417 | $489 | $434 | $494 | 🟡 |
| Domiciliarios VIDEO Q58 - | $995 | $1,091 | $679 | $795 | $829 | $816 | 🟡 |
| Domiciliarios Q58 - | $197 | $159 | $217 | $204 | $185 | $221 | 🔴 |
| Domiciliarios - Expancion - INTER | $604 | $721 | $662 | $594 | $526 | $773 | 🔴 |
| Domiciliarios INTER - API | $304 | $314 | $332 | $462 | $366 | $353 | 🟡 |
| Domiciliarios VIDEO INTER - API | $701 | $742 | $646 | $490 | $661 | $541 | 🟢 |
| Motorizados - INTER | $460 | $545 | $714 | $595 | $838 | $581 | 🟢 |
| Motorizados - Q58 | $1,025 | $599 | $514 | $547 | $836 | $786 | 🟢 |
| TEST Creativos - API | $535 | $379 | $480 | $395 | $526 | $481 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | $1,170 | $750 | $926 | 🔴 |
| RADIO - Fincas | — | — | — | $630 | $434 | $859 | 🔴 |
| Motorizados - API | $446 | $379 | $456 | $436 | $431 | $445 | 🟡 |
| Domiciliarios - Expancion - Q58 | $1,077 | $892 | $1,117 | $876 | $286 | $253 | 🟢 |
| Domiciliarios VIDEO - API | $269 | $292 | $337 | $383 | $332 | $415 | 🔴 |
| RADIO - Moteros | — | — | — | $919 | $926 | $1,082 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 11.99 | 10.38 | 8.14 | 5.47 | 8.50 | 5.86 | 🔴 |
| Domiciliarios - API | 14.10 | 12.13 | 9.61 | 8.16 | 10.51 | 8.49 | 🔴 |
| Domiciliarios VIDEO Q58 - | 3.19 | 2.96 | 4.98 | 4.11 | 4.81 | 4.11 | 🟡 |
| Domiciliarios Q58 - | 11.07 | 12.89 | 10.68 | 10.24 | 11.43 | 8.75 | 🔴 |
| Domiciliarios - Expancion - INTER | 5.33 | 4.21 | 4.83 | 4.70 | 5.97 | 3.70 | 🔴 |
| Domiciliarios INTER - API | 12.17 | 9.39 | 7.57 | 6.56 | 8.11 | 7.60 | 🟡 |
| Domiciliarios VIDEO INTER - API | 5.98 | 5.52 | 6.43 | 8.56 | 6.02 | 7.86 | 🟢 |
| Motorizados - INTER | 13.59 | 11.01 | 8.00 | 8.89 | 6.52 | 9.61 | 🟢 |
| Motorizados - Q58 | 3.32 | 5.14 | 5.82 | 5.28 | 3.66 | 4.13 | 🟢 |
| TEST Creativos - API | 11.03 | 14.31 | 8.92 | 8.50 | 6.95 | 9.28 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | 4.13 | 5.50 | 4.74 | 🟡 |
| RADIO - Fincas | — | — | — | 8.62 | 9.35 | 4.35 | 🔴 |
| Motorizados - API | 9.31 | 10.45 | 8.59 | 8.65 | 9.54 | 8.35 | 🟡 |
| Domiciliarios - Expancion - Q58 | 3.65 | 4.52 | 3.93 | 4.47 | 8.73 | 9.08 | 🟡 |
| Domiciliarios VIDEO - API | 14.69 | 10.98 | 9.18 | 7.54 | 9.93 | 7.02 | 🔴 |
| RADIO - Moteros | — | — | — | 5.63 | 4.15 | 3.10 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,864 | 750 | $513 | $3,525 | 6.87 | $819,077 |
| 2026-10-25 | $403,813 | 884 | $457 | $3,558 | 7.79 | $1,015,232 |

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
