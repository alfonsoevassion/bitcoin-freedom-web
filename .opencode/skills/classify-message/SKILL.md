---
name: classify-message
description: Ejecuta el detector de phishing local ia_or_true.py contra mensajes proporcionados y reporta si son phishing o legítimos
---

## Qué hago
- Ejecuto el detector de phishing local `ia_or_true.py` contra el mensaje proporcionado
- Reporto si el mensaje es 🔴 PHISHING o 🟢 LEGÍTIMO
- Muestro la etiqueta cruda del modelo y el puntaje de confianza si el resultado es inesperado o borderline

## Cuándo usarme
Úsame cuando quieras probar un SMS o email sospechoso directamente desde el contexto AI sin cambiar a la terminal.
También útil cuando revisas cambios en la lista de etiquetas en `classify()` y quieres verificar la salida real del modelo.

## Cómo usarme
Proporciona el texto del mensaje que quieres clasificar.

## Comandos
### /clasificar-mensaje [texto]
Clasifica el mensaje proporcionado usando el detector de phishing local.
Ejemplo: `/clasificar-mensaje "Tu cuenta ha sido bloqueada. Haz clic aquí para recuperarla"`

### /verificar-phishing [texto]
Verifica si el mensaje es phishing y muestra detalles del análisis.
Ejemplo: `/verificar-phishing "Confirmación de pago de Amazon: $299.99"`

## Instrucciones
1. Proporciona el mensaje completo que quieres analizar
2. La skill ejecutará el script `ia_or_true.py` localmente
3. Te mostrará el resultado con indicadores visuales (🔴/🟢)
4. Para resultados borderline, mostrará detalles adicionales del modelo

## Activación automática
Esta skill se activa automáticamente cuando detecta:
- Palabras clave como "phishing", "sospechoso", "sms", "email", "estafa"
- Mensajes que contienen enlaces o solicitudes de información personal
- Referencias a `ia_or_true.py` o clasificación de mensajes

## Reglas
- Solo ejecuta el script local si existe en el directorio actual
- Muestra siempre el resultado principal primero (PHISHING/LEGÍTIMO)
- Incluye puntaje de confianza solo si es menor al 80% o mayor al 20%
- No modifica el script `ia_or_true.py`, solo lo ejecuta
- Si el script no existe, sugiere al usuario cómo crearlo o instalarlo