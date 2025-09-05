import { Component, Input, Attribute, ViewChild, AfterViewInit, Output, EventEmitter, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'bpm-input',
  templateUrl: './input-with-label.component.html',
  styleUrls: ['./input-with-label.component.scss']
})
export class InputWithLabelComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('inputElement') inputElement: any;

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
    @Attribute('label') public label: string,
    @Attribute('note') public note: string,
    @Attribute('type') public type: string,
    @Attribute('max') public max: number,
    @Attribute('min') public min: number,
    @Attribute('maxLength') public maxLength: number,
    @Attribute('minLength') public minLength: number,
    @Attribute('focus') public focus: boolean,
    @Attribute('placeholder') public placeholder: string,
    @Attribute('endAdornment') public endAdornment: string,
    @Attribute('colOfLabel') public colOfLabel: number,
    @Attribute('requiredStr') public requiredStr: string,
    @Attribute('colorLabel') public colorLabel: string,
    @Attribute('boldLabel') public boldLabel: string,
    @Attribute('widthInput') public widthInput: string,
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
        this.inputElement.nativeElement.focus();
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

  ngOnKeyup(event: KeyboardEvent) {
    this.onKeyup.emit((event.target as HTMLInputElement).value);
  }
}
