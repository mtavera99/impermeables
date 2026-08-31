#!/usr/bin/env python3
"""
Diagnostico de la operacion logistica al 31-ago-2026.
Fuente: export "Envios Completos" (94 guias, 24-ago a 31-ago).
"""
import csv
from collections import Counter, defaultdict
from datetime import date

HOY = date(2026, 8, 31)

def money(x):
    return f"${x:,.0f}".replace(",", ".")

rows = []
with open("envios-31ago.csv", encoding="utf-8") as f:
    for r in csv.DictReader(f):
        y, m, d = map(int, r["fecha"].split("-"))
        r["dias"] = (HOY - date(y, m, d)).days
        r["vs"] = float(r["valor_servicio"])
        r["vc"] = float(r["valor_comercial"])
        rows.append(r)

print("=" * 66)
print(f"DIAGNOSTICO LOGISTICO  ·  {len(rows)} guias  ·  24-ago a 31-ago 2026")
print("=" * 66)

# ---------- 1. Volumen por dia ----------
print("\n1. GUIAS CREADAS POR DIA")
por_dia = Counter(r["fecha"] for r in rows)
for f in sorted(por_dia):
    dias = next(r["dias"] for r in rows if r["fecha"] == f)
    print(f"   {f}  ({dias}d)  {por_dia[f]:>3} guias")

# ---------- 2. Estados ----------
print("\n2. ESTADO ACTUAL DE TODAS LAS GUIAS")
est = Counter(r["estado"] for r in rows)
for e, n in est.most_common():
    print(f"   {n:>3}  ({n/len(rows)*100:>4.1f}%)  {e}")

# ---------- 3. Embudo excluyendo las de hoy ----------
maduras = [r for r in rows if r["fecha"] != "2026-08-31"]
print(f"\n3. SOLO GUIAS MADURAS (despachadas 24-28 ago, n={len(maduras)})")
ENTREGADO = {"Entregada"}
EN_DESTINO = {"Reclame en oficina", "Reparto", "Intento de entrega"}
EN_RUTA = {"Transito regional", "Transito Urbano"}
ATASCADO = {"EN PROCESAMIENTO", "Creado"}

def clasificar(e):
    if e in ENTREGADO: return "Entregada"
    if e in EN_DESTINO: return "En destino (por reclamar/repartir)"
    if e in EN_RUTA: return "En transito"
    if e in ATASCADO: return "ATASCADA (sin mover)"
    return "Devolucion"

cl = Counter(clasificar(r["estado"]) for r in maduras)
for k in ["Entregada", "En destino (por reclamar/repartir)", "En transito",
          "ATASCADA (sin mover)", "Devolucion"]:
    if k in cl:
        print(f"   {cl[k]:>3}  ({cl[k]/len(maduras)*100:>4.1f}%)  {k}")

# ---------- 4. Por transportadora ----------
print("\n4. DESEMPENO POR TRANSPORTADORA (solo guias maduras)")
for t in ["interrapidisimo", "servientrega"]:
    sub = [r for r in maduras if r["transportadora"] == t]
    if not sub: continue
    c = Counter(clasificar(r["estado"]) for r in sub)
    ent = c.get("Entregada", 0)
    dest = c.get("En destino (por reclamar/repartir)", 0)
    ruta = c.get("En transito", 0)
    atas = c.get("ATASCADA (sin mover)", 0)
    dev = c.get("Devolucion", 0)
    n = len(sub)
    print(f"\n   {t.upper()}  (n={n})")
    print(f"      Entregada .................. {ent:>3}  ({ent/n*100:>5.1f}%)")
    print(f"      En destino ................. {dest:>3}  ({dest/n*100:>5.1f}%)")
    print(f"      En transito ................ {ruta:>3}  ({ruta/n*100:>5.1f}%)")
    print(f"      ATASCADA ................... {atas:>3}  ({atas/n*100:>5.1f}%)")
    print(f"      Devolucion ................. {dev:>3}  ({dev/n*100:>5.1f}%)")
    print(f"      -> Avanzo (entreg+destino+ruta): {(ent+dest+ruta)/n*100:.1f}%")

# ---------- 5. Las atascadas, en detalle ----------
print("\n5. GUIAS ATASCADAS  (dinero congelado)")
atascadas = [r for r in maduras if clasificar(r["estado"]) == "ATASCADA (sin mover)"]
atascadas.sort(key=lambda r: -r["dias"])
print(f"   Total: {len(atascadas)} guias")
tc = Counter(r["transportadora"] for r in atascadas)
for t, n in tc.most_common():
    print(f"      {t}: {n}  ({n/len(atascadas)*100:.0f}%)")
