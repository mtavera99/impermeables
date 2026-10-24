# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-24 07:15 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$113,527** |
| gastado hoy (hasta las 7h) | $37,514 |
| presupuesto activo | $400,000/día |
| cierre proyectado del día | $299,616 |
| saldo proyectado a medianoche | $-148,576 |
| objetivo (cubrir un día de 143% + colchón) | $592,000 |

### 🔴 RECARGAR $440,959 — entra en zona de freno a las 13:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–7:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-20 | $42,602 | 87 | **$490** | $3,134 | 6.40 |
| 2026-10-21 | $64,009 | 147 | **$435** | $3,743 | 8.60 |
| 2026-10-22 | $51,106 | 125 | **$409** | $3,836 | 9.38 |
| 2026-10-23 | $37,361 | 91 | **$411** | $3,307 | 8.05 |
| 2026-10-24 **HOY** | $37,514 | 66 | **$568** | $3,360 | 5.91 |

🟠 Hoy va 38% más caro que ayer a la misma hora ($568 vs $411).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   568  =  $ 3,360  ÷  5.91
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,360 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.91 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $3,891 | 11% | 7 | $556 | 7.06 |
| Domiciliarios - Expancion - API | $40,000 | $3,657 | 9% | 3 | $1,219 | 2.77 |
| RADIO - Seguridad / Negocios | $25,000 | $2,818 | 11% | 2 | $1,409 | 3.18 |
| RADIO - Fincas | $20,000 | $2,678 | 13% | 6 | $446 | 12.15 |
| TEST Creativos - API | $30,000 | $2,657 | 9% | 6 | $443 | 7.50 |
| Domiciliarios - Expancion - INTER | $25,000 | $2,548 | 10% | 4 | $637 | 4.54 |
| RADIO - Moteros | $20,000 | $2,464 | 12% | 3 | $821 | 5.43 |
| Domiciliarios VIDEO - API | $20,000 | $2,374 | 12% | 6 | $396 | 5.93 |
| Domiciliarios Q58 - | $25,000 | $2,217 | 9% | 13 | $171 | 11.65 |
| Motorizados - API | $20,000 | $2,072 | 10% | 2 | $1,036 | 3.26 |
| Domiciliarios INTER - API | $25,000 | $2,006 | 8% | 2 | $1,003 | 3.31 |
| Motorizados - Q58 | $20,000 | $1,944 | 10% | 5 | $389 | 6.91 |
| Domiciliarios - Expancion - Q58 | $20,000 | $1,884 | 9% | 2 | $942 | 4.42 |
| Domiciliarios VIDEO INTER - API | $25,000 | $1,563 | 6% | 3 | $521 | 6.99 |
| Motorizados - INTER | $25,000 | $1,440 | 6% | 2 | $720 | 6.97 |
| Domiciliarios VIDEO Q58 - | $25,000 | $1,301 | 5% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $37,514 | 66 | **$568** | $2,402 | **24%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,448**/pedido |
| utilidad estimada de lo que va del día | **$68,433** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $464 | $484 | $348 | $370 | $414 | $556 | 🔴 |
| Domiciliarios - Expancion - API | $485 | $583 | $424 | $444 | $513 | $1,219 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | $1,409 |  |
| RADIO - Fincas | — | — | — | — | — | $446 |  |
| TEST Creativos - API | $475 | $609 | $535 | $379 | $479 | $443 | 🟢 |
| Domiciliarios - Expancion - INTER | $536 | $629 | $604 | $721 | $659 | $637 | 🟡 |
| RADIO - Moteros | — | — | — | — | — | $821 |  |
| Domiciliarios VIDEO - API | $430 | $319 | $269 | $292 | $336 | $396 | 🔴 |
| Domiciliarios Q58 - | $166 | $185 | $197 | $159 | $215 | $171 | 🟢 |
| Motorizados - API | $579 | $470 | $446 | $379 | $453 | $1,036 | 🔴 |
| Domiciliarios INTER - API | $240 | $324 | $304 | $314 | $329 | $1,003 | 🔴 |
| Motorizados - Q58 | $732 | $545 | $1,025 | $599 | $511 | $389 | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,462 | $1,121 | $1,077 | $892 | $1,112 | $942 | 🟢 |
| Domiciliarios VIDEO INTER - API | $534 | $576 | $701 | $742 | $643 | $521 | 🟢 |
| Motorizados - INTER | $480 | $591 | $460 | $545 | $708 | $720 | 🟡 |
| Domiciliarios VIDEO Q58 - | $586 | $642 | $995 | $1,091 | $677 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 7.58 | 9.53 | 14.10 | 12.13 | 9.68 | 7.06 | 🔴 |
| Domiciliarios - Expancion - API | 7.80 | 7.58 | 11.99 | 10.38 | 8.19 | 2.77 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | 3.18 |  |
| RADIO - Fincas | — | — | — | — | — | 12.15 |  |
| TEST Creativos - API | 9.85 | 8.80 | 11.03 | 14.31 | 8.93 | 7.50 | 🔴 |
| Domiciliarios - Expancion - INTER | 5.28 | 4.46 | 5.33 | 4.21 | 4.85 | 4.54 | 🟡 |
| RADIO - Moteros | — | — | — | — | — | 5.43 |  |
| Domiciliarios VIDEO - API | 6.55 | 11.78 | 14.69 | 10.98 | 9.24 | 5.93 | 🔴 |
| Domiciliarios Q58 - | 13.71 | 13.11 | 11.07 | 12.89 | 10.77 | 11.65 | 🟢 |
| Motorizados - API | 5.69 | 8.05 | 9.31 | 10.45 | 8.65 | 3.26 | 🔴 |
| Domiciliarios INTER - API | 6.33 | 11.02 | 12.17 | 9.39 | 7.61 | 3.31 | 🔴 |
| Motorizados - Q58 | 4.15 | 5.75 | 3.32 | 5.14 | 5.84 | 6.91 | 🟢 |
| Domiciliarios - Expancion - Q58 | 2.02 | 2.71 | 3.65 | 4.52 | 3.95 | 4.42 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.43 | 7.46 | 5.98 | 5.52 | 6.46 | 6.99 | 🟢 |
| Motorizados - INTER | 8.02 | 8.76 | 13.59 | 11.01 | 8.06 | 6.97 | 🟡 |
| Domiciliarios VIDEO Q58 - | 5.02 | 3.62 | 3.19 | 2.96 | 5.00 | — | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $295,396 | 630 | $469 | $3,551 | 7.57 | $715,914 |

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
