import {Route, RouterModule} from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardComponent} from './main-page/dashboard/dashboard.component';
import {NewComponent} from './main-page/new/new.component';
import {ApprovedComponent} from './main-page/approved/approved.component';
import {ClosedComponent} from './main-page/closed/closed.component';
import {NotificationsComponent} from './main-page/notifications/notifications.component';
import {MarketinfoComponent} from './main-page/marketinfo/marketinfo.component';
import {RequestsComponent} from './main-page/requests/requests.component';
/**
 * Created by root on 6/3/17.
 */
export const APP_ROUTES: Route[] = [
  {path: 'loginpage', component: LoginPageComponent},
  {
    path: 'mainpage',
    component: MainPageComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'requests', component: RequestsComponent},
      {path: 'new', component: NewComponent},
      {path: 'approved', component: ApprovedComponent},
      {path: 'closed', component: ClosedComponent},
      {path: 'report', component: NotificationsComponent},
      {path: 'marketinfo', component: MarketinfoComponent},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },
  {path: '', redirectTo: 'loginpage', pathMatch: 'full'}
];


