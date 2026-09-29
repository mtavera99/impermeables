#!/usr/bin/env python3
"""
Aligera un PNG para que WhatsApp lo acepte, sin instalar nada.

POR QUÉ EXISTE
--------------
El 29-sep el dueño subió las 5 fotos del intercomunicador y dos no iban a llegar
nunca al cliente:

    v10-puesto    1320x2868  16 BIT RGB   11,4 MB   ← Meta rechaza > 5 MB
    v10-combo     1320x2868  RGBA          4,3 MB   ← al borde

El límite de Meta para imágenes es 5 MB. Una foto que lo pasa no se envía: el
cliente pide una foto, no le llega nada, y nadie se entera — es exactamente lo que
pasó el 21-sep con los 404 de todas las fotos.

Y el peso no venía de la resolución sino de dos cosas evitables:
  · 16 bits por canal, que en una foto de celular no aporta NADA visible y duplica
    el tamaño de cada píxel;
  · un canal alfa (transparencia) en una foto que no tiene nada transparente.

⚠️ POR QUÉ ESTÁ ESCRITO A MANO Y NO USA UNA LIBRERÍA. El entorno no tiene
ImageMagick, ni Pillow, ni sharp, ni salida a internet para instalarlos. Así que el
PNG se decodifica y se vuelve a armar con `zlib`, que sí viene en la biblioteca
estándar. Cubre el caso que tenemos —8/16 bits, RGB o RGBA, sin entrelazado— y
avisa en vez de adivinar si le llega otra cosa.

USO
---
    python3 analisis/aligerar-png.py entrada.png salida.png [ancho_maximo]
"""

import os
import struct
import sys
import zlib

FIRMA = b"\x89PNG\r\n\x1a\n"


def leer_trozos(datos):
    """Devuelve la lista de trozos (tipo, contenido) de un PNG."""
    if datos[:8] != FIRMA:
        raise SystemExit("🔴 No es un PNG.")
    i = 8
    trozos = []
    while i < len(datos):
        (largo,) = struct.unpack(">I", datos[i : i + 4])
        tipo = datos[i + 4 : i + 8]
        contenido = datos[i + 8 : i + 8 + largo]
        trozos.append((tipo, contenido))
        i += 12 + largo  # 4 largo + 4 tipo + datos + 4 crc
    return trozos


def paeth(a, b, c):
    p = a + b - c
    pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
    if pa <= pb and pa <= pc:
        return a
    return b if pb <= pc else c


