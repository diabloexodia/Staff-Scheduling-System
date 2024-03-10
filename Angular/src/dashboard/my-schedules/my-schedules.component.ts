
import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { scheduleDetails } from 'src/shared/models/scheduleDetails.interface';
import { SchedulingServiceService } from 'src/shared/services/Schedule/scheduling-service.service';

@Component({
  selector: 'app-my-schedules',
  templateUrl: './my-schedules.component.html',
  styleUrls: ['./my-schedules.component.scss'],
})
export class MySchedulesComponent {
  constructor(private schedulingService: SchedulingServiceService) {}
  ngOnInit() {
    const token = sessionStorage.getItem('jwtToken');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const currentEmployeeId = tokenPayload['empID'];

    this.getSchedule(currentEmployeeId);
  }
  mySchedule: scheduleDetails[];

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

  getSchedule(id: string): void {
    this.schedulingService
      .getSchedule(id)
      .subscribe((data: scheduleDetails[]) => {
        this.mySchedule = data;
      });
  }
  clear(table: Table): void {
    table.clear();
  }
}
