import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Componente de layout para páginas de documentación de componentes.
 * Proporciona la estructura base con título y subtítulo.
 * 
 * @example
 * ```html
 * <app-docs-page-layout 
 *   [title]="'components.button.title' | translate"
 *   [subtitle]="'components.button.subtitle' | translate">
 *   <!-- Contenido de la página -->
 * </app-docs-page-layout>
 * ```
 */
@Component({
  selector: 'app-docs-page-layout',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="docs-page">
      <div class="page-header">
        <h1>{{ title() }}</h1>
        <p class="subtitle">{{ subtitle() }}</p>
      </div>
      
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class DocsPageLayoutComponent {
  /**
   * Título principal de la página (ya traducido)
   */
  title = input.required<string>();

  /**
   * Subtítulo de la página (ya traducido)
   */
  subtitle = input.required<string>();
}
