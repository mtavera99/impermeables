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
- **B ($77.000):** Tunja, Paipa, Aguazul, Tocancipá, Villavicencio, Duitama, Sogamoso, Yopal, Acacías
- **C ($81.000):** Medellín, Cali, Barranquilla, Soledad, Cartagena, Pereira, Manizales, Barrancabermeja, Yarumal, Armenia, Ibagué, Neiva
- **D ($83.000):** Bucaramanga, Montería, Popayán, Santa Marta, Ipiales, Florencia, Mocoa, Bello, Rionegro, Cereté, Coveñas, Samacá, Cúcuta, Pasto, Valledupar, Sincelejo, Quibdó, Riohacha
- **E ($85.000):** Guachené, Gómez Plata, Algeciras, Remedios, Túquerres, Turbo, Puerto Gaitán, Anserma, La Unión, El Santuario, Llorente, San Carlos de Guaroa, Buenavista, San Gil, Inzá, Málaga, Caucasia, Santa Rosa de Cabal
- **Cualquier otra → banda E ($85.000).** Antes el default era $18.000 de flete, y se quedaba corto
  justo en los destinos que no están en ninguna lista, que son los pueblos. **Errar hacia arriba
  cuesta una objeción; errar hacia abajo cuesta $4.900 de margen.**

### Dos decisiones que conviene conocer

1. **Banda A se queda en $73.000 aunque una guía necesitaba $75.000.** Hubo una guía de Bogotá por
   **Servientrega** a $14.674 (las otras 16 fueron Interrapidísimo a $12.871). Subir toda Bogotá
   $2.000 para cubrir 1 de 17 casos castiga al 24% del volumen y al cliente más sensible al precio.
   **Se acepta absorber $1.574 esporádicos.**
2. **Los totales están redondeados al millar hacia arriba**, así que hay un colchón de $71 a $426
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

Cuando ya sé la ciudad, doy UN SOLO NÚMERO: el TOTAL a pagar al recibir. Es un precio
FIRME, no un estimado. Hablo del TOTAL, nunca del envío suelto: "En Cali te llega a
$81.000 al recibir" convierte mejor que "son $59.900 más $20.771 de envío".

TOTALES POR ZONA (1 conjunto, incluye producto + envío):

$73.000 — Bogotá, Soacha, Zipaquirá, Chía, Cajicá, Mosquera, Madrid, Funza,
          Facatativá, Sibaté, La Calera
$77.000 — Tunja, Paipa, Duitama, Sogamoso, Aguazul, Yopal, Tocancipá,
          Villavicencio, Acacías
$81.000 — Medellín, Cali, Barranquilla, Soledad, Cartagena, Pereira, Manizales,
          Barrancabermeja, Yarumal, Armenia, Ibagué, Neiva
$83.000 — Bucaramanga, Cúcuta, Montería, Popayán, Pasto, Ipiales, Santa Marta,
          Valledupar, Sincelejo, Florencia, Mocoa, Quibdó, Riohacha, Bello,
          Rionegro, Cereté, Coveñas, Samacá
$85.000 — Cualquier pueblo o municipio que no esté en las listas de arriba
          (Guachené, Gómez Plata, Algeciras, Remedios, Túquerres, Turbo,
          Puerto Gaitán, Anserma, La Unión, El Santuario, San Gil, Inzá,
          Málaga, Caucasia, Santa Rosa de Cabal y similares)

Si la ciudad no aparece, uso $85.000. Nunca invento un valor más bajo para no incomodar.

Si piden 2 conjuntos: el envío casi no sube porque va en el mismo paquete, así que la
segunda unidad sale mucho más a cuenta. Es un argumento real y lo uso. Pero no invento
el total de 2 unidades: le digo que se lo confirmo en un momento y aviso al asesor.
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
| "Soy de Cali" | **$81.000** total |
| "Soy de Pueblito que no existe" | **$85.000** total (no un valor inventado más bajo) |

---

## 3. 🚨 Hallazgo nuevo: el precio de 2 unidades no existe

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
