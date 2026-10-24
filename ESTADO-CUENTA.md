# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-24 08:15 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$90,965** |
| gastado hoy (hasta las 8h) | $57,865 |
| presupuesto activo | $400,000/día |
| cierre proyectado del día | $305,704 |
| saldo proyectado a medianoche | $-156,874 |
| objetivo (cubrir un día de 143% + colchón) | $592,000 |

### 🔴 RECARGAR $443,170 — entra en zona de freno a las 13:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–8:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-20 | $57,087 | 107 | **$534** | $3,125 | 5.86 |
| 2026-10-21 | $82,150 | 182 | **$451** | $3,818 | 8.46 |
| 2026-10-22 | $67,906 | 164 | **$414** | $3,831 | 9.25 |
| 2026-10-23 | $49,485 | 114 | **$434** | $3,308 | 7.62 |
| 2026-10-24 **HOY** | $57,865 | 101 | **$573** | $3,359 | 5.86 |

🟠 Hoy va 32% más caro que ayer a la misma hora ($573 vs $434).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   573  =  $ 3,359  ÷  5.86
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,359 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 5.86 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | $5,626 | 16% | 10 | $563 | 6.71 |
| Domiciliarios - Expancion - API | $40,000 | $5,400 | 14% | 7 | $771 | 4.33 |
| RADIO - Seguridad / Negocios | $25,000 | $5,081 | 20% | 7 | $726 | 5.98 |
| TEST Creativos - API | $30,000 | $4,444 | 15% | 15 | $296 | 11.79 |
| RADIO - Fincas | $20,000 | $4,351 | 22% | 7 | $622 | 7.66 |
| Domiciliarios - Expancion - INTER | $25,000 | $3,641 | 15% | 4 | $910 | 3.11 |
| Domiciliarios VIDEO - API | $20,000 | $3,633 | 18% | 8 | $454 | 5.41 |
| Domiciliarios Q58 - | $25,000 | $3,370 | 13% | 16 | $211 | 9.28 |
| RADIO - Moteros | $20,000 | $3,298 | 16% | 3 | $1,099 | 4.00 |
| Motorizados - API | $20,000 | $3,126 | 16% | 4 | $782 | 4.37 |
| Domiciliarios INTER - API | $25,000 | $2,906 | 12% | 3 | $969 | 3.43 |
| Domiciliarios VIDEO INTER - API | $25,000 | $2,787 | 11% | 5 | $557 | 6.51 |
| Motorizados - Q58 | $20,000 | $2,630 | 13% | 6 | $438 | 6.03 |
| Domiciliarios VIDEO Q58 - | $25,000 | $2,619 | 10% | 0 | — | 0.00 |
| Domiciliarios - Expancion - Q58 | $20,000 | $2,608 | 13% | 2 | $1,304 | 3.22 |
| Motorizados - INTER | $25,000 | $2,453 | 10% | 3 | $818 | 6.30 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $57,973 | 100 | **$580** | $2,402 | **24%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$10,657**/pedido |
| utilidad estimada de lo que va del día | **$102,552** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | $464 | $484 | $348 | $370 | $415 | $563 | 🔴 |
| Domiciliarios - Expancion - API | $485 | $583 | $424 | $444 | $514 | $771 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | $726 |  |
| TEST Creativos - API | $475 | $609 | $535 | $379 | $480 | $296 | 🟢 |
| RADIO - Fincas | — | — | — | — | — | $622 |  |
| Domiciliarios VIDEO - API | $430 | $319 | $269 | $292 | $336 | $462 | 🔴 |
| Domiciliarios - Expancion - INTER | $536 | $629 | $604 | $721 | $660 | $910 | 🔴 |
| Domiciliarios Q58 - | $166 | $185 | $197 | $159 | $215 | $211 | 🟡 |
| RADIO - Moteros | — | — | — | — | — | $1,099 |  |
| Motorizados - API | $579 | $470 | $446 | $379 | $454 | $782 | 🔴 |
| Domiciliarios INTER - API | $240 | $324 | $304 | $314 | $329 | $969 | 🔴 |
| Domiciliarios VIDEO INTER - API | $534 | $576 | $701 | $742 | $644 | $557 | 🟢 |
| Motorizados - Q58 | $732 | $545 | $1,025 | $599 | $511 | $446 | 🟢 |
| Domiciliarios VIDEO Q58 - | $586 | $642 | $995 | $1,091 | $678 | — | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,462 | $1,121 | $1,077 | $892 | $1,113 | $1,304 | 🔴 |
| Motorizados - INTER | $480 | $591 | $460 | $545 | $709 | $818 | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-19 | 10-20 | 10-21 | 10-22 | 10-23 | 10-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - API | 7.58 | 9.53 | 14.10 | 12.13 | 9.66 | 6.71 | 🔴 |
| Domiciliarios - Expancion - API | 7.80 | 7.58 | 11.99 | 10.38 | 8.18 | 4.33 | 🔴 |
| RADIO - Seguridad / Negocios | — | — | — | — | — | 5.98 |  |
| TEST Creativos - API | 9.85 | 8.80 | 11.03 | 14.31 | 8.93 | 11.79 | 🟢 |
| RADIO - Fincas | — | — | — | — | — | 7.66 |  |
| Domiciliarios VIDEO - API | 6.55 | 11.78 | 14.69 | 10.98 | 9.23 | 5.30 | 🔴 |
| Domiciliarios - Expancion - INTER | 5.28 | 4.46 | 5.33 | 4.21 | 4.85 | 3.11 | 🔴 |
| Domiciliarios Q58 - | 13.71 | 13.11 | 11.07 | 12.89 | 10.75 | 9.28 | 🟡 |
| RADIO - Moteros | — | — | — | — | — | 4.00 |  |
| Motorizados - API | 5.69 | 8.05 | 9.31 | 10.45 | 8.64 | 4.37 | 🔴 |
| Domiciliarios INTER - API | 6.33 | 11.02 | 12.17 | 9.39 | 7.61 | 3.43 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.43 | 7.46 | 5.98 | 5.52 | 6.46 | 6.51 | 🟡 |
| Motorizados - Q58 | 4.15 | 5.75 | 3.32 | 5.14 | 5.84 | 5.93 | 🟡 |
| Domiciliarios VIDEO Q58 - | 5.02 | 3.62 | 3.19 | 2.96 | 4.99 | — | 🟢 |
| Domiciliarios - Expancion - Q58 | 2.02 | 2.71 | 3.65 | 4.52 | 3.95 | 3.22 | 🔴 |
| Motorizados - INTER | 8.02 | 8.76 | 13.59 | 11.01 | 8.05 | 6.30 | 🔴 |

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
| 2026-10-23 | $295,803 | 630 | $470 | $3,552 | 7.56 | $715,507 |

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
