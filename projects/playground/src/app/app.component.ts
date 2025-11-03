import { Component } from '@angular/core';
// Importar la librería NUI (componentes Angular si los hubiera)
import { NuiService } from 'nui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NUI Playground - Usando librería instalada';

  constructor(private nuiService: NuiService) {
    // Usar el servicio de la librería
    console.log('NUI Service disponible:', this.nuiService);
  }
  
  toggleTheme() {
    document.body.classList.toggle('theme-dark');
  }
}
