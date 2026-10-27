# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-26 22:34 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$172,873** |
| gastado hoy (hasta las 22h) | $468,016 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $473,928 |
| saldo proyectado a medianoche | $166,961 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–22:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-22 | $311,601 | 746 | **$418** | $3,716 | 8.90 |
| 2026-10-23 | $289,906 | 605 | **$479** | $3,547 | 7.40 |
| 2026-10-24 | $383,912 | 745 | **$515** | $3,528 | 6.85 |
| 2026-10-25 | $392,941 | 852 | **$461** | $3,555 | 7.71 |
| 2026-10-26 **HOY** | $468,016 | 971 | **$482** | $3,326 | 6.90 |

🟠 Hoy va 5% más caro que ayer a la misma hora ($482 vs $461).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   482  =  $ 3,326  ÷  6.90
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,326 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.90 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $49,698 | 124% | 83 | $599 | 6.78 |
| Domiciliarios - API | $35,000 | $41,606 | 119% | 89 | $467 | 8.98 |
| Domiciliarios VIDEO Q58 - | $25,000 | $33,637 | 135% | 39 | $862 | 3.77 |
| Domiciliarios INTER - API | $25,000 | $32,378 | 130% | 94 | $344 | 7.62 |
| Domiciliarios Q58 - | $25,000 | $32,049 | 128% | 149 | $215 | 9.03 |
| Domiciliarios - Expancion - INTER | $25,000 | $32,033 | 128% | 42 | $763 | 3.63 |
| Domiciliarios VIDEO INTER - API | $25,000 | $28,265 | 113% | 54 | $523 | 8.09 |
| Motorizados - Q58 | $20,000 | $27,626 | 138% | 36 | $767 | 4.19 |
| Motorizados - INTER | $25,000 | $27,227 | 109% | 50 | $545 | 10.26 |
| RADIO - Seguridad / Negocios | $25,000 | $25,836 | 103% | 26 | $994 | 4.43 |
| TEST Creativos - API | $20,000 | $25,650 | 128% | 52 | $493 | 9.11 |
| RADIO - Fincas | $20,000 | $25,348 | 127% | 34 | $746 | 4.99 |
| Motorizados - API | $20,000 | $23,920 | 120% | 54 | $443 | 8.48 |
| Domiciliarios VIDEO - API | $20,000 | $23,588 | 118% | 60 | $393 | 7.50 |
| Domiciliarios - Expancion - Q58 | $20,000 | $22,823 | 114% | 94 | $243 | 9.42 |
| RADIO - Moteros | $20,000 | $16,332 | 82% | 15 | $1,089 | 3.05 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $468,016 | 971 | **$482** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,860**/pedido |
| utilidad estimada de lo que va del día | **$1,090,686** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $424 | $444 | $517 | $691 | $518 | $599 | 🔴 |
| Domiciliarios - API | $348 | $370 | $417 | $489 | $434 | $467 | 🟡 |
| Domiciliarios VIDEO Q58 - | $995 | $1,091 | $679 | $795 | $829 | $862 | 🟡 |
| Domiciliarios INTER - API | $304 | $314 | $332 | $462 | $366 | $344 | 🟢 |
| Domiciliarios Q58 - | $197 | $159 | $217 | $204 | $185 | $215 | 🔴 |
| Domiciliarios - Expancion - INTER | $604 | $721 | $662 | $594 | $526 | $763 | 🔴 |
| Domiciliarios VIDEO INTER - API | $701 | $742 | $646 | $490 | $661 | $523 | 🟢 |
| Motorizados - Q58 | $1,025 | $599 | $514 | $547 | $836 | $767 | 🟢 |
| Motorizados - INTER | $460 | $545 | $714 | $595 | $838 | $545 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | $1,170 | $750 | $994 | 🔴 |
| TEST Creativos - API | $535 | $379 | $480 | $395 | $526 | $493 | 🟢 |
| RADIO - Fincas | — | — | — | $630 | $434 | $746 | 🔴 |
| Motorizados - API | $446 | $379 | $456 | $436 | $431 | $443 | 🟡 |
| Domiciliarios VIDEO - API | $269 | $292 | $337 | $383 | $332 | $393 | 🔴 |
| Domiciliarios - Expancion - Q58 | $1,077 | $892 | $1,117 | $876 | $286 | $243 | 🟢 |
| RADIO - Moteros | — | — | — | $919 | $926 | $1,089 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 11.99 | 10.38 | 8.14 | 5.47 | 8.50 | 6.78 | 🔴 |
| Domiciliarios - API | 14.10 | 12.13 | 9.61 | 8.16 | 10.50 | 8.98 | 🟡 |
| Domiciliarios VIDEO Q58 - | 3.19 | 2.96 | 4.98 | 4.11 | 4.81 | 3.77 | 🔴 |
| Domiciliarios INTER - API | 12.17 | 9.39 | 7.57 | 6.56 | 8.11 | 7.62 | 🟡 |
| Domiciliarios Q58 - | 11.07 | 12.89 | 10.68 | 10.24 | 11.43 | 9.03 | 🔴 |
| Domiciliarios - Expancion - INTER | 5.33 | 4.21 | 4.83 | 4.70 | 5.97 | 3.63 | 🔴 |
| Domiciliarios VIDEO INTER - API | 5.98 | 5.52 | 6.43 | 8.56 | 6.02 | 8.09 | 🟢 |
| Motorizados - Q58 | 3.32 | 5.14 | 5.82 | 5.28 | 3.66 | 4.19 | 🟢 |
| Motorizados - INTER | 13.59 | 11.01 | 8.00 | 8.89 | 6.52 | 10.26 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | 4.13 | 5.50 | 4.43 | 🔴 |
| TEST Creativos - API | 11.03 | 14.31 | 8.92 | 8.50 | 6.95 | 9.11 | 🟢 |
| RADIO - Fincas | — | — | — | 8.62 | 9.35 | 4.99 | 🔴 |
| Motorizados - API | 9.31 | 10.45 | 8.59 | 8.65 | 9.54 | 8.48 | 🟡 |
| Domiciliarios VIDEO - API | 14.69 | 10.98 | 9.18 | 7.54 | 9.93 | 7.50 | 🔴 |
| Domiciliarios - Expancion - Q58 | 3.65 | 4.52 | 3.93 | 4.47 | 8.73 | 9.42 | 🟢 |
| RADIO - Moteros | — | — | — | 5.63 | 4.15 | 3.05 | 🔴 |

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
| 2026-10-25 | $403,813 | 884 | $457 | $3,558 | 7.79 | $1,015,232 |

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
