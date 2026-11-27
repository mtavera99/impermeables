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


def parse_total_cop(text: str) -> int:
    m = re.search(r"\$\s*([\d\.]+)", text or "")
    if not m:
        return 0
    digits = re.sub(r"\D", "", m.group(1))
    return int(digits) if digits else 0


def detect_chat_mismatch(producto: str, total: str, chat_msgs: list) -> list:
    """Detecta contradicciones entre lo guardado en el panel y lo acordado en el chat."""
    flags = []
    panel_total = parse_total_cop(total)
    panel_x1 = bool(re.search(r"[×x]\s*1\b", producto or "", re.I))
    full_txt = " \n ".join(m[1] for m in chat_msgs)

    # 1. Buscar totales cotizados/confirmados en el chat (del más reciente al más antiguo)
    quoted_totals = []
    for who, msg in chat_msgs:
        if who != "BOT":
            continue
        for pat in (
            r"Total a pagar al recibir:\s*\$\s*([\d\.]+)",
            r"(?:te queda[n]? en|Pagas los|total[^$]{0,20})\$\s*([\d\.]+)",
        ):
            for m in re.finditer(pat, msg, re.I):
                val = int(re.sub(r"\D", "", m.group(1)))
                if val >= 20000:
                    quoted_totals.append(val)
    if panel_total and quoted_totals:
        last_quoted = quoted_totals[-1]
        if abs(last_quoted - panel_total) >= 5000:
            flags.append(f"PRECIO CHAT (${last_quoted:,}) != PANEL (${panel_total:,})")

    # 2. Panel dice x1 pero el chat habla de combo / x2 / los dos
    if panel_x1 and re.search(r"\b(combo|los dos|x\s*2|×\s*2|2 intercomunicadores)\b", full_txt, re.I):
        # Confirmar que no sea solo una pregunta descartada: si además hay precio > panel_total o mención reciente
        if any(q > panel_total for q in quoted_totals) or re.search(r"Producto:\s*[^\n]*\(x\s*2\)", full_txt, re.I):
            flags.append("COMBO/X2 EN CHAT vs × 1 EN PANEL")

    # 3. Cancelación o aplazamiento reciente en últimos 5 mensajes del cliente
    recent_cli = " ".join(m[1] for m in chat_msgs[-6:] if m[0] == "CLI")
    if re.search(r"\b(cancel|no lo env|aplaz|para el lunes|otro d[ií]a|ya no)\b", recent_cli, re.I):
        flags.append("POSIBLE CANCELACIÓN/APLAZAMIENTO EN CHAT")

    return flags


def cmd_audit(full_chats: bool = False):
    require_token()
    from concurrent.futures import ThreadPoolExecutor
    raw = urllib.request.urlopen(f"{BASE_URL}/panel?token={PANEL_TOKEN}", context=SSL_CTX, timeout=25).read().decode("utf-8", errors="replace")
    m = re.search(r'<h2 id="pendientes">.*?<table>(.*?)</table>', raw, re.S)
    if not m:
        print(json.dumps({"ok": False, "error": "Tabla pendientes no encontrada"}))
        return

    rows = re.findall(r"<tr[^>]*>(.*?)</tr>", m.group(1), re.S)
    parsed_items, phones = [], []
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

        parsed_items.append({
            "idx": idx,
            "fecha": fecha,
            "cliente": cliente,
            "direccion": direccion,
            "producto": producto,
            "total": total,
            "chat_url": chat_url,
            "ciudad_homonima": is_homonym,
            "_has_flag": has_flag,
        })

    # Descargar todos los chats en paralelo cuando --full-chats está activo para cruzar precio/combo/cancelaciones
    if full_chats:
        urls = [it["chat_url"] for it in parsed_items]
        with ThreadPoolExecutor(max_workers=10) as ex:
            chats = list(ex.map(lambda u: fetch_full_chat(u) if u else [], urls))
        for it, ch in zip(parsed_items, chats):
            it["_chat"] = ch
            it["alertas_cruce_chat"] = detect_chat_mismatch(it["producto"], it["total"], ch)
    else:
        for it in parsed_items:
            it["_chat"] = []
            it["alertas_cruce_chat"] = []

    limpios, alertas = [], []
    for it in parsed_items:
        has_flag = it.pop("_has_flag")
        ch = it.pop("_chat")
        cruce = it.get("alertas_cruce_chat") or []
        if has_flag or it["ciudad_homonima"] or cruce:
            if full_chats and ch:
                it["chat_completo"] = ch
            alertas.append(it)
        else:
            it.pop("alertas_cruce_chat", None)
            limpios.append(it)

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


