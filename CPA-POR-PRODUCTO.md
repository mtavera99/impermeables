# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-20 12:46 Bogota.** Ventana **2026-11-13 a 2026-11-19** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $770,886 | 1372 | 91 | **$8,471** | $562 | 6.63% | $11,027,000 |
| **Q58** | $758,756 | 1257 | 46 | **$16,495** | $604 | 3.66% | $6,972,900 |
| **RADIO** | $762,418 | 576 | 43 | **$17,731** | $1,324 | 7.47% | $6,157,000 |
| **IMPERMEABLE** | $912,540 | 1138 | 74 | **$12,332** | $802 | 6.50% | $6,980,900 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$3,204,600** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 26 |
| anuncios con pedidos de MAS de un producto | 11 ⚠️ |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120249619832930390` -> {'V10': 150, 'Q58': 5}
- `120249894780920390` -> {'Q58': 77, 'V10': 1}
- `120249499375070390` -> {'IMPERMEABLE': 229, 'V10': 1}
- `120249619616140390` -> {'Q58': 4, 'V10': 221, 'IMPERMEABLE': 1}
- `120249499411810390` -> {'IMPERMEABLE': 133, 'V10': 1}
- `120249619720720390` -> {'V10': 134, 'Q58': 1}
- `120250016232010390` -> {'RADIO': 70, 'Q58': 1}
- `120249894780890390` -> {'Q58': 95, 'V10': 1}
- `120250016231990390` -> {'RADIO': 23, 'Q58': 1}
- `120250027970510390` -> {'Q58': 44, 'IMPERMEABLE': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-11-13 | $111,777 | 15 | $7,452 | $108,072 | 4 | $27,018 | $117,984 | 6 | $19,664 | $139,071 | 10 | $13,907 |
| 2026-11-14 | $100,779 | 13 | $7,752 | $100,030 | 8 | $12,504 | $96,213 | 6 | $16,036 | $133,945 | 12 | $11,162 |
| 2026-11-15 | $111,801 | 6 | $18,634 | $116,732 | 7 | $16,676 | $110,046 | 2 | $55,023 | $127,615 | 11 | $11,601 |
| 2026-11-16 | $143,424 | 14 | $10,245 | $138,697 | 6 | $23,116 | $142,235 | 11 | $12,930 | $163,817 | 15 | $10,921 |
| 2026-11-17 | $88,569 | 14 | $6,326 | $86,816 | 6 | $14,469 | $84,553 | 7 | $12,079 | $95,098 | 10 | $9,510 |
| 2026-11-18 | $113,342 | 15 | $7,556 | $117,926 | 7 | $16,847 | $117,413 | 6 | $19,569 | $143,002 | 8 | $17,875 |
| 2026-11-19 | $101,194 | 14 | $7,228 | $90,483 | 8 | $11,310 | $93,974 | 5 | $18,795 | $109,992 | 8 | $13,749 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,903 | **$27,780** | $8,471 | 🟢 3.3x | $1,757,120 |
| **Q58** | $42,295 | **$31,943** | $16,495 | 🟡 1.9x | $710,629 |
| **RADIO** | $50,267 | **$38,097** | $17,731 | 🟡 2.1x | $875,773 |
| **IMPERMEABLE** | $26,154 | **$19,482** | $12,332 | 🟡 1.6x | $529,158 |

**Utilidad de la ventana: $3,872,680** ($553,240/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-11-13 a 2026-11-16 · mitad 2: 2026-11-17 a 2026-11-19. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $256,936 | 308 | 27 | **$9,516** | 8.8% | $18,698 | 🟡 51% | $8,812 → $10,924 | 9.9% → 7.1% | $872 → $780 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $215,567 | 213 | 13 | **$16,582** | 6.1% | $19,589 | 🔴 85% | $16,952 → $15,991 | 6.7% → 5.4% | $1,130 → $860 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $150,868 | 239 | 13 | **$11,605** | 5.4% | $22,862 | 🟡 51% | $11,504 → $11,767 | 5.2% → 6.0% | $594 → $700 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $146,142 | 184 | 6 | **$24,357** | 3.3% | $18,695 | 🔴 130% | $22,542 → $27,988 | 3.6% → 2.7% | $820 → $756 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $143,027 | 194 | 10 | **$14,303** | 5.2% | $19,223 | 🟡 74% | $17,604 → $11,002 | 4.2% → 6.6% | $746 → $724 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $205,824 | 301 | 16 | **$12,864** | 5.3% | $33,864 | 🟢 38% | $13,905 → $11,526 | 5.1% → 5.6% | $707 → $651 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $199,742 | 615 | 5 | **$39,948** | 0.8% | $30,567 | 🔴 131% | $42,072 → $36,762 | 0.8% → 0.8% | $333 → $312 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $177,870 | 194 | 14 | **$12,705** | 7.2% | $30,929 | 🟢 41% | $10,655 → $17,830 | 8.6% → 5.1% | $919 → $914 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $175,320 | 147 | 7 | **$25,046** | 4.8% | $31,103 | 🔴 81% | $105,620 → $11,617 | 1.2% → 9.5% | $1,257 → $1,106 |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $293,246 | 240 | 22 | **$13,329** | 9.2% | $41,725 | 🟢 32% | $14,822 → $11,538 | 8.5% → 10.1% | $1,261 → $1,165 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $255,327 | 157 | 12 | **$21,277** | 7.6% | $32,160 | 🟡 66% | $31,266 → $14,142 | 5.1% → 12.1% | $1,579 → $1,707 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $144,124 | 134 | 4 | **$36,031** | 3.0% | $53,041 | 🟡 68% | $29,145 → $56,690 | 3.8% → 1.8% | $1,121 → $1,012 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $69,721 | 45 | 4 | **$17,430** | 8.9% | $24,866 | 🟡 70% | $11,212 → sin pedidos | 12.1% → 0.0% | $1,359 → $2,073 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $261,988 | 335 | 33 | **$7,939** | 9.9% | $27,931 | 🟢 28% | $7,652 → $8,442 | 9.0% → 11.9% | $687 → $1,003 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $184,152 | 287 | 25 | **$7,366** | 8.7% | $27,790 | 🟢 27% | $7,799 → $6,815 | 8.1% → 9.6% | $631 → $658 |
| V10 | Motorizados - INTER · _LA RUTA_ | $179,652 | 309 | 10 | **$17,965** | 3.2% | $27,537 | 🟡 65% | $27,215 → $11,798 | 2.3% → 4.4% | $626 → $524 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $145,094 | 441 | 15 | **$9,673** | 3.4% | $27,797 | 🟢 35% | $12,722 → $7,005 | 2.7% → 4.3% | $348 → $303 |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-13 | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | 11-19 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $1,151 · 3 · $13,429 | $779 · 3 · $12,460 | $736 · 5 · $7,062 | $895 · 7 · $6,520 | $879 · 1 · $26,373 | $834 · 5 · $8,338 | $658 · 3 · $10,085 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $1,140 · 0 · — | $1,193 · 1 · $32,210 | $1,162 · 1 · $30,213 | $1,056 · 6 · $6,686 | $834 · 1 · $21,675 | $879 · 1 · $34,265 | $858 · 3 · $8,005 |
| IMPERMEABLE · Domiciliarios VIDEO - API | $564 · 1 · $23,680 | $657 · 4 · $5,424 | $691 · 3 · $6,448 | $525 · 0 · — | $746 · 4 · $3,917 | $691 · 1 · $23,480 | $679 · 0 · — |
| IMPERMEABLE · Motorizados - API | $793 · 3 · $7,402 | $935 · 0 · — | $1,022 · 0 · — | $667 · 1 · $26,027 | $972 · 1 · $15,546 | $697 · 0 · — | $697 · 1 · $17,424 |
| IMPERMEABLE · TEST Creativos - API | $661 · 1 · $19,824 | $622 · 2 · $10,580 | $930 · 2 · $11,158 | $824 · 0 · — | $689 · 2 · $7,918 | $762 · 2 · $10,280 | $716 · 1 · $18,612 |
| Q58 · Motorizados - Q58 | $612 · 3 · $9,993 | $589 · 3 · $9,226 | $813 · 1 · $29,267 | $849 · 2 · $19,110 | $744 · 1 · $23,067 | $589 · 1 · $32,390 | $664 · 5 · $5,045 |
| Q58 · Domiciliarios - Expancion - Q58 | $348 · 1 · $31,318 | $372 · 0 · — | $331 · 1 · $33,383 | $303 · 1 · $36,954 | $319 · 0 · — | $298 · 2 · $15,353 | $325 · 0 · — |
| Q58 · Domiciliarios VIDEO Q58 - | $880 · 0 · — | $709 · 4 · $6,208 | $1,015 · 3 · $8,800 | $1,119 · 3 · $10,814 | $773 · 2 · $10,430 | $1,101 · 2 · $13,208 | $890 · 0 · — |
| Q58 · Domiciliarios Q58 - | $1,039 · 0 · — | $1,913 · 0 · — | $1,204 · 1 · $27,681 | $1,195 · 0 · — | $1,035 · 2 · $9,311 | $1,137 · 2 · $14,206 | $1,133 · 2 · $11,332 |
| RADIO · RADIO - Seguridad / Negocios | $1,073 · 4 · $11,000 | $1,219 · 2 · $18,279 | $1,185 · 1 · $40,278 | $1,584 · 5 · $11,406 | $1,322 · 2 · $15,858 | $1,114 · 4 · $11,136 | $1,118 · 4 · $9,780 |
| RADIO · RADIO - Moteros | $1,314 · 1 · $40,748 | $1,535 · 2 · $16,882 | $2,037 · 0 · — | $1,613 · 2 · $22,577 | $1,801 · 5 · $5,763 | $1,565 · 1 · $39,114 | $1,827 · 1 · $31,066 |
| RADIO · RADIO - Fincas | $1,359 · 0 · — | $1,038 · 0 · — | $887 · 0 · — | $1,274 · 3 · $8,919 | $1,080 · 0 · — | $1,358 · 1 · $23,080 | $753 · 0 · — |
| RADIO · RADIO - Broad | $1,916 · 1 · $11,493 | $1,649 · 2 · $4,122 | $1,970 · 1 · $11,817 | $831 · 0 · — | $1,996 · 0 · — | $1,779 · 0 · — | $4,218 · 0 · — |
| V10 · Domiciliarios VIDEO INTER - API | $768 · 6 · $6,014 | $645 · 6 · $6,023 | $706 · 1 · $38,824 | $653 · 8 · $6,204 | $919 · 4 · $6,894 | $1,018 · 3 · $13,238 | $1,063 · 5 · $6,803 |
| V10 · Domiciliarios - Expancion - INTER | $660 · 5 · $5,413 | $652 · 3 · $7,607 | $596 · 4 · $6,706 | $625 · 2 · $16,238 | $640 · 3 · $6,398 | $611 · 5 · $5,625 | $728 · 3 · $9,216 |
| V10 · Motorizados - INTER | $656 · 3 · $8,741 | $514 · 1 · $22,633 | $652 · 0 · — | $679 · 0 · — | $532 · 2 · $12,230 | $573 · 2 · $12,023 | $474 · 2 · $11,143 |
| V10 · Domiciliarios INTER - API | $361 · 1 · $22,404 | $295 · 1 · $19,185 | $340 · 1 · $20,086 | $391 · 4 · $6,845 | $267 · 3 · $5,780 | $311 · 3 · $7,152 | $338 · 2 · $8,622 |

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
