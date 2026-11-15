# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-15 13:27 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$310,826** |
| gastado hoy (hasta las 13h) | $177,874 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $437,154 |
| saldo proyectado a medianoche | $51,546 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $166,220 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–13:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-11 | $178,968 | 269 | **$665** | $3,896 | 5.86 |
| 2026-11-12 | $166,690 | 234 | **$712** | $4,070 | 5.71 |
| 2026-11-13 | $198,933 | 277 | **$718** | $3,419 | 4.76 |
| 2026-11-14 | $190,278 | 251 | **$758** | $3,371 | 4.45 |
| 2026-11-15 **HOY** | $177,874 | 205 | **$868** | $3,986 | 4.59 |

🟠 Hoy va 14% más caro que ayer a la misma hora ($868 vs $758).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   868  =  $ 3,986  ÷  4.59
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,986 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.59 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | $36,000 | $17,676 | 49% | 25 | $707 | 7.11 |
| RADIO - Seguridad / Negocios | $40,000 | $17,042 | 43% | 14 | $1,217 | 3.41 |
| RADIO - Moteros | $35,000 | $14,931 | 43% | 6 | $2,488 | 2.79 |
| Domiciliarios - API | $35,000 | $14,362 | 41% | 17 | $845 | 6.57 |
| Domiciliarios - Expancion - API | $30,000 | $11,887 | 40% | 11 | $1,081 | 5.77 |
| Motorizados - Q58 | $29,000 | $10,704 | 37% | 15 | $714 | 3.17 |
| Domiciliarios - Expancion - Q58 | $29,000 | $10,686 | 37% | 17 | $629 | 3.91 |
| Domiciliarios - Expancion - INTER | $25,000 | $9,701 | 39% | 12 | $808 | 3.05 |
| Domiciliarios VIDEO Q58 - | $25,000 | $9,204 | 37% | 10 | $920 | 3.16 |
| Motorizados - INTER | $25,000 | $9,085 | 36% | 8 | $1,136 | 5.09 |
| TEST Creativos - API | $20,000 | $8,891 | 44% | 11 | $808 | 7.28 |
| Domiciliarios Q58 - | $25,000 | $8,686 | 35% | 10 | $869 | 2.88 |
| Domiciliarios VIDEO - API | $20,000 | $8,058 | 40% | 9 | $895 | 4.59 |
| Motorizados - API | $20,000 | $7,685 | 38% | 10 | $768 | 5.69 |
| RADIO - Fincas | $20,000 | $6,858 | 34% | 11 | $623 | 8.63 |
| Domiciliarios INTER - API | $20,000 | $6,568 | 33% | 18 | $365 | 9.32 |
| RADIO - Broad | $10,000 | $5,850 | 58% | 1 | $5,850 | 1.41 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $177,874 | 205 | **$868** | $2,402 | **36%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$15,950**/pedido |
| utilidad estimada de lo que va del día | **$151,203** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | $601 | $713 | $875 | $768 | $645 | $707 | 🟡 |
| RADIO - Seguridad / Negocios | $1,417 | $1,142 | $937 | $1,073 | $1,219 | $1,217 | 🟡 |
| RADIO - Moteros | $2,246 | $1,757 | $2,042 | $1,314 | $1,534 | $2,488 | 🔴 |
| Domiciliarios - API | $489 | $856 | $757 | $1,151 | $779 | $845 | 🟡 |
| Domiciliarios - Expancion - API | $711 | $841 | $842 | $1,140 | $1,193 | $1,081 | 🟢 |
| Motorizados - Q58 | $646 | $643 | $913 | $612 | $589 | $714 | 🔴 |
| Domiciliarios - Expancion - Q58 | $290 | $296 | $360 | $348 | $372 | $629 | 🔴 |
| Domiciliarios - Expancion - INTER | $700 | $623 | $606 | $660 | $652 | $808 | 🔴 |
| Domiciliarios VIDEO Q58 - | $798 | $603 | $800 | $880 | $709 | $920 | 🔴 |
| Motorizados - INTER | $639 | $484 | $758 | $656 | $514 | $1,136 | 🔴 |
| TEST Creativos - API | $797 | $740 | $894 | $661 | $622 | $808 | 🔴 |
| Domiciliarios Q58 - | $1,066 | $877 | $1,051 | $1,039 | $1,913 | $869 | 🟢 |
| Domiciliarios VIDEO - API | $532 | $635 | $939 | $564 | $657 | $895 | 🔴 |
| Motorizados - API | $597 | $840 | $770 | $793 | $934 | $768 | 🟢 |
| RADIO - Fincas | $639 | $1,254 | $939 | $1,359 | $1,037 | $623 | 🟢 |
| Domiciliarios INTER - API | $306 | $285 | $344 | $361 | $295 | $365 | 🔴 |
| RADIO - Broad | — | $970 | $1,617 | $1,916 | $1,649 | $5,850 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | 8.46 | 6.64 | 5.43 | 6.46 | 6.65 | 7.11 | 🟢 |
| RADIO - Seguridad / Negocios | 2.80 | 3.47 | 3.92 | 2.84 | 2.72 | 3.41 | 🟢 |
| RADIO - Moteros | 2.45 | 3.35 | 2.69 | 3.80 | 4.25 | 2.79 | 🔴 |
| Domiciliarios - API | 8.23 | 5.31 | 6.19 | 3.74 | 5.37 | 6.57 | 🟢 |
| Domiciliarios - Expancion - API | 6.23 | 5.77 | 5.92 | 4.02 | 4.34 | 5.77 | 🟢 |
| Motorizados - Q58 | 4.43 | 4.00 | 2.66 | 3.43 | 2.80 | 3.17 | 🟢 |
| Domiciliarios - Expancion - Q58 | 8.82 | 7.99 | 7.65 | 7.05 | 5.75 | 3.91 | 🔴 |
| Domiciliarios - Expancion - INTER | 3.66 | 3.69 | 3.71 | 2.96 | 2.78 | 3.05 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.69 | 4.55 | 3.42 | 2.51 | 2.84 | 3.16 | 🟢 |
| Motorizados - INTER | 8.52 | 11.33 | 8.51 | 7.89 | 9.73 | 5.09 | 🔴 |
| TEST Creativos - API | 7.45 | 7.39 | 6.24 | 7.75 | 7.73 | 7.28 | 🟡 |
| Domiciliarios Q58 - | 3.41 | 3.18 | 2.21 | 2.20 | 1.05 | 2.88 | 🟢 |
| Domiciliarios VIDEO - API | 6.74 | 6.40 | 3.75 | 5.83 | 5.32 | 4.59 | 🟡 |
| Motorizados - API | 5.91 | 4.32 | 4.98 | 4.55 | 4.03 | 5.69 | 🟢 |
| RADIO - Fincas | 7.62 | 3.68 | 4.56 | 3.20 | 3.76 | 8.63 | 🟢 |
| Domiciliarios INTER - API | 10.54 | 11.04 | 10.69 | 7.88 | 9.64 | 9.32 | 🟡 |
| RADIO - Broad | — | 8.34 | 4.62 | 3.51 | 3.73 | 1.41 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-09 | $471,508 | 752 | $627 | $3,268 | 5.21 | $735,643 |
| 2026-11-10 | $377,307 | 577 | $654 | $3,781 | 5.78 | $548,925 |
| 2026-11-11 | $449,265 | 687 | $654 | $3,664 | 5.60 | $653,545 |
| 2026-11-12 | $423,316 | 553 | $765 | $3,631 | 4.74 | $464,390 |
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,867 | 599 | $719 | $3,126 | 4.35 | $530,680 |

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
