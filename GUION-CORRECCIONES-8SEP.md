# Correcciones al guion — 2026-09-08

**Se AGREGAN al bloque de `GUION-PARA-PEGAR.md`, más tres ediciones quirúrgicas.**
⚠️ **NO se reemplaza nada del bloque del tradicional.** Ese guion cierra al 8,4% y vale más que
cualquier corrección de acá. Solo se agrega y se cambian tres renglones puntuales.

Origen: las 54 guías reales del 7-8 sep (`analisis/envios-7-8sep-corregido.py`).

---

## 🔴 PRIMERO, UNA CORRECCIÓN A LO QUE YO MISMO DIJE

Dije *"volvé a poner la promo de 2 unidades en el guion"*. **Estaba mal: la promo YA está**,
completa, con la escalera del envío compartido y su tabla de totales. No hay que ponerla.

Y dije que *"la fuga de flete está en la promo de 2 unidades"*. **Eso es cierto como contabilidad
pero lleva a la conclusión equivocada.** La cuenta completa:

| | Margen del pedido | vs 1 unidad |
|---|---|---|
| **1 unidad** | $26.900 + $326 de envío = **$27.226** | 1,00× |
| **2 uds en promo** (sin Tadó) | $44.000 − $799 = **$43.201** | **1,59×** 🟢 |
| **3 uds a precio lleno** (Caldas) | $80.700 − $339 = **$80.361** | **2,95×** 🟢 |
| **2 uds a TADÓ** | $44.000 − $38.667 = **$5.333** | **0,20×** 🔴 |

🔑 **La promo NO es una fuga: un pedido doble vale 1,59 veces uno sencillo.** Los $799 de flete
que absorbe son el precio del upsell, y es un precio barato. **NO hay que tocar la promo ni subir
sus totales.**

**El único destino donde se rompe es Tadó**, y ahí no se rompe por la promo: se rompe porque el
flete se **duplica** (2,20×) en vez de compartirse (1,4-1,6× en el resto del país).

---

## Lo que sí hay que arreglar, y son cuatro cosas

| Qué | Evidencia |
|---|---|
| **1. No existe regla para 3 o más unidades** | Caldas compró 3 y la IA cobró precio lleno porque no tenía instrucción |
| **2. Tadó está en banda E y su flete es $32.510-$35.834** | absorbe $7.410 con 1 unidad y $38.667 con 2 |
| **3. Villa de Leyva está en la banda equivocada** | está en $77.000 y su flete es $22.584 → absorbe $5.485 |
| **4. La IA inventó $85.511** | banda E es $85.000. Sobraron $511 |

---

# ✏️ PARTE 1 — TRES EDICIONES EN EL BLOQUE QUE YA ESTÁ PEGADO

### Edición 1 — mover Villa de Leyva

En la lista de **$77.000**, borrar `Villa de Leyva`.
En la lista de **$83.000**, agregar `Villa de Leyva`.

*(Su flete real es $22.584. A $77.000 se absorben $5.485 por venta.)*

### Edición 2 — sacar Dagua de la zona equivocada

`Dagua` no está en ninguna lista, así que por defecto debería ir a **$85.000** — pero se cobró
$81.000. Agregar `Dagua` explícitamente a la lista de **$85.000** para que no vuelva a caer en la
de capitales por parecido con Cali.

*(Su flete real es $25.114.)*

### Edición 3 — la línea de Tadó, en la lista de $85.000

Justo debajo de la lista de $85.000, agregar este renglón:

```
EXCEPCIÓN — CHOCÓ PROFUNDO: Tadó = $93.000 (1 conjunto).
No uso $85.000 para Tadó. Y para Tadó NUNCA ofrezco la promo de 2
conjuntos: ahí el envío no se comparte, se duplica.
```

---

# ➕ PARTE 2 — BLOQUE NUEVO PARA AGREGAR AL FINAL

## ⬇️ COPIÁ DE AQUÍ HASTA EL FINAL Y PEGALO AL FINAL DEL BLOQUE ACTUAL

