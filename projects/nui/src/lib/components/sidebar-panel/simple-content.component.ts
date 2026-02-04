import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SIDEBAR_PANEL_CONFIG } from './models/sidebar-panel.model';

/**
 * Componente interno para renderizar contenido simple (HTML string o templates)
 * Se usa automáticamente cuando no se proporciona un componente dinámico
 * 
 * Este componente se instancia automáticamente cuando se llama a `open()`
 * con `contentTemplate` o `htmlContent` en lugar de un componente.
 * 
 * @internal
 */
@Component({
  selector: 'nui-simple-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (config.contentTemplate) {
      <!-- Template con contexto -->
      <ng-container 
        *ngTemplateOutlet="config.contentTemplate; context: config.templateContext || {}">
      </ng-container>
    } @else if (config.htmlContent) {
      <!-- HTML string -->
      <div [innerHTML]="config.htmlContent"></div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleContentComponent {
  protected readonly config = inject(SIDEBAR_PANEL_CONFIG);
}
