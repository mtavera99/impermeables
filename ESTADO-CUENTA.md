# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-16 03:46 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$214,456** |
| gastado hoy (hasta las 3h) | $12,979 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $447,292 |
| saldo proyectado a medianoche | $-219,857 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $427,485 — entra en zona de freno a las 14:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–3:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-12 | $6,447 | 9 | **$716** | $3,602 | 5.03 |
| 2026-11-13 | $8,442 | 13 | **$649** | $3,737 | 5.75 |
| 2026-11-14 | $10,457 | 24 | **$436** | $2,876 | 6.60 |
| 2026-11-15 | $13,716 | 25 | **$549** | $2,446 | 4.46 |
| 2026-11-16 **HOY** | $12,979 | 10 | **$1,298** | $2,654 | 2.04 |

🟠 Hoy va 137% más caro que ayer a la misma hora ($1,298 vs $549).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,298  =  $ 2,654  ÷  2.04
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,654 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 2.04 | 5,33 | 🔴 bajo |

🔑 **El CPM está normal y el conv/mil bajo: todo el problema es AUDIENCIA, no precio.** Esperar no lo arregla — hace falta público nuevo (el lookalike de compradores es la jugada pendiente).

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Moteros | $35,000 | $1,770 | 5% | 0 | — | 0.00 |
| Motorizados - Q58 | $29,000 | $1,302 | 4% | 1 | $1,302 | 1.27 |
| Domiciliarios - Expancion - INTER | $25,000 | $1,193 | 5% | 1 | $1,193 | 1.38 |
| Domiciliarios VIDEO INTER - API | $36,000 | $1,145 | 3% | 1 | $1,145 | 3.12 |
| Domiciliarios - API | $35,000 | $965 | 3% | 2 | $482 | 9.01 |
| Domiciliarios INTER - API | $20,000 | $889 | 4% | 1 | $889 | 2.38 |
| Domiciliarios - Expancion - API | $30,000 | $842 | 3% | 1 | $842 | 6.06 |
| RADIO - Seguridad / Negocios | $40,000 | $665 | 2% | 0 | — | 0.00 |
| Motorizados - INTER | $25,000 | $659 | 3% | 0 | — | 0.00 |
| Domiciliarios VIDEO Q58 - | $25,000 | $644 | 3% | 0 | — | 0.00 |
| Domiciliarios - Expancion - Q58 | $29,000 | $584 | 2% | 2 | $292 | 5.88 |
| Domiciliarios VIDEO - API | $20,000 | $581 | 3% | 0 | — | 0.00 |
| Domiciliarios Q58 - | $25,000 | $541 | 2% | 1 | $541 | 4.03 |
| Motorizados - API | $20,000 | $534 | 3% | 0 | — | 0.00 |
| TEST Creativos - API | $20,000 | $277 | 1% | 0 | — | 0.00 |
| RADIO - Fincas | $20,000 | $273 | 1% | 0 | — | 0.00 |
| RADIO - Broad | $10,000 | $115 | 1% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $12,979 | 10 | **$1,298** | $2,402 | **54%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$23,858**/pedido |
| utilidad estimada de lo que va del día | **$3,074** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | |
|---|---|---|---|---|---|---|---|
| RADIO - Moteros | $1,757 | $2,042 | $1,314 | $1,535 | $2,005 | — | 🔴 |
| Motorizados - Q58 | $643 | $913 | $612 | $589 | $811 | $1,302 | 🔴 |
| Domiciliarios - Expancion - INTER | $623 | $606 | $660 | $652 | $594 | $1,193 | 🔴 |
| Domiciliarios VIDEO INTER - API | $713 | $875 | $768 | $645 | $697 | $1,145 | 🔴 |
| Domiciliarios - API | $856 | $757 | $1,151 | $779 | $732 | $482 | 🟢 |
| Domiciliarios INTER - API | $285 | $344 | $361 | $295 | $338 | $889 | 🔴 |
| Domiciliarios - Expancion - API | $841 | $842 | $1,140 | $1,193 | $1,155 | $842 | 🟢 |
| RADIO - Seguridad / Negocios | $1,142 | $937 | $1,073 | $1,219 | $1,166 | — | 🟡 |
| Motorizados - INTER | $484 | $758 | $656 | $514 | $644 | — | 🔴 |
| Domiciliarios VIDEO Q58 - | $603 | $800 | $880 | $709 | $1,008 | — | 🔴 |
| Domiciliarios - Expancion - Q58 | $296 | $360 | $348 | $372 | $326 | $292 | 🟢 |
| Domiciliarios VIDEO - API | $635 | $939 | $564 | $657 | $684 | — | 🟡 |
| Domiciliarios Q58 - | $877 | $1,051 | $1,039 | $1,913 | $1,203 | $541 | 🟢 |
| Motorizados - API | $840 | $770 | $793 | $935 | $1,009 | — | 🟡 |
| TEST Creativos - API | $740 | $894 | $661 | $622 | $928 | — | 🔴 |
| RADIO - Fincas | $1,254 | $939 | $1,359 | $1,038 | $877 | — | 🟢 |
| RADIO - Broad | $970 | $1,617 | $1,916 | $1,649 | $1,931 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | |
|---|---|---|---|---|---|---|---|
| RADIO - Moteros | 3.35 | 2.69 | 3.80 | 4.23 | 3.00 | — | 🔴 |
| Motorizados - Q58 | 4.00 | 2.66 | 3.43 | 2.80 | 2.55 | 1.27 | 🔴 |
| Domiciliarios - Expancion - INTER | 3.69 | 3.71 | 2.96 | 2.78 | 3.73 | 1.38 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.64 | 5.43 | 6.46 | 6.64 | 6.85 | 3.12 | 🔴 |
| Domiciliarios - API | 5.31 | 6.19 | 3.74 | 5.36 | 6.53 | 9.01 | 🟢 |
| Domiciliarios INTER - API | 11.04 | 10.69 | 7.88 | 9.64 | 9.09 | 2.38 | 🔴 |
| Domiciliarios - Expancion - API | 5.77 | 5.92 | 4.02 | 4.33 | 4.67 | 6.06 | 🟢 |
| RADIO - Seguridad / Negocios | 3.47 | 3.92 | 2.84 | 2.71 | 3.16 | — | 🟢 |
| Motorizados - INTER | 11.33 | 8.51 | 7.89 | 9.71 | 8.25 | — | 🔴 |
| Domiciliarios VIDEO Q58 - | 4.55 | 3.42 | 2.51 | 2.84 | 2.37 | — | 🔴 |
| Domiciliarios - Expancion - Q58 | 7.99 | 7.65 | 7.05 | 5.74 | 7.21 | 5.88 | 🔴 |
| Domiciliarios VIDEO - API | 6.40 | 3.75 | 5.83 | 5.31 | 5.58 | — | 🟢 |
| Domiciliarios Q58 - | 3.18 | 2.21 | 2.20 | 1.05 | 1.78 | 4.03 | 🟢 |
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
| 2026-11-15 | $461,839 | 613 | $753 | $3,440 | 4.57 | $522,182 |

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
