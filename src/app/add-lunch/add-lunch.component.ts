import { Component, ChangeDetectorRef } from '@angular/core';
import UIkit from 'uikit';

import { LunchService, ILunch } from '../lunch.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, NgForm } from "@angular/forms";
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-add-lunch',
  templateUrl: './add-lunch.component.html',
  styleUrls: ['add-lunch.component.css']
})
export class AddLunchComponent {
  latitude = 50.052293;
  longitude = 14.441209;
  mapType = 'roadmap'; //satellite

  mapStyle = [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}]
    }
  ]
  lunchList$ : Observable<ILunch[]> = this.lunchService.getLunchList();
  lunchForm: FormGroup;

  constructor(private lunchService: LunchService, public generalService:GeneralService, private fb: FormBuilder, private cd: ChangeDetectorRef) { }

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
  }

  lunchAdd() {
    this.lunchService.addLunch(this.lunchForm.value).subscribe(
      () => {
        this.lunchService.lunchHttp.next(true); // I want to repeat http call and get new values
        UIkit.notification('New lunch option added!', { status: 'success' });
      },
      error => {
        UIkit.notification('Adding lunch option failed :-(', { status: 'danger' });
        console.error('failed adding new lunch option', error);
      }
    );
  }

  mapClicked($event: any) {
    this.lunchForm.patchValue({
      lat: ($event.coords.lat)
    });
    this.lunchForm.patchValue({
      lng: ($event.coords.lng)
    });
  }

  clickedMarker(l: ILunch) {
    console.log(l);
  }

  wtf(f: any) {
    console.log(f);
  }
}
