# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-26 08:17 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$75,418** |
| gastado hoy (hasta las 8h) | $66,383 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $380,468 |
| saldo proyectado a medianoche | $-238,668 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🔴 RECARGAR $435,899 — entra en zona de freno a las 11:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–8:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-22 | $67,906 | 164 | **$414** | $3,831 | 9.25 |
| 2026-10-23 | $49,485 | 114 | **$434** | $3,308 | 7.62 |
| 2026-10-24 | $81,043 | 141 | **$575** | $3,431 | 5.97 |
| 2026-10-25 | $77,567 | 176 | **$441** | $3,315 | 7.52 |
| 2026-10-26 **HOY** | $66,383 | 136 | **$488** | $3,310 | 6.78 |

🟠 Hoy va 11% más caro que ayer a la misma hora ($488 vs $441).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   488  =  $ 3,310  ÷  6.78
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,310 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.78 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $7,583 | 19% | 12 | $632 | 6.11 |
| Domiciliarios - API | $35,000 | $6,462 | 18% | 16 | $404 | 10.30 |
| Domiciliarios INTER - API | $25,000 | $5,570 | 22% | 13 | $428 | 7.00 |
| Domiciliarios - Expancion - INTER | $25,000 | $4,894 | 20% | 3 | $1,631 | 1.92 |
| Domiciliarios VIDEO - API | $20,000 | $4,792 | 24% | 17 | $282 | 9.73 |
| Motorizados - API | $20,000 | $4,456 | 22% | 5 | $891 | 3.93 |
| TEST Creativos - API | $20,000 | $4,244 | 21% | 9 | $472 | 8.08 |
| Domiciliarios VIDEO Q58 - | $25,000 | $4,152 | 17% | 6 | $692 | 6.13 |
| Domiciliarios VIDEO INTER - API | $25,000 | $3,908 | 16% | 12 | $326 | 10.69 |
| RADIO - Fincas | $20,000 | $3,847 | 19% | 4 | $962 | 3.86 |
| Domiciliarios Q58 - | $25,000 | $3,660 | 15% | 15 | $244 | 7.44 |
| Motorizados - Q58 | $20,000 | $3,613 | 18% | 5 | $723 | 3.98 |
| RADIO - Seguridad / Negocios | $25,000 | $3,611 | 14% | 6 | $602 | 6.42 |
| Motorizados - INTER | $25,000 | $1,967 | 8% | 1 | $1,967 | 2.47 |
| RADIO - Moteros | $20,000 | $1,935 | 10% | 4 | $484 | 7.38 |
| Domiciliarios - Expancion - Q58 | $20,000 | $1,689 | 8% | 7 | $241 | 9.99 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $66,383 | 135 | **$492** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,039**/pedido |
| utilidad estimada de lo que va del día | **$150,326** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $424 | $444 | $517 | $691 | $517 | $632 | 🔴 |
| Domiciliarios - API | $348 | $370 | $417 | $489 | $432 | $404 | 🟢 |
| Domiciliarios INTER - API | $304 | $314 | $332 | $462 | $361 | $428 | 🔴 |
| Domiciliarios - Expancion - INTER | $604 | $721 | $662 | $594 | $524 | $1,631 | 🔴 |
| Domiciliarios VIDEO - API | $269 | $292 | $337 | $383 | $331 | $282 | 🟢 |
| Motorizados - API | $446 | $379 | $456 | $436 | $430 | $891 | 🔴 |
| TEST Creativos - API | $535 | $379 | $480 | $395 | $526 | $472 | 🟢 |
| Domiciliarios VIDEO Q58 - | $995 | $1,091 | $679 | $795 | $826 | $692 | 🟢 |
| Domiciliarios VIDEO INTER - API | $701 | $742 | $646 | $490 | $659 | $326 | 🟢 |
| RADIO - Fincas | — | — | — | $630 | $430 | $962 | 🔴 |
| Domiciliarios Q58 - | $197 | $159 | $217 | $204 | $183 | $244 | 🔴 |
| Motorizados - Q58 | $1,025 | $599 | $514 | $547 | $835 | $723 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | $1,169 | $744 | $602 | 🟢 |
| Motorizados - INTER | $460 | $545 | $714 | $595 | $832 | $1,967 | 🔴 |
| RADIO - Moteros | — | — | — | $919 | $923 | $484 | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,077 | $892 | $1,117 | $876 | $285 | $241 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 11.99 | 10.38 | 8.14 | 5.47 | 8.54 | 6.11 | 🔴 |
| Domiciliarios - API | 14.10 | 12.13 | 9.61 | 8.16 | 10.57 | 10.30 | 🟡 |
| Domiciliarios INTER - API | 12.17 | 9.39 | 7.57 | 6.56 | 8.17 | 7.00 | 🟡 |
| Domiciliarios - Expancion - INTER | 5.33 | 4.21 | 4.83 | 4.70 | 5.99 | 1.92 | 🔴 |
| Domiciliarios VIDEO - API | 14.69 | 10.98 | 9.18 | 7.54 | 9.99 | 9.73 | 🟡 |
| Motorizados - API | 9.31 | 10.45 | 8.59 | 8.65 | 9.59 | 3.93 | 🔴 |
| TEST Creativos - API | 11.03 | 14.31 | 8.92 | 8.50 | 6.95 | 8.08 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.19 | 2.96 | 4.98 | 4.11 | 4.83 | 6.13 | 🟢 |
| Domiciliarios VIDEO INTER - API | 5.98 | 5.52 | 6.43 | 8.56 | 6.05 | 10.69 | 🟢 |
| RADIO - Fincas | — | — | — | 8.62 | 9.44 | 3.86 | 🔴 |
| Domiciliarios Q58 - | 11.07 | 12.89 | 10.68 | 10.24 | 11.52 | 7.44 | 🔴 |
| Motorizados - Q58 | 3.32 | 5.14 | 5.82 | 5.28 | 3.67 | 3.98 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | 4.13 | 5.54 | 6.42 | 🟢 |
| Motorizados - INTER | 13.59 | 11.01 | 8.00 | 8.89 | 6.58 | 2.47 | 🔴 |
| RADIO - Moteros | — | — | — | 5.63 | 4.16 | 7.38 | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.65 | 4.52 | 3.93 | 4.47 | 8.75 | 9.99 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,856 | 750 | $513 | $3,525 | 6.87 | $819,085 |
| 2026-10-25 | $401,925 | 884 | $455 | $3,560 | 7.83 | $1,017,120 |

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
