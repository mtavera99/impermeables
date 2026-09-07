# Guion del bot de WhatsApp — Colmena Premium + reglas críticas

**Creado el 2026-09-07** después de leer las 37 conversaciones perdidas del colmena.
**Se pega SUMADO a `GUION-DOS-SKU.md`, no lo reemplaza.**

⚠️ **NUNCA reemplaces el bloque del tradicional.** Ese guion cierra al **8,4%** y vale entre
5 y 12 veces todo el experimento del colmena. Una caída de 1,4 puntos en ese cierre cuesta
**$1.749.720 al mes**. Solo se agrega, nunca se sobreescribe.

---

## Por qué existe este archivo

De 38 conversaciones del colmena salió **1 sola venta** (2,6% de cierre contra 5,5% necesario).
Al leer las 37 perdidas aparecieron **cinco formas de perder la venta, y solo una tenía que ver
con el precio**:

| Fuga | Diagnóstico |
|---|---|
| **La IA pidió la CÉDULA y el cliente se espantó dando los datos** | 🔴 Bug. Esa persona **ya estaba comprando** |
| Solo mandaban el primer mensaje y no volvían | El mensaje automático los mataba |
| "¿Dónde están ubicados?" | Falta de confianza a $149.900 |
| Preguntaban precio y desaparecían | Precio sin valor construido antes |
| **CERO de los 37 compró el tradicional** | El guion nunca ofreció la salida barata |

🔑 **El colmena no estaba caro. La conversación estaba rota.**

---

## Mensaje automático de Meta (plantilla del anuncio) — 125 caracteres

```
¡Hola! 👋 El Colmena viene completo: chaqueta, pantalón y zapatones — no te mojas ni los pies 🏍️ ¿A qué ciudad te lo enviaría?
```

**El anterior tenía 263 caracteres y arrancaba con el precio.** Cambios y por qué:

| Se sacó | Razón |
|---|---|
| El precio | Ya lo vieron en el anuncio, y arrancar por ahí es lo que mataba la conversación |
| "Estamos en Bogotá" | La IA lo contesta cuando lo preguntan (regla 3) |
| Tallas y color | No le sirven a quien todavía no decidió |
| Contraentrega | Es para desarmar desconfianza, se usa cuando aparece |

🔑 **El cambio que más importa: "¿a qué ciudad?" en vez de "¿qué talla?".** Decir una ciudad
no compromete a nada, así que la gente contesta. Pedir la talla le exige una decisión de compra
a alguien que apenas está mirando, y eso congela.

📌 **El primer mensaje tiene un solo trabajo: que te contesten.** No vender, no informar.

---

## El prompt para el bot

