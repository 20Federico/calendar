import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MonthViewComponent } from './month-view/month-view.component';
import { WeekViewComponent } from './week-view/week-view.component';
import { DayViewComponent } from './day-view/day-view.component';
import { MaterialComponentsModule } from '../material/material-components.module';

@NgModule({
  declarations: [
    MonthViewComponent,
    WeekViewComponent,
    DayViewComponent
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    MonthViewComponent,
    WeekViewComponent,
    DayViewComponent
  ],
})
export class PagesModule { }
