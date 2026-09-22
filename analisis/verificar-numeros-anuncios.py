#!/usr/bin/env python3
"""
¿A QUÉ NÚMERO DE WHATSAPP APUNTA CADA ANUNCIO?

EL PROBLEMA QUE RESUELVE (22-sep-2026):
el bot nuevo atiende el +57 322 7545695. El número viejo, +57 313 8615813, ya
NO tiene quién atienda. Cualquier conjunto que siga apuntando al viejo trae
gente pagada a un WhatsApp donde nadie responde: la pauta se gasta completa y
la conversación se pierde entera.

Revisar eso a mano, conjunto por conjunto, es lento y se presta a equivocarse.
Esto lo lee de la API y lo dice en una tabla.

CÓMO FUNCIONA
El destino de WhatsApp aparece en distintos lugares según cómo se creó el
anuncio (object_story_spec, asset_feed_spec, promoted_object, el link de la
CTA...). En vez de adivinar la ruta, se busca el número EN TODO el JSON del
anuncio y su creativo. Es más robusto que apostar a un campo.

SOLO LECTURA: usa el `get()` de meta-api-lectura.py, que no sabe hacer POST.
Con el token de rol Analista, Meta rechaza cualquier escritura.

USO
  export META_ADS_TOKEN='EAA...'
  python3 analisis/verificar-numeros-anuncios.py
  python3 analisis/verificar-numeros-anuncios.py act_4330882710457791
"""

import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from importlib import import_module

_m = import_module("meta-api-lectura".replace("-", "_")) if False else None

# meta-api-lectura.py tiene guiones en el nombre, así que se carga a mano.
import importlib.util

_ruta = os.path.join(os.path.dirname(os.path.abspath(__file__)), "meta-api-lectura.py")
_spec = importlib.util.spec_from_file_location("meta_api_lectura", _ruta)
meta = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(meta)

CUENTA = sys.argv[1] if len(sys.argv) > 1 else "act_4330882710457791"

# Los dos números que nos importan. El nuevo es el que tiene el bot.
NUEVO = "3227545695"
VIEJO = "3138615813"


def solo_digitos(s):
    return re.sub(r"\D", "", str(s or ""))


def numeros_en(blob):
    """Todos los teléfonos colombianos de 10 dígitos que aparezcan en el JSON."""
    texto = json.dumps(blob, ensure_ascii=False)
    crudos = re.findall(r"\b3\d{9}\b", texto)
    # También con el 57 adelante
    con57 = re.findall(r"\b57(3\d{9})\b", texto)
    return set(crudos) | set(con57)


