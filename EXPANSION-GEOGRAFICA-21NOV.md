# 🗺 Expansión geográfica sin pisar los conjuntos actuales — 21-nov-2026

> **Fuente:** Marketing API en vivo, cruzada con los pedidos del bot por ciudad de entrega. Ventana de **30 días
> cerrados** (22-oct → 20-nov): $12,9 M de gasto y 1.166 pedidos, de los cuales 1.057 se pudieron ubicar por
> departamento. El cálculo lo hace la sección nueva "🗺 Por departamento" de `CPA-POR-PRODUCTO.md`
> (`analisis/geo_por_departamento.py`).
> **Solo lectura (regla 4-B):** Kiro propone y Santiago ejecuta.

---

## 0. Cuatro datos del brief que hay que corregir antes de decidir

| el brief dice | lo que muestra la cuenta |
|---|---|
| "Q58 a $303-416 por chat, CPA récord" | Es **ACOMPAÑANTE - Copia** (Domiciliarios - Expancion - Q58). Trae los mensajes más baratos de la cuenta, pero en 14 días **cerró 1,0%**: **$29.577 por pedido, 97% de su equilibrio**. Es el anuncio que **no** hay que duplicar (0-BQ). El Q58 que vende es **SON DOS** (cierre 8,2%) |
| "Clúster 1: hombres 20-55" | El targeting real es **20-65, todos los géneros**, con Advantage+ audiencia encendido. Con Advantage+, los intereses (Rappi, Uber Eats…) son **sugerencias**: Meta puede salirse de ellos. Por eso los intereses no separan subastas, y la **ubicación sí** |
| "costos por conversación extremadamente rentables" | La rentabilidad se mide por **pedido**, no por chat (regla 37). Hoy: V10 $8.292/pedido (3,4× de colchón) · Q58 $11.781 (2,6×) · radios $19.136 (2,1×) · impermeable $10.212 (1,9×) |
| "impermeable combos $89.000" | El bot cobra **$59.900 + envío**, y **2 por $110.000 + envío** (≈$133.000-155.000 con envío). ❓ ¿Hay un combo de $89.000 que el bot no conoce? |

---

## 1. Lo que encontré: ya se venden 10 pedidos por día en zonas donde no se pauta

Meta reporta en qué departamento se mostró cada anuncio. Cruzado con la ciudad de entrega de cada pedido:

| zona | gasto 30 d | % del gasto | pedidos 30 d | pedidos/día | de ellos sin anuncio |
|---|---|---|---|---|---|
| Bogotá + Antioquia (Medellín +40 km) | $9.456.000 | 73% | 350 | 11,7 | 26 |
| 8 departamentos de "Expancion" | $3.068.000 | 24% | 316 | 10,5 | 16 |
| Cundinamarca (lo que alcanza el radio de Bogotá) | $382.000 | 3% | 71 | 2,4 | 4 |
| 🌴 **Costa Caribe** (Atlántico, Bolívar, Magdalena, Cesar, Córdoba, Sucre, La Guajira) | **$747** | 0% | **169** | **5,6** | 13 |
| 🐄 **Centro-oriente y Llanos** (Boyacá, Meta, Casanare, Arauca) | **$1.037** | 0% | **75** | **2,5** | 6 |
| ⛰️ **Sur** (Cauca, Nariño, Putumayo, Caquetá) | **$240** | 0% | **59** | **2,0** | 0 |
| resto (Chocó, Guaviare, Vichada, Amazonas) | $15 | 0% | 17 | 0,6 | 0 |

🔑 **~30% de los pedidos ubicados se entregan en departamentos donde la cuenta no gasta nada**, y casi todos traen el `anuncio_id`
de un conjunto actual. Gente que vio el anuncio en Bogotá o Medellín (o que está "de paso" según Meta) está pidiendo
para la Costa, los Llanos y el sur. La demanda en esas zonas ya está probada sin pagar por ella.

⚠️ **Dos consecuencias:**
1. **El CPA "por departamento" de Bogotá ($37.000) y Antioquia ($22.000) no sirve para juzgarlos.** Esos conjuntos venden
   a todo el país. Siguen juzgándose por anuncio, como en 0-BQ.
