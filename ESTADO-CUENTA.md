# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-24 12:04 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$196,421** |
| gastado hoy (hasta las 12h) | $132,971 |
| presupuesto activo | $400,000/día |
| cierre proyectado del día | $314,522 |
| saldo proyectado a medianoche | $14,870 |
| objetivo (cubrir un día de 143% + colchón) | $592,000 |

### 🔴 RECARGAR $262,608 — entra en zona de freno a las 23:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–12:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-20 | $123,581 | 246 | **$502** | $3,283 | 6.54 |
| 2026-10-21 | $164,982 | 353 | **$467** | $3,952 | 8.46 |
| 2026-10-22 | $140,034 | 318 | **$440** | $3,785 | 8.60 |
| 2026-10-23 | $110,683 | 239 | **$463** | $3,407 | 7.36 |
| 2026-10-24 **HOY** | $132,971 | 247 | **$538** | $3,592 | 6.67 |

🟠 Hoy va 16% más caro que ayer a la misma hora ($538 vs $463).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   538  =  $ 3,592  ÷  6.67
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,592 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.67 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $12,158 | 35% | 26 | $468 | 8.28 |
| Domiciliarios - Expancion - API | $40,000 | $11,511 | 29% | 14 | $822 | 4.35 |
| RADIO - Seguridad / Negocios | $25,000 | $11,291 | 45% | 12 | $941 | 5.06 |
| TEST Creativos - API | $30,000 | $10,587 | 35% | 26 | $407 | 8.72 |
| RADIO - Fincas | $20,000 | $8,705 | 44% | 13 | $670 | 8.11 |
| Domiciliarios - Expancion - INTER | $25,000 | $8,638 | 35% | 17 | $508 | 5.78 |
| Domiciliarios VIDEO Q58 - | $25,000 | $8,080 | 32% | 8 | $1,010 | 3.36 |
| Domiciliarios Q58 - | $25,000 | $7,733 | 31% | 34 | $227 | 8.83 |
| RADIO - Moteros | $20,000 | $7,539 | 38% | 6 | $1,256 | 4.37 |
| Domiciliarios VIDEO - API | $20,000 | $7,295 | 36% | 21 | $347 | 7.77 |
| Domiciliarios VIDEO INTER - API | $25,000 | $7,214 | 29% | 14 | $515 | 7.30 |
| Motorizados - INTER | $25,000 | $6,737 | 27% | 10 | $674 | 7.87 |
| Domiciliarios - Expancion - Q58 | $20,000 | $6,572 | 33% | 7 | $939 | 4.25 |
| Motorizados - API | $20,000 | $6,534 | 33% | 12 | $544 | 6.73 |
| Domiciliarios INTER - API | $25,000 | $6,365 | 25% | 14 | $455 | 7.20 |
| Motorizados - Q58 | $20,000 | $6,012 | 30% | 13 | $462 | 6.83 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $132,971 | 247 | **$538** | $2,402 | **22%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,896**/pedido |
| utilidad estimada de lo que va del día | **$263,527** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $464 | $484 | $348 | $370 | $417 | $468 | 🟡 |
| Domiciliarios - Expancion - API | $485 | $583 | $424 | $444 | $515 | $822 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | $941 |  |
| TEST Creativos - API | $475 | $609 | $535 | $379 | $480 | $407 | 🟢 |
| RADIO - Fincas | — | — | — | — | — | $670 |  |
| Domiciliarios - Expancion - INTER | $536 | $629 | $604 | $721 | $661 | $508 | 🟢 |
| Domiciliarios VIDEO Q58 - | $586 | $642 | $995 | $1,091 | $678 | $1,010 | 🔴 |
| Domiciliarios Q58 - | $166 | $185 | $197 | $159 | $216 | $227 | 🟡 |
| RADIO - Moteros | — | — | — | — | — | $1,256 |  |
| Domiciliarios VIDEO - API | $430 | $319 | $269 | $292 | $337 | $347 | 🟡 |
| Domiciliarios VIDEO INTER - API | $534 | $576 | $701 | $742 | $645 | $515 | 🟢 |
| Motorizados - INTER | $480 | $591 | $460 | $545 | $713 | $674 | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,462 | $1,121 | $1,077 | $892 | $1,115 | $939 | 🟢 |
| Motorizados - API | $579 | $470 | $446 | $379 | $454 | $544 | 🔴 |
| Domiciliarios INTER - API | $240 | $324 | $304 | $314 | $330 | $455 | 🔴 |
| Motorizados - Q58 | $732 | $545 | $1,025 | $599 | $512 | $462 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 7.58 | 9.53 | 14.10 | 12.13 | 9.63 | 8.28 | 🟡 |
| Domiciliarios - Expancion - API | 7.80 | 7.58 | 11.99 | 10.38 | 8.15 | 4.35 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | 5.06 |  |
| TEST Creativos - API | 9.85 | 8.80 | 11.03 | 14.31 | 8.92 | 8.72 | 🟡 |
| RADIO - Fincas | — | — | — | — | — | 8.11 |  |
| Domiciliarios - Expancion - INTER | 5.28 | 4.46 | 5.33 | 4.21 | 4.84 | 5.78 | 🟢 |
| Domiciliarios VIDEO Q58 - | 5.02 | 3.62 | 3.19 | 2.96 | 4.98 | 3.36 | 🔴 |
| Domiciliarios Q58 - | 13.71 | 13.11 | 11.07 | 12.89 | 10.71 | 8.83 | 🔴 |
| RADIO - Moteros | — | — | — | — | — | 4.37 |  |
| Domiciliarios VIDEO - API | 6.55 | 11.78 | 14.69 | 10.98 | 9.20 | 7.77 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.43 | 7.46 | 5.98 | 5.52 | 6.44 | 7.30 | 🟢 |
| Motorizados - INTER | 8.02 | 8.76 | 13.59 | 11.01 | 8.02 | 7.87 | 🟡 |
| Domiciliarios - Expancion - Q58 | 2.02 | 2.71 | 3.65 | 4.52 | 3.94 | 4.25 | 🟢 |
| Motorizados - API | 5.69 | 8.05 | 9.31 | 10.45 | 8.61 | 6.73 | 🔴 |
| Domiciliarios INTER - API | 6.33 | 11.02 | 12.17 | 9.39 | 7.59 | 7.20 | 🟡 |
| Motorizados - Q58 | 4.15 | 5.75 | 3.32 | 5.14 | 5.83 | 6.83 | 🟢 |

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
| 2026-10-23 | $296,542 | 630 | $471 | $3,552 | 7.55 | $714,768 |

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
