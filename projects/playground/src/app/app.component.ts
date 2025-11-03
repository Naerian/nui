import { Component } from '@angular/core';
import { ButtonComponent } from 'nui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NUI Playground - Usando librería instalada';
}
