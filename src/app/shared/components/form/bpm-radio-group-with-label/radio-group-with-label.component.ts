import { Component, Input, Attribute, Output, EventEmitter, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'bpm-radio-group',
  templateUrl: './radio-group-with-label.component.html',
  styleUrls: ['./radio-group-with-label.component.scss']
})
export class RadioGroupWithLabelComponent implements OnInit, AfterViewChecked {

  @Output() onBlur = new EventEmitter<any>();
  @Output() onModelChange = new EventEmitter<any>();
  @Output() onChange = new EventEmitter<MatRadioChange>();
  
  @Input() model: any;
  @Input() options: { text: string, value: any, }[];
  @Input() visible: boolean = true;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  flexLabel: number;
  flexInput: number;


  constructor(
    @Attribute('id') public id: string,
    @Attribute('name') public name: string,
    @Attribute('label') public label: string,
    @Attribute('placeholder') public placeholder: string,
    @Attribute('type') public type: string,
    @Attribute('colOfLabel') public colOfLabel: number,
    @Attribute('boldLabel') public boldLabel: string,
    @Attribute('colorLabel') public colorLabel: string,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.label)
      this.flexLabel = 30;
    else
      this.flexLabel = 0;
    if (this.colOfLabel && this.colOfLabel > 1)
      this.flexLabel = this.colOfLabel;
    this.flexInput = 100 - this.flexLabel;
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnBlur(event: KeyboardEvent) {
    this.onBlur.emit((event.target as HTMLInputElement));
  }

  ngOnChange(value: MatRadioChange){
    this.onChange.emit(value);
  }

  ngModelChange(value: String) {
    this.onModelChange.emit(value);
  }
}
