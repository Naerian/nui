import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-theme-overview',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class ThemeOverviewComponent {
  features = [
    {
      icon: 'ri-palette-line',
      titleKey: 'pages.theming.overview.features.runtimeSwitching.title',
      descriptionKey: 'pages.theming.overview.features.runtimeSwitching.description',
    },
    {
      icon: 'ri-contrast-2-line',
      titleKey: 'pages.theming.overview.features.darkMode.title',
      descriptionKey: 'pages.theming.overview.features.darkMode.description',
    },
    {
      icon: 'ri-magic-line',
      titleKey: 'pages.theming.overview.features.tokenGeneration.title',
      descriptionKey: 'pages.theming.overview.features.tokenGeneration.description',
    },
    {
      icon: 'ri-layout-grid-line',
      titleKey: 'pages.theming.overview.features.componentSpecific.title',
      descriptionKey: 'pages.theming.overview.features.componentSpecific.description',
    },
    {
      icon: 'ri-shield-check-line',
      titleKey: 'pages.theming.overview.features.typeSafety.title',
      descriptionKey: 'pages.theming.overview.features.typeSafety.description',
    },
    {
      icon: 'ri-flashlight-line',
      titleKey: 'pages.theming.overview.features.zeroScss.title',
      descriptionKey: 'pages.theming.overview.features.zeroScss.description',
    },
  ];

  integrationPoints = [
    'pages.theming.overview.integration.point1',
    'pages.theming.overview.integration.point2',
    'pages.theming.overview.integration.point3',
    'pages.theming.overview.integration.point4',
    'pages.theming.overview.integration.point5',
  ];
}
