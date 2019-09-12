import { Component } from '@angular/core';
import UIkit from 'uikit';

import { LunchService, ILunch } from '../lunch.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from "@angular/forms";

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
  lunchForm: FormGroup;

  constructor(private lunchService: LunchService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.lunchForm = this.fb.group({
      name: '',
      address: '',
      lat: 0,
      lng: 0,
      upvotes: 0
    })
    this.lunchForm.valueChanges.subscribe(data => {
      console.log(data);
    });
    this.getLunchList();
  }

  lunchAdd() {
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
    this.lunchForm.patchValue({
      lat: ($event.coords.lat)
    });
    this.lunchForm.patchValue({
      lng: ($event.coords.lat)
    });
  }

}
