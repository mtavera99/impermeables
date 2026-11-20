"""
🧪 Medir la prueba A/B del cierre (arrancó con el PR del 19-nov).

  A = "¿Te sirve ese total?"  (último dígito del número PAR)
  B = "¿A nombre de quién te lo envío?"  (último dígito IMPAR)

Lee los mismos chats-<producto>.json que embudo.py (ver LEEME.md), solo de
intercomunicadores y radios, y solo chats que nacieron DESPUÉS de `DESDE`.

    python3 ab_cierre.py 2026-11-20

Veredicto: no antes de ~150 chats con total por grupo. Con menos, una
diferencia de 2-3 puntos es ruido.
"""
import sys, datetime as dt, re
exec(open("embudo.py").read().split("# solo chats")[0])

desde = sys.argv[1] if len(sys.argv) > 1 else "2026-11-20"
t0 = dt.datetime.fromisoformat(desde).replace(tzinfo=dt.timezone(dt.timedelta(hours=-5))).timestamp() * 1000

def grupo(tel):
    m = re.search(r"(\d)\D*$", tel or "")
    return "A" if not m or int(m.group(1)) % 2 == 0 else "B"

g = {"A": [0, 0, 0, 0], "B": [0, 0, 0, 0]}  # chats, con total, no volvieron tras el total, confirmaron
for c in CHATS:
    if not c["_prod"].startswith(("intercom", "radio")) or not c["mensajes"]:
        continue
    if c["mensajes"][0]["at"] < t0 or ahora - c["mensajes"][0]["at"] < 24 * 3600e3:
        continue
    k = grupo(c["tel"])
    g[k][0] += 1
    ms = c["mensajes"]
    i = next((i for i, m in enumerate(ms) if m["role"] == "assistant" and RE_TOTAL.search(plano(m["content"]))), None)
    if i is None:
        continue
    g[k][1] += 1
    if not any(m["role"] == "user" for m in ms[i + 1:]):
        g[k][2] += 1
    if etapa(c) == 5:
        g[k][3] += 1

for k, (n, t, f, s) in g.items():
    print(f"{k}: {n} chats · {t} con total · se fueron tras el total {f/max(t,1)*100:.1f}% · "
          f"confirmaron {s} = {s/max(n,1)*100:.1f}% de los chats, {s/max(t,1)*100:.1f}% de los que vieron el total")
