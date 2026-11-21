# 🎯 CPA exacto por producto — BikerPro

> **Ultima lectura: 2026-11-21 14:56 Bogota.** Ventana **2026-10-22 a 2026-11-20** (solo dias cerrados).
> Generado por `analisis/cpa-por-producto.py`. **Solo lectura** — regla 4-B.

El gasto se atribuye **por anuncio**, no por el nombre del conjunto: cada pedido guarda de que anuncio vino. No hay ninguna proporcion estimada en esta tabla.

## Resumen de la ventana

| producto | gasto | conv | pedidos | **CPA** | $/conv | cierre | recaudo |
|---|---|---|---|---|---|---|---|
| **V10** | $3,142,813 | 5971 | 379 | **$8,292** | $526 | 6.35% | $46,108,000 |
| **Q58** | $3,098,503 | 6324 | 263 | **$11,781** | $490 | 4.16% | $39,615,900 |
| **RADIO** | $2,832,089 | 2402 | 148 | **$19,136** | $1,179 | 6.16% | $21,812,000 |
| **IMPERMEABLE** | $3,819,213 | 7007 | 374 | **$10,212** | $545 | 5.34% | $34,505,900 |

### 🔎 Cuanta confianza tienen estos numeros

| | |
|---|---|
| gasto atribuido a un producto | **$12,892,618** (100.0%) |
| gasto de anuncios sin pedidos en la ventana | $0 |
| anuncios clasificados por la forma de sus pedidos | 26 |
| anuncios con pedidos de MAS de un producto | 11 ⚠️ |
| pedidos resueltos por su anuncio (intercomunicador de 1 unidad) | 2 |
| pedidos que no se pudieron clasificar | 0 ✅ |

### ⚠️ Anuncios con pedidos de mas de un producto

Un anuncio deberia vender un solo producto. Si aparece mezclado, o el anuncio cambio de creativo, o hay pedidos mal atribuidos (el bug del 1-oct).

- `120250027970510390` -> {'Q58': 46, 'IMPERMEABLE': 1}
- `120249619616140390` -> {'V10': 228, 'Q58': 4, 'IMPERMEABLE': 1}
- `120249499375070390` -> {'IMPERMEABLE': 235, 'V10': 1}
- `120250016231990390` -> {'RADIO': 26, 'Q58': 1}
- `120250016232010390` -> {'RADIO': 74, 'Q58': 1}
- `120249619720720390` -> {'V10': 136, 'Q58': 1}
- `120249619832930390` -> {'V10': 153, 'Q58': 5}
- `120249894780890390` -> {'Q58': 96, 'V10': 1}
- `120249894780920390` -> {'Q58': 77, 'V10': 1}
- `120249499411810390` -> {'IMPERMEABLE': 133, 'V10': 1}
- `120249894780910390` -> {'V10': 1, 'Q58': 10}

🔴 **2 pedido(s) con la talla nombrando otro producto.** Son los del bug de atribucion: no entran en ningun producto para no contaminar el calculo, y hay que corregirlos a mano en el panel.

## Dia por dia

