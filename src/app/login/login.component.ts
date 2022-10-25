import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAuthService } from '../service/user-auth.service';
import jwt_decode from 'jwt-decode';
import { of } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  respdata: any
  errorMsg: any
  flag:boolean = false;
  

  constructor(
    private _userService: UserService, 
    private router: Router, 
    private _userAuthService : UserAuthService
    ) {
      
  }

  loginForm = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
  })
  login(): any {
    if (this.loginForm.valid) {
      //console.log(this.loginForm)
      this._userService.proceedLogin(this.loginForm.value).subscribe(
        (response:any) => {
          let tokenInfo:any = jwt_decode(response);
          if(response.status == 'failed')
          {
            this.errorMsg = response.message;
          }
          this._userAuthService.setRoles(tokenInfo.role)
          this._userAuthService.setToken(response);
          this._userAuthService.setEmail(tokenInfo.nameid)

          const role = tokenInfo.role;
          if(role === 'admin')
          {
            this.router.navigate(['adminDashboard']);
      
          }
          else
          {
          
            this.router.navigate(['userDashboard'])
          }
      }, (_error)=>
      {
        alert('Login Failed Server Error Try Again')
      })
    }
    else {

      this.errorMsg = 'All fields are required';
   
    }

  }

  redirectRegister()
  {
    this.router.navigate(['access/register'])
  }



  ngOnInit(): void {
  
  }

  
}
