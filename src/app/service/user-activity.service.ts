import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {

  constructor(private http: HttpClient) { }

  usergetActivity(id:any):Observable<any>
  {
    let ids = id;
    console.log(ids)
    return this.http.get(`http://haalim-001-site1.dtempurl.com/api/User/GetActivity/${ids}`)
  }

  userpostActivity(activity:any):Observable<any>
  {
    console.log(activity)
    return this.http.post(`http://haalim-001-site1.dtempurl.com/api/User/CreateActivity` , activity)
  }

  userdeleteActivity (id:any):Observable<any>
  {
    let ids = id
    return this.http.delete(`	http://haalim-001-site1.dtempurl.com/api/User/DeleteActivity/${ids}`)
  }

  usereditActivity(id:any , data:any):Observable<any>{
    console.log('service' , data)
    let ids = id
    return this.http.put(`http://haalim-001-site1.dtempurl.com/api/User/UpdateActivity/${ids}`, data)
  }
}
