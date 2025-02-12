import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-requestequipment',
  templateUrl: './requestequipment.component.html',
  styleUrls: ['./requestequipment.component.scss']
})
export class RequestequipmentComponent implements OnInit
{
  itemForm!:FormGroup;
  formModel:any={status:null};
  showError:boolean=false;
  errorMessage:any;
  hospitalList:any=[];
  assignModel:any={};
  showMessage:any;
  responseMessage:any;
  equipmentList:any=[];
  statusFelids=["Intiated","Completed"];
  equipmentId:any;
  hospitalId:any;
  value:any;
  constructor(private httpService:HttpService,private fb:FormBuilder){}
  ngOnInit(): void {
    this.itemForm=this.fb.group({
      // hospital:['',Validators.required],
      // equipment:['',Validators.required],
      orderDate:['',[Validators.required,this.dateValidator]],
      status:['',Validators.required],
      quantity:[0,[Validators.required,Validators.min(1)]],
    });
    this.getHospital();
    this.onHospitalSelect(this.equipmentId);
  }

  getHospital()
  {
    this.httpService.getHospital().subscribe((data)=>
    {
      this.hospitalList=data;
    });

  }

  dateValidator(control:AbstractControl):ValidationErrors | null{
    const datePattern=/^\d{4}-\d{2}-\d{2}$/;
    if(!datePattern.test(control.value)){
      return {inval:true}
    }
    return null;
  }

  onHospitalSelect(event:any)
  {
    // this.assignModel = this.itemForm.get('hospital');
    // const selectedHospitalId=this.assignModel.id;
    //const selectedHospitalId = this.itemForm.get('hospital');
    
    this.equipmentId=event.target.value;
    this.httpService.getEquipmentById(this.equipmentId).subscribe((data) =>
      {
        console.log(data);
      this.equipmentList = data;
    });
    
  }
  onSubmit()
  {
    console.log("Inside the method");
    if(this.itemForm.valid)
      {
        console.log("Inside the method with valid Data");
        console.log(this.itemForm.value);
      this.httpService.orderEquipment(this.itemForm.value,this.equipmentId).subscribe(
        {

          next:(data)=>
          {
            console.log(data);
            console.log("Success");
            alert('Ordered');
            this.itemForm.reset();
          },
          error:(error)=>
          {
            console.log(error); 
          }
        })
      //   {
      //   this.itemForm.reset();
      //   alert("Ordered");
      // });
    }
    else
    {
      this.itemForm.markAllAsTouched();
    }
  }



}

