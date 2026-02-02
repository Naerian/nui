import { trigger, state, style, transition, animate, AnimationTriggerMetadata } from '@angular/animations';

/**
 * AnimaciÃ³n de deslizamiento para el panel
 * 
 * Inspirada en Material-UI Drawer con optimizaciones para fluidez:
 * - Usa translate3d para aceleración GPU
 * - Timing functions optimizadas para sensación natural
 * - Duración ajustada según el estándar de Material Design
 * 
 * Estados:
 * - `void`: Estado inicial antes de que el componente esté en el DOM
 * - `visible`: Panel completamente visible en su posición final
 * - `hidden`: Panel oculto (fuera de la pantalla)
 * 
 * Parámetros:
 * - `transform`: Transformación CSS para la posición inicial/final (ej: 'translate3d(100%, 0, 0)')
 * - `duration`: Duración de la animación en milisegundos (por defecto: 225)
 * 
 * Curvas de timing:
 * - Entrada: cubic-bezier(0.0, 0, 0.2, 1) - "easeOut" - Decelera al final
 * - Salida: cubic-bezier(0.4, 0, 0.6, 1) - "easeIn" - Acelera al final
 * - Sharp: cubic-bezier(0.4, 0, 0.6, 1) - Para transiciones rápidas
 * 
 * @see https://mui.com/material-ui/react-drawer/
 * @see https://m3.material.io/styles/motion/easing-and-duration/tokens-specs
 * 
 * @example
 * ```typescript
 * animations: [sidebarPanelAnimation]
 * 
 * // En el template:
 * [@sidebar-panel]="{ value: state, params: { transform: 'translate3d(100%, 0, 0)', duration: 225 } }"
 * ```
 */
export const sidebarPanelAnimation: AnimationTriggerMetadata = trigger('sidebar-panel', [
  // Estado inicial (fuera de pantalla)
  state(
    'void',
    style({ 
      transform: '{{ transform }}',
      visibility: 'hidden'
    }),
    { params: { transform: 'translate3d(100%, 0, 0)' } }
  ),
  
  // Estado visible (en pantalla)
  state(
    'visible',
    style({ 
      transform: 'translate3d(0, 0, 0)',
      visibility: 'visible'
    })
  ),
  
  // Estado oculto (fuera de pantalla)
  state(
    'hidden',
    style({ 
      transform: '{{ transform }}',
      visibility: 'hidden'
    }),
    { params: { transform: 'translate3d(100%, 0, 0)' } }
  ),
  
  // Transición de entrada: void => visible
  // Usa easeOut para decelerar suavemente al llegar a su posición
  transition(
    'void => visible',
    animate('{{ duration }}ms cubic-bezier(0.0, 0, 0.2, 1)'),
    { params: { duration: 225 } }
  ),
  
  // Transición de salida: visible => hidden
  // Usa sharp para una salida más rápida y decidida
  transition(
    'visible => hidden',
    animate('{{ duration }}ms cubic-bezier(0.4, 0, 0.6, 1)'),
    { params: { duration: 195 } }
  ),
  
  // Transición para restaurar desde minimizado: hidden => visible
  // Misma curva que la entrada inicial
  transition(
    'hidden => visible',
    animate('{{ duration }}ms cubic-bezier(0.0, 0, 0.2, 1)'),
    { params: { duration: 225 } }
  ),
]);

/**
 * Animación de fade para el backdrop
 * 
 * Proporciona una transición suave de opacidad para el fondo oscuro
 * detrás del panel, sincronizada con la animación del panel.
 * 
 * Usa la misma duración que Material-UI (225ms entrada, 195ms salida)
 * para mantener consistencia visual.
 * 
 * Estados:
 * - `void`: Backdrop invisible (opacity: 0)
 * - `open`: Backdrop visible (opacity: 1)
 * 
 * @example
 * ```typescript
 * animations: [fadeBackdropAnimation]
 * 
 * // En el template del backdrop:
 * [@fadeBackdrop]
 * ```
 */
export const fadeBackdropAnimation: AnimationTriggerMetadata = trigger('fadeBackdrop', [
  state('void', style({ opacity: 0 })),
  state('open', style({ opacity: 1 })),
  
  // Entrada del backdrop (fade in)
  transition('void => open', animate('225ms cubic-bezier(0.0, 0, 0.2, 1)')),
  
  // Salida del backdrop (fade out)
  transition('open => void', animate('195ms cubic-bezier(0.4, 0, 0.6, 1)')),
]);


