# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-06 13:50 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$207,950** |
| gastado hoy (hasta las 13h) | $185,104 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $470,840 |
| saldo proyectado a medianoche | $-77,786 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $261,866 — entra en zona de freno a las 20:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–13:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-02 | $253,651 | 388 | **$654** | $2,996 | 4.58 |
| 2026-11-03 | $187,664 | 329 | **$570** | $2,719 | 4.77 |
| 2026-11-04 | $123,207 | 184 | **$670** | $4,554 | 6.80 |
| 2026-11-05 | $181,662 | 264 | **$688** | $3,901 | 5.67 |
| 2026-11-06 **HOY** | $185,104 | 321 | **$577** | $3,302 | 5.73 |

🟢 **Hoy va mejor que ayer a la misma hora** ($577 vs $688).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   577  =  $ 3,302  ÷  5.73
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,302 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.73 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $17,203 | 49% | 40 | $430 | 9.92 |
| RADIO - Seguridad / Negocios | $40,000 | $14,563 | 36% | 16 | $910 | 3.67 |
| Domiciliarios VIDEO INTER - API | $36,000 | $13,968 | 39% | 16 | $873 | 5.62 |
| Domiciliarios - Expancion - API | $30,000 | $13,843 | 46% | 19 | $729 | 5.72 |
| RADIO - Moteros | $35,000 | $13,049 | 37% | 5 | $2,610 | 1.51 |
| Domiciliarios Q58 - | $25,000 | $12,861 | 51% | 13 | $989 | 3.07 |
| Motorizados - Q58 | $29,000 | $11,781 | 41% | 13 | $906 | 2.12 |
| Domiciliarios - Expancion - INTER | $25,000 | $10,642 | 43% | 26 | $409 | 5.65 |
| Domiciliarios - Expancion - Q58 | $29,000 | $10,566 | 36% | 43 | $246 | 7.94 |
| Motorizados - INTER | $25,000 | $10,529 | 42% | 18 | $585 | 9.86 |
| Domiciliarios VIDEO Q58 - | $25,000 | $10,062 | 40% | 12 | $838 | 3.56 |
| Domiciliarios VIDEO - API | $20,000 | $9,283 | 46% | 31 | $299 | 9.94 |
| Motorizados - API | $20,000 | $9,161 | 46% | 27 | $339 | 11.25 |
| TEST Creativos - API | $20,000 | $8,677 | 43% | 12 | $723 | 5.76 |
| Domiciliarios INTER - API | $20,000 | $7,796 | 39% | 21 | $371 | 9.05 |
| RADIO - Fincas | $20,000 | $7,656 | 38% | 6 | $1,276 | 2.75 |
| RADIO - Broad | $10,000 | $3,464 | 35% | 3 | $1,155 | 5.92 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $185,104 | 321 | **$577** | $2,402 | **24%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,600**/pedido |
| utilidad estimada de lo que va del día | **$330,183** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $541 | $597 | $511 | $426 | $495 | $430 | 🟢 |
| RADIO - Seguridad / Negocios | $883 | $1,488 | $888 | $1,325 | $829 | $910 | 🟡 |
| Domiciliarios VIDEO INTER - API | $723 | $667 | $563 | $657 | $700 | $873 | 🔴 |
| Domiciliarios - Expancion - API | $650 | $503 | $624 | $662 | $554 | $729 | 🔴 |
| RADIO - Moteros | $1,422 | $2,023 | $1,901 | $1,799 | $1,828 | $2,610 | 🔴 |
| Domiciliarios Q58 - | $1,379 | $1,407 | $992 | $1,766 | $974 | $989 | 🟡 |
| Motorizados - Q58 | $628 | $742 | $559 | $621 | $738 | $906 | 🔴 |
| Domiciliarios - Expancion - INTER | $810 | $555 | $496 | $623 | $617 | $409 | 🟢 |
| Domiciliarios - Expancion - Q58 | $253 | $231 | $253 | $238 | $307 | $246 | 🟢 |
| Motorizados - INTER | $494 | $574 | $507 | $629 | $524 | $585 | 🟡 |
| Domiciliarios VIDEO Q58 - | $678 | $847 | $622 | $1,507 | $701 | $838 | 🔴 |
| Domiciliarios VIDEO - API | $412 | $313 | $421 | $375 | $326 | $299 | 🟢 |
| Motorizados - API | $479 | $526 | $390 | $582 | $477 | $339 | 🟢 |
| TEST Creativos - API | $623 | $500 | $559 | $490 | $780 | $723 | 🟢 |
| Domiciliarios INTER - API | $284 | $362 | $290 | $380 | $318 | $371 | 🔴 |
| RADIO - Fincas | $1,119 | $927 | $1,014 | $669 | $799 | $1,276 | 🔴 |
| RADIO - Broad | $1,112 | $1,166 | $916 | $1,342 | $1,977 | $1,155 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 9.95 | 7.11 | 7.17 | 12.34 | 8.65 | 9.92 | 🟢 |
| RADIO - Seguridad / Negocios | 5.10 | 2.02 | 3.19 | 2.96 | 4.33 | 3.67 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.37 | 5.33 | 7.38 | 8.30 | 6.94 | 5.62 | 🔴 |
| Domiciliarios - Expancion - API | 8.85 | 8.73 | 5.79 | 7.44 | 8.00 | 5.72 | 🔴 |
| RADIO - Moteros | 3.20 | 1.68 | 1.62 | 2.00 | 1.95 | 1.51 | 🔴 |
| Domiciliarios Q58 - | 4.94 | 2.99 | 4.33 | 3.11 | 4.33 | 3.07 | 🔴 |
| Motorizados - Q58 | 4.26 | 2.73 | 3.34 | 3.95 | 3.07 | 2.12 | 🔴 |
| Domiciliarios - Expancion - INTER | 3.86 | 3.83 | 3.85 | 4.77 | 4.10 | 5.65 | 🟢 |
| Domiciliarios - Expancion - Q58 | 9.72 | 7.74 | 6.90 | 10.09 | 7.56 | 7.94 | 🟢 |
| Motorizados - INTER | 14.23 | 8.96 | 11.83 | 11.09 | 11.52 | 9.86 | 🟡 |
| Domiciliarios VIDEO Q58 - | 5.10 | 3.07 | 3.87 | 2.48 | 3.91 | 3.56 | 🟡 |
| Domiciliarios VIDEO - API | 7.93 | 7.25 | 6.23 | 9.44 | 9.56 | 9.94 | 🟡 |
| Motorizados - API | 9.32 | 7.22 | 7.69 | 7.75 | 7.87 | 11.25 | 🟢 |
| TEST Creativos - API | 6.27 | 6.74 | 6.72 | 6.70 | 6.18 | 5.76 | 🟡 |
| Domiciliarios INTER - API | 12.61 | 7.07 | 9.66 | 9.56 | 9.67 | 9.05 | 🟡 |
| RADIO - Fincas | 4.17 | 4.36 | 3.29 | 6.60 | 4.92 | 2.75 | 🔴 |
| RADIO - Broad | 6.67 | 5.10 | 7.73 | 5.87 | 3.62 | 5.92 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-31 | $422,412 | 694 | $609 | $4,029 | 6.62 | $691,634 |
| 2026-11-01 | $457,484 | 787 | $581 | $4,079 | 7.02 | $805,851 |
| 2026-11-02 | $531,050 | 881 | $603 | $3,035 | 5.04 | $883,179 |
| 2026-11-03 | $440,741 | 799 | $552 | $2,933 | 5.32 | $841,857 |
| 2026-11-04 | $364,222 | 586 | $622 | $3,943 | 6.34 | $576,457 |
| 2026-11-05 | $512,118 | 868 | $590 | $3,498 | 5.93 | $881,243 |

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
