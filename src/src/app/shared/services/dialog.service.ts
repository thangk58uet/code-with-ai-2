import { Injectable, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonDialogFrameComponent } from '@shared/components/dialogs/common-dialog-frame/common-dialog-frame.component';
import { DialogCommonComponent } from '@shared/components/dialogs/dialog-common/dialog-common.component';
import { CommonDialogData, CommonDialogSetting, DialogFrame } from '@shared/models/dialog.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {
  }

  openCommonDialog(dialogData: CommonDialogData, dialogSetting: CommonDialogSetting = {}) {
    const dialogRef = this.dialog.open(DialogCommonComponent, {
      width: dialogSetting.width || '400px',
      disableClose: true,
      panelClass: dialogSetting.panelClass,
      height: dialogSetting.height,
      data: {
        ...dialogData
      }
    });
    return dialogRef;
  }

  initDialogFrame(dialogFrameConfig: DialogFrame) {
    const dialogRef = this.dialog.open(CommonDialogFrameComponent, {
      width: '1280px',
      disableClose: true,
      panelClass: 'dialog-frame',
      data: dialogFrameConfig
    });
    return dialogRef;
  }
}
