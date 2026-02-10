import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, SIDEBAR_PANEL_DATA, SIDEBAR_PANEL_REF } from 'nui';

/**
 * Datos de ejemplo para el componente con eventos
 */
export interface SidebarPanelEventExampleData {
  initialValue?: string;
  message?: string;
}

/**
 * Resultado que se devuelve al cerrar el panel
 */
export interface SidebarPanelEventExampleResult {
  action: 'saved' | 'cancelled' | 'deleted';
  data?: any;
  timestamp: Date;
}

/**
 * Componente de ejemplo que emite eventos Output
 * Demuestra la comunicación entre el componente dinámico y el exterior
 */
@Component({
  selector: 'app-sidebar-panel-event-example',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="event-example">
      <div class="event-example__header">
        <h3>Componente con Eventos Output</h3>
        <p>Este componente demuestra cómo emitir y capturar eventos desde dentro del panel.</p>
      </div>

      <div class="event-example__content">
        <div class="info-card">
          <i class="ri-information-line"></i>
          <div>
            <strong>¿Cómo funciona?</strong>
            <p>
              Los eventos
              <code>&#64;Output()</code>
              del componente dinámico pueden ser capturados directamente a través de
              <code>panelRef.componentInstance</code>
              después de abrir el panel.
            </p>
          </div>
        </div>

        <div class="event-log">
          <h4>Log de Eventos Emitidos ({{ eventLog().length }})</h4>
          <div class="event-log__items">
            @for (event of eventLog(); track $index) {
              <div class="event-log__item">
                <span class="event-type">{{ event.type }}</span>
                <span class="event-time">{{ event.time }}</span>
                <span class="event-data">{{ event.data | json }}</span>
              </div>
            } @empty {
              <p class="empty-message">
                <i class="ri-inbox-line"></i>
                No se han emitido eventos aún
              </p>
            }
          </div>
        </div>

        <div class="actions">
          <h4>Acciones que emiten eventos</h4>

          <div class="button-group">
            <nui-button
              [color]="'primary'"
              [icon]="'ri-pencil-line'"
              [iconPosition]="'start'"
              (click)="emitDataChanged()"
            >
              Emitir dataChanged
            </nui-button>

            <nui-button
              [color]="'secondary'"
              [icon]="'ri-checkbox-circle-line'"
              [iconPosition]="'start'"
              (click)="emitStatusChanged()"
            >
              Emitir statusChanged
            </nui-button>

            <nui-button
              [color]="'accent'"
              [icon]="'ri-notification-line'"
              [iconPosition]="'start'"
              (click)="emitCustomEvent()"
            >
              Emitir customEvent
            </nui-button>
          </div>
        </div>

        <div class="close-actions">
          <h4>Cerrar con resultado</h4>
          <div class="button-group">
            <nui-button
              [color]="'success'"
              [icon]="'ri-save-line'"
              [iconPosition]="'start'"
              (click)="closeWithSave()"
            >
              Guardar y Cerrar
            </nui-button>

            <nui-button
              [color]="'danger'"
              [icon]="'ri-delete-bin-line'"
              [iconPosition]="'start'"
              (click)="closeWithDelete()"
            >
              Eliminar y Cerrar
            </nui-button>

            <nui-button
              [variant]="'outline'"
              [icon]="'ri-close-line'"
              [iconPosition]="'start'"
              (click)="closeWithCancel()"
            >
              Cancelar
            </nui-button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .event-example {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        height: 100%;

        &__header {
          h3 {
            margin: 0 0 0.5rem;
            color: var(--nui-color-on-surface);
          }

          p {
            margin: 0;
            color: var(--nui-color-on-surface-variant);
            font-size: 0.875rem;
          }
        }

        &__content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          flex: 1;
          overflow-y: auto;
        }
      }

      .info-card {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        background: var(--nui-bg-tertiary);
        border-radius: 0.5rem;
        border-left: 3px solid var(--nui-primary);

        i {
          font-size: 1.5rem;
          color: var(--nui-primary);
          flex-shrink: 0;
        }

        strong {
          display: block;
          margin-bottom: 0.25rem;
          color: inherit;
        }

        p {
          margin: 0;
          font-size: 0.875rem;
          line-height: 1.5;

          code {
            background: rgba(0, 0, 0, 0.1);
            padding: 0.125rem 0.375rem;
            border-radius: 0.25rem;
            font-family: monospace;
            font-size: 0.8125rem;
          }
        }
      }

      .event-log {
        background: var(--surface-secondary);
        border-radius: 0.5rem;
        padding: 1rem;

        h4 {
          margin: 0 0 0.75rem;
          font-size: 0.875rem;
          font-weight: 600;
        }

        &__items {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          max-height: 200px;
          overflow-y: auto;
        }

        &__item {
          display: grid;
          grid-template-columns: auto auto 1fr;
          gap: 0.75rem;
          background: var(--surface-primary);
          border-radius: 0.25rem;
          font-size: 0.8125rem;
          align-items: center;

          .event-type {
            padding: 0.25rem 0.5rem;
            background: var(--primary-color);
            color: white;
            border-radius: 0.25rem;
            font-weight: 600;
            font-size: 0.75rem;
          }

          .event-time {
            color: var(--text-secondary);
            font-family: monospace;
          }

          .event-data {
            font-family: monospace;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .empty-message {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 2rem;
          color: var(--text-secondary);
        }
      }

      .actions,
      .close-actions {
        h4 {
          margin: 0 0 0.75rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--nui-color-on-surface);
        }
      }

      .button-group {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }
    `,
  ],
})
export class SidebarPanelEventExampleComponent {
  private readonly data = inject<SidebarPanelEventExampleData>(SIDEBAR_PANEL_DATA);
  private readonly panelRef = inject(SIDEBAR_PANEL_REF);

  /**
   * Eventos Output que pueden ser capturados desde fuera
   */
  @Output() dataChanged = new EventEmitter<{ value: string; timestamp: Date }>();
  @Output() statusChanged = new EventEmitter<{ status: string; message: string }>();
  @Output() customEvent = new EventEmitter<any>();
  @Output() beforeClose = new EventEmitter<SidebarPanelEventExampleResult>();

  /**
   * Log de eventos emitidos (solo para demostración)
   * Usa Signal para reactividad automática
   */
  eventLog = signal<Array<{ type: string; time: string; data: any }>>([]);

  /**
   * Emite un evento dataChanged
   */
  emitDataChanged(): void {
    const eventData = {
      value: `Data updated at ${new Date().toLocaleTimeString()}`,
      timestamp: new Date(),
    };

    this.dataChanged.emit(eventData);
    this.addToLog('dataChanged', eventData);
  }

  /**
   * Emite un evento statusChanged
   */
  emitStatusChanged(): void {
    const statuses = ['active', 'inactive', 'pending', 'completed'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const eventData = {
      status,
      message: `Status changed to ${status}`,
    };

    this.statusChanged.emit(eventData);
    this.addToLog('statusChanged', eventData);
  }

  /**
   * Emite un evento custom
   */
  emitCustomEvent(): void {
    const eventData = {
      type: 'custom',
      action: 'button_clicked',
      metadata: {
        clickCount: this.eventLog().filter(e => e.type === 'customEvent').length + 1,
        timestamp: new Date(),
      },
    };

    this.customEvent.emit(eventData);
    this.addToLog('customEvent', eventData);
  }

  /**
   * Cierra el panel guardando
   */
  closeWithSave(): void {
    const result: SidebarPanelEventExampleResult = {
      action: 'saved',
      data: { message: 'Data saved successfully', count: this.eventLog().length },
      timestamp: new Date(),
    };

    this.beforeClose.emit(result);
    this.addToLog('beforeClose', result);

    // Pequeño delay para que se vea el evento en el log
    setTimeout(() => {
      this.panelRef.close(result);
    }, 300);
  }

  /**
   * Cierra el panel eliminando
   */
  closeWithDelete(): void {
    const result: SidebarPanelEventExampleResult = {
      action: 'deleted',
      data: { message: 'Data deleted' },
      timestamp: new Date(),
    };

    this.beforeClose.emit(result);
    this.addToLog('beforeClose', result);

    setTimeout(() => {
      this.panelRef.close(result);
    }, 300);
  }

  /**
   * Cierra el panel cancelando
   */
  closeWithCancel(): void {
    const result: SidebarPanelEventExampleResult = {
      action: 'cancelled',
      timestamp: new Date(),
    };

    this.beforeClose.emit(result);
    this.addToLog('beforeClose', result);

    setTimeout(() => {
      this.panelRef.close(result);
    }, 300);
  }

  /**
   * Agrega un evento al log usando Signal.update()
   * Marca para check debido a que el componente está en contexto dinámico
   */
  private addToLog(type: string, data: any): void {
    this.eventLog.update(currentLog => {
      const newLog = [
        {
          type,
          time: new Date().toLocaleTimeString(),
          data,
        },
        ...currentLog,
      ];

      // Mantener solo los últimos 10 eventos
      return newLog.slice(0, 10);
    });
  }
}
