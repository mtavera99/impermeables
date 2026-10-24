# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-24 13:04 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$173,778** |
| gastado hoy (hasta las 13h) | $155,213 |
| presupuesto activo | $400,000/día |
| cierre proyectado del día | $321,676 |
| saldo proyectado a medianoche | $7,316 |
| objetivo (cubrir un día de 143% + colchón) | $592,000 |

### 🔴 RECARGAR $263,009 — entra en zona de freno a las 22:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–13:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-20 | $143,583 | 289 | **$497** | $3,277 | 6.60 |
| 2026-10-21 | $182,538 | 397 | **$460** | $3,940 | 8.57 |
| 2026-10-22 | $157,496 | 359 | **$439** | $3,775 | 8.60 |
| 2026-10-23 | $123,501 | 269 | **$459** | $3,434 | 7.48 |
| 2026-10-24 **HOY** | $155,213 | 288 | **$539** | $3,611 | 6.70 |

🟠 Hoy va 17% más caro que ayer a la misma hora ($539 vs $459).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   539  =  $ 3,611  ÷  6.70
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,611 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.70 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $14,204 | 41% | 28 | $507 | 7.91 |
| Domiciliarios - Expancion - API | $40,000 | $13,290 | 33% | 17 | $782 | 4.65 |
| TEST Creativos - API | $30,000 | $12,636 | 42% | 32 | $395 | 9.15 |
| RADIO - Seguridad / Negocios | $25,000 | $12,550 | 50% | 13 | $965 | 4.92 |
| RADIO - Fincas | $20,000 | $9,994 | 50% | 17 | $588 | 9.21 |
| Domiciliarios - Expancion - INTER | $25,000 | $9,831 | 39% | 20 | $492 | 5.94 |
| Domiciliarios VIDEO Q58 - | $25,000 | $9,439 | 38% | 11 | $858 | 3.87 |
| Domiciliarios Q58 - | $25,000 | $9,415 | 38% | 35 | $269 | 7.58 |
| Domiciliarios VIDEO INTER - API | $25,000 | $8,710 | 35% | 19 | $458 | 8.24 |
| RADIO - Moteros | $20,000 | $8,366 | 42% | 6 | $1,394 | 3.91 |
| Motorizados - INTER | $25,000 | $8,336 | 33% | 14 | $595 | 8.74 |
| Domiciliarios VIDEO - API | $20,000 | $8,161 | 41% | 22 | $371 | 7.40 |
| Domiciliarios - Expancion - Q58 | $20,000 | $7,946 | 40% | 9 | $883 | 4.44 |
| Domiciliarios INTER - API | $25,000 | $7,928 | 32% | 18 | $440 | 7.58 |
| Motorizados - API | $20,000 | $7,588 | 38% | 13 | $584 | 6.42 |
| Motorizados - Q58 | $20,000 | $6,819 | 34% | 14 | $487 | 6.53 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $155,213 | 288 | **$539** | $2,402 | **22%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,907**/pedido |
| utilidad estimada de lo que va del día | **$307,100** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $464 | $484 | $348 | $370 | $417 | $507 | 🔴 |
| Domiciliarios - Expancion - API | $485 | $583 | $424 | $444 | $515 | $782 | 🔴 |
| TEST Creativos - API | $475 | $609 | $535 | $379 | $480 | $395 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | $965 |  |
| RADIO - Fincas | — | — | — | — | — | $588 |  |
| Domiciliarios - Expancion - INTER | $536 | $629 | $604 | $721 | $661 | $492 | 🟢 |
| Domiciliarios VIDEO Q58 - | $586 | $642 | $995 | $1,091 | $678 | $858 | 🔴 |
| Domiciliarios Q58 - | $166 | $185 | $197 | $159 | $216 | $269 | 🔴 |
| Domiciliarios VIDEO INTER - API | $534 | $576 | $701 | $742 | $645 | $458 | 🟢 |
| RADIO - Moteros | — | — | — | — | — | $1,394 |  |
| Motorizados - INTER | $480 | $591 | $460 | $545 | $713 | $595 | 🟢 |
| Domiciliarios VIDEO - API | $430 | $319 | $269 | $292 | $337 | $371 | 🟡 |
| Domiciliarios - Expancion - Q58 | $1,462 | $1,121 | $1,077 | $892 | $1,116 | $883 | 🟢 |
| Domiciliarios INTER - API | $240 | $324 | $304 | $314 | $331 | $440 | 🔴 |
| Motorizados - API | $579 | $470 | $446 | $379 | $455 | $584 | 🔴 |
| Motorizados - Q58 | $732 | $545 | $1,025 | $599 | $512 | $487 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 7.58 | 9.53 | 14.10 | 12.13 | 9.63 | 7.91 | 🔴 |
| Domiciliarios - Expancion - API | 7.80 | 7.58 | 11.99 | 10.38 | 8.15 | 4.65 | 🔴 |
| TEST Creativos - API | 9.85 | 8.80 | 11.03 | 14.31 | 8.92 | 9.15 | 🟡 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | 4.92 |  |
| RADIO - Fincas | — | — | — | — | — | 9.21 |  |
| Domiciliarios - Expancion - INTER | 5.28 | 4.46 | 5.33 | 4.21 | 4.84 | 5.94 | 🟢 |
| Domiciliarios VIDEO Q58 - | 5.02 | 3.62 | 3.19 | 2.96 | 4.98 | 3.87 | 🔴 |
| Domiciliarios Q58 - | 13.71 | 13.11 | 11.07 | 12.89 | 10.70 | 7.58 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.43 | 7.46 | 5.98 | 5.52 | 6.44 | 8.24 | 🟢 |
| RADIO - Moteros | — | — | — | — | — | 3.91 |  |
| Motorizados - INTER | 8.02 | 8.76 | 13.59 | 11.01 | 8.02 | 8.74 | 🟢 |
| Domiciliarios VIDEO - API | 6.55 | 11.78 | 14.69 | 10.98 | 9.19 | 7.40 | 🔴 |
| Domiciliarios - Expancion - Q58 | 2.02 | 2.71 | 3.65 | 4.52 | 3.93 | 4.44 | 🟢 |
| Domiciliarios INTER - API | 6.33 | 11.02 | 12.17 | 9.39 | 7.58 | 7.58 | 🟡 |
| Motorizados - API | 5.69 | 8.05 | 9.31 | 10.45 | 8.61 | 6.42 | 🔴 |
| Motorizados - Q58 | 4.15 | 5.75 | 3.32 | 5.14 | 5.83 | 6.53 | 🟢 |

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
| 2026-10-23 | $296,646 | 630 | $471 | $3,552 | 7.54 | $714,664 |

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