def cmd_pack_carta(pdf_path, out_path):
    """Agrupa un PDF de guías individuales (1 por página) en hojas Carta para ahorrar papel al imprimir."""
    import fitz
    src = fitz.open(pdf_path)
    out = fitz.open()
    inter_indices = [i for i, p in enumerate(src) if p.rect.height > 400]
    coord_indices = [i for i, p in enumerate(src) if p.rect.height <= 400]

    # Interrapidísimo: 2 por hoja Carta horizontal (792x612)
    for i in range(0, len(inter_indices), 2):
        page = out.new_page(width=792, height=612)
        p1 = src[inter_indices[i]]
        clip1 = fitz.Rect(0, 0, min(385, p1.rect.width), min(615, p1.rect.height))
        page.show_pdf_page(fitz.Rect(6, 6, 390, 606), src, inter_indices[i], clip=clip1)
        if i + 1 < len(inter_indices):
            p2 = src[inter_indices[i + 1]]
            clip2 = fitz.Rect(0, 0, min(385, p2.rect.width), min(615, p2.rect.height))
            page.show_pdf_page(fitz.Rect(402, 6, 786, 606), src, inter_indices[i + 1], clip=clip2)

    # Coordinadora: 4 por hoja Carta vertical (612x792)
    for i in range(0, len(coord_indices), 4):
        page = out.new_page(width=612, height=792)
        for slot in range(4):
            if i + slot >= len(coord_indices):
                break
            idx = coord_indices[i + slot]
            y0 = 18 + slot * 190
            page.show_pdf_page(fitz.Rect(45, y0, 567, y0 + 185), src, idx)

    out.save(out_path)
    print(json.dumps({"ok": True, "out": out_path, "input_pages": len(src), "carta_pages": len(out)}, indent=2))


def cmd_dispatch_pdf(pdf_path, batch_size):
    data = open(pdf_path, "rb").read()

    def revisar():
        req = urllib.request.Request(
            f"{BASE_URL}/guias/revisar?token={PANEL_TOKEN}",
            data=data,
            headers={"Content-Type": "application/pdf"},
        )
        return json.loads(urllib.request.urlopen(req, context=SSL_CTX, timeout=60).read().decode("utf-8"))

    rev = revisar()
    if not rev.get("ok"):
        print(json.dumps({"ok": False, "step": "revisar", "res": rev}, indent=2, ensure_ascii=False))
        return

    filas = rev.get("filas", [])
    enviables_total = [f["pagina"] for f in filas if f.get("enviar")]
    no_env = [
        {"pagina": f["pagina"], "guia": f.get("guia"), "motivo": f.get("motivo")}
        for f in filas if not f.get("enviar")
    ]

    # /guias/enviar invalida el plan_id tras la primera llamada; por cada lote se pide plan_id fresco.
    sent_total, failed_total = 0, []
    cur_rev = rev
    for i in range(0, len(enviables_total), batch_size):
        if i > 0:
            cur_rev = revisar()
            if not cur_rev.get("ok"):
                break
        pendientes = [f["pagina"] for f in cur_rev.get("filas", []) if f.get("enviar")]
        chunk = pendientes[:batch_size]
        if not chunk:
            break
        req_e = urllib.request.Request(
            f"{BASE_URL}/guias/enviar?token={PANEL_TOKEN}",
            data=json.dumps({"id": cur_rev["id"], "paginas": chunk}).encode("utf-8"),
            headers={"Content-Type": "application/json"},
        )
        res_e = json.loads(urllib.request.urlopen(req_e, context=SSL_CTX, timeout=240).read().decode("utf-8"))
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
        "enviables": len(enviables_total),
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
    pc = sub.add_parser("pack-carta", help="Agrupa PDF individual (1 guía/pág) en hojas Carta para imprimir")
    pc.add_argument("--pdf", required=True)
    pc.add_argument("--out", required=True)
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
    elif args.cmd == "pack-carta":
        cmd_pack_carta(args.pdf, args.out)
    elif args.cmd == "dispatch-pdf":
        cmd_dispatch_pdf(args.pdf, args.batch_size)
    elif args.cmd == "send-doc":
        cmd_send_doc(args.pdf, args.to, args.caption)


if __name__ == "__main__":
    main()
