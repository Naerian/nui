import { ComponentPageConfig, ComponentSection } from '../../../core/models';
import { PROGRESS_BAR_EXAMPLES_SECTIONS } from './configs/progress-bar-examples.config';
import { PROGRESS_BAR_API_SECTIONS } from './configs/progress-bar-api.config';
import { PROGRESS_BAR_THEMING_SECTIONS } from './configs/progress-bar-theming.config';
import { PROGRESS_BAR_A11Y_SECTIONS } from './configs/progress-bar-a11y.config';
import { PROGRESS_BAR_GLOBAL_CONFIG_SECTIONS } from './configs/progress-bar-global-config.config';

export const PROGRESS_BAR_PAGE_SECTIONS: ComponentSection[] = [
  ...PROGRESS_BAR_EXAMPLES_SECTIONS,
  ...PROGRESS_BAR_API_SECTIONS,
  ...PROGRESS_BAR_THEMING_SECTIONS,
  ...PROGRESS_BAR_A11Y_SECTIONS,
  ...PROGRESS_BAR_GLOBAL_CONFIG_SECTIONS,
];

export const PROGRESS_BAR_PAGE_CONFIG: ComponentPageConfig = {
  title: 'components.progressBar.title',
  subtitle: 'components.progressBar.subtitle',
  sections: PROGRESS_BAR_PAGE_SECTIONS,
};
