import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { ShowcaseConfigService } from '../../../core/services/showcase-config.service';
import {
  SHOWCASE_FONTS,
  FontOption,
  DEFAULT_FONT_SIZE,
  MIN_FONT_SIZE,
  MAX_FONT_SIZE,
} from '../../../core/models/font.model';

@Component({
  selector: 'app-font-selector',
  standalone: true,
  imports: [OverlayModule],
  templateUrl: './font-selector.component.html',
  styleUrls: ['./font-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FontSelectorComponent implements OnInit {
  private readonly showcaseConfig = inject(ShowcaseConfigService);
  private readonly document = inject(DOCUMENT);

  readonly fonts = SHOWCASE_FONTS;
  readonly minFontSize = MIN_FONT_SIZE;
  readonly maxFontSize = MAX_FONT_SIZE;

  isOpen = signal(false);
  currentFontName = signal(this.showcaseConfig.currentConfig.fontName);
  fontSize = signal(this.showcaseConfig.currentConfig.fontSize ?? DEFAULT_FONT_SIZE);

  currentFont = computed<FontOption>(
    () => this.fonts.find(f => f.name === this.currentFontName()) ?? this.fonts[0]
  );

  ngOnInit(): void {
    this.applyFont(this.currentFont().value);
    this.applyFontSize(this.fontSize());
  }

  toggleDropdown(): void {
    this.isOpen.update(v => !v);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  selectFont(font: FontOption): void {
    this.currentFontName.set(font.name);
    this.showcaseConfig.setFont(font.name);
    this.applyFont(font.value);
    this.isOpen.set(false);
  }

  onFontSizeChange(event: Event): void {
    const size = Number((event.target as HTMLInputElement).value);
    this.fontSize.set(size);
    this.showcaseConfig.setFontSize(size);
    this.applyFontSize(size);
  }

  private applyFont(fontFamily: string): void {
    this.document.documentElement.style.fontFamily = fontFamily;
  }

  private applyFontSize(size: number): void {
    this.document.documentElement.style.fontSize = `${size}px`;
  }
}
