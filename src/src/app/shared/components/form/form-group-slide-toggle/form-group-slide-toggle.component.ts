import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroupAbstractComponent } from '../form-group.abstract';

@Component({
  selector: 'form-group-slide-toggle',
  templateUrl: './form-group-slide-toggle.component.html'
})
export class FormGroupSlideToggleComponent extends FormGroupAbstractComponent {

  @ViewChild('inputElement') inputElement: any;

  constructor() {
    super();
  }
}
