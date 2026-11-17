# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-17 13:31 Bogota.** Ventana **2026-11-10 a 2026-11-16** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $770,542 | 1400 | 96 | **$8,026** | $550 | 6.86% | $11,562,000 |
| **Q58** | $776,345 | 1317 | 54 | **$14,377** | $589 | 4.10% | $8,230,900 |
| **RADIO** | $761,082 | 579 | 43 | **$17,700** | $1,314 | 7.43% | $6,807,000 |
| **IMPERMEABLE** | $902,920 | 1150 | 70 | **$12,899** | $785 | 6.09% | $6,652,000 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,210,889** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 25 |
| anuncios con pedidos de MAS de un producto | 10 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619616140390` -> {'V10': 212, 'Q58': 3, 'IMPERMEABLE': 1}
- `120249619832930390` -> {'V10': 141, 'Q58': 4}
- `120249619720720390` -> {'V10': 127, 'Q58': 1}
- `120250016232010390` -> {'RADIO': 62, 'Q58': 1}
- `120249894780920390` -> {'Q58': 72, 'V10': 1}
- `120250016231990390` -> {'RADIO': 22, 'Q58': 1}
- `120249894780890390` -> {'Q58': 91, 'V10': 1}
- `120250027970510390` -> {'Q58': 43, 'IMPERMEABLE': 1}
- `120249499411810390` -> {'IMPERMEABLE': 131, 'V10': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-10 | $94,920 | 18 | $5,273 | $94,787 | 7 | $13,541 | $87,913 | 5 | $17,583 | $99,687 | 9 | $11,076 |
| 2026-11-11 | $108,412 | 15 | $7,227 | $115,195 | 14 | $8,228 | $105,544 | 4 | $26,386 | $120,114 | 6 | $20,019 |
| 2026-11-12 | $99,717 | 13 | $7,671 | $102,965 | 4 | $25,741 | $101,687 | 8 | $12,711 | $118,947 | 7 | $16,992 |
| 2026-11-13 | $111,777 | 15 | $7,452 | $108,072 | 4 | $27,018 | $117,984 | 6 | $19,664 | $139,071 | 10 | $13,907 |
| 2026-11-14 | $100,779 | 14 | $7,198 | $100,030 | 11 | $9,094 | $96,213 | 6 | $16,036 | $133,945 | 12 | $11,162 |
| 2026-11-15 | $111,801 | 7 | $15,972 | $116,732 | 8 | $14,592 | $110,046 | 3 | $36,682 | $127,615 | 11 | $11,601 |
| 2026-11-16 | $143,136 | 14 | $10,224 | $138,564 | 6 | $23,094 | $141,695 | 11 | $12,881 | $163,541 | 15 | $10,903 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,960 | **$27,824** | $8,026 | 🟢 3.5x | $1,900,569 |
| **Q58** | $41,972 | **$31,694** | $14,377 | 🟡 2.2x | $935,127 |
| **RADIO** | $56,366 | **$42,806** | $17,700 | 🟡 2.4x | $1,079,577 |
| **IMPERMEABLE** | $26,882 | **$20,044** | $12,899 | 🟡 1.6x | $500,137 |

**Utilidad de la ventana: $4,415,410** ($630,773/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-10 a 2026-11-13 · mitad 2: 2026-11-14 a 2026-11-16. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $252,504 | 322 | 22 | **$11,477** | 6.8% | $18,196 | 🟡 63% | $19,177 → $7,884 | 4.0% → 10.2% | $767 → $805 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $216,269 | 221 | 14 | **$15,448** | 6.3% | $18,765 | 🔴 82% | $18,960 → $12,814 | 4.6% → 8.8% | $875 → $1,126 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $145,303 | 234 | 14 | **$10,379** | 6.0% | $24,621 | 🟢 42% | $11,006 → $9,752 | 5.8% → 6.2% | $637 → $604 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $145,142 | 186 | 8 | **$18,143** | 4.3% | $20,897 | 🔴 87% | $11,039 → $67,871 | 6.7% → 1.2% | $743 → $828 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $143,702 | 187 | 6 | **$23,950** | 3.2% | $17,795 | 🔴 135% | $37,755 → $17,048 | 2.0% → 4.5% | $763 → $775 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $212,239 | 298 | 17 | **$12,485** | 5.7% | $33,608 | 🟢 37% | $13,009 → $11,894 | 5.3% → 6.2% | $689 → $743 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $209,741 | 647 | 8 | **$26,218** | 1.2% | $30,546 | 🔴 86% | $22,991 → $31,595 | 1.4% → 1.0% | $321 → $328 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $177,809 | 216 | 20 | **$8,890** | 9.3% | $30,878 | 🟢 29% | $9,413 → $8,368 | 7.9% → 11.1% | $747 → $930 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $176,556 | 156 | 6 | **$29,426** | 3.8% | $30,853 | 🔴 95% | $23,711 → $40,856 | 4.2% → 3.3% | $998 → $1,340 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $293,937 | 244 | 24 | **$12,247** | 9.8% | $44,822 | 🟢 27% | $10,680 → $14,859 | 10.4% → 9.0% | $1,113 → $1,337 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $251,415 | 147 | 6 | **$41,902** | 4.1% | $34,265 | 🔴 122% | $68,000 → $28,854 | 2.5% → 5.9% | $1,722 → $1,697 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $144,480 | 139 | 7 | **$20,640** | 5.0% | $52,179 | 🟢 40% | $19,749 → $21,828 | 5.2% → 4.8% | $1,026 → $1,056 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $71,250 | 49 | 4 | **$17,812** | 8.2% | $24,866 | 🟡 72% | $37,928 → $11,107 | 4.5% → 11.1% | $1,724 → $1,234 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $264,514 | 380 | 41 | **$6,452** | 10.8% | $27,971 | 🟢 23% | $5,603 → $7,778 | 13.0% → 8.6% | $726 → $665 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $180,775 | 285 | 25 | **$7,231** | 8.8% | $27,675 | 🟢 26% | $6,169 → $9,120 | 10.5% → 6.8% | $645 → $622 |
| V10 | Motorizados - INTER · _LA RUTA_ | $177,731 | 290 | 13 | **$13,672** | 4.5% | $27,695 | 🟢 49% | $8,650 → $41,290 | 7.1% → 1.5% | $610 → $616 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $147,522 | 445 | 10 | **$14,752** | 2.2% | $27,847 | 🟡 53% | $20,226 → $11,103 | 1.6% → 3.1% | $322 → $343 |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-10 | 11-11 | 11-12 | 11-13 | 11-14 | 11-15 | 11-16 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $489 · 3 · $9,624 | $856 · 1 · $32,509 | $757 · 0 · — | $1,151 · 3 · $13,429 | $779 · 3 · $12,460 | $736 · 5 · $7,062 | $894 · 7 · $6,511 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $711 · 3 · $7,820 | $841 · 3 · $9,816 | $842 · 0 · — | $1,140 · 0 · — | $1,193 · 1 · $32,210 | $1,162 · 1 · $30,213 | $1,055 · 6 · $6,681 |
| IMPERMEABLE · Domiciliarios VIDEO - API | $532 · 2 · $7,450 | $635 · 1 · $19,679 | $939 · 3 · $6,260 | $564 · 1 · $23,680 | $657 · 4 · $5,424 | $691 · 3 · $6,448 | $524 · 0 · — |
| IMPERMEABLE · Motorizados - API | $597 · 1 · $17,313 | $840 · 1 · $18,490 | $770 · 2 · $9,630 | $793 · 3 · $7,402 | $935 · 0 · — | $1,022 · 0 · — | $665 · 1 · $25,939 |
| IMPERMEABLE · TEST Creativos - API | $797 · 0 · — | $740 · 0 · — | $894 · 1 · $20,555 | $661 · 1 · $19,824 | $622 · 2 · $10,580 | $930 · 2 · $11,158 | $824 · 0 · — |
| Q58 · Motorizados - Q58 | $646 · 0 · — | $643 · 5 · $5,785 | $913 · 1 · $31,035 | $612 · 3 · $9,993 | $589 · 4 · $6,920 | $813 · 2 · $14,634 | $849 · 2 · $19,105 |
| Q58 · Domiciliarios - Expancion - Q58 | $290 · 1 · $22,652 | $296 · 2 · $17,160 | $360 · 1 · $26,665 | $348 · 1 · $31,318 | $372 · 1 · $24,562 | $331 · 1 · $33,383 | $302 · 1 · $36,840 |
| Q58 · Domiciliarios VIDEO Q58 - | $798 · 3 · $7,182 | $603 · 7 · $3,788 | $800 · 0 · — | $880 · 0 · — | $709 · 4 · $6,208 | $1,015 · 3 · $8,800 | $1,119 · 3 · $10,814 |
| Q58 · Domiciliarios Q58 - | $1,066 · 2 · $11,720 | $877 · 0 · — | $1,051 · 2 · $11,035 | $1,039 · 0 · — | $1,913 · 1 · $22,958 | $1,204 · 1 · $27,681 | $1,195 · 0 · — |
| RADIO · RADIO - Seguridad / Negocios | $1,417 · 2 · $19,124 | $1,142 · 2 · $18,842 | $937 · 7 · $5,753 | $1,073 · 4 · $11,000 | $1,219 · 2 · $18,279 | $1,185 · 2 · $20,139 | $1,580 · 5 · $11,379 |
| RADIO · RADIO - Moteros | $2,246 · 0 · — | $1,757 · 0 · — | $2,042 · 1 · $32,678 | $1,314 · 1 · $40,748 | $1,535 · 2 · $16,882 | $2,037 · 0 · — | $1,607 · 2 · $22,494 |
| RADIO · RADIO - Fincas | $639 · 2 · $6,393 | $1,254 · 2 · $11,908 | $939 · 0 · — | $1,359 · 0 · — | $1,038 · 0 · — | $887 · 0 · — | $1,264 · 3 · $8,850 |
| RADIO · RADIO - Broad | sin conv · 0 · — | $970 · 0 · — | $1,617 · 0 · — | $1,916 · 1 · $11,493 | $1,649 · 2 · $4,122 | $1,970 · 1 · $11,817 | $829 · 0 · — |
| V10 · Domiciliarios VIDEO INTER - API | $601 · 11 · $3,057 | $713 · 6 · $6,182 | $875 · 2 · $16,634 | $768 · 6 · $6,014 | $645 · 7 · $5,163 | $706 · 1 · $38,824 | $651 · 8 · $6,185 |
| V10 · Domiciliarios - Expancion - INTER | $700 · 5 · $4,618 | $623 · 2 · $11,846 | $606 · 4 · $6,212 | $660 · 5 · $5,413 | $652 · 3 · $7,607 | $596 · 4 · $6,706 | $624 · 2 · $16,218 |
| V10 · Motorizados - INTER | $639 · 1 · $19,814 | $484 · 4 · $6,781 | $758 · 3 · $7,330 | $656 · 3 · $8,741 | $514 · 1 · $22,633 | $652 · 1 · $26,069 | $678 · 0 · — |
| V10 · Domiciliarios INTER - API | $306 · 0 · — | $285 · 2 · $10,254 | $344 · 1 · $19,610 | $361 · 1 · $22,404 | $295 · 1 · $19,185 | $340 · 1 · $20,086 | $391 · 4 · $6,836 |

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
