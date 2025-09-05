import { Component } from '@angular/core';
import { FormGroupAbstractComponent } from '../form-group.abstract';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'form-group-checkbox',
  templateUrl: './form-group-checkbox.component.html',
  styleUrls: ['./form-group-checkbox.component.scss']
})
export class FormGroupCheckboxComponent extends FormGroupAbstractComponent {
  constructor() {
    super();
  }

  onCheckboxChange(e, control) {
    control.checked = e.checked;
  }
}
