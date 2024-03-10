import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { myDetails } from 'src/shared/models/myDetails.interface';
import { scheduleDetails } from 'src/shared/models/scheduleDetails.interface';
import { todaysSchedule } from 'src/shared/models/todaysSchedule.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  getSwapSchedule(
    empid: string,
    date: string,
    shift: string
  ): Observable<scheduleDetails[]> {
    return this.http.get<scheduleDetails[]>(
      `${environment.baseUrl}/swapSchedule/${empid}/${date}/${shift}`
    );
  }
  getTodaysSchedule(id: string): Observable<todaysSchedule[]> {
    return this.http.get<todaysSchedule[]>(`${environment.baseUrl}/todaysSchedule/${id}`);
  }
  constructor(private http: HttpClient) {}

  currentEmployeeId: string;
  currentEmployeeRole: string;
  jwttoken: string;

  getEmployee(): Observable<myDetails> {
    const token = sessionStorage.getItem('jwtToken');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.currentEmployeeId = tokenPayload['empID'];

    this.currentEmployeeRole = tokenPayload['role'];
    const url = `${environment.baseUrl}/employees/${this.currentEmployeeId}`;

    return this.http.get<myDetails>(url);
  }
  validateEmployee(logindata: {
    username: string;
    password: string;
  }): Observable<HttpResponse<string>> {
    return this.http
      .post<string>(`${environment.baseUrl}/login`, logindata, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<string>) => {
          if (response.status === 200) {
            this.jwttoken = response.body['token'];
            const tokenPayload = JSON.parse(atob(this.jwttoken.split('.')[1]));
            if (tokenPayload['role']) {
              const role = tokenPayload['role'];
              this.currentEmployeeRole = role;
              this.currentEmployeeId = logindata.username;
              sessionStorage.setItem('jwtToken', this.jwttoken); // Store the token in session storage
            }
            return response;
          } else {
            throw new Error('Login failed');
          }
        })
      );
  }

  createNewEmployee(newEmployeeData: {
    EmpID: string;
    Name: string;
    Role: number;
    Email: string;
    Phone: string;
  }): Observable<HttpResponse<string>> {
    return this.http.post<string>(
      `${environment.baseUrl}/newEmployeeProfile`,
      newEmployeeData,
      {
        observe: 'response',
      }
    );
  }
}
