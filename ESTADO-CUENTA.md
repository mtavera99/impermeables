# 📊 Estado de la cuenta — BikerPro

> ⛔ **Error leyendo la cuenta** (2026-10-12 06:03 Bogotá).

```
Traceback (most recent call last):
  File "/home/runner/work/impermeables/impermeables/analisis/estado-cuenta.py", line 495, in main
    texto = construir()
            ^^^^^^^^^^^
  File "/home/runner/work/impermeables/impermeables/analisis/estado-cuenta.py", line 267, in construir
    L.append(f"🟠 Hoy va {(hoy_pc/ayer_pc-1)*100:.0f}% más caro que ayer a la misma hora "
                           ~~~~~~^~~~~~~~
ZeroDivisionError: float division by zero

```
