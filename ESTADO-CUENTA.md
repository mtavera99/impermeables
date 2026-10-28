# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-28 02:54 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$156,222** |
| gastado hoy (hasta las 2h) | $4,656 |
| presupuesto activo | $428,000/día |
| cierre proyectado del día | $435,474 |
| saldo proyectado a medianoche | $-274,596 |
| objetivo (cubrir un día de 143% + colchón) | $632,040 |

### 🔴 RECARGAR $471,162 — entra en zona de freno a las 11:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–2:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-24 | $6,104 | 14 | **$436** | $3,704 | 8.50 |
| 2026-10-25 | $10,916 | 26 | **$420** | $2,999 | 7.14 |
| 2026-10-26 | $8,238 | 22 | **$374** | $3,821 | 10.20 |
| 2026-10-27 | $9,724 | 31 | **$314** | $4,213 | 13.43 |
| 2026-10-28 **HOY** | $4,656 | 10 | **$466** | $3,959 | 8.50 |

🟠 Hoy va 48% más caro que ayer a la misma hora ($466 vs $314).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   466  =  $ 3,959  ÷  8.50
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,959 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.50 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Broad | $40,000 | $452 | 1% | 0 | — | 0.00 |
| Domiciliarios - API | $35,000 | $448 | 1% | 2 | $224 | 20.83 |
| Motorizados - Q58 | $24,000 | $395 | 2% | 1 | $395 | 5.52 |
| Domiciliarios INTER - API | $20,000 | $393 | 2% | 1 | $393 | 7.63 |
| Domiciliarios - Expancion - API | $30,000 | $387 | 1% | 0 | — | 0.00 |
| Domiciliarios - Expancion - INTER | $25,000 | $354 | 1% | 0 | — | 0.00 |
| Motorizados - API | $20,000 | $353 | 2% | 0 | — | 0.00 |
| Motorizados - INTER | $25,000 | $315 | 1% | 2 | $158 | 51.28 |
| Domiciliarios VIDEO - API | $20,000 | $311 | 2% | 1 | $311 | 15.87 |
| Domiciliarios VIDEO INTER - API | $30,000 | $286 | 1% | 1 | $286 | 17.54 |
| RADIO - Moteros | $20,000 | $214 | 1% | 0 | — | 0.00 |
| TEST Creativos - API | $20,000 | $199 | 1% | 0 | — | 0.00 |
| Domiciliarios Q58 - | $25,000 | $131 | 1% | 0 | — | 0.00 |
| RADIO - Seguridad / Negocios | $25,000 | $130 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO Q58 - | $25,000 | $117 | 0% | 0 | — | 0.00 |
| Domiciliarios - Expancion - Q58 | $24,000 | $110 | 0% | 2 | $55 | 76.92 |
| RADIO - Fincas | $20,000 | $61 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $4,656 | 10 | **$466** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,559**/pedido |
| utilidad estimada de lo que va del día | **$11,397** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | $1,422 | — |  |
| Domiciliarios - API | $417 | $489 | $434 | $459 | $367 | $224 | 🟢 |
| Motorizados - Q58 | $514 | $547 | $836 | $769 | $604 | $395 | 🟢 |
| Domiciliarios INTER - API | $332 | $462 | $366 | $332 | $315 | $393 | 🔴 |
| Domiciliarios - Expancion - API | $517 | $691 | $518 | $576 | $668 | — | 🔴 |
| Domiciliarios - Expancion - INTER | $662 | $594 | $526 | $747 | $496 | — | 🟢 |
| Motorizados - API | $456 | $436 | $431 | $426 | $356 | — | 🟢 |
| Motorizados - INTER | $714 | $595 | $838 | $543 | $526 | $158 | 🟢 |
| Domiciliarios VIDEO - API | $337 | $383 | $332 | $389 | $303 | $311 | 🟡 |
| Domiciliarios VIDEO INTER - API | $646 | $490 | $661 | $519 | $638 | $286 | 🟢 |
| RADIO - Moteros | — | $919 | $926 | $1,068 | $1,147 | — | 🟡 |
| TEST Creativos - API | $480 | $395 | $526 | $490 | $386 | — | 🟢 |
| Domiciliarios Q58 - | $217 | $204 | $185 | $211 | $199 | — | 🟢 |
| RADIO - Seguridad / Negocios | — | $1,170 | $750 | $1,000 | $982 | — | 🟡 |
| Domiciliarios VIDEO Q58 - | $679 | $795 | $829 | $870 | $687 | — | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,117 | $876 | $286 | $241 | $247 | $55 | 🟢 |
| RADIO - Fincas | — | $630 | $434 | $707 | $730 | — | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | 4.84 | — |  |
| Domiciliarios - API | 9.61 | 8.16 | 10.50 | 9.11 | 13.39 | 20.83 | 🟢 |
| Motorizados - Q58 | 5.82 | 5.28 | 3.66 | 4.17 | 4.50 | 5.52 | 🟢 |
| Domiciliarios INTER - API | 7.57 | 6.56 | 8.11 | 7.76 | 8.56 | 7.63 | 🟡 |
| Domiciliarios - Expancion - API | 8.14 | 5.47 | 8.50 | 7.03 | 6.93 | — | 🟡 |
| Domiciliarios - Expancion - INTER | 4.83 | 4.70 | 5.97 | 3.66 | 5.16 | — | 🟢 |
| Motorizados - API | 8.59 | 8.65 | 9.54 | 8.76 | 12.26 | — | 🟢 |
| Motorizados - INTER | 8.00 | 8.89 | 6.52 | 10.17 | 13.37 | 51.28 | 🟢 |
| Domiciliarios VIDEO - API | 9.18 | 7.54 | 9.93 | 7.54 | 12.80 | 15.87 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.43 | 8.56 | 6.02 | 8.12 | 7.90 | 17.54 | 🟢 |
| RADIO - Moteros | — | 5.63 | 4.15 | 3.02 | 3.45 | — | 🟢 |
| TEST Creativos - API | 8.92 | 8.50 | 6.95 | 9.25 | 12.48 | — | 🟢 |
| Domiciliarios Q58 - | 10.68 | 10.24 | 11.43 | 9.12 | 11.14 | — | 🟢 |
| RADIO - Seguridad / Negocios | — | 4.13 | 5.50 | 4.36 | 5.22 | — | 🟢 |
| Domiciliarios VIDEO Q58 - | 4.98 | 4.11 | 4.81 | 3.70 | 5.33 | — | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.93 | 4.47 | 8.73 | 9.37 | 10.83 | 76.92 | 🟢 |
| RADIO - Fincas | — | 8.62 | 9.35 | 5.16 | 5.68 | — | 🟢 |

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
| 2026-10-27 | $394,337 | 865 | $456 | $3,863 | 8.47 | $994,208 |

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
