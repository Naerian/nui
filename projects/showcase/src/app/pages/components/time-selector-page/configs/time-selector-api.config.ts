import { ComponentSection } from '../../../../core/models';

/**
 * Configuración de la tab API del componente TimeSelector
 * Documenta inputs, outputs y modelos
 */
export const TIME_SELECTOR_API_SECTIONS: ComponentSection[] = [
  {
    id: 'api-inputs',
    title: 'components.timeSelector.api.inputs.title',
    description: 'components.timeSelector.api.inputs.description',
    anchor: 'api-inputs',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>mode</code>',
          'TimeSelectorMode',
          '<code class="neutral">HOUR_MINUTE_24</code>',
          'components.timeSelector.api.inputs.rows.mode',
        ],
        [
          '<code>disabled</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.timeSelector.api.inputs.rows.disabled',
        ],
        [
          '<code>title</code>',
          'string',
          '<code class="neutral">""</code>',
          'components.timeSelector.api.inputs.rows.title',
        ],
        [
          '<code>showHeader</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.timeSelector.api.inputs.rows.showHeader',
        ],
        [
          '<code>showFooter</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.timeSelector.api.inputs.rows.showFooter',
        ],
        [
          '<code>config</code>',
          'TimeSelectorConfig',
          '<code class="neutral">undefined</code>',
          'components.timeSelector.api.inputs.rows.config',
        ],
        [
          '<code>defaultStrategy</code>',
          'TimeSelectorStrategy',
          '<code class="neutral">empty</code>',
          'components.timeSelector.api.inputs.rows.defaultStrategy',
        ],
        [
          '<code>defaultValue</code>',
          'Date | string | TimeValue',
          '<code class="neutral">undefined</code>',
          'components.timeSelector.api.inputs.rows.defaultValue',
        ],
        [
          '<code>smartOffset</code>',
          'number',
          '<code class="neutral">30</code>',
          'components.timeSelector.api.inputs.rows.smartOffset',
        ],
        [
          '<code>value</code>',
          'TimeSelectorValue',
          '<code class="neutral">null</code>',
          'components.timeSelector.api.inputs.rows.value',
        ],
        [
          '<code>autoClose</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.timeSelector.api.inputs.rows.autoClose',
        ],
        [
          '<code>overlayMode</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.timeSelector.api.inputs.rows.overlayMode',
        ],
      ],
    },
  },
  {
    id: 'api-outputs',
    title: 'components.timeSelector.api.outputs.title',
    description: 'components.timeSelector.api.outputs.description',
    anchor: 'api-outputs',
    table: {
      headers: ['common.tables.event', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>valueChange</code>',
          'EventEmitter<TimeValue | DurationValue | null>',
          'components.timeSelector.api.outputs.rows.valueChange',
        ],
        [
          '<code>selectFinished</code>',
          'OutputEmitterRef<void>',
          'components.timeSelector.api.outputs.rows.selectFinished',
        ],
      ],
    },
  },
  {
    id: 'api-config',
    title: 'components.timeSelector.api.config.title',
    description: 'components.timeSelector.api.config.description',
    anchor: 'api-config',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>hourStep</code>',
          'number',
          '<code class="neutral">1</code>',
          'components.timeSelector.api.config.rows.hourStep',
        ],
        [
          '<code>minuteStep</code>',
          'number',
          '<code class="neutral">1</code>',
          'components.timeSelector.api.config.rows.minuteStep',
        ],
        [
          '<code>minTime</code>',
          'TimeValue',
          '<code class="neutral">undefined</code>',
          'components.timeSelector.api.config.rows.minTime',
        ],
        [
          '<code>maxTime</code>',
          'TimeValue',
          '<code class="neutral">undefined</code>',
          'components.timeSelector.api.config.rows.maxTime',
        ],
        [
          '<code>disabledHours</code>',
          'number[]',
          '<code class="neutral">[]</code>',
          'components.timeSelector.api.config.rows.disabledHours',
        ],
        [
          '<code>disabledMinutes</code>',
          'number[]',
          '<code class="neutral">[]</code>',
          'components.timeSelector.api.config.rows.disabledMinutes',
        ],
        [
          '<code>presets</code>',
          'TimePreset[]',
          '<code class="neutral">[]</code>',
          'components.timeSelector.api.config.rows.presets',
        ],
        [
          '<code>showRangeIndicator</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.timeSelector.api.config.rows.showRangeIndicator',
        ],
        [
          '<code>duration</code>',
          'DurationConfig',
          '<code class="neutral">DEFAULT_DURATION_CONFIG</code>',
          'components.timeSelector.api.config.rows.duration',
        ],
      ],
    },
  },
  {
    id: 'api-duration-config',
    title: 'components.timeSelector.api.durationConfig.title',
    description: 'components.timeSelector.api.durationConfig.description',
    anchor: 'api-duration-config',
    table: {
      headers: [
        'common.tables.property',
        'common.tables.type',
        'common.tables.default',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>maxHours</code>',
          'number',
          '<code class="neutral">23</code>',
          'components.timeSelector.api.durationConfig.rows.maxHours',
        ],
        [
          '<code>minHours</code>',
          'number',
          '<code class="neutral">0</code>',
          'components.timeSelector.api.durationConfig.rows.minHours',
        ],
        [
          '<code>showSeconds</code>',
          'boolean',
          '<code class="neutral">false</code>',
          'components.timeSelector.api.durationConfig.rows.showSeconds',
        ],
        [
          '<code>secondStep</code>',
          'number',
          '<code class="neutral">1</code>',
          'components.timeSelector.api.durationConfig.rows.secondStep',
        ],
        [
          '<code>allowZero</code>',
          'boolean',
          '<code class="neutral">true</code>',
          'components.timeSelector.api.durationConfig.rows.allowZero',
        ],
        [
          '<code>quickDurations</code>',
          'DurationPreset[]',
          '<code class="neutral">[]</code>',
          'components.timeSelector.api.durationConfig.rows.quickDurations',
        ],
      ],
    },
  },
  {
    id: 'api-time-value',
    title: 'TimeValue',
    description: 'Interface para representar un valor de tiempo (hora del día)',
    anchor: 'api-time-value',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>hour</code>', 'number', 'components.timeSelector.api.timeValue.rows.hour'],
        ['<code>minute</code>', 'number', 'components.timeSelector.api.timeValue.rows.minute'],
        [
          '<code>period</code>',
          'TimePeriod | null',
          'components.timeSelector.api.timeValue.rows.period',
        ],
      ],
    },
  },
  {
    id: 'api-duration-value',
    title: 'DurationValue',
    description: 'Interface para representar un intervalo de tiempo (duración)',
    anchor: 'api-duration-value',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>hours</code>', 'number', 'components.timeSelector.api.durationValue.rows.hours'],
        [
          '<code>minutes</code>',
          'number',
          'components.timeSelector.api.durationValue.rows.minutes',
        ],
        [
          '<code>seconds</code>',
          'number',
          'components.timeSelector.api.durationValue.rows.seconds',
        ],
      ],
    },
  },
  {
    id: 'api-time-preset',
    title: 'TimePreset',
    description: 'Interface para definir presets de tiempo rápido (ej: "Ahora", "Mediodía")',
    anchor: 'api-time-preset',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>label</code>', 'string', 'components.timeSelector.api.timePreset.rows.label'],
        ['<code>time</code>', 'TimeValue', 'components.timeSelector.api.timePreset.rows.time'],
        ['<code>icon</code>', 'string', 'components.timeSelector.api.timePreset.rows.icon'],
      ],
    },
  },
  {
    id: 'api-duration-preset',
    title: 'DurationPreset',
    description: 'Interface para definir presets de duración rápida (ej: "15 min", "1 hora")',
    anchor: 'api-duration-preset',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>label</code>', 'string', 'components.timeSelector.api.durationPreset.rows.label'],
        [
          '<code>duration</code>',
          'DurationValue',
          'components.timeSelector.api.durationPreset.rows.duration',
        ],
        ['<code>icon</code>', 'string', 'components.timeSelector.api.durationPreset.rows.icon'],
      ],
    },
  },
  {
    id: 'api-time-selector-mode',
    title: 'TimeSelectorMode',
    description: 'Type con los modos de selección disponibles',
    anchor: 'api-time-selector-mode',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        ['<code>HOUR_12</code>', 'components.timeSelector.api.mode.rows.HOUR_12'],
        ['<code>HOUR_24</code>', 'components.timeSelector.api.mode.rows.HOUR_24'],
        ['<code>HOUR_MINUTE_12</code>', 'components.timeSelector.api.mode.rows.HOUR_MINUTE_12'],
        ['<code>HOUR_MINUTE_24</code>', 'components.timeSelector.api.mode.rows.HOUR_MINUTE_24'],
        ['<code>DURATION</code>', 'components.timeSelector.api.mode.rows.DURATION'],
      ],
    },
  },
  {
    id: 'api-time-selector-strategy',
    title: 'TimeSelectorStrategy',
    description: 'Type con las estrategias de valor inicial disponibles',
    anchor: 'api-time-selector-strategy',
    table: {
      headers: ['common.tables.value', 'common.tables.description'],
      rows: [
        ['<code>now</code>', 'components.timeSelector.api.strategy.rows.now'],
        ['<code>smart</code>', 'components.timeSelector.api.strategy.rows.smart'],
        ['<code>empty</code>', 'components.timeSelector.api.strategy.rows.empty'],
        ['<code>custom</code>', 'components.timeSelector.api.strategy.rows.custom'],
      ],
    },
  },
  {
    id: 'api-time-selector-value',
    title: 'TimeSelectorValue',
    description: 'Union type que acepta múltiples formatos de entrada para el valor del picker',
    anchor: 'api-time-selector-value',
    table: {
      headers: ['common.tables.type', 'common.tables.description'],
      rows: [
        ['<code>TimeValue</code>', 'components.timeSelector.api.value.rows.timeValue'],
        ['<code>DurationValue</code>', 'components.timeSelector.api.value.rows.durationValue'],
        ['<code>Date</code>', 'components.timeSelector.api.value.rows.date'],
        ['<code>string</code>', 'components.timeSelector.api.value.rows.string'],
        ['<code>null</code>', 'components.timeSelector.api.value.rows.null'],
      ],
    },
  },
  {
    id: 'api-methods',
    title: 'components.timeSelector.api.methods.title',
    description: 'components.timeSelector.api.methods.description',
    anchor: 'api-methods',
    table: {
      headers: [
        'common.tables.method',
        'common.tables.parameters',
        'common.tables.return',
        'common.tables.description',
      ],
      rows: [
        [
          '<code>writeValue(value)</code>',
          'TimeSelectorValue',
          'void',
          'components.timeSelector.api.methods.rows.writeValue',
        ],
        [
          '<code>registerOnChange(fn)</code>',
          '(value: TimeValue | DurationValue | null) => void',
          'void',
          'components.timeSelector.api.methods.rows.registerOnChange',
        ],
        [
          '<code>registerOnTouched(fn)</code>',
          '() => void',
          'void',
          'components.timeSelector.api.methods.rows.registerOnTouched',
        ],
        [
          '<code>setDisabledState(isDisabled)</code>',
          'boolean',
          'void',
          'components.timeSelector.api.methods.rows.setDisabledState',
        ],
        [
          '<code>toDate(baseDate?)</code>',
          'Date',
          'Date',
          'components.timeSelector.api.methods.rows.toDate',
        ],
        [
          '<code>toDurationMilliseconds()</code>',
          '-',
          'number | null',
          'components.timeSelector.api.methods.rows.toDurationMilliseconds',
        ],
      ],
    },
  },
  // ─────────────────────────────────────────────────────────────────────────
  // Content Directives (custom templates)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'api-content-directives',
    title: 'components.timeSelector.api.contentDirectives.title',
    description: 'components.timeSelector.api.contentDirectives.description',
    anchor: 'api-content-directives',
    table: {
      headers: ['common.tables.directive', 'Selector CSS', 'common.tables.description'],
      rows: [
        [
          '<code>TimeSelectorItemDirective</code>',
          '<code>[nuiTimeSelectorItem]</code>',
          'components.timeSelector.api.contentDirectives.rows.item',
        ],
        [
          '<code>TimeSelectorFooterDirective</code>',
          '<code>[nuiTimeSelectorFooter]</code>',
          'components.timeSelector.api.contentDirectives.rows.footer',
        ],
        [
          '<code>TimeSelectorHeaderDirective</code>',
          '<code>[nuiTimeSelectorHeader]</code>',
          'components.timeSelector.api.contentDirectives.rows.header',
        ],
      ],
    },
  },
  {
    id: 'api-item-context',
    title: 'TimeSelectorItemContext',
    description:
      'Contexto disponible en el template de <code>[nuiTimeSelectorItem]</code>. Accede con <code>let-value</code>, <code>let-type="type"</code>, etc.',
    anchor: 'api-item-context',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>$implicit</code>',
          'number | string',
          'components.timeSelector.api.itemContext.rows.implicit',
        ],
        [
          '<code>type</code>',
          "'hour' | 'minute' | 'period'",
          'components.timeSelector.api.itemContext.rows.type',
        ],
        [
          '<code>selected</code>',
          'boolean',
          'components.timeSelector.api.itemContext.rows.selected',
        ],
        [
          '<code>disabled</code>',
          'boolean',
          'components.timeSelector.api.itemContext.rows.disabled',
        ],
      ],
    },
  },
  {
    id: 'api-footer-context',
    title: 'TimeSelectorFooterContext',
    description:
      'Contexto disponible en el template de <code>[nuiTimeSelectorFooter]</code>. Accede con <code>let-currentTime</code> y <code>let-actions="actions"</code>.',
    anchor: 'api-footer-context',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>$implicit</code>',
          'TimeValue | DurationValue | null',
          'components.timeSelector.api.footerContext.rows.implicit',
        ],
        [
          '<code>actions.clear()</code>',
          '() => void',
          'components.timeSelector.api.footerContext.rows.actionsClear',
        ],
        [
          '<code>actions.setToNow()</code>',
          '() => void',
          'components.timeSelector.api.footerContext.rows.actionsSetToNow',
        ],
        [
          '<code>normalization</code>',
          '{ original: string; normalized: string } | null',
          'components.timeSelector.api.footerContext.rows.normalization',
        ],
        [
          '<code>range</code>',
          '{ min: TimeValue | undefined; max: TimeValue | undefined }',
          'components.timeSelector.api.footerContext.rows.range',
        ],
      ],
    },
  },
  {
    id: 'api-header-context',
    title: 'TimeSelectorHeaderContext',
    description:
      'Contexto disponible en el template de <code>[nuiTimeSelectorHeader]</code>. Accede con <code>let-currentTime</code>, <code>let-formattedTime="formattedTime"</code>, etc.',
    anchor: 'api-header-context',
    table: {
      headers: ['common.tables.property', 'common.tables.type', 'common.tables.description'],
      rows: [
        [
          '<code>$implicit</code>',
          'TimeValue | DurationValue | null',
          'components.timeSelector.api.headerContext.rows.implicit',
        ],
        [
          '<code>mode</code>',
          'TimeSelectorMode',
          'components.timeSelector.api.headerContext.rows.mode',
        ],
        ['<code>is12h</code>', 'boolean', 'components.timeSelector.api.headerContext.rows.is12h'],
        [
          '<code>formattedTime</code>',
          'string',
          'components.timeSelector.api.headerContext.rows.formattedTime',
        ],
        [
          '<code>normalization</code>',
          '{ original: string; normalized: string } | null',
          'components.timeSelector.api.headerContext.rows.normalization',
        ],
        [
          '<code>range</code>',
          '{ min: TimeValue | undefined; max: TimeValue | undefined }',
          'components.timeSelector.api.headerContext.rows.range',
        ],
      ],
    },
  },
];
