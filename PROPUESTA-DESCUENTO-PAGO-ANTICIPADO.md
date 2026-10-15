# 💸 ¿Conviene dar descuento por pago anticipado?

**Fecha:** 9-oct · **Estado:** 🟡 propuesta, pendiente de tu decisión. **No cambié ningún precio.**

Cuentas reproducibles: `python3 analisis/pago-anticipado-conviene-9oct.py`

---

## Respuesta corta

**Sí conviene, y por bastante más de lo que parecía.** Tu observación de Cali no fue casualidad: es estructural, se explica con números que ya estaban en el repo, y vale más de lo que el propio repo había estimado en septiembre.

**Pero no lo desplegaría como política general todavía**, por tres razones concretas que están al final.

---

## 1. Tu observación es correcta, y acá está el por qué

El flete que te cobra 99 Envíos **no es solo transporte**. Tiene adentro dos cosas que el pago anticipado elimina:

| | qué es | cuánto |
|---|---|---|
| **Comisión de recaudo** | cobrarle al cliente en la puerta y girarte la plata | **6,97% del valor recaudado** |
| **Prima del seguro antidevolución** | cubre el flete si te lo devuelven | **$2.848 por guía** |

La comisión **ya estaba medida en tu repo** (`analisis/comision-ya-estaba-adentro.py`): seis ciudades distintas con el mismo recaudo pagaron el mismo `valor_servicio` **exacto**, y cuando el recaudo subió $2.000 el cobro subió $139,47.

Desarmando el flete de Cali:

```
flete contraentrega (medido)      $25.055
  − comisión de recaudo (6,97%)   −$5.715
  − prima del seguro              −$2.848
  ─────────────────────────────────────────
flete prepagado (predicho)        $16.492
```

**Vos pagaste $15.000-16.000.** El modelo predice $16.492. ✅ Cuadra.

El ahorro es de **$7.900 a $8.800 según la banda** — y es parejo, porque la comisión depende del monto recaudado, no de la distancia.

---

## 2. Lo que se había subestimado: el ahorro del flete es la mitad de la historia

**La otra mitad es que un pedido prepagado no se devuelve.** Hoy se te devuelve el **22,8%** de las guías. En esas, el producto vuelve y el seguro cubre el flete, pero el **margen no se hizo y la pauta ya se gastó**.

Qué vale cada pedido, **regalando $4.000 de descuento**:

| Banda | hoy (contraentrega) | con prepago | diferencia |
|---|---|---|---|
| A · Bogotá | $18.664 | $28.449 | **+$9.786** |
| C · **Cali** | $17.777 | $27.938 | **+$10.162** |
| E · pueblos | $17.281 | $27.514 | **+$10.233** |

> Convertir un pedido a prepago vale **~$10.000 más**, **con los $4.000 ya regalados**.

**El descuento se paga solo**: sale del flete que dejás de pagar, no del margen del producto. Eso es lo que lo hace distinto de los descuentos de hoy — un descuento de $3.000 en contraentrega te cuesta $3.000 de margen; este te **gana** plata.

### Por qué el repo lo había descartado

En septiembre se estimó el beneficio del prepago en **~$4.052** y se concluyó: *"NO con descuento: descontar $4.000 lo regala entero"*. Esa conclusión era correcta **con esa estimación**. Lo que no contaba era:

- la **prima del seguro** ($2.848), que también se elimina
- y valoraba mal la **devolución evitada**, que es el premio más grande

Con los dos adentro, el beneficio es ~$14.000 antes del descuento, no $4.052. **Vale revisar esa decisión.**

---

## 3. El riesgo real no es la cuenta — es que se caigan ventas

Y acá tenés precedente propio: **cuando pediste pago adelantado a todos, se te cayeron ~40% de las ventas.** Por eso pasaste a 100% contraentrega, y esa decisión fue racional.

⚠️ **Pero no es lo mismo.** Eso fue **exigir** prepago. Esto es **ofrecer un descuento opcional** sin quitar la contraentrega. Aun así, el precedente obliga a medir en vez de desplegar y rezar.

Cuánto margen tenés:

| % que prepaga | caída de ventas tolerable |
|---|---|
| 10% | 5,4% |
| **25%** | **12,5%** |
| 40% | 18,6% |

Con 25% de adopción, **las ventas pueden caer 12% y quedás igual que hoy.** Es un colchón ancho.

---

## 4. Tu miedo principal ya está cubierto

> *"Una persona puede decir: yo le compro, pero deme contraentrega con el valor de pago anticipado."*

**Eso no puede pasar por construcción**, no por disciplina del bot:

1. El pedido anticipado queda **frenado** por `pago_anticipado_sin_verificar` — no se despacha hasta que confirmes la plata.
2. Si la plata no entra, **el pedido no sale**. El precio con descuento nunca llega a una guía con recaudo.
3. Si se arrepiente y quiere contraentrega, se **re-cotiza al precio de lista**.

**Y el peor caso es el statu quo:** si insiste en contraentrega, se le vende al precio de hoy. No perdés la venta, perdés el ahorro.

🔴 **Lo que sí falta blindar en código:** `cotizar()` no recibe la forma de pago, así que hoy nada impide que un total de prepago se use en un pedido contraentrega. Hay que devolver los dos precios separados y una prueba que lo verifique.

---

## 5. 🎯 La estrategia: en qué momento decirlo

Esta era tu pregunta de fondo, y es donde está casi todo el riesgo.

### 🔴 Dos reglas que no se pueden romper

**1. NUNCA decir "el envío te sale más barato".**

