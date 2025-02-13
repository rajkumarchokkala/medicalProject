import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { DatePipe } from '@angular/common';
 
 
@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss'],
  providers: [DatePipe]
})
export class MaintenanceComponent implements OnInit
{
  itemForm!: FormGroup;
  formModel:boolean=false;
  id:any;
  updateid: any;
  showError: boolean = false;
  errorMessage: any;
  assignModel: any = {};
  showMessage: any;
  responseMessage: any;
  maintenanceList: any = [];
  maintenanceObj: any = {};
  newStatus=['Initiated','Completed'];
  maintenanceId:number | any;
  isAdded:boolean=false;
 
  constructor(private service: HttpService, private fb: FormBuilder, private route: ActivatedRoute,private datePipe: DatePipe)
  {
    this.itemForm = this.fb.group({
      scheduledDate: ['', [Validators.required]],
      completedDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: [''],
    },
    { validators: this.dateValidator });
  }
 
  ngOnInit(): void
  {
    this.route.paramMap.subscribe(d=>
    {
      this.id=d.get('id');
    }
    )
    this.getMaintenance();
  }
 
  dateValidator(control: AbstractControl):ValidationErrors | null
  {
    const scheduledDate = control.get('scheduledDate')?.value;
    const endDate = control.get('completedDate')?.value;
    if (scheduledDate && endDate && new Date(scheduledDate) > new Date(endDate))
    {
      return { dateRangeInvalid: true }; // Return validation error
    }
    return null; // Valid
  }
 
  getMaintenance()
  {
    this.maintenanceList=this.service.getMaintenance().subscribe((data)=>
    {
      this.maintenanceList=data;
    })
  }
 
  update(maintenance:any)
  {
    const formattedTime = this.datePipe.transform(maintenance.scheduledDate,'dd-MMM-yyyy');
    this.itemForm.controls['scheduledDate'].setValue(formattedTime);
 
    const formattedTime1 = this.datePipe.transform(maintenance.scheduledDate,'dd-MMM-yyyy');
    this.itemForm.controls['scheduledDate'].setValue(formattedTime1);
 
    this.itemForm.controls['completedDate'].setValue(maintenance.completedDate);
    this.itemForm.controls['description'].setValue(maintenance.description);
    this.itemForm.controls['status'].setValue(maintenance.status);
    this.isAdded=true;
    this.maintenanceId=maintenance.id;
 
    const orderToEdit = this.maintenanceList.find((maintenance:any) => maintenance.id === this.maintenanceId);
    if (orderToEdit)
    {
      this.formModel=true;
    }
  }
 
  deleteMaintenance(id:any)
  {
    this.service.deleteMaintenance(id).subscribe(()=>this.getMaintenance());
  }
 
  onSubmit()
  {
    if (this.itemForm.valid)
    {
      console.log('hello');
      this.service.updateMaintenance(this.itemForm.value,this.maintenanceId).subscribe(
      {
          next:(data)=>
          {
            console.log(data);
            alert('updated successfully!');
            this.showMessage='updated successfully!';
            this.getMaintenance();
            this.itemForm.reset();
          },
          error:(error)=>
          {
            console.log(error);
            this.errorMessage='Cannot update the form';
          }
      }
      );
    }
  }
 
  closeedit()
  {
    this.formModel=false;
  }
 
 
}