import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import UIkit from 'uikit';
import { LunchService, ILunch } from '../lunch.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { tap, finalize, map, first } from 'rxjs/operators';

@Component({
  selector: 'app-lunch-list',
  templateUrl: './lunch-list.component.html',
  styleUrls: ['./lunch-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LunchListComponent implements OnInit {
  test: number = 0;
  heartAnimate = new Subject<number>();
  upvoteSubsribtion: Subscription;
  $list: Observable<ILunch[]> = this.lunchService.getLunchList().pipe(
    tap(data => {
      this.maxUpvotes = this.getMaxUpvotes(data);
    }),
    map((data: ILunch[]) => {
      data.forEach((d,i) => {
        d.position = {'transform': 'translateY(calc(' + i + ' * var(--li-height) + ' + i + ' * var(--li-margin))'};
      })
      return data;
    }),
    tap(data => console.log(data))
  );
  maxUpvotes: number;
  upvoteAnimationDone: boolean = false;
  listItemPositionAnimation: string;
  constructor(private lunchService: LunchService, private cd: ChangeDetectorRef){}

  ngOnInit() {
  }

  upvoteLunch(lunchId: number) {
    this.upvoteSubsribtion = this.lunchService.upvoteLunch(lunchId).pipe(
      first(),
      finalize(() => {
        console.log("upvoted");
        this.heartAnimate.next(lunchId);
        this.lunchService.lunchHttp.next(true);
        this.upvoteSubsribtion.unsubscribe();
      })
    ).subscribe(
      null,
      () => {
        UIkit.notification('Failed to upvote lunch :-(', { status: 'danger' });
        console.error('failed to upvote lunch');
      }
    );
  }

  getMaxUpvotes(lunchList: ILunch[]): number {
    return Math.max(...lunchList.map(l => l.upvotes));
  }

  trackByFn(index: number, item: ILunch) {
    return item.id;
  }

  getUlStyle(i: number) {
    return { 'height': i * 100 + 'px'}
  }

  refresh(e: AnimationEvent) {
    console.log(e);
    this.cd.detectChanges();
  }

  ngAfterViewChecked() {
    this.cd.detectChanges();
  }

}