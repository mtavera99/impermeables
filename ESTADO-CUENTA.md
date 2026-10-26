# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-26 00:58 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$141,813** |
| gastado hoy (hasta las 0h) | $3,467 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $390,884 |
| saldo proyectado a medianoche | $-245,604 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🔴 RECARGAR $432,420 — entra en zona de freno a las 11:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–0:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-22 | $3,144 | 5 | **$629** | $3,945 | 6.27 |
| 2026-10-23 | $2,832 | 8 | **$354** | $3,966 | 11.20 |
| 2026-10-24 | $3,085 | 9 | **$343** | $3,562 | 10.39 |
| 2026-10-25 | $6,186 | 14 | **$442** | $2,943 | 6.66 |
| 2026-10-26 **HOY** | $3,467 | 9 | **$385** | $3,814 | 9.90 |

🟢 **Hoy va mejor que ayer a la misma hora** ($385 vs $442).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   385  =  $ 3,814  ÷  9.90
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,814 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.90 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | $25,000 | $543 | 2% | 1 | $543 | 6.37 |
| Domiciliarios VIDEO INTER - API | $25,000 | $442 | 2% | 0 | — | 0.00 |
| Domiciliarios - Expancion - API | $40,000 | $401 | 1% | 0 | — | 0.00 |
| Domiciliarios INTER - API | $25,000 | $341 | 1% | 1 | $341 | 10.10 |
| Domiciliarios - API | $35,000 | $303 | 1% | 0 | — | 0.00 |
| RADIO - Moteros | $20,000 | $292 | 1% | 1 | $292 | 21.28 |
| Domiciliarios VIDEO - API | $20,000 | $275 | 1% | 1 | $275 | 12.99 |
| Motorizados - Q58 | $20,000 | $212 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO Q58 - | $25,000 | $178 | 1% | 2 | $89 | 60.61 |
| Motorizados - API | $20,000 | $108 | 1% | 0 | — | 0.00 |
| Motorizados - INTER | $25,000 | $98 | 0% | 0 | — | 0.00 |
| TEST Creativos - API | $20,000 | $65 | 0% | 0 | — | 0.00 |
| Domiciliarios - Expancion - Q58 | $20,000 | $63 | 0% | 1 | $63 | 55.56 |
| RADIO - Seguridad / Negocios | $25,000 | $52 | 0% | 1 | $52 | 47.62 |
| Domiciliarios Q58 - | $25,000 | $51 | 0% | 1 | $51 | 38.46 |
| RADIO - Fincas | $20,000 | $43 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $3,467 | 9 | **$385** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,081**/pedido |
| utilidad estimada de lo que va del día | **$10,980** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | $604 | $721 | $662 | $594 | $521 | $543 | 🟡 |
| Domiciliarios VIDEO INTER - API | $701 | $742 | $646 | $490 | $655 | — | 🔴 |
| Domiciliarios - Expancion - API | $424 | $444 | $517 | $691 | $515 | — | 🟢 |
| Domiciliarios INTER - API | $304 | $314 | $332 | $461 | $358 | $341 | 🟡 |
| Domiciliarios - API | $348 | $370 | $417 | $489 | $430 | — | 🟢 |
| RADIO - Moteros | — | — | — | $919 | $916 | $292 | 🟢 |
| Domiciliarios VIDEO - API | $269 | $292 | $337 | $383 | $329 | $275 | 🟢 |
| Motorizados - Q58 | $1,025 | $599 | $514 | $547 | $833 | — | 🔴 |
| Domiciliarios VIDEO Q58 - | $995 | $1,091 | $679 | $795 | $821 | $89 | 🟢 |
| Motorizados - API | $446 | $379 | $456 | $436 | $426 | — | 🟡 |
| Motorizados - INTER | $460 | $545 | $714 | $595 | $824 | — | 🔴 |
| TEST Creativos - API | $535 | $379 | $480 | $395 | $526 | — | 🔴 |
| Domiciliarios - Expancion - Q58 | $1,077 | $892 | $1,117 | $876 | $284 | $63 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | $1,169 | $734 | $52 | 🟢 |
| Domiciliarios Q58 - | $197 | $159 | $217 | $204 | $182 | $51 | 🟢 |
| RADIO - Fincas | — | — | — | $630 | $426 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | 5.33 | 4.21 | 4.83 | 4.70 | 6.03 | 6.37 | 🟢 |
| Domiciliarios VIDEO INTER - API | 5.98 | 5.52 | 6.43 | 8.56 | 6.08 | — | 🔴 |
| Domiciliarios - Expancion - API | 11.99 | 10.38 | 8.14 | 5.47 | 8.58 | — | 🟢 |
| Domiciliarios INTER - API | 12.17 | 9.39 | 7.57 | 6.56 | 8.25 | 10.10 | 🟢 |
| Domiciliarios - API | 14.10 | 12.13 | 9.61 | 8.16 | 10.64 | — | 🟢 |
| RADIO - Moteros | — | — | — | 5.63 | 4.19 | 21.28 | 🟢 |
| Domiciliarios VIDEO - API | 14.69 | 10.98 | 9.18 | 7.54 | 10.08 | 12.99 | 🟢 |
| Motorizados - Q58 | 3.32 | 5.14 | 5.82 | 5.28 | 3.68 | — | 🔴 |
| Domiciliarios VIDEO Q58 - | 3.19 | 2.96 | 4.98 | 4.11 | 4.86 | 60.61 | 🟢 |
| Motorizados - API | 9.31 | 10.45 | 8.59 | 8.65 | 9.64 | — | 🟢 |
| Motorizados - INTER | 13.59 | 11.01 | 8.00 | 8.89 | 6.66 | — | 🔴 |
| TEST Creativos - API | 11.03 | 14.31 | 8.92 | 8.50 | 6.96 | — | 🔴 |
| Domiciliarios - Expancion - Q58 | 3.65 | 4.52 | 3.93 | 4.47 | 8.82 | 55.56 | 🟢 |
| RADIO - Seguridad / Negocios | — | — | — | 4.13 | 5.60 | 47.62 | 🟢 |
| Domiciliarios Q58 - | 11.07 | 12.89 | 10.68 | 10.24 | 11.62 | 38.46 | 🟢 |
| RADIO - Fincas | — | — | — | 8.62 | 9.53 | — | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,847 | 750 | $513 | $3,525 | 6.87 | $819,094 |
| 2026-10-25 | $399,258 | 884 | $452 | $3,561 | 7.89 | $1,019,787 |

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
