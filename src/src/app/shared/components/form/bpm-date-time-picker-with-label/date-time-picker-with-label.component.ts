import { Component, Input, Attribute, ViewChild, AfterViewInit, Output, EventEmitter, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import {MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomNgxDatetimeAdapter } from '../../../helpers/custom-ngx-datetime-adapter'
import { DATE_TIME_FORMATS_DD_MM_YYYY_HH_SS } from '../../../constants/date-format.constant';
import { NgxMatDateAdapter, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';

@Component({
  selector: 'bpm-date-time',
  templateUrl: './date-time-picker-with-label.component.html',
  styleUrls: ['./date-time-picker-with-label.component.scss'],
  providers: [
    {
      provide: NgxMatDateAdapter,
      useClass: CustomNgxDatetimeAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: NGX_MAT_DATE_FORMATS, useValue: DATE_TIME_FORMATS_DD_MM_YYYY_HH_SS }
  ]
})
export class DateTimePickerWithLabelComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('inputDateTimeElement') inputDateTimeElement: any;

  @Output() onKeyup = new EventEmitter<any>();
  @Output() onBlur = new EventEmitter<any>();
  @Output() onModelChange = new EventEmitter<any>();

  @Input() model: string;
  @Input() directives: string;
  @Input() visible: boolean = true;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;

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
    @Attribute('min') public min: string,
    @Attribute('max') public max: string,
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
        this.inputDateTimeElement.nativeElement.focus();
      }, 100);
    }
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  deleteDate() {
    this.onModelChange.emit(null);
  }

  ngOnBlur(event: KeyboardEvent) {
    this.onBlur.emit((event.target as HTMLInputElement).value);
  }

  ngModelChange(value: any) {
    this.onModelChange.emit(value);
  }
}