# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-17 01:39 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$194,769** |
| gastado hoy (hasta las 1h) | $5,879 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $268,174 |
| saldo proyectado a medianoche | $-67,526 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $269,802 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–1:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-13 | $15,104 | 35 | **$432** | $2,831 | 6.56 |
| 2026-10-14 | $3,434 | 11 | **$312** | $3,681 | 11.79 |
| 2026-10-15 | $2,707 | 7 | **$387** | $3,035 | 7.85 |
| 2026-10-16 | $5,050 | 13 | **$388** | $2,997 | 7.72 |
| 2026-10-17 **HOY** | $5,879 | 20 | **$294** | $3,096 | 10.53 |

🟢 **Hoy va mejor que ayer a la misma hora** ($294 vs $388).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   294  =  $ 3,096  ÷  10.53
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,096 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 10.53 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Motorizados - Q58 | $20,000 | $921 | 5% | 3 | $307 | 13.04 |
| Domiciliarios - Expancion - Q58 | $20,000 | $913 | 5% | 2 | $456 | 5.90 |
| Domiciliarios VIDEO Q58 - | $20,000 | $735 | 4% | 3 | $245 | 10.68 |
| Motorizados - INTER | $20,000 | $673 | 3% | 1 | $673 | 18.87 |
| Domiciliarios Q58 - | $20,000 | $569 | 3% | 4 | $142 | 16.81 |
| Domiciliarios - API | $35,000 | $318 | 1% | 4 | $80 | 50.63 |
| Motorizados - API | $20,000 | $312 | 2% | 0 | — | 0.00 |
| Domiciliarios - Expancion - API | $40,000 | $309 | 1% | 1 | $309 | 10.99 |
| Domiciliarios - Expancion - INTER | $20,000 | $305 | 2% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $248 | 1% | 1 | $248 | 11.63 |
| Domiciliarios INTER - API | $20,000 | $217 | 1% | 1 | $217 | 11.11 |
| TEST Creativos - API | $40,000 | $191 | 0% | 0 | — | 0.00 |
| Domiciliarios VIDEO INTER - API | $20,000 | $168 | 1% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $5,879 | 20 | **$294** | $2,402 | **12%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$5,403**/pedido |
| utilidad estimada de lo que va del día | **$26,226** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| Motorizados - Q58 | — | — | — | $584 | $690 | $307 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | $859 | $936 | $456 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | $354 | $380 | $245 | 🟢 |
| Motorizados - INTER | $389 | $418 | $410 | $330 | $463 | $673 | 🔴 |
| Domiciliarios Q58 - | — | — | — | $263 | $217 | $142 | 🟢 |
| Domiciliarios - API | $361 | $243 | $295 | $356 | $402 | $80 | 🟢 |
| Motorizados - API | $265 | $284 | $278 | $380 | $344 | — | 🟢 |
| Domiciliarios - Expancion - API | $400 | $345 | $447 | $690 | $525 | $309 | 🟢 |
| Domiciliarios - Expancion - INTER | $436 | $428 | $569 | $387 | $567 | — | 🔴 |
| Domiciliarios VIDEO - API | $269 | $254 | $257 | $289 | $366 | $248 | 🟢 |
| Domiciliarios INTER - API | $206 | $184 | $291 | $280 | $275 | $217 | 🟢 |
| TEST Creativos - API | $509 | $412 | $378 | $386 | $488 | — | 🔴 |
| Domiciliarios VIDEO INTER - API | $373 | $518 | $530 | $445 | $709 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| Motorizados - Q58 | — | — | — | 5.67 | 5.82 | 13.04 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | 3.50 | 3.79 | 5.90 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | 8.53 | 7.07 | 10.68 | 🟢 |
| Motorizados - INTER | 7.90 | 8.70 | 9.36 | 11.53 | 8.38 | 18.87 | 🟢 |
| Domiciliarios Q58 - | — | — | — | 15.07 | 14.95 | 16.81 | 🟢 |
| Domiciliarios - API | 9.25 | 16.04 | 12.23 | 9.35 | 8.80 | 50.63 | 🟢 |
| Motorizados - API | 11.48 | 12.90 | 11.42 | 8.08 | 9.44 | — | 🟢 |
| Domiciliarios - Expancion - API | 7.99 | 10.87 | 7.43 | 4.46 | 6.62 | 10.99 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.53 | 5.44 | 4.17 | 6.07 | 3.17 | — | 🔴 |
| Domiciliarios VIDEO - API | 9.30 | 10.74 | 10.15 | 7.68 | 6.85 | 11.63 | 🟢 |
| Domiciliarios INTER - API | 9.32 | 11.97 | 7.92 | 8.40 | 9.15 | 11.11 | 🟢 |
| TEST Creativos - API | 9.47 | 14.12 | 12.48 | 10.16 | 7.75 | — | 🔴 |
| Domiciliarios VIDEO INTER - API | 7.58 | 6.42 | 5.73 | 7.26 | 4.83 | — | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-11 | $235,745 | 555 | $425 | $3,167 | 7.46 | $655,171 |
| 2026-10-12 | $264,255 | 759 | $348 | $2,947 | 8.46 | $954,133 |
| 2026-10-13 | $246,905 | 791 | $312 | $3,492 | 11.19 | $1,022,851 |
| 2026-10-14 | $233,678 | 645 | $362 | $3,194 | 8.82 | $801,711 |
| 2026-10-15 | $216,313 | 561 | $386 | $3,059 | 7.93 | $684,235 |
| 2026-10-16 | $316,034 | 743 | $425 | $3,125 | 7.35 | $876,670 |

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
