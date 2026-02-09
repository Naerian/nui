import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ShowcaseConfigService } from '../../../core/services/showcase-config.service';

interface Version {
  value: string;
  label: string;
}

@Component({
  selector: 'app-version-selector',
  standalone: true,
  imports: [CommonModule, TranslateModule, OverlayModule],
  templateUrl: './version-selector.component.html',
  styleUrls: ['./version-selector.component.scss'],
})
export class VersionSelectorComponent implements OnInit {
  private showcaseConfig = inject(ShowcaseConfigService);

  isOpen = false;
  currentVersion = this.showcaseConfig.currentConfig.version;

  versions: Version[] = [{ value: '0.0.1', label: 'v0.0.1 (Latest)' }];

  ngOnInit(): void {
    this.showcaseConfig.config$.subscribe(config => {
      this.currentVersion = config.version;
    });
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectVersion(version: Version): void {
    this.showcaseConfig.setVersion(version.value);
    this.isOpen = false;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }
}
