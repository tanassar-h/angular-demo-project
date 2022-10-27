import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../service/activity.service';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activityForm: FormGroup;
  activityDisplay: any
  activity: any
  success: any
  data: any;
  flagA: Boolean = true
  flagB: Boolean = false
  getparamid: any;
  element: any
  isAssign: Boolean = true
  del: any
  
  constructor(private RF: FormBuilder, private _activityService: ActivityService , private routes : Router , private _authService : UserAuthService ) {
    this.activityForm = this.RF.group({
      id: [''],
      description: ['', [Validators.required, Validators.minLength(3)]],
      time: ['', [Validators.required]],
      priorty: ['', [Validators.required , Validators.minLength(3)]],
      assignBy: [this._authService.getEmail(), [ Validators.email]],
      assignTo: ['', [Validators.required, Validators.email]],

    });

  
  }

  postData(): void {



    this._activityService.postActivity(this.activityForm.value).subscribe(res => {
      this.reset();
      this.success = 'Activity Is Assigned';
      this.getData()
    },(error)=>
    {
      this.reset();
      console.log(error)
    })

  }

  getData()
  {
    this._activityService.getActivity().subscribe(res=>
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
    this._activityService.deleteActivity(id).subscribe(res=>
      {
        this.success = res 
        console.log('ok')
        this.getData() 

      }
    )
   setTimeout(() => {
    this.del = 'Activity Delete Succesfully'
    this.reloadCurrentRoute()
    this.getData() 

   }, 1000);

 }

  editAct(data:any)
  {
    console.log(data)
    this.flagA = false
    this.flagB = true
     this.activityForm.controls['description'].setValue(data.description);
     this.activityForm.controls['time'].setValue(data.time);
     this.activityForm.controls['priorty'].setValue(data. priorty);
     this.activityForm.controls['assignBy'].setValue(data.assignBy);
     this.activityForm.controls['assignTo'].setValue(data.assignTo);
     this.getparamid = (data.id)
    //this.delActivity(this.getparamid)
 
  }


  editActivity()
  {

   if(this.activityForm.valid)
   {
     //console.log(this.getparamid)
     this.activityForm.patchValue({id: this.getparamid})
     this._activityService.editActivity(this.activityForm.value , this.getparamid).subscribe()

   }
   setTimeout(() => {
    this.success = 'Activity Is Edit Successfully';
    this.reloadCurrentRoute()
    this.getData() 

   }, 1000);
  }

  reloadCurrentRoute() {
   const currentUrl = this.routes.url;
   this.routes.navigateByUrl('/', {skipLocationChange: true}).then(() => {
       this.routes.navigate([currentUrl]);
   });
}

  ngOnInit(): void {
    this.getData()
  }


  reset() {
    this.activityForm.reset()
  }
}
