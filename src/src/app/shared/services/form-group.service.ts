import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, ValidatorFn, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { CONTROL_TYPE } from '@shared/constants/form-item.constant';
import { REGEX } from '@shared/constants/regex.constant';
import { generateFileValidator } from '@shared/helpers/mime-type.validator';
import { FormType } from '@shared/models/form-type.model';

@Injectable({
  providedIn: 'root',
})
export class FormGroupService {
  constructor() {
  }

  /**
   * Xử lý tạo mới Form Group
   * @param items;
   */
  toFormGroup(items: FormType<any>[]) {
    const group: any = {};

    items.forEach(item => {
      group[item.key] = this.initFormControl(item);
    });
    return new FormGroup(group);
  }

  /**
   * Xử lý add FormControl
   * @param item;
   * @param form;
   */
  initFormControl(item: FormType<string>) {
    const validator: ValidatorFn[] = [];
    const asyncValidator: AsyncValidatorFn[] = [];
    if (item.max) {
      validator.push(Validators.max(Number(item.max)));
    }
    if (item.min) {
      validator.push(Validators.min(Number(item.min)));
    }
    if (item.maxLength) {
      validator.push(Validators.maxLength(item.maxLength));
    }
    if (item.minLength) {
      validator.push(Validators.minLength(item.minLength));
    }
    if (item.required) {
      validator.push(Validators.required);
    }
    if (item.patternType) {
      validator.push(Validators.pattern(REGEX[item.patternType]))
    }
    if (item.customValidates.length > 0) {
      item.customValidates.forEach(custom => {
        validator.push(custom.validator);
      })
    }
    if (item.type === 'file') {
      asyncValidator.push(generateFileValidator(item.allowedFileExtension, item.isTypeBase64));
    }

    if (item.controlType === CONTROL_TYPE.CHECKBOX && item.isArrayCheckbox) {
      const cbFomArray = item.options.map((option) => {
        return new FormControl(this.getSelectedCheckbox(item, option))
      })

      return new FormArray(cbFomArray,validator);
    }

    const formControl = new FormControl(item.value, validator, asyncValidator);
    if (item.disabled) {
      formControl.disable();
    }

    return formControl;
  }

  /**
   * Xử lý add hidden item FormControl
   * @param item;
   * @param form;
   */
  addHiddenFormGroup(item: FormType<string>, form: FormGroup) {
    const group = new FormControl(item.value || '');
    form.addControl(item.key, group);
  }

  /**
   * Xử lý add hidden item FormControl
   * @param key;
   * @param form;
   */
  addFormArrayGroup(key: string, form: FormGroup) {
    const group = new FormArray([]);
    return form.addControl(key, group);
  }

  getSelectedCheckbox(item: FormType<any>, option) {
    if (item.value?.includes(option.key)) {
      return true;
    }
    return false;
  }

  
	disableMultiForm(form: FormGroup, formKeys: string[], disable: boolean, deleteData: boolean = true) {
		formKeys.forEach(key => {
			this.disableForm(form, key, disable, deleteData);
		})
	}

	disableForm(form: FormGroup, key: string, disable: boolean, deleteData: boolean = true) {
		if (disable) {
			form.get(key).disable();
			deleteData && form.get(key).setValue(null);
		} else {
			form.get(key).enable();
		}
	}
}
