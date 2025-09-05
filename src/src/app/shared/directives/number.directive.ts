import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { DIRECTIVE_VALIDATION_TYPE } from '@shared/constants/form-item.constant';

@Directive({
  selector: 'input[bpmNumber]'
})
export class NumberDirective implements OnInit {
 
  private value: any;

  @Input() bpmNumber;

  constructor(
    private el: ElementRef,
    private decimalPipe: DecimalPipe,) {
  }


  @HostListener('focus', ['$event.target.value'])
  onFocus() {
    if (this.value)
      this.el.nativeElement.value = this.value;
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: any) {
    this.transform(value);
  }

  // @HostListener('input', ["$event.target.value"])
  // onInput(value: string) {
  //   this.transform(value);
  // };

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    event.preventDefault();
    this.transform(event.clipboardData.getData('text/plain'));
  }

  ngOnInit() {
    this.transform(this.el.nativeElement.value);
  }

  transform(value: any) {
    if (value) {
      switch (this.bpmNumber) {
        case DIRECTIVE_VALIDATION_TYPE.D_NUMBER:
          value = this.el.nativeElement.value.split(',').join('');
          this.value = value;
          if (value && !isNaN(value)) {
            this.el.nativeElement.value = this.decimalPipe.transform(value, '1.0-2');
          }
          break;
      }
    }else
    this.value = '';
    
  }
}
