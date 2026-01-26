import {
  Component,
  input,
  output,
  HostListener,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  signal,
  computed,
  ViewEncapsulation,
  SecurityContext,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastRef } from './toast-ref';
import { ToastAction } from './models/toast.model';
import { TOAST_ANIMATIONS } from './animations/toast.animations';
import { NUIColor, NUIVariant } from '../../configs';
import { NUI_TRANSLATIONS } from '../../translations/translations.token';
import { ButtonDirective } from '../button/button.directive';

@Component({
  selector: 'nui-toast',
  standalone: true,
  imports: [CommonModule, ButtonDirective],
  templateUrl: './toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: TOAST_ANIMATIONS,
  host: {
    class: 'nui-toast',
    '[class]': 'hostClasses()',
    '[@toastAnimation]': 'animationState()',
    '[@.disabled]': '!config().animationDuration',
  },
})
export class ToastComponent implements OnInit, OnDestroy {
  /**
   * Referencia al ToastRef que contiene la configuración y estado del toast
   */
  readonly toastRef = input.required<ToastRef>();
  
  /**
   * Evento emitido cuando el toast se cierra
   */
  readonly closed = output<void>();
  
  /**
   * Evento emitido cuando se hace click en una acción del toast
   */
  readonly actionClicked = output<ToastAction>();

  // Señales para estado reactivo
  protected readonly isExpanded = signal(false);
  protected readonly swipeDistance = signal(0);

  // Computed values
  protected readonly config = computed(() => this.toastRef().config());
  protected readonly state = computed(() => this.toastRef().state());
  protected readonly timeRemaining = computed(() =>
    this.toastRef().timeRemaining(),
  );
  protected readonly isPaused = computed(() => this.toastRef().isPaused());

  // Computed: Determina si se debe mostrar el contenido estándar
  protected readonly showStandardContent = computed(() => {
    const config = this.config();

    // Si no hay template, siempre mostrar contenido estándar
    if (!config.template) {
      return true;
    }

    // Si hay template, depende del templateMode
    return config.templateMode === 'append';
  });

  // Computed: Determina si debe mostrar el icono
  protected readonly shouldShowIcon = computed(() => {
    return this.showStandardContent() && this.iconClass();
  });

  // Computed: Determina si debe mostrar el título
  protected readonly shouldShowTitle = computed(() => {
    return this.showStandardContent() && this.config().title;
  });

  // Computed: Determina si debe mostrar el mensaje
  protected readonly shouldShowMessage = computed(() => {
    return this.showStandardContent() && this.config().message;
  });

  // Computed: Determina si debe mostrar HTML sanitizado
  protected readonly shouldShowHtml = computed(() => {
    return this.showStandardContent() && this.safeHtml();
  });

  protected readonly animationState = computed(() => {
    const state = this.state();
    return {
      value: state,
      params: {
        animationDuration: this.config().animationDuration || 300,
      },
    };
  });

  protected readonly hostClasses = computed(() => {
    const classes: string[] = ['nui-toast'];
    const config = this.config();

    // Tipo de toast
    if (config.type) {
      classes.push(`nui-toast--${config.type}`);
    }

    // Clase si tiene título (para ajustar padding)
    if (config.title) {
      classes.push('nui-toast--has-title');
    }

    // Posición del icono
    if (config.iconPosition) {
      classes.push(`nui-toast--icon-${config.iconPosition}`);
    }

    // Estado expandido
    if (this.isExpanded()) {
      classes.push('nui-toast--expanded');
    }

    // Animaciones de entrada y salida
    if (config.animationIn) {
      classes.push(`nui-toast--anim-in-${config.animationIn}`);
    }
    if (config.animationOut) {
      classes.push(`nui-toast--anim-out-${config.animationOut}`);
    }

    // Clases personalizadas
    if (config.toastClass) {
      if (Array.isArray(config.toastClass)) {
        classes.push(...config.toastClass);
      } else {
        classes.push(config.toastClass);
      }
    }

    // Clases si tiene acciones
    if (this.hasActions()) {
      classes.push('nui-toast--has-actions');
    }

    return classes.join(' ');
  });

