export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  info: string;
  warning: string;
  danger: string;
}

export interface ThemeGrays {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface ThemePreset {
  name: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
  grays?: ThemeGrays; // Optional, falls back to default neutral grays
}

export interface ThemeConfig {
  preset?: ThemePreset;
  darkMode?: 'auto' | 'manual' | 'system';
  darkModeClass?: string;
}
