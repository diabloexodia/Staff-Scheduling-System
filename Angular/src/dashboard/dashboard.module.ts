import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateScheduleComponent } from '../shared/shared components/create-schedule/create-schedule.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AnimateModule } from 'primeng/animate';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BadgeModule } from 'primeng/badge';
import { BlockUIModule } from 'primeng/blockui';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CALENDAR_VALUE_ACCESSOR, Calendar, CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopup, ConfirmPopupModule } from 'primeng/confirmpopup';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { MySchedulesModule } from './my-schedules/my-schedules.module';
import { Menu, MenuModule } from 'primeng/menu';
import { MenubarModule, MenubarService } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarIcon } from 'primeng/icons/calendar';
import { CalendarComponent } from './Pages/calendar/calendar.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ToastModule } from 'primeng/toast';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SwapSchedulesComponent } from './Pages/swap-schedules/swap-schedules.component';

@NgModule({
  declarations: [DashboardComponent, CreateScheduleComponent, CalendarComponent, SwapSchedulesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,FormsModule,
    ReactiveFormsModule, CardModule,
    FormsModule,MatDialogModule,
    MySchedulesModule,MenuModule,MenubarModule,DropdownModule,CalendarIcon,CalendarModule,
    ToastModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,ConfirmPopupModule,ConfirmDialogModule
    
  ],
})
export class DashboardModule {}
