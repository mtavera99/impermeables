# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-23 16:17 Bogota.** Ventana **2026-11-16 a 2026-11-22** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $791,796 | 1448 | 88 | **$8,998** | $547 | 6.08% | $10,724,000 |
| **Q58** | $761,654 | 1214 | 43 | **$17,713** | $627 | 3.54% | $6,517,000 |
| **RADIO** | $803,418 | 579 | 49 | **$16,396** | $1,388 | 8.46% | $7,631,000 |
| **IMPERMEABLE** | $890,977 | 1204 | 69 | **$12,913** | $740 | 5.73% | $6,528,900 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,247,845** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $495 |
| anuncios clasificados por la forma de sus pedidos | 30 |
| anuncios con pedidos de MAS de un producto | 11 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

Ese gasto **no se reparte entre los productos**: repartirlo seria volver a estimar, que es justo lo que este informe vino a eliminar. Si la cifra es grande, el CPA de arriba esta medido sobre menos gasto del real.

| conjunto | gasto sin atribuir | conv |
|---|---|---|
| [EXP] Costa Caribe · V10 Intercomunicadores | $495 | 0 |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249499375070390` -> {'IMPERMEABLE': 241, 'V10': 1}
- `120249894780890390` -> {'Q58': 101, 'V10': 2}
- `120250016232010390` -> {'RADIO': 85, 'Q58': 1}
- `120249619832930390` -> {'Q58': 6, 'V10': 158}
- `120249619720720390` -> {'V10': 137, 'Q58': 1}
- `120249499411810390` -> {'IMPERMEABLE': 139, 'V10': 1}
- `120250016231990390` -> {'RADIO': 28, 'Q58': 1}
- `120249894780920390` -> {'Q58': 81, 'V10': 1}
- `120249619616140390` -> {'V10': 229, 'Q58': 3, 'IMPERMEABLE': 1}
- `120250027970510390` -> {'Q58': 48, 'IMPERMEABLE': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-16 | $143,424 | 14 | $10,245 | $138,697 | 6 | $23,116 | $142,235 | 11 | $12,930 | $163,817 | 15 | $10,921 |
| 2026-11-17 | $88,569 | 14 | $6,326 | $86,816 | 6 | $14,469 | $84,553 | 7 | $12,079 | $95,098 | 10 | $9,510 |
| 2026-11-18 | $113,342 | 15 | $7,556 | $117,926 | 7 | $16,847 | $117,433 | 6 | $19,572 | $143,002 | 8 | $17,875 |
| 2026-11-19 | $101,395 | 14 | $7,242 | $90,524 | 8 | $11,316 | $94,327 | 5 | $18,865 | $110,120 | 7 | $15,731 |
| 2026-11-20 | $108,962 | 9 | $12,107 | $95,116 | 5 | $19,023 | $88,324 | 2 | $44,162 | $112,539 | 8 | $14,067 |
| 2026-11-21 | $103,590 | 10 | $10,359 | $98,141 | 4 | $24,535 | $103,071 | 10 | $10,307 | $110,828 | 8 | $13,854 |
| 2026-11-22 | $132,514 | 12 | $11,043 | $134,434 | 7 | $19,205 | $173,475 | 8 | $21,684 | $155,573 | 13 | $11,967 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,784 | **$27,688** | $8,998 | 🟢 3.1x | $1,644,763 |
| **Q58** | $40,891 | **$30,859** | $17,713 | 🟡 1.7x | $565,285 |
| **RADIO** | $55,342 | **$42,015** | $16,396 | 🟡 2.6x | $1,255,336 |
| **IMPERMEABLE** | $25,258 | **$18,790** | $12,913 | 🔴 1.5x | $405,537 |

**Utilidad de la ventana: $3,870,920** ($552,989/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-16 a 2026-11-19 · mitad 2: 2026-11-20 a 2026-11-22. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $254,696 | 315 | 25 | **$10,188** | 7.9% | $17,359 | 🟡 59% | $9,000 → $12,300 | 9.0% → 6.5% | $814 → $802 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $162,256 | 287 | 12 | **$13,521** | 4.2% | $20,594 | 🟡 66% | $17,236 → $10,868 | 3.7% → 4.6% | $634 → $504 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $149,130 | 163 | 12 | **$12,428** | 7.4% | $19,740 | 🟡 63% | $12,012 → $14,506 | 7.6% → 6.2% | $917 → $907 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $145,421 | 208 | 7 | **$20,774** | 3.4% | $18,620 | 🔴 112% | $27,338 → $15,852 | 2.7% → 4.2% | $726 → $667 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $143,417 | 188 | 9 | **$15,935** | 4.8% | $20,604 | 🔴 77% | $15,945 → $15,922 | 4.7% → 4.9% | $752 → $777 |
| IMPERMEABLE | [EXP] Sur Lluvioso · Impermeable Tradicional · _VIDEO - Copia_ | $36,057 | 43 | 2 | **$18,028** | 4.7% | $17,529 | 🔴 103% | — → $18,028 | — → 4.7% | — → $839 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $204,062 | 268 | 13 | **$15,697** | 4.9% | $31,071 | 🟡 51% | $13,212 → $21,288 | 5.3% → 4.0% | $704 → $860 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $194,763 | 198 | 11 | **$17,706** | 5.6% | $30,740 | 🟡 58% | $14,825 → $22,746 | 6.5% → 4.4% | $970 → $1,000 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $184,360 | 590 | 7 | **$26,337** | 1.2% | $30,476 | 🔴 86% | $36,830 → $18,467 | 0.8% → 1.7% | $309 → $318 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $178,469 | 158 | 10 | **$17,847** | 6.3% | $30,975 | 🟡 58% | $16,797 → $19,422 | 6.7% → 5.8% | $1,132 → $1,126 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $324,412 | 234 | 27 | **$12,015** | 11.5% | $43,883 | 🟢 27% | $11,501 → $12,658 | 11.1% → 12.1% | $1,278 → $1,534 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $219,946 | 124 | 9 | **$24,438** | 7.3% | $30,172 | 🔴 81% | $16,030 → sin pedidos | 10.5% → 0.0% | $1,678 → $1,991 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $142,768 | 138 | 8 | **$17,846** | 5.8% | $51,695 | 🟢 35% | $20,888 → $14,804 | 5.2% → 6.6% | $1,085 → $971 |
| RADIO | [EXP] Llanos y Boyacá · Radios Baofeng · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $78,085 | 55 | 2 | **$39,042** | 3.6% | $48,801 | 🔴 80% | — → $39,042 | — → 3.6% | — → $1,420 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $38,207 | 28 | 0 | **sin pedidos** | 0.0% | $42,015 | 🔴 sin pedidos | sin pedidos → — | 0.0% → — | $1,365 → — |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $211,090 | 249 | 28 | **$7,539** | 11.2% | $27,729 | 🟢 27% | $7,553 → $7,505 | 11.3% → 11.1% | $853 → $834 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $201,421 | 306 | 20 | **$10,071** | 6.5% | $27,744 | 🟢 36% | $8,265 → $13,424 | 7.8% → 5.0% | $647 → $671 |
| V10 | Motorizados - INTER · _LA RUTA_ | $191,215 | 344 | 15 | **$12,748** | 4.4% | $27,655 | 🟢 46% | $17,462 → $9,605 | 3.2% → 5.7% | $566 → $544 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $153,949 | 464 | 14 | **$10,996** | 3.0% | $27,760 | 🟢 40% | $6,955 → $35,245 | 4.7% → 1.0% | $327 → $337 |
| V10 | [EXP] Costa Caribe · V10 Intercomunicadores · _CANSADO DE GRITAR - Copia_ | $34,121 | 85 | 3 | **$11,374** | 3.5% | $27,528 | 🟢 41% | — → $11,374 | — → 3.5% | — → $401 |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _VIDEO INTERCOMUNICADORES - Copia_ | $225 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | — → sin pedidos | — → — | — → — |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _COMBO DOS - Copia_ | $151 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | — → sin pedidos | — → — | — → — |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _LA RUTA - Copia_ | $119 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | — → sin pedidos | — → — | — → — |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-16 | 11-17 | 11-18 | 11-19 | 11-20 | 11-21 | 11-22 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $895 · 7 · $6,520 | $879 · 1 · $26,373 | $834 · 5 · $8,338 | $659 · 3 · $10,098 | $663 · 5 · $6,499 | $830 · 1 · $33,196 | $918 · 3 · $15,002 |
| IMPERMEABLE · Domiciliarios VIDEO - API | $525 · 0 · — | $746 · 4 · $3,917 | $691 · 1 · $23,480 | $680 · 0 · — | $578 · 1 · $24,270 | $650 · 2 · $10,726 | $399 · 4 · $7,589 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $1,056 · 6 · $6,686 | $834 · 1 · $21,675 | $879 · 1 · $34,265 | $859 · 2 · $12,031 | $1,010 · 1 · $19,192 | $755 · 0 · — | — |
| IMPERMEABLE · Motorizados - API | $667 · 1 · $26,027 | $972 · 1 · $15,546 | $697 · 0 · — | $697 · 1 · $17,435 | $997 · 0 · — | $517 · 1 · $18,603 | $646 · 3 · $8,618 |
| IMPERMEABLE · TEST Creativos - API | $824 · 0 · — | $689 · 2 · $7,918 | $762 · 2 · $10,280 | $716 · 1 · $18,612 | $1,259 · 1 · $17,631 | $581 · 2 · $10,162 | $780 · 1 · $25,734 |
| IMPERMEABLE · [EXP] Sur Lluvioso · Impermeable Tradicional | — | — | — | — | — | $826 · 1 · $7,433 | $842 · 1 · $28,624 |
| Q58 · Motorizados - Q58 | $849 · 2 · $19,110 | $744 · 1 · $23,067 | $589 · 1 · $32,390 | $664 · 5 · $5,047 | $739 · 1 · $26,614 | $784 · 0 · — | $1,123 · 3 · $10,110 |
| Q58 · Domiciliarios VIDEO Q58 - | $1,119 · 3 · $10,814 | $773 · 2 · $10,430 | $1,101 · 2 · $13,208 | $891 · 0 · — | $1,035 · 1 · $28,969 | $949 · 2 · $14,230 | $1,017 · 1 · $33,555 |
| Q58 · Domiciliarios - Expancion - Q58 | $303 · 1 · $36,954 | $319 · 0 · — | $298 · 2 · $15,353 | $326 · 0 · — | $240 · 0 · — | $362 · 2 · $9,060 | $346 · 2 · $19,700 |
| Q58 · Domiciliarios Q58 - | $1,195 · 0 · — | $1,035 · 2 · $9,311 | $1,137 · 2 · $14,206 | $1,133 · 2 · $11,334 | $1,364 · 3 · $7,728 | $1,112 · 0 · — | $1,005 · 1 · $31,150 |
| RADIO · RADIO - Seguridad / Negocios | $1,584 · 5 · $11,406 | $1,322 · 2 · $15,858 | $1,114 · 4 · $11,136 | $1,121 · 4 · $9,806 | $2,176 · 1 · $47,868 | $1,409 · 6 · $7,280 | $1,312 · 5 · $12,069 |
| RADIO · RADIO - Moteros | $1,613 · 2 · $22,577 | $1,801 · 5 · $5,763 | $1,565 · 1 · $39,114 | $1,834 · 1 · $31,186 | $1,894 · 0 · — | $1,934 · 0 · — | $2,142 · 0 · — |
| RADIO · RADIO - Fincas | $1,274 · 3 · $8,919 | $1,080 · 0 · — | $1,358 · 1 · $23,094 | $756 · 0 · — | $609 · 0 · — | $1,208 · 3 · $6,443 | $1,266 · 1 · $24,056 |
| RADIO · [EXP] Llanos y Boyacá · Radios Baofeng | — | — | — | — | — | $1,296 · 1 · $16,852 | $1,458 · 1 · $61,233 |
| RADIO · RADIO - Broad | $831 · 0 · — | $1,996 · 0 · — | $1,780 · 0 · — | $4,251 · 0 · — | — | — | — |
| V10 · Domiciliarios VIDEO INTER - API | $653 · 8 · $6,204 | $919 · 4 · $6,894 | $1,018 · 3 · $13,238 | $1,067 · 5 · $6,826 | $860 · 3 · $13,762 | $781 · 5 · $3,750 | — |
| V10 · Domiciliarios - Expancion - INTER | $625 · 2 · $16,238 | $640 · 3 · $6,398 | $611 · 5 · $5,625 | $728 · 3 · $9,218 | $633 · 4 · $6,804 | $661 · 0 · — | $712 · 3 · $12,108 |
| V10 · Motorizados - INTER | $679 · 0 · — | $532 · 2 · $12,230 | $573 · 2 · $12,023 | $475 · 2 · $11,164 | $515 · 1 · $22,124 | $519 · 4 · $6,493 | $581 · 4 · $9,587 |
| V10 · Domiciliarios INTER - API | $391 · 4 · $6,845 | $267 · 3 · $5,780 | $311 · 3 · $7,152 | $339 · 2 · $8,642 | $327 · 1 · $18,333 | $311 · 0 · — | $365 · 1 · $31,353 |
| V10 · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | — | — | — | $347 · 1 · $7,634 | $420 · 2 · $13,244 |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | — | — | — | sin conv · 0 · — | sin conv · 0 · — |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | — | — | — | sin conv · 0 · — | sin conv · 0 · — |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | — | — | — | sin conv · 0 · — | sin conv · 0 · — |

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
