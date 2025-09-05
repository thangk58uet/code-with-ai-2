import { AfterViewChecked, Attribute, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'bpm-slide-toggle',
  templateUrl: './bpm-slide-toggle.component.html',
  styleUrls: ['./bpm-slide-toggle.component.scss']
})
export class BpmSlideToggleComponent implements OnInit, AfterViewChecked {

  @Output() onBlur = new EventEmitter<any>();
  @Output() onModelChange = new EventEmitter<any>();
  @Output() onChange = new EventEmitter<MatSlideToggleChange>();
  
  @Input() model: any;
  @Input() visible: boolean = true;
  @Input() disabled: boolean = false;

  flexLabel: number;
  flexInput: number;


  constructor(
    @Attribute('id') public id: string,
    @Attribute('name') public name: string,
    @Attribute('label') public label: string,
    @Attribute('require') public require: boolean,
    @Attribute('colOfLabel') public colOfLabel: number,
    @Attribute('color') public color: string = "primary",
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.label)
      this.flexLabel = 30;
    else
      this.flexLabel = 0;
    if (this.colOfLabel && this.colOfLabel > 1)
      this.flexLabel = this.colOfLabel;
    this.flexInput = 100 - this.flexLabel;
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnBlur(event: KeyboardEvent) {
    this.onBlur.emit((event.target as HTMLInputElement));
  }

  ngOnChange(value: MatSlideToggleChange){
    this.onChange.emit(value);
  }

  ngModelChange(value: String) {
    this.onModelChange.emit(value);
  }
}

