import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { ShowcaseConfigService } from '../../../core/services/showcase-config.service';
import { DEFAULT_LANGUAGE, Language, LANGUAGES } from '../../../core/models/language.model';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, TranslateModule, OverlayModule],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {
  private translateService = inject(TranslateService);
  private showcaseConfig = inject(ShowcaseConfigService);

  isOpen = false;
  currentLanguage = this.showcaseConfig.currentConfig.language || DEFAULT_LANGUAGE;

  languages: Language[] = LANGUAGES;

  ngOnInit(): void {
    this.showcaseConfig.config$.subscribe(config => {
      this.currentLanguage = config?.language || DEFAULT_LANGUAGE;
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
