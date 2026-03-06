import { Component, inject, OnInit, signal, effect, computed, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  SIDEBAR_PANEL_REF,
  SIDEBAR_PANEL_DATA,
  SidebarPanelActionsService,
  SidebarPanelRef,
} from 'nui';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

interface UserFormData {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
}

/**
 * Componente de ejemplo que demuestra cómo un hijo puede definir
 * sus propias acciones de footer usando SidebarPanelActionsService
 */
@Component({
  selector: 'app-user-form-example',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="user-form-content">
      <div class="form-header">
        <i class="ri-user-line"></i>
        <p>Complete el formulario para {{ data.id ? 'editar' : 'crear' }} el usuario</p>
      </div>

      @if (form) {
        <form [formGroup]="form" class="user-form">
          <div class="form-group">
            <label for="name">Nombre *</label>
            <input
              id="name"
              type="text"
              formControlName="name"
              placeholder="Ingrese el nombre"
              class="form-control"
            />
            @if (form.get('name')?.invalid && form.get('name')?.touched) {
              <span class="error-message">El nombre es requerido</span>
            }
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              placeholder="correo@ejemplo.com"
              class="form-control"
            />
            @if (form.get('email')?.invalid && form.get('email')?.touched) {
              <span class="error-message">
                {{
                  form.get('email')?.hasError('required')
                    ? 'El email es requerido'
                    : 'Email inválido'
                }}
              </span>
            }
          </div>

          <div class="form-info">
            <i class="ri-information-line"></i>
            <p>Los campos marcados con * son obligatorios</p>
          </div>
        </form>
      }

      @if (isLoading()) {
        <div class="loading-overlay">
          <div class="spinner"></div>
          <p>Guardando usuario...</p>
        </div>
      }

      @if (saveStatus()) {
        <div
          class="save-status"
          [class.success]="saveStatus() === 'success'"
          [class.error]="saveStatus() === 'error'"
        >
          <i
            [class]="
              saveStatus() === 'success' ? 'ri-checkbox-circle-line' : 'ri-error-warning-line'
            "
          ></i>
          <span>
            {{
              saveStatus() === 'success'
                ? '¡Usuario guardado exitosamente!'
                : 'Error al guardar. Intente nuevamente.'
            }}
          </span>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .user-form-content {
        padding: var(--nui-spacing-lg);
        position: relative;
      }

      .form-header {
        display: flex;
        align-items: center;
        gap: var(--nui-spacing-sm);
        margin-bottom: var(--nui-spacing-lg);
        padding: var(--nui-spacing-md);
        background: var(--nui-surface-neutral);
        border-radius: var(--nui-border-radius-md);
        border-left: 3px solid var(--nui-primary);

        i {
          font-size: var(--nui-font-size-2xl);
          color: var(--nui-on-surface-neutral);
        }

        p {
          margin: 0;
          color: var(--nui-on-surface-neutral);
          font-size: var(--nui-font-size-sm);
        }
      }

      .user-form {
        display: flex;
        flex-direction: column;
        gap: var(--nui-spacing-lg);
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: var(--nui-spacing-xs);

        label {
          font-weight: var(--nui-font-weight-medium);
          font-size: var(--nui-font-size-sm);
          color: var(--nui-text-primary);
        }

        .form-control {
          padding: var(--nui-spacing-sm) var(--nui-spacing-md);
          border: 1px solid var(--nui-border-default);
          border-radius: var(--nui-border-radius-md);
          font-size: var(--nui-font-size-base);
          background: var(--nui-surface-base);
          color: var(--nui-text-primary);
          transition: all var(--nui-transition-fast);

          &:focus {
            outline: none;
            border-color: var(--nui-primary);
            box-shadow: 0 0 0 3px var(--nui-primary-alpha-10);
          }

          &:disabled {
            background: var(--nui-surface-disabled);
            cursor: not-allowed;
            opacity: 0.6;
          }
        }

        .error-message {
          font-size: var(--nui-font-size-xs);
          color: var(--nui-danger);
          display: flex;
          align-items: center;
          gap: var(--nui-spacing-2xs);
        }
      }

      .form-info {
        display: flex;
        align-items: center;
        gap: var(--nui-spacing-xs);
        padding: var(--nui-spacing-sm) var(--nui-spacing-md);
        background: var(--nui-info-alpha-10);
        border-radius: var(--nui-border-radius-md);
        margin-top: var(--nui-spacing-md);

        i {
          color: var(--nui-info);
          font-size: var(--nui-font-size-lg);
        }

        p {
          margin: 0;
          font-size: var(--nui-font-size-sm);
          color: var(--nui-text-secondary);
        }
      }

      .loading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--nui-surface-base-alpha-90);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--nui-spacing-md);
        z-index: 10;

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--nui-border-default);
          border-top-color: var(--nui-primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        p {
          color: var(--nui-text-secondary);
          font-size: var(--nui-font-size-sm);
        }
      }

      .save-status {
        display: flex;
        align-items: center;
        gap: var(--nui-spacing-sm);
        padding: var(--nui-spacing-md);
        border-radius: var(--nui-border-radius-md);
        margin-top: var(--nui-spacing-lg);

        &.success {
          background: var(--nui-success-alpha-10);
          color: var(--nui-success);
        }

        &.error {
          background: var(--nui-danger-alpha-10);
          color: var(--nui-danger);
        }

        i {
          font-size: var(--nui-font-size-xl);
        }
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class UserFormExampleComponent implements OnInit {
  private readonly panelRef = inject<SidebarPanelRef>(SIDEBAR_PANEL_REF);
  protected readonly data = inject<UserFormData>(SIDEBAR_PANEL_DATA);
  private readonly actionsService = inject(SidebarPanelActionsService);
  private readonly fb = inject(FormBuilder);

  isLoading = signal(false);
  saveStatus = signal<'success' | 'error' | null>(null);

  protected form = this.fb.group({
    name: [this.data.name || '', Validators.required],
    email: [this.data.email || '', [Validators.required, Validators.email]],
    role: [this.data.role || 'user'],
  });

  // Creamos signals que sigan los cambios del formulario
  // Usamos startWith para tener un valor inicial
  private isInvalid = toSignal(this.form.statusChanges.pipe(map(status => status === 'INVALID')), {
    initialValue: this.form.invalid,
  });

  private isDirty = toSignal(this.form.valueChanges.pipe(map(() => this.form.dirty)), {
    initialValue: this.form.dirty,
  });

  constructor() {
    effect(() => {
      const loading = this.isLoading();
      const invalid = this.isInvalid(); // Solo leemos el valor
      const dirty = this.isDirty(); // Solo leemos el valor

      untracked(() => {
        this.actionsService.update(0, { disabled: loading });

        // Resetear: deshabilitado si NO está sucio o si está cargando
        this.actionsService.update(1, { disabled: !dirty || loading });

        // Guardar: deshabilitado si es inválido o está cargando
        this.actionsService.update(2, {
          disabled: invalid || loading,
          loading: loading,
        });
      });
    });
  }

  ngOnInit(): void {

    // Registrar acciones del footer con estados iniciales correctos
    this.actionsService.register([
      {
        label: 'Cancelar',
        variant: 'ghost',
        color: 'secondary',
        handler: () => this.cancel(),
        disabled: false,
      },
      {
        label: 'Resetear',
        variant: 'outline',
        color: 'secondary',
        prefixIcon: 'ri-restart-line',
        handler: () => this.reset(),
        disabled: this.form.pristine,
      },
      {
        label: this.data.id ? 'Actualizar' : 'Guardar',
        variant: 'solid',
        color: 'primary',
        prefixIcon: 'ri-save-line',
        handler: () => this.save(),
        disabled: this.form.invalid,
        loading: false,
      },
    ]);
  }

  async save(): Promise<void> {
    const form = this.form;
    if (!form || form.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      form?.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.saveStatus.set(null);

    try {
      // Simular llamada al backend
      await this.simulateApiCall(2000);

      const result = {
        ...this.data,
        ...form.value,
      };

      this.saveStatus.set('success');

      // Esperar un momento para mostrar el mensaje de éxito
      setTimeout(() => {
        // Cerrar el panel pasando el resultado al padre
        this.panelRef.close({ saved: true, data: result });
      }, 1000);
    } catch (error) {
      console.error('Error al guardar:', error);
      this.saveStatus.set('error');
      this.isLoading.set(false);
    }
  }

  reset(): void {
    const form = this.form;
    form?.reset({
      name: this.data.name || '',
      email: this.data.email || '',
      role: this.data.role || 'user',
    });
    this.saveStatus.set(null);
  }

  cancel(): void {
    const form = this.form;
    // Verificar si hay cambios sin guardar
    if (form?.dirty) {
      const confirmed = confirm('¿Descartar cambios sin guardar?');
      if (!confirmed) return;
    }

    // Cerrar sin resultado
    this.panelRef.close({ saved: false });
  }

  private simulateApiCall(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