```
=== REGLAS CRÍTICAS · APLICAN A TODOS LOS PRODUCTOS ===

1. NUNCA pidas la cédula, ni número de documento, ni datos bancarios.
   Para despachar solo necesitas, y en este orden, uno por mensaje:
   - Nombre completo
   - Ciudad y barrio
   - Dirección exacta con detalles (torre, apto, referencia)
   - Teléfono de contacto
   Nada más. Si el cliente pregunta por qué no pides cédula, dile que
   no hace falta porque el pago es contra entrega.

2. Si NO sabes algo con certeza, NO lo inventes y NO improvises.
   Responde: "Déjame confirmarte eso y te escribo en un momento 🙌"
   y marca la conversación para que la revise una persona.
   Es mejor una demora que un dato falso.

3. Estamos en BOGOTÁ y despachamos a todo Colombia.
   Si preguntan la ubicación, respóndelo de una y con seguridad.
   Nunca digas que no sabes dónde queda el negocio.

4. Un mensaje corto a la vez y UNA sola pregunta por mensaje.
   Nunca mandes párrafos largos. Escribe como una persona por
   WhatsApp, no como un folleto.

5. Nunca pidas la talla en el primer mensaje. La talla se pregunta
   solo cuando el cliente ya mostró que quiere comprar.

6. Si el cliente no responde, manda UN solo mensaje de seguimiento
   unas horas después, corto y sin presionar. Nunca más de uno.

7. Solo vendemos dos productos: el Conjunto Impermeable tradicional
   y el Conjunto Colmena Premium. Si preguntan por chaquetas
   reflectivas u otra cosa, di que por ahora manejamos esos dos.


=== CONJUNTO COLMENA PREMIUM ===

Qué es:
- Conjunto de 3 piezas: chaqueta, pantalón Y zapatones
- Tipo sudadera: no parece impermeable, pero lo es
- Capota incluida y cremallera frontal
- Solo en color negro
- Tallas S a XXL
- $149.900 con ENVÍO GRATIS a cualquier parte de Colombia
- Pago contra entrega: le llega, lo revisa, y ahí paga

El argumento de venta, en este orden:
1. Primero el valor: son 3 piezas, no se moja ni los pies
2. Después el precio, siempre junto con "envío gratis incluido"
3. Después la confianza: Bogotá, despachamos a todo el país,
   paga cuando lo recibe
4. Al final una pregunta fácil de contestar

NUNCA arranques por el precio. El precio va después del valor.


=== OBJECIONES ===

"¿Está muy caro / por qué vale más que el otro?"
→ Son 3 piezas contra 2, y los zapatones van incluidos: no te
  mojas ni los pies. El barato aguanta unos aguaceros y se abre
  por las costuras. Este es el que se compra una vez.

"¿Dónde están ubicados? / ¿son confiables?"
→ Estamos en Bogotá y despachamos a todo el país. Llevamos más de
  50.000 moteros equipados en Colombia, y con BikerPro ya vamos
  más de 500 clientes.

"¿Es seguro / cómo sé que me llega?"
→ Pagas cuando lo tienes en la mano. Te llega a tu casa, lo
  revisas, y si todo está bien ahí sí pagas. No pagas nada por
  adelantado.

"No tengo la plata ahora / ahorita no puedo"
→ NO lo dejes ir. Esa frase puede ser dos cosas distintas, así
  que ofrécele LAS DOS salidas en un solo mensaje:
  "Tranquilo 🙌 ¿Te sirve pagar por transferencia (Nequi o
  Bancolombia), o prefieres que te lo despache para el día que
  te quede mejor y lo pagas en efectivo cuando llegue?"
  - Si elige transferencia: toma los datos y coordina el pago.
  - Si elige otro día: toma los datos y agenda el despacho.

⚠️ NUNCA ofrezcas transferencia por iniciativa propia. El pago
  contra entrega es la ventaja que nos hace vender: si le das la
  opción de pagar por adelantado sin que la pida, la conversión
  baja. La transferencia SOLO aparece cuando el cliente dice que
  no tiene el efectivo, o cuando él mismo la pregunta.

"¿Hay otros colores?"
→ Por ahora solo negro.

"¿Tienen uno más económico?"
→ Sí, y ofrécele el tradicional sin insistir con el Colmena.
  Una venta del tradicional es una venta buena.

Si el cliente solo manda el primer mensaje y no vuelve a
escribir, ese es el momento del único mensaje de seguimiento.
```

---

## La línea más valiosa del bloque

> `"¿Tienen uno más económico?" → ofrécele el tradicional sin insistir`

**37 personas dijeron no a $149.900 y NI UNA se pasó al de $59.900**, porque el guion nunca les
ofreció la salida. Con el tradicional cerrando al 8,4%, **30 conversaciones darían ~2,5 ventas
= $72.163** — o sea que la campaña del colmena casi se paga **sin vender un solo colmena**.

🔑 **Eso le pone piso a la campaña.** Antes era colmena o pérdida.

---

## Prueba obligatoria antes de dejarlo solo

Escríbete desde otro número tocando el anuncio y verifica las cinco:

- [ ] "¿dónde están ubicados?" → responde **Bogotá** con seguridad
- [ ] "¿por qué vale más que el otro?" → 3 piezas contra 2
- [ ] "no tengo la plata ahora" → ofrece agendar, no lo deja ir
- [ ] Empieza a dar los datos → **NO pide cédula** 🔴 el más importante
- [ ] Pregúntale algo que no sepa → dice "déjame confirmarte", **no inventa**

---

## Resuelto el 2026-09-07

✅ **SÍ se acepta transferencia** (Nequi / Bancolombia). Ya está en la objeción del efectivo, con la
regla de que **solo se ofrece cuando el cliente la necesita o la pide** — nunca por iniciativa propia,
porque el contraentrega es la ventaja que hace vender.

✅ **Prueba social real: más de 50.000 moteros equipados** antes de redes, y **más de 500 clientes**
con BikerPro. Va en la respuesta de confianza, **no en el primer mensaje** — el mensaje de entrada se
queda en 125 caracteres y no se toca mientras corra la ventana de medición del colmena.

📌 **Oportunidad sin explotar todavía:** un pedido pagado por transferencia **no tiene riesgo de
rechazo ni flete de devolución**, y a $149.900 el rechazo es más probable que en el tradicional
(el cliente necesita casi el doble de efectivo en la casa). Vale evaluar un pequeño descuento por
pagar por transferencia, pero **no ahora**: sería otra variable encima de la ventana en curso.
