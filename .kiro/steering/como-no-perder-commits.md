# Cómo no perder commits al fusionar

## El problema, medido

Seis veces pasó lo mismo: se abre un PR, se le siguen agregando commits, y el dueño
lo fusiona en el medio. Los commits que llegaron después quedan afuera de `main` y
**nadie se entera** — el PR aparece como fusionado y con todo verde.

Casos: #175, #176, #179, #183, #185. Cada vez costó rehacer el trabajo en una rama
nueva, y una vez el arreglo perdido era el que hacía funcionar un botón.

## La causa real

No es que el dueño fusione "mal". Es que **un PR abierto al que se le siguen
agregando commits es una carrera**: él ve el PR listo y lo fusiona, con razón,
mientras del otro lado todavía se está subiendo algo.

El dueño opera del celular y fusiona cuando puede. Ese es el modo de trabajo real y
el flujo tiene que aguantarlo, no pedirle que espere.

## La regla

**Un PR se anuncia UNA sola vez, y cuando se anuncia ya está completo.**

1. **Antes de cada `git push`**, comprobar el estado del PR:
   ```
   gh api "repos/mtavera99/impermeables/pulls?state=all&per_page=5" \
     --jq '.[] | "#\(.number) \(.state) merged=\(.merged_at != null) head=\(.head.ref)"'
   ```

2. **Si el PR ya está fusionado**, NO seguir empujando a esa rama. Rama nueva desde
   `origin/main`, `cherry-pick` de los commits que quedaron afuera, PR nuevo.

3. **Si aparece trabajo nuevo después de haber anunciado el PR**, va en un PR NUEVO
   desde `main`. No se le agrega a uno anunciado, aunque esté abierto y sea del
   mismo tema. Ese es el cambio que rompe la carrera.

4. **Verificar después de fusionar**, uno por uno, que los commits llegaron:
   ```
   git fetch origin && for c in <sha1> <sha2>; do
     git merge-base --is-ancestor $c origin/main && echo "✅ $c" || echo "🔴 AFUERA $c"
   done
   ```

5. **Decirle explícitamente cuándo puede fusionar.** Si se sigue trabajando, avisarle
   con esas palabras: *"no fusiones todavía"*. El silencio lo lee como "está listo",
   y tiene razón.

## Lo que NO hay que hacer

- ⛔ Pedirle que no fusione hasta que avisemos, como única medida. Ya se intentó dos
  veces y volvió a pasar: depende de que él recuerde una regla nuestra en el momento
  en que abre el celular.
- ⛔ Dar por bueno que "el PR está verde" significa que el trabajo está en `main`. Son
  dos cosas distintas.
