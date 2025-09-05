import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextboxItem } from '@shared/models/item-form.model';
import { FormGroupService } from '@shared/services/form-group.service';
import { SearchPickerDataRequest, SearchPickerDisableOption, SearchPickerInitOption } from '@shared/models/search-picker.model';

@Component({
  selector: 'bpm-common-search-picker',
  templateUrl: './common-search-picker.component.html',
  styleUrls: ['./common-search-picker.component.scss'],
})
export class CommonSearchPickerComponent {
  filterForm: FormGroup;
  selectedSearchValue = [];
  selectedPickedItem = [];
  outputValue = [];

  formItem = new TextboxItem<string>({
    key: 'filterForm',
    value: '',
  });

  @Input() initSetting = new SearchPickerInitOption<any>({key: '', displayKey: ''});

  @Output() outputEmitter: EventEmitter<any> = new EventEmitter();
  @Output() requestDataEmitter: EventEmitter<SearchPickerDataRequest> = new EventEmitter();

  constructor(private formService: FormGroupService) {
    this.filterForm = this.formService.toFormGroup([this.formItem]);
  }

  get filterValue() {
    return this.filterForm.get('filterForm').value;
  }

  selectItem(data, reciever: any[]) {
    if (this.isDisabled(data)) {
       return;
    }
    if (this.initSetting.onlyOne && reciever.length > 0) {
      reciever.splice(0, 1);
    } else {
      const find = reciever.findIndex((x) => x[this.initSetting.key] === data[this.initSetting.key]);
      if (find > -1) {
        reciever.splice(find, 1);
        return;
      }
    }
    reciever.push(data);
  }

  transferItems() {
    if (this.initSetting.onlyOne && this.outputValue.length > 0) {
      this.outputValue.splice(0, 1);
    }
    this.selectedSearchValue.forEach((item) => {
      if (!this.outputValue.includes(item)) {
        this.outputValue.push(item);
      }
    });
    this.selectedSearchValue = [];
    this.outputEmitter.emit(this.outputValue);
  }

  removeItems() {
    this.outputValue = this.outputValue.filter((item) => {
      return this.selectedPickedItem.indexOf(item) < 0;
    });
    this.selectedPickedItem = [];
    this.outputEmitter.emit(this.outputValue);
  }

  /** Emit Request new data with new filter */
  search() {
    this.selectedSearchValue = [];
    this.requestDataEmitter.emit({filterValue: this.filterValue, plusSize: false});
  }

  /** Emit Request extra data with old filter */
  onScrollingFinished() {
    this.requestDataEmitter.emit({filterValue: this.filterValue, plusSize: true});
  }

  isDisabled(data) {
    if (this.initSetting.disableOption.disabledData.length === 0) {
      return false;
    }
    return  this.initSetting.disableOption.disabledData.findIndex(x => x[this.initSetting.disableOption.key] === data[this.initSetting.disableOption.key]) > -1
  }
}
