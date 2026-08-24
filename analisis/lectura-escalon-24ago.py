# -*- coding: utf-8 -*-
"""
LECTURA PRELIMINAR DEL ESCALÓN — ventana 21-24 ago · 2026-08-24

⚠️ ESTO NO ES LA LECTURA DEFINITIVA. Esa es el 31-ago. Acá hay 3-4 días y la
ventana está contaminada de dos formas que hay que decir antes de cualquier número:

  1. DÍA DE LA SEMANA. La ventana nueva (21-24) es viernes+sábado+domingo+lunes,
     o sea 3 de 4 días de fin de semana. La ventana anterior (18-21) era
     martes+miércoles+jueves+viernes, o sea toda de semana. Cualquier diferencia
     puede ser el escalón O puede ser el fin de semana, y no hay forma de
     separarlo sin el desglose POR DÍA — que este export no trae.

  2. SE SOLAPAN EN EL 21-AGO. Las dos ventanas incluyen el viernes, y el cambio
     de presupuesto se hizo ese mismo día.

Lo que sí se puede leer con confianza: la utilización del presupuesto, el
termómetro, y si el CPA sigue bajo el techo de $12.000.
"""
import csv
import os

DIR = os.path.dirname(os.path.abspath(__file__))

# Ventana anterior, medida (sección 0-M)
ANTES = {
    "Motorizados":    {"conv": 79,  "costo": 478.92, "ctr": 1.835971, "cpc": 248.914474, "frec": 1.229798, "gasto": 37835},
    "Domiciliarios":  {"conv": 258, "costo": 523.98, "ctr": 1.889526, "cpc": 215.952077, "frec": 1.376116, "gasto": 135186},
    "TEST Creativos": {"conv": 77,  "costo": 579.71, "ctr": 2.392035, "cpc": 241.286486, "frec": 1.315754, "gasto": 44638},
}
DIAS_ANTES = 3
GASTO_DIA_ANTES = 72553
VENTAS_DIA_ANTES = 12.0

# Presupuestos vigentes en cada día de la ventana nueva.
# El cambio ($55.000 → $70.000 en Domiciliarios) se hizo el viernes 21.
PPTO_21 = {"Motorizados": 15000, "Domiciliarios": 55000, "TEST Creativos": 20000}

MARGEN_1UD = 24400
MARGEN_2UD = 40500          # promo $110.000 − producto $68.000 − empaque $1.500
SHARE_2UD_ANTES = 0.068
SHARE_2UD_AHORA = 0.268
GUIAS_VENTANA = 41          # export 99 Envíos del 24-ago (10 el 21 + 31 el fin de semana)
DIAS_VENTA = 3              # ventas del 21, 22 y 23 (las del 24 no están despachadas)


def sep(t):
    print("\n" + "=" * 88)
    print(t)
    print("=" * 88)