print(f"\n   Antiguedad:")
dc = Counter(r["dias"] for r in atascadas)
for d in sorted(dc, reverse=True):
    print(f"      {d} dias: {dc[d]} guias")
congelado = sum(r["vc"] for r in atascadas)
flete_hundido = sum(r["vs"] for r in atascadas)
print(f"\n   Valor comercial congelado ....... {money(congelado)}")
print(f"   Flete ya comprometido ........... {money(flete_hundido)}")
print(f"\n   Detalle:")
for r in atascadas:
    print(f"      fila {r['fila']:>2}  {r['fecha']}  {r['dias']}d  "
          f"{r['transportadora'][:6]:<6}  {r['ciudad'][:22]:<22} "
          f"{money(r['vc']):>9}  [{r['estado']}]")

# ---------- 6. Economia del flete ----------
print("\n6. ECONOMIA DEL FLETE")
sin_dev = [r for r in rows if r["estado"] != "Devolucion ratificada"]
tot_vc = sum(r["vc"] for r in sin_dev)
tot_vs = sum(r["vs"] for r in sin_dev)
print(f"   Guias (excl. devolucion) ........ {len(sin_dev)}")
print(f"   Valor comercial total ........... {money(tot_vc)}")
print(f"   Flete total ..................... {money(tot_vs)}")
print(f"   Flete como % del valor .......... {tot_vs/tot_vc*100:.1f}%")
print(f"   Flete promedio por guia ......... {money(tot_vs/len(sin_dev))}")
print(f"   Valor promedio por guia ......... {money(tot_vc/len(sin_dev))}")

print("\n   Por tipo de pedido:")
UNIT = [r for r in sin_dev if r["vc"] <= 100000]
COMBO = [r for r in sin_dev if r["vc"] > 100000]
for nombre, grupo in [("1 unidad  (<=100k)", UNIT), ("Combo     (>100k)", COMBO)]:
    if not grupo: continue
    vc = sum(r["vc"] for r in grupo)
    vs = sum(r["vs"] for r in grupo)
    print(f"      {nombre}  n={len(grupo):>2}  "
          f"valor prom {money(vc/len(grupo)):>9}  "
          f"flete prom {money(vs/len(grupo)):>9}  "
          f"({vs/vc*100:.1f}% del valor)")

print("\n   Flete por transportadora (mismo tipo: 1 unidad):")
for t in ["interrapidisimo", "servientrega"]:
    sub = [r for r in UNIT if r["transportadora"] == t]
    if not sub: continue
    vs = sum(r["vs"] for r in sub)
    vc = sum(r["vc"] for r in sub)
    print(f"      {t:<16} n={len(sub):>2}  "
          f"flete prom {money(vs/len(sub)):>9}  "
          f"valor prom {money(vc/len(sub)):>9}")

# ---------- 7. Devoluciones ----------
print("\n7. DEVOLUCIONES")
dev = [r for r in rows if r["estado"] == "Devolucion ratificada"]
print(f"   Devoluciones ratificadas ........ {len(dev)} de {len(maduras)} maduras "
      f"({len(dev)/len(maduras)*100:.1f}%)")
for r in dev:
    print(f"      fila {r['fila']}  {r['ciudad']}  valor {money(r['vc'])}  "
          f"costo asumido {money(r['vs'])}")

# ---------- 8. Concentracion geografica ----------
print("\n8. TOP CIUDADES (todas las guias)")
cc = Counter(r["ciudad"] for r in rows)
for c, n in cc.most_common(8):
    print(f"   {n:>2}  {c}")
print(f"   ...{len(cc)} ciudades distintas en total")

# ---------- 9. Caja pendiente ----------
print("\n9. CAJA")
entregadas = [r for r in rows if r["estado"] == "Entregada"]
print(f"   Cobrado (Entregada) ............. {len(entregadas):>3} guias  "
      f"{money(sum(r['vc'] for r in entregadas))}")
en_destino = [r for r in rows if r["estado"] in EN_DESTINO or r["estado"] in EN_RUTA]
print(f"   Por cobrar (en destino/ruta) .... {len(en_destino):>3} guias  "
      f"{money(sum(r['vc'] for r in en_destino))}")
hoy_creadas = [r for r in rows if r["fecha"] == "2026-08-31"]
print(f"   Despachadas hoy ................. {len(hoy_creadas):>3} guias  "
      f"{money(sum(r['vc'] for r in hoy_creadas))}")
print(f"   ATASCADAS (riesgo) .............. {len(atascadas):>3} guias  "
      f"{money(congelado)}")
print("=" * 66)
