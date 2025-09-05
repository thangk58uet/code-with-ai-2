import {
    Component,
    Input,
    Attribute,
    ViewChild,
    AfterViewInit,
    Output,
    EventEmitter,
    OnInit,
    ChangeDetectorRef,
    AfterViewChecked,
} from '@angular/core';

@Component({
    selector: 'bpm-textarea',
    templateUrl: './textarea-with-label.component.html',
    styleUrls: ['./textarea-with-label.component.scss'],
})
export class TextareaWithLabelComponent implements OnInit, AfterViewInit, AfterViewChecked {
    @Output() onKeyup = new EventEmitter<any>();
    @Output() onBlur = new EventEmitter<any>();
    @Output() onModelChange = new EventEmitter<any>();

    @ViewChild('inputTextAreaElement') inputTextAreaElement: any;

    @Input() model: string;
    @Input() options: { key: any; value: any; checked?: boolean; className?: string }[];
    @Input() visible: boolean = true;
    @Input() disabled: boolean = false;
    @Input() required: boolean = false;
    @Input() resizeDirection: string = 'both'

    flexLabel: number;
    flexInput: number;

    constructor(
        @Attribute('id') public id: string,
        @Attribute('name') public name: string,
        @Attribute('label') public label: string,
        @Attribute('note') public note: string,
        @Attribute('maxLength') public maxLength: number,
        @Attribute('minLength') public minLength: number,
        @Attribute('focus') public focus: boolean,
        @Attribute('placeholder') public placeholder: string,
        @Attribute('colOfLabel') public colOfLabel: number,
        @Attribute('minRows') public minRows: number,
        @Attribute('maxRows') public maxRows: number,
        @Attribute('colorLabel') public colorLabel: string,
        @Attribute('requiredStr') public requiredStr: string,
        @Attribute('boldLabel') public boldLabel: string,
        private cdRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        if (this.label) this.flexLabel = 30;
        else this.flexLabel = 0;
        if (this.colOfLabel && this.colOfLabel > 1) this.flexLabel = this.colOfLabel;
        this.flexInput = 100 - this.flexLabel;
    }

    ngAfterViewInit() {
        if (this.focus) {
            setTimeout(() => {
                this.inputTextAreaElement.nativeElement.focus();
            }, 100);
        }
    }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    ngOnKeyup(event: KeyboardEvent) {
        let value = (event.target as HTMLInputElement)?.value;
        this.ngModelChange(value);
        this.onKeyup.emit(value);
    }

    ngOnBlur(event: KeyboardEvent) {
        this.onBlur.emit((event.target as HTMLInputElement).value);
    }

    ngModelChange(value: String) {
        this.onModelChange.emit(value);
    }
}
