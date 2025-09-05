import { Component, Input, Attribute, Output, EventEmitter, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'bpm-checkbox',
  templateUrl: './bpm-checkbox-with-label.component.html',
  styleUrls: ['./bpm-checkbox-with-label.component.scss']
})
export class BpmCheckboxWithLabelComponent implements OnInit, AfterViewChecked {

  @Output() onBlur = new EventEmitter<any>();
  @Output() onModelChange = new EventEmitter<any>();
  @Output() onChange = new EventEmitter<MatCheckboxChange>();
  
  @Input() model: any;
  @Input() visible: boolean = true;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  flexLabel: number;
  flexInput: number;


  constructor(
    @Attribute('id') public id: string,
    @Attribute('name') public name: string,
    @Attribute('label') public label: string,
    @Attribute('colOfLabel') public colOfLabel: number,
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

  ngOnChange(value: MatCheckboxChange){
    this.onChange.emit(value);
  }

  ngModelChange(value: String) {
    this.onModelChange.emit(value);
  }
}
