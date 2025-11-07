import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ShowcaseConfigService } from '../../core/services/showcase-config.service';
import { filter } from 'rxjs/operators';

interface MenuItem {
  label: string;
  translationKey: string;
  route: string;
  icon: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private showcaseConfig = inject(ShowcaseConfigService);
  private router = inject(Router);

  isCollapsed = false;
  expandedSections: { [key: string]: boolean } = {};

  menuItems: MenuItem[] = [
    {
      label: 'Getting Started',
      translationKey: 'sidebar.gettingStarted',
      route: '/getting-started',
      icon: 'ri-rocket-line',
      children: [
        {
          label: 'Installation',
          translationKey: 'sidebar.installation',
          route: '/getting-started/installation',
          icon: 'ri-download-line'
        },
        {
          label: 'Configuration',
          translationKey: 'sidebar.configuration',
          route: '/getting-started/configuration',
          icon: 'ri-settings-3-line'
        }
      ]
    },
    {
      label: 'Theming',
      translationKey: 'sidebar.theming',
      route: '/theming',
      icon: 'ri-palette-line'
    },
    {
      label: 'Components',
      translationKey: 'sidebar.components',
      route: '/components',
      icon: 'ri-layout-grid-line',
      children: [
        {
          label: 'Button',
          translationKey: 'sidebar.button',
          route: '/components/button',
          icon: 'ri-checkbox-blank-line'
        }
      ]
    },
    {
      label: 'Examples',
      translationKey: 'sidebar.examples',
      route: '/examples',
      icon: 'ri-code-box-line'
    },
    {
      label: 'Playground',
      translationKey: 'sidebar.playground',
      route: '/playground',
      icon: 'ri-flask-line'
    }
  ];

  ngOnInit(): void {
    this.showcaseConfig.config$.subscribe(config => {
      this.isCollapsed = config.sidebarCollapsed;
    });

    // Initialize sections based on current route
    this.updateExpandedSections(this.router.url);

    // Listen to route changes to update expanded sections
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.updateExpandedSections(event.urlAfterRedirects);
      });
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