```
════════════════════════════════════════════════════════════════════
TRES O MÁS CONJUNTOS — REGLA NUEVA
════════════════════════════════════════════════════════════════════

Si el cliente quiere TRES o más, el precio es $59.900 cada uno. No aplico
la promo de dos por $110.000 de entrada, y no la menciono.

Mi argumento no es el descuento, es el envío: tres conjuntos van en el mismo
paquete y pagan UN solo envío. Eso es cierto y es mucha plata:
"Los tres van en el mismo paquete y pagas un solo envío 💡 Te ahorras como
$25.000 contra pedirlos por separado."

SOLO SI DUDA por el precio, aplico la promo a dos de los tres:
"Te dejo dos en promo a $110.000 y el tercero en $59.900 🙌"

NUNCA doy el total de 3 o más conjuntos por mi cuenta. El envío de tres no
está en ninguna tabla y no lo invento. Digo:
"Son $179.700 los tres 🙌 Déjame confirmarte el envío exacto a tu ciudad y
te doy el total en un minuto."
Y aviso al asesor que hay un pedido de 3 o más para cotizar.

════════════════════════════════════════════════════════════════════
NUNCA INVENTO UN NÚMERO QUE NO ESTÉ EN LA TABLA
════════════════════════════════════════════════════════════════════

Todos los totales que digo salen exactos de las tablas de arriba:
$73.000 · $77.000 · $81.000 · $83.000 · $85.000 · $93.000 (Tadó)
y para dos conjuntos: $128.000 · $136.000 · $138.000 · $139.000 · $143.000
más la excepción de Cartagena en $146.000.

No sumo, no redondeo, no ajusto, no pongo cifras con terminaciones raras.
Si el número que voy a escribir no está en esa lista, está mal y no lo mando.

Si no sé el total, no lo estimo. Digo:
"Déjame confirmarte el envío exacto a tu ciudad y te doy el total en un
momento 🙌"

════════════════════════════════════════════════════════════════════
CUÁNDO **NO** OFREZCO LA PROMO DE DOS
════════════════════════════════════════════════════════════════════

La promo de dos conjuntos es buena en todo el país menos en un caso:

  · TADÓ — ahí el envío de dos cuesta el doble que el de uno, no un poco
    más. Si un cliente de Tadó quiere dos, no le doy total: le digo que le
    confirmo el envío y aviso al asesor.

En cualquier otra ciudad la promo va normal, con el envío compartido
primero y el descuento solo si duda.
```

## ⬆️ HASTA ACÁ

---

## Probalo antes de dejarlo (3 minutos, celular ajeno)

| Escribile | Tiene que responder |
|---|---|
| "quiero tres" | **$179.700** los tres + *"te confirmo el envío"*. **NO un total inventado** |
| "quiero tres, pero está caro" | dos en promo a $110.000 + el tercero en $59.900 |
| "soy de Tadó" | **$93.000**, no $85.000 |
| "soy de Tadó y quiero dos" | **NO da total.** Dice que confirma el envío y avisa al asesor |
| "soy de Villa de Leyva" | **$83.000**, no $77.000 |
| "soy de Dagua" | **$85.000**, no $81.000 |
| "soy de Guachucal" | **$85.000** exacto. Sin $511 ni terminaciones raras |
| "quiero dos, soy de Bogotá" | **$128.000**. La promo sigue igual, no se tocó |

---

## Lo que este cambio NO hace

- **No toca la promo de 2 unidades ni sus totales.** Un pedido doble vale 1,59× uno sencillo:
  los $799 de flete que absorbe son el precio del upsell y es barato.
- **No sube ningún precio** salvo Tadó ($85.000 → $93.000) y dos reclasificaciones
  (Villa de Leyva y Dagua, que ya estaban mal).
- **No toca el descuento de cierre, el cuadro de confirmación, ni la regla de no dar el envío
  antes de saber la ciudad.** Esas tres son las que sostienen el 8,4% de cierre.

## Lo que queda pendiente de datos

- ⚠️ **Barrancabermeja 2 uds absorbió $6.083** ($28.000 cobrados contra $34.083 de flete). No lo
  cambié porque **hay una sola guía** y podría ser la transportadora y no la ciudad. Si aparece
  otra igual, su total de 2 pasa de $138.000 a $144.000.
- ⚠️ **Bogotá 2 uds absorbe $2.647** de forma consistente (dos guías idénticas). Sigue siendo un
  pedido excelente (1,59×), así que **no vale la pena subirlo** — pero queda anotado.
- 🔍 **Chocó completo:** Tadó es el caso medido, pero Quibdó está en la lista de $83.000 y es la
  misma región. **Cotizar Quibdó antes de que aparezca el problema.**
