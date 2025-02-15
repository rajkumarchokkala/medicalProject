import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-maintenance-status',
  templateUrl: './maintenance-status.component.html',
  styleUrls: ['./maintenance-status.component.scss']
})
export class MaintenanceStatusComponent implements OnInit {

  maintenanceList: any = [];
  hospitalList=[];
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
    this.getHospitals();
    this.getMaintenance();
  }

  getHospitals()
  {
    this.httpService.getHospital().subscribe((data)=>
    {
      this.hospitalList=data;
    })
  }

  getMaintenance()
  {
    this.maintenanceList=this.httpService.getMaintenance().subscribe((data)=>
    {
      this.maintenanceList=data;
    })
  }

  addFeedback(id:any)
  {
   
    
    this.maintenanceId=id;
    console.log(this.maintenanceId);
    this.feedForm=true;
  }

  closeshowRejectModal()
  {
    this.feedForm = false;
  }

  onSubmit()
  {
    console.log("Before adding");
    this.httpService.addFeedbackByMaintenanceId(this.feedbackForm.value,this.maintenanceId).subscribe(
      {
        next:()=>
          {
            console.log("After adding");
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
