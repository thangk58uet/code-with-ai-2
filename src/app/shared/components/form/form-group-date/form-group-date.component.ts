import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupAbstractComponent } from '../form-group.abstract';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { CustomDateAdapter } from '../../../helpers/custom-date-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'form-group-date',
  templateUrl: './form-group-date.component.html',
  styleUrls: ['./form-group-date.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FormGroupDateComponent extends FormGroupAbstractComponent implements OnInit, AfterViewInit {
  @ViewChild('inputElement') inputElement: any;

  constructor() {
    super();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.item.focus) {
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
      }, 100);
    }
  }

  deleteDate() {
    this.form.get(this.item.key).setValue(null);
  }
}
