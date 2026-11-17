# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-17 14:14 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$122,972** |
| gastado hoy (hasta las 14h) | $113,788 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $340,564 |
| saldo proyectado a medianoche | $-103,804 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $418,160 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-13 | $222,094 | 299 | **$743** | $3,460 | 4.66 |
| 2026-11-14 | $219,828 | 292 | **$753** | $3,370 | 4.48 |
| 2026-11-15 | $234,875 | 265 | **$886** | $3,897 | 4.40 |
| 2026-11-16 | $364,848 | 428 | **$852** | $3,421 | 4.01 |
| 2026-11-17 **HOY** | $113,788 | 172 | **$662** | $3,613 | 5.46 |

🟢 **Hoy va mejor que ayer a la misma hora** ($662 vs $852).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   662  =  $ 3,613  ÷  5.46
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,613 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.46 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $12,392 | 31% | 7 | $1,770 | 1.77 |
| Domiciliarios VIDEO INTER - API | $36,000 | $9,939 | 28% | 10 | $994 | 4.67 |
| RADIO - Moteros | $35,000 | $9,483 | 27% | 5 | $1,897 | 3.14 |
| Motorizados - INTER | $25,000 | $9,399 | 38% | 20 | $470 | 10.28 |
| Domiciliarios - API | $35,000 | $9,033 | 26% | 12 | $753 | 6.95 |
| Domiciliarios - Expancion - Q58 | $29,000 | $6,686 | 23% | 20 | $334 | 7.47 |
| Domiciliarios VIDEO Q58 - | $25,000 | $6,589 | 26% | 10 | $659 | 3.61 |
| Domiciliarios - Expancion - API | $30,000 | $6,465 | 22% | 8 | $808 | 6.57 |
| Motorizados - Q58 | $29,000 | $6,151 | 21% | 15 | $410 | 5.42 |
| Domiciliarios INTER - API | $20,000 | $5,635 | 28% | 27 | $209 | 14.09 |
| Domiciliarios VIDEO - API | $20,000 | $5,451 | 27% | 8 | $681 | 5.66 |
| Domiciliarios - Expancion - INTER | $25,000 | $5,399 | 22% | 11 | $491 | 5.26 |
| RADIO - Fincas | $20,000 | $5,090 | 25% | 3 | $1,697 | 2.07 |
| Motorizados - API | $20,000 | $4,773 | 24% | 1 | $4,773 | 0.97 |
| Domiciliarios Q58 - | $25,000 | $4,230 | 17% | 4 | $1,058 | 2.55 |
| RADIO - Broad | $10,000 | $3,787 | 38% | 4 | $947 | 5.71 |
| TEST Creativos - API | $20,000 | $3,286 | 16% | 7 | $469 | 12.68 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $113,788 | 172 | **$662** | $2,402 | **28%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$12,161**/pedido |
| utilidad estimada de lo que va del día | **$162,316** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $937 | $1,073 | $1,219 | $1,185 | $1,581 | $1,770 | 🟡 |
| Domiciliarios VIDEO INTER - API | $875 | $768 | $645 | $706 | $651 | $994 | 🔴 |
| RADIO - Moteros | $2,042 | $1,314 | $1,535 | $2,037 | $1,608 | $1,897 | 🔴 |
| Motorizados - INTER | $758 | $656 | $514 | $652 | $678 | $470 | 🟢 |
| Domiciliarios - API | $757 | $1,151 | $779 | $736 | $894 | $753 | 🟢 |
| Domiciliarios - Expancion - Q58 | $360 | $348 | $372 | $331 | $302 | $334 | 🟡 |
| Domiciliarios VIDEO Q58 - | $800 | $880 | $709 | $1,015 | $1,119 | $659 | 🟢 |
| Domiciliarios - Expancion - API | $842 | $1,140 | $1,193 | $1,162 | $1,055 | $808 | 🟢 |
| Motorizados - Q58 | $913 | $612 | $589 | $813 | $849 | $410 | 🟢 |
| Domiciliarios INTER - API | $344 | $361 | $295 | $340 | $391 | $209 | 🟢 |
| Domiciliarios VIDEO - API | $939 | $564 | $657 | $691 | $524 | $681 | 🔴 |
| Domiciliarios - Expancion - INTER | $606 | $660 | $652 | $596 | $624 | $491 | 🟢 |
| RADIO - Fincas | $939 | $1,359 | $1,038 | $887 | $1,265 | $1,697 | 🔴 |
| Motorizados - API | $770 | $793 | $935 | $1,022 | $666 | $4,773 | 🔴 |
| Domiciliarios Q58 - | $1,051 | $1,039 | $1,913 | $1,204 | $1,195 | $1,058 | 🟢 |
| RADIO - Broad | $1,617 | $1,916 | $1,649 | $1,970 | $829 | $947 | 🟡 |
| TEST Creativos - API | $894 | $661 | $622 | $930 | $824 | $469 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 3.92 | 2.84 | 2.71 | 3.12 | 2.08 | 1.77 | 🟡 |
| Domiciliarios VIDEO INTER - API | 5.43 | 6.46 | 6.64 | 6.78 | 6.77 | 4.67 | 🔴 |
| RADIO - Moteros | 2.69 | 3.80 | 4.23 | 2.95 | 3.84 | 3.14 | 🔴 |
| Motorizados - INTER | 8.51 | 7.89 | 9.71 | 8.13 | 7.25 | 10.28 | 🟢 |
| Domiciliarios - API | 6.19 | 3.74 | 5.36 | 6.47 | 5.42 | 6.95 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.65 | 7.05 | 5.74 | 7.10 | 7.35 | 7.47 | 🟡 |
| Domiciliarios VIDEO Q58 - | 3.42 | 2.51 | 2.84 | 2.36 | 1.90 | 3.61 | 🟢 |
| Domiciliarios - Expancion - API | 5.92 | 4.02 | 4.33 | 4.63 | 4.85 | 6.57 | 🟢 |
| Motorizados - Q58 | 2.66 | 3.43 | 2.80 | 2.54 | 2.83 | 5.42 | 🟢 |
| Domiciliarios INTER - API | 10.69 | 7.88 | 9.64 | 9.01 | 7.20 | 14.09 | 🟢 |
| Domiciliarios VIDEO - API | 3.75 | 5.83 | 5.31 | 5.52 | 7.03 | 5.66 | 🔴 |
| Domiciliarios - Expancion - INTER | 3.71 | 2.96 | 2.78 | 3.72 | 3.56 | 5.26 | 🟢 |
| RADIO - Fincas | 4.56 | 3.20 | 3.75 | 5.55 | 3.19 | 2.07 | 🔴 |
| Motorizados - API | 4.98 | 4.55 | 4.02 | 3.61 | 6.40 | 0.97 | 🔴 |
| Domiciliarios Q58 - | 2.21 | 2.20 | 1.05 | 1.78 | 2.17 | 2.55 | 🟢 |
| RADIO - Broad | 4.62 | 3.51 | 3.73 | 3.66 | 9.40 | 5.71 | 🔴 |
| TEST Creativos - API | 6.24 | 7.75 | 7.73 | 5.05 | 7.68 | 12.68 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-11 | $449,265 | 687 | $654 | $3,664 | 5.60 | $653,545 |
| 2026-11-12 | $423,316 | 553 | $765 | $3,631 | 4.74 | $464,390 |
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,967 | 599 | $719 | $3,122 | 4.34 | $530,580 |
| 2026-11-15 | $466,194 | 613 | $761 | $3,444 | 4.53 | $517,827 |
| 2026-11-16 | $587,081 | 781 | $752 | $3,459 | 4.60 | $666,622 |

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
