# 🔬 Auditoría de Meta Ads — BikerPro · 19-nov-2026

> **Fuente:** `analisis/cpa-por-producto.py`, que cruza el gasto **exacto por anuncio** de la Marketing API con los
> **pedidos reales** del bot (`/pedidos.csv`, columna `anuncio_id`). Hay tres ventanas cerradas: **30 días** (20-oct → 18-nov),
> **14 días** (5 → 18-nov) y **7 días** (12 → 18-nov). El 100% del gasto quedó atribuido y no hubo pedidos sin clasificar.
> **Solo lectura (regla 4-B):** Kiro propone y Santiago ejecuta.

---

## 0. Lo primero: los Excels de Meta miden mensajes, no ventas

En los Excels, la columna "CPA" es el **costo por mensaje** ($287 a $1.561). Ese número no dice qué anuncio vende. Un
anuncio puede traer mensajes baratos de gente que no compra:

```
CPA por pedido  =  costo por mensaje  ÷  cierre (pedidos / mensajes)
```

| anuncio | $/mensaje (Excel) | puesto en el Excel | cierre 14 d | **CPA por pedido 14 d** | **puesto real** |
|---|---|---|---|---|---|
| ACOMPAÑANTE - Copia (Q58) | **$288** 🥇 | 1 | **1,0%** | **$29.577** (97% de su equilibrio) | 🔴 **el peor de los intercomunicadores** |
| VIDEO INTERCOMUNICADORES (V10) | $648 | 11 | **10,9%** | **$6.361** (23%) | 🥇 **el mejor de la cuenta** |
| SON DOS (Q58) | $773 | 13 | 8,2% | $9.370 (30%) | 🟢 el mejor Q58 |
| COMBO X4 SEGURIDAD (radios) | $1.032 | 15 | 9,0% | $12.061 (27%) | 🟢 el mejor de radios |

🔴 **Si se escalara siguiendo el ranking del Excel, la plata iría al anuncio que hoy pierde y se le quitaría al que más
gana.** Es el error #29 de la memoria: TEST Creativos salía 🟢 en mensajes y perdía plata.

**Cómo leer las tablas:** cada anuncio se compara contra **su equilibrio**, que es lo máximo que puede costar un pedido
de ese anuncio sin perder plata. El equilibrio sale de lo que dejan sus propios pedidos (precio − costo − flete real,
con 22,8% de devolución). Por eso un x6 de radios aguanta $45.000 por pedido y un impermeable solo $19.000.
🟢 menos del 50% · 🟡 50-75% · 🔴 más del 75%.

---

## 1. La foto de la cuenta

| ventana | gasto/día | pedidos/día | utilidad/día |
|---|---|---|---|
| 30 días | $427.856 | 39,4 | $639.221 |
| 14 días | $451.387 | 40,5 | $682.283 |
| **7 días** | **$461.600** | **36,0** | **$560.475** 🔴 |

| producto | CPA 30 d | CPA 14 d | **CPA 7 d** | equilibrio | colchón 7 d |
|---|---|---|---|---|---|
| V10 | $8.187 | $7.947 | **$8.547** | $27.778 | 🟢 3,2× |
| Q58 | $11.634 | $14.111 | **$18.359** | $31.951 | 🟡 **1,7×, y bajando** |
| Radios | $18.790 | $16.341 | **$16.733** | $40.174 | 🟡 2,4×, mejorando |
| Impermeable | $10.086 | $10.081 | **$12.448** | $19.791 | 🟡 **1,6×** |

En la última semana la cuenta gastó más y vendió menos: **el Q58 y el impermeable se están encareciendo.**

---

## 2. 🚨 Qué pausar o recortar hoy

