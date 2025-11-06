import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private translate = inject(TranslateService);

  ngOnInit(): void {
    // Set default language
    this.translate.setDefaultLang('en');
    
    // Try to use browser language or fallback to English
    const browserLang = this.translate.getBrowserLang();
    const langToUse = browserLang?.match(/en|es/) ? browserLang : 'en';
    this.translate.use(langToUse);
  }
}
