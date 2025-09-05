import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';;
import { FormGroupAbstractComponent } from '../form-group.abstract';

@Component({
  selector: 'form-group-upload',
  templateUrl: './form-group-upload.component.html',
  styleUrls: ['./form-group-upload.component.scss']
})
export class FormGroupUploadComponent extends FormGroupAbstractComponent implements AfterViewInit {

  @ViewChild('inputElement') inputElement: any;
  constructor() {
    super();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.inputElement.nativeElement.value = this.form.get(this.item.key).value;
    });

    if (this.item.focus) {
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
      }, 100);
    }
  }

  getBase64(event): void {
    const file = event.target.files;
    if (!file || !file[0]) {
      return;
    }
    
    this.form.get(this.item.key).setValue(file[0]);
    this.inputElement.nativeElement.value = file[0].name;
    event.target.value = '';
  }

  removeFile(): void {
    this.form.get(this.item.key).setValue(null);
    this.inputElement.nativeElement.value = null;
  }

  markTouched(): void {
    if (!this.form.get(this.item.key).touched) {
      this.form.get(this.item.key).markAsTouched();
    }
  }
}
