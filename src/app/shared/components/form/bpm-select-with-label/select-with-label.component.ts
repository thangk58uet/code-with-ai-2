import { Component, Input, Attribute, ViewChild, AfterViewInit, Output, EventEmitter, OnInit, AfterViewChecked, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'bpm-select',
  templateUrl: './select-with-label.component.html',
  styleUrls: ['./select-with-label.component.scss']
})
export class SelectWithLabelComponent implements OnChanges, OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('selectElement') inputElement: any;
  @ViewChild(CdkVirtualScrollViewport, { static: false }) viewport: CdkVirtualScrollViewport;

  @Output() onKeyup = new EventEmitter<any>();
  @Output() onBlur = new EventEmitter<any>();
  @Output() onModelChange = new EventEmitter<any>();

  @Input() multiple: boolean;
  @Input() model: any;
  @Input() directives: string;
  @Input() options: { text: any, value: any }[];
  @Input() visible: boolean = true;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;

  flexLabel: number;
  flexInput: number;
  optionsLocal: { text: any, value: any }[]

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
    @Attribute('colorLabel') public colorLabel: string,
    @Attribute('boldLabel') public boldLabel: string,
    @Attribute('requiredStr') public requiredStr: string,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.options && !changes?.options.firstChange)
      this.optionsLocal = this.options;

    if (this.multiple && this.model && !Array.isArray(this.model)) {
      var modelArrOrigin = this.model?.split(",");
      let modelArrFinal = [];
      modelArrOrigin.forEach(value => {
        var item = (this.optionsLocal || []).find(x => x?.value === value);
        if (item) {
          modelArrFinal.push(value);
        }
      });
      this.model = modelArrFinal;
    }

  }

  ngOnInit(): void {
    this.optionsLocal = this.options;
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
        this.inputElement.nativeElement.focus();
      }, 100);
    }
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  openChange($event: boolean) {
    if (!$event) {
      return;
    }
    if (this.multiple) {
      // this.viewport.scrollToIndex(0);
      // this.viewport.checkViewportSize();
    }
  }

  removeValue() {
    this.model = null;
    this.ngModelChange(null);
  }

  ngOnChange(item: MatSelectChange) {
    var value = item?.value;
    this.ngModelChange(value);
  }

  ngOnBlur(item: any) {
    this.onBlur.emit(item);
  }

  ngOnKeyUp(item: any) {
    this.onKeyup.emit(item);
  }

  ngModelChange(value: any) {
    if (this.multiple && value)
      this.onModelChange.emit(value?.join(','));
    else
      this.onModelChange.emit(value);
  }
}
