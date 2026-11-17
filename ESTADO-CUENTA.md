# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-17 12:13 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$158,407** |
| gastado hoy (hasta las 12h) | $79,217 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $364,478 |
| saldo proyectado a medianoche | $-126,854 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $417,296 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–12:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-13 | $170,606 | 228 | **$748** | $3,391 | 4.53 |
| 2026-11-14 | $159,625 | 218 | **$732** | $3,423 | 4.68 |
| 2026-11-15 | $178,491 | 198 | **$901** | $3,960 | 4.39 |
| 2026-11-16 | $303,935 | 349 | **$871** | $3,387 | 3.89 |
| 2026-11-17 **HOY** | $79,217 | 127 | **$624** | $3,506 | 5.62 |

🟢 **Hoy va mejor que ayer a la misma hora** ($624 vs $871).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   624  =  $ 3,506  ÷  5.62
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,506 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.62 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $9,227 | 23% | 4 | $2,307 | 1.29 |
| Domiciliarios VIDEO INTER - API | $36,000 | $7,107 | 20% | 8 | $888 | 5.04 |
| Domiciliarios - API | $35,000 | $6,606 | 19% | 10 | $661 | 8.50 |
| Motorizados - INTER | $25,000 | $6,603 | 26% | 14 | $472 | 9.51 |
| RADIO - Moteros | $35,000 | $6,378 | 18% | 4 | $1,594 | 3.49 |
| Motorizados - Q58 | $29,000 | $4,508 | 16% | 14 | $322 | 6.48 |
| Domiciliarios - Expancion - API | $30,000 | $4,399 | 15% | 4 | $1,100 | 4.77 |
| Domiciliarios VIDEO - API | $20,000 | $4,087 | 20% | 7 | $584 | 6.48 |
| Domiciliarios VIDEO Q58 - | $25,000 | $4,058 | 16% | 9 | $451 | 5.14 |
| Domiciliarios INTER - API | $20,000 | $3,958 | 20% | 17 | $233 | 12.21 |
| Domiciliarios - Expancion - Q58 | $29,000 | $3,932 | 14% | 14 | $281 | 8.55 |
| Domiciliarios - Expancion - INTER | $25,000 | $3,832 | 15% | 8 | $479 | 5.40 |
| RADIO - Fincas | $20,000 | $3,722 | 19% | 2 | $1,861 | 1.78 |
| Motorizados - API | $20,000 | $3,414 | 17% | 1 | $3,414 | 1.31 |
| RADIO - Broad | $10,000 | $2,788 | 28% | 3 | $929 | 5.71 |
| Domiciliarios Q58 - | $25,000 | $2,713 | 11% | 3 | $904 | 2.94 |
| TEST Creativos - API | $20,000 | $1,885 | 9% | 3 | $628 | 8.60 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $79,217 | 125 | **$634** | $2,402 | **26%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$11,650**/pedido |
| utilidad estimada de lo que va del día | **$121,440** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $937 | $1,073 | $1,219 | $1,185 | $1,580 | $2,307 | 🔴 |
| Domiciliarios VIDEO INTER - API | $875 | $768 | $645 | $706 | $651 | $888 | 🔴 |
| Domiciliarios - API | $757 | $1,151 | $779 | $736 | $893 | $661 | 🟢 |
| Motorizados - INTER | $758 | $656 | $514 | $652 | $677 | $472 | 🟢 |
| RADIO - Moteros | $2,042 | $1,314 | $1,535 | $2,037 | $1,605 | $1,594 | 🟡 |
| Motorizados - Q58 | $913 | $612 | $589 | $813 | $849 | $322 | 🟢 |
| Domiciliarios - Expancion - API | $842 | $1,140 | $1,193 | $1,162 | $1,055 | $1,100 | 🟡 |
| Domiciliarios VIDEO - API | $939 | $564 | $657 | $691 | $523 | $584 | 🟡 |
| Domiciliarios VIDEO Q58 - | $800 | $880 | $709 | $1,015 | $1,119 | $451 | 🟢 |
| Domiciliarios INTER - API | $344 | $361 | $295 | $340 | $390 | $233 | 🟢 |
| Domiciliarios - Expancion - Q58 | $360 | $348 | $372 | $331 | $302 | $281 | 🟢 |
| Domiciliarios - Expancion - INTER | $606 | $660 | $652 | $596 | $624 | $479 | 🟢 |
| RADIO - Fincas | $939 | $1,359 | $1,038 | $887 | $1,264 | $1,861 | 🔴 |
| Motorizados - API | $770 | $793 | $935 | $1,022 | $665 | $3,414 | 🔴 |
| RADIO - Broad | $1,617 | $1,916 | $1,649 | $1,970 | $829 | $929 | 🟡 |
| Domiciliarios Q58 - | $1,051 | $1,039 | $1,913 | $1,204 | $1,195 | $904 | 🟢 |
| TEST Creativos - API | $894 | $661 | $622 | $930 | $824 | $628 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 3.92 | 2.84 | 2.71 | 3.12 | 2.08 | 1.29 | 🔴 |
| Domiciliarios VIDEO INTER - API | 5.43 | 6.46 | 6.64 | 6.78 | 6.78 | 5.04 | 🔴 |
| Domiciliarios - API | 6.19 | 3.74 | 5.36 | 6.47 | 5.42 | 8.50 | 🟢 |
| Motorizados - INTER | 8.51 | 7.89 | 9.71 | 8.13 | 7.26 | 9.51 | 🟢 |
| RADIO - Moteros | 2.69 | 3.80 | 4.23 | 2.95 | 3.85 | 3.49 | 🟡 |
| Motorizados - Q58 | 2.66 | 3.43 | 2.80 | 2.54 | 2.83 | 6.48 | 🟢 |
| Domiciliarios - Expancion - API | 5.92 | 4.02 | 4.33 | 4.63 | 4.85 | 4.77 | 🟡 |
| Domiciliarios VIDEO - API | 3.75 | 5.83 | 5.31 | 5.52 | 7.03 | 6.48 | 🟡 |
| Domiciliarios VIDEO Q58 - | 3.42 | 2.51 | 2.84 | 2.36 | 1.90 | 5.14 | 🟢 |
| Domiciliarios INTER - API | 10.69 | 7.88 | 9.64 | 9.01 | 7.20 | 12.21 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.65 | 7.05 | 5.74 | 7.10 | 7.36 | 8.55 | 🟢 |
| Domiciliarios - Expancion - INTER | 3.71 | 2.96 | 2.78 | 3.72 | 3.56 | 5.40 | 🟢 |
| RADIO - Fincas | 4.56 | 3.20 | 3.75 | 5.55 | 3.19 | 1.78 | 🔴 |
| Motorizados - API | 4.98 | 4.55 | 4.02 | 3.61 | 6.41 | 1.31 | 🔴 |
| RADIO - Broad | 4.62 | 3.51 | 3.73 | 3.66 | 9.41 | 5.71 | 🔴 |
| Domiciliarios Q58 - | 2.21 | 2.20 | 1.05 | 1.78 | 2.17 | 2.94 | 🟢 |
| TEST Creativos - API | 6.24 | 7.75 | 7.73 | 5.05 | 7.68 | 8.60 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-11 | $449,265 | 687 | $654 | $3,664 | 5.60 | $653,545 |
| 2026-11-12 | $423,316 | 553 | $765 | $3,631 | 4.74 | $464,390 |
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,967 | 599 | $719 | $3,122 | 4.34 | $530,580 |
| 2026-11-15 | $466,194 | 613 | $761 | $3,444 | 4.53 | $517,827 |
| 2026-11-16 | $586,753 | 781 | $751 | $3,460 | 4.61 | $666,950 |

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
