import { UserAuthService } from './user-auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  getallAdminurl = '';
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
    return this.http.get(``)
  }
  public getProfile(): Observable<any>
  {

    return this.http.get(this.getsingleDataurl, {headers:this.requestHeader})
  }
  createAdmin(data:any):Observable<any>
  {
    console.log('serv' ,data)
    return this.http.post('http://haalim-001-site1.dtempurl.com/api/Admin/AddAdmin' , data)
   
  }
  registration(data:any):Observable<any>
  {
    return this.http.post(`${this.adminApi}`, data)
  }

  getSingleuser(email:any):Observable<any>
  {
    let user_email = email
    console.log(user_email)
    return this.http.get(`http://haalim-001-site1.dtempurl.com/api/Admin/GetUser/${user_email}`)
  }
}
