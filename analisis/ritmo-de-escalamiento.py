"""¿A QUÉ RITMO SUBIR EL PRESUPUESTO? — 20% o más rápido

Y una CORRECCIÓN a `escalamiento-sin-frenos.py`.

⚠️ CORRECCIÓN (2026-08-19, la aportó el dueño):
   Ese script trató las 5.000 unidades como capital propio inmovilizado
   ($170 millones) y construyó urgencia sobre eso: "16 meses de inventario",
   "riesgo estacional", "hay que liquidar el excedente".
   **ESTABA MAL.** El inventario es de los SOCIOS/FÁBRICAS: no lo paga, se lo
   permiten trabajar. Entonces:
     • NO hay $170 millones propios quietos
     • NO hay presión por liquidar
     • NO hay riesgo estacional para él
     • y el argumento del MAYOREO pierde su razón principal (era vaciar bodega)
   Lo que el dato SÍ significa, y es mejor: **el suministro NO es un límite.**
   La mayoría de los intentos de escalar se rompen por abastecimiento. Este no.

   >>> La razón para escalar ya no es "liquidar stock". Es más simple: hay
       utilidad sobre la mesa y nada que lo impida.
"""

MARGEN, CPA_HOY, EQUILIBRIO = 24433, 6732, 23674
TASA_ENTREGA = 0.847
GASTO_HOY = 58445
OPTIMO_MIN, OPTIMO_MAX = 175000, 235000
DIAS_POR_ESCALON = 3.5

print('=' * 70)
print('1. POR QUÉ LA REGLA DEL 20% **NO** APLICA EN ESTA CUENTA')
print('=' * 70)
print('  La regla de "+20-30% y esperar" existe por UNA razón: que el cambio de')
print('  presupuesto reinicie la fase de aprendizaje y disparen los costos.')
print()
print('  🔑 PERO ESTA CUENTA YA DEMOSTRÓ QUE ESO NO LE PASA (sección 0-C):')
print('     el campo "Último cambio significativo" de Meta siguió marcando')
print('     2026-07-11 DESPUÉS del salto de $18.000 -> $30.000 (+67%).')
print('     Meta NO lo registró como cambio significativo y el conjunto nunca')
print('     volvió a aprendizaje.')
print()
print('  >>> Es evidencia de la cuenta misma, no teoría. Subir presupuesto acá')
print('      es BARATO. Lo que sí reinicia aprendizaje es crear/duplicar')
print('      anuncios o cambiar públicos — eso sigue valiendo.')

print()
print('=' * 70)
print('2. LO QUE CUESTA SER DEMASIADO PRUDENTE')
print('=' * 70)


def escalera(paso_pct, desde=GASTO_HOY, hasta=OPTIMO_MIN):
    niveles, g = [desde], desde
    while g < hasta:
        g *= (1 + paso_pct)
        niveles.append(g)
    return niveles


print(f'  Objetivo: llegar al óptimo modelado (~${OPTIMO_MIN:,}/día)')
print()
print(f'  {"paso":>6} {"escalones":>10} {"días":>7}  recorrido')
for pct in (0.20, 0.30, 0.50, 0.60):
    n = escalera(pct)
    dias = (len(n) - 1) * DIAS_POR_ESCALON
    ruta = ' -> '.join(f'{x/1000:.0f}k' for x in n)
    print(f'  {pct*100:>5.0f}% {len(n)-1:>10} {dias:>7.0f}  {ruta}')
print()
n20 = (len(escalera(0.20)) - 1) * DIAS_POR_ESCALON
n50 = (len(escalera(0.50)) - 1) * DIAS_POR_ESCALON
print(f'  >>> La regla del 20% tarda {n20:.0f} días; a 50% son {n50:.0f} días.')
print(f'      Diferencia: {n20-n50:.0f} días.')
print('  🌧️ Con la temporada de lluvias arrancando en ~2 semanas, esos días')
print('     son exactamente la ventana de demanda. Ahí SÍ cuesta la prudencia.')

