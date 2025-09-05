import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { CURRENCY_REGEX, NUMBER_ONLY_REGEX } from '@shared/constants/regex.constant';
import { FormType } from '@shared/models/form-type.model';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {
  }

  formItemDetector(item: FormType<any>[], formControlName: string) {
    return item.find(x => x.key === formControlName);
  }

  markTouchedFormGroup(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key)?.markAsTouched();
    });
  }

  markUnTouchedFormGroup(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key)?.markAsUntouched();
    });
  }

  formatCurrencyView(amountVal, valueCurrency, option: boolean) {
      if (amountVal === "" || !amountVal) { return ""; }

      if(option) {
        return amountVal = this.formatNumberView(amountVal);
      }

      if (amountVal.indexOf(".") >= 0) {

        var decimal_pos = amountVal.indexOf(".");

        var left_side = amountVal.substring(0, decimal_pos);
        var right_side = amountVal.substring(decimal_pos);

          left_side = this.formatNumber(left_side);

          right_side = this.formatNumber(right_side);
          
          right_side = right_side.substring(0, 2);

        if (valueCurrency !== 'VND' && valueCurrency !== 'JPY') {
            amountVal = left_side + "." + right_side;
        } else {
            amountVal = left_side;
        }

      } else {
        amountVal = this.formatNumber(amountVal);
      }
      return amountVal;
  }

  formatCurrency(amountVal, valueCurrency) {
      return this.formatCurrencyView(amountVal, valueCurrency,false);
  }

  formatNumber(n) {
    return n?.replace(NUMBER_ONLY_REGEX, "").replace(CURRENCY_REGEX , ",");
  }

  formatNumberView(n) {
    return n?.replace(CURRENCY_REGEX , ",");
  }

  replaceCommaNumber(number) {
    return number?.replace(/,/g, '');
  }

  validateRequiredCheckbox(minRequired = 1): ValidatorFn {
    return function validate(formGroup: FormGroup) {
      let checked = 0;

      for (const key in formGroup.controls) {
        const control = formGroup.controls[key];

        if (control.value === true) {
          checked++;
        }
      }

      if (checked < minRequired) {
        return {
          required: true,
        };
      }

      return null;
    };
  }

  getFormItem(item: FormType<any>[], formControlName: string) {
    return item.find(x => x.key === formControlName);
  }
}
