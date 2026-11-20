import collections, statistics, re
exec(open("embudo.py").read().split("# solo chats")[0])
V = [c for c in CHATS if c["mensajes"] and 24*3600e3 < ahora - c["mensajes"][0]["at"] < 90*3600e3]
H = 3600e3

def U(c): return [m for m in c["mensajes"] if m["role"] == "user"]
def A(c): return [m for m in c["mensajes"] if m["role"] == "assistant"]

print("=== A. LOS QUE NO CONTESTAN (etapa 0)")
e0 = [c for c in V if etapa(c) == 0]
print("n", len(e0), "de", len(V))
sinResp = [c for c in e0 if not A(c)]
print("  sin NINGUNA respuesta del bot:", len(sinResp))
prim = collections.Counter(plano(U(c)[0]["content"])[:45] if U(c) else "(sin user)" for c in e0)
print("  primer mensaje del cliente:", prim.most_common(8))
# primer respuesta: largo y si termina en pregunta, contra los que sí contestan
def prim_bot(c):
    a = A(c)
    return a[0]["content"] if a else ""
for nombre, grupo in [("no contestan", e0), ("sí contestan", [c for c in V if etapa(c) >= 1])]:
    L = [len(prim_bot(c)) for c in grupo if prim_bot(c)]
    preg = sum(1 for c in grupo if prim_bot(c).rstrip().rstrip("🏍️👇😊🙌📦👍✅ ").endswith("?")) / max(1, len(grupo))
    nmsgs = [sum(1 for m in c["mensajes"][:4] if m["role"] == "assistant") for c in grupo]
    print(f"  {nombre}: largo 1ª respuesta mediana {statistics.median(L):.0f} chars · termina en pregunta {preg*100:.0f}% · msgs del bot en los primeros 4 {statistics.mean(nmsgs):.2f}")

# por producto: largo y tasa de respuesta
for p in ["impermeable", "intercom_v10_2x", "intercom_q58_max", "radio_bf777s"]:
    g = [c for c in V if c["_prod"] == p]
    resp = sum(etapa(c) >= 1 for c in g) / len(g)
    L = statistics.median([len(prim_bot(c)) for c in g if prim_bot(c)])
    print(f"  {p}: contestan {resp*100:.0f}% · largo 1ª respuesta {L:.0f}")

print("\n=== B. LATENCIA DEL BOT (segundos desde el mensaje del cliente)")
lat = []
for c in V:
    ms = c["mensajes"]
    for i in range(1, len(ms)):
        if ms[i]["role"] == "assistant" and ms[i-1]["role"] == "user" and ms[i].get("at") and ms[i-1].get("at"):
            lat.append((ms[i]["at"] - ms[i-1]["at"]) / 1000)
