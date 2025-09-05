import { OnInit, Directive, HostListener, ElementRef, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

export const CURRENCY_INPUT_MASK_DIRECTIVE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CurrencyMaskDirective),
    multi: true,
};

@Directive({
    selector: '[currencyMaskDirective]',
    providers: [CURRENCY_INPUT_MASK_DIRECTIVE_VALUE_ACCESSOR, DecimalPipe],
})
export class CurrencyMaskDirective implements ControlValueAccessor, OnInit {
    private el: HTMLInputElement;
    private onModelChange: Function;
    private onModelTouched: Function;
    private lastNumVal: number;
    private DECIMAL_MARK = '.';
    private MINUS_MARK = '-';

    @Input('decimalFormat') decimalFormat = '1.2-2';

    constructor(private elementRef: ElementRef, private decimalPipe: DecimalPipe) {}

    ngOnInit() {
        this.el = this.elementRef.nativeElement;
    }

    @HostListener('focus', ['$event'])
    handleFocus(event: any) {
        const strVal: string = this.getInputValue();
        const unmaskedStr: string = this.getUnmaskedValue(strVal);
        this.updateInputValue(unmaskedStr);
    }

    @HostListener('cut', ['$event'])
    handleCut(event: any) {
        setTimeout(() => {
            this.inputUpdated();
        }, 0);
    }

    @HostListener('keypress', ['$event'])
    handleKeypress(event: any) {
        // Restrict characters
        const newChar: string = String.fromCharCode(event.which);
        const allowedChars: RegExp = /^[\d.-]+$/;
        if (!allowedChars.test(newChar)) {
            event.preventDefault();
            return;
        }
        // Handle decimal mark input
        let currentValue: string = event.target.value;
        const separatorIdx: number = currentValue.indexOf(this.DECIMAL_MARK);
        const hasFractionalPart: boolean = separatorIdx >= 0;
        const negativeIdx: number = currentValue.indexOf(this.MINUS_MARK);
        const hasNegativePart: boolean = negativeIdx >= 0;

        // Handle false special input
        const splittedValue = currentValue.split('');
        let negativeCount = 0;
        let fractionalCount = 0;
        splittedValue.forEach(x => {
            if (x === this.MINUS_MARK) {
                negativeCount++;
            }
            if (x === this.DECIMAL_MARK) {
                fractionalCount++;
            }
        })

        if ((negativeCount === 1 && newChar === this.MINUS_MARK) || (fractionalCount === 1 && newChar === this.DECIMAL_MARK)) {
            event.preventDefault();
            return;
        }

        // Handle negative number
        if (hasNegativePart && currentValue === this.MINUS_MARK) {
            currentValue = '-0'
        }
        
        // Handle max length
        if (currentValue !== '') {
            const currentValueToCheck = this.convertStrToDecimal(currentValue).toString();
            if (hasFractionalPart) {
                if (separatorIdx > 14) {
                    event.preventDefault();
                    return;
                }
            } else {
                if (currentValueToCheck.length > 14) {
                    event.preventDefault();
                    return;
                }
            }
        }

        if (!hasFractionalPart || newChar !== this.DECIMAL_MARK || newChar !== this.MINUS_MARK) {
            return;
        }

        const isOutsideSelection = !this.isIdxBetweenSelection(separatorIdx);
        if (isOutsideSelection) {
            const positionAfterMark = separatorIdx + 1;
            this.setCursorPosition(positionAfterMark);
            event.preventDefault();
            return;
        }
    }

    @HostListener('input', ['$event'])
    handleInput(event: any) {
        this.inputUpdated();
    }

    @HostListener('paste', ['$event'])
    handlePaste(event: any) {
        setTimeout(() => {
            this.inputUpdated();
        }, 1);
    }

    @HostListener('blur', ['$event'])
    handleBlur(event: any) {
        const strVal: string = this.getInputValue();
        const numVal: number = this.convertStrToDecimal(strVal);
        this.maskInput(numVal);
        this.onModelTouched.apply(event);
    }
    // @HostListener('ngModelChange', ['$event'])
    // handleModelChange(event: any) {
    //   // Restrict characters
    //   // const newChar: string = String.fromCharCode(event.which);
    //   // const allowedChars: RegExp = /^[\d.]+$/;
    //   // if (!allowedChars.test(newChar)) {
    //   //   event.preventDefault();
    //   //   return;
    //   // }

    //   const strVal: string = this.getInputValue();
    //   const unmaskedStr: string = this.getUnmaskedValue(strVal);
    //   const numVal: number = this.convertStrToDecimal(strVal);
    //   this.updateInputValue(unmaskedStr);
    //   this.maskInput(numVal);
    //   this.onModelTouched.apply(event);
    // }

    registerOnChange(callbackFunction: Function): void {
        this.onModelChange = callbackFunction;
    }

    registerOnTouched(callbackFunction: Function): void {
        this.onModelTouched = callbackFunction;
    }

    setDisabledState(value: boolean): void {
        this.el.disabled = value;
    }

    writeValue(numValue: number): void {
        this.maskInput(numValue);
    }

    private maskInput(numVal: number): void {
        if (!this.isNumeric(numVal)) {
            this.updateInputValue('');
            return;
        }
        const strVal: string = this.convertDecimalToStr(numVal);
        const newVal: string = this.transformWithPipe(strVal);
        this.updateInputValue(newVal);
    }

    private inputUpdated() {
        this.restrictDecimalValue();
        const strVal: string = this.getInputValue();
        const unmaskedVal: string = this.getUnmaskedValue(strVal);
        const numVal: number = this.convertStrToDecimal(unmaskedVal);
        if (numVal !== this.lastNumVal) {
            this.lastNumVal = numVal;
            this.onModelChange(numVal);
        }
    }

    private restrictDecimalValue(): void {
        const strVal: string = this.getInputValue();
        const dotIdx: number = strVal.indexOf(this.DECIMAL_MARK);
        const hasFractionalPart: boolean = dotIdx >= 0;
        if (hasFractionalPart) {
            const fractionalPart: string = strVal.substring(dotIdx + 1);
            if (fractionalPart.length > 2) {
                const choppedVal: string = strVal.substring(0, dotIdx + 3);
                this.updateInputValue(choppedVal, true);
                return;
            }
        }
    }

    private  transformWithPipe(str: string): string {
        return this.decimalPipe.transform(str, this.decimalFormat);
    }
    private getUnmaskedValue(value: string): string {
        return value.replace(/[^-\d\\.]/g, '');
    }
    private updateInputValue(value: string, savePosition = false) {
        if (savePosition) {
            this.saveCursorPosition();
        }
        this.el.value = value;
    }
    private getInputValue(): string {
        return this.el.value;
    }
    private convertStrToDecimal(str: string): number {
        return this.isNumeric(str) ? parseFloat(str) : null;
    }
    private convertDecimalToStr(n: number): string {
        return this.isNumeric(n) ? n + '' : '';
    }
    private isNumeric(n: any): boolean {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    private saveCursorPosition() {
        const position: number = this.el.selectionStart;
        setTimeout(() => {
            this.setCursorPosition(position);
        }, 1);
    }
    private setCursorPosition(position: number) {
        this.el.selectionStart = position;
        this.el.selectionEnd = position;
    }
    private isIdxBetweenSelection(idx: number) {
        if (this.el.selectionStart === this.el.selectionEnd) {
            return false;
        }
        return idx >= this.el.selectionStart && idx < this.el.selectionEnd;
    }
}
