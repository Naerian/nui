import { ComponentPageConfig } from '../../../core/models';
import { BUTTON_EXAMPLES_SECTIONS } from './configs/button-examples.config';
import { BUTTON_API_SECTIONS } from './configs/button-api.config';
import { BUTTON_THEMING_SECTIONS } from './configs/button-theming.config';

/**
 * Configuración completa de la página de documentación del componente Button
 * 
 * Estructura organizada en múltiples archivos:
 * - button-examples.config.ts: Todas las demos interactivas
 * - button-api.config.ts: Inputs, Outputs y Computed properties (tablas)
 * - button-theming.config.ts: Variables CSS de colores y estructura (tablas)
 */
export const BUTTON_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.button.title',
  subtitle: 'components.button.subtitle',
  sections: [
    ...BUTTON_EXAMPLES_SECTIONS,
    ...BUTTON_API_SECTIONS,
    ...BUTTON_THEMING_SECTIONS,
  ],
};

