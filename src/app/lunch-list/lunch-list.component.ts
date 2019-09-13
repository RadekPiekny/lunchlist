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
  group,
  state
} from '@angular/animations';

@Component({
  selector: 'app-lunch-list',
  templateUrl: './lunch-list.component.html',
  styleUrls: ['./lunch-list.component.css'],
  animations: [
    trigger('changePosition', [
      state('normal', style({
        transform: 'translateY(calc({{position}} * var(--li-height) + {{position}} * var(--li-margin))'
      }),  {params: {position: 0}}),
      transition('* => normal', [animate('0.5s 0.7s ease-in-out', )]),
    ]),
    trigger('upvote', [
      transition(':decrement', [animate('5s ease', style({ transform: 'scale(0.75)' }))]),
      transition(':increment', [
        group([
          query('#heart svg', animate('600ms ease-in', keyframes([
            style({transform: 'scale(1)'}),
            style({transform: 'scale(1.25)'}),
            style({transform: 'scale(1)'})
          ]))),
          query('#heart svg path', animate('600ms ease-in', keyframes([
            style({fill: 'rgba(255,0,0,0)', stroke: '#000'}),
            style({fill: 'rgba(255,0,0,1)', stroke: 'rgba(255,0,0,1)'}),
            style({fill: 'rgba(255,0,0,0)', stroke: '#000'})
          ]))),
          query('#heartMaterial svg', animate('600ms ease-in', keyframes([
            style({transform: 'scale(1)'}),
            style({transform: 'scale(3)'})
          ]))),
          query('#heartMaterial svg path', animate('600ms ease-in', keyframes([
            style({fill: 'rgba(255,0,0,0)', stroke: 'rgba(255,0,0,0)'}),
            style({fill: 'rgba(255,0,0,0.2)', stroke: 'rgba(255,0,0,0.2)'}),
            style({fill: 'rgba(255,0,0,0)', stroke: 'rgba(255,0,0,0)'})
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
  maxUpvotes: number;
  upvoteAnimationDone: boolean = false;
  listItemPositionAnimation: string;
  constructor(private lunchService: LunchService, private cd: ChangeDetectorRef){}

  ngOnInit() {
    this.lunchService.getLunchList().subscribe(data=>{
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
    this.maxUpvotes = this.getMaxUpvotes(lunchList);   
    lunchList.reverse();
    lunchList.forEach((l,i)=>{
      l.position = i;
      this.cd.detectChanges();
    });
    this.listItemPositionAnimation = 'normal';
    this.llist = lunchList;
  }

  upvoteLunch(lunchId: number) {
    this.lunchService.upvoteLunch(lunchId).subscribe(() => {
      //UIkit.notification('Lunch upvoted!', { status: 'success' }); me no like. I think it is better to have visual representation of user action close to where they actually click hence heart animation
      this.sortByVotes(this.llist);
      this.cd.detectChanges();
    }, error => {
      UIkit.notification('Failed to upvote lunch :-(', { status: 'danger' });
      console.error('failed to upvote lunch');
    })
  }

  getMaxUpvotes(lunchList: ILunch[]): number {
    return Math.max(...lunchList.map(l => l.upvotes));
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

  upvoteDone(e: Event) {
    this.upvoteAnimationDone = true;
  }

}
