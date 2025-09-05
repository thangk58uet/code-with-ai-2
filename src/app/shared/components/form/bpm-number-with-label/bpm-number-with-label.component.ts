import { Component, Input, Attribute, ViewChild, AfterViewInit, Output, EventEmitter, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
@Component({
  selector: 'bpm-number',
  templateUrl: './bpm-number-with-label.component.html',
  styleUrls: ['./bpm-number-with-label.component.scss']
})
export class BpmNumberWithLabelComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('numberElement') numberElement: any;

  @Output() onKeyup = new EventEmitter<any>();
  @Output() onBlur = new EventEmitter<any>();
  @Output() onModelChange = new EventEmitter<any>();

  @Input() model: string;
  @Input() directives: string;
  @Input() visible: boolean = true;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  flexLabel: number;
  flexInput: number;


  constructor(
    @Attribute('id') public id: string,
    @Attribute('name') public name: string,
    @Attribute('label') public label: string,
    @Attribute('note') public note: string,
    @Attribute('precision') public precision: number,
    @Attribute('max') public max: number,
    @Attribute('min') public min: number,
    @Attribute('maxLength') public maxLength: number,
    @Attribute('minLength') public minLength: number,
    @Attribute('focus') public focus: boolean,
    @Attribute('placeholder') public placeholder: string,
    @Attribute('endAdornment') public endAdornment: string,
    @Attribute('colOfLabel') public colOfLabel: number,
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

  ngAfterViewInit() {
    if (this.focus) {
      setTimeout(() => {
        this.numberElement.nativeElement.focus();
      }, 100);
    }
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnBlur(event: KeyboardEvent) {
    this.onBlur.emit((event.target as HTMLInputElement).value);
  }

  ngModelChange(value: String) {
    this.onModelChange.emit(value);
  }
}