| conjunto · anuncio | % de su equilibrio 30 d / 14 d / 7 d | cierre 14 d | veredicto |
|---|---|---|---|
| **Domiciliarios - Expancion - Q58** · ACOMPAÑANTE - Copia | 52% / **97%** / **113%** | **1,0%** | ⛔ **PAUSAR.** Trae los mensajes más baratos de la cuenta y casi nadie compra: 6 pedidos con 632 mensajes en 7 días. Ya pierde plata |
| **Domiciliarios - Expancion - API** · Fondo azul (impermeable) | **92% / 94% / 114%** | 4,4% | ⛔ **PAUSAR.** Lleva 30 días en equilibrio y en la última semana pierde. Es la tercera vez que aparece (0-BL, 0-BO) |
| **RADIO - Broad** · VIDEO RADIO | **143%** / 98% / 74% | 6,1% | ⛔ **PAUSAR.** En 30 días perdió unos $111.000. Se recomendó pausarlo el 3-nov |
| **TEST Creativos - API** · Prueba social | 80% / 78% / 75% | 4,7% | ✂️ **$20.000 → $10.000.** Todavía deja unos $5.000/día, pero lleva un mes pegado al límite de corte |
| **RADIO - Moteros** · COMBO X2 | 76% / 81% / 67% | 6,8% | ✂️ **$35.000 → $20.000.** Vende el x2, que es el combo que menos deja (equilibrio $30.000), y la subida de $20.000 a $35.000 no pagó |
| **Domiciliarios Q58 -** · ACOMPAÑANTE | 42% / 68% / **80%** | 5,0% | ✂️ **$25.000 → $20.000.** Desde el 31-oct el costo por mensaje pasó de $259 a $1.100 |
| **Motorizados - INTER** · LA RUTA | 46% / 56% / 59% | 3,7% | ✂️ **$25.000 → $20.000.** El cierre viene bajando (5,0% → 3,7%) |
| **Motorizados - Q58** · VERDE LIMA | 40% / 41% / 51% | 5,1% | ✂️ **$29.000 → $24.000.** El CPA de las mitades va $10.510 → $17.636 → $23.416. El 3-nov se recomendó $20.000 |

### Lo que preguntaron específicamente

- **RADIO Moteros ($1.561/mensaje) contra Fincas ($918):** por mensaje, Fincas se ve mucho mejor. Por pedido, los dos
  cuestan casi lo mismo (~$21.000-22.000 en 30 días). La diferencia está en lo que deja cada venta: **Fincas vende el x6
  de $229.000 y aguanta $45.000 por pedido; Moteros vende el x2 de $99.000 y aguanta $30.000.** Fincas está al 48% y se
  queda. Moteros está al 76% y se recorta.
- **CTR menor a 1%:** no sirve para cortar. SON DOS (0,84%) y COMBO X4 SEGURIDAD (0,98%) están entre los que más ganan.
  Un CTR bajo con cierre alto significa que el anuncio filtra a los curiosos, y eso es bueno.
- **Frecuencia mayor a 2,0:** en 30 días, 2,0 es baja (cada persona vio el anuncio dos veces en un mes). 0-BB ya mostró
  que el CPA de esta cuenta no sube por fatiga. Los cuatro anuncios con frecuencia ≥2,0 dan resultados opuestos:
  ACOMPAÑANTE - Copia (pierde), Fondo azul Expancion (pierde), FINCAS (gana) y SEGURIDAD (el mejor de radios). **El
  problema del ACOMPAÑANTE es a quién atrae, no cuántas veces lo vieron.**

---

## 3. 📈 Dónde escalar

### Los ganadores reales (CPA por pedido, no por mensaje)

| conjunto · anuncio | CPA 14 d | % de su equilibrio 30 d / 14 d / 7 d | cierre | subir |
|---|---|---|---|---|
| **Domiciliarios VIDEO INTER - API** · VIDEO INTERCOMUNICADORES (V10) | **$6.361** | 23% / 23% / 31% | **10,9%** | **$36.000 → $43.000** (+20%) |
| **Domiciliarios - Expancion - INTER** · COMBO DOS (V10) | $7.122 | 31% / 26% / 25% | 8,5% | **$25.000 → $30.000** (+20%) |
| **RADIO - Seguridad / Negocios** · COMBO X4 | $12.061 | 32% / 27% / 26% | 9-10% | **$40.000 → $48.000** (+20%) |
| **Domiciliarios VIDEO Q58 -** · SON DOS | $9.370 | 29% / 30% / 41% | 8,2% | **$25.000 → $30.000** (+20%) |
| **Domiciliarios VIDEO - API** · VIDEO (impermeable) | $7.547 | 33% / 35% / 43% | 6,5% | **$20.000 → $24.000** (+20%) |

🔑 **Cuatro de los cinco son VIDEO**, y los tres mejores cierres de la cuenta también son video. Los videos traen
mensajes más caros, pero de gente que compra.

### Sobre ACOMPAÑANTE - Copia ($288) y CANSADO DE GRITAR ($327)

- **ACOMPAÑANTE - Copia no se escala, se pausa** (sección 2). En 30 días su cierre cayó de 2,9% a 1,0%.
- **CANSADO DE GRITAR** (Domiciliarios INTER - API) **se deja igual en $20.000.** Da plata (38-49% de su equilibrio),
  pero cierra 2,3-3,1%, de los peores de la cuenta. Más presupuesto le traería más mensajes que no compran.

### Cómo escalar sin descalibrar el aprendizaje

1. **Máximo +20% por conjunto y por vez,** y leer a los 3 días o más. Siempre por CPA por pedido, nunca por $/mensaje.
2. **Fase 1 (hoy):** pausas, recortes y los cinco +20% de arriba.
3. **Fase 2 (domingo 22 o lunes 23):** si cada ganador sigue por debajo del 50% de su equilibrio, otro +20%: VIDEO INTER
   $52.000 · Expancion INTER $36.000 · Seguridad $58.000 · VIDEO Q58 $36.000 · VIDEO impermeable $29.000.
