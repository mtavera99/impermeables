# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-18 15:40 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$248,466** |
| gastado hoy (hasta las 15h) | $233,053 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $434,788 |
| saldo proyectado a medianoche | $46,731 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $173,401 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-14 | $246,640 | 331 | **$745** | $3,344 | 4.49 |
| 2026-11-15 | $261,366 | 301 | **$868** | $3,850 | 4.43 |
| 2026-11-16 | $389,723 | 463 | **$842** | $3,438 | 4.08 |
| 2026-11-17 | $149,342 | 218 | **$685** | $3,749 | 5.47 |
| 2026-11-18 **HOY** | $233,053 | 292 | **$798** | $4,267 | 5.35 |

🟠 Hoy va 17% más caro que ayer a la misma hora ($798 vs $685).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   798  =  $ 4,267  ÷  5.35
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,267 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 5.35 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $22,431 | 64% | 23 | $975 | 6.15 |
| RADIO - Seguridad / Negocios | $40,000 | $22,341 | 56% | 18 | $1,241 | 2.71 |
| Domiciliarios VIDEO INTER - API | $36,000 | $20,106 | 56% | 19 | $1,058 | 4.73 |
| RADIO - Moteros | $35,000 | $18,300 | 52% | 11 | $1,664 | 4.71 |
| Domiciliarios - Expancion - API | $30,000 | $18,011 | 60% | 22 | $819 | 8.12 |
| Domiciliarios - Expancion - INTER | $25,000 | $14,443 | 58% | 20 | $722 | 3.64 |
| Motorizados - Q58 | $29,000 | $14,117 | 49% | 26 | $543 | 4.85 |
| Domiciliarios Q58 - | $25,000 | $12,978 | 52% | 12 | $1,082 | 2.75 |
| Domiciliarios - Expancion - Q58 | $29,000 | $12,258 | 42% | 31 | $395 | 8.21 |
| Motorizados - API | $20,000 | $11,363 | 57% | 16 | $710 | 7.33 |
| Domiciliarios VIDEO - API | $20,000 | $11,200 | 56% | 14 | $800 | 6.32 |
| TEST Creativos - API | $20,000 | $10,919 | 55% | 13 | $840 | 9.67 |
| Motorizados - INTER | $25,000 | $10,828 | 43% | 16 | $677 | 9.36 |
| Domiciliarios INTER - API | $20,000 | $10,690 | 53% | 34 | $314 | 11.14 |
| RADIO - Fincas | $20,000 | $9,949 | 50% | 8 | $1,244 | 4.22 |
| Domiciliarios VIDEO Q58 - | $25,000 | $9,569 | 38% | 6 | $1,595 | 1.83 |
| RADIO - Broad | $10,000 | $3,550 | 36% | 3 | $1,183 | 5.87 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $233,053 | 292 | **$798** | $2,402 | **33%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$14,671**/pedido |
| utilidad estimada de lo que va del día | **$235,681** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $1,151 | $779 | $736 | $895 | $876 | $975 | 🟡 |
| RADIO - Seguridad / Negocios | $1,073 | $1,219 | $1,185 | $1,584 | $1,320 | $1,241 | 🟢 |
| Domiciliarios VIDEO INTER - API | $768 | $645 | $706 | $653 | $918 | $1,058 | 🔴 |
| RADIO - Moteros | $1,314 | $1,535 | $2,037 | $1,613 | $1,796 | $1,664 | 🟢 |
| Domiciliarios - Expancion - API | $1,140 | $1,193 | $1,162 | $1,056 | $831 | $819 | 🟡 |
| Domiciliarios - Expancion - INTER | $660 | $652 | $596 | $625 | $640 | $722 | 🟡 |
| Motorizados - Q58 | $612 | $589 | $813 | $849 | $744 | $543 | 🟢 |
| Domiciliarios Q58 - | $1,039 | $1,913 | $1,204 | $1,195 | $1,035 | $1,082 | 🟡 |
| Domiciliarios - Expancion - Q58 | $348 | $372 | $331 | $303 | $318 | $395 | 🔴 |
| Motorizados - API | $793 | $935 | $1,022 | $667 | $968 | $710 | 🟢 |
| Domiciliarios VIDEO - API | $564 | $657 | $691 | $525 | $745 | $800 | 🟡 |
| TEST Creativos - API | $661 | $622 | $930 | $824 | $689 | $840 | 🔴 |
| Motorizados - INTER | $656 | $514 | $652 | $679 | $532 | $677 | 🔴 |
| Domiciliarios INTER - API | $361 | $295 | $340 | $391 | $266 | $314 | 🔴 |
| RADIO - Fincas | $1,359 | $1,038 | $887 | $1,274 | $1,075 | $1,244 | 🔴 |
| Domiciliarios VIDEO Q58 - | $880 | $709 | $1,015 | $1,119 | $773 | $1,595 | 🔴 |
| RADIO - Broad | $1,916 | $1,649 | $1,970 | $831 | $1,985 | $1,183 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 3.74 | 5.36 | 6.47 | 5.41 | 5.58 | 6.15 | 🟢 |
| RADIO - Seguridad / Negocios | 2.84 | 2.71 | 3.12 | 2.08 | 2.50 | 2.71 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.46 | 6.64 | 6.78 | 6.76 | 5.39 | 4.73 | 🟡 |
| RADIO - Moteros | 3.80 | 4.23 | 2.95 | 3.83 | 3.68 | 4.71 | 🟢 |
| Domiciliarios - Expancion - API | 4.02 | 4.33 | 4.63 | 4.84 | 6.27 | 8.12 | 🟢 |
| Domiciliarios - Expancion - INTER | 2.96 | 2.78 | 3.72 | 3.56 | 4.16 | 3.64 | 🟡 |
| Motorizados - Q58 | 3.43 | 2.80 | 2.54 | 2.83 | 3.35 | 4.85 | 🟢 |
| Domiciliarios Q58 - | 2.20 | 1.05 | 1.78 | 2.17 | 3.11 | 2.75 | 🟡 |
| Domiciliarios - Expancion - Q58 | 7.05 | 5.74 | 7.10 | 7.34 | 8.97 | 8.21 | 🟡 |
| Motorizados - API | 4.55 | 4.02 | 3.61 | 6.39 | 4.50 | 7.33 | 🟢 |
| Domiciliarios VIDEO - API | 5.83 | 5.31 | 5.52 | 7.02 | 5.55 | 6.32 | 🟢 |
| TEST Creativos - API | 7.75 | 7.73 | 5.05 | 7.68 | 12.23 | 9.67 | 🔴 |
| Motorizados - INTER | 7.89 | 9.71 | 8.13 | 7.24 | 10.23 | 9.36 | 🟡 |
| Domiciliarios INTER - API | 7.88 | 9.64 | 9.01 | 7.19 | 12.41 | 11.14 | 🟡 |
| RADIO - Fincas | 3.20 | 3.75 | 5.55 | 3.18 | 3.71 | 4.22 | 🟢 |
| Domiciliarios VIDEO Q58 - | 2.51 | 2.84 | 2.36 | 1.90 | 3.16 | 1.83 | 🔴 |
| RADIO - Broad | 3.51 | 3.73 | 3.66 | 9.38 | 2.98 | 5.87 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-12 | $423,316 | 553 | $765 | $3,631 | 4.74 | $464,390 |
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,967 | 599 | $719 | $3,122 | 4.34 | $530,580 |
| 2026-11-15 | $466,194 | 613 | $761 | $3,444 | 4.53 | $517,827 |
| 2026-11-16 | $588,173 | 781 | $753 | $3,462 | 4.60 | $665,530 |
| 2026-11-17 | $354,362 | 497 | $713 | $3,834 | 5.38 | $443,449 |

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
