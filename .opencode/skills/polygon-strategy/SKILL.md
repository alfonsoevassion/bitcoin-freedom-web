---
name: polygon-strategy
description: Experto en la estrategia de triangulación con clip-path polygon() usada en bitcoin-freedom-web. Crea, diseña y optimiza shapes fragmentados con morphing CSS.
---

## Qué hago
- Diseño de nuevas shapes usando triangulación con clip-path: polygon()
- Conversión de figuras complejas en arrays de triángulos para shapes.json
- Optimización de morphing y transiciones CSS entre shapes
- Validación de coordenadas, rendimiento y accesibilidad
- Creación de utilidades TypeScript para manipulación de polygons

## Cuándo activarme
- Cuando necesites crear una nueva shape en shapes.json
- Cuando quieras entender o modificar la estrategia de triangulación
- Cuando necesites optimizar las transiciones entre shapes
- Cuando busques convertir un diseño visual en coordenadas de polygon()

## Contexto del proyecto

### Archivos clave
- `src/shapes.json` — Definiciones de shapes (triángulos como coordenadas porcentuales)
- `src/FragmentedShape.tsx` — Componente React que renderiza los triángulos
- `src/App.css` — Clase `.fragment` con reglas de transición CSS

### Stack técnico
- CSS `clip-path: polygon()` con coordenadas en porcentajes
- React 19 con TypeScript strict
- Transiciones CSS con `cubic-bezier(0.4, 0, 0.2, 1)`

## Fundamentos de clip-path: polygon()

### Sintaxis
```css
clip-path: polygon([<fill-rule>,]? [<x> <y>]#);
```

### Fill Rules
- `nonzero` (default): Para polígonos simples sin auto-intersección
- `evenodd`: Para formas que se cruzan (estrellas, patrones complejos)

### Sistema de Coordenadas
- Caja de referencia: border-box del elemento
- Origen: `0% 0%` = esquina superior-izquierda, `100% 100%` = inferior-derecha
- Unidades: Porcentajes que escalan responsivamente
- Valores fuera de rango: Permitidos (ej: `-10% 110%`) para efectos de desborde
- Mínimo: 3 puntos (triángulo)
- Máximo: Sin límite, pero mantener bajo ~30 puntos por rendimiento

### Renderizado del Navegador
1. Conecta puntos **en orden** (primero → segundo → tercero → ... → vuelve al primero)
2. La forma **siempre se cierra** — último punto se conecta al primero
3. Todo **fuera** del polígono se oculta (clipped)
4. El box model del elemento no cambia — solo el renderizado

## Estrategia de Triangulación (Patrón shapes.json)

### ¿Por qué Triángulos?
1. **Morphing independiente:** Cada triángulo transiciona por separado
2. **Estética fragmentada:** Triángulos crean un look facetado y geométrico
3. **Sin restricción de vértices:** Cada fragmento es un `<div>` separado
4. **Variación de color:** Cada triángulo puede tener diferente opacidad

### Estructura de Datos
```typescript
type Point = [number, number];  // [x%, y%]
type Polygon = [Point, Point, Point];  // Siempre 3 puntos (triángulo)

interface Shape {
  id: string;
  name: string;
  description: string;
  polygons: Polygon[];
}

interface ShapesData {
  shapes: Shape[];
}
```

### Patrones de Diseño de Triángulos

#### Patrón A: Radial (abanico desde centro)
Todos los triángulos comparten un punto central. Crea formas circulares/radiales.
```json
// Ejemplo: Símbolo Bitcoin — todos comparten [50, 50]
[[50, 10], [60, 15], [50, 50]],
[[60, 15], [75, 25], [50, 50]],
[[75, 25], [85, 40], [50, 50]]
```

#### Patrón B: Capas (conchas concéntricas)
Triángulos forman capas que se construyen desde un núcleo.
```json
// Capa exterior
[[15, 10], [85, 10], [50, 95]],
// Capa interior
[[20, 15], [80, 15], [50, 85]],
// Núcleo
[[30, 25], [70, 25], [50, 65]]
```

#### Patrón C: Adyacente (teselación)
Triángulos comparten bordes para formar una superficie continua.
```json
// Dos triángulos compartiendo un borde forman un quad
[[20, 30], [80, 30], [70, 70]],
[[80, 30], [70, 70], [10, 70]]
```

#### Patrón D: Fragmentos de detalle
Triángulos pequeños añaden detalle/textura a la forma principal.
```json
// Triángulos principales + acentos de detalle
[[48, 5], [52, 5], [50, 20]],   // Acento superior
[[48, 80], [52, 80], [50, 95]]  // Acento inferior
```

## Morphing entre Shapes

### Cómo Funciona
Cada triángulo es un `<div>` separado. Cuando cambia la shape:
1. Los triángulos viejos se desmontan, nuevos se montan
2. La `transition` CSS en `clip-path` anima el cambio
3. El easing `cubic-bezier(0.4, 0, 0.2, 1)` crea movimiento suave

