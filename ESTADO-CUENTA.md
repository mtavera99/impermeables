# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-05 21:42 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$243,357** |
| gastado hoy (hasta las 21h) | $462,676 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $494,086 |
| saldo proyectado a medianoche | $211,948 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–21:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-01 | $418,729 | 717 | **$584** | $4,071 | 6.97 |
| 2026-11-02 | $502,553 | 832 | **$604** | $3,040 | 5.03 |
| 2026-11-03 | $406,188 | 726 | **$559** | $2,915 | 5.21 |
| 2026-11-04 | $335,836 | 531 | **$632** | $3,981 | 6.29 |
| 2026-11-05 **HOY** | $462,676 | 768 | **$602** | $3,564 | 5.92 |

🟢 **Hoy va mejor que ayer a la misma hora** ($602 vs $632).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   602  =  $ 3,564  ÷  5.92
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,564 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.92 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $38,439 | 110% | 76 | $506 | 8.52 |
| RADIO - Seguridad / Negocios | $40,000 | $38,170 | 95% | 48 | $795 | 4.65 |
| Domiciliarios VIDEO INTER - API | $36,000 | $37,580 | 104% | 53 | $709 | 6.89 |
| RADIO - Moteros | $35,000 | $34,940 | 100% | 20 | $1,747 | 2.06 |
| Domiciliarios - Expancion - Q58 | $29,000 | $31,545 | 109% | 98 | $322 | 7.27 |
| Motorizados - Q58 | $29,000 | $31,044 | 107% | 39 | $796 | 2.92 |
| Domiciliarios - Expancion - API | $30,000 | $30,983 | 103% | 55 | $563 | 7.90 |
| Domiciliarios Q58 - | $25,000 | $28,118 | 112% | 31 | $907 | 4.82 |
| Domiciliarios - Expancion - INTER | $25,000 | $26,425 | 106% | 40 | $661 | 3.96 |
| Domiciliarios VIDEO Q58 - | $25,000 | $25,838 | 103% | 36 | $718 | 3.95 |
| Motorizados - INTER | $25,000 | $25,207 | 101% | 49 | $514 | 12.04 |
| TEST Creativos - API | $20,000 | $23,350 | 117% | 27 | $865 | 5.65 |
| Domiciliarios INTER - API | $20,000 | $20,879 | 104% | 66 | $316 | 9.90 |
| Domiciliarios VIDEO - API | $20,000 | $20,737 | 104% | 62 | $334 | 9.46 |
| RADIO - Fincas | $20,000 | $20,597 | 103% | 24 | $858 | 4.71 |
| Motorizados - API | $20,000 | $20,295 | 101% | 41 | $495 | 7.63 |
| RADIO - Broad | $10,000 | $8,529 | 85% | 4 | $2,132 | 3.37 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $462,676 | 769 | **$602** | $2,402 | **25%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$11,060**/pedido |
| utilidad estimada de lo que va del día | **$771,764** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-31 | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $439 | $541 | $597 | $511 | $426 | $506 | 🔴 |
| RADIO - Seguridad / Negocios | $833 | $883 | $1,488 | $888 | $1,325 | $795 | 🟢 |
| Domiciliarios VIDEO INTER - API | $521 | $723 | $667 | $563 | $656 | $709 | 🟡 |
| RADIO - Moteros | $1,791 | $1,422 | $2,023 | $1,901 | $1,797 | $1,747 | 🟡 |
| Domiciliarios - Expancion - Q58 | $268 | $253 | $231 | $253 | $238 | $322 | 🔴 |
| Motorizados - Q58 | $738 | $628 | $742 | $559 | $621 | $796 | 🔴 |
| Domiciliarios - Expancion - API | $553 | $650 | $503 | $624 | $662 | $563 | 🟢 |
| Domiciliarios Q58 - | $1,927 | $1,379 | $1,407 | $992 | $1,766 | $907 | 🟢 |
| Domiciliarios - Expancion - INTER | $1,062 | $810 | $555 | $496 | $623 | $661 | 🟡 |
| Domiciliarios VIDEO Q58 - | $843 | $678 | $847 | $622 | $1,507 | $718 | 🟢 |
| Motorizados - INTER | $539 | $494 | $574 | $507 | $629 | $514 | 🟢 |
| TEST Creativos - API | $541 | $623 | $500 | $559 | $490 | $865 | 🔴 |
| Domiciliarios INTER - API | $462 | $284 | $362 | $290 | $380 | $316 | 🟢 |
| Domiciliarios VIDEO - API | $340 | $412 | $313 | $421 | $375 | $334 | 🟢 |
| RADIO - Fincas | $945 | $1,119 | $927 | $1,014 | $667 | $858 | 🔴 |
| Motorizados - API | $497 | $479 | $526 | $390 | $582 | $495 | 🟢 |
| RADIO - Broad | $1,668 | $1,112 | $1,166 | $916 | $1,342 | $2,132 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-31 | 11-01 | 11-02 | 11-03 | 11-04 | 11-05 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 11.52 | 9.95 | 7.11 | 7.17 | 12.34 | 8.52 | 🔴 |
| RADIO - Seguridad / Negocios | 6.02 | 5.10 | 2.02 | 3.19 | 2.96 | 4.65 | 🟢 |
| Domiciliarios VIDEO INTER - API | 8.48 | 6.37 | 5.33 | 7.38 | 8.30 | 6.89 | 🔴 |
| RADIO - Moteros | 2.24 | 3.20 | 1.68 | 1.62 | 2.00 | 2.06 | 🟡 |
| Domiciliarios - Expancion - Q58 | 10.19 | 9.72 | 7.74 | 6.90 | 10.09 | 7.27 | 🔴 |
| Motorizados - Q58 | 3.40 | 4.26 | 2.73 | 3.34 | 3.95 | 2.92 | 🔴 |
| Domiciliarios - Expancion - API | 9.43 | 8.85 | 8.73 | 5.79 | 7.44 | 7.90 | 🟢 |
| Domiciliarios Q58 - | 2.99 | 4.94 | 2.99 | 4.33 | 3.11 | 4.82 | 🟢 |
| Domiciliarios - Expancion - INTER | 2.69 | 3.86 | 3.83 | 3.85 | 4.77 | 3.96 | 🔴 |
| Domiciliarios VIDEO Q58 - | 4.16 | 5.10 | 3.07 | 3.87 | 2.48 | 3.95 | 🟢 |
| Motorizados - INTER | 13.19 | 14.23 | 8.96 | 11.83 | 11.09 | 12.04 | 🟢 |
| TEST Creativos - API | 6.22 | 6.27 | 6.74 | 6.72 | 6.70 | 5.65 | 🔴 |
| Domiciliarios INTER - API | 8.56 | 12.61 | 7.07 | 9.66 | 9.56 | 9.90 | 🟡 |
| Domiciliarios VIDEO - API | 9.68 | 7.93 | 7.25 | 6.23 | 9.44 | 9.46 | 🟡 |
| RADIO - Fincas | 4.77 | 4.17 | 4.36 | 3.29 | 6.60 | 4.71 | 🔴 |
| Motorizados - API | 8.55 | 9.32 | 7.22 | 7.69 | 7.75 | 7.63 | 🟡 |
| RADIO - Broad | 4.87 | 6.67 | 5.10 | 7.73 | 5.87 | 3.37 | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-10-30 | $408,080 | 721 | $566 | $4,179 | 7.38 | $749,308 |
| 2026-10-31 | $422,412 | 694 | $609 | $4,029 | 6.62 | $691,634 |
| 2026-11-01 | $457,484 | 787 | $581 | $4,079 | 7.02 | $805,851 |
| 2026-11-02 | $531,050 | 881 | $603 | $3,035 | 5.04 | $883,179 |
| 2026-11-03 | $440,741 | 799 | $552 | $2,933 | 5.32 | $841,857 |
| 2026-11-04 | $364,102 | 586 | $621 | $3,942 | 6.34 | $576,577 |

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
