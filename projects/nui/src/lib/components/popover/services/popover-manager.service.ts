import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Servicio singleton para gestionar múltiples popovers
 * Permite controlar si se pueden abrir múltiples popovers simultáneamente
 * o si solo uno debe estar abierto a la vez
 */
@Injectable({
  providedIn: 'root'
})
export class PopoverManagerService {
  private activePopovers = new Set<string>();
  private closeAll$ = new Subject<string>(); // El ID del popover que se está abriendo

  /**
   * Observable para que los popovers escuchen cuando deben cerrarse
   */
  get onCloseOthers$() {
    return this.closeAll$.asObservable();
  }

  /**
   * Registra un popover como activo y cierra los demás si es necesario
   * @param id - ID único del popover
   * @param closeOthers - Si true, cierra todos los demás popovers
   */
  register(id: string, closeOthers: boolean = true): void {
    if (closeOthers) {
      this.closeAll$.next(id); // Notifica a todos excepto a este
    }
    this.activePopovers.add(id);
  }

  /**
   * Desregistra un popover cuando se cierra
   * @param id - ID único del popover
   */
  unregister(id: string): void {
    this.activePopovers.delete(id);
  }

  /**
   * Cierra todos los popovers activos
   */
  closeAll(): void {
    this.closeAll$.next(''); // Cerrar todos sin excepción
  }

  /**
   * Obtiene el número de popovers activos
   */
  get activeCount(): number {
    return this.activePopovers.size;
  }

  /**
   * Verifica si un popover específico está activo
   * @param id - ID único del popover
   */
  isActive(id: string): boolean {
    return this.activePopovers.has(id);
  }
}
