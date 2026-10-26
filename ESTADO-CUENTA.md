# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-26 02:59 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$137,196** |
| gastado hoy (hasta las 2h) | $7,704 |
| presupuesto activo | $390,000/día |
| cierre proyectado del día | $391,461 |
| saldo proyectado a medianoche | $-246,561 |
| objetivo (cubrir un día de 143% + colchón) | $577,700 |

### 🔴 RECARGAR $432,800 — entra en zona de freno a las 11:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–2:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-22 | $6,397 | 19 | **$337** | $4,127 | 12.26 |
| 2026-10-23 | $5,582 | 16 | **$349** | $3,805 | 10.91 |
| 2026-10-24 | $6,104 | 14 | **$436** | $3,704 | 8.50 |
| 2026-10-25 | $10,916 | 26 | **$420** | $2,999 | 7.14 |
| 2026-10-26 **HOY** | $7,704 | 20 | **$385** | $3,842 | 9.98 |

🟢 **Hoy va mejor que ayer a la misma hora** ($385 vs $420).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   385  =  $ 3,842  ÷  9.98
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,842 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.98 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | $25,000 | $1,085 | 4% | 1 | $1,085 | 2.88 |
| Domiciliarios - Expancion - API | $40,000 | $1,052 | 3% | 2 | $526 | 10.31 |
| Domiciliarios INTER - API | $25,000 | $895 | 4% | 1 | $895 | 3.91 |
| Domiciliarios VIDEO - API | $20,000 | $725 | 4% | 2 | $362 | 10.99 |
| Domiciliarios VIDEO INTER - API | $25,000 | $666 | 3% | 1 | $666 | 6.54 |
| Domiciliarios - API | $35,000 | $595 | 2% | 2 | $298 | 14.71 |
| Motorizados - API | $20,000 | $559 | 3% | 0 | — | 0.00 |
| RADIO - Moteros | $20,000 | $525 | 3% | 2 | $262 | 15.50 |
| Motorizados - Q58 | $20,000 | $522 | 3% | 1 | $522 | 5.81 |
| Domiciliarios VIDEO Q58 - | $25,000 | $359 | 1% | 2 | $180 | 28.17 |
| TEST Creativos - API | $20,000 | $188 | 1% | 1 | $188 | 23.26 |
| Motorizados - INTER | $25,000 | $143 | 1% | 0 | — | 0.00 |
| RADIO - Seguridad / Negocios | $25,000 | $143 | 1% | 1 | $143 | 23.26 |
| Domiciliarios Q58 - | $25,000 | $97 | 0% | 2 | $48 | 40.82 |
| Domiciliarios - Expancion - Q58 | $20,000 | $95 | 0% | 2 | $48 | 57.14 |
| RADIO - Fincas | $20,000 | $55 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $7,704 | 20 | **$385** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,081**/pedido |
| utilidad estimada de lo que va del día | **$24,401** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | $604 | $721 | $662 | $594 | $522 | $1,085 | 🔴 |
| Domiciliarios - Expancion - API | $424 | $444 | $517 | $691 | $515 | $526 | 🟡 |
| Domiciliarios INTER - API | $304 | $314 | $332 | $461 | $359 | $895 | 🔴 |
| Domiciliarios VIDEO - API | $269 | $292 | $337 | $383 | $330 | $362 | 🟡 |
| Domiciliarios VIDEO INTER - API | $701 | $742 | $646 | $490 | $655 | $666 | 🟡 |
| Domiciliarios - API | $348 | $370 | $417 | $489 | $430 | $298 | 🟢 |
| Motorizados - API | $446 | $379 | $456 | $436 | $426 | — | 🟡 |
| RADIO - Moteros | — | — | — | $919 | $919 | $262 | 🟢 |
| Motorizados - Q58 | $1,025 | $599 | $514 | $547 | $833 | $522 | 🟢 |
| Domiciliarios VIDEO Q58 - | $995 | $1,091 | $679 | $795 | $822 | $180 | 🟢 |
| TEST Creativos - API | $535 | $379 | $480 | $395 | $526 | $188 | 🟢 |
| Motorizados - INTER | $460 | $545 | $714 | $595 | $824 | — | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | $1,169 | $734 | $143 | 🟢 |
| Domiciliarios Q58 - | $197 | $159 | $217 | $204 | $182 | $48 | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,077 | $892 | $1,117 | $876 | $284 | $48 | 🟢 |
| RADIO - Fincas | — | — | — | $630 | $427 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-21 | 10-22 | 10-23 | 10-24 | 10-25 | 10-26 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - INTER | 5.33 | 4.21 | 4.83 | 4.70 | 6.01 | 2.88 | 🔴 |
| Domiciliarios - Expancion - API | 11.99 | 10.38 | 8.14 | 5.47 | 8.57 | 10.31 | 🟢 |
| Domiciliarios INTER - API | 12.17 | 9.39 | 7.57 | 6.56 | 8.23 | 3.91 | 🔴 |
| Domiciliarios VIDEO - API | 14.69 | 10.98 | 9.18 | 7.54 | 10.06 | 10.99 | 🟢 |
| Domiciliarios VIDEO INTER - API | 5.98 | 5.52 | 6.43 | 8.56 | 6.08 | 6.54 | 🟢 |
| Domiciliarios - API | 14.10 | 12.13 | 9.61 | 8.16 | 10.63 | 14.71 | 🟢 |
| Motorizados - API | 9.31 | 10.45 | 8.59 | 8.65 | 9.63 | — | 🟢 |
| RADIO - Moteros | — | — | — | 5.63 | 4.19 | 15.50 | 🟢 |
| Motorizados - Q58 | 3.32 | 5.14 | 5.82 | 5.28 | 3.67 | 5.81 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.19 | 2.96 | 4.98 | 4.11 | 4.86 | 28.17 | 🟢 |
| TEST Creativos - API | 11.03 | 14.31 | 8.92 | 8.50 | 6.95 | 23.26 | 🟢 |
| Motorizados - INTER | 13.59 | 11.01 | 8.00 | 8.89 | 6.65 | — | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | 4.13 | 5.60 | 23.26 | 🟢 |
| Domiciliarios Q58 - | 11.07 | 12.89 | 10.68 | 10.24 | 11.60 | 40.82 | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.65 | 4.52 | 3.93 | 4.47 | 8.81 | 57.14 | 🟢 |
| RADIO - Fincas | — | — | — | 8.62 | 9.52 | — | 🟢 |

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
| 2026-10-25 | $399,687 | 884 | $452 | $3,560 | 7.87 | $1,019,358 |

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
