import { Component } from '@angular/core';
import UIkit from 'uikit';

import { LunchService } from '../lunch.service';

@Component({
  selector: 'app-add-lunch',
  templateUrl: './add-lunch.component.html'
})
export class AddLunchComponent {

  lunchInput: string;

  constructor(private lunchService: LunchService) { }

  onLunchAdd() {
    this.lunchService.addLunch(this.lunchInput).subscribe(() => {
      this.lunchInput = '';
      UIkit.notification('New lunch option added!', { status: 'success' });
    }, error => {
      UIkit.notification('Adding lunch option failed :-(', { status: 'danger' });
      console.error('failed adding new lunch option', error);
    });
  }

}
