---
name: bikerpro-novedades
description: >-
  Consolida novedades logísticas de 99 Envíos (Reclame en oficina, Novedad por gestionar,
  Autogestión y Panel Antiguo), las cruza con BikerPro y despacha los avisos por WhatsApp.
---

# Agente de Novedades Logísticas — BikerPro

## Objetivo
Extraer todas las novedades activas (Reclame en Oficina, Destinatario Ausente, Dirección Incompleta, Autogestión) de 99 Envíos, evitar duplicados por número de guía y enviar las notificaciones por WhatsApp a través de `/novedades/revisar` y `/novedades/enviar`.

## Reglas de Trabajo
1. **Deduplicación estricta:** Consolidar siempre por número de guía única (un cliente no debe recibir 2 avisos por la misma guía).
2. **Plazo claro en oficina:** Indicar siempre la fecha límite real de retiro en oficina de Interrapidísimo/Coordinadora (ej. 2 días hábiles adelante) para evitar devolución regional.
3. **Envío en lotes seguros:** Enviar máximo **20 guías por lote** a `POST /novedades/enviar` para evitar timeouts en Render.
4. **Casos especiales manuales:** Separar para gestión humana directa los casos de **incautación/retención (Seguro PLUS)**, clientes que exigen otra transportadora o paquetes ya en **devolución regional**.

## Endpoints de BikerPro
- `POST /novedades/revisar?token=$BIKERPRO_PANEL_TOKEN` — Crea plan de envío cruzando Excel/CSV o listado con la base de pedidos.
- `POST /novedades/enviar?token=$BIKERPRO_PANEL_TOKEN` — Dispara un lote `{ "id": "<plan_id>", "filas": [...] }`.
