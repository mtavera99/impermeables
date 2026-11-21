"""
🗺 GASTO Y PEDIDOS POR DEPARTAMENTO, Y A QUIÉN LE APUNTA CADA CONJUNTO (21-nov)

POR QUÉ EXISTE: el dueño pidió abrir zonas nuevas (Costa Caribe, Llanos, sur)
"sin pisar" los conjuntos que ya corren. Para eso hay que saber dos cosas que
ningún informe decía:

  1. a qué geografía apunta DE VERDAD cada conjunto activo (el targeting), y
  2. dónde GASTA cada conjunto y dónde salen los pedidos, por departamento.

La segunda importa más: un conjunto con "Colombia" o con Advantage+ puede estar
gastando ya en la Costa aunque nadie lo haya puesto a propósito. Abrir un
conjunto nuevo ahí sería competir contra uno propio.

🔒 Solo lectura (usa el GET de meta-api-lectura.py). Del bot usa la columna
`ciudad` del pedido, que no identifica a nadie. El mapa ciudad -> departamento
sale de DIVIPOLA (datos.gov.co); si no se puede bajar, se dice y no se inventa.

Lo llama cpa-por-producto.py, que ya tiene el token, los pedidos y la
clasificación de cada anuncio. Si algo de acá falla, el informe de CPA sale
igual, sin esta sección.
"""
import json
import re
import unicodedata
import urllib.request


def plano(s):
    s = unicodedata.normalize("NFD", str(s or "")).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z ]+", " ", s).strip()


def depto_canon(nombre):
    """Un nombre de departamento, como lo dé Meta o el DANE, a una clave común."""
    p = plano(nombre)
    p = re.sub(r"\b(departamento( de)?|d c|dc|distrito capital)\b", " ", p)
    p = re.sub(r"\s+", " ", p).strip()
    if "bogota" in p:
        return "bogota"
    if "san andres" in p:
        return "san andres"
    return p


NOMBRE_BONITO = {}


def mapa_dane():
    """{municipio_plano: set(depto_canon)} y la lista de departamentos. None si no se pudo bajar."""
    url = "https://www.datos.gov.co/resource/xdk5-pm3f.json?$limit=5000"
    try:
        with urllib.request.urlopen(urllib.request.Request(url, method="GET"), timeout=40) as r:
            filas = json.loads(r.read().decode())
    except Exception as e:  # sin DIVIPOLA no se adivina
        return None, f"no se pudo bajar DIVIPOLA ({type(e).__name__})"
    mun = {}
    deptos = set()
    for f in filas:
        d = depto_canon(f.get("departamento", ""))
        m = plano(f.get("municipio", ""))
        if not d or not m:
            continue
        deptos.add(d)
        NOMBRE_BONITO.setdefault(d, f.get("departamento", "").title())
        mun.setdefault(m, set()).add(d)
    if len(mun) < 900:
        return None, f"DIVIPOLA vino incompleto ({len(mun)} municipios)"
    return {"mun": mun, "deptos": deptos}, None


def depto_de_ciudad(ciudad, m):
    p = plano(ciudad)
    if not p:
        return None
    # 1. el cliente nombró el departamento ("Pitalito Huila", "Teorama norte de santander")
    for d in sorted(m["deptos"], key=len, reverse=True):
        if d != "bogota" and re.search(rf"\b{re.escape(d)}\b", p):
            resto = re.sub(rf"\b{re.escape(d)}\b", " ", p).strip()
            cands = m["mun"].get(resto) or set()
            if not resto or d in cands or not cands:
                return d
    if "bogota" in p:
        return "bogota"
    # 2. el municipio exacto, si es de un solo departamento
    c = m["mun"].get(p)
    if c and len(c) == 1:
        return next(iter(c))
    # 3. las primeras palabras ("Cali valle" ya cayó arriba; "Yopal casanare" también)
    palabras = p.split()
    for n in range(min(4, len(palabras)), 0, -1):
        c = m["mun"].get(" ".join(palabras[:n]))
        if c and len(c) == 1:
            return next(iter(c))
    return None


