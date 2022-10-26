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
  errorMsg: any;

  constructor(private _serviceCrud: UserCrudService, private RF: FormBuilder, private _userService : UserService, private routes: Router, private _userAuthService : UserAuthService) {

    this.registerForm = this.RF.group({
      fisrtName: ['',[Validators.required, Validators.minLength(3)]],
      email: ['',[Validators.required, Validators.email]],
      lastName: ['',[Validators.required, Validators.minLength(3)]],
      mobileNo: ['',[Validators.required, Validators.minLength(3)]],
      address: ['',[Validators.required, Validators.minLength(3)]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirmpassword: ['',[Validators.required, Validators.minLength(6)]],
      roles: ['']
    });

    this.editForm = RF.group({
      fisrtName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      mobileNo: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      roles: ['']
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

    if ( this.registerForm.get('password')?.value === this.registerForm.get('confirmpassword')?.value) 
    {
      let regData = this.registerForm.value;
      delete regData.confirmpassword;
      console.log(regData)
      this._serviceCrud.createUser(regData).subscribe()
      this.getAllData()
      this.success = 'User Registered Successfully'
      this.reloadCurrentRoute()

    } else 
    {
      this.errorMsg = 'Password Not Match';
    }

  
  }

  getAllData()
  {
    this._serviceCrud.getAllUser().subscribe(item => {
      this.userDetail = item;
      console.log(this.userDetail)
    })
  }

  deleteID(email: any) {
    this._serviceCrud.deleteUser(email).subscribe((res) => {
      this.success = res.message

      // instant load data
     // this.api.getAllUser().subscribe((res) => {
       // console.log('Get All User', res);
       // this.readUser = res.data;
     // })
     
   })
   setTimeout(() => {
    this.reloadCurrentRoute()
    this.getAllData()

   }, 1000);
  }

   updateID(data:any)
   {
    this.editForm.controls['fisrtName'].setValue(data.fisrtName);
    this.editForm.controls['lastName'].setValue(data.lastName);
    this.editForm.controls['email'].setValue(data.email);
    this.editForm.controls['mobileNo'].setValue(data.mobileNo);
    this.editForm.controls['address'].setValue(data.address);
    this.editForm.controls['roles'].setValue(data.roles)
    this.getparamid = (data.email)

   }

   editData()
   {
    if (localStorage.getItem('roles') === 'user')
    {
      if(this.editForm.valid)
      {
        //console.log(this.getparamid)
        this._serviceCrud.updateUser(this.editForm.value , this.getparamid).subscribe()
       // this.getAllData()
        //this.reloadCurrentRoute()
     
        
   
      }
      setTimeout(() => {
        this.reloadCurrentRoute()
    
       }, 1000);
    }
    else
    {
      if(this.editForm.valid)
      {
        //console.log(this.getparamid)
        this._serviceCrud.updateuserbyAadmin(this.editForm.value , this.getparamid).subscribe()
       this.getAllData()
       this.reloadCurrentRoute()
 
      }
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
    this._userService.getProfile().subscribe((res)=>
    {
      {
        // get Data form user
        this.userDetail = [res]
        //console.log(res)
      }
      
    },(error)=>
    {
      console.log(error)
    })
  }



}