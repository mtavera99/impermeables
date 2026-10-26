# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-26 11:18 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$100,754** |
| gastado hoy (hasta las 11h) | $141,727 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $395,340 |
| saldo proyectado a medianoche | $-152,859 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🔴 RECARGAR $335,219 — entra en zona de freno a las 15:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–11:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-22 | $120,540 | 283 | **$426** | $3,830 | 8.99 |
| 2026-10-23 | $91,714 | 196 | **$468** | $3,383 | 7.23 |
| 2026-10-24 | $141,345 | 260 | **$544** | $3,605 | 6.63 |
| 2026-10-25 | $139,175 | 321 | **$434** | $3,389 | 7.82 |
| 2026-10-26 **HOY** | $141,727 | 300 | **$472** | $3,382 | 7.16 |

🟠 Hoy va 9% más caro que ayer a la misma hora ($472 vs $434).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   472  =  $ 3,382  ÷  7.16
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,382 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.16 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $16,007 | 40% | 23 | $696 | 5.67 |
| Domiciliarios - API | $35,000 | $13,403 | 38% | 30 | $447 | 9.24 |
| Domiciliarios INTER - API | $25,000 | $11,586 | 46% | 35 | $331 | 9.38 |
| Domiciliarios VIDEO Q58 - | $25,000 | $10,475 | 42% | 13 | $806 | 4.61 |
| Domiciliarios - Expancion - INTER | $25,000 | $10,300 | 41% | 11 | $936 | 3.41 |
| TEST Creativos - API | $20,000 | $10,020 | 50% | 25 | $401 | 10.03 |
| Domiciliarios Q58 - | $25,000 | $9,128 | 37% | 37 | $247 | 7.80 |
| Domiciliarios VIDEO INTER - API | $25,000 | $8,689 | 35% | 19 | $457 | 8.23 |
| Domiciliarios VIDEO - API | $20,000 | $8,396 | 42% | 23 | $365 | 7.33 |
| Motorizados - Q58 | $20,000 | $8,131 | 41% | 12 | $678 | 4.57 |
| Motorizados - API | $20,000 | $8,049 | 40% | 15 | $537 | 6.59 |
| RADIO - Seguridad / Negocios | $25,000 | $7,471 | 30% | 11 | $679 | 6.35 |
| RADIO - Fincas | $20,000 | $6,528 | 33% | 10 | $653 | 5.66 |
| Motorizados - INTER | $25,000 | $5,927 | 24% | 12 | $494 | 11.78 |
| Domiciliarios - Expancion - Q58 | $20,000 | $4,647 | 23% | 21 | $221 | 11.02 |
| RADIO - Moteros | $20,000 | $2,970 | 15% | 4 | $742 | 4.90 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $141,727 | 301 | **$471** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,655**/pedido |
| utilidad estimada de lo que va del día | **$341,454** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $424 | $444 | $517 | $691 | $517 | $696 | 🔴 |
| Domiciliarios - API | $348 | $370 | $417 | $489 | $433 | $447 | 🟡 |
| Domiciliarios INTER - API | $304 | $314 | $332 | $462 | $363 | $331 | 🟢 |
| Domiciliarios VIDEO Q58 - | $995 | $1,091 | $679 | $795 | $827 | $806 | 🟡 |
| Domiciliarios - Expancion - INTER | $604 | $721 | $662 | $594 | $526 | $936 | 🔴 |
| TEST Creativos - API | $535 | $379 | $480 | $395 | $526 | $401 | 🟢 |
| Domiciliarios Q58 - | $197 | $159 | $217 | $204 | $184 | $247 | 🔴 |
| Domiciliarios VIDEO INTER - API | $701 | $742 | $646 | $490 | $660 | $457 | 🟢 |
| Domiciliarios VIDEO - API | $269 | $292 | $337 | $383 | $332 | $365 | 🟡 |
| Motorizados - Q58 | $1,025 | $599 | $514 | $547 | $835 | $678 | 🟢 |
| Motorizados - API | $446 | $379 | $456 | $436 | $431 | $537 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | $1,169 | $749 | $679 | 🟢 |
| RADIO - Fincas | — | — | — | $630 | $431 | $653 | 🔴 |
| Motorizados - INTER | $460 | $545 | $714 | $595 | $835 | $494 | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,077 | $892 | $1,117 | $876 | $285 | $221 | 🟢 |
| RADIO - Moteros | — | — | — | $919 | $924 | $742 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 11.99 | 10.38 | 8.14 | 5.47 | 8.52 | 5.67 | 🔴 |
| Domiciliarios - API | 14.10 | 12.13 | 9.61 | 8.16 | 10.53 | 9.24 | 🟡 |
| Domiciliarios INTER - API | 12.17 | 9.39 | 7.57 | 6.56 | 8.15 | 9.38 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.19 | 2.96 | 4.98 | 4.11 | 4.82 | 4.61 | 🟡 |
| Domiciliarios - Expancion - INTER | 5.33 | 4.21 | 4.83 | 4.70 | 5.98 | 3.41 | 🔴 |
| TEST Creativos - API | 11.03 | 14.31 | 8.92 | 8.50 | 6.95 | 10.03 | 🟢 |
| Domiciliarios Q58 - | 11.07 | 12.89 | 10.68 | 10.24 | 11.47 | 7.80 | 🔴 |
| Domiciliarios VIDEO INTER - API | 5.98 | 5.52 | 6.43 | 8.56 | 6.04 | 8.23 | 🟢 |
| Domiciliarios VIDEO - API | 14.69 | 10.98 | 9.18 | 7.54 | 9.96 | 7.33 | 🔴 |
| Motorizados - Q58 | 3.32 | 5.14 | 5.82 | 5.28 | 3.66 | 4.57 | 🟢 |
| Motorizados - API | 9.31 | 10.45 | 8.59 | 8.65 | 9.56 | 6.59 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | 4.13 | 5.52 | 6.35 | 🟢 |
| RADIO - Fincas | — | — | — | 8.62 | 9.41 | 5.66 | 🔴 |
| Motorizados - INTER | 13.59 | 11.01 | 8.00 | 8.89 | 6.55 | 11.78 | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.65 | 4.52 | 3.93 | 4.47 | 8.74 | 11.02 | 🟢 |
| RADIO - Moteros | — | — | — | 5.63 | 4.16 | 4.90 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,856 | 750 | $513 | $3,525 | 6.87 | $819,085 |
| 2026-10-25 | $402,890 | 884 | $456 | $3,560 | 7.81 | $1,016,155 |

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
