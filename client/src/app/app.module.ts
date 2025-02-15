import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
 

 
 
import { RegistrationComponent } from './registration/registration.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
 
 
 
import { CreatehospitalComponent } from './createhospital/createhospital.component';
import { ScheduleMaintenanceComponent } from './schedule-maintenance/schedule-maintenance.component';
import { RequestequipmentComponent } from './requestequipment/requestequipment.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { OrdersComponent } from './orders/orders.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaintenanceStatusComponent } from './maintenance-status/maintenance-status.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
      RegistrationComponent,
      DashbaordComponent,
      CreatehospitalComponent,
      ScheduleMaintenanceComponent,
      RequestequipmentComponent,
      MaintenanceComponent,
      OrdersComponent,
      MaintenanceStatusComponent,
      OrderStatusComponent,
      FeedbackFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule ,
    MatSnackBarModule,
    BrowserAnimationsModule
 
  ],
  providers: [HttpService,HttpClientModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }