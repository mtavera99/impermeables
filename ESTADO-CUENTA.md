# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-05 05:00 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$302,167** |
| gastado hoy (hasta las 4h) | $8,185 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $389,581 |
| saldo proyectado a medianoche | $-79,229 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $344,568 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–4:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-01 | $21,655 | 47 | **$461** | $3,193 | 6.93 |
| 2026-11-02 | $33,215 | 46 | **$722** | $3,615 | 5.01 |
| 2026-11-03 | $29,414 | 47 | **$626** | $2,451 | 3.92 |
| 2026-11-04 | $9,055 | 19 | **$477** | $4,585 | 9.62 |
| 2026-11-05 **HOY** | $8,185 | 20 | **$409** | $3,341 | 8.16 |

🟢 **Hoy va mejor que ayer a la misma hora** ($409 vs $477).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   409  =  $ 3,341  ÷  8.16
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,341 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.16 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Motorizados - Q58 | $29,000 | $1,122 | 4% | 3 | $374 | 5.96 |
| Domiciliarios - Expancion - INTER | $25,000 | $837 | 3% | 2 | $418 | 5.85 |
| RADIO - Moteros | $35,000 | $807 | 2% | 1 | $807 | 3.89 |
| Domiciliarios - Expancion - API | $30,000 | $728 | 2% | 0 | — | 0.00 |
| Motorizados - API | $20,000 | $718 | 4% | 1 | $718 | 5.88 |
| Domiciliarios - API | $35,000 | $689 | 2% | 1 | $689 | 7.94 |
| Domiciliarios INTER - API | $20,000 | $553 | 3% | 5 | $111 | 30.67 |
| Domiciliarios VIDEO - API | $20,000 | $522 | 3% | 0 | — | 0.00 |
| RADIO - Seguridad / Negocios | $40,000 | $488 | 1% | 1 | $488 | 6.21 |
| Domiciliarios VIDEO INTER - API | $36,000 | $408 | 1% | 2 | $204 | 19.80 |
| Domiciliarios Q58 - | $25,000 | $351 | 1% | 1 | $351 | 12.66 |
| Motorizados - INTER | $25,000 | $309 | 1% | 2 | $154 | 51.28 |
| Domiciliarios - Expancion - Q58 | $29,000 | $169 | 1% | 1 | $169 | 14.49 |
| Domiciliarios VIDEO Q58 - | $25,000 | $161 | 1% | 0 | — | 0.00 |
| RADIO - Broad | $10,000 | $115 | 1% | 0 | — | 0.00 |
| RADIO - Fincas | $20,000 | $113 | 1% | 0 | — | 0.00 |
| TEST Creativos - API | $20,000 | $95 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $8,185 | 20 | **$409** | $2,402 | **17%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,523**/pedido |
| utilidad estimada de lo que va del día | **$23,920** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-31 | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | |
|---|---|---|---|---|---|---|---|
| Motorizados - Q58 | $738 | $628 | $742 | $559 | $619 | $374 | 🟢 |
| Domiciliarios - Expancion - INTER | $1,062 | $810 | $555 | $496 | $620 | $418 | 🟢 |
| RADIO - Moteros | $1,791 | $1,422 | $2,023 | $1,901 | $1,761 | $807 | 🟢 |
| Domiciliarios - Expancion - API | $553 | $650 | $503 | $624 | $657 | — | 🟡 |
| Motorizados - API | $497 | $479 | $526 | $390 | $579 | $718 | 🔴 |
| Domiciliarios - API | $439 | $541 | $597 | $510 | $422 | $689 | 🔴 |
| Domiciliarios INTER - API | $462 | $284 | $362 | $290 | $378 | $111 | 🟢 |
| Domiciliarios VIDEO - API | $340 | $412 | $313 | $421 | $370 | — | 🟢 |
| RADIO - Seguridad / Negocios | $833 | $883 | $1,488 | $888 | $1,308 | $488 | 🟢 |
| Domiciliarios VIDEO INTER - API | $521 | $723 | $667 | $563 | $651 | $204 | 🟢 |
| Domiciliarios Q58 - | $1,927 | $1,379 | $1,407 | $992 | $1,763 | $351 | 🟢 |
| Motorizados - INTER | $539 | $494 | $574 | $507 | $623 | $154 | 🟢 |
| Domiciliarios - Expancion - Q58 | $268 | $253 | $231 | $253 | $234 | $169 | 🟢 |
| Domiciliarios VIDEO Q58 - | $843 | $678 | $847 | $622 | $1,489 | — | 🔴 |
| RADIO - Broad | $1,668 | $1,112 | $1,166 | $916 | $1,331 | — | 🔴 |
| RADIO - Fincas | $945 | $1,119 | $927 | $1,014 | $655 | — | 🟢 |
| TEST Creativos - API | $541 | $623 | $500 | $559 | $489 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-31 | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | |
|---|---|---|---|---|---|---|---|
| Motorizados - Q58 | 3.40 | 4.26 | 2.73 | 3.34 | 3.96 | 5.96 | 🟢 |
| Domiciliarios - Expancion - INTER | 2.69 | 3.86 | 3.83 | 3.85 | 4.80 | 5.85 | 🟢 |
| RADIO - Moteros | 2.24 | 3.20 | 1.68 | 1.62 | 2.03 | 3.89 | 🟢 |
| Domiciliarios - Expancion - API | 9.43 | 8.85 | 8.73 | 5.79 | 7.51 | — | 🟢 |
| Motorizados - API | 8.55 | 9.32 | 7.22 | 7.69 | 7.79 | 5.88 | 🔴 |
| Domiciliarios - API | 11.52 | 9.95 | 7.11 | 7.17 | 12.47 | 7.94 | 🔴 |
| Domiciliarios INTER - API | 8.56 | 12.61 | 7.07 | 9.66 | 9.64 | 30.67 | 🟢 |
| Domiciliarios VIDEO - API | 9.68 | 7.93 | 7.25 | 6.23 | 9.59 | — | 🟢 |
| RADIO - Seguridad / Negocios | 6.02 | 5.10 | 2.02 | 3.19 | 3.02 | 6.21 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.48 | 6.37 | 5.33 | 7.38 | 8.38 | 19.80 | 🟢 |
| Domiciliarios Q58 - | 2.99 | 4.94 | 2.99 | 4.33 | 3.11 | 12.66 | 🟢 |
| Motorizados - INTER | 13.19 | 14.23 | 8.96 | 11.83 | 11.22 | 51.28 | 🟢 |
| Domiciliarios - Expancion - Q58 | 10.19 | 9.72 | 7.74 | 6.90 | 10.27 | 14.49 | 🟢 |
| Domiciliarios VIDEO Q58 - | 4.16 | 5.10 | 3.07 | 3.87 | 2.50 | — | 🔴 |
| RADIO - Broad | 4.87 | 6.67 | 5.10 | 7.73 | 5.97 | — | 🔴 |
| RADIO - Fincas | 4.77 | 4.17 | 4.36 | 3.29 | 6.79 | — | 🟢 |
| TEST Creativos - API | 6.22 | 6.27 | 6.74 | 6.72 | 6.70 | — | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-30 | $408,080 | 721 | $566 | $4,179 | 7.38 | $749,308 |
| 2026-10-31 | $422,412 | 694 | $609 | $4,029 | 6.62 | $691,634 |
| 2026-11-01 | $457,484 | 787 | $581 | $4,079 | 7.02 | $805,851 |
| 2026-11-02 | $531,050 | 881 | $603 | $3,035 | 5.04 | $883,179 |
| 2026-11-03 | $440,682 | 799 | $552 | $2,933 | 5.32 | $841,916 |
| 2026-11-04 | $360,579 | 586 | $615 | $3,947 | 6.41 | $580,100 |

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
