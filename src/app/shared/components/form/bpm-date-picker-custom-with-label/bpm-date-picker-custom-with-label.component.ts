import { Component, Input, Attribute, ViewChild, AfterViewInit, Output, EventEmitter, OnInit, ChangeDetectorRef, AfterViewChecked, ElementRef, OnChanges, SimpleChanges, Renderer2, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { CustomDateAdapter } from '../../../helpers/custom-date-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { } from '../../../helpers/custom-date-adapter';
import { DATE_FORMATS_DD_MM_YYYY } from '../../../constants/date-format.constant';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
@Component({
    selector: 'bpm-date-custom',
    templateUrl: './bpm-date-picker-custom-with-label.component.html',
    styleUrls: ['./bpm-date-picker-custom-with-label.component.scss'],
    providers: [
      { provide: DateAdapter, useClass: CustomDateAdapter },
      { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS_DD_MM_YYYY },
    ],
})
export class DatePickerCustomWithLabelComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges {
    @ViewChild('dayElement') dayElement: ElementRef;
    @ViewChild('monthElement', { static: false }) monthElement: ElementRef;
    @ViewChild('yearElement') yearElement: ElementRef;

    @Output() onKeyup = new EventEmitter<any>();
    @Output() onBlur = new EventEmitter<any>();
    @Output() onInput = new EventEmitter<any>();
    @Output() onModelChange = new EventEmitter<any>();

    @Input() model = '';
    @Input() directives: string;
    @Input() visible = true;
    @Input() workingDay = false;
    @Input() holidays: Date[] = [];
    @Input() disabled = false;
    @Input() required = false;
    @Input() max: string;
    @Input() min: string;
    @Input() requiredStr: string;
    @Input() showIconDelete = false;

    minDate: Date;
    maxDate: Date;

    flexLabel: number;
    flexInput: number;
    day = '';
    month = '';
    year = '';
    errStr = '';
    month30DayArr = ['04', '06', '09', '11'];
    month31DayArr = ['01', '03', '05', '07', '08', '10', '12'];
    dateDisplayInCalendar = new FormControl(null);

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
      private cdRef: ChangeDetectorRef,
      private datePipe: DatePipe,
      private renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges) {
      // type date : dd/MM/yyyy or yyyy-mm-dd;
      if (changes?.model?.currentValue && changes?.model?.currentValue !== changes?.model?.previousValue) {
        var pattern =/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (!pattern.test(changes.model.currentValue)) {
          this.model = moment(changes.model.currentValue).format("DD/MM/YYYY");
        } else {
          this.model = changes.model.currentValue;
        }
        if (this.max) {
          let baseDateParts: any[] = this.model.split("/");
          let baseDateObject = new Date(+baseDateParts[2], baseDateParts[1] - 1, +baseDateParts[0]);
          let baseDateTemp = new Date(baseDateObject);

          if (baseDateTemp?.getTime() > this.maxDate?.getTime()) {
            this.model = this.max;
          }
        }
        this.onModelChange.emit(this.model);
        this.day = this.model.slice(0,2);
        this.month = this.model.slice(3,5);
        this.year = this.model.slice(6,10);
        this.dateDisplayInCalendar = new FormControl(new Date(this.model.split('/').reverse().join('-')));
      } else {
        this.clearData();
      }
      if (changes?.max?.currentValue) {
        this.maxDate = new Date(this.max.split('/').reverse().join('-'));
      }
      if (changes?.min?.currentValue) {
        this.minDate = new Date(this.min.split('/').reverse().join('-'));
      }
    }

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
      this.cdRef.detectChanges();
    }

    ngAfterViewChecked() {
      this.cdRef.detectChanges();
    }

    deleteDate() {
      this.clearData();
      this.onModelChange.emit(this.model);
      this.onBlur.emit(this.model);
      this.dateDisplayInCalendar = new FormControl(null);
    }

    ngModelChange(value: Date) {
      this.onModelChange.emit(this.model);
    }

    onChangeDay($event) {
        this.day = $event;
        if (this.day && +this.day > 31) {
            this.day = '31';
        }
        if (this.day.length === 2) {
          this.monthElement.nativeElement.focus();
        }
        this.dayElement.nativeElement.value = this.day;
    }

    onChangeMonth($event) {
        this.month = $event;
        if (this.month && +this.month > 12) {
            this.month = '12';
        }
        if (this.month.length === 2) {
          this.yearElement.nativeElement.focus();
        }
        this.monthElement.nativeElement.value = this.month;
    }

    leapYear(year){
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }

    onChangeYear($event) {
      this.year = $event;
      //this.yearElement.nativeElement.value = this.month;
    }

    onBlurDay($event) {
      this.onBlurDate('day');
    }

    onBlurMonth($event) {
      this.onBlurDate('month');
    }

    onBlurYear($event) {
      this.onBlurDate('year');
    }

    onBlurDate(type = '') {
      if (this.day.length === 1) {
        this.day = '0' + this.day;
      }
      if (this.month.length === 1) {
        this.month = '0' + this.month;
      }
      this.checkDateInvalid();
      if (this.day && this.month && this.year) {
        this.model = `${this.day}/${this.month}/${this.year}`;
        this.dateDisplayInCalendar = new FormControl(new Date(this.model.split('/').reverse().join('-')));
        this.onModelChange.emit(this.model);
        this.onBlur.emit(this.model);
      }
      if ((type === 'year' && (!this.day || !this.month || !this.year)) || (!this.day && !this.month && !this.year)) {
        this.onModelChange.emit('');
        this.onBlur.emit('');
      }

      if ((type === 'day' && !this.day) || (type === 'month' && !this.month) || (type === 'year' && !this.year)) {
        this.onModelChange.emit('');
        this.onBlur.emit('');
      }
    }

    focusMonth() {
      if (this.day.length === 1) {
        this.day = '0' + this.day;
      }
      this.checkDateInvalid();
    }

    focusYear() {
      if (this.month.length === 1) {
        this.month = '0' + this.month;
      }
      this.checkDateInvalid();
    }

    checkDateInvalid() {
      if (this.day === '31') {
        if (this.month30DayArr.indexOf(this.month) > -1) {
          this.day = '30';
        }
      }
      if (this.day && +this.day >= 29) {
        let isLeapYear = this.leapYear(new Date().getFullYear());
        if (this.month === '02') {
          this.day = isLeapYear ? '29' : '28';
        }
      }
    }

    onDateChanged($event) {
      this.errStr = '';
      let convertDate = this.convertDate($event.value)
      this.model = convertDate.date;
      this.day = convertDate.day;
      this.month = convertDate.month;
      this.year = convertDate.year;
      this.onModelChange.emit(this.model);
      this.onBlur.emit(this.model);
    }

    convertDate(str) {
      let date = new Date(str),
          month = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2),
          year = date.getFullYear();
      
      return {
        date : [day, month, year].join("/"),
        day: day,
        month: month,
        year: year.toString()
      };
    }

    clearData() {
      this.model = '';
      this.day = '';
      this.month = '';
      this.year = '';
      this.dateDisplayInCalendar = new FormControl(null);
    }

    keyPressDay(event) {
      this.numberOnly(event);
    }

    keyPressMonth(event) {
      this.numberOnly(event);
    }

    keyPressYear(event) {
      this.numberOnly(event);
    }

    numberOnly(event) {
      const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }

    onLeftMonth(event) {
      this.dayElement.nativeElement.focus();
    }

    onRightMonth(event) {
      this.yearElement.nativeElement.focus();
    }

    onLeftYear(event) {
      this.monthElement.nativeElement.focus();
    }

    onRightDay(event) {
      this.monthElement.nativeElement.focus();
    }

    onKeyDownYear(event) {
      if (event.keyCode === 8 && !this.year) {
        this.monthElement.nativeElement.focus();
        //this.monthElement.nativeElement.select();
      }
    }

    onKeyDownMonth(event) {
      if (event.keyCode === 8 && !this.month) {
        this.dayElement.nativeElement.focus();
        //this.dayElement.nativeElement.select();
      }
    }

}