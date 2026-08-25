# ¿Hasta dónde se puede escalar, objetivamente? — 2026-08-24

Cálculo: `/analisis/techo-realista.py`

**Respuesta en una línea: el techo estructural está entre 75 y 100 unidades/día. La meta de 50 cabe
con holgura. Lo que NO se puede prometer es el camino, y hay una razón concreta.**

---

## 0. Antes de nada: cuánto vale mi propia estimación de ayer

Ayer dije *"el techo de la audiencia actual son ~21 unidades/día"*. **Ese número sale de UN solo
escalón** ($72.553 → $97.944), medido en una ventana donde **3 de 4 días eran fin de semana.**

🔴 **Con una sola observación no se puede trazar una curva.** Es exactamente el error de "muestras
pequeñas" que este archivo tiene documentado tres veces — y que yo mismo cometí hace tres días con el
umbral de aprendizaje.

**→ Tratá ese 21 como una hipótesis, no como un techo.**

---

## 1. Y hay evidencia fuerte en contra: esta cuenta ya rompió 4 techos

| Ventana | Ventas/día | Gasto/día | Techo que se creía |
|---|---|---|---|
| julio (1-31) | 1,6 | $12.562 | — |
| 1-4 ago | 7,5 | $37.637 | — |
| 5-14 ago | 5,2 | $40.000 | $48.585 |
| 15-19 ago | 10,2 | $58.445 | $48.585 → 🔨 **roto** |
| 18-21 ago | 12,0 | $72.553 | $58.445 → 🔨 **roto** |
| **21-24 ago** | **13,7** | **$97.944** | — |

**De 1,6 a 13,7 ventas/día en 7 semanas: 8,6× de crecimiento.**

🔑 El archivo declaró un techo de $48.585/día **con 10 días de datos**, y hoy la cuenta gasta el
doble. **Cada vez que se dio un techo por cierto, se rompió.**

**→ La conclusión no es "no hay techo". Es que todos los techos estimados desde adentro fueron
artefactos de medición, no límites reales.**

---

## 2. El techo estructural: la cuenta que sí se puede hacer

En vez de extrapolar una curva con un punto, se acota por arriba con datos duros del mercado.

### Vía A — los compradores de moto nueva que entran cada día

**1,1 millones de motos nuevas/año = ~3.014 compradores nuevos por día.**

| Capturar | Unidades/día |
|---|---|
| 0,5% | 15 |
| 1,0% | 30 |
| **2,0%** | **60** |
| 3,0% | 90 |

📌 **Y eso ignora las ~13,5 millones de motos ya circulando**, que también reponen. La vía A es solo
el flujo nuevo.

### Vía B — cuánta gente hay que alcanzar

Hoy: **18.449 personas alcanzadas/día → 13,7 pedidos = 1 pedido por cada 1.347 personas (0,074%).**

Audiencia alcanzable: 13,5 M motos × 92% estratos 1-2-3 × ~70% activos en redes = **~8,7 millones.**

| Unidades/día | Alcance/mes | % del pool/mes | |
|---|---|---|---|
| **17** *(hoy)* | 553.470 | **6%** | |
| 25 | 799.812 | 9% | |
| 35 | 1.119.737 | 13% | |
| **50** | **1.599.624** | **18%** | ✅ holgado |
| 75 | 2.399.436 | 28% | |
| 100 | 3.199.249 | **37%** | ⚠️ exigente |
| 150 | 4.798.873 | **55%** | 🔴 insostenible |

🔑 **Pasar el ~35% del pool cada mes empuja la frecuencia y ahí sí aparece saturación real.**

**→ El techo estructural queda entre 75 y 100 unidades/día. La meta de 50 está muy por debajo.**

---

## 3. Lo que tendría que ser cierto para llegar a 50

En vez de predecir, la forma honesta es decir **qué condición hay que cumplir**:

| Si el CPA aceptable es | Gasto necesario | **Elasticidad requerida** | Utilidad/día |
|---|---|---|---|
| $10.000 | $394.970 | **0,24** | $742.011 |
| $12.000 | $473.964 | **0,33** | $663.017 |
| **$15.000** | **$592.455** | **0,41** | **$544.526** |
| $20.000 | $789.940 | 0,49 | $347.041 |

🔑 **La condición es una sola: bajar la elasticidad de 0,63 a ~0,41.**

Y eso **no se logra optimizando lo que ya hay.** Se logra metiendo audiencia que hoy no existe en la
cuenta: **geografía nueva, TikTok, ángulos nuevos.** Cada canal nuevo arranca con su curva fresca.

**→ La pregunta no es "¿cuál es mi techo?" sino "¿cuántos lagos nuevos consigo abrir?".**

---

## 4. El rango honesto, con la confianza de cada tramo

| Tramo | Confianza | Qué requiere |
|---|---|---|
| **17 → 21 uds/día** | **ALTA** | nada nuevo, solo presupuesto. Ya se está al 84% |
| **21 → 35 uds/día** | **MEDIA-ALTA** | 1-2 canales nuevos (geografía + TikTok). El plan ya está escrito |
| **35 → 50 uds/día** | **MEDIA** | los 3 canales maduros **y** elasticidad ~0,41 |
| 50 → 75 uds/día | **BAJA** | posible según el mercado, sin ningún dato propio que lo respalde |
| más de 100 | **MUY BAJA** | choca con saturación (>35-60% del pool/mes) |

---

## 5. La respuesta

- ✅ **50 unidades/día es razonable, no ambiciosa de más.** Está dentro del techo estructural (75-100)
  y es **0,6% del mercado nacional**.
- ⚠️ **Lo que no se puede prometer es el camino.** Depende de una variable que todavía no se midió:
  **cuánto baja la elasticidad al abrir un canal nuevo.** Eso se sabe con el PRIMER canal, no antes.
- 🔑 **Y no hace falta saber el techo para avanzar.** Cada etapa cuesta ~4 días de medición, es
  reversible, y devuelve el dato que define la siguiente.

> **Dejá de estimar el techo y empezá a instrumentarlo.** Con 2-3 escalones más midiendo la
> elasticidad en cada uno, el techo se calcula solo — con datos propios en vez de supuestos míos.

📌 **Y una nota sobre el equipo:** dijiste que es lo de menos porque tu hermano ya despacha. De
acuerdo para el despacho. **Pero la restricción de atención es distinta: 446 conversaciones/día a 50
uds/día contra las 154 de hoy.** Esa no la resuelve el despacho — y no es urgente todavía, porque
recién aparece pasando las ~30 unidades/día. **Se puede decidir en la etapa 2, no ahora.**
