import { UserAuthService } from './user-auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminDataUrl = 'http://localhost:3000/admin'
  adminApi = ''
  requestHeader  = new HttpHeaders(
    {
      'Authorization':'Bearer ' + this._UserAuthService.getToken()
    }
  )
  
  constructor(private http: HttpClient , private _UserAuthService:UserAuthService) { }

  getAllAdmin():Observable<any>
  {
    return this.http.get(`${this.adminDataUrl}`)
  }
  public getProfile(): Observable<any>
  {

    return this.http.get('http://localhost:8000/api/user/loggeduser' , {headers:this.requestHeader})
  }
  createAdmin(data:any):Observable<any>
  {
    return this.http.post(`${this.adminDataUrl}` ,data)
   
  }
  registration(data:any)
  {
    return this.http.post(`${this.adminApi}`, data)
  }
}
