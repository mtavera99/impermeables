#!/usr/bin/env python3
"""CLI auxiliar para auditoría de pedidos, división de PDFs y envío de guías en BikerPro."""
import argparse
import html as html_lib
import json
import os
import re
import ssl
import urllib.request
from collections import Counter

BASE_URL = os.environ.get("BIKERPRO_BASE_URL", "https://bikerpro-bot.onrender.com").rstrip("/")
PANEL_TOKEN = os.environ.get("BIKERPRO_PANEL_TOKEN", "").strip()
SSL_CTX = ssl._create_unverified_context()


def require_token():
    if not PANEL_TOKEN:
        raise RuntimeError("Falta la variable de entorno BIKERPRO_PANEL_TOKEN.")


HOMONYM_CITIES = (
    "restrepo", "la unión", "la union", "ciudad bolívar", "ciudad bolivar",
    "rionegro", "granada", "san antonio", "san bernardo", "santa rosa", "armenia",
)


def clean(s: str) -> str:
    s = re.sub(r"<br\s*/?>", " | ", s)
    s = re.sub(r"<[^>]+>", " ", s)
    return re.sub(r"\s+", " ", html_lib.unescape(s)).strip()


def fetch_full_chat(chat_url: str):
    if not chat_url:
        return []
    full_url = chat_url if chat_url.startswith("http") else f"{BASE_URL}{chat_url}"
    html = urllib.request.urlopen(full_url, context=SSL_CTX, timeout=20).read().decode("utf-8", errors="replace")
    msgs = re.findall(r'<div class="msg ([^"]+)">\s*<div class="txt">(.*?)</div>', html, re.S)
    if not msgs:
        msgs = re.findall(r'<div class="msg ([^"]+)">(.*?)</div>\s*</div>', html, re.S)
    out = []
    for cls, mhtml in msgs:
        who = "BOT" if ("out" in cls or "bot" in cls or "yo" in cls) else "CLI"
        out.append([who, clean(mhtml)])
    return out


def cmd_audit(full_chats: bool = False):
    require_token()
    raw = urllib.request.urlopen(f"{BASE_URL}/panel?token={PANEL_TOKEN}", context=SSL_CTX, timeout=25).read().decode("utf-8", errors="replace")
    m = re.search(r'<h2 id="pendientes">.*?<table>(.*?)</table>', raw, re.S)
    if not m:
        print(json.dumps({"ok": False, "error": "Tabla pendientes no encontrada"}))
        return

    rows = re.findall(r"<tr[^>]*>(.*?)</tr>", m.group(1), re.S)
    limpios, alertas, phones = [], [], []
    for idx, r in enumerate(rows[1:], 1):
        tds = re.findall(r"<td[^>]*>(.*?)</td>", r, re.S)
        if len(tds) < 6:
            continue
        fecha = clean(tds[0])
        cliente = clean(tds[1])
        direccion = clean(tds[2])
        producto = clean(tds[3])
        total = clean(tds[4])
        chat_m = re.search(r'href="(/chat\?[^"]+)"', tds[1])
        chat_url = html_lib.unescape(chat_m.group(1)) if chat_m else ""
        ph_m = re.search(r"(3\d{9})", cliente)
        if ph_m:
            phones.append(ph_m.group(1))

        dir_low = direccion.lower()
        is_homonym = any(h in dir_low for h in HOMONYM_CITIES)
        has_flag = "🔴" in cliente or "🔴" in direccion or "📦" in cliente or "💸" in cliente

        item = {
            "idx": idx,
            "fecha": fecha,
            "cliente": cliente,
            "direccion": direccion,
            "producto": producto,
            "total": total,
            "chat_url": chat_url,
            "ciudad_homonima": is_homonym,
        }
        if has_flag or is_homonym:
            if full_chats and chat_url:
                item["chat_completo"] = fetch_full_chat(chat_url)
            alertas.append(item)
        else:
            limpios.append(item)

    dups = [k for k, v in Counter(phones).items() if v > 1]
    print(json.dumps({
        "total": len(limpios) + len(alertas),
        "duplicados_telefono": dups,
        "limpios": limpios,
        "con_alertas": alertas,
    }, indent=2, ensure_ascii=False))


def cmd_split_pdf(inputs, out_path):
    import fitz

    out = fitz.open()
    for pdf_path in inputs:
        doc = fitz.open(pdf_path)
        for p_idx, page in enumerate(doc):
            txt = page.get_text()
            imgs = len(page.get_images())
            is_coord = "GUIA:" in txt.upper() or "COORDINADORA" in txt.upper() or "64532" in txt
            if is_coord and "FECHA CREACIÓN PRE-ENVÍO" not in txt.upper():
                slots = 3 if imgs >= 8 else 2
                for slot in range(slots):
                    clip = fitz.Rect(0, slot * 264, 612, (slot + 1) * 264)
                    np = out.new_page(width=612, height=264)
                    np.show_pdf_page(fitz.Rect(0, 0, 612, 264), doc, p_idx, clip=clip)
            else:
                for slot in range(2):
                    clip = fitz.Rect(0, slot * 396, 612, (slot + 1) * 396)
                    np = out.new_page(width=612, height=396)
                    np.show_pdf_page(fitz.Rect(0, 0, 612, 396), doc, p_idx, clip=clip)

    out.save(out_path)
    short_pages = [i for i, p in enumerate(out, 1) if len(p.get_text().strip()) < 40]
    print(json.dumps({"ok": True, "out": out_path, "pages": len(out), "short_pages": short_pages}, indent=2))


