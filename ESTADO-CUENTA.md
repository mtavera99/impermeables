# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-12 00:19 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$275,597** |
| gastado hoy (hasta las 0h) | $872 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $407,652 |
| saldo proyectado a medianoche | $-131,182 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $378,451 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–0:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-08 | $8,832 | 22 | **$401** | $2,181 | 5.43 |
| 2026-11-09 | $6,476 | 12 | **$540** | $2,599 | 4.82 |
| 2026-11-10 | $2,600 | 4 | **$650** | $3,242 | 4.99 |
| 2026-11-11 | $3,533 | 3 | **$1,178** | $3,926 | 3.33 |
| 2026-11-12 **HOY** | $845 | 2 | **$422** | $3,550 | 8.40 |

🟢 **Hoy va mejor que ayer a la misma hora** ($422 vs $1,178).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   422  =  $ 3,550  ÷  8.40
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,550 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.40 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | $36,000 | $143 | 0% | 1 | $143 | 35.71 |
| Domiciliarios VIDEO Q58 - | $25,000 | $138 | 1% | 0 | — | 0.00 |
| Domiciliarios - API | $35,000 | $108 | 0% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $80 | 0% | 0 | — | 0.00 |
| Domiciliarios - Expancion - INTER | $25,000 | $62 | 0% | 0 | — | 0.00 |
| Motorizados - Q58 | $29,000 | $60 | 0% | 0 | — | 0.00 |
| TEST Creativos - API | $20,000 | $41 | 0% | 0 | — | 0.00 |
| Domiciliarios - Expancion - Q58 | $29,000 | $39 | 0% | 0 | — | 0.00 |
| Motorizados - INTER | $25,000 | $35 | 0% | 0 | — | 0.00 |
| Domiciliarios Q58 - | $25,000 | $33 | 0% | 1 | $33 | 45.45 |
| Domiciliarios INTER - API | $20,000 | $29 | 0% | 0 | — | 0.00 |
| RADIO - Moteros | $35,000 | $27 | 0% | 0 | — | 0.00 |
| RADIO - Seguridad / Negocios | $40,000 | $20 | 0% | 0 | — | 0.00 |
| Motorizados - API | $20,000 | $15 | 0% | 0 | — | 0.00 |
| RADIO - Broad | $10,000 | $15 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $845 | 2 | **$422** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,767**/pedido |
| utilidad estimada de lo que va del día | **$2,366** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-07 | 11-08 | 11-09 | 11-10 | 11-11 | 11-12 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | $528 | $565 | $641 | $601 | $704 | $143 | 🟢 |
| Domiciliarios VIDEO Q58 - | $741 | $581 | $697 | $798 | $596 | — | 🟢 |
| Domiciliarios - API | $453 | $430 | $500 | $486 | $840 | — | 🔴 |
| Domiciliarios VIDEO - API | $363 | $344 | $411 | $531 | $624 | — | 🔴 |
| Domiciliarios - Expancion - INTER | $621 | $512 | $682 | $700 | $620 | — | 🟢 |
| Motorizados - Q58 | $441 | $683 | $853 | $646 | $638 | — | 🟡 |
| TEST Creativos - API | $425 | $629 | $680 | $797 | $738 | — | 🟢 |
| Domiciliarios - Expancion - Q58 | $295 | $265 | $314 | $290 | $289 | — | 🟡 |
| Motorizados - INTER | $517 | $460 | $558 | $639 | $474 | — | 🟢 |
| Domiciliarios Q58 - | $1,059 | $773 | $1,156 | $1,066 | $874 | $33 | 🟢 |
| Domiciliarios INTER - API | $317 | $288 | $315 | $306 | $281 | — | 🟢 |
| RADIO - Moteros | $1,572 | $1,178 | $1,702 | $2,245 | $1,716 | — | 🟢 |
| RADIO - Seguridad / Negocios | $1,003 | $914 | $873 | $1,417 | $1,118 | — | 🟢 |
| Motorizados - API | $351 | $390 | $543 | $597 | $825 | — | 🔴 |
| RADIO - Broad | $1,435 | $1,184 | $1,465 | — | $959 | — | 🟢 |
| Domiciliarios - Expancion - API | $641 | $543 | $550 | $711 | $831 | — | 🔴 |
| RADIO - Fincas | $752 | $725 | $1,388 | $639 | $1,228 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-07 | 11-08 | 11-09 | 11-10 | 11-11 | 11-12 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | 8.11 | 6.57 | 6.48 | 8.46 | 6.76 | 35.71 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.43 | 3.96 | 3.27 | 3.70 | 4.60 | — | 🟢 |
| Domiciliarios - API | 8.32 | 8.43 | 7.59 | 8.23 | 5.40 | — | 🔴 |
| Domiciliarios VIDEO - API | 8.74 | 7.31 | 7.66 | 6.74 | 6.53 | — | 🟡 |
| Domiciliarios - Expancion - INTER | 3.36 | 3.65 | 3.59 | 3.66 | 3.73 | — | 🟡 |
| Motorizados - Q58 | 4.45 | 2.40 | 2.64 | 4.43 | 4.04 | — | 🟡 |
| TEST Creativos - API | 11.59 | 7.61 | 8.46 | 7.45 | 7.42 | — | 🟡 |
| Domiciliarios - Expancion - Q58 | 7.82 | 7.28 | 6.45 | 8.82 | 8.17 | — | 🟡 |
| Motorizados - INTER | 9.79 | 8.69 | 8.39 | 8.52 | 11.56 | — | 🟢 |
| Domiciliarios Q58 - | 2.54 | 3.14 | 2.67 | 3.41 | 3.20 | 45.45 | 🟢 |
| Domiciliarios INTER - API | 8.21 | 8.60 | 9.41 | 10.54 | 11.21 | — | 🟢 |
| RADIO - Moteros | 2.45 | 2.63 | 2.37 | 2.45 | 3.42 | — | 🟢 |
| RADIO - Seguridad / Negocios | 3.41 | 3.05 | 4.26 | 2.80 | 3.58 | — | 🟢 |
| Motorizados - API | 8.93 | 7.88 | 5.65 | 5.91 | 4.38 | — | 🔴 |
| RADIO - Broad | 3.79 | 5.20 | 4.47 | — | 8.47 | — | 🟢 |
| Domiciliarios - Expancion - API | 6.44 | 6.71 | 6.71 | 6.23 | 5.86 | — | 🟡 |
| RADIO - Fincas | 4.91 | 4.90 | 3.22 | 7.62 | 3.77 | — | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-06 | $432,002 | 793 | $545 | $3,186 | 5.85 | $840,965 |
| 2026-11-07 | $367,724 | 678 | $542 | $3,153 | 5.81 | $720,638 |
| 2026-11-08 | $477,063 | 911 | $524 | $2,764 | 5.28 | $985,324 |
| 2026-11-09 | $471,508 | 752 | $627 | $3,268 | 5.21 | $735,643 |
| 2026-11-10 | $377,102 | 577 | $654 | $3,779 | 5.78 | $549,130 |
| 2026-11-11 | $442,590 | 687 | $644 | $3,668 | 5.69 | $660,220 |

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