| dia | gasto V10 | ped | CPA V10 | gasto Q58 | ped | CPA Q58 | gasto radio | ped | CPA radio | gasto imper | ped | CPA imper |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-10-22 | $90,263 | 11 | $8,206 | $86,134 | 8 | $10,767 | $0 | 0 | — | $140,879 | 23 | $6,125 |
| 2026-10-23 | $85,426 | 7 | $12,204 | $85,414 | 10 | $8,541 | $0 | 0 | — | $126,349 | 16 | $7,897 |
| 2026-10-24 | $97,013 | 7 | $13,859 | $93,988 | 7 | $13,427 | $56,108 | 1 | $56,108 | $137,755 | 8 | $17,219 |
| 2026-10-25 | $112,119 | 9 | $12,458 | $92,001 | 10 | $9,200 | $53,118 | 5 | $10,624 | $146,575 | 14 | $10,470 |
| 2026-10-26 | $124,687 | 15 | $8,312 | $120,150 | 16 | $7,509 | $70,267 | 3 | $23,422 | $170,157 | 13 | $13,089 |
| 2026-10-27 | $93,004 | 15 | $6,200 | $89,044 | 10 | $8,904 | $85,964 | 3 | $28,655 | $130,310 | 22 | $5,923 |
| 2026-10-28 | $94,312 | 18 | $5,240 | $99,725 | 13 | $7,671 | $130,549 | 5 | $26,110 | $113,949 | 8 | $14,244 |
| 2026-10-29 | $101,984 | 17 | $5,999 | $98,491 | 11 | $8,954 | $115,529 | 7 | $16,504 | $122,771 | 11 | $11,161 |
| 2026-10-30 | $96,282 | 12 | $8,024 | $85,791 | 9 | $9,532 | $116,586 | 3 | $38,862 | $109,421 | 6 | $18,237 |
| 2026-10-31 | $96,994 | 7 | $13,856 | $107,037 | 8 | $13,380 | $98,241 | 3 | $32,747 | $120,140 | 8 | $15,018 |
| 2026-11-01 | $109,984 | 7 | $15,712 | $104,520 | 7 | $14,931 | $111,380 | 11 | $10,125 | $131,600 | 12 | $10,967 |
| 2026-11-02 | $128,060 | 10 | $12,806 | $132,917 | 10 | $13,292 | $128,053 | 4 | $32,013 | $142,020 | 16 | $8,876 |
| 2026-11-03 | $101,134 | 18 | $5,619 | $111,763 | 12 | $9,314 | $104,529 | 3 | $34,843 | $123,315 | 13 | $9,486 |
| 2026-11-04 | $91,354 | 13 | $7,027 | $84,008 | 9 | $9,334 | $92,038 | 2 | $46,019 | $96,827 | 11 | $8,802 |
| 2026-11-05 | $121,950 | 23 | $5,302 | $128,726 | 11 | $11,702 | $114,176 | 5 | $22,835 | $148,114 | 17 | $8,713 |
| 2026-11-06 | $102,906 | 9 | $11,434 | $104,792 | 12 | $8,733 | $96,938 | 8 | $12,117 | $127,366 | 17 | $7,492 |
| 2026-11-07 | $86,229 | 8 | $10,779 | $88,834 | 8 | $11,104 | $87,494 | 10 | $8,749 | $105,167 | 20 | $5,258 |
| 2026-11-08 | $111,458 | 14 | $7,961 | $116,411 | 8 | $14,551 | $114,424 | 6 | $19,071 | $134,770 | 16 | $8,423 |
| 2026-11-09 | $114,707 | 13 | $8,824 | $118,254 | 7 | $16,893 | $110,662 | 7 | $15,809 | $127,885 | 18 | $7,105 |
| 2026-11-10 | $94,920 | 18 | $5,273 | $94,787 | 7 | $13,541 | $87,913 | 5 | $17,583 | $99,687 | 9 | $11,076 |
| 2026-11-11 | $108,412 | 15 | $7,227 | $115,195 | 14 | $8,228 | $105,544 | 4 | $26,386 | $120,114 | 6 | $20,019 |
| 2026-11-12 | $99,717 | 13 | $7,671 | $102,965 | 4 | $25,741 | $101,687 | 8 | $12,711 | $118,947 | 7 | $16,992 |
| 2026-11-13 | $111,777 | 15 | $7,452 | $108,072 | 4 | $27,018 | $117,984 | 6 | $19,664 | $139,071 | 10 | $13,907 |
| 2026-11-14 | $100,779 | 13 | $7,752 | $100,030 | 8 | $12,504 | $96,213 | 6 | $16,036 | $133,945 | 12 | $11,162 |
| 2026-11-15 | $111,801 | 6 | $18,634 | $116,732 | 7 | $16,676 | $110,046 | 2 | $55,023 | $127,615 | 11 | $11,601 |
| 2026-11-16 | $143,424 | 14 | $10,245 | $138,697 | 6 | $23,116 | $142,235 | 11 | $12,930 | $163,817 | 15 | $10,921 |
| 2026-11-17 | $88,569 | 14 | $6,326 | $86,816 | 6 | $14,469 | $84,553 | 7 | $12,079 | $95,098 | 10 | $9,510 |
| 2026-11-18 | $113,342 | 15 | $7,556 | $117,926 | 7 | $16,847 | $117,433 | 6 | $19,572 | $143,002 | 8 | $17,875 |
| 2026-11-19 | $101,395 | 14 | $7,242 | $90,524 | 8 | $11,316 | $94,314 | 5 | $18,863 | $110,120 | 8 | $13,765 |
| 2026-11-20 | $108,811 | 9 | $12,090 | $78,759 | 6 | $13,126 | $88,111 | 2 | $44,056 | $112,427 | 9 | $12,492 |