  protected readonly progressBarStyle = computed(() => {
    const timeout = this.config().timeout || 0;
    const remaining = this.timeRemaining();

    if (timeout === 0) {
      return { width: '0%' };
    }

    const percentage = (remaining / timeout) * 100;

    // Sin transición CSS - el cambio es instantáneo
    // La animación suave viene de las actualizaciones frecuentes del signal
    return {
      width: `${percentage}%`,
    };
  });

  protected readonly iconClass = computed(() => {
    const config = this.config();

    if (config.icon === false) {
      return null;
    }

    if (typeof config.icon === 'string') {
      return config.icon;
    }

    // Iconos por defecto según tipo
    const defaultIcons: Record<string, string> = {
      success: 'ri-checkbox-circle-line',
      danger: 'ri-error-warning-line',
      warning: 'ri-alert-line',
      info: 'ri-information-line',
      primary: 'ri-information-line',
      secondary: 'ri-information-line',
      accent: 'ri-information-line',
    };

    return config.type
      ? defaultIcons[config.type] || 'ri-information-line'
      : 'ri-information-line';
  });

  protected readonly safeHtml = computed((): SafeHtml | null => {
    const html = this.config().html;
    return html
      ? (this.sanitizer.sanitize(SecurityContext.HTML, html) as SafeHtml)
      : null;
  });

  // Computed para botones de acción
  protected readonly buttonColor = computed((): NUIColor => {
    const config = this.config();
    return (config.buttonsColor || config.type || 'primary') as NUIColor;
  });

  protected readonly buttonVariant = computed((): NUIVariant => {
    const config = this.config();
    const variant = config.buttonsVariant || 'ghost';
    return (variant as NUIVariant);
  });

  // Swipe handling
  private touchStartX = 0;
  private touchStartY = 0;
  protected isSwiping = false;

  protected readonly translation = inject(NUI_TRANSLATIONS);

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Marcar como mostrado después de la animación de entrada
    const duration = this.config().animationDuration || 300;
    setTimeout(() => {
      this.toastRef().markAsShown();
    }, duration);

    // Suscribirse al cierre
    this.toastRef().afterClosed().subscribe(() => {
      this.closed.emit();
    });
  }

  ngOnDestroy(): void {
    this.toastRef().dispose();
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.config().pauseOnHover) {
      this.toastRef().pause();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.config().pauseOnHover) {
      this.toastRef().resume();
    }
  }

  @HostListener('click')
  onClick(): void {
    const config = this.config();

    if (config.onClick) {
      config.onClick();
    }

    if (config.closeOnTouch) {
      this.close();
    }
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    if (!this.config().swipeToDismiss) {
      return;
    }

    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
    this.isSwiping = false;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.config().swipeToDismiss) {
      return;
    }

    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    const deltaX = touchX - this.touchStartX;
    const deltaY = touchY - this.touchStartY;

    // Detectar si es un swipe horizontal
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      this.isSwiping = true;
      this.swipeDistance.set(deltaX);
      event.preventDefault();
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    if (!this.config().swipeToDismiss || !this.isSwiping) {
      return;
    }

    const threshold = this.config().swipeThreshold || 100;

    if (Math.abs(this.swipeDistance()) > threshold) {
      // ✨ Añadir feedback háptico en dispositivos móviles
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      this.close();
    } else {
      this.swipeDistance.set(0);
    }

    this.isSwiping = false;
  }

  close(): void {
    this.toastRef().close();
  }

  onActionClick(action: ToastAction, event: Event): void {
    event.stopPropagation();

    const result = action.onClick();

    if (result instanceof Promise) {
      result.then(() => {
        if (action.closeOnClick !== false) {
          this.close();
        }
      });
    } else {
      if (action.closeOnClick !== false) {
        this.close();
      }
    }

    this.actionClicked.emit(action);
  }

  toggleExpanded(): void {
    if (this.config().expandable) {
      this.isExpanded.set(!this.isExpanded());
    }
  }

  protected hasActions(): boolean {
    const config = this.config();
    return !!(config.action || (config.actions && config.actions.length > 0));
  }

  protected isExpandedContentString(): boolean {
    return typeof this.config().expandedContent === 'string';
  }
}
