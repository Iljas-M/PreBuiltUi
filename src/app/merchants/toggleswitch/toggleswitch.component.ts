import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggleswitch',
  templateUrl: './toggleswitch.component.html',
  styleUrls: ['./toggleswitch.component.scss']
})
export class ToggleswitchComponent implements OnInit {

  constructor() { }

  @Input() label = '';
  @Input() state = false;
  @Output() onToggle = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  handleChange() {
    this.onToggle.emit(this.state);
  }
}
