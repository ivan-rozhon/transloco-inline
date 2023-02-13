import 'zone.js/dist/zone';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  Translation,
  TRANSLOCO_LOADER,
  defaultProviders,
  TranslocoLoader,
  translocoConfig,
  TRANSLOCO_CONFIG,
} from '@ngneat/transloco';
import { provideRouter } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      {
        path: '',
        loadComponent: () =>
          import('./app/lazy/lazy.component').then((m) => m.LazyComponent),
      },
    ]),
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en'],
        defaultLang: 'en',
        // Remove this option if your application
        // doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    defaultProviders,
  ],
});
