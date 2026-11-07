# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-07 11:17 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$260,212** |
| gastado hoy (hasta las 11h) | $101,726 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $435,960 |
| saldo proyectado a medianoche | $-74,022 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $292,982 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–11:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-03 | $151,014 | 250 | **$604** | $2,717 | 4.50 |
| 2026-11-04 | $78,362 | 131 | **$598** | $4,760 | 7.96 |
| 2026-11-05 | $128,385 | 195 | **$658** | $3,825 | 5.81 |
| 2026-11-06 | $147,183 | 264 | **$558** | $3,254 | 5.84 |
| 2026-11-07 **HOY** | $101,726 | 188 | **$541** | $3,509 | 6.48 |

🟢 **Hoy va mejor que ayer a la misma hora** ($541 vs $558).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   541  =  $ 3,509  ÷  6.48
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,509 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.48 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $9,521 | 27% | 20 | $476 | 8.67 |
| Domiciliarios VIDEO INTER - API | $36,000 | $8,988 | 25% | 20 | $449 | 9.40 |
| Domiciliarios - Expancion - API | $30,000 | $8,249 | 27% | 10 | $825 | 5.46 |
| RADIO - Seguridad / Negocios | $40,000 | $7,562 | 19% | 10 | $756 | 5.20 |
| Motorizados - Q58 | $29,000 | $6,475 | 22% | 21 | $308 | 7.30 |
| Domiciliarios Q58 - | $25,000 | $6,322 | 25% | 4 | $1,580 | 2.08 |
| RADIO - Moteros | $35,000 | $6,230 | 18% | 4 | $1,558 | 2.45 |
| Domiciliarios VIDEO - API | $20,000 | $6,055 | 30% | 16 | $378 | 9.04 |
| Domiciliarios - Expancion - INTER | $25,000 | $5,661 | 23% | 10 | $566 | 4.25 |
| Domiciliarios VIDEO Q58 - | $25,000 | $5,420 | 22% | 4 | $1,355 | 2.19 |
| Motorizados - INTER | $25,000 | $5,416 | 22% | 8 | $677 | 7.98 |
| TEST Creativos - API | $20,000 | $5,372 | 27% | 14 | $384 | 14.81 |
| Motorizados - API | $20,000 | $5,300 | 26% | 10 | $530 | 6.08 |
| Domiciliarios - Expancion - Q58 | $29,000 | $4,513 | 16% | 14 | $322 | 7.31 |
| Domiciliarios INTER - API | $20,000 | $4,445 | 22% | 16 | $278 | 9.84 |
| RADIO - Fincas | $20,000 | $4,180 | 21% | 5 | $836 | 5.22 |
| RADIO - Broad | $10,000 | $2,017 | 20% | 2 | $1,008 | 5.95 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $101,726 | 188 | **$541** | $2,402 | **23%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,947**/pedido |
| utilidad estimada de lo que va del día | **$200,062** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | 11-07 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $597 | $511 | $426 | $495 | $449 | $476 | 🟡 |
| Domiciliarios VIDEO INTER - API | $667 | $563 | $657 | $701 | $685 | $449 | 🟢 |
| Domiciliarios - Expancion - API | $503 | $624 | $662 | $555 | $535 | $825 | 🔴 |
| RADIO - Seguridad / Negocios | $1,488 | $888 | $1,325 | $831 | $972 | $756 | 🟢 |
| Motorizados - Q58 | $742 | $559 | $621 | $738 | $645 | $308 | 🟢 |
| Domiciliarios Q58 - | $1,407 | $992 | $1,766 | $975 | $918 | $1,580 | 🔴 |
| RADIO - Moteros | $2,023 | $1,901 | $1,800 | $1,835 | $3,175 | $1,558 | 🟢 |
| Domiciliarios VIDEO - API | $313 | $421 | $375 | $326 | $326 | $378 | 🔴 |
| Domiciliarios - Expancion - INTER | $555 | $496 | $623 | $618 | $432 | $566 | 🔴 |
| Domiciliarios VIDEO Q58 - | $847 | $622 | $1,507 | $701 | $619 | $1,355 | 🔴 |
| Motorizados - INTER | $574 | $507 | $629 | $524 | $540 | $677 | 🔴 |
| TEST Creativos - API | $500 | $559 | $490 | $780 | $662 | $384 | 🟢 |
| Motorizados - API | $526 | $390 | $582 | $477 | $376 | $530 | 🔴 |
| Domiciliarios - Expancion - Q58 | $231 | $253 | $238 | $307 | $257 | $322 | 🔴 |
| Domiciliarios INTER - API | $362 | $290 | $380 | $319 | $301 | $278 | 🟢 |
| RADIO - Fincas | $927 | $1,014 | $669 | $801 | $1,229 | $836 | 🟢 |
| RADIO - Broad | $1,166 | $916 | $1,342 | $1,997 | $938 | $1,008 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-02 | 11-03 | 11-04 | 11-05 | 11-06 | 11-07 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 7.11 | 7.17 | 12.34 | 8.64 | 8.80 | 8.67 | 🟡 |
| Domiciliarios VIDEO INTER - API | 5.33 | 7.38 | 8.30 | 6.93 | 6.96 | 9.40 | 🟢 |
| Domiciliarios - Expancion - API | 8.73 | 5.79 | 7.44 | 7.98 | 7.67 | 5.46 | 🔴 |
| RADIO - Seguridad / Negocios | 2.02 | 3.19 | 2.96 | 4.32 | 3.21 | 5.20 | 🟢 |
| Motorizados - Q58 | 2.73 | 3.34 | 3.95 | 3.07 | 2.94 | 7.30 | 🟢 |
| Domiciliarios Q58 - | 2.99 | 4.33 | 3.11 | 4.32 | 3.03 | 2.08 | 🔴 |
| RADIO - Moteros | 1.68 | 1.62 | 2.00 | 1.94 | 1.14 | 2.45 | 🟢 |
| Domiciliarios VIDEO - API | 7.25 | 6.23 | 9.44 | 9.54 | 9.48 | 9.04 | 🟡 |
| Domiciliarios - Expancion - INTER | 3.83 | 3.85 | 4.77 | 4.10 | 4.92 | 4.25 | 🟡 |
| Domiciliarios VIDEO Q58 - | 3.07 | 3.87 | 2.48 | 3.90 | 4.63 | 2.19 | 🔴 |
| Motorizados - INTER | 8.96 | 11.83 | 11.09 | 11.50 | 10.45 | 7.98 | 🔴 |
| TEST Creativos - API | 6.74 | 6.72 | 6.70 | 6.18 | 6.64 | 14.81 | 🟢 |
| Motorizados - API | 7.22 | 7.69 | 7.75 | 7.85 | 9.54 | 6.08 | 🔴 |
| Domiciliarios - Expancion - Q58 | 7.74 | 6.90 | 10.09 | 7.54 | 8.15 | 7.31 | 🟡 |
| Domiciliarios INTER - API | 7.07 | 9.66 | 9.56 | 9.65 | 10.37 | 9.84 | 🟡 |
| RADIO - Fincas | 4.36 | 3.29 | 6.60 | 4.89 | 2.80 | 5.22 | 🟢 |
| RADIO - Broad | 5.10 | 7.73 | 5.87 | 3.58 | 6.48 | 5.95 | 🟡 |

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
| 2026-11-06 | $431,078 | 793 | $544 | $3,186 | 5.86 | $841,889 |

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
