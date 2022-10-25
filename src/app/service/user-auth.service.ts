import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles:any)
  {
    localStorage.setItem('roles' , roles);
  }

  public getRoles()
  {
    return localStorage.getItem('roles');
  }

  public setToken(jwtToken: any):any
  {
    localStorage.setItem('jwtToken' , jwtToken);
  }

  public getToken():any
  {
    return localStorage.getItem('jwtToken');
  }

  public clear()
  {
    localStorage.clear();
  }
  
  public setEmail(email : any)
  {
    return localStorage.setItem('email' , email)
  }
  public getEmail()
  {
    return localStorage.getItem('email')
  }
  public isLoggedin()
  {
     return this.getRoles() && this.getToken();
  }
}
