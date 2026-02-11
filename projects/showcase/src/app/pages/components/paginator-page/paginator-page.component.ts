import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorComponent, ButtonGroupComponent, PaginatorLayout } from 'nui';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { SectionTitleComponent } from '../../../shared/components/section-title/section-title.component';
import { ComponentTabsComponent, ComponentTab } from '../../../shared/components/component-tabs';
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
    ComponentTabsComponent,
  ],
  templateUrl: './paginator-page.component.html',
  styleUrls: ['./paginator-page.component.scss'],
})
export class PaginatorPageComponent extends BaseComponentPage {
  override pageConfig = PAGINATOR_PAGE_CONFIG;

  tabs: ComponentTab[] = [
    {
      id: 'examples',
      label: 'common.tabs.examples',
      icon: 'ri-code-s-slash-line',
      sections: ['basic', 'colors', 'sizes', 'layout', 'infinite'],
    },
    {
      id: 'api',
      label: 'common.tabs.api',
      icon: 'ri-braces-line',
      sections: [
        'api-inputs',
        'api-outputs',
        'api-config',
        'api-texts',
        'api-keyboard',
        'api-loading',
        'api-responsive',
        'api-layout',
        'api-icons',
        'api-infinite',
      ],
    },
    {
      id: 'theming',
      label: 'common.tabs.theming',
      icon: 'ri-palette-line',
      sections: [
        'theming-layout',
        'theming-buttons',
        'theming-active',
        'theming-controls',
        'theming-infinite',
        'theming-examples',
      ],
    },
  ];

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
  idealLayout: PaginatorLayout = {
    // Filas superior/inferior limpias para ahorrar altura vertical
    top: [],
    bottom: ['itemRange'],

    // IZQUIERDA: Contexto Informativo
    // El usuario lee de izq a der: Primero ve cuántos datos hay.
    left: [],

    // CENTRO: Navegación Pura
    // Lo más importante en el centro, fácil de alcanzar con el mouse/dedo.
    center: ['firstButton', 'prevButton', 'pageNumbers', 'nextButton', 'lastButton'],

    // DERECHA: Herramientas de Configuración
    // Cambiar tamaño o saltar página son acciones secundarias.
    right: ['pageSize', 'pageJump'],

    // Alineaciones específicas por área (opcional)
    leftConfig: {
      vertical: 'center', // El texto se queda centrado verticalmente bonito
    },

    // La parte inferior se queda centrada tanto vertical como horizontalmente para destacar el rango de items, que es información importante pero no tan interactiva como la navegación central.
    bottomConfig: {
      vertical: 'center', // La paginación se queda centrada verticalmente
      horizontal: 'center', // La paginación se queda centrada horizontalmente
    },

    // El centro se queda con la alineación por defecto (center), que es ideal para la navegación
    centerConfig: {
      vertical: 'center', // Los botones se quedan centrados
    },

    // La derecha se pega al techo (start) para diferenciarse del centro, y se alinea a la derecha (end)
    rightConfig: {
      vertical: 'start', // <--- ¡AQUI! La derecha se pega al techo
      horizontal: 'end', // Y se alinea a la derecha
    },
    // Ajustes
    direction: 'column',
    gap: '1rem',
  };

  // Layout optimizado para móvil: Evita desbordamiento reorganizando elementos verticalmente
  idealMobileLayout: PaginatorLayout = {
    // TOP: Información contextual (cuántos items hay)
    top: ['itemRange'],

    // CENTER: Solo navegación esencial (botones más compactos)
    center: ['prevButton', 'currentPage', 'nextButton'],

    // BOTTOM: Controles de configuración apilados
    bottom: ['pageSize', 'pageJump'],

    // Configuración de áreas
    topConfig: {
      horizontal: 'center',
      vertical: 'center',
    },
    centerConfig: {
      horizontal: 'center',
      vertical: 'center',
    },
    bottomConfig: {
      horizontal: 'center',
      vertical: 'center',
    },

    // Layout vertical para apilar elementos
    direction: 'column',
    gap: '0.75rem',
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
