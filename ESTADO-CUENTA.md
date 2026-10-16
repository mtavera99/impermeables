# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-16 07:35 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$138,642** |
| gastado hoy (hasta las 7h) | $29,438 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $225,240 |
| saldo proyectado a medianoche | $-57,160 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $302,370 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–7:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-12 | $26,968 | 75 | **$360** | $3,095 | 8.61 |
| 2026-10-13 | $53,895 | 130 | **$415** | $3,122 | 7.53 |
| 2026-10-14 | $30,944 | 89 | **$348** | $3,262 | 9.38 |
| 2026-10-15 | $26,204 | 81 | **$324** | $2,926 | 9.04 |
| 2026-10-16 **HOY** | $29,438 | 92 | **$320** | $2,901 | 9.07 |

🟢 **Hoy va mejor que ayer a la misma hora** ($320 vs $324).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   320  =  $ 2,901  ÷  9.07
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,901 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.07 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | $20,000 | $8,212 | 41% | 33 | $249 | 11.68 |
| Domiciliarios VIDEO Q58 - | $20,000 | $3,408 | 17% | 13 | $262 | 10.35 |
| Domiciliarios - Expancion - API | $40,000 | $2,467 | 6% | 6 | $411 | 8.24 |
| TEST Creativos - API | $40,000 | $2,374 | 6% | 4 | $594 | 4.73 |
| Domiciliarios VIDEO INTER - API | $20,000 | $1,938 | 10% | 2 | $969 | 3.36 |
| Domiciliarios - API | $35,000 | $1,879 | 5% | 4 | $470 | 7.42 |
| Motorizados - Q58 | $20,000 | $1,700 | 8% | 1 | $1,700 | 2.12 |
| Domiciliarios VIDEO - API | $20,000 | $1,583 | 8% | 8 | $198 | 11.92 |
| Domiciliarios - Expancion - INTER | $20,000 | $1,568 | 8% | 5 | $314 | 6.61 |
| Motorizados - API | $20,000 | $1,320 | 7% | 8 | $165 | 20.20 |
| Domiciliarios INTER - API | $20,000 | $1,143 | 6% | 6 | $190 | 11.52 |
| Motorizados - INTER | $20,000 | $1,032 | 5% | 2 | $516 | 6.92 |
| Domiciliarios - Expancion - Q58 | $20,000 | $814 | 4% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $29,438 | 92 | **$320** | $2,402 | **13%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$5,882**/pedido |
| utilidad estimada de lo que va del día | **$118,245** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | — | — | — | — | $261 | $249 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | — | — | $351 | $262 | 🟢 |
| Domiciliarios - Expancion - API | $550 | $400 | $345 | $447 | $687 | $411 | 🟢 |
| TEST Creativos - API | $510 | $509 | $412 | $377 | $386 | $594 | 🔴 |
| Domiciliarios VIDEO INTER - API | $515 | $373 | $518 | $530 | $443 | $969 | 🔴 |
| Domiciliarios - API | $451 | $361 | $243 | $295 | $355 | $470 | 🔴 |
| Motorizados - Q58 | — | — | — | — | $576 | $1,700 | 🔴 |
| Domiciliarios VIDEO - API | $276 | $269 | $254 | $257 | $288 | $198 | 🟢 |
| Domiciliarios - Expancion - INTER | $603 | $436 | $428 | $569 | $385 | $314 | 🟢 |
| Motorizados - API | $447 | $265 | $284 | $278 | $375 | $165 | 🟢 |
| Domiciliarios INTER - API | $242 | $206 | $184 | $291 | $277 | $190 | 🟢 |
| Motorizados - INTER | $365 | $389 | $418 | $410 | $329 | $516 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | — | — | $854 | — |  |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | — | — | — | — | 15.26 | 11.68 | 🔴 |
| Domiciliarios VIDEO Q58 - | — | — | — | — | 8.61 | 10.35 | 🟢 |
| Domiciliarios - Expancion - API | 6.36 | 7.99 | 10.87 | 7.43 | 4.48 | 8.24 | 🟢 |
| TEST Creativos - API | 8.95 | 9.47 | 14.12 | 12.49 | 10.19 | 4.73 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.48 | 7.58 | 6.42 | 5.73 | 7.29 | 3.36 | 🔴 |
| Domiciliarios - API | 7.58 | 9.25 | 16.04 | 12.23 | 9.40 | 7.42 | 🔴 |
| Motorizados - Q58 | — | — | — | — | 5.73 | 2.12 | 🔴 |
| Domiciliarios VIDEO - API | 9.99 | 9.30 | 10.74 | 10.15 | 7.71 | 11.92 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.35 | 4.53 | 5.44 | 4.17 | 6.09 | 6.61 | 🟢 |
| Motorizados - API | 6.89 | 11.48 | 12.90 | 11.42 | 8.13 | 20.20 | 🟢 |
| Domiciliarios INTER - API | 9.48 | 9.32 | 11.97 | 7.92 | 8.48 | 11.52 | 🟢 |
| Motorizados - INTER | 10.05 | 7.90 | 8.70 | 9.36 | 11.59 | 6.92 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | — | — | 3.52 | — |  |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-10 | $185,284 | 496 | $374 | $3,442 | 9.21 | $610,922 |
| 2026-10-11 | $235,745 | 555 | $425 | $3,167 | 7.46 | $655,171 |
| 2026-10-12 | $264,255 | 759 | $348 | $2,947 | 8.46 | $954,133 |
| 2026-10-13 | $246,905 | 791 | $312 | $3,492 | 11.19 | $1,022,851 |
| 2026-10-14 | $233,531 | 645 | $362 | $3,192 | 8.82 | $801,858 |
| 2026-10-15 | $215,220 | 561 | $384 | $3,060 | 7.98 | $685,328 |

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
