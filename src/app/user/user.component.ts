import { Observable } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import { Component, OnInit , DoCheck, OnChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../service/user-auth.service';
import { UserCrudService } from '../service/user-crud.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit  {
  registerForm: FormGroup;
  success: string = '';
  userDetail : any
  respdata : any;
  getparamid: any
  displayColumns: string[] = ["First Name", 'Last Name', 'Email', 'Phone', 'Address']
  editForm: FormGroup;
  isVisible:boolean = false
  data: any;
  show: boolean = false;
  getData: any

  constructor(private _serviceCrud: UserCrudService, private RF: FormBuilder, private _userService : UserService, private routes: Router, private _userAuthService : UserAuthService) {

    this.registerForm = RF.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.editForm = RF.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
    });

  }
  ngOnInit(): void {
    if(this._userAuthService.getRoles() == 'admin')
    {
    
      this.isVisible = true
      this.getAllData();
    }
    else
    {
    
      this.isVisible = false
      this.show = true;
      this.getProfile()

    }
    
  
  }


  postData(): void {
   // console.log(this.registerForm.value)
    this._serviceCrud.createUser(this.registerForm.value).subscribe(item => {
      this.respdata = item;
      this.success = 'User Registered Successfully'
      this.getAllData()
    })
  
  }

  getAllData()
  {
    this._serviceCrud.getAllUser().subscribe(item => {
      this.userDetail = item;
      //console.log(this.userDetail)
    })
  }

  deleteID(id: any) {
    console.log(id);
    this._serviceCrud.deleteUser(id).subscribe((res) => {
      this.success = res.message


      // instant load data
     // this.api.getAllUser().subscribe((res) => {
       // console.log('Get All User', res);
       // this.readUser = res.data;
     // })
     this.getAllData()
   })}

   updateID(data:any)
   {
    this.editForm.controls['firstname'].setValue(data.firstname);
    this.editForm.controls['lastname'].setValue(data.lastname);
    this.editForm.controls['email'].setValue(data.email);
    this.editForm.controls['phone'].setValue(data.phone);
    this.editForm.controls['address'].setValue(data.address);
    this.getparamid = (data.id)

   }

   editData()
   {

    if(this.editForm.valid)
    {
      //console.log(this.getparamid)
      this._serviceCrud.updateUser(this.editForm.value , this.getparamid).subscribe()
      this.reloadCurrentRoute()
 
    }
   }

   reloadCurrentRoute() {
    const currentUrl = this.routes.url;
    this.routes.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.routes.navigate([currentUrl]);
    });
}

  resetData()
  {
    this.registerForm.reset()
  }

  getProfile()
  {
    this._userService.getProfile().subscribe((res: { user: any; })=>
    {
      {
        // get Data form user
        this.userDetail = [res.user]
      }
      
    },(error)=>
    {
      console.log(error)
    })
  }



}