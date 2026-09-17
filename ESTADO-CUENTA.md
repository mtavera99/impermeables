# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-17 18:53 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$125,673** |
| gastado hoy (hasta las 18h) | $104,304 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $127,972 |
| saldo proyectado a medianoche | $102,006 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🟠 Recargar $17,393 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–18:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-13 | $110,210 | 103 | **$1,070** | $6,588 | 6.16 |
| 2026-09-14 | $205,315 | 107 | **$1,919** | $5,085 | 2.65 |
| 2026-09-15 | $165,647 | 88 | **$1,882** | $5,099 | 2.71 |
| 2026-09-16 | $130,410 | 106 | **$1,230** | $3,512 | 2.85 |
| 2026-09-17 **HOY** | $98,458 | 77 | **$1,279** | $3,636 | 2.84 |

🟠 Hoy va 4% más caro que ayer a la misma hora ($1,279 vs $1,230).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,279  =  $ 3,636  ÷  2.84
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,636 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 2.84 | 5,33 | 🔴 bajo |

🔑 **El CPM está normal y el conv/mil bajo: todo el problema es AUDIENCIA, no precio.** Esperar no lo arregla — hace falta público nuevo (el lookalike de compradores es la jugada pendiente).

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios | $45,000 | $41,653 | 93% | 32 | $1,302 | 2.72 |
| Domiciliarios VIDEO | $55,000 | $40,070 | 73% | 39 | $1,027 | 3.42 |
| Motorizados | $9,000 | $8,418 | 94% | 3 | $2,806 | 1.31 |
| TEST Creativos | $25,000 | $7,060 | 28% | 3 | $2,353 | 2.49 |
| Publico ABIERTO video | $10,000 | $5,846 | 58% | 6 | $974 | 9.52 |
| Domiciliarios - Expancion | $15,000 | $806 | 5% | 0 | — | 0.00 |
| Domiciliarios \| Valle del cauca | $0 | $266 | — | 0 | — | 0.00 |
| Domiciliarios \| Eje Cafetero | $0 | $124 | — | 0 | — | 0.00 |
| Domiciliarios \| Santander | $0 | $61 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $98,458 | 77 | **$1,279** | $2,402 | **53%** 🟢 |
| **COLMENA** | $5,846 | 6 | **$974** | $3,322 | **29%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$15,222**/pedido |
| utilidad estimada de lo que va del día | **$55,636** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-12 | 09-13 | 09-14 | 09-15 | 09-16 | 09-17 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios | $1,001 | $944 | $2,087 | $1,856 | $1,059 | $1,302 | 🔴 |
| Domiciliarios VIDEO | $918 | $1,385 | $2,026 | $1,498 | $1,207 | $1,027 | 🟢 |
| Motorizados | $1,059 | $938 | $914 | $1,194 | $1,342 | $2,806 | 🔴 |
| TEST Creativos | $818 | $695 | $1,372 | $618 | $869 | $2,353 | 🔴 |
| Publico ABIERTO video | — | — | $2,225 | $7,737 | $2,332 | $974 | 🟢 |
| Domiciliarios - Expancion | — | — | — | — | — | — |  |
| Domiciliarios \| Valle del cauca | — | — | — | — | $884 | — |  |
| Domiciliarios \| Eje Cafetero | — | — | — | — | — | — |  |
| Domiciliarios \| Santander | $196 | — | — | — | $297 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-12 | 09-13 | 09-14 | 09-15 | 09-16 | 09-17 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios | 4.34 | 6.96 | 2.67 | 2.68 | 3.01 | 2.72 | 🟡 |
| Domiciliarios VIDEO | 4.28 | 4.35 | 2.23 | 3.06 | 2.79 | 3.42 | 🟢 |
| Motorizados | 5.38 | 8.76 | 8.57 | 5.75 | 2.83 | 1.31 | 🔴 |
| TEST Creativos | 8.96 | 18.98 | 5.09 | 11.18 | 7.23 | 2.49 | 🔴 |
| Publico ABIERTO video | — | — | 7.29 | 1.39 | 4.47 | 9.52 | 🟢 |
| Domiciliarios - Expancion | — | — | — | — | — | — |  |
| Domiciliarios \| Valle del cauca | — | — | — | — | 3.69 | — |  |
| Domiciliarios \| Eje Cafetero | — | — | — | — | — | — |  |
| Domiciliarios \| Santander | 40.00 | — | — | — | 12.99 | — | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-11 | $165,495 | 205 | $807 | $3,447 | 4.27 | $244,756 |
| 2026-09-12 | $87,262 | 94 | $928 | $4,374 | 4.71 | $100,853 |
| 2026-09-13 | $119,758 | 116 | $1,032 | $6,878 | 6.66 | $112,384 |
| 2026-09-14 | $225,766 | 120 | $1,881 | $5,148 | 2.74 | $14,381 |
| 2026-09-15 | $185,055 | 122 | $1,517 | $4,920 | 3.24 | $59,094 |
| 2026-09-16 | $153,407 | 137 | $1,120 | $3,401 | 3.04 | $120,761 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
