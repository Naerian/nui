import {
  Component,
  signal,
  computed,
  effect,
  inject,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CodeExample } from '../../core/models';
import { ThemeService } from 'nui';
import { getSingletonHighlighter, type BundledLanguage } from 'shiki';

// ── Shiki singleton ────────────────────────────────────────────────────────
// Una instancia compartida por todas las instancias del componente.
let _highlighterPromise: ReturnType<typeof getSingletonHighlighter> | null = null;

function getHighlighter() {
  _highlighterPromise ??= getSingletonHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: ['typescript', 'javascript', 'html', 'css', 'scss', 'json', 'bash', 'plaintext'],
  });
  return _highlighterPromise;
}

/** Normaliza alias de lenguaje al nombre registrado en Shiki. */
const LANG_ALIASES: Record<string, string> = {
  ts: 'typescript',
  js: 'javascript',
  xml: 'html',
  shell: 'bash',
};

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent {
  // ── Inputs (Signal API) ──────────────────────────────────────────────────
  readonly title = input<string>();
  readonly code = input<string>('');
  readonly language = input<string>('typescript');
  readonly examples = input<CodeExample[]>();

  // ── UI state ─────────────────────────────────────────────────────────────
  readonly selectedTab = signal(0);
  readonly copySuccess = signal(false);
  /** Líneas de HTML generado por Shiki (seguro — no viene del usuario). */
  readonly highlightedLines = signal<string[]>([]);

  // ── Derived ──────────────────────────────────────────────────────────────
  private readonly _currentCode = computed(() => {
    const exs = this.examples();
    return exs?.length ? exs[this.selectedTab()].code : this.code();
  });

  private readonly _currentLang = computed(() => {
    const exs = this.examples();
    const raw = exs?.length ? exs[this.selectedTab()].language : this.language();
    const normalized = raw?.toLowerCase() ?? 'typescript';
    return LANG_ALIASES[normalized] ?? normalized;
  });

  /** Expuesto al template para el atributo data-language. */
  readonly currentLanguage = this._currentLang;

  // ── Contador de generación para evitar race conditions async ───────────
  private _generation = 0;

  private readonly _themeService = inject(ThemeService);

  constructor() {
    effect(() => {
      this._runHighlight(
        this._currentCode(),
        this._currentLang(),
        this._themeService.isDarkMode(),
      );
    });
  }

  // ── Highlighting ─────────────────────────────────────────────────────────

  private async _runHighlight(code: string, lang: string, isDark: boolean): Promise<void> {
    const gen = ++this._generation;
    try {
      const hl = await getHighlighter();
      const loaded = hl.getLoadedLanguages() as string[];
      const resolvedLang: BundledLanguage = (loaded.includes(lang)
        ? lang
        : 'plaintext') as BundledLanguage;

      const html = hl.codeToHtml(code, {
        lang: resolvedLang,
        theme: isDark ? 'github-dark' : 'github-light',
      });

      if (gen === this._generation) {
        this.highlightedLines.set(this._extractLines(html));
      }
    } catch {
      if (gen === this._generation) {
        this.highlightedLines.set(code.split('\n').map((l) => this._escapeHtml(l)));
      }
    }
  }

  /**
   * Extrae el HTML interno de cada línea del bloque <code> generado por Shiki.
   * Shiki envuelve cada línea en <span class="line">…</span>.
   */
  private _extractLines(shikiHtml: string): string[] {
    const match = shikiHtml.match(/<code>([\s\S]*?)<\/code>/);
    if (!match) return [];
    const lines = match[1].split('\n');
    if (lines.at(-1) === '') lines.pop();
    return lines.map((l) => l.replace(/^<span class="line">|<\/span>$/g, ''));
  }

  private _escapeHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ── Public methods ───────────────────────────────────────────────────────

  selectTab(index: number): void {
    this.selectedTab.set(index);
    this.copySuccess.set(false);
  }

  async copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this._currentCode());
      this.copySuccess.set(true);
      setTimeout(() => this.copySuccess.set(false), 2000);
    } catch {
      // Acceso al portapapeles denegado — ignorado silenciosamente
    }
  }

  getLanguageLabel(lang: string): string {
    const labels: Record<string, string> = {
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
    return labels[lang.toLowerCase()] ?? lang;
  }

  getLanguageIcon(lang: string): string {
    const icons: Record<string, string> = {
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
    return icons[lang.toLowerCase()] ?? 'ri-file-code-line';
  }
}
