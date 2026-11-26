---
name: bikerpro-despacho
description: >-
  Audita pedidos pendientes de BikerPro, genera el Excel para 99 Envíos 2.0 con
  transportadora y seguro según zona, recorta PDFs multi-etiqueta (1 guía por página),
  envía las guías por WhatsApp y concilia el panel.
---

# Agente de Auditoría, Guías y Despacho — BikerPro

## Reglas de Negocio
1. **Nunca despachar a ciegas pedidos con alertas:** revisar su chat (`/chat?token=...&id=...`) **completo desde el primer mensaje** antes de incluirlos o preguntar al cliente:
   - **Ciudades homónimas** (`Restrepo` Meta/Valle, `La Unión` Ant./Valle/Nariño, `Ciudad Bolívar` Ant./Bogotá, `Rionegro` Ant./Santander, `Granada` Meta/Ant./Cund.): **leer todo el historial del chat desde el inicio** antes de decir que falta el departamento (muchas veces el cliente ya lo escribió al principio).
   - `🔴 falta celular`: no se puede generar guía; dejar pendiente y pedir celular.
   - `🔴 PRECIO NO CUADRA` / `🔴 SIN CONFIRMAR`: leer el chat para validar producto, unidades y confirmación real.
   - `📦 GUÍA YA ENVIADA`: verificar si es pedido repetido o una compra nueva.
   - `💸 COMPROBANTE SIN VERIFICAR`: abrir la imagen `/media?token=...&id=...` con `view_file` para confirmar si es pago real, foto del producto o cédula (si es foto/cédula, va `COD`).
2. **Transportadora y Seguro Antidevolución por territorio:**
   - **Coordinadora + Seguro Básico:** Domicilios en ciudades principales y área metropolitana (`BOGOTA D.C./COLOMBIA`, `MEDELLIN/ANTIOQUIA`, `ITAGUI/ANTIOQUIA`, `BELLO/ANTIOQUIA`, `ZIPAQUIRA/CUNDINAMARCA`, `IBAGUE/TOLIMA`, `CALI/VALLE DEL CAUCA`, `BUCARAMANGA/SANTANDER`, `PEREIRA/RISARALDA`, etc.). *Excepción:* hoteles o direcciones complejas → **Seguro Plus**.
   - **Interrapidísimo + Seguro Plus:** Costa Atlántica (`CARTAGENA/BOLIVAR`, `SANTA MARTA/MAGDALENA`, `VALLEDUPAR/CESAR`, `MONTERIA/CORDOBA`, `BARRANQUILLA/ATLANTICO`), `PASTO/NARIÑO`, todas las entregas en **OFICINA**, veredas y municipios intermedios/rurales.
   - Si Interrapidísimo no tiene COD en un municipio (ej. `NUEVA GRANADA/MAGDALENA`) o falla al emitir guía, usar **Coordinadora + Seguro Plus** (a Punto Droop / Oficina o Domicilio).
3. **Pesos y dimensiones estándar:**
   - Intercomunicadores (`V10 2X`, `Q58 Max`): `0.5 kg`, `10x10x10`
   - Impermeable x1: `1.0 kg`, `10x10x10` (x2: `1.5 kg`, `10x10x10`)
   - Radios `BF-777S` x1 (2 radios): `0.8 kg`, `15x10x8` · x2 (4 radios): `1.5 kg`, `15x10x8`

## Flujo de Trabajo

### 1. Auditar pedidos pendientes
```bash
python3 .agents/skills/bikerpro-despacho/scripts/despacho_cli.py audit
```
Devuelve el listado completo separado en `limpios`, `con_alertas` y `duplicados_telefono`. Razona **únicamente** los que están en `con_alertas` revisando su chat/imagen.

### 3. Generar guías y manifiestos originales y enviarlos por WhatsApp para imprimir
Después de crear los preenvíos en 99 Envíos 2.0:
1. Emitir/generar las guías en **Despachos → Pendientes de Impresión** y descargar el **PDF original de guías** (Media Carta / Stickers) sin recortar.
2. Generar y cerrar los **Manifiestos Oficiales de 99 Envíos 2.0** (uno por transportadora: Interrapidísimo y Coordinadora — nunca entregar un `.md` en lugar del manifiesto oficial) y **unirlos en un solo PDF** (`manifiestos.pdf`) listo para imprimir.
3. **Enviar ambos PDFs automáticamente por WhatsApp** a los números configurados en `BIKERPRO_PRINT_PHONES` (y dejarlos también enlazados en el chat):
   ```bash
   python3 .agents/skills/bikerpro-despacho/scripts/despacho_cli.py send-doc --pdf /ruta/guias_original.pdf --caption "Guías originales para imprimir 📦"
   python3 .agents/skills/bikerpro-despacho/scripts/despacho_cli.py send-doc --pdf /ruta/manifiestos.pdf --caption "Manifiesto oficial 99 Envíos 📋"
   ```

### 4. Dividir PDF, enviar a clientes por WhatsApp y conciliar
```bash
python3 .agents/skills/bikerpro-despacho/scripts/despacho_cli.py split-pdf --inputs /ruta/pdf1.pdf /ruta/pdf2.pdf --out /tmp/guias_individuales.pdf
```
Detecta automáticamente páginas de **Coordinadora** (`612x264`, 2 o 3 por hoja) e **Interrapidísimo** (`612x396`, 2 por hoja) y verifica que todas las páginas tengan texto legible.

```bash
python3 .agents/skills/bikerpro-despacho/scripts/despacho_cli.py dispatch-pdf --pdf /tmp/guias_individuales.pdf
```
Sube el PDF dividido a `/guias/revisar`, valida emparejamiento, envía las guías por `/guias/enviar` en lotes seguros y ejecuta `POST /conciliar-guias`.
