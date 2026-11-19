# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-19 06:52 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$272,824** |
| gastado hoy (hasta las 6h) | $21,082 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $416,973 |
| saldo proyectado a medianoche | $-123,067 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $361,014 — entra en zona de freno a las 18:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–6:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-15 | $36,289 | 46 | **$789** | $3,182 | 4.03 |
| 2026-11-16 | $54,399 | 64 | **$850** | $2,908 | 3.42 |
| 2026-11-17 | $19,858 | 24 | **$827** | $3,043 | 3.68 |
| 2026-11-18 | $31,769 | 32 | **$993** | $4,546 | 4.58 |
| 2026-11-19 **HOY** | $21,082 | 42 | **$502** | $3,814 | 7.60 |

🟢 **Hoy va mejor que ayer a la misma hora** ($502 vs $993).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   502  =  $ 3,814  ÷  7.60
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,814 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.60 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $2,355 | 7% | 5 | $471 | 13.77 |
| RADIO - Moteros | $35,000 | $2,237 | 6% | 3 | $746 | 6.82 |
| RADIO - Seguridad / Negocios | $40,000 | $1,977 | 5% | 5 | $395 | 10.00 |
| Motorizados - Q58 | $29,000 | $1,914 | 7% | 1 | $1,914 | 1.29 |
| Domiciliarios - Expancion - API | $30,000 | $1,676 | 6% | 4 | $419 | 15.27 |
| Domiciliarios VIDEO INTER - API | $36,000 | $1,305 | 4% | 0 | — | 0.00 |
| Domiciliarios VIDEO - API | $20,000 | $1,250 | 6% | 4 | $312 | 17.09 |
| Domiciliarios - Expancion - INTER | $25,000 | $1,119 | 4% | 4 | $280 | 6.28 |
| Motorizados - API | $20,000 | $1,065 | 5% | 0 | — | 0.00 |
| Domiciliarios INTER - API | $20,000 | $1,007 | 5% | 7 | $144 | 24.22 |
| Domiciliarios Q58 - | $25,000 | $882 | 4% | 2 | $441 | 4.82 |
| Domiciliarios - Expancion - Q58 | $29,000 | $851 | 3% | 1 | $851 | 3.25 |
| RADIO - Fincas | $20,000 | $800 | 4% | 1 | $800 | 5.43 |
| Motorizados - INTER | $25,000 | $795 | 3% | 4 | $199 | 25.81 |
| Domiciliarios VIDEO Q58 - | $25,000 | $713 | 3% | 0 | — | 0.00 |
| TEST Creativos - API | $20,000 | $620 | 3% | 1 | $620 | 9.26 |
| RADIO - Broad | $10,000 | $516 | 5% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $21,082 | 42 | **$502** | $2,402 | **21%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$9,227**/pedido |
| utilidad estimada de lo que va del día | **$46,339** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | 11-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $779 | $736 | $895 | $878 | $830 | $471 | 🟢 |
| RADIO - Moteros | $1,535 | $2,037 | $1,613 | $1,801 | $1,549 | $746 | 🟢 |
| RADIO - Seguridad / Negocios | $1,219 | $1,185 | $1,584 | $1,321 | $1,106 | $395 | 🟢 |
| Motorizados - Q58 | $589 | $813 | $849 | $744 | $587 | $1,914 | 🔴 |
| Domiciliarios - Expancion - API | $1,193 | $1,162 | $1,056 | $833 | $873 | $419 | 🟢 |
| Domiciliarios VIDEO INTER - API | $645 | $706 | $653 | $919 | $1,010 | — | 🟡 |
| Domiciliarios VIDEO - API | $657 | $691 | $525 | $746 | $686 | $312 | 🟢 |
| Domiciliarios - Expancion - INTER | $652 | $596 | $625 | $640 | $610 | $280 | 🟢 |
| Motorizados - API | $935 | $1,022 | $667 | $971 | $689 | — | 🟢 |
| Domiciliarios INTER - API | $295 | $340 | $391 | $267 | $309 | $144 | 🟢 |
| Domiciliarios Q58 - | $1,913 | $1,204 | $1,195 | $1,035 | $1,135 | $441 | 🟢 |
| Domiciliarios - Expancion - Q58 | $372 | $331 | $303 | $319 | $295 | $851 | 🔴 |
| RADIO - Fincas | $1,038 | $887 | $1,274 | $1,079 | $1,343 | $800 | 🟢 |
| Motorizados - INTER | $514 | $652 | $679 | $532 | $567 | $199 | 🟢 |
| Domiciliarios VIDEO Q58 - | $709 | $1,015 | $1,119 | $773 | $1,095 | — | 🔴 |
| TEST Creativos - API | $622 | $930 | $824 | $689 | $761 | $620 | 🟢 |
| RADIO - Broad | $1,649 | $1,970 | $831 | $1,996 | $1,753 | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | 11-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 5.36 | 6.47 | 5.41 | 5.58 | 7.17 | 13.77 | 🟢 |
| RADIO - Moteros | 4.23 | 2.95 | 3.83 | 3.67 | 4.34 | 6.82 | 🟢 |
| RADIO - Seguridad / Negocios | 2.71 | 3.12 | 2.08 | 2.50 | 2.91 | 10.00 | 🟢 |
| Motorizados - Q58 | 2.80 | 2.54 | 2.83 | 3.35 | 4.01 | 1.29 | 🔴 |
| Domiciliarios - Expancion - API | 4.33 | 4.63 | 4.84 | 6.25 | 7.31 | 15.27 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.64 | 6.78 | 6.76 | 5.38 | 5.07 | — | 🟡 |
| Domiciliarios VIDEO - API | 5.31 | 5.52 | 7.02 | 5.55 | 7.73 | 17.09 | 🟢 |
| Domiciliarios - Expancion - INTER | 2.78 | 3.72 | 3.56 | 4.15 | 3.73 | 6.28 | 🟢 |
| Motorizados - API | 4.02 | 3.61 | 6.39 | 4.49 | 7.00 | — | 🟢 |
| Domiciliarios INTER - API | 9.64 | 9.01 | 7.19 | 12.39 | 11.25 | 24.22 | 🟢 |
| Domiciliarios Q58 - | 1.05 | 1.78 | 2.17 | 3.11 | 2.39 | 4.82 | 🟢 |
| Domiciliarios - Expancion - Q58 | 5.74 | 7.10 | 7.34 | 8.95 | 10.05 | 3.25 | 🔴 |
| RADIO - Fincas | 3.75 | 5.55 | 3.18 | 3.70 | 3.49 | 5.43 | 🟢 |
| Motorizados - INTER | 9.71 | 8.13 | 7.24 | 10.22 | 10.93 | 25.81 | 🟢 |
| Domiciliarios VIDEO Q58 - | 2.84 | 2.36 | 1.90 | 3.16 | 2.19 | — | 🔴 |
| TEST Creativos - API | 7.73 | 5.05 | 7.68 | 12.23 | 9.80 | 9.26 | 🟡 |
| RADIO - Broad | 3.73 | 3.66 | 9.38 | 2.96 | 3.64 | — | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,967 | 599 | $719 | $3,122 | 4.34 | $530,580 |
| 2026-11-15 | $466,194 | 613 | $761 | $3,444 | 4.53 | $517,827 |
| 2026-11-16 | $588,173 | 781 | $753 | $3,462 | 4.60 | $665,530 |
| 2026-11-17 | $354,929 | 497 | $714 | $3,835 | 5.37 | $442,882 |
| 2026-11-18 | $488,480 | 674 | $725 | $3,889 | 5.37 | $593,461 |

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
