# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-14 06:39 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$301,210** |
| gastado hoy (hasta las 6h) | $22,489 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $440,184 |
| saldo proyectado a medianoche | $-116,484 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $331,221 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–6:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-10 | $16,799 | 38 | **$442** | $3,522 | 7.97 |
| 2026-11-11 | $32,124 | 50 | **$642** | $3,545 | 5.52 |
| 2026-11-12 | $23,241 | 38 | **$612** | $3,431 | 5.61 |
| 2026-11-13 | $37,468 | 53 | **$707** | $2,832 | 4.01 |
| 2026-11-14 **HOY** | $22,489 | 43 | **$523** | $3,057 | 5.84 |

🟢 **Hoy va mejor que ayer a la misma hora** ($523 vs $707).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   523  =  $ 3,057  ÷  5.84
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,057 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.84 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $2,773 | 8% | 2 | $1,386 | 3.00 |
| RADIO - Moteros | $35,000 | $2,230 | 6% | 1 | $2,230 | 2.80 |
| RADIO - Seguridad / Negocios | $40,000 | $2,190 | 5% | 4 | $548 | 5.66 |
| Domiciliarios - Expancion - API | $30,000 | $2,117 | 7% | 3 | $706 | 7.48 |
| Domiciliarios VIDEO INTER - API | $36,000 | $1,869 | 5% | 4 | $467 | 10.05 |
| Domiciliarios VIDEO - API | $20,000 | $1,723 | 9% | 3 | $574 | 5.89 |
| Motorizados - Q58 | $29,000 | $1,628 | 6% | 5 | $326 | 4.44 |
| Motorizados - API | $20,000 | $1,258 | 6% | 2 | $629 | 5.29 |
| Domiciliarios - Expancion - INTER | $25,000 | $1,088 | 4% | 1 | $1,088 | 1.42 |
| Domiciliarios INTER - API | $20,000 | $994 | 5% | 3 | $331 | 7.96 |
| RADIO - Broad | $10,000 | $860 | 9% | 3 | $287 | 21.43 |
| TEST Creativos - API | $20,000 | $739 | 4% | 3 | $246 | 17.96 |
| Domiciliarios Q58 - | $25,000 | $686 | 3% | 2 | $343 | 4.42 |
| Motorizados - INTER | $25,000 | $609 | 2% | 2 | $304 | 14.93 |
| Domiciliarios - Expancion - Q58 | $29,000 | $589 | 2% | 4 | $147 | 12.90 |
| RADIO - Fincas | $20,000 | $578 | 3% | 0 | — | 0.00 |
| Domiciliarios VIDEO Q58 - | $25,000 | $558 | 2% | 1 | $558 | 2.98 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $22,489 | 43 | **$523** | $2,402 | **22%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,614**/pedido |
| utilidad estimada de lo que va del día | **$46,537** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-09 | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $500 | $489 | $856 | $757 | $1,144 | $1,386 | 🔴 |
| RADIO - Moteros | $1,702 | $2,246 | $1,757 | $2,042 | $1,290 | $2,230 | 🔴 |
| RADIO - Seguridad / Negocios | $873 | $1,417 | $1,142 | $937 | $1,054 | $548 | 🟢 |
| Domiciliarios - Expancion - API | $550 | $711 | $841 | $842 | $1,133 | $706 | 🟢 |
| Domiciliarios VIDEO INTER - API | $641 | $601 | $713 | $875 | $763 | $467 | 🟢 |
| Domiciliarios VIDEO - API | $411 | $532 | $635 | $939 | $558 | $574 | 🟡 |
| Motorizados - Q58 | $853 | $646 | $643 | $913 | $610 | $326 | 🟢 |
| Motorizados - API | $543 | $597 | $840 | $770 | $784 | $629 | 🟢 |
| Domiciliarios - Expancion - INTER | $682 | $700 | $623 | $606 | $659 | $1,088 | 🔴 |
| Domiciliarios INTER - API | $315 | $306 | $285 | $344 | $359 | $331 | 🟢 |
| RADIO - Broad | $1,465 | — | $970 | $1,617 | $1,874 | $287 | 🟢 |
| TEST Creativos - API | $680 | $797 | $740 | $894 | $660 | $246 | 🟢 |
| Domiciliarios Q58 - | $1,156 | $1,066 | $877 | $1,051 | $1,039 | $343 | 🟢 |
| Motorizados - INTER | $558 | $639 | $484 | $758 | $651 | $304 | 🟢 |
| Domiciliarios - Expancion - Q58 | $314 | $290 | $296 | $360 | $344 | $147 | 🟢 |
| RADIO - Fincas | $1,388 | $639 | $1,254 | $939 | $1,349 | — | 🔴 |
| Domiciliarios VIDEO Q58 - | $697 | $798 | $603 | $799 | $877 | $558 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-09 | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 7.59 | 8.23 | 5.31 | 6.19 | 3.77 | 3.00 | 🔴 |
| RADIO - Moteros | 2.37 | 2.45 | 3.35 | 2.69 | 3.86 | 2.80 | 🔴 |
| RADIO - Seguridad / Negocios | 4.26 | 2.80 | 3.47 | 3.92 | 2.87 | 5.66 | 🟢 |
| Domiciliarios - Expancion - API | 6.71 | 6.23 | 5.77 | 5.92 | 4.06 | 7.48 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.48 | 8.46 | 6.64 | 5.43 | 6.50 | 10.05 | 🟢 |
| Domiciliarios VIDEO - API | 7.66 | 6.74 | 6.40 | 3.75 | 5.88 | 5.89 | 🟡 |
| Motorizados - Q58 | 2.64 | 4.43 | 4.00 | 2.66 | 3.44 | 4.44 | 🟢 |
| Motorizados - API | 5.65 | 5.91 | 4.32 | 4.98 | 4.60 | 5.29 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.59 | 3.66 | 3.69 | 3.71 | 2.97 | 1.42 | 🔴 |
| Domiciliarios INTER - API | 9.41 | 10.54 | 11.04 | 10.69 | 7.92 | 7.96 | 🟡 |
| RADIO - Broad | 4.47 | — | 8.34 | 4.62 | 3.55 | 21.43 | 🟢 |
| TEST Creativos - API | 8.46 | 7.45 | 7.39 | 6.24 | 7.77 | 17.96 | 🟢 |
| Domiciliarios Q58 - | 2.67 | 3.41 | 3.18 | 2.21 | 2.21 | 4.42 | 🟢 |
| Motorizados - INTER | 8.39 | 8.52 | 11.33 | 8.51 | 7.98 | 14.93 | 🟢 |
| Domiciliarios - Expancion - Q58 | 6.45 | 8.82 | 7.99 | 7.65 | 7.13 | 12.90 | 🟢 |
| RADIO - Fincas | 3.22 | 7.62 | 3.68 | 4.56 | 3.23 | — | 🔴 |
| Domiciliarios VIDEO Q58 - | 3.27 | 3.69 | 4.55 | 3.42 | 2.52 | 2.98 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-08 | $477,063 | 911 | $524 | $2,764 | 5.28 | $985,324 |
| 2026-11-09 | $471,508 | 752 | $627 | $3,268 | 5.21 | $735,643 |
| 2026-11-10 | $377,307 | 577 | $654 | $3,781 | 5.78 | $548,925 |
| 2026-11-11 | $449,265 | 687 | $654 | $3,664 | 5.60 | $653,545 |
| 2026-11-12 | $423,287 | 553 | $765 | $3,631 | 4.74 | $464,419 |
| 2026-11-13 | $472,811 | 636 | $743 | $3,285 | 4.42 | $548,131 |

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
