import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CodeBlockComponent } from '../../../shared/code-block/code-block.component';
import { CodeExample } from '../../../core/models';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [CommonModule, TranslateModule, CodeBlockComponent],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent {
  presetConfigExamples: CodeExample[] = [
    {
      title: 'app.config.ts',
      language: 'typescript',
      code: `import { provideNUI, dopamine } from 'nui';

provideNUI({ 
  preset: dopamine 
})`,
    },
  ];

  darkModeConfigExamples: CodeExample[] = [
    {
      title: 'app.config.ts',
      language: 'typescript',
      code: `provideNUI({ 
  preset: minimal,
  darkMode: 'manual' // 'auto' | 'manual' | 'system'
})`,
    },
  ];

  customPresetExamples: CodeExample[] = [
    {
      language: 'typescript',
      title: 'TypeScript',
      code: `import { ThemePreset } from 'nui';

const myPreset: ThemePreset = {
  name: 'custom',
  colors: {
    light: {
      primary: '#your-color',
      secondary: '#your-color',
      accent: '#your-color',
      success: '#your-color',
      info: '#your-color',
      warning: '#your-color',
      danger: '#your-color'
    },
    dark: {
      primary: '#your-color',
      secondary: '#your-color',
      accent: '#your-color',
      success: '#your-color',
      info: '#your-color',
      warning: '#your-color',
      danger: '#your-color'
    }
  }
};

provideNUI({ preset: myPreset })`,
    },
  ];

  customComponentExamples: CodeExample[] = [
    {
      language: 'typescript',
      title: 'TypeScript',
      code: `import { provideNUI, ButtonGlobalConfig, PaginatorConfig } from 'nui';

const myCustomButtonConfig: Partial<ButtonGlobalConfig> = {
  size: 'lg',
  color: 'accent',
  variant: 'outline',
  shape: 'pill',
  width: 'full',
  iconPosition: 'start',
};

const myCustomPaginatorConfig: Partial<PaginatorConfig> = {
  color: 'success',
  size: 'sm',
  texts: {
    previous: 'Back',
    next: 'Next',
  },
};

provideNUI({ 
    config: {
      button: myCustomButtonConfig,
      paginator: myCustomPaginatorConfig
    }
})`,
    },
  ];

  i18nConfigExamples: CodeExample[] = [
    {
      title: 'Static Integration (provideNuiI18n)',
      language: 'typescript',
      code: `import { provideNuiI18n } from 'nui';

// Useful for single-language applications or to override 
// specific NUI terms during startup.
export const appConfig: ApplicationConfig = {
  providers: [
    provideNuiI18n({
      paginator: {
        itemsPerPage: 'Registros por página:',
        nextPage: 'Siguiente'
      }
    })
  ]
};`,
    },
    {
      title: 'Reactive Integration (ngx-translate)',
      language: 'typescript',
      code: `// app.component.ts
import { NuiI18nService, NuiI18n } from 'nui';
import { TranslateService } from '@ngx-translate/core';

export class AppComponent {
  constructor(
    private translate: TranslateService,
    private nuiI18n: NuiI18nService
  ) {
    // Automatic synchronization: whenever the app's language changes,
    // NUI updates its components instantly using Signals.
    this.translate.onLangChange.subscribe(event => {
      const nTranslations = event.translations['NUI'];
      this.nuiI18n.setLang(event.lang);
      if (nTranslations) this.nuiI18n.setTranslations(nTranslations as Partial<NuiI18n>);
    });
  }
}`,
    },
    {
      title: 'Reactive Integration (Transloco)',
      language: 'typescript',
      code: `// app.component.ts
import { NuiI18nService, NuiI18n } from 'nui';
import { TranslocoService } from '@ngneat/transloco';

export class AppComponent {
  constructor(private transloco: TranslocoService, private nuiI18n: NuiI18nService) {
    this.transloco.selectTranslation().subscribe(translation => {
      const nTranslations = event.translations['NUI'];
      this.nuiI18n.setLang(event.lang);
      if (nTranslations) this.nuiI18n.setTranslations(nTranslations as Partial<NuiI18n>);
    });
  }
}`,
    },
    {
      title: 'Manual Integration',
      language: 'typescript',
      code: `// Anywhere in your app
const i18nService = inject(NuiI18nService);

// Puedes actualizar solo una sección específica de la librería
i18nService.setTranslations({
  paginator: {
    nextPage: 'Next Step',
    itemsPerPage: 'Rows:'
  }
});`,
    },
    {
      title: 'Custom i18n JSON Structure',
      language: 'json',
      code: `{
  "NUI": {
    "paginator": {
      "firstPage": "First Page",
      "lastPage": "Last Page",
      "previousPage": "Previous Page",
      "nextPage": "Next Page",
      "itemsPerPage": "Items per page",
      "showingItems": "{start}-{end} of {total}"
    },
    "calendar": {
      "today": "Today",
      "nextMonth": "Next month",
      "weekDaysShort": ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
    }
  }
}`,
    },
  ];

  i18nDateConfigExamples: CodeExample[] = [
    {
      title: 'Static Integration (provideNuiDateLocales)',
      language: 'typescript',
      code: `import { provideNuiDateLocales } from 'nui';
import { enUS, es } from 'date-fns/locale';

// Register date adapter locales to enable calendar localization and date formatting in NUI components.
// This is necessary because the default date adapter (NuiDateFnsAdapter) relies on these locales for formatting and localization.
export const appConfig: ApplicationConfig = {
  providers: [
    provideNuiDateLocales({
      en: enUS,
      es: es,
    })
  ]
};`,
    },
  ];
}
