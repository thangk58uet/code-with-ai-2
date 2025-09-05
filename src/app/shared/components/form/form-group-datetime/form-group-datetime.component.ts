import { NgxMatDateAdapter, NgxMatDateFormats, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { Component, OnInit } from '@angular/core';
import { FormGroupAbstractComponent } from '../form-group.abstract';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomNgxDatetimeAdapter } from '../../../helpers/custom-ngx-datetime-adapter'

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY HH:mm:ss',
  },
  display: {
    dateInput: 'DD/MM/YYYY HH:mm:ss',
    monthYearLabel: 'MMM YYYY HH:mm:ss',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY h:mm:ss',
  },
};
@Component({
  selector: 'form-group-datetime',
  templateUrl: './form-group-datetime.component.html',
  styleUrls: ['./form-group-datetime.component.scss'],
  providers: [
    {
      provide: NgxMatDateAdapter,
      useClass: CustomNgxDatetimeAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
  ]
})
export class FormGroupDateTimeComponent extends FormGroupAbstractComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  constructor() {
    super();
  }

  ngOnInit() {
    if (this.minDate) {
      this.minDate = new Date(this.item.min);
    }
    if (this.maxDate) {
      this.maxDate = new Date(this.item.max);
    }
  }
}
