import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent 
{
  itemForm!:FormGroup;

  roles: string[] = ['HOSPITAL', 'TECHNICIAN', 'SUPPLIER'];

  constructor(private fb: FormBuilder,private hs:HttpService,private router:Router) {
    this.itemForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6),Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log("in on submit..");
   if(this.itemForm.valid)
   {

    this.hs.registerUser(this.itemForm.value).subscribe((data)=>
    {
   this.router.navigateByUrl('login')
      console.log(data);
    });


   }
}



}

