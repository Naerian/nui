import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CodeBlockComponent } from '../../code-block/code-block.component';
import { SectionTitleComponent } from '../section-title/section-title.component';
import { CodeExample, SectionNote } from '../../../core/models';

/**
 * Componente para renderizar una sección de demostración de componente.
 * Incluye título, descripción, nota opcional, área de preview y ejemplos de código.
 * 
 * @example
 * ```html
 * <app-component-demo-section
 *   [title]="'components.button.basic.title' | translate"
 *   [description]="'components.button.basic.description' | translate"
 *   [anchor]="'basico'"
 *   [examples]="basicExamples"
 *   [previewClass]="'flex-column gap-4'">
 *   
 *   <nui-button>Click me</nui-button>
 * </app-component-demo-section>
 * ```
 */
@Component({
  selector: 'app-component-demo-section',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    CodeBlockComponent,
    SectionTitleComponent
  ],
  template: `
    <section class="section">
      <app-section-title 
        [title]="title()" 
        [anchor]="anchor()">
      </app-section-title>
      
      @if (description()) {
        <p class="section-description">{{ description() }}</p>
      }
      
      @if (note()) {
        <div class="section-note" [ngClass]="noteClass()">
          <i [class]="noteIcon()"></i>
          <p [innerHTML]="note()!.content"></p>
        </div>
      }
      
      <div class="example-preview" [ngClass]="previewClass()">
        <ng-content></ng-content>
      </div>
      
      @if (examples() && examples().length > 0) {
        <app-code-block [examples]="examples()"></app-code-block>
      }
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ComponentDemoSectionComponent {
  /**
   * Título de la sección (ya traducido)
   */
  title = input.required<string>();

  /**
   * Descripción de la sección (ya traducido, opcional)
   */
  description = input<string>('');

  /**
   * Anchor para navegación interna
   */
  anchor = input.required<string>();

  /**
   * Ejemplos de código para mostrar
   */
  examples = input<CodeExample[]>([]);

  /**
   * Nota informativa (opcional)
   */
  note = input<SectionNote | undefined>(undefined);

  /**
   * Clases CSS adicionales para el área de preview
   */
  previewClass = input<string>('');

  /**
   * Computed: Clase CSS para la nota según su tipo
   */
  noteClass = computed(() => {
    const noteValue = this.note();
    return noteValue ? `section-note--${noteValue.type}` : '';
  });

  /**
   * Computed: Icono para la nota según su tipo
   */
  noteIcon = computed(() => {
    const noteValue = this.note();
    if (!noteValue) return '';

    // Si hay icono personalizado, usarlo
    if (noteValue.icon) return noteValue.icon;

    // Iconos por defecto según el tipo
    const defaultIcons: Record<string, string> = {
      info: 'ri-information-line',
      warning: 'ri-error-warning-line',
      danger: 'ri-alert-line',
      success: 'ri-checkbox-circle-line'
    };

    return defaultIcons[noteValue.type] || 'ri-information-line';
  });
}
