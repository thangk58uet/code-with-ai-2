import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalDialogComponent } from '@shared/components/bpm-modal-dialog/modal-dialog.component';
import { Modal } from '@shared/models/modal.model';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(public dialog: MatDialog) { }
  dialogRef: MatDialogRef<ModalDialogComponent>;

  public openModal(modal?: Modal): any {
    this.dialogRef = this.dialog.open(ModalDialogComponent, {
      ...modal.dialog,
      data: modal
    });
    return this.dialogRef;
  }

  public closed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
      return res;
    }
    ));
  }

}
