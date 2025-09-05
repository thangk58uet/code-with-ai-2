import { Component } from '@angular/core';
import { FormGroupAbstractComponent } from '../form-group.abstract';

@Component({
  selector: 'form-group-radio',
  templateUrl: './form-group-radio.component.html',
  styleUrls: ['./form-group-radio.component.scss']
})
export class FormGroupRadioComponent extends FormGroupAbstractComponent  {


  constructor() {
    super();
  }

}
