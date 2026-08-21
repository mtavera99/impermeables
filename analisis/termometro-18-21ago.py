# -*- coding: utf-8 -*-
"""
TERMÓMETRO Y LECTURA DEL ESCALÓN 1 — export de Meta por conjunto (18-21 ago 2026).

Este es el export que faltaba (pendiente #45). Con el desglose por conjunto se
puede calcular EL TERMÓMETRO, que es la herramienta principal de diagnóstico del
archivo madre: comparar el conjunto tocado contra el conjunto de control.

⚠️ CORRIGE LA SECCIÓN 0-M. Esa sección afirmó que el umbral del reinicio de
aprendizaje estaba entre +67% (no reinicia) y +83% (sí reinicia), y de ahí sacó
la regla "escalones de +60% o menos". Este export muestra que TEST Creativos
subió +67% ($12.000 → $20.000) y SÍ registró cambio significativo. La teoría del
umbral no se sostiene.

⚠️ Y CORRIGE EL GASTO DIARIO. Se venía usando $80.432/día; el export dice
$217.659 en la ventana, que son $72.553/día.
"""
import csv
import os

DIR = os.path.dirname(os.path.abspath(__file__))
ARCHIVO = "conjuntos-18-21ago.csv"

# La ventana del informe dice 18→21, pero el 21 se pulió temprano y aún no había
# gastado. Los presupuestos que estuvieron vigentes en cada día completo:
#   18-ago  → presupuestos VIEJOS (el cambio se hizo el 19 a la 01:45)
#   19, 20  → presupuestos NUEVOS
DIAS_COMPLETOS = 3
PRESUPUESTO_VIEJO = {"Motorizados": 15000, "Domiciliarios": 30000, "TEST Creativos": 12000}

# Guías despachadas el 19 y 20 (sección 0-O, export de 99 Envíos del 21-ago).
GUIAS_19_20 = 24


