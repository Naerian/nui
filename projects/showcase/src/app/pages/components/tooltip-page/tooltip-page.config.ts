import { ComponentPageConfig } from '../../../core/models';
import { TOOLTIP_EXAMPLES_SECTIONS } from './configs/tooltip-examples.config';
import { TOOLTIP_API_SECTIONS } from './configs/tooltip-api.config';
import { TOOLTIP_THEMING_SECTIONS } from './configs/tooltip-theming.config';

/**
 * Configuración de las secciones de la página de documentación del componente Tooltip
 */
export const TOOLTIP_PAGE_SECTIONS = [
  ...TOOLTIP_EXAMPLES_SECTIONS,
  ...TOOLTIP_API_SECTIONS,
  ...TOOLTIP_THEMING_SECTIONS,
];

/**
 * Configuración completa de la página de documentación del componente Tooltip
 */
export const TOOLTIP_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.tooltip.title',
  subtitle: 'components.tooltip.subtitle',
  sections: TOOLTIP_PAGE_SECTIONS,
};
