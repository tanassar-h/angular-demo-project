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
      fisrtName: ['',[Validators.required, Validators.minLength(3)]],
      email: ['',[Validators.required, Validators.email]],
      lastName: ['',[Validators.required, Validators.minLength(3)]],
      mobileNo: ['',[Validators.required, Validators.minLength(3)]],
      address: ['',[Validators.required, Validators.minLength(3)]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      confirmpassword: ['',[Validators.required, Validators.minLength(6)]],
      roles: ['']
    });
  }

  ngOnInit(): void 
  {
  }
  respdata:any  
  public postData()
  {
    

    if ( this.registerForm.get('password')?.value === this.registerForm.get('confirmpassword')?.value) 
    {
      let regData = this.registerForm.value;
      delete regData.confirmpassword;
      console.log(regData)
      this._userService.registration(regData).subscribe()
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
