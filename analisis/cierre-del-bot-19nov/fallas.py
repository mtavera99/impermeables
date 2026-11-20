import collections, re, sys
sys.path.insert(0, ".")
exec(open("embudo.py").read().split("# solo chats")[0])
V = [c for c in CHATS if c["mensajes"] and 24*3600e3 < ahora - c["mensajes"][0]["at"] < 90*3600e3]
def U(c): return [m for m in c["mensajes"] if m["role"] == "user"]
def A(c): return [m for m in c["mensajes"] if m["role"] == "assistant"]
compro = lambda c: etapa(c) == 5

# municipios conocidos del tarifario
import json, subprocess
mun = set(json.loads(subprocess.check_output(["node", "-e",
  "const f=require('/projects/sandbox/impermeables/bot/src/fletes.js');"
  "const n=s=>String(s).normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase().trim();"
  "const out=new Set();"
  "for (const k of Object.keys(f)) { const v=f[k]; if (v && typeof v==='object' && !Array.isArray(v)) for (const kk of Object.keys(v)) if (kk.length>2 && /^[a-zA-ZÁÉÍÓÚáéíóúñÑ .'-]+$/.test(kk)) out.add(n(kk)); }"
  "console.log(JSON.stringify([...out]))"])))
print("municipios en fletes.js:", len(mun))

print("\n=== 1. CIUDAD MAL LEÍDA: 'envío a X' / 'a X' con X raro")
RE_DEST = re.compile(r"(?:envio (?:gratis )?a|envio hasta|despacho a|a) ([a-z ]{3,30}?)(?: son| tiene| es|,|\.| y | te |$)")
raros = collections.Counter(); chats_raros = set()
for c in V:
    for m in A(c):
        t = plano(m["content"])
        if not re.search(r"(en total|envio gratis|de envio)", t): continue
        for x in re.findall(r"(?:de envio a|envio gratis a|envio a) ([a-z][a-z ]{2,28}?)(?=[,.\)!]| y | te | son | tiene | pagas| para|$)", t):
            x = x.strip()
            if x in ("tu ciudad", "todo el pais", "domicilio", "tu casa", "tu puerta", "la puerta"): continue
            if x not in mun and x.split()[0] not in mun:
                raros[x] += 1; chats_raros.add(c["tel"] + c["_prod"])
print("  chats con un destino que no está en el tarifario:", len(chats_raros))
print("  ", raros.most_common(40))

print("\n=== 2. DÓNDE DICE EL BOT QUE ESTÁ EL NEGOCIO")
ub = collections.Counter()
for c in V:
    for m in A(c):
        for x in re.findall(r"(?:estamos(?: ubicados)? en|somos de|despachamos desde|nuestra bodega (?:esta|queda) en(?: la)?) ([a-z]+)", plano(m["content"])):
            ub[x] += 1
print("  ", ub.most_common(10))

print("\n=== 3. 'LO PIENSO / QUINCENA / OTRA SEMANA': qué pasa")
RE_APLAZA = re.compile(r"\b(lo (voy a )?pienso|lo voy a pensar|pensarlo|quincena|me pagan|cuando me paguen|otra semana|proxima semana|de hoy en ocho|fin de mes|apart|despues te (escribo|aviso|confirmo)|yo te aviso|te confirmo|luego te|mas adelante|ahorita no|cuando tenga)\b")
ap = [c for c in V if any(RE_APLAZA.search(plano(m["content"])) for m in U(c))]
plata = [c for c in ap if any(re.search(r"(quincena|me pagan|paguen|plata|dinero|fin de mes|cuando tenga|apart)", plano(m["content"])) for m in U(c))]
print(f"  chats que aplazan: {len(ap)} ({len(ap)/len(V)*100:.1f}%) · compraron {sum(map(compro, ap))}")
print(f"  de esos, por PLATA/fecha de pago: {len(plata)} · compraron {sum(map(compro, plata))}")
ofrece = sum(1 for c in plata if any(re.search(r"(programa|agend|te lo (dejo|separo|aparto)|despach\w* (el|para el)|fecha)", plano(m["content"])) for m in A(c)))
print(f"  el bot ofreció programar/apartar en: {ofrece}")

