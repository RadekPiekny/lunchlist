import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppModalComponent implements OnInit {
 
  constructor() {}

  ngOnInit() {}

  close() {}

}
