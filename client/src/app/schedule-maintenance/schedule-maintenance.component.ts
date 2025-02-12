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
  showMessage: any;
  responseMessage: any;
  equipmentList: any = [];
  equipmentId: any;
  selectedEquipments: any;
  selectedHospitalId:any;

  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.itemForm = this.fb.group(
      {
        scheduledDate: ['', [Validators.required]],
        completedDate: ['', [Validators.required]],
        description: ['', [Validators.required]],
        status: ['', Validators.required],
        // Add other form controls as needed
      });
  }

  ngOnInit(): void {
    this.getHospital();
    this.loadEquipmentsForHospital(this.equipmentId);
    //this.onHospitalSelect(this.equipmentId);
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

  getHospital(): void 
  {
    this.httpService.getHospital().subscribe((data) => 
    {
      this.hospitalList = data;
    })
  }

  // loadEquipmentsForHospital(hospitalId: any): void 
  // {
  //   this.httpService.getEquipmentById(hospitalId).subscribe({
  //     next: (equipments) => 
  //     {
  //       this.selectedEquipments = equipments;
  //     },
  //     error: (error) => console.error(`Error loading equipments for hospital ${hospitalId}:`, error)
  //   })
  // }

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

  // onHospitalSelect(hospital: any): void 
  // {
  //   this.selectedHospitalId = hospital.id;
  //   this.httpService.getEquipmentById(this.selectedHospitalId).subscribe({
  //       next: (hospitals) => {
  //           this.equipmentList = hospitals;
  //       },
  //       error: (error) => console.error(`Error loading hospitals for equipment ${hospital.id}:`, error)
  //   })
  // }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.httpService.scheduleMaintenance(this.itemForm.value,1).subscribe(
        {
          next: (data) => {
            console.log(data);
            this.showMessage = 'Form submitted successfully!';
            this.responseMessage = this.itemForm.value;
            alert('Form submitted successfully!');
            this.itemForm.reset();
          },
          error: () => {
            this.showError = true;
            this.errorMessage = 'Please fill out all required fields.';
          }
        }
      )
    }
    else {
      this.itemForm.markAllAsTouched();
    }
  }
}