def leer_todo(lector, path, params):
    filas, after = [], None
    for _ in range(30):
        p = dict(params)
        if after:
            p["after"] = after
        d = lector.get(path, p)
        filas += d.get("data", [])
        after = ((d.get("paging") or {}).get("cursors") or {}).get("after")
        if not (d.get("paging") or {}).get("next"):
            break
    return filas


def resumen_targeting(t):
    t = t or {}
    g = t.get("geo_locations") or {}
    partes = []
    if g.get("countries"):
        partes.append("país " + ",".join(g["countries"]))
    if g.get("regions"):
        partes.append("deptos: " + ", ".join(r.get("name", "?") for r in g["regions"]))
    if g.get("cities"):
        partes.append("ciudades: " + ", ".join(
            f"{c.get('name','?')} +{c.get('radius','')}{(c.get('distance_unit') or '')[:2]}" for c in g["cities"]))
    if g.get("custom_locations"):
        partes.append(f"{len(g['custom_locations'])} puntos con radio")
    ex = t.get("excluded_geo_locations") or {}
    exs = [r.get("name", "?") for r in ex.get("regions", [])] + [c.get("name", "?") for c in ex.get("cities", [])]
    if exs:
        partes.append("EXCLUYE: " + ", ".join(exs))
    edad = f"{t.get('age_min','?')}-{t.get('age_max','?')}"
    gen = {1: "hombres", 2: "mujeres"}.get((t.get("genders") or [0])[0], "todos") if t.get("genders") else "todos"
    intereses = []
    for fs in t.get("flexible_spec") or []:
        for k, v in fs.items():
            if isinstance(v, list):
                intereses += [x.get("name", "?") for x in v if isinstance(x, dict)]
    adv = (t.get("targeting_automation") or {}).get("advantage_audience")
    return {
        "geo": " · ".join(partes) or "(sin geo)",
        "edad": edad,
        "genero": gen,
        "intereses": ", ".join(intereses[:6]) + (" …" if len(intereses) > 6 else ""),
        "advantage": "sí" if adv == 1 else "no",
    }


