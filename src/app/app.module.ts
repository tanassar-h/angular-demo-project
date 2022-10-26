import { AuthInterceptor } from './guard/auth.interceptor';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatusComponent } from './status/status.component';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { ActivityComponent } from './activity/activity.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { UserService } from './service/user.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { UserActivityComponent } from './user-activity/user-activity.component';


@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,

    AddcontactComponent,
    UserComponent,
    ActivityComponent,
    AddAdminComponent,
    UserDashboardComponent,
    HomeComponent,
    UserActivityComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule

  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass:AuthInterceptor, 
      multi:true
    } , UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
