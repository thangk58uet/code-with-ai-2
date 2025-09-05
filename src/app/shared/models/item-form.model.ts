import { CONTROL_TYPE, DIRECTIVE_VALIDATION_TYPE } from '@shared/constants/form-item.constant';
import { FormType } from './form-type.model';

export class DropdownItem<T> extends FormType<T> {
  controlType = CONTROL_TYPE.DROPDOWN;
}

export class RadioItem<T> extends FormType<T> {
  controlType = CONTROL_TYPE.RADIO;
}

export class TextAreaItem<T> extends FormType<T> {
  controlType = CONTROL_TYPE.TEXTAREA;
}

export class NumberItem<T> extends FormType<T> {
  controlType = CONTROL_TYPE.NUMBER;
  directives =  DIRECTIVE_VALIDATION_TYPE.D_CURRENCY;
  typeCurrency = 'VND';
}


export class DateItem<T> extends FormType<T> {
  controlType = CONTROL_TYPE.DATE;
}

export class DateTimeItem<T> extends FormType<T> {
  controlType = CONTROL_TYPE.DATETIME;
}

export class TextboxItem<T> extends FormType<T> {
  controlType = CONTROL_TYPE.TEXTBOX;
}


export class CheckboxItem<T> extends FormType<T> {
  controlType = CONTROL_TYPE.CHECKBOX;
}

export class NgSelectItem<T> extends FormType<T> {
  controlType = CONTROL_TYPE.NGSELECT;
}

export class HiddenItem<T> extends FormType<T> {
  controlType = CONTROL_TYPE.HIDDEN;
}

export class SlideItem<T> extends FormType<T> {
  controlType = CONTROL_TYPE.SLIDE;
}

/**
 * Yêu cầu có allowedFileExtension
 * @param allowedFileExtension;
 */
export class UploadItem<T> extends FormType<T> {
  controlType = CONTROL_TYPE.UPLOAD;
  type = 'file';
}
