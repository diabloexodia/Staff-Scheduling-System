import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from 'src/shared/services/employee/employee.service';
import { catchError, of } from 'rxjs';
import { loginForm } from 'src/shared/models/loginForm.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class LoginComponentComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private messageService: MessageService
  ) {}

  currentRole: string;
  currentEmpId: string;
  jwttoken: string;
  loginForm: FormGroup;
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^EMP\\d{5}$')]],
      password: ['', Validators.required],
    });
    this.jwttoken = '';
  }
  onSubmit(logindata: loginForm): void {
    this.employeeService
      .validateEmployee(logindata)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 401) {
            this.showLifeLong('Invalid user.', false);
          } else this.showLifeLong('Server error. Try again later.', false);
          return of(error);
        })
      )
      .subscribe((result) => {
        if (result.status == 200) {
          this.showLifeLong('Logged in successfully !', true);

          setTimeout(() => {
            this.router.navigate(['Dashboard']);
          }, 1000);
        }
      });
  }
  showLifeLong(displayedMessage: string, type: boolean): void {
    if (type == true)
      this.messageService.add({
        severity: 'success',
        summary: 'Logging in .. ',
        detail: displayedMessage,
        life: 1000,
      });
    else
      this.messageService.add({
        severity: 'error',
        summary: 'Login failed',
        detail: displayedMessage,
        life: 1000,
      });
  }
}
