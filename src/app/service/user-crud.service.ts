import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {

  apiUrl = 'http://localhost:3000/profile'
  
  createUrl = "http://localhost:3000/profile"   // create User
  constructor(private http:HttpClient) { }

 
   getAllUser():Observable<any>
   {
     return this.http.get(`${this.apiUrl}`)
   }

   getUserbyId(id:any):Observable<any>
   {
    let ids = id;
    return this.http.get(`${this.createUrl}/${ids}`)
   }
   
   createUser(data:any):Observable<any>
   {
     return this.http.post(`${this.createUrl}` ,data)
     
   }
 
   deleteUser(id:any):Observable<any>
   {
     let ids = id
     return this.http.delete(`${this.createUrl}/${ids}`)
   }
 

   updateUser (data:any , id:any):Observable<any>{
     let ids = id
     return this.http.put(`${this.createUrl}/${ids}`, data)
   }
}
