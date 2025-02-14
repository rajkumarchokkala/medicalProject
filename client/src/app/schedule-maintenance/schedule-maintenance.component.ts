// import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';


// @Component({
//   selector: 'app-schedule-maintenance',
//   templateUrl: './schedule-maintenance.component.html',
//   styleUrls: ['./schedule-maintenance.component.scss']
// })
// export class ScheduleMaintenanceComponent implements OnInit 
// {
//   // schedule code
//   itemForm: FormGroup;
//   formModel: any = { status: null };
//   showError: boolean = false;
//   errorMessage: any;
//   hospitalList: any = [];
//   assignModel: any = {};
//   showMessage: any;
//   responseMessage: any;
//   equipmentList: any = [];
//   equipmentId: any;
//   selectedEquipments: any;
//   selectedHospitalId:any;

//   constructor(private fb: FormBuilder, private httpService: HttpService) {
//     this.itemForm = this.fb.group(
//       {
//         scheduledDate: ['', [Validators.required]],
//         completedDate: ['', [Validators.required]],
//         description: ['', [Validators.required]],
//         status: ['', Validators.required],
//         // Add other form controls as needed
//       });
//   }

//   ngOnInit(): void {
//     this.getHospital();
//     this.loadEquipmentsForHospital(this.equipmentId);
//   }

//   dateValidator(control: AbstractControl):ValidationErrors|null
//   {
//     const pattern=/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
//     if(!pattern.test(control.value))
//     {
//       return {invalidDate:true};
//     }
//     return null;
//   }

//   getHospital(): void 
//   {
//     this.httpService.getHospital().subscribe((data) => 
//     {
//       this.hospitalList = data;
//     })
//   }


//   loadEquipmentsForHospital($event:any): void 
//   {
//     this.equipmentId=$event.target.value;

//     this.httpService.getEquipmentById(this.equipmentId).subscribe({
//       next:(equipments) => 
//       {
//         this.equipmentList = equipments;
//       },
//       error: (error) => console.error(`Error loading equipments for hospital ${this.equipmentId}:`, error)
//     });
//   }

  

//   onSubmit(): void {
//     if (this.itemForm.valid) {
//       this.httpService.scheduleMaintenance(this.itemForm.value,1).subscribe(
//         {
//           next: (data) => {
//             console.log(data);
//             this.showMessage = 'Form submitted successfully!';
//             this.responseMessage = this.itemForm.value;
//             alert('Form submitted successfully!');
//             this.itemForm.reset();
//           },
//           error: () => {
//             this.showError = true;
//             this.errorMessage = 'Please fill out all required fields.';
//           }
//         }
//       )
//     }
//     else {
//       this.itemForm.markAllAsTouched();
//     }
//   }
// }



import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
 
@Component({
  selector: 'app-schedule-maintenance',
  templateUrl: './schedule-maintenance.component.html',
  styleUrls: ['./schedule-maintenance.component.scss']
})
export class ScheduleMaintenanceComponent implements OnInit
{
  itemForm: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  hospitalList: any = [];
  assignModel: any = {};
  showMessage: boolean=false;
  successMessage:any;
  equipmentList: any = [];
  equipmentId: any;
  selectedEquipments: any;
  selectedHospitalId:any;
  newStatus=['Scheduled'];
 
  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.itemForm = this.fb.group(
      {
        scheduledDate: ['', [Validators.required,this.dateValidator]],
        completedDate: ['', [Validators.required,this.dateValidator]],
        description: ['', [Validators.required]],
        status: ['', Validators.required],
      },
      { validators: this.dateRangeValidator });
  }
 
  ngOnInit(): void {
    this.getHospital();
    this.loadEquipmentsForHospital(this.equipmentId);
  }
 
  dateValidator(control: AbstractControl):ValidationErrors|null
  {
    const pattern=/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    if(!pattern.test(control.value))
    {
      return {invalidDate:true};
    }
    return null;
  }
 
  dateRangeValidator(group: FormGroup): ValidationErrors | null {
    const startDate = group.controls['scheduledDate'].value;
    const endDate = group.controls['completedDate'].value;
 
    if (startDate && endDate && endDate < startDate)
    {
        return { 'dateRangeInvalid': true };
    }
    return null;
  }
 
  getHospital(): void
  {
    this.httpService.getHospital().subscribe((data) =>
    {
      this.hospitalList = data;
    })
  }
 
 
  loadEquipmentsForHospital($event:any): void
  {
    this.equipmentId=$event.target.value;
 
    this.httpService.getEquipmentById(this.equipmentId).subscribe({
      next:(equipments) =>
      {
        this.equipmentList = equipments;
      },
      error: (error) => console.error(`Error loading equipments for hospital ${this.equipmentId}:`, error)
    });
  }
 
 
 
  onSubmit(): void {
    if (this.itemForm.valid) {
      this.httpService.scheduleMaintenance(this.itemForm.value,1).subscribe(
        {
          next: () => {
            this.showMessage=true;
            this.successMessage = 'Form submitted successfully!';
            this.itemForm.reset();
            setTimeout(()=>
            {
              this.showMessage=false;
            },2000);
          },
          error: () => {
            this.showError = true;
            this.errorMessage = 'Cannot maintain a schedule';
            setTimeout(()=>
            {
              this.showMessage=false;
            },2000);
          }
        }
      )
    }
    else {
      this.itemForm.markAllAsTouched();
    }
  }
}