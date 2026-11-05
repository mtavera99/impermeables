# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-04 21:46 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$150,641** |
| gastado hoy (hasta las 21h) | $318,631 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $350,134 |
| saldo proyectado a medianoche | $119,138 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟠 Recargar $185,648 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–21:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-31 | $412,342 | 671 | **$615** | $4,097 | 6.67 |
| 2026-11-01 | $418,729 | 717 | **$584** | $4,071 | 6.97 |
| 2026-11-02 | $502,553 | 832 | **$604** | $3,040 | 5.03 |
| 2026-11-03 | $406,153 | 726 | **$559** | $2,915 | 5.21 |
| 2026-11-04 **HOY** | $318,631 | 508 | **$627** | $4,022 | 6.41 |

🟠 Hoy va 12% más caro que ayer a la misma hora ($627 vs $559).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   627  =  $ 4,022  ÷  6.41
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,022 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 6.41 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $30,122 | 75% | 21 | $1,434 | 2.81 |
| Domiciliarios VIDEO INTER - API | $36,000 | $25,988 | 72% | 40 | $650 | 8.45 |
| RADIO - Moteros | $35,000 | $24,764 | 71% | 11 | $2,251 | 1.61 |
| Domiciliarios - API | $35,000 | $23,758 | 68% | 58 | $410 | 12.89 |
| Domiciliarios - Expancion - API | $30,000 | $20,982 | 70% | 31 | $677 | 7.11 |
| Motorizados - INTER | $25,000 | $20,544 | 82% | 34 | $604 | 11.69 |
| Domiciliarios - Expancion - Q58 | $29,000 | $19,090 | 66% | 80 | $239 | 10.05 |
| Domiciliarios - Expancion - INTER | $25,000 | $19,002 | 76% | 29 | $655 | 4.85 |
| Motorizados - Q58 | $29,000 | $18,829 | 65% | 27 | $697 | 3.63 |
| Domiciliarios VIDEO Q58 - | $25,000 | $18,256 | 73% | 13 | $1,404 | 2.73 |
| Domiciliarios Q58 - | $25,000 | $17,374 | 69% | 8 | $2,172 | 2.65 |
| RADIO - Fincas | $20,000 | $17,133 | 86% | 26 | $659 | 6.91 |
| Domiciliarios INTER - API | $20,000 | $15,190 | 76% | 40 | $380 | 9.83 |
| Motorizados - API | $20,000 | $14,379 | 72% | 23 | $625 | 7.10 |
| Domiciliarios VIDEO - API | $20,000 | $13,399 | 67% | 38 | $353 | 10.28 |
| TEST Creativos - API | $20,000 | $11,603 | 58% | 21 | $553 | 6.05 |
| RADIO - Broad | $10,000 | $8,218 | 82% | 7 | $1,174 | 6.80 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $318,631 | 507 | **$628** | $2,402 | **26%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$11,553**/pedido |
| utilidad estimada de lo que va del día | **$495,233** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-30 | 10-31 | 11-01 | 11-02 | 11-03 | 11-04 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,078 | $833 | $883 | $1,488 | $888 | $1,434 | 🔴 |
| Domiciliarios VIDEO INTER - API | $702 | $521 | $723 | $667 | $563 | $650 | 🔴 |
| RADIO - Moteros | $1,068 | $1,791 | $1,422 | $2,023 | $1,901 | $2,251 | 🔴 |
| Domiciliarios - API | $452 | $439 | $541 | $597 | $510 | $410 | 🟢 |
| Domiciliarios - Expancion - API | $657 | $553 | $650 | $503 | $624 | $677 | 🟡 |
| Motorizados - INTER | $869 | $539 | $494 | $574 | $507 | $604 | 🔴 |
| Domiciliarios - Expancion - Q58 | $267 | $268 | $253 | $231 | $253 | $239 | 🟢 |
| Domiciliarios - Expancion - INTER | $557 | $1,062 | $810 | $555 | $496 | $655 | 🔴 |
| Motorizados - Q58 | $616 | $738 | $628 | $742 | $559 | $697 | 🔴 |
| Domiciliarios VIDEO Q58 - | $586 | $843 | $678 | $847 | $622 | $1,404 | 🔴 |
| Domiciliarios Q58 - | $183 | $1,927 | $1,379 | $1,407 | $992 | $2,172 | 🔴 |
| RADIO - Fincas | $1,153 | $945 | $1,119 | $927 | $1,013 | $659 | 🟢 |
| Domiciliarios INTER - API | $295 | $462 | $284 | $362 | $290 | $380 | 🔴 |
| Motorizados - API | $566 | $497 | $479 | $526 | $390 | $625 | 🔴 |
| Domiciliarios VIDEO - API | $415 | $340 | $412 | $313 | $421 | $353 | 🟢 |
| TEST Creativos - API | $726 | $541 | $623 | $500 | $559 | $553 | 🟡 |
| RADIO - Broad | $1,802 | $1,668 | $1,112 | $1,166 | $916 | $1,174 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-30 | 10-31 | 11-01 | 11-02 | 11-03 | 11-04 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 4.30 | 6.02 | 5.10 | 2.02 | 3.19 | 2.81 | 🟡 |
| Domiciliarios VIDEO INTER - API | 7.31 | 8.48 | 6.37 | 5.33 | 7.38 | 8.45 | 🟢 |
| RADIO - Moteros | 3.71 | 2.24 | 3.20 | 1.68 | 1.62 | 1.61 | 🟡 |
| Domiciliarios - API | 11.25 | 11.52 | 9.95 | 7.11 | 7.17 | 12.89 | 🟢 |
| Domiciliarios - Expancion - API | 7.64 | 9.43 | 8.85 | 8.73 | 5.79 | 7.11 | 🟢 |
| Motorizados - INTER | 8.38 | 13.19 | 14.23 | 8.96 | 11.83 | 11.69 | 🟡 |
| Domiciliarios - Expancion - Q58 | 10.66 | 10.19 | 9.72 | 7.74 | 6.90 | 10.05 | 🟢 |
| Domiciliarios - Expancion - INTER | 6.17 | 2.69 | 3.86 | 3.83 | 3.85 | 4.85 | 🟢 |
| Motorizados - Q58 | 4.92 | 3.40 | 4.26 | 2.73 | 3.34 | 3.63 | 🟢 |
| Domiciliarios VIDEO Q58 - | 7.07 | 4.16 | 5.10 | 3.07 | 3.87 | 2.73 | 🔴 |
| Domiciliarios Q58 - | 13.30 | 2.99 | 4.94 | 2.99 | 4.33 | 2.65 | 🔴 |
| RADIO - Fincas | 3.84 | 4.77 | 4.17 | 4.36 | 3.29 | 6.91 | 🟢 |
| Domiciliarios INTER - API | 13.57 | 8.56 | 12.61 | 7.07 | 9.66 | 9.83 | 🟡 |
| Motorizados - API | 7.66 | 8.55 | 9.32 | 7.22 | 7.70 | 7.10 | 🟡 |
| Domiciliarios VIDEO - API | 8.38 | 9.68 | 7.93 | 7.25 | 6.23 | 10.28 | 🟢 |
| TEST Creativos - API | 4.34 | 6.22 | 6.27 | 6.74 | 6.72 | 6.05 | 🟡 |
| RADIO - Broad | 4.49 | 4.87 | 6.67 | 5.10 | 7.73 | 6.80 | 🟡 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-29 | $438,775 | 870 | $504 | $3,674 | 7.28 | $957,796 |
| 2026-10-30 | $408,080 | 721 | $566 | $4,179 | 7.38 | $749,308 |
| 2026-10-31 | $422,412 | 694 | $609 | $4,029 | 6.62 | $691,634 |
| 2026-11-01 | $457,484 | 787 | $581 | $4,079 | 7.02 | $805,851 |
| 2026-11-02 | $531,050 | 881 | $603 | $3,035 | 5.04 | $883,179 |
| 2026-11-03 | $440,661 | 799 | $552 | $2,933 | 5.32 | $841,937 |

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
