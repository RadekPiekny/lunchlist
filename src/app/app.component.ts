import { Component } from '@angular/core';
import { LunchService } from './lunch.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [LunchService]
})
export class AppComponent { }