def decodificar(ruta):
    """PNG -> (ancho, alto, filas como bytearray RGB de 8 bits)."""
    with open(ruta, "rb") as fh:
        datos = fh.read()

    trozos = leer_trozos(datos)
    cabecera = next(c for t, c in trozos if t == b"IHDR")
    ancho, alto = struct.unpack(">II", cabecera[0:8])
    bits, color, compresion, filtro, entrelazado = cabecera[8:13]

    if entrelazado != 0:
        raise SystemExit("🔴 PNG entrelazado: no está cubierto. Reexportalo sin entrelazado.")
    if color not in (2, 6):
        raise SystemExit(f"🔴 Tipo de color {color} no cubierto (solo RGB y RGBA).")
    if bits not in (8, 16):
        raise SystemExit(f"🔴 Profundidad {bits} no cubierta (solo 8 y 16 bits).")

    canales = 3 if color == 2 else 4
    bytes_por_px = canales * (bits // 8)

    comprimido = b"".join(c for t, c in trozos if t == b"IDAT")
    crudo = zlib.decompress(comprimido)

    largo_fila = ancho * bytes_por_px
    filas = []
    anterior = bytearray(largo_fila)
    pos = 0
    for _ in range(alto):
        tipo_filtro = crudo[pos]
        pos += 1
        fila = bytearray(crudo[pos : pos + largo_fila])
        pos += largo_fila

        # Se deshace el filtro que el codificador aplicó a esta línea.
        if tipo_filtro == 1:  # Sub
            for i in range(bytes_por_px, largo_fila):
                fila[i] = (fila[i] + fila[i - bytes_por_px]) & 0xFF
        elif tipo_filtro == 2:  # Up
            for i in range(largo_fila):
                fila[i] = (fila[i] + anterior[i]) & 0xFF
        elif tipo_filtro == 3:  # Average
            for i in range(largo_fila):
                izq = fila[i - bytes_por_px] if i >= bytes_por_px else 0
                fila[i] = (fila[i] + ((izq + anterior[i]) >> 1)) & 0xFF
        elif tipo_filtro == 4:  # Paeth
            for i in range(largo_fila):
                izq = fila[i - bytes_por_px] if i >= bytes_por_px else 0
                arriba = anterior[i]
                diag = anterior[i - bytes_por_px] if i >= bytes_por_px else 0
                fila[i] = (fila[i] + paeth(izq, arriba, diag)) & 0xFF
        elif tipo_filtro != 0:
            raise SystemExit(f"🔴 Filtro desconocido {tipo_filtro}.")

        anterior = fila

        # A RGB de 8 bits: se tira el alfa y el byte bajo de cada canal de 16 bits.
        if bits == 16:
            fila = bytearray(fila[i] for i in range(0, largo_fila, 2))  # byte alto
            px = canales
            if color == 6:
                fila = bytearray(b for i, b in enumerate(fila) if i % px != 3)
        elif color == 6:
            fila = bytearray(b for i, b in enumerate(fila) if i % 4 != 3)

        filas.append(fila)

    return ancho, alto, filas


def reescalar(ancho, alto, filas, ancho_nuevo):
    """Reduce tomando 1 píxel de cada N. Suficiente para una foto de WhatsApp."""
    if ancho_nuevo >= ancho:
        return ancho, alto, filas
    alto_nuevo = max(1, round(alto * ancho_nuevo / ancho))
    # Qué columna del original va en cada columna nueva.
    cols = [round(x * ancho / ancho_nuevo) * 3 for x in range(ancho_nuevo)]
    salida = []
    for y in range(alto_nuevo):
        origen = filas[min(alto - 1, round(y * alto / alto_nuevo))]
        nueva = bytearray(ancho_nuevo * 3)
        for x, c in enumerate(cols):
            nueva[x * 3 : x * 3 + 3] = origen[c : c + 3]
        salida.append(nueva)
    return ancho_nuevo, alto_nuevo, salida


def codificar(ancho, alto, filas, ruta):
    """Vuelve a armar el PNG: 8 bits RGB, filtro Sub, compresión máxima."""
    crudo = bytearray()
    for fila in filas:
        # Filtro Sub (el 1): guarda la diferencia con el píxel de la izquierda.
        # En fotos comprime bastante mejor que no filtrar, y es barato de calcular.
        crudo.append(1)
        anterior = bytearray(fila)
        for i in range(len(fila) - 1, 2, -1):
            anterior[i] = (fila[i] - fila[i - 3]) & 0xFF
        crudo += anterior

    def trozo(tipo, contenido):
        return (
            struct.pack(">I", len(contenido))
            + tipo
            + contenido
            + struct.pack(">I", zlib.crc32(tipo + contenido) & 0xFFFFFFFF)
        )

    cabecera = struct.pack(">IIBBBBB", ancho, alto, 8, 2, 0, 0, 0)
    with open(ruta, "wb") as fh:
        fh.write(FIRMA)
        fh.write(trozo(b"IHDR", cabecera))
        fh.write(trozo(b"IDAT", zlib.compress(bytes(crudo), 9)))
        fh.write(trozo(b"IEND", b""))


def main():
    if len(sys.argv) < 3:
        raise SystemExit(__doc__)
    entrada, salida = sys.argv[1], sys.argv[2]
    ancho_max = int(sys.argv[3]) if len(sys.argv) > 3 else 1080

    antes = os.path.getsize(entrada)
    ancho, alto, filas = decodificar(entrada)
    ancho2, alto2, filas2 = reescalar(ancho, alto, filas, min(ancho, ancho_max))
    codificar(ancho2, alto2, filas2, salida)
    despues = os.path.getsize(salida)

    print(
        f"{os.path.basename(entrada)}: {ancho}x{alto} {antes/1024/1024:.1f} MB"
        f"  ->  {ancho2}x{alto2} {despues/1024/1024:.1f} MB"
        f"  ({100 - despues * 100 // antes}% menos)"
    )


if __name__ == "__main__":
    main()
