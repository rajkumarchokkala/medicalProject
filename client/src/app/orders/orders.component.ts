import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  showError: boolean = false;
  errorMessage: any;
  showMessage: boolean = false;
  responseMessage: any;
  orderList: any[] = [];
  statusModel: any = { newStatus: null };
  orderForm: FormGroup;
  showModal: boolean = false;
  selectedOrderId: number | null = null;

  constructor(
    private httpService:HttpService,
    private as: AuthService,
    private fb: FormBuilder
  ) {
    this.orderForm = this.fb.group({
      newStatus: ['']
    });
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.httpService.getorders().subscribe(
      (data: any) => {
        this.orderList = data;
      },
      (error: any) => {
        this.showError = true;
        this.errorMessage = error.message;
      }
    );
  }

  update(orderId: number) {
    this.selectedOrderId = orderId;
    const orderToEdit = this.orderList.find(order => order.id === orderId);
    if (orderToEdit) {
      this.statusModel.newStatus = orderToEdit.status;
      this.showModal = true;
    }
  }

  saveUpdate() {
    if (this.statusModel.newStatus && this.selectedOrderId !== null) {
      this.httpService.UpdateOrderStatus(this.statusModel.newStatus, this.selectedOrderId).subscribe(
        (response: any) => {
          this.showMessage = true;
          this.responseMessage = 'Order updated successfully!';
          this.getOrders(); 
          this.showModal = false; 
          this.selectedOrderId = null; 
        },
        (error: any) => {
          this.showError = true;
          this.errorMessage = error.message;
        }
      );
    }
  }

  cancelUpdate() {
    this.showModal = false;
    this.selectedOrderId = null;
  }
}