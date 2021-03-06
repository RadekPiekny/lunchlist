import { LunchService } from './lunch.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LunchListComponent } from './lunch-list/lunch-list.component';
import { AddLunchComponent } from './components/add-lunch/add-lunch.component';

import { AgmCoreModule } from '@agm/core';
import { IconHeartComponent } from './components/icon-heart/icon-heart.component';
import { DarkModeComponent } from './components/dark-mode/dark-mode.component';
import { GeneralService } from './services/general.service';
import { IconPlusComponent } from './components/icon-plus/icon-plus.component';
import { AppModalComponent } from './components/app-modal/app-modal.component';
import { IconCloseComponent } from './components/icon-close/icon-close.component';

@NgModule({
  declarations: [
    AppComponent,
    LunchListComponent,
    AddLunchComponent,
    IconHeartComponent,
    DarkModeComponent,
    IconPlusComponent,
    AppModalComponent,
    IconCloseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCsl7gM45VQURbDTZDpPNbGv2Wxr-N8GHY'})
  ],
  providers: [LunchService,GeneralService],
  bootstrap: [AppComponent]
})
export class AppModule { }
