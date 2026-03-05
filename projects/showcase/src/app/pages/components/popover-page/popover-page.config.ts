import { ComponentPageConfig, ComponentSection } from '../../../core/models';
import { POPOVER_EXAMPLES_SECTIONS } from './configs/popover-examples.config';
import { POPOVER_API_SECTIONS } from './configs/popover-api.config';
import { POPOVER_THEMING_SECTIONS } from './configs/popover-theming.config';
import { POPOVER_A11Y_SECTIONS } from './configs/popover-a11y.config';

export const POPOVER_PAGE_SECTIONS: ComponentSection[] = [
  ...POPOVER_EXAMPLES_SECTIONS,
  ...POPOVER_API_SECTIONS,
  ...POPOVER_THEMING_SECTIONS,
  ...POPOVER_A11Y_SECTIONS,
];

/**
 * Configuración modular de la página de documentación del componente Popover
 */
export const POPOVER_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.popover.title',
  subtitle: 'components.popover.subtitle',
  sections: POPOVER_PAGE_SECTIONS,
};
