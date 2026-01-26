/**
 * Modelo para ejemplos de código que se muestran en la documentación
 */
export interface CodeExample {
  /**
   * Título del ejemplo (clave de traducción)
   */
  title: string;

  /**
   * Código fuente del ejemplo
   */
  code: string;

  /**
   * Lenguaje de programación para el syntax highlighting
   */
  language: 'html' | 'typescript' | 'scss' | 'json';

  /**
   * Descripción adicional del ejemplo (opcional)
   */
  description?: string;
}

/**
 * Nota informativa para mostrar en una sección
 */
export interface SectionNote {
  /**
   * Tipo de nota (determina el color y el icono)
   */
  type: 'info' | 'warning' | 'danger' | 'success';

  /**
   * Contenido HTML de la nota (puede incluir markup)
   */
  content: string;

  /**
   * Icono personalizado (opcional, si no se especifica usa el icono por defecto del tipo)
   */
  icon?: string;
}

/**
 * Configuración de una sección de demostración de componente
 */
export interface ComponentSection {
  /**
   * ID único de la sección (usado para switch en template)
   */
  id: string;

  /**
   * Título de la sección (clave de traducción)
   */
  title: string;

  /**
   * Descripción de la sección (clave de traducción)
   */
  description: string;

  /**
   * Anchor para navegación interna (#basico, #variantes, etc.)
   */
  anchor: string;

  /**
   * Ejemplos de código para esta sección
   */
  examples: CodeExample[];

  /**
   * Nota informativa (opcional)
   */
  note?: SectionNote;

  /**
   * Clase CSS adicional para el preview (opcional)
   */
  previewClass?: string;
}

/**
 * Configuración completa de una página de documentación de componente
 */
export interface ComponentPageConfig {
  /**
   * Título principal de la página (clave de traducción)
   */
  title: string;

  /**
   * Subtítulo de la página (clave de traducción)
   */
  subtitle: string;

  /**
   * Secciones de la página
   */
  sections: ComponentSection[];
}
