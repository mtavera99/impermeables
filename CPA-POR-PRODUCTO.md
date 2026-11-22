# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-22 12:07 Bogota.** Ventana **2026-11-15 a 2026-11-21** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $770,908 | 1381 | 83 | **$9,288** | $558 | 6.01% | $10,096,000 |
| **Q58** | $743,842 | 1195 | 44 | **$16,906** | $622 | 3.68% | $6,654,000 |
| **RADIO** | $739,586 | 541 | 47 | **$15,736** | $1,367 | 8.69% | $7,173,000 |
| **IMPERMEABLE** | $862,922 | 1118 | 70 | **$12,327** | $772 | 6.26% | $6,598,900 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,117,258** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $294 |
| anuncios clasificados por la forma de sus pedidos | 29 |
| anuncios con pedidos de MAS de un producto | 11 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

Ese gasto **no se reparte entre los productos**: repartirlo seria volver a estimar, que es justo lo que este informe vino a eliminar. Si la cifra es grande, el CPA de arriba esta medido sobre menos gasto del real.

| conjunto | gasto sin atribuir | conv |
|---|---|---|
| [EXP] Costa Caribe · V10 Intercomunicadores | $294 | 0 |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249499375070390` -> {'IMPERMEABLE': 236, 'V10': 1}
- `120250027970510390` -> {'Q58': 48, 'IMPERMEABLE': 1}
- `120250016232010390` -> {'RADIO': 82, 'Q58': 1}
- `120249499411810390` -> {'IMPERMEABLE': 136, 'V10': 1}
- `120249894780920390` -> {'Q58': 78, 'V10': 1}
- `120249619720720390` -> {'V10': 137, 'Q58': 1}
- `120249894780890390` -> {'Q58': 98, 'V10': 1}
- `120249619616140390` -> {'V10': 228, 'Q58': 4, 'IMPERMEABLE': 1}
- `120250016231990390` -> {'RADIO': 26, 'Q58': 1}
- `120249619832930390` -> {'V10': 153, 'Q58': 5}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-15 | $111,801 | 6 | $18,634 | $116,732 | 7 | $16,676 | $110,046 | 2 | $55,023 | $127,615 | 11 | $11,601 |
| 2026-11-16 | $143,424 | 14 | $10,245 | $138,697 | 6 | $23,116 | $142,235 | 11 | $12,930 | $163,817 | 15 | $10,921 |
| 2026-11-17 | $88,569 | 14 | $6,326 | $86,816 | 6 | $14,469 | $84,553 | 7 | $12,079 | $95,098 | 10 | $9,510 |
| 2026-11-18 | $113,342 | 15 | $7,556 | $117,926 | 7 | $16,847 | $117,433 | 6 | $19,572 | $143,002 | 8 | $17,875 |
| 2026-11-19 | $101,395 | 14 | $7,242 | $90,524 | 8 | $11,316 | $94,327 | 5 | $18,865 | $110,120 | 8 | $13,765 |
| 2026-11-20 | $108,954 | 9 | $12,106 | $95,106 | 6 | $15,851 | $88,319 | 2 | $44,160 | $112,539 | 9 | $12,504 |
| 2026-11-21 | $103,423 | 11 | $9,402 | $98,041 | 4 | $24,510 | $102,673 | 14 | $7,334 | $110,731 | 9 | $12,303 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,820 | **$27,716** | $9,288 | 🟡 3.0x | $1,529,561 |
| **Q58** | $40,930 | **$30,889** | $16,906 | 🟡 1.8x | $615,276 |
| **RADIO** | $53,772 | **$40,803** | $15,736 | 🟡 2.6x | $1,178,178 |
| **IMPERMEABLE** | $23,184 | **$17,189** | $12,327 | 🔴 1.4x | $340,322 |

**Utilidad de la ventana: $3,663,337** ($523,334/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-15 a 2026-11-18 · mitad 2: 2026-11-19 a 2026-11-21. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $245,000 | 314 | 28 | **$8,750** | 8.9% | $13,332 | 🟡 66% | $8,279 → $9,599 | 10.1% → 7.4% | $832 → $711 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $179,336 | 189 | 13 | **$13,795** | 6.9% | $19,589 | 🟡 70% | $14,030 → $13,266 | 7.0% → 6.7% | $979 → $884 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $151,202 | 239 | 12 | **$12,600** | 5.0% | $20,946 | 🟡 60% | $10,726 → $16,349 | 5.9% → 3.8% | $636 → $629 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $140,000 | 179 | 10 | **$14,000** | 5.6% | $20,321 | 🟡 69% | $13,905 → $14,142 | 5.8% → 5.3% | $802 → $754 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $139,996 | 188 | 4 | **$34,999** | 2.1% | $18,809 | 🔴 186% | $42,505 → $27,493 | 1.9% → 2.5% | $787 → $687 |
| IMPERMEABLE | [EXP] Sur Lluvioso · Impermeable Tradicional · _VIDEO - Copia_ | $7,388 | 9 | 1 | **$7,388** | 11.1% | $17,777 | 🟢 42% | — → $7,388 | — → 11.1% | — → $821 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $203,000 | 277 | 11 | **$18,455** | 4.0% | $31,147 | 🟡 59% | $24,589 → $13,343 | 3.0% → 5.5% | $736 → $728 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $187,550 | 191 | 13 | **$14,427** | 6.8% | $30,863 | 🟢 47% | $10,612 → $27,143 | 9.4% → 3.5% | $1,001 → $958 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $178,292 | 577 | 6 | **$29,715** | 1.0% | $30,488 | 🔴 97% | $31,327 → $26,492 | 1.0% → 1.1% | $312 → $303 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $175,000 | 150 | 10 | **$17,500** | 6.7% | $30,975 | 🟡 56% | $21,159 → $13,841 | 5.4% → 8.6% | $1,150 → $1,193 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $304,143 | 222 | 27 | **$11,265** | 12.2% | $42,952 | 🟢 26% | $14,464 → $8,705 | 9.0% → 17.0% | $1,295 → $1,484 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $228,599 | 129 | 9 | **$25,400** | 7.0% | $30,172 | 🔴 84% | $18,718 → $78,851 | 9.2% → 2.4% | $1,721 → $1,877 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $140,000 | 143 | 7 | **$20,000** | 4.9% | $49,923 | 🟢 40% | $21,294 → $18,274 | 5.3% → 4.4% | $1,136 → $806 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $50,024 | 34 | 1 | **$50,024** | 2.9% | $22,685 | 🔴 221% | $45,773 → sin pedidos | 3.0% → 0.0% | $1,387 → $4,251 |
| RADIO | [EXP] Llanos y Boyacá · Radios Baofeng · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $16,820 | 13 | 1 | **$16,820** | 7.7% | $45,845 | 🟢 37% | — → $16,820 | — → 7.7% | — → $1,294 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $249,914 | 304 | 30 | **$8,330** | 9.9% | $27,851 | 🟢 30% | $9,734 → $6,726 | 8.0% → 13.5% | $779 → $905 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $191,843 | 300 | 21 | **$9,135** | 7.0% | $27,771 | 🟢 33% | $7,616 → $12,175 | 8.1% → 5.5% | $616 → $671 |
| V10 | Motorizados - INTER · _LA RUTA_ | $178,846 | 318 | 11 | **$16,259** | 3.5% | $27,687 | 🟡 59% | $27,128 → $10,048 | 2.2% → 5.0% | $610 → $502 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $142,676 | 437 | 15 | **$9,512** | 3.4% | $27,785 | 🟢 34% | $7,842 → $14,104 | 4.2% → 2.3% | $328 → $324 |
| V10 | [EXP] Costa Caribe · V10 Intercomunicadores · _CANSADO DE GRITAR - Copia_ | $7,629 | 22 | 1 | **$7,629** | 4.5% | $27,634 | 🟢 28% | — → $7,629 | — → 4.5% | — → $347 |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _LA RUTA - Copia_ | $116 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | — → sin pedidos | — → — | — → — |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _VIDEO INTERCOMUNICADORES - Copia_ | $89 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | — → sin pedidos | — → — | — → — |
| SIN PEDIDOS | [EXP] Costa Caribe · V10 Intercomunicadores · _COMBO DOS - Copia_ | $89 | 0 | 0 | **sin pedidos** | — | — | 🔴 sin pedidos | — → sin pedidos | — → — | — → — |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-15 | 11-16 | 11-17 | 11-18 | 11-19 | 11-20 | 11-21 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $736 · 5 · $7,062 | $895 · 7 · $6,520 | $879 · 1 · $26,373 | $834 · 5 · $8,338 | $659 · 3 · $10,098 | $663 · 6 · $5,416 | $830 · 1 · $33,196 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $1,162 · 1 · $30,213 | $1,056 · 6 · $6,686 | $834 · 1 · $21,675 | $879 · 1 · $34,265 | $859 · 3 · $8,021 | $1,010 · 1 · $19,192 | $755 · 0 · — |
| IMPERMEABLE · Domiciliarios VIDEO - API | $691 · 3 · $6,448 | $525 · 0 · — | $746 · 4 · $3,917 | $691 · 1 · $23,480 | $680 · 0 · — | $578 · 1 · $24,270 | $649 · 3 · $7,137 |
| IMPERMEABLE · TEST Creativos - API | $930 · 2 · $11,158 | $824 · 0 · — | $689 · 2 · $7,918 | $762 · 2 · $10,280 | $716 · 1 · $18,612 | $1,259 · 1 · $17,631 | $581 · 2 · $10,162 |
| IMPERMEABLE · Motorizados - API | $1,022 · 0 · — | $667 · 1 · $26,027 | $972 · 1 · $15,546 | $697 · 0 · — | $697 · 1 · $17,435 | $997 · 0 · — | $517 · 1 · $18,600 |
| IMPERMEABLE · [EXP] Sur Lluvioso · Impermeable Tradicional | — | — | — | — | — | — | $821 · 1 · $7,388 |
| Q58 · Motorizados - Q58 | $813 · 1 · $29,267 | $849 · 2 · $19,110 | $744 · 1 · $23,067 | $589 · 1 · $32,390 | $664 · 5 · $5,047 | $739 · 1 · $26,614 | $784 · 0 · — |
| Q58 · Domiciliarios VIDEO Q58 - | $1,015 · 3 · $8,800 | $1,119 · 3 · $10,814 | $773 · 2 · $10,430 | $1,101 · 2 · $13,208 | $891 · 0 · — | $1,035 · 1 · $28,969 | $947 · 2 · $14,201 |
| Q58 · Domiciliarios - Expancion - Q58 | $331 · 1 · $33,383 | $303 · 1 · $36,954 | $319 · 0 · — | $298 · 2 · $15,353 | $326 · 0 · — | $240 · 0 · — | $362 · 2 · $9,040 |
| Q58 · Domiciliarios Q58 - | $1,204 · 1 · $27,681 | $1,195 · 0 · — | $1,035 · 2 · $9,311 | $1,137 · 2 · $14,206 | $1,133 · 2 · $11,334 | $1,364 · 3 · $7,728 | $1,112 · 0 · — |
| RADIO · RADIO - Seguridad / Negocios | $1,185 · 1 · $40,278 | $1,584 · 5 · $11,406 | $1,322 · 2 · $15,858 | $1,114 · 4 · $11,136 | $1,121 · 4 · $9,806 | $2,176 · 1 · $47,868 | $1,403 · 10 · $4,348 |
| RADIO · RADIO - Moteros | $2,037 · 0 · — | $1,613 · 2 · $22,577 | $1,801 · 5 · $5,763 | $1,565 · 1 · $39,114 | $1,834 · 1 · $31,186 | $1,894 · 0 · — | $1,920 · 0 · — |
| RADIO · RADIO - Fincas | $887 · 0 · — | $1,274 · 3 · $8,919 | $1,080 · 0 · — | $1,358 · 1 · $23,094 | $756 · 0 · — | $609 · 0 · — | $1,208 · 3 · $6,443 |
| RADIO · RADIO - Broad | $1,970 · 1 · $11,817 | $831 · 0 · — | $1,996 · 0 · — | $1,780 · 0 · — | $4,251 · 0 · — | — | — |
| RADIO · [EXP] Llanos y Boyacá · Radios Baofeng | — | — | — | — | — | — | $1,294 · 1 · $16,820 |
| V10 · Domiciliarios VIDEO INTER - API | $706 · 1 · $38,824 | $653 · 8 · $6,204 | $919 · 4 · $6,894 | $1,018 · 3 · $13,238 | $1,067 · 5 · $6,826 | $860 · 4 · $10,322 | $781 · 5 · $3,750 |
| V10 · Domiciliarios - Expancion - INTER | $596 · 4 · $6,706 | $625 · 2 · $16,238 | $640 · 3 · $6,398 | $611 · 5 · $5,625 | $728 · 3 · $9,218 | $633 · 4 · $6,802 | $660 · 0 · — |
| V10 · Motorizados - INTER | $652 · 0 · — | $679 · 0 · — | $532 · 2 · $12,230 | $573 · 2 · $12,023 | $475 · 2 · $11,164 | $515 · 1 · $22,124 | $518 · 4 · $6,471 |
| V10 · Domiciliarios INTER - API | $340 · 1 · $20,086 | $391 · 4 · $6,845 | $267 · 3 · $5,780 | $311 · 3 · $7,152 | $339 · 2 · $8,642 | $327 · 1 · $18,333 | $310 · 1 · $20,798 |
| V10 · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | — | — | — | — | $347 · 1 · $7,629 |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | — | — | — | — | sin conv · 0 · — |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | — | — | — | — | sin conv · 0 · — |
| SIN PEDIDOS · [EXP] Costa Caribe · V10 Intercomunicadores | — | — | — | — | — | — | sin conv · 0 · — |

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