4. **Fase 3 (~26-nov):** lo mismo. Si alguno pasa del 50%, ese se queda donde está.
5. **No editar los anuncios** (reinicia el aprendizaje) y no aplicar las recomendaciones de Meta.

---

## 4. 📋 La tabla de presupuestos

| conjunto | actual | **fase 1 (hoy)** | veredicto |
|---|---|---|---|
| Domiciliarios VIDEO INTER - API | $36.000 | **$43.000** | 🟢 escalar (+20%) |
| RADIO - Seguridad / Negocios | $40.000 | **$48.000** | 🟢 escalar (+20%) |
| Domiciliarios - Expancion - INTER | $25.000 | **$30.000** | 🟢 escalar (+20%) |
| Domiciliarios VIDEO Q58 - | $25.000 | **$30.000** | 🟢 escalar (+20%) |
| Domiciliarios VIDEO - API | $20.000 | **$24.000** | 🟢 escalar (+20%) |
| Domiciliarios - API | $35.000 | $35.000 | 🟡 mantener (47-53%) |
| Domiciliarios INTER - API | $20.000 | $20.000 | 🟡 mantener: da plata pero cierra poco |
| RADIO - Fincas | $20.000 | $20.000 | 🟡 mantener (38-48%; 7 días con pocos pedidos) |
| Motorizados - API | $20.000 | $20.000 | 🟡 mantener con alarma: 57% en 14 d, 114% en 7 d (7 pedidos) |
| Motorizados - Q58 | $29.000 | **$24.000** | ✂️ empeora mitad a mitad |
| Motorizados - INTER | $25.000 | **$20.000** | ✂️ el cierre baja |
| Domiciliarios Q58 - | $25.000 | **$20.000** | ✂️ 80% en 7 días |
| RADIO - Moteros | $35.000 | **$20.000** | ✂️ 76-81%, la subida no pagó |
| TEST Creativos - API | $20.000 | **$10.000** | ✂️ un mes pegado al 75-80% |
| Domiciliarios - Expancion - Q58 | $29.000 | **$0** | ⛔ pausar: cierre 1%, pierde |
| Domiciliarios - Expancion - API | $30.000 | **$0** | ⛔ pausar: pierde en 7 días |
| RADIO - Broad | $10.000 | **$0** | ⛔ pausar: 143% en 30 días |
| **TOTAL** | **$444.000** | **$364.000** | fase 2 ≈ $400.000 · fase 3 ≈ $440.000 |

📌 Los presupuestos suman **$444.000**, no ~$423.000. El ~$427.000/día del Excel es lo que **se gastó** en promedio.

### Qué se puede esperar (con números honestos)

- **Fase 1:** salen ~$80.000/día que traían ~3,5 pedidos al costo de equilibrio, o sea que **casi no dejaban utilidad.**
  Lo esperable son **~33-36 pedidos/día atribuidos, con la utilidad igual o mayor y $80.000/día menos de caja.** Los
  mensajes bajan más que los pedidos, porque los videos traen mensajes más caros: ~550-600 mensajes/día.
- **Fase 3 (~10 días), si los ganadores aguantan:** el gasto vuelve a ~$440.000, pero concentrado en lo que vende.
  - Si los ganadores escalan como el V10 en octubre (0-BL: el pedido extra costó lo mismo que el promedio): **~43-50
    pedidos/día**.
  - Si escalan como la cuenta en agosto (elasticidad 0,63: duplicar la pauta sube las ventas 31%): **~35-40
    pedidos/día, igual que hoy pero con más utilidad.**
  - La fase 2 dice cuál de los dos es: si el CPA de los ganadores sube poco con el primer +20%, es el primer caso.

🔴 **60-80 pedidos/día no se alcanzan solo moviendo presupuesto.** Con la curva medida, pasar de 40 a 60 pedidos pidiendo
todo a Meta costaría unas **3 veces la pauta actual** (~$1,3 M/día), y el pedido marginal costaría más de lo que deja. Lo
que puede llevar a 60-80 está en la sección 6.

### Caja

A las 15:47 del 19-nov quedaban **$111.294** de saldo, con $444.000 de presupuesto. El informe pide recargar **~$364.000
antes de las 19:00** para no quedarse sin saldo en el mejor bloque del día (18-23 h). Con la fase 1, el presupuesto baja
a $364.000.

---

## 5. 🎨 Creativos