## Cada producto contra SU propio equilibrio

*(Nunca el promedio de la cuenta como umbral — error #12.)*

| producto | contrib/entregado | **CPA de equilibrio** | CPA real | colchon | utilidad |
|---|---|---|---|---|---|
| **V10** | $36,908 | **$27,784** | $8,292 | 🟢 3.4x | $7,387,271 |
| **Q58** | $41,053 | **$30,984** | $11,781 | 🟡 2.6x | $5,050,209 |
| **RADIO** | $51,969 | **$39,411** | $19,136 | 🟡 2.1x | $3,000,745 |
| **IMPERMEABLE** | $25,414 | **$18,911** | $10,212 | 🟡 1.9x | $3,253,350 |

**Utilidad de la ventana: $18,691,576** ($623,053/dia)

## Por anuncio (= por conjunto)

*Mitad 1: 2026-10-22 a 2026-11-05 · mitad 2: 2026-11-06 a 2026-11-20. El semaforo mira el CPA de la ventana entera contra el equilibrio de SU producto: 🟢 menos del 50% · 🟡 50-75% · 🔴 mas del 75% (alarmas de 0-BL). Los pedidos llegan con atraso: los ultimos 1-2 dias de la mitad 2 suelen estar cortos.*

*El equilibrio de cada fila sale de la contribucion de LOS PEDIDOS DE ESE ANUNCIO (un combo x6 deja mas que una caja), con la misma devolucion que el resto del informe.*

| producto | conjunto | gasto | conv | ped | **CPA** | cierre | su equilibrio | % del equilibrio | CPA mitad 1 → 2 | cierre mitad 1 → 2 | $/conv mitad 1 → 2 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| IMPERMEABLE | Domiciliarios - API · _Fondo azul sin personaje - Copia_ | $1,045,837 | 1950 | 108 | **$9,684** | 5.5% | $17,452 | 🟡 55% | $10,081 → $9,315 | 4.5% → 7.0% | $456 → $652 |
| IMPERMEABLE | Domiciliarios - Expancion - API · _Fondo azul sin personaje - API_ | $944,585 | 1438 | 56 | **$16,868** | 3.9% | $18,264 | 🔴 92% | $16,970 → $16,749 | 3.4% → 4.8% | $571 → $796 |
| IMPERMEABLE | TEST Creativos - API · _Prueba social +50 clientes - Copia_ | $627,649 | 1078 | 43 | **$14,596** | 4.0% | $19,292 | 🔴 76% | $14,414 → $14,806 | 3.5% → 4.9% | $498 → $719 |
| IMPERMEABLE | Domiciliarios VIDEO - API · _VIDEO - Copia_ | $604,011 | 1414 | 82 | **$7,366** | 5.8% | $20,854 | 🟢 35% | $6,736 → $8,096 | 5.3% → 6.5% | $356 → $530 |
| IMPERMEABLE | Motorizados - API · _Fondo azul sin personaje - Copia_ | $597,131 | 1127 | 55 | **$10,857** | 4.9% | $18,849 | 🟡 58% | $9,645 → $12,423 | 4.7% → 5.1% | $456 → $633 |
| Q58 | Motorizados - Q58 · _VERDE LIMA_ | $810,034 | 1221 | 67 | **$12,090** | 5.5% | $31,478 | 🟢 38% | $11,561 → $12,603 | 5.6% → 5.4% | $648 → $678 |
| Q58 | Domiciliarios VIDEO Q58 - · _SON DOS_ | $755,630 | 962 | 79 | **$9,565** | 8.2% | $30,999 | 🟢 31% | $8,529 → $10,867 | 9.1% → 7.3% | $777 → $794 |
| Q58 | Domiciliarios Q58 - · _ACOMPAÑANTE_ | $741,301 | 1539 | 53 | **$13,987** | 3.4% | $30,828 | 🟢 45% | $11,561 → $17,683 | 2.7% → 6.1% | $309 → $1,083 |
| Q58 | Domiciliarios - Expancion - Q58 · _ACOMPAÑANTE - Copia_ | $735,350 | 2546 | 45 | **$16,341** | 1.8% | $30,512 | 🟡 54% | $10,524 → $30,661 | 2.6% → 1.0% | $269 → $308 |
| Q58 | Domiciliarios - Expancion - Q58 · _COMBO DOS_ | $56,188 | 56 | 3 | **$18,729** | 5.4% | $25,567 | 🟡 73% | $18,729 → — | 5.4% → — | $1,003 → — |
| RADIO | RADIO - Seguridad / Negocios · _ANUNCIO 1 - COMBO X4 SEGURIDAD ($169.000)_ | $1,030,548 | 971 | 72 | **$14,313** | 7.4% | $43,916 | 🟢 33% | $19,086 → $12,213 | 5.0% → 9.5% | $950 → $1,154 |
| RADIO | RADIO - Moteros · _ANUNCIO 1 - COMBO X2 MOTEROS ($99.000)_ | $871,087 | 552 | 37 | **$23,543** | 6.7% | $30,279 | 🔴 78% | $21,019 → $25,688 | 6.8% → 6.6% | $1,429 → $1,701 |
| RADIO | RADIO - Fincas · _ANUNCIO 1 - MEGACOMBO X6 FINCAS ($229.000)_ | $556,169 | 619 | 24 | **$23,174** | 3.9% | $45,153 | 🟡 51% | $26,140 → $21,055 | 3.2% → 4.6% | $825 → $976 |
| RADIO | RADIO - Broad · _VIDEO RADIO_ | $374,285 | 260 | 10 | **$37,428** | 3.8% | $25,874 | 🔴 145% | $59,483 → $22,726 | 2.4% → 6.4% | $1,433 → $1,451 |
| V10 | Domiciliarios VIDEO INTER - API · _VIDEO INTERCOMUNICADORES_ | $1,008,185 | 1517 | 149 | **$6,766** | 9.8% | $28,204 | 🟢 24% | $6,384 → $7,123 | 9.6% → 10.1% | $610 → $718 |
| V10 | Domiciliarios - Expancion - INTER · _COMBO DOS_ | $759,854 | 1226 | 91 | **$8,350** | 7.4% | $27,703 | 🟢 30% | $9,014 → $7,781 | 7.0% → 7.9% | $629 → $611 |
| V10 | Motorizados - INTER · _LA RUTA_ | $744,462 | 1311 | 55 | **$13,536** | 4.2% | $27,666 | 🟢 49% | $12,849 → $14,302 | 4.5% → 3.9% | $576 → $560 |
| V10 | Domiciliarios INTER - API · _CANSADO DE GRITAR_ | $630,312 | 1917 | 59 | **$10,683** | 3.1% | $28,247 | 🟢 38% | $9,018 → $13,483 | 3.8% → 2.4% | $338 → $319 |

### Ultimos 7 dias por conjunto: `$/conv · pedidos · CPA`

| conjunto | 11-14 | 11-15 | 11-16 | 11-17 | 11-18 | 11-19 | 11-20 |
|---|---|---|---|---|---|---|---|
| IMPERMEABLE · Domiciliarios - API | $779 · 3 · $12,460 | $736 · 5 · $7,062 | $895 · 7 · $6,520 | $879 · 1 · $26,373 | $834 · 5 · $8,338 | $659 · 3 · $10,098 | $662 · 6 · $5,406 |
| IMPERMEABLE · Domiciliarios - Expancion - API | $1,193 · 1 · $32,210 | $1,162 · 1 · $30,213 | $1,056 · 6 · $6,686 | $834 · 1 · $21,675 | $879 · 1 · $34,265 | $859 · 3 · $8,021 | $1,010 · 1 · $19,181 |
| IMPERMEABLE · TEST Creativos - API | $622 · 2 · $10,580 | $930 · 2 · $11,158 | $824 · 0 · — | $689 · 2 · $7,918 | $762 · 2 · $10,280 | $716 · 1 · $18,612 | $1,259 · 1 · $17,631 |
| IMPERMEABLE · Domiciliarios VIDEO - API | $657 · 4 · $5,424 | $691 · 3 · $6,448 | $525 · 0 · — | $746 · 4 · $3,917 | $691 · 1 · $23,480 | $680 · 0 · — | $577 · 1 · $24,253 |
| IMPERMEABLE · Motorizados - API | $935 · 0 · — | $1,022 · 0 · — | $667 · 1 · $26,027 | $972 · 1 · $15,546 | $697 · 0 · — | $697 · 1 · $17,435 | $996 · 0 · — |
| Q58 · Motorizados - Q58 | $589 · 3 · $9,226 | $813 · 1 · $29,267 | $849 · 2 · $19,110 | $744 · 1 · $23,067 | $589 · 1 · $32,390 | $664 · 5 · $5,047 | $739 · 1 · $26,613 |
| Q58 · Domiciliarios VIDEO Q58 - | $709 · 4 · $6,208 | $1,015 · 3 · $8,800 | $1,119 · 3 · $10,814 | $773 · 2 · $10,430 | $1,101 · 2 · $13,208 | $891 · 0 · — | $1,034 · 1 · $28,961 |
| Q58 · Domiciliarios Q58 - | $1,913 · 0 · — | $1,204 · 1 · $27,681 | $1,195 · 0 · — | $1,035 · 2 · $9,311 | $1,137 · 2 · $14,206 | $1,133 · 2 · $11,334 | $1,364 · 3 · $7,728 |
| Q58 · Domiciliarios - Expancion - Q58 | $372 · 0 · — | $331 · 1 · $33,383 | $303 · 1 · $36,954 | $319 · 0 · — | $298 · 2 · $15,353 | $326 · 0 · — | — |
| RADIO · RADIO - Seguridad / Negocios | $1,219 · 2 · $18,279 | $1,185 · 1 · $40,278 | $1,584 · 5 · $11,406 | $1,322 · 2 · $15,858 | $1,114 · 4 · $11,136 | $1,121 · 4 · $9,806 | $2,170 · 1 · $47,750 |
| RADIO · RADIO - Moteros | $1,535 · 2 · $16,882 | $2,037 · 0 · — | $1,613 · 2 · $22,577 | $1,801 · 5 · $5,763 | $1,565 · 1 · $39,114 | $1,834 · 1 · $31,173 | $1,890 · 0 · — |
| RADIO · RADIO - Fincas | $1,038 · 0 · — | $887 · 0 · — | $1,274 · 3 · $8,919 | $1,080 · 0 · — | $1,358 · 1 · $23,094 | $756 · 0 · — | $608 · 0 · — |
| RADIO · RADIO - Broad | $1,649 · 2 · $4,122 | $1,970 · 1 · $11,817 | $831 · 0 · — | $1,996 · 0 · — | $1,780 · 0 · — | $4,251 · 0 · — | — |
| V10 · Domiciliarios VIDEO INTER - API | $645 · 6 · $6,023 | $706 · 1 · $38,824 | $653 · 8 · $6,204 | $919 · 4 · $6,894 | $1,018 · 3 · $13,238 | $1,067 · 5 · $6,826 | $859 · 4 · $10,308 |
| V10 · Domiciliarios - Expancion - INTER | $652 · 3 · $7,607 | $596 · 4 · $6,706 | $625 · 2 · $16,238 | $640 · 3 · $6,398 | $611 · 5 · $5,625 | $728 · 3 · $9,218 | $632 · 4 · $6,789 |
| V10 · Motorizados - INTER | $514 · 1 · $22,633 | $652 · 0 · — | $679 · 0 · — | $532 · 2 · $12,230 | $573 · 2 · $12,023 | $475 · 2 · $11,164 | $514 · 1 · $22,112 |
| V10 · Domiciliarios INTER - API | $295 · 1 · $19,185 | $340 · 1 · $20,086 | $391 · 4 · $6,845 | $267 · 3 · $5,780 | $311 · 3 · $7,152 | $339 · 2 · $8,642 | $327 · 1 · $18,312 |

## 🗺 Por departamento (dónde se gasta y dónde se vende)

### A quién le apunta cada conjunto activo (10)

| conjunto | presup. | geografía | edad | género | intereses | Advantage+ audiencia |
|---|---|---|---|---|---|---|
| Domiciliarios - API | $35,000 | ciudades: Bogotá +40ki, Medellín +40ki | 20-65 | todos | Rappi, Uber Eats, Delivery Person, Delivery | sí |
| Domiciliarios - Expancion - Q58 | $15,000 | deptos: Huila, Norte de Santander, Quindio, Risaralda, Santander, Tolima, Valle del Cauca, Caldas | 20-65 | todos | — | sí |
| Domiciliarios INTER - API | $20,000 | ciudades: Bogotá +40ki, Medellín +40ki | 20-65 | todos | Rappi, Uber Eats, Delivery Person, Delivery | sí |
| Domiciliarios Q58 - | $25,000 | ciudades: Bogotá +40ki, Medellín +40ki | 20-65 | todos | Rappi, Uber Eats, Delivery Person, Delivery | sí |
| Domiciliarios VIDEO - API | $24,000 | ciudades: Bogotá +40ki, Medellín +40ki | 20-65 | todos | Rappi, Uber Eats, Delivery Person, Delivery | sí |
| Motorizados - API | $20,000 | deptos: Distrito Especial | 18-65 | todos | — | sí |
| Motorizados - INTER | $25,000 | deptos: Distrito Especial | 18-65 | todos | — | sí |
| RADIO - Fincas | $20,000 | deptos: Huila, Norte de Santander, Quindio, Risaralda, Santander, Tolima, Valle del Cauca, Caldas | 20-65 | todos | — | sí |
| RADIO - Seguridad / Negocios | $48,000 | ciudades: Bogotá +40ki, Medellín +40ki | 20-65 | todos | Rappi, Uber Eats, Delivery Person, Delivery | sí |
| TEST Creativos - API | $20,000 | ciudades: Bogotá +40ki, Medellín +40ki | 20-65 | todos | Rappi, Uber Eats, Delivery Person, Delivery | sí |

### Gasto, conversaciones y pedidos por departamento (2026-10-22 a 2026-11-20)

⚠️ Los pedidos no se pudieron ubicar por departamento: no se pudo bajar DIVIPOLA (HTTPError). Solo va el gasto.

| departamento | gasto | % del gasto | conv | $/conv | pedidos | % de pedidos | CPA aprox. | pedidos por producto | dónde gasta (conjunto: % del gasto del depto) |
|---|---|---|---|---|---|---|---|---|---|
| Antioquia | $5,092,013 | 39.4% | 0 | — | 0 | 0.0% | sin pedidos | — | Domiciliarios - API: 15%; RADIO - Seguridad / Negocios: 14%; Domiciliarios VIDEO INTER - API: 12% |
| Distrito Especial | $4,364,327 | 33.8% | 0 | — | 0 | 0.0% | sin pedidos | — | RADIO - Moteros: 17%; Motorizados - Q58: 14%; Motorizados - INTER: 14% |
| Valle del Cauca | $1,398,239 | 10.8% | 0 | — | 0 | 0.0% | sin pedidos | — | Domiciliarios - Expancion - API: 37%; Domiciliarios - Expancion - Q58: 22%; RADIO - Fincas: 21% |
| Santander | $397,437 | 3.1% | 0 | — | 0 | 0.0% | sin pedidos | — | Domiciliarios - Expancion - Q58: 35%; Domiciliarios - Expancion - INTER: 33%; Domiciliarios - Expancion - API: 17% |
| Cundinamarca | $382,090 | 3.0% | 0 | — | 0 | 0.0% | sin pedidos | — | Domiciliarios VIDEO INTER - API: 20%; Domiciliarios VIDEO Q58 -: 17%; Domiciliarios Q58 -: 14% |
| Risaralda | $303,029 | 2.3% | 0 | — | 0 | 0.0% | sin pedidos | — | Domiciliarios - Expancion - API: 39%; Domiciliarios - Expancion - INTER: 34%; Domiciliarios - Expancion - Q58: 20% |
| Tolima | $272,640 | 2.1% | 0 | — | 0 | 0.0% | sin pedidos | — | RADIO - Fincas: 31%; Domiciliarios - Expancion - Q58: 25%; Domiciliarios - Expancion - INTER: 24% |
| Caldas | $205,428 | 1.6% | 0 | — | 0 | 0.0% | sin pedidos | — | Domiciliarios - Expancion - API: 35%; Domiciliarios - Expancion - INTER: 26%; Domiciliarios - Expancion - Q58: 23% |
| Huila | $186,927 | 1.4% | 0 | — | 0 | 0.0% | sin pedidos | — | Domiciliarios - Expancion - Q58: 45%; Domiciliarios - Expancion - INTER: 27%; RADIO - Fincas: 16% |
| Norte de Santander | $174,350 | 1.4% | 0 | — | 0 | 0.0% | sin pedidos | — | Domiciliarios - Expancion - Q58: 43%; Domiciliarios - Expancion - INTER: 29%; Domiciliarios - Expancion - API: 14% |
| Quindio | $129,959 | 1.0% | 0 | — | 0 | 0.0% | sin pedidos | — | Domiciliarios - Expancion - API: 44%; Domiciliarios - Expancion - INTER: 28%; Domiciliarios - Expancion - Q58: 22% |
| Meta | $966 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | RADIO - Seguridad / Negocios: 57%; Domiciliarios Q58 -: 10%; RADIO - Broad: 10% |
| Unknown | $436 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | Domiciliarios Q58 -: 22%; RADIO - Moteros: 19%; TEST Creativos - API: 18% |
| Atlantico | $374 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | Motorizados - INTER: 16%; Domiciliarios - API: 13%; Motorizados - API: 13% |
| Bolivar | $179 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | Motorizados - API: 40%; Domiciliarios INTER - API: 32%; Motorizados - INTER: 9% |
| Cauca | $118 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | Domiciliarios VIDEO - API: 36%; Domiciliarios - Expancion - Q58: 19%; RADIO - Moteros: 14% |
| Narino | $105 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | Domiciliarios - API: 48%; RADIO - Moteros: 27%; Motorizados - API: 6% |
| Magdalena | $83 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | RADIO - Seguridad / Negocios: 76%; Domiciliarios VIDEO - API: 8%; Domiciliarios VIDEO INTER - API: 5% |
| Cesar | $45 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | Domiciliarios - Expancion - Q58: 42%; RADIO - Seguridad / Negocios: 20%; Motorizados - Q58: 11% |
| Casanare | $39 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | Domiciliarios INTER - API: 79%; Domiciliarios - Expancion - Q58: 18%; Domiciliarios VIDEO Q58 -: 3% |
| Cordoba | $30 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | Motorizados - Q58: 43%; Domiciliarios - API: 20%; Motorizados - INTER: 13% |
| Sucre | $22 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | RADIO - Moteros: 32%; Domiciliarios - API: 18%; Motorizados - API: 14% |
| Arauca | $19 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | RADIO - Moteros: 42%; Motorizados - INTER: 37%; Domiciliarios INTER - API: 16% |
| La Guajira | $14 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | Domiciliarios VIDEO - API: 57%; Motorizados - INTER: 21%; Domiciliarios VIDEO Q58 -: 21% |
| Choco | $13 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | RADIO - Moteros: 85%; RADIO - Broad: 15% |
| Boyaca | $13 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | Domiciliarios - Expancion - Q58: 38%; RADIO - Moteros: 23%; Domiciliarios VIDEO INTER - API: 15% |
| Caqueta | $10 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | Domiciliarios - Expancion - Q58: 100% |
| Putumayo | $7 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | Motorizados - API: 43%; Domiciliarios - Expancion - Q58: 29%; Domiciliarios VIDEO INTER - API: 14% |
| San Andres y Providencia | $1 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | RADIO - Seguridad / Negocios: 100% |
| Guaviare | $1 | 0.0% | 0 | — | 0 | 0.0% | sin pedidos | — | Domiciliarios Q58 -: 100%; Domiciliarios VIDEO INTER - API: 0% |

### Dónde gasta de verdad cada conjunto (top 5 departamentos)

| conjunto | gasto | departamentos (% de su gasto) |
|---|---|---|
| Domiciliarios - API | $1,045,837 | Antioquia 74%, Distrito Especial 21%, Cundinamarca 4%, Atlantico 0%, Narino 0% |
| RADIO - Seguridad / Negocios | $1,030,548 | Antioquia 67%, Distrito Especial 30%, Cundinamarca 4%, Meta 0%, Magdalena 0% |
| Domiciliarios VIDEO INTER - API | $1,008,185 | Antioquia 61%, Distrito Especial 31%, Cundinamarca 8%, Meta 0%, Atlantico 0% |
| Domiciliarios - Expancion - API | $944,585 | Valle del Cauca 56%, Risaralda 12%, Caldas 8%, Santander 7%, Quindio 6% |
| RADIO - Moteros | $871,087 | Distrito Especial 84%, Antioquia 16%, Santander 0%, Unknown 0%, Narino 0% |
| Motorizados - Q58 | $810,034 | Distrito Especial 77%, Antioquia 23%, Cundinamarca 0%, Atlantico 0%, Unknown 0% |
| Domiciliarios - Expancion - Q58 | $807,834 | Valle del Cauca 38%, Santander 17%, Huila 10%, Norte de Santander 9%, Tolima 8% |
| Domiciliarios - Expancion - INTER | $759,854 | Valle del Cauca 36%, Santander 17%, Risaralda 13%, Tolima 8%, Caldas 7% |
| Domiciliarios VIDEO Q58 - | $755,630 | Antioquia 55%, Distrito Especial 37%, Cundinamarca 8%, Meta 0%, Tolima 0% |
| Motorizados - INTER | $744,462 | Distrito Especial 83%, Antioquia 17%, Atlantico 0%, Valle del Cauca 0%, Bolivar 0% |
| Domiciliarios Q58 - | $741,301 | Antioquia 59%, Distrito Especial 34%, Cundinamarca 7%, Meta 0%, Unknown 0% |
| Domiciliarios INTER - API | $630,312 | Antioquia 62%, Distrito Especial 32%, Cundinamarca 6%, Bolivar 0%, Atlantico 0% |
| TEST Creativos - API | $627,649 | Antioquia 65%, Distrito Especial 31%, Cundinamarca 5%, Unknown 0%, Atlantico 0% |
| Domiciliarios VIDEO - API | $604,011 | Antioquia 73%, Distrito Especial 23%, Cundinamarca 4%, Cauca 0%, Atlantico 0% |
| Motorizados - API | $597,131 | Distrito Especial 65%, Antioquia 35%, Bolivar 0%, Atlantico 0%, Narino 0% |
| RADIO - Fincas | $556,169 | Valle del Cauca 54%, Tolima 15%, Santander 10%, Caldas 6%, Huila 5% |
| RADIO - Broad | $374,285 | Antioquia 68%, Distrito Especial 28%, Cundinamarca 3%, Meta 0%, Tolima 0% |

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