def cmd_dispatch_pdf(pdf_path, batch_size):
    data = open(pdf_path, "rb").read()
    req = urllib.request.Request(
        f"{BASE_URL}/guias/revisar?token={PANEL_TOKEN}",
        data=data,
        headers={"Content-Type": "application/pdf"},
    )
    rev = json.loads(urllib.request.urlopen(req, context=SSL_CTX, timeout=60).read().decode("utf-8"))
    if not rev.get("ok"):
        print(json.dumps({"ok": False, "step": "revisar", "res": rev}, indent=2, ensure_ascii=False))
        return

    plan_id = rev["id"]
    filas = rev.get("filas", [])
    enviables = [f["pagina"] for f in filas if f.get("enviar")]
    no_env = [
        {"pagina": f["pagina"], "guia": f.get("guia"), "motivo": f.get("motivo")}
        for f in filas if not f.get("enviar")
    ]

    sent_total, failed_total = 0, []
    for i in range(0, len(enviables), batch_size):
        chunk = enviables[i:i + batch_size]
        req_e = urllib.request.Request(
            f"{BASE_URL}/guias/enviar?token={PANEL_TOKEN}",
            data=json.dumps({"id": plan_id, "paginas": chunk}).encode("utf-8"),
            headers={"Content-Type": "application/json"},
        )
        res_e = json.loads(urllib.request.urlopen(req_e, context=SSL_CTX, timeout=180).read().decode("utf-8"))
        sent_total += res_e.get("enviadas", 0)
        for r in res_e.get("resultados", []):
            if not r.get("ok"):
                failed_total.append(r)

    # Conciliar panel
    req_c = urllib.request.Request(
        f"{BASE_URL}/conciliar-guias?token={PANEL_TOKEN}",
        data=json.dumps({"token": PANEL_TOKEN}).encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )
    urllib.request.urlopen(req_c, context=SSL_CTX, timeout=60).read()

    print(json.dumps({
        "ok": True,
        "total_paginas": len(filas),
        "enviables": len(enviables),
        "enviadas": sent_total,
        "fallidas": failed_total,
        "no_emparejadas": no_env,
    }, indent=2, ensure_ascii=False))


def cmd_send_doc(pdf_path, to_numbers, caption):
    import urllib.parse
    require_token()
    targets = [n.strip() for n in (to_numbers or []) if n.strip()]
    if not targets:
        env_phones = os.environ.get("BIKERPRO_PRINT_PHONES", "").strip()
        targets = [p.strip() for p in env_phones.split(",") if p.strip()]
    if not targets:
        raise RuntimeError("Faltan números destino (--to o variable BIKERPRO_PRINT_PHONES).")
    data = open(pdf_path, "rb").read()
    filename = os.path.basename(pdf_path)
    qs = urllib.parse.urlencode({
        "token": PANEL_TOKEN,
        "to": ",".join(targets),
        "filename": filename,
        "caption": caption,
    })
    req = urllib.request.Request(
        f"{BASE_URL}/enviar-documento?{qs}",
        data=data,
        headers={"Content-Type": "application/pdf"},
    )
    res = json.loads(urllib.request.urlopen(req, context=SSL_CTX, timeout=60).read().decode("utf-8"))
    print(json.dumps(res, indent=2, ensure_ascii=False))


def main():
    parser = argparse.ArgumentParser(description="BikerPro Despacho CLI")
    sub = parser.add_subparsers(dest="cmd", required=True)
    au = sub.add_parser("audit", help="Audita pedidos pendientes")
    au.add_argument("--full-chats", action="store_true", help="Descarga el historial completo de chats con alertas o ciudades homónimas")
    sp = sub.add_parser("split-pdf", help="Recorta PDFs multi-etiqueta")
    sp.add_argument("--inputs", nargs="+", required=True)
    sp.add_argument("--out", required=True)
    dp = sub.add_parser("dispatch-pdf", help="Sube PDF dividido, envía por WhatsApp y concilia")
    dp.add_argument("--pdf", required=True)
    dp.add_argument("--batch-size", type=int, default=20)
    sd = sub.add_parser("send-doc", help="Envía un PDF original/manifiesto a uno o más WhatsApp")
    sd.add_argument("--pdf", required=True)
    sd.add_argument("--to", nargs="*", default=[], help="Números destino (opcional si existe BIKERPRO_PRINT_PHONES)")
    sd.add_argument("--caption", default="Guías y manifiesto para impresión 📦")
    args = parser.parse_args()

    if args.cmd == "audit":
        cmd_audit(full_chats=args.full_chats)
    elif args.cmd == "split-pdf":
        cmd_split_pdf(args.inputs, args.out)
    elif args.cmd == "dispatch-pdf":
        cmd_dispatch_pdf(args.pdf, args.batch_size)
    elif args.cmd == "send-doc":
        cmd_send_doc(args.pdf, args.to, args.caption)


if __name__ == "__main__":
    main()