**El patrón de los 30 días:** los anuncios que más venden son **videos que muestran el producto funcionando, con
precio** (VIDEO INTERCOMUNICADORES 10%, SON DOS 8,7%, VIDEO impermeable 5,9%) o estáticos con **un uso y un combo
concretos** (SEGURIDAD x4, 9-10%). Los que traen mensajes baratos y no venden tienen un gancho emocional sin precio
(ACOMPAÑANTE 1-3%, CANSADO DE GRITAR 2-3%).

| urgencia | qué crear | dónde va | por qué |
|---|---|---|---|
| 1 | **Video Q58 nuevo al estilo SON DOS** (dos cascos hablando en ruta, pantalla, precio del combo x2 en el primer segundo) | conjunto nuevo en la audiencia de Expancion - Q58, a $15.000 | reemplaza a ACOMPAÑANTE - Copia. El Q58 es el producto que más se está encareciendo |
| 2 | **Variante de ACOMPAÑANTE con el precio a la vista** ("Combo x2 $129.900 + envío") | conjunto nuevo a $10.000 | hoy atrae mensajes sin intención de compra. Con precio filtra |
| 3 | **Radios: el ángulo SEGURIDAD llevado a video** (portería, obra o negocio, con el x4 a $169.000) | conjunto nuevo a $15.000 | Seguridad es el que más cierra de radios. El video UGC genérico (Broad) no vendió |
| 4 | **Radios para moteros, empujando el x4** ("para la rodada del grupo") | dentro de RADIO - Moteros, como anuncio nuevo | el x2 deja poco. Si el mismo público compra x4, el equilibrio sube de $30.000 a ~$44.000 |
| 5 | **Impermeable: segundo video** (lluvia real en moto, puesta y prueba de agua) | conjunto nuevo a $10.000 | el VIDEO impermeable es el único del producto que está bien. El Fondo azul ya no da en Expancion |

**Cómo se prueban:** cada creativo nuevo en **su propio conjunto** (un conjunto, un anuncio; no se edita el que ya
funciona), con $10.000-15.000 por día, y **veredicto a los 7 días por CPA por pedido** con `CPA-POR-PRODUCTO.md`. Para que
los pedidos se atribuyan, el ID del anuncio nuevo tiene que estar en `ANUNCIOS_Q58`, `ANUNCIOS_V10` o `ANUNCIOS_RADIO` de
Render **el mismo día que se publica** (regla 33). Si no está, el bot enruta por el texto del anuncio y puede cotizar
otro producto.

---

## 6. 🚀 Lo que de verdad puede llevar a 60-80 pedidos

| palanca | por qué mueve el número | estado |
|---|---|---|
| **Re-contactar a los que escribieron y no compraron** | 0-BC lo estimó como la palanca más grande: $558.000-1.090.000/mes con CPA $0. Ya existe el botón «Mandar plantilla» y el seguimiento de 44 h por producto | ¿están activas las plantillas de seguimiento de los cuatro productos? (`/seguimiento?token=…`) |
| **Subir el cierre** | el cierre de la cuenta es 5-6%. Cada punto de cierre son ~6-7 pedidos/día más con el mismo gasto | revisar los chats de los anuncios que cierran 1-3% (`#222`, charlas por anuncio) |
| **Bajar la devolución** (22-25%) | cada punto de devolución que baja son pedidos que ya están pagados y se entregan | ¿se prendió el recordatorio pre-entrega? (`/recordatorio-entrega?token=…`) |
| **Creativos nuevos que salgan ganadores** (sección 5) | un ganador nuevo abre audiencia nueva. Subirle presupuesto al mismo anuncio solo diluye | a crear |
| **Temporada** | Black Friday (27-nov) y diciembre suben el CPM de toda la subasta (0-AU, 0-BF) | escalar **antes** del 25-nov y no durante |

---

## 7. ❓ Para Santiago

1. **Las recomendaciones del 3-nov** (pausar Broad, VERDE LIMA a $20.000, Expancion - API a $20.000) **no se aplicaron.**
   ¿Fue una decisión? Si hubo una razón, cambia la lectura (regla 8).
2. **¿Qué pasó el 31-oct con ACOMPAÑANTE** (el original, Domiciliarios Q58 -)? Desde ese día el costo por mensaje se
   cuadruplicó.
3. **El bot atribuye ~36-40 pedidos/día a anuncios; ustedes despachan 40-50.** La diferencia es venta orgánica, de Instagram
   o tomada a mano. No entra en estas tablas, así que el CPA real de la cuenta es algo mejor que el de acá.
4. **La devolución:** ¿la cifra firme es 22%, 25% o 25,8%? Los informes usan 22,8%. Con 25% los equilibrios bajan ~3% y
   los veredictos no cambian, salvo TEST Creativos, que queda más cerca del corte.

*Cuenta `act_4330882710457791` · COP · America/Bogota*