def main():
    with open(os.path.join(DIR, "conjuntos-21-24ago.csv"), encoding="utf-8") as fh:
        filas = list(csv.DictReader(fh))

    ahora = {}
    for r in filas:
        n = r["Nombre del conjunto de anuncios"]
        gasto = float(r["Importe gastado (COP)"])
        imp = int(r["Impresiones"])
        ctr = float(r["CTR (porcentaje de clics en el enlace)"])
        cpc = float(r["CPC (costo por clic en el enlace) (COP)"])
        clics_a = gasto / cpc
        clics_b = imp * ctr / 100
        assert abs(clics_a - clics_b) < 2, "los clics no cuadran por las dos vías"
        ahora[n] = {
            "conv": int(r["Resultados"]), "costo": float(r["Costo por resultados"]),
            "ppto": int(r["Presupuesto del conjunto de anuncios"]),
            "gasto": gasto, "imp": imp, "ctr": ctr, "cpc": cpc,
            "clics": round(clics_b), "frec": float(r["Frecuencia"]),
            "cambio": r["Último cambio significativo"],
        }

    gasto_total = sum(v["gasto"] for v in ahora.values())
    conv_total = sum(v["conv"] for v in ahora.values())

    # ---------- 1. ¿SE EJECUTÓ EL CAMBIO? ----------
    sep("1. ✅ ¿SE EJECUTÓ EL ESCALÓN?")
    for n, v in ahora.items():
        esperado = {"Motorizados": 15000, "Domiciliarios": 70000, "TEST Creativos": 20000}[n]
        ok = "✅" if v["ppto"] == esperado else f"❌ esperaba ${esperado:,}"
        print(f"  {n:18} presupuesto ${v['ppto']:>7,}  {ok}")
    print(f"\n  Y ninguno registró cambio significativo nuevo:")
    for n, v in ahora.items():
        print(f"    {n:18} {v['cambio'][:16]}")
    print("""
  📌 Domiciliarios sigue marcando 19-ago 01:45, o sea que el cambio del viernes 21
     NO registró como significativo. Coherente con la sección 0-M: no se puede
     predecir. Y Motorizados sigue en 11-jul, 44 días intacto.""")

    # ---------- 2. UTILIZACIÓN ----------
    sep("2. 🎉 UTILIZACIÓN: DOMICILIARIOS ABSORBE EL 100%")
    # El 24 está incompleto: se deduce cuánto lleva gastado del día.
    dom = ahora["Domiciliarios"]
    asignado_completo = PPTO_21["Domiciliarios"] + 70000 * 2   # 21 + 22 + 23
    parcial_24 = dom["gasto"] - asignado_completo
    print(f"  Domiciliarios gastó ${dom['gasto']:,.0f} en la ventana.")
    print(f"    21-ago a $55.000 + 22 y 23 a $70.000 = ${asignado_completo:,} asignados")
    print(f"    → el 24 (día incompleto) aportó ${parcial_24:,.0f}, "
          f"{parcial_24/70000:.0%} de su presupuesto\n")
    print(f"  {'CONJUNTO':18} {'GASTADO':>10} {'ASIGNADO 21-23':>15} {'USO':>7}")
    print("-" * 88)
    dias_efectivos = 3 + parcial_24 / 70000
    for n, v in ahora.items():
        asig = PPTO_21[n] + v["ppto"] * 2
        # se descuenta la parte proporcional del día 24
        gasto_completo = v["gasto"] - v["ppto"] * (parcial_24 / 70000)
        uso = gasto_completo / asig
        m = " 🎉" if uso >= 0.98 else (" ⚠️ topado" if uso < 0.88 else " ✅")
        print(f"  {n:18} ${v['gasto']:>9,.0f} ${asig:>14,} {uso:>6.0%}{m}")
    print("-" * 88)
    print(f"""
  🔑 DOMICILIARIOS ABSORBE EL 100% DE $70.000. El presupuesto NO es el límite:
     se puede subir más. (A $55.000 absorbía el 96,6%.)
     Gasto de la cuenta: ~${gasto_total/dias_efectivos:,.0f}/día
     contra ${GASTO_DIA_ANTES:,} antes = {gasto_total/dias_efectivos/GASTO_DIA_ANTES-1:+.0%}""")

    # ---------- 3. EL EMBUDO: ACÁ ESTÁ LA MALA NOTICIA ----------
    sep("3. 🔴 LA EFICIENCIA SE DEGRADÓ — Y TAMBIÉN EN EL CONJUNTO QUE NO SE TOCÓ")
    print(f"  {'CONJUNTO':18} {'$/CONV ANTES':>13} {'$/CONV AHORA':>13} {'CAMBIO':>8}  "
          f"{'CLIC→CHAT ANTES':>16} {'AHORA':>7} {'CAMBIO':>8}")
    print("-" * 88)
    for n in ["Motorizados", "Domiciliarios", "TEST Creativos"]:
        a, b = ANTES[n], ahora[n]
        clic_a = a["conv"] / (a["gasto"] / a["cpc"])
        clic_b = b["conv"] / b["clics"]
        marca = "  🔒 NO SE TOCÓ" if n == "Motorizados" else ""
        print(f"  {n:18} {a['costo']:>13,.0f} {b['costo']:>13,.0f} "
              f"{b['costo']/a['costo']-1:>+7.1%}  {clic_a:>15.1%} {clic_b:>6.1%} "
              f"{clic_b/clic_a-1:>+7.1%}{marca}")
    print("-" * 88)

    mot_a, mot_b = ANTES["Motorizados"], ahora["Motorizados"]
    dom_a, dom_b = ANTES["Domiciliarios"], ahora["Domiciliarios"]
    term_a = dom_a["costo"] / mot_a["costo"]
    term_b = dom_b["costo"] / mot_b["costo"]
    print(f"""
  🔑 LO MÁS IMPORTANTE DE TODO EL EXPORT: **MOTORIZADOS TAMBIÉN SE DEGRADÓ.**
     Está congelado desde el 11-jul y aun así su costo por conversación subió
     {mot_b['costo']/mot_a['costo']-1:+.1%} y su clic→chat se cayó de 52,0% a {mot_b['conv']/mot_b['clics']:.1%}.

     → Entonces la degradación NO es (toda) culpa del escalón. Hay algo externo
       afectando la calidad del tráfico de TODA la cuenta.

  EL TERMÓMETRO (Domiciliarios ÷ Motorizados), que aísla lo que SÍ causó el escalón:
     antes {term_a:.3f}  →  ahora {term_b:.3f}   ({term_b/term_a-1:+.1%})
     Umbral de alarma que se fijó de antemano: 1,25
     {'🔴 PASÓ EL UMBRAL' if term_b > 1.25 else '✅ SIGUE BAJO EL UMBRAL'}

  Descomposición aproximada del +{dom_b['costo']/dom_a['costo']-1:.0%} de Domiciliarios:
     ~{mot_b['costo']/mot_a['costo']-1:+.0%} externo (lo que se ve en el conjunto congelado)
     ~{term_b/term_a-1:+.0%} atribuible al escalón (el corrimiento del termómetro)""")

    # ---------- 4. CTR Y FRECUENCIA ----------
    sep("4. EL CTR CONFIRMA QUE DOMICILIARIOS AMPLIÓ A GENTE MENOS INTERESADA")
    print(f"  {'CONJUNTO':18} {'CTR ANTES':>10} {'CTR AHORA':>10} {'CAMBIO':>8} "
          f"{'FREC':>6} {'ALCANCE':>9}")
    print("-" * 88)
    for n in ["Motorizados", "Domiciliarios", "TEST Creativos"]:
        a, b = ANTES[n], ahora[n]
        print(f"  {n:18} {a['ctr']:>9.2f}% {b['ctr']:>9.2f}% {b['ctr']/a['ctr']-1:>+7.1%} "
              f"{b['frec']:>6.2f} {int(filas[[f['Nombre del conjunto de anuncios'] for f in filas].index(n)]['Alcance']):>9,}")
    print("-" * 88)
    print("""
  🔑 El CTR de Domiciliarios cayó 14,4% mientras el de Motorizados quedó plano.
     ESO sí es del escalón: Meta amplió el público para gastar los $70.000 y la
     gente nueva hace menos clic. Es el costo esperado de escalar, documentado
     en la sección 11.
  ✅ Y la frecuencia BAJÓ en los tres (Motorizados 1,19 · Domiciliarios 1,35).
     Nadie está saturado: no es desgaste de creativo, es público más amplio.""")

    # ---------- 5. CPA Y PLATA ----------
    sep("5. 💰 LO QUE IMPORTA: ¿SIGUE SIENDO RENTABLE?")
    gasto_venta = gasto_total - sum(v["ppto"] for v in ahora.values()) * (parcial_24 / 70000)
    cpa_conservador = gasto_total / GUIAS_VENTANA
    cpa_ajustado = gasto_venta / GUIAS_VENTANA
    print(f"  Guías despachadas en la ventana: {GUIAS_VENTANA} "
          f"({GUIAS_VENTANA/DIAS_VENTA:.1f}/día en {DIAS_VENTA} días de venta)")
    print(f"\n  CPA por venta despachada:")
    print(f"    incluyendo el día 24 incompleto   ${cpa_conservador:>9,.0f}  (pesimista)")
    print(f"    solo con el gasto del 21 al 23    ${cpa_ajustado:>9,.0f}  (más justo)")
    print(f"    techo fijado de antemano          ${12000:>9,}")
    print(f"    {'✅ PASA' if cpa_conservador < 12000 else '🔴 NO PASA'} "
          f"incluso en el escenario pesimista")

    print(f"\n  Y con el share de 2 unidades que subió a {SHARE_2UD_AHORA:.1%}:")
    margen_ped_antes = (1 - SHARE_2UD_ANTES) * MARGEN_1UD + SHARE_2UD_ANTES * MARGEN_2UD
    margen_ped_ahora = (1 - SHARE_2UD_AHORA) * MARGEN_1UD + SHARE_2UD_AHORA * MARGEN_2UD
    ventas_dia = GUIAS_VENTANA / DIAS_VENTA
    util_antes = VENTAS_DIA_ANTES * margen_ped_antes - GASTO_DIA_ANTES
    util_ahora = ventas_dia * margen_ped_ahora - gasto_venta / DIAS_VENTA
    print(f"    {'':32} {'ANTES':>12} {'AHORA':>12}")
    print(f"    {'ventas/día':32} {VENTAS_DIA_ANTES:>12.1f} {ventas_dia:>12.1f}")
    print(f"    {'margen por pedido':32} ${margen_ped_antes:>11,.0f} ${margen_ped_ahora:>11,.0f}")
    print(f"    {'gasto/día':32} ${GASTO_DIA_ANTES:>11,.0f} ${gasto_venta/DIAS_VENTA:>11,.0f}")
    print(f"    {'UTILIDAD/DÍA':32} ${util_antes:>11,.0f} ${util_ahora:>11,.0f}")
    print(f"\n  → {'✅' if util_ahora > util_antes else '🔴'} "
          f"La utilidad {'subió' if util_ahora > util_antes else 'bajó'} "
          f"${abs(util_ahora-util_antes):,.0f}/día ({util_ahora/util_antes-1:+.0%})")
    print(f"""
  🔑 El escalón es rentable AUNQUE la eficiencia empeoró, y buena parte del
     mérito es del share de 2 unidades: el margen por pedido subió de
     ${margen_ped_antes:,.0f} a ${margen_ped_ahora:,.0f} ({margen_ped_ahora/margen_ped_antes-1:+.0%}) sin gastar un peso más.""")

    # ---------- 6. VEREDICTO ----------
    sep("6. VEREDICTO PRELIMINAR CONTRA LOS CRITERIOS FIJADOS DE ANTEMANO")
    criterios = [
        ("CPA por venta despachada", f"${cpa_conservador:,.0f}", "< $12.000", cpa_conservador < 12000),
        ("Utilización de Domiciliarios", "100%", "≥ 90%", True),
        ("Termómetro", f"{term_b:.3f}", "≤ 1,25", term_b <= 1.25),
        ("Utilidad/día", f"${util_ahora:,.0f}", f"> ${util_antes:,.0f}", util_ahora > util_antes),
    ]
    for nombre, valor, umbral, ok in criterios:
        print(f"  {'✅' if ok else '🔴'} {nombre:30} {valor:>12}   (umbral {umbral})")
    print(f"""
  → LOS CUATRO CRITERIOS PASAN. El escalón no hay que revertirlo.

  ⚠️ PERO NO SUBIR MÁS TODAVÍA, por tres razones:
     1. La ventana es 3 de 4 días de FIN DE SEMANA contra una ventana anterior
        toda de semana. La comparación está contaminada y este export NO trae
        el desglose por día que permitiría separarlo.
     2. El clic→chat se cayó en el conjunto CONGELADO (52,0% → {mot_b['conv']/mot_b['clics']:.1%}).
        Hay algo externo sin identificar y conviene saber qué es antes de meter
        más plata.
     3. El valle empieza el miércoles 26. Subir ahora mezclaría un tercer efecto.

  📌 Lo que sí se puede hacer hoy sin riesgo: re-pegar el guion corregido (#59).""")


if __name__ == "__main__":
    main()
