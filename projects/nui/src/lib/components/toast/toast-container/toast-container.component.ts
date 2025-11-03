import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  signal,
  computed,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ToastComponent } from '../toast.component';
import { ToastRef } from '../toast-ref';
import { ToastPosition } from '../models/toast.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'nui-toast-container',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  templateUrl: './toast-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
  },
})
export class ToastContainerComponent implements OnInit, OnDestroy {
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private destroy$ = new Subject<void>();

  // Signal con todos los toasts activos
  readonly toasts = signal<ToastRef[]>([]);

  // Computed para debugging
  readonly toastsCount = computed(() => {
    const count = this.toasts().length;
    return count;
  });

  // Posición del contenedor
  readonly position = signal<ToastPosition>('top-right');

  // Computed para clases del host
  protected readonly hostClasses = computed(() => {
    const classes = `nui-toast-container nui-toast-container--${this.position()}`;
    return classes;
  });

  // Overlay reference
  private overlayRef?: OverlayRef;

  ngOnInit(): void {
    // El overlay se creará cuando se agregue el primer toast
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearAllToasts();
    this.overlayRef?.dispose();
  }

  /**
   * Agrega un nuevo toast al contenedor
   */
  addToast(toastRef: ToastRef): void {
    const currentToasts = this.toasts();
    
    // Agregar según la dirección del stack
    const newToasts = this.shouldPrepend()
      ? [toastRef, ...currentToasts]
      : [...currentToasts, toastRef];

    this.toasts.set(newToasts);

    // Suscribirse al cierre del toast
    toastRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.removeToast(toastRef.id);
      });
  }

  /**
   * Elimina un toast del contenedor
   */
  removeToast(id: string): void {
    const currentToasts = this.toasts();
    const filteredToasts = currentToasts.filter(t => t.id !== id);
    this.toasts.set(filteredToasts);

    // Limpiar si no quedan toasts
    if (filteredToasts.length === 0) {
      this.clearOverlay();
    }
  }

  /**
   * Limpia todos los toasts
   */
  clearAllToasts(): void {
    const currentToasts = this.toasts();
    currentToasts.forEach(toast => toast.close());
    this.toasts.set([]);
    this.clearOverlay();
  }

  /**
   * Actualiza la posición del contenedor
   */
  updatePosition(position: ToastPosition): void {
    this.position.set(position);
  }

  /**
   * Determina si los nuevos toasts deben agregarse al inicio
   */
  private shouldPrepend(): boolean {
    // TODO: Obtener de configuración global
    return false; // Por defecto append
  }

  /**
   * Limpia el overlay si existe
   */
  private clearOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = undefined;
    }
  }

  /**
   * Trackby function para ngFor
   */
  trackByToastId(index: number, toast: ToastRef): string {
    return toast.id;
  }
}
