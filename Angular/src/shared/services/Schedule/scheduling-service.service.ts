import {
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValueOf, map, tap } from 'rxjs';
import { EmployeeService } from '../employee/employee.service';
import { swapRequestForm } from 'src/shared/models/swapRequestForm.interface';
import { scheduleDetails } from 'src/shared/models/scheduleDetails.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SchedulingServiceService {
  rejectSwapDetails(schedule: swapRequestForm): Observable<any> {
    return this.http.put(`${environment.baseUrl}/rejectSwap`, schedule, {
      observe: 'response',
    });
  }

  acceptSwapDetails(schedule: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}/acceptSwap`, schedule, {
      observe: 'response',
    });
  }
  constructor(private http: HttpClient) {}

  requestSwap(schedule: swapRequestForm) {
    return this.http.post<string>(
      `${environment.baseUrl}/requestSwap`,
      schedule,
      {
        observe: 'response',
      }
    );
  }

  deleteScheduleDetails(deleteSchedule: any) {
    const url = `${environment.baseUrl}/schedules/deleteSchedule`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post(url, deleteSchedule, { observe: 'response', headers: headers })
      .pipe(
        map((response) => {
          if (response.status === 200) {
            return 'success';
          } else {
            return 'failure';
          }
        })
      );
  }

  getSchedule(id: string): Observable<scheduleDetails[]> {
    const url = `${environment.baseUrl}/schedules/${id}`;
    return this.http.get<any>(url);
  }

  getAllSchedules(): Observable<any> {
    const url = `${environment.baseUrl}/schedules`;
    return this.http.get<any>(url);
  }

  createSchedule(newScheduleForm: FormData): Observable<any> {
    const url = `${environment.baseUrl}/newSchedule`;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, newScheduleForm, {
      observe: 'response',
      headers: headers,
    });
  }

  updateSchedule(updatedScheduleForm: FormData) {
    const url = `${environment.baseUrl}/updateSchedule`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put(url, updatedScheduleForm, {
      observe: 'response',
      headers: headers,
    });
  }
}
