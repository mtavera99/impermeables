"""RECÁLCULO DEL ESCALAMIENTO — 2026-08-19, tras conocer la situación real

DATOS NUEVOS APORTADOS POR EL DUEÑO (y cambian el diagnóstico entero):
  • 99 Envíos paga INSTANTÁNEAMENTE (ya tiene $1.000.000 disponible para retiro).
    Heka retenía el dinero; 99 Envíos no. -> NO HAY CICLO DE CAPITAL DE TRABAJO.
  • Caja: suficiente para cualquier nivel que se requiera.
  • Inventario: MÁS DE 5.000 IMPERMEABLES en bodega + fábricas listas.
  • Capital para publicidad: disponible.

⚠️ LOS DOS "GATES" QUE SE PUSIERON EN EL PLAN ANTERIOR NO EXISTEN.
   Y el freno no solo desaparece: SE INVIERTE. Con 5.000 unidades en bodega el
   riesgo ya no es "escalar sin stock", es "no escalar y quedarse con el stock".
"""

# --- unit economics auditadas ---
MARGEN = 24433              # margen por unidad entregada
CPA_ENTREGADA = 6732        # actual
EQUILIBRIO = 23674          # CPA de equilibrio
TASA_ENTREGA = 0.847
COSTO_UD = 34000

# --- estado actual ---
VENTAS_DIA = 10.25
GASTO_DIA = 58445
CONV_DIA = 109.5
INVENTARIO = 5000

print('=' * 70)
print('0. ⚠️⚠️ CORRECCIÓN — LEER ANTES QUE LA SECCIÓN 1')
print('=' * 70)
print('  Lo de abajo trató las 5.000 unidades como CAPITAL PROPIO inmovilizado')
print('  ($170 millones) y construyó urgencia sobre eso: "16 meses de stock",')
print('  "riesgo estacional", "hay que liquidar por mayoreo".')
print()
print('  🔴 ESTABA MAL. El dueño aclaró que el inventario es de los SOCIOS y las')
print('     FÁBRICAS: no lo paga, se lo permiten trabajar. Entonces:')
print('       • NO hay $170 millones propios quietos')
print('       • NO hay presión por liquidar ni riesgo estacional para él')
print('       • el argumento del MAYOREO pierde su razón principal')
print()
print('  ✅ LO QUE EL DATO SÍ SIGNIFICA, Y ES MEJOR: el SUMINISTRO NO ES LÍMITE.')
print('     La mayoría de los intentos de escalar se rompen por abastecimiento.')
print('     Este no. Se puede pedir todo el volumen que Meta pueda entregar.')
print()
print('  >>> La razón para escalar no es "vaciar bodega". Es que hay utilidad')
print('      sobre la mesa y ya no queda nada que lo impida.')
print('  >>> Las secciones 1 y 7 quedan como registro del error. Ver el ritmo')
print('      correcto en `ritmo-de-escalamiento.py`.')
print()
print('=' * 70)
print('1. [OBSOLETO — ver sección 0] EL INVENTARIO COMO SUPUESTA PRESIÓN')
print('=' * 70)
capital_inv = INVENTARIO * COSTO_UD
print(f'  Unidades en bodega          : {INVENTARIO:,}')
print(f'  Capital inmovilizado ahí    : ${capital_inv:,}')
print(f'  Margen potencial que guarda : ${INVENTARIO*MARGEN:,}')
print()
print(f'  {"ritmo de venta":>16} {"días para vaciar":>18} {"meses":>8}')
for v in (VENTAS_DIA, 15, 20, 30, 40, 55):
    d = INVENTARIO / v
    marca = '  <== ritmo actual' if v == VENTAS_DIA else ''
    print(f'  {v:>15.1f} {d:>18.0f} {d/30:>8.1f}{marca}')
print()
print('  🚨 AL RITMO ACTUAL SON ~16 MESES DE INVENTARIO.')
print('     Eso NO es una posición cómoda, es un problema:')
print('     • $170 millones de capital quieto que no rota')
print('     • el producto es ESTACIONAL (se vende cuando llueve) -> 16 meses')
print('       cruza varias temporadas secas')
print('     • y con fábricas listas, tener 16 meses de stock no aporta nada:')
print('       la fábrica ya es el buffer')
print()
print('  >>> LA CONCLUSIÓN SE DA VUELTA: escalar no es una opción a evaluar')
print('      con cautela, es lo que hay que hacer con urgencia.')