print()
print('=' * 70)
print('3. LA REGLA CORRECTA: NO ES UN %, ES UN TECHO DE CPA')
print('=' * 70)
print('  Un % fijo es arbitrario: ignora cuánto margen te queda.')
print('  La regla que sí manda:')
print()
print(f'  ┌ SUBIR mientras el CPA por venta ENTREGADA se mantenga < $12.000')
print(f'  ├ VIGILAR entre $12.000 y $16.000 (sigue siendo rentable)')
print(f'  └ PARAR si supera $16.000, revisar antes de seguir')
print(f'    (equilibrio real: ${EQUILIBRIO:,} -> incluso a $16.000 quedan '
      f'${MARGEN-16000:,} por venta)')
print()
print('  Y el tamaño del escalón sale de ahí, no de una tabla:')
print('   • si el CPA no se movió tras subir 50% -> el siguiente puede ser 50-60%')
print('   • si subió pero sigue bajo $12.000    -> siguiente 30%')
print('   • si se acercó a $16.000              -> quedarse y optimizar')

print()
print('=' * 70)
print('4. ⚠️ EL RIESGO REAL DE SALTOS GRANDES (no es el aprendizaje)')
print('=' * 70)
print('  Al pedirle mucho más volumen, Meta AMPLÍA el público para encontrarlo,')
print('  y eso degrada la calidad. En esta cuenta ya está documentado:')
print('     alcance   18.362 -> 52.074 -> 69.469')
print('     clic->chat   53% -> 47,7% -> 43,8% -> 42,9%')
print()
print('  >>> Escalar rápido puede EMPEORAR el 57,8% de conversaciones vacías.')
print()
print('  🔑 Y ACÁ ESTÁ LA HERRAMIENTA: el conteo de vacías (5 min, como el que')
print('     hiciste el 14-ago) es un INDICADOR ADELANTADO. Se mueve antes que')
print('     el CPA, porque el CPA tarda días en consolidarse por el rezago')
print('     entre conversación y venta (sección 0-K: hacés remarketing a 2-3 días).')
print()
print('     Protocolo por escalón:')
print('       día 0  subir presupuesto')
print('       día 1  contar vacías (5 min)  <- alerta temprana')
print('       día 2  contar vacías')
print('       día 3-4 leer CPA por venta entregada -> decidir el siguiente paso')
print()
print(f'     Línea base de vacías: 57,8%. Si pasa de ~70%, frenar aunque el')
print('     CPA todavía se vea bien: significa que Meta está comprando toques')
print('     y el CPA malo va a aparecer 2-3 días después.')

print()
print('=' * 70)
print('5. LA ESCALERA RECOMENDADA')
print('=' * 70)
pasos = [
    (1, 57000, 90000, '+58%', 'Domiciliarios 30k->55k · TEST 12k->20k · Motorizados INTACTO'),
    (2, 90000, 140000, '+56%', 'si CPA entregada < $12.000 y vacías < 65%'),
    (3, 140000, 210000, '+50%', 'y abrir 2-3 conjuntos por GEOGRAFÍA (guion arreglado antes)'),
    (4, 210000, 300000, '+43%', 'si el CPA aguanta y el equipo de venta ya está'),
]
print(f'  {"#":>2} {"de":>9} {"a":>9} {"paso":>6}  condición')
for i, de, a, p, cond in pasos:
    print(f'  {i:>2} ${de:>8,} ${a:>8,} {p:>6}  {cond}')
print()
print(f'  Llega al óptimo modelado en ~{2*DIAS_POR_ESCALON:.0f}-{3*DIAS_POR_ESCALON:.0f} días')
print(f'  en vez de los {n20:.0f} que tomaría la regla del 20%.')
print()
print('  📌 Y AHORA QUE VA A HABER EQUIPO DE VENTAS: el escalón 4 deja de estar')
print('     limitado por la atención. Contratar ANTES de llegar ahí, no después:')
print('     entrenar a alguien toma días y el cierre es la variable que más ha')
print('     movido este negocio (2,84% -> 13%). Un vendedor malo destruye más')
print('     valor del que agrega cualquier optimización de Meta.')
