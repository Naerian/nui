import { Component, inject, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ShowcaseConfigService } from '../../core/services/showcase-config.service';
import { filter } from 'rxjs/operators';
import { SIDEBAR_MENU_CONFIG, MenuItem } from './sidebar-menu.config';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  private showcaseConfig = inject(ShowcaseConfigService);
  private router = inject(Router);

  isCollapsed = false;
  expandedSections: { [key: string]: boolean } = {};

  // Configuración del menú importada desde archivo externo
  menuItems: MenuItem[] = SIDEBAR_MENU_CONFIG;

  ngOnInit(): void {
    // Asegurar que el sidebar empiece cerrado en mobile
    this.checkAndCollapseOnMobile();

    this.showcaseConfig.config$.subscribe(config => {
      this.isCollapsed = config.sidebarCollapsed;
    });

    // Initialize sections based on current route
    this.updateExpandedSections(this.router.url);

    // Listen to route changes to update expanded sections
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        this.updateExpandedSections(event.urlAfterRedirects);
        // Cerrar sidebar en mobile al cambiar de ruta
        this.closeSidebarOnMobile();
      });
  }

  @HostListener('window:resize')
  onResize(): void {
    // Si se redimensiona a mobile, cerrar sidebar
    this.checkAndCollapseOnMobile();
  }

  /**
   * Verifica si está en mobile y cierra el sidebar si es necesario
   */
  private checkAndCollapseOnMobile(): void {
    if (this.isMobile() && !this.isCollapsed) {
      this.showcaseConfig.setSidebarCollapsed(true);
    }
  }

  /**
   * Cierra el sidebar en mobile
   */
  private closeSidebarOnMobile(): void {
    if (this.isMobile()) {
      this.showcaseConfig.setSidebarCollapsed(true);
    }
  }

  /**
   * Detecta si está en viewport mobile
   */
  private isMobile(): boolean {
    return window.innerWidth < 992;
  }

  private updateExpandedSections(url: string): void {
    // Reset all sections
    this.menuItems.forEach(item => {
      if (item.children) {
        this.expandedSections[item.route] = false;
      }
    });

    // Expand section if current route matches any child
    this.menuItems.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => url.includes(child.route));
        if (hasActiveChild) {
          this.expandedSections[item.route] = true;
        }
      }
    });
  }

  toggleSection(route: string): void {
    this.expandedSections[route] = !this.expandedSections[route];
  }

  isSectionExpanded(route: string): boolean {
    return this.expandedSections[route] || false;
  }
}
