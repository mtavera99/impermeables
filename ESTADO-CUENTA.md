# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-19 15:48 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$94,467** |
| gastado hoy (hasta las 15h) | $69,702 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $129,433 |
| saldo proyectado a medianoche | $34,736 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🟠 Recargar $83,201 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–15:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-15 | $85,117 | 50 | **$1,702** | $6,085 | 3.57 |
| 2026-09-16 | $99,077 | 84 | **$1,179** | $3,722 | 3.16 |
| 2026-09-17 | $73,204 | 56 | **$1,307** | $3,644 | 2.79 |
| 2026-09-18 | $63,291 | 62 | **$1,021** | $5,149 | 5.04 |
| 2026-09-19 **HOY** | $63,032 | 55 | **$1,146** | $4,602 | 4.02 |

🟠 Hoy va 12% más caro que ayer a la misma hora ($1,146 vs $1,021).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,146  =  $ 4,602  ÷  4.02
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,602 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 4.02 | 5,33 | 🟠 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $55,000 | $28,145 | 51% | 26 | $1,082 | 3.78 |
| TEST Creativos | $25,000 | $13,738 | 55% | 13 | $1,057 | 7.17 |
| Domiciliarios | $45,000 | $8,196 | 18% | 5 | $1,639 | 2.70 |
| Domiciliarios - Expancion | $15,000 | $7,930 | 53% | 8 | $991 | 3.68 |
| Publico ABIERTO video | $10,000 | $6,670 | 67% | 3 | $2,223 | 4.19 |
| Motorizados | $9,000 | $5,023 | 56% | 3 | $1,674 | 3.05 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $63,032 | 55 | **$1,146** | $2,402 | **48%** 🟢 |
| **COLMENA** | $6,670 | 3 | **$2,223** | $3,322 | **67%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$13,643**/pedido |
| utilidad estimada de lo que va del día | **$47,035** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | $2,026 | $1,498 | $1,208 | $963 | $1,060 | $1,082 | 🟡 |
| TEST Creativos | $1,372 | $618 | $869 | $1,090 | $759 | $1,057 | 🔴 |
| Domiciliarios | $2,087 | $1,856 | $1,060 | $1,323 | $1,185 | $1,639 | 🔴 |
| Domiciliarios - Expancion | — | — | — | $1,418 | $866 | $991 | 🟡 |
| Publico ABIERTO video | $2,225 | $7,737 | $2,334 | $1,552 | $2,224 | $2,223 | 🟡 |
| Motorizados | $914 | $1,194 | $1,342 | $1,438 | $1,840 | $1,674 | 🟢 |
| Domiciliarios \| Valle del cauca | — | — | $884 | — | — | — |  |
| Domiciliarios \| Eje Cafetero | — | — | — | — | — | — |  |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-14 | 09-15 | 09-16 | 09-17 | 09-18 | 09-19 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios VIDEO | 2.23 | 3.06 | 2.79 | 3.68 | 4.23 | 3.78 | 🟡 |
| TEST Creativos | 5.09 | 11.18 | 7.23 | 5.61 | 11.66 | 7.17 | 🔴 |
| Domiciliarios | 2.67 | 2.68 | 3.01 | 2.71 | 3.91 | 2.70 | 🔴 |
| Domiciliarios - Expancion | — | — | — | 2.48 | 5.30 | 3.68 | 🔴 |
| Publico ABIERTO video | 7.29 | 1.39 | 4.47 | 6.53 | 4.62 | 4.19 | 🟡 |
| Motorizados | 8.57 | 5.75 | 2.83 | 2.54 | 3.01 | 3.05 | 🟡 |
| Domiciliarios \| Valle del cauca | — | — | 3.69 | — | — | — |  |
| Domiciliarios \| Eje Cafetero | — | — | — | — | — | — |  |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-13 | $119,758 | 116 | $1,032 | $6,878 | 6.66 | $112,384 |
| 2026-09-14 | $225,766 | 120 | $1,881 | $5,148 | 2.74 | $14,381 |
| 2026-09-15 | $185,055 | 122 | $1,517 | $4,920 | 3.24 | $59,094 |
| 2026-09-16 | $153,504 | 137 | $1,120 | $3,403 | 3.04 | $120,664 |
| 2026-09-17 | $133,609 | 118 | $1,132 | $3,690 | 3.26 | $102,535 |
| 2026-09-18 | $113,678 | 110 | $1,033 | $5,017 | 4.86 | $106,456 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
