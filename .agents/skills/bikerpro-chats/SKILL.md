---
name: bikerpro-chats
description: >-
  Audita, filtra y resuelve chats pendientes del panel de BikerPro (WhatsApp / Messenger).
  Usa este skill cuando el usuario pida limpiar chats pendientes, responder consultas
  comerciales o sacar la lista de casos manuales en BikerPro.
---

# Agente de Chats y Ventas — BikerPro

## Objetivo
Resolver la mayor cantidad de chats pendientes en `/panel` gastando el mínimo de tokens, manteniendo la calidad comercial y dejando únicamente los casos que requieren verificación manual humana (comprobantes de pago, garantías, devoluciones, reclamos de guía).

## Flujo de trabajo (en 3 pasos)

### 1. Extraer y pre-clasificar pendientes (0 créditos de razonamiento)
Ejecuta el script auxiliar desde la raíz del repo:
```bash
python3 .agents/skills/bikerpro-chats/scripts/chats_cli.py fetch
```
Esto descarga `/panel` y agrupa las conversaciones en:
- `triviales`: saludos/despedidas cerradas (`gracias`, `ok`, `dale`), reacciones/stickers, rechazos ya despedidos (`no gracias`, `ya compré`), o consultas donde el bot ya dio la respuesta completa y espera datos.
- `razonar`: cotizaciones faltantes (ej. ciudades abreviadas como `2qbradas`, mayoristas 4+ unidades, dudas técnicas).
- `manuales`: posibles comprobantes de pago (`imagen: posible comprobante`), garantías/fallas posventa, reclamos de devolución o cambios de dirección en pedidos ya despachados.

### 2. Ejecutar limpieza + respuestas
1. Revisa los chats en `razonar` y redacta respuestas exactas según el catálogo BikerPro:
   - **V10 2X:** combo x2 `$99.900` + envío (Bogotá/Medellín/principales `$122.000`, intermedios `$125.000`).
   - **Q58 Max:** combo x2 `$129.900` + envío (`$143.000` Bogotá, `$152.000`–`$155.000` otras ciudades).
   - **Radios Baofeng BF-777S:** par (2 radios) `$99.000` **envío gratis** · Megacombo x4 `$169.000` · x6 `$229.000` · x8 `$310.000`.
   - **Impermeable 4 piezas:** 1 conjunto `$59.900` + envío (`$73.000`–`$85.000`) · 2 conjuntos `$110.000` + envío (`$135.000`–`$148.000`).
2. Envía respuestas y marca atendidos en lote usando un archivo JSON temporal:
   ```bash
   python3 .agents/skills/bikerpro-chats/scripts/chats_cli.py apply --plan /tmp/chats_plan.json
   ```
   Formato de `/tmp/chats_plan.json`:
   ```json
   {
     "reply_and_close": [{"to": "573...", "texto": "..."}],
     "close_only": ["573...", "CO...."]
   }
   ```
3. Si el panel mostraba tope de 60 chats, vuelve a correr `fetch` hasta que solo queden los `manuales`.

### 3. Regla de oro (qué NO cerrar nunca)
Nunca marques como atendido ni respondas automáticamente sin verificar:
- Chats con `posible comprobante de pago` (sin haber visto la imagen).
- Garantías, productos defectuosos o reclamos de envío/devolución.
- Solicitudes de cambio de dirección/oficina en pedidos ya comprados.
