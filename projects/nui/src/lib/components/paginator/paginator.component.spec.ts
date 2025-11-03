import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './paginator.component';
import { 
  PageChangeEvent,
  PageSizeChangeEvent
} from './models/paginator.model';
import { 
  PaginatorConfig
} from '@shared/configs/nui.model';
import { provideNUITranslations } from '@shared/translations/translations.token';
import { provideNUIConfig } from '@shared/configs/nui.config';

// Componente de test para probar integración
@Component({
  template: `
    <nui-paginator
      [currentPage]="currentPage"
      [totalPages]="totalPages"
      [totalItems]="totalItems"
      [itemsPerPage]="itemsPerPage"
      [color]="color"
      [size]="size"
      [variant]="variant"
      [showFirstLast]="showFirstLast"
      [showPageJump]="showPageJump"
      [showItemRange]="showItemRange"
      [showPageSizeSelector]="showPageSizeSelector"
      [maxVisiblePages]="maxVisiblePages"
      [disabled]="disabled"
      [config]="config"
      (pageChange)="onPageChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
      (pageChangeAdvanced)="onPageChangeAdvanced($event)"
      (pageSizeChangeAdvanced)="onPageSizeChangeAdvanced($event)"
    ></nui-paginator>
  `
})
class TestHostComponent {
  currentPage = 1;
  totalPages = 10;
  totalItems = 100;
  itemsPerPage = 10;
  color = 'primary';
  size = 'md';
  variant = 'solid';
  showFirstLast = true;
  showPageJump = false;
  showItemRange = true;
  showPageSizeSelector = false;
  maxVisiblePages = 7;
  disabled = false;
  config?: PaginatorConfig;

  onPageChange = jasmine.createSpy('onPageChange');
  onPageSizeChange = jasmine.createSpy('onPageSizeChange');
  onPageChangeAdvanced = jasmine.createSpy('onPageChangeAdvanced');
  onPageSizeChangeAdvanced = jasmine.createSpy('onPageSizeChangeAdvanced');
}

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PaginatorComponent,
        FormsModule
      ],
      declarations: [TestHostComponent],
      providers: [
        provideNUITranslations({}),
        provideNUIConfig({})
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      fixture.detectChanges();
      expect(component.currentPage).toBe(1);
      expect(component.totalPages).toBe(1);
      expect(component.variant).toBe('solid');
      expect(component.disabled).toBe(false);
      expect(component.maxVisiblePages).toBe(7);
      expect(component.showFirstLast).toBe(true);
    });
  });

  describe('Input Validation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should handle null currentPage gracefully', () => {
      spyOn(console, 'warn');
      component.currentPage = null as any;
      expect(console.warn).toHaveBeenCalledWith(
        'PaginatorComponent: currentPage debe ser un número válido', 
        null
      );
      expect(component.currentPage).toBe(1); // Should remain unchanged
    });

    it('should handle NaN currentPage gracefully', () => {
      spyOn(console, 'warn');
      component.currentPage = NaN;
      expect(console.warn).toHaveBeenCalled();
      expect(component.currentPage).toBe(1);
    });

    it('should clamp currentPage to valid range', () => {
      component.totalPages = 5;
      component.currentPage = 0;
      expect(component.currentPage).toBe(1);
      
      component.currentPage = 10;
      expect(component.currentPage).toBe(5);
    });

    it('should handle null totalPages gracefully', () => {
      spyOn(console, 'warn');
      component.totalPages = null as any;
      expect(console.warn).toHaveBeenCalledWith(
        'PaginatorComponent: totalPages debe ser un número válido', 
        null
      );
    });

    it('should enforce minimum totalPages of 1', () => {
      component.totalPages = 0;
      expect(component.totalPages).toBe(1);
      
      component.totalPages = -5;
      expect(component.totalPages).toBe(1);
    });
  });

  describe('Navigation', () => {
    beforeEach(() => {
      component.totalPages = 5;
      fixture.detectChanges();
    });

    it('should navigate to next page', () => {
      component.currentPage = 1;
      component.goToNextPage();
      expect(component.currentPage).toBe(2);
    });

    it('should navigate to previous page', () => {
      component.currentPage = 3;
      component.goToPreviousPage();
      expect(component.currentPage).toBe(2);
    });

    it('should navigate to first page', () => {
      component.currentPage = 3;
      component.goToFirstPage();
      expect(component.currentPage).toBe(1);
    });

    it('should navigate to last page', () => {
      component.currentPage = 2;
      component.goToLastPage();
      expect(component.currentPage).toBe(5);
    });

    it('should not navigate below first page', () => {
      component.currentPage = 1;
      component.goToPreviousPage();
      expect(component.currentPage).toBe(1);
    });

    it('should not navigate beyond last page', () => {
      component.currentPage = 5;
      component.goToNextPage();
      expect(component.currentPage).toBe(5);
    });

    it('should handle disabled navigation', () => {
      component.disabled = true;
      component.currentPage = 2;
      component.goToNextPage();
      expect(component.currentPage).toBe(2); // Should not change
    });
  });

  describe('Events', () => {
    beforeEach(() => {
      component.totalPages = 5;
      fixture.detectChanges();
    });

    it('should emit pageChange event', () => {
      spyOn(component.pageChange, 'emit');
      component.currentPage = 1;
      component.goToPage(3);
      expect(component.pageChange.emit).toHaveBeenCalledWith(3);
    });

    it('should emit pageChangeAdvanced event with detailed info', () => {
      spyOn(component.pageChangeAdvanced, 'emit');
      component.currentPage = 1;
      component.itemsPerPage = 10;
      
      component.goToPage(3);
      
      expect(component.pageChangeAdvanced.emit).toHaveBeenCalledWith({
        page: 3,
        previousPage: 1,
        itemsPerPage: 10,
        totalPages: 5
      });
    });

    it('should not emit events when page does not change', () => {
      spyOn(component.pageChange, 'emit');
      spyOn(component.pageChangeAdvanced, 'emit');
      
      component.currentPage = 3;
      component.goToPage(3); // Same page
      
      expect(component.pageChange.emit).not.toHaveBeenCalled();
      expect(component.pageChangeAdvanced.emit).not.toHaveBeenCalled();
    });
  });

  describe('Page Size Change', () => {
    beforeEach(() => {
      component.totalItems = 100;
      component.totalPages = 10;
      fixture.detectChanges();
    });

    it('should update items per page', () => {
      component.onPageSizeChange('25');
      expect(component.itemsPerPage).toBe(25);
    });

    it('should emit pageSizeChange event', () => {
      spyOn(component.pageSizeChange, 'emit');
      component.onPageSizeChange('25');
      expect(component.pageSizeChange.emit).toHaveBeenCalledWith(25);
    });

    it('should recalculate total pages when totalItems is set', () => {
      component.totalItems = 100;
      component.onPageSizeChange('25');
      expect(component.totalPages).toBe(4); // 100 / 25 = 4
    });

    it('should adjust current page if it exceeds new total pages', () => {
      component.currentPage = 10;
      component.totalItems = 50;
      component.onPageSizeChange('25'); // 50 / 25 = 2 pages
      expect(component.currentPage).toBe(2);
    });

    it('should handle invalid page size gracefully', () => {
      spyOn(console, 'warn');
      const originalSize = component.itemsPerPage;
      component.onPageSizeChange('invalid');
      expect(console.warn).toHaveBeenCalled();
      expect(component.itemsPerPage).toBe(originalSize);
    });
  });

  describe('Visible Pages Calculation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should show all pages when total is less than max visible', () => {
      component.totalPages = 5;
      component.maxVisiblePages = 7;
      const visible = component.visiblePages();
      expect(visible).toEqual([1, 2, 3, 4, 5]);
    });

    it('should use ellipsis when there are many pages', () => {
      component.totalPages = 20;
      component.maxVisiblePages = 7;
      component.currentPage = 10;
      const visible = component.visiblePages();
      expect(visible).toContain('...');
      expect(visible).toContain(1);
      expect(visible).toContain(20);
    });

    it('should cache visible pages calculation', () => {
      component.totalPages = 10;
      component.currentPage = 5;
      
      // First calculation
      const first = component.visiblePages();
      // Second calculation should use cache
      const second = component.visiblePages();
      
      expect(first).toBe(second); // Should be exact same reference due to caching
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      component.totalPages = 5;
      component.totalItems = 50;
      component.itemsPerPage = 10;
      fixture.detectChanges();
    });

    it('should generate correct ARIA labels for pages', () => {
      expect(component.getPageAriaLabel(1)).toBe('Página 1, página actual');
      expect(component.getPageAriaLabel(2)).toBe('Ir a Página 2');
      expect(component.getPageAriaLabel('...')).toBe('Más páginas');
    });

    it('should generate ARIA description for current state', () => {
      component.currentPage = 2;
      const description = component.getAriaDescription();
      expect(description).toContain('Página 2 de 5');
      expect(description).toContain('11 al 20 de 50');
    });

    it('should update aria-live message on page change', () => {
      component.currentPage = 1;
      component.goToPage(2);
      expect(component.ariaLiveMessage()).toContain('Página 2 de 5');
    });
  });

  describe('Configuration', () => {
    it('should apply advanced configuration', () => {
      const config: PaginatorConfig = {
        maxVisiblePages: 5,
        showFirstLast: false,
        showPageJump: true,
        autoScroll: true,
      };
      
      component.config = config;
      component.ngOnInit();
      
      expect(component.maxVisiblePages).toBe(5);
      expect(component.showFirstLast).toBe(false);
      expect(component.showPageJump).toBe(true);
      expect(component.autoScroll).toBe(true);
    });
  });

  describe('State Management', () => {
    beforeEach(() => {
      component.totalPages = 10;
      component.totalItems = 100;
      component.itemsPerPage = 10;
      component.currentPage = 3;
      fixture.detectChanges();
    });

    it('should return complete state', () => {
      const state = component.getState();
      expect(state.currentPage).toBe(3);
      expect(state.totalPages).toBe(10);
      expect(state.isFirstPage).toBe(false);
      expect(state.isLastPage).toBe(false);
      expect(state.itemRange?.start).toBe(21);
      expect(state.itemRange?.end).toBe(30);
      expect(state.itemRange?.total).toBe(100);
    });

    it('should clear cache manually', () => {
      // Generate some cache
      component.visiblePages();
      expect((component as any)._visiblePagesCache.size).toBeGreaterThan(0);
      
      component.clearCache();
      expect((component as any)._visiblePagesCache.size).toBe(0);
    });
  });

  describe('Loading State', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should set loading state', () => {
      component.setLoading(true);
      expect(component.isLoading()).toBe(true);
      expect(component.ariaLiveMessage()).toBe('Cargando nueva página...');
      
      component.setLoading(false);
      expect(component.isLoading()).toBe(false);
    });
  });

  describe('Integration Tests', () => {
    beforeEach(() => {
      hostFixture.detectChanges();
    });

    it('should render pagination buttons', () => {
      const buttons = hostFixture.debugElement.queryAll(By.css('.nui-paginator__button'));
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should handle button clicks', () => {
      const nextButton = hostFixture.debugElement.query(
        By.css('.nui-paginator__button--next')
      );
      
      nextButton.nativeElement.click();
      hostFixture.detectChanges();
      
      expect(hostComponent.onPageChange).toHaveBeenCalledWith(2);
    });

    it('should show item range when enabled', () => {
      hostComponent.showItemRange = true;
      hostComponent.totalItems = 100;
      hostFixture.detectChanges();
      
      const infoElement = hostFixture.debugElement.query(
        By.css('.nui-paginator__info')
      );
      expect(infoElement).toBeTruthy();
    });
  });

  describe('Edge Cases', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should handle single page scenario', () => {
      component.totalPages = 1;
      component.currentPage = 1;
      
      expect(component.isFirstPage()).toBe(true);
      expect(component.isLastPage()).toBe(true);
      
      // Should not navigate anywhere
      component.goToNextPage();
      expect(component.currentPage).toBe(1);
      
      component.goToPreviousPage();
      expect(component.currentPage).toBe(1);
    });

    it('should handle zero total items', () => {
      component.totalItems = 0;
      const range = component.itemRange();
      expect(range).toBeNull();
    });

    it('should handle page jump with invalid input', () => {
      component.totalPages = 10;
      component.pageJumpValue.set('invalid');
      
      spyOn(component, 'goToPage');
      component.handlePageJump();
      
      expect(component.goToPage).not.toHaveBeenCalled();
      expect(component.pageJumpValue()).toBe('');
    });

    it('should handle very large cache', () => {
      // Simulate large cache by adding many entries
      const cache = (component as any)._visiblePagesCache;
      for (let i = 0; i < 150; i++) {
        cache.set(`key-${i}`, [1, 2, 3]);
      }
      
      // Should trigger cache cleanup
      component.totalPages = 20;
      component.currentPage = 10;
      component.visiblePages();
      
      expect(cache.size).toBeLessThanOrEqual(101); // 100 + 1 new entry
    });
  });

  describe('Keyboard Navigation', () => {
    beforeEach(() => {
      component.totalPages = 10;
      component.currentPage = 5;
      fixture.detectChanges();
    });

    it('should setup keyboard navigation on init', () => {
      spyOn(component as any, 'setupKeyboardNavigation');
      component.ngOnInit();
      expect((component as any).setupKeyboardNavigation).toHaveBeenCalled();
    });

    it('should cleanup on destroy', () => {
      spyOn((component as any)._visiblePagesCache, 'clear');
      component.ngOnDestroy();
      expect((component as any)._visiblePagesCache.clear).toHaveBeenCalled();
    });
  });

  describe('Advanced Configuration', () => {
    it('should apply configuration on init', () => {
      const config: PaginatorConfig = {
        maxVisiblePages: 5,
        showFirstLast: false,
        autoScroll: true,
      };
      
      component.config = config;
      component.ngOnInit();
      
      expect(component.maxVisiblePages).toBe(5);
      expect(component.showFirstLast).toBe(false);
      expect(component.autoScroll).toBe(true);
    });

    it('should get current state correctly', () => {
      component.currentPage = 5;
      component.totalPages = 10;
      component.itemsPerPage = 25;
      component.totalItems = 200;
      fixture.detectChanges();

      const state = component.getCurrentState();
      
      expect(state.currentPage).toBe(5);
      expect(state.totalPages).toBe(10);
      expect(state.itemsPerPage).toBe(25);
      expect(state.totalItems).toBe(200);
      expect(state.isFirstPage).toBe(false);
      expect(state.isLastPage).toBe(false);
    });
  });

  describe('Accessibility Features', () => {
    it('should generate correct ARIA labels for pages', () => {
      component.currentPage = 3;
      fixture.detectChanges();

      expect(component.getPageAriaLabel(1)).toBe('Ir a Página 1');
      expect(component.getPageAriaLabel(3)).toBe('Página 3, página actual');
      expect(component.getPageAriaLabel('...')).toBe('Más páginas');
    });

    it('should generate ARIA description', () => {
      component.currentPage = 2;
      component.totalPages = 10;
      component.totalItems = 50;
      component.itemsPerPage = 5;
      fixture.detectChanges();

      const description = component.getAriaDescription();
      expect(description).toContain('Página 2 de 10');
      expect(description).toContain('Mostrando elementos 6 al 10 de 50');
    });

    it('should update aria live message on page change', () => {
      component.currentPage = 1;
      component.totalPages = 5;
      fixture.detectChanges();

      spyOn(component as any, 'updateAriaLiveMessage');
      component.goToPage(3);
      
      expect((component as any).updateAriaLiveMessage).toHaveBeenCalledWith(3);
    });

    it('should set loading state correctly', () => {
      component.setLoading(true);
      expect(component.isLoading()).toBe(true);
      expect(component.ariaLiveMessage()).toBe('Cargando nueva página...');

      component.setLoading(false);
      expect(component.isLoading()).toBe(false);
    });
  });

  describe('Performance Optimizations', () => {
    it('should cache visible pages calculations', () => {
      component.currentPage = 5;
      component.totalPages = 20;
      component.maxVisiblePages = 7;
      fixture.detectChanges();

      const firstCall = component.visiblePages();
      const secondCall = component.visiblePages();
      
      // Ambas llamadas deben devolver el mismo array (desde caché)
      expect(firstCall).toEqual(secondCall);
    });

    it('should clear cache when current page changes', () => {
      spyOn((component as any)._visiblePagesCache, 'clear');
      
      component.currentPage = 5;
      expect((component as any)._visiblePagesCache.clear).toHaveBeenCalled();
    });

    it('should clear cache when total pages changes', () => {
      spyOn((component as any)._visiblePagesCache, 'clear');
      
      component.totalPages = 15;
      expect((component as any)._visiblePagesCache.clear).toHaveBeenCalled();
    });
  });

  describe('Advanced Events', () => {
    it('should emit advanced page change event', () => {
      spyOn(component.pageChangeAdvanced, 'emit');
      
      component.currentPage = 1;
      component.totalPages = 10;
      component.itemsPerPage = 5;
      fixture.detectChanges();
      
      component.goToPage(3);
      
      expect(component.pageChangeAdvanced.emit).toHaveBeenCalledWith({
        page: 3,
        previousPage: 1,
        itemsPerPage: 5,
        totalPages: 10
      });
    });

    it('should emit advanced page size change event', () => {
      spyOn(component.pageSizeChangeAdvanced, 'emit');
      
      component.totalPages = 10;
      component.itemsPerPage = 10;
      component.currentPage = 5;
      fixture.detectChanges();
      
      component.onPageSizeChange('25');
      
      expect(component.pageSizeChangeAdvanced.emit).toHaveBeenCalledWith({
        pageSize: 25,
        previousPageSize: 10,
        currentPage: 5,
        totalPages: 10
      });
    });
  });

  describe('Error Handling & Validation', () => {
    it('should handle invalid currentPage values', () => {
      spyOn(console, 'warn');
      
      (component as any).currentPage = null;
      expect(console.warn).toHaveBeenCalledWith('PaginatorComponent: currentPage debe ser un número válido', null);
      
      (component as any).currentPage = NaN;
      expect(console.warn).toHaveBeenCalledWith('PaginatorComponent: currentPage debe ser un número válido', NaN);
    });

    it('should handle invalid totalPages values', () => {
      spyOn(console, 'warn');
      
      (component as any).totalPages = undefined;
      expect(console.warn).toHaveBeenCalledWith('PaginatorComponent: totalPages debe ser un número válido', undefined);
    });

    it('should handle invalid goToPage calls', () => {
      spyOn(console, 'warn');
      
      component.goToPage(null as any);
      expect(console.warn).toHaveBeenCalledWith('PaginatorComponent: goToPage requiere un número válido', null);
    });

    it('should handle invalid page size changes', () => {
      spyOn(console, 'warn');
      
      component.onPageSizeChange('invalid');
      expect(console.warn).toHaveBeenCalledWith('PaginatorComponent: onPageSizeChange requiere un número válido', 'invalid');
    });
  });

  describe('Auto Scroll Feature', () => {
    it('should perform auto scroll when enabled', () => {
      spyOn(window, 'scrollTo');
      
      component.autoScroll = true;
      component.scrollTarget = 'body';
      fixture.detectChanges();
      
      component.goToPage(2);
      
      expect(window.scrollTo).toHaveBeenCalled();
    });

    it('should not perform auto scroll when disabled', () => {
      spyOn(window, 'scrollTo');
      
      component.autoScroll = false;
      fixture.detectChanges();
      
      component.goToPage(2);
      
      expect(window.scrollTo).not.toHaveBeenCalled();
    });
  });

  describe('Ellipsis Functions', () => {
    it('should identify ellipsis correctly', () => {
      expect(component.isEllipsis('ellipsis-start')).toBe(true);
      expect(component.isEllipsis('ellipsis-end')).toBe(true);
      expect(component.isEllipsis(1)).toBe(false);
      expect(component.isEllipsis(2)).toBe(false);
      expect(component.isEllipsis('not-ellipsis')).toBe(false);
    });

    it('should get correct ellipsis text', () => {
      expect(component.getEllipsisText('ellipsis-start')).toBe('...');
      expect(component.getEllipsisText('ellipsis-end')).toBe('...');
    });

    it('should get correct ellipsis ARIA labels', () => {
      expect(component.getEllipsisAriaLabel('ellipsis-start')).toBe('Páginas anteriores');
      expect(component.getEllipsisAriaLabel('ellipsis-end')).toBe('Páginas siguientes');
      expect(component.getEllipsisAriaLabel('ellipsis-other')).toBe('Más páginas');
    });

    it('should generate ellipsis identifiers in visible pages', () => {
      component.currentPage = 10;
      component.totalPages = 20;
      component.maxVisiblePages = 5;
      fixture.detectChanges();

      const visiblePages = component.visiblePages();
      const hasStartEllipsis = visiblePages.some(page => page === 'ellipsis-start');
      const hasEndEllipsis = visiblePages.some(page => page === 'ellipsis-end');

      expect(hasStartEllipsis).toBe(true);
      expect(hasEndEllipsis).toBe(true);
    });
  });

  describe('Navigation Detection', () => {
    it('should detect paginator elements with data attribute', () => {
      // Crear un elemento mock con data-paginator
      const mockElement = {
        closest: jasmine.createSpy('closest').and.returnValue(true)
      } as any;

      const result = (component as any).isWithinPaginator(mockElement);
      
      expect(mockElement.closest).toHaveBeenCalledWith('[data-paginator]');
      expect(result).toBe(true);
    });

    it('should not detect elements without data-paginator', () => {
      const mockElement = {
        closest: jasmine.createSpy('closest').and.returnValue(null)
      } as any;

      const result = (component as any).isWithinPaginator(mockElement);
      
      expect(mockElement.closest).toHaveBeenCalledWith('[data-paginator]');
      expect(result).toBe(false);
    });
  });

  describe('Visualization Modes', () => {
    it('should use default mode when not specified', () => {
      component.mode = 'default';
      
      expect(component.effectiveMode()).toBe('default');
      expect(component.shouldShowElement('pageNumbers')).toBe(true);
      expect(component.shouldShowElement('firstLast')).toBe(true);
    });

    it('should hide all extra elements in minimal mode', () => {
      component.mode = 'minimal';
      
      expect(component.effectiveMode()).toBe('minimal');
      expect(component.shouldShowElement('pageNumbers')).toBe(false);
      expect(component.shouldShowElement('firstLast')).toBe(false);
      expect(component.shouldShowElement('pageJump')).toBe(false);
    });

    it('should show only current page in compact mode', () => {
      component.mode = 'compact';
      component.showFirstLast = true;
      
      expect(component.effectiveMode()).toBe('compact');
      expect(component.shouldShowElement('pageNumbers')).toBe(false);
      expect(component.shouldShowElement('firstLast')).toBe(true);
    });

    it('should show fractional info in fractional mode', () => {
      component.mode = 'fractional';
      component.currentPage = 3;
      component.totalPages = 10;
      
      expect(component.effectiveMode()).toBe('fractional');
      expect(component.getFractionalText()).toBe('3 de 10');
    });

    it('should switch to compact mode on mobile when autoMobile is enabled', () => {
      component.autoMobile = true;
      component.mode = 'default';
      
      // Mock mobile device detection
      spyOn<any>(component, 'isMobileDevice').and.returnValue(true);
      
      expect(component.effectiveMode()).toBe('compact');
    });
  });

  describe('Layout System', () => {
    it('should return empty array when no layout is configured', () => {
      component.layout = undefined;
      
      const elements = component.getElementsForArea('center');
      
      expect(elements).toEqual([]);
    });

    it('should return elements for a specific area', () => {
      component.layout = {
        center: ['prevButton', 'pageNumbers', 'nextButton'],
        left: ['itemRange']
      };
      
      const centerElements = component.getElementsForArea('center');
      const leftElements = component.getElementsForArea('left');
      
      expect(centerElements).toEqual(['prevButton', 'pageNumbers', 'nextButton']);
      expect(leftElements).toEqual(['itemRange']);
    });

    it('should check if element should be rendered based on layout', () => {
      component.layout = {
        center: ['prevButton', 'pageNumbers', 'nextButton']
      };
      
      expect(component.shouldRenderElement('prevButton')).toBe(true);
      expect(component.shouldRenderElement('pageNumbers')).toBe(true);
      expect(component.shouldRenderElement('itemRange')).toBe(false);
    });

    it('should get layout direction from configuration', () => {
      component.layout = { direction: 'column' };
      
      expect(component.getLayoutDirection()).toBe('column');
    });

    it('should use default direction when not configured', () => {
      component.layout = {};
      
      expect(component.getLayoutDirection()).toBe('row');
    });

    it('should check if area has elements', () => {
      component.layout = {
        center: ['prevButton', 'nextButton'],
        left: []
      };
      
      expect(component.hasElementsInArea('center')).toBe(true);
      expect(component.hasElementsInArea('left')).toBe(false);
      expect(component.hasElementsInArea('top')).toBe(false);
    });
  });

  describe('Icon Customization', () => {
    it('should use default icons when no custom config is provided', () => {
      component.ngOnInit();
      
      expect(component.getIcon('first')).toBe('ri-arrow-left-double-line');
      expect(component.getIcon('next')).toBe('ri-arrow-right-s-line');
    });

    it('should use custom icons when config is provided', () => {
      const iconConfig = {
        first: 'custom-first-icon',
        next: 'custom-next-icon'
      };

      component.iconConfig = iconConfig;
      component.ngOnInit();

      expect(component.getIcon('first')).toBe('custom-first-icon');
      expect(component.getIcon('next')).toBe('custom-next-icon');
    });

    it('should fallback to defaults for missing icon config', () => {
      const iconConfig = {
        first: 'custom-first-icon'
        // next no está definido
      };

      component.iconConfig = iconConfig;
      component.ngOnInit();

      expect(component.getIcon('first')).toBe('custom-first-icon');
      expect(component.getIcon('next')).toBe('ri-arrow-right-s-line'); // default
    });
  });

  describe('Infinite Mode', () => {
    it('should detect infinite mode when enabled', () => {
      component.infiniteConfig = { enabled: true };
      
      expect(component.isInfiniteMode()).toBe(true);
    });

    it('should not be in infinite mode when disabled', () => {
      component.infiniteConfig = { enabled: false };
      
      expect(component.isInfiniteMode()).toBe(false);
    });

    it('should get correct load more text', () => {
      component.infiniteConfig = { 
        enabled: true,
        loadMoreText: 'Cargar más elementos'
      };

      expect(component.getLoadMoreText()).toBe('Cargar más elementos');
    });

    it('should use default load more text when not configured', () => {
      component.infiniteConfig = { enabled: true };

      expect(component.getLoadMoreText()).toBe('Cargar más');
    });

    it('should handle loadMore correctly', async () => {
      let loadMoreCalled = false;
      
      component.infiniteConfig = {
        enabled: true,
        onLoadMore: () => {
          loadMoreCalled = true;
        }
      };

      // Establecer estado inicial
      component.infiniteState.set({
        isLoading: false,
        hasMore: true,
        loadedItems: 0,
        loadCount: 0
      });

      await component.loadMore();

      expect(loadMoreCalled).toBe(true);
      expect(component.infiniteState().loadCount).toBe(1);
    });

    it('should not load more when already loading', async () => {
      let loadMoreCalled = false;
      
      component.infiniteConfig = {
        enabled: true,
        onLoadMore: () => {
          loadMoreCalled = true;
        }
      };

      // Establecer estado de carga
      component.infiniteState.set({
        isLoading: true,
        hasMore: true,
        loadedItems: 0,
        loadCount: 0
      });

      await component.loadMore();

      expect(loadMoreCalled).toBe(false);
    });

    it('should not load more when no more items available', async () => {
      let loadMoreCalled = false;
      
      component.infiniteConfig = {
        enabled: true,
        onLoadMore: () => {
          loadMoreCalled = true;
        }
      };

      // Establecer estado sin más elementos
      component.infiniteState.set({
        isLoading: false,
        hasMore: false,
        loadedItems: 100,
        loadCount: 5
      });

      await component.loadMore();

      expect(loadMoreCalled).toBe(false);
    });
  });
});
