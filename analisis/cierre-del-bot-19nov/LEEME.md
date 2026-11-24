# Embudo de cierre del bot (19-nov)

Scripts del análisis `ANALISIS-CIERRE-BOT-19NOV.md`. **No traen datos**: leen `chats-<producto>.json` de la carpeta
donde se corren, y esos archivos NO van al repo, porque tienen lo que escribieron los clientes.

Cómo conseguir los chats:

1. Generar un par de claves RSA fuera del repo (por ejemplo con `crypto.generateKeyPairSync` de Node).
2. Lanzar `mirar-el-panel.yml` con `ruta=/chats-de-producto`, `extra=producto=<id>&horas=96` y `clave=<pública en base64>`,
   una vez por producto (`impermeable`, `intercom_v10_2x`, `intercom_q58_max`, `radio_bf777s`).
3. Bajar el log, descifrar con la privada (AES-256-GCM, la clave va con RSA-OAEP-SHA256) y guardar `chats-<id>.json`.

Después: `python3 embudo.py`, `python3 fugas.py`, `python3 fallas.py` (este último usa Node para leer `bot/src/fletes.js`).
