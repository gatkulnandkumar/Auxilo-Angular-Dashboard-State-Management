import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogDashboardComponent } from './components/dashboard/log-dashboard/log-dashboard.component';
import { MainDashboardComponent } from './components/dashboard/main-dashboard/main-dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { SerivceLogsComponent } from './components/serivce-logs/serivce-logs.component';
import { TestCompComponent } from './components/test-comp/test-comp.component';
import { UpdateServiceComponent } from './components/update-service/update-service.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'forgotpassword', component: ForgotPasswordComponent},
  { path: 'mainDashboard', component: MainDashboardComponent, canActivate:[AuthGuard],}, 
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard],}, 
  { path: 'logs-dashboard', component: LogDashboardComponent,canActivate:[AuthGuard],},
  { path: 'serviceLog', component: SerivceLogsComponent,canActivate:[AuthGuard],},
  { path: 'updateService', component: UpdateServiceComponent, canActivate:[AuthGuard],}, 
  { path: 'test', component: TestCompComponent, canActivate:[AuthGuard],},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
