# -*- coding: utf-8 -*-
"""
AUDITORIA: ¿el bot nuevo quedo con TODO lo que funcionaba del agente viejo?

El dueño lo pidio asi: "quisiera que nuestro bot fuera la version de las cosas
buenas que nos daba nuestro anterior agente y las cosas que yo hacia a mano y
que servian bastante... quiero que verifiques si ese bot quedo como yo queria".

Este script responde cuatro preguntas con numeros, no con opiniones:
  1. ¿Cual era el cierre del agente viejo SIN la intervencion del dueño?
  2. ¿Cuanto del 8,4% era el agente y cuanto era la mano del dueño?
  3. ¿Esta cada objecion medida cubierta en el guion nuevo?
  4. ¿Que haria falta para llegar al 10% de cierre?

FUENTE: export de 6.317 conversaciones reales (EXPORT-AGENTE-META-21SEP.md) y el
archivo madre. Todo medido, nada estimado, y donde hay supuesto se dice.
"""

import os
import re

L = "=" * 78
m = lambda n: f"${n:,.0f}".replace(",", ".")

# ── Datos del export (21-sep) ───────────────────────────────────────────────
CONV = 6317
VACIAS = 2827                 # nunca escribieron nada propio
PEDIDOS_VISIBLES = 155        # bloques de cierre del agente, deduplicados
CIERRES_VISIBLES = 168        # bloques (incluye 13 repetidos entre chats)
TRASPASOS_SIN_CIERRE = 243    # pasaron a humano sin cierre en el transcript
CON_HUMANO = 3803             # conversaciones con intervencion humana
CIERRE_NEGOCIO = 0.084        # 8,4% historico del archivo madre (metrica Meta)

print(L)
print("1. ¿CUAL ERA EL CIERRE DEL AGENTE VIEJO, SOLO, SIN TU MANO?")
print(L)
print()
solo = PEDIDOS_VISIBLES / CONV
con_traspasos = (CIERRES_VISIBLES + TRASPASOS_SIN_CIERRE) / CONV
print(f"  Conversaciones del export .................... {CONV:,}".replace(",", "."))
print(f"  Pedidos que el agente cerro SOLO ............. {PEDIDOS_VISIBLES}  ->  {solo*100:.1f}%")
print(f"  Techo si TODOS los traspasos cerraron ........ {CIERRES_VISIBLES+TRASPASOS_SIN_CIERRE}  ->  {con_traspasos*100:.1f}%")
print(f"  Cierre del NEGOCIO (historico, metrica Meta) . {CIERRE_NEGOCIO*100:.1f}%")
print()
print("  >>> El agente solo cerraba entre 2,5% y 6,5%. El negocio cerraba 8,4%.")
print()

print(L)
print("2. ENTONCES, ¿CUANTO ERA TUYO?")
print(L)
print()
pedidos_negocio = CONV * CIERRE_NEGOCIO
tuyo_min = pedidos_negocio - (CIERRES_VISIBLES + TRASPASOS_SIN_CIERRE)
tuyo_max = pedidos_negocio - PEDIDOS_VISIBLES
print(f"  Si esas 6.317 conversaciones cerraron al 8,4%, son ~{pedidos_negocio:.0f} pedidos.")
print()
print(f"{'escenario':<44}{'del agente':>13}{'tuyo':>11}{'% tuyo':>9}")
print("-" * 78)
print(f"{'solo lo que el agente cerro visiblemente':<44}{PEDIDOS_VISIBLES:>13}{tuyo_max:>11.0f}{tuyo_max/pedidos_negocio*100:>8.0f}%")
print(f"{'contando todos los traspasos como cerrados':<44}{CIERRES_VISIBLES+TRASPASOS_SIN_CIERRE:>13}{tuyo_min:>11.0f}{tuyo_min/pedidos_negocio*100:>8.0f}%")
print()
print(f"  🔑 TU MANO HACIA ENTRE EL {tuyo_min/pedidos_negocio*100:.0f}% Y EL {tuyo_max/pedidos_negocio*100:.0f}% DE LAS VENTAS.")
print()
print(f"  Y el dato que lo confirma: {CON_HUMANO:,} de {CONV:,} conversaciones".replace(",", "."))
print(f"  ({CON_HUMANO/CONV*100:.0f}%) tienen intervencion humana en el transcript.")
print()
print("  ⚠️ Lo que esto NO dice: el 8,4% se midio en otra ventana de tiempo, no")
print("     sobre estas 6.317 exactas. Es la mejor comparacion disponible, pero")
print("     el rango 2,5%-6,5% del agente si esta medido sobre estos mismos chats.")
print()

print(L)
print("3. AUDITORIA: ¿ESTA CADA OBJECION MEDIDA CUBIERTA EN EL GUION NUEVO?")
print(L)
print()

