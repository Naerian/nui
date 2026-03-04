export interface FontOption {
  name: string;
  value: string; // CSS font-family value
  label: string;
}

export const SHOWCASE_FONTS: FontOption[] = [
  {
    name: 'inter',
    value: "'Inter', system-ui, sans-serif",
    label: 'Inter',
  },
  {
    name: 'roboto',
    value: "'Roboto', system-ui, sans-serif",
    label: 'Roboto',
  },
  {
    name: 'poppins',
    value: "'Poppins', system-ui, sans-serif",
    label: 'Poppins',
  },
  {
    name: 'montserrat',
    value: "'Montserrat', system-ui, sans-serif",
    label: 'Montserrat',
  },
  {
    name: 'playfair',
    value: "'Playfair Display', Georgia, serif",
    label: 'Playfair Display',
  },
];

export const DEFAULT_FONT_NAME = 'inter';
export const DEFAULT_FONT_SIZE = 16; // px
export const MIN_FONT_SIZE = 12;
export const MAX_FONT_SIZE = 20;