print('=' * 70)
print('2. CUÁNTO MARGEN HAY PARA PAGAR MÁS CARO POR VENTA')
print('=' * 70)
print(f'  CPA por venta entregada hoy : ${CPA_ENTREGADA:,}')
print(f'  CPA de equilibrio           : ${EQUILIBRIO:,}')
print(f'  Colchón                     : {EQUILIBRIO/CPA_ENTREGADA:.1f}x')
print()
print('  🔑 EL ERROR CONCEPTUAL A EVITAR: no se optimiza el CPA, se optimiza la')
print('     UTILIDAD TOTAL. Cada venta extra deja $24.433 de margen bruto, así')
print('     que conviene seguir comprando volumen mientras el CPA marginal esté')
print('     por debajo de eso. Un CPA que sube NO es malo si el total sube.')
print()
print(f'  {"CPA entregada":>15} {"utilidad/venta":>16} {"lectura":<28}')
for cpa in (6732, 9000, 12000, 15000, 18000, 21000, 23674):
    u = MARGEN - cpa
    if cpa <= 12000:
        lec = 'excelente, escalar sin dudar'
    elif cpa <= 16000:
        lec = 'muy bueno, seguir'
    elif cpa <= 20000:
        lec = 'aceptable, vigilar'
    else:
        lec = 'techo, frenar'
    print(f'  ${cpa:>14,} ${u:>15,} {lec:<28}')

print()
print('=' * 70)
print('3. LA ESCALERA: UTILIDAD TOTAL A CADA NIVEL')
print('=' * 70)
print('  Supuesto: el CPA sube al escalar (tráfico marginal más caro).')
print('  Se modela una degradación del CPA proporcional al aumento de gasto^0.5')
print('  (regla práctica: duplicar gasto sube el CPA ~40%).')
print()
print(f'  {"gasto/día":>12} {"ventas/día":>11} {"CPA entr.":>11} {"util./día":>12} {"vs hoy":>9}')
base_util = VENTAS_DIA * TASA_ENTREGA * (MARGEN - CPA_ENTREGADA)
for mult in (1.0, 1.5, 2.0, 3.0, 4.0, 5.0):
    gasto = GASTO_DIA * mult
    cpa = CPA_ENTREGADA * (mult ** 0.5)
    ventas = gasto / (cpa * TASA_ENTREGA)
    util = ventas * TASA_ENTREGA * (MARGEN - cpa)
    marca = '  <== hoy' if mult == 1.0 else ''
    print(f'  ${gasto:>11,.0f} {ventas:>11.1f} ${cpa:>10,.0f} ${util:>11,.0f} '
          f'{util/base_util*100-100:>+8.0f}%{marca}')
print()
print('  ⚠️ CORRECCIÓN A UNA VERSIÓN ANTERIOR DE ESTE SCRIPT: decía que "la utilidad')
print('     se multiplica". FALSO, y la tabla de arriba lo desmiente. La utilidad')
print('     sube +25% como máximo y DESPUÉS BAJA. Hay un óptimo y no está lejos.')
print()
print('  >>> EL ÓPTIMO ESTÁ EN ~$175.000-235.000/día de gasto (3-4x el actual),')
print('      con ~$190.000/día de utilidad (+25%). Pasado eso, el CPA come más')
print('      de lo que el volumen agrega.')
print('  ⚠️ El modelo es una regla práctica, no una predicción. Lo que vale es que')
print('      HAY un óptimo y estás muy por debajo. Se valida escalón por escalón.')
print()
print('  🔑 Y OJO CON LA IMPLICACIÓN PARA EL INVENTARIO: en ese óptimo son ~18')
print('     ventas/día = 281 días para vaciar la bodega. SIGUE SIENDO LENTO.')
print('     -> Meta sola NO alcanza para mover 5.000 unidades. Ver sección 7.')

print()
print('=' * 70)
print('7. 🔀 CONSECUENCIA: META SOLA NO RESUELVE EL INVENTARIO')
print('=' * 70)
print('  Escalar Meta al óptimo deja ~18 ventas/día -> 281 días de stock.')
print('  Para mover 5.000 unidades en una temporada hacen falta VARIAS canillas:')
print()
canales = [
    ('Meta al óptimo', 18, 'ya validado, escalar ya'),
    ('+ TikTok Ads', 8, 'canal nuevo, cubre el riesgo de canal único'),
    ('+ Google Search', 3, 'intención alta, volumen bajo, piso barato'),
]
tot = 0
for et, v, nota in canales:
    tot += v
    print(f'  {et:<20} +{v:>3} ventas/día   ({nota})')
print(f'  {"TOTAL":<20} {tot:>4} ventas/día -> {INVENTARIO/tot:.0f} días '
      f'({INVENTARIO/tot/30:.1f} meses)')
print()
print('  💡 Y QUEDA UNA PALANCA QUE NO SE HA USADO: MAYOREO.')
print('     La auditoría de Heka excluyó "el pedido mayorista de Yopal')
print('     ($450.000 de producto)" -> el canal YA EXISTE y ya se usó una vez.')
print()
PRECIO_MAYOREO = 45000
margen_may = PRECIO_MAYOREO - COSTO_UD
print(f'     Retail : margen ${MARGEN:,}/unidad, con CAC de ${CPA_ENTREGADA:,}')
print(f'     Mayoreo: margen ~${margen_may:,}/unidad a ${PRECIO_MAYOREO:,}, '
      f'CAC $0 y sin carga operativa')
