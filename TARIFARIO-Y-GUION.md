# Tarifario real + arreglo del guion — 2026-08-21

Cierra el **punto 4 del ORDEN DE EJECUCIÓN** del plan del 19-ago y los **pendientes #38 (a) y (b)**
y **#35** del archivo madre.

**Qué estaba roto:** el guion prometía un envío que no existe. La tabla de fletes que alimenta el
conocimiento del negocio (`bot/src/fletes.js`) era **inventada**: decía Cali $13.000 cuando 99 Envíos
cobra $20.771, Cartagena $15.000 cuando cobra $20.771, y usaba $18.000 como estimado para "otra
ciudad" cuando los pueblos cuestan **$25.029**. Esa tabla es la causa de la fuga de la sección 0-H.

**Medido con las 79 guías reales del 10 al 19 de agosto:** se absorbieron **$102.148** de flete en
77 guías. Con el tarifario nuevo la absorción baja a **$1.574** (un solo caso). **98,5% de la fuga
eliminada.** Script: `analisis/tarifario-real.py` · verificación: `node bot/src/verificar-tarifario.js`

---

## 1. El tarifario: 5 escalones, no una lista de ciudades

Los fletes de 99 Envíos no son un continuo — caen en 5 escalones nítidos. Eso permite un guion
simple: **la IA no calcula nada, solo dice el TOTAL de la zona.**

| Zona | Flete real 99 Envíos | 🔒 TOTAL a cobrar | Antes se cobraba | Recupera |
|---|---|---|---|---|
| **A · Bogotá y sabana** | $12.871 | **$73.000** | $72.698 | ~$0 (ya estaba bien) |
| **B · Boyacá, Casanare, Meta** | $16.684–16.843 | **$77.000** | $76.561 | ~$0 (ya estaba bien) |
| **C · Capitales grandes** | $20.771 | **$81.000** | $80.941 | ~$0 (ya estaba bien) |
| **D · Ciudades intermedias** | $22.714–22.870 | **$83.000** | $80.676–81.752 | **+$941 a $1.938** |
| **E · Pueblos y zona extendida** | $24.953–25.029 | **$85.000** | $80.000–81.030 | **+$3.899 a $4.853** |

**La fuga estaba concentrada en las bandas D y E.** Las bandas A, B y C ya se cobraban bien: el
problema nunca fue el tarifario completo, fueron **los destinos caros**, exactamente como decía la
sección 0-H. Y **la banda E es 20 de 72 guías (28% del volumen)**, no un caso raro.

### Ciudades por banda (las vistas en 79 guías + las obvias que faltaban)

- **A ($73.000):** Bogotá, Soacha, Zipaquirá, Chía, Cajicá, Mosquera, Madrid, Funza, Facatativá, Sibaté, La Calera
- **B ($77.000):** Tunja, Paipa, Duitama, Sogamoso, Aguazul, Yopal, Tocancipá, Villavicencio, Acacías, **Cucunubá**, Ubaté, Chocontá, Villa de Leyva
- **C ($81.000):** Medellín, Itagüí, Envigado, Sabaneta, Cali, Palmira, Jamundí, Yumbo, Barranquilla, Soledad, Cartagena, Pereira, **Dosquebradas**, Manizales, Barrancabermeja, Yarumal, Armenia, Ibagué, Neiva
- **D ($83.000):** Bucaramanga, Montería, Popayán, Santa Marta, Ipiales, Florencia, Mocoa, Bello, Rionegro, Cereté, Coveñas, Samacá, Cúcuta, Pasto, Valledupar, Sincelejo, Quibdó, Riohacha
- **E ($85.000):** Guachené, Gómez Plata, Algeciras, Remedios, Túquerres, Turbo, Puerto Gaitán, Anserma, La Unión, El Santuario, Llorente, San Carlos de Guaroa, Buenavista, San Gil, Inzá, Málaga, Caucasia, Santa Rosa de Cabal, Riosucio, Maceo, Paratebueno, Santiago de Tolú, San Andrés de Sotavento, Hispania, Guacarí
- **Cualquier otra → banda E ($85.000).** Antes el default era $18.000 de flete, y se quedaba corto
  justo en los destinos que no están en ninguna lista, que son los pueblos. **Errar hacia arriba
  cuesta una objeción; errar hacia abajo cuesta $4.900 de margen.**

### 🔑 Por qué el precio cubre el peor caso: **no existe "el flete de Bogotá"**

**99 Envíos reparte entre tres transportadoras y cada una cobra distinto por el mismo destino.**
Quién despacha lo decide 99 Envíos, no vos — así que no se puede saber de antemano cuánto va a
costar ese envío:

