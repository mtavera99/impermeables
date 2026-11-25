#!/usr/bin/env python3
"""Cliente de solo lectura/despacho para novedades de 99 Envíos 2.0 y BikerPro (sin Chrome)."""
import argparse
import http.cookiejar
import json
import os
import ssl
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone

API_99 = "https://api.99envios.co/api/v2"
BIKERPRO_URL = os.environ.get("BIKERPRO_BASE_URL", "https://bikerpro-bot.onrender.com").rstrip("/")
PANEL_TOKEN = os.environ.get("BIKERPRO_PANEL_TOKEN", "").strip()
SSL_CTX = ssl._create_unverified_context()


def build_99_opener():
    email = os.environ.get("N99_EMAIL", "").strip()
    password = os.environ.get("N99_PASSWORD", "").strip()
    if not email or not password:
        raise RuntimeError("Faltan variables de entorno N99_EMAIL y N99_PASSWORD.")

    cj = http.cookiejar.CookieJar()
    opener = urllib.request.build_opener(
        urllib.request.HTTPCookieProcessor(cj),
        urllib.request.HTTPSHandler(context=SSL_CTX),
    )
    req = urllib.request.Request(
        f"{API_99}/auth/login",
        data=json.dumps({"email": email, "password": password}).encode("utf-8"),
        headers={"Content-Type": "application/json", "Origin": "https://www.99envios.co"},
    )
    resp = json.loads(opener.open(req, timeout=20).read().decode("utf-8"))
    if not resp.get("success", True):
        raise RuntimeError(f"Login 99 Envíos falló: {resp}")
    return opener


def fetch_99_json(opener, path: str) -> dict:
    req = urllib.request.Request(
        f"{API_99}{path}",
        headers={"Origin": "https://www.99envios.co"},
    )
    return json.loads(opener.open(req, timeout=25).read().decode("utf-8"))


def cmd_fetch_v2(days: int):
    opener = build_99_opener()
    now = datetime.now(timezone.utc)
    start = (now - timedelta(days=days)).strftime("%Y-%m-%dT00:00:00Z")
    end = now.strftime("%Y-%m-%dT23:59:59.999999Z")
    qs_base = f"start_date={urllib.parse.quote(start)}&end_date={urllib.parse.quote(end)}"

    oficina = fetch_99_json(opener, f"/dashboard/shipments?{qs_base}&status=RECLAME_OFICINA&page=1&page_size=100").get("data", [])
    novedades = fetch_99_json(opener, f"/dashboard/shipments?{qs_base}&status=NOVEDAD&page=1&page_size=100").get("data", [])
    auto_raw = fetch_99_json(opener, "/shipping/shipments/novelties?status=ACTIVA")
    autogestion = auto_raw if isinstance(auto_raw, list) else (auto_raw.get("results") or auto_raw.get("data") or [])

    # Deduplicar por número de guía
    by_guia = {}
    for src_name, items in [("RECLAME_OFICINA", oficina), ("NOVEDAD", novedades), ("AUTOGESTION", autogestion)]:
        for it in items:
            guia = str(it.get("tracking_number") or it.get("guia") or it.get("guide_number") or "").strip()
            if not guia:
                continue
            if guia not in by_guia:
                by_guia[guia] = {
                    "guia": guia,
                    "fuente": src_name,
                    "destinatario": it.get("recipient_name") or it.get("nombre") or "",
                    "telefono": it.get("recipient_phone") or it.get("telefono") or "",
                    "ciudad": it.get("destination_city") or it.get("ciudad") or "",
                    "estado": it.get("status") or src_name,
                    "detalle": it.get("novelty_description") or it.get("description") or "",
                }

    print(json.dumps({
        "ok": True,
        "conteos": {
            "oficina": len(oficina),
            "novedades": len(novedades),
            "autogestion": len(autogestion),
            "unicas_por_guia": len(by_guia),
        },
        "items": list(by_guia.values()),
    }, indent=2, ensure_ascii=False))


def main():
    parser = argparse.ArgumentParser(description="BikerPro Novedades CLI (99 Envíos 2.0 API directa)")
    sub = parser.add_subparsers(dest="cmd", required=True)
    fv2 = sub.add_parser("fetch-v2", help="Extrae novedades de 99 Envíos 2.0 sin Chrome")
    fv2.add_argument("--days", type=int, default=30)
    args = parser.parse_args()

    if args.cmd == "fetch-v2":
        cmd_fetch_v2(args.days)


if __name__ == "__main__":
    main()
