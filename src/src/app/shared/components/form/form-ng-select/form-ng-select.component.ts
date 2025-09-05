import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroupAbstractComponent } from '../form-group.abstract';

@Component({
  selector: 'form-ng-select',
  templateUrl: './form-ng-select.component.html',
  styleUrls: ['./form-ng-select.component.scss']
})
export class FormNgSelectComponent  extends FormGroupAbstractComponent implements AfterViewInit {

  @ViewChild('inputElement') inputElement: any;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    if (this.item.focus) {
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
      }, 100);
    }
  }
}