| Destino | coordinadora | interrapidísimo | servientrega |
|---|---|---|---|
| Bogotá | **$11.880** | $12.871 | $14.674 |
| Chía | **$11.951** | $12.871 | — |

**Y como vos ELEGÍS la transportadora, el precio de cada banda es alcanzable — pero hay que elegir
bien.** Las dos reglas que hacen que el tarifario cierre:

| Destino | Elegí | Por qué |
|---|---|---|
| **Bogotá y sabana** | **coordinadora** (o interrapidísimo) | con servientrega ($14.674) el total de $73.000 se queda corto $1.574 |
| **Cartagena** | **servientrega** ($20.771) | con interrapidísimo ($22.793) faltan $1.693 |

⚠️ **La excepción de Cartagena:** es la ciudad que más rechaza de todas. Si interrapidísimo entrega
mejor allá, **pagá los $2.022 y listo** — una devolución cuesta muchísimo más. Eso es decisión de
negocio, no de tarifa.

📌 **Y la pregunta que vale plata: ¿qué cobertura tiene coordinadora?** Es la más barata de las tres
($15.440 promedio contra ~$20.800 de las otras dos) pero solo se ha usado en **5 destinos**. Si cubre
el país, es el ahorro más grande que tenés disponible hoy. **Metelo en la misma llamada de los días
de pago.** Solo en Bogotá, elegirla en vez de interrapidísimo son **$991 por envío** — y hubo
8 envíos a Bogotá que se fueron por la más cara teniendo la barata disponible.

### Tres decisiones que conviene conocer

1. **Banda A se queda en $73.000 aunque una guía necesitaba $75.000.** Fue la de Servientrega
   ($14.674) contra 16 de Interrapidísimo ($12.871). Subir toda Bogotá $2.000 para cubrir 1 de 17
   casos castiga al 24% del volumen y al cliente más sensible al precio.
   **Se acepta absorber $1.574 esporádicos.** Igual con Cartagena ($1.693) y Medellín ($730).
2. **Guacarí se deja en la banda E ($85.000) aunque su único dato dice $81.000.** Ese dato vino de
   **coordinadora**, la transportadora barata; con interrapidísimo un municipio de ese tamaño
   cuesta $25.029. **Con un solo dato, se cubre el peor caso.**
3. **Los totales están redondeados al millar hacia arriba**, así que hay un colchón de $71 a $426
   por venta. Ese colchón es lo que absorbe las variaciones chicas de tarifa.

---

## 2. Bloque para pegar en la IA de WhatsApp Business

⚠️ **Esto es lo que hay que hacer a mano hoy.** La IA que atiende a los clientes es **Meta AI de
WhatsApp Business**, configurada por vos (sección 5-B) — **no** el bot de `/bot`. Cambiar el repo
**no cambia lo que la IA le dice al cliente.** Reemplazá la sección de envíos de tu configuración
por esto:

```
ENVÍOS — REGLA QUE NO SE ROMPE NUNCA

Nunca doy un valor de envío antes de saber la ciudad del cliente. Ni un número, ni un
rango, ni un "más o menos". Si me preguntan por el envío sin haber dicho la ciudad,
respondo siempre: "El envío depende de tu ciudad 📦 ¿Para qué ciudad sería?"

Nunca doy un rango de precios de envío. El costo real cambia casi al doble entre el
destino más barato y el más caro, así que cualquier rango queda mal en la mitad de los
casos, y prometer poco y cobrar más causa devoluciones.

Cuando ya sé la ciudad, digo los dos números en una sola frase y CIERRO en el total:
"El conjunto es $59.900 y el envío a Cali son $21.100, así que te llega a $81.000
al recibir, todo incluido 📦"

Así respeto el precio que vio en el anuncio, muestro la cuenta para que no haya
sorpresa en la puerta, y queda claro el único número que importa: el que va a
entregar al recibir. El total es un precio FIRME, no un estimado.

Si me pregunta por el envío suelto se lo digo sin problema, pero siempre vuelvo a
cerrar en el total. Nunca dejo la conversación en un número que no sea el total.

TOTALES POR ZONA (1 conjunto, incluye producto + envío):

$73.000 — Bogotá, Soacha, Zipaquirá, Chía, Cajicá, Mosquera, Madrid, Funza,
          Facatativá, Sibaté, La Calera
$77.000 — Tunja, Paipa, Duitama, Sogamoso, Aguazul, Yopal, Tocancipá,
          Villavicencio, Acacías, Cucunubá, Ubaté, Chocontá, Villa de Leyva
$81.000 — Medellín, Itagüí, Envigado, Sabaneta, Cali, Palmira, Jamundí, Yumbo,
          Barranquilla, Soledad, Cartagena, Pereira, Dosquebradas, Manizales,
          Barrancabermeja, Yarumal, Armenia, Ibagué, Neiva
$83.000 — Bucaramanga, Cúcuta, Montería, Popayán, Pasto, Ipiales, Santa Marta,
          Valledupar, Sincelejo, Florencia, Mocoa, Quibdó, Riohacha, Bello,
          Rionegro, Cereté, Coveñas, Samacá
$85.000 — Cualquier pueblo o municipio que no esté en las listas de arriba
          (Guachené, Gómez Plata, Algeciras, Remedios, Túquerres, Turbo,
          Puerto Gaitán, Anserma, La Unión, El Santuario, San Gil, Inzá,
          Málaga, Caucasia, Santa Rosa de Cabal, Riosucio, Maceo,
          Paratebueno, Santiago de Tolú, San Andrés de Sotavento,
          Hispania, Guacarí y similares)

Si la ciudad no aparece, uso $85.000. Nunca invento un valor más bajo para no incomodar.

```

