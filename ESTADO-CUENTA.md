# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-16 01:42 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$165,189** |
| gastado hoy (hasta las 1h) | $4,068 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $224,831 |
| saldo proyectado a medianoche | $-55,574 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $301,193 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–1:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-12 | $5,528 | 18 | **$307** | $2,730 | 8.89 |
| 2026-10-13 | $15,104 | 35 | **$432** | $2,831 | 6.56 |
| 2026-10-14 | $3,434 | 11 | **$312** | $3,681 | 11.79 |
| 2026-10-15 | $2,707 | 7 | **$387** | $3,035 | 7.85 |
| 2026-10-16 **HOY** | $4,068 | 11 | **$370** | $3,025 | 8.18 |

🟢 **Hoy va mejor que ayer a la misma hora** ($370 vs $387).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   370  =  $ 3,025  ÷  8.18
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,025 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.18 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | $20,000 | $1,723 | 9% | 3 | $574 | 5.12 |
| Domiciliarios VIDEO Q58 - | $20,000 | $324 | 2% | 0 | — | 0.00 |
| Domiciliarios - Expancion - INTER | $20,000 | $298 | 1% | 3 | $99 | 24.39 |
| TEST Creativos - API | $40,000 | $281 | 1% | 0 | — | 0.00 |
| Motorizados - Q58 | $20,000 | $281 | 1% | 0 | — | 0.00 |
| Domiciliarios - API | $35,000 | $233 | 1% | 0 | — | 0.00 |
| Domiciliarios - Expancion - API | $40,000 | $222 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO INTER - API | $20,000 | $186 | 1% | 0 | — | 0.00 |
| Domiciliarios INTER - API | $20,000 | $157 | 1% | 4 | $39 | 70.18 |
| Motorizados - INTER | $20,000 | $128 | 1% | 1 | $128 | 19.61 |
| Motorizados - API | $20,000 | $86 | 0% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $78 | 0% | 0 | — | 0.00 |
| Domiciliarios - Expancion - Q58 | $20,000 | $71 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $4,068 | 11 | **$370** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,798**/pedido |
| utilidad estimada de lo que va del día | **$13,590** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | — | — | — | — | $258 | $574 | 🔴 |
| Domiciliarios VIDEO Q58 - | — | — | — | — | $347 | — |  |
| Domiciliarios - Expancion - INTER | $603 | $436 | $428 | $569 | $385 | $99 | 🟢 |
| TEST Creativos - API | $510 | $509 | $412 | $377 | $385 | — | 🟡 |
| Motorizados - Q58 | — | — | — | — | $567 | — |  |
| Domiciliarios - API | $451 | $361 | $243 | $295 | $353 | — | 🔴 |
| Domiciliarios - Expancion - API | $550 | $400 | $345 | $447 | $684 | — | 🔴 |
| Domiciliarios VIDEO INTER - API | $515 | $373 | $518 | $530 | $441 | — | 🟢 |
| Domiciliarios INTER - API | $242 | $206 | $184 | $291 | $275 | $39 | 🟢 |
| Motorizados - INTER | $365 | $389 | $418 | $410 | $327 | $128 | 🟢 |
| Motorizados - API | $447 | $265 | $284 | $278 | $374 | — | 🔴 |
| Domiciliarios VIDEO - API | $276 | $269 | $254 | $257 | $286 | — | 🟡 |
| Domiciliarios - Expancion - Q58 | — | — | — | — | $843 | — |  |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | — | — | — | — | 15.44 | 5.12 | 🔴 |
| Domiciliarios VIDEO Q58 - | — | — | — | — | 8.74 | — |  |
| Domiciliarios - Expancion - INTER | 3.35 | 4.53 | 5.44 | 4.17 | 6.10 | 24.39 | 🟢 |
| TEST Creativos - API | 8.95 | 9.47 | 14.12 | 12.49 | 10.24 | — | 🔴 |
| Motorizados - Q58 | — | — | — | — | 5.80 | — |  |
| Domiciliarios - API | 7.58 | 9.25 | 16.04 | 12.23 | 9.46 | — | 🔴 |
| Domiciliarios - Expancion - API | 6.36 | 7.99 | 10.87 | 7.43 | 4.50 | — | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.48 | 7.58 | 6.42 | 5.73 | 7.33 | — | 🟢 |
| Domiciliarios INTER - API | 9.48 | 9.32 | 11.97 | 7.92 | 8.54 | 70.18 | 🟢 |
| Motorizados - INTER | 10.05 | 7.90 | 8.70 | 9.36 | 11.65 | 19.61 | 🟢 |
| Motorizados - API | 6.89 | 11.48 | 12.90 | 11.42 | 8.17 | — | 🔴 |
| Domiciliarios VIDEO - API | 9.99 | 9.30 | 10.74 | 10.15 | 7.77 | — | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | — | — | 3.57 | — |  |

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
| 2026-10-15 | $214,136 | 561 | $382 | $3,063 | 8.02 | $686,412 |

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
