import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {

  apiUrl = 'http://haalim-001-site1.dtempurl.com/api/Admin/GetAllUsers'
  
  createUrl = ""   // create User
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
    console.log(data)
     return this.http.post(`http://haalim-001-site1.dtempurl.com/api/Admin/AddUser` ,data)
     
   }
 
   deleteUser(id:any):Observable<any>
   {
     let ids = id
     return this.http.delete(`http://haalim-001-site1.dtempurl.com/api/Admin/DeleteUser/${ids}`)
   }
 

   updateUser (data:any , id:any):Observable<any>{
    console.log(data)
    console.log(id)
     let ids = id
     return this.http.put(`http://haalim-001-site1.dtempurl.com/api/User/UpdateUserDetails/${ids}`,data)
   }

   updateuserbyAadmin(data:any , id:any):Observable<any>
   {
  	
    let ids = id
    return this.http.put(`http://haalim-001-site1.dtempurl.com/api/Admin/UpdateUser/${ids}`,data)
   }
}
