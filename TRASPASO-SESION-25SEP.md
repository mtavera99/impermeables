# 🔄 Traspaso de sesión — 25 de septiembre de 2026

> Documento para retomar sin perder contexto. Lo urgente arriba.
> **16 PRs mergeados, del #146 al #161.**

---

## ⏱️ SI TENÉS 2 MINUTOS, LEÉ ESTO

**El número está sano:** `quality_rating: GREEN`, conectado, verificado, el webhook recibe.
Las **6 plantillas están aprobadas** y en `es_CO`, que es el idioma correcto.

**Lo que se hizo esta sesión fue, casi todo, destapar cosas que fallaban en silencio.**
Ninguna de las que más costó daba error: el panel decía "OK", el envío devolvía id, la pantalla se
veía bien. Lo que fallaba no avisaba.

**Las dos lecciones de la sesión:**

> 🔑 **Un "cero" medido demasiado pronto no es un cero.** Apagué el toque de 44h por "432 envíos y
> cero ventas". Ocho horas después eran 515 envíos y **2 ventas**: las conversiones tardías todavía
> no habían cerrado. Hubo que prenderlo de vuelta.

> 🔑 **Una prueba escrita con el mismo supuesto que el código no prueba nada.** El extractor no leía
> "franja roja" porque yo lo escribí buscando "rojo"+sufijo, y la prueba usaba *"franja rojo"*, que
> nadie escribe. Lo cazó una verificación de punta a punta contra `main`, no el test.

---

## 🔴 PENDIENTES DEL DUEÑO — en orden

