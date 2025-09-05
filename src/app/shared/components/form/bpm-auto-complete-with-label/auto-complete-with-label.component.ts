import { Component, Input, Attribute, ViewChild, AfterViewInit, Output, EventEmitter, OnInit, ChangeDetectorRef, AfterViewChecked, OnChanges } from '@angular/core';

@Component({
  selector: 'bpm-auto-complete',
  templateUrl: './auto-complete-with-label.component.html',
  styleUrls: ['./auto-complete-with-label.component.scss']
})
export class AutoCompleteWithLabelComponent implements OnChanges, OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('autoElement') autoElement: any;

  @Output() onBlur = new EventEmitter<any>();
  @Output() onModelChange = new EventEmitter<any>();

  @Input() multiple: boolean;
  @Input() model: any;
  @Input() directives: string;
  @Input() options: { text: any, value: any }[];
  @Input() visible: boolean = true;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;

  //optionSelecteds: any;
  flexLabel: number;
  flexInput: number;


  constructor(
    @Attribute('id') public id: string, 
    @Attribute('name') public name: string,
    @Attribute('label') public label: string,
    @Attribute('bindLabel') public bindLabel: string,
    @Attribute('bindValue') public bindValue: string,
    @Attribute('groupBy') public groupBy: string,
    @Attribute('focus') public focus: boolean,
    @Attribute('placeholder') public placeholder: string,
    @Attribute('colOfLabel') public colOfLabel: number,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnChanges(): void {
    if (this.multiple && this.model && !Array.isArray(this.model)) {
      var modelArrOrigin = this.model?.split(",");
      let modelArrFinal = [];
      modelArrOrigin.forEach(value => {
        var item = (this.options || []).find(x => x?.value === value);
        if (item && item != null) {
          modelArrFinal.push(value);
        }
      });
      this.model = modelArrFinal;
    }
  }

  ngOnInit(): void {
    if (this.label)
      this.flexLabel = 30;
    else
      this.flexLabel = 0;
    if (this.colOfLabel && this.colOfLabel > 1)
      this.flexLabel = this.colOfLabel;
    this.flexInput = 100 - this.flexLabel;
  }

  ngAfterViewInit() {
    if (this.focus) {
      setTimeout(() => {
        this.autoElement?.nativeElement?.focus();
      }, 100);
    }
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnChangeCheckBox(item: any): void {
    const i = (this.model || []).findIndex(x => x === item?.value);
    if (i >= 0)
      this.model?.splice(i, 1);
    else
      this.model?.push(item.value);

    this.ngModelChange(this.model);
  }

  ngOnBlur(item: any) {
    this.onBlur.emit(item);
  }

  ngModelChange(value: any) {
    if (this.multiple && value)
      this.onModelChange.emit(value?.join(','));
    else
      this.onModelChange.emit(value);
  }

}
