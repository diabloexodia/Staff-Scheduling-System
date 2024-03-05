import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MySchedulesComponent } from './my-schedules.component';
import { SchedulingServiceService } from 'src/shared/services/Schedule/scheduling-service.service';import { HttpClient } from '@angular/common/http';

const routes: Routes = [{ path: '', component: MySchedulesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MySchedulesRoutingModule { 



}
