import { Injectable } from '@angular/core';
import { ViewMode } from '../models/calendar.model';

/**
 * Servicio para manejar la navegación por teclado en el calendario
 * Separa la lógica de navegación del componente principal
 */
@Injectable()
export class CalendarKeyboardNavigationService {
  
  /**
   * Calcula el nuevo índice para navegación en vista de DÍAS
   */
  calculateDayNavigationIndex(
    event: KeyboardEvent,
    currentIndex: number,
    totalDays: number
  ): { newIndex: number; shouldChangeMonth: boolean; direction?: 'prev' | 'next' } {
    let newIndex = currentIndex;
    let shouldChangeMonth = false;
    let direction: 'prev' | 'next' | undefined;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = currentIndex - 1;
        if (newIndex < 0) {
          shouldChangeMonth = true;
          direction = 'prev';
          newIndex = -1; // Se calculará en el componente después de cambiar mes
        }
        break;

      case 'ArrowRight':
        event.preventDefault();
        newIndex = currentIndex + 1;
        if (newIndex >= totalDays) {
          shouldChangeMonth = true;
          direction = 'next';
          newIndex = 0;
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        newIndex = currentIndex - 7;
        if (newIndex < 0) {
          shouldChangeMonth = true;
          direction = 'prev';
          newIndex = totalDays + newIndex; // Se calculará en el componente
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        newIndex = currentIndex + 7;
        if (newIndex >= totalDays) {
          shouldChangeMonth = true;
          direction = 'next';
          newIndex = newIndex - totalDays;
        }
        break;
    }

    return { newIndex, shouldChangeMonth, direction };
  }

  /**
   * Calcula el nuevo índice para navegación en vista de MESES
   */
  calculateMonthNavigationIndex(
    event: KeyboardEvent,
    currentIndex: number
  ): number | null {
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = Math.max(0, currentIndex - 1);
        break;

      case 'ArrowRight':
        event.preventDefault();
        newIndex = Math.min(11, currentIndex + 1);
        break;

      case 'ArrowUp':
        event.preventDefault();
        newIndex = Math.max(0, currentIndex - 3); // 3 columnas
        break;

      case 'ArrowDown':
        event.preventDefault();
        newIndex = Math.min(11, currentIndex + 3); // 3 columnas
        break;

      default:
        return null;
    }

    return newIndex;
  }

  /**
   * Calcula el nuevo índice para navegación en vista de AÑOS
   */
  calculateYearNavigationIndex(
    event: KeyboardEvent,
    currentIndex: number
  ): {
    newIndex: number;
    shouldChangeBlock: boolean;
    direction?: 'prev' | 'next';
  } {
    let newIndex = currentIndex;
    let shouldChangeBlock = false;
    let direction: 'prev' | 'next' | undefined;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex === 0) {
          shouldChangeBlock = true;
          direction = 'prev';
          newIndex = 11; // Último año del bloque anterior
        } else {
          newIndex = currentIndex - 1;
        }
        break;

      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex === 11) {
          shouldChangeBlock = true;
          direction = 'next';
          newIndex = 0; // Primer año del bloque siguiente
        } else {
          newIndex = currentIndex + 1;
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (currentIndex < 3) {
          shouldChangeBlock = true;
          direction = 'prev';
          newIndex = 11; // Último año del bloque anterior
        } else {
          newIndex = currentIndex - 3;
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        if (currentIndex > 8) {
          shouldChangeBlock = true;
          direction = 'next';
          newIndex = 0; // Primer año del bloque siguiente
        } else {
          newIndex = currentIndex + 3;
        }
        break;
    }

    return { newIndex, shouldChangeBlock, direction };
  }

  /**
   * Determina si un evento de teclado debe ser manejado
   */
  shouldHandleKeyEvent(event: KeyboardEvent, target: HTMLElement): boolean {
    // No interceptar si el foco está en elementos de navegación
    // Usar data attributes en lugar de clases CSS para mayor robustez
    if (
      target.hasAttribute('data-calendar-nav') ||
      target.closest('[data-calendar-nav]') ||
      target.closest('nui-button')
    ) {
      return false;
    }

    // Solo manejar teclas de navegación y selección
    const handledKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', ' ', 'Escape'];
    return handledKeys.includes(event.key);
  }

  /**
   * Determina si el evento es una acción de selección (Enter o Espacio)
   */
  isSelectionKey(key: string): boolean {
    return key === 'Enter' || key === ' ';
  }

  /**
   * Determina si el evento es de cancelación (Escape)
   */
  isCancelKey(key: string): boolean {
    return key === 'Escape';
  }
}
