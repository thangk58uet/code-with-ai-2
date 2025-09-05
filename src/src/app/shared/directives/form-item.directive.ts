import { DIRECTIVE_VALIDATION_TYPE } from '../constants/form-item.constant';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { EMAIL_REGEX, CURRENCY_REGEX, NUMBER_ONLY_REGEX } from '@shared/constants/regex.constant';
import { UtilityService } from '@shared/services/util.service';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';

/**
 * @date
 * @description directive for number input
 */
@Directive({
  selector: 'input[bpmItem], textarea[bpmItem]'
})
export class FormItemDirective {

  @Input() bpmItem;
  @Input() bpmItemTypeCurrency;

  constructor(
    private el: ElementRef, 
    private utilService: UtilityService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe,
    ) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    // check sđt mobie chỉ được nhập số và có số 0 đầu tiên
    if (this.bpmItem === DIRECTIVE_VALIDATION_TYPE.D_NUMBER_PHONE ) {
      const initalValue = this.el.nativeElement.value;
      if (initalValue.length === 1) {
        this.el.nativeElement.value = initalValue.replace(/^[^0]*/g, '');
      } else {
        this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
      }
      if ( initalValue !== this.el.nativeElement.value) {
        event.stopPropagation();
      }
    }
    // check giá trị nhập mã gợi nhớ
    // ký tự đầu tiên nhập phải là chữ
    if (this.bpmItem === DIRECTIVE_VALIDATION_TYPE.D_REMINDER_CODE ) {
      const initalValue = this.el.nativeElement.value;
      if (initalValue.length === 1) {
        this.el.nativeElement.value = initalValue.replace(/^[^a-zA-Z]*/g, '');
      } else {
        this.el.nativeElement.value = initalValue.replace(/[^A-Za-z0-9]+/g, '');
      }
      if ( initalValue !== this.el.nativeElement.value) {
        event.stopPropagation();
      }
    }
    // check giá trị nhập chỉ là số
    if (this.bpmItem === DIRECTIVE_VALIDATION_TYPE.D_NUMBER ) {
      const initalValue = this.el.nativeElement.value;
      this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
      this.el.nativeElement.value  = this.decimalPipe.transform(initalValue, '1.0-2');
      if ( initalValue !== this.el.nativeElement.value) {
        event.stopPropagation();
      }
    }
    // check giá trị nhập là chữ và số, không được nhập tiếng việt có dấu
    if (this.bpmItem === DIRECTIVE_VALIDATION_TYPE.D_NUMBER_AND_TEXT ) {
      const initalValue = this.el.nativeElement.value;
      this.el.nativeElement.value = initalValue.replace(/[^A-Za-z0-9]+/g, '');
      if ( initalValue !== this.el.nativeElement.value) {
        event.stopPropagation();
      }
    }

    // check giá trị nhập chỉ là ký tự chữ không dấu
    if (this.bpmItem === DIRECTIVE_VALIDATION_TYPE.D_TEXT ) {
      const initalValue = this.el.nativeElement.value;
      this.el.nativeElement.value = initalValue.replace(/[^A-Za-z\s]+/g, '');
      if ( initalValue !== this.el.nativeElement.value) {
        event.stopPropagation();
      }
    }

    if (this.bpmItem === DIRECTIVE_VALIDATION_TYPE.D_EMAIL ) {
      const initalValue = this.el.nativeElement.value;
      // tslint:disable-next-line: max-line-length
      this.el.nativeElement.value = initalValue.replace(EMAIL_REGEX, '');
      if ( initalValue !== this.el.nativeElement.value) {
        event.stopPropagation();
      }
    }

    if(this.bpmItem === DIRECTIVE_VALIDATION_TYPE.D_CURRENCY) {
      const initalValue = this.el.nativeElement.value;
      this.el.nativeElement.value = this.utilService.formatCurrency(initalValue,this.bpmItemTypeCurrency);
    }
  }
}
