# Agentes Operativos — BikerPro (`mtavera99/impermeables`)

Para ahorrar contexto y créditos, **no explores ni re-escribas scripts desde cero** para las tareas diarias. Usa directamente los Skills de `.agents/skills/`:

1. **Chats pendientes y ventas (`bikerpro-chats`):**
   - Leer `.agents/skills/bikerpro-chats/SKILL.md`
   - Ejecutar primero `python3 .agents/skills/bikerpro-chats/scripts/chats_cli.py fetch`
2. **Auditoría de pedidos, PDFs y envío de guías (`bikerpro-despacho`):**
   - Leer `.agents/skills/bikerpro-despacho/SKILL.md`
   - Ejecutar primero `python3 .agents/skills/bikerpro-despacho/scripts/despacho_cli.py audit`
3. **Novedades logísticas 99 Envíos (`bikerpro-novedades`):**
   - Leer `.agents/skills/bikerpro-novedades/SKILL.md`
   - Ejecutar `python3 .agents/skills/bikerpro-novedades/scripts/novedades_cli.py fetch-v2 --days 30`

## Variables de entorno requeridas (no guardar secretos en Git)
- `BIKERPRO_PANEL_TOKEN`: Token del panel de BikerPro en Render.
- `N99_TOKEN` (o `N99_EMAIL`, `N99_PASSWORD`, `N99_2FA_CODE`): Acceso a `api.99envios.co`.
