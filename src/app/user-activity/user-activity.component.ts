import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivityService } from '../service/activity.service';
import { UserActivityService } from '../service/user-activity.service';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.css']
})
export class UserActivityComponent implements OnInit {

  useractivityForm: FormGroup;
  activityDisplay: any
  activity: any
  success: any
  data: any;
  msg:any
  half: any
  errorMsg: any
  getparamid: any;
  element: any
  isAssign: Boolean = true
  act: any
  active : Boolean = true
  searchbar: FormGroup
 
  constructor(private RF: FormBuilder, private _useractivityService: UserActivityService, private routes : Router , private _authService : UserAuthService ) {
    this.useractivityForm = this.RF.group({
      id: [''],
      description: ['', [Validators.required, Validators.minLength(3)]],
      time: ['', [Validators.required]],
      priorty: ['', [Validators.required , Validators.minLength(3)]],
      assignBy: [this._authService.getEmail(), [ Validators.email]],
      assignTo: ['', [Validators.required, Validators.email]],

    });


    this.searchbar = this.RF.group({
      id: ['', [Validators.required]]
    });
  
  }

  postData(): void {
    this.useractivityForm.removeControl('id'); //Remove Id from formControl
    this._useractivityService.userpostActivity(this.useractivityForm.value).subscribe(res => {
      this.success = 'Activity Is Assigned';
    },(error)=>
    {
      this.reset();
      console.log(error)
    })

  }

  getData()
  {
    this._useractivityService.usergetActivity('s').subscribe(res=>
      {
        this.data = res;
        console.log(this.data)
        //this.half = this.data.length / 2
        //t/his.firstHalf = this.data.splice(0, this.half)
        //this.secondHalf = this.data.splice(-this.half)
      

       
      })
  }
  delActivity(id:any)
  {
    this._useractivityService.userdeleteActivity(id).subscribe(res=>
      {
        this.success = res 
      

      }
      
    )
    this.active = true

 }

  editAct(data:any)
  {
    console.log(data)

     this.useractivityForm.controls['description'].setValue(data.description);
     this.useractivityForm.controls['time'].setValue(data.time);
     this.useractivityForm.controls['priorty'].setValue(data.priorty);
     this.useractivityForm.controls['assignBy'].setValue(data.assignBy);
     this.useractivityForm.controls['assignTo'].setValue(data.assignTo);
     this.getparamid = (data.id)
    //this.delActivity(this.getparamid)
 
  }

  search(id:any)
  {
    //console.log('sss' , id)
    let ids = id
    this._useractivityService.usergetActivity(ids).subscribe(item =>
      {
        this.act = item
        this.active = false
        this.searchbar.reset()
        this.errorMsg = false
   
      },
      (error)=>
      {
        this.errorMsg = true
        this.msg = 'User Not Exist'
        this.active = true
      })

  }

  editActivity()
  {

   if(this.useractivityForm.valid)
   {
     this.useractivityForm.patchValue({id: this.getparamid})
     this._useractivityService.usereditActivity(this.getparamid, this.useractivityForm.value).subscribe()
     this.active = true
     this.useractivityForm.reset()
   }
  }

  reloadCurrentRoute() {
   const currentUrl = this.routes.url;
   this.routes.navigateByUrl('/', {skipLocationChange: true}).then(() => {
       this.routes.navigate([currentUrl]);
   });
}

  ngOnInit(): void {
 
  }


  reset() {
    this.useractivityForm.reset()
  }

}
