import { UserAuthService } from './user-auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  getallAdminurl = 'http://haalim-001-site1.dtempurl.com/api/Admin/GetAllUsers';
  getsingleDataurl = '	http://haalim-001-site1.dtempurl.com/api/Admin/AddUser';
  adminApi = ''
  requestHeader  = new HttpHeaders(
    {
      'Authorization':'Bearer ' + this._UserAuthService.getToken()
    }
  )
  
  constructor(private http: HttpClient , private _UserAuthService:UserAuthService) { }

  getAllAdmin():Observable<any>
  {
    return this.http.get(`${this.getallAdminurl}`)
  }
  public getProfile(): Observable<any>
  {

    return this.http.get(this.getsingleDataurl, {headers:this.requestHeader})
  }
  createAdmin(data:any):Observable<any>
  {
    return this.http.post(`${this.getAllAdmin}` ,data)
   
  }
  registration(data:any):Observable<any>
  {
    return this.http.post(`${this.adminApi}`, data)
  }
}
