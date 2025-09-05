import { Component, ComponentFactoryResolver, Inject, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogFrameDirective } from '@shared/directives/dialog-frame.directive';
import { FrameComponent } from '@shared/interface/dialog-frame.interface';
import { DialogFrame } from '@shared/models/dialog.model';
@Component({
    selector: 'app-common-dialog-frame',
    templateUrl: './common-dialog-frame.component.html',
    styleUrls: ['./common-dialog-frame.component.scss'],
})
export class CommonDialogFrameComponent implements OnInit {

    @ViewChild(DialogFrameDirective, { static: true }) dialogFrame!: DialogFrameDirective;

    constructor(
        private dialogRef: MatDialogRef<CommonDialogFrameComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: DialogFrame,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    ngOnInit() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.dialogData.component);
        const viewContainerRef = this.dialogFrame.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent<FrameComponent>(componentFactory);
        componentRef.instance.data = this.dialogData.data;
    }

    close() {
        this.dialogRef.close();
    }
}
