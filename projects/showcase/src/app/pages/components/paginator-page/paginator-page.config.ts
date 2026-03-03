import { ComponentPageConfig, ComponentSection } from '../../../core/models';
import { PAGINATOR_EXAMPLES_SECTIONS } from './configs/paginator-examples.config';
import { PAGINATOR_API_SECTIONS } from './configs/paginator-api.config';
import { PAGINATOR_THEMING_SECTIONS } from './configs/paginator-theming.config';

/**
 * Secciones del Paginator (modularizado)
 */
export const PAGINATOR_PAGE_SECTIONS: ComponentSection[] = [
  ...PAGINATOR_EXAMPLES_SECTIONS,
  ...PAGINATOR_API_SECTIONS,
  ...PAGINATOR_THEMING_SECTIONS,
];

/**
 * Configuración de la página de documentación del componente Paginator
 */
export const PAGINATOR_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.paginator.title',
  subtitle: 'components.paginator.subtitle',
  sections: PAGINATOR_PAGE_SECTIONS,
};
