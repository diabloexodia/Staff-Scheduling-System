import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from 'src/shared/services/employee/employee.service';
import { catchError, of } from 'rxjs';
import { loginForm } from 'src/shared/models/loginForm.interface';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
  providers: [MessageService],
})
export class LoginComponentComponent {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
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
      password: ['',Validators.required],
    });
    this.jwttoken = '';
  }
  onSubmit(logindata: loginForm) {
    this.employeeService
      .validateEmployee(logindata)
      .pipe(
        catchError((error: HttpErrorResponse) => {
         // console.log( "the " ,error.status);
          if(error.status == 401){

            this.showLifeLong('Invalid user.', false);
          }
          else
          this.showLifeLong('Server error. Try again later.', false);
          return of(error);
        })
      )
      .subscribe((result) => {
        if (result.status == 200) {
          this.showLifeLong("Logged in successfully !", true);

          setTimeout(() => {
            this.router.navigate(['Dashboard']);
          }, 1000);
        }
      });
  }
  showLifeLong(displayedMessage: string, type: boolean) {
    // console.log("here inside toast");

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
