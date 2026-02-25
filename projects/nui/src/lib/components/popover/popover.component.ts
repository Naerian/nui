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
import {
  PopoverContext,
  POPOVER_DATA,
  POPOVER_CLOSE,
  PopoverPosition,
} from './models/popover.model';
import { popoverAnimation } from './animations/popover.animations';
import { NUIColor, NUIVariant } from '../../configs/common/types';
import { injectPopoverConfig } from '../../configs/popover/popover.config';

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
  templateUrl: './popover.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [popoverAnimation],
})
export class PopoverComponent implements OnInit {
  @ViewChild('dynamicComponent', { read: ViewContainerRef })
  dynamicComponentContainer?: ViewContainerRef;

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
   * Color del popover (usa la paleta de NUI)
   */
  readonly color = input<NUIColor | null | undefined>(null);

  /**
   * Variante  del popover (usa las variantes de NUI)
   */
  readonly variant = input<NUIVariant | null | undefined>(null);

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

  /**
   * Configuración global del popover, inyectada desde un provider a nivel de aplicación.
   * Esta configuración puede ser sobrescrita por las propiedades específicas del componente.
   * Si no se proporciona un valor específico en el componente, se usará el valor de esta configuración global.
   * Si tampoco hay un valor en la configuración global, se usarán los valores por defecto definidos en el componente.
   */
  private readonly popoverConfig = injectPopoverConfig();

  /**
   * Configuración efectiva del popover, combinando la configuración global con las propiedades específicas del componente.
   * El orden de precedencia es: Propiedades del componente > Configuración global > Valores por defecto
   * Esto permite que cada instancia del popover pueda sobrescribir la configuración global si es necesario.
   */
  protected effectiveConfig = computed(() => {
    return {
      ...this.popoverConfig,
      // 3. CORRECCIÓN: Añadidos los () obligatorios para leer el valor de los inputs
      position: this.position() || this.popoverConfig.position,
      showArrow: this.showArrow() ?? this.popoverConfig.showArrow,
      popoverClass: this.popoverClass() || this.popoverConfig.popoverClass,
      maxWidth: this.maxWidth() || this.popoverConfig.maxWidth,
      minWidth: this.minWidth() || this.popoverConfig.minWidth,
    };
  });

  /**
   * Clases CSS dinámicas para el host, basadas en color y variante
   */
  protected readonly mainClasses = computed(() => {
    const classes = [];

    // Clase de color (ej: nui-popover--primary)
    if (this.color()) {
      classes.push(`nui-popover--${this.color()}`);
    }

    // Clase de variante (ej: nui-popover--outline)
    // Solo aplicamos variante si hay color, o si queremos soportar variantes en surface
    if (this.variant()) {
      classes.push(`nui-popover--${this.variant()}`);
    }

    // Si el usuario pasó una clase personalizada, también la incluimos
    if (this.popoverClass()) {
      classes.push(this.popoverClass()!);
    }

    return classes.join(' ');
  });

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

  ngOnDestroy(): void {
    this.destroyed = true;
    if (this.dynamicComponentRef) {
      this.dynamicComponentRef.destroy();
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
          useValue: contextValue?.data,
        },
        {
          provide: POPOVER_CLOSE,
          useValue: contextValue?.close ?? (() => {}),
        },
      ],
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

    this.dynamicComponentRef = this.dynamicComponentContainer.createComponent(componentType, {
      injector: popoverInjector,
    });

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
}
