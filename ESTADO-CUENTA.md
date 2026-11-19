# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-19 17:48 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$267,671** |
| gastado hoy (hasta las 17h) | $222,677 |
| presupuesto activo | $429,000/día |
| cierre proyectado del día | $389,866 |
| saldo proyectado a medianoche | $100,482 |
| objetivo (cubrir un día de 143% + colchón) | $633,470 |

### 🟠 Recargar $143,122 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-15 | $322,072 | 388 | **$830** | $3,682 | 4.44 |
| 2026-11-16 | $445,337 | 532 | **$837** | $3,438 | 4.11 |
| 2026-11-17 | $192,565 | 267 | **$721** | $3,788 | 5.25 |
| 2026-11-18 | $319,262 | 412 | **$775** | $4,133 | 5.33 |
| 2026-11-19 **HOY** | $222,677 | 322 | **$692** | $3,858 | 5.58 |

🟢 **Hoy va mejor que ayer a la misma hora** ($692 vs $775).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   692  =  $ 3,858  ÷  5.58
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,858 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.58 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Moteros | $25,000 | $20,405 | 82% | 11 | $1,855 | 2.69 |
| RADIO - Seguridad / Negocios | $48,000 | $20,016 | 42% | 26 | $770 | 4.44 |
| Domiciliarios - API | $35,000 | $17,693 | 51% | 34 | $520 | 13.18 |
| Domiciliarios - Expancion - API | $20,000 | $15,788 | 79% | 20 | $789 | 8.90 |
| Domiciliarios VIDEO INTER - API | $43,000 | $15,675 | 36% | 15 | $1,045 | 4.70 |
| Domiciliarios - Expancion - INTER | $30,000 | $14,978 | 50% | 21 | $713 | 2.81 |
| Motorizados - Q58 | $29,000 | $14,380 | 50% | 23 | $625 | 4.30 |
| Domiciliarios VIDEO Q58 - | $30,000 | $13,255 | 44% | 16 | $828 | 2.94 |
| Motorizados - INTER | $25,000 | $13,048 | 52% | 23 | $567 | 9.94 |
| Domiciliarios Q58 - | $25,000 | $12,746 | 51% | 12 | $1,062 | 2.27 |
| Domiciliarios - Expancion - Q58 | $15,000 | $12,648 | 84% | 37 | $342 | 9.23 |
| TEST Creativos - API | $20,000 | $12,546 | 63% | 14 | $896 | 7.75 |
| Domiciliarios VIDEO - API | $24,000 | $9,705 | 40% | 17 | $571 | 10.23 |
| Motorizados - API | $20,000 | $9,154 | 46% | 11 | $832 | 7.25 |
| Domiciliarios INTER - API | $20,000 | $8,490 | 42% | 32 | $265 | 12.71 |
| RADIO - Fincas | $20,000 | $8,362 | 42% | 9 | $929 | 4.93 |
| RADIO - Broad | $0 | $3,788 | — | 1 | $3,788 | 1.77 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $222,677 | 322 | **$692** | $2,402 | **29%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$12,712**/pedido |
| utilidad estimada de lo que va del día | **$294,215** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | 11-19 | |
|---|---|---|---|---|---|---|---|
| RADIO - Moteros | $1,535 | $2,037 | $1,613 | $1,801 | $1,560 | $1,855 | 🔴 |
| RADIO - Seguridad / Negocios | $1,219 | $1,185 | $1,584 | $1,322 | $1,113 | $770 | 🟢 |
| Domiciliarios - API | $779 | $736 | $895 | $878 | $833 | $520 | 🟢 |
| Domiciliarios - Expancion - API | $1,193 | $1,162 | $1,056 | $834 | $878 | $789 | 🟢 |
| Domiciliarios VIDEO INTER - API | $645 | $706 | $653 | $919 | $1,018 | $1,045 | 🟡 |
| Domiciliarios - Expancion - INTER | $652 | $596 | $625 | $640 | $611 | $713 | 🔴 |
| Motorizados - Q58 | $589 | $813 | $849 | $744 | $589 | $625 | 🟡 |
| Domiciliarios VIDEO Q58 - | $709 | $1,015 | $1,119 | $773 | $1,100 | $828 | 🟢 |
| Motorizados - INTER | $514 | $652 | $679 | $532 | $573 | $567 | 🟡 |
| Domiciliarios Q58 - | $1,913 | $1,204 | $1,195 | $1,035 | $1,137 | $1,062 | 🟢 |
| Domiciliarios - Expancion - Q58 | $372 | $331 | $303 | $319 | $298 | $342 | 🟡 |
| TEST Creativos - API | $622 | $930 | $824 | $689 | $762 | $896 | 🔴 |
| Domiciliarios VIDEO - API | $657 | $691 | $525 | $746 | $690 | $571 | 🟢 |
| Motorizados - API | $935 | $1,022 | $667 | $972 | $694 | $832 | 🔴 |
| Domiciliarios INTER - API | $295 | $340 | $391 | $267 | $311 | $265 | 🟢 |
| RADIO - Fincas | $1,038 | $887 | $1,274 | $1,080 | $1,356 | $929 | 🟢 |
| RADIO - Broad | $1,649 | $1,970 | $831 | $1,996 | $1,775 | $3,788 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | 11-19 | |
|---|---|---|---|---|---|---|---|
| RADIO - Moteros | 4.23 | 2.95 | 3.83 | 3.67 | 4.30 | 2.69 | 🔴 |
| RADIO - Seguridad / Negocios | 2.71 | 3.12 | 2.08 | 2.50 | 2.89 | 4.44 | 🟢 |
| Domiciliarios - API | 5.36 | 6.47 | 5.41 | 5.58 | 7.13 | 13.18 | 🟢 |
| Domiciliarios - Expancion - API | 4.33 | 4.63 | 4.84 | 6.25 | 7.28 | 8.90 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.64 | 6.78 | 6.76 | 5.38 | 5.03 | 4.70 | 🟡 |
| Domiciliarios - Expancion - INTER | 2.78 | 3.72 | 3.56 | 4.15 | 3.73 | 2.81 | 🔴 |
| Motorizados - Q58 | 2.80 | 2.54 | 2.83 | 3.35 | 4.00 | 4.30 | 🟢 |
| Domiciliarios VIDEO Q58 - | 2.84 | 2.36 | 1.90 | 3.16 | 2.18 | 2.94 | 🟢 |
| Motorizados - INTER | 9.71 | 8.13 | 7.24 | 10.22 | 10.81 | 9.94 | 🟡 |
| Domiciliarios Q58 - | 1.05 | 1.78 | 2.17 | 3.11 | 2.38 | 2.27 | 🟡 |
| Domiciliarios - Expancion - Q58 | 5.74 | 7.10 | 7.34 | 8.95 | 9.96 | 9.23 | 🟡 |
| TEST Creativos - API | 7.73 | 5.05 | 7.68 | 12.23 | 9.79 | 7.75 | 🔴 |
| Domiciliarios VIDEO - API | 5.31 | 5.52 | 7.02 | 5.55 | 7.69 | 10.23 | 🟢 |
| Motorizados - API | 4.02 | 3.61 | 6.39 | 4.49 | 6.98 | 7.25 | 🟡 |
| Domiciliarios INTER - API | 9.64 | 9.01 | 7.19 | 12.39 | 11.20 | 12.71 | 🟢 |
| RADIO - Fincas | 3.75 | 5.55 | 3.18 | 3.70 | 3.45 | 4.93 | 🟢 |
| RADIO - Broad | 3.73 | 3.66 | 9.38 | 2.96 | 3.59 | 1.77 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,967 | 599 | $719 | $3,122 | 4.34 | $530,580 |
| 2026-11-15 | $466,194 | 613 | $761 | $3,444 | 4.53 | $517,827 |
| 2026-11-16 | $588,173 | 781 | $753 | $3,462 | 4.60 | $665,530 |
| 2026-11-17 | $354,985 | 497 | $714 | $3,836 | 5.37 | $442,826 |
| 2026-11-18 | $491,220 | 674 | $729 | $3,891 | 5.34 | $590,721 |

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
