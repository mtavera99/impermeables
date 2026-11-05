# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-05 14:29 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$127,362** |
| gastado hoy (hasta las 14h) | $181,164 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $408,888 |
| saldo proyectado a medianoche | $-100,362 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $346,394 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-01 | $196,652 | 353 | **$557** | $3,902 | 7.00 |
| 2026-11-02 | $283,846 | 450 | **$631** | $3,030 | 4.80 |
| 2026-11-03 | $204,348 | 363 | **$563** | $2,743 | 4.87 |
| 2026-11-04 | $144,290 | 215 | **$671** | $4,485 | 6.68 |
| 2026-11-05 **HOY** | $181,164 | 278 | **$652** | $3,889 | 5.97 |

🟢 **Hoy va mejor que ayer a la misma hora** ($652 vs $671).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   652  =  $ 3,889  ÷  5.97
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,889 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.97 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $15,305 | 44% | 27 | $567 | 9.05 |
| Domiciliarios VIDEO INTER - API | $36,000 | $14,971 | 42% | 22 | $680 | 7.61 |
| Domiciliarios Q58 - | $25,000 | $14,889 | 60% | 13 | $1,145 | 4.23 |
| Motorizados - Q58 | $29,000 | $14,341 | 49% | 19 | $755 | 3.25 |
| RADIO - Seguridad / Negocios | $40,000 | $14,051 | 35% | 17 | $827 | 5.25 |
| Domiciliarios - Expancion - INTER | $25,000 | $11,655 | 47% | 15 | $777 | 3.69 |
| Domiciliarios - Expancion - API | $30,000 | $11,245 | 37% | 12 | $937 | 5.35 |
| Domiciliarios VIDEO Q58 - | $25,000 | $11,142 | 45% | 21 | $531 | 5.96 |
| RADIO - Moteros | $35,000 | $11,082 | 32% | 4 | $2,770 | 1.33 |
| TEST Creativos - API | $20,000 | $10,493 | 52% | 13 | $807 | 6.22 |
| Motorizados - INTER | $25,000 | $9,439 | 38% | 20 | $472 | 14.63 |
| Domiciliarios VIDEO - API | $20,000 | $9,384 | 47% | 25 | $375 | 8.88 |
| Domiciliarios - Expancion - Q58 | $29,000 | $9,216 | 32% | 22 | $419 | 5.82 |
| Domiciliarios INTER - API | $20,000 | $7,389 | 37% | 26 | $284 | 12.89 |
| Motorizados - API | $20,000 | $7,368 | 37% | 10 | $737 | 5.69 |
| RADIO - Fincas | $20,000 | $7,196 | 36% | 11 | $654 | 6.96 |
| RADIO - Broad | $10,000 | $1,998 | 20% | 1 | $1,998 | 3.48 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $181,164 | 278 | **$652** | $2,402 | **27%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$11,979**/pedido |
| utilidad estimada de lo que va del día | **$265,097** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-31 | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $439 | $541 | $597 | $510 | $426 | $567 | 🔴 |
| Domiciliarios VIDEO INTER - API | $521 | $723 | $667 | $563 | $656 | $680 | 🟡 |
| Domiciliarios Q58 - | $1,927 | $1,379 | $1,407 | $992 | $1,766 | $1,145 | 🟢 |
| Motorizados - Q58 | $738 | $628 | $742 | $559 | $620 | $755 | 🔴 |
| RADIO - Seguridad / Negocios | $833 | $883 | $1,488 | $888 | $1,322 | $827 | 🟢 |
| Domiciliarios - Expancion - INTER | $1,062 | $810 | $555 | $496 | $622 | $777 | 🔴 |
| Domiciliarios - Expancion - API | $553 | $650 | $503 | $624 | $661 | $937 | 🔴 |
| Domiciliarios VIDEO Q58 - | $843 | $678 | $847 | $622 | $1,507 | $531 | 🟢 |
| RADIO - Moteros | $1,791 | $1,422 | $2,023 | $1,901 | $1,776 | $2,770 | 🔴 |
| TEST Creativos - API | $541 | $623 | $500 | $559 | $489 | $807 | 🔴 |
| Motorizados - INTER | $539 | $494 | $574 | $507 | $629 | $472 | 🟢 |
| Domiciliarios VIDEO - API | $340 | $412 | $313 | $421 | $375 | $375 | 🟡 |
| Domiciliarios - Expancion - Q58 | $268 | $253 | $231 | $253 | $237 | $419 | 🔴 |
| Domiciliarios INTER - API | $462 | $284 | $362 | $290 | $380 | $284 | 🟢 |
| Motorizados - API | $497 | $479 | $526 | $390 | $581 | $737 | 🔴 |
| RADIO - Fincas | $945 | $1,119 | $927 | $1,014 | $665 | $654 | 🟡 |
| RADIO - Broad | $1,668 | $1,112 | $1,166 | $916 | $1,339 | $1,998 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-31 | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 11.52 | 9.95 | 7.11 | 7.17 | 12.36 | 9.05 | 🔴 |
| Domiciliarios VIDEO INTER - API | 8.48 | 6.37 | 5.33 | 7.38 | 8.30 | 7.61 | 🟡 |
| Domiciliarios Q58 - | 2.99 | 4.94 | 2.99 | 4.33 | 3.11 | 4.23 | 🟢 |
| Motorizados - Q58 | 3.40 | 4.26 | 2.73 | 3.34 | 3.95 | 3.25 | 🔴 |
| RADIO - Seguridad / Negocios | 6.02 | 5.10 | 2.02 | 3.19 | 2.97 | 5.25 | 🟢 |
| Domiciliarios - Expancion - INTER | 2.69 | 3.86 | 3.83 | 3.85 | 4.77 | 3.69 | 🔴 |
| Domiciliarios - Expancion - API | 9.43 | 8.85 | 8.73 | 5.79 | 7.45 | 5.35 | 🔴 |
| Domiciliarios VIDEO Q58 - | 4.16 | 5.10 | 3.07 | 3.87 | 2.48 | 5.96 | 🟢 |
| RADIO - Moteros | 2.24 | 3.20 | 1.68 | 1.62 | 2.01 | 1.33 | 🔴 |
| TEST Creativos - API | 6.22 | 6.27 | 6.74 | 6.72 | 6.70 | 6.22 | 🟡 |
| Motorizados - INTER | 13.19 | 14.23 | 8.96 | 11.83 | 11.12 | 14.63 | 🟢 |
| Domiciliarios VIDEO - API | 9.68 | 7.93 | 7.25 | 6.23 | 9.45 | 8.88 | 🟡 |
| Domiciliarios - Expancion - Q58 | 10.19 | 9.72 | 7.74 | 6.90 | 10.13 | 5.82 | 🔴 |
| Domiciliarios INTER - API | 8.56 | 12.61 | 7.07 | 9.66 | 9.57 | 12.89 | 🟢 |
| Motorizados - API | 8.55 | 9.32 | 7.22 | 7.69 | 7.76 | 5.69 | 🔴 |
| RADIO - Fincas | 4.77 | 4.17 | 4.36 | 3.29 | 6.63 | 6.96 | 🟡 |
| RADIO - Broad | 4.87 | 6.67 | 5.10 | 7.73 | 5.89 | 3.48 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-30 | $408,080 | 721 | $566 | $4,179 | 7.38 | $749,308 |
| 2026-10-31 | $422,412 | 694 | $609 | $4,029 | 6.62 | $691,634 |
| 2026-11-01 | $457,484 | 787 | $581 | $4,079 | 7.02 | $805,851 |
| 2026-11-02 | $531,050 | 881 | $603 | $3,035 | 5.04 | $883,179 |
| 2026-11-03 | $440,713 | 799 | $552 | $2,933 | 5.32 | $841,885 |
| 2026-11-04 | $363,374 | 586 | $620 | $3,940 | 6.35 | $577,305 |

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
