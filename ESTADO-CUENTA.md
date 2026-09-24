# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-24 08:57 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$111,602** |
| gastado hoy (hasta las 8h) | $50,574 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $172,592 |
| saldo proyectado a medianoche | $-10,416 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🔴 RECARGAR $79,474 — entra en zona de freno a las 19:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–8:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-20 | $36,318 | 32 | **$1,135** | $4,478 | 3.95 |
| 2026-09-21 | $31,345 | 30 | **$1,045** | $5,288 | 5.06 |
| 2026-09-22 | $37,216 | 37 | **$1,006** | $3,531 | 3.51 |
| 2026-09-23 | $40,010 | 31 | **$1,291** | $4,424 | 3.43 |
| 2026-09-24 **HOY** | $50,574 | 41 | **$1,234** | $4,058 | 3.29 |

🟢 **Hoy va mejor que ayer a la misma hora** ($1,234 vs $1,291).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,234  =  $ 4,058  ÷  3.29
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,058 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 3.29 | 5,33 | 🔴 bajo |

🔑 **El CPM está normal y el conv/mil bajo: todo el problema es AUDIENCIA, no precio.** Esperar no lo arregla — hace falta público nuevo (el lookalike de compradores es la jugada pendiente).

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | $40,000 | $14,141 | 35% | 8 | $1,768 | 1.67 |
| Domiciliarios - API | $35,000 | $13,001 | 37% | 7 | $1,857 | 2.47 |
| TEST Creativos - API | $40,000 | $10,295 | 26% | 11 | $936 | 7.83 |
| Motorizados - API | $20,000 | $6,939 | 35% | 7 | $991 | 3.51 |
| Domiciliarios VIDEO - API | $20,000 | $6,198 | 31% | 8 | $775 | 5.54 |
| Domiciliarios | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $50,574 | 41 | **$1,234** | $2,402 | **51%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$14,685**/pedido |
| utilidad estimada de lo que va del día | **$31,476** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | $1,103 | $775 | $1,768 | 🔴 |
| Domiciliarios - API | — | — | — | $942 | $886 | $1,857 | 🔴 |
| TEST Creativos - API | — | — | — | $1,086 | $734 | $936 | 🔴 |
| Motorizados - API | — | — | — | $1,265 | $741 | $991 | 🔴 |
| Domiciliarios VIDEO - API | — | — | — | $972 | $1,251 | $775 | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | 09-24 | |
|---|---|---|---|---|---|---|---|
| Domiciliarios - Expancion - API | — | — | — | 3.42 | 4.68 | 1.67 | 🔴 |
| Domiciliarios - API | — | — | — | 4.24 | 4.87 | 2.47 | 🔴 |
| TEST Creativos - API | — | — | — | 8.43 | 13.13 | 7.83 | 🔴 |
| Motorizados - API | — | — | — | 3.17 | 5.39 | 3.51 | 🔴 |
| Domiciliarios VIDEO - API | — | — | — | 5.10 | 4.38 | 5.54 | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-18 | $113,822 | 110 | $1,035 | $5,017 | 4.85 | $106,312 |
| 2026-09-19 | $119,438 | 127 | $940 | $4,371 | 4.65 | $134,717 |
| 2026-09-20 | $120,973 | 110 | $1,100 | $4,937 | 4.49 | $99,161 |
| 2026-09-21 | $160,972 | 146 | $1,103 | $3,926 | 3.56 | $131,207 |
| 2026-09-22 | $179,806 | 175 | $1,027 | $4,763 | 4.64 | $170,408 |
| 2026-09-23 | $141,455 | 173 | $818 | $5,024 | 6.14 | $204,757 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
