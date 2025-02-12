import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
 
 
@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit 
{
  //todo: complete missing code...
  itemForm!: FormGroup;
  formModel:boolean=false;
  id:any;
  updateid: any;
  // formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  assignModel: any = {};
  showMessage: any;
  responseMessage: any;
  maintenanceList: any = [];
  maintenanceObj: any = {};
  newStatus=['Initiated','Completed'];
 
  constructor(private service: HttpService, private fb: FormBuilder, private route: ActivatedRoute) 
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
    this.route.params.subscribe((param) => {
      this.updateid = param['id'];
      this.service.getMaintananceById(this.updateid).subscribe((d) => {
        this.itemForm.patchValue(d[0]);
      });
    });
 
    this.getMaintenance();
  }
 
  
 
  // dateValidator(con: AbstractControl): ValidationErrors | null {
  //   const dataPat = /^\d{2}-\d{2}-\d{4}$/;
  //   if (!dataPat.test(con.value)) {
  //     return { in: true };
  //   }
  //   return null;
  // }
 
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
 
  updateMaintenance() {
    if (this.itemForm.valid) {
      this.service.updateMaintenance(this.updateid, this.itemForm.value).subscribe(
        (response: any) => {
          this.responseMessage = 'Maintenance updated successfully!';
          // this.getMaintenance();
        },
        (error: any) => {
          this.showError = true;
          this.errorMessage = error.message;
        }
      );
    } else {
      this.showError = true;
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
  closeedit(){
    this.formModel=false;
  }

  onClick(id:any){
    this.formModel=true;
    this.id=id;
  }
}