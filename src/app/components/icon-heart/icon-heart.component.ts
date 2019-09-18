import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'icon-heart',
  templateUrl: './icon-heart.component.html',
  styleUrls: ['./icon-heart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconHeartComponent implements OnInit {
  @Input() animate: boolean;
  @Output() animteDone: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  removeClass(e: AnimationEvent) {
    console.log(e);
    this.animteDone.emit(true);
  }

}
