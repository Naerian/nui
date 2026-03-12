import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ShowcaseConfigService } from '../../../core/services/showcase-config.service';
import { AVAILABLE_VERSIONS, Version, VERSION_URLS } from '../../../core/models/version.model';

@Component({
  selector: 'app-version-selector',
  standalone: true,
  imports: [CommonModule, TranslateModule, OverlayModule],
  templateUrl: './version-selector.component.html',
  styleUrls: ['./version-selector.component.scss'],
})
export class VersionSelectorComponent {
  private showcaseConfig = inject(ShowcaseConfigService);

  // UI State con Signals
  isOpen = signal(false);

  // Mapeo de URLs de versiones (Esto escalará aquí)
  private readonly versionUrls = VERSION_URLS;

  // Lista de versiones disponibles
  versions = signal(AVAILABLE_VERSIONS);

  // Obtenemos la versión actual del servicio
  currentVersion = computed(() => this.showcaseConfig.currentConfig.version);

  toggleDropdown(): void {
    this.isOpen.update(v => !v);
  }

  selectVersion(version: Version): void {
    this.isOpen.set(false);

    // Si la versión seleccionada es distinta a la actual...
    if (version.value !== this.currentVersion()) {
      // 1. Guardamos la preferencia (opcional)
      this.showcaseConfig.setVersion(version.value);

      // 2. Redirección física
      // Intentamos mantener la ruta actual (ej: /components/button)
      const path = window.location.pathname;
      const targetBase = this.versionUrls[version.value];

      if (targetBase) {
        window.location.href = `${targetBase}${path}`;
      }
    }
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }
}
