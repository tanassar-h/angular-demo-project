import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginApi = 'http://haalim-001-site1.dtempurl.com/api/Login/Login';
  signupApi = 'http://haalim-001-site1.dtempurl.com/api/User/SignUp'

  requestHeader  = new HttpHeaders(
    {
      'Authorization':'Bearer ' + this._userAuthService.getToken()
    }
  )
  constructor(private http: HttpClient, private _userAuthService: UserAuthService) { }

  public proceedLogin(loginData: any): Observable<any> // Jwt Token
  { 
    
    return this.http.post(`${this.loginApi}`,loginData , {headers:this.requestHeader});
  }

  

  public getProfile(): Observable<any>
  {

    return this.http.get(`http://haalim-001-site1.dtempurl.com/api/User/GetUserDetails/${this._userAuthService.getEmail()}` , {headers:this.requestHeader})
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
  public registration(data:any)
  {
    console.log('service' , data)
    return this.http.post(`http://haalim-001-site1.dtempurl.com/api/User/SignUp`,data)

  }
  
}

