import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'icon-plus',
  templateUrl: './icon-plus.component.html',
  styleUrls: ['./icon-plus.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconPlusComponent implements OnInit {
  @Input() strokeColor: string;
  constructor() { }

  ngOnInit() {
  }

}
