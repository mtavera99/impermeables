# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-15 17:31 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$69,292** |
| gastado hoy (hasta las 17h) | $113,350 |
| presupuesto activo | $235,000/día |
| cierre proyectado del día | $185,390 |
| saldo proyectado a medianoche | $-2,748 |
| objetivo (cubrir un día de 143% + colchón) | $356,050 |

### 🔴 RECARGAR $173,408 — entra en zona de freno a las 21:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-11 | $148,838 | 332 | **$448** | $3,239 | 7.23 |
| 2026-10-12 | $197,783 | 533 | **$371** | $3,041 | 8.20 |
| 2026-10-13 | $177,650 | 542 | **$328** | $3,536 | 10.79 |
| 2026-10-14 | $158,674 | 398 | **$399** | $3,369 | 8.45 |
| 2026-10-15 **HOY** | $113,505 | 304 | **$373** | $3,061 | 8.20 |

🟢 **Hoy va mejor que ayer a la misma hora** ($373 vs $399).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   373  =  $ 3,061  ÷  8.20
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,061 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 8.20 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $20,341 | 51% | 59 | $345 | 11.75 |
| Domiciliarios - Expancion - API | $40,000 | $18,255 | 46% | 29 | $629 | 4.78 |
| Domiciliarios - API | $35,000 | $17,686 | 51% | 51 | $347 | 9.71 |
| Domiciliarios VIDEO - API | $20,000 | $10,171 | 51% | 33 | $308 | 6.89 |
| Motorizados - INTER | $20,000 | $10,161 | 51% | 33 | $308 | 12.71 |
| Domiciliarios - Expancion - INTER | $20,000 | $9,984 | 50% | 29 | $344 | 7.04 |
| Motorizados - API | $20,000 | $9,880 | 49% | 25 | $395 | 7.78 |
| Domiciliarios VIDEO INTER - API | $20,000 | $9,338 | 47% | 19 | $491 | 6.67 |
| Domiciliarios INTER - API | $20,000 | $7,559 | 38% | 26 | $291 | 8.28 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $113,375 | 304 | **$373** | $2,402 | **16%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,856**/pedido |
| utilidad estimada de lo que va del día | **$374,622** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-10 | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $433 | $510 | $509 | $412 | $377 | $345 | 🟢 |
| Domiciliarios - Expancion - API | $509 | $550 | $400 | $345 | $447 | $629 | 🔴 |
| Domiciliarios - API | $366 | $451 | $361 | $243 | $295 | $347 | 🔴 |
| Motorizados - INTER | $343 | $365 | $389 | $418 | $410 | $309 | 🟢 |
| Domiciliarios VIDEO - API | $282 | $276 | $269 | $254 | $256 | $308 | 🔴 |
| Domiciliarios - Expancion - INTER | $442 | $603 | $436 | $428 | $569 | $344 | 🟢 |
| Motorizados - API | $312 | $447 | $265 | $284 | $278 | $395 | 🔴 |
| Domiciliarios VIDEO INTER - API | $514 | $515 | $373 | $518 | $530 | $491 | 🟢 |
| Domiciliarios INTER - API | $242 | $242 | $206 | $184 | $291 | $291 | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-10 | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 12.76 | 8.95 | 9.47 | 14.12 | 12.49 | 11.75 | 🟡 |
| Domiciliarios - Expancion - API | 6.92 | 6.36 | 7.99 | 10.87 | 7.44 | 4.78 | 🔴 |
| Domiciliarios - API | 9.70 | 7.58 | 9.25 | 16.04 | 12.24 | 9.71 | 🔴 |
| Motorizados - INTER | 11.54 | 10.05 | 7.90 | 8.70 | 9.36 | 12.63 | 🟢 |
| Domiciliarios VIDEO - API | 10.90 | 9.99 | 9.30 | 10.74 | 10.16 | 6.89 | 🔴 |
| Domiciliarios - Expancion - INTER | 5.65 | 3.35 | 4.53 | 5.44 | 4.17 | 7.04 | 🟢 |
| Motorizados - API | 10.22 | 6.89 | 11.48 | 12.90 | 11.42 | 7.78 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.82 | 6.48 | 7.58 | 6.42 | 5.73 | 6.67 | 🟢 |
| Domiciliarios INTER - API | 10.51 | 9.48 | 9.32 | 11.97 | 7.93 | 8.28 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-09 | $220,977 | 606 | $365 | $3,141 | 8.61 | $751,807 |
| 2026-10-10 | $185,284 | 496 | $374 | $3,442 | 9.21 | $610,922 |
| 2026-10-11 | $235,745 | 555 | $425 | $3,167 | 7.46 | $655,171 |
| 2026-10-12 | $264,255 | 759 | $348 | $2,947 | 8.46 | $954,133 |
| 2026-10-13 | $246,905 | 791 | $312 | $3,492 | 11.19 | $1,022,851 |
| 2026-10-14 | $233,499 | 645 | $362 | $3,193 | 8.82 | $801,890 |

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
