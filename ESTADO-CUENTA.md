# 📊 Estado de la cuenta — BikerPro

> **Última lectura: 2026-09-17 18:46 Bogotá.** Se actualiza solo 4 veces al día (07:00 · 13:00 · 17:00 · 23:00).
> Generado por `analisis/estado-cuenta.py`. **Solo lectura** — regla 4-B.

---

## 💰 Caja

| | |
|---|---|
| **saldo ahora** | **$126,441** |
| gastado hoy (hasta las 18h) | $103,269 |
| presupuesto activo | $159,000/día |
| cierre proyectado del día | $126,932 |
| saldo proyectado a medianoche | $102,778 |
| objetivo (cubrir un día de 143% + colchón) | $247,370 |

### 🟠 Recargar $17,660 para cubrir un día malo

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
| 2026-09-17 **HOY** | $97,466 | 76 | **$1,282** | $3,638 | 2.84 |

🟠 Hoy va 4% más caro que ayer a la misma hora ($1,282 vs $1,230).

### La descomposición — dónde está el problema

```
$/conv  =  CPM  ÷  conv-por-mil
$ 1,282  =  $ 3,638  ÷  2.84
```

| | valor | referencia sana | |
|---|---|---|---|
| **CPM** (el precio de la subasta) | $3,638 | ~$3.615 | 🟢 normal |
| **conv/mil** (la calidad de la audiencia) | 2.84 | 5,33 | 🔴 bajo |

🔑 **El CPM está normal y el conv/mil bajo: todo el problema es AUDIENCIA, no precio.** Esperar no lo arregla — hace falta público nuevo (el lookalike de compradores es la jugada pendiente).

---

## 🎯 Por conjunto, hoy

| conjunto | presup | gastado | uso | conv | $/conv | conv/mil |
|---|---|---|---|---|---|---|
| Domiciliarios | $45,000 | $41,577 | 92% | 32 | $1,299 | 2.72 |
| Domiciliarios VIDEO | $55,000 | $39,489 | 72% | 38 | $1,039 | 3.38 |
| Motorizados | $9,000 | $8,250 | 92% | 3 | $2,750 | 1.34 |
| TEST Creativos | $25,000 | $7,015 | 28% | 3 | $2,338 | 2.50 |
| Publico ABIERTO video | $10,000 | $5,803 | 58% | 6 | $967 | 9.60 |
| Domiciliarios - Expancion | $15,000 | $685 | 5% | 0 | — | 0.00 |
| Domiciliarios | Valle del cauca | $0 | $265 | — | 0 | — | 0.00 |
| Domiciliarios | Eje Cafetero | $0 | $124 | — | 0 | — | 0.00 |
| Domiciliarios | Santander | $0 | $61 | — | 0 | — | 0.00 |

### Cada producto contra SU propio equilibrio

*(Nunca usar el promedio de la cuenta como umbral — error #12 y regla dura #1.)*

| producto | gasto | conv | $/conv | su equilibrio | |
|---|---|---|---|---|---|
| **TRADICIONAL** | $97,466 | 76 | **$1,282** | $2,402 | **53%** 🟢 |
| **COLMENA** | $5,803 | 6 | **$967** | $3,322 | **29%** 🟢 |

| | |
|---|---|
| CPA implícito (cierre 8.4%) | **$15,267**/pedido |
| utilidad estimada de lo que va del día | **$54,627** |

---

## 📅 Los últimos días cerrados

| día | gasto | conv | $/conv | CPM | conv/mil | utilidad |
|---|---|---|---|---|---|---|
| 2026-09-11 | $165,495 | 205 | $807 | $3,447 | 4.27 | $244,756 |
| 2026-09-12 | $87,262 | 94 | $928 | $4,374 | 4.71 | $100,853 |
| 2026-09-13 | $119,758 | 116 | $1,032 | $6,878 | 6.66 | $112,384 |
| 2026-09-14 | $225,766 | 120 | $1,881 | $5,148 | 2.74 | $14,381 |
| 2026-09-15 | $185,055 | 122 | $1,517 | $4,920 | 3.24 | $59,094 |
| 2026-09-16 | $153,399 | 137 | $1,120 | $3,401 | 3.04 | $120,769 |

---

## ⚠️ Lo que este archivo NO hace

| | |
|---|---|
| ✅ **solo lee** | el token no tiene `ads_management`. No puede mover un presupuesto ni con un error de código |
| ❌ no decide | los umbrales son referencias, no órdenes |
| ❌ no reemplaza el análisis | descomponer, buscar contraejemplos y corregir errores no lo hace un cron |

*Cuenta `act_4330882710457791` · BikerPro · COP · America/Bogota*
