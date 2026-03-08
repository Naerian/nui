import { ComponentSection } from '../../../../core/models';

export const PROGRESS_BAR_A11Y_SECTIONS: ComponentSection[] = [
  {
    id: 'a11y-roles',
    title: 'components.progressBar.a11y.roles.title',
    description: 'components.progressBar.a11y.roles.description',
    anchor: 'a11y-roles',
    table: {
      headers: ['common.tables.property', 'common.tables.value', 'common.tables.description'],
      rows: [
        [
          '<code>role</code>',
          '<code>progressbar</code>',
          'components.progressBar.a11y.roles.rows.role.description',
        ],
        [
          '<code>aria-valuenow</code>',
          'number',
          'components.progressBar.a11y.roles.rows.valuenow.description',
        ],
        [
          '<code>aria-valuemin</code>',
          'number',
          'components.progressBar.a11y.roles.rows.valuemin.description',
        ],
        [
          '<code>aria-valuemax</code>',
          'number',
          'components.progressBar.a11y.roles.rows.valuemax.description',
        ],
        [
          '<code>aria-valuetext</code>',
          'string',
          'components.progressBar.a11y.roles.rows.valuetext.description',
        ],
        [
          '<code>aria-labelledby</code>',
          'string',
          'components.progressBar.a11y.roles.rows.labelledby.description',
        ],
      ],
    },
  },
];
