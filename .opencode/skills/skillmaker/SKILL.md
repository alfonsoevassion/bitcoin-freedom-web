---
name: skillmaker
description: Crea nuevas skills para opencode según las características que el usuario describa
---

## Qué hago
- Ayudo a diseñar y crear nuevas skills para opencode
- Genero el archivo SKILL.md con la estructura correcta
- Valido que el nombre y descripción sigan las reglas de opencode

## Cómo funciona
Cuando me pidas crear una skill:
1. Pregunto el nombre deseado de la skill
2. Pregunto qué debe hacer la skill
3. Pregunto si quiere incluir comandos específicos
4. Valido que el nombre sea válido (ver validaciones)
5. Genero el archivo en .opencode/skills/<nombre>/SKILL.md

## Validaciones obligatorias

### Nombre de skill
- Solo minúsculas (a-z) y guiones (-)
- Sin espacios, sin guiones bajos (_), sin mayúsculas
- Longitud: 1-50 caracteres
- NO puede empezar o terminar con guión
- Solo caracteres alfanuméricos y guiones

### Descripción
- Longitud: 1-1024 caracteres
- No puede estar vacía
- Debe ser una oración completa

### Estructura YAML
- SIEMPRE incluir `---` al inicio y fin del frente YAML
- SIEMPRE incluir `name:` y `description:` dentro del frente YAML
- El contenido markdown va DESPUÉS del segundo `---`

## Plantilla obligatoria

AL crear una skill, SIEMPRE usa esta estructura EXACTA:

```
---
name: nombre-de-skill
description: Descripción breve de la skill (1-1024 caracteres)
---

## Qué hago
- Funcionalidad 1
- Funcionalidad 2

## Comandos
### /comando1
Descripción del comando...

## Instrucciones
Contenido adicional...
```

## Ejemplo de estructura correcta
---
name: mi-nueva-skill
description: Esta skill hace algo útil para el usuario
---

## Qué hago
- Hago cosa A
- Hago cosa B

## Comandos
### /ejemplo
Un comando de ejemplo

## Instrucciones
Más detalles aquí...
---

## Manejo de errores

Si el usuario proporciona un nombre inválido:
1. Explicar por qué es inválido (qué regla incumple)
2. Mostrar un ejemplo de nombre válido
3. Pedir que corrija el nombre antes de generar la skill
4. NO generar la skill hasta que el nombre sea válido

Si la descripción está vacía o es muy corta:
1. Pedir que proporcione una descripción válida
2. NO generar hasta tener descripción válida

## Ejemplo de uso
"Quiero una skill que me ayude a crear componentes React"