2. **Al abrir una zona nueva, parte de esos pedidos se va a mover** de los conjuntos viejos al nuevo. El conjunto nuevo
   se juzga por cuántos pedidos **suma la zona entera**, no por los que se atribuye él mismo (sección 4).

### El solapamiento que YA existe (para no agrandarlo)

- **9 conjuntos** apuntan a Bogotá +40 km y Medellín +40 km con los mismos intereses: los 5 Domiciliarios, VIDEO INTER,
  VIDEO Q58, TEST y **RADIO - Seguridad** (que usa los intereses de Rappi y Uber Eats). Además, Motorizados (3) y RADIO -
  Moteros apuntan a Bogotá D.C. Meta llama a Bogotá **"Distrito Especial"** en el desglose.
- ⚠️ Los Motorizados apuntan solo a Bogotá D.C. y aun así **17-35% de su gasto aparece en Antioquia**. Hay que revisarlo
  en el Administrador. La API devolvió el targeting de 10 de los 16 conjuntos encendidos, así que de los otros 6 se ve
  dónde gastan pero no su configuración.
- **Cómo compite Meta contra uno mismo:** cuando varios conjuntos de la misma cuenta pueden ganar la misma impresión,
  Meta entra a la subasta con **uno solo**, el de mayor valor. Los otros no pujan más caro: se quedan sin entregar. Eso
  explica por qué en Bogotá y Medellín los conjuntos usan 40-50% de su presupuesto. **Un conjunto nuevo en la misma
  geografía no compra más mercado: le quita entrega a otro.**
- Las 8 zonas de Expancion tienen 4 conjuntos encima (API, INTER, Q58 y RADIO - Fincas).

---

## 2. Las 3 zonas, en orden

| # | zona | por qué | producto y creativo | conjunto a duplicar |
|---|---|---|---|---|
| **1** | 🌴 **Costa Caribe** (Atlántico, Bolívar, Magdalena, Cesar, Córdoba, Sucre, La Guajira) | la demanda más grande sin pauta: **5,6 pedidos/día gratis**. Mucha moto de trabajo y de mototaxi | **V10 · VIDEO INTERCOMUNICADORES**: el mejor anuncio de la cuenta (cierre 8,6-10,9%, 23-31% de su equilibrio), y el producto con más colchón (3,4×) | Domiciliarios VIDEO INTER - API |
| **2** | 🐄 **Centro-oriente y Llanos** (Boyacá, Meta, Casanare, Arauca) | 2,5 pedidos/día gratis. Fincas, ganadería, obra y seguridad: el público de los radios. Boyacá pidió V10 (12) y radios (6) | **Radios · COMBO X4 SEGURIDAD ($169.000)**: el mejor de radios (cierre 9-10%, 26-32% de su equilibrio). Deja ~$44.000 por pedido | RADIO - Seguridad / Negocios |
| **3** | ⛰️ **Sur** (Cauca, Nariño, Putumayo, Caquetá) | 2,0 pedidos/día gratis. Es la zona que **sigue en lluvias en diciembre**. En Cauca el impermeable es lo que más pidió | **Impermeable · VIDEO (VIDEO - Copia)**: el único impermeable sano (33-43% de su equilibrio) | Domiciliarios VIDEO - API |

**Lo que no recomiendo ahora:**
- **Cundinamarca sin Bogotá:** ya vende 2,4 pedidos/día a $5.400 por pedido con el radio de Bogotá. Abrirla obliga a
  excluir el radio de 40 km, y es la zona con más riesgo de pisarse.
- **Antioquia sin Medellín +40 km:** puede ser grande (Urabá, Oriente, Bajo Cauca), pero los 232 pedidos de Antioquia no
  se pueden partir por radio con este dato. Va después, con exclusión de Medellín +40 km.
- **Parejas / copiloto y marcas de moto (Yamaha, AKT, Pulsar) como públicos:** con Advantage+ audiencia, un interés no
  separa la subasta. Un conjunto de "Yamaha" en Bogotá compite con los 9 que ya están ahí. **Son ángulos de creativo,
  no públicos:** se prueban como anuncio nuevo en su propio conjunto, reemplazando a un perdedor (ACOMPAÑANTE - Copia).
  *"Viajá con tu copiloto estas vacaciones"* es el reemplazo natural del Q58.

⚠️ **Riesgo de la Costa:** Cartagena tuvo una devolución de 57% en septiembre (0-AV, muestra chica). Hay que mirar la
devolución por ciudad desde la primera semana.

