import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import {
  ButtonComponent,
  SidebarPanelFooterDirective,
  SidebarPanelRef,
  SIDEBAR_PANEL_REF,
} from 'nui';

/**
 * Componente demo que demuestra el uso de la directiva nuiSidebarPanelFooter
 * para registrar un footer personalizado desde el componente hijo.
 */
@Component({
  selector: 'app-footer-directive-panel',
  standalone: true,
  imports: [ButtonComponent, SidebarPanelFooterDirective],
  template: `
    <p style="margin: 0; color: var(--nui-text-secondary)">
      The footer below is defined <strong>inside this component</strong> using the
      <code>nuiSidebarPanelFooter</code> directive—it is automatically registered
      into the panel shell without any configuration in the parent.
    </p>

    <ng-template nuiSidebarPanelFooter>
      <div style="display: flex; gap: 0.5rem; justify-content: flex-end">
        <nui-button color="secondary" variant="outline" (click)="cancel()">Cancel</nui-button>
        <nui-button color="primary" (click)="confirm()">Confirm</nui-button>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterDirectivePanelComponent {
  private readonly _panelRef = inject<SidebarPanelRef>(SIDEBAR_PANEL_REF);

  cancel(): void {
    this._panelRef.close({ confirmed: false });
  }

  confirm(): void {
    this._panelRef.close({ confirmed: true });
  }
}
