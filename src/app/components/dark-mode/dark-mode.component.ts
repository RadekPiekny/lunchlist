import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DarkModeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() darkMode: boolean = false;
  @Output() _darkMode: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() darkModeColor: string = 'rgb(40,40,40)';
  @Input() lightModeColor: string = 'rgb(255,255,255)';

  changeMode() {
    this.changes = this.changes + 1;
    this.darkMode = !this.darkMode;
    this._darkMode.emit(this.darkMode);
    if (this.changes > 10) {
      alert("you must be enjoyoing this..")
      this.changes = 1;
    }
  }

  changes: number = 0;

}
