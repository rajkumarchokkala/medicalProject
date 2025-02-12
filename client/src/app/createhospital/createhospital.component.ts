import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-createhospital',
  templateUrl: './createhospital.component.html',
  styleUrls: ['./createhospital.component.scss']
})
export class CreatehospitalComponent implements OnInit 
{
  itemForm!:FormGroup;
  equipmentForm!:FormGroup;
  // formModel:any={status:null};
  showError:boolean=false;
  errorMessage:any;
  hospitalList:any=[];
  assignModel:any={};
  showMessage:any;
  responseMessage:any;
  formModal : boolean = false;
  id:any;
  

  constructor(private httpService:HttpService,private fb:FormBuilder)
  {

  }
  
  ngOnInit(): void 
  {
    this.itemForm=this.fb.group(
      {
        name:['',[Validators.required]],
        location:['',[Validators.required]]
      }
    );
    this.equipmentForm=this.fb.group({
      name:['',Validators.required],
      description:['',Validators.required]
    });
    this.hospitalList=this.getHospital();
  }
 
  getHospital()
  {
    this.httpService.getHospital().subscribe((data)=>
    {
      this.hospitalList=data;
    });
  }

  onSubmit()
  {
    if(this.itemForm.valid){
      this.httpService.createHospital(this.itemForm.value).subscribe(
        {
          next:(data)=>
          {
            alert('Hospital added successfully');
            console.log(data);
          },
          error:(error)=>
          {
            const errorMessage="Cannot create hospital";
            console.error(errorMessage);
          }
        }
      )

      
    }
  }

  Addequipment(value:any)
  {
    this.formModal = true;
    this.id=value;
  }

  submitEquipment()
  {
    if(this.equipmentForm.valid){
      this.httpService.addEquipment(this.equipmentForm.value,this.id).subscribe(()=>{
        this.equipmentForm.reset();
        this.showMessage="Equipment Added Sucessfully";
        alert("Equipment Added Sucessfully");
      })
    }
  }

  closeshowRejectModal(){
    this.formModal = false;
  }

  deleteEquipment(){

  }
 
}
