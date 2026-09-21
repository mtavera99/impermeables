# 📦 Export del Meta Business Agent — hallazgos

> Fuente: `datos-privados/export/` (**6.317 conversaciones reales**, 13 MB).
> Script: `analisis/export-agente-meta-21sep.js` — reproducible con `node`.
> 🔴 La carpeta de datos está en `.gitignore`: tiene nombres, teléfonos y direcciones.
> Este documento solo contiene agregados.

---

## 📏 Primero: el tamaño

Esperábamos **~300 chats**. Son **6.317**. Es 21× más de lo previsto y cambia lo que
se puede hacer con esto: ya no es una muestra de lenguaje, es el histórico completo
con volumen suficiente para medir por anuncio.

| | |
|---|---|
| conversaciones | **6.317** |
| mensajes del cliente | 21.657 |
| vacías (nunca escribió nada propio) | 2.827 · **44,8%** |
| con `ad_id` (atribuibles) | 5.506 · **87,2%** |
| anuncios distintos | **54** (51 como primer contacto) |

El **44,8% de vacías cuadra con el 45,9%** medido en 0-AG por otra vía. Dos métodos
independientes dando lo mismo: el dato es sólido.

---

## 🎯 Hallazgo 1 — LA ATRIBUCIÓN YA EXISTE

Cada conversación trae el `ad_id` que la originó. Esto es **lo que el plan tenía como
"lo más rentable" y estaba pendiente**: saber qué anuncio da *pedidos*, no solo
conversaciones.

Anuncios con ≥50 conversaciones (muestra usable):

| ad_id | conv | pedidos | cierre | valor |
|---|---|---|---|---|
| `…703700390` | 147 | 9 | **6,1%** 🟢 | $767.000 |
| `…315410390` | 51 | 3 | **5,9%** 🟢 | $239.000 |
| `…142791210390` | 158 | 7 | 4,4% | $800.000 |
| `…142778330390` | 986 | 31 | 3,1% | $3.284.000 |
| `…704360390` | **2.115** | 57 | 2,7% | $5.068.900 |
| `…699060390` | 568 | 13 | 2,3% | $1.067.000 |
| `…687460390` | 276 | 5 | 1,8% | $467.000 |
| `…510045930390` | **636** | 11 | **1,7%** 🔴 | $837.900 |
| `…696170390` | 71 | 1 | **1,4%** 🔴 | $73.000 |
| `…510046170390` | 75 | 0 | **0,0%** 🔴 | $0 |

**El rango es 4,4× entre el mejor y el peor con volumen comparable.** Y el reparto del
presupuesto no sigue el cierre:

- 🔴 **`…510045930390` se comió 636 conversaciones y cierra al 1,7%.** Es el segundo en
  volumen de conversaciones y el octavo en cierre. Es el sospechoso número uno.
- 🟢 **`…703700390` cierra al 6,1% con solo 147 conversaciones.** Está desfinanciado.
- 🔴 **`…510046170390`: 75 conversaciones, cero pedidos.**

**5 de 51 anuncios concentran el 80% de los pedidos.**

⚠️ **Es atribución a primer contacto.** 374 conversaciones entraron por más de un
anuncio (clientes que volvieron); se acreditan al primero. Con último-contacto los
números cambian. Es una decisión, no un dato.

---

## 🔴 Hallazgo 2 — EL AGENTE DE META ESTÁ COTIZANDO PRECIOS VIEJOS

Audité los pedidos del export contra `cotizar()` del bot, el tarifario corregido hoy:

| | pedidos | |
|---|---|---|
| ✅ cotizó bien | 31 | 35,2% |
| 🔴 **cotizó POR DEBAJO** | **41** | **46,6%** |
| 🟡 cotizó por encima | 16 | 18,2% |

**Casi la mitad de los pedidos salieron por debajo del tarifario.** Promedio de
$3.395 por pedido mal cotizado.

La fuga se concentra donde ya sabíamos:

| banda | pedidos | mal cotizados | fuga |
|---|---|---|---|
| A | 25 | 1 | $13.100 |
| B | 4 | 3 | $3.000 |
| **C** | 35 | **28** | **$70.100** |
| **D** | 14 | 7 | $37.000 |
| E | 8 | 0 | $0 |
| F | 2 | 2 | $16.000 |

Los peores casos individuales:

| ciudad | uds | cotizó | correcto | falta |
|---|---|---|---|---|
| Manizales | 3 | $169.900 | $205.000 | **$35.100** |
| Tadó | 1 | $85.000 | $93.000 | **$8.000** |
| Yarumal | 2 | $148.000 | $152.000 | $4.000 |
| Montería / Sincelejo | 1 | $81.000 | $83.000 | $2.000 |

### Y encontré la causa raíz, que no está en el código

La configuración del propio agente en Meta (`settings.txt`) declara:

> Shipping Info: Bogotá y alrededores: 10.000 a 12.000. **Resto de Colombia: 15.000 a 20.000.**

**Eso es falso y es lo que el agente cree.** El flete real de banda E ronda los $26.000
y Tadó llegó a $55.563. Mientras esa línea diga "15.000 a 20.000", el agente va a seguir
cotizando por debajo **aunque el código del repo esté perfecto** — porque el agente de
Meta no lee el código.

