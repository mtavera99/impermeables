# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-16 11:46 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$74,385** |
| gastado hoy (hasta las 11h) | $92,808 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $246,502 |
| saldo proyectado a medianoche | $-79,310 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $303,257 — entra en zona de freno a las 16:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–11:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-12 | $88,245 | 211 | **$418** | $3,150 | 7.53 |
| 2026-10-13 | $108,813 | 313 | **$348** | $3,376 | 9.71 |
| 2026-10-14 | $77,802 | 207 | **$376** | $3,428 | 9.12 |
| 2026-10-15 | $64,377 | 173 | **$372** | $3,095 | 8.32 |
| 2026-10-16 **HOY** | $92,751 | 260 | **$357** | $3,221 | 9.03 |

🟢 **Hoy va mejor que ayer a la misma hora** ($357 vs $372).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   357  =  $ 3,221  ÷  9.03
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,221 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 9.03 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | $20,000 | $14,157 | 71% | 59 | $240 | 13.50 |
| Domiciliarios - Expancion - API | $40,000 | $10,542 | 26% | 20 | $527 | 7.21 |
| Domiciliarios VIDEO Q58 - | $20,000 | $10,512 | 53% | 34 | $309 | 8.84 |
| Domiciliarios - API | $35,000 | $8,993 | 26% | 27 | $333 | 11.21 |
| TEST Creativos - API | $40,000 | $8,187 | 20% | 19 | $431 | 8.85 |
| Motorizados - Q58 | $20,000 | $6,390 | 32% | 9 | $710 | 5.82 |
| Domiciliarios VIDEO - API | $20,000 | $5,699 | 28% | 18 | $317 | 8.27 |
| Domiciliarios VIDEO INTER - API | $20,000 | $5,148 | 26% | 7 | $735 | 4.75 |
| Motorizados - API | $20,000 | $5,078 | 25% | 20 | $254 | 14.08 |
| Domiciliarios - Expancion - INTER | $20,000 | $4,940 | 25% | 9 | $549 | 3.87 |
| Domiciliarios - Expancion - Q58 | $20,000 | $4,666 | 23% | 5 | $933 | 3.76 |
| Domiciliarios INTER - API | $20,000 | $4,578 | 23% | 19 | $241 | 9.75 |
| Motorizados - INTER | $20,000 | $3,864 | 19% | 14 | $276 | 13.63 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $92,754 | 260 | **$357** | $2,402 | **15%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$6,558**/pedido |
| utilidad estimada de lo que va del día | **$324,612** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | — | — | — | — | $262 | $240 | 🟢 |
| Domiciliarios - Expancion - API | $550 | $400 | $345 | $447 | $688 | $527 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | — | $353 | $309 | 🟢 |
| Domiciliarios - API | $451 | $361 | $243 | $295 | $355 | $333 | 🟢 |
| TEST Creativos - API | $510 | $509 | $412 | $378 | $386 | $431 | 🟡 |
| Motorizados - Q58 | — | — | — | — | $581 | $710 | 🔴 |
| Domiciliarios VIDEO - API | $276 | $269 | $254 | $257 | $289 | $317 | 🟡 |
| Domiciliarios VIDEO INTER - API | $515 | $373 | $518 | $530 | $444 | $735 | 🔴 |
| Motorizados - API | $447 | $265 | $284 | $278 | $378 | $254 | 🟢 |
| Domiciliarios - Expancion - INTER | $603 | $436 | $428 | $569 | $386 | $549 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | — | — | $857 | $933 | 🟡 |
| Domiciliarios INTER - API | $242 | $206 | $184 | $291 | $279 | $241 | 🟢 |
| Motorizados - INTER | $365 | $389 | $418 | $410 | $329 | $276 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-11 | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios Q58 - | — | — | — | — | 15.14 | 13.50 | 🟡 |
| Domiciliarios - Expancion - API | 6.36 | 7.99 | 10.87 | 7.43 | 4.47 | 7.21 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | — | 8.56 | 8.84 | 🟡 |
| Domiciliarios - API | 7.58 | 9.25 | 16.04 | 12.23 | 9.38 | 11.21 | 🟢 |
| TEST Creativos - API | 8.95 | 9.47 | 14.12 | 12.49 | 10.17 | 8.85 | 🟡 |
| Motorizados - Q58 | — | — | — | — | 5.70 | 5.82 | 🟡 |
| Domiciliarios VIDEO - API | 9.99 | 9.30 | 10.74 | 10.15 | 7.69 | 8.27 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.48 | 7.58 | 6.42 | 5.73 | 7.28 | 4.75 | 🔴 |
| Motorizados - API | 6.89 | 11.48 | 12.90 | 11.42 | 8.10 | 14.08 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.35 | 4.53 | 5.44 | 4.17 | 6.08 | 3.87 | 🔴 |
| Domiciliarios - Expancion - Q58 | — | — | — | — | 3.51 | 3.76 | 🟢 |
| Domiciliarios INTER - API | 9.48 | 9.32 | 11.97 | 7.92 | 8.44 | 9.75 | 🟢 |
| Motorizados - INTER | 10.05 | 7.90 | 8.70 | 9.36 | 11.54 | 13.63 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-10 | $185,284 | 496 | $374 | $3,442 | 9.21 | $610,922 |
| 2026-10-11 | $235,745 | 555 | $425 | $3,167 | 7.46 | $655,171 |
| 2026-10-12 | $264,255 | 759 | $348 | $2,947 | 8.46 | $954,133 |
| 2026-10-13 | $246,905 | 791 | $312 | $3,492 | 11.19 | $1,022,851 |
| 2026-10-14 | $233,678 | 645 | $362 | $3,194 | 8.82 | $801,711 |
| 2026-10-15 | $215,890 | 561 | $385 | $3,060 | 7.95 | $684,658 |

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