```
DOS CONJUNTOS — EL ORDEN IMPORTA

Hay promo: 2 conjuntos por $110.000, y el envío se cobra aparte igual que siempre.
Pero no la ofrezco de entrada, porque hay clientes que pagan los dos completos.

PRIMERO ofrezco el envío compartido, sin descuento:
"Si llevas dos, van en el mismo paquete y pagas un solo envío — te ahorras
como $13.000 💡"
Eso es cierto y no cuesta nada: dos pedidos separados pagan dos envíos.

SOLO SI DUDA, saco la promo:
"En promo te dejo los dos en $110.000 🙌"

El envío de 2 conjuntos se cobra SIEMPRE completo. Nunca lo regalo.

Y no invento el total de 2 unidades: el envío de dos no es el doble del de uno y
cambia según la ciudad. Digo el precio del producto y que le confirmo el total en
un momento, y aviso al asesor:
"En promo son $110.000 los dos 🙌 Déjame confirmarte el envío exacto a tu ciudad
y te doy el total en un minuto."

Totales de 2 conjuntos que ya están confirmados (estos sí los puedo dar directo):
  Pereira $138.000 · Medellín $138.000 · Caucasia $139.000
  Santa Rosa de Cabal $139.000 · Hispania $145.000 · Cartagena $146.000
```

```
CUADRO DE CONFIRMACIÓN — SIEMPRE CON TODOS LOS DATOS LLENOS

Cada campo va lleno con el dato real que dio el cliente. Nunca mando el cuadro con
marcadores de relleno ni espacios vacíos: el cliente lee eso como desorden justo cuando
está decidiendo pagar. Si me falta UN dato, no mando el cuadro: pregunto solo ese dato
y espero la respuesta.

Confirmemos tu pedido ✅
Nombre:
Celular:
Ciudad:
Dirección:
Color de la franja:
Talla:
Pago: contraentrega o anticipado
TOTAL a pagar al recibir:

¿Está todo bien? Respóndeme "SÍ CONFIRMO" y lo despacho 🏍️

Antes de escribirlo reviso los 8 campos. Si alguno no lo dijo el cliente, falta un dato:
lo pregunto y no mando el cuadro todavía.
```

### Cómo comprobar que quedó bien (3 minutos, celular ajeno)

| Pregunta | Respuesta correcta |
|---|---|
| "¿Cuánto vale el envío?" (sin decir ciudad) | debe preguntar la ciudad, **sin dar ningún número** |
| "Soy de Gómez Plata" | **$85.000** total |
| "Soy de Cali" | **$81.000** total, **mostrando la cuenta** ($59.900 + $21.100) |
| "Soy de Pueblito que no existe" | **$85.000** total (no un valor inventado más bajo) |
| "Quiero dos" | envío compartido primero; la promo de $110.000 **solo si duda** |

---

## 2-bis. 💰 La promo 2×$110.000 — el orden de oferta importa

**La promo existe pero no se está cobrando bien: los 6 pedidos de 2 unidades cobraron 6 precios
distintos** ($107.013 a $119.981 de producto), y en 2 de ellos **se absorbió flete ($4.870)**.

**Deja plata, y bastante** (margen por pedido, con el flete pasado al cliente):

| Escenario | Margen | Neto tras CPA $6.046 |
|---|---|---|
| 1 unidad a $59.900 | $24.400 | **$18.354** |
| **2 unidades en promo $110.000** | $40.500 | **$34.454** |
| 2 unidades a precio lleno $119.800 | $50.300 | **$44.254** |

✅ La promo deja **1,88×** una venta de 1 unidad. ⚠️ Pero **el descuento de $9.800 sale entero del
margen**: la segunda unidad pasa de $25.900 a $16.100.

### 🔑 El orden que conviene (y quedó en el guion)

