import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CodeExample } from '../../core/models';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent {
  @Input() title?: string;
  @Input() code?: string;
  @Input() language: string = 'typescript';
  @Input() examples?: CodeExample[];
  
  selectedTab = signal(0);
  copySuccess = signal(false);

  get currentCode(): string {
    if (this.examples && this.examples.length > 0) {
      return this.examples[this.selectedTab()].code;
    }
    return this.code || '';
  }

  get currentLanguage(): string {
    if (this.examples && this.examples.length > 0) {
      return this.examples[this.selectedTab()].language;
    }
    return this.language;
  }

  selectTab(index: number): void {
    this.selectedTab.set(index);
    this.copySuccess.set(false);
  }

  async copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.currentCode);
      this.copySuccess.set(true);
      setTimeout(() => this.copySuccess.set(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }

  getLanguageLabel(lang: string): string {
    const labels: { [key: string]: string } = {
      'typescript': 'TypeScript',
      'ts': 'TypeScript',
      'javascript': 'JavaScript',
      'js': 'JavaScript',
      'html': 'HTML',
      'css': 'CSS',
      'scss': 'SCSS',
      'json': 'JSON',
      'bash': 'Bash',
      'shell': 'Shell'
    };
    return labels[lang.toLowerCase()] || lang;
  }

  getLanguageIcon(lang: string): string {
    const icons: { [key: string]: string } = {
      'typescript': 'ri-braces-line',
      'ts': 'ri-braces-line',
      'javascript': 'ri-braces-line',
      'js': 'ri-braces-line',
      'html': 'ri-code-s-slash-line',
      'css': 'ri-css3-line',
      'scss': 'ri-css3-line',
      'json': 'ri-file-code-line',
      'bash': 'ri-terminal-line',
      'shell': 'ri-terminal-line'
    };
    return icons[lang.toLowerCase()] || 'ri-file-code-line';
  }
}
