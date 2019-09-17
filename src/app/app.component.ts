import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LunchService } from './lunch.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LunchService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent { 
  darkMode: boolean;
  getTheme(): string {
    if (this.darkMode) {
      return 'dark';
    }
    return 'light';
  }
}
