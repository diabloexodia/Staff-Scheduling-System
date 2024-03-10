import { NgModule } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { StyleClassModule } from 'primeng/styleclass';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatPaginatorModule,
    StyleClassModule,
    InputTextModule,
    TableModule,
    ToastModule,
    CalendarModule,
    NgTemplateOutlet,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTooltipModule,
    ChartModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    ToastModule,
  ],
})
export class MaterialModule {}
