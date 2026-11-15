# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-15 14:27 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$281,805** |
| gastado hoy (hasta las 14h) | $206,255 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $439,189 |
| saldo proyectado a medianoche | $48,871 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $166,860 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-11 | $202,899 | 298 | **$681** | $3,898 | 5.72 |
| 2026-11-12 | $186,924 | 262 | **$713** | $4,045 | 5.67 |
| 2026-11-13 | $222,094 | 299 | **$743** | $3,460 | 4.66 |
| 2026-11-14 | $219,824 | 292 | **$753** | $3,370 | 4.48 |
| 2026-11-15 **HOY** | $206,255 | 234 | **$881** | $3,963 | 4.50 |

🟠 Hoy va 17% más caro que ayer a la misma hora ($881 vs $753).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   881  =  $ 3,963  ÷  4.50
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,963 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.50 | 5,33 | 🟠 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | $36,000 | $19,709 | 55% | 26 | $758 | 6.59 |
| RADIO - Seguridad / Negocios | $40,000 | $19,466 | 49% | 17 | $1,145 | 3.74 |
| RADIO - Moteros | $35,000 | $16,739 | 48% | 7 | $2,391 | 2.85 |
| Domiciliarios - API | $35,000 | $16,660 | 48% | 20 | $833 | 6.59 |
| Domiciliarios - Expancion - API | $30,000 | $13,985 | 47% | 13 | $1,076 | 5.90 |
| Domiciliarios - Expancion - Q58 | $29,000 | $12,904 | 44% | 22 | $587 | 4.23 |
| Motorizados - Q58 | $29,000 | $12,324 | 42% | 16 | $770 | 3.01 |
| Domiciliarios - Expancion - INTER | $25,000 | $11,231 | 45% | 12 | $936 | 2.60 |
| Domiciliarios VIDEO Q58 - | $25,000 | $11,125 | 44% | 12 | $927 | 3.06 |
| Domiciliarios Q58 - | $25,000 | $10,841 | 43% | 11 | $986 | 2.54 |
| Motorizados - INTER | $25,000 | $10,816 | 43% | 10 | $1,082 | 5.36 |
| TEST Creativos - API | $20,000 | $9,896 | 49% | 11 | $900 | 6.34 |
| Domiciliarios VIDEO - API | $20,000 | $9,112 | 46% | 9 | $1,012 | 4.05 |
| Motorizados - API | $20,000 | $9,057 | 45% | 11 | $823 | 5.34 |
| RADIO - Fincas | $20,000 | $8,325 | 42% | 12 | $694 | 7.81 |
| Domiciliarios INTER - API | $20,000 | $7,681 | 38% | 23 | $334 | 10.11 |
| RADIO - Broad | $10,000 | $6,384 | 64% | 2 | $3,192 | 2.56 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $206,255 | 234 | **$881** | $2,402 | **37%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$16,203**/pedido |
| utilidad estimada de lo que va del día | **$169,374** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | $601 | $713 | $875 | $768 | $645 | $758 | 🔴 |
| RADIO - Seguridad / Negocios | $1,417 | $1,142 | $937 | $1,073 | $1,219 | $1,145 | 🟢 |
| RADIO - Moteros | $2,246 | $1,757 | $2,042 | $1,314 | $1,534 | $2,391 | 🔴 |
| Domiciliarios - API | $489 | $856 | $757 | $1,151 | $779 | $833 | 🟡 |
| Domiciliarios - Expancion - API | $711 | $841 | $842 | $1,140 | $1,193 | $1,076 | 🟢 |
| Domiciliarios - Expancion - Q58 | $290 | $296 | $360 | $348 | $372 | $587 | 🔴 |
| Motorizados - Q58 | $646 | $643 | $913 | $612 | $589 | $770 | 🔴 |
| Domiciliarios - Expancion - INTER | $700 | $623 | $606 | $660 | $652 | $936 | 🔴 |
| Domiciliarios VIDEO Q58 - | $798 | $603 | $800 | $880 | $709 | $927 | 🔴 |
| Domiciliarios Q58 - | $1,066 | $877 | $1,051 | $1,039 | $1,913 | $986 | 🟢 |
| Motorizados - INTER | $639 | $484 | $758 | $656 | $514 | $1,082 | 🔴 |
| TEST Creativos - API | $797 | $740 | $894 | $661 | $622 | $900 | 🔴 |
| Domiciliarios VIDEO - API | $532 | $635 | $939 | $564 | $657 | $1,012 | 🔴 |
| Motorizados - API | $597 | $840 | $770 | $793 | $934 | $823 | 🟢 |
| RADIO - Fincas | $639 | $1,254 | $939 | $1,359 | $1,037 | $694 | 🟢 |
| Domiciliarios INTER - API | $306 | $285 | $344 | $361 | $295 | $334 | 🟡 |
| RADIO - Broad | — | $970 | $1,617 | $1,916 | $1,649 | $3,192 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | 8.46 | 6.64 | 5.43 | 6.46 | 6.65 | 6.59 | 🟡 |
| RADIO - Seguridad / Negocios | 2.80 | 3.47 | 3.92 | 2.84 | 2.72 | 3.74 | 🟢 |
| RADIO - Moteros | 2.45 | 3.35 | 2.69 | 3.80 | 4.24 | 2.85 | 🔴 |
| Domiciliarios - API | 8.23 | 5.31 | 6.19 | 3.74 | 5.37 | 6.59 | 🟢 |
| Domiciliarios - Expancion - API | 6.23 | 5.77 | 5.92 | 4.02 | 4.34 | 5.90 | 🟢 |
| Domiciliarios - Expancion - Q58 | 8.82 | 7.99 | 7.65 | 7.05 | 5.75 | 4.23 | 🔴 |
| Motorizados - Q58 | 4.43 | 4.00 | 2.66 | 3.43 | 2.80 | 3.01 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.66 | 3.69 | 3.71 | 2.96 | 2.78 | 2.60 | 🟡 |
| Domiciliarios VIDEO Q58 - | 3.69 | 4.55 | 3.42 | 2.51 | 2.84 | 3.06 | 🟢 |
| Domiciliarios Q58 - | 3.41 | 3.18 | 2.21 | 2.20 | 1.05 | 2.54 | 🟢 |
| Motorizados - INTER | 8.52 | 11.33 | 8.51 | 7.89 | 9.73 | 5.36 | 🔴 |
| TEST Creativos - API | 7.45 | 7.39 | 6.24 | 7.75 | 7.73 | 6.34 | 🔴 |
| Domiciliarios VIDEO - API | 6.74 | 6.40 | 3.75 | 5.83 | 5.32 | 4.05 | 🔴 |
| Motorizados - API | 5.91 | 4.32 | 4.98 | 4.55 | 4.03 | 5.34 | 🟢 |
| RADIO - Fincas | 7.62 | 3.68 | 4.56 | 3.20 | 3.76 | 7.81 | 🟢 |
| Domiciliarios INTER - API | 10.54 | 11.04 | 10.69 | 7.88 | 9.64 | 10.11 | 🟡 |
| RADIO - Broad | — | 8.34 | 4.62 | 3.51 | 3.73 | 2.56 | 🔴 |

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
| 2026-11-14 | $430,882 | 599 | $719 | $3,125 | 4.34 | $530,665 |

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
