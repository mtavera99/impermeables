# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-26 15:35 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$180,800** |
| gastado hoy (hasta las 15h) | $258,636 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $423,018 |
| saldo proyectado a medianoche | $16,418 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🔴 RECARGAR $138,264 — entra en zona de freno a las 23:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-22 | $188,523 | 434 | **$434** | $3,752 | 8.64 |
| 2026-10-23 | $144,668 | 317 | **$456** | $3,520 | 7.71 |
| 2026-10-24 | $239,759 | 414 | **$579** | $3,622 | 6.25 |
| 2026-10-25 | $219,986 | 487 | **$452** | $3,487 | 7.72 |
| 2026-10-26 **HOY** | $259,223 | 552 | **$470** | $3,428 | 7.30 |

🟠 Hoy va 4% más caro que ayer a la misma hora ($470 vs $452).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   470  =  $ 3,428  ÷  7.30
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,428 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.30 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $28,999 | 72% | 46 | $630 | 6.37 |
| Domiciliarios - API | $35,000 | $24,114 | 69% | 63 | $383 | 10.95 |
| Domiciliarios INTER - API | $25,000 | $19,814 | 79% | 60 | $330 | 8.86 |
| Domiciliarios VIDEO Q58 - | $25,000 | $19,241 | 77% | 26 | $740 | 4.89 |
| Domiciliarios Q58 - | $25,000 | $18,829 | 75% | 76 | $248 | 7.98 |
| TEST Creativos - API | $20,000 | $17,277 | 86% | 43 | $402 | 10.54 |
| Domiciliarios - Expancion - INTER | $25,000 | $16,893 | 68% | 24 | $704 | 4.49 |
| Domiciliarios VIDEO INTER - API | $25,000 | $16,088 | 64% | 31 | $519 | 7.91 |
| Motorizados - Q58 | $20,000 | $16,017 | 80% | 20 | $801 | 4.15 |
| Motorizados - API | $20,000 | $13,738 | 69% | 27 | $509 | 7.37 |
| Domiciliarios VIDEO - API | $20,000 | $13,699 | 68% | 35 | $391 | 7.20 |
| RADIO - Seguridad / Negocios | $25,000 | $13,559 | 54% | 17 | $798 | 5.73 |
| Motorizados - INTER | $25,000 | $12,977 | 52% | 21 | $618 | 9.43 |
| RADIO - Fincas | $20,000 | $11,212 | 56% | 19 | $590 | 6.35 |
| Domiciliarios - Expancion - Q58 | $20,000 | $10,093 | 50% | 39 | $259 | 9.24 |
| RADIO - Moteros | $20,000 | $6,612 | 33% | 6 | $1,102 | 3.10 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $259,162 | 553 | **$469** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,615**/pedido |
| utilidad estimada de lo que va del día | **$628,544** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $424 | $444 | $517 | $691 | $518 | $630 | 🔴 |
| Domiciliarios - API | $348 | $370 | $417 | $489 | $434 | $383 | 🟢 |
| Domiciliarios INTER - API | $304 | $314 | $332 | $462 | $365 | $331 | 🟢 |
| Domiciliarios VIDEO Q58 - | $995 | $1,091 | $679 | $795 | $829 | $740 | 🟢 |
| Domiciliarios Q58 - | $197 | $159 | $217 | $204 | $185 | $248 | 🔴 |
| TEST Creativos - API | $535 | $379 | $480 | $395 | $526 | $404 | 🟢 |
| Domiciliarios - Expancion - INTER | $604 | $721 | $662 | $594 | $526 | $704 | 🔴 |
| Domiciliarios VIDEO INTER - API | $701 | $742 | $646 | $490 | $661 | $519 | 🟢 |
| Motorizados - Q58 | $1,025 | $599 | $514 | $547 | $835 | $801 | 🟡 |
| Motorizados - API | $446 | $379 | $456 | $436 | $431 | $511 | 🔴 |
| Domiciliarios VIDEO - API | $269 | $292 | $337 | $383 | $332 | $392 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | $1,170 | $750 | $798 | 🟡 |
| Motorizados - INTER | $460 | $545 | $714 | $595 | $838 | $618 | 🟢 |
| RADIO - Fincas | — | — | — | $630 | $434 | $590 | 🔴 |
| Domiciliarios - Expancion - Q58 | $1,077 | $892 | $1,117 | $876 | $286 | $259 | 🟢 |
| RADIO - Moteros | — | — | — | $919 | $925 | $1,102 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 11.99 | 10.38 | 8.14 | 5.47 | 8.50 | 6.37 | 🔴 |
| Domiciliarios - API | 14.10 | 12.13 | 9.61 | 8.16 | 10.51 | 10.95 | 🟡 |
| Domiciliarios INTER - API | 12.17 | 9.39 | 7.57 | 6.56 | 8.12 | 8.83 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.19 | 2.96 | 4.98 | 4.11 | 4.81 | 4.89 | 🟡 |
| Domiciliarios Q58 - | 11.07 | 12.89 | 10.68 | 10.24 | 11.45 | 7.98 | 🔴 |
| TEST Creativos - API | 11.03 | 14.31 | 8.92 | 8.50 | 6.95 | 10.50 | 🟢 |
| Domiciliarios - Expancion - INTER | 5.33 | 4.21 | 4.83 | 4.70 | 5.97 | 4.49 | 🔴 |
| Domiciliarios VIDEO INTER - API | 5.98 | 5.52 | 6.43 | 8.56 | 6.03 | 7.91 | 🟢 |
| Motorizados - Q58 | 3.32 | 5.14 | 5.82 | 5.28 | 3.66 | 4.15 | 🟢 |
| Motorizados - API | 9.31 | 10.45 | 8.59 | 8.65 | 9.55 | 7.35 | 🔴 |
| Domiciliarios VIDEO - API | 14.69 | 10.98 | 9.18 | 7.54 | 9.94 | 7.18 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | 4.13 | 5.51 | 5.73 | 🟡 |
| Motorizados - INTER | 13.59 | 11.01 | 8.00 | 8.89 | 6.53 | 9.43 | 🟢 |
| RADIO - Fincas | — | — | — | 8.62 | 9.36 | 6.35 | 🔴 |
| Domiciliarios - Expancion - Q58 | 3.65 | 4.52 | 3.93 | 4.47 | 8.74 | 9.24 | 🟢 |
| RADIO - Moteros | — | — | — | 5.63 | 4.15 | 3.10 | 🔴 |

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
| 2026-10-25 | $403,647 | 884 | $457 | $3,560 | 7.80 | $1,015,398 |

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
