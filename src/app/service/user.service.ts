import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginApi = 'http://localhost:8000/api/user/login';
  signupApi = ''

  requestHeader  = new HttpHeaders(
    {
      'Authorization':'Bearer ' + this._userAuthService.getToken()
    }
  )
  constructor(private http: HttpClient, private _userAuthService: UserAuthService) { }

  public proceedLogin(loginData: any): Observable<any> // Jwt Token
  { 
    
    return this.http.post(`${this.loginApi}`, loginData , {headers:this.requestHeader});
  }



  public getProfile(): Observable<any>
  {

    return this.http.get('http://localhost:8000/api/user/loggeduser' , {headers:this.requestHeader})
  }

  
  public roleMatch(allowedRoles:any): any
  {
    let isMatch = false;
    const userRoles: any = this._userAuthService.getRoles()
    if(userRoles != null && userRoles == allowedRoles)
    {
      isMatch = true;
      return isMatch;
    }
    else
    {
      return isMatch
    }
  }
  registration(data:any)
  {
    return this.http.post(`${this.signupApi}`, data)
  }
  
}

