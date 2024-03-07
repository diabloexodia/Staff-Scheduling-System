import { Component, OnInit } from '@angular/core';
import { CreateScheduleComponent } from '../../../../shared/shared components/create-schedule/create-schedule.component';
import { MatDialog } from '@angular/material/dialog';
import { SchedulingServiceService } from 'src/shared/services/Schedule/scheduling-service.service';
import { Table } from 'primeng/table';
import { PrimeIcons, MenuItem, MessageService } from 'primeng/api';
import { CreateProfileComponent } from '../create-profile/create-profile.component';
import { NavigationExtras, Router } from '@angular/router';
import { MetricsComponent } from '../metrics/metrics.component';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.scss'],
  providers: [MessageService],
})
export class ManageScheduleComponent implements OnInit {
  viewMetrics() {
    this.router.navigate(['Dashboard/Metrics']);
  }

  allSchedules: any[] = [];

  customers = this.allSchedules;

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  ngOnInit(): void {
    this.getSchedules();
  }

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private scheduleService: SchedulingServiceService,
    private messageService: MessageService
  ) {}

  clear(table: Table) {
    table.clear();
  }

  updateSchedule(schedule: any) {
    const dialogRef = this.dialog
      .open(CreateScheduleComponent, {
        data: schedule,
      })
      .afterClosed()
      .subscribe((formData) => {
        if (formData == 'success') {
         

          this.showLifeLong('Update Successful', true, 2);
        } else {
          console.log('it was a failure');
          this.showLifeLong('Update Successful', false, 2);
        }
      });
  }
  deleteSchedule(schedule) {
    if (
      confirm(
        `Are you sure you want to delete the schedule for  :  \n Emp ID : ${schedule.empID} \n Name : ${schedule.name} \n Job Role : ${schedule.job_Role} \n Location : ${schedule.location} \n Date : ${schedule.date} `
      )
    ) {
      this.scheduleService.deleteScheduleDetails(schedule).subscribe((data) => {
        if (data == 'success') {
          this.showLifeLong('Successfully Deleted !', true, 2);
          setTimeout(function () {
            location.reload();
          }, 1000);
       
        } else {
          console.log('failed');
        }
      });
    }
  }

  getSchedules() {
    this.scheduleService.getAllSchedules().subscribe((data) => {
  
      this.allSchedules = data;
      this.customers = this.allSchedules;
    });
  }
  createNewSchedule() {
    this.dialog
      .open(CreateScheduleComponent)
      .afterClosed()
      .subscribe((formData) => {
        //   console.log( " we are her " ,formData);

        if (formData) {
          if (formData == 'success') {
            this.showLifeLong('Successfully Created !', true, 2);
            setTimeout(function () {
              location.reload();
            }, 1000);
            this.router.navigate(['/Dashboard/manageschedules']);
          } else this.showLifeLong('Unable to Create', false, 2);
        }
      });
  }
  showLifeLong(displayedMessage: string, type: boolean, type2: number) {
    if (type == true && type2 === 1)
      this.messageService.add({
        severity: 'success',
        summary: 'New Password',
        detail: displayedMessage,
        life: 20000,
      });
    else if (type == false && type2 === 1)
      this.messageService.add({
        severity: 'error',
        summary: 'Try again',
        detail: 'User already exist',
        life: 2000,
      });
    else if (type == true && type2 === 2)
      this.messageService.add({
        severity: 'success',
        summary: 'Schedule',
        detail: displayedMessage,
        life: 2000,
      });
    else if (type == false && type2 === 2)
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: displayedMessage,
        life: 2000,
      });
  }

  createNewProfile() {
    this.dialog
      .open(CreateProfileComponent)
      .afterClosed()
      .subscribe((response) => {
        if (response.body['message'] == 'failure')
          this.showLifeLong('', false, 1);
        else if (response.body['message'] == 'success') {
          this.showLifeLong(response.body['password'], true, 1);
        }
      });
  }
}
