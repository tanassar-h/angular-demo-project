import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  baseUrl = "http://localhost:3000/posts"

  constructor(private http: HttpClient , private _userAuthService: UserAuthService) { }

  getActivity():Observable<any>
  {
    return this.http.get('http://haalim-001-site1.dtempurl.com/api/Admin/GetAllActivities')
  }

  postActivity(activity:any):Observable<any>
  {
    console.log(activity)
    return this.http.post(`http://haalim-001-site1.dtempurl.com/api/Admin/CreateActivity` , activity)
  }

  deleteActivity (id:any):Observable<any>
  {
    let ids = id
    console.log(ids)
    return this.http.delete(`http://haalim-001-site1.dtempurl.com/api/Admin/ DeleteActivity/${ids}`)
  }

  editActivity(data:any , id:any):Observable<any>{
    let ids = id
    return this.http.put(`http://haalim-001-site1.dtempurl.com/api/Admin/UpdateActivity/${ids}`, data)
  }
}
