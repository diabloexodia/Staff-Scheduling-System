import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { swapRequestForm } from 'src/shared/models/swapRequestForm.interface';
import { SchedulingServiceService } from 'src/shared/services/Schedule/scheduling-service.service';
import { EmployeeService } from 'src/shared/services/employee/employee.service';

@Component({
  selector: 'app-swap-schedules',
  templateUrl: './swap-schedules.component.html',
  styleUrls: ['./swap-schedules.component.scss'],
  providers: [MessageService],
})
export class SwapSchedulesComponent implements OnInit {
  constructor(
    private scheduleService: SchedulingServiceService,
    private employeeService: EmployeeService,
    private swapRequestDetails: DynamicDialogConfig,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.loadSwapSchedule();
  }

  requestSwap(schedule: swapRequestForm) {
    const newSchedule = {
      empID: schedule.empID,
      name: schedule.name,
      shifterempid: this.swapRequestDetails.data['empid'],
      shift: schedule.shift,
      date: schedule.date,
    };
    this.scheduleService.requestSwap(newSchedule).subscribe((response) => {
      if (response.body['message'] == 'Request Sent ')
        this.showLifeLong('Request Sent Successfully', true);
      else {
        this.showLifeLong('Unknown Error', false);
      }
    });
  }

  showLifeLong(displayedMessage: string, type: boolean) {
    if (type == true)
      this.messageService.add({
        severity: 'success',
        summary: 'Status',
        detail: displayedMessage,
        life: 20000,
      });
    else
      this.messageService.add({
        severity: 'error',
        summary: 'Unknown Error',
        detail: displayedMessage,
        life: 20000,
      });
  }
  clear(table: Table) {
    table.clear();
  }
  swapSchedule: any[] = [];

  loadSwapSchedule() {
    const empid = this.swapRequestDetails.data['empid'];
    const date = this.swapRequestDetails.data['date'];
    const parts = date.split('/'); // Split the date string into an array [month, day, year]
    const formattedDate = `${parts[2]}-${parts[0].padStart(
      2,
      '0'
    )}-${parts[1].padStart(2, '0')}`;
    const shift = this.swapRequestDetails.data['shift'];

    this.employeeService
      .getSwapSchedule(empid, formattedDate, shift)
      .subscribe((data) => {
        this.swapSchedule = data;
      });
  }
}
