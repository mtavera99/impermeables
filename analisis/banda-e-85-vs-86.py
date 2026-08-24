# -*- coding: utf-8 -*-
"""
BANDA E: ¿$85.000 O $86.000? — 2026-08-24

El dueño prefiere dejarla en $85.000 porque $86.000 "espantaría algunos".
Es su decisión y es defendible. Este script pone el precio de esa decisión al
lado, y trae un dato de los propios datos que apunta en contra de la intuición.
"""
import csv
import os
import unicodedata

DIR = os.path.dirname(os.path.abspath(__file__))
PRECIO, COSTO, EMPAQUE = 59900, 34000, 1500
FLETE_E = 25481
VENTAS_DIA = 13.7
SHARE_E = 13 / 30          # 43% de las guías de 1 unidad del export del 24-ago


def norm(c):
    s = unicodedata.normalize("NFD", c)
    s = "".join(ch for ch in s if unicodedata.category(ch) != "Mn").upper()
    return " ".join(s.replace("D.C.", "").replace(",", " ").split())


BANDAS = {
    "A": (73000, ["BOGOTA", "SOACHA", "ZIPAQUIRA", "CHIA", "CAJICA", "MOSQUERA",
                  "MADRID", "FUNZA", "FACATATIVA", "SIBATE", "LA CALERA"]),
    "B": (77000, ["TUNJA", "PAIPA", "AGUAZUL", "TOCANCIPA", "VILLAVICENCIO",
                  "DUITAMA", "SOGAMOSO", "YOPAL", "ACACIAS", "CUCUNUBA",
                  "UBATE", "CHOCONTA", "VILLA DE LEYVA"]),
    "C": (81000, ["MEDELLIN", "ITAGUI", "ENVIGADO", "SABANETA", "COPACABANA",
                  "CALI", "PALMIRA", "JAMUNDI", "YUMBO", "BUENAVENTURA",
                  "BARRANQUILLA", "SOLEDAD", "CARTAGENA", "CARTAGENA DE INDIAS",
                  "PEREIRA", "DOSQUEBRADAS", "MANIZALES", "BARRANCABERMEJA",
                  "YARUMAL", "PUERTO BERRIO", "OCANA", "ARMENIA", "IBAGUE", "NEIVA"]),
    "D": (83000, ["BUCARAMANGA", "MONTERIA", "POPAYAN", "SANTA MARTA", "IPIALES",
                  "FLORENCIA", "MOCOA", "BELLO", "RIONEGRO", "CERETE", "COVENAS",
                  "SAMACA", "CUCUTA", "SAN JOSE DE CUCUTA", "PASTO", "VALLEDUPAR",
                  "SINCELEJO", "QUIBDO", "RIOHACHA", "EL CERRITO"]),
    "E": (None, []),
}


def banda_de(c):
    n = norm(c)
    for k, (_, lista) in BANDAS.items():
        if n in lista:
            return k
    return "E"


def sep(t):
    print("\n" + "=" * 82)
    print(t)
    print("=" * 82)


