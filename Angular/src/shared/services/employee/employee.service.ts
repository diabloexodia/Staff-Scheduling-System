import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { myDetails } from 'src/shared/models/myDetails.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  getSwapSchedule(empid: string, date: string, shift: string): Observable<any> {
    return this.http.get(
      `https://localhost:7023/swapSchedule/${empid}/${date}/${shift}`
    );
  }
  getTodaysSchedule(id: string): Observable<any> {
    return this.http.get(`https://localhost:7023/todaysSchedule/${id}`);
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
    const url = `https://localhost:7023/employees/${this.currentEmployeeId}`;

    return this.http.get<myDetails>(url);
  }
  validateEmployee(logindata: {
    username: string;
    password: string;
  }): Observable<HttpResponse<string>> {
    return this.http
      .post<string>('https://localhost:7023/login', logindata, {
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
              console.log(this.currentEmployeeRole);
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
  }) {
    console.log(newEmployeeData);

    return this.http.post<string>(
      'https://localhost:7023/newEmployeeProfile',
      newEmployeeData,
      {
        observe: 'response',
      }
    );
  }
}
