import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab Accesibilidad del componente Avatar.
 *
 * El componente Avatar aplica los siguientes patrones ARIA:
 *
 *  1. El contenedor principal lleva role="img" para que las tecnologías
 *     asistivas lo traten como una imagen semántica. El nombre accesible se
 *     resuelve por el siguiente orden: tooltip() || alt() || 'avatar'.
 *
 *  2. El <img> interno siempre tiene alt="" vacío; la accesibilidad recae
 *     sobre el div padre, evitando nombres duplicados.
 *
 *  3. Los elementos decorativos (iniciales, icono, fallback) llevan
 *     aria-hidden="true" para no ser leídos independientemente.
 *
 *  4. En nui-avatar-group el listado usa role="list" con role="listitem" por
 *     cada avatar. El indicador de exceso "+N" tiene role="img" con
 *     aria-label generado desde el token i18n avatar.moreProfiles.
 *
 * El componente es puramente visual y no gestiona el foco ni el teclado;
 * si se usa dentro de un contexto interactivo (botón, enlace) el
 * consumidor es responsable de añadir los atributos ARIA correspondientes.
 */
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
    examples: [
      {
        title: 'codeExamples.html',
        language: 'html',
        code: `<!-- tooltip tiene máxima prioridad para el nombre accesible -->
<nui-avatar src="..." tooltip="John Doe"></nui-avatar>

<!-- alt sirve tanto para generar iniciales como de nombre accesible -->
<nui-avatar alt="Jane Smith"></nui-avatar>

<!-- Sin tooltip ni alt → aria-label="avatar" (genérico, evítalo) -->
<nui-avatar icon="ri-user-line"></nui-avatar>

<!-- Grupo: el indicador "+3" anuncia "Más 3 perfiles" (i18n) -->
<nui-avatar-group [avatars]="avatars" [max]="5"></nui-avatar-group>`,
      },
    ],
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