**1º — El envío compartido, SIN descuento.** Los dos van en el mismo paquete, así que el cliente paga
**un solo envío**. A Medellín eso son **$41.542 de flete si van separados contra $27.891 juntos: le
ahorrás $13.651** y no regalás un peso de producto.

> *"Si llevas dos, van en el mismo paquete y pagas un solo envío — te ahorras como $13.000 💡"*

**2º — La promo de $110.000 solo cuando DUDA.** No la ofrezcas de entrada: **hay clientes que pagan
las dos completas** (el pedido de Cartagena pagó $119.981), y el 9% pide la segunda unidad sin que se
la ofrezcan.

**3º — El envío de 2 unidades se cobra SIEMPRE completo, y no se adivina.** Sube entre **+$3.008 y
+$15.089** sobre el de 1 unidad, porque dos conjuntos cruzan escalones de peso distintos según la
transportadora. **Los que ya están medidos:**

| Ciudad | Flete 2 uds | Total con promo |
|---|---|---|
| Pereira | $27.608 | **$138.000** |
| Medellín | $27.891 | **$138.000** |
| Caucasia | $28.037 | **$139.000** |
| Santa Rosa de Cabal | $28.014 | **$139.000** |
| Hispania | $34.112 | **$145.000** |
| Cartagena | $35.860 | **$146.000** |

**Para cualquier otra ciudad: mirá el flete de 2 unidades en el panel antes de dar el total.** Son
30 segundos y evita regalar $3.000.

---

## 3. 🚨 El precio de 2 unidades no estaba definido (ya se resolvió)

Salió al mirar los pedidos multi-unidad. **Cada pedido de 2 conjuntos se cobró distinto:**

| Ciudad | Flete | Cobrado | Producto implícito | Por unidad |
|---|---|---|---|---|
| Cartagena | $35.860 | $155.841 | $119.981 | **$59.991** |
| Caucasia | $28.037 | $142.200 | $114.163 | $57.081 |
| Santa Rosa de Cabal | $28.014 | $141.845 | $113.831 | $56.915 |
| Medellín | $27.891 | $139.998 | $112.107 | $56.053 |
| Pereira | $27.608 | $135.725 | $108.117 | **$54.058** |

**Dispersión del 11%: entre el mejor y el peor caso hay $11.864 por pedido.** No hay política de
precio para la segunda unidad — cada cierre improvisó. **Esto bloquea el pendiente #40**
("ofrecer sistemáticamente la segunda unidad"): no se puede ofrecer con guion algo que no tiene
precio definido.

**Y el gancho es real:** el flete de 2 unidades **no se duplica**, sube entre $6.838 y $15.089.

| Ciudad | 1 unidad | 2 unidades | Aumento |
|---|---|---|---|
| Pereira | $20.771 | $27.608 | +$6.838 |
| Medellín | $20.771 | $27.891 | +$7.121 |
| Cartagena | $20.771 | $35.860 | +$15.089 |

→ **Decisión que necesito de vos:** ¿cuál es el precio de la segunda unidad? Con eso cierro el
pendiente #40 y armo el guion de la oferta. Mi sugerencia, para que quede simple y sin regalar
margen: **total de la zona + $57.000**, que respeta el descuento que ya venías dando de hecho
(el promedio real fue ~$57.000 por unidad en pedidos de 2) y deja el flete extra cubierto.

---

## 4. Qué cambió en el repo

| Archivo | Cambio |
|---|---|
| `bot/src/fletes.js` | **reescrito.** Tarifario real por bandas, normalización de nombres de ciudad (tildes, "D.C."), `cotizar(ciudad, unidades)`, default a la banda más cara |
| `bot/src/prompt.js` | regla de envío (no dar número sin ciudad, no dar rangos, total firme) + cuadro de confirmación sin campos vacíos + el `##ORDER##` ahora exige el total de la zona |
| `bot/src/verificar-tarifario.js` | **nuevo.** Red de seguridad: corre el tarifario contra las guías reales y dice cuánto se absorbería |
| `analisis/tarifario-real.py` | **nuevo.** De dónde salen las bandas |

Ojo con dos cosas que se descubrieron al hacerlo:

- **El CSV de 99 Envíos tiene comas dentro de los campos** (`"BOGOTÁ, D.C."`). Partir por comas a
  lo bruto corrompe 10 filas y da resultados falsos. `verificar-tarifario.js` trae un parser que
  respeta las comillas. **Cualquier análisis futuro de esos CSV tiene que usar un parser real.**
- **En las devoluciones, `valor_servicio` es la prima del seguro, no el flete** ($1.742 y $3.111).
  Si se promedian como fletes, bajan Bogotá y Santa Marta artificialmente. Se excluyen con un
  umbral de $8.000.
