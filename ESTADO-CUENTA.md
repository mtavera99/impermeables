# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-23 17:35 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$120,121** |
| gastado hoy (hasta las 17h) | $83,955 |
| presupuesto activo | $155,000/día |
| cierre proyectado del día | $133,214 |
| saldo proyectado a medianoche | $70,862 |
| objetivo (cubrir un día de 143% + colchón) | $241,650 |

### 🟠 Recargar $37,574 para cubrir un día malo

Hoy aguanta, pero no cubre un día de sobre-entrega alta.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–17:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-19 | $76,540 | 65 | **$1,178** | $4,663 | 3.96 |
| 2026-09-20 | $100,590 | 78 | **$1,290** | $4,786 | 3.71 |
| 2026-09-21 | $118,739 | 103 | **$1,153** | $4,327 | 3.75 |
| 2026-09-22 | $123,751 | 113 | **$1,095** | $4,539 | 4.14 |
| 2026-09-23 **HOY** | $83,955 | 87 | **$965** | $4,983 | 5.16 |

🟢 **Hoy va mejor que ayer a la misma hora** ($965 vs $1,095).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$   965  =  $ 4,983  ÷  5.16
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,983 | ~$3.615 | 🔴 alto |
| **conv/mil** (la calidad de la audiencia) | 5.16 | 5,33 | 🟢 |

🔑 **El CPM está alto: hay algo en la subasta** (fecha comercial del país). Antes de culpar a la cuenta, mirar el calendario.

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| TEST Creativos - API | $40,000 | $28,738 | 72% | 33 | $871 | 10.91 |
| Domiciliarios - Expancion - API | $40,000 | $19,043 | 48% | 18 | $1,058 | 3.27 |
| Domiciliarios - API | $35,000 | $17,447 | 50% | 20 | $872 | 4.80 |
| Domiciliarios VIDEO - API | $20,000 | $9,826 | 49% | 6 | $1,638 | 3.33 |
| Motorizados - API | $20,000 | $8,901 | 45% | 10 | $890 | 4.26 |
| Motorizados | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios | $0 | $0 | — | 0 | — | 0.00 |
| Domiciliarios - Expancion | $0 | $0 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $83,955 | 87 | **$965** | $2,402 | **40%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$11,488**/pedido |
| utilidad estimada de lo que va del día | **$90,151** |

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | — | — | $1,086 | $871 | 🟢 |
| Domiciliarios - Expancion - API | — | — | — | — | $1,102 | $1,058 | 🟡 |
| Domiciliarios - API | — | — | — | — | $942 | $872 | 🟢 |
| Domiciliarios VIDEO - API | — | — | — | — | $972 | $1,638 | 🔴 |
| Motorizados - API | — | — | — | — | $1,265 | $890 | 🟢 |
| Motorizados | $1,848 | $924 | $634 | $1,071 | — | — | 🔴 |
| Domiciliarios | $1,185 | $1,639 | $1,738 | $878 | — | — | 🟢 |
| TEST Creativos | $760 | $987 | $730 | $711 | — | — | 🟡 |
| Domiciliarios VIDEO | $1,062 | $899 | $1,148 | $1,527 | — | — | 🔴 |
| Publico ABIERTO video | $2,224 | $2,550 | $1,111 | $4,298 | — | — | 🔴 |
| Domiciliarios - Expancion | $866 | $841 | $1,223 | $1,017 | — | — | 🟢 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-18 | 09-19 | 09-20 | 09-21 | 09-22 | 09-23 | |
|---|---|---|---|---|---|---|---|
| TEST Creativos - API | — | — | — | — | 8.44 | 10.91 | 🟢 |
| Domiciliarios - Expancion - API | — | — | — | — | 3.43 | 3.27 | 🟡 |
| Domiciliarios - API | — | — | — | — | 4.24 | 4.80 | 🟢 |
| Domiciliarios VIDEO - API | — | — | — | — | 5.10 | 3.33 | 🔴 |
| Motorizados - API | — | — | — | — | 3.17 | 4.26 | 🟢 |
| Motorizados | 2.99 | 4.93 | 9.46 | 3.93 | — | — | 🔴 |
| Domiciliarios | 3.91 | 2.66 | 2.74 | 4.62 | — | — | 🟢 |
| TEST Creativos | 11.64 | 7.77 | 11.20 | 9.96 | — | — | 🟡 |
| Domiciliarios VIDEO | 4.22 | 4.23 | 3.76 | 2.30 | — | — | 🔴 |
| Publico ABIERTO video | 4.62 | 3.76 | 8.70 | 2.92 | — | — | 🔴 |
| Domiciliarios - Expancion | 5.30 | 4.58 | 3.59 | 3.98 | — | — | 🟢 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-17 | $133,609 | 118 | $1,132 | $3,690 | 3.26 | $102,535 |
| 2026-09-18 | $113,822 | 110 | $1,035 | $5,017 | 4.85 | $106,312 |
| 2026-09-19 | $119,438 | 127 | $940 | $4,371 | 4.65 | $134,717 |
| 2026-09-20 | $120,973 | 110 | $1,100 | $4,937 | 4.49 | $99,161 |
| 2026-09-21 | $160,972 | 146 | $1,103 | $3,926 | 3.56 | $131,207 |
| 2026-09-22 | $179,740 | 175 | $1,027 | $4,764 | 4.64 | $170,474 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
