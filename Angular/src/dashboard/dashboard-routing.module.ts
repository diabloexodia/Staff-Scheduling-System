import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ManageScheduleComponent } from './my-schedules/Pages/manage-schedule/manage-schedule.component';
import { AuthGuard } from 'src/app/auth.guard';
import { isLoggedInGuard } from 'src/app/is-logged-in.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'myschedules',
    loadChildren: () =>
      import('./my-schedules/my-schedules.module').then(
        (m) => m.MySchedulesModule
      ),
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'manageschedules',
    component: ManageScheduleComponent,
    canActivate: [AuthGuard, isLoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
