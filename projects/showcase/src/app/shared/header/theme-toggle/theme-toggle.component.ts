import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from 'nui';
import { ShowcaseConfigService } from '../../../core/services/showcase-config.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {
  private themeService = inject(ThemeService);
  private showcaseConfig = inject(ShowcaseConfigService);

  isDark = this.showcaseConfig.currentConfig.isDarkMode;

  ngOnInit(): void {
    this.showcaseConfig.config$.subscribe(config => {
      this.isDark = config.isDarkMode;
    });
  }

  toggleTheme(): void {
    const newDarkMode = !this.isDark;
    this.showcaseConfig.setDarkMode(newDarkMode);
    this.themeService.setDarkMode(newDarkMode);
  }
}
