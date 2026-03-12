export const DEFAULT_TIMESELECTOR_I18N = {
  setToCurrentTime: 'Now',
  selectTime: 'Select time',
  clear: 'Clear',
  hour: 'Hour',
  minutes: 'Minutes',
  hour12: 'Hour (1-12)',
  hour24: 'Hour (0-23)',
  period: 'Period (AM/PM)',
  normalizedTime: 'Normalized time <br/> ({ original } → { normalized })',
  rangeLabel: 'Allowed range',
  timeSelected: 'Time selected',
  duration: {
    hours: 'hours',
    minutes: 'minutes',
    seconds: 'seconds',
    hoursShort: 'h',
    minutesShort: 'm',
    secondsShort: 's',
    selectDuration: 'Select duration',
    durationSelected: 'Duration selected',
  },
  tabs: {
    selector: 'Selector',
    presets: 'Shortcuts',
  },
  presets: {
    now: 'Now',
    noon: 'Noon',
    midnight: 'Midnight',
    minutes: '{{value}} min',
    hour: '{{value}} hour',
    hours: '{{value}} hours',
  },
  a11y: {
    timeSelectorLabel: 'Time selector',
    durationPickerLabel: 'Duration picker',
    hourColumnHelp: 'Use arrow keys to navigate, Enter to select, Home/End for first/last',
    minuteColumnHelp:
      'Use arrow keys to navigate, Enter to select, Home/End for first/last, Page Up/Page Down to jump 5',
    periodHelp: 'Use arrow keys or Tab to navigate, Enter to select',
    normalizedAlert: 'Time adjusted: { original } was normalized to { normalized }',
    rangeInfo: 'Available time range',
  },
};
export interface TimeSelectorI18n {
  setToCurrentTime: string;
  selectTime: string;
  clear: string;
  hour: string;
  minutes: string;
  hour12: string;
  hour24: string;
  period: string;
  normalizedTime: string;
  rangeLabel: string;
  timeSelected: string;
  duration: {
    hours: string;
    minutes: string;
    seconds: string;
    hoursShort: string;
    minutesShort: string;
    secondsShort: string;
    selectDuration: string;
    durationSelected: string;
  };
  tabs: {
    selector: string;
    presets: string;
  };
  presets: {
    now: string;
    noon: string;
    midnight: string;
    minutes: string;
    hour: string;
    hours: string;
  };
  a11y: {
    timeSelectorLabel: string;
    durationPickerLabel: string;
    hourColumnHelp: string;
    minuteColumnHelp: string;
    periodHelp: string;
    normalizedAlert: string;
    rangeInfo: string;
  };
}
