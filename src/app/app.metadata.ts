/**
 * Created by root on 6/3/17.
 */
import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {APP_ROUTES} from './app.routes';
import {LoginPageComponent} from './login-page/login-page.component';
import {MainPageModule} from './main-page/main-page.module';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

export const APP_COMPONENTS = [
  AppComponent,
  LoginPageComponent
];

export const APP_IMPORTS = [
  BrowserModule,
  FormsModule,
  HttpModule,
  MainPageModule,
  RouterModule.forRoot(APP_ROUTES, {
    useHash: true
  })
];

export const APP_PROVIDERS = [{provide: LocationStrategy, useClass: HashLocationStrategy}];

export const APP_BOOTSTRAP = [
  AppComponent
];

