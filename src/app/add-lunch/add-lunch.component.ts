import { Component } from '@angular/core';
import UIkit from 'uikit';

import { LunchService, ILunch } from '../lunch.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-lunch',
  templateUrl: './add-lunch.component.html',
  styleUrls: ['add-lunch.component.css']
})
export class AddLunchComponent {
  latitude = 50.052293;
  longitude = 14.441209;
  mapType = 'roadmap'; //satellite
  lunchList$ : Observable<ILunch[]>;
  lunchInput: ILunch = {
    id: null,
    name: '',
    address: '',
    lat: null,
    lng: null,
    upvotes: 0,
  };

  constructor(private lunchService: LunchService) { }

  ngOnInit(): void {
    this.getLunchList();
  }

  onLunchAdd() {
    this.lunchService.addLunch(this.lunchInput).subscribe(
      () => {
        this.lunchInput = null;
        this.lunchService.lunchHttp.next(true); // I want to repeat http call and get new values
        UIkit.notification('New lunch option added!', { status: 'success' });
      },
      error => {
        UIkit.notification('Adding lunch option failed :-(', { status: 'danger' });
        console.error('failed adding new lunch option', error);
      }
    );
  }

  getLunchList(): void {
    this.lunchList$ = this.lunchService.getLunchList();
  }

  mapClicked($event: any) {
    this.lunchInput.lat = $event.coords.lat;
    this.lunchInput.lng = $event.coords.lng;
  }

}
