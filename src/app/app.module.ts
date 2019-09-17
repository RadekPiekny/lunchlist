import { LunchService } from './lunch.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LunchListComponent } from './lunch-list/lunch-list.component';
import { AddLunchComponent } from './add-lunch/add-lunch.component';

import { AgmCoreModule } from '@agm/core';
import { IconHeartComponent } from './components/icon-heart/icon-heart.component';

@NgModule({
  declarations: [
    AppComponent,
    LunchListComponent,
    AddLunchComponent,
    IconHeartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCsl7gM45VQURbDTZDpPNbGv2Wxr-N8GHY'})
  ],
  providers: [LunchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
