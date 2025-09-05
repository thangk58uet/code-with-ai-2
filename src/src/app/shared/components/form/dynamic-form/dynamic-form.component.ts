import { Component, Input } from '@angular/core';
import { FormGroupAbstractComponent } from '../form-group.abstract';
import { CONTROL_TYPE } from '@shared/constants/form-item.constant';

@Component({
  selector: 'bpm-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent extends FormGroupAbstractComponent {
  controlType = CONTROL_TYPE;
  @Input() className: string;
  @Input() width: string;
  constructor() {
    super();
  }

}
