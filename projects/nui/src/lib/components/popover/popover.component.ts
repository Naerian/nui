import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  TemplateRef,
  Type,
  ViewContainerRef,
  ViewChild,
  OnInit,
  ComponentRef,
  Injector,
  computed,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { PopoverContext, POPOVER_DATA, POPOVER_CLOSE, PopoverPosition } from './models/popover.model';

/**
 * @name
 * nui-popover
 * @description
 * Componente interno que renderiza el contenido del popover.
 * No debe ser usado directamente. Usa la directiva `nuiPopover` en su lugar.
 * 
 * @internal
 */
@Component({
  selector: 'nui-popover',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'nui-popover',
    role: 'dialog',
    '[@fadeIn]': 'true',
    '[attr.data-position]': 'position()',
    '[attr.id]': 'popoverId()',
    '[class]': 'popoverClass()',
    '[style.max-width]': 'maxWidth()',
    '[style.min-width]': 'minWidth()',
  },
  template: `
    @if (showArrow()) {
      <div class="nui-popover__arrow"></div>
    }
    <div class="nui-popover__content">
      @if (isTemplate()) {
        <ng-container *ngTemplateOutlet="$any(content()); context: context()"></ng-container>
      } @else if (isComponent()) {
        <ng-container #dynamicComponent></ng-container>
      } @else {
        <div [innerHTML]="content()"></div>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95) translateY(-4px)' }),
        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
      ]),
      transition(':leave', [
        animate('150ms cubic-bezier(0.4, 0, 1, 1)', style({ opacity: 0, transform: 'scale(0.95) translateY(-4px)' })),
      ]),
    ]),
  ],
})
export class PopoverComponent implements OnInit {
  @ViewChild('dynamicComponent', { read: ViewContainerRef }) dynamicComponentContainer?: ViewContainerRef;

  /**
   * Contenido del popover (string, TemplateRef o Component)
   */
  readonly content = input<string | TemplateRef<PopoverContext> | Type<any>>('');

  /**
   * Posición del popover
   */
  readonly position = model<PopoverPosition>('top');

  /**
   * Mostrar flecha
   */
  readonly showArrow = input(true);

  /**
   * ID único para accesibilidad
   */
  readonly popoverId = input('');

  /**
   * Clase CSS personalizada
   */
  readonly popoverClass = input<string | undefined>(undefined);

  /**
   * Ancho máximo
   */
  readonly maxWidth = input('300px');

  /**
   * Ancho mínimo
   */
  readonly minWidth = input<string | undefined>(undefined);

  /**
   * Contexto para el template
   */
  readonly context = input<PopoverContext | undefined>(undefined);

  /**
   * Injector para componentes dinámicos
   */
  readonly injector = input<Injector | undefined>(undefined);

  /**
   * Indica si el contenido es un template
   */
  readonly isTemplate = computed(() => this.content() instanceof TemplateRef);

  /**
   * Indica si el contenido es un componente
   */
  readonly isComponent = computed(() => typeof this.content() === 'function');

  private dynamicComponentRef?: ComponentRef<any>;
  private destroyed = false;

  ngOnInit(): void {
    // Si es un componente, renderizarlo dinámicamente después de la vista
    if (this.isComponent()) {
      queueMicrotask(() => {
        if (!this.destroyed) {
          this.loadComponent();
        }
      });
    }
  }

  /**
   * Crea un injector hijo con tokens específicos para el popover
   */
  private createPopoverInjector(): Injector {
    const contextValue = this.context();
    return Injector.create({
      parent: this.injector(),
      providers: [
        { 
          provide: POPOVER_DATA, 
          useValue: contextValue?.data 
        },
        { 
          provide: POPOVER_CLOSE, 
          useValue: contextValue?.close ?? (() => {}) 
        }
      ]
    });
  }

  /**
   * Carga un componente dinámicamente
   */
  private loadComponent(): void {
    if (!this.dynamicComponentContainer || !this.isComponent()) return;

    this.dynamicComponentContainer.clear();
    
    const componentType = this.content() as Type<any>;
    const popoverInjector = this.createPopoverInjector();
    
    this.dynamicComponentRef = this.dynamicComponentContainer.createComponent(
      componentType,
      { injector: popoverInjector }
    );

    // Pasar los datos del contexto al componente (backward compatibility)
    // Los componentes pueden usar inyección de tokens O propiedades directas
    const contextValue = this.context();
    if (contextValue) {
      const instance = this.dynamicComponentRef.instance;
      
      // Asignar close directamente (todos los PopoverContentComponent deben tenerlo)
      instance.close = contextValue.close;
      
      // Asignar data directamente (puede o no existir en el componente)
      // La asignación funcionará incluso si la propiedad se declara con `!` o `?`
      instance.data = contextValue.data;
    }
    
    // Detectar cambios
    this.dynamicComponentRef.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.dynamicComponentRef) {
      this.dynamicComponentRef.destroy();
    }
  }
}
