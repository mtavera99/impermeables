# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-22 23:49 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$318,308** |
| gastado hoy (hasta las 23h) | $586,441 |
| presupuesto activo | $483,000/día |
| cierre proyectado del día | $586,441 |
| saldo proyectado a medianoche | $318,308 |
| objetivo (cubrir un día de 143% + colchón) | $710,690 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–23:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-18 | $491,703 | 674 | **$730** | $3,893 | 5.34 |
| 2026-11-19 | $396,366 | 543 | **$730** | $3,642 | 4.99 |
| 2026-11-20 | $404,941 | 543 | **$746** | $3,732 | 5.00 |
| 2026-11-21 | $415,892 | 584 | **$712** | $3,109 | 4.37 |
| 2026-11-22 **HOY** | $586,441 | 816 | **$719** | $3,477 | 4.84 |

🟠 Hoy va 1% más caro que ayer a la misma hora ($719 vs $712).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   719  =  $ 3,477  ÷  4.84
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,477 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.84 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| [EXP] Llanos y Boyacá · Radios Baofeng | $48,000 | $59,898 | 125% | 42 | $1,426 | 1.63 |
| RADIO - Seguridad / Negocios | $48,000 | $58,791 | 122% | 45 | $1,306 | 2.76 |
| Domiciliarios - API | $35,000 | $44,497 | 127% | 48 | $927 | 5.73 |
| Domiciliarios - Expancion - Q58 | $30,000 | $38,923 | 130% | 114 | $341 | 8.75 |
| Motorizados - INTER | $30,000 | $37,891 | 126% | 66 | $574 | 9.41 |
| Domiciliarios - Expancion - INTER | $30,000 | $35,794 | 119% | 51 | $702 | 3.56 |
| Domiciliarios VIDEO Q58 - | $30,000 | $32,884 | 110% | 32 | $1,028 | 3.07 |
| Domiciliarios INTER - API | $25,000 | $30,896 | 124% | 86 | $359 | 8.29 |
| Domiciliarios Q58 - | $25,000 | $30,884 | 124% | 30 | $1,029 | 3.27 |
| Domiciliarios VIDEO - API | $24,000 | $29,876 | 124% | 76 | $393 | 10.47 |
| Motorizados - Q58 | $29,000 | $29,729 | 103% | 27 | $1,101 | 2.35 |
| [EXP] Sur Lluvioso · Impermeable Tradicional | $24,000 | $28,187 | 117% | 34 | $829 | 4.99 |
| RADIO - Moteros | $25,000 | $27,278 | 109% | 13 | $2,098 | 2.45 |
| [EXP] Costa Caribe · V10 Intercomunicadores | $20,000 | $26,326 | 132% | 62 | $425 | 7.46 |
| Motorizados - API | $20,000 | $25,558 | 128% | 38 | $673 | 7.60 |
| TEST Creativos - API | $20,000 | $25,447 | 127% | 33 | $771 | 8.45 |
| RADIO - Fincas | $20,000 | $23,582 | 118% | 19 | $1,241 | 3.31 |
| Domiciliarios - Expancion - API | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios VIDEO INTER - API | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $586,441 | 816 | **$719** | $2,402 | **30%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$13,211**/pedido |
| utilidad estimada de lo que va del día | **$723,446** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-17 | 11-18 | 11-19 | 11-20 | 11-21 | 11-22 | |
|---|---|---|---|---|---|---|---|
| [EXP] Llanos y Boyacá · Radios Baofeng | — | — | — | — | $1,296 | $1,426 | 🟡 |
| RADIO - Seguridad / Negocios | $1,322 | $1,114 | $1,121 | $2,176 | $1,409 | $1,306 | 🟢 |
| Domiciliarios - API | $879 | $834 | $659 | $663 | $830 | $927 | 🟡 |
| Domiciliarios - Expancion - Q58 | $319 | $298 | $326 | $240 | $362 | $341 | 🟢 |
| Motorizados - INTER | $532 | $573 | $475 | $515 | $519 | $574 | 🟡 |
| Domiciliarios - Expancion - INTER | $640 | $611 | $728 | $633 | $661 | $702 | 🟡 |
| Domiciliarios VIDEO Q58 - | $773 | $1,101 | $891 | $1,035 | $949 | $1,028 | 🟡 |
| Domiciliarios INTER - API | $267 | $311 | $339 | $327 | $311 | $359 | 🔴 |
| Domiciliarios Q58 - | $1,035 | $1,137 | $1,133 | $1,364 | $1,112 | $1,029 | 🟢 |
| Domiciliarios VIDEO - API | $746 | $691 | $680 | $578 | $650 | $393 | 🟢 |
| Motorizados - Q58 | $744 | $589 | $664 | $739 | $784 | $1,101 | 🔴 |
| [EXP] Sur Lluvioso · Impermeable Tradicional | — | — | — | — | $824 | $829 | 🟡 |
| RADIO - Moteros | $1,801 | $1,565 | $1,834 | $1,894 | $1,933 | $2,098 | 🟡 |
| [EXP] Costa Caribe · V10 Intercomunicadores | — | — | — | — | $360 | $425 | 🔴 |
| Motorizados - API | $972 | $697 | $697 | $997 | $517 | $673 | 🔴 |
| TEST Creativos - API | $689 | $762 | $716 | $1,259 | $581 | $771 | 🔴 |
| RADIO - Fincas | $1,080 | $1,358 | $756 | $609 | $1,208 | $1,241 | 🟡 |
| Domiciliarios - Expancion - API | $834 | $879 | $859 | $1,010 | $755 | — | 🟢 |
| Domiciliarios VIDEO INTER - API | $919 | $1,018 | $1,067 | $860 | $781 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-17 | 11-18 | 11-19 | 11-20 | 11-21 | 11-22 | |
|---|---|---|---|---|---|---|---|
| [EXP] Llanos y Boyacá · Radios Baofeng | — | — | — | — | 1.41 | 1.63 | 🟢 |
| RADIO - Seguridad / Negocios | 2.50 | 2.89 | 2.81 | 1.60 | 2.48 | 2.76 | 🟢 |
| Domiciliarios - API | 5.57 | 7.12 | 10.08 | 8.89 | 7.43 | 5.73 | 🔴 |
| Domiciliarios - Expancion - Q58 | 8.95 | 9.95 | 9.76 | 13.35 | 6.40 | 8.75 | 🟢 |
| Motorizados - INTER | 10.22 | 10.80 | 11.41 | 11.01 | 8.75 | 9.41 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.15 | 3.73 | 2.61 | 3.27 | 2.99 | 3.56 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.16 | 2.18 | 2.51 | 2.47 | 2.37 | 3.07 | 🟢 |
| Domiciliarios INTER - API | 12.39 | 11.19 | 9.66 | 10.56 | 7.01 | 8.29 | 🟢 |
| Domiciliarios Q58 - | 3.11 | 2.38 | 2.14 | 1.78 | 2.38 | 3.27 | 🟢 |
| Domiciliarios VIDEO - API | 5.55 | 7.69 | 8.19 | 9.22 | 7.40 | 10.47 | 🟢 |
| Motorizados - Q58 | 3.35 | 4.00 | 3.74 | 3.51 | 2.76 | 2.35 | 🔴 |
| [EXP] Sur Lluvioso · Impermeable Tradicional | — | — | — | — | 4.87 | 4.99 | 🟡 |
| RADIO - Moteros | 3.67 | 4.30 | 2.70 | 2.81 | 2.29 | 2.45 | 🟢 |
| [EXP] Costa Caribe · V10 Intercomunicadores | — | — | — | — | 7.59 | 7.46 | 🟡 |
| Motorizados - API | 4.49 | 6.97 | 8.35 | 5.71 | 10.36 | 7.60 | 🔴 |
| TEST Creativos - API | 12.23 | 9.79 | 9.48 | 4.74 | 9.15 | 8.45 | 🟡 |
| RADIO - Fincas | 3.70 | 3.45 | 5.76 | 7.92 | 2.55 | 3.31 | 🟢 |
| Domiciliarios - Expancion - API | 6.25 | 7.27 | 7.74 | 6.75 | 9.27 | — | 🟢 |
| Domiciliarios VIDEO INTER - API | 5.38 | 5.03 | 4.30 | 5.30 | 5.69 | — | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-16 | $588,173 | 781 | $753 | $3,462 | 4.60 | $665,530 |
| 2026-11-17 | $355,036 | 497 | $714 | $3,836 | 5.37 | $442,775 |
| 2026-11-18 | $491,703 | 674 | $730 | $3,893 | 5.34 | $590,238 |
| 2026-11-19 | $396,366 | 543 | $730 | $3,642 | 4.99 | $475,287 |
| 2026-11-20 | $404,941 | 543 | $746 | $3,732 | 5.00 | $466,712 |
| 2026-11-21 | $415,892 | 584 | $712 | $3,109 | 4.37 | $521,576 |

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
