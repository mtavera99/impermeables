# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-07 14:29 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$185,199** |
| gastado hoy (hasta las 14h) | $176,056 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $434,750 |
| saldo proyectado a medianoche | $-73,495 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $293,665 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-03 | $204,348 | 363 | **$563** | $2,743 | 4.87 |
| 2026-11-04 | $144,320 | 215 | **$671** | $4,485 | 6.68 |
| 2026-11-05 | $206,482 | 314 | **$658** | $3,892 | 5.92 |
| 2026-11-06 | $220,593 | 374 | **$590** | $3,269 | 5.54 |
| 2026-11-07 **HOY** | $176,056 | 317 | **$555** | $3,509 | 6.32 |

🟢 **Hoy va mejor que ayer a la misma hora** ($555 vs $590).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   555  =  $ 3,509  ÷  6.32
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,509 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.32 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | $36,000 | $14,814 | 41% | 30 | $494 | 8.67 |
| Domiciliarios - API | $35,000 | $14,641 | 42% | 32 | $458 | 9.21 |
| RADIO - Moteros | $35,000 | $14,038 | 40% | 5 | $2,808 | 1.45 |
| RADIO - Seguridad / Negocios | $40,000 | $13,694 | 34% | 15 | $913 | 4.20 |
| Domiciliarios - Expancion - API | $30,000 | $12,143 | 40% | 17 | $714 | 6.32 |
| Motorizados - Q58 | $29,000 | $11,049 | 38% | 30 | $368 | 6.21 |
| Domiciliarios - Expancion - Q58 | $29,000 | $10,932 | 38% | 29 | $377 | 6.36 |
| Domiciliarios VIDEO Q58 - | $25,000 | $10,771 | 43% | 14 | $769 | 3.84 |
| Domiciliarios Q58 - | $25,000 | $10,727 | 43% | 10 | $1,073 | 3.05 |
| Motorizados - INTER | $25,000 | $10,160 | 41% | 19 | $535 | 10.22 |
| Domiciliarios - Expancion - INTER | $25,000 | $10,149 | 41% | 18 | $564 | 4.52 |
| TEST Creativos - API | $20,000 | $8,758 | 44% | 17 | $515 | 11.00 |
| Domiciliarios VIDEO - API | $20,000 | $8,640 | 43% | 25 | $346 | 10.16 |
| Motorizados - API | $20,000 | $7,705 | 39% | 16 | $482 | 6.62 |
| Domiciliarios INTER - API | $20,000 | $7,505 | 38% | 27 | $278 | 9.96 |
| RADIO - Fincas | $20,000 | $7,136 | 36% | 11 | $649 | 6.46 |
| RADIO - Broad | $10,000 | $3,194 | 32% | 2 | $1,597 | 3.62 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $176,056 | 317 | **$555** | $2,402 | **23%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,209**/pedido |
| utilidad estimada de lo que va del día | **$332,810** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | 11-07 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | $667 | $563 | $657 | $701 | $685 | $494 | 🟢 |
| Domiciliarios - API | $597 | $511 | $426 | $495 | $449 | $458 | 🟡 |
| RADIO - Moteros | $2,023 | $1,901 | $1,800 | $1,835 | $3,178 | $2,808 | 🟢 |
| RADIO - Seguridad / Negocios | $1,488 | $888 | $1,325 | $831 | $975 | $913 | 🟢 |
| Domiciliarios - Expancion - API | $503 | $624 | $662 | $555 | $535 | $714 | 🔴 |
| Motorizados - Q58 | $742 | $559 | $621 | $738 | $646 | $368 | 🟢 |
| Domiciliarios - Expancion - Q58 | $231 | $253 | $238 | $307 | $257 | $377 | 🔴 |
| Domiciliarios VIDEO Q58 - | $847 | $622 | $1,507 | $701 | $619 | $769 | 🔴 |
| Domiciliarios Q58 - | $1,407 | $992 | $1,766 | $975 | $918 | $1,073 | 🔴 |
| Motorizados - INTER | $574 | $507 | $629 | $524 | $540 | $535 | 🟡 |
| Domiciliarios - Expancion - INTER | $555 | $496 | $623 | $618 | $432 | $564 | 🔴 |
| TEST Creativos - API | $500 | $559 | $490 | $780 | $662 | $515 | 🟢 |
| Domiciliarios VIDEO - API | $313 | $421 | $375 | $326 | $327 | $346 | 🟡 |
| Motorizados - API | $526 | $390 | $582 | $477 | $377 | $482 | 🔴 |
| Domiciliarios INTER - API | $362 | $290 | $380 | $319 | $301 | $278 | 🟢 |
| RADIO - Fincas | $927 | $1,014 | $669 | $801 | $1,230 | $649 | 🟢 |
| RADIO - Broad | $1,166 | $916 | $1,342 | $1,997 | $941 | $1,597 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | 11-07 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO INTER - API | 5.33 | 7.38 | 8.30 | 6.93 | 6.96 | 8.67 | 🟢 |
| Domiciliarios - API | 7.11 | 7.17 | 12.34 | 8.64 | 8.79 | 9.21 | 🟡 |
| RADIO - Moteros | 1.68 | 1.62 | 2.00 | 1.94 | 1.13 | 1.45 | 🟢 |
| RADIO - Seguridad / Negocios | 2.02 | 3.19 | 2.96 | 4.32 | 3.20 | 4.20 | 🟢 |
| Domiciliarios - Expancion - API | 8.73 | 5.79 | 7.44 | 7.98 | 7.66 | 6.32 | 🔴 |
| Motorizados - Q58 | 2.73 | 3.34 | 3.95 | 3.07 | 2.94 | 6.21 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.74 | 6.90 | 10.09 | 7.54 | 8.14 | 6.36 | 🔴 |
| Domiciliarios VIDEO Q58 - | 3.07 | 3.87 | 2.48 | 3.90 | 4.63 | 3.84 | 🔴 |
| Domiciliarios Q58 - | 2.99 | 4.33 | 3.11 | 4.32 | 3.03 | 3.05 | 🟡 |
| Motorizados - INTER | 8.96 | 11.83 | 11.09 | 11.50 | 10.43 | 10.22 | 🟡 |
| Domiciliarios - Expancion - INTER | 3.83 | 3.85 | 4.77 | 4.10 | 4.92 | 4.52 | 🟡 |
| TEST Creativos - API | 6.74 | 6.72 | 6.70 | 6.18 | 6.64 | 11.00 | 🟢 |
| Domiciliarios VIDEO - API | 7.25 | 6.23 | 9.44 | 9.54 | 9.47 | 10.16 | 🟢 |
| Motorizados - API | 7.22 | 7.69 | 7.75 | 7.85 | 9.52 | 6.62 | 🔴 |
| Domiciliarios INTER - API | 7.07 | 9.66 | 9.56 | 9.65 | 10.37 | 9.96 | 🟡 |
| RADIO - Fincas | 4.36 | 3.29 | 6.60 | 4.89 | 2.80 | 6.46 | 🟢 |
| RADIO - Broad | 5.10 | 7.73 | 5.87 | 3.58 | 6.46 | 3.62 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-01 | $457,484 | 787 | $581 | $4,079 | 7.02 | $805,851 |
| 2026-11-02 | $531,050 | 881 | $603 | $3,035 | 5.04 | $883,179 |
| 2026-11-03 | $440,741 | 799 | $552 | $2,933 | 5.32 | $841,857 |
| 2026-11-04 | $364,227 | 586 | $622 | $3,943 | 6.34 | $576,452 |
| 2026-11-05 | $512,959 | 868 | $591 | $3,497 | 5.92 | $880,402 |
| 2026-11-06 | $431,504 | 793 | $544 | $3,185 | 5.85 | $841,463 |

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
