import { Component, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
      <!-- HTML string sanitizado para preservar estilos inline -->
      <div [innerHTML]="safeHtml()"></div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleContentComponent {
  protected readonly config = inject(SIDEBAR_PANEL_CONFIG);
  private readonly sanitizer = inject(DomSanitizer);

  /**
   * HTML sanitizado como seguro para preservar estilos inline
   * Angular por defecto elimina los atributos style por seguridad,
   * pero en este caso confiamos en el HTML proporcionado por el desarrollador
   */
  protected readonly safeHtml = computed<SafeHtml>(() => {
    const html = this.config.htmlContent || '';
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });
}