def main():
    print("=" * 78)
    print("A QUÉ NÚMERO DE WHATSAPP APUNTA CADA ANUNCIO")
    print(f"cuenta {CUENTA}")
    print("=" * 78)
    print(f"  nuevo (el del bot) : +57 {NUEVO}")
    print(f"  viejo (sin nadie)  : +57 {VIEJO}")
    print()

    # 1. Conjuntos activos, con su presupuesto y destino
    conjuntos = {}
    data = meta.get(
        f"{CUENTA}/adsets",
        {
            # promoted_object es donde vive el numero en los conjuntos de WhatsApp
            "fields": ("id,name,status,effective_status,daily_budget,destination_type,"
                       "campaign{name},promoted_object,object_store_url"),
            "limit": 200,
        },
    )
    for a in data.get("data", []):
        conjuntos[a["id"]] = a

    # 2. Anuncios con su creativo completo
    #
    # ⚠️ 22-sep: la primera version pedia solo object_story_spec y asset_feed_spec
    # y el numero NO aparecia en ninguno de los 38 anuncios. El destino de
    # WhatsApp en los anuncios CTWA vive en otros campos segun como se creo el
    # anuncio, asi que ahora se piden TODOS los que pueden contenerlo.
    ads = []
    data = meta.get(
        f"{CUENTA}/ads",
        {
            "fields": (
                "id,name,status,effective_status,adset_id,"
                "creative{id,name,object_story_spec,asset_feed_spec,"
                "effective_object_story_id,link_destination_display_url,"
                "object_type,object_id,url_tags,template_url,link_url,"
                "destination_set_id,platform_customizations,"
                "contextual_multi_ads,degrees_of_freedom_spec}"
            ),
            "limit": 300,
        },
    )
    ads = data.get("data", [])

    # Modo diagnostico: volcar el JSON crudo de un anuncio activo para ver DONDE
    # esta el numero, en vez de seguir adivinando campos.
    if "--dump" in sys.argv:
        for ad in ads:
            cj = conjuntos.get(ad.get("adset_id"), {})
            if ad.get("effective_status") == "ACTIVE":
                print("=" * 78)
                print("JSON CRUDO DE UN ANUNCIO ACTIVO (para encontrar el numero)")
                print("=" * 78)
                print("--- ANUNCIO ---")
                print(json.dumps(ad, indent=2, ensure_ascii=False)[:4000])
                print("--- CONJUNTO ---")
                print(json.dumps(cj, indent=2, ensure_ascii=False)[:2000])
                return

    filas = []
    for ad in ads:
        adset = conjuntos.get(ad.get("adset_id"), {})
        nums = numeros_en(ad)
        # Si el anuncio no lo dice, mirar el conjunto
        if not nums:
            nums = numeros_en(adset)

        if NUEVO in nums and VIEJO in nums:
            veredicto = "⚠️ LOS DOS"
        elif NUEVO in nums:
            veredicto = "✅ nuevo"
        elif VIEJO in nums:
            veredicto = "🔴 VIEJO"
        elif nums:
            veredicto = "❓ otro: " + ",".join(sorted(nums))
        else:
            veredicto = "— no aparece"

        filas.append(
            {
                "campana": (adset.get("campaign") or {}).get("name", "?"),
                "conjunto": adset.get("name", "?"),
                "anuncio": ad.get("name", "?"),
                "estado_ad": ad.get("effective_status", ad.get("status", "?")),
                "estado_conj": adset.get("effective_status", "?"),
                "presup": adset.get("daily_budget"),
                "veredicto": veredicto,
            }
        )

    # Primero lo que está activo: es lo que gasta plata ahora
    def activo(f):
        return f["estado_ad"] == "ACTIVE" and f["estado_conj"] == "ACTIVE"

    filas.sort(key=lambda f: (not activo(f), f["campana"], f["conjunto"]))

    print(f"{'estado':10} {'veredicto':16} {'conjunto':32} {'anuncio':30} presup")
    print("-" * 78)
    for f in filas:
        est = "ACTIVO" if activo(f) else "off"
        p = ""
        if f["presup"]:
            # COP no tiene centavos: la unidad menor es el peso (ver meta-api-lectura.py)
            p = "$" + format(int(f["presup"]), ",d").replace(",", ".")
        print(
            f"{est:10} {f['veredicto']:16} {f['conjunto'][:32]:32} {f['anuncio'][:30]:30} {p}"
        )

    # ---- El resumen que importa ----
    activos = [f for f in filas if activo(f)]
    malos = [f for f in activos if "VIEJO" in f["veredicto"] or "LOS DOS" in f["veredicto"]]
    sin_dato = [f for f in activos if "no aparece" in f["veredicto"] or "otro" in f["veredicto"]]
    buenos = [f for f in activos if f["veredicto"] == "✅ nuevo"]

    print()
    print("=" * 78)
    print("RESUMEN DE LO QUE ESTÁ ACTIVO")
    print("=" * 78)
    print(f"  anuncios activos          {len(activos)}")
    print(f"  ✅ apuntan al nuevo       {len(buenos)}")
    print(f"  🔴 apuntan al VIEJO       {len(malos)}")
    print(f"  ❓ no se pudo determinar  {len(sin_dato)}")

    if malos:
        print()
        print("🔴🔴 ESTOS ESTÁN QUEMANDO PLATA: traen gente al número sin atención.")
        for f in malos:
            print(f"     · {f['conjunto']} → {f['anuncio']}")
        print("     ACCIÓN: pausarlos o recrearlos con el +57 " + NUEVO)

    if sin_dato:
        print()
        print("❓ En estos el número no viene en la respuesta de la API.")
        print("   No significa que estén mal: puede ser que el destino se defina")
        print("   en la publicación de la página y no en el creativo.")
        print("   Hay que confirmarlos a mano en Ads Manager:")
        for f in sin_dato:
            print(f"     · {f['conjunto']} → {f['anuncio']}")

    if not malos and not sin_dato and activos:
        print()
        print("🟢 TODOS los anuncios activos apuntan al número del bot.")

    print()
    print("⚠️ Esto solo LEE. Pausar o cambiar un anuncio lo hace el dueño.")


if __name__ == "__main__":
    main()
