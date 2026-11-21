# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-21 11:45 Bogota.** Ventana **2026-11-14 a 2026-11-20** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $768,029 | 1372 | 85 | **$9,036** | $560 | 6.20% | $10,322,000 |
| **Q58** | $745,715 | 1218 | 48 | **$15,536** | $612 | 3.94% | $7,229,000 |
| **RADIO** | $732,771 | 543 | 39 | **$18,789** | $1,349 | 7.18% | $5,701,000 |
| **IMPERMEABLE** | $885,963 | 1117 | 73 | **$12,136** | $793 | 6.54% | $6,899,900 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,132,478** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 26 |
| anuncios con pedidos de MAS de un producto | 11 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619616140390` -> {'V10': 226, 'Q58': 4, 'IMPERMEABLE': 1}
- `120250016231990390` -> {'RADIO': 25, 'Q58': 1}
- `120250016232010390` -> {'RADIO': 73, 'Q58': 1}
- `120249619720720390` -> {'V10': 135, 'Q58': 1}
- `120249499375070390` -> {'IMPERMEABLE': 234, 'V10': 1}
- `120249619832930390` -> {'V10': 153, 'Q58': 5}
- `120249894780890390` -> {'Q58': 96, 'V10': 1}
- `120249894780920390` -> {'Q58': 77, 'V10': 1}
- `120249499411810390` -> {'IMPERMEABLE': 133, 'V10': 1}
- `120250027970510390` -> {'Q58': 44, 'IMPERMEABLE': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-14 | $100,779 | 13 | $7,752 | $100,030 | 8 | $12,504 | $96,213 | 6 | $16,036 | $133,945 | 12 | $11,162 |
| 2026-11-15 | $111,801 | 6 | $18,634 | $116,732 | 7 | $16,676 | $110,046 | 2 | $55,023 | $127,615 | 11 | $11,601 |
| 2026-11-16 | $143,424 | 14 | $10,245 | $138,697 | 6 | $23,116 | $142,235 | 11 | $12,930 | $163,817 | 15 | $10,921 |
| 2026-11-17 | $88,569 | 14 | $6,326 | $86,816 | 6 | $14,469 | $84,553 | 7 | $12,079 | $95,098 | 10 | $9,510 |
| 2026-11-18 | $113,342 | 15 | $7,556 | $117,926 | 7 | $16,847 | $117,433 | 6 | $19,572 | $143,002 | 8 | $17,875 |
| 2026-11-19 | $101,395 | 14 | $7,242 | $90,524 | 8 | $11,316 | $94,314 | 5 | $18,863 | $110,120 | 8 | $13,765 |
| 2026-11-20 | $108,719 | 9 | $12,080 | $94,990 | 6 | $15,832 | $87,977 | 2 | $43,988 | $112,366 | 9 | $12,485 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,860 | **$27,747** | $9,036 | 🟢 3.1x | $1,590,439 |
| **Q58** | $41,030 | **$30,966** | $15,536 | 🟡 2.0x | $740,658 |
| **RADIO** | $51,606 | **$39,131** | $18,789 | 🟡 2.1x | $793,327 |
| **IMPERMEABLE** | $23,796 | **$17,662** | $12,136 | 🔴 1.5x | $403,334 |

**Utilidad de la ventana: $3,527,759** ($503,966/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-14 a 2026-11-17 · mitad 2: 2026-11-18 a 2026-11-20. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $249,110 | 322 | 30 | **$8,304** | 9.3% | $13,998 | 🟡 59% | $9,044 → $7,458 | 9.0% → 9.7% | $818 → $720 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $201,711 | 203 | 14 | **$14,408** | 6.9% | $19,460 | 🟡 74% | $13,802 → $15,499 | 7.7% → 5.8% | $1,062 → $901 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $151,456 | 239 | 13 | **$11,650** | 5.4% | $23,277 | 🟡 50% | $7,638 → $33,718 | 8.2% → 1.9% | $627 → $642 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $142,859 | 175 | 3 | **$47,620** | 1.7% | $19,318 | 🔴 247% | $41,752 → $59,354 | 2.0% → 1.3% | $852 → $771 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $140,827 | 178 | 10 | **$14,083** | 5.6% | $19,223 | 🟡 73% | $14,005 → $14,199 | 5.4% → 6.0% | $757 → $848 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $202,456 | 288 | 14 | **$14,461** | 4.9% | $31,157 | 🟢 46% | $16,890 → $12,032 | 4.4% → 5.4% | $744 → $653 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $184,690 | 593 | 4 | **$46,172** | 0.7% | $30,529 | 🔴 151% | $59,582 → $32,762 | 0.5% → 0.9% | $326 → $287 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $183,964 | 196 | 15 | **$12,264** | 7.7% | $30,927 | 🟢 40% | $8,711 → $26,476 | 10.3% → 3.8% | $893 → $1,005 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $174,605 | 141 | 10 | **$17,460** | 7.1% | $30,975 | 🟡 56% | $33,447 → $10,609 | 3.8% → 11.3% | $1,270 → $1,198 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $297,022 | 221 | 19 | **$15,633** | 8.6% | $42,700 | 🟢 37% | $16,558 → $14,605 | 8.1% → 9.3% | $1,335 → $1,355 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $239,201 | 139 | 11 | **$21,746** | 7.9% | $33,022 | 🟡 66% | $16,044 → $47,401 | 10.7% → 3.6% | $1,719 → $1,724 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $138,281 | 144 | 4 | **$34,570** | 2.8% | $53,041 | 🟡 65% | $26,577 → $58,550 | 4.0% → 1.4% | $1,063 → $849 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $58,267 | 39 | 3 | **$19,422** | 7.7% | $23,622 | 🔴 82% | $14,445 → sin pedidos | 9.4% → 0.0% | $1,354 → $2,133 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $267,199 | 336 | 31 | **$8,619** | 9.2% | $27,904 | 🟢 31% | $8,009 → $9,586 | 8.8% → 10.1% | $701 → $967 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $184,239 | 289 | 24 | **$7,677** | 8.3% | $27,769 | 🟢 28% | $8,443 → $6,910 | 7.4% → 9.4% | $625 → $653 |
| V10 | Motorizados - INTER · _LA RUTA_ | $175,565 | 312 | 8 | **$21,946** | 2.6% | $27,653 | 🔴 79% | $35,699 → $13,694 | 1.7% → 3.8% | $595 → $519 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $141,026 | 435 | 15 | **$9,402** | 3.4% | $27,797 | 🟢 34% | $9,332 → $9,506 | 3.5% → 3.4% | $324 → $324 |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | 11-19 | 11-20 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $779 · 3 · $12,460 | $736 · 5 · $7,062 | $895 · 7 · $6,520 | $879 · 1 · $26,373 | $834 · 5 · $8,338 | $659 · 3 · $10,098 | $662 · 6 · $5,404 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $1,193 · 1 · $32,210 | $1,162 · 1 · $30,213 | $1,056 · 6 · $6,686 | $834 · 1 · $21,675 | $879 · 1 · $34,265 | $859 · 3 · $8,021 | $1,009 · 1 · $19,169 |
| IMPERMEABLE · Domiciliarios VIDEO - API | $657 · 4 · $5,424 | $691 · 3 · $6,448 | $525 · 0 · — | $746 · 4 · $3,917 | $691 · 1 · $23,480 | $680 · 0 · — | $577 · 1 · $24,239 |
| IMPERMEABLE · Motorizados - API | $935 · 0 · — | $1,022 · 0 · — | $667 · 1 · $26,027 | $972 · 1 · $15,546 | $697 · 0 · — | $697 · 1 · $17,435 | $995 · 0 · — |
| IMPERMEABLE · TEST Creativos - API | $622 · 2 · $10,580 | $930 · 2 · $11,158 | $824 · 0 · — | $689 · 2 · $7,918 | $762 · 2 · $10,280 | $716 · 1 · $18,612 | $1,259 · 1 · $17,624 |
| Q58 · Motorizados - Q58 | $589 · 3 · $9,226 | $813 · 1 · $29,267 | $849 · 2 · $19,110 | $744 · 1 · $23,067 | $589 · 1 · $32,390 | $664 · 5 · $5,047 | $739 · 1 · $26,600 |
| Q58 · Domiciliarios - Expancion - Q58 | $372 · 0 · — | $331 · 1 · $33,383 | $303 · 1 · $36,954 | $319 · 0 · — | $298 · 2 · $15,353 | $326 · 0 · — | $239 · 0 · — |
| Q58 · Domiciliarios VIDEO Q58 - | $709 · 4 · $6,208 | $1,015 · 3 · $8,800 | $1,119 · 3 · $10,814 | $773 · 2 · $10,430 | $1,101 · 2 · $13,208 | $891 · 0 · — | $1,034 · 1 · $28,953 |
| Q58 · Domiciliarios Q58 - | $1,913 · 0 · — | $1,204 · 1 · $27,681 | $1,195 · 0 · — | $1,035 · 2 · $9,311 | $1,137 · 2 · $14,206 | $1,133 · 2 · $11,334 | $1,364 · 3 · $7,728 |
| RADIO · RADIO - Seguridad / Negocios | $1,219 · 2 · $18,279 | $1,185 · 1 · $40,278 | $1,584 · 5 · $11,406 | $1,322 · 2 · $15,858 | $1,114 · 4 · $11,136 | $1,121 · 4 · $9,806 | $2,167 · 1 · $47,670 |
| RADIO · RADIO - Moteros | $1,535 · 2 · $16,882 | $2,037 · 0 · — | $1,613 · 2 · $22,577 | $1,801 · 5 · $5,763 | $1,565 · 1 · $39,114 | $1,834 · 1 · $31,173 | $1,886 · 0 · — |
| RADIO · RADIO - Fincas | $1,038 · 0 · — | $887 · 0 · — | $1,274 · 3 · $8,919 | $1,080 · 0 · — | $1,358 · 1 · $23,094 | $756 · 0 · — | $607 · 0 · — |
| RADIO · RADIO - Broad | $1,649 · 2 · $4,122 | $1,970 · 1 · $11,817 | $831 · 0 · — | $1,996 · 0 · — | $1,780 · 0 · — | $4,251 · 0 · — | — |
| V10 · Domiciliarios VIDEO INTER - API | $645 · 6 · $6,023 | $706 · 1 · $38,824 | $653 · 8 · $6,204 | $919 · 4 · $6,894 | $1,018 · 3 · $13,238 | $1,067 · 5 · $6,826 | $858 · 4 · $10,296 |
| V10 · Domiciliarios - Expancion - INTER | $652 · 3 · $7,607 | $596 · 4 · $6,706 | $625 · 2 · $16,238 | $640 · 3 · $6,398 | $611 · 5 · $5,625 | $728 · 3 · $9,218 | $631 · 4 · $6,786 |
| V10 · Motorizados - INTER | $514 · 1 · $22,633 | $652 · 0 · — | $679 · 0 · — | $532 · 2 · $12,230 | $573 · 2 · $12,023 | $475 · 2 · $11,164 | $514 · 1 · $22,094 |
| V10 · Domiciliarios INTER - API | $295 · 1 · $19,185 | $340 · 1 · $20,086 | $391 · 4 · $6,845 | $267 · 3 · $5,780 | $311 · 3 · $7,152 | $339 · 2 · $8,642 | $327 · 1 · $18,296 |

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
