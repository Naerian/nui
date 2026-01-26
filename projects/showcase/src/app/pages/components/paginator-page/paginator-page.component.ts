import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorComponent, ButtonGroupComponent, PaginatorLayout } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { BaseComponentPage } from '../../../core/base/base-component-page';
import { PAGINATOR_PAGE_CONFIG } from './paginator-page.config';

@Component({
  selector: 'app-paginator-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    PaginatorComponent,
    CodeBlockComponent,
    SectionTitleComponent,
  ],
  templateUrl: './paginator-page.component.html',
  styleUrls: ['./paginator-page.component.scss'],
})
export class PaginatorPageComponent extends BaseComponentPage {
  pageConfig = PAGINATOR_PAGE_CONFIG;

  // ==========================================
  // ESTADO DE EJEMPLOS
  // ==========================================

  // Básico
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = 150; // 15 páginas

  // Custom Layout
  customLayoutPage = signal(1);

  // Infinite Scroll
  infiniteItems = signal<string[]>(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));
  infiniteLoading = signal(false);

  // ==========================================
  // CONFIGURACIONES DE DEMO
  // ==========================================

  // Layout complejo: Paginación arriba y abajo, selector de tamaño a la izquierda
  complexLayout: PaginatorLayout = {
    top: ['itemRange'],
    left: ['pageSize'],
    center: ['firstButton', 'prevButton', 'pageNumbers', 'nextButton', 'lastButton'],
    right: ['pageJump'],
    bottom: ['itemRange'], // Repetimos info abajo
    direction: 'column',
    gap: '1rem',
  };

  // ==========================================
  // MÉTODOS
  // ==========================================

  onPageChange(page: number) {
    this.currentPage.set(page);
    console.log('Página cambiada a:', page);
  }

  onPageSizeChange(size: number) {
    this.pageSize.set(size);
    // Resetear a página 1 al cambiar tamaño para evitar estar fuera de rango
    this.currentPage.set(1);
  }

  // Simulación de Carga Infinita
  async loadMoreData() {
    this.infiniteLoading.set(true);

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1500));

    const currentLength = this.infiniteItems().length;
    
    // Si ya llegamos a 100, no cargamos más (para simular el fin)
    if (currentLength >= 100) {
      this.infiniteLoading.set(false);
      return;
    }

    const newItems = Array.from({ length: 20 }, (_, i) => `Item ${currentLength + i + 1}`);

    this.infiniteItems.update(items => [...items, ...newItems]);
    this.infiniteLoading.set(false);
  }
}
