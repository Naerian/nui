import { ComponentSection } from '../../../../core/models';

export const AVATAR_A11Y_SECTIONS: ComponentSection[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Roles y atributos ARIA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-roles',
    title: 'components.avatar.a11y.roles.title',
    description: 'components.avatar.a11y.roles.description',
    anchor: 'a11y-roles',
    table: {
      headers: [
        'common.tables.element',
        'common.tables.property',
        'common.tables.value',
        'common.tables.description',
      ],
      rows: [
        [
          'components.avatar.a11y.roles.elements.avatarDiv',
          '<code>role</code>',
          '"img"',
          'components.avatar.a11y.roles.rows.roleImg.description',
        ],
        [
          'components.avatar.a11y.roles.elements.avatarDiv',
          '<code>aria-label</code>',
          'tooltip() | alt() | "avatar"',
          'components.avatar.a11y.roles.rows.ariaLabel.description',
        ],
        [
          'components.avatar.a11y.roles.elements.avatarDiv',
          '<code>title</code>',
          'tooltip() | alt() | null',
          'components.avatar.a11y.roles.rows.title.description',
        ],
        [
          '<code>&lt;img&gt;</code>',
          '<code>alt</code>',
          '""',
          'components.avatar.a11y.roles.rows.imgAlt.description',
        ],
        [
          'components.avatar.a11y.roles.elements.decorative',
          '<code>aria-hidden</code>',
          '"true"',
          'components.avatar.a11y.roles.rows.ariaHiddenDecorative.description',
        ],
        [
          'components.avatar.a11y.roles.elements.groupList',
          '<code>role</code>',
          '"list"',
          'components.avatar.a11y.roles.rows.roleList.description',
        ],
        [
          'components.avatar.a11y.roles.elements.groupItem',
          '<code>role</code>',
          '"listitem"',
          'components.avatar.a11y.roles.rows.roleListitem.description',
        ],
        [
          'components.avatar.a11y.roles.elements.excessDiv',
          '<code>role</code>',
          '"img"',
          'components.avatar.a11y.roles.rows.roleExcess.description',
        ],
        [
          'components.avatar.a11y.roles.elements.excessDiv',
          '<code>aria-label</code>',
          'excessTooltip() — i18n',
          'components.avatar.a11y.roles.rows.ariaLabelExcess.description',
        ],
        [
          'components.avatar.a11y.roles.elements.excessSpan',
          '<code>aria-hidden</code>',
          '"true"',
          'components.avatar.a11y.roles.rows.ariaHiddenExcess.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2. Nombre accesible
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-naming',
    title: 'components.avatar.a11y.naming.title',
    description: 'components.avatar.a11y.naming.description',
    anchor: 'a11y-naming',
    note: {
      type: 'warning',
      content: 'components.avatar.a11y.naming.note',
    },
    table: {
      headers: [
        'common.tables.element',
        'common.tables.info',
        'common.tables.description',
      ],
      rows: [
        [
          'components.avatar.a11y.naming.elements.avatarWithTooltip',
          '<code>aria-label</code> = tooltip()',
          'components.avatar.a11y.naming.rows.tooltip.description',
        ],
        [
          'components.avatar.a11y.naming.elements.avatarWithAlt',
          '<code>aria-label</code> = alt()',
          'components.avatar.a11y.naming.rows.alt.description',
        ],
        [
          'components.avatar.a11y.naming.elements.avatarWithoutName',
          '<code>aria-label</code> = "avatar"',
          'components.avatar.a11y.naming.rows.fallback.description',
        ],
        [
          'components.avatar.a11y.naming.elements.excessIndicator',
          'components.avatar.a11y.naming.info.viaI18n',
          'components.avatar.a11y.naming.rows.excess.description',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3. Elementos ocultos a las AT
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'a11y-hidden',
    title: 'components.avatar.a11y.hidden.title',
    description: 'components.avatar.a11y.hidden.description',
    anchor: 'a11y-hidden',
    table: {
      headers: [
        'common.tables.element',
        'common.tables.property',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>&lt;img&gt;</code>',
          '<code>alt=""</code>',
          'components.avatar.a11y.hidden.rows.imgEmpty.description',
        ],
        [
          'components.avatar.a11y.hidden.elements.initials',
          '<code>aria-hidden="true"</code>',
          'components.avatar.a11y.hidden.rows.initials.description',
        ],
        [
          'components.avatar.a11y.hidden.elements.icon',
          '<code>aria-hidden="true"</code>',
          'components.avatar.a11y.hidden.rows.icon.description',
        ],
        [
          'components.avatar.a11y.hidden.elements.fallback',
          '<code>aria-hidden="true"</code>',
          'components.avatar.a11y.hidden.rows.fallbackSpan.description',
        ],
        [
          'components.avatar.a11y.hidden.elements.excessSpan',
          '<code>aria-hidden="true"</code>',
          'components.avatar.a11y.hidden.rows.excessSpan.description',
        ],
      ],
    },
  },
];
