import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { scheduleDetails } from 'src/shared/models/scheduleDetails.interface';
import { EmployeeService } from 'src/shared/services/employee/employee.service';
import { SchedulingServiceService } from 'src/shared/services/Schedule/scheduling-service.service';

@Component({
  selector: 'app-my-schedules',
  templateUrl: './my-schedules.component.html',
  styleUrls: ['./my-schedules.component.scss'],
})
export class MySchedulesComponent {

  constructor(
   
    private employeeService: EmployeeService,
    private schedulingService: SchedulingServiceService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {
    const token = sessionStorage.getItem('jwtToken');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const currentEmployeeId = tokenPayload['empID'];


    this.getSchedule(currentEmployeeId);
    
  }
  mySchedule: scheduleDetails[];


  getSchedule(id:string) {
    this.schedulingService.getSchedule(id).subscribe((data:scheduleDetails[]) => {
   
      this.mySchedule = data;
    });
  }
  
  displayedColumns: string[] = [
    'empID',
    'name',
    'job_Role',
    'date',
    'shift',
    'location',
    'start_Time',
    'end_Time',
  ];

  clear(table: Table) {
    table.clear();
  }

}
