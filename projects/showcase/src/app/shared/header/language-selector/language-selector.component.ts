import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ShowcaseConfigService } from '../../../core/services/showcase-config.service';

interface Language {
  code: string;
  label: string;
  flag: string;
}

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, TranslateModule, OverlayModule],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  private translateService = inject(TranslateService);
  private showcaseConfig = inject(ShowcaseConfigService);

  isOpen = false;
  currentLanguage = this.showcaseConfig.currentConfig.language || 'en';

  languages: Language[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' }
  ];

  ngOnInit(): void {
    this.showcaseConfig.config$.subscribe(config => {
      this.currentLanguage = config.language;
    });
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(lang: Language): void {
    this.showcaseConfig.setLanguage(lang.code);
    this.translateService.use(lang.code);
    this.isOpen = false;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }
}
