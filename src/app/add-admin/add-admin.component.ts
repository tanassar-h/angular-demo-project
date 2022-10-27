import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  adminForm: FormGroup;
  displayColumns: string[] = ["Name", 'Email', 'Phone', 'Address', 'Password'];
  adminDetail: any
  respdata: any;
  success!: string;
  errorMsg: any
  data:any
  hidden:Boolean = true
  searchbar: FormGroup
  constructor( private RF: FormBuilder, private routes: Router, private _adminService: AdminService) {

    this.adminForm = RF.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      roles: ['']
    });

    this.searchbar = RF.group({
      email: ['', [Validators.required, Validators.email]],
    });

   }

  ngOnInit(): void {
    this.getAllData()
  }
  getAllData() {
    this._adminService.getAllAdmin().subscribe(item => {
      this.adminDetail = item;
    })
  }

  postData(): void {
    console.log(this.adminForm.value)
     this._adminService.createAdmin(this.adminForm.value).subscribe(item => {
     console.log( item)
       this.success = 'Admin Registered Successfully'
       this.reloadCurrentRoute()
     })

    }
    reloadCurrentRoute() {
      const currentUrl = this.routes.url;
      this.routes.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.routes.navigate([currentUrl]);
      });
  }

  search()
  {
    this._adminService.getSingleuser(this.searchbar.get('email')?.value).subscribe(item =>
      {
        this.data = item
        console.log(this.data)
        this.searchbar.reset()
        this.errorMsg = false
        this.hidden = false
      }, (error)=>
      {
        this.errorMsg = true
        this.hidden = false
        //this.errorMsg = false
      })

  }
    resetData() {
      this.adminForm.reset()
    }




}






