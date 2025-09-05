import { AfterViewInit, Attribute, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'bpm-button',
  templateUrl: './bpm-button.component.html',
  styleUrls: ['./bpm-button.component.scss']
})
export class BpmButtonComponent implements OnInit, AfterViewInit {
  @ViewChild('buttonElement') buttonElement: any;

  @Output() onClick = new EventEmitter<any>();

  @Input() visible: boolean = true;
  @Input() disabled: boolean = false;
  
  sizeButton: string;
  constructor(
    @Attribute('text') public text: string,
    @Attribute('type') public type: string,
    @Attribute('width') public width: string,
    @Attribute('icon') public icon: string,
    @Attribute('color') public color: string,
    @Attribute('size') public size: string,
    @Attribute('focus') public focus: boolean,
    @Attribute('tooltip') public tooltip: string,
  ) { }

  ngOnInit(): void {
    this.sizeButton = "button-sm"
    if (this.size && this.size !== 'sm')
      this.sizeButton = "button-" + this.size;
  }

  ngAfterViewInit() {
    if (this.focus) {
      setTimeout(() => {
        this.buttonElement.nativeElement.focus();
      }, 100);
    }
  }

  ngOnClick($event: any) {
    if (!this.disabled)
      this.onClick.emit($event);
  }

}