# Los temas medidos en el export, con su peso real
TEMAS = [
    ("talla",            17.8, [r"TALLA", r"talla m[aá]s", r"S a 3XL|S, M, L, XL"]),
    ("color de franja",  10.3, [r"franja", r"blanco, negro, rojo|seis colores|6 colores"]),
    ("precio",            8.1, [r"59\.900|PRECIO_PRODUCTO|est[aá] caro"]),
    ("envio y pago",      5.4, [r"contraentrega", r"ENV[IÍ]O"]),
    ("cuando llega",      5.2, [r"cu[aá]ndo llega|d[ií]as h[aá]biles|1 a 3"]),
    ("no se moja",        3.2, [r"termosellad|no se moja|impermeab"]),
    ("desconfianza",      2.5, [r"estafa|desconfianza|no pag[aá]s nada por adelantado"]),
    ("material",          2.3, [r"PVC|calibre 8"]),
    ("garantia/cambios",  0.4, [r"garant[ií]a|cambio"]),
    ("mayorista",         0.2, [r"mayor|docena"]),
    ("colmena",           0.2, [r"[Cc]olmena"]),
]

ruta = os.path.join(os.path.dirname(__file__), "..", "bot", "src", "prompt.js")
guion = open(ruta, encoding="utf-8").read()
# El guion arma texto desde fletes.js; para la auditoria alcanza el prompt.js
# mas la tabla, asi que se agrega tambien fletes.js.
guion += open(os.path.join(os.path.dirname(__file__), "..", "bot", "src", "fletes.js"), encoding="utf-8").read()

print(f"{'tema':<20}{'% de dudas':>12}{'en el guion':>14}  evidencia")
print("-" * 78)
cubierto = 0.0
faltante = []
for nombre, peso, patrones in TEMAS:
    hits = [p for p in patrones if re.search(p, guion, re.I)]
    ok = len(hits) > 0
    if ok:
        cubierto += peso
    else:
        faltante.append((nombre, peso))
    print(f"{nombre:<20}{peso:>11.1f}%{('SI' if ok else 'NO'):>14}  {hits[0][:34] if hits else '— sin rastro'}")
print()
total_medido = sum(p for _, p, _ in TEMAS)
print(f"  Cobertura ponderada: {cubierto:.1f}% de {total_medido:.1f}% de las dudas medidas")
if faltante:
    print("  🔴 Sin cubrir: " + ", ".join(f"{n} ({p}%)" for n, p in faltante))
else:
    print("  🟢 Las 11 objeciones medidas en 6.317 chats estan en el guion.")
print()

print(L)
print("4. ¿QUE HARIA FALTA PARA LLEGAR AL 10% DE CIERRE?")
print(L)
print()
print("  El cierre total se descompone en dos cosas, y solo una se puede mover")
print("  con el guion:")
print()
print("      cierre total  =  % que CONTESTA  x  % que compra de los que contestan")
print()
tasa_contesta = 1 - VACIAS / CONV
print(f"  En el export:  {CIERRE_NEGOCIO*100:.1f}%  =  {tasa_contesta*100:.1f}%  x  {CIERRE_NEGOCIO/tasa_contesta*100:.1f}%")
print()
print(f"{'para llegar a':<16}{'si contesta el':>18}{'hay que cerrar':>18}{'¿es realista?'}")
print("-" * 78)
for objetivo in [0.06, 0.08, 0.10, 0.12]:
    for contesta in [tasa_contesta, 0.65, 0.75]:
        necesario = objetivo / contesta
        if abs(contesta - tasa_contesta) < 0.001:
            etiqueta = f"{contesta*100:.0f}% (hoy)"
        else:
            etiqueta = f"{contesta*100:.0f}%"
        veredicto = "ya se logro (19,9%)" if necesario <= 0.199 else "nunca se ha visto"
        print(f"{objetivo*100:>13.0f}%{etiqueta:>18}{necesario*100:>17.1f}%  {veredicto}")
    print()
print("  🔑 CONCLUSION: para 10% con la tasa de respuesta de hoy (55%) hay que")
print("     cerrar 18,2% de los que contestan, y el maximo medido es 19,9%.")
print("     Se puede, pero queda sin colchon.")
print()
print("     El camino con mas margen es subir el % QUE CONTESTA. Si contesta el")
print(f"     65% en vez del 55%, el 10% total solo necesita cerrar 15,4%, que ya")
print("     se logro antes. Y eso depende de UNA sola cosa:")
print()
print("     👉 EL PRIMER MENSAJE. Es lo unico que ven los 2.827 (44,8%) que")
print("        nunca escribieron nada propio. Cada punto que suba ahi vale mas")
print("        que cualquier ajuste de precio.")
print()

print(L)
print("5. LO QUE FALTA MEDIR, Y COMO")
print(L)
print()
print("  No puedo calcular los chats vacios del bot NUEVO desde aca: esos datos")
print("  estan en el disco de Render, no en el repo. El dueño lo corre en el Shell:")
print()
print('    node -e \'const c=JSON.parse(require("fs").readFileSync("/var/data/conversations.json"));')
print('    let t=0,u=0,d=0;for(const k in c){const m=(c[k].messages||[]).filter(x=>x.role==="user");')
print('    if(m.length===0)continue;t++;if(m.length===1)u++;else d++;}')
print('    console.log("conversaciones:",t,"| escribieron UNA vez:",u,"("+Math.round(u/t*100)+"%) | siguieron:",d);\'')
print()
print("  Si ese porcentaje de 'una sola vez' se parece al 44,8% del export, el")
print("  problema es el mismo de siempre y el primer mensaje es la palanca.")
print("  Si es MUCHO mas alto, el primer mensaje del bot nuevo es peor que el del")
print("  agente viejo, y eso seria un problema que introdujimos nosotros.")
