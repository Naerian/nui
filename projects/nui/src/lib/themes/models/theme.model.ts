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
  darkMode?: DarkModeStrategy;
  darkModeClass?: string;
}

export const DARK_MODE_STRATEGIES = ['auto', 'manual', 'system'] as const;
export type DarkModeStrategy = (typeof DARK_MODE_STRATEGIES)[number];
export enum DarkModeStrategyEnum {
  AUTO = 'auto',
  MANUAL = 'manual',
  SYSTEM = 'system',
}

export const DARK_MODE_CLASS = 'dark-mode';
