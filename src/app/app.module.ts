import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { DialogComponent } from './component/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UpdateServiceComponent } from './components/update-service/update-service.component';
import { ToastrModule } from 'ngx-toastr';
import { SharedServiceService } from './components/services/shared-service.service';
import { MainDashboardComponent } from './components/dashboard/main-dashboard/main-dashboard.component';
import { LogDashboardComponent } from './components/dashboard/log-dashboard/log-dashboard.component';
import { SerivceLogsComponent } from './components/serivce-logs/serivce-logs.component';
// import { AngularSlickgridModule } from 'angular-slickgrid';
// import {DataTablesModule} from 'angular-datatables';
import {DataTablesModule} from 'angular-datatables';
import { NgxLoadingModule } from 'ngx-loading';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import { SnakecaseToCapitalcamelcasePipe } from './core/SnakecaseToCapitalcamelcasePipe';
import { FormsModule } from '@angular/forms';
import { TestCompComponent } from './components/test-comp/test-comp.component';
import { ModalComponent } from './components/modal/modal.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ServiceLogState } from './store/auxilo.state';
import { DatePipe } from '@angular/common';
import { ExportAsModule } from 'ngx-export-as';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Daterangepicker } from 'ng2-daterangepicker';


// import { ServiceLogState } from './components/store/auxilo.state';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    UpdateServiceComponent,
    MainDashboardComponent,
    LogDashboardComponent,
    SerivceLogsComponent,
    HeaderComponent,
    SnakecaseToCapitalcamelcasePipe,
    TestCompComponent,
    ModalComponent
   
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    // DataTablesModule,
    ToastrModule.forRoot(),
    DataTablesModule,
    NgxLoadingModule.forRoot({}),
    MatToolbarModule,
    NgxsModule.forRoot([ServiceLogState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    ExportAsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    Daterangepicker
    
    // AngularSlickgridModule.forRoot()
  
  ],
  providers: [SharedServiceService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