for n in (500, 1000, 1500):
    print(f'       {n:>5} unidades al mayor = ${n*margen_may:>12,} '
          f'de margen, {n/18:>3.0f} días de producción retail ahorrados')
print()
print('     >>> No reemplaza el retail (el margen es la mitad), pero es la única')
print('         palanca que mueve MILES de unidades sin sumar carga operativa')
print('         ni depender del cierre manual. Para un excedente estacional')
print('         de 16 meses, vale considerarla en serio.')

print()
print('=' * 70)
print('4. 🚧 LOS FRENOS QUE **SÍ** QUEDAN (cambiaron de lugar)')
print('=' * 70)
print(f'  Conversaciones/día hoy: {CONV_DIA:.0f}')
print()
print(f'  {"ventas/día":>11} {"conversaciones/día":>20} {"guías a crear/día":>19}')
for v in (VENTAS_DIA, 15, 20, 30, 40):
    conv = CONV_DIA * (v / VENTAS_DIA)
    print(f'  {v:>11.1f} {conv:>20.0f} {v:>19.0f}')
print()
print('  🔴 FRENO 1 — TU TIEMPO DE CIERRE. A 30 ventas/día serían ~320')
print('     conversaciones/día. La IA es válvula, pero el cierre es tuyo.')
print('     ES EL FRENO REAL AHORA. Y tiene solución concreta abajo.')
print()
print('  🔴 FRENO 2 — DESPACHO. A 30 ventas/día son 30 guías creadas a mano')
print('     todos los días. El 18-ago hiciste 32 (lote acumulado), así que se')
print('     puede, pero como rutina diaria consume horas.')
print()
print('  🟡 FRENO 3 — LA CAPACIDAD DE ENTREGA DE META. Desconocida: el "techo"')
print('     de $48.585 resultó falso. No se sabe dónde está el real.')
print('     Solo se descubre subiendo y midiendo.')

print()
print('=' * 70)
print('5. 🌧️ LA VENTANA ESTACIONAL — LO MÁS URGENTE DE TODO')
print('=' * 70)
print('  Vendes impermeables: la demanda depende de que llueva.')
print('  En la región andina de Colombia el régimen es BIMODAL, con temporadas')
print('  de lluvia aproximadamente en marzo-mayo y SEPTIEMBRE-NOVIEMBRE.')
print()
print('  >>> Estamos a ~2 SEMANAS de la segunda temporada de lluvias del año.')
print('      Es la mejor ventana de demanda que vas a tener en meses.')
print()
print('  ⚠️ VERIFICAR el patrón local antes de apostar todo a esto (es la')
print('     hipótesis (C) de la sección 0-I, que sigue sin revisarse).')
print('     Pero si se confirma, la implicación es fuerte:')
print('     • agosto seco explicaría parte del bajón del cierre')
print('     • y septiembre-noviembre es CUANDO hay que tener el volumen listo')
print('     • preparar la infraestructura AHORA, no en octubre')
print()
print('  📌 Y encaja con el inventario: 5.000 unidades tienen sentido SI se')
print('     venden en la temporada. Pasada la temporada, se quedan un año.')

print()
print('=' * 70)
print('6. ESCALERA CONCRETA (revisada, mucho más agresiva)')
print('=' * 70)
pasos = [
    ('AHORA', 57000, 90000, 'Domiciliarios 30k->55k, TEST 12k->20k. Motorizados INTACTO'),
    ('+3-4 días', 90000, 140000, 'si CPA entregada < $12.000'),
    ('+7 días', 140000, 210000, 'y abrir 2-3 conjuntos por GEOGRAFÍA'),
    ('+14 días', 210000, 300000, 'si el CPA aguanta y la atención da'),
]
print(f'  {"cuándo":<12} {"de":>10} {"a":>10}  condición / acción')
for et, de, a, cond in pasos:
    print(f'  {et:<12} ${de:>9,} ${a:>9,}  {cond}')
print()
print('  ⚠️ REGLAS QUE NO SE NEGOCIAN:')
print('   1. Motorizados CONGELADO hasta el 29-ago (es el termómetro del valle).')
print('   2. Una sola variable por vez: presupuesto. No creativos, no públicos.')
print('   3. Corte: si CPA entregada > $16.000, parar y revisar antes de seguir.')
print('   4. Arreglar el guion ANTES de abrir geografía (sección 0-J): promete')
print('      envío de $15-20k cuando el real llega a $35.860.')
print('   5. Esperar 3-4 días entre escalones. Subir presupuesto NO reinicia el')
print('      aprendizaje en esta cuenta (sección 0-C), pero el CPA necesita días')
print('      para estabilizarse y leerlo antes es el error del día 1.')
