import { NgModule, QueryList, TemplateRef } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { MySchedulesRoutingModule } from './my-schedules-routing.module';
import { MySchedulesComponent } from './my-schedules.component';
import { TableModule } from 'primeng/table';
import { ManageScheduleComponent } from './Pages/manage-schedule/manage-schedule.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClass, StyleClassModule } from 'primeng/styleclass';
import { CreateMessageComponent } from './Pages/create-message/create-message/create-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { CreateProfileComponent } from './Pages/create-profile/create-profile.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';


@NgModule({
  declarations: [MySchedulesComponent, ManageScheduleComponent, CreateMessageComponent, CreateProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MySchedulesRoutingModule,
    TableModule,MaterialModule,
    ButtonModule,
    OverlayPanelModule,
    ToastModule,
    StyleClassModule ,
    RippleModule,InputMaskModule,InputTextModule, 
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
   
  ],
})
export class MySchedulesModule {}
