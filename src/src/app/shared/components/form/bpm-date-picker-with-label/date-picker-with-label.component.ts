import { Component, Input, Attribute, ViewChild, AfterViewInit, Output, EventEmitter, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { CustomDateAdapter } from '../../../helpers/custom-date-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { } from '../../../helpers/custom-date-adapter';
import { DATE_FORMATS_DD_MM_YYYY } from '../../../constants/date-format.constant';

@Component({
  selector: 'bpm-date',
  templateUrl: './date-picker-with-label.component.html',
  styleUrls: ['./date-picker-with-label.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS_DD_MM_YYYY },
  ],
})
export class DatePickerWithLabelComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('inputDateElement') inputDateElement: any;

  @Output() onKeyup = new EventEmitter<any>();
  @Output() onBlur = new EventEmitter<any>();
  @Output() onInput = new EventEmitter<any>();
  @Output() onModelChange = new EventEmitter<any>();

  @Input() model: string;
  @Input() directives: string;
  @Input() visible: boolean = true;
  @Input() workingDay: boolean = false;
  @Input() holidays: Date[] = [];
  @Input() disabled: boolean = false;
  @Input() required: boolean= false;
  @Input() max: string;
  @Input() min: string;
  @Input() requiredStr: string;

  minDate: Date;
  maxDate: Date;

  flexLabel: number;
  flexInput: number;


  constructor(
    @Attribute('id') public id: string,
    @Attribute('name') public name: string,
    @Attribute('label') public label: string,
    @Attribute('focus') public focus: boolean,
    @Attribute('dateFormat') public dateFormat: string,
    @Attribute('placeholder') public placeholder: string,
    @Attribute('colOfLabel') public colOfLabel: number,
    @Attribute('colorLabel') public colorLabel: string,
    @Attribute('boldLabel') public boldLabel: string,
    // @Attribute('min') public min: string,
    // @Attribute('max') public max: string,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.min)
      this.minDate = new Date(this.min);
    else
      this.minDate = new Date('1900-01-01');
    if (this.max)
      this.maxDate = new Date(this.max);
    else
      this.maxDate = new Date('9999-12-30');

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
        this.inputDateElement.nativeElement.focus();
      }, 100);
    }
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  myFilter = (d: Date | null): boolean => {
    let disabledDay = true;
    if (this.workingDay) {
      const day = (d || new Date()).getDay();
      disabledDay = (day !== 0 && day !== 6);
    }

    if (this.holidays && this.holidays != null) {
      for (const holiday of this.holidays) {
        if (this.withoutTime(holiday).getTime() === this.withoutTime(d).getTime()) {
          disabledDay = false;
          break;
        }
      }
    }
    return disabledDay;
  }

  withoutTime(d: Date) {
    d.setHours(0, 0, 0, 0);
    return d;
  }

  deleteDate() {
    this.onModelChange.emit(null);
  }

  ngOnBlur(event: KeyboardEvent) {
    this.onBlur.emit((event.target as HTMLInputElement).value);
  }

  ngOnInput(event: KeyboardEvent) {
    this.onInput.emit((event.target as HTMLInputElement).value);
  }

  ngModelChange(value: Date) {
    this.onModelChange.emit(value);
  }
}