# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-21 00:06 Bogotá.** Se actualiza **cada hora**. Para un dato urgente usá el botón manual del Action.
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$4,735** |
| gastado hoy (hasta las 0h) | $0 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $126,740 |
| saldo proyectado a medianoche | $-122,005 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🔴 RECARGAR $242,635 — entra en zona de freno a las 1:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–0:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-20 | $5,370 | 2 | **$2,685** | $4,150 | 1.55 |

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 2,685  =  $ 4,150  ÷  1.55
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $4,150 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 1.55 | 5,33 | 🔴 bajo |

🔑 **El CPM está normal y el conv/mil bajo: todo el problema es AUDIENCIA, no precio.** Esperar no lo arregla — hace falta público nuevo (el lookalike de compradores es la jugada pendiente).

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|

---

## 🔍 Cada conjunto por separado — la tendencia real

*(El promedio de la cuenta puede tapar un conjunto que se rompe y otro que mejora al mismo tiempo. Acá va cada uno solo.)*

### $/conv por día

| conjunto | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | |
|---|---|---|---|---|---|---|---|
| Motorizados | $1,342 | $1,438 | $1,848 | $922 | $616 | — | 🟢 |
| Domiciliarios | $1,060 | $1,323 | $1,185 | $1,639 | $1,720 | — | 🟡 |
| TEST Creativos | $869 | $1,090 | $760 | $987 | $724 | — | 🟢 |
| Domiciliarios VIDEO | $1,208 | $963 | $1,062 | $899 | $1,136 | — | 🔴 |
| Publico ABIERTO video | $2,334 | $1,552 | $2,224 | $2,550 | $1,101 | — | 🟢 |
| Domiciliarios - Expancion | — | $1,418 | $866 | $838 | $1,218 | — | 🔴 |

### conv/mil por día *(la calidad de la audiencia de cada uno)*

| conjunto | 09-16 | 09-17 | 09-18 | 09-19 | 09-20 | 09-21 | |
|---|---|---|---|---|---|---|---|
| Motorizados | 2.83 | 2.54 | 2.99 | 4.93 | 9.62 | — | 🟢 |
| Domiciliarios | 3.01 | 2.71 | 3.91 | 2.66 | 2.76 | — | 🟡 |
| TEST Creativos | 7.23 | 5.61 | 11.64 | 7.77 | 11.25 | — | 🟢 |
| Domiciliarios VIDEO | 2.79 | 3.68 | 4.22 | 4.23 | 3.79 | — | 🟡 |
| Publico ABIERTO video | 4.47 | 6.53 | 4.62 | 3.76 | 8.75 | — | 🟢 |
| Domiciliarios - Expancion | — | 2.48 | 5.30 | 4.59 | 3.60 | — | 🔴 |

🔑 **Un conjunto con conv/mil alto y uso de presupuesto bajo está perdiendo la subasta contra sus propios hermanos** (0-AB: *Meta no reparte entre anuncios, elige*). Eso es canibalización, y se arregla diferenciando la segmentación.

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-15 | $185,055 | 122 | $1,517 | $4,920 | 3.24 | $59,094 |
| 2026-09-16 | $153,504 | 137 | $1,120 | $3,403 | 3.04 | $120,664 |
| 2026-09-17 | $133,609 | 118 | $1,132 | $3,690 | 3.26 | $102,535 |
| 2026-09-18 | $113,822 | 110 | $1,035 | $5,017 | 4.85 | $106,312 |
| 2026-09-19 | $119,362 | 127 | $940 | $4,369 | 4.65 | $134,793 |
| 2026-09-20 | $119,689 | 110 | $1,088 | $4,921 | 4.52 | $100,445 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
