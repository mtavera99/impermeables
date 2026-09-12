# 🔑 ACCESOS Y RECUPERACIÓN — cómo volver a conectar todo si se pierde la cuenta de Kiro

> **Para qué sirve este archivo:** el dueño pierde/recrea cuentas de Kiro cada tanto. Con este archivo,
> en una sesión nueva alcanza con decir *"abrí impermeables y leé ACCESOS-Y-RECUPERACION.md"* y el
> agente sabe exactamente qué existe, cómo se llama y cómo reconectarlo.

## 🔴🔴 LO PRIMERO: ACÁ NO HAY NINGUNA CLAVE, Y ES A PROPÓSITO

**Este repositorio es PÚBLICO** (`github.com/mtavera99/impermeables`). Cualquiera en internet lo lee.

⛔ **Un token de Meta escrito acá = cualquier persona del mundo puede leer la cuenta publicitaria de
BikerPro**: presupuestos, gasto, audiencias, resultados. Y GitHub además escanea repos públicos: Meta
recibe el aviso y **revoca el token solo**, así que ni siquiera serviría.

✅ **Lo que sí está acá:** todo lo demás — nombres, IDs, permisos, y el paso a paso para regenerar.
**El valor del token se guarda en un gestor de contraseñas** (Bitwarden, 1Password, o incluso las
notas del teléfono con clave). **Nunca en git.**

📌 **Y la buena noticia: el token no hace falta guardarlo.** Regenerarlo toma 2 minutos y está
explicado abajo. Lo que cuesta reconstruir es el **contexto**, y eso es lo que guarda este archivo.

---

## 1️⃣ META ADS — lectura en vivo

### Qué existe hoy

| Dato | Valor |
|---|---|
| **Cuenta publicitaria** | **`act_4330882710457791`** — nombre "BikerPro" |
| Moneda | **COP** (ojo: sin centavos, ver el bug de 0-AH) |
| Zona horaria de la cuenta | **America/Bogota** (UTC−5) |
| Portafolio comercial / business_id | **`1271452296042859`** |
| **Usuario de sistema** | **`Kiro Lectura`** |
| Rol del usuario de sistema | **Analista — "Ver rendimiento"** |
| App de Meta | **Kiro** (`app_id 28212160735114123`) |
| **Permisos del token** | **`ads_read` + `public_profile`** — y NADA MÁS |
| Expiración | **no expira** (`expires_at: 0`) |
| **Nombre del secreto en Kiro** | **`META_ADS_TOKEN`** |
| Forma de pago de la cuenta | **PREPAGO — "Fondos disponibles"**, se recarga a diario |

### Cómo reconectarlo en una sesión/cuenta nueva de Kiro

1. **Buscar el token en el gestor de contraseñas.** Si no está, regenerarlo (paso 2).
2. **Guardarlo como secreto del sandbox con el nombre exacto `META_ADS_TOKEN`.**
3. Verificar que quedó:
   ```bash
   python3 analisis/meta-api-lectura.py cuentas
   ```
   Tiene que devolver `act_4330882710457791 · COP · BikerPro`.
4. Si dice que falta el token, el secreto no se propagó. **Decirlo, no inventar métricas.**

### Cómo REGENERAR el token desde cero (2 minutos)

1. Ir a **Configuración del negocio** → **Usuarios** → **Usuarios de sistema**
2. Buscar **`Kiro Lectura`** (si no existe, crearlo con rol **Empleado**)
3. **Agregar activos** → cuenta publicitaria **BikerPro** → rol **Analista ("Ver rendimiento")**
   ⛔ **NUNCA "Anunciante" ni "Administrador".** El rol Analista es el candado técnico de la regla 4-B:
   con Analista, Meta **rechaza** cualquier escritura. No depende de la disciplina del agente.
4. **Generar nuevo token** → marcar **solo `ads_read`** → copiar
5. Guardarlo en el gestor de contraseñas **y** como secreto `META_ADS_TOKEN` en Kiro

### Comandos de lectura (todos son solo `GET`)

```bash
python3 analisis/meta-api-lectura.py cuentas
python3 analisis/meta-api-lectura.py conjuntos act_4330882710457791
python3 analisis/meta-api-lectura.py insights  act_4330882710457791 2026-09-08 2026-09-10
python3 analisis/saldo-por-hora.py 2026-09-08 2026-09-11    # detector de huecos de saldo
```

### ⛔ Lo que NO se puede hacer, y por qué

- **El MCP `meta-ads` NO funciona en Kiro Web.** Su OAuth usa redirect de loopback (`127.0.0.1`), que
  el navegador no soporta, y su pantalla de consentimiento **obliga a `ads_management`** (escritura).
  **No volver a intentarlo.** Detalle en la sección 4-B del archivo madre.
