---
name: matematicas-commands
description: Comandos nativos para matemáticas - uso directo sin Task tool
---

# Comandos Nativos de Matemáticas

## Filosofía
Estos comandos permiten resolver problemas matemáticos directamente
sin necesidad de invocar Task tool o especificar subagentes.

## Comandos Disponibles

### /resolver [problema]
Resuelve cualquier problema matemático.

**Ejemplos:**
```
/resolver 2+2
/resolver integral de x^2 dx
/resolver determinante de matriz [[1,2],[3,4]]
/resolver sistema: 2x+y=5, x-y=1
/resolver autovalores de [[2,1],[1,2]]
```

**Respuesta típica:**
```
Problema: ∫x² dx

Solución:
∫x² dx = (1/3)x³ + C

Paso 1: Aplicar regla de potencia
∫xⁿ dx = (1/(n+1))x^(n+1) + C
Donde n=2

Paso 2: Calcular
(1/(2+1))x^(2+1) + C = (1/3)x³ + C

Verificación:
d/dx[(1/3)x³] = x² ✓
```

---

### /matrices [operación] [matrices]
Operaciones con matrices.

**Ejemplos:**
```
/matrices multiplicar A=[[1,2],[3,4]] B=[[5,6],[7,8]]
/matrices determinante [[2,1],[1,2]]
/matrices inversa [[2,1],[1,2]]
/matrices transpuesta [[1,2,3],[4,5,6]]
```

---

### /calculo [tipo] [expresión]
Operaciones de cálculo.

**Ejemplos:**
```
/calculo derivada x^3 + 2x
/calculo integral x^2 dx
/calculo limite sin(x)/x cuando x->0
/calculo serie taylor e^x orden 5
```

---

### /estadistica [operación] [datos]
Análisis estadístico.

**Ejemplos:**
```
/estadistica media {2,4,6,8,10}
/estadistica varianza {1,2,3,4,5}
/estadistica desviacion {2,4,6,8}
/estadistica correlacion X={1,2,3} Y={2,4,6}
```

---

### /lineal [operación] [sistema]
Álgebra lineal.

**Ejemplos:**
```
/lineal resolver 2x+y=5, x+2y=4
/lineal inversa [[2,1],[1,2]]
/lineal autovalores [[4,1],[1,4]]
```

---

### /ecuacion [tipo] [ecuación]
Ecuaciones diferenciales.

**Ejemplos:**
```
/ecuacion separable y' = y^2/x
/ecuacion lineal y' + 2y = e^x
/ecuacion segundo_orden y'' + y = 0
/ecuacion con_ci y' = xy, y(0)=1
```

---

## Flujo de Ejecución

```
Usuario: /resolver integral de x^2 dx

Sistema:
1. Detecta comando /resolver
2. Activa skill matematicas
3. Parsea argumento: "integral de x^2 dx"
4. Resuelve usando instrucciones del skill
5. Retorna resultado formateado
```

## Ventajas vs Task Tool

| Aspecto | Comando Nativo | Task Tool |
|---------|----------------|-----------|
| Sintaxis | `/resolver x²` | Task(subagent_type="vampiro1", prompt="resolver x²") |
| Tokens | ~10 | ~50 |
| Velocidad | Instantáneo | ~200ms overhead |
| Complejidad | Baja | Alta |
| Para usuario | Ideal | Complejo |

## Reglas de Activación

1. **Inicio con `/`**: El sistema busca comando en skills cargados
2. **Match exacto**: Si `/resolver` existe, se activa
3. **Fallback a Task**: Si no hay comando, usar Task tool
4. **Contexto**: Comandos usan skill actual o buscan la adecuada
