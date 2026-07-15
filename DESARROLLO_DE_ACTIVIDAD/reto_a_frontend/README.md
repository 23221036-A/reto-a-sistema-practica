# Reto A — Frontend del Sistema de Prácticas

Implementación funcional de la pantalla de trazabilidad del estudiante.

## Stack
- HTML5
- CSS3
- JavaScript Vanilla

No requiere instalar dependencias.

## Cómo ejecutar
1. Descomprime el archivo.
2. Abre la carpeta en Visual Studio Code.
3. Abre `index.html` directamente en el navegador o usa la extensión Live Server.

## Funcionalidades incluidas
- Línea de tiempo interactiva.
- Estado observado destacado.
- Contador de días hábiles.
- Modal para revisar observaciones.
- Modal para subsanar el expediente.
- Validaciones de archivo PDF, tamaño máximo de 5 MB, comentario y confirmación.
- Simulación de carga.
- Mensajes de error y éxito.
- Diseño responsive.
- Separación entre datos, reglas de negocio, interfaz y eventos.

## Archivos principales
- `index.html`: estructura visual.
- `css/styles.css`: diseño y responsive.
- `js/mock-data.js`: datos simulados.
- `js/business-rules.js`: cálculos y validaciones.
- `js/ui.js`: actualización de la interfaz.
- `js/app.js`: eventos y coordinación.

## Fecha simulada
Se usa `2026-07-14` como fecha simulada para mostrar 3 días hábiles restantes hasta el `2026-07-17`.
