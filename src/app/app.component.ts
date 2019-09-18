import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LunchService } from './lunch.service'
import { GeneralService } from './services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LunchService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent { 

  constructor(public generalService: GeneralService) {}

}
