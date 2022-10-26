import { ActivityComponent } from './activity/activity.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AuthGuard } from './guard/auth.guard';

import { StatusComponent } from './status/status.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { UserActivityComponent } from './user-activity/user-activity.component';


const routes: Routes = [
  {path:'user' , component:UserComponent ,canActivate:[AuthGuard] , data:{roles:'both'}},
  {path:'activity' , component:ActivityComponent ,canActivate:[AuthGuard] , data:{roles:'admin'}},
  {path:'userActivity' , component:UserActivityComponent ,canActivate:[AuthGuard] , data:{roles:'user'}},
  {path:'userDashboard' , component:UserDashboardComponent  , canActivate:[AuthGuard] , data:{roles:'user'}},
  {path:'createAdmin' , component:AddAdminComponent , canActivate:[AuthGuard] , data:{roles:'admin'}},
  {path:'access' , loadChildren:()=>import('./access/access.module').then(opt=>opt.AccessModule)}
  ,
  {path:'login' , loadComponent:()=>import('./login/login.component').then(opt=>opt.LoginComponent)}
  ,
  {path:'' , component:HomeComponent , canActivate:[AuthGuard]}
  ,
  {path:'**' , component:StatusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
