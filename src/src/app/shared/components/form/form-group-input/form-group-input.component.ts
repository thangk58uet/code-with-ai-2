import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroupAbstractComponent } from '../form-group.abstract';

@Component({
  selector: 'form-group-input',
  templateUrl: './form-group-input.component.html',
  styleUrls: ['./form-group-input.component.scss']
})
export class FormGroupInputComponent  extends FormGroupAbstractComponent  implements AfterViewInit {

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
