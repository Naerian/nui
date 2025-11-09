import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente para títulos de sección con ancla automática.
 * Permite compartir URLs directas a secciones específicas.
 */
@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-title-wrapper" [id]="anchor">
      <h2 class="section-title">
        {{ title }}
        <a [href]="'#' + anchor" class="section-anchor" [attr.aria-label]="'Enlace a ' + title" (click)="onAnchorClick($event)">
          <i class="ri-link"></i>
        </a>
      </h2>
    </div>
  `,
  styles: [`
    .section-title-wrapper {
      scroll-margin-top: 2rem;
      position: relative;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.75rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
      color: var(--nui-color-text-primary);
      position: relative;
    }

    .section-anchor {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      color: var(--nui-color-text-tertiary);
      text-decoration: none;
      opacity: 0;
      transition: opacity 0.2s ease, color 0.2s ease;
      font-size: 1.25rem;
    }

    .section-title-wrapper:hover .section-anchor,
    .section-anchor:focus {
      opacity: 1;
    }

    .section-anchor:hover {
      color: var(--nui-color-primary);
    }

    .section-anchor:focus {
      outline: 2px solid var(--nui-color-primary);
      outline-offset: 2px;
      border-radius: 0.25rem;
    }
  `]
})
export class SectionTitleComponent {
  /**
   * Título de la sección que se mostrará
   */
  @Input({ required: true }) title!: string;

  /**
   * ID del ancla. Si no se proporciona, se genera automáticamente desde el título
   */
  @Input() anchor?: string;

  ngOnInit() {
    // Si no se proporciona un ancla, generarla desde el título
    if (!this.anchor) {
      this.anchor = this.generateAnchor(this.title);
    }
  }

  ngAfterViewInit() {
    // Comprobar si la URL tiene un hash que coincide con este ancla
    // Esto permite que funcione al recargar la página con F5
    const hash = window.location.hash.substring(1); // Elimina el #
    if (hash === this.anchor) {
      // Usar setTimeout para asegurar que el DOM esté completamente renderizado
      setTimeout(() => {
        const element = document.getElementById(this.anchor!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }

  /**
   * Maneja el click en el ancla para actualizar la URL sin recargar
   */
  onAnchorClick(event: Event) {
    event.preventDefault();
    const currentPath = window.location.pathname;
    const newUrl = `${currentPath}#${this.anchor}`;
    window.history.pushState({}, '', newUrl);
    
    // Scroll suave al elemento
    const element = document.getElementById(this.anchor!);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * Genera un ID válido para el ancla desde el título
   */
  private generateAnchor(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
      .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres especiales
      .trim()
      .replace(/\s+/g, '-'); // Reemplaza espacios por guiones
  }
}
