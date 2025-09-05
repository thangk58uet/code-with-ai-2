import { ValidatorFn } from "@angular/forms";

export class FormType<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  max: any;
  min: any;
  maxLength: number;
  minLength: number;
  order: number;
  controlType: string;
  focus: boolean;
  type: string;
  placeholder: string;
  options: { key: any, value: any, checked?: boolean, className?: string }[];
  directives: string;
  typeCurrency: string;

  allowedFileExtension: string[];
  patternType: string;

  disabled: boolean;
  hidden: boolean;

  requiredErrorMessage: string;
  maxLengthErrorMessage: string;
  minLengthErrorMessage: string;
  maxErrorMessage: string;
  minErrorMessage: string;
  patternErrorMessage: string;
  invalidMimeTypeMessage: string;
  customValidates: CustomValidate[];
  isTypeBase64: boolean;
  isArrayCheckbox: boolean;
  currencyText: string;

  colOfRow: number;
  colOfLabel: number;

  decimalFormat: string;
  notShow: boolean;
  requiredColRow: any;
  notShowLabel: boolean;
  constructor(options: {
    value?: T;
    key?: string;
    label?: string;
    required?: boolean;
    max?: any;
    min?: any;
    maxLength?: number;
    minLength?: number;
    order?: number;
    controlType?: string;
    focus?: boolean;
    type?: string;
    placeholder?: string;
    options?: { key: any, value: any }[];
    directives?: string;
    allowedFileExtension?: string[];
    patternType?: string;
    disabled?: boolean;
    hidden?: boolean;
    typeCurrency?: string;

    requiredErrorMessage?: string;
    maxLengthErrorMessage?: string;
    minLengthErrorMessage?: string;
    maxErrorMessage?: string;
    minErrorMessage?: string;
    patternErrorMessage?: string;
    invalidMimeTypeMessage?: string;
    customValidates?: CustomValidate[];
    isTypeBase64?: boolean;
    isArrayCheckbox?: boolean;
    currencyText?: string;

    colOfRow?: number;
    colOfLabel?: number;

    decimalFormat?: string;

    notShow?: boolean;
    requiredColRow?: any;
    notShowLabel?: boolean;
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.max = options.max || null;
    this.min = options.min || null;
    this.maxLength = options.maxLength || null;
    this.minLength = options.minLength || null;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.placeholder = options.placeholder || '';
    this.focus = !!options.focus;
    this.options = options.options || [];
    this.directives = options.directives || '';
    this.customValidates = options.customValidates || [];
    this.allowedFileExtension = options.allowedFileExtension || null;
    this.patternType = options.patternType || null;
    this.disabled = options.disabled || false;
    this.hidden = options.hidden || false;
    this.typeCurrency = options.typeCurrency || 'VND';
    this.colOfRow = options.colOfRow || 50;
    this.colOfLabel = options.colOfLabel || 0;

    this.requiredErrorMessage = options.requiredErrorMessage || 'This field is required';
    this.maxLengthErrorMessage = options.maxLengthErrorMessage || 'Maximum length of this field is ' + options.maxLength;
    this.minLengthErrorMessage = options.minLengthErrorMessage || 'Minimum length of this field is ' + options.minLength;
    this.minErrorMessage = options.minErrorMessage || 'Min amount of this field is' + options.min;
    this.maxErrorMessage = options.maxErrorMessage || 'Max amount of this field is ' + options.max;
    this.patternErrorMessage = options.patternErrorMessage || 'This inputted value is invalid';
    let defaultFileTypeErrorMsg = 'The file type is invalid';
    if (options.allowedFileExtension) {
      const allowType = options.allowedFileExtension.toString();
      defaultFileTypeErrorMsg = defaultFileTypeErrorMsg + '. Accepted file type: ' + allowType
    }
    this.invalidMimeTypeMessage = options.invalidMimeTypeMessage || defaultFileTypeErrorMsg;
    this.isTypeBase64 = options.isTypeBase64 || false;
    this.isArrayCheckbox = options.isArrayCheckbox || false;
    this.currencyText = options.currencyText || '';

    this.decimalFormat = options.decimalFormat || '1.0-0';
    this.notShow = options.notShow || false;
    this.requiredColRow = options.requiredColRow || null;
    this.notShowLabel = options.notShowLabel || false;
  }
}

export class CustomValidate {
  errorName: string;
  errorMessage: string;
  validator: ValidatorFn;
}
