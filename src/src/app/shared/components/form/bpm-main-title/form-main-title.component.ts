import { Component, Input, Attribute, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'bpm-main-title',
  templateUrl: './form-main-title.component.html',
  styleUrls: ['./form-main-title.component.scss']
})
export class FormMainTitleComponent implements OnInit {

  @Output() onKeyup = new EventEmitter<any>();
  @Output() onBlur = new EventEmitter<any>();
  @Output() onModelChange = new EventEmitter<any>();

  @Input() visible: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