print("\n=== 4. ENVÍO GRATIS esperado")
eg = [c for c in V if any(re.search(r"(envio (es |era )?gratis|sin (cobro de |costo de )?envio|gratis el envio|no cobran (el )?envio|pense que (era|el envio))", plano(m["content"])) for m in U(c))]
print(f"  chats: {len(eg)} · compraron {sum(map(compro, eg))} · por producto {collections.Counter(c['_prod'] for c in eg)}")

print("\n=== 5. DESCUENTO / REBAJA pedida")
de = [c for c in V if any(re.search(r"\b(descuento|rebaj|mas barato|menos|precio especial|dejamelo|dejalo en)\b", plano(m["content"])) for m in U(c)[1:])]
print(f"  chats: {len(de)} · compraron {sum(map(compro, de))}")
niega = sum(1 for c in de if any(re.search(r"(no (puedo|podemos|manejamos) (aplicar |hacer |dar )?(descuentos|rebaja)|no manejamos descuento|precio (ya )?(esta )?ajustado|precio es el)", plano(m["content"])) for m in A(c)))
da = sum(1 for c in de if any(re.search(r"(te (puedo )?(dejo|hago|doy) (un )?(descuento|en \$)|descuento de \$|te lo dejo en)", plano(m["content"])) for m in A(c)))
print(f"  el bot lo negó en {niega} · dio algo en {da}")

print("\n=== 6. MUEREN JUSTO DESPUÉS DEL TOTAL, por cómo termina el mensaje del total")
fin = collections.Counter(); muere = collections.Counter()
for c in V:
    ms = c["mensajes"]
    for i, m in enumerate(ms):
        t = plano(m["content"])
        if m["role"] == "assistant" and RE_TOTAL.search(t):
            if re.search(r"(te sirve ese total|te parece bien ese total|te sirve\?|te parece bien\?)", t[-80:]): k = "termina en '¿te sirve ese total?'"
            elif re.search(r"(nombre|direccion|celular|datos)", t[-200:]): k = "termina pidiendo los datos"
            else: k = "otro cierre"
            fin[k] += 1
            if not any(x["role"] == "user" for x in ms[i+1:]): muere[k] += 1
            break
for k in fin: print(f"  {k:40s} n={fin[k]:4d} · el cliente no volvió a escribir {muere[k]/fin[k]*100:.0f}%")

print("\n=== 7. TOTAL ANTES DE PREGUNTAR QUÉ QUIERE (hay preguntas sin responder)")
ign = 0; ignEj = []
for c in V:
    ms = c["mensajes"]
    for i in range(1, len(ms)):
        if ms[i]["role"] == "assistant" and ms[i-1]["role"] == "user":
            q = plano(ms[i-1]["content"])
            if "?" in ms[i-1]["content"] or re.match(r"^(como|cuanto|cual|que|donde|tiene|hay|emite|son|vienen|sirve)", q):
                r = plano(ms[i]["content"])
                if RE_TOTAL.search(r) and not any(w in r for w in q.split() if len(w) > 4):
                    ign += 1; ignEj.append(q[:70])
print(f"  respuestas que contestaron con el total sin tocar la pregunta: {ign}")
print("  ", ignEj[:12])

print("\n=== 8. TEXTO PEGADO / ROTO ('!pagas', dos frases sin espacio)")
rot = sum(1 for c in V for m in A(c) if re.search(r"[!?.][a-záéíóú]{3}", m["content"]) and not re.search(r"https?://|\.\w{2,4}\b", m["content"]))
print("  mensajes:", rot)

print("\n=== 9. FOTOS: el cliente pide foto ¿compra menos?")
pf = [c for c in V if any(OBJ["foto_video"].search(plano(m["content"])) for m in U(c))]
print(f"  piden foto {len(pf)} ({len(pf)/len(V)*100:.0f}%) · compran {sum(map(compro,pf))/max(1,len(pf))*100:.1f}% vs el resto {sum(map(compro,[c for c in V if c not in pf]))/max(1,len(V)-len(pf))*100:.1f}%")

print("\n=== 10. AUDIOS")
au = [c for c in V if any("audio" in plano(m["content"])[:40] or "nota de voz" in plano(m["content"]) for m in U(c))]
print(f"  chats con audio/nota de voz: {len(au)} · compraron {sum(map(compro, au))}")
ej = collections.Counter(m["content"][:60] for c in au for m in U(c) if "audio" in plano(m["content"])[:40])
print("  ", ej.most_common(4))