def main():
    with open(os.path.join(DIR, ARCHIVO), encoding="utf-8") as fh:
        filas = list(csv.DictReader(fh))

    datos = []
    for r in filas:
        nombre = r["Nombre del conjunto de anuncios"]
        gastado = float(r["Importe gastado (COP)"])
        conv = int(r["Resultados"])
        ctr = float(r["CTR (porcentaje de clics en el enlace)"])
        cpc = float(r["CPC (costo por clic en el enlace) (COP)"])
        impresiones = int(r["Impresiones"])
        # Los clics no vienen como columna: se derivan y se cruzan por dos vías
        # para asegurarse de que el número es correcto.
        clics_por_cpc = gastado / cpc
        clics_por_ctr = impresiones * ctr / 100
        assert abs(clics_por_cpc - clics_por_ctr) < 1.5, "los clics no cuadran"
        datos.append({
            "nombre": nombre,
            "presupuesto": int(r["Presupuesto del conjunto de anuncios"]),
            "gastado": gastado,
            "conv": conv,
            "costo_conv": float(r["Costo por resultados"]),
            "ctr": ctr,
            "cpc": cpc,
            "clics": round(clics_por_ctr),
            "impresiones": impresiones,
            "alcance": int(r["Alcance"]),
            "frecuencia": float(r["Frecuencia"]),
            "cambio": r["Último cambio significativo"],
        })

    total_gastado = sum(d["gastado"] for d in datos)
    total_conv = sum(d["conv"] for d in datos)

    # ---------- 1. EL HALLAZGO QUE CORRIGE LA SECCIÓN 0-M ----------
    print("=" * 86)
    print("1. 🚨 EL UMBRAL DE APRENDIZAJE NO EXISTE COMO LO ESCRIBIMOS")
    print("=" * 86)
    print(f"{'CONJUNTO':18} {'PPTO':>8} {'CAMBIO %':>9}  ÚLTIMO CAMBIO SIGNIFICATIVO")
    print("-" * 86)
    for d in datos:
        viejo = PRESUPUESTO_VIEJO[d["nombre"]]
        pct = (d["presupuesto"] / viejo - 1) * 100
        registro = "✅ SÍ registró" if d["cambio"].startswith("2026-08-19") else "❌ no registró"
        pct_txt = f"+{pct:.0f}%" if pct else "sin cambio"
        print(f"{d['nombre']:18} {d['presupuesto']:>8,} {pct_txt:>9}  "
              f"{d['cambio'][:16]}  {registro}")
    print("-" * 86)
    print("""
  LOS TRES CASOS ACUMULADOS, PUESTOS JUNTOS:

    Domiciliarios  $18.000 → $30.000   +67%   ❌ NO registró   (4-ago)
    TEST Creativos $12.000 → $20.000   +67%   ✅ SÍ registró   (19-ago)
    Domiciliarios  $30.000 → $55.000   +83%   ✅ SÍ registró   (19-ago)

  🔴 DOS CAMBIOS DEL MISMO +67% DIERON RESULTADOS OPUESTOS.
     → El porcentaje NO explica el reinicio.
     → El monto absoluto tampoco: el que registró (+$8.000) fue MÁS CHICO que el
       que no registró (+$12.000).

  ✅ LO QUE SÍ SE SOSTIENE, Y ES LA REGLA QUE HAY QUE USAR:
     No se puede predecir si un cambio de presupuesto va a reiniciar el
     aprendizaje. Entonces hay que asumir que SIEMPRE puede pasar y no juzgar el
     CPA hasta 3-4 días después de cada escalón.

  ✅ Y VALIDA EL TERMÓMETRO: Motorizados sigue marcando 11-jul (41 días sin
     tocarse). El grupo de control está genuinamente intacto.""")

    # ---------- 2. UTILIZACIÓN REAL ----------
    print("\n" + "=" * 86)
    print("2. UTILIZACIÓN DEL PRESUPUESTO (18, 19 y 20 — el 21 aún no había gastado)")
    print("=" * 86)
    print(f"{'CONJUNTO':18} {'ASIGNADO':>10} {'GASTADO':>10} {'USO':>7}")
    print("-" * 86)
    total_asignado = 0
    for d in datos:
        # 18-ago con el presupuesto viejo, 19 y 20 con el nuevo.
        asignado = PRESUPUESTO_VIEJO[d["nombre"]] + d["presupuesto"] * (DIAS_COMPLETOS - 1)
        total_asignado += asignado
        uso = d["gastado"] / asignado * 100
        marca = " 🎉" if uso >= 95 else (" ⚠️ topado" if uso < 88 else "")
        print(f"{d['nombre']:18} {asignado:>10,} {d['gastado']:>10,.0f} {uso:>6.1f}%{marca}")
    print("-" * 86)
    print(f"{'TOTAL':18} {total_asignado:>10,} {total_gastado:>10,.0f} "
          f"{total_gastado/total_asignado*100:>6.1f}%")
    print(f"\n  Gasto diario real: ${total_gastado/DIAS_COMPLETOS:,.0f}/día")
    print(f"  ⚠️ Se venía usando $80.432/día. El número correcto es "
          f"${total_gastado/DIAS_COMPLETOS:,.0f}/día.")

    # ---------- 3. EL EMBUDO POR CONJUNTO ----------
    print("\n" + "=" * 86)
    print("3. EL EMBUDO POR CONJUNTO — DONDE SE VE QUÉ TRÁFICO ES BUENO")
    print("=" * 86)
    print(f"{'CONJUNTO':18} {'CTR':>7} {'CPC':>8} {'CLICS':>7} {'CONV':>6} "
          f"{'CLIC→CHAT':>10} {'$/CONV':>8} {'FREC':>6}")
    print("-" * 86)
    for d in sorted(datos, key=lambda x: x["costo_conv"]):
        cc = d["conv"] / d["clics"] * 100
        print(f"{d['nombre']:18} {d['ctr']:>6.2f}% {d['cpc']:>8,.0f} {d['clics']:>7,} "
              f"{d['conv']:>6} {cc:>9.1f}% {d['costo_conv']:>8,.0f} {d['frecuencia']:>6.2f}")
    print("-" * 86)
    print(f"{'CUENTA':18} {'':>7} {'':>8} "
          f"{sum(d['clics'] for d in datos):>7,} {total_conv:>6} "
          f"{'':>10} {total_gastado/total_conv:>8,.0f}")

    mot = next(d for d in datos if d["nombre"] == "Motorizados")
    dom = next(d for d in datos if d["nombre"] == "Domiciliarios")
    tst = next(d for d in datos if d["nombre"] == "TEST Creativos")

    print(f"""
  🔑 CLICS CAROS ≠ CONVERSACIONES CARAS. Motorizados tiene el CPC MÁS ALTO
     (${mot['cpc']:,.0f} vs ${dom['cpc']:,.0f} de Domiciliarios) y aun así la conversación MÁS
     BARATA (${mot['costo_conv']:,.0f} vs ${dom['costo_conv']:,.0f}), porque su clic→chat es
     {mot['conv']/mot['clics']*100:.1f}% contra {dom['conv']/dom['clics']*100:.1f}%.
     → Optimizar por CPC habría llevado a la decisión equivocada.

  🆕 TEST CREATIVOS TIENE EL MEJOR CTR DE LA CUENTA: {tst['ctr']:.2f}%
     ({(tst['ctr']/dom['ctr']-1)*100:+.0f}% sobre Domiciliarios) — y ahora con {tst['impresiones']:,}
     impresiones, no con las 79 que en su momento nos engañaron (error #2 de la
     sección "muestras pequeñas"). El ángulo de prueba social SÍ engancha.
     ⚠️ Pero su clic→chat es {tst['conv']/tst['clics']*100:.1f}%, igual que Domiciliarios, así que la
     conversación le sale más cara (${tst['costo_conv']:,.0f}). Atrae más clics, no mejor gente.""")

    # ---------- 4. FRECUENCIA ----------
    print("\n" + "=" * 86)
    print("4. FRECUENCIA — NINGUNO ESTÁ SATURADO")
    print("=" * 86)
    for d in sorted(datos, key=lambda x: x["frecuencia"]):
        print(f"  {d['nombre']:18} {d['frecuencia']:.2f}  "
              f"(alcance {d['alcance']:,} · impresiones {d['impresiones']:,})")
    print(f"""
  Todos por debajo de 1,5 = sanos. Y el más bajo es Motorizados ({mot['frecuencia']:.2f}), que es
  justo el que sub-gasta.
  🔑 SUB-GASTAR CON FRECUENCIA BAJA = LA AUDIENCIA ES CHICA, NO ESTÁ QUEMADA.
     Subirle presupuesto no sirve; AMPLIAR LA AUDIENCIA sí. Y es el mejor tráfico
     de la cuenta, así que es la palanca de mayor retorno pendiente.""")

    # ---------- 5. CPA ----------
    print("\n" + "=" * 86)
    print("5. CPA CORREGIDO Y VEREDICTO DEL ESCALÓN 2")
    print("=" * 86)
    gasto_dia = total_gastado / DIAS_COMPLETOS
    ventas_dia = GUIAS_19_20 / 2
    cpa = gasto_dia / ventas_dia
    print(f"  Gasto/día (medido)          ${gasto_dia:,.0f}")
    print(f"  Guías despachadas 19-20     {GUIAS_19_20}  →  {ventas_dia:.1f} ventas/día")
    print(f"  CPA por venta despachada    ${cpa:,.0f}")
    print(f"  Techo fijado de antemano    $10.000")
    print(f"\n  ✅ ESCALÓN 2 JUSTIFICADO (CPA ${cpa:,.0f}, {(1-cpa/10000)*100:.0f}% por debajo del techo)")
    print(f"  📌 Y el CPA es MEJOR de lo reportado antes: se había dicho $6.703 usando")
    print(f"     un gasto de $80.432/día que estaba mal. El real es ${cpa:,.0f}.")

    # Cuánto queda de colchón hasta el equilibrio
    MARGEN_UNIDAD = 24400
    print(f"\n  Margen por venta ${MARGEN_UNIDAD:,} ÷ CPA ${cpa:,.0f} = "
          f"{MARGEN_UNIDAD/cpa:.2f}× de colchón sobre el equilibrio")


if __name__ == "__main__":
    main()
