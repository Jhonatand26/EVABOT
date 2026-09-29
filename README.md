# Estaciones Virtuales CNB

Prototipo navegable basado en el flujo y las referencias visuales entregadas por los estudiantes de INEB San Francisco Zapotitlán. Usa la mascota suministrada por el equipo.

## Ejecutar

```bash
make serve
```

Abre <http://localhost:8000>. Para revisar la sintaxis de JavaScript: `make check`.

## Investigación con usuarios

El equipo puede abrir el [formulario de investigación](investigacion-usuarios.html) en <http://localhost:8000/investigacion-usuarios.html>. Sirve para definir el público objetivo, preparar entrevistas por perfil, observar tareas del prototipo y registrar hallazgos con su evidencia y próxima acción. Se puede descargar cada registro como JSON o imprimirlo/guardarlo como PDF desde el navegador.

Completa un registro por participante con un código anónimo. Para comparar sesiones, revisa qué dificultades se repiten, a cuántas personas afectan y si impiden completar tareas importantes. Usa esa evidencia para priorizar cambios y vuelve a probarlos.

## Recorrido de prueba

1. Ingresa el código de demostración **12345**.
2. Explora las seis secciones del espacio personal.
3. En **Contenidos CNB**, selecciona un área, abre un tema y pulsa **Leer información**. El botón **Completar sección** muestra la pantalla final.
4. Usa **Cerrar sesión** para volver al acceso.

Los nombres, notas, actividades, fechas y respuestas son datos de muestra. No hay autenticación real, almacenamiento de datos estudiantiles, videos ni integración con servicios escolares. Antes de un despliegue real se deben conectar los sistemas autorizados y validar el contenido CNB y los datos institucionales.
