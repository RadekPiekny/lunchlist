import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import * as UIkit from 'uikit';
import * as Icons from 'uikit/dist/js/uikit-icons';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

UIkit.use(Icons);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
