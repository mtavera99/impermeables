# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-18 08:56 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$217,369** |
| gastado hoy (hasta las 8h) | $65,061 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $446,862 |
| saldo proyectado a medianoche | $-164,432 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $372,490 — entra en zona de freno a las 16:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–8:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-14 | $68,669 | 110 | **$624** | $3,308 | 5.30 |
| 2026-11-15 | $77,457 | 86 | **$901** | $3,775 | 4.19 |
| 2026-11-16 | $132,974 | 150 | **$886** | $3,144 | 3.55 |
| 2026-11-17 | $44,819 | 59 | **$760** | $3,261 | 4.29 |
| 2026-11-18 **HOY** | $65,061 | 84 | **$775** | $4,539 | 5.86 |

🟠 Hoy va 2% más caro que ayer a la misma hora ($775 vs $760).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   775  =  $ 4,539  ÷  5.86
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,539 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 5.86 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $6,902 | 20% | 7 | $986 | 6.43 |
| Domiciliarios - Expancion - API | $30,000 | $6,429 | 21% | 8 | $804 | 8.92 |
| RADIO - Moteros | $35,000 | $6,294 | 18% | 3 | $2,098 | 4.19 |
| Domiciliarios VIDEO INTER - API | $36,000 | $5,963 | 17% | 7 | $852 | 5.73 |
| RADIO - Seguridad / Negocios | $40,000 | $5,170 | 13% | 4 | $1,292 | 2.35 |
| Domiciliarios VIDEO - API | $20,000 | $4,708 | 24% | 10 | $471 | 9.96 |
| Motorizados - API | $20,000 | $3,548 | 18% | 2 | $1,774 | 2.87 |
| Domiciliarios INTER - API | $20,000 | $3,455 | 17% | 8 | $432 | 7.84 |
| Motorizados - Q58 | $29,000 | $3,454 | 12% | 7 | $493 | 5.54 |
| TEST Creativos - API | $20,000 | $3,091 | 15% | 4 | $773 | 8.32 |
| Domiciliarios - Expancion - INTER | $25,000 | $2,933 | 12% | 6 | $489 | 5.60 |
| RADIO - Fincas | $20,000 | $2,749 | 14% | 3 | $916 | 5.45 |
| Domiciliarios - Expancion - Q58 | $29,000 | $2,683 | 9% | 8 | $335 | 9.82 |
| Motorizados - INTER | $25,000 | $2,500 | 10% | 4 | $625 | 11.02 |
| Domiciliarios Q58 - | $25,000 | $2,443 | 10% | 2 | $1,222 | 2.64 |
| Domiciliarios VIDEO Q58 - | $25,000 | $1,568 | 6% | 1 | $1,568 | 1.91 |
| RADIO - Broad | $10,000 | $1,171 | 12% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $65,061 | 84 | **$775** | $2,402 | **32%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$14,238**/pedido |
| utilidad estimada de lo que va del día | **$69,780** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $1,151 | $779 | $736 | $895 | $875 | $986 | 🟡 |
| Domiciliarios - Expancion - API | $1,140 | $1,193 | $1,162 | $1,056 | $827 | $804 | 🟡 |
| RADIO - Moteros | $1,314 | $1,535 | $2,037 | $1,612 | $1,784 | $2,098 | 🔴 |
| Domiciliarios VIDEO INTER - API | $768 | $645 | $706 | $653 | $914 | $852 | 🟢 |
| RADIO - Seguridad / Negocios | $1,073 | $1,219 | $1,185 | $1,584 | $1,315 | $1,292 | 🟡 |
| Domiciliarios VIDEO - API | $564 | $657 | $691 | $525 | $743 | $471 | 🟢 |
| Motorizados - API | $793 | $935 | $1,022 | $667 | $965 | $1,774 | 🔴 |
| Domiciliarios INTER - API | $361 | $295 | $340 | $391 | $265 | $432 | 🔴 |
| Motorizados - Q58 | $612 | $589 | $813 | $849 | $743 | $493 | 🟢 |
| TEST Creativos - API | $661 | $622 | $930 | $824 | $689 | $773 | 🟡 |
| Domiciliarios - Expancion - INTER | $660 | $652 | $596 | $625 | $638 | $489 | 🟢 |
| RADIO - Fincas | $1,359 | $1,038 | $887 | $1,274 | $1,070 | $916 | 🟢 |
| Domiciliarios - Expancion - Q58 | $348 | $372 | $331 | $303 | $316 | $335 | 🟡 |
| Motorizados - INTER | $656 | $514 | $652 | $679 | $531 | $625 | 🔴 |
| Domiciliarios Q58 - | $1,039 | $1,913 | $1,204 | $1,195 | $1,034 | $1,222 | 🔴 |
| Domiciliarios VIDEO Q58 - | $880 | $709 | $1,015 | $1,119 | $771 | $1,568 | 🔴 |
| RADIO - Broad | $1,916 | $1,649 | $1,970 | $831 | $1,977 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 3.74 | 5.36 | 6.47 | 5.41 | 5.59 | 6.43 | 🟢 |
| Domiciliarios - Expancion - API | 4.02 | 4.33 | 4.63 | 4.84 | 6.29 | 8.92 | 🟢 |
| RADIO - Moteros | 3.80 | 4.23 | 2.95 | 3.83 | 3.70 | 4.19 | 🟢 |
| Domiciliarios VIDEO INTER - API | 6.46 | 6.64 | 6.78 | 6.76 | 5.40 | 5.73 | 🟢 |
| RADIO - Seguridad / Negocios | 2.84 | 2.71 | 3.12 | 2.08 | 2.51 | 2.35 | 🟡 |
| Domiciliarios VIDEO - API | 5.83 | 5.31 | 5.52 | 7.02 | 5.57 | 9.96 | 🟢 |
| Motorizados - API | 4.55 | 4.02 | 3.61 | 6.39 | 4.52 | 2.87 | 🔴 |
| Domiciliarios INTER - API | 7.88 | 9.64 | 9.01 | 7.19 | 12.43 | 7.84 | 🔴 |
| Motorizados - Q58 | 3.43 | 2.80 | 2.54 | 2.83 | 3.36 | 5.54 | 🟢 |
| TEST Creativos - API | 7.75 | 7.73 | 5.05 | 7.68 | 12.23 | 8.32 | 🔴 |
| Domiciliarios - Expancion - INTER | 2.96 | 2.78 | 3.72 | 3.56 | 4.16 | 5.60 | 🟢 |
| RADIO - Fincas | 3.20 | 3.75 | 5.55 | 3.18 | 3.72 | 5.45 | 🟢 |
| Domiciliarios - Expancion - Q58 | 7.05 | 5.74 | 7.10 | 7.34 | 9.01 | 9.82 | 🟢 |
| Motorizados - INTER | 7.89 | 9.71 | 8.13 | 7.24 | 10.26 | 11.02 | 🟢 |
| Domiciliarios Q58 - | 2.20 | 1.05 | 1.78 | 2.17 | 3.11 | 2.64 | 🔴 |
| Domiciliarios VIDEO Q58 - | 2.51 | 2.84 | 2.36 | 1.90 | 3.17 | 1.91 | 🔴 |
| RADIO - Broad | 3.51 | 3.73 | 3.66 | 9.38 | 2.99 | — | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-12 | $423,316 | 553 | $765 | $3,631 | 4.74 | $464,390 |
| 2026-11-13 | $476,904 | 636 | $750 | $3,289 | 4.39 | $544,038 |
| 2026-11-14 | $430,967 | 599 | $719 | $3,122 | 4.34 | $530,580 |
| 2026-11-15 | $466,194 | 613 | $761 | $3,444 | 4.53 | $517,827 |
| 2026-11-16 | $588,140 | 781 | $753 | $3,462 | 4.60 | $665,563 |
| 2026-11-17 | $353,254 | 497 | $711 | $3,832 | 5.39 | $444,557 |

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
