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

  constructor( private RF: FormBuilder, private route: Router, private _adminService: AdminService) {

    this.adminForm = RF.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      password: ['',[Validators.required, Validators.minLength(6)]],
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
    // console.log(this.registerForm.value)
     this._adminService.createAdmin(this.adminForm.value).subscribe(item => {
       this.respdata = item;
       this.success = 'User Registered Successfully'
       this.getAllData()
     })
    }

    resetData() {
      this.adminForm.reset()
    }




}






