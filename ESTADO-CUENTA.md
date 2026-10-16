# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-16 08:36 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$123,469** |
| gastado hoy (hasta las 8h) | $44,511 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $230,374 |
| saldo proyectado a medianoche | $-62,394 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $302,470 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–8:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-12 | $39,977 | 111 | **$360** | $3,144 | 8.73 |
| 2026-10-13 | $69,374 | 185 | **$375** | $3,187 | 8.50 |
| 2026-10-14 | $41,343 | 106 | **$390** | $3,320 | 8.51 |
| 2026-10-15 | $35,993 | 109 | **$330** | $3,015 | 9.13 |
| 2026-10-16 **HOY** | $44,511 | 127 | **$350** | $3,015 | 8.60 |

🟠 Hoy va 6% más caro que ayer a la misma hora ($350 vs $330).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   350  =  $ 3,015  ÷  8.60
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,015 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.60 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | $20,000 | $10,092 | 50% | 40 | $252 | 11.97 |
| Domiciliarios VIDEO Q58 - | $20,000 | $4,845 | 24% | 15 | $323 | 8.27 |
| Domiciliarios - Expancion - API | $40,000 | $4,545 | 11% | 9 | $505 | 7.09 |
| TEST Creativos - API | $40,000 | $3,805 | 10% | 6 | $634 | 4.88 |
| Domiciliarios - API | $35,000 | $3,404 | 10% | 10 | $340 | 10.43 |
| Domiciliarios VIDEO INTER - API | $20,000 | $3,021 | 15% | 3 | $1,007 | 3.30 |
| Motorizados - Q58 | $20,000 | $2,689 | 13% | 3 | $896 | 4.37 |
| Domiciliarios VIDEO - API | $20,000 | $2,562 | 13% | 11 | $233 | 10.02 |
| Motorizados - API | $20,000 | $2,331 | 12% | 11 | $212 | 16.85 |
| Domiciliarios - Expancion - INTER | $20,000 | $2,254 | 11% | 5 | $451 | 4.52 |
| Domiciliarios INTER - API | $20,000 | $1,931 | 10% | 10 | $193 | 12.06 |
| Motorizados - INTER | $20,000 | $1,521 | 8% | 4 | $380 | 9.55 |
| Domiciliarios - Expancion - Q58 | $20,000 | $1,511 | 8% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $44,511 | 127 | **$350** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,443**/pedido |
| utilidad estimada de lo que va del día | **$159,356** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | — | — | — | — | $261 | $252 | 🟡 |
| Domiciliarios VIDEO Q58 - | — | — | — | — | $352 | $323 | 🟢 |
| Domiciliarios - Expancion - API | $550 | $400 | $345 | $447 | $687 | $505 | 🟢 |
| TEST Creativos - API | $510 | $509 | $412 | $377 | $386 | $634 | 🔴 |
| Domiciliarios - API | $451 | $361 | $243 | $295 | $355 | $340 | 🟡 |
| Domiciliarios VIDEO INTER - API | $515 | $373 | $518 | $530 | $443 | $1,007 | 🔴 |
| Motorizados - Q58 | — | — | — | — | $578 | $896 | 🔴 |
| Domiciliarios VIDEO - API | $276 | $269 | $254 | $257 | $288 | $233 | 🟢 |
| Motorizados - API | $447 | $265 | $284 | $278 | $377 | $212 | 🟢 |
| Domiciliarios - Expancion - INTER | $603 | $436 | $428 | $569 | $386 | $451 | 🔴 |
| Domiciliarios INTER - API | $242 | $206 | $184 | $291 | $278 | $193 | 🟢 |
| Motorizados - INTER | $365 | $389 | $418 | $410 | $329 | $380 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | — | — | $856 | — |  |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | — | — | — | — | 15.22 | 11.97 | 🔴 |
| Domiciliarios VIDEO Q58 - | — | — | — | — | 8.59 | 8.27 | 🟡 |
| Domiciliarios - Expancion - API | 6.36 | 7.99 | 10.87 | 7.43 | 4.48 | 7.09 | 🟢 |
| TEST Creativos - API | 8.95 | 9.47 | 14.12 | 12.49 | 10.18 | 4.88 | 🔴 |
| Domiciliarios - API | 7.58 | 9.25 | 16.04 | 12.23 | 9.39 | 10.43 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.48 | 7.58 | 6.42 | 5.73 | 7.29 | 3.30 | 🔴 |
| Motorizados - Q58 | — | — | — | — | 5.73 | 4.37 | 🔴 |
| Domiciliarios VIDEO - API | 9.99 | 9.30 | 10.74 | 10.15 | 7.70 | 10.02 | 🟢 |
| Motorizados - API | 6.89 | 11.48 | 12.90 | 11.42 | 8.12 | 16.85 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.35 | 4.53 | 5.44 | 4.17 | 6.08 | 4.52 | 🔴 |
| Domiciliarios INTER - API | 9.48 | 9.32 | 11.97 | 7.92 | 8.47 | 12.06 | 🟢 |
| Motorizados - INTER | 10.05 | 7.90 | 8.70 | 9.36 | 11.58 | 9.55 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | — | — | 3.51 | — |  |

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
| 2026-10-15 | $215,530 | 561 | $384 | $3,061 | 7.97 | $685,018 |

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
