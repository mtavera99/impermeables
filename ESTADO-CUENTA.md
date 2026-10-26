# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-26 01:58 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$139,291** |
| gastado hoy (hasta las 1h) | $5,983 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $391,102 |
| saldo proyectado a medianoche | $-245,828 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🔴 RECARGAR $432,426 — entra en zona de freno a las 11:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–1:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-22 | $4,913 | 14 | **$351** | $4,007 | 11.42 |
| 2026-10-23 | $4,624 | 11 | **$420** | $3,831 | 9.11 |
| 2026-10-24 | $5,034 | 11 | **$458** | $3,774 | 8.25 |
| 2026-10-25 | $9,060 | 20 | **$453** | $2,957 | 6.53 |
| 2026-10-26 **HOY** | $5,983 | 15 | **$399** | $3,895 | 9.77 |

🟢 **Hoy va mejor que ayer a la misma hora** ($399 vs $453).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   399  =  $ 3,895  ÷  9.77
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,895 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.77 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $870 | 2% | 2 | $435 | 13.89 |
| Domiciliarios - Expancion - INTER | $25,000 | $813 | 3% | 1 | $813 | 3.82 |
| Domiciliarios VIDEO - API | $20,000 | $614 | 3% | 2 | $307 | 13.89 |
| Domiciliarios INTER - API | $25,000 | $603 | 2% | 1 | $603 | 5.24 |
| Domiciliarios VIDEO INTER - API | $25,000 | $573 | 2% | 0 | — | 0.00 |
| Domiciliarios - API | $35,000 | $491 | 1% | 1 | $491 | 9.43 |
| Motorizados - Q58 | $20,000 | $429 | 2% | 1 | $429 | 6.99 |
| RADIO - Moteros | $20,000 | $415 | 2% | 1 | $415 | 11.24 |
| Motorizados - API | $20,000 | $389 | 2% | 0 | — | 0.00 |
| Domiciliarios VIDEO Q58 - | $25,000 | $258 | 1% | 2 | $129 | 36.36 |
| Motorizados - INTER | $25,000 | $119 | 0% | 0 | — | 0.00 |
| TEST Creativos - API | $20,000 | $116 | 1% | 1 | $116 | 31.25 |
| RADIO - Seguridad / Negocios | $25,000 | $111 | 0% | 1 | $111 | 32.26 |
| Domiciliarios - Expancion - Q58 | $20,000 | $76 | 0% | 1 | $76 | 38.46 |
| Domiciliarios Q58 - | $25,000 | $61 | 0% | 1 | $61 | 27.03 |
| RADIO - Fincas | $20,000 | $45 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $5,983 | 15 | **$399** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,332**/pedido |
| utilidad estimada de lo que va del día | **$18,096** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $424 | $444 | $517 | $691 | $515 | $435 | 🟢 |
| Domiciliarios - Expancion - INTER | $604 | $721 | $662 | $594 | $522 | $813 | 🔴 |
| Domiciliarios VIDEO - API | $269 | $292 | $337 | $383 | $329 | $307 | 🟢 |
| Domiciliarios INTER - API | $304 | $314 | $332 | $461 | $359 | $603 | 🔴 |
| Domiciliarios VIDEO INTER - API | $701 | $742 | $646 | $490 | $655 | — | 🔴 |
| Domiciliarios - API | $348 | $370 | $417 | $489 | $430 | $491 | 🟡 |
| Motorizados - Q58 | $1,025 | $599 | $514 | $547 | $833 | $429 | 🟢 |
| RADIO - Moteros | — | — | — | $919 | $917 | $415 | 🟢 |
| Motorizados - API | $446 | $379 | $456 | $436 | $426 | — | 🟡 |
| Domiciliarios VIDEO Q58 - | $995 | $1,091 | $679 | $795 | $822 | $129 | 🟢 |
| Motorizados - INTER | $460 | $545 | $714 | $595 | $824 | — | 🔴 |
| TEST Creativos - API | $535 | $379 | $480 | $395 | $526 | $116 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | $1,169 | $734 | $111 | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,077 | $892 | $1,117 | $876 | $284 | $76 | 🟢 |
| Domiciliarios Q58 - | $197 | $159 | $217 | $204 | $182 | $61 | 🟢 |
| RADIO - Fincas | — | — | — | $630 | $426 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 11.99 | 10.38 | 8.14 | 5.47 | 8.57 | 13.89 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.33 | 4.21 | 4.83 | 4.70 | 6.02 | 3.82 | 🔴 |
| Domiciliarios VIDEO - API | 14.69 | 10.98 | 9.18 | 7.54 | 10.07 | 13.89 | 🟢 |
| Domiciliarios INTER - API | 12.17 | 9.39 | 7.57 | 6.56 | 8.24 | 5.24 | 🔴 |
| Domiciliarios VIDEO INTER - API | 5.98 | 5.52 | 6.43 | 8.56 | 6.08 | — | 🔴 |
| Domiciliarios - API | 14.10 | 12.13 | 9.61 | 8.16 | 10.63 | 9.43 | 🟡 |
| Motorizados - Q58 | 3.32 | 5.14 | 5.82 | 5.28 | 3.67 | 6.99 | 🟢 |
| RADIO - Moteros | — | — | — | 5.63 | 4.19 | 11.24 | 🟢 |
| Motorizados - API | 9.31 | 10.45 | 8.59 | 8.65 | 9.64 | — | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.19 | 2.96 | 4.98 | 4.11 | 4.86 | 36.36 | 🟢 |
| Motorizados - INTER | 13.59 | 11.01 | 8.00 | 8.89 | 6.65 | — | 🔴 |
| TEST Creativos - API | 11.03 | 14.31 | 8.92 | 8.50 | 6.95 | 31.25 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | 4.13 | 5.60 | 32.26 | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.65 | 4.52 | 3.93 | 4.47 | 8.82 | 38.46 | 🟢 |
| Domiciliarios Q58 - | 11.07 | 12.89 | 10.68 | 10.24 | 11.60 | 27.03 | 🟢 |
| RADIO - Fincas | — | — | — | 8.62 | 9.52 | — | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,847 | 750 | $513 | $3,525 | 6.87 | $819,094 |
| 2026-10-25 | $399,485 | 884 | $452 | $3,560 | 7.88 | $1,019,560 |

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
