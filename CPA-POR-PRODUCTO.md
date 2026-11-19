# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-19 13:14 Bogota.** Ventana **2026-11-12 a 2026-11-18** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $769,257 | 1369 | 90 | **$8,547** | $562 | 6.57% | $10,910,000 |
| **Q58** | $771,068 | 1273 | 42 | **$18,359** | $606 | 3.30% | $6,402,900 |
| **RADIO** | $769,704 | 583 | 46 | **$16,733** | $1,320 | 7.89% | $6,914,000 |
| **IMPERMEABLE** | $921,170 | 1128 | 74 | **$12,448** | $817 | 6.56% | $7,045,900 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,231,199** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 26 |
| anuncios con pedidos de MAS de un producto | 11 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619832930390` -> {'V10': 150, 'Q58': 5}
- `120249619616140390` -> {'V10': 217, 'Q58': 3, 'IMPERMEABLE': 1}
- `120250016232010390` -> {'RADIO': 70, 'Q58': 1}
- `120249894780920390` -> {'Q58': 73, 'V10': 1}
- `120249499375070390` -> {'V10': 1, 'IMPERMEABLE': 226}
- `120249894780890390` -> {'Q58': 95, 'V10': 1}
- `120250016231990390` -> {'RADIO': 23, 'Q58': 1}
- `120250027970510390` -> {'Q58': 44, 'IMPERMEABLE': 1}
- `120249619720720390` -> {'V10': 132, 'Q58': 1}
- `120249499411810390` -> {'IMPERMEABLE': 132, 'V10': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-12 | $99,717 | 13 | $7,671 | $102,965 | 4 | $25,741 | $101,687 | 8 | $12,711 | $118,947 | 7 | $16,992 |
| 2026-11-13 | $111,777 | 15 | $7,452 | $108,072 | 4 | $27,018 | $117,984 | 6 | $19,664 | $139,071 | 10 | $13,907 |
| 2026-11-14 | $100,779 | 13 | $7,752 | $100,030 | 8 | $12,504 | $96,213 | 6 | $16,036 | $133,945 | 12 | $11,162 |
| 2026-11-15 | $111,801 | 6 | $18,634 | $116,732 | 7 | $16,676 | $110,046 | 2 | $55,023 | $127,615 | 11 | $11,601 |
| 2026-11-16 | $143,424 | 14 | $10,245 | $138,697 | 6 | $23,116 | $142,235 | 11 | $12,930 | $163,817 | 15 | $10,921 |
| 2026-11-17 | $88,559 | 14 | $6,326 | $86,816 | 6 | $14,469 | $84,543 | 7 | $12,078 | $95,040 | 10 | $9,504 |
| 2026-11-18 | $113,200 | 15 | $7,547 | $117,756 | 7 | $16,822 | $116,996 | 6 | $19,499 | $142,735 | 9 | $15,859 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,900 | **$27,778** | $8,547 | 🟢 3.2x | $1,730,744 |
| **Q58** | $42,305 | **$31,951** | $18,359 | 🟡 1.7x | $570,870 |
| **RADIO** | $52,957 | **$40,174** | $16,733 | 🟡 2.4x | $1,078,314 |
| **IMPERMEABLE** | $26,555 | **$19,791** | $12,448 | 🟡 1.6x | $543,397 |

**Utilidad de la ventana: $3,923,325** ($560,475/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-12 a 2026-11-15 · mitad 2: 2026-11-16 a 2026-11-18. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $259,160 | 305 | 25 | **$10,366** | 8.2% | $19,432 | 🟡 53% | $13,232 → $8,115 | 6.3% → 10.7% | $836 → $867 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $219,297 | 218 | 10 | **$21,930** | 4.6% | $19,191 | 🔴 114% | $61,638 → $12,003 | 1.7% → 7.8% | $1,072 → $932 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $149,926 | 230 | 16 | **$9,370** | 7.0% | $21,878 | 🟢 43% | $7,591 → $13,285 | 8.9% → 4.7% | $679 → $621 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $147,817 | 184 | 7 | **$21,117** | 3.8% | $18,564 | 🔴 114% | $16,680 → $32,208 | 5.2% → 2.3% | $869 → $732 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $144,970 | 191 | 10 | **$14,497** | 5.2% | $19,319 | 🔴 75% | $13,976 → $15,279 | 5.4% → 5.0% | $755 → $764 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $211,623 | 297 | 12 | **$17,635** | 4.0% | $34,614 | 🟡 51% | $14,745 → $23,416 | 4.8% → 3.1% | $711 → $715 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $207,740 | 632 | 6 | **$34,623** | 0.9% | $30,540 | 🔴 113% | $38,643 → $30,604 | 0.9% → 1.0% | $350 → $305 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $176,984 | 196 | 14 | **$12,642** | 7.1% | $30,929 | 🟢 41% | $13,900 → $11,383 | 6.0% → 8.8% | $839 → $996 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $174,721 | 148 | 7 | **$24,960** | 4.7% | $31,032 | 🔴 80% | $32,203 → $19,528 | 3.8% → 5.8% | $1,223 → $1,132 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $294,313 | 248 | 25 | **$11,773** | 10.1% | $45,224 | 🟢 26% | $11,508 → $12,110 | 9.5% → 11.0% | $1,089 → $1,332 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $256,754 | 156 | 12 | **$21,396** | 7.7% | $31,926 | 🟡 67% | $35,964 → $14,112 | 4.6% → 11.6% | $1,653 → $1,636 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $145,126 | 130 | 4 | **$36,282** | 3.1% | $53,041 | 🟡 68% | sin pedidos → $15,950 | 0.0% → 7.8% | $1,029 → $1,251 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $73,511 | 49 | 4 | **$18,378** | 8.2% | $24,866 | 🟡 74% | $9,910 → sin pedidos | 18.2% → 0.0% | $1,802 → $1,254 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $261,179 | 341 | 30 | **$8,706** | 8.8% | $27,942 | 🟢 31% | $9,621 → $7,791 | 7.7% → 10.3% | $736 → $806 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $181,343 | 290 | 26 | **$6,975** | 9.0% | $27,634 | 🟢 25% | $6,347 → $7,979 | 9.9% → 7.8% | $627 → $623 |
| V10 | Motorizados - INTER · _LA RUTA_ | $179,300 | 291 | 11 | **$16,300** | 3.8% | $27,689 | 🟡 59% | $13,845 → $20,596 | 4.6% → 2.9% | $633 → $597 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $147,435 | 447 | 14 | **$10,531** | 3.1% | $27,831 | 🟢 38% | $20,321 → $6,615 | 1.6% → 4.9% | $335 → $324 |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $757 · 0 · — | $1,151 · 3 · $13,429 | $779 · 3 · $12,460 | $736 · 5 · $7,062 | $895 · 7 · $6,520 | $878 · 1 · $26,329 | $833 · 6 · $6,940 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $842 · 0 · — | $1,140 · 0 · — | $1,193 · 1 · $32,210 | $1,162 · 1 · $30,213 | $1,056 · 6 · $6,686 | $834 · 1 · $21,675 | $878 · 1 · $34,229 |
| IMPERMEABLE · Domiciliarios VIDEO - API | $939 · 3 · $6,260 | $564 · 1 · $23,680 | $657 · 4 · $5,424 | $691 · 3 · $6,448 | $525 · 0 · — | $746 · 4 · $3,915 | $690 · 1 · $23,451 |
| IMPERMEABLE · Motorizados - API | $770 · 2 · $9,630 | $793 · 3 · $7,402 | $935 · 0 · — | $1,022 · 0 · — | $667 · 1 · $26,027 | $971 · 1 · $15,539 | $692 · 0 · — |
| IMPERMEABLE · TEST Creativos - API | $894 · 1 · $20,555 | $661 · 1 · $19,824 | $622 · 2 · $10,580 | $930 · 2 · $11,158 | $824 · 0 · — | $689 · 2 · $7,918 | $762 · 2 · $10,280 |
| Q58 · Motorizados - Q58 | $913 · 1 · $31,035 | $612 · 3 · $9,993 | $589 · 3 · $9,226 | $813 · 1 · $29,267 | $849 · 2 · $19,110 | $744 · 1 · $23,067 | $589 · 1 · $32,378 |
| Q58 · Domiciliarios - Expancion - Q58 | $360 · 1 · $26,665 | $348 · 1 · $31,318 | $372 · 0 · — | $331 · 1 · $33,383 | $303 · 1 · $36,954 | $319 · 0 · — | $297 · 2 · $15,296 |
| Q58 · Domiciliarios VIDEO Q58 - | $800 · 0 · — | $880 · 0 · — | $709 · 4 · $6,208 | $1,015 · 3 · $8,800 | $1,119 · 3 · $10,814 | $773 · 2 · $10,430 | $1,099 · 2 · $13,188 |
| Q58 · Domiciliarios Q58 - | $1,051 · 2 · $11,035 | $1,039 · 0 · — | $1,913 · 0 · — | $1,204 · 1 · $27,681 | $1,195 · 0 · — | $1,035 · 2 · $9,311 | $1,136 · 2 · $14,204 |
| RADIO · RADIO - Seguridad / Negocios | $937 · 7 · $5,753 | $1,073 · 4 · $11,000 | $1,219 · 2 · $18,279 | $1,185 · 1 · $40,278 | $1,584 · 5 · $11,406 | $1,321 · 2 · $15,854 | $1,112 · 4 · $11,118 |
| RADIO · RADIO - Moteros | $2,042 · 1 · $32,678 | $1,314 · 1 · $40,748 | $1,535 · 2 · $16,882 | $2,037 · 0 · — | $1,613 · 2 · $22,577 | $1,801 · 5 · $5,763 | $1,557 · 1 · $38,929 |
| RADIO · RADIO - Fincas | $939 · 0 · — | $1,359 · 0 · — | $1,038 · 0 · — | $887 · 0 · — | $1,274 · 3 · $8,919 | $1,080 · 0 · — | $1,353 · 1 · $23,002 |
| RADIO · RADIO - Broad | $1,617 · 0 · — | $1,916 · 1 · $11,493 | $1,649 · 2 · $4,122 | $1,970 · 1 · $11,817 | $831 · 0 · — | $1,996 · 0 · — | $1,766 · 0 · — |
| V10 · Domiciliarios VIDEO INTER - API | $875 · 2 · $16,634 | $768 · 6 · $6,014 | $645 · 6 · $6,023 | $706 · 1 · $38,824 | $653 · 8 · $6,204 | $919 · 4 · $6,894 | $1,017 · 3 · $13,218 |
| V10 · Domiciliarios - Expancion - INTER | $606 · 4 · $6,212 | $660 · 5 · $5,413 | $652 · 3 · $7,607 | $596 · 4 · $6,706 | $625 · 2 · $16,238 | $640 · 3 · $6,398 | $611 · 5 · $5,623 |
| V10 · Motorizados - INTER | $758 · 3 · $7,330 | $656 · 3 · $8,741 | $514 · 1 · $22,633 | $652 · 0 · — | $679 · 0 · — | $532 · 2 · $12,230 | $571 · 2 · $11,995 |
| V10 · Domiciliarios INTER - API | $344 · 1 · $19,610 | $361 · 1 · $22,404 | $295 · 1 · $19,185 | $340 · 1 · $20,086 | $391 · 4 · $6,845 | $267 · 3 · $5,777 | $311 · 3 · $7,146 |

## Con que numeros se calculo

*(Van impresos a proposito: una constante que se queda vieja tiene que verse en el informe, no esconderse en el calculo. Eso fue lo que costo $437.724 cuando el costo del V10 siguio en $35.000 despues de bajar a $32.000.)*

| | valor | de donde sale |
|---|---|---|
| costo impermeable | $33,000/ud | `bot/src/fletes.js` COSTO_PRODUCTO |
| costo V10 | $30,000/ud desde el 2026-10-15 (antes $32,000) | `bot/src/catalogo.js` costoUnitario |
| costo Q58 Max | $43,000/ud desde el 2026-10-15 (antes $45,000) | `bot/src/catalogo.js` costoUnitario |
| costo radios BF-777S | $40,000/caja de 2 · envio gratis, se resta el flete real de 1 paquete | `bot/src/catalogo.js` costoUnitario |
| tasa de devolucion | 22.8% | 386 guias, corte 30-sep (IC 16,8-30,2%) |
| costo de una devolucion | $3,109 | solo la prima — regla 0-AY |

⚠️ La tasa de devolucion es la de la cohorte del **impermeable**. El V10 empezo a vender a fin de septiembre (su tasa propia madura ~22-oct) y el Q58 el 16-oct (~7-nov). Mientras tanto, sus colchones son los numeros menos firmes de este informe.

*Cuenta `act_4330882710457791` · COP · America/Bogota*