---

## 3. Cómo configurar la exclusión para que no haya solapamiento

La regla es simple: **cada conjunto nuevo apunta a departamentos que ningún conjunto actual tiene.** Ninguno de los
tres toca Bogotá D.C., Cundinamarca, Antioquia ni los 8 departamentos de Expancion. El radio de 40 km de Bogotá no
llega a Boyacá ni al Meta (Tunja está a ~120 km, Villavicencio a ~85 km).

En **cada** conjunto nuevo:

1. **Ubicaciones:** borrar Bogotá +40 km y Medellín +40 km. Agregar solo los departamentos de la zona.
2. **"Personas que viven en esta ubicación"**, si tu Administrador muestra la opción (Ubicaciones → opciones). En
   diciembre hay mucho bogotano y paisa de vacaciones en la Costa. Con "viven o estuvieron recientemente", esa persona
   es elegible para el conjunto de Bogotá **y** el de la Costa: ese es el solapamiento que queda. Si la opción no
   aparece, seguir igual: el efecto es chico.
3. **Sin intereses** (quitar Rappi, Uber Eats, Delivery), como los conjuntos de Expancion. Fuera de Bogotá y Medellín
   esos intereses achican el público.
4. **Edad 20-65, todos los géneros, Advantage+ audiencia encendido**: igual que los actuales, para comparar parejo.
5. **No tocar los conjuntos actuales.** Agregarles exclusiones les reinicia el aprendizaje (0-M), y no hace falta: no
   apuntan a estas zonas.

**Comprobación el día 1:** a las 24 h, en el desglose por departamento (Desglose → Por entrega → Región), el conjunto
nuevo tiene que gastar **más del 95% en su zona**, y los conjuntos viejos no tienen que cambiar su reparto.

---

## 4. Presupuesto y qué mirar

**$20.000 por día por conjunto (3 conjuntos = $60.000/día, +14% sobre la cuenta).**
- Con $10.000, a 5-6% de cierre, sale ~1 pedido por día: no alcanza para leer en 7 días.
- Con $20.000 salen 1,5-3 pedidos por día, y lo peor que puede pasar es perder ~$60.000 en 3 días.
- Para no subir la caja, se puede financiar con lo que 0-BQ propuso recortar y no se aplicó: ACOMPAÑANTE - Copia
  ($15.000) y TEST ($10.000).

### Primeras 72 horas (lunes 23 → jueves 26): ¿entrega y atrae?

| señal | sigue | apagar |
|---|---|---|
| uso del presupuesto | > 60% | < 30% (la zona no entrega; pasó con las regiones a $5.000, 0-AR) |
| $/conversación (después de ~$60.000 gastados) | < techo del producto | > techo |
| gasto dentro de su zona | > 95% | < 90%: revisar la geografía |

**Techo de $/conversación** = equilibrio × cierre: V10 ~$1.750 · radios ~$2.500 · impermeable ~$1.000.

⛔ **El 27-nov es Black Friday:** sube el CPM de toda la subasta (0-AU, 0-BF). **Lo que pase del 27 al 29 no se lee.** Por
eso conviene lanzar el **lunes 23 a las 6:00**, con saldo recargado en la mañana, para tener las 72 h antes del 27.

### Días 7-10 (lunes 30-nov → jueves 3-dic): ¿vende?

| señal | verde | corte |
|---|---|---|
| **CPA por pedido del anuncio nuevo** (`CPA-POR-PRODUCTO.md`, tabla por anuncio) | < 50% de su equilibrio | > 75% |
| cierre | ≥ el del mismo anuncio en su conjunto original | < la mitad |
| 🔑 **pedidos de la zona entera, todos los anuncios** (tabla por departamento) | sube sobre la base: Costa **5,6**/día · Centro **2,5** · Sur **2,0** | no sube: el conjunto solo le quitó pedidos a los viejos |
| devolución por ciudad (las primeras guías vuelven ~7-12 días después del despacho) | parecida a la de la cuenta (~23%) | > 35% en una ciudad: sacarla del conjunto |

**El incremento real es la tercera fila.** Si el conjunto de la Costa se atribuye 4 pedidos por día pero la Costa sigue
en 5,6, no sumó nada.

---

