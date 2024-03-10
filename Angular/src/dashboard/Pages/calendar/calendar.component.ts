import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { EmployeeService } from 'src/shared/services/employee/employee.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SwapSchedulesComponent } from '../swap-schedules/swap-schedules.component';
import { todaysSchedule } from 'src/shared/models/todaysSchedule.interface';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DialogService],
})
export class CalendarComponent implements OnInit{
  ref: DynamicDialogRef | undefined;
  date = new FormControl(new Date());
  datesList: todaysSchedule[] = [];
  markedDates: any[] = [];
  currentEmployeeId: string;

  constructor(
    public dialogService: DialogService,
    private dateAdapter: DateAdapter<Date>,
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.dateAdapter.setLocale('en-US');
    const token = sessionStorage.getItem('jwtToken');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    this.currentEmployeeId = tokenPayload['empID'];

    this.employeeService
      .getTodaysSchedule(this.currentEmployeeId)
      .subscribe((data) => {
        this.datesList = data;
        console.log('this', data);

        this.loadToday();
      });
  }
  loadToday() {
    this.markedDates = this.datesList
      .map((item) => {
        const date = this.dateAdapter.parse(item.date, 'MM/dd/yyyy HH:mm:ss');
        return { date: date ? date : null, shift: item.shift };
      })
      .filter((item) => item.date !== null);
  }

  dateClass = (date: Date) => {
    const markedDate = this.markedDates.find(
      (item) =>
        this.dateAdapter.format(item.date, 'yyyy-MM-dd') ===
        this.dateAdapter.format(date, 'yyyy-MM-dd')
    );
    if (markedDate) {
      return markedDate.shift === 'Day'
        ? 'marked-date-day'
        : 'marked-date-night';
    }
    return '';
  };

  onDateSelected(date: Date | null) {
    if (date) {
      const markedDate = this.markedDates.find(
        (item) =>
          this.dateAdapter.format(item.date, 'yyyy-MM-dd') ===
          this.dateAdapter.format(date, 'yyyy-MM-dd')
      );
      if (markedDate) {
        this.ref = this.dialogService.open(SwapSchedulesComponent, {
          data: {
            empid: JSON.parse(
              atob(sessionStorage.getItem('jwtToken').split('.')[1])
            )['empID'],
            date: `${this.dateAdapter.format(date, 'yyyy-MM-dd')}`,
            shift: `${markedDate.shift}`,
          },
          header: 'Shift Swap',
        });
      }
    }
  }
}