| # | qué | por qué / cómo |
|---|---|---|
| 1 | **ROTAR `PANEL_TOKEN`** | 🔴 **Sigue pendiente desde el 23-sep y hoy se expuso otra vez** en los pantallazos (`biker_panel_1023979300_2026`). Con esa clave se ven nombres, direcciones y teléfonos de TODOS los clientes, y se les puede escribir como BikerPro. Hay que cambiarlo **en Render Y en el secreto `BOT_VERIFY_TOKEN` de GitHub al mismo tiempo**: si se cambia solo uno, el cierre diario y `/mirar-el-panel` dejan de funcionar |
| 2 | **Aprobar el nombre para mostrar** | `name_status: NON_EXISTS` → **los clientes ven el número pelado, no "BikerPro"**. Un contraentrega pidiendo dirección desde un número sin nombre se ve como una estafa, y "¿es estafa?" es el **2,5%** de lo que pregunta la gente. WhatsApp Manager → Números → Nombre para mostrar. ⚠️ El nombre cargado dice **"Biker"**, no "BikerPro" |
| 3 | **El corredor de Girardot** | **21 municipios sin tarifa**, todos cayendo a banda E (la más cara): Girardot, Melgar, Fusagasugá, Espinal, Ricaurte, Agua de Dios, Tocaima, Silvania, Flandes, Carmen de Apicalá, Icononzo, La Mesa, Anapoima, Apulo, Villeta, Guaduas, Chinauta, Arbeláez, Pandi, Viotá, Tocaima. Falta **el envío de 2 unidades** de cada uno; con ese dato se cargan como se cargó Nilo |
| 4 | **Por qué no llegan los resúmenes del cierre** | Sigue sin explicación. `cierre_del_dia` está **aprobada y en Utilidad**, así que la hipótesis del marketing era equivocada. El registro de fallos ya está en disco (#149): abrir `/plantillas?token=` **después de un cierre** y leer `fallosDeEntrega` |
| 5 | **Anular el pedido de Lorenzo** (`573116093103`) | Venía del 24-sep. Verificar si se hizo |

### ✅ Resuelto por el dueño en esta sesión
- **Meta recargado** (saldo pasó de $92.936 a $184.397)
- **`SEGUIMIENTO_44H`**: apagado y **vuelto a prender** cuando los datos cambiaron
- **Confirmó la redacción del envío**: se quedó *"y aparte el envío según tu ciudad"*
- **Confirmó que los resúmenes del cierre NO le llegaban** (dato clave: hasta entonces se creía que sí)

---

## 📊 NÚMEROS MEDIDOS — NO VOLVER A MEDIRLOS

### El cierre del 24-sep (el primer día completo con el bot arreglado)
| | hoy | ayer |
|---|---|---|
| **Pedidos** | **18** | 5 |
| Recaudo | **$1.607.000** | — |
| Conversaciones | 205 | 173 |
| **Cierre** | **8,8%** | ~2,9% |
| **Share 2 unidades** | **28%** | 0% (roto por mi cambio del 22-sep) |

🔑 **Los 23 PRs del 23-24 funcionaron: el cierre se triplicó** y el share de 2 unidades volvió a
superar el histórico de 26,8%.

### 🎯 EL SEGUIMIENTO POR PASO — la medición que faltaba desde el 24-sep

| toque | enviados | respondieron | **compraron** | tasa |
|---|---|---|---|---|
| **1º — 2h** | 383 | 51 (13,3%) | **8** | **2,1%** |
| 2º — 20h | 450 | 33 (7,3%) | **1** | 0,2% |
| 3º — 44h (plantilla) | 515 | 19 (3,7%) | **2** | 0,4% |

- **El primer toque es el que vende**, 5× mejor que los otros dos
- **Pero los tardíos NO son cero**: juntos dieron 3 ventas
- 🔑 **De 42 compras en ese grupo, 11 vinieron de un seguimiento** — una de cada cuatro
- `mensajesEnviados: 1.218` · `noMolestar: 19` (2,9%) · `total: 661` conversaciones

⚠️ **Los números cruzan dos cadencias.** Antes del 24-sep era 20h/44h/68h; ahora 2h/20h/44h. Los
pasos 2 y 3 significan horas distintas según la época. El ORDEN es confiable, las horas no.

⚠️ **Y la atribución favorece a los toques tardíos** (la venta se adjudica al último paso enviado),
así que el 2,1% del primer toque está subestimado, no inflado.

### El estado del número (de `/setup-waba`)
`quality_rating: GREEN` · `status: CONNECTED` · `code_verification_status: VERIFIED` ·
`platform_type: CLOUD_API` · webhook recibiendo · 🔴 `name_status: NON_EXISTS`

### Las 6 plantillas (de WhatsApp Manager, verificado por el dueño)
Todas **aprobadas** y en **Spanish (COL)**:
`novedad_ausente` · `novedad_direccion` · `novedad_oficina` · `cierre_del_dia` · `guia_de_envio`
(las 5 en **Utilidad**) · `seguimiento_impermeable` (en **Marketing**)

🔑 **`seguimiento_impermeable` es la única de Marketing**, y es la del toque de 44h: es la que
consume el tope de frecuencia de Meta y la que desgasta la calificación del número.

---

## 💰 PRECIOS — lo que cambió

**Nilo y Tolemaida entran a banda B** con flete medido de $36.000 (confirmado por el dueño):

| | antes | ahora |
|---|---|---|
| combo 2 uds | $155.000 | **$146.000** |
| envío que ve el cliente | $45.000 | **$36.000** (el real, verificable) |
| margen | $53.000 | **$44.000** |
| rescate para cerrar | $145.000 | **$132.000** |
| 1 unidad | $85.000 | **$78.000** |

**De dónde salió:** un cliente del Fuerte Militar de Tolemaida recibió **$158.000** con $48.000 de
envío, cuando el real es $36.000. El dueño: *"ese está muy caro y desfasado, ten cuidado con eso
para que los clientes no se espanten"*.

🔑 **El envío es el ÚNICO número que el cliente puede verificar por fuera.** Inflarlo es el error que
más espanta, y ya había pasado con Montería.

⚠️ **El bot dijo $158.000 cuando el tarifario decía $155.000**: se salió del tarifario por su cuenta.
Eso sigue sin candado — ver "lo que quedó abierto".

---

## 🛠️ QUÉ SE CONSTRUYÓ (16 PRs)

### Atención humana y ventas a mano
| PR | qué |
|---|---|
| **#147** | Los chats respondidos dejan de aparecer como pendientes. `paused` valía +100 y nunca se apagaba: **el premio por atender un chat era que quedara clavado arriba para siempre** |
| **#148** | Un punto que se prende al toque, sin recargar, en una sola lista. La primera versión recargaba el panel entero y movía el chat a otro bloque |
| **#151** | **Las ventas que se cierran a mano no se registraban en NINGUNA parte.** El webhook hace `continue` antes de la IA cuando el chat está pausado, y el pedido lo emite la IA → todo chat escalado perdía la venta. CPA, cierre y share venían subestimados |
| #152 | El botón de registrar venta existía pero al 83% de la página, y no salía si el cliente ya había comprado antes |
| **#153** | Botón que lee el chat y llena los cajones. Dos capas: reglas (gratis) + IA. **El celular y el total los pone SIEMPRE la heurística**: la IA aporta texto, no plata |

### Novedades
| PR | qué |
|---|---|
| **#156** | El **error 400**: el plan vivía en memoria y un despliegue lo borraba entre "Revisar" y "Enviar" |
| **#157** | Cargar el **Excel de 99 Envíos** (sin dependencia nueva: un .xlsx es un ZIP y Node trae `zlib`). Y **"No se localiza dirección del destinatario" —el texto literal de 99 Envíos— no estaba reconocido**: esas novedades no se avisaban |
| **#160** | Dos razones por las que solo salió 1 de 3: los datos de la oficina solo se aplicaban al Revisar, y **dos guías no cruzaban porque sus números eran de otra columna** (8 dígitos vs 12). Ahora se rescata por nombre + ciudad, marcado como `probable` |

### Panel
| PR | qué |
|---|---|
| **#158** | Barra de atajos pegada arriba, despachados plegados, botón de volver arriba. Los chats estaban al **79%** de la página, después de 38 despachados |
| #159 | Los números del día, primero |

### Precios y guion
| PR | qué |
|---|---|
| **#154** | Tolemaida/Nilo. Y un bug que ya afectaba a las que sí estaban: el flete medido se buscaba por clave **exacta**, así que "Cartagena Barrio Olaya" no encontraba el de CARTAGENA |
| **#155** | **"más el envío" se entiende al revés.** En español "más" puede ser "+ el costo" o "y además" = incluido. Ahora: *"y aparte el envío según tu ciudad. Pagas todo junto"* |
| **#150 + #161** | `SEGUIMIENTO_44H=0` apaga el toque de 44h. Y el `??` sobre `||`: con `||` la variable vacía caía de vuelta en el default |

### Diagnóstico
| PR | qué |
|---|---|
| **#146** | Ventana de lectura al panel desde un Action de GitHub (el entorno de Kiro no tiene salida a internet) |
| **#149** | `/plantillas`: le pregunta a Meta el estado real de las 6 y lo compara contra lo que el bot manda. Y **los fallos de entrega van a disco**: el motivo llegaba por webhook pero se guardaba en memoria y el reinicio lo borraba |

---

## 🪤 TRAMPAS NUEVAS — no volver a caer

1. 🔴 **Un commit pusheado DESPUÉS de que el PR se mergeó queda huérfano.** Pasó con el interruptor
   del toque de 44h: se mergeó 08:42, se pusheó 08:46, **y nunca entró**. Si el PR ya está cerrado,
   va rama nueva y PR nuevo
2. 🔴 **Una prueba escrita con el mismo supuesto que el código no prueba nada.** El extractor buscaba
   "rojo"+sufijo y la prueba usaba *"franja rojo"*. Lo que lleva color es la **franja**, femenina:
   la gente escribe "franja roja". Lo cazó una verificación contra `main`, no el test
3. 🔴 **Un "cero" medido demasiado pronto no es un cero.** Las conversiones tardías tardan horas
4. **Estado que importa, en memoria, muere en el reinicio.** Pasó tres veces: el log de eventos
   (trampa #6), los planes de novedades (el 400) y los fallos de entrega. Render reinicia por
   cualquier cosa, y un día de despliegues son muchos reinicios
5. **`??` y no `||` para variables de entorno** que se puedan querer vaciar. Tercera vez
   (`BODEGA_DIRECCION`, `SEGUIMIENTO_PLANTILLA_2`, `leerPlan(ttlMs)`)
6. **El script del panel vive dentro de un template literal.** Ni comillas invertidas ni
   dólar-llave. **Rompió el panel incluso dentro del comentario que advertía sobre la trampa.** Y
   las barras invertidas de una expresión regular van DOBLES: con una sola llegan convertidas en
   letras y la expresión **parsea igual pero no coincide con nada** — falla en silencio
7. **`Date.now()` colisiona en el mismo milisegundo.** `test-pendientes-despachados` fallaba 3 de 8
   corridas por pegar la guía por `fecha`: producción ya usaba `id`, la prueba se había quedado
   atrás. **Una prueba que falla al azar se empieza a ignorar, y deja de proteger lo que vino a
   cuidar**
8. **`fletes.bandaDe` encuentra la ciudad DENTRO de una cadena más larga** (está hecho para "BOGOTA
   USAQUEN CODITO"). Al extraer la ciudad hay que probar ventanas de la **más corta** a la más
   larga, o el campo queda con "estoy en Monteria" adentro
9. **La columna de guía del Excel de 99 Envíos no siempre trae la guía.** Aparecieron números de 8
   dígitos donde las guías reales tienen 12

---

## 🛠️ ENTORNO — leer antes de trabajar

```bash
export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH"
unset NODE_OPTIONS          # 🔴 el entorno inyecta un preload que no existe:
                            #    sin esto las 32 baterías fallan todas, en falso
export TZ=America/Bogota    # el sandbox corre en UTC
cd bot

# Correr TODAS las baterías (son 32) y ver solo las que fallan
for f in test-*.js; do node "$f" >/dev/null 2>&1 || echo "FALLO $f"; done

# El tamaño del guion — TECHO DURO: 9.000 tokens
node -e 'console.log(Math.round(require("./src/prompt").buildSystemPrompt().length/4))'
```

⚠️ **El guion está en 8.989 de 9.000. Quedan 11 tokens.** Antes de agregar texto hay que sacar otro.

🔴 **EL ENTORNO DE KIRO NO TIENE SALIDA A INTERNET.** El proxy devuelve 403 para el bot, para Meta,
para npm y hasta para `example.com`. Consecuencias:
- **No se puede instalar nada.** `dotenv`, `express`, `pdf-lib` y `pdfjs-dist` no están, así que **5
  baterías no corren** (`test-guias`, `test-panel-movil`, `test-token-del-panel`,
  `test-botones-y-plantillas`, `test-clientes-con-username`) y **el servidor no se puede arrancar**
- **27 de 32 verdes es el estado sano.** Si fallan esas 5, no es una regresión
- **No se puede agregar una dependencia** sin subirla sin haberla ejecutado nunca. Por eso el lector
  de `.xlsx` se escribió a mano sobre `zlib`
- Para ver el panel: el workflow **`Mirar el panel`** (Actions → Run workflow), que corre en GitHub
  y sí tiene internet. La búsqueda web del agente funciona; abrir una URL puntual, no

### Rutas del panel
| ruta | para qué |
|---|---|
| `/panel?token=` | el tablero. Atajos arriba, despachados plegados |
| `/chat?token=&id=57...` | la conversación real, **y el cajón de registrar la venta a mano** |
| `/novedades?token=` | avisar novedades, **cargando el Excel de 99 Envíos** |
| `/plantillas?token=` | 🆕 estado real de las 6 plantillas + **los fallos de entrega** |
| `/seguimiento?token=` | cadencia, el interruptor de 44h y **las compras por paso** |
| `/setup-waba?token=` | conexión, **calidad del número** y `name_status` |
| `/eventos?token=` | lo último del webhook (en memoria: se borra al reiniciar) |
| `/auditoria?token=` | cuadrar conversaciones vs pedidos vs ventas |

---

## 🎯 QUÉ MEDIR EN LA SESIÓN SIGUIENTE

1. **El escalón "llegaron a los datos"** con un día completo. Sigue siendo el único roto del embudo
   (30,3% vs 49,1% del agente viejo) y el #125 fue para arreglarlo
2. **El toque de 44h con la cadencia NUEVA, limpio.** Los números actuales cruzan dos cadencias
3. **Si Tolemaida a $146.000 cierra**, y si vale cargar el resto del corredor
4. **El primer mensaje después del cambio del envío** — mirar "Recibieron precio" en el embudo. Es
   el mensaje de más tráfico y un cambio ahí ya costó el share de 2 unidades una vez (#118)
5. **Cuántas ventas a mano se registran.** Si son muchas, el cierre del bot venía muy subestimado
6. **La calidad del número, semanal.** Si deja de estar GREEN, apagar el toque de 44h ese día

## ❓ LO QUE QUEDÓ ABIERTO

- **Por qué no llegan los resúmenes del cierre.** Aprobada, en Utilidad, Meta devuelve id. El
  registro de fallos ya está en disco: falta leerlo después de un cierre
- 🔴 **El bot se sale del tarifario.** Dijo $158.000 donde la tabla decía $155.000, y $73.000 en La
  Vega donde el piso era $85.000. **No hay candado**: el PR #145 lo proponía y el dueño lo cerró
  porque la flexibilidad de precio le vende más — y tenía razón en eso. **Lo que queda sin cubrir es
  el caso donde el total baja del COSTO** (El Charco: $59.900 contra un flete de $55.563)
- **Los planes de GUÍAS siguen en memoria**: tienen el mismo bug del 400 y se arreglan distinto
  (guardando el PDF una vez, no las páginas en base64)
- **"Zona de difícil acceso" y "Cliente no tiene dinero"** no se reconocen como novedad, a propósito:
  necesitan decidir qué mensaje mandar
- **El upsell del colmena sigue sin medir** · **nunca se midió si la lluvia mueve las ventas**

---

## 📌 CÓMO TRABAJAR CON EL DUEÑO

- **Opera desde el celular y no es técnico.** Explicaciones cortas, sin jerga. Lo que quiera ver va
  en el chat o en un PR
- **Mergea muy rápido.** → un PR por cambio, abierto de inmediato. Y **verificar el estado del PR
  antes de pushear**: hoy un commit quedó huérfano por llegar 5 minutos tarde
- 🔑 **Tiene muy buen ojo para lo que no cuadra, y casi siempre tiene razón.** Esta sesión:
  - el precio de Tolemaida ("está muy caro y desfasado") → eran 22 municipios sin tarifa
  - el "+ envío" ("la gente entiende que ya está incluido") → ambigüedad real de "más" en español
  - "no me sale ningún botón" → estaba, al 83% de la página y oculto si el cliente ya había comprado
  - "el sistema para saber que ya se respondieron está muy obsoleto" → recargaba el panel entero
- **Cuando contradice un análisis, primero verificar en los archivos.** Y cuando los datos cambian,
  **rectificar rápido y decirlo**: hoy hubo que prender de vuelta lo que se había apagado
- **Decirle lo que cuestan las decisiones, en pesos, sin discutírselas**
- **Después de mergear, VERIFICAR contra `main`.** Los merges salen limpios y el resultado puede
  estar roto: así se encontró el commit huérfano y el color en femenino
