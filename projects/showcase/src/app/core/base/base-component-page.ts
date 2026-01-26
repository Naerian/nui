import { Directive } from '@angular/core';
import { ComponentPageConfig, ComponentSection, CodeExample } from '../models';

/**
 * Clase base abstracta para páginas de documentación de componentes.
 * Proporciona funcionalidad común y métodos helper para todas las páginas de componentes.
 * 
 * @example
 * ```typescript
 * export class ButtonPageComponent extends BaseComponentPage {
 *   pageConfig = BUTTON_PAGE_CONFIG;
 * }
 * ```
 */
@Directive()
export abstract class BaseComponentPage {
  /**
   * Configuración de la página (debe ser implementada por la clase hija)
   */
  abstract pageConfig: ComponentPageConfig;

  /**
   * Obtiene una sección específica por su ID
   * @param id - ID de la sección a buscar
   * @returns La sección encontrada o undefined
   */
  getSection(id: string): ComponentSection | undefined {
    return this.pageConfig.sections.find(s => s.id === id);
  }

  /**
   * Obtiene los ejemplos de código de una sección específica
   * @param sectionId - ID de la sección
   * @returns Array de ejemplos de código o array vacío
   */
  getSectionExamples(sectionId: string): CodeExample[] {
    return this.getSection(sectionId)?.examples || [];
  }

  /**
   * Función de tracking para *ngFor optimizado por índice
   * @param index - Índice del elemento
   * @returns El índice
   */
  trackByIndex(index: number): number {
    return index;
  }

  /**
   * Función de tracking para *ngFor de secciones
   * @param index - Índice del elemento
   * @param section - Sección actual
   * @returns ID de la sección
   */
  trackBySectionId(index: number, section: ComponentSection): string {
    return section.id;
  }

  /**
   * Función de tracking para *ngFor de ejemplos
   * @param index - Índice del elemento
   * @param example - Ejemplo actual
   * @returns Título del ejemplo
   */
  trackByExampleTitle(index: number, example: CodeExample): string {
    return example.title;
  }
}
