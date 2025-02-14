import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Maintenance } from '../maintenance-status/maintenance';
import { Order } from './order';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {

  orderList:Order[]=[];
  orderId:any;
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
    this.getAllOrders();
  }

  getAllOrders()
  {
    this.httpService.getorders().subscribe((data)=>
    {
      this.orderList=data;
    })
  }

  addFeedback(order:Order)
  {
    this.orderId=order.id;
    this.feedForm=true;
  }

  closeshowRejectModal()
  {
    this.feedForm = false;
  }

  onSubmit()
  {
    this.httpService.addFeedbackByOrderId(this.feedbackForm.value,this.orderId).subscribe(
      {
        next:()=>
          {
            this.showMessage=true;
            this.successMessage='Feedback submitted successfully!';
            this.feedbackForm.reset();
            setTimeout(()=>
            {
              this.showMessage=false;
            },2000);
          },
          error:()=>
          {
            this.showError=true;
            this.errorMessage="Cannot submit feedback";
          }
      }
    )
  }
}
