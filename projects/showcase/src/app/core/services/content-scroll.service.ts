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
   * Igual que scrollToAnchor, pero espera a que la posición del elemento se
   * estabilice antes de hacer el scroll final. Útil en carga inicial cuando
   * el contenido dinámico (componentes Angular) aún se está renderizando y
   * puede desplazar el elemento destino hacia abajo.
   *
   * @param anchor      ID del elemento destino
   * @param offset      Píxeles de margen superior
   * @param maxWaitMs   Tiempo máximo de espera (ms) antes de forzar el scroll
   */
  scrollToAnchorWhenStable(anchor: string, offset = 24, maxWaitMs = 1500): void {
    const startTime = Date.now();
    const pollMs = 100;
    let lastRelativeTop: number | null = null;
    let stableRounds = 0;

    const attempt = () => {
      const container = this.scrollContainer;
      const target =
        (document.getElementById(anchor) as HTMLElement | null) ||
        (document.getElementsByName(anchor)[0] as HTMLElement | null);

      if (!target || !container) {
        if (Date.now() - startTime < maxWaitMs) setTimeout(attempt, pollMs);
        return;
      }

      const relativeTop =
        target.getBoundingClientRect().top -
        container.getBoundingClientRect().top +
        container.scrollTop;

      if (relativeTop === lastRelativeTop) {
        stableRounds++;
        // Dos rondas consecutivas con la misma posición → layout estable
        if (stableRounds >= 2) {
          container.scrollTo({ top: Math.max(0, relativeTop - offset), behavior: 'smooth' });
          return;
        }
      } else {
        stableRounds = 0;
      }

      lastRelativeTop = relativeTop;

      if (Date.now() - startTime < maxWaitMs) {
        setTimeout(attempt, pollMs);
      } else {
        // Tiempo agotado: forzar scroll con la posición actual
        container.scrollTo({ top: Math.max(0, relativeTop - offset), behavior: 'smooth' });
      }
    };

    // Primera comprobación tras un frame, cuando el DOM ya existe
    setTimeout(attempt, pollMs);
  }

  /**
   * Hace scroll al top del contenedor.
   */
  scrollToTop(): void {
    this.scrollContainer?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
