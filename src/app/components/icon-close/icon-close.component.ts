import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'icon-close',
  templateUrl: './icon-close.component.html',
  styleUrls: ['./icon-close.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconCloseComponent implements OnInit {
  @Input() strokeColor: string;
  constructor() { }

  ngOnInit() {
  }

}
