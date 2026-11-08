# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-11-08 15:59 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$42,004** |
| gastado hoy (hasta las 15h) | $300,100 |
| presupuesto activo | $444,000/día |
| cierre proyectado del día | $466,962 |
| saldo proyectado a medianoche | $-124,858 |
| objetivo (cubrir un día de 143% + colchón) | $654,920 |

### 🔴 RECARGAR $312,816 — entra en zona de freno a las 16:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-11-04 | $165,286 | 237 | **$697** | $4,454 | 6.39 |
| 2026-11-05 | $233,158 | 360 | **$648** | $3,891 | 6.01 |
| 2026-11-06 | $241,964 | 404 | **$599** | $3,267 | 5.46 |
| 2026-11-07 | $224,039 | 378 | **$593** | $3,464 | 5.84 |
| 2026-11-08 **HOY** | $300,100 | 548 | **$548** | $2,995 | 5.47 |

🟢 **Hoy va mejor que ayer a la misma hora** ($548 vs $593).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   548  =  $ 2,995  ÷  5.47
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $2,995 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.47 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $40,000 | $28,063 | 70% | 27 | $1,039 | 2.84 |
| Domiciliarios - API | $35,000 | $25,103 | 72% | 54 | $465 | 8.23 |
| RADIO - Moteros | $35,000 | $23,949 | 68% | 15 | $1,597 | 1.99 |
| Domiciliarios - Expancion - API | $30,000 | $21,885 | 73% | 42 | $521 | 7.62 |
| Domiciliarios VIDEO INTER - API | $36,000 | $20,821 | 58% | 33 | $631 | 6.52 |
| Domiciliarios - Expancion - Q58 | $29,000 | $20,028 | 69% | 76 | $264 | 7.72 |
| Motorizados - Q58 | $29,000 | $18,961 | 65% | 27 | $702 | 2.63 |
| Domiciliarios - Expancion - INTER | $25,000 | $18,091 | 72% | 41 | $441 | 4.58 |
| Domiciliarios VIDEO Q58 - | $25,000 | $16,873 | 67% | 29 | $582 | 4.62 |
| Domiciliarios Q58 - | $25,000 | $16,684 | 67% | 20 | $834 | 3.31 |
| Motorizados - INTER | $25,000 | $16,476 | 66% | 31 | $531 | 7.87 |
| Domiciliarios VIDEO - API | $20,000 | $14,798 | 74% | 46 | $322 | 8.39 |
| TEST Creativos - API | $20,000 | $14,535 | 73% | 22 | $661 | 7.83 |
| Motorizados - API | $20,000 | $13,173 | 66% | 26 | $507 | 6.42 |
| RADIO - Fincas | $20,000 | $11,834 | 59% | 17 | $696 | 5.80 |
| Domiciliarios INTER - API | $20,000 | $11,260 | 56% | 34 | $331 | 7.94 |
| RADIO - Broad | $10,000 | $7,566 | 76% | 8 | $946 | 6.88 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $300,100 | 548 | **$548** | $2,402 | **23%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,067**/pedido |
| utilidad estimada de lo que va del día | **$579,579** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 11-03 | 11-04 | 11-05 | 11-06 | 11-07 | 11-08 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | $888 | $1,325 | $831 | $976 | $1,003 | $1,039 | 🟡 |
| Domiciliarios - API | $511 | $426 | $495 | $449 | $453 | $465 | 🟡 |
| RADIO - Moteros | $1,901 | $1,800 | $1,835 | $3,195 | $1,572 | $1,597 | 🟡 |
| Domiciliarios - Expancion - API | $624 | $662 | $555 | $536 | $641 | $521 | 🟢 |
| Domiciliarios VIDEO INTER - API | $563 | $657 | $701 | $685 | $528 | $631 | 🔴 |
| Domiciliarios - Expancion - Q58 | $253 | $238 | $307 | $258 | $295 | $264 | 🟢 |
| Motorizados - Q58 | $559 | $621 | $738 | $646 | $441 | $702 | 🔴 |
| Domiciliarios - Expancion - INTER | $496 | $623 | $618 | $432 | $621 | $441 | 🟢 |
| Domiciliarios VIDEO Q58 - | $622 | $1,507 | $701 | $619 | $741 | $582 | 🟢 |
| Domiciliarios Q58 - | $992 | $1,766 | $975 | $919 | $1,059 | $834 | 🟢 |
| Motorizados - INTER | $507 | $629 | $524 | $540 | $517 | $531 | 🟡 |
| Domiciliarios VIDEO - API | $421 | $375 | $326 | $327 | $363 | $322 | 🟢 |
| TEST Creativos - API | $559 | $490 | $780 | $662 | $425 | $661 | 🔴 |
| Motorizados - API | $390 | $582 | $477 | $377 | $351 | $507 | 🔴 |
| RADIO - Fincas | $1,014 | $669 | $801 | $1,231 | $752 | $696 | 🟢 |
| Domiciliarios INTER - API | $290 | $380 | $319 | $301 | $317 | $331 | 🟡 |
| RADIO - Broad | $916 | $1,342 | $1,997 | $942 | $1,435 | $946 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 11-03 | 11-04 | 11-05 | 11-06 | 11-07 | 11-08 | |
|---|---|---|---|---|---|---|---|
| RADIO - Seguridad / Negocios | 3.19 | 2.96 | 4.32 | 3.19 | 3.42 | 2.84 | 🔴 |
| Domiciliarios - API | 7.17 | 12.34 | 8.64 | 8.77 | 8.32 | 8.23 | 🟡 |
| RADIO - Moteros | 1.62 | 2.00 | 1.94 | 1.13 | 2.45 | 1.99 | 🔴 |
| Domiciliarios - Expancion - API | 5.79 | 7.44 | 7.98 | 7.65 | 6.45 | 7.62 | 🟢 |
| Domiciliarios VIDEO INTER - API | 7.38 | 8.30 | 6.93 | 6.95 | 8.12 | 6.52 | 🔴 |
| Domiciliarios - Expancion - Q58 | 6.90 | 10.09 | 7.54 | 8.12 | 7.82 | 7.72 | 🟡 |
| Motorizados - Q58 | 3.34 | 3.95 | 3.07 | 2.94 | 4.45 | 2.63 | 🔴 |
| Domiciliarios - Expancion - INTER | 3.85 | 4.77 | 4.10 | 4.91 | 3.36 | 4.58 | 🟢 |
| Domiciliarios VIDEO Q58 - | 3.87 | 2.48 | 3.90 | 4.63 | 3.43 | 4.62 | 🟢 |
| Domiciliarios Q58 - | 4.33 | 3.11 | 4.32 | 3.03 | 2.54 | 3.31 | 🟢 |
| Motorizados - INTER | 11.83 | 11.09 | 11.50 | 10.43 | 9.79 | 7.87 | 🔴 |
| Domiciliarios VIDEO - API | 6.23 | 9.44 | 9.54 | 9.47 | 8.75 | 8.39 | 🟡 |
| TEST Creativos - API | 6.72 | 6.70 | 6.18 | 6.64 | 11.59 | 7.83 | 🔴 |
| Motorizados - API | 7.69 | 7.75 | 7.85 | 9.51 | 8.93 | 6.42 | 🔴 |
| RADIO - Fincas | 3.29 | 6.60 | 4.89 | 2.79 | 4.92 | 5.80 | 🟢 |
| Domiciliarios INTER - API | 9.66 | 9.56 | 9.65 | 10.36 | 8.21 | 7.94 | 🟡 |
| RADIO - Broad | 7.73 | 5.87 | 3.58 | 6.44 | 3.79 | 6.88 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-11-02 | $531,050 | 881 | $603 | $3,035 | 5.04 | $883,179 |
| 2026-11-03 | $440,741 | 799 | $552 | $2,933 | 5.32 | $841,857 |
| 2026-11-04 | $364,227 | 586 | $622 | $3,943 | 6.34 | $576,452 |
| 2026-11-05 | $512,966 | 868 | $591 | $3,497 | 5.92 | $880,395 |
| 2026-11-06 | $432,002 | 793 | $545 | $3,186 | 5.85 | $840,965 |
| 2026-11-07 | $367,724 | 678 | $542 | $3,154 | 5.81 | $720,638 |

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
