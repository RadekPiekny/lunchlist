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
  state,
  animateChild
} from '@angular/animations';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-lunch-list',
  templateUrl: './lunch-list.component.html',
  styleUrls: ['./lunch-list.component.css'],
  animations: [
    trigger('changeIndex', [
      transition(':increment', [animate('5s ease', style({ transform: 'scale(1.75)' }))]),
    ]),
    trigger('changePosition', [
      state('normal', style({
        transform: 'translateY(calc({{position}} * var(--li-height) + {{position}} * var(--li-margin))'
      }),  {params: {position: 0}}),
      transition('* => normal', [animate('0.5s 0.7s ease-in-out'),query('@upvote', animateChild()),]),
    ]),
    trigger('upvote', [
      transition(':decrement', [animate('5s ease', style({ transform: 'scale(0.75)' }))]),
      transition(':increment', [
        group([
          query('#heart svg', animate('6000ms ease-in', keyframes([
            style({transform: 'scale(1)'}),
            style({transform: 'scale(1.25)'}),
            style({transform: 'scale(1)'})
          ]))),
          query('#heart svg path', animate('6000ms ease-in', keyframes([
            style({fill: 'rgba(255,0,0,0)', stroke: '#000'}),
            style({fill: 'rgba(255,0,0,1)', stroke: 'rgba(255,0,0,1)'}),
            style({fill: 'rgba(255,0,0,0)', stroke: '#000'})
          ]))),
          query('#heartMaterial svg', animate('6000ms ease-in', keyframes([
            style({transform: 'scale(1)'}),
            style({transform: 'scale(3)'})
          ]))),
          query('#heartMaterial svg path', animate('6000ms ease-in', keyframes([
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
  iLLhandmyself: ILunch[];
  heartAnimate: number;
  $list: Observable<ILunch[]> = this.lunchService.getLunchList().pipe(
    tap(data => {
      this.maxUpvotes = this.getMaxUpvotes(data);
      data.forEach((d,i) => {
        setTimeout(() => {
          d.position = {'transform': 'translateY(calc(' + i + ' * var(--li-height) + ' + i + ' * var(--li-margin))'};

        });
      });
      this.listItemPositionAnimation = "normal";
    })
  );
  llist: ILunch[];
  maxUpvotes: number;
  upvoteAnimationDone: boolean = false;
  listItemPositionAnimation: string;
  constructor(private lunchService: LunchService, private cd: ChangeDetectorRef){}

  ngOnInit() {
    this.$list.subscribe( data => {
      this.iLLhandmyself = data;
      this.cd.detectChanges();
    })
  }

  upvoteLunch(lunchId: number) {
    this.heartAnimate = lunchId;
    this.lunchService.upvoteLunch(lunchId).subscribe(() => {
      this.lunchService.lunchHttp.next(true);
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

  getPlaceStyle(place: ILunch): Object {
    let style: Object = { 'transform': 'translateY(calc(' + place.position + ' * var(--li-height) + ' + place.position + ' * var(--li-margin))' }; 
    return style;
  }

  getUlStyle(i: number) {
    return { 'height': i * 100 + 'px'}
  }

  upvoteDone(e: Event) {
    this.upvoteAnimationDone = true;
  }

  refresh() {
    this.cd.detectChanges();
  }

}