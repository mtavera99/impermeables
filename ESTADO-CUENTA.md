# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-10-28 08:11 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$104,946** |
| gastado hoy (hasta las 8h) | $52,990 |
| presupuesto activo | $428,000/día |
| cierre proyectado del día | $412,198 |
| saldo proyectado a medianoche | $-254,262 |
| objetivo (cubrir un día de 143% + colchón) | $632,040 |

### 🔴 RECARGAR $474,104 — entra en zona de freno a las 12:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–8:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-10-24 | $81,043 | 141 | **$575** | $3,431 | 5.97 |
| 2026-10-25 | $77,567 | 176 | **$441** | $3,315 | 7.52 |
| 2026-10-26 | $90,835 | 180 | **$505** | $3,257 | 6.45 |
| 2026-10-27 | $72,631 | 182 | **$399** | $3,556 | 8.91 |
| 2026-10-28 **HOY** | $53,164 | 111 | **$479** | $3,761 | 7.85 |

🟠 Hoy va 20% más caro que ayer a la misma hora ($479 vs $399).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   479  =  $ 3,761  ÷  7.85
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,761 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 7.85 | 5,33 | 🟢 |


---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| RADIO - Broad | $40,000 | $6,799 | 17% | 4 | $1,700 | 4.35 |
| Domiciliarios - API | $35,000 | $5,185 | 15% | 9 | $576 | 8.09 |
| Domiciliarios - Expancion - API | $30,000 | $4,229 | 14% | 2 | $2,114 | 1.88 |
| Domiciliarios VIDEO INTER - API | $30,000 | $3,957 | 13% | 9 | $440 | 10.80 |
| RADIO - Seguridad / Negocios | $25,000 | $3,334 | 13% | 1 | $3,334 | 1.33 |
| TEST Creativos - API | $20,000 | $3,315 | 17% | 10 | $332 | 10.54 |
| Motorizados - API | $20,000 | $3,075 | 15% | 10 | $308 | 13.12 |
| Domiciliarios VIDEO - API | $20,000 | $3,012 | 15% | 12 | $251 | 12.93 |
| Motorizados - Q58 | $24,000 | $2,989 | 12% | 6 | $498 | 4.02 |
| Motorizados - INTER | $25,000 | $2,653 | 11% | 9 | $295 | 23.08 |
| Domiciliarios - Expancion - Q58 | $24,000 | $2,492 | 10% | 12 | $208 | 11.78 |
| Domiciliarios VIDEO Q58 - | $25,000 | $2,163 | 9% | 1 | $2,163 | 1.67 |
| Domiciliarios INTER - API | $20,000 | $2,151 | 11% | 9 | $239 | 12.97 |
| RADIO - Moteros | $20,000 | $2,133 | 11% | 0 | — | 0.00 |
| Domiciliarios - Expancion - INTER | $25,000 | $2,001 | 8% | 3 | $667 | 4.12 |
| RADIO - Fincas | $20,000 | $1,965 | 10% | 2 | $982 | 3.96 |
| Domiciliarios Q58 - | $25,000 | $1,661 | 7% | 12 | $138 | 14.23 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $53,114 | 111 | **$479** | $2,402 | **20%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 5.4%) | **$8,796**/pedido |
| utilidad estimada de lo que va del día | **$125,069** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | $1,433 | $1,700 | 🔴 |
| Domiciliarios - API | $417 | $489 | $434 | $459 | $370 | $576 | 🔴 |
| Domiciliarios - Expancion - API | $517 | $691 | $518 | $576 | $669 | $2,134 | 🔴 |
| Domiciliarios VIDEO INTER - API | $646 | $490 | $661 | $519 | $640 | $444 | 🟢 |
| RADIO - Seguridad / Negocios | — | $1,170 | $750 | $1,000 | $989 | $3,334 | 🔴 |
| TEST Creativos - API | $480 | $395 | $526 | $490 | $386 | $332 | 🟢 |
| Motorizados - API | $456 | $436 | $431 | $426 | $357 | $308 | 🟢 |
| Domiciliarios VIDEO - API | $337 | $383 | $332 | $389 | $306 | $251 | 🟢 |
| Motorizados - Q58 | $514 | $547 | $836 | $769 | $606 | $498 | 🟢 |
| Motorizados - INTER | $714 | $595 | $838 | $543 | $529 | $299 | 🟢 |
| Domiciliarios - Expancion - Q58 | $1,117 | $876 | $286 | $241 | $248 | $215 | 🟢 |
| Domiciliarios VIDEO Q58 - | $679 | $795 | $829 | $870 | $689 | $2,163 | 🔴 |
| Domiciliarios INTER - API | $332 | $462 | $366 | $332 | $318 | $239 | 🟢 |
| RADIO - Moteros | — | $919 | $926 | $1,068 | $1,158 | — | 🟡 |
| Domiciliarios - Expancion - INTER | $662 | $594 | $526 | $747 | $499 | $667 | 🔴 |
| RADIO - Fincas | — | $630 | $434 | $707 | $741 | $996 | 🔴 |
| Domiciliarios Q58 - | $217 | $204 | $185 | $211 | $201 | $141 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 10-23 | 10-24 | 10-25 | 10-26 | 10-27 | 10-28 | |
|---|---|---|---|---|---|---|---|
| RADIO - Broad | — | — | — | — | 4.79 | 4.35 | 🟡 |
| Domiciliarios - API | 9.61 | 8.16 | 10.50 | 9.11 | 13.33 | 8.09 | 🔴 |
| Domiciliarios - Expancion - API | 8.14 | 5.47 | 8.50 | 7.03 | 6.91 | 1.86 | 🔴 |
| Domiciliarios VIDEO INTER - API | 6.43 | 8.56 | 6.02 | 8.12 | 7.87 | 10.65 | 🟢 |
| RADIO - Seguridad / Negocios | — | 4.13 | 5.50 | 4.36 | 5.17 | 1.33 | 🔴 |
| TEST Creativos - API | 8.92 | 8.50 | 6.95 | 9.25 | 12.48 | 10.54 | 🔴 |
| Motorizados - API | 8.59 | 8.65 | 9.54 | 8.76 | 12.21 | 13.12 | 🟢 |
| Domiciliarios VIDEO - API | 9.18 | 7.54 | 9.93 | 7.54 | 12.70 | 12.93 | 🟡 |
| Motorizados - Q58 | 5.82 | 5.28 | 3.66 | 4.17 | 4.50 | 4.02 | 🟡 |
| Motorizados - INTER | 8.00 | 8.89 | 6.52 | 10.17 | 13.28 | 22.67 | 🟢 |
| Domiciliarios - Expancion - Q58 | 3.93 | 4.47 | 8.73 | 9.37 | 10.75 | 11.53 | 🟢 |
| Domiciliarios VIDEO Q58 - | 4.98 | 4.11 | 4.81 | 3.70 | 5.31 | 1.67 | 🔴 |
| Domiciliarios INTER - API | 7.57 | 6.56 | 8.11 | 7.76 | 8.54 | 12.97 | 🟢 |
| RADIO - Moteros | — | 5.63 | 4.15 | 3.02 | 3.41 | — | 🟢 |
| Domiciliarios - Expancion - INTER | 4.83 | 4.70 | 5.97 | 3.66 | 5.16 | 4.12 | 🔴 |
| RADIO - Fincas | — | 8.62 | 9.35 | 5.16 | 5.59 | 3.88 | 🔴 |
| Domiciliarios Q58 - | 10.68 | 10.24 | 11.43 | 9.12 | 11.05 | 13.95 | 🟢 |

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
| 2026-10-27 | $396,679 | 865 | $459 | $3,866 | 8.43 | $991,866 |

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
