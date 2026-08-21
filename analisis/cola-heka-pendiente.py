# -*- coding: utf-8 -*-
"""
¿LAS 10 GUÍAS TRABADAS SON DE HEKA? — NO. Y HEKA TIENE SU PROPIA COLA.

Pregunta del dueño (2026-08-21). Las 10 guías trabadas que reporté salen todas
del export de 99 Envíos (despachadas 18-19 ago). Heka es otra cosa, y este
script mide qué quedó suelto allá.

⚠️ NOTA DE MÉTODO: mi primer chequeo fue inválido. Busqué los números de guía de
99 Envíos dentro de guias-heka.csv y "no aparecieron" — pero es que ese archivo
NO TIENE columna de número de guía, así que nunca iban a aparecer. La prueba
correcta es la FECHA: Heka se usó del 14-jul al 8-ago; 99 Envíos desde el 10-ago.
"""
import csv
import collections
import os
from datetime import date, timedelta

DIR = os.path.dirname(os.path.abspath(__file__))

COSTO_PRODUCTO = 34000
COSTO_EMPAQUE = 1500
PRECIO_UNIDAD = 59900
FLETE_HEKA = 21000          # flete promedio del período Heka (sección 0-H)
HOY = date(2026, 8, 21)

# Las fechas del export de Heka vienen como número de serie de Excel.
EPOCA_EXCEL = date(1899, 12, 30)

# Estados que significan "esto no llegó a su destino todavía".
ESTADOS_ABIERTOS = ("TRANSITO", "NOVEDAD", "GENERADA", "EMPACADA")


def fecha_excel(serie):
    return EPOCA_EXCEL + timedelta(days=int(serie))


def main():
    with open(os.path.join(DIR, "guias-heka.csv"), encoding="utf-8") as fh:
        rows = list(csv.DictReader(fh))

    fechas = [fecha_excel(r["fecha"]) for r in rows if r["fecha"]]
    print("=" * 84)
    print("1. LA PRUEBA DE QUE SON DOS COSAS DISTINTAS: LAS FECHAS NO SE SOLAPAN")
    print("=" * 84)
    print(f"  HEKA          {min(fechas)} → {max(fechas)}   ({len(rows)} guías)")
    print(f"  99 ENVÍOS     2026-08-10 → 2026-08-20          (91 guías)")
    print("""
  Las 10 guías trabadas que reporté se despacharon el 18 y 19 de agosto, o sea
  8-9 días DESPUÉS de que Heka dejara de usarse. Son de 99 Envíos, todas.

  📌 Y el archivo de Heka ni siquiera trae número de guía (sus columnas son
     estado, detalle, ciudad, fecha, recaudo, flete), así que cualquier cruce
     por número era imposible de entrada.""")

    print("\n" + "=" * 84)
    print("2. PERO HEKA DEJÓ SU PROPIA COLA — Y ESTÁ MUCHO MÁS VIEJA")
    print("=" * 84)

    abiertas = []
    for r in rows:
        if r["estado"].strip().upper() in ESTADOS_ABIERTOS:
            f = fecha_excel(r["fecha"])
            recaudo = float(r["recaudo"] or 0)
            # Se infieren las unidades del recaudo (no hay columna).
            uds = max(1, round((recaudo - FLETE_HEKA) / PRECIO_UNIDAD))
            margen = recaudo - FLETE_HEKA - (COSTO_PRODUCTO + COSTO_EMPAQUE) * uds
            abiertas.append({
                "fecha": f, "dias": (HOY - f).days, "ciudad": r["ciudad"].strip(),
                "estado": r["estado"].strip(), "detalle": r["detalle"].strip(),
                "recaudo": recaudo, "uds": uds, "margen": margen,
            })

    print(f"\n  Guías de Heka en estado abierto: {len(abiertas)}")
    for e, n in collections.Counter(a["estado"] for a in abiertas).most_common():
        print(f"    {n:>3}  {e}")

    print(f"\n{'CIUDAD':24} {'ESTADO':10} {'DETALLE':32} {'DÍAS':>5} {'MARGEN':>9}")
    print("-" * 84)
    total = 0.0
    for a in sorted(abiertas, key=lambda x: -x["dias"]):
        total += a["margen"]
        print(f"{a['ciudad'][:24]:24} {a['estado'][:10]:10} {a['detalle'][:32]:32} "
              f"{a['dias']:>5} {a['margen']:>9,.0f}")
    print("-" * 84)
    print(f"{'TOTAL':24} {'':10} {'':32} {'':>5} {total:>9,.0f}")

    reclamar = [a for a in abiertas if "Reclamar en Oficina" in a["detalle"]]
    print(f"""
  🔴 {len(reclamar)} están "Para Reclamar en Oficina" y llevan {min(a['dias'] for a in reclamar)}
     a {max(a['dias'] for a in reclamar)} DÍAS ahí. Las transportadoras devuelven al remitente
     después de ~5-10 días en oficina, así que a esta altura lo más probable es
     que ya sean devoluciones consumadas y no rescates posibles.""")

    print("\n" + "=" * 84)
    print("3. ⚠️ LO QUE NO SE PUEDE SABER CON ESTE ARCHIVO (y es lo que importa)")
    print("=" * 84)
    print(f"""  Este export es una foto del {max(fechas)}. **El pendiente #24 dice que los
  cabos de Heka se cerraron el 12-ago** (se retiraron $2.788.601 y se gestionaron
  las novedades). O sea que la limpieza pasó DESPUÉS de esta foto.

  → Entonces estas {len(abiertas)} guías pueden estar en cualquiera de dos mundos:
     (a) ya se resolvieron en la limpieza del 12-ago → no hay nada que hacer
     (b) quedaron por fuera → hay ${total:,.0f} de margen perdido sin registrar

  🔑 NO SE PUEDE RESOLVER CON ANÁLISIS. Hace falta **un export nuevo de Heka**, o
     entrar al panel y mirar si esas ciudades siguen abiertas. Es lo único que
     distingue "ya está" de "se perdió".

  📌 Y hay una razón para mirarlo aunque duela: si se perdieron, **son
     devoluciones que NO están contadas en la tasa de rechazo del 15,3%**, y esa
     tasa es la que se usa para todas las proyecciones del negocio.""")


if __name__ == "__main__":
    main()
