import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Maintenance } from './maintenance';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-maintenance-status',
  templateUrl: './maintenance-status.component.html',
  styleUrls: ['./maintenance-status.component.scss']
})
export class MaintenanceStatusComponent implements OnInit {

  maintenanceList:Maintenance[]=[];
  maintenanceId:any;
  feedbackForm!:FormGroup;
  feedForm:boolean=false;
  showMessage:boolean=false;
  successMessage:any;
  showError:boolean=false;
  errorMessage:any;

  constructor(private httpService:HttpService,private fb:FormBuilder) 
  { 
    
  }

  ngOnInit(): void 
  {
    this.feedbackForm=this.fb.group
    (
      {
        feedbackText:['',[Validators.required]],
        rating:['',[Validators.required,Validators.min(1)]],
        recommend:['',[Validators.required]]
      }
    )
    this.getAllMaintenance();
  }

  getAllMaintenance()
  {
    this.httpService.getMaintenance().subscribe((data)=>
    {
      this.maintenanceList=data;
    })
  }

  addFeedback(maintenance:Maintenance)
  {
    this.maintenanceId=maintenance.id;
    this.feedForm=true;
  }

  closeshowRejectModal()
  {
    this.feedForm = false;
  }

  onSubmit()
  {
    this.httpService.addFeedbackByMaintenanceId(this.feedbackForm.value,this.maintenanceId).subscribe(
      {
        next:()=>
          {
            this.showMessage=true;
            this.successMessage='Feedback submitted successfully!'
            this.feedbackForm.reset();
            setTimeout(()=>
            {
              this.showMessage=false;
              this.feedForm=false;
            },2000);
          },
          error:()=>
          {
            this.showError=true;
            this.errorMessage="Cannot submit feedback";
            this.feedForm=false;
          }
      }
    )
  }

}