El envío es **el único número que el cliente puede verificar por fuera** (la lección de Montería, que ya te costó una venta). Si el bot dice que el envío prepagado es más barato, le estás diciendo a **todos** los clientes que el envío es blando → regateo en cada conversación. Tu propio guion ya lo prohíbe: *"Decí 'te hago un descuento', NO 'te bajo el envío'"*.

> Se dice: **"te hago un descuento si lo pagás por adelantado"**. Nunca el motivo.

**2. NUNCA ofrecerlo de entrada.**

Si va en la primera cotización, se convierte en la lista nueva: lo regalás también a quien iba a pagar completo, y le metés una decisión a alguien que estaba por decir que sí. Misma lógica que el precio de rescate.

### ✅ Los cuatro momentos donde sí va

**Momento 1 — Cuando el bot pregunta la forma de pago.** *(el slot natural)*

El bot ya pregunta "¿contraentrega o anticipado?". Hoy las dos cuestan igual, así que no hay ninguna razón para elegir anticipado. Acá el incentivo entra **sin fricción nueva**: el cliente ya estaba decidiendo eso.

> *"¿Cómo preferís pagar: contraentrega al recibir, o por adelantado? Si lo pagás por adelantado te lo dejo en **$78.000** en vez de $82.000 🙌"*

**Momento 2 — Cuando objeta el precio.** *(el mejor económicamente)*

Hoy, después de los 4 escalones de valor, el bot puede dar hasta $3.000 de descuento — y eso **te cuesta $3.000 de margen**. El descuento por prepago debería ir **ANTES** de tocar el precio de contraentrega, porque se financia solo.

> *"Te entiendo. Mirá, si lo pagás por adelantado te lo dejo en **$78.000** 💪"*

**Momento 3 — Pueblos y zonas de alto riesgo (bandas D y E).** *(donde yo arrancaría)*

Ahí el flete es más caro, la devolución más probable, y el cliente **ya espera condiciones distintas**. Es el piloto de menor riesgo: son los pedidos que menos margen dejan hoy.

**Momento 4 — Teléfonos marcados por 99 Envíos.** *(el de mayor valor)*

Tu repo ya lo tenía validado: en un teléfono con historial de devolución, *"la jugada real es pago anticipado"* — gana si más del 42% acepta. Ahí el descuento se paga con el rechazo evitado, sin tocarle el precio al cliente bueno.

### ⛔ Dónde NO va

**Si el cliente ya dijo que sí a contraentrega, no se le ofrece.** Sería regalar $4.000 en una venta que ya tenías. Solo se ofrece si (a) la forma de pago está abierta, o (b) el precio está frenando la venta.

### El guion anti-regateo

Cuando pida el precio de prepago pero con contraentrega:

> *"Ese precio es por pagar por adelantado — es lo que me permite dejártelo más abajo. Si preferís contraentrega no hay problema, te queda en **$82.000** y lo pagás tranquilo al recibir 🙌"*

Firme, amable, **y no pierde la venta**.

---

## 6. 🔴 Por qué todavía no lo implementé

**1. El ahorro es n=1.** No hay **ni una** guía prepagada con `valor_servicio` registrado en el repo. Tu caso de Cali es el único dato, y la comisión del 6,97% sale de una pendiente con **dos** puntos. Si la comisión tiene parte fija, el ahorro es menor.

> **Lo más rápido:** pedile a 99 Envíos la tarifa **"sin recaudo"** por ciudad. Eso resuelve la duda en una llamada. Si no, despachá 5-10 prepagados y anotá el `valor_servicio`.

**2. El monto del descuento es tu decisión.** Los $4.000 son mi supuesto. Con el ahorro confirmado podés ir de $3.000 (más conservador) a $5.000 (más agresivo). El repo tiene un precedente de que el bot ya se inventó este descuento dos veces, con riesgo cuantificado en ~$482.400/mes — si lo autorizamos, el modo de falla cambia de *"el bot alucina una política"* a *"la política existe y el bot la aplica mal"*. Eso necesita pruebas apretadas.

**3. Hay un costo operativo que nadie contó.** Cada prepago te obliga a **verificar la plata a mano**. A 20 pedidos/día con 30% de adopción son **6 verificaciones diarias**. Y abre algo que hoy no existe: **devolver plata** si el pedido se cae.

---

## 7. Lo que propongo

| | |
|---|---|
| **Paso 1** | Preguntale a 99 Envíos la tarifa sin recaudo. Un dato, una llamada. |
| **Paso 2** | Decidís el monto del descuento con ese dato en la mano. |
| **Paso 3** | Piloto **solo en bandas D y E** (pueblos), 2 semanas. Ahí el ahorro es mayor y el riesgo menor. |
| **Paso 4** | Implemento: `cotizar()` con forma de pago, los dos precios separados, el diálogo en los momentos 1 y 2, y pruebas que verifiquen que contraentrega **nunca** hereda el precio del prepago. |
| **Paso 5** | Si el piloto sostiene el cierre, se abre a capitales y Bogotá. |

**Decime el monto y si arrancamos por pueblos, y lo implemento.** Si preferís medir primero, también puedo dejarte armado el script que cuenta anticipado vs contraentrega para tener la línea base — hoy no existe y sin eso no vas a poder saber si el descuento movió algo.

---

### Un bug menor que encontré de paso

`bot/src/prompt.js:250` tiene el ejemplo de Cali con **$81.000**, pero Cali es banda C = **$82.000**. Es solo un ejemplo del guion, pero la IA lo puede copiar. Lo corrijo cuando toquemos ese archivo.
