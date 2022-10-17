import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from './service/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {

  constructor(private route:Router , private _userAuthService : UserAuthService) {}
  title = 'angular-demo-project';
  
  menuVisible: boolean = true;
  dashboardAdmin: boolean = false;
  dashboardUser: boolean = false;

  ngDoCheck(): void {
    const currentRoute = this.route.url;
    if(currentRoute == '/login' || currentRoute == '/access/register')
    {
      this.menuVisible = false;
    }
    else
    {
      this.menuVisible = true;
    }

    if(this._userAuthService.getRoles() == 'admin')
    {
     this.dashboardAdmin = true;
     this.dashboardUser = false;
    }
    else
    {
      this.dashboardUser = true;
      this.dashboardAdmin = false;
    }
  }

  logout()
  {
    this._userAuthService.clear();
    this.route.navigate(['login'])
  }
  

}
