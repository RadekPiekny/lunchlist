import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import UIkit from 'uikit';
import { LunchService, ILunch } from '../lunch.service';
import { Observable } from 'rxjs';
import {
  trigger,
  style,
  animate,
  transition,
  keyframes,
  query,
  group
} from '@angular/animations';
import * as _ from 'lodash';

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
    ]),
    trigger('upvote', [
      transition(':decrement', [animate('5s ease', style({ transform: 'scale(0.75)' }))]),
      transition(':increment', [
        group([
          query('svg', animate('600ms ease-in', keyframes([
            style({transform: 'scale(1)'}),
            style({transform: 'scale(1.25)'}),
            style({transform: 'scale(1)'})
          ]))),
          query('path', animate('600ms ease-in', keyframes([
            style({fill: 'rgba(255,0,0,0)', stroke: '#000'}),
            style({fill: 'rgba(255,0,0,1)', stroke: 'rgba(255,0,0,1)'}),
            style({fill: 'rgba(255,0,0,0)', stroke: '#000'})
          ])))
        ]),
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LunchListComponent implements OnInit {
  test: number = 0;
  $list: Observable<ILunch[]> = this.lunchService.getLunchList();
  llist: ILunch[];
  originalLunchList: ILunch[];
  constructor(private lunchService: LunchService, private cd: ChangeDetectorRef){}

  ngOnInit() {
    this.lunchService.getLunchList().subscribe(data=>{
      console.log(data);
      this.sortByVotes(data);
      this.cd.detectChanges();
    })
  }

  sortByVotes(lunchList: ILunch[]) {
    lunchList.sort((a, b) => {
      let upvotes = a.upvotes - b.upvotes;
      if (upvotes !== 0) {
        return upvotes;
      }
      return b.position - a.position; // notice swapped position. Needed for stable sort. Initial sort without position values will be based on default behavior any other will use this stable algo.
    });
    lunchList.reverse();
    lunchList.forEach((l,i)=>{
      setTimeout(() => { // you probably do not like it but I do not know about any other way how to make async list swap possible.
        l.position = i;  //I need to get element from stack and put it to queue as for osme reason CSS transitions gets reset when being in stack
        this.cd.detectChanges();
      });
    });
    
    this.llist = lunchList;
  }

  upvoteLunch(lunchId: number) {
    this.lunchService.upvoteLunch(lunchId).subscribe(() => {
      //UIkit.notification('Lunch upvoted!', { status: 'success' }); me no like. I think it is better to have visual representation of user action close to where they actually click hence heart animation
      this.originalLunchList = JSON.parse(JSON.stringify(this.llist));
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
