import { NgModule } from '@angular/core';
import {APP_BOOTSTRAP, APP_COMPONENTS, APP_IMPORTS, APP_PROVIDERS} from './app.metadata';

@NgModule({
  declarations: APP_COMPONENTS,
  imports: APP_IMPORTS,
  providers: APP_PROVIDERS,
  bootstrap: APP_BOOTSTRAP
})
export class AppModule { }
