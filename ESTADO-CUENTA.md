# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-16 23:58 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$243,920** |
| gastado hoy (hasta las 23h) | $580,947 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $580,947 |
| saldo proyectado a medianoche | $243,920 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🟢 Saldo suficiente. No hace falta recargar.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–23:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-12 | $423,316 | 553 | **$765** | $3,631 | 4.74 |
| 2026-11-13 | $476,904 | 636 | **$750** | $3,289 | 4.39 |
| 2026-11-14 | $430,967 | 599 | **$719** | $3,122 | 4.34 |
| 2026-11-15 | $466,084 | 613 | **$760** | $3,443 | 4.53 |
| 2026-11-16 **HOY** | $580,899 | 777 | **$748** | $3,458 | 4.63 |

🟢 **Hoy va mejor que ayer a la misma hora** ($748 vs $760).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   748  =  $ 3,458  ÷  4.63
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,458 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 4.63 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $56,080 | 140% | 36 | $1,558 | 2.11 |
| Domiciliarios VIDEO INTER - API | $36,000 | $48,925 | 136% | 76 | $644 | 6.86 |
| Domiciliarios - API | $35,000 | $45,220 | 129% | 50 | $904 | 5.36 |
| RADIO - Moteros | $35,000 | $44,057 | 126% | 28 | $1,573 | 3.91 |
| Domiciliarios - Expancion - API | $30,000 | $39,724 | 132% | 38 | $1,045 | 4.89 |
| Motorizados - Q58 | $29,000 | $37,947 | 131% | 45 | $843 | 2.85 |
| Domiciliarios - Expancion - Q58 | $29,000 | $36,324 | 125% | 122 | $298 | 7.46 |
| Motorizados - INTER | $25,000 | $33,587 | 134% | 50 | $672 | 7.34 |
| Domiciliarios - Expancion - INTER | $25,000 | $32,259 | 129% | 52 | $620 | 3.58 |
| Domiciliarios VIDEO Q58 - | $25,000 | $32,207 | 129% | 28 | $1,150 | 1.85 |
| Domiciliarios Q58 - | $25,000 | $30,975 | 124% | 26 | $1,191 | 2.18 |
| Domiciliarios INTER - API | $20,000 | $27,003 | 135% | 69 | $391 | 7.17 |
| Domiciliarios VIDEO - API | $20,000 | $26,848 | 134% | 51 | $526 | 6.97 |
| RADIO - Fincas | $20,000 | $26,236 | 131% | 21 | $1,249 | 3.24 |
| Motorizados - API | $20,000 | $25,809 | 129% | 39 | $662 | 6.45 |
| TEST Creativos - API | $20,000 | $24,593 | 123% | 30 | $820 | 7.70 |
| RADIO - Broad | $10,000 | $13,144 | 131% | 16 | $822 | 9.54 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $580,938 | 777 | **$748** | $2,402 | **31%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$13,744**/pedido |
| utilidad estimada de lo que va del día | **$666,344** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $1,142 | $937 | $1,073 | $1,219 | $1,184 | $1,558 | 🔴 |
| Domiciliarios VIDEO INTER - API | $713 | $875 | $768 | $645 | $706 | $644 | 🟢 |
| Domiciliarios - API | $856 | $757 | $1,151 | $779 | $736 | $904 | 🔴 |
| RADIO - Moteros | $1,757 | $2,042 | $1,314 | $1,535 | $2,036 | $1,573 | 🟢 |
| Domiciliarios - Expancion - API | $841 | $842 | $1,140 | $1,193 | $1,161 | $1,045 | 🟢 |
| Motorizados - Q58 | $643 | $913 | $612 | $589 | $813 | $843 | 🟡 |
| Domiciliarios - Expancion - Q58 | $296 | $360 | $348 | $372 | $331 | $298 | 🟢 |
| Motorizados - INTER | $484 | $758 | $656 | $514 | $652 | $672 | 🟡 |
| Domiciliarios - Expancion - INTER | $623 | $606 | $660 | $652 | $596 | $620 | 🟡 |
| Domiciliarios VIDEO Q58 - | $603 | $800 | $880 | $709 | $1,015 | $1,150 | 🟡 |
| Domiciliarios Q58 - | $877 | $1,051 | $1,039 | $1,913 | $1,204 | $1,191 | 🟡 |
| Domiciliarios INTER - API | $285 | $344 | $361 | $295 | $340 | $391 | 🟡 |
| Domiciliarios VIDEO - API | $635 | $939 | $564 | $657 | $691 | $526 | 🟢 |
| RADIO - Fincas | $1,254 | $939 | $1,359 | $1,038 | $887 | $1,249 | 🔴 |
| Motorizados - API | $840 | $770 | $793 | $935 | $1,020 | $662 | 🟢 |
| TEST Creativos - API | $740 | $894 | $661 | $622 | $930 | $820 | 🟢 |
| RADIO - Broad | $970 | $1,617 | $1,916 | $1,649 | $1,970 | $822 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 3.47 | 3.92 | 2.84 | 2.71 | 3.12 | 2.11 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.64 | 5.43 | 6.46 | 6.64 | 6.78 | 6.86 | 🟡 |
| Domiciliarios - API | 5.31 | 6.19 | 3.74 | 5.36 | 6.47 | 5.36 | 🔴 |
| RADIO - Moteros | 3.35 | 2.69 | 3.80 | 4.23 | 2.95 | 3.91 | 🟢 |
| Domiciliarios - Expancion - API | 5.77 | 5.92 | 4.02 | 4.33 | 4.63 | 4.89 | 🟢 |
| Motorizados - Q58 | 4.00 | 2.66 | 3.43 | 2.80 | 2.54 | 2.85 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.99 | 7.65 | 7.05 | 5.74 | 7.10 | 7.46 | 🟢 |
| Motorizados - INTER | 11.33 | 8.51 | 7.89 | 9.71 | 8.13 | 7.34 | 🟡 |
| Domiciliarios - Expancion - INTER | 3.69 | 3.71 | 2.96 | 2.78 | 3.72 | 3.58 | 🟡 |
| Domiciliarios VIDEO Q58 - | 4.55 | 3.42 | 2.51 | 2.84 | 2.36 | 1.85 | 🔴 |
| Domiciliarios Q58 - | 3.18 | 2.21 | 2.20 | 1.05 | 1.78 | 2.18 | 🟢 |
| Domiciliarios INTER - API | 11.04 | 10.69 | 7.88 | 9.64 | 9.01 | 7.17 | 🔴 |
| Domiciliarios VIDEO - API | 6.40 | 3.75 | 5.83 | 5.31 | 5.52 | 6.97 | 🟢 |
| RADIO - Fincas | 3.68 | 4.56 | 3.20 | 3.75 | 5.55 | 3.24 | 🔴 |
| Motorizados - API | 4.32 | 4.98 | 4.55 | 4.02 | 3.61 | 6.45 | 🟢 |
| TEST Creativos - API | 7.39 | 6.24 | 7.75 | 7.73 | 5.05 | 7.70 | 🟢 |
| RADIO - Broad | 8.34 | 4.62 | 3.51 | 3.73 | 3.66 | 9.54 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-10 | $377,307 | 577 | $654 | $3,781 | 5.78 | $548,925 |
| 2026-11-11 | $449,265 | 687 | $654 | $3,664 | 5.60 | $653,545 |
| 2026-11-12 | $423,316 | 553 | $765 | $3,631 | 4.74 | $464,390 |
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,967 | 599 | $719 | $3,122 | 4.34 | $530,580 |
| 2026-11-15 | $466,084 | 613 | $760 | $3,443 | 4.53 | $517,937 |

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
