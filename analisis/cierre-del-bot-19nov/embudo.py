import json, glob, re, collections, statistics, unicodedata, time

def plano(s):
    s = unicodedata.normalize("NFD", str(s or "")).encode("ascii", "ignore").decode().lower()
    return s

CHATS = []
for f in sorted(glob.glob("chats-*.json")):
    for c in json.load(open(f))["chats"]:
        c["_prod"] = f[6:-5]
        CHATS.append(c)

ahora = max(m["at"] for c in CHATS for m in c["mensajes"] if m.get("at"))

RE_TOTAL = re.compile(r"(en total|total (a pagar|de|seria|es)|te queda(n)? en \$|quedan? en \$)")
RE_CUADRO = re.compile(r"confirmemos tu pedido|si confirmo")
RE_CONFIRMA = re.compile(r"^\W*(si|sí)?\W*confirmo\b|^\W*si\W*confirmo|confirmo\W*$")
RE_SI = re.compile(r"^\W*(si+|ok|okey|listo|dale|confirmo|confirmado|de una|claro|perfecto|esta bien)\b")
RE_PIDE_DATOS = re.compile(r"(nombre completo|direccion|tu nombre|celular|barrio)")

OBJ = {
    "precio": r"\b(caro|costoso|muy cara|carisimo|mas barato|descuento|rebaja|precio (es )?alto|menos)\b",
    "envio": r"\b(envio (muy|tan|es)? ?caro|cobran (el )?envio|envio gratis|cuanto (vale|cuesta) el envio|el envio)\b",
    "confianza": r"\b(estafa|confia|confiable|seguro que|garantia|tienda fisica|local|ver(lo)? en persona|real|enga)\w*",
    "pensarlo": r"\b(lo pienso|lo voy a pensar|despues|luego te|mas tarde|otro dia|quincena|cuando me paguen|mañana te|manana te|ahorita no|por ahora no)\b",
    "plata": r"\b(no tengo (plata|dinero)|sin plata|no me alcanza|no tengo como)\b",
    "pago": r"\b(nequi|daviplata|transferencia|tarjeta|cuotas|addi|sistecredito|credito|anticipado|bre-?b|pse)\b",
    "tecnico": r"\b(alcance|bateria|metros|bluetooth|resiste|agua|impermeable|talla|medida|compatible|casco|funciona|pantalla|carga)\b",
    "tiempo_entrega": r"\b(cuanto (se )?demora|cuando llega|dias|para hoy|para manana|hoy mismo)\b",
    "no_interes": r"\b(no gracias|no me interesa|no quiero|ya no|solo preguntaba|solo era|no por ahora)\b",
    "humano": r"\b(asesor|persona|humano|alguien real|eres un bot|robot|eres bot)\b",
    "foto_video": r"\b(foto|fotos|video|imagen)\b",
    "ubicacion": r"\b(donde (estan|quedan|queda)|direccion de ustedes|recoger|pasar por)\b",
}
OBJ = {k: re.compile(v) for k, v in OBJ.items()}


def etapa(c):
    ms = c["mensajes"]
    us = [m for m in ms if m["role"] == "user"]
    asis = [m for m in ms if m["role"] == "assistant"]
    tA = [plano(m["content"]) for m in asis]
    tU = [plano(m["content"]) for m in us]
    e = 0
    if len(us) >= 2: e = 1
    if any(RE_TOTAL.search(t) for t in tA): e = max(e, 2)
    if any(RE_PIDE_DATOS.search(t) for t in tA) and e >= 2: e = max(e, 3)
    if any(RE_CUADRO.search(t) for t in tA): e = max(e, 4)
    for i,m in enumerate(ms):
        if m["role"]=="assistant" and RE_CUADRO.search(plano(m["content"])):
            sig=[x for x in ms[i+1:] if x["role"]=="user"][:2]
            if any(RE_SI.search(plano(x["content"]).strip()) for x in sig): e = 5; break
    return e

NOMBRES = {0: "0 solo el mensaje del anuncio", 1: "1 conversó", 2: "2 recibió el total", 3: "3 se le pidieron datos",
           4: "4 vio el cuadro de confirmación", 5: "5 confirmó"}

# solo chats que arrancaron hace más de 24 h (los nuevos todavía pueden cerrar)
viejos = [c for c in CHATS if c["mensajes"] and 24*3600e3 < ahora - c["mensajes"][0]["at"] < 90*3600e3]
print("chats", len(CHATS), "con más de 24 h", len(viejos))

for prod in ["TODOS", "impermeable", "intercom_v10_2x", "intercom_q58_max", "radio_bf777s"]:
    cs = [c for c in viejos if prod == "TODOS" or c["_prod"] == prod]
    et = collections.Counter(etapa(c) for c in cs)
    n = len(cs)
    acum = [sum(v for k, v in et.items() if k >= i) for i in range(6)]
    print(f"\n== {prod} n={n}")
    for i in range(6):
        paso = (acum[i] / acum[i - 1] * 100) if i and acum[i - 1] else 100
        print(f"  {NOMBRES[i]:42s} llegan {acum[i]:5d} ({acum[i]/n*100:5.1f}%)  paso {paso:5.1f}%")
