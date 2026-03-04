import { Injectable } from '@angular/core';

/**
 * Servicio que mantiene una referencia al contenedor de scroll principal de la app
 * (.showcase-content). Permite que cualquier componente haga scroll interno correcto,
 * ya que window no tiene scroll en este layout (overflow: hidden en .showcase-container).
 */
@Injectable({ providedIn: 'root' })
export class ContentScrollService {
  private scrollContainer: HTMLElement | null = null;

  /**
   * Registra el elemento scrolleable principal. Llamar desde AppComponent.ngAfterViewInit.
   */
  setScrollContainer(el: HTMLElement): void {
    this.scrollContainer = el;
  }

  /**
   * Hace scroll al elemento con el id/name dado dentro del contenedor registrado.
   * @param anchor  ID del elemento destino
   * @param offset  Píxeles de margen superior (por defecto 24px para compensar el padding de la página)
   */
  scrollToAnchor(anchor: string, offset = 24): void {
    const container = this.scrollContainer;
    if (!container) return;

    const target =
      (document.getElementById(anchor) as HTMLElement | null) ||
      (document.getElementsByName(anchor)[0] as HTMLElement | null);

    if (!target) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // Posición del target relativa al top del contenedor + el scroll actual
    const relativeTop = targetRect.top - containerRect.top + container.scrollTop;

    container.scrollTo({
      top: Math.max(0, relativeTop - offset),
      behavior: 'smooth',
    });
  }

  /**
   * Hace scroll al top del contenedor.
   */
  scrollToTop(): void {
    this.scrollContainer?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
