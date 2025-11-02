# Guía de uso de tokens de color y variables de diseño

Este archivo describe cómo usar los tokens de color y las variables de diseño en el sistema de estilos del proyecto Angular.

## Estructura de tokens

- Todos los colores usan el prefijo `$color-`.
- Los tokens semánticos (`$color-success`, `$color-warning`, etc.) se usan para UI y componentes.
- Los componentes tienen sus propios tokens (`$color-switch-track-bg`, `$color-modal-confirm`, etc.).
- Las variantes de tema usan el sufijo `-dark` para el modo oscuro.

## Ejemplos de uso

```scss
// Fondo y texto principal
background-color: $color-gray-100;
color: $color-text;

// Botón de éxito
.btn-success {
  background: $color-success;
}

// Switch
.nui-switch__track {
  background: $color-switch-track-bg;
}

// Spinner
.nui-spinner-circle {
  border-color: $color-spinner-border;
}

// Modal de confirmación
.modal-confirm {
  color: $color-modal-confirm;
  background: $color-modal-confirm-bg;
}

// Tema oscuro
body.dark {
  background: $color-gray-900-dark;
  color: $color-text-dark;
}
```

## Personalización

- Puedes sobrescribir los colores base y semánticos usando presets.
- Los tokens de componentes pueden ser modificados para adaptar el branding.

## Buenas prácticas

- Usa siempre los tokens en vez de valores hex directos.
- Mantén la coherencia de nombres al agregar nuevos componentes.
- Documenta los nuevos tokens en este archivo.

---

¿Dudas o sugerencias? Actualiza este README para ayudar a otros desarrolladores.