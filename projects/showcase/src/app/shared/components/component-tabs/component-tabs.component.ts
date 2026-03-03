import { Component, input, signal, effect, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter, Subject, takeUntil } from 'rxjs';
import { ComponentSection } from '../../../core/models';

/**
 * Interface para definir la configuración de un tab
 */
export interface ComponentTab {
  /**
   * ID único del tab
   */
  id: string;

  /**
   * Etiqueta del tab (clave de traducción)
   */
  label: string;

  /**
   * Icono opcional del tab (Remix Icon)
   */
  icon?: string;

  /**
   * IDs de las secciones que pertenecen a este tab
   */
  sections: string[];
}

/**
 * Componente de tabs para páginas de documentación de componentes
 * 
 * Organiza las secciones de documentación en tabs:
 * - Ejemplos: Demostraciones interactivas
 * - API: Interfaces y métodos
 * - Theming: Variables CSS y personalización
 * 
 * Soporta navegación por URL fragments (#examples.basic, #api.interfaces)
 */
@Component({
  selector: 'app-component-tabs',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './component-tabs.component.html',
  styleUrl: './component-tabs.component.scss',
})
export class ComponentTabsComponent implements OnInit, OnDestroy {
  /**
   * Configuración de tabs disponibles
   */
  tabs = input.required<ComponentTab[]>();

  /**
   * Todas las secciones de la página
   */
  sections = input.required<ComponentSection[]>();

  /**
   * Tab activo inicial (por defecto 'examples')
   */
  initialTab = input<string>('examples');

  /**
   * Tab actualmente activo (signal)
   */
  activeTabId = signal<string>('examples');

  /**
   * Secciones filtradas según el tab activo (signal público)
   */
  activeSections = computed(() => {
    const activeTab = this.tabs().find(tab => tab.id === this.activeTabId());
    if (!activeTab) return [];

    const sectionIds = activeTab.sections;
    return this.sections().filter(section => sectionIds.includes(section.id));
  });

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    // Detectar cambios de tab desde URL fragment
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.handleFragmentChange();
      });
  }

  ngOnInit(): void {
    // Establecer tab inicial
    this.activeTabId.set(this.initialTab());

    // Manejar fragment inicial de la URL
    this.handleFragmentChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Cambia el tab activo y actualiza la URL
   */
  changeTab(tabId: string): void {
    this.activeTabId.set(tabId);
    
    // Actualizar URL fragment con el tab
    this.router.navigate([], {
      fragment: tabId,
      replaceUrl: true,
    });
  }

  /**
   * Navega a una sección específica dentro de un tab
   */
  navigateToSection(sectionAnchor: string): void {
    const currentTab = this.activeTabId();
    const fragment = `${currentTab}.${sectionAnchor}`;
    
    this.router.navigate([], {
      fragment,
      replaceUrl: true,
    });

    // Scroll a la sección
    setTimeout(() => {
      this.viewportScroller.scrollToAnchor(sectionAnchor);
    }, 100);
  }

  /**
   * Maneja cambios en el fragment de la URL
   * Soporta formatos:
   * - #examples (solo tab)
   * - #examples.basic (tab + sección)
   * - #basic (sección legacy, busca en qué tab está)
   */
  private handleFragmentChange(): void {
    const fragment = this.router.parseUrl(this.router.url).fragment;
    if (!fragment) return;

    // Formato: tab.section
    if (fragment.includes('.')) {
      const [tabId, sectionAnchor] = fragment.split('.');
      
      // Verificar que el tab existe
      const tab = this.tabs().find(t => t.id === tabId);
      if (tab) {
        this.activeTabId.set(tabId);
        
        // Scroll a la sección después de cambiar el tab
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(sectionAnchor);
        }, 100);
      }
      return;
    }

    // Formato: solo tab
    const tab = this.tabs().find(t => t.id === fragment);
    if (tab) {
      this.activeTabId.set(fragment);
      return;
    }

    // Formato legacy: solo sección (sin tab)
    // Buscar en qué tab está la sección
    const tabWithSection = this.tabs().find(t =>
      t.sections.some(sectionId => {
        const section = this.sections().find(s => s.id === sectionId);
        return section?.anchor === fragment;
      })
    );

    if (tabWithSection) {
      this.activeTabId.set(tabWithSection.id);
      setTimeout(() => {
        this.viewportScroller.scrollToAnchor(fragment);
      }, 100);
    }
  }
}
