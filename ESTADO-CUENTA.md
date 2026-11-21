# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-21 07:23 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$227,725** |
| gastado hoy (hasta las 7h) | $43,477 |
| presupuesto activo | $429,000/día |
| cierre proyectado del día | $400,673 |
| saldo proyectado a medianoche | $-129,471 |
| objetivo (cubrir un día de 143% + colchón) | $633,470 |

### 🔴 RECARGAR $362,268 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–7:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-17 | $31,762 | 39 | **$814** | $3,126 | 3.84 |
| 2026-11-18 | $54,902 | 69 | **$796** | $4,540 | 5.71 |
| 2026-11-19 | $42,663 | 72 | **$593** | $3,664 | 6.18 |
| 2026-11-20 | $41,947 | 72 | **$583** | $3,827 | 6.57 |
| 2026-11-21 **HOY** | $43,477 | 70 | **$621** | $3,517 | 5.66 |

🟠 Hoy va 7% más caro que ayer a la misma hora ($621 vs $583).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   621  =  $ 3,517  ÷  5.66
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,517 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.66 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $4,977 | 14% | 5 | $995 | 5.60 |
| Domiciliarios VIDEO INTER - API | $43,000 | $3,983 | 9% | 6 | $664 | 6.30 |
| Domiciliarios VIDEO - API | $24,000 | $3,851 | 16% | 6 | $642 | 7.22 |
| RADIO - Seguridad / Negocios | $48,000 | $3,515 | 7% | 3 | $1,172 | 2.49 |
| Motorizados - Q58 | $29,000 | $3,067 | 11% | 5 | $613 | 3.60 |
| RADIO - Moteros | $25,000 | $2,928 | 12% | 1 | $2,928 | 1.50 |
| Motorizados - API | $20,000 | $2,808 | 14% | 4 | $702 | 7.63 |
| Motorizados - INTER | $25,000 | $2,636 | 11% | 9 | $293 | 18.75 |
| Domiciliarios - Expancion - INTER | $30,000 | $2,406 | 8% | 3 | $802 | 2.65 |
| Domiciliarios VIDEO Q58 - | $30,000 | $2,339 | 8% | 4 | $585 | 4.07 |
| Domiciliarios INTER - API | $20,000 | $2,237 | 11% | 7 | $320 | 9.56 |
| Domiciliarios - Expancion - API | $20,000 | $2,074 | 10% | 6 | $346 | 14.96 |
| RADIO - Fincas | $20,000 | $1,918 | 10% | 3 | $639 | 6.15 |
| TEST Creativos - API | $20,000 | $1,839 | 9% | 3 | $613 | 8.90 |
| Domiciliarios Q58 - | $25,000 | $1,806 | 7% | 2 | $903 | 2.20 |
| Domiciliarios - Expancion - Q58 | $15,000 | $1,093 | 7% | 3 | $364 | 6.90 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $43,477 | 70 | **$621** | $2,402 | **26%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$11,417**/pedido |
| utilidad estimada de lo que va del día | **$68,891** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-16 | 11-17 | 11-18 | 11-19 | 11-20 | 11-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $895 | $879 | $834 | $658 | $660 | $995 | 🔴 |
| Domiciliarios VIDEO INTER - API | $653 | $919 | $1,018 | $1,067 | $854 | $664 | 🟢 |
| Domiciliarios VIDEO - API | $525 | $746 | $691 | $680 | $576 | $654 | 🟡 |
| RADIO - Seguridad / Negocios | $1,584 | $1,322 | $1,114 | $1,121 | $2,158 | $1,172 | 🟢 |
| Motorizados - Q58 | $849 | $744 | $589 | $664 | $735 | $613 | 🟢 |
| RADIO - Moteros | $1,613 | $1,801 | $1,565 | $1,834 | $1,867 | $2,928 | 🔴 |
| Motorizados - API | $667 | $972 | $697 | $697 | $994 | $702 | 🟢 |
| Motorizados - INTER | $679 | $532 | $573 | $475 | $511 | $293 | 🟢 |
| Domiciliarios - Expancion - INTER | $625 | $640 | $611 | $728 | $630 | $802 | 🔴 |
| Domiciliarios VIDEO Q58 - | $1,119 | $773 | $1,101 | $891 | $1,033 | $585 | 🟢 |
| Domiciliarios INTER - API | $391 | $267 | $311 | $339 | $326 | $320 | 🟡 |
| Domiciliarios - Expancion - API | $1,056 | $834 | $879 | $859 | $1,008 | $346 | 🟢 |
| RADIO - Fincas | $1,274 | $1,080 | $1,358 | $755 | $605 | $669 | 🟡 |
| TEST Creativos - API | $824 | $689 | $762 | $716 | $1,257 | $613 | 🟢 |
| Domiciliarios Q58 - | $1,195 | $1,035 | $1,137 | $1,133 | $1,363 | $903 | 🟢 |
| Domiciliarios - Expancion - Q58 | $303 | $319 | $298 | $326 | $238 | $364 | 🔴 |
| RADIO - Broad | $831 | $1,996 | $1,780 | $4,251 | — | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-16 | 11-17 | 11-18 | 11-19 | 11-20 | 11-21 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 5.41 | 5.57 | 7.12 | 10.08 | 8.96 | 5.60 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.76 | 5.38 | 5.03 | 4.30 | 5.34 | 6.30 | 🟢 |
| Domiciliarios VIDEO - API | 7.02 | 5.55 | 7.69 | 8.19 | 9.27 | 7.13 | 🔴 |
| RADIO - Seguridad / Negocios | 2.08 | 2.50 | 2.89 | 2.81 | 1.61 | 2.49 | 🟢 |
| Motorizados - Q58 | 2.83 | 3.35 | 4.00 | 3.74 | 3.52 | 3.60 | 🟡 |
| RADIO - Moteros | 3.83 | 3.67 | 4.30 | 2.70 | 2.85 | 1.50 | 🔴 |
| Motorizados - API | 6.39 | 4.49 | 6.97 | 8.35 | 5.74 | 7.63 | 🟢 |
| Motorizados - INTER | 7.24 | 10.22 | 10.80 | 11.41 | 11.11 | 18.75 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.56 | 4.15 | 3.73 | 2.61 | 3.28 | 2.65 | 🔴 |
| Domiciliarios VIDEO Q58 - | 1.90 | 3.16 | 2.18 | 2.51 | 2.48 | 4.07 | 🟢 |
| Domiciliarios INTER - API | 7.19 | 12.39 | 11.19 | 9.66 | 10.61 | 9.56 | 🟡 |
| Domiciliarios - Expancion - API | 4.84 | 6.25 | 7.27 | 7.74 | 6.78 | 14.96 | 🟢 |
| RADIO - Fincas | 3.18 | 3.70 | 3.45 | 5.76 | 7.96 | 5.89 | 🔴 |
| TEST Creativos - API | 7.68 | 12.23 | 9.79 | 9.48 | 4.75 | 8.90 | 🟢 |
| Domiciliarios Q58 - | 2.17 | 3.11 | 2.38 | 2.14 | 1.78 | 2.20 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.34 | 8.95 | 9.95 | 9.76 | 13.49 | 6.90 | 🔴 |
| RADIO - Broad | 9.38 | 2.96 | 3.58 | 1.69 | — | — | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-15 | $466,194 | 613 | $761 | $3,444 | 4.53 | $517,827 |
| 2026-11-16 | $588,173 | 781 | $753 | $3,462 | 4.60 | $665,530 |
| 2026-11-17 | $355,036 | 497 | $714 | $3,836 | 5.37 | $442,775 |
| 2026-11-18 | $491,703 | 674 | $730 | $3,893 | 5.34 | $590,238 |
| 2026-11-19 | $396,310 | 543 | $730 | $3,642 | 4.99 | $475,343 |
| 2026-11-20 | $402,692 | 543 | $742 | $3,731 | 5.03 | $468,961 |

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
