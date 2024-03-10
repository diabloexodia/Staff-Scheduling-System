import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateScheduleComponent } from '../shared/shared components/create-schedule/create-schedule.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MySchedulesModule } from './my-schedules/my-schedules.module';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarIcon } from 'primeng/icons/calendar';
import { CalendarComponent } from './Pages/calendar/calendar.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ToastModule } from 'primeng/toast';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SwapSchedulesComponent } from './Pages/swap-schedules/swap-schedules.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CreateScheduleComponent,
    CalendarComponent,
    SwapSchedulesComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    FormsModule,
    MatDialogModule,
    MySchedulesModule,
    MenuModule,
    MenubarModule,
    DropdownModule,
    CalendarIcon,
    CalendarModule,
    ToastModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    ConfirmPopupModule,
    ConfirmDialogModule,
  ],
})
export class DashboardModule {}
