import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CodeBlockComponent, CodeExample } from '../../../shared/code-block/code-block.component';

@Component({
  selector: 'app-installation',
  standalone: true,
  imports: [CommonModule, TranslateModule, CodeBlockComponent],
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationComponent {
  step2Examples: CodeExample[] = [
    {
      language: 'typescript',
      label: 'app.config.ts',
      code: `import { ApplicationConfig } from '@angular/core';
import { provideNUI, aura } from 'nui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNUI({ 
      preset: aura,
      darkMode: 'manual'
    })
  ]
};`
    }
  ];

  step3Examples: CodeExample[] = [
    {
      language: 'scss',
      label: 'styles.scss',
      code: `// Import NUI styles in your global styles.scss
@import 'nui/styles/nui.scss';`
    },
    {
      language: 'json',
      label: 'angular.json',
      code: `{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/nui/styles/nui.scss",
              "src/styles.scss"
            ]
          }
        }
      }
    }
  }
}`
    },
    {
      language: 'json',
      label: 'project.json (Nx)',
      code: `{
  "targets": {
    "build": {
      "options": {
        "styles": [
          "node_modules/nui/styles/nui.scss",
          "src/styles.scss"
        ]
      }
    }
  }
}`
    }
  ];

  step4Examples: CodeExample[] = [
    {
      language: 'html',
      label: 'component.html',
      code: `<!-- Use NUI components in your templates -->
<nui-button color="primary">Click me</nui-button>`
    }
  ];
}
