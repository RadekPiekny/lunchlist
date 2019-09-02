import { LunchService } from './lunch.service';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LunchListComponent } from './lunch-list/lunch-list.component';
import { AddLunchComponent } from './add-lunch/add-lunch.component';

@NgModule({
  declarations: [
    AppComponent,
    LunchListComponent,
    AddLunchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [LunchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
