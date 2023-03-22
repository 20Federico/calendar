import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './modules/components/components.module';
import { MaterialComponentsModule } from './modules/material/material-components.module';
import { PagesModule } from './modules/pages/pages.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    ComponentsModule,
    MaterialComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