## 5. Producto por temporada (fin de noviembre y diciembre)

| | qué pasa | qué empujar |
|---|---|---|
| **lluvias** | en la región andina y el Caribe las lluvias bajan desde mediados de diciembre. El sur y la Amazonía siguen | el impermeable pierde fuerza en el centro y la Costa; se sostiene en el sur. Su colchón ya está en 1,6-1,9× |
| **viajes y vacaciones** | rodadas, parejas viajando, carretera | **intercomunicadores combo** (V10 por colchón, Q58 por precio); ángulo **"copiloto / viaje"** |
| **prima y aguinaldos** (se paga hasta el 20-dic) | más plata en la calle, regalos | combos: Q58 x2, radios x4 y x6 |
| **fincas, seguridad de fin de año** | comercio y fincas con más movimiento | radios x4 Seguridad (ya es el mejor de radios) |
| **Black Friday 27-nov** | CPM alto | no lanzar pruebas ese día; no leer esos días |

---

## 6. Paso a paso en el Administrador de anuncios

Para cada uno de los tres:

1. Ir a **Conjuntos de anuncios** y seleccionar el original (fila 1: `Domiciliarios VIDEO INTER - API`, fila 2:
   `RADIO - Seguridad / Negocios`, fila 3: `Domiciliarios VIDEO - API`).
2. **Duplicar** → "Campaña original" → 1 copia. ⛔ No duplicar la campaña entera.
3. Nombre: `Costa | VIDEO INTER` · `Llanos-Boyacá | RADIO X4` · `Sur | VIDEO IMPER`.
4. **Presupuesto diario $20.000.** Inicio: **lunes 23-nov, 6:00 a.m.**
5. **Público:**
   - borrar Bogotá y Medellín;
   - agregar solo los departamentos de la zona (sección 2);
   - elegir "personas que viven en esta ubicación" si aparece;
   - borrar los intereses;
   - edad 20-65, todos los géneros, Advantage+ audiencia encendido.
6. **Ubicaciones de los anuncios** (placements): igual que el original.
7. **Anuncio:** dejar el que viene duplicado, sin editar el texto ni el video. Confirmar que use **la misma publicación**
   (mismo identificador), para que conserve los comentarios y las reacciones. Mismo número de WhatsApp y mismo mensaje
   de bienvenida.
8. **Publicar.** Anotar el **ID del anuncio nuevo** de cada conjunto.
9. 🔴 **El mismo día, en Render:** agregar el ID a `ANUNCIOS_V10` (Costa), `ANUNCIOS_RADIO` (Llanos) y el del Sur al
   impermeable no hace falta, porque no tiene variable: es el producto por defecto del bot. **Sin esto el bot cotiza otro
   producto (impermeable) a un lead de V10 o de radios** (regla 33).
10. **No aplicar** las recomendaciones de Meta ni tocar los conjuntos originales. Un cambio por vez.
11. **Martes 24, 9:00:** comprobación del día 1 (sección 3). **Jueves 26:** lectura de 72 h. **Lunes 30 a jueves 3:**
    veredicto, con `CPA-POR-PRODUCTO.md` a 14 días y la tabla por departamento.

---

## 7. Veredicto

1. **Sí hay mercado sin pisar, y está probado:** 10 pedidos por día ya llegan de la Costa, los Llanos y el sur sin gastar
   ahí. Es la mejor señal de demanda que tuvo la cuenta, y no costó nada medirla.
2. **La exclusión es geográfica y limpia:** departamentos que nadie tiene, sin tocar los conjuntos actuales. Los
   intereses y las marcas no separan subastas con Advantage+.
3. **Duplicar ganadores por pedido, no por chat:** VIDEO INTERCOMUNICADORES, COMBO X4 SEGURIDAD y VIDEO impermeable.
   ⛔ Nunca ACOMPAÑANTE - Copia.
4. **$20.000 por conjunto, lanzar el lunes 23 a las 6:00**, leer a las 72 h antes de Black Friday y dar el veredicto entre
   el 30-nov y el 3-dic.
5. **Expectativa honesta:** si los tres funcionan, **+3 a +6 pedidos por día netos** sobre los ~10 que esas zonas ya dan.
   No 20. La Costa es la que más puede aportar.

*Cuenta `act_4330882710457791` · COP · America/Bogota*
