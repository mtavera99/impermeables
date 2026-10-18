# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-18 11:58 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$127,277** |
| gastado hoy (hasta las 11h) | $91,803 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $298,287 |
| saldo proyectado a medianoche | $-79,207 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $251,370 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–11:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-14 | $77,802 | 207 | **$376** | $3,428 | 9.12 |
| 2026-10-15 | $64,377 | 173 | **$372** | $3,095 | 8.32 |
| 2026-10-16 | $102,189 | 271 | **$377** | $3,201 | 8.49 |
| 2026-10-17 | $111,691 | 253 | **$441** | $3,242 | 7.34 |
| 2026-10-18 **HOY** | $91,803 | 212 | **$433** | $3,328 | 7.69 |

🟢 **Hoy va mejor que ayer a la misma hora** ($433 vs $441).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   433  =  $ 3,328  ÷  7.69
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,328 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.69 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $12,051 | 30% | 24 | $502 | 7.28 |
| TEST Creativos - API | $40,000 | $10,795 | 27% | 25 | $432 | 9.32 |
| Domiciliarios - API | $35,000 | $10,231 | 29% | 20 | $512 | 7.76 |
| Motorizados - Q58 | $20,000 | $7,413 | 37% | 17 | $436 | 7.54 |
| Domiciliarios - Expancion - Q58 | $20,000 | $6,620 | 33% | 8 | $828 | 4.09 |
| Domiciliarios VIDEO INTER - API | $20,000 | $6,094 | 30% | 14 | $435 | 7.80 |
| Domiciliarios VIDEO Q58 - | $20,000 | $6,063 | 30% | 6 | $1,010 | 2.99 |
| Domiciliarios INTER - API | $20,000 | $6,031 | 30% | 20 | $302 | 9.43 |
| Motorizados - INTER | $20,000 | $5,882 | 29% | 13 | $452 | 9.66 |
| Domiciliarios VIDEO - API | $20,000 | $5,777 | 29% | 17 | $340 | 10.06 |
| Motorizados - API | $20,000 | $5,653 | 28% | 12 | $471 | 7.27 |
| Domiciliarios Q58 - | $20,000 | $4,668 | 23% | 26 | $180 | 12.18 |
| Domiciliarios - Expancion - INTER | $20,000 | $4,525 | 23% | 10 | $452 | 4.82 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $91,803 | 212 | **$433** | $2,402 | **18%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$7,960**/pedido |
| utilidad estimada de lo que va del día | **$248,511** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $345 | $447 | $690 | $525 | $478 | $502 | 🟡 |
| TEST Creativos - API | $412 | $378 | $386 | $488 | $538 | $432 | 🟢 |
| Domiciliarios - API | $243 | $295 | $356 | $402 | $395 | $512 | 🔴 |
| Motorizados - Q58 | — | — | $584 | $690 | $546 | $436 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | $859 | $936 | $772 | $828 | 🟡 |
| Domiciliarios VIDEO INTER - API | $518 | $530 | $445 | $709 | $442 | $435 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | $354 | $380 | $566 | $1,010 | 🔴 |
| Domiciliarios INTER - API | $184 | $291 | $280 | $275 | $276 | $302 | 🟡 |
| Motorizados - INTER | $418 | $410 | $330 | $463 | $529 | $452 | 🟢 |
| Domiciliarios VIDEO - API | $254 | $257 | $289 | $366 | $356 | $340 | 🟡 |
| Motorizados - API | $284 | $278 | $380 | $344 | $349 | $471 | 🔴 |
| Domiciliarios Q58 - | — | — | $263 | $217 | $192 | $180 | 🟢 |
| Domiciliarios - Expancion - INTER | $428 | $569 | $387 | $567 | $428 | $452 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | 10-18 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | 10.87 | 7.43 | 4.46 | 6.55 | 7.27 | 7.28 | 🟡 |
| TEST Creativos - API | 14.12 | 12.48 | 10.16 | 7.69 | 7.14 | 9.32 | 🟢 |
| Domiciliarios - API | 16.04 | 12.23 | 9.35 | 8.72 | 9.00 | 7.76 | 🟡 |
| Motorizados - Q58 | — | — | 5.67 | 5.78 | 5.77 | 7.54 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | 3.50 | 3.76 | 4.01 | 4.09 | 🟡 |
| Domiciliarios VIDEO INTER - API | 6.42 | 5.73 | 7.26 | 4.79 | 7.73 | 7.80 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | 8.53 | 7.02 | 4.82 | 2.99 | 🔴 |
| Domiciliarios INTER - API | 11.97 | 7.92 | 8.40 | 9.03 | 9.06 | 9.43 | 🟡 |
| Motorizados - INTER | 8.70 | 9.36 | 11.53 | 8.26 | 7.19 | 9.66 | 🟢 |
| Domiciliarios VIDEO - API | 10.74 | 10.15 | 7.68 | 6.78 | 8.27 | 10.06 | 🟢 |
| Motorizados - API | 12.90 | 11.42 | 8.08 | 9.35 | 8.92 | 7.27 | 🔴 |
| Domiciliarios Q58 - | — | — | 15.07 | 14.87 | 13.18 | 12.18 | 🟡 |
| Domiciliarios - Expancion - INTER | 5.44 | 4.17 | 6.07 | 3.16 | 4.24 | 4.82 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-12 | $264,255 | 759 | $348 | $2,947 | 8.46 | $954,133 |
| 2026-10-13 | $246,905 | 791 | $312 | $3,492 | 11.19 | $1,022,851 |
| 2026-10-14 | $233,678 | 645 | $362 | $3,194 | 8.82 | $801,711 |
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,098 | 7.28 | $876,670 |
| 2026-10-17 | $310,814 | 743 | $418 | $3,083 | 7.37 | $881,890 |

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
