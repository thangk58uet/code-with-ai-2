import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@shared/components/bpm-confirm-dialog/confirm-dialog.component';
import { CommonDialogData } from '@shared/models/dialog.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) { }
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  public open(data: CommonDialogData,options?: MatDialogConfig, ) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      viewContainerRef: options?.viewContainerRef || null,
      id: options?.id || null,
      role: options?.role || null,
      panelClass: options?.panelClass || null,
      hasBackdrop: options?.hasBackdrop || true,
      backdropClass: options?.backdropClass || null,
      disableClose: options?.disableClose || true,
      width: options?.width || "400px",
      height: options?.height,
      minWidth: options?.minWidth,
      minHeight: options?.minHeight,
      maxWidth: options?.maxWidth || "600px",
      maxHeight: options?.maxHeight,
      position: options?.position,
      direction: options?.direction,
      autoFocus: options?.autoFocus || false,
      restoreFocus: options?.restoreFocus || false,
      scrollStrategy: options?.scrollStrategy,
      closeOnNavigation: options?.closeOnNavigation,
      data: {...data}
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
