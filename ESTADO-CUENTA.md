# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-13 15:51 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$167,584** |
| gastado hoy (hasta las 15h) | $229,070 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $449,912 |
| saldo proyectado a medianoche | $-53,258 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $258,266 — entra en zona de freno a las 20:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-09 | $250,047 | 407 | **$614** | $3,263 | 5.31 |
| 2026-11-10 | $155,929 | 244 | **$639** | $4,231 | 6.62 |
| 2026-11-11 | $223,863 | 330 | **$678** | $3,895 | 5.74 |
| 2026-11-12 | $206,700 | 287 | **$720** | $4,003 | 5.56 |
| 2026-11-13 **HOY** | $229,070 | 318 | **$720** | $3,476 | 4.83 |

🟠 Hoy va 0% más caro que ayer a la misma hora ($720 vs $720).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   720  =  $ 3,476  ÷  4.83
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,476 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.83 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $21,430 | 54% | 28 | $765 | 3.93 |
| Domiciliarios VIDEO INTER - API | $36,000 | $20,017 | 56% | 28 | $715 | 6.98 |
| RADIO - Moteros | $35,000 | $18,824 | 54% | 19 | $991 | 5.14 |
| Domiciliarios - API | $35,000 | $18,271 | 52% | 20 | $914 | 5.26 |
| Motorizados - Q58 | $29,000 | $15,830 | 55% | 23 | $688 | 3.40 |
| Domiciliarios - Expancion - API | $30,000 | $15,449 | 51% | 13 | $1,188 | 4.53 |
| Domiciliarios - Expancion - INTER | $25,000 | $13,942 | 56% | 24 | $581 | 3.63 |
| Motorizados - INTER | $25,000 | $13,923 | 56% | 22 | $633 | 8.95 |
| Domiciliarios VIDEO Q58 - | $25,000 | $13,730 | 55% | 15 | $915 | 2.77 |
| Domiciliarios Q58 - | $25,000 | $13,175 | 53% | 8 | $1,647 | 1.49 |
| Domiciliarios - Expancion - Q58 | $29,000 | $12,758 | 44% | 37 | $345 | 7.45 |
| Domiciliarios INTER - API | $20,000 | $10,269 | 51% | 29 | $354 | 8.61 |
| Domiciliarios VIDEO - API | $20,000 | $10,069 | 50% | 17 | $592 | 6.14 |
| TEST Creativos - API | $20,000 | $9,032 | 45% | 12 | $753 | 6.88 |
| Motorizados - API | $20,000 | $8,917 | 45% | 13 | $686 | 5.63 |
| RADIO - Fincas | $20,000 | $7,636 | 38% | 8 | $954 | 4.60 |
| RADIO - Broad | $10,000 | $5,798 | 58% | 2 | $2,899 | 2.29 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $229,070 | 318 | **$720** | $2,402 | **30%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$13,242**/pedido |
| utilidad estimada de lo que va del día | **$281,401** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-08 | 11-09 | 11-10 | 11-11 | 11-12 | 11-13 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $914 | $873 | $1,417 | $1,142 | $935 | $765 | 🟢 |
| Domiciliarios VIDEO INTER - API | $565 | $641 | $601 | $713 | $875 | $715 | 🟢 |
| RADIO - Moteros | $1,178 | $1,702 | $2,246 | $1,757 | $2,039 | $991 | 🟢 |
| Domiciliarios - API | $430 | $500 | $489 | $856 | $756 | $914 | 🔴 |
| Motorizados - Q58 | $683 | $853 | $646 | $643 | $913 | $688 | 🟢 |
| Domiciliarios - Expancion - API | $543 | $550 | $711 | $841 | $841 | $1,188 | 🔴 |
| Domiciliarios - Expancion - INTER | $512 | $682 | $700 | $623 | $606 | $581 | 🟡 |
| Motorizados - INTER | $460 | $558 | $639 | $484 | $758 | $633 | 🟢 |
| Domiciliarios VIDEO Q58 - | $581 | $697 | $798 | $603 | $799 | $915 | 🟡 |
| Domiciliarios Q58 - | $773 | $1,156 | $1,066 | $877 | $1,051 | $1,647 | 🔴 |
| Domiciliarios - Expancion - Q58 | $265 | $314 | $290 | $296 | $360 | $345 | 🟡 |
| Domiciliarios INTER - API | $288 | $315 | $306 | $285 | $344 | $354 | 🟡 |
| Domiciliarios VIDEO - API | $344 | $411 | $532 | $635 | $939 | $592 | 🟢 |
| TEST Creativos - API | $629 | $680 | $797 | $740 | $893 | $753 | 🟢 |
| Motorizados - API | $390 | $543 | $597 | $840 | $770 | $686 | 🟢 |
| RADIO - Fincas | $725 | $1,388 | $639 | $1,254 | $938 | $954 | 🟡 |
| RADIO - Broad | $1,184 | $1,465 | — | $970 | $1,617 | $2,899 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-08 | 11-09 | 11-10 | 11-11 | 11-12 | 11-13 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 3.05 | 4.26 | 2.80 | 3.47 | 3.92 | 3.93 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.57 | 6.48 | 8.46 | 6.64 | 5.44 | 6.98 | 🟢 |
| RADIO - Moteros | 2.63 | 2.37 | 2.45 | 3.35 | 2.70 | 5.14 | 🟢 |
| Domiciliarios - API | 8.43 | 7.59 | 8.23 | 5.31 | 6.19 | 5.26 | 🟡 |
| Motorizados - Q58 | 2.40 | 2.64 | 4.43 | 4.00 | 2.66 | 3.40 | 🟢 |
| Domiciliarios - Expancion - API | 6.71 | 6.71 | 6.23 | 5.77 | 5.93 | 4.53 | 🔴 |
| Domiciliarios - Expancion - INTER | 3.65 | 3.59 | 3.66 | 3.69 | 3.71 | 3.63 | 🟡 |
| Motorizados - INTER | 8.69 | 8.39 | 8.52 | 11.33 | 8.52 | 8.95 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.96 | 3.27 | 3.69 | 4.55 | 3.42 | 2.77 | 🔴 |
| Domiciliarios Q58 - | 3.14 | 2.67 | 3.41 | 3.18 | 2.21 | 1.49 | 🔴 |
| Domiciliarios - Expancion - Q58 | 7.28 | 6.45 | 8.82 | 7.99 | 7.67 | 7.45 | 🟡 |
| Domiciliarios INTER - API | 8.60 | 9.41 | 10.54 | 11.04 | 10.70 | 8.61 | 🔴 |
| Domiciliarios VIDEO - API | 7.31 | 7.66 | 6.74 | 6.40 | 3.75 | 6.14 | 🟢 |
| TEST Creativos - API | 7.61 | 8.46 | 7.45 | 7.39 | 6.24 | 6.88 | 🟢 |
| Motorizados - API | 7.88 | 5.65 | 5.91 | 4.32 | 4.98 | 5.63 | 🟢 |
| RADIO - Fincas | 4.90 | 3.22 | 7.62 | 3.68 | 4.57 | 4.60 | 🟡 |
| RADIO - Broad | 5.20 | 4.47 | — | 8.34 | 4.63 | 2.29 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-07 | $367,724 | 678 | $542 | $3,153 | 5.81 | $720,638 |
| 2026-11-08 | $477,063 | 911 | $524 | $2,764 | 5.28 | $985,324 |
| 2026-11-09 | $471,508 | 752 | $627 | $3,268 | 5.21 | $735,643 |
| 2026-11-10 | $377,307 | 577 | $654 | $3,781 | 5.78 | $548,925 |
| 2026-11-11 | $449,265 | 687 | $654 | $3,664 | 5.60 | $653,545 |
| 2026-11-12 | $422,983 | 553 | $765 | $3,631 | 4.75 | $464,723 |

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
