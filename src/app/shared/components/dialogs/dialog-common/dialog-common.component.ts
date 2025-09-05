import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DIALOG_TYPE } from '@shared/constants/dialog.constant';
import { CommonDialogData } from '@shared/models/dialog.model';

@Component({
  selector: 'dialog-common',
  templateUrl: './dialog-common.component.html',
  styleUrls: ['./dialog-common.component.scss']
})
export class DialogCommonComponent implements OnInit {
  dialogType = DIALOG_TYPE;

  constructor(
    private dialogRef: MatDialogRef<DialogCommonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommonDialogData
  ) { }

  ngOnInit(): void {
  }

  onCancelClick() {
    this.dialogRef.close(false);
  }

  onConfirmClick() {
    this.dialogRef.close(true);
  }

}
