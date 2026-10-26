# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-26 17:36 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$130,620** |
| gastado hoy (hasta las 17h) | $310,401 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $429,438 |
| saldo proyectado a medianoche | $11,582 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🔴 RECARGAR $136,679 — entra en zona de freno a las 22:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-22 | $223,570 | 503 | **$444** | $3,741 | 8.42 |
| 2026-10-23 | $174,212 | 383 | **$455** | $3,542 | 7.79 |
| 2026-10-24 | $288,205 | 539 | **$535** | $3,593 | 6.72 |
| 2026-10-25 | $262,393 | 577 | **$455** | $3,555 | 7.82 |
| 2026-10-26 **HOY** | $310,401 | 637 | **$487** | $3,427 | 7.03 |

🟠 Hoy va 7% más caro que ayer a la misma hora ($487 vs $455).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   487  =  $ 3,427  ÷  7.03
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,427 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.03 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $33,933 | 85% | 50 | $679 | 5.97 |
| Domiciliarios - API | $35,000 | $28,410 | 81% | 64 | $444 | 9.45 |
| Domiciliarios VIDEO Q58 - | $25,000 | $23,469 | 94% | 30 | $782 | 4.64 |
| Domiciliarios INTER - API | $25,000 | $23,038 | 92% | 68 | $339 | 8.51 |
| Domiciliarios Q58 - | $25,000 | $22,362 | 89% | 93 | $240 | 8.19 |
| TEST Creativos - API | $20,000 | $20,000 | 100% | 43 | $465 | 9.28 |
| Domiciliarios - Expancion - INTER | $25,000 | $19,946 | 80% | 27 | $739 | 4.21 |
| Motorizados - Q58 | $20,000 | $19,169 | 96% | 22 | $871 | 3.80 |
| Domiciliarios VIDEO INTER - API | $25,000 | $19,154 | 77% | 35 | $547 | 7.65 |
| Motorizados - INTER | $25,000 | $16,467 | 66% | 28 | $588 | 9.91 |
| RADIO - Seguridad / Negocios | $25,000 | $16,426 | 66% | 20 | $821 | 5.53 |
| Motorizados - API | $20,000 | $15,903 | 80% | 31 | $513 | 7.37 |
| Domiciliarios VIDEO - API | $20,000 | $15,549 | 78% | 41 | $379 | 7.54 |
| RADIO - Fincas | $20,000 | $14,170 | 71% | 21 | $675 | 5.64 |
| Domiciliarios - Expancion - Q58 | $20,000 | $13,556 | 68% | 56 | $242 | 9.73 |
| RADIO - Moteros | $20,000 | $8,849 | 44% | 7 | $1,264 | 2.65 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $310,401 | 636 | **$488** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,972**/pedido |
| utilidad estimada de lo que va del día | **$710,541** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $424 | $444 | $517 | $691 | $518 | $679 | 🔴 |
| Domiciliarios - API | $348 | $370 | $417 | $489 | $434 | $444 | 🟡 |
| Domiciliarios VIDEO Q58 - | $995 | $1,091 | $679 | $795 | $829 | $782 | 🟢 |
| Domiciliarios INTER - API | $304 | $314 | $332 | $462 | $366 | $339 | 🟢 |
| Domiciliarios Q58 - | $197 | $159 | $217 | $204 | $185 | $240 | 🔴 |
| TEST Creativos - API | $535 | $379 | $480 | $395 | $526 | $465 | 🟢 |
| Domiciliarios - Expancion - INTER | $604 | $721 | $662 | $594 | $526 | $739 | 🔴 |
| Motorizados - Q58 | $1,025 | $599 | $514 | $547 | $836 | $871 | 🟡 |
| Domiciliarios VIDEO INTER - API | $701 | $742 | $646 | $490 | $661 | $547 | 🟢 |
| Motorizados - INTER | $460 | $545 | $714 | $595 | $838 | $588 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | $1,170 | $750 | $821 | 🟡 |
| Motorizados - API | $446 | $379 | $456 | $436 | $431 | $513 | 🔴 |
| Domiciliarios VIDEO - API | $269 | $292 | $337 | $383 | $332 | $379 | 🟡 |
| RADIO - Fincas | — | — | — | $630 | $434 | $675 | 🔴 |
| Domiciliarios - Expancion - Q58 | $1,077 | $892 | $1,117 | $876 | $286 | $242 | 🟢 |
| RADIO - Moteros | — | — | — | $919 | $925 | $1,264 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 11.99 | 10.38 | 8.14 | 5.47 | 8.50 | 5.97 | 🔴 |
| Domiciliarios - API | 14.10 | 12.13 | 9.61 | 8.16 | 10.51 | 9.45 | 🟡 |
| Domiciliarios VIDEO Q58 - | 3.19 | 2.96 | 4.98 | 4.11 | 4.81 | 4.64 | 🟡 |
| Domiciliarios INTER - API | 12.17 | 9.39 | 7.57 | 6.56 | 8.12 | 8.51 | 🟡 |
| Domiciliarios Q58 - | 11.07 | 12.89 | 10.68 | 10.24 | 11.44 | 8.19 | 🔴 |
| TEST Creativos - API | 11.03 | 14.31 | 8.92 | 8.50 | 6.95 | 9.28 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.33 | 4.21 | 4.83 | 4.70 | 5.97 | 4.21 | 🔴 |
| Motorizados - Q58 | 3.32 | 5.14 | 5.82 | 5.28 | 3.66 | 3.80 | 🟡 |
| Domiciliarios VIDEO INTER - API | 5.98 | 5.52 | 6.43 | 8.56 | 6.03 | 7.65 | 🟢 |
| Motorizados - INTER | 13.59 | 11.01 | 8.00 | 8.89 | 6.52 | 9.91 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | 4.13 | 5.51 | 5.53 | 🟡 |
| Motorizados - API | 9.31 | 10.45 | 8.59 | 8.65 | 9.54 | 7.37 | 🔴 |
| Domiciliarios VIDEO - API | 14.69 | 10.98 | 9.18 | 7.54 | 9.93 | 7.54 | 🔴 |
| RADIO - Fincas | — | — | — | 8.62 | 9.35 | 5.64 | 🔴 |
| Domiciliarios - Expancion - Q58 | 3.65 | 4.52 | 3.93 | 4.47 | 8.73 | 9.73 | 🟢 |
| RADIO - Moteros | — | — | — | 5.63 | 4.15 | 2.65 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,864 | 750 | $513 | $3,525 | 6.87 | $819,077 |
| 2026-10-25 | $403,809 | 884 | $457 | $3,560 | 7.79 | $1,015,236 |

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