def main():
    sep("1. LO QUE CUESTA DEJARLA EN $85.000")
    margen_85 = 85000 - FLETE_E - COSTO - EMPAQUE
    margen_86 = 86000 - FLETE_E - COSTO - EMPAQUE
    print(f"  Flete real de banda E hoy: ${FLETE_E:,}\n")
    print(f"  {'PRECIO':>10} {'COLCHÓN vs COSTO':>18} {'MARGEN POR VENTA':>18}")
    print("-" * 82)
    for p in (85000, 86000):
        col = p - PRECIO - FLETE_E
        m = p - FLETE_E - COSTO - EMPAQUE
        print(f"  ${p:>9,} {col:>+18,} ${m:>17,}")
    print("-" * 82)
    ventas_e = VENTAS_DIA * SHARE_E
    fuga_dia = 381 * ventas_e
    print(f"""
  Banda E es el {SHARE_E:.0%} de las guías → ~{ventas_e:.1f} ventas/día.
  Dejarla en $85.000 cuesta $381 por venta = **${fuga_dia:,.0f}/día ≈ ${fuga_dia*30:,.0f}/mes.**""")

    sep("2. EL PUNTO DE EQUILIBRIO DE TU ARGUMENTO")
    lift = margen_86 / margen_85 - 1
    print(f"""  Subir a $86.000 sube el margen por venta de ${margen_85:,} a ${margen_86:,} = {lift:+.1%}.

  Entonces $86.000 es PEOR que $85.000 solo si vender a $86.000 cierra
  **más de {lift/(1+lift):.1%} menos.**

  Y $1.000 sobre $85.000 es un aumento de precio de {1000/85000:.1%}.
  → Para que tengas razón, la demanda tendría que caer {lift/(1+lift):.1%} ante un
    aumento del {1000/85000:.1%}. Eso es una elasticidad de {(lift/(1+lift))/(1000/85000):.1f}, que es MUY sensible
    para un producto de impulso.""")

    sep("3. 🔴 EL DATO DE TUS PROPIOS DATOS QUE VA EN CONTRA")
    print("""  El viernes 21 ya le subiste el precio a banda E, y bastante más de $1.000:

    antes del 21-ago    ~$81.030   (era producto + flete exacto)
    desde el 21-ago      $85.000   → +$3.970, un aumento del 4,9%

  Si banda E fuera sensible al precio, ese +4,9% debería haberle bajado el
  volumen. Pasó lo contrario:

    share de banda E antes (10-20 ago)    20 de 72 guías  =  28%
    share de banda E ahora (21-24 ago)    13 de 30 guías  =  43%

  🔑 **Le subiste el precio 4,9% y su participación SUBIÓ de 28% a 43%.**
     No es prueba definitiva (el mix geográfico de la pauta también se mueve),
     pero es lo único que hay y apunta a que banda E NO es sensible al precio.

  📌 Y coincide con dos cosas que el archivo ya tenía escritas:
     · sección 0-J: la conversación se decide en COLOR (77%) y TALLA (64%),
       no en precio
     · sección 0-H: el cliente de pueblo rechaza MENOS (7-11% vs 20-23%) y
       "es el que mejor tolera un total un poco más alto\"""")

    sep("4. LA PREGUNTA QUE SÍ IMPORTA: ¿LA CARTERA ABSORBE LOS $381?")
    ruta = os.path.join(DIR, "guias-99envios-24ago.csv")
    neto = 0.0
    detalle = {}
    with open(ruta, encoding="utf-8") as fh:
        for r in csv.DictReader(fh):
            cob = float(r["valor_comercial"])
            if cob > 100000:
                continue                      # solo 1 unidad
            b = banda_de(r["ciudad_destino"])
            precio = 85000 if b == "E" else BANDAS[b][0]
            dif = precio - PRECIO - float(r["valor_servicio"])
            neto += dif
            d = detalle.setdefault(b, [0, 0.0])
            d[0] += 1
            d[1] += dif
    print(f"  Con el tarifario corregido pero banda E en $85.000:\n")
    print(f"  {'BANDA':>6} {'GUÍAS':>7} {'NETO':>12} {'POR GUÍA':>10}")
    print("-" * 82)
    for b in "ABCDE":
        if b in detalle:
            n, s = detalle[b]
            print(f"  {b:>6} {n:>7} {s:>+12,.0f} {s/n:>+10,.0f}")
    print("-" * 82)
    print(f"  {'TOTAL':>6} {sum(d[0] for d in detalle.values()):>7} {neto:>+12,.0f}")
    print(f"""
  ✅ **LA CARTERA QUEDA EN +${neto:,.0f} sobre las 30 guías**, porque el colchón de
     banda D (+$2.293 por guía) tapa el hueco de banda E.

  🔑 ENTONCES TU DECISIÓN ES SOSTENIBLE: la cuenta no pierde plata con banda E
     en $85.000. Lo que pasa es que banda E deja de aportar su parte y la
     subsidian las demás. Es una decisión de negocio válida, no un error.""")

    sep("5. CONCLUSIÓN Y EL GATILLO PARA REVISARLO")
    print(f"""  ✅ SE QUEDA EN $85.000. Es tu decisión, cuesta ${fuga_dia:,.0f}/día y la cartera
     lo absorbe. No hay que discutirlo más.

  🔔 PERO QUEDA UN GATILLO ESCRITO, porque el problema no es el precio: es que
     99 Envíos SUBIÓ la tarifa y puede volver a subirla.

     hoy            flete $25.481  →  se absorben   $381 por venta
     si sube a      flete $26.000  →  se absorben   $900 por venta
     si sube a      flete $26.500  →  se absorben $1.400 por venta

     🔔 **GATILLO: si el flete de banda E pasa de $26.000, hay que subir el
        precio o cambiar de transportadora.** A $900 por venta son
        ${900*ventas_e:,.0f}/día y ahí ya no lo tapa la cartera.

  📌 Y una alternativa que evita el problema sin tocar el precio: preguntarle a
     99 Envíos si **coordinadora** cubre pueblos (pendiente #50). Hoy solo se le
     ha visto en 5 destinos, todos ciudades. Si cubre pueblos, el flete de banda E
     podría bajar y el problema desaparece sin subir un peso al cliente.""")


if __name__ == "__main__":
    main()
