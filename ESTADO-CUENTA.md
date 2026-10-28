# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-28 15:21 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$164,291** |
| gastado hoy (hasta las 15h) | $192,231 |
| presupuesto activo | $428,000/día |
| cierre proyectado del día | $390,728 |
| saldo proyectado a medianoche | $-34,206 |
| objetivo (cubrir un día de 143% + colchón) | $632,040 |

### 🔴 RECARGAR $275,518 — entra en zona de freno a las 20:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-24 | $239,759 | 414 | **$579** | $3,622 | 6.25 |
| 2026-10-25 | $219,998 | 487 | **$452** | $3,487 | 7.72 |
| 2026-10-26 | $277,834 | 578 | **$481** | $3,365 | 7.00 |
| 2026-10-27 | $208,355 | 461 | **$452** | $3,771 | 8.34 |
| 2026-10-28 **HOY** | $192,231 | 359 | **$535** | $3,736 | 6.98 |

🟠 Hoy va 18% más caro que ayer a la misma hora ($535 vs $452).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   535  =  $ 3,736  ÷  6.98
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,736 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.98 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Broad | $40,000 | $23,521 | 59% | 16 | $1,470 | 3.89 |
| Domiciliarios - API | $35,000 | $16,112 | 46% | 42 | $384 | 12.50 |
| Domiciliarios VIDEO INTER - API | $30,000 | $15,725 | 52% | 27 | $582 | 8.29 |
| Domiciliarios - Expancion - API | $30,000 | $13,922 | 46% | 13 | $1,071 | 3.87 |
| Domiciliarios - Expancion - Q58 | $24,000 | $12,208 | 51% | 40 | $305 | 7.58 |
| Motorizados - Q58 | $24,000 | $11,729 | 49% | 21 | $559 | 4.05 |
| RADIO - Seguridad / Negocios | $25,000 | $11,086 | 44% | 9 | $1,232 | 3.75 |
| Domiciliarios VIDEO Q58 - | $25,000 | $10,024 | 40% | 11 | $911 | 4.49 |
| RADIO - Moteros | $20,000 | $9,804 | 49% | 4 | $2,451 | 1.74 |
| Motorizados - INTER | $25,000 | $9,516 | 38% | 20 | $476 | 14.36 |
| Motorizados - API | $20,000 | $9,066 | 45% | 22 | $412 | 10.61 |
| RADIO - Fincas | $20,000 | $8,972 | 45% | 12 | $748 | 4.87 |
| Domiciliarios VIDEO - API | $20,000 | $8,588 | 43% | 23 | $373 | 9.46 |
| TEST Creativos - API | $20,000 | $8,377 | 42% | 15 | $558 | 6.00 |
| Domiciliarios - Expancion - INTER | $25,000 | $8,256 | 33% | 11 | $751 | 4.18 |
| Domiciliarios Q58 - | $25,000 | $8,032 | 32% | 43 | $187 | 10.97 |
| Domiciliarios INTER - API | $20,000 | $7,293 | 36% | 30 | $243 | 12.83 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $192,231 | 359 | **$535** | $2,402 | **22%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,843**/pedido |
| utilidad estimada de lo que va del día | **$384,055** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | $1,436 | $1,470 | 🟡 |
| Domiciliarios - API | $417 | $489 | $434 | $459 | $371 | $384 | 🟡 |
| Domiciliarios VIDEO INTER - API | $646 | $490 | $661 | $519 | $642 | $582 | 🟢 |
| Domiciliarios - Expancion - API | $517 | $691 | $518 | $576 | $671 | $1,071 | 🔴 |
| Domiciliarios - Expancion - Q58 | $1,117 | $876 | $286 | $241 | $249 | $305 | 🔴 |
| Motorizados - Q58 | $514 | $547 | $836 | $769 | $607 | $559 | 🟢 |
| RADIO - Seguridad / Negocios | — | $1,170 | $750 | $1,000 | $995 | $1,232 | 🔴 |
| Domiciliarios VIDEO Q58 - | $679 | $795 | $829 | $870 | $690 | $911 | 🔴 |
| RADIO - Moteros | — | $919 | $926 | $1,068 | $1,161 | $2,451 | 🔴 |
| Motorizados - INTER | $714 | $595 | $838 | $543 | $531 | $476 | 🟢 |
| Motorizados - API | $456 | $436 | $431 | $426 | $358 | $412 | 🔴 |
| RADIO - Fincas | — | $630 | $434 | $707 | $750 | $748 | 🟡 |
| Domiciliarios VIDEO - API | $337 | $383 | $332 | $389 | $308 | $373 | 🔴 |
| TEST Creativos - API | $480 | $395 | $526 | $490 | $386 | $558 | 🔴 |
| Domiciliarios - Expancion - INTER | $662 | $594 | $526 | $747 | $499 | $751 | 🔴 |
| Domiciliarios Q58 - | $217 | $204 | $185 | $211 | $202 | $187 | 🟢 |
| Domiciliarios INTER - API | $332 | $462 | $366 | $332 | $319 | $243 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | 4.77 | 3.89 | 🔴 |
| Domiciliarios - API | 9.61 | 8.16 | 10.50 | 9.11 | 13.29 | 12.50 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.43 | 8.56 | 6.02 | 8.12 | 7.84 | 8.29 | 🟢 |
| Domiciliarios - Expancion - API | 8.14 | 5.47 | 8.50 | 7.03 | 6.89 | 3.87 | 🔴 |
| Domiciliarios - Expancion - Q58 | 3.93 | 4.47 | 8.73 | 9.37 | 10.70 | 7.58 | 🔴 |
| Motorizados - Q58 | 5.82 | 5.28 | 3.66 | 4.17 | 4.49 | 4.05 | 🟡 |
| RADIO - Seguridad / Negocios | — | 4.13 | 5.50 | 4.36 | 5.11 | 3.75 | 🔴 |
| Domiciliarios VIDEO Q58 - | 4.98 | 4.11 | 4.81 | 3.70 | 5.31 | 4.49 | 🔴 |
| RADIO - Moteros | — | 5.63 | 4.15 | 3.02 | 3.39 | 1.74 | 🔴 |
| Motorizados - INTER | 8.00 | 8.89 | 6.52 | 10.17 | 13.23 | 14.36 | 🟢 |
| Motorizados - API | 8.59 | 8.65 | 9.54 | 8.76 | 12.18 | 10.61 | 🟡 |
| RADIO - Fincas | — | 8.62 | 9.35 | 5.16 | 5.52 | 4.87 | 🟡 |
| Domiciliarios VIDEO - API | 9.18 | 7.54 | 9.93 | 7.54 | 12.63 | 9.46 | 🔴 |
| TEST Creativos - API | 8.92 | 8.50 | 6.95 | 9.25 | 12.47 | 6.00 | 🔴 |
| Domiciliarios - Expancion - INTER | 4.83 | 4.70 | 5.97 | 3.66 | 5.15 | 4.18 | 🔴 |
| Domiciliarios Q58 - | 10.68 | 10.24 | 11.43 | 9.12 | 11.00 | 10.97 | 🟡 |
| Domiciliarios INTER - API | 7.57 | 6.56 | 8.11 | 7.76 | 8.53 | 12.83 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,864 | 750 | $513 | $3,525 | 6.87 | $819,077 |
| 2026-10-25 | $403,813 | 884 | $457 | $3,558 | 7.79 | $1,015,232 |
| 2026-10-26 | $485,261 | 1022 | $475 | $3,300 | 6.95 | $1,155,309 |
| 2026-10-27 | $397,923 | 865 | $460 | $3,864 | 8.40 | $990,622 |

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