🔧 **Arreglo: corregir el Shipping Info en la configuración del agente.** Es un campo de
texto, gratis, y es la fuga viva más grande que queda.

---

## 🗺️ Hallazgo 3 — el bot no reconoce la mitad de las ciudades donde vende

**El 47,6% de los pedidos está en ciudades que `cotizar()` no tiene en ninguna banda**
(74 ciudades distintas). Cuando no reconoce, cae al default **banda E ($85.000)**.

Eso protege el margen (erra hacia arriba), pero **cotiza $85.000 a un cliente de
Apartadó o La Ceja que debería pagar menos** — y ese sobreprecio cuesta conversión en
las bandas baratas. Hay varias formas de nombre por ciudad que además ensucian el match:
`Cartagena Bolívar`, `Arjona Bolívar`, `Ipiales Nariño`, `San Cristobal - Medellin`,
`Madrid (Barrio San José)`, `Buenaventura / Barrio Cascajal`.

🔧 Dos arreglos baratos: **normalizar el nombre** (quitar departamento, barrio y
paréntesis antes de buscar la banda) y **cargar las 74 ciudades faltantes**.

---

## 💬 Hallazgo 4 — el precio NO es la objeción principal

15.697 mensajes propios del cliente, agrupados por tema:

| tema | menciones | % |
|---|---|---|
| **talla** | 2.801 | **17,8%** |
| **color / franja** | 1.619 | **10,3%** |
| precio | 1.269 | 8,1% |
| envío / pago | 840 | 5,4% |
| cuándo llega | 820 | 5,2% |
| impermeabilidad | 503 | 3,2% |
| desconfianza / "¿es estafa?" | 391 | 2,5% |
| material | 365 | 2,3% |
| garantía / cambios | 59 | 0,4% |
| mayorista | 29 | 0,2% |
| colmena | 28 | 0,2% |

**Talla y color son 28,1% juntos — 3,5× el precio.** El guion y los creativos están
resolviendo la objeción equivocada primero. Poner talla y colores **en el anuncio**
debería bajar el trabajo del agente y subir el cierre.

Y ojo: **mayorista 0,2% y colmena 0,2%.** Casi nadie los pide. Refuerza no habilitar
cotización de mayoristas todavía.

---

## ⚠️ Lo que este export NO puede responder

| | |
|---|---|
| ❌ **no trae timestamps** | no hay serie de tiempo, ni se puede casar un pedido con el gasto de un día |
| ❌ **no es la tasa de cierre del negocio** | ver abajo |
| ❌ no dice si el pedido se entregó | un pedido confirmado en el chat no es una venta cobrada |

### El 2,5% de cierre no es la tasa real — casi me equivoco con esto

El transcript muestra **155 pedidos confirmados en 6.317 conversaciones = 2,5%**, contra
el **8,4%** histórico del archivo madre. **No es una caída.** Son cosas distintas:

- **243 conversaciones se pasaron a un humano SIN bloque de cierre en el transcript.**
  Esas ventas se cierran después y son invisibles acá.
- 3.803 conversaciones tienen intervención humana (`Business:`).

168 cierres visibles + 243 traspasos sin cierre ≈ **hasta 411 pedidos = 6,5%**, que ya
es del orden del 8,4%. **El export mide "lo que cerró el agente solo", no lo que vendió
el negocio.** Confundir las dos es el mismo patrón de error que el #29.

---

## 🐛 Dos bugs que corregí en el camino

| # | bug | por qué importa |
|---|---|---|
| 33 | **`ad_id` con `JSON.parse`** | Los ID de Meta (`120249427279320390`) superan `Number.MAX_SAFE_INTEGER`. JS los redondea a `…380` y **fusiona anuncios distintos**. La primera corrida reportó 51 anuncios y una tasa de cierre inventada del 13,3% para "(sin anuncio)" |
| 34 | **contar líneas `Nombre:` como pedidos** | El agente **repite el bloque de confirmación 1,83× por chat**. Contar líneas habría inflado las ventas 83% |

Regla nueva: **los ID de Meta se leen como TEXTO, nunca como número.** Y **un bloque
repetido no es un evento nuevo: hay que deduplicar por conversación.**

---

## 🎯 Lo que yo haría con esto, en orden de plata

1. 🔴 **Corregir el Shipping Info en la configuración del agente de Meta.** Es la fuga
   viva. Campo de texto, gratis, y hoy el agente cotiza por debajo en el 46,6% de los pedidos.
2. 🔴 **Revisar `…510045930390`** (636 conversaciones al 1,7%) y **`…510046170390`**
   (75 conversaciones, 0 pedidos) contra su gasto en Meta. Si el gasto acompaña el
   volumen, ahí hay plata quemándose.
3. 🟢 **Subir `…703700390`** (6,1% de cierre, solo 147 conversaciones).
4. 🔧 **Normalizar nombres de ciudad y cargar las 74 faltantes** en `fletes.js`.
5. 💬 **Mover talla y colores al anuncio.** Son el 28,1% de lo que pregunta la gente.

**Para 2 y 3 me falta un dato que no está en el export: el gasto por `ad_id`.** Eso sí
lo da la API de Meta, que ya lee sola. Cruzando las dos cosas sale el **CPA por anuncio**
— el número que el plan lleva persiguiendo desde el principio.
