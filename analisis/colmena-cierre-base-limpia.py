#!/usr/bin/env python3
"""
EL DATO QUE CIERRA EL CASO DEL COLMENA (2026-09-10)
====================================================
El dueno conto la bandeja: de las 37 conversaciones de la campana del
colmena, ~17 estaban VACIAS (aproximado, no exacto).

Con eso por primera vez se puede comparar colmena contra tradicional sobre
LA MISMA BASE. Y el resultado invierte lo que dije hace un rato.
"""
L = '=' * 72
TOT_C, VAC_C, VENTAS = 37, 17, 3
REAL_C = TOT_C - VAC_C

# tradicional (documentado en el archivo madre)
CIERRE_T_TOT = 0.084      # 8,4% sobre conversaciones TOTALES
VAC_T = 0.578             # 57,8% de vacias (0-K, 14-ago, n=90)
REAL_T_FRAC = 1 - VAC_T
CIERRE_T_REAL = CIERRE_T_TOT / REAL_T_FRAC

GASTO, CONV_T = 85_843, 708     # gasto campana colmena · $/conv del tradicional 7-8 sep

print(L); print('1. LA BASE REAL DE CADA UNO'); print(L)
print(f'  {"":<26}{"COLMENA":>12}{"TRADICIONAL":>14}')
print(f'  {"Conversaciones":<26}{TOT_C:>12}{"-":>14}')
print(f'  {"% vacias":<26}{VAC_C/TOT_C:>11.1%}{VAC_T:>14.1%}')
print(f'  {"% que si escriben":<26}{REAL_C/TOT_C:>11.1%}{REAL_T_FRAC:>14.1%}')
print()
print(f'  🔑 PRIMER HALLAZGO: EL COLMENA TIENE MENOS FANTASMAS.')
print(f'     {VAC_C/TOT_C:.1%} de vacias contra {VAC_T:.1%} del tradicional.')
print(f'     Su anuncio filtra mejor: un aviso de $149.900 espanta al curioso')
print(f'     antes del clic. Eso es una VENTAJA del colmena, y es nueva.')

print(); print(L); print('2. EL CIERRE, SOBRE LA MISMA BASE'); print(L)
print(f'  {"base":<26}{"COLMENA":>12}{"TRADICIONAL":>14}{"gana":>10}')
print(f'  {"sobre TOTALES":<26}{VENTAS/TOT_C:>11.1%}{CIERRE_T_TOT:>14.1%}'
      f'{"empate":>10}')
print(f'  {"sobre REALES":<26}{VENTAS/REAL_C:>11.1%}{CIERRE_T_REAL:>14.1%}'
      f'{"TRAD":>10}')
print()
print(f'  🔑🔑 SEGUNDO HALLAZGO, Y ME CORRIGE OTRA VEZ:')
print(f'     Dije "el colmena cierra casi igual que el tradicional (8,1 vs 8,4)".')
print(f'     Sobre conversaciones REALES el tradicional cierra {CIERRE_T_REAL:.1%}')
print(f'     y el colmena {VENTAS/REAL_C:.1%}. El tradicional cierra '
      f'{CIERRE_T_REAL/(VENTAS/REAL_C):.2f}x mejor '
      f'(+{(CIERRE_T_REAL/(VENTAS/REAL_C)-1)*100:.0f}%).')
print()
print('  📌 Y ahora se entiende POR QUE parecian empatados sobre totales:')
print('     los dos efectos se cancelan.')
print(f'       el colmena gana en el filtro : {REAL_C/TOT_C:.1%} vs {REAL_T_FRAC:.1%} de gente que escribe')
print(f'       el colmena pierde en el cierre: {VENTAS/REAL_C:.1%} vs {CIERRE_T_REAL:.1%}')
print('     >>> EL COLMENA ATRAE MEJOR Y CIERRA PEOR.')

