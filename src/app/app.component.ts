import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h3>Transloco Inline Loaders</h3>
    {{ 'hello' | transloco }}
    <router-outlet></router-outlet>
  `,
  imports: [TranslocoModule, RouterOutlet],
})
export class AppComponent {}
