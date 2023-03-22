import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayViewComponent } from './modules/pages/day-view/day-view.component';
import { MonthViewComponent } from './modules/pages/month-view/month-view.component';
import { WeekViewComponent } from './modules/pages/week-view/week-view.component';

const today = new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear()  


const routes: Routes = [
  {
    path: '',
    redirectTo: 'month/' + today,
    pathMatch: 'full'
  },
  {
    path: 'month/:startDate',
    component: MonthViewComponent,
    pathMatch: 'full'
  },
  {
    path: 'week/:startDate',
    component: WeekViewComponent,
    pathMatch: 'full'
  },
  {
    path: 'day/:startDate',
    component: DayViewComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'month/' + today,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
