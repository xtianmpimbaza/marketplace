/**
 * Created by root on 6/3/17.
 */
import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MainPageComponent} from './main-page.component';
import {
  BsDropdownModule, ModalModule, PaginationModule, PopoverModule,
  TooltipModule
} from 'ngx-bootstrap';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NewComponent} from './new/new.component';
import {ApprovedComponent} from './approved/approved.component';
import {ClosedComponent} from './closed/closed.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {MarketinfoComponent} from './marketinfo/marketinfo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GlobalService} from '../_providers/global.service';
import {RequestsComponent} from './requests/requests.component';
import {ChartsModule} from 'ng2-charts';
import {MyDatePickerModule} from 'mydatepicker/src/my-date-picker/my-date-picker.module';
import {AddrequestService} from "../_providers/addrequest.service";
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    ChartsModule,
    MyDatePickerModule,
    PopoverModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  declarations: [
    MainPageComponent,
    DashboardComponent,
    NewComponent,
    ApprovedComponent,
    ClosedComponent,
    NotificationsComponent,
    RequestsComponent,
    MarketinfoComponent
  ],
  exports: [
    MainPageComponent
  ],
  providers: [GlobalService,AddrequestService]
})

export class MainPageModule {
}
