import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMsg:any
  success: any
  registerForm: FormGroup;

  constructor(private RF: FormBuilder , private route:Router , private _userService: UserService ) 
  {
    this.registerForm = this.RF.group({
      firstname: ['',[Validators.required, Validators.minLength(3)]],
      email: ['',[Validators.required, Validators.email]],
      lastname: ['',[Validators.required, Validators.minLength(3)]],
      phone: ['',[Validators.required, Validators.minLength(3)]],
      address: ['',[Validators.required, Validators.minLength(3)]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirmpassword: ['',[Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void 
  {
  }
  respdata:any  
  postData():void 
  {

    if ( this.registerForm.get('password')?.value ==  this.registerForm.get('confirmpassword')?.value) 
    {
      this._userService.registration(this.registerForm.value).subscribe(item =>{
        this.respdata = item
      })
      this.success = 'User Registered Successfully'
      setTimeout(() => {
        this.close()
      }, 1000);
    } else 
    {
      this.errorMsg = 'Password Not Match';
    }


}
  resetData() 
  {
    this.registerForm.reset();
  }

  close()
  {
    this.route.navigate(['login'])
  }
}
