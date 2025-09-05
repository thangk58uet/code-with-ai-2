import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroupAbstractComponent } from '../form-group.abstract';

@Component({
  selector: 'form-group-textarea',
  templateUrl: './form-group-textarea.component.html',
  styleUrls: ['./form-group-textarea.component.scss']
})
export class FormGroupTextareaComponent extends FormGroupAbstractComponent implements AfterViewInit {

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

