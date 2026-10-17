# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-17 10:42 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$117,320** |
| gastado hoy (hasta las 10h) | $83,120 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $278,644 |
| saldo proyectado a medianoche | $-78,204 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $270,010 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–10:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-13 | $96,085 | 267 | **$360** | $3,342 | 9.29 |
| 2026-10-14 | $63,242 | 173 | **$366** | $3,409 | 9.33 |
| 2026-10-15 | $54,704 | 153 | **$358** | $3,081 | 8.62 |
| 2026-10-16 | $86,596 | 243 | **$356** | $3,168 | 8.89 |
| 2026-10-17 **HOY** | $82,844 | 181 | **$458** | $3,159 | 6.90 |

🟠 Hoy va 28% más caro que ayer a la misma hora ($458 vs $356).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   458  =  $ 3,159  ÷  6.90
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,159 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.90 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $10,899 | 27% | 9 | $1,211 | 3.62 |
| Domiciliarios - API | $35,000 | $10,151 | 29% | 25 | $406 | 9.61 |
| Domiciliarios - Expancion - API | $40,000 | $9,677 | 24% | 18 | $538 | 6.90 |
| Motorizados - Q58 | $20,000 | $6,776 | 34% | 14 | $484 | 6.20 |
| Domiciliarios - Expancion - Q58 | $20,000 | $6,450 | 32% | 10 | $645 | 4.50 |
| Domiciliarios VIDEO Q58 - | $20,000 | $6,140 | 31% | 12 | $512 | 4.91 |
| Domiciliarios VIDEO - API | $20,000 | $5,602 | 28% | 14 | $400 | 7.39 |
| Motorizados - API | $20,000 | $5,499 | 27% | 9 | $611 | 5.62 |
| Domiciliarios Q58 - | $20,000 | $4,777 | 24% | 18 | $265 | 9.23 |
| Domiciliarios VIDEO INTER - API | $20,000 | $4,515 | 23% | 9 | $502 | 6.89 |
| Domiciliarios - Expancion - INTER | $20,000 | $4,457 | 22% | 15 | $297 | 6.00 |
| Domiciliarios INTER - API | $20,000 | $4,239 | 21% | 22 | $193 | 13.64 |
| Motorizados - INTER | $20,000 | $3,884 | 19% | 8 | $486 | 9.79 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $83,066 | 183 | **$454** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,344**/pedido |
| utilidad estimada de lo que va del día | **$210,696** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $509 | $412 | $378 | $386 | $488 | $1,211 | 🔴 |
| Domiciliarios - API | $361 | $243 | $295 | $356 | $402 | $406 | 🟡 |
| Domiciliarios - Expancion - API | $400 | $345 | $447 | $690 | $525 | $538 | 🟡 |
| Motorizados - Q58 | — | — | — | $584 | $690 | $484 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | $859 | $936 | $645 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | $354 | $380 | $512 | 🔴 |
| Domiciliarios VIDEO - API | $269 | $254 | $257 | $289 | $366 | $400 | 🟡 |
| Motorizados - API | $265 | $284 | $278 | $380 | $344 | $611 | 🔴 |
| Domiciliarios Q58 - | — | — | — | $263 | $217 | $265 | 🔴 |
| Domiciliarios VIDEO INTER - API | $373 | $518 | $530 | $445 | $709 | $502 | 🟢 |
| Domiciliarios - Expancion - INTER | $436 | $428 | $569 | $387 | $567 | $297 | 🟢 |
| Domiciliarios INTER - API | $206 | $184 | $291 | $280 | $275 | $194 | 🟢 |
| Motorizados - INTER | $389 | $418 | $410 | $330 | $463 | $486 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.47 | 14.12 | 12.48 | 10.16 | 7.70 | 3.62 | 🔴 |
| Domiciliarios - API | 9.25 | 16.04 | 12.23 | 9.35 | 8.75 | 9.61 | 🟢 |
| Domiciliarios - Expancion - API | 7.99 | 10.87 | 7.43 | 4.46 | 6.57 | 6.90 | 🟢 |
| Motorizados - Q58 | — | — | — | 5.67 | 5.78 | 6.20 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | 3.50 | 3.77 | 4.50 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | 8.53 | 7.03 | 4.91 | 🔴 |
| Domiciliarios VIDEO - API | 9.30 | 10.74 | 10.15 | 7.68 | 6.80 | 7.39 | 🟢 |
| Motorizados - API | 11.48 | 12.90 | 11.42 | 8.08 | 9.38 | 5.62 | 🔴 |
| Domiciliarios Q58 - | — | — | — | 15.07 | 14.89 | 9.23 | 🔴 |
| Domiciliarios VIDEO INTER - API | 7.58 | 6.42 | 5.73 | 7.26 | 4.79 | 6.89 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.53 | 5.44 | 4.17 | 6.07 | 3.16 | 6.00 | 🟢 |
| Domiciliarios INTER - API | 9.32 | 11.97 | 7.92 | 8.40 | 9.08 | 13.50 | 🟢 |
| Motorizados - INTER | 7.90 | 8.70 | 9.36 | 11.53 | 8.30 | 9.79 | 🟢 |

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
| 2026-10-16 | $316,034 | 743 | $425 | $3,105 | 7.30 | $876,670 |

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
