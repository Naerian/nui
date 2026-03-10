import {
  Component,
  signal,
  computed,
  effect,
  inject,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
  readonly isExpanded = signal(false);
  /**
   * Líneas de HTML generado por Shiki marcadas como seguras para [innerHTML].
   * Angular elimina inline styles al sanitizar; bypassSecurityTrustHtml los preserva.
   * El HTML proviene de Shiki (no del usuario), por lo que es seguro.
   */
  readonly highlightedLines = signal<SafeHtml[]>([]);

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

  /**
   * Sincrónico: usa el código fuente (no el output de Shiki).
   * Threshold: max-height 250px - padding 32px = 218px útiles;
   * font 12px × line-height 1.5 = 18px/línea → 218/18 ≈ 12 líneas visibles.
   */
  readonly isExpandable = computed(() => this._currentCode().split('\n').length > 12);

  /** Expuesto al template para el atributo data-language. */
  readonly currentLanguage = this._currentLang;

  // ── Contador de generación para evitar race conditions async ───────────
  private _generation = 0;

  private readonly _themeService = inject(ThemeService);
  private readonly _sanitizer = inject(DomSanitizer);

  constructor() {
    effect(
      () => {
        // Resetear estado expandido cuando cambia cualquier dependencia
        this.isExpanded.set(false);
        this._runHighlight(
          this._currentCode(),
          this._currentLang(),
          this._themeService.isDarkMode(),
        );
      },
      { allowSignalWrites: true },
    );
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
        this.highlightedLines.set(
          this._extractLines(html).map((l) => this._sanitizer.bypassSecurityTrustHtml(l)),
        );
      }
    } catch {
      if (gen === this._generation) {
        this.highlightedLines.set(
          code.split('\n').map((l) => this._sanitizer.bypassSecurityTrustHtml(this._escapeHtml(l))),
        );
      }
    }
  }

  /**
   * Extrae el HTML interno de cada línea del bloque <code> generado por Shiki.
   * Shiki envuelve cada línea en <span class="line">…</span>.
   */
  private _extractLines(shikiHtml: string): string[] {
    // [^>]* handles Shiki 4.x which may emit <code class="..."> with attributes
    const match = shikiHtml.match(/<code[^>]*>([\s\S]*?)<\/code>/);
    if (!match) return [];
    const lines = match[1].split('\n');
    if (lines.at(-1) === '') lines.pop();
    // Strip outer <span class="line"> wrapper Shiki adds around each line
    return lines.map((l) => l.replace(/^<span[^>]*>|<\/span>$/g, ''));
  }

  private _escapeHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ── Public methods ───────────────────────────────────────────────────────

  selectTab(index: number): void {
    this.selectedTab.set(index);
    this.copySuccess.set(false);
  }

  toggleExpand(): void {
    this.isExpanded.update((v) => !v);
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