def seccion(lector, act, desde, hasta, pedidos, deAnuncio, equilibrio, conv_de):
    L = ["## 🗺 Por departamento (dónde se gasta y dónde se vende)", ""]

    # ── 1. targeting de los conjuntos activos
    adsets = leer_todo(lector, f"{act}/adsets", {
        "fields": "name,effective_status,daily_budget,targeting",
        "limit": 100,
    })
    activos = [a for a in adsets if a.get("effective_status") == "ACTIVE"]
    L.append(f"### A quién le apunta cada conjunto activo ({len(activos)})")
    L.append("")
    L.append("| conjunto | presup. | geografía | edad | género | intereses | Advantage+ audiencia |")
    L.append("|---|---|---|---|---|---|---|")
    for a in sorted(activos, key=lambda x: x.get("name", "")):
        r = resumen_targeting(a.get("targeting"))
        pres = int(a.get("daily_budget") or 0)
        L.append(f"| {a.get('name','').replace('|', chr(92)+'|')} | ${pres:,} | {r['geo']} | {r['edad']} | "
                 f"{r['genero']} | {r['intereses'] or '—'} | {r['advantage']} |")
    L.append("")

    # ── 2. gasto por conjunto × departamento
    filas = leer_todo(lector, f"{act}/insights", {
        "level": "adset",
        "fields": "adset_name,spend,impressions,actions",
        "breakdowns": "region",
        "time_range": json.dumps({"since": desde, "until": hasta}),
        "limit": 500,
    })
    m, err = mapa_dane()
    por_depto, por_set = {}, {}
    for f in filas:
        d = depto_canon(f.get("region", ""))
        NOMBRE_BONITO.setdefault(d, f.get("region", ""))
        g = float(f.get("spend") or 0)
        c = conv_de(f)
        x = por_depto.setdefault(d, {"g": 0.0, "c": 0, "imp": 0, "sets": {}})
        x["g"] += g
        x["c"] += c
        x["imp"] += int(f.get("impressions") or 0)
        x["sets"][f.get("adset_name", "?")] = x["sets"].get(f.get("adset_name", "?"), 0) + g
        por_set.setdefault(f.get("adset_name", "?"), {})[d] = por_set.setdefault(f.get("adset_name", "?"), {}).get(d, 0) + g

    # ── 3. pedidos por departamento (de la ciudad de entrega)
    sin_mapa = 0
    ped = {}
    if m:
        for p in pedidos:
            if p.get("estado") == "ANULADO" or not (desde <= p.get("dia_bogota", "") <= hasta):
                continue
            d = depto_de_ciudad(p.get("ciudad", ""), m)
            if not d:
                sin_mapa += 1
                continue
            prod = deAnuncio.get(p.get("anuncio_id", "")) or (p.get("producto") or "?")
            x = ped.setdefault(d, {})
            x[prod] = x.get(prod, 0) + 1

    tot_g = sum(x["g"] for x in por_depto.values()) or 1
    tot_p = sum(sum(v.values()) for v in ped.values())
    L.append(f"### Gasto, conversaciones y pedidos por departamento ({desde} a {hasta})")
    L.append("")
    if err:
        L.append(f"⚠️ Los pedidos no se pudieron ubicar por departamento: {err}. Solo va el gasto.")
        L.append("")
    else:
        L.append(f"*{tot_p} pedidos ubicados · {sin_mapa} con una ciudad que no se pudo ubicar. "
                 "El CPA de esta tabla es gasto del departamento ÷ pedidos entregados ahí: una persona puede "
                 "ver el anuncio en un departamento y pedir a otro, así que es aproximado.*")
        L.append("")
    L.append("| departamento | gasto | % del gasto | conv | $/conv | pedidos | % de pedidos | CPA aprox. | "
             "pedidos por producto | dónde gasta (conjunto: % del gasto del depto) |")
    L.append("|---|---|---|---|---|---|---|---|---|---|")
    claves = set(por_depto) | set(ped)
    for d in sorted(claves, key=lambda k: -(por_depto.get(k, {}).get("g", 0))):
        x = por_depto.get(d, {"g": 0.0, "c": 0, "sets": {}})
        n = sum(ped.get(d, {}).values())
        sets = sorted(x["sets"].items(), key=lambda kv: -kv[1])[:3]
        sets_txt = "; ".join(f"{k}: {v/x['g']*100:.0f}%" for k, v in sets if x["g"]) or "—"
        prods = ", ".join(f"{k} {v}" for k, v in sorted(ped.get(d, {}).items(), key=lambda kv: -kv[1])) or "—"
        L.append(
            f"| {NOMBRE_BONITO.get(d, d)} | ${x['g']:,.0f} | {x['g']/tot_g*100:.1f}% | {x['c']} | "
            f"{('$%s' % format(x['g']/x['c'], ',.0f')) if x['c'] else '—'} | {n} | "
            f"{(n/tot_p*100 if tot_p else 0):.1f}% | {('$%s' % format(x['g']/n, ',.0f')) if n else ('sin pedidos' if x['g'] else '—')} | "
            f"{prods} | {sets_txt.replace('|', chr(92)+'|')} |"
        )
    L.append("")

    # ── 4. cada conjunto: en qué departamentos gasta de verdad
    L.append("### Dónde gasta de verdad cada conjunto (top 5 departamentos)")
    L.append("")
    L.append("| conjunto | gasto | departamentos (% de su gasto) |")
    L.append("|---|---|---|")
    for s, mapa in sorted(por_set.items(), key=lambda kv: -sum(kv[1].values())):
        g = sum(mapa.values())
        if g < 1:
            continue
        top = sorted(mapa.items(), key=lambda kv: -kv[1])[:5]
        L.append(f"| {s.replace('|', chr(92)+'|')} | ${g:,.0f} | " +
                 ", ".join(f"{NOMBRE_BONITO.get(k, k)} {v/g*100:.0f}%" for k, v in top) + " |")
    L.append("")
    return L
