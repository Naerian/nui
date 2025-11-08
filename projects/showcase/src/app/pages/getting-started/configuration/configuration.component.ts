import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CodeBlockComponent, CodeExample } from '../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [CommonModule, TranslateModule, CodeBlockComponent],
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {
  presetConfigExamples: CodeExample[] = [
    {
      language: 'typescript',
      code: `import { provideNUI, dopamine } from 'nui';

provideNUI({ 
  preset: dopamine 
})`
    }
  ];

  darkModeConfigExamples: CodeExample[] = [
    {
      language: 'typescript',
      code: `provideNUI({ 
  preset: aura,
  darkMode: 'manual' // 'auto' | 'manual' | 'system'
})`
    }
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

provideNUI({ preset: myPreset })`
    }
  ];
}
