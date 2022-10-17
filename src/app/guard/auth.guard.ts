import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../service/user-auth.service';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _userService:UserService , private route:Router , private _userAuthService:UserAuthService)
  {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this._userAuthService.getToken() !== null) {

      const role = route.data['roles'];
  
      if(this._userAuthService.isLoggedin() && role === 'both')
      {
        
        //console.log(this._userAuthService.isLoggedin())
        return true;
      }
      if(this._userAuthService.isLoggedin() && role === 'activity')
      {
        
        //console.log(this._userAuthService.isLoggedin())
        return true;
      }
     // console.log(role)

      if (role) {
        const match = this._userService.roleMatch(role);

        if (match) {
          return true;
        } else {
          this.route.navigate(['**']);
          return false;
        }
      }
    }

    this.route.navigate(['/login']);
    return false;
  }
  
}
