import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeService } from '../services/employee/employee.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor  {
   
  constructor(private router: Router) {}
     AbsoluteRole='';
  canActivate(): boolean {
    const token = sessionStorage.getItem('jwtToken');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    if (tokenPayload['role']) {
      this.AbsoluteRole = tokenPayload['role'];
        }


    if (this.AbsoluteRole == "admin") {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}