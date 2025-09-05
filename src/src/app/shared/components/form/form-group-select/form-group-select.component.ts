import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FormGroupAbstractComponent } from '../form-group.abstract';

@Component({
  selector: 'form-group-select',
  templateUrl: './form-group-select.component.html',
  styleUrls: ['./form-group-select.component.scss'],
})
export class FormGroupSelectComponent extends FormGroupAbstractComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, { static: false }) viewport: CdkVirtualScrollViewport;
  selectedLabel: string;

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.item && this.item.value) {
      this.selectedLabel = this.getSelectedOptionLabel(this.item.value);
    }
  }

  getSelectedOptionLabel(valueKey): string {
    const find = this.item.options.find(x => x.key === valueKey);
    if (!find) {
      return null;
    }
    return find.value;
  }

  selectionChange(event: MatSelectChange) {
    this.selectedLabel = this.getSelectedOptionLabel(event.value);
  }
  
  openChange($event: boolean) {
    if (!$event) {
      return;
    }
    if (this.item.options) {
      this.viewport.scrollToIndex(0);
      this.viewport.checkViewportSize();
    }
  }

  removeValue() {
    this.form.get(this.item.key).setValue(null);
  }
}
