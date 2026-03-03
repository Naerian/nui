export const DEFAULT_TIMEPICKER_I18N = {
  setToCurrentTime: 'Actual',
  selectTime: 'Seleccionar hora',
  clear: 'Limpiar',
  hour: 'Hora',
  minutes: 'Minutos',
  hour12: 'Hora (1-12)',
  hour24: 'Hora (0-23)',
  period: 'Periodo (AM/PM)',
  normalizedTime: 'Tiempo normalizado <br/> ({ original } → { normalized })',
  rangeLabel: 'Rango permitido',
  timeSelected: 'Hora seleccionada',
  duration: {
    hours: 'horas',
    minutes: 'minutos',
    seconds: 'segundos',
    hoursShort: 'h',
    minutesShort: 'm',
    secondsShort: 's',
    selectDuration: 'Selecciona duración',
    durationSelected: 'Duración seleccionada',
  },
  tabs: {
    selector: 'Selector',
    presets: 'Acc. rápidos',
  },
  presets: {
    now: 'Ahora',
    noon: 'Mediodía',
    midnight: 'Medianoche',
    minutes: '{{value}} min',
    hour: '{{value}} hora',
    hours: '{{value}} horas',
  },
};

export interface TimePickerI18n {
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
}
