# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-19 23:24 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$106,485** |
| gastado hoy (hasta las 23h) | $384,508 |
| presupuesto activo | $429,000/día |
| cierre proyectado del día | $384,508 |
| saldo proyectado a medianoche | $106,485 |
| objetivo (cubrir un día de 143% + colchón) | $633,470 |

### 🟠 Recargar $142,477 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–23:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-15 | $466,194 | 613 | **$761** | $3,444 | 4.53 |
| 2026-11-16 | $588,173 | 781 | **$753** | $3,462 | 4.60 |
| 2026-11-17 | $355,036 | 497 | **$714** | $3,836 | 5.37 |
| 2026-11-18 | $491,634 | 674 | **$729** | $3,892 | 5.34 |
| 2026-11-19 **HOY** | $384,508 | 527 | **$730** | $3,674 | 5.04 |

🟠 Hoy va 0% más caro que ayer a la misma hora ($730 vs $729).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   730  =  $ 3,674  ÷  5.04
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,674 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.04 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $48,000 | $38,291 | 80% | 35 | $1,094 | 2.92 |
| Domiciliarios VIDEO INTER - API | $43,000 | $32,710 | 76% | 30 | $1,090 | 4.20 |
| RADIO - Moteros | $25,000 | $30,499 | 122% | 17 | $1,794 | 2.77 |
| Domiciliarios - API | $35,000 | $29,075 | 83% | 44 | $661 | 9.93 |
| Domiciliarios - Expancion - INTER | $30,000 | $26,373 | 88% | 36 | $733 | 2.62 |
| Motorizados - Q58 | $29,000 | $24,172 | 83% | 36 | $671 | 3.78 |
| Domiciliarios - Expancion - API | $20,000 | $23,565 | 118% | 28 | $842 | 7.92 |
| Domiciliarios VIDEO Q58 - | $30,000 | $23,415 | 78% | 27 | $867 | 2.61 |
| Domiciliarios Q58 - | $25,000 | $22,162 | 89% | 20 | $1,108 | 2.21 |
| Motorizados - INTER | $25,000 | $21,728 | 87% | 45 | $483 | 11.32 |
| Domiciliarios VIDEO - API | $24,000 | $19,105 | 80% | 28 | $682 | 8.20 |
| RADIO - Fincas | $20,000 | $18,876 | 94% | 25 | $755 | 5.80 |
| TEST Creativos - API | $20,000 | $18,467 | 92% | 25 | $739 | 9.20 |
| Domiciliarios - Expancion - Q58 | $15,000 | $18,248 | 122% | 56 | $326 | 9.76 |
| Motorizados - API | $20,000 | $16,848 | 84% | 23 | $733 | 7.90 |
| Domiciliarios INTER - API | $20,000 | $16,781 | 84% | 51 | $329 | 10.02 |
| RADIO - Broad | $0 | $4,193 | — | 1 | $4,193 | 1.71 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $384,508 | 527 | **$730** | $2,402 | **30%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$13,412**/pedido |
| utilidad estimada de lo que va del día | **$461,461** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | 11-19 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,219 | $1,185 | $1,584 | $1,322 | $1,114 | $1,094 | 🟡 |
| Domiciliarios VIDEO INTER - API | $645 | $706 | $653 | $919 | $1,018 | $1,090 | 🟡 |
| RADIO - Moteros | $1,535 | $2,037 | $1,613 | $1,801 | $1,564 | $1,794 | 🟡 |
| Domiciliarios - API | $779 | $736 | $895 | $879 | $834 | $661 | 🟢 |
| Domiciliarios - Expancion - INTER | $652 | $596 | $625 | $640 | $611 | $733 | 🔴 |
| Motorizados - Q58 | $589 | $813 | $849 | $744 | $589 | $671 | 🟡 |
| Domiciliarios - Expancion - API | $1,193 | $1,162 | $1,056 | $834 | $879 | $842 | 🟡 |
| Domiciliarios VIDEO Q58 - | $709 | $1,015 | $1,119 | $773 | $1,100 | $867 | 🟢 |
| Domiciliarios Q58 - | $1,913 | $1,204 | $1,195 | $1,035 | $1,137 | $1,108 | 🟡 |
| Motorizados - INTER | $514 | $652 | $679 | $532 | $573 | $483 | 🟢 |
| Domiciliarios VIDEO - API | $657 | $691 | $525 | $746 | $691 | $682 | 🟡 |
| RADIO - Fincas | $1,038 | $887 | $1,274 | $1,080 | $1,358 | $755 | 🟢 |
| TEST Creativos - API | $622 | $930 | $824 | $689 | $762 | $739 | 🟡 |
| Domiciliarios - Expancion - Q58 | $372 | $331 | $303 | $319 | $298 | $326 | 🟡 |
| Motorizados - API | $935 | $1,022 | $667 | $972 | $697 | $733 | 🟡 |
| Domiciliarios INTER - API | $295 | $340 | $391 | $267 | $311 | $329 | 🟡 |
| RADIO - Broad | $1,649 | $1,970 | $831 | $1,996 | $1,775 | $4,193 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | 11-19 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 2.71 | 3.12 | 2.08 | 2.50 | 2.89 | 2.92 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.64 | 6.78 | 6.76 | 5.38 | 5.03 | 4.20 | 🔴 |
| RADIO - Moteros | 4.23 | 2.95 | 3.83 | 3.67 | 4.30 | 2.77 | 🔴 |
| Domiciliarios - API | 5.36 | 6.47 | 5.41 | 5.57 | 7.12 | 9.93 | 🟢 |
| Domiciliarios - Expancion - INTER | 2.78 | 3.72 | 3.56 | 4.15 | 3.73 | 2.62 | 🔴 |
| Motorizados - Q58 | 2.80 | 2.54 | 2.83 | 3.35 | 4.00 | 3.78 | 🟡 |
| Domiciliarios - Expancion - API | 4.33 | 4.63 | 4.84 | 6.25 | 7.27 | 7.92 | 🟢 |
| Domiciliarios VIDEO Q58 - | 2.84 | 2.36 | 1.90 | 3.16 | 2.18 | 2.61 | 🟢 |
| Domiciliarios Q58 - | 1.05 | 1.78 | 2.17 | 3.11 | 2.38 | 2.21 | 🟡 |
| Motorizados - INTER | 9.71 | 8.13 | 7.24 | 10.22 | 10.81 | 11.32 | 🟡 |
| Domiciliarios VIDEO - API | 5.31 | 5.52 | 7.02 | 5.55 | 7.69 | 8.20 | 🟢 |
| RADIO - Fincas | 3.75 | 5.55 | 3.18 | 3.70 | 3.45 | 5.80 | 🟢 |
| TEST Creativos - API | 7.73 | 5.05 | 7.68 | 12.23 | 9.79 | 9.20 | 🟡 |
| Domiciliarios - Expancion - Q58 | 5.74 | 7.10 | 7.34 | 8.95 | 9.95 | 9.76 | 🟡 |
| Motorizados - API | 4.02 | 3.61 | 6.39 | 4.49 | 6.97 | 7.90 | 🟢 |
| Domiciliarios INTER - API | 9.64 | 9.01 | 7.19 | 12.39 | 11.19 | 10.02 | 🟡 |
| RADIO - Broad | 3.73 | 3.66 | 9.38 | 2.96 | 3.59 | 1.71 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,967 | 599 | $719 | $3,122 | 4.34 | $530,580 |
| 2026-11-15 | $466,194 | 613 | $761 | $3,444 | 4.53 | $517,827 |
| 2026-11-16 | $588,173 | 781 | $753 | $3,462 | 4.60 | $665,530 |
| 2026-11-17 | $355,036 | 497 | $714 | $3,836 | 5.37 | $442,775 |
| 2026-11-18 | $491,634 | 674 | $729 | $3,892 | 5.34 | $590,307 |

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
