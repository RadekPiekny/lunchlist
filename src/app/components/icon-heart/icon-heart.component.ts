import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'icon-heart',
  templateUrl: './icon-heart.component.html',
  styleUrls: ['./icon-heart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconHeartComponent implements OnInit {
  @Input() animate: Observable<boolean>;
  @ViewChild('justForReset',{static: true}) justForReset: ElementRef<SVGElement>;
  constructor() { }

  ngOnInit() {
  }

  removeClass() {
    //this.animationPlay = false;
  }

}