lat.sort()
print("  n", len(lat), "mediana", lat[len(lat)//2], "p90", lat[int(len(lat)*.9)], "p99", lat[int(len(lat)*.99)], ">5 min", sum(x > 300 for x in lat))

print("\n=== C. DÓNDE SE MUERE: quién habló último y qué dijo el bot")
muertos = [c for c in V if 1 <= etapa(c) <= 4]
ult = collections.Counter("bot" if c["mensajes"][-1]["role"] == "assistant" else "cliente" for c in muertos)
print("  último mensaje:", ult)
# chats donde el cliente habló último y no hubo respuesta = bot no contestó
sinContestar = [c for c in muertos if c["mensajes"][-1]["role"] == "user"]
print("  cliente habló último (¿pausado / humano?):", len(sinContestar), "pausados:", sum(c["pausado"] for c in sinContestar))
for c in sinContestar[:0]: pass

def tipo_bot(t):
    t = plano(t)
    if RE_CUADRO.search(t): return "cuadro de confirmación"
    if re.search(r"(nombre completo|direccion|celular|barrio)", t): return "pide datos de envío"
    if RE_TOTAL.search(t): return "da el total"
    if re.search(r"(ciudad|municipio|a donde|para donde|desde que ciudad)", t): return "pregunta la ciudad"
    if re.search(r"(talla|color)", t): return "pregunta talla/color"
    if re.search(r"(asesor|en un momento|te escribo)", t): return "pasa a asesor / promete escribir"
    if re.search(r"(seguimos|sigues interesad|te quedo alguna duda|aun te interesa|todavia te interesa|recuerda que)", t): return "seguimiento"
    return "otro"

tb = collections.Counter(tipo_bot(c["mensajes"][-1]["content"]) for c in muertos if c["mensajes"][-1]["role"] == "assistant")
print("  último mensaje del bot (chats que murieron):")
for k, v in tb.most_common(): print(f"    {v:4d}  {k}")

print("\n=== D. OBJECIONES de los clientes, por resultado")
def objs(c):
    s = set()
    for m in U(c)[1:]:
        t = plano(m["content"])
        for k, r in OBJ.items():
            if r.search(t): s.add(k)
    return s
for nombre, grupo in [("compraron (5)", [c for c in V if etapa(c) == 5]),
                      ("murieron en 1-4", muertos)]:
    cnt = collections.Counter(o for c in grupo for o in objs(c))
    print(f"  {nombre} n={len(grupo)}: " + " · ".join(f"{k} {v/len(grupo)*100:.0f}%" for k, v in cnt.most_common()))

print("\n=== E. SEGUIMIENTO: mensajes del bot después de >12 h de silencio")
seg = 0; revive = 0; compra = 0
for c in V:
    ms = c["mensajes"]
    for i in range(1, len(ms)):
        if ms[i]["role"] == "assistant" and ms[i]["at"] - ms[i-1]["at"] > 12*H:
            seg += 1
            if any(m["role"] == "user" for m in ms[i+1:]): revive += 1
            if etapa(c) == 5: compra += 1
            break
print(f"  chats con un toque tardío: {seg} · el cliente volvió a escribir: {revive} · terminaron confirmando: {compra}")
murio_bot = [c for c in muertos if c["mensajes"][-1]["role"] == "assistant"]
sin_toque = [c for c in murio_bot if not any(ms["role"] == "assistant" and ms["at"] - prev["at"] > 12*H for prev, ms in zip(c["mensajes"], c["mensajes"][1:]))]
print(f"  chats muertos en 2-4 sin ningún toque tardío: {sum(etapa(c)>=2 for c in sin_toque)} de {sum(etapa(c)>=2 for c in murio_bot)}")

print("\n=== F. LARGO DE LOS MENSAJES DEL BOT y preguntas por mensaje")
for nombre, grupo in [("compraron", [c for c in V if etapa(c) == 5]), ("murieron 2-4", [c for c in V if 2 <= etapa(c) <= 4])]:
    L = [len(m["content"]) for c in grupo for m in A(c)]
    q = [m["content"].count("?") for c in grupo for m in A(c)]
    nb = [len(A(c)) for c in grupo]
    print(f"  {nombre}: largo mediano {statistics.median(L):.0f} · p90 {sorted(L)[int(len(L)*.9)]} · '?' por mensaje {statistics.mean(q):.2f} · msgs del bot por chat {statistics.median(nb)}")

print("\n=== G. MENÚ Y DOS PREGUNTAS: mensajes con 2+ signos '?'")
dos = sum(1 for c in V for m in A(c) if m["content"].count("?") >= 2)
print("  ", dos, "de", sum(len(A(c)) for c in V))

print("\n=== H. CHATS PAUSADOS (pasados a humano) y resultado")
pz = [c for c in V if c["pausado"]]
print("  pausados", len(pz), "confirmaron", sum(etapa(c) == 5 for c in pz), "el humano escribió en", sum(any(m["por"] == "humano" for m in c["mensajes"]) for c in pz))
