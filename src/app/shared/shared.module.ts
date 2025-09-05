import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormItemDirective } from './directives/form-item.directive';
import { ResizableDirective } from './directives/resizeable.directive';
import { ScrollTrackerDirective } from './directives/scroll-tracker.directive';

import { CommentsComponent } from './components/comments/comments.component';
import { FormGroupInputComponent } from './components/form/form-group-input/form-group-input.component';
import { FormGroupSelectComponent } from './components/form/form-group-select/form-group-select.component';
import { DialogCommonComponent } from './components/dialogs/dialog-common/dialog-common.component';
import { DynamicFormComponent } from './components/form/dynamic-form/dynamic-form.component';
import { FormGroupCheckboxComponent } from './components/form/form-group-checkbox/form-group-checkbox.component';
import { FormGroupDateComponent } from './components/form/form-group-date/form-group-date.component';
import { FormGroupRadioComponent } from './components/form/form-group-radio/form-group-radio.component';
import { FormGroupSlideToggleComponent } from './components/form/form-group-slide-toggle/form-group-slide-toggle.component';
import { FormGroupTextareaComponent } from './components/form/form-group-textarea/form-group-textarea.component';
import { FormNgSelectComponent } from './components/form/form-ng-select/form-ng-select.component';
import { CommonTableComponent } from './components/common-table/common-table.component';
import { CommonTreeComponent } from './components/common-tree/common-tree.component';
import { TreeItemComponent } from './components/tree-item/tree-item.component';
import { FormGroupUploadComponent } from './components/form/form-group-upload/form-group-upload.component';
import { FormGroupDateTimeComponent } from './components/form/form-group-datetime/form-group-datetime.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { CommonSearchPickerComponent } from './components/common-search-picker/common-search-picker.component'
import { CommonDialogFrameComponent } from './components/dialogs/common-dialog-frame/common-dialog-frame.component';
import { DialogFrameDirective } from './directives/dialog-frame.directive';
import { DynamicItemFormHorizontalComponent } from './components/form/dynamic-item-form-horizontal/dynamic-item-form-horizontal.component';
import { DynamicItemsFormComponent } from './components/form/dynamic-items-form/dynamic-items-form.component';
import { FormMainTitleComponent } from './components/form/bpm-main-title/form-main-title.component';
import { FormLabelComponent } from './components/form/form-label/form-label.component';
import { FormMainTabComponent } from './components/form/form-main-tab/form-main-tab.component';
import { InputWithLabelComponent } from './components/form/bpm-input-with-label/input-with-label.component';
import { TextareaWithLabelComponent } from './components/form/bpm-textarea-with-label/textarea-with-label.component';
import { BpmExpansionPanelComponent } from './components/form/bpm-expansion-panel/bpm-expansion-panel.component';
import { SelectWithLabelComponent } from './components/form/bpm-select-with-label/select-with-label.component';
import { AutoCompleteWithLabelComponent } from './components/form/bpm-auto-complete-with-label/auto-complete-with-label.component';
import { BpmButtonComponent } from './components/form/bpm-button/bpm-button.component';
import { DatePickerWithLabelComponent } from './components/form/bpm-date-picker-with-label/date-picker-with-label.component';
import { DateTimePickerWithLabelComponent } from './components/form/bpm-date-time-picker-with-label/date-time-picker-with-label.component';
import { RadioGroupWithLabelComponent } from './components/form/bpm-radio-group-with-label/radio-group-with-label.component';
import { BpmCheckboxWithLabelComponent } from './components/form/bpm-checkbox-with-label/bpm-checkbox-with-label.component';
import { BpmCardWithTitleComponent } from './components/form/bpm-card-with-title/bpm-card-with-title.component';
import { BpmSlideToggleComponent } from './components/form/bpm-slide-toggle/bpm-slide-toggle.component';
import { BpmTableComponent } from './components/form/bpm-table/bpm-table.component';
import { ColumnValuePipe } from './pipe/column-value.pipe';
import { ConfirmDialogComponent } from './components/bpm-confirm-dialog/confirm-dialog.component';
import { ModalDialogComponent } from './components/bpm-modal-dialog/modal-dialog.component';
import { BpmLoadingComponent } from './components/bpm-loading/bpm-loading.component';
import { TranformDataPipe } from './pipe/tranform-data.pipe';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { BpmNumberWithLabelComponent } from './components/form/bpm-number-with-label/bpm-number-with-label.component';
import { IconValuePipe } from './pipe/icon-value.pipe';
import { DatePickerCustomWithLabelComponent } from './components/form/bpm-date-picker-custom-with-label/bpm-date-picker-custom-with-label.component';


const THIRD_MODULES = [
  MaterialModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  NgSelectModule,
  NgxMatTimepickerModule,
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  CurrencyMaskModule
];

const COMPONENTS = [
  CommentsComponent,
  FormGroupInputComponent,
  DialogCommonComponent,
  DynamicFormComponent,
  FormGroupSelectComponent,
  FormGroupCheckboxComponent,
  FormGroupDateComponent,
  FormGroupRadioComponent,
  FormGroupSlideToggleComponent,
  FormGroupTextareaComponent,
  FormNgSelectComponent,
  CommonTableComponent,
  CommonTreeComponent,
  TreeItemComponent,
  FormGroupUploadComponent,
  FormGroupDateTimeComponent,
  CommonSearchPickerComponent,
  CommonDialogFrameComponent,
  DynamicItemFormHorizontalComponent,
  DynamicItemsFormComponent,
  FormMainTitleComponent,
  FormLabelComponent,
  FormMainTabComponent,
  InputWithLabelComponent,
  TextareaWithLabelComponent,
  BpmExpansionPanelComponent,
  SelectWithLabelComponent,
  AutoCompleteWithLabelComponent,
  BpmButtonComponent,
  DatePickerWithLabelComponent,
  DatePickerCustomWithLabelComponent,
  DateTimePickerWithLabelComponent,
  RadioGroupWithLabelComponent,
  BpmCheckboxWithLabelComponent,
  BpmCardWithTitleComponent,
  BpmSlideToggleComponent,
  BpmTableComponent,
  ConfirmDialogComponent,
  ModalDialogComponent,
  BpmLoadingComponent,
  BpmNumberWithLabelComponent
];

const PIPE =[
  ColumnValuePipe,
  TranformDataPipe
]

const DIRECTIVES = [
  FormItemDirective,
  ResizableDirective,
  ScrollTrackerDirective,
  DialogFrameDirective,
];
@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES,...PIPE, IconValuePipe],
  imports: [CommonModule, ...THIRD_MODULES],
  exports: [CommonModule, ...THIRD_MODULES, ...COMPONENTS, ...DIRECTIVES],
  entryComponents: [DialogCommonComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
