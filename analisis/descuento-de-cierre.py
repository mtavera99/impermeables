# -*- coding: utf-8 -*-
"""
¿CONVIENE BAJAR $3.000-5.000 DEL ENVÍO COMO ÚLTIMO RECURSO? — 2026-08-21

Idea del dueño: si el cliente dice que el envío está muy caro, bajarle $3.000 a
$5.000 sacándolos de la ganancia, para no perder la venta completa.

⚠️ LO PRIMERO, PORQUE IMPORTA: mecánicamente esto es LO MISMO que la fuga de la
sección 0-H (se absorbían $3.900-4.900 por venta en destinos caros). Pero hay una
diferencia que lo cambia todo, y hay que ser preciso al respecto:

  LA FUGA      → incondicional e invisible. Se absorbía en TODAS las ventas de
                 las bandas caras, aunque el cliente no hubiera objetado nada,
                 porque el guion había prometido un envío barato.
  ESTA IDEA    → condicional y consciente. Solo a quien objeta, solo al final,
                 y como alternativa a perder la venta entera.

Un descuento que solo reciben los que se iban a ir NO es una fuga: es precio
discriminado. El riesgo no es la idea, es que se convierta en costumbre.
"""

MARGEN = 24400          # margen por venta a $59.900, con flete pasado al cliente
CPA = 6046
COSTO_DEVOLUCION = 4000  # prima del seguro + empaque (sección 0-T)


def sep(t):
    print("\n" + "=" * 82)
    print(t)
    print("=" * 82)


