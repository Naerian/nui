import {
  Component,
  Input,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CodeExample } from '../../core/models';
import hljs from 'highlight.js/lib/core';
// Lenguajes utilizados en el showcase
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';     // cubre HTML
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  /**
   * Resalta el código con highlight.js y divide el resultado en líneas HTML.
   * Cada línea es HTML seguro generado por hljs (no viene de usuario).
   */
  get highlightedLines(): string[] {
    const lang = this.currentLanguage?.toLowerCase();
    const code = this.currentCode;
    let highlighted: string;

    if (lang && hljs.getLanguage(lang)) {
      highlighted = hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
    } else {
      highlighted = hljs.highlightAuto(code).value;
    }

    const lines = highlighted.split('\n');
    if (lines.at(-1) === '') lines.pop();
    return lines;
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
      typescript: 'TypeScript',
      ts: 'TypeScript',
      javascript: 'JavaScript',
      js: 'JavaScript',
      html: 'HTML',
      css: 'CSS',
      scss: 'SCSS',
      json: 'JSON',
      bash: 'Bash',
      shell: 'Shell',
    };
    return labels[lang.toLowerCase()] || lang;
  }

  getLanguageIcon(lang: string): string {
    const icons: { [key: string]: string } = {
      typescript: 'ri-braces-line',
      ts: 'ri-braces-line',
      javascript: 'ri-braces-line',
      js: 'ri-braces-line',
      html: 'ri-code-s-slash-line',
      css: 'ri-css3-line',
      scss: 'ri-css3-line',
      json: 'ri-file-code-line',
      bash: 'ri-terminal-line',
      shell: 'ri-terminal-line',
    };
    return icons[lang.toLowerCase()] || 'ri-file-code-line';
  }
}
