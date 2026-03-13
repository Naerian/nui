import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  inject,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgTemplateOutlet } from '@angular/common';
import { MODAL_DIALOG_CONFIG, ModalDialogConfig } from './models/modal-dialog.model';
import { MODAL_DIALOG_REF } from './services/modal-dialog.service';
import { ModalDialogRef } from './modal-dialog-ref';
import { ModalDialogActionsService } from './services/modal-dialog-actions.service';
import { DEFAULT_SIZE, DEFAULT_VARIANT } from '../../configs';
import { NUISize, NUIVariant } from '../../configs/common/types';
import { NuiI18nService } from '../../i18n';

/**
 * Componente interno que renderiza el **contenido del body** para modales simples
 * (confirm, info, warning, danger, success, verification, loader).
 *
 * Se carga dinámicamente por `ModalDialogService` cuando se abre un modal sin
 * especificar un componente propio. El shell (`ModalDialogComponent`) gestiona
 * header, footer y animaciones; este componente es responsable únicamente del body.
 *
 * **Responsabilidades:**
 * - Spinner de carga (`isLoading`)
 * - Mensaje HTML sanitizado
 * - Campo de verificación con validación reactiva
 * - Registrar botones cancel/confirm en `ModalDialogActionsService`
 * - Gestión del timeout (pausa/reanuda)
 *
 * @internal - No instanciar directamente. Usar `ModalDialogService.open()`.
 */
@Component({
  selector: 'nui-modal-dialog-simple-content',
  standalone: true,
  imports: [CommonModule, FormsModule, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Loading spinner -->
    @if (config.isLoading) {
      <div class="nui-modal-dialog-simple__loading">
        <div class="nui-modal-dialog-simple__loader" aria-hidden="true"></div>
        <p class="nui-modal-dialog-simple__loading-label" role="status">
          {{ loadingLabel }}
        </p>
        @if (config.message) {
          <p class="nui-modal-dialog-simple__loading-message">{{ config.message }}</p>
        }
      </div>
    } @else if (config.bodyTemplate) {
      <!-- Template custom para el body -->
      <div class="nui-modal-dialog-simple__body">
        <ng-container
          *ngTemplateOutlet="config.bodyTemplate; context: config.templateContext ?? {}"
        ></ng-container>
      </div>
    } @else if (config.message) {
      <!-- Mensaje HTML (sanitizado) -->
      <div
        class="nui-modal-dialog-simple__message"
        [innerHTML]="safeMessage()"
      ></div>
    }

    <!-- Campo de verificación -->
    @if (config.verificationText) {
      <div class="nui-modal-dialog-simple__verification">
        <p class="nui-modal-dialog-simple__verification-label">
          {{ verificationLabel }}
        </p>
        <div class="nui-modal-dialog-simple__verification-target">
          <strong>{{ config.verificationText }}</strong>
        </div>
        <input
          class="nui-modal-dialog-simple__verification-input"
          type="text"
          [placeholder]="verificationPlaceholder"
          [attr.autocomplete]="'off'"
          spellcheck="false"
          [attr.aria-label]="verificationLabel"
          [attr.aria-required]="true"
          [attr.aria-invalid]="verificationInput() && !isVerificationValid() ? true : null"
          [value]="verificationInput()"
          (input)="onVerificationInput($event)"
        />
        @if (verificationInput() && !isVerificationValid()) {
          <span class="nui-modal-dialog-simple__verification-error" role="alert">
            {{ verificationErrorMessage }}
          </span>
        }
      </div>
    }
  `,
})
export class ModalDialogSimpleContentComponent implements OnInit, OnDestroy {
  protected readonly config = inject<ModalDialogConfig>(MODAL_DIALOG_CONFIG);
  protected readonly modalRef = inject<ModalDialogRef>(MODAL_DIALOG_REF);
  private readonly actionsService = inject(ModalDialogActionsService, { optional: true });
  private readonly sanitizer = inject(DomSanitizer);
  private readonly _i18nService = inject(NuiI18nService);

  private get _i18n() { return this._i18nService.translations().modalDialog; }

  // ── Verificación (estado local reactivo) ─────────────────────

  protected readonly verificationInput = signal('');

  protected readonly isVerificationValid = computed(() => {
    if (!this.config.verificationText) return true;
    const input = this.config.caseSensitive
      ? this.verificationInput()
      : this.verificationInput().toLowerCase();
    const target = this.config.caseSensitive
      ? this.config.verificationText
      : this.config.verificationText.toLowerCase();
    return input === target;
  });

  // ── Contenido sanitizado ─────────────────────────────────────

  protected readonly safeMessage = computed<SafeHtml>(() => {
    const html = this.config.message ?? '';
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });

  // ── Helpers de configuración (herencia de NUI_CONFIG) ────────

  protected get loadingLabel(): string {
    return (this.config as any).loadingLabel ?? this._i18n.loading;
  }

  protected get verificationLabel(): string {
    return this.config.verificationLabel ?? this._i18n.verificationLabel;
  }

  protected get verificationPlaceholder(): string {
    return this.config.verificationPlaceholder ?? this._i18n.verificationPlaceholder;
  }

  protected get verificationErrorMessage(): string {
    return this.config.verificationErrorMessage ?? this._i18n.verificationErrorMessage;
  }

  private get defaultVariant(): NUIVariant {
    return this.config.buttonsVariant ?? DEFAULT_VARIANT;
  }

  private get defaultSize(): NUISize {
    return this.config.buttonsSize ?? DEFAULT_SIZE;
  }

  // ── Ciclo de vida ─────────────────────────────────────────────

  ngOnInit(): void {
    this._registerFooterActions();
  }

  ngOnDestroy(): void {
    this.actionsService?.clear();
  }

  // ── Handlers ─────────────────────────────────────────────────

  protected onVerificationInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.verificationInput.set(value);
  }

  // ── Acciones ─────────────────────────────────────────────────

  private confirm(): void {
    this.modalRef.close({
      confirmed: true,
      data: this.config.data ?? null,
      reason: 'confirmed',
    });
  }

  private cancel(): void {
    this.modalRef.close({ confirmed: false, data: null, reason: 'cancelled' });
  }

  /**
   * Registra los botones cancel / confirm en `ModalDialogActionsService`.
   * El campo `disabled` es un getter reactivo que lee la señal de validación.
   */
  private _registerFooterActions(): void {
    if (!this.actionsService) return;

    // Si hay customButtons en config, no registrar los por defecto
    if (this.config.customButtons && this.config.customButtons.length > 0) return;

    const actions: any[] = [];
    const isVerificationValid = this.isVerificationValid;

    if (this.config.cancelText) {
      actions.push({
        label: this.config.cancelText,
        color: 'secondary',
        variant: this.defaultVariant,
        size: this.defaultSize,
        handler: () => this.cancel(),
      });
    }

    if (this.config.confirmText) {
      const confirmAction = {
        label: this.config.confirmText,
        color: 'primary',
        variant: this.defaultVariant,
        size: this.defaultSize,
        handler: () => this.confirm(),
        get disabled(): boolean {
          return !isVerificationValid();
        },
      };
      actions.push(confirmAction);
    }

    if (actions.length > 0) {
      this.actionsService.register(actions);
    }
  }
}
