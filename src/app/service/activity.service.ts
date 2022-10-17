import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  baseUrl = "http://localhost:3000/posts"

  constructor(private http: HttpClient) { }

  getActivity():Observable<any>
  {
    return this.http.get(this.baseUrl)
  }

  postActivity(activity:any):Observable<any>
  {
    console.log(activity)
    return this.http.post(this.baseUrl , activity)
  }

  deleteActivity (id:any):Observable<any>
  {
    let ids = id
    return this.http.delete(`${this.baseUrl}/${ids}`)
  }

  editActivity(data:any , id:any):Observable<any>{
    let ids = id
    return this.http.put(`${this.baseUrl}/${ids}`, data)
  }
}
