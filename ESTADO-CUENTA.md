# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-05 15:29 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$100,009** |
| gastado hoy (hasta las 15h) | $206,040 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $415,314 |
| saldo proyectado a medianoche | $-109,265 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $348,871 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-01 | $221,435 | 404 | **$548** | $3,953 | 7.21 |
| 2026-11-02 | $322,820 | 499 | **$647** | $3,032 | 4.69 |
| 2026-11-03 | $220,435 | 391 | **$564** | $2,779 | 4.93 |
| 2026-11-04 | $165,244 | 237 | **$697** | $4,454 | 6.39 |
| 2026-11-05 **HOY** | $206,040 | 327 | **$630** | $3,900 | 6.19 |

🟢 **Hoy va mejor que ayer a la misma hora** ($630 vs $697).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   630  =  $ 3,900  ÷  6.19
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,900 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.19 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $17,356 | 50% | 32 | $542 | 9.35 |
| Domiciliarios VIDEO INTER - API | $36,000 | $17,212 | 48% | 24 | $717 | 7.39 |
| Domiciliarios Q58 - | $25,000 | $16,807 | 67% | 16 | $1,050 | 4.54 |
| Motorizados - Q58 | $29,000 | $16,027 | 55% | 21 | $763 | 3.26 |
| RADIO - Seguridad / Negocios | $40,000 | $15,975 | 40% | 20 | $799 | 5.42 |
| Domiciliarios - Expancion - INTER | $25,000 | $13,155 | 53% | 19 | $692 | 4.18 |
| Domiciliarios VIDEO Q58 - | $25,000 | $12,966 | 52% | 22 | $589 | 5.35 |
| Domiciliarios - Expancion - API | $30,000 | $12,726 | 42% | 16 | $795 | 6.38 |
| RADIO - Moteros | $35,000 | $12,604 | 36% | 8 | $1,576 | 2.33 |
| TEST Creativos - API | $20,000 | $11,720 | 59% | 15 | $781 | 6.50 |
| Motorizados - INTER | $25,000 | $10,981 | 44% | 21 | $523 | 12.99 |
| Domiciliarios - Expancion - Q58 | $29,000 | $10,742 | 37% | 26 | $413 | 5.89 |
| Domiciliarios VIDEO - API | $20,000 | $10,501 | 53% | 30 | $350 | 9.60 |
| Domiciliarios INTER - API | $20,000 | $8,614 | 43% | 31 | $278 | 13.39 |
| Motorizados - API | $20,000 | $8,250 | 41% | 12 | $688 | 6.11 |
| RADIO - Fincas | $20,000 | $8,078 | 40% | 12 | $673 | 6.54 |
| RADIO - Broad | $10,000 | $2,326 | 23% | 1 | $2,326 | 3.03 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $206,040 | 326 | **$632** | $2,402 | **26%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$11,618**/pedido |
| utilidad estimada de lo que va del día | **$317,273** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-31 | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $439 | $541 | $597 | $510 | $426 | $542 | 🔴 |
| Domiciliarios VIDEO INTER - API | $521 | $723 | $667 | $563 | $656 | $717 | 🟡 |
| Domiciliarios Q58 - | $1,927 | $1,379 | $1,407 | $992 | $1,766 | $1,050 | 🟢 |
| Motorizados - Q58 | $738 | $628 | $742 | $559 | $621 | $763 | 🔴 |
| RADIO - Seguridad / Negocios | $833 | $883 | $1,488 | $888 | $1,323 | $799 | 🟢 |
| Domiciliarios - Expancion - INTER | $1,062 | $810 | $555 | $496 | $622 | $692 | 🟡 |
| Domiciliarios VIDEO Q58 - | $843 | $678 | $847 | $622 | $1,507 | $589 | 🟢 |
| Domiciliarios - Expancion - API | $553 | $650 | $503 | $624 | $661 | $795 | 🔴 |
| RADIO - Moteros | $1,791 | $1,422 | $2,023 | $1,901 | $1,778 | $1,576 | 🟢 |
| TEST Creativos - API | $541 | $623 | $500 | $559 | $490 | $781 | 🔴 |
| Motorizados - INTER | $539 | $494 | $574 | $507 | $629 | $523 | 🟢 |
| Domiciliarios - Expancion - Q58 | $268 | $253 | $231 | $253 | $237 | $413 | 🔴 |
| Domiciliarios VIDEO - API | $340 | $412 | $313 | $421 | $375 | $350 | 🟢 |
| Domiciliarios INTER - API | $462 | $284 | $362 | $290 | $380 | $278 | 🟢 |
| Motorizados - API | $497 | $479 | $526 | $390 | $581 | $688 | 🔴 |
| RADIO - Fincas | $945 | $1,119 | $927 | $1,014 | $665 | $673 | 🟡 |
| RADIO - Broad | $1,668 | $1,112 | $1,166 | $916 | $1,339 | $2,326 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-31 | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 11.52 | 9.95 | 7.11 | 7.17 | 12.35 | 9.35 | 🔴 |
| Domiciliarios VIDEO INTER - API | 8.48 | 6.37 | 5.33 | 7.38 | 8.30 | 7.39 | 🟡 |
| Domiciliarios Q58 - | 2.99 | 4.94 | 2.99 | 4.33 | 3.11 | 4.54 | 🟢 |
| Motorizados - Q58 | 3.40 | 4.26 | 2.73 | 3.34 | 3.95 | 3.26 | 🔴 |
| RADIO - Seguridad / Negocios | 6.02 | 5.10 | 2.02 | 3.19 | 2.97 | 5.42 | 🟢 |
| Domiciliarios - Expancion - INTER | 2.69 | 3.86 | 3.83 | 3.85 | 4.77 | 4.18 | 🟡 |
| Domiciliarios VIDEO Q58 - | 4.16 | 5.10 | 3.07 | 3.87 | 2.48 | 5.35 | 🟢 |
| Domiciliarios - Expancion - API | 9.43 | 8.85 | 8.73 | 5.79 | 7.45 | 6.38 | 🟡 |
| RADIO - Moteros | 2.24 | 3.20 | 1.68 | 1.62 | 2.01 | 2.33 | 🟢 |
| TEST Creativos - API | 6.22 | 6.27 | 6.74 | 6.72 | 6.70 | 6.50 | 🟡 |
| Motorizados - INTER | 13.19 | 14.23 | 8.96 | 11.83 | 11.12 | 12.99 | 🟢 |
| Domiciliarios - Expancion - Q58 | 10.19 | 9.72 | 7.74 | 6.90 | 10.12 | 5.89 | 🔴 |
| Domiciliarios VIDEO - API | 9.68 | 7.93 | 7.25 | 6.23 | 9.45 | 9.60 | 🟡 |
| Domiciliarios INTER - API | 8.56 | 12.61 | 7.07 | 9.66 | 9.57 | 13.39 | 🟢 |
| Motorizados - API | 8.55 | 9.32 | 7.22 | 7.69 | 7.76 | 6.11 | 🔴 |
| RADIO - Fincas | 4.77 | 4.17 | 4.36 | 3.29 | 6.63 | 6.54 | 🟡 |
| RADIO - Broad | 4.87 | 6.67 | 5.10 | 7.73 | 5.89 | 3.03 | 🔴 |

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
| 2026-11-04 | $363,514 | 586 | $620 | $3,941 | 6.35 | $577,165 |

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
