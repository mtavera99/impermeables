# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-17 14:10 Bogotá.** Se actualiza solo 4 veces al día (07:00 · 13:00 · 17:00 · 23:00).
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$66,614** |
| gastado hoy (hasta las 14h) | $62,476 |
| presupuesto activo | $164,000/día |
| cierre proyectado del día | $160,706 |
| saldo proyectado a medianoche | $-31,616 |
| objetivo (cubrir un día de 143% + colchón) | $254,520 |

### 🔴 RECARGAR $125,430 — entra en zona de freno a las 17:00

Las 18h a 23h son el bloque donde las conversaciones se abaratan. Quedarse sin saldo ahí es la fuga más cara que tiene la operación.

⛔ **Recargar en la MAÑANA, no de noche.** Recargar después de quedarse seco dispara el rebote de 0-AI: Meta suelta el gasto de golpe sobre el inventario más frío.

---

## 📈 Hoy contra los días anteriores — mismo tramo 00:00–14:59

*(Comparar medio día contra un día completo es el error #10. Acá va el mismo tramo.)*

| día | gasto | conv | $/conv | CPM | conv/mil |
|---|---|---|---|---|---|
| 2026-09-13 | $87,110 | 74 | **$1,177** | $6,885 | 5.85 |
| 2026-09-14 | $144,880 | 82 | **$1,767** | $5,601 | 3.17 |
| 2026-09-15 | $65,928 | 42 | **$1,570** | $6,196 | 3.95 |
| 2026-09-16 | $93,239 | 79 | **$1,180** | $3,773 | 3.20 |
| 2026-09-17 **HOY** | $58,303 | 47 | **$1,240** | $3,606 | 2.91 |

🟠 Hoy va 5% más caro que ayer a la misma hora ($1,240 vs $1,180).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,240  =  $ 3,606  ÷  2.91
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,606 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 2.91 | 5,33 | 🔴 bajo |

🔑 **El CPM está normal y el conv/mil bajo: todo el problema es AUDIENCIA, no precio.** Esperar no lo arregla — hace falta público nuevo (el lookalike de compradores es la jugada pendiente).

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios | $45,000 | $32,045 | 71% | 28 | $1,144 | 3.06 |
| Domiciliarios VIDEO | $55,000 | $18,065 | 33% | 16 | $1,129 | 3.04 |
| TEST Creativos | $25,000 | $4,695 | 19% | 3 | $1,565 | 3.52 |
| Publico ABIERTO video | $10,000 | $4,173 | 42% | 2 | $2,086 | 4.18 |
| Motorizados | $9,000 | $3,115 | 35% | 0 | — | 0.00 |
| Domiciliarios | Valle del cauca | $5,000 | $234 | 5% | 0 | — | 0.00 |
| Domiciliarios | Eje Cafetero | $5,000 | $88 | 2% | 0 | — | 0.00 |
| Domiciliarios | Santander | $5,000 | $61 | 1% | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $58,303 | 47 | **$1,240** | $2,402 | **52%** 🟢 |
| **COLMENA** | $4,173 | 2 | **$2,086** | $3,322 | **63%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$14,768**/pedido |
| utilidad estimada de lo que va del día | **$35,754** |

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-11 | $165,495 | 205 | $807 | $3,447 | 4.27 | $244,756 |
| 2026-09-12 | $87,262 | 94 | $928 | $4,374 | 4.71 | $100,853 |
| 2026-09-13 | $119,758 | 116 | $1,032 | $6,878 | 6.66 | $112,384 |
| 2026-09-14 | $225,766 | 120 | $1,881 | $5,148 | 2.74 | $14,381 |
| 2026-09-15 | $185,055 | 122 | $1,517 | $4,920 | 3.24 | $59,094 |
| 2026-09-16 | $153,331 | 137 | $1,119 | $3,402 | 3.04 | $120,837 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
