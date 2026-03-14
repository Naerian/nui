/**
 * Textos localizables del componente NuiDock.
 */
export interface NuiDockI18n {
  /** Etiqueta accesible del toolbar del dock (role="toolbar") */
  ariaLabel: string;
  /** Título de la hoja inferior que lista los elementos en desbordamiento */
  sheetTitle: string;
}

export const DEFAULT_NUI_DOCK_I18N: NuiDockI18n = {
  ariaLabel: 'Minimized items',
  sheetTitle: 'Minimized items',
};
