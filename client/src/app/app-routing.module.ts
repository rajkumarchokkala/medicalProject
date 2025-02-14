import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';


import { AppComponent } from './app.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';


import { CreatehospitalComponent } from './createhospital/createhospital.component';
import { ScheduleMaintenanceComponent } from './schedule-maintenance/schedule-maintenance.component';
import { RequestequipmentComponent } from './requestequipment/requestequipment.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { OrdersComponent } from './orders/orders.component';
import { MaintenanceStatusComponent } from './maintenance-status/maintenance-status.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'dashboard', component: DashbaordComponent },
  { path: 'createhospital', component: CreatehospitalComponent },  
  { path: 'schedulemaintenance', component: ScheduleMaintenanceComponent },  
  { path: 'requestequipment', component: RequestequipmentComponent },  
  { path: 'maintenance', component: MaintenanceComponent }, 
  {path: 'maintenance/:id', component: MaintenanceComponent }, 
  { path: 'orders', component: OrdersComponent },  
  {path:'maintenance-status',component:MaintenanceStatusComponent},
  {path:'order-status',component:OrderStatusComponent},
  {path:'feedback-form/:id',component:FeedbackFormComponent},
  {path:'feedback-form',component:FeedbackFormComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
