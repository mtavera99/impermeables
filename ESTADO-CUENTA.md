# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-30 06:12 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$217,681** |
| gastado hoy (hasta las 6h) | $15,665 |
| presupuesto activo | $428,000/día |
| cierre proyectado del día | $403,679 |
| saldo proyectado a medianoche | $-170,333 |
| objetivo (cubrir un día de 143% + colchón) | $632,040 |

### 🔴 RECARGAR $398,694 — entra en zona de freno a las 16:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–6:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-26 | $43,851 | 87 | **$504** | $3,389 | 6.72 |
| 2026-10-27 | $39,171 | 105 | **$373** | $3,544 | 9.50 |
| 2026-10-28 | $36,663 | 79 | **$464** | $3,707 | 7.99 |
| 2026-10-29 | $61,155 | 114 | **$536** | $3,185 | 5.94 |
| 2026-10-30 **HOY** | $15,665 | 35 | **$448** | $3,863 | 8.63 |

🟢 **Hoy va mejor que ayer a la misma hora** ($448 vs $536).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   448  =  $ 3,863  ÷  8.63
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,863 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.63 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $1,541 | 4% | 6 | $257 | 19.05 |
| Motorizados - Q58 | $24,000 | $1,478 | 6% | 3 | $493 | 6.13 |
| Domiciliarios VIDEO INTER - API | $30,000 | $1,392 | 5% | 5 | $278 | 24.75 |
| RADIO - Broad | $40,000 | $1,191 | 3% | 0 | — | 0.00 |
| Domiciliarios - Expancion - INTER | $25,000 | $1,123 | 4% | 1 | $1,123 | 2.91 |
| Motorizados - API | $20,000 | $1,116 | 6% | 3 | $372 | 10.38 |
| Domiciliarios - Expancion - API | $30,000 | $1,001 | 3% | 1 | $1,001 | 3.72 |
| Domiciliarios VIDEO - API | $20,000 | $889 | 4% | 2 | $444 | 6.23 |
| Domiciliarios - Expancion - Q58 | $24,000 | $885 | 4% | 2 | $442 | 8.97 |
| Domiciliarios VIDEO Q58 - | $25,000 | $813 | 3% | 3 | $271 | 17.75 |
| Domiciliarios Q58 - | $25,000 | $805 | 3% | 4 | $201 | 11.02 |
| RADIO - Moteros | $20,000 | $771 | 4% | 1 | $771 | 4.81 |
| Domiciliarios INTER - API | $20,000 | $758 | 4% | 2 | $379 | 8.89 |
| Motorizados - INTER | $25,000 | $528 | 2% | 0 | — | 0.00 |
| RADIO - Fincas | $20,000 | $493 | 2% | 0 | — | 0.00 |
| TEST Creativos - API | $20,000 | $447 | 2% | 1 | $447 | 5.18 |
| RADIO - Seguridad / Negocios | $25,000 | $434 | 2% | 1 | $434 | 11.49 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $15,665 | 35 | **$448** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,227**/pedido |
| utilidad estimada de lo que va del día | **$40,519** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-25 | 10-26 | 10-27 | 10-28 | 10-29 | 10-30 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $434 | $459 | $371 | $379 | $540 | $257 | 🟢 |
| Motorizados - Q58 | $836 | $769 | $607 | $631 | $629 | $493 | 🟢 |
| Domiciliarios VIDEO INTER - API | $661 | $519 | $642 | $547 | $497 | $278 | 🟢 |
| RADIO - Broad | — | — | $1,440 | $1,612 | $1,297 | — | 🟢 |
| Domiciliarios - Expancion - INTER | $526 | $747 | $499 | $643 | $682 | $1,123 | 🔴 |
| Motorizados - API | $431 | $426 | $359 | $459 | $521 | $372 | 🟢 |
| Domiciliarios - Expancion - API | $518 | $576 | $671 | $746 | $462 | $1,001 | 🔴 |
| Domiciliarios VIDEO - API | $332 | $389 | $308 | $355 | $419 | $444 | 🟡 |
| Domiciliarios - Expancion - Q58 | $286 | $241 | $250 | $326 | $250 | $442 | 🔴 |
| Domiciliarios VIDEO Q58 - | $829 | $870 | $691 | $913 | $730 | $271 | 🟢 |
| Domiciliarios Q58 - | $185 | $211 | $202 | $199 | $191 | $201 | 🟡 |
| RADIO - Moteros | $926 | $1,068 | $1,162 | $1,514 | $1,329 | $771 | 🟢 |
| Domiciliarios INTER - API | $366 | $332 | $319 | $322 | $321 | $379 | 🔴 |
| Motorizados - INTER | $838 | $543 | $532 | $547 | $492 | — | 🟢 |
| RADIO - Fincas | $434 | $707 | $751 | $752 | $1,513 | — | 🔴 |
| TEST Creativos - API | $526 | $490 | $387 | $574 | $507 | $447 | 🟢 |
| RADIO - Seguridad / Negocios | $750 | $1,000 | $1,001 | $736 | $762 | $434 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-25 | 10-26 | 10-27 | 10-28 | 10-29 | 10-30 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 10.50 | 9.11 | 13.28 | 12.74 | 7.99 | 19.05 | 🟢 |
| Motorizados - Q58 | 3.66 | 4.17 | 4.49 | 3.47 | 4.72 | 6.13 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.02 | 8.12 | 7.83 | 8.47 | 8.28 | 24.75 | 🟢 |
| RADIO - Broad | — | — | 4.76 | 3.50 | 5.25 | — | 🟢 |
| Domiciliarios - Expancion - INTER | 5.97 | 3.66 | 5.15 | 4.81 | 4.39 | 2.91 | 🔴 |
| Motorizados - API | 9.54 | 8.76 | 12.17 | 9.23 | 7.46 | 10.38 | 🟢 |
| Domiciliarios - Expancion - API | 8.50 | 7.03 | 6.89 | 5.97 | 8.82 | 3.72 | 🔴 |
| Domiciliarios VIDEO - API | 9.93 | 7.54 | 12.62 | 10.10 | 7.83 | 6.23 | 🔴 |
| Domiciliarios - Expancion - Q58 | 8.73 | 9.37 | 10.69 | 7.51 | 9.52 | 8.97 | 🟡 |
| Domiciliarios VIDEO Q58 - | 4.81 | 3.70 | 5.31 | 4.28 | 5.10 | 17.75 | 🟢 |
| Domiciliarios Q58 - | 11.43 | 9.12 | 10.98 | 10.83 | 10.48 | 11.02 | 🟢 |
| RADIO - Moteros | 4.15 | 3.02 | 3.39 | 2.80 | 3.13 | 4.81 | 🟢 |
| Domiciliarios INTER - API | 8.11 | 7.76 | 8.52 | 9.99 | 11.03 | 8.89 | 🔴 |
| Motorizados - INTER | 6.52 | 10.17 | 13.22 | 11.22 | 10.97 | — | 🟡 |
| RADIO - Fincas | 9.35 | 5.16 | 5.51 | 4.83 | 2.52 | — | 🔴 |
| TEST Creativos - API | 6.95 | 9.25 | 12.47 | 6.05 | 6.14 | 5.18 | 🔴 |
| RADIO - Seguridad / Negocios | 5.50 | 4.36 | 5.10 | 6.39 | 6.54 | 11.49 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-24 | $384,864 | 750 | $513 | $3,525 | 6.87 | $819,077 |
| 2026-10-25 | $403,813 | 884 | $457 | $3,558 | 7.79 | $1,015,232 |
| 2026-10-26 | $485,261 | 1022 | $475 | $3,300 | 6.95 | $1,155,309 |
| 2026-10-27 | $398,322 | 865 | $460 | $3,864 | 8.39 | $990,223 |
| 2026-10-28 | $438,523 | 819 | $535 | $3,719 | 6.95 | $876,180 |
| 2026-10-29 | $435,323 | 870 | $500 | $3,673 | 7.34 | $961,248 |

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
