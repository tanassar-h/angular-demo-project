import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../service/activity.service';

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
  urgent = 'text-danger';
  normal = 'text-success';
  moderate = 'text-warning'
  half: any
  dataHalf : any
  firstHalf: any;
  secondHalf: any;
  getparamid: any;
  constructor(private RF: FormBuilder, private _activityService: ActivityService , private routes : Router) {
    this.activityForm = this.RF.group({
      activitydiscription: ['', [Validators.required, Validators.minLength(3)]],
      activitytime: ['', [Validators.required]],
      activitypriority: ['', [Validators.required , Validators.minLength(3)]],
      assignbyemail: ['', [Validators.required, Validators.email]],
      assigntoemail: ['', [Validators.required, Validators.email]],

    });

  
  }

  postData(): void {

    this._activityService.postActivity(this.activityForm.value).subscribe(res => {
      this.reset();
      this.success = 'Activity Is Assigned';
      this.getData()
    })

  }

  getData()
  {
    this._activityService.getActivity().subscribe(res=>
      {
        this.data = res;
        console.log(this.data)
        this.half = this.data.length / 2
        this.firstHalf = this.data.splice(0, this.half)
        this.secondHalf = this.data.splice(-this.half)
      

       
      })
  }
  delActivity(id:any)
  {
    this._activityService.deleteActivity(id).subscribe(res=>
      {
        this.success = res 
        this.getData() 

      }
    )
 }

  editAct(data:any)
  {
     this.activityForm.controls['activitydiscription'].setValue(data.activitydiscription);
     this.activityForm.controls['activitytime'].setValue(data.activitytime);
     this.activityForm.controls['activitypriority'].setValue(data. activitypriority);
     this.activityForm.controls['assignbyemail'].setValue(data.assignbyemail);
     this.activityForm.controls['assigntoemail'].setValue(data.assigntoemail);
     this.getparamid = (data.id)
     this.delActivity(this.getparamid)
 
  }


  editActivity()
  {

   if(this.activityForm.valid)
   {
     //console.log(this.getparamid)
     
     this._activityService.editActivity(this.activityForm.value , this.getparamid).subscribe()
    
     this.reloadCurrentRoute()

   }
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
