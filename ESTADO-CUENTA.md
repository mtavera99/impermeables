# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-28 03:55 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$154,750** |
| gastado hoy (hasta las 3h) | $6,212 |
| presupuesto activo | $428,000/día |
| cierre proyectado del día | $434,145 |
| saldo proyectado a medianoche | $-273,183 |
| objetivo (cubrir un día de 143% + colchón) | $632,040 |

### 🔴 RECARGAR $471,078 — entra en zona de freno a las 12:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–3:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-24 | $7,403 | 16 | **$463** | $3,676 | 7.94 |
| 2026-10-25 | $12,863 | 32 | **$402** | $3,037 | 7.55 |
| 2026-10-26 | $12,634 | 28 | **$451** | $3,778 | 8.37 |
| 2026-10-27 | $11,199 | 39 | **$287** | $4,077 | 14.20 |
| 2026-10-28 **HOY** | $6,212 | 11 | **$565** | $4,229 | 7.49 |

🟠 Hoy va 97% más caro que ayer a la misma hora ($565 vs $287).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   565  =  $ 4,229  ÷  7.49
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,229 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 7.49 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Broad | $40,000 | $917 | 2% | 0 | — | 0.00 |
| Domiciliarios - API | $35,000 | $528 | 2% | 2 | $264 | 16.81 |
| Domiciliarios - Expancion - INTER | $25,000 | $518 | 2% | 0 | — | 0.00 |
| Domiciliarios - Expancion - API | $30,000 | $506 | 2% | 0 | — | 0.00 |
| Motorizados - Q58 | $24,000 | $473 | 2% | 1 | $473 | 4.72 |
| Motorizados - API | $20,000 | $451 | 2% | 0 | — | 0.00 |
| Domiciliarios INTER - API | $20,000 | $434 | 2% | 1 | $434 | 6.58 |
| Motorizados - INTER | $25,000 | $400 | 2% | 2 | $200 | 45.45 |
| Domiciliarios VIDEO - API | $20,000 | $398 | 2% | 2 | $199 | 21.74 |
| Domiciliarios VIDEO INTER - API | $30,000 | $373 | 1% | 1 | $373 | 12.66 |
| TEST Creativos - API | $20,000 | $280 | 1% | 0 | — | 0.00 |
| RADIO - Moteros | $20,000 | $272 | 1% | 0 | — | 0.00 |
| Domiciliarios Q58 - | $25,000 | $165 | 1% | 0 | — | 0.00 |
| RADIO - Seguridad / Negocios | $25,000 | $147 | 1% | 0 | — | 0.00 |
| Domiciliarios VIDEO Q58 - | $25,000 | $144 | 1% | 0 | — | 0.00 |
| Domiciliarios - Expancion - Q58 | $24,000 | $126 | 1% | 2 | $63 | 57.14 |
| RADIO - Fincas | $20,000 | $80 | 0% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $6,212 | 11 | **$565** | $2,402 | **24%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,381**/pedido |
| utilidad estimada de lo que va del día | **$11,446** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | $1,423 | — |  |
| Domiciliarios - API | $417 | $489 | $434 | $459 | $367 | $264 | 🟢 |
| Domiciliarios - Expancion - INTER | $662 | $594 | $526 | $747 | $496 | — | 🟢 |
| Domiciliarios - Expancion - API | $517 | $691 | $518 | $576 | $668 | — | 🔴 |
| Motorizados - Q58 | $514 | $547 | $836 | $769 | $604 | $473 | 🟢 |
| Motorizados - API | $456 | $436 | $431 | $426 | $356 | — | 🟢 |
| Domiciliarios INTER - API | $332 | $462 | $366 | $332 | $316 | $434 | 🔴 |
| Motorizados - INTER | $714 | $595 | $838 | $543 | $526 | $200 | 🟢 |
| Domiciliarios VIDEO - API | $337 | $383 | $332 | $389 | $303 | $199 | 🟢 |
| Domiciliarios VIDEO INTER - API | $646 | $490 | $661 | $519 | $638 | $373 | 🟢 |
| TEST Creativos - API | $480 | $395 | $526 | $490 | $386 | — | 🟢 |
| RADIO - Moteros | — | $919 | $926 | $1,068 | $1,147 | — | 🟡 |
| Domiciliarios Q58 - | $217 | $204 | $185 | $211 | $199 | — | 🟢 |
| RADIO - Seguridad / Negocios | — | $1,170 | $750 | $1,000 | $982 | — | 🟡 |
| Domiciliarios VIDEO Q58 - | $679 | $795 | $829 | $870 | $688 | — | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,117 | $876 | $286 | $241 | $247 | $63 | 🟢 |
| RADIO - Fincas | — | $630 | $434 | $707 | $731 | — | 🟡 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | 4.83 | — |  |
| Domiciliarios - API | 9.61 | 8.16 | 10.50 | 9.11 | 13.38 | 16.81 | 🟢 |
| Domiciliarios - Expancion - INTER | 4.83 | 4.70 | 5.97 | 3.66 | 5.16 | — | 🟢 |
| Domiciliarios - Expancion - API | 8.14 | 5.47 | 8.50 | 7.03 | 6.93 | — | 🟡 |
| Motorizados - Q58 | 5.82 | 5.28 | 3.66 | 4.17 | 4.50 | 4.72 | 🟡 |
| Motorizados - API | 8.59 | 8.65 | 9.54 | 8.76 | 12.26 | — | 🟢 |
| Domiciliarios INTER - API | 7.57 | 6.56 | 8.11 | 7.76 | 8.56 | 6.58 | 🔴 |
| Motorizados - INTER | 8.00 | 8.89 | 6.52 | 10.17 | 13.36 | 45.45 | 🟢 |
| Domiciliarios VIDEO - API | 9.18 | 7.54 | 9.93 | 7.54 | 12.80 | 21.74 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.43 | 8.56 | 6.02 | 8.12 | 7.90 | 12.66 | 🟢 |
| TEST Creativos - API | 8.92 | 8.50 | 6.95 | 9.25 | 12.48 | — | 🟢 |
| RADIO - Moteros | — | 5.63 | 4.15 | 3.02 | 3.44 | — | 🟢 |
| Domiciliarios Q58 - | 10.68 | 10.24 | 11.43 | 9.12 | 11.14 | — | 🟢 |
| RADIO - Seguridad / Negocios | — | 4.13 | 5.50 | 4.36 | 5.22 | — | 🟢 |
| Domiciliarios VIDEO Q58 - | 4.98 | 4.11 | 4.81 | 3.70 | 5.33 | — | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.93 | 4.47 | 8.73 | 9.37 | 10.82 | 57.14 | 🟢 |
| RADIO - Fincas | — | 8.62 | 9.35 | 5.16 | 5.68 | — | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-22 | $317,276 | 759 | $418 | $3,709 | 8.87 | $901,112 |
| 2026-10-23 | $297,189 | 630 | $472 | $3,553 | 7.53 | $714,121 |
| 2026-10-24 | $384,864 | 750 | $513 | $3,525 | 6.87 | $819,077 |
| 2026-10-25 | $403,813 | 884 | $457 | $3,558 | 7.79 | $1,015,232 |
| 2026-10-26 | $485,261 | 1022 | $475 | $3,300 | 6.95 | $1,155,309 |
| 2026-10-27 | $394,438 | 865 | $456 | $3,863 | 8.47 | $994,107 |

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
