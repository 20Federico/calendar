import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialComponentsModule } from '../material/material-components.module';
import { FormsModule } from '@angular/forms';
import { EventComponent } from './event/event.component';

@NgModule({
  declarations: [
    HeaderComponent,
    EventComponent
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    EventComponent
  ]
})
export class ComponentsModule { }
