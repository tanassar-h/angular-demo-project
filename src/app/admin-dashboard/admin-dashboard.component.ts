import { AdminService } from './../service/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  data:any
  constructor(private _adminService : AdminService) { }

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile()
  {
    this._adminService.getProfile().subscribe((res)=>
    {
      {
        this.data = res.user // get Data form user
       // console.log(this.data)
      }
      
    },(error)=>
    {
      console.log(error)
    })
  }

}
