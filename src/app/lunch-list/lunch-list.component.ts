import { Component, OnInit } from '@angular/core';
import UIkit from 'uikit';
import { LunchService, ILunch } from '../lunch.service';
import { Observable } from 'rxjs';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-lunch-list',
  templateUrl: './lunch-list.component.html',
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0.5 }),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ])
    ])
  ]
})
export class LunchListComponent implements OnInit {

  lunchList$ : Observable<ILunch[]>;

  constructor(private lunchService: LunchService){}

  ngOnInit() {
    this.getLunchList();
  }

  getLunchList(): void {
    this.lunchList$ = this.lunchService.getLunchList();
  }

  upvoteLunch(lunchId: number) {
    this.lunchService.upvoteLunch(lunchId).subscribe(() => {
      UIkit.notification('Lunch upvoted!', { status: 'success' });
    }, error => {
      UIkit.notification('Failed to upvote lunch :-(', { status: 'danger' });
      console.error('failed to upvote lunch');
    })
  }

  trackByFn(index: number, item: ILunch) {
    return index; // or item.id
  }

}
