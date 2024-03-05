import { Component, OnInit } from '@angular/core';
import { CreateScheduleComponent } from '../../../../shared/shared components/create-schedule/create-schedule.component';
import { MatDialog } from '@angular/material/dialog';
import { SchedulingServiceService } from 'src/shared/services/Schedule/scheduling-service.service';
import { Table } from 'primeng/table';
import { PrimeIcons, MenuItem, MessageService } from 'primeng/api';
import { CreateProfileComponent } from '../create-profile/create-profile.component';

@Component({
  selector: 'app-manage-schedule',
  templateUrl: './manage-schedule.component.html',
  styleUrls: ['./manage-schedule.component.scss'],
  providers: [MessageService]
})
export class ManageScheduleComponent implements OnInit {

  allSchedules: any[] = [];

  customers = this.allSchedules;

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  ngOnInit(): void {
    this.getSchedules();
  }
  
  constructor(
    private dialog: MatDialog,
    private scheduleService: SchedulingServiceService,
    private messageService:MessageService
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
        if (formData) {
          this.scheduleService.updateSchedule(formData).subscribe({
            next: () => {},
            complete: () => {
              this.getSchedules();
            },
          });
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
          console.log('deleted');
        } else {
          console.log('failed');
        }
      });
    }
  }

  getSchedules() {
    this.scheduleService.getAllSchedules().subscribe((data) => {
      console.log(data);

      this.allSchedules = data;
      this.customers = this.allSchedules;
    });
  }
  createNewSchedule() {
    this.dialog
      .open(CreateScheduleComponent)
      .afterClosed()
      .subscribe((formData) => {
       // console.log( " we are her " ,formData);

        if (formData) {
          this.scheduleService.createSchedule(formData).subscribe((data) => {
           // console.log(data);
            if(data == 'success')
            this.showLifeLong('',true,2);
          else 
          this.showLifeLong('',false,2);
          });
        }

      });
  }
  showLifeLong(displayedPassword: string, type :boolean,type2 : number) {
    if(type == true && type2 === 1)
    this.messageService.add({ severity: 'success', summary: 'New Password', detail: displayedPassword, life: 20000 });
  else  if(type == false && type2 === 1)
  this.messageService.add({ severity: 'error', summary: 'Try again', detail: 'User already exist', life: 2000 });
  else if( type == true && type2 === 2)
  this.messageService.add({ severity: 'success', summary: 'Created Schedule', detail: 'Successfully created !', life: 2000 });
  else if( type == false && type2 === 2)
  this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Unable to create schedule !', life: 2000 });
  
}

  createNewProfile() {
    this.dialog.open(CreateProfileComponent).afterClosed()
    .subscribe((response)=>{
      if(response.body['message']=='failure')
      this.showLifeLong('',false,1);
      else if(response.body['message']=="success"){
        this.showLifeLong(response.body['password'],true,1);
      
      }
      
    })
    }
}