def main():
    sep("1. EL UMBRAL: ¿CUÁNTO TIENE QUE SUBIR EL CIERRE PARA PAGAR EL DESCUENTO?")
    print("""  Entre los clientes que YA objetaron el precio:
    sin descuento  → cierra una fracción c0
    con descuento  → cierra c1, pero cada venta deja (margen − descuento)

  Conviene si:  c1 × (margen − descuento)  >  c0 × margen
""")
    print(f"  {'DESCUENTO':>10} {'MARGEN QUEDA':>13} {'% DEL MARGEN':>13} "
          f"{'EL CIERRE DEBE SUBIR':>22}")
    print("-" * 82)
    for d in [2000, 3000, 4000, 5000, 7000, 10000]:
        queda = MARGEN - d
        lift = MARGEN / queda - 1
        marca = "  ← el tope que sugiero" if d == 3000 else ""
        print(f"  ${d:>9,} ${queda:>12,} {d/MARGEN:>12.1%} {lift:>21.1%}{marca}")
    print("-" * 82)
    print("""
  🔑 CON $3.000 BASTA QUE EL CIERRE ENTRE LOS QUE OBJETAN SUBA 14%.
     Con $5.000 hace falta 26%, que ya es mucho pedirle a un descuento chico.
     → El tope debería ser $3.000, no $5.000. La diferencia entre los dos no es
       de $2.000: es de 14% vs 26% de efectividad exigida.""")

    sep("2. LA TRAMPA: A CUÁNTOS SE LO DARÍAS SIN NECESIDAD")
    print("""  El cálculo de arriba asume que el descuento solo va a quien se iba a ir.
  En la práctica, parte se lo lleva gente que habría comprado igual. Si un X%
  de los que objetan iba a comprar de todas formas, ese descuento es pérdida pura.
""")
    print(f"  {'SI IBAN A COMPRAR IGUAL':>24} {'CIERRE REAL NECESARIO':>24} {'¿VIABLE?':>12}")
    print("-" * 82)
    d = 3000
    for p in [0.0, 0.25, 0.50, 0.75]:
        # El descuento se le da a todos los que objetan; solo (1-p) se convierte
        # por el descuento. El umbral efectivo sube.
        lift_base = MARGEN / (MARGEN - d) - 1
        lift_efectivo = lift_base / (1 - p) if p < 1 else float("inf")
        viable = "✅ sí" if lift_efectivo < 0.60 else "🔴 dudoso"
        print(f"  {p:>23.0%} {lift_efectivo:>23.1%} {viable:>12}")
    print("-" * 82)
    print("""
  📌 Incluso si LA MITAD de los que objetan iba a comprar igual, con $3.000 el
     descuento sigue funcionando si convierte 28% más. Es robusto.
     ⚠️ Pero si se vuelve automático — que la IA lo ofrezca sin que nadie objete —
     entonces p tiende a 100% y se convierte exactamente en la fuga de la 0-H.""")

    sep("3. LO QUE HAY QUE PROBAR ANTES DE REGALAR MARGEN")
    print(f"""  Hay dos jugadas que NO cuestan margen y hay que agotarlas primero:

  🥇 CAMBIAR DE TRANSPORTADORA. El dueño ELIGE, y el mismo destino cambia de
     precio según quién lleve (sección 0-P). Ese "descuento" sale del costo, no
     de la ganancia:

       Bogotá     servientrega $14.674 → coordinadora $11.880  = ${14674-11880:,} 
       Bogotá     interrapidísimo $12.871 → coordinadora $11.880 = ${12871-11880:,}
       Bello      interrapidísimo $22.714 → coordinadora $20.710 = ${22714-20710:,}
       Cartagena  interrapidísimo $22.793 → servientrega $20.771 = ${22793-20771:,}

     🔑 En Bogotá y sabana se puede bajar ${14674-11880:,} SIN tocar el margen.
        Eso cubre casi todo el descuento de $3.000 gratis.

  🥈 LA SEGUNDA UNIDAD. Contraintuitivo pero es lo que MÁS margen deja: si el
     cliente se queja del envío, la respuesta que gana es "si llevas dos, pagas
     UN solo envío". Dos pedidos separados a Medellín pagan $41.542 de flete;
     uno de dos paga $27.891. **Le ahorra $13.651 y a vos te SUBE el margen.**
     Es la única "objeción de precio" que se responde ganando más plata.""")

    sep("4. LA ESCALERA COMPLETA, EN ORDEN")
    escalera = [
        ("1º", "Reforzar valor", "$0", "4 piezas, termosellado, PVC calibre 8. La 0-J dice que la venta se decide en color y talla, no en precio"),
        ("2º", "Mostrar la cuenta", "$0", "\"el conjunto es $59.900, el envío a tu ciudad son $21.100\" — el envío no es un invento"),
        ("3º", "Ofrecer 2 unidades", "+margen", "\"si llevas dos pagas un solo envío\" — le ahorra $13.651 y sube tu margen"),
        ("4º", "Cambiar transportadora", "$0-1.000", "sale del costo, no del margen. Hasta $2.794 en Bogotá"),
        ("5º", "Descuento de cierre", "$3.000", "ÚLTIMO recurso, condicionado a cerrar YA"),
    ]
    print(f"  {'#':>3} {'JUGADA':>24} {'COSTO':>10}  POR QUÉ")
    print("-" * 82)
    for n, j, c, p in escalera:
        print(f"  {n:>3} {j:>24} {c:>10}  {p[:44]}")
        if len(p) > 44:
            print(f"  {'':>3} {'':>24} {'':>10}  {p[44:]}")
    print("-" * 82)

    sep("5. LAS REGLAS QUE EVITAN QUE SE VUELVA LA FUGA OTRA VEZ")
    print(f"""  🔒 TOPE: ${3000:,}. No $5.000. (14% de lift exigido vs 26%)
  🔒 SOLO REACTIVO: nunca se ofrece; solo aparece si el cliente YA objetó el precio.
  🔒 UNA SOLA VEZ por conversación. No se negocia en dos rondas.
  🔒 CONDICIONADO A CERRAR YA: "te ayudo con $3.000 si lo cerramos hoy".
     Eso protege el precio: no es que el precio sea negociable, es un gesto por
     cerrar ahora. Si no, el mismo cliente vuelve a pedir descuento la próxima.
  🔒 NUNCA en pedidos de 2 unidades: ahí el gancho es el envío compartido, que ya
     es un ahorro enorme para el cliente.
  🔒 NO decir "te bajo el envío". El envío es un costo real y decir que es
     negociable invita a que todos negocien. Decir "te hago un descuento".

  📊 Y LO MÁS IMPORTANTE: ES AUDITABLE. El descuento se ve en el export de 99
     Envíos como diferencia entre el `valor_comercial` cobrado y el total de la
     banda. **Se puede medir cuántas ventas lo usaron.**

     Regla de control: si más del 15% de las ventas de una semana llevan
     descuento, dejó de ser último recurso y se volvió el precio real. Ahí toca
     revisar el tarifario, no seguir descontando.""")

    sep("6. CUÁNTO PODRÍA COSTAR EN EL PEOR CASO (para dimensionarlo)")
    ventas_dia = 18
    print(f"  A {ventas_dia} ventas/día, con descuento de $3.000:")
    print(f"  {'% CON DESCUENTO':>17} {'COSTO/DÍA':>12} {'COSTO/MES':>13} {'% DEL MARGEN TOTAL':>20}")
    print("-" * 82)
    for pct in [0.05, 0.10, 0.15, 0.30, 0.50]:
        costo = ventas_dia * pct * 3000
        margen_total = ventas_dia * MARGEN
        print(f"  {pct:>16.0%} ${costo:>11,.0f} ${costo*30:>12,.0f} {costo/margen_total:>19.2%}")
    print("-" * 82)
    print("""
  📌 Incluso al 15% de las ventas, cuesta $8.100/día = 1,85% del margen. Es
     barato comparado con lo que era la fuga (que corría en el 28% del volumen
     sin que nadie lo hubiera decidido).""")


if __name__ == "__main__":
    main()