print(); print(L); print('3. LA DESCOMPOSICION DEL CPA (y por fin cuadra)'); print(L)
cpa_real_c = GASTO / REAL_C
cpa_real_t = CONV_T / REAL_T_FRAC
print(f'  {"":<34}{"COLMENA":>12}{"TRADICIONAL":>14}')
print(f'  {"$ por conversacion REAL":<34}${cpa_real_c:>11,.0f}${cpa_real_t:>13,.0f}')
print(f'  {"cierre sobre reales":<34}{VENTAS/REAL_C:>11.1%}{CIERRE_T_REAL:>14.1%}')
print(f'  {"= CPA por venta":<34}'
      f'${cpa_real_c/(VENTAS/REAL_C):>11,.0f}${cpa_real_t/CIERRE_T_REAL:>13,.0f}')
print()
print(f'  ✓ Chequeo: {GASTO:,}/{VENTAS} = ${GASTO/VENTAS:,.0f}, y la')
print(f'    descomposicion da ${cpa_real_c/(VENTAS/REAL_C):,.0f}. Cuadra.')
print()
print('  🔑 EL COLMENA PIERDE POR LOS DOS LADOS A LA VEZ:')
print(f'     paga {cpa_real_c/cpa_real_t:.1f}x mas por cada conversacion real')
print(f'     Y cierra {CIERRE_T_REAL/(VENTAS/REAL_C):.2f}x peor cuando la tiene.')
print(f'     {cpa_real_c/cpa_real_t:.1f} x {CIERRE_T_REAL/(VENTAS/REAL_C):.2f} = '
      f'{(cpa_real_c/cpa_real_t)*(CIERRE_T_REAL/(VENTAS/REAL_C)):.1f}x de desventaja en CPA.')
print()
print('  📌 De los dos, el que se puede arreglar es el PRIMERO: el costo por')
print('     conversacion es CPM, y el CPM es audiencia (#77 / audiencia propia).')
print('     El cierre del 15% ya es lo que es a $149.900.')

print(); print(L); print('4. ⚠️ EL TAMANO DE LA MUESTRA (obligatorio decirlo)'); print(L)
print(f'  {VENTAS} ventas sobre {REAL_C} conversaciones reales.')
print('  El intervalo de confianza al 95% de ese 15% va de ~3% a ~38%.')
print('  O sea que el 15% es compatible con "mucho peor" y con "mejor" que')
print('  el tradicional. LA DIRECCION es informativa; el numero no.')
print()
print('  📌 Y el 57,8% del tradicional es de una muestra de agosto (n=90) que')
print('     nunca se volvio a medir. Si hoy fuera 45%, el tradicional cerraria')
print(f'     {CIERRE_T_TOT/0.55:.1%} sobre reales y la brecha se agrandaria.')
print('     Vale la pena volver a contar vacias del tradicional una semana.')

print(); print(L); print('5. QUE CAMBIA Y QUE NO'); print(L)
print('  NO cambia: la campana del colmena sigue apagada y el tradicional')
print('  sigue siendo mejor destino para cada peso de pauta. La decision')
print('  del 9-sep era correcta, aunque el argumento que use estaba mal.')
print()
print('  SI cambia, y es lo util:')
print('  · El colmena ya no es "un producto que no cierra". Es un producto')
print('    con MEJOR filtro y PEOR cierre. Son dos palancas distintas.')
print('  · Su problema es comprable: el CPM. Su cierre no es arreglable con')
print('    pauta, pero tampoco esta roto.')
print('  · Y refuerza lo de 0-AD: "el colmena no estaba caro, la conversacion')
print('    estaba rota". Con base limpia sigue siendo la conversacion.')
print()
print(f'  🎯 Y el seguimiento se agranda: quedan {REAL_C-VENTAS} personas reales,')
print(f'     no 13. Retorno espontaneo 1 de {REAL_C-VENTAS} = {1/(REAL_C-VENTAS):.1%}.')
MARGEN = 40_968
print(f'     A 2 ventas son ${MARGEN*2:,} por ~{(REAL_C-VENTAS)*1.5:.0f} minutos.')
