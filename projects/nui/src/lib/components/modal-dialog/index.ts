// ── Componente shell ──────────────────────────────────────────────────────────
export { ModalDialogComponent } from './modal-dialog.component';

// ── Componente de contenido simple ────────────────────────────────────────────
export { ModalDialogSimpleContentComponent } from './modal-dialog-simple-content.component';

// ── Servicio principal  + tokens ──────────────────────────────────────────────
export {
  ModalDialogService,
  MODAL_DIALOG_DATA,
  MODAL_DIALOG_REF,
  SimpleModalDialogConfig,
} from './services/modal-dialog.service';

// ── Referencia al modal ───────────────────────────────────────────────────────
export { ModalDialogRef } from './modal-dialog-ref';

// ── Servicio de acciones del footer ──────────────────────────────────────────
export { ModalDialogActionsService } from './services/modal-dialog-actions.service';

// ── Dock (modal minimizado) ───────────────────────────────────────────────────
export { ModalDialogDockService } from './services/modal-dialog-dock.service';
export { ModalDialogDockComponent } from './dock/modal-dialog-dock.component';

// ── Directiva del footer ──────────────────────────────────────────────────────
export { ModalDialogFooterDirective } from './directives/modal-dialog-footer.directive';

// ── Animaciones ───────────────────────────────────────────────────────────────
export {
  modalDialogAnimation,
  fadeBackdropModalAnimation,
} from './animations/modal-dialog.animations';

// ── Modelos y tokens ──────────────────────────────────────────────────────────
export {
  MODAL_DIALOG_CONFIG,
  MODAL_FOCUS_TRAP_DELAY,
  ModalDialogState,
  ModalDialogType,
  ModalScrollStrategy,
  ModalDialogResult,
  ModalDialogTimeoutOptions,
  ModalDialogGestureOptions,
  ModalDialogStatusBar,
  ModalDialogAction,
  ModalDialogCustomButton,
  ModalDialogStackItem,
  ModalDialogDockItem,
  ModalDialogConfig,
} from './models/modal-dialog.model';

// -- i18n ---------------------------------------------------------------
export { ModalDialogI18n, DEFAULT_MODAL_DIALOG_I18N } from './models/modal-dialog-i18n.model';
