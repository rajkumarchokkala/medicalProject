import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  IsLoggin:any=false;
  roleName: string | null;
  
  constructor(private authService: AuthService, private router:Router,private snackBar: MatSnackBar)
  {
   
    this.IsLoggin=authService.getLoginStatus;
    this.roleName=authService.getRole;
    if(this.IsLoggin==false)
    {
      this.router.navigateByUrl('/login'); 
    
    }
  }
  ngOnInit(): void {
  this.router.navigateByUrl('/dashboard')  }
  logout() {
    this.authService.logout();
    this.snackBar.open('Logout Successful!', '', {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: ['custom-snackbar']
    });
    window.location.reload();
  }

}
