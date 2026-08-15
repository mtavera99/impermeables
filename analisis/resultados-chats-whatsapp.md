# Análisis del embudo de WhatsApp — primera pasada (47 chats, 24 jul – 14 ago)

**Fuente:** 47 conversaciones reales exportadas por el dueño el 2026-08-14 (1.331 mensajes).
**Los chats crudos NO están en este repo** (traen nombres, teléfonos y direcciones de clientes).
Viven en el repo privado `bikerpro-chats-privado` junto con los scripts `analizar-chats.py` y
`verificar-colgados.py`. Acá van solo los resultados agregados.

> ⚠️ **LA MUESTRA ES VARIADA, NO ALEATORIA.** El dueño mandó un surtido, no una muestra
> estratificada. **Las tasas de esta muestra NO son las del negocio.** Lo que sí vale: los
> defectos del guion (son verificables uno por uno) y la estructura del embudo.
> **Solo 4 de 47 cruzan con una guía** porque el archivo de teléfonos solo cubre las 26 guías de
> 99 Envíos (10-14 ago); los compradores de julio no son detectables.

---

## ✅ LO QUE SÍ SE ENCONTRÓ (defectos verificables, no estadística)

### 1. 🔴 El guion promete un envío que no existe — y ESO causa la fuga de flete de la sección 0-H

**20 de 47 chats (43%)** contienen la frase *"El envío para el resto del país tiene un costo de
$15.000 a $20.000"*.

| | |
|---|---|
| Lo que promete el guion | **$15.000 – $20.000** |
| Lo que cuesta de verdad (26 guías) | **$12.871 – $35.860** |

**Este es el hallazgo más importante de la pasada, porque CIERRA UN CÍRCULO:**
la sección 0-H encontró que en los destinos caros se absorben **$3.900-4.900 de flete** y no se sabía
por qué. **Acá está la causa: el guion ya le prometió al cliente un total bajo, entonces cuando el
flete real llega a $25.000-35.000 hay que comerse la diferencia** para no romper la promesa.
- **No era un error de tarifario. Era el guion generando la deuda antes de cotizar.**
- Y del lado del rechazo: prometer $20.000 y que el mensajero cobre $35.000 es exactamente el tipo de
  sorpresa que hace que el cliente no reciba. **Conecta con el 15,3% de rechazo.**
- ✅ **ARREGLO:** que el guion **no dé un rango**; que pregunte la ciudad y **cotice el flete real**,
  o que diga el techo verdadero (*"entre $13.000 y $36.000 según la ciudad"*).

### 2. 🔴 Se manda el cuadro de confirmación CON LOS CAMPOS EN BLANCO

**17 de 47 chats (36%)** tienen un mensaje del negocio así, literal:

```
• Color: ___ · Talla: ___
• Dirección: ___ · Ciudad: ___
• Nombre y celular: ___
¿Todo correcto? Responde "SÍ CONFIRMO"
```

Se envía la **plantilla sin rellenar**, y justo en el momento del cierre — el paso del "SÍ CONFIRMO"
que el archivo madre identifica como una de las causas de que el cierre subiera.
Le pide al cliente que confirme un pedido vacío. **Es el defecto más fácil de arreglar y el que peor
se ve.**

### 3. La conversación se decide en TALLA y COLOR, no en precio

De los 44 que escribieron algo propio:

| Tema que menciona el cliente | % |
|---|---|
| **Color** | **77%** |
| **Talla** | **64%** |
| Envío / flete | 20% |
| Pide fotos | 16% |
| Contraentrega | 11% |
| 2+ unidades | 9% |
| Dinero / quincena | 7% |
| Precio caro | 5% |
| Clima / lluvia | 2% |
| Desconfianza | **0%** |

- 🔑 **El precio casi no se objeta (5%) y la desconfianza es 0%.** Los dos miedos que el archivo
  asumía (contraentrega, credibilidad) **no aparecen.** La prueba social ya hizo su trabajo.