- **REGLA 4-B: el agente LEE, el dueño EJECUTA.** Nada de cambiar presupuestos, pausar, editar
  creativos ni aplicar recomendaciones de Meta.

### 🔴 Dónde se recarga el saldo (es prepago)

**Administrador de anuncios** → **☰** → **Facturación y pagos** → **Cuentas** → BikerPro →
botón **"Agregar fondos"**.

URL directa:
```
https://adsmanager.facebook.com/adsmanager/billing_hub/accounts?asset_id=4330882710457791&business_id=1271452296042859
```

⚠️ **Mantener 2-3 días de colchón (~$400.000-$600.000).** Cuando el saldo llega a cero la cuenta deja
de entregar horas y al recargar Meta acelera y compra mal. Ver sección **0-AI**.

---

## 2️⃣ 99 ENVÍOS — logística

| Dato | Valor |
|---|---|
| Plataforma | **`99envios.app`** (el sitio público es `99envios.com`) |
| **Código de sucursal** | **`689915`** |
| Nombre de la sucursal | **Carbonata** |
| Transportadoras en uso | **Interrapidísimo** (`1`) y **Coordinadora** (`4`) |
| Forma de trabajo | **manual**: se exporta `Envios-Completos-YYYY-MM-DD.xlsx` y se analiza |

### Estado de la integración por API

⏳ **PENDIENTE, esperando respuesta por correo.** No tienen API pública documentada (verificado el
11-sep: `api.99envios.com` no resuelve, y `/docs`, `/developers`, `/swagger` devuelven todos la misma
página de catch-all).

**Lo que se pidió / hay que pedir:** ellos ya tienen integración con Shopify, donde **le devuelven el
estado de la guía a la tienda**. O sea que la capacidad de "avisar cuando una guía cambia de estado"
**ya existe**. El pedido concreto es apuntarla a una URL propia (webhook), o una API de solo lectura
para consultar las guías de la sucursal `689915` con **estado, novedades, recaudo y teléfono**.

⛔ **NO usar automatización de navegador con el usuario del dueño.** Una sesión logueada puede *crear
guías y cambiar cosas*: es lo contrario del candado de solo lectura que se logró con Meta.

### Columnas útiles del export

`codigo_sucursal · valor_servicio · fecha_envio · numero_de_guia · transportadora · Producto ·
nombre_destinatario · direccion_destinatario · telefono_destinatario · ciudad_destino ·
valor_comercial · estado_del_envio · fecha_actualizacion · aplica_contrapago · seguro · valor_seguro_99`

⚠️ **`fecha_envio` viene en UTC.** El despacho real ocurre entre las 14:45 y las 17:13 Bogotá.
⚠️ **`fecha_envio` es el DESPACHO, no la venta** (regla 0-Y).

---

## 3️⃣ 🔴 PENDIENTE DE SEGURIDAD: EL REPO ES PÚBLICO Y TIENE DATOS DE CLIENTES

| Archivo | Qué tiene |
|---|---|
| `analisis/envios-completos-10sep.csv` | **141 filas con nombre y apellido de clientes**, ciudad y número de guía |
| El archivo madre | algunos nombres propios y números de guía sueltos |

**Con nombre + número de guía se puede consultar el rastreo de un pedido ajeno.**

🔴 **Y el riesgo crece:** el export del 11-sep trae **teléfono y dirección**. Si eso entra al repo,
pasás de 141 nombres a 141 personas con teléfono, dirección y el monto que llevaban encima, en
internet abierto.

**Dos opciones, cualquiera sirve:**
1. **Poner el repo en privado** — Settings → General → abajo → *Change repository visibility*. Un botón.
2. **Sacar los CSV con datos de clientes** y dejar solo los agregados. Ningún análisis los necesita:
   todos usan montos, ciudades y estados.

📌 **Mientras tanto, la regla que se está aplicando:** `analisis/envios-completos-11sep.csv` **no tiene
nombres, teléfonos ni direcciones**. Solo fecha, guía, flete, producto, ciudad, recaudo, estado y
seguro. **Para subir el público de clientes a Meta, el archivo va del computador del dueño directo a
Meta, sin pasar por git.**

---

## 4️⃣ Qué leer en una sesión nueva, en orden

1. **`.kiro/steering/proyecto-bikerpro.md`** — el archivo madre. Empezar por el bloque **⚡ ARRANQUE** y
   por el índice; las secciones más nuevas son las de letras más altas (0-AK, 0-AJ, 0-AI, 0-AH…)
2. **Este archivo**, para reconectar los accesos
3. **`git log --oneline -20`** — los mensajes de commit cuentan la historia con números

📌 **Y la cultura del proyecto, que importa tanto como los datos:** acá se anotan **los errores
propios** con nombre y apellido. Si un análisis se cae, se marca la sección vieja con un aviso arriba
y se escribe una nueva. No se borra ni se maquilla.
