import {
  Component,
  ChangeDetectionStrategy,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { ModalDialogDockService } from '../services/modal-dialog-dock.service';
import { ModalDialogDockItem } from '../models/modal-dialog.model';

/**
 * Componente global que renderiza el **dock inferior** con los modales minimizados.
 *
 * Se crea dinámicamente por `ModalDialogDockService` al minimizar el primer
 * modal. Se elimina automáticamente cuando no hay más modales minimizados.
 *
 * El dock se posiciona en la parte inferior centrada de la pantalla,
 * mostrando un chip por cada modal minimizado. Al hacer click en un chip,
 * se restaura el modal correspondiente.
 *
 * @internal - No instanciar directamente.
 */
@Component({
  selector: 'nui-modal-dialog-dock',
  standalone: true,
  templateUrl: './modal-dialog-dock.component.html',
  styleUrls: ['./modal-dialog-dock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ModalDialogDockComponent {
  private readonly dockService = inject(ModalDialogDockService);

  protected readonly dockItems = this.dockService.items;

  protected restore(item: ModalDialogDockItem): void {
    this.dockService.restoreItem(item.id);
  }

  protected trackById(_: number, item: ModalDialogDockItem): string {
    return item.id;
  }
}