- ⚠️ **El 77% pregunta por color** — y según la sección 9 **no hay fotos de blanco ni de morado.**
  Vale la pena revisar cuántos preguntan justo por los colores que no se pueden mostrar.
- 💡 **El 9% menciona 2+ unidades sin que se lo ofrezcan**, coherente con el 16% de pedidos de 2
  unidades de la sección 0-G. Solo **4 chats** muestran la oferta del descuento por 2 → **está
  desaprovechado.**

### 4. La velocidad de respuesta NO es el problema

Los **47 chats** tienen la primera respuesta en **menos de 2 minutos** (mediana 0). La responde un
automático. **Descarta "responder tarde" como causa de nada.**

### 5. Facebook vs Instagram — dimensión nueva, pero sin señal aún

| Plataforma | Chats | Escribieron | Compraron |
|---|---|---|---|
| Facebook | 35 | 32 (91%) | 3 |
| Instagram | 9 | 9 (100%) | 0 |

Números muy chicos para concluir. **Pero es una dimensión que ahora se puede medir.**

### 6. La atribución por creativo NO se puede hacer hoy — y ya se sabe qué falta

Facebook e Instagram usan **el mismo texto de apertura**, así que el chat no permite distinguir
qué anuncio lo generó. **Confirma el pendiente #32 y le da la solución exacta:** poner un texto de
apertura **distinto por anuncio**. Sin eso, nunca se sabrá qué creativo genera **ventas** y no solo
conversaciones baratas.

---

## ❌ TRES HIPÓTESIS QUE ESTOS DATOS MATARON

Quedan escritas a propósito: son el mismo tipo de error que la sección 11 documenta.

| Hipótesis | Qué decían los datos |
|---|---|
| **"Muchas conversaciones son toques de botón vacíos"** — el texto *"¡Hola! Quiero más información."* es prerrellenado por el anuncio, así que se supuso que buena parte de las 849 nunca fue una conversación real | ❌ **Solo 3 de 47 (6%) nunca escribieron nada propio.** El 94% sí participó. *(Ojo: la muestra la eligió el dueño, probablemente favoreciendo chats con conversación → el sesgo va en esta dirección. Necesita muestra aleatoria para cerrarse.)* |
| **"Se perdió el flujo de CIUDAD PRIMERO del PR #19"** — se vio en 2 chats que el guion nuevo pedía color y talla antes que ciudad | ❌ **5 de 47 no piden ciudad, y están dispersos** (07-28, 08-02, 08-04, 08-11, 08-14). **No es una regresión en el tiempo, es variación.** Conclusión sacada de 2 archivos, refutada con 47. |
| **"39% de los clientes quedan sin respuesta = $415.000 de margen tirado"** | ❌ **Artefacto de la métrica.** De 18 "colgados", **15 eran el cliente despidiéndose** ("Ok", "Gracias", "👍🏾"). La fuga real es **1 chat de 44.** Verificado en `verificar-colgados.py`. |

**Y sobre las hipótesis abiertas de la sección 0-I:** en lo que los clientes *escriben*, **dinero/quincena
aparece en 7% (3 chats) y clima en 2% (1 chat)**. Es **evidencia directa por primera vez**, es débil por
el tamaño, y **apunta ligeramente EN CONTRA de las dos.** No alcanza para descartarlas.

---

## 📌 QUÉ PEDIR EN LA SIGUIENTE TANDA

Esta muestra sirvió para **defectos**, no para tasas. Para medir tasas de verdad:

1. **Muestra ALEATORIA, no elegida** — para poder medir el % de toques de botón vacíos sin sesgo.
2. **~30 del pico (5-10 ago) y ~30 del valle (10-14 ago)** — sigue siendo la comparación que puede
   resolver el misterio del cierre.
3. **Chats de clientes que terminaron en DEVOLUCIÓN** — para ver si la sorpresa del flete aparece ahí.
   Es la conexión más valiosa que quedó abierta.
