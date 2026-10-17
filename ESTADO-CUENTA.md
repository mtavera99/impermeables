# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-17 11:43 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$100,161** |
| gastado hoy (hasta las 11h) | $99,675 |
| presupuesto activo | $315,000/día |
| cierre proyectado del día | $282,566 |
| saldo proyectado a medianoche | $-82,730 |
| objetivo (cubrir un día de 143% + colchón) | $470,450 |

### 🔴 RECARGAR $270,614 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–11:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-13 | $108,813 | 313 | **$348** | $3,376 | 9.71 |
| 2026-10-14 | $77,802 | 207 | **$376** | $3,428 | 9.12 |
| 2026-10-15 | $64,377 | 173 | **$372** | $3,095 | 8.32 |
| 2026-10-16 | $102,189 | 271 | **$377** | $3,201 | 8.49 |
| 2026-10-17 **HOY** | $99,675 | 222 | **$449** | $3,226 | 7.18 |

🟠 Hoy va 19% más caro que ayer a la misma hora ($449 vs $377).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   449  =  $ 3,226  ÷  7.18
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,226 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.18 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $13,108 | 33% | 14 | $936 | 4.74 |
| Domiciliarios - API | $35,000 | $12,859 | 37% | 31 | $415 | 9.52 |
| Domiciliarios - Expancion - API | $40,000 | $12,197 | 30% | 21 | $581 | 6.43 |
| Motorizados - Q58 | $20,000 | $7,475 | 37% | 15 | $498 | 6.11 |
| Domiciliarios - Expancion - Q58 | $20,000 | $7,278 | 36% | 10 | $728 | 4.09 |
| Domiciliarios VIDEO Q58 - | $20,000 | $6,945 | 35% | 13 | $534 | 4.79 |
| Domiciliarios VIDEO - API | $20,000 | $6,557 | 33% | 18 | $364 | 8.47 |
| Motorizados - API | $20,000 | $6,480 | 32% | 14 | $463 | 7.26 |
| Domiciliarios VIDEO INTER - API | $20,000 | $5,527 | 28% | 11 | $502 | 7.17 |
| Domiciliarios - Expancion - INTER | $20,000 | $5,430 | 27% | 18 | $302 | 6.01 |
| Domiciliarios INTER - API | $20,000 | $5,417 | 27% | 24 | $226 | 12.11 |
| Domiciliarios Q58 - | $20,000 | $5,374 | 27% | 20 | $269 | 9.32 |
| Motorizados - INTER | $20,000 | $5,028 | 25% | 12 | $419 | 10.94 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $99,675 | 221 | **$451** | $2,402 | **19%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,291**/pedido |
| utilidad estimada de lo que va del día | **$255,086** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | $509 | $412 | $378 | $386 | $488 | $936 | 🔴 |
| Domiciliarios - API | $361 | $243 | $295 | $356 | $402 | $415 | 🟡 |
| Domiciliarios - Expancion - API | $400 | $345 | $447 | $690 | $525 | $581 | 🟡 |
| Motorizados - Q58 | — | — | — | $584 | $690 | $498 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | $859 | $936 | $728 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | $354 | $380 | $534 | 🔴 |
| Domiciliarios VIDEO - API | $269 | $254 | $257 | $289 | $366 | $364 | 🟡 |
| Motorizados - API | $265 | $284 | $278 | $380 | $344 | $463 | 🔴 |
| Domiciliarios VIDEO INTER - API | $373 | $518 | $530 | $445 | $709 | $502 | 🟢 |
| Domiciliarios - Expancion - INTER | $436 | $428 | $569 | $387 | $567 | $302 | 🟢 |
| Domiciliarios INTER - API | $206 | $184 | $291 | $280 | $275 | $226 | 🟢 |
| Domiciliarios Q58 - | — | — | — | $263 | $217 | $269 | 🔴 |
| Motorizados - INTER | $389 | $418 | $410 | $330 | $463 | $419 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-12 | 10-13 | 10-14 | 10-15 | 10-16 | 10-17 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | 9.47 | 14.12 | 12.48 | 10.16 | 7.70 | 4.74 | 🔴 |
| Domiciliarios - API | 9.25 | 16.04 | 12.23 | 9.35 | 8.74 | 9.52 | 🟢 |
| Domiciliarios - Expancion - API | 7.99 | 10.87 | 7.43 | 4.46 | 6.57 | 6.43 | 🟡 |
| Motorizados - Q58 | — | — | — | 5.67 | 5.78 | 6.11 | 🟢 |
| Domiciliarios - Expancion - Q58 | — | — | — | 3.50 | 3.77 | 4.09 | 🟢 |
| Domiciliarios VIDEO Q58 - | — | — | — | 8.53 | 7.03 | 4.79 | 🔴 |
| Domiciliarios VIDEO - API | 9.30 | 10.74 | 10.15 | 7.68 | 6.79 | 8.47 | 🟢 |
| Motorizados - API | 11.48 | 12.90 | 11.42 | 8.08 | 9.38 | 7.26 | 🔴 |
| Domiciliarios VIDEO INTER - API | 7.58 | 6.42 | 5.73 | 7.26 | 4.79 | 7.17 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.53 | 5.44 | 4.17 | 6.07 | 3.16 | 6.01 | 🟢 |
| Domiciliarios INTER - API | 9.32 | 11.97 | 7.92 | 8.40 | 9.07 | 12.11 | 🟢 |
| Domiciliarios Q58 - | — | — | — | 15.07 | 14.88 | 9.32 | 🔴 |
| Motorizados - INTER | 7.90 | 8.70 | 9.36 | 11.53 | 8.30 | 10.94 | 🟢 |

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
| 2026-10-16 | $316,034 | 743 | $425 | $3,104 | 7.30 | $876,670 |

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
