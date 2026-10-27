# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-26 21:34 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$189,759** |
| gastado hoy (hasta las 21h) | $450,449 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $469,194 |
| saldo proyectado a medianoche | $171,014 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–21:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-22 | $300,785 | 712 | **$422** | $3,724 | 8.81 |
| 2026-10-23 | $278,591 | 580 | **$480** | $3,552 | 7.39 |
| 2026-10-24 | $377,855 | 728 | **$519** | $3,538 | 6.82 |
| 2026-10-25 | $373,333 | 814 | **$459** | $3,557 | 7.76 |
| 2026-10-26 **HOY** | $450,449 | 925 | **$487** | $3,337 | 6.85 |

🟠 Hoy va 6% más caro que ayer a la misma hora ($487 vs $459).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   487  =  $ 3,337  ÷  6.85
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,337 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.85 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $47,829 | 120% | 79 | $605 | 6.71 |
| Domiciliarios - API | $35,000 | $39,992 | 114% | 84 | $476 | 8.86 |
| Domiciliarios VIDEO Q58 - | $25,000 | $32,967 | 132% | 39 | $845 | 3.90 |
| Domiciliarios INTER - API | $25,000 | $31,229 | 125% | 90 | $347 | 7.64 |
| Domiciliarios Q58 - | $25,000 | $31,151 | 125% | 144 | $216 | 8.94 |
| Domiciliarios - Expancion - INTER | $25,000 | $30,838 | 123% | 39 | $791 | 3.55 |
| Domiciliarios VIDEO INTER - API | $25,000 | $27,125 | 108% | 51 | $532 | 8.00 |
| Motorizados - INTER | $25,000 | $26,446 | 106% | 48 | $551 | 10.19 |
| Motorizados - Q58 | $20,000 | $26,181 | 131% | 32 | $818 | 3.96 |
| TEST Creativos - API | $20,000 | $25,070 | 125% | 50 | $501 | 8.95 |
| RADIO - Seguridad / Negocios | $25,000 | $24,836 | 99% | 26 | $955 | 4.60 |
| RADIO - Fincas | $20,000 | $24,229 | 121% | 32 | $757 | 4.90 |
| Motorizados - API | $20,000 | $22,732 | 114% | 50 | $455 | 8.21 |
| Domiciliarios VIDEO - API | $20,000 | $22,417 | 112% | 58 | $386 | 7.64 |
| Domiciliarios - Expancion - Q58 | $20,000 | $22,130 | 111% | 89 | $249 | 9.20 |
| RADIO - Moteros | $20,000 | $15,277 | 76% | 14 | $1,091 | 3.07 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $450,449 | 925 | **$487** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,952**/pedido |
| utilidad estimada de lo que va del día | **$1,034,411** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $424 | $444 | $517 | $691 | $518 | $605 | 🔴 |
| Domiciliarios - API | $348 | $370 | $417 | $489 | $434 | $476 | 🟡 |
| Domiciliarios VIDEO Q58 - | $995 | $1,091 | $679 | $795 | $829 | $845 | 🟡 |
| Domiciliarios INTER - API | $304 | $314 | $332 | $462 | $366 | $347 | 🟢 |
| Domiciliarios Q58 - | $197 | $159 | $217 | $204 | $185 | $216 | 🔴 |
| Domiciliarios - Expancion - INTER | $604 | $721 | $662 | $594 | $526 | $791 | 🔴 |
| Domiciliarios VIDEO INTER - API | $701 | $742 | $646 | $490 | $661 | $532 | 🟢 |
| Motorizados - INTER | $460 | $545 | $714 | $595 | $838 | $551 | 🟢 |
| Motorizados - Q58 | $1,025 | $599 | $514 | $547 | $836 | $818 | 🟡 |
| TEST Creativos - API | $535 | $379 | $480 | $395 | $526 | $501 | 🟡 |
| RADIO - Seguridad / Negocios | — | — | — | $1,170 | $750 | $955 | 🔴 |
| RADIO - Fincas | — | — | — | $630 | $434 | $757 | 🔴 |
| Motorizados - API | $446 | $379 | $456 | $436 | $431 | $455 | 🟡 |
| Domiciliarios VIDEO - API | $269 | $292 | $337 | $383 | $332 | $386 | 🔴 |
| Domiciliarios - Expancion - Q58 | $1,077 | $892 | $1,117 | $876 | $286 | $249 | 🟢 |
| RADIO - Moteros | — | — | — | $919 | $926 | $1,091 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 11.99 | 10.38 | 8.14 | 5.47 | 8.50 | 6.71 | 🔴 |
| Domiciliarios - API | 14.10 | 12.13 | 9.61 | 8.16 | 10.51 | 8.86 | 🔴 |
| Domiciliarios VIDEO Q58 - | 3.19 | 2.96 | 4.98 | 4.11 | 4.81 | 3.90 | 🔴 |
| Domiciliarios INTER - API | 12.17 | 9.39 | 7.57 | 6.56 | 8.11 | 7.64 | 🟡 |
| Domiciliarios Q58 - | 11.07 | 12.89 | 10.68 | 10.24 | 11.43 | 8.94 | 🔴 |
| Domiciliarios - Expancion - INTER | 5.33 | 4.21 | 4.83 | 4.70 | 5.97 | 3.55 | 🔴 |
| Domiciliarios VIDEO INTER - API | 5.98 | 5.52 | 6.43 | 8.56 | 6.02 | 8.00 | 🟢 |
| Motorizados - INTER | 13.59 | 11.01 | 8.00 | 8.89 | 6.52 | 10.19 | 🟢 |
| Motorizados - Q58 | 3.32 | 5.14 | 5.82 | 5.28 | 3.66 | 3.96 | 🟢 |
| TEST Creativos - API | 11.03 | 14.31 | 8.92 | 8.50 | 6.95 | 8.95 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | 4.13 | 5.50 | 4.60 | 🔴 |
| RADIO - Fincas | — | — | — | 8.62 | 9.35 | 4.90 | 🔴 |
| Motorizados - API | 9.31 | 10.45 | 8.59 | 8.65 | 9.54 | 8.21 | 🟡 |
| Domiciliarios VIDEO - API | 14.69 | 10.98 | 9.18 | 7.54 | 9.93 | 7.64 | 🔴 |
| Domiciliarios - Expancion - Q58 | 3.65 | 4.52 | 3.93 | 4.47 | 8.73 | 9.20 | 🟢 |
| RADIO - Moteros | — | — | — | 5.63 | 4.15 | 3.07 | 🔴 |

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
