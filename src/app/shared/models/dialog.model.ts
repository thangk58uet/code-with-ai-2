import { Type } from "@angular/core";

export class CommonDialogData {
    type: 'success' | 'confirm' | 'error' | 'customize';
    title: string;
    content?: string;
    titleConfirm?: string;
    titleCancel?: string;
}

export class CommonDialogSetting {
    width?: string;
    panelClass?: string;
    height?: string;
}

export class DialogFrame {
    component: Type<any>;
    title: string;
    data: any;
}
