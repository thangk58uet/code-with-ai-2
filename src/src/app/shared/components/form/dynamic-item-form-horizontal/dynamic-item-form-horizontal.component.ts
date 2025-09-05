import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormGroupAbstractComponent } from '../form-group.abstract';
import { FormType } from '@shared/models/form-type.model';
import { CONTROL_TYPE } from '@shared/constants/form-item.constant';

@Component({
  selector: 'bpm-dynamic-item-form-horizontal',
  templateUrl: './dynamic-item-form-horizontal.component.html',
  styleUrls: ['./dynamic-item-form-horizontal.component.scss']
})
export class DynamicItemFormHorizontalComponent extends FormGroupAbstractComponent {
  @Input() item: FormType<any>;
  @Input() form: FormGroup;

  @Input() flexLabel: number;
  @Input() flexInput: number;

  controlType = CONTROL_TYPE;
  
  constructor() {
    super();
  }

  isLable(controlType) {
    return controlType !== 'checkbox' && controlType !== 'radio';
  }
}

