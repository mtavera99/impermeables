#!/usr/bin/env python3
"""CLI auxiliar para extraer, clasificar y resolver chats pendientes de BikerPro."""
import argparse
import html as html_lib
import json
import os
import re
import ssl
import sys
import urllib.request

def load_dotenv():
    env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "..", ".env"))
    if os.path.isfile(env_path):
        for line in open(env_path, encoding="utf-8"):
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


load_dotenv()
BASE_URL = os.environ.get("BIKERPRO_BASE_URL", "https://bikerpro-bot.onrender.com").rstrip("/")
PANEL_TOKEN = os.environ.get("BIKERPRO_PANEL_TOKEN", "").strip()
SSL_CTX = ssl._create_unverified_context()


def require_token():
    if not PANEL_TOKEN:
        raise RuntimeError("Falta la variable de entorno BIKERPRO_PANEL_TOKEN.")

MANUAL_KEYWORDS = (
    "posible comprobante",
    "garantía",
    "garantia",
    "no le funciona",
    "no funciona",
    "devuelto",
    "devolucion",
    "devolución",
    "riesgo de devolución",
    "reclamo",
    "modifique",
    "cambiar dirección",
    "cambiar direccion",
)

TRIVIAL_CLIENT_MSGS = (
    "gracias",
    "muchas gracias",
    "ok",
    "okey",
    "vale",
    "listo",
    "dale",
    "no gracias",
    "no, gracias",
    "ya compré",
    "ya compre",
    "ya consegui",
    "ya conseguí",
    "reaction",
    "sticker",
)


def clean_html(s: str) -> str:
    s = re.sub(r"<br\s*/?>", " ", s)
    s = re.sub(r"<[^>]+>", " ", s)
    return re.sub(r"\s+", " ", html_lib.unescape(s)).strip()


def fetch_chats():
    url = f"{BASE_URL}/panel?token={PANEL_TOKEN}"
    raw = urllib.request.urlopen(url, context=SSL_CTX, timeout=25).read().decode("utf-8", errors="replace")
    convs = re.findall(r'<details class="conv[^"]*" id="c([^"]+)">(.*?)</details>', raw, re.S)

    triviales, razonar, manuales, posibles_ventas = [], [], [], []
    for cid, body in convs:
        sum_m = re.search(r"<summary>(.*?)</summary>", body, re.S)
        summary = clean_html(sum_m.group(1)) if sum_m else ""
        low_sum = summary.lower()
        if not any(tag in low_sum for tag in ("atender", "revisar", "comprobante")):
            continue

        pq_m = re.search(r'<div class="porque">(.*?)</div>', body, re.S)
        porque = clean_html(pq_m.group(1)) if pq_m else ""
        msgs_raw = re.findall(r'<div class="msg ([^"]+)">\s*<div class="txt">(.*?)</div>', body, re.S)
        msgs = [(cls.strip().upper(), clean_html(mh)) for cls, mh in msgs_raw[-6:]]

        item = {
            "id": cid,
            "summary": summary,
            "porque": porque,
            "ultimos": msgs[-3:],
        }

        blob = (porque + " " + " ".join(m[1] for m in msgs)).lower()
        last_cli = next((m[1].lower() for m in reversed(msgs) if m[0] == "CLI"), "")
        ya_compro = "compró" in low_sum or "compro" in low_sum
        tiene_datos_o_cuadro = (
            "confirmemos tu pedido" in blob
            or "lista para despacho" in blob
            or "queda confirmado" in blob
            or ("dirección" in blob and bool(re.search(r"3\d{9}", blob)))
        )

        if any(k in blob for k in MANUAL_KEYWORDS):
            manuales.append(item)
        elif not ya_compro and tiene_datos_o_cuadro:
            posibles_ventas.append(item)
        elif "revisar" in low_sum and "atender" not in low_sum:
            triviales.append(item)
        elif any(last_cli == t or last_cli.startswith(t + " ") for t in TRIVIAL_CLIENT_MSGS):
            triviales.append(item)
        else:
            razonar.append(item)

    out = {
        "total_pendientes_visibles": len(triviales) + len(razonar) + len(manuales) + len(posibles_ventas),
        "posibles_ventas_perdidas": posibles_ventas,
        "triviales": triviales,
        "razonar": razonar,
        "manuales": manuales,
    }
    print(json.dumps(out, indent=2, ensure_ascii=False))


def post_json(path: str, payload: dict) -> dict:
    url = f"{BASE_URL}{path}?token={PANEL_TOKEN}&json=1"
    data = json.dumps({**payload, "token": PANEL_TOKEN, "json": "1"}).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    try:
        return json.loads(urllib.request.urlopen(req, context=SSL_CTX, timeout=20).read().decode("utf-8"))
    except Exception as e:
        return {"ok": False, "error": str(e)}


def apply_plan(plan_path: str):
    plan = json.load(open(plan_path, encoding="utf-8"))
    replied, closed, recovered, errors = 0, 0, 0, []

    for order in plan.get("recover_orders", []):
        r_ord = post_json("/pedido-manual", order)
        if r_ord.get("ok"):
            recovered += 1
        else:
            errors.append({"pedido_manual": order.get("telefono_chat"), "res": r_ord})

    for entry in plan.get("reply_and_close", []):
        r1 = post_json("/responder", {"to": entry["to"], "texto": entry["texto"]})
        if r1.get("ok"):
            replied += 1
            r2 = post_json("/atendido", {"tel": entry["to"]})
            if r2.get("ok"):
                closed += 1
            else:
                errors.append({"atendido": entry["to"], "res": r2})
        else:
            errors.append({"responder": entry["to"], "res": r1})

    for tel in plan.get("close_only", []):
        r = post_json("/atendido", {"tel": tel})
        if r.get("ok"):
            closed += 1
        else:
            errors.append({"atendido": tel, "res": r})

    print(json.dumps({"recovered": recovered, "replied": replied, "closed": closed, "errors": errors}, indent=2, ensure_ascii=False))


def main():
    parser = argparse.ArgumentParser(description="BikerPro Chats CLI")
    sub = parser.add_subparsers(dest="cmd", required=True)
    sub.add_parser("fetch", help="Descarga y pre-clasifica chats pendientes")
    ap = sub.add_parser("apply", help="Aplica recuperaciones, respuestas y cierres desde un JSON")
    ap.add_argument("--plan", required=True, help="Ruta al JSON con recover_orders, reply_and_close y close_only")
    args = parser.parse_args()

    if args.cmd == "fetch":
        fetch_chats()
    elif args.cmd == "apply":
        apply_plan(args.plan)


if __name__ == "__main__":
    main()