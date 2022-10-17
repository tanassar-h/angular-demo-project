import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

   data : any = ''

  constructor(public _userService: UserService) 
  { 
  }

  getProfile()
  {
    this._userService.getProfile().subscribe((res)=>
    {
      {
        this.data = res.user // get Data form user
        //console.log(this.data)
      }
      
    },(error)=>
    {
      console.log(error)
    })
  }
  ngOnInit(): void {
    this.getProfile()
  }

}
