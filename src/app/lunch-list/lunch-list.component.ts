import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  styleUrls: ['./lunch-list.component.css'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0.5 }),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'scale(1)', opacity: 1 }))  // final
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LunchListComponent implements OnInit {

  
  llist: ILunch[];
  constructor(private lunchService: LunchService, private cd: ChangeDetectorRef){}

  ngOnInit() {
    this.lunchService.getLunchList().subscribe(data=>{
      this.sortByVotes(data);
      this.cd.detectChanges();
    })
  }

  sortByVotes(lunchList: ILunch[]) {
    lunchList.sort((a, b) => {
      return a.upvotes-b.upvotes;
    })
    lunchList.forEach((l,i)=>{
      setTimeout(() => {
        l.position=i;
        this.cd.detectChanges();
      });
    });
    this.llist = lunchList;
    
  }

  upvoteLunch(lunchId: number) {
    this.lunchService.upvoteLunch(lunchId).subscribe(() => {
      UIkit.notification('Lunch upvoted!', { status: 'success' });
      this.sortByVotes(this.llist);
      this.cd.detectChanges();
    }, error => {
      UIkit.notification('Failed to upvote lunch :-(', { status: 'danger' });
      console.error('failed to upvote lunch');
    })
    
  }

  trackByFn(index: number, item: ILunch) {
    return item.id;
  }

  getLunchStyle(lunch: ILunch): Object {
    let style: Object = { 'transform': 'translateY(calc(' + lunch.position + ' * var(--li-height) + ' + lunch.position + ' * var(--li-margin))' }; 
    return style;
  }

  getUlStyle(i: number) {
    return { 'height': i * 100 + 'px'}
  }

}
