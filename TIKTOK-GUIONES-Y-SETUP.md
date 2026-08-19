# TikTok Ads — setup y guiones de los 3 creativos

**Fecha:** 2026-08-19 · Complementa `PLAN-ESCALAMIENTO-Y-TIKTOK.md`

## 🎯 La ventaja que tiene TikTok sobre Meta: arranca limpio

En Meta hay 6 semanas de aprendizaje que hay que proteger, así que muchos arreglos no se pueden
aplicar sin romper lo que funciona. **En TikTok no hay nada que proteger.** Se puede montar bien
desde el día uno, con todo lo aprendido:

| Lección aprendida en Meta | Cómo se aplica en TikTok desde el día 1 |
|---|---|
| El flujo de **CIUDAD PRIMERO** subió el cierre (PR #19) | el mensaje prerrellenado ya pide la ciudad |
| **57,8% de conversaciones vacías** (sección 0-K) | el mensaje con fricción filtra los toques sin intención |
| El guion promete **"envío $15.000-20.000"** y el real llega a $35.860 (sección 0-J) | acá **no se promete ningún rango** |
| **No se puede atribuir por creativo** (pendiente #39) | mensaje distinto por canal **y** por anuncio |
| El **77% pregunta por color** y el **64% por talla** | los videos **muestran** color y talla, no los describen |

---

# PARTE A — SETUP

## A1. Antes de crear la campaña

1. **Cuenta de TikTok Ads Manager** (business.tiktok.com) + medio de pago verificado.
2. **Verificar cómo conecta WhatsApp.** El objetivo de *mensajería instantánea* soporta WhatsApp
   ([doc oficial](https://ads.tiktok.com/help/article/how-to-set-up-tiktok-instant-messaging-ads?lang=es)).
   ⚠️ **Confirmar en el panel qué pide para vincular el número.**
   - **Si lo permite con el número de la app** → listo, es el camino ideal.
   - **Si exige la Cloud API** (que sigue trabada en verificación) → **plan B: campaña de Tráfico a un
     enlace `wa.me`** con mensaje prerrellenado. Funciona, pero la señal de optimización es más débil
     porque TikTok no ve la conversación. **Sirve para arrancar; no es el destino final.**

## A2. Estructura

```
Campaña:   BikerPro · TikTok · Prospección Motociclistas
Objetivo:  Mensajes (mensajería instantánea) → WhatsApp
Ubicación: Colombia, nacional
Idioma:    Español

⚠️ UBICACIONES — DESACTIVAR MANUALMENTE:
   ✗ Pangle (red de terceros, tráfico de baja calidad)
   ✗ Audiencia global / apps asociadas
   ✓ Solo feed de TikTok
   >>> Es el equivalente al problema de ubicaciones que en Meta todavía no
       hemos podido descartar. Acá se evita desde el principio.

Grupo A — "Amplio"
   Edad 18-45 · todos los géneros · SIN intereses
   Presupuesto: $50.000 COP/día
   (en TikTok el público amplio suele rendir mejor: el algoritmo encuentra
    al comprador por el creativo, no por el filtro)

Grupo B — "Intereses moto"
   Intereses: motocicletas, automotriz, deportes de motor, delivery/mensajería
   Presupuesto: $50.000 COP/día

Los MISMOS 3 creativos en los dos grupos → así la única variable es la audiencia.
```

⚠️ **Verificar el mínimo diario que exija el panel.** Si obliga a más de $50.000 por grupo,
arrancar con **un solo grupo (el Amplio)** antes que bajar de ese mínimo.

## A3. El mensaje prerrellenado — distinto por anuncio

Esto resuelve la atribución **y** filtra los toques vacíos:

| Anuncio | Mensaje prerrellenado |
|---|---|
| Video 1 (agua) | `Hola, vi la prueba del agua en TikTok 🏍️ Mi ciudad es:` |
| Video 2 (lluvia) | `Hola, vi el impermeable en TikTok 🌧️ Mi ciudad es:` |
| Video 3 (clientes) | `Hola, vi los comentarios en TikTok 🏍️ Mi ciudad es:` |

**Los tres terminan en "Mi ciudad es:"** → obliga a escribir algo y arranca por la ciudad, que es
la variable que más subió el cierre en Meta.

---

# PARTE B — LOS 3 GUIONES

## Reglas de producción (valen para los tres)

| | |
|---|---|
| Formato | vertical 9:16, 1080×1920 |
| Duración | **21-34 segundos** |
| Grabado con | **celular. Que NO parezca anuncio** — la producción pulida rinde peor |
| Sonido | **SÍ**, voz en off propia. Al revés de Meta |
| Primeros 2 seg | **deciden todo.** Sin logo, sin "hola", sin intro |
| Zonas seguras | dejar libre el **20% inferior** y el **15% derecho** (ahí va la interfaz de TikTok). ⚠️ No repetir el error de la sección 6-B con el botón tapado |

---

## 🎬 VIDEO 1 — "El agua rueda" *(el ángulo ganador de Meta: $484/conv)*

**Qué necesitás:** la chaqueta, una botella o manguera, luz de día, un ayudante.

| Seg | Imagen | Voz en off | Texto en pantalla |
|---|---|---|---|
| **0-2** | **PRIMER PLANO EXTREMO** de la tela. Cae un chorro de agua y las gotas **ruedan** sin absorberse. Solo el sonido del agua | *(nada — que se escuche el agua)* | **EL AGUA NO PASA** |
| 2-5 | Sigue el primer plano, se ve la costura | "Esto es costura **termosellada**." | *costura termosellada* |
| 5-9 | Cámara se abre: es una chaqueta. Le echan más agua encima | "No es tela impermeable con costuras cosidas que se filtran." | |
| 9-13 | Dedo señalando la costura sellada, muy cerca | "Acá el agua no tiene por dónde entrar." | |
| 13-18 | Corte: las **4 piezas** sobre el piso — chaqueta, pantalón, zapatones, bolsa | "Son cuatro piezas: chaqueta, pantalón, zapatones y bolsa." | **4 PIEZAS** |
| 18-23 | Paneo rápido por los colores de franja disponibles | "Franja reflectiva en negro, rojo, verde o azul. De talla S a 3XL." | *S — 3XL* |
| 23-28 | Motociclista con el kit puesto, arrancando la moto | "Cincuenta y nueve mil novecientos. **Y lo pagás cuando lo recibís.**" | **$59.900** · **PAGAS AL RECIBIR** |
| 28-31 | Plano fijo, texto grande | "Escribime tu ciudad y te digo el envío." | **ESCRÍBEME TU CIUDAD** |

**Por qué así:** el ángulo del agua ya es el más barato de tu cuenta en Meta ($484/conv). Los segundos
13-23 **muestran** las 4 piezas, los colores y las tallas — que es lo que el 77% y el 64% de la gente
pregunta en el chat. **Cada pregunta que responde el video es una que no consume la conversación.**

---

## 🎬 VIDEO 2 — "POV bajo lluvia"

**Qué necesitás:** un día de lluvia (o una manguera), la moto, el celular montado o en mano.

| Seg | Imagen | Voz en off | Texto en pantalla |
|---|---|---|---|
| **0-2** | **POV desde la moto**: lluvia pegando en el visor, gotas corriendo. Sonido real de lluvia y motor | *(nada)* | **6 A.M. Y LLOVIENDO** |
| 2-6 | Sigue el POV andando bajo el agua | "Si trabajás en moto, esto no es opcional." | |
| 6-11 | Se baja, se toca la ropa **por dentro del kit**: seca | "Llevo cuarenta minutos bajo el agua." | |
| 11-15 | Muestra la camisa de abajo, seca, mirando a cámara | "Y estoy **seco**." | **SECO POR DENTRO** |
| 15-20 | Se quita el kit y lo guarda en su bolsa, cabe en el baúl | "Se guarda en su bolsa. No ocupa nada." | |
| 20-26 | Detalle de la **franja reflectiva** de noche, con un carro pasando | "Y de noche te ven. Cinco franjas reflectivas." | **TE VEN DE NOCHE** |
| 26-31 | Plano frontal con el kit puesto | "Cincuenta y nueve mil novecientos, pagás al recibir. Escribime tu ciudad." | **$59.900 · PAGAS AL RECIBIR** |

**Por qué así:** es el formato más nativo de TikTok y el de mayor identificación con tu comprador. Los
segundos 20-26 rescatan el ángulo de la **franja reflectiva**, que en Meta fue el segundo mejor
($516/conv) y nunca tuvo entrega real.

---

## 🎬 VIDEO 3 — "Lo que dicen los clientes" *(el mejor CTR de tu cuenta: 2,53%)*

**Qué necesitás:** capturas de conversaciones reales (**tapá nombres y teléfonos**) y fotos que te
hayan mandado clientes.

| Seg | Imagen | Voz en off | Texto en pantalla |
|---|---|---|---|
| **0-2** | **Grabación de pantalla** haciendo scroll rápido por mensajes de clientes reales | *(nada — sonido de notificaciones)* | **+160 MOTOCICLISTAS** |
| 2-6 | Se detiene en un mensaje concreto de alguien agradeciendo | "Ciento sesenta personas ya lo tienen." | |
| 6-11 | Fotos reales de clientes con el kit puesto, una tras otra | "Domiciliarios, mensajeros, gente que trabaja en moto todos los días." | |
| 11-16 | Se detiene en una foto bajo lluvia real | "Y esto no es publicidad, son ellos." | |
| 16-21 | Corte a la demo del agua, 3 segundos, rápido | "Costura termosellada. El agua rueda, no pasa." | **EL AGUA NO PASA** |
| 21-26 | Las 4 piezas + colores | "Cuatro piezas, franja reflectiva, de S a 3XL." | **4 PIEZAS · S-3XL** |
| 26-31 | Plano frontal | "Cincuenta y nueve mil novecientos y pagás al recibir. Escribime tu ciudad." | **$59.900 · PAGAS AL RECIBIR** |

**Por qué así:** en Meta este ángulo tuvo **el mejor CTR (2,53%) y el CPC más bajo ($197) de toda la
cuenta**, pero nunca recibió entrega suficiente para probarse. **En TikTok la prueba social funciona
todavía mejor que en Meta**, y vos tenés el activo (160 clientes) sin explotar.

⚠️ **Tapá nombres, teléfonos y direcciones** en las capturas.

---

# PARTE C — TEXTOS DEL ANUNCIO

**Texto principal** (probar los tres, uno por anuncio):

1. `Cuatro piezas. Costura termosellada. El agua rueda, no pasa. Pagas al recibir 🏍️`
2. `Si trabajas en moto, esto no es opcional. $59.900 y pagas cuando te llega 🌧️`
3. `+160 motociclistas ya lo tienen. Escríbeme tu ciudad y te digo el envío 🏍️`

**Botón (CTA):** `Enviar mensaje`

⚠️ **NO poner el rango del envío en el texto del anuncio.** Es el error de la sección 0-J: prometer
"$15.000-20.000" cuando el flete real llega a $35.860 genera la deuda que después hay que absorber, y
alimenta el rechazo en la entrega. **Se cotiza en el chat, con la ciudad ya en la mano.**

---

# PARTE D — CRITERIOS, FIJADOS ANTES DE PRENDER

| | |
|---|---|
| Presupuesto de prueba | **$100.000 COP/día × 10 días = $1.000.000** |
| Contra la utilidad actual | ~6,5 días de utilidad por un canal completo |
| Volumen mínimo para leer | **≥50 conversaciones** |

**Referencias de Meta:** costo/conversación **$473-708** según conjunto · CPA entregada **$5.941-8.892**
· equilibrio **$23.674**

| CPA por venta cerrada | Veredicto | Acción |
|---|---|---|
| ≤ $8.000 | 🏆 empata o gana a Meta | escalar a $200.000/día |
| $8.000 – $12.000 | ✅ rentable | mantener, optimizar creativos |
| $12.000 – $18.000 | 🟡 caro pero rentable | 2ª ronda de creativos |
| > $18.000 | 🔴 no funciona así | apagar y probar **formulario instantáneo** |

**Corte:** si con **$600.000 gastados y ≥30 conversaciones** el CPA supera **$18.000**, parar.

⚠️ **Los primeros 2-3 días se van a ver caros.** **No apagar antes de 5 días o 30 conversaciones**,
lo que llegue después. Es el mismo error del día 1 que este proyecto ya documentó cinco veces.

## Qué medir aparte desde el día 1

1. **Tasa de conversaciones vacías de TikTok.** Línea base de Meta: 57,8%.
   **Si TikTok supera el 70% → cambiar al formulario instantáneo**, que pide ciudad, teléfono, color y
   talla de una vez y colapsa la parte más costosa del embudo.
2. **Cierre de los leads de TikTok vs los de Meta.** Se distinguen por el mensaje prerrellenado.
3. **Qué video trae ventas**, no solo conversaciones — por eso cada uno lleva mensaje distinto.

---

# ORDEN

| # | Acción | Cuándo |
|---|---|---|
| 1 | Crear cuenta en TikTok Ads Manager + medio de pago | hoy |
| 2 | **Verificar cómo vincula WhatsApp** (si pide Cloud API → plan B con `wa.me`) | hoy |
| 3 | Grabar los 3 videos | esta semana |
| 4 | Montar campaña con ubicaciones limpias y los 3 mensajes distintos | cuando estén los videos |
| 5 | Prender con $100.000/día | — |
| 6 | Contar vacías de TikTok desde el día 1 | diario |

📌 **Los mismos 3 videos sirven para la próxima ronda de creativos de Meta** (con las zonas seguras
ajustadas: las de Meta y las de TikTok son distintas). Un rodaje, dos plataformas.
