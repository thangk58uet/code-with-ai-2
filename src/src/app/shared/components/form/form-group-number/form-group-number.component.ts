import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroupAbstractComponent } from '../form-group.abstract';

@Component({
  selector: 'form-group-number',
  templateUrl: './form-group-number.component.html',
  styleUrls: ['./form-group-number.component.scss']
})
export class FormGroupNumberComponent  extends FormGroupAbstractComponent  implements AfterViewInit {

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
