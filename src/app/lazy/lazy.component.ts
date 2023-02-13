import { Component, OnInit } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

export const loader = ['en'].reduce((acc: any, lang) => {
  acc[lang] = () => import(`./i18n/${lang}.json`);
  return acc;
}, {});

@Component({
  selector: 'lazy',
  standalone: true,
  template: `{{ 'lazy.world' | transloco }}`,
  imports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'lazy',
        loader,
      },
    },
  ],
})
export class LazyComponent implements OnInit {
  constructor(private transloco: TranslocoService) {}

  ngOnInit() {
    this.transloco.selectTranslate('lazy.world').subscribe(console.log);
  }
}
