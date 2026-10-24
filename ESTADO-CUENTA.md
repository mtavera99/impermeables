# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-24 00:47 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$103,189** |
| gastado hoy (hasta las 0h) | $2,030 |
| presupuesto activo | $335,000/día |
| cierre proyectado del día | $304,496 |
| saldo proyectado a medianoche | $-199,276 |
| objetivo (cubrir un día de 143% + colchón) | $499,050 |

### 🔴 RECARGAR $393,831 — entra en zona de freno a las 10:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–0:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-20 | $2,941 | 10 | **$294** | $3,493 | 11.88 |
| 2026-10-21 | $5,925 | 18 | **$329** | $4,360 | 13.25 |
| 2026-10-22 | $3,144 | 5 | **$629** | $3,945 | 6.27 |
| 2026-10-23 | $2,832 | 8 | **$354** | $3,966 | 11.20 |
| 2026-10-24 **HOY** | $2,030 | 6 | **$338** | $3,587 | 10.60 |

🟢 **Hoy va mejor que ayer a la misma hora** ($338 vs $354).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   338  =  $ 3,587  ÷  10.60
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,587 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 10.60 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios INTER - API | $25,000 | $306 | 1% | 0 | — | 0.00 |
| Motorizados - Q58 | $20,000 | $212 | 1% | 1 | $212 | 12.82 |
| Domiciliarios - Expancion - INTER | $25,000 | $193 | 1% | 3 | $64 | 44.12 |
| Domiciliarios - Expancion - Q58 | $20,000 | $179 | 1% | 1 | $179 | 17.54 |
| Domiciliarios VIDEO INTER - API | $25,000 | $172 | 1% | 0 | — | 0.00 |
| Domiciliarios - API | $35,000 | $168 | 0% | 0 | — | 0.00 |
| Motorizados - API | $20,000 | $151 | 1% | 0 | — | 0.00 |
| Domiciliarios - Expancion - API | $40,000 | $147 | 0% | 0 | — | 0.00 |
| Domiciliarios VIDEO Q58 - | $25,000 | $146 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $120 | 1% | 0 | — | 0.00 |
| TEST Creativos - API | $30,000 | $104 | 0% | 0 | — | 0.00 |
| Domiciliarios Q58 - | $25,000 | $84 | 0% | 1 | $84 | 26.32 |
| Motorizados - INTER | $25,000 | $48 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $2,030 | 6 | **$338** | $2,402 | **14%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,219**/pedido |
| utilidad estimada de lo que va del día | **$7,602** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios INTER - API | $240 | $324 | $304 | $314 | $328 | — | 🟡 |
| Motorizados - Q58 | $732 | $545 | $1,025 | $599 | $508 | $212 | 🟢 |
| Domiciliarios - Expancion - INTER | $536 | $629 | $604 | $721 | $655 | $64 | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,462 | $1,121 | $1,077 | $892 | $1,105 | $179 | 🟢 |
| Domiciliarios VIDEO INTER - API | $534 | $576 | $701 | $742 | $640 | — | 🟢 |
| Domiciliarios - API | $464 | $484 | $348 | $370 | $411 | — | 🟡 |
| Motorizados - API | $579 | $470 | $446 | $378 | $451 | — | 🔴 |
| Domiciliarios - Expancion - API | $485 | $583 | $424 | $444 | $510 | — | 🟡 |
| Domiciliarios VIDEO Q58 - | $586 | $642 | $995 | $1,091 | $672 | — | 🟢 |
| Domiciliarios VIDEO - API | $430 | $319 | $269 | $292 | $334 | — | 🟡 |
| TEST Creativos - API | $475 | $609 | $535 | $379 | $478 | — | 🔴 |
| Domiciliarios Q58 - | $166 | $185 | $197 | $159 | $214 | $84 | 🟢 |
| Motorizados - INTER | $480 | $591 | $460 | $545 | $702 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios INTER - API | 6.33 | 11.02 | 12.17 | 9.39 | 7.65 | — | 🔴 |
| Motorizados - Q58 | 4.15 | 5.75 | 3.32 | 5.14 | 5.88 | 12.82 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.28 | 4.46 | 5.33 | 4.21 | 4.88 | 44.12 | 🟢 |
| Domiciliarios - Expancion - Q58 | 2.02 | 2.71 | 3.65 | 4.52 | 3.98 | 17.54 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.43 | 7.46 | 5.98 | 5.52 | 6.49 | — | 🟢 |
| Domiciliarios - API | 7.58 | 9.53 | 14.10 | 12.13 | 9.75 | — | 🔴 |
| Motorizados - API | 5.69 | 8.05 | 9.31 | 10.45 | 8.71 | — | 🔴 |
| Domiciliarios - Expancion - API | 7.80 | 7.58 | 11.99 | 10.38 | 8.24 | — | 🔴 |
| Domiciliarios VIDEO Q58 - | 5.02 | 3.62 | 3.19 | 2.96 | 5.03 | — | 🟢 |
| Domiciliarios VIDEO - API | 6.55 | 11.78 | 14.69 | 10.98 | 9.31 | — | 🔴 |
| TEST Creativos - API | 9.85 | 8.80 | 11.03 | 14.31 | 8.96 | — | 🔴 |
| Domiciliarios Q58 - | 13.71 | 13.11 | 11.07 | 12.89 | 10.84 | 26.32 | 🟢 |
| Motorizados - INTER | 8.02 | 8.76 | 13.59 | 11.01 | 8.13 | — | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,261 | 759 | $418 | $3,709 | 8.87 | $901,127 |
| 2026-10-23 | $293,646 | 630 | $466 | $3,552 | 7.62 | $717,664 |

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
