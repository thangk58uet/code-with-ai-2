import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormType } from '@shared/models/form-type.model';

@Component({
  selector: 'bpm-dynamic-items-form',
  templateUrl: './dynamic-items-form.component.html',
  styleUrls: ['./dynamic-items-form.component.scss']
})

export class DynamicItemsFormComponent{

  @Input() items: FormType<any>[] = [];
  @Input() form: FormGroup;
  payLoad = '';

}
