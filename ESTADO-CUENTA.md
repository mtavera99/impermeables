# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-24 09:16 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$72,243** |
| gastado hoy (hasta las 9h) | $77,457 |
| presupuesto activo | $400,000/día |
| cierre proyectado del día | $310,556 |
| saldo proyectado a medianoche | $-160,856 |
| objetivo (cubrir un día de 143% + colchón) | $592,000 |

### 🔴 RECARGAR $442,300 — entra en zona de freno a las 13:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–9:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-20 | $70,584 | 144 | **$490** | $3,192 | 6.51 |
| 2026-10-21 | $100,052 | 222 | **$451** | $3,882 | 8.61 |
| 2026-10-22 | $85,398 | 202 | **$423** | $3,841 | 9.08 |
| 2026-10-23 | $61,762 | 135 | **$457** | $3,321 | 7.26 |
| 2026-10-24 **HOY** | $77,457 | 142 | **$545** | $3,408 | 6.25 |

🟠 Hoy va 19% más caro que ayer a la misma hora ($545 vs $457).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   545  =  $ 3,408  ÷  6.25
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,408 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.25 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $7,417 | 21% | 12 | $618 | 6.09 |
| RADIO - Seguridad / Negocios | $25,000 | $7,352 | 29% | 9 | $817 | 5.49 |
| Domiciliarios - Expancion - API | $40,000 | $7,084 | 18% | 9 | $787 | 4.35 |
| TEST Creativos - API | $30,000 | $5,905 | 20% | 17 | $347 | 10.13 |
| RADIO - Fincas | $20,000 | $5,832 | 29% | 8 | $729 | 6.73 |
| Domiciliarios - Expancion - INTER | $25,000 | $4,836 | 19% | 8 | $604 | 4.61 |
| Domiciliarios VIDEO - API | $20,000 | $4,582 | 23% | 12 | $382 | 6.46 |
| Domiciliarios Q58 - | $25,000 | $4,317 | 17% | 21 | $206 | 9.29 |
| RADIO - Moteros | $20,000 | $4,245 | 21% | 5 | $849 | 5.35 |
| Motorizados - API | $20,000 | $4,074 | 20% | 7 | $582 | 5.95 |
| Domiciliarios VIDEO Q58 - | $25,000 | $4,044 | 16% | 3 | $1,348 | 2.36 |
| Domiciliarios VIDEO INTER - API | $25,000 | $3,953 | 16% | 5 | $791 | 4.73 |
| Motorizados - Q58 | $20,000 | $3,699 | 18% | 7 | $528 | 5.40 |
| Domiciliarios INTER - API | $25,000 | $3,609 | 14% | 7 | $516 | 6.26 |
| Motorizados - INTER | $25,000 | $3,303 | 13% | 6 | $550 | 9.02 |
| Domiciliarios - Expancion - Q58 | $20,000 | $3,205 | 16% | 4 | $801 | 4.96 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $77,457 | 140 | **$553** | $2,402 | **23%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,170**/pedido |
| utilidad estimada de lo que va del día | **$147,279** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $464 | $484 | $348 | $370 | $415 | $618 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | $817 |  |
| Domiciliarios - Expancion - API | $485 | $583 | $424 | $444 | $514 | $787 | 🔴 |
| TEST Creativos - API | $475 | $609 | $535 | $379 | $480 | $347 | 🟢 |
| RADIO - Fincas | — | — | — | — | — | $729 |  |
| Domiciliarios - Expancion - INTER | $536 | $629 | $604 | $721 | $660 | $604 | 🟢 |
| Domiciliarios VIDEO - API | $430 | $319 | $269 | $292 | $336 | $382 | 🟡 |
| Domiciliarios Q58 - | $166 | $185 | $197 | $159 | $216 | $206 | 🟡 |
| RADIO - Moteros | — | — | — | — | — | $849 |  |
| Motorizados - API | $579 | $470 | $446 | $379 | $454 | $582 | 🔴 |
| Domiciliarios VIDEO Q58 - | $586 | $642 | $995 | $1,091 | $678 | $1,348 | 🔴 |
| Domiciliarios VIDEO INTER - API | $534 | $576 | $701 | $742 | $644 | $791 | 🔴 |
| Motorizados - Q58 | $732 | $545 | $1,025 | $599 | $512 | $528 | 🟡 |
| Domiciliarios INTER - API | $240 | $324 | $304 | $314 | $330 | $516 | 🔴 |
| Motorizados - INTER | $480 | $591 | $460 | $545 | $710 | $550 | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,462 | $1,121 | $1,077 | $892 | $1,114 | $801 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 7.58 | 9.53 | 14.10 | 12.13 | 9.65 | 6.09 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | 5.49 |  |
| Domiciliarios - Expancion - API | 7.80 | 7.58 | 11.99 | 10.38 | 8.17 | 4.35 | 🔴 |
| TEST Creativos - API | 9.85 | 8.80 | 11.03 | 14.31 | 8.92 | 10.13 | 🟢 |
| RADIO - Fincas | — | — | — | — | — | 6.73 |  |
| Domiciliarios - Expancion - INTER | 5.28 | 4.46 | 5.33 | 4.21 | 4.85 | 4.61 | 🟡 |
| Domiciliarios VIDEO - API | 6.55 | 11.78 | 14.69 | 10.98 | 9.21 | 6.46 | 🔴 |
| Domiciliarios Q58 - | 13.71 | 13.11 | 11.07 | 12.89 | 10.74 | 9.29 | 🟡 |
| RADIO - Moteros | — | — | — | — | — | 5.35 |  |
| Motorizados - API | 5.69 | 8.05 | 9.31 | 10.45 | 8.63 | 5.95 | 🔴 |
| Domiciliarios VIDEO Q58 - | 5.02 | 3.62 | 3.19 | 2.96 | 4.99 | 2.36 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.43 | 7.46 | 5.98 | 5.52 | 6.45 | 4.73 | 🔴 |
| Motorizados - Q58 | 4.15 | 5.75 | 3.32 | 5.14 | 5.84 | 5.40 | 🟡 |
| Domiciliarios INTER - API | 6.33 | 11.02 | 12.17 | 9.39 | 7.60 | 6.26 | 🔴 |
| Motorizados - INTER | 8.02 | 8.76 | 13.59 | 11.01 | 8.04 | 9.02 | 🟢 |
| Domiciliarios - Expancion - Q58 | 2.02 | 2.71 | 3.65 | 4.52 | 3.94 | 4.96 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-18 | $387,290 | 870 | $445 | $3,090 | 6.94 | $1,009,281 |
| 2026-10-19 | $343,466 | 796 | $431 | $3,067 | 7.11 | $934,316 |
| 2026-10-20 | $384,860 | 837 | $460 | $3,523 | 7.66 | $958,738 |
| 2026-10-21 | $343,403 | 802 | $428 | $3,984 | 9.30 | $944,011 |
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $296,081 | 630 | $470 | $3,552 | 7.56 | $715,229 |

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
