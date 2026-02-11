import { ComponentPageConfig, ComponentSection } from '../../../core/models';
import { AVATAR_EXAMPLES_SECTIONS } from './configs/avatar-examples.config';
import { AVATAR_API_SECTIONS } from './configs/avatar-api.config';
import { AVATAR_THEMING_SECTIONS } from './configs/avatar-theming.config';

export const AVATAR_PAGE_SECTIONS: ComponentSection[] = [
  ...AVATAR_EXAMPLES_SECTIONS,
  ...AVATAR_API_SECTIONS,
  ...AVATAR_THEMING_SECTIONS,
];

/**
 * Configuración completa de la página de documentación del componente Avatar
 */
export const AVATAR_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.avatar.title',
  subtitle: 'components.avatar.subtitle',
  sections: AVATAR_PAGE_SECTIONS,
};
