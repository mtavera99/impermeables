# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-16 02:46 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$216,701** |
| gastado hoy (hasta las 2h) | $10,689 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $446,490 |
| saldo proyectado a medianoche | $-219,100 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $427,530 — entra en zona de freno a las 14:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–2:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-12 | $5,395 | 8 | **$674** | $3,515 | 5.21 |
| 2026-11-13 | $7,836 | 13 | **$603** | $3,879 | 6.44 |
| 2026-11-14 | $9,056 | 19 | **$477** | $2,871 | 6.02 |
| 2026-11-15 | $12,003 | 20 | **$600** | $2,406 | 4.01 |
| 2026-11-16 **HOY** | $10,763 | 9 | **$1,196** | $2,529 | 2.11 |

🟠 Hoy va 99% más caro que ayer a la misma hora ($1,196 vs $600).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,196  =  $ 2,529  ÷  2.11
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,529 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 2.11 | 5,33 | 🔴 bajo |

🔑 **El CPM está normal y el conv/mil bajo: todo el problema es AUDIENCIA, no precio.** Esperar no lo arregla — hace falta público nuevo (el lookalike de compradores es la jugada pendiente).

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | $25,000 | $1,095 | 4% | 1 | $1,095 | 1.57 |
| Motorizados - Q58 | $29,000 | $1,089 | 4% | 1 | $1,089 | 1.48 |
| Domiciliarios VIDEO INTER - API | $36,000 | $990 | 3% | 0 | — | 0.00 |
| RADIO - Moteros | $35,000 | $909 | 3% | 0 | — | 0.00 |
| Domiciliarios - API | $35,000 | $872 | 2% | 2 | $436 | 10.42 |
| Domiciliarios INTER - API | $20,000 | $768 | 4% | 1 | $768 | 2.87 |
| Domiciliarios - Expancion - API | $30,000 | $669 | 2% | 1 | $669 | 7.35 |
| Domiciliarios VIDEO Q58 - | $25,000 | $622 | 2% | 0 | — | 0.00 |
| RADIO - Seguridad / Negocios | $40,000 | $567 | 1% | 0 | — | 0.00 |
| Motorizados - INTER | $25,000 | $553 | 2% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $532 | 3% | 0 | — | 0.00 |
| Domiciliarios - Expancion - Q58 | $29,000 | $522 | 2% | 2 | $261 | 6.54 |
| Domiciliarios Q58 - | $25,000 | $509 | 2% | 1 | $509 | 4.46 |
| Motorizados - API | $20,000 | $460 | 2% | 0 | — | 0.00 |
| TEST Creativos - API | $20,000 | $255 | 1% | 0 | — | 0.00 |
| RADIO - Fincas | $20,000 | $248 | 1% | 0 | — | 0.00 |
| RADIO - Broad | $10,000 | $103 | 1% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $10,763 | 9 | **$1,196** | $2,402 | **50%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$21,983**/pedido |
| utilidad estimada de lo que va del día | **$3,684** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | $623 | $606 | $660 | $652 | $594 | $1,095 | 🔴 |
| Motorizados - Q58 | $643 | $913 | $612 | $589 | $811 | $1,089 | 🔴 |
| Domiciliarios VIDEO INTER - API | $713 | $875 | $768 | $645 | $697 | — | 🟡 |
| RADIO - Moteros | $1,757 | $2,042 | $1,314 | $1,535 | $2,005 | — | 🔴 |
| Domiciliarios - API | $856 | $757 | $1,151 | $779 | $732 | $436 | 🟢 |
| Domiciliarios INTER - API | $285 | $344 | $361 | $295 | $338 | $768 | 🔴 |
| Domiciliarios - Expancion - API | $841 | $842 | $1,140 | $1,193 | $1,155 | $669 | 🟢 |
| Domiciliarios VIDEO Q58 - | $603 | $800 | $880 | $709 | $1,008 | — | 🔴 |
| RADIO - Seguridad / Negocios | $1,142 | $937 | $1,073 | $1,219 | $1,165 | — | 🟡 |
| Motorizados - INTER | $484 | $758 | $656 | $514 | $644 | — | 🔴 |
| Domiciliarios VIDEO - API | $635 | $939 | $564 | $657 | $683 | — | 🟡 |
| Domiciliarios - Expancion - Q58 | $296 | $360 | $348 | $372 | $326 | $261 | 🟢 |
| Domiciliarios Q58 - | $877 | $1,051 | $1,039 | $1,913 | $1,203 | $509 | 🟢 |
| Motorizados - API | $840 | $770 | $793 | $935 | $1,008 | — | 🟡 |
| TEST Creativos - API | $740 | $894 | $661 | $622 | $927 | — | 🔴 |
| RADIO - Fincas | $1,254 | $939 | $1,359 | $1,038 | $877 | — | 🟢 |
| RADIO - Broad | $970 | $1,617 | $1,916 | $1,649 | $1,928 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | 3.69 | 3.71 | 2.96 | 2.78 | 3.73 | 1.57 | 🔴 |
| Motorizados - Q58 | 4.00 | 2.66 | 3.43 | 2.80 | 2.55 | 1.48 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.64 | 5.43 | 6.46 | 6.64 | 6.85 | — | 🟡 |
| RADIO - Moteros | 3.35 | 2.69 | 3.80 | 4.23 | 3.00 | — | 🔴 |
| Domiciliarios - API | 5.31 | 6.19 | 3.74 | 5.36 | 6.53 | 10.42 | 🟢 |
| Domiciliarios INTER - API | 11.04 | 10.69 | 7.88 | 9.64 | 9.09 | 2.87 | 🔴 |
| Domiciliarios - Expancion - API | 5.77 | 5.92 | 4.02 | 4.33 | 4.67 | 7.35 | 🟢 |
| Domiciliarios VIDEO Q58 - | 4.55 | 3.42 | 2.51 | 2.84 | 2.37 | — | 🔴 |
| RADIO - Seguridad / Negocios | 3.47 | 3.92 | 2.84 | 2.71 | 3.16 | — | 🟢 |
| Motorizados - INTER | 11.33 | 8.51 | 7.89 | 9.71 | 8.26 | — | 🟡 |
| Domiciliarios VIDEO - API | 6.40 | 3.75 | 5.83 | 5.31 | 5.59 | — | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.99 | 7.65 | 7.05 | 5.74 | 7.22 | 6.54 | 🟡 |
| Domiciliarios Q58 - | 3.18 | 2.21 | 2.20 | 1.05 | 1.78 | 4.46 | 🟢 |
| Motorizados - API | 4.32 | 4.98 | 4.55 | 4.02 | 3.64 | — | 🟡 |
| TEST Creativos - API | 7.39 | 6.24 | 7.75 | 7.73 | 5.06 | — | 🔴 |
| RADIO - Fincas | 3.68 | 4.56 | 3.20 | 3.75 | 5.60 | — | 🟢 |
| RADIO - Broad | 8.34 | 4.62 | 3.51 | 3.73 | 3.70 | — | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-10 | $377,307 | 577 | $654 | $3,781 | 5.78 | $548,925 |
| 2026-11-11 | $449,265 | 687 | $654 | $3,664 | 5.60 | $653,545 |
| 2026-11-12 | $423,316 | 553 | $765 | $3,631 | 4.74 | $464,390 |
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,960 | 599 | $719 | $3,122 | 4.34 | $530,587 |
| 2026-11-15 | $461,714 | 613 | $753 | $3,440 | 4.57 | $522,307 |

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