### Implementación Actual
```css
.fragment {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.8s ease;
  will-change: clip-path;
}
```

### Restricción Clave
**Para transición/animación CSS entre dos valores `polygon()`, ambos deben tener el mismo número de vértices.** El enfoque de triangulación evita esto usando elementos separados por triángulo.

## Diseño de Nuevas Shapes — Paso a Paso

### Paso 1: Bocetar la Forma
Dibuja tu forma objetivo en una cuadrícula 100×100. Marca vértices clave.

### Paso 2: Identificar Estrategia de Descomposición
Elige un patrón:
- **Radial** para formas circulares/simbólicas (logo Bitcoin)
- **Capas** para escudos, marcos, formas bordeadas
- **Adyacente** para formas geométricas sólidas (lingotes, barras)
- **Detalle** para añadir textura/accentos

### Paso 3: Escribir los Triángulos
Cada triángulo = `[[x1, y1], [x2, y2], [x3, y3]]`

**Reglas:**
- Todos los valores 0-100 (porcentajes)
- El orden importa — los puntos conectan secuencialmente
- Los triángulos deben superponerse o tocarse para evitar huecos
- 15-30 triángulos es un buen rango para riqueza visual

### Paso 4: Verificar Cobertura
Asegura que los triángulos llenen colectivamente el área de la forma.

### Paso 5: Añadir a shapes.json
```json
{
  "id": "mi-shape",
  "name": "Mi Forma",
  "description": "Descripción del concepto.",
  "polygons": [
    [[x1, y1], [x2, y2], [x3, y3]]
  ]
}
```

### Paso 6: Probar
Ejecuta `npm run dev` y haz clic en "Transformar" para ver el efecto.

### Pro Tips
- **Empieza con 8-12 triángulos**, luego añade fragmentos de detalle
- **Usa el centro** `[50, 50]` como ancla para formas radiales
- **Simetría:** Refleja coordenadas a través del eje central
- **Superposición intencional:** Triángulos ligeramente superpuestos crean profundidad
- **Triángulos de borde:** Coloca triángulos en el perímetro primero, luego rellena hacia adentro

## Rendimiento y Accesibilidad

### Rendimiento
- Mantener triángulos bajo ~30 por shape
- Usar `will-change: clip-path` para promover a capa GPU
- Evitar animar texto dentro de contenedores clipped
- Preferir coordenadas porcentuales para escalado sin recálculo

### Accesibilidad
```css
@media (prefers-reduced-motion: reduce) {
  .fragment {
    transition: none;
  }
}
```

```css
@supports not (clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)) {
  .fragment {
    clip-path: none;
    opacity: 0.5;
  }
}
```

### Soporte de Navegadores
`clip-path: polygon()` soportado en todos los navegadores modernos. Sin prefijos.

## Herramientas y Utilidades

### Generadores Online
- **[Clippy](https://bennettfeely.com/clippy/)** — Editor visual de clip-path polygon con output en porcentajes
- **[CSS3Shapes](https://css3shapes.com/)** — Biblioteca de formas CSS pre-construidas
- **[Clip Path Maker](https://www.cssportal.com/css-clip-path-generator/)** — Herramienta de dibujo libre

### Workflow Recomendado
1. **Prototipar en Clippy** — Dibuja la forma visualmente, copia valores porcentuales
2. **Descomponer en triángulos** — Divide el polígono en arrays de 3 puntos
3. **Pegar en shapes.json** — Añadir como nueva entrada de shape
4. **Probar en dev** — Verificar que la transición morphing se ve correcta

### Función Helper (para uso futuro)
```typescript
// Convierte un string CSS polygon() a formato shapes.json
function parseClipPathToTriangles(clipPath: string): Polygon[] {
  const matches = clipPath.match(/([\d.]+)%\s+([\d.]+)%/g);
  if (!matches) return [];
  const points: Point[] = matches.map(m => {
    const [x, y] = m.match(/[\d.]+/g)!.map(Number);
    return [x, y];
  });
  // Triangulación usando método fan desde primer punto
  const triangles: Polygon[] = [];
  for (let i = 1; i < points.length - 1; i++) {
    triangles.push([points[0], points[i], points[i + 1]]);
  }
  return triangles;
}
```

## Referencia Rápida

### Mapa de Coordenadas
```
0% 0% ─────────── 100% 0%
  │                  │
  │    50% 50%       │
  │    (centro)      │
  │                  │
0% 100% ───────── 100% 100%
```

### Patrones Comunes de Triángulos
```typescript
// Triángulo superior (apunta arriba)
[[50, 0], [100, 100], [0, 100]]

// Triángulo centro-derecha
[[50, 50], [100, 0], [100, 100]]

// Pequeño acento de detalle
[[48, 5], [52, 5], [50, 20]]
```

### Rango de Opacidad de Color
```typescript
// Fórmula actual en FragmentedShape.tsx
`rgba(247, 147, 26, ${0.4 + (idx % 6) * 0.1})`
// Produce: 0.4, 0.5, 0.6, 0.7, 0.8, 0.9
```
