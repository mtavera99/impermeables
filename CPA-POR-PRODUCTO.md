# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-10 15:03 Bogota.** Ventana **2026-11-03 a 2026-11-09** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $729,615 | 1473 | 98 | **$7,445** | $495 | 6.65% | $11,978,000 |
| **Q58** | $752,663 | 1467 | 67 | **$11,234** | $513 | 4.57% | $10,079,000 |
| **RADIO** | $719,847 | 639 | 41 | **$17,557** | $1,127 | 6.42% | $5,949,000 |
| **IMPERMEABLE** | $863,202 | 1808 | 112 | **$7,707** | $477 | 6.19% | $10,029,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,065,327** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 23 |
| anuncios con pedidos de MAS de un producto | 9 ⚠️ |
| pedidos resueltos por su anuncio (intercomunicador de 1 unidad) | 1 |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120250016232010390` -> {'RADIO': 39, 'Q58': 1}
- `120249619616140390` -> {'V10': 176, 'Q58': 3, 'IMPERMEABLE': 1}
- `120250027970510390` -> {'Q58': 36, 'IMPERMEABLE': 1}
- `120249894780890390` -> {'Q58': 72, 'V10': 1}
- `120249619832930390` -> {'V10': 116, 'Q58': 4}
- `120249894780920390` -> {'V10': 1, 'Q58': 54}
- `120250016231990390` -> {'RADIO': 15, 'Q58': 1}
- `120249619720720390` -> {'V10': 116, 'Q58': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-03 | $101,134 | 18 | $5,619 | $111,763 | 12 | $9,314 | $104,529 | 3 | $34,843 | $123,315 | 13 | $9,486 |
| 2026-11-04 | $91,354 | 13 | $7,027 | $84,008 | 9 | $9,334 | $92,038 | 2 | $46,019 | $96,827 | 11 | $8,802 |
| 2026-11-05 | $121,950 | 23 | $5,302 | $128,726 | 11 | $11,702 | $114,176 | 5 | $22,835 | $148,114 | 17 | $8,713 |
| 2026-11-06 | $102,906 | 9 | $11,434 | $104,792 | 12 | $8,733 | $96,938 | 8 | $12,117 | $127,366 | 17 | $7,492 |
| 2026-11-07 | $86,229 | 8 | $10,779 | $88,834 | 8 | $11,104 | $87,494 | 10 | $8,749 | $105,167 | 20 | $5,258 |
| 2026-11-08 | $111,458 | 14 | $7,961 | $116,411 | 8 | $14,551 | $114,424 | 6 | $19,071 | $134,770 | 16 | $8,423 |
| 2026-11-09 | $114,584 | 13 | $8,814 | $118,129 | 7 | $16,876 | $110,248 | 7 | $15,750 | $127,643 | 18 | $7,091 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,768 | **$27,676** | $7,445 | 🟢 3.7x | $1,982,637 |
| **Q58** | $41,049 | **$30,981** | $11,234 | 🟡 2.8x | $1,323,070 |
| **RADIO** | $51,452 | **$39,012** | $17,557 | 🟡 2.2x | $879,663 |
| **IMPERMEABLE** | $25,363 | **$18,871** | $7,707 | 🟡 2.4x | $1,250,399 |

**Utilidad de la ventana: $5,435,769** ($776,538/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-03 a 2026-11-06 · mitad 2: 2026-11-07 a 2026-11-09. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $241,410 | 518 | 37 | **$6,525** | 7.1% | $18,268 | 🟢 36% | $6,305 → $6,847 | 7.5% → 6.7% | $472 → $458 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $208,695 | 361 | 15 | **$13,913** | 4.2% | $17,500 | 🔴 80% | $11,987 → $17,765 | 4.9% → 3.2% | $585 → $569 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $139,206 | 232 | 9 | **$15,467** | 3.9% | $18,902 | 🔴 82% | $79,942 → $7,408 | 0.8% → 7.7% | $625 → $570 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $137,035 | 379 | 24 | **$5,710** | 6.3% | $20,060 | 🟢 28% | $6,514 → $4,905 | 5.5% → 7.5% | $355 → $370 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $136,856 | 318 | 20 | **$6,843** | 6.3% | $18,210 | 🟢 38% | $6,578 → $7,241 | 6.7% → 5.8% | $441 → $417 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $199,759 | 727 | 9 | **$22,195** | 1.2% | $30,530 | 🟡 73% | $14,217 → $86,026 | 1.9% → 0.3% | $265 → $289 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $194,452 | 308 | 20 | **$9,723** | 6.5% | $30,697 | 🟢 32% | $8,515 → $11,965 | 7.5% → 5.2% | $640 → $620 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $180,269 | 178 | 9 | **$20,030** | 5.1% | $31,014 | 🟡 65% | $34,714 → $12,688 | 3.0% → 7.6% | $1,052 → $964 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $178,183 | 254 | 22 | **$8,099** | 8.7% | $31,001 | 🟢 26% | $6,714 → $11,067 | 10.9% → 6.0% | $735 → $662 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $269,920 | 286 | 21 | **$12,853** | 7.3% | $43,283 | 🟢 30% | $12,819 → $12,899 | 7.5% → 7.1% | $961 → $921 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $241,805 | 140 | 10 | **$24,180** | 7.1% | $31,621 | 🔴 76% | $45,137 → $15,199 | 4.5% → 9.5% | $2,052 → $1,438 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $138,531 | 157 | 9 | **$15,392** | 5.7% | $41,534 | 🟢 37% | $19,890 → $11,794 | 4.4% → 7.6% | $874 → $893 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $69,591 | 56 | 2 | **$34,796** | 3.6% | $22,685 | 🔴 153% | sin pedidos → $15,354 | 0.0% → 8.7% | $1,178 → $1,335 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $246,563 | 400 | 48 | **$5,137** | 12.0% | $27,975 | 🟢 18% | $4,506 → $6,286 | 14.4% → 9.2% | $650 → $578 |
| V10 | Motorizados - INTER · _LA RUTA_ | $176,454 | 334 | 14 | **$12,604** | 4.2% | $27,551 | 🟢 46% | $11,080 → $15,346 | 4.9% → 3.3% | $545 → $508 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $173,093 | 312 | 22 | **$7,868** | 7.1% | $27,658 | 🟢 28% | $6,655 → $10,466 | 8.0% → 5.6% | $531 → $591 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $133,505 | 427 | 9 | **$14,834** | 2.1% | $27,734 | 🟡 53% | $13,016 → $18,470 | 2.4% → 1.7% | $317 → $306 |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-03 | 11-04 | 11-05 | 11-06 | 11-07 | 11-08 | 11-09 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $511 · 5 · $6,844 | $426 · 4 · $6,717 | $495 · 9 · $4,680 | $449 · 4 · $8,877 | $453 · 3 · $9,809 | $430 · 3 · $12,615 | $499 · 9 · $3,936 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $624 · 4 · $7,335 | $662 · 2 · $12,243 | $555 · 3 · $11,654 | $536 · 1 · $31,082 | $641 · 1 · $24,990 | $543 · 3 · $11,035 | $549 · 1 · $30,732 |
| IMPERMEABLE · TEST Creativos - API | $559 · 0 · — | $490 · 0 · — | $780 · 1 · $24,953 | $662 · 0 · — | $425 · 4 · $4,033 | $629 · 2 · $10,689 | $680 · 2 · $10,876 |
| IMPERMEABLE · Domiciliarios VIDEO - API | $421 · 2 · $9,690 | $375 · 3 · $5,123 | $326 · 1 · $23,164 | $327 · 6 · $3,376 | $363 · 5 · $3,557 | $344 · 4 · $5,338 | $411 · 3 · $6,574 |
| IMPERMEABLE · Motorizados - API | $390 · 1 · $19,126 | $582 · 2 · $8,439 | $477 · 3 · $7,640 | $377 · 6 · $3,334 | $351 · 4 · $4,208 | $390 · 3 · $7,029 | $541 · 1 · $20,009 |
| Q58 · Domiciliarios - Expancion - Q58 | $253 · 3 · $9,786 | $238 · 1 · $21,145 | $307 · 1 · $34,111 | $258 · 3 · $9,706 | $295 · 0 · — | $265 · 1 · $32,606 | $314 · 0 · — |
| Q58 · Motorizados - Q58 | $559 · 3 · $9,501 | $621 · 3 · $7,447 | $738 · 3 · $11,556 | $646 · 4 · $6,297 | $441 · 5 · $5,117 | $683 · 1 · $30,034 | $852 · 1 · $28,132 |
| Q58 · Domiciliarios Q58 - | $992 · 0 · — | $1,766 · 1 · $19,429 | $975 · 1 · $31,193 | $919 · 1 · $25,734 | $1,059 · 1 · $19,055 | $773 · 2 · $13,522 | $1,155 · 3 · $10,009 |
| Q58 · Domiciliarios VIDEO Q58 - | $622 · 6 · $4,353 | $1,507 · 2 · $10,547 | $701 · 4 · $7,188 | $619 · 3 · $8,250 | $741 · 1 · $21,500 | $581 · 3 · $8,909 | $696 · 3 · $9,747 |
| RADIO · RADIO - Seguridad / Negocios | $888 · 1 · $39,067 | $1,325 · 2 · $17,222 | $831 · 2 · $21,614 | $976 · 7 · $5,298 | $1,003 · 3 · $11,031 | $914 · 1 · $43,877 | $869 · 5 · $7,824 |
| RADIO · RADIO - Moteros | $1,901 · 1 · $36,122 | $1,800 · 1 · $28,792 | $1,835 · 1 · $38,542 | $3,195 · 0 · — | $1,572 · 4 · $7,860 | $1,178 · 2 · $18,844 | $1,694 · 1 · $37,269 |
| RADIO · RADIO - Fincas | $1,014 · 1 · $19,259 | $669 · 1 · $19,407 | $801 · 1 · $22,424 | $1,231 · 1 · $18,471 | $752 · 1 · $15,786 | $725 · 3 · $7,007 | $1,385 · 1 · $22,164 |
| RADIO · RADIO - Broad | $916 · 0 · — | $1,342 · 0 · — | $1,997 · 0 · — | $942 · 0 · — | $1,435 · 2 · $3,588 | $1,184 · 0 · — | $1,462 · 0 · — |
| V10 · Domiciliarios VIDEO INTER - API | $563 · 8 · $4,225 | $657 · 6 · $4,925 | $701 · 13 · $3,237 | $685 · 4 · $8,567 | $528 · 2 · $15,589 | $565 · 8 · $4,658 | $640 · 7 · $5,490 |
| V10 · Motorizados - INTER | $507 · 3 · $8,284 | $629 · 4 · $5,822 | $524 · 0 · — | $540 · 2 · $12,160 | $517 · 2 · $9,822 | $460 · 1 · $27,578 | $557 · 2 · $14,754 |
| V10 · Domiciliarios - Expancion - INTER | $496 · 3 · $7,777 | $623 · 2 · $10,894 | $618 · 8 · $3,706 | $432 · 2 · $12,531 | $621 · 3 · $6,622 | $512 · 2 · $14,082 | $682 · 2 · $12,616 |
| V10 · Domiciliarios INTER - API | $290 · 3 · $6,384 | $380 · 1 · $16,726 | $319 · 2 · $11,480 | $301 · 0 · — | $317 · 0 · — | $288 · 2 · $9,228 | $315 · 1 · $21,416 |

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
