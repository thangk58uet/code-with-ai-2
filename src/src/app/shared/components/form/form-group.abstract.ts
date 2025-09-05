import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormControls } from '@shared/models/form-control.model';
import { FormType } from '@shared/models/form-type.model';
@Component({
  template: '',
})
export abstract class FormGroupAbstractComponent {
  constructor() {}

  get f(): IFormControls {
    if (!this.form) {
      return;
    }
    return this.form.controls;
  }

  @Input() item: FormType<string>;
  @Input() form: FormGroup;
  @Input() id: string;

  // Validate input required.
  public static isInvalidInput(formGroup: FormGroup, controlName: string): boolean {
    if (formGroup == null) {
      return false;
    }
    const control = formGroup.get(controlName);
    if (control == null) {
      return false;
    }
    return (control.dirty || control.touched) && control.invalid;
  }

  isValidControl(controlName: string, error: string = null) {
    const control = this.f[controlName];
    if (!error) {
      return control.touched && control.invalid;
    }
    return control?.touched && control.hasError(error);
  }

  // Validate input required.
  public isValidInput(formGroup: FormGroup, controlName: string): boolean {
    if (formGroup == null) {
      return false;
    }
    const control = formGroup.get(controlName);
    if (control == null) {
      return false;
    }
    return (control.dirty || control.touched) && !control.invalid;
  }
}
