import { Type } from "@angular/core";
import { MatDialogConfig } from "@angular/material/dialog";
import { ModalSizeOptions, MODAL_SIZE } from "./enum/modal-size.enum";

export interface ModalOptions {
  footer?: boolean;
  close?: boolean;
  size?: ModalSizeOptions;
  title?: string;
  hiddenFullScreenIcon?: boolean
}


export class Modal {
  static defaultModalOptions: ModalOptions = {
    footer: false,
    close: false,
    title: 'Thông tin',
    size: ModalSizeOptions.MEDIUM,
    hiddenFullScreenIcon: false,
  };

  static defaultModalConfig: MatDialogConfig = {
    data: null,
    ariaDescribedBy: null,
    ariaLabel: null,
    ariaLabelledBy: null,
    autoFocus: false,
    backdropClass: null,
    closeOnNavigation: false,
    componentFactoryResolver: null,
    direction: 'ltr',
    disableClose: true,
    hasBackdrop: true,
    height: '',
    id: '',
    maxHeight: null,
    maxWidth: null,
    minHeight: null,
    minWidth: null,
    panelClass: '',
    position: { top: '', bottom: '', left: '', right: '' },
    restoreFocus: false,
    role: "dialog",
    scrollStrategy: null,
    viewContainerRef: null,
    width: '',
  };

  public component: Type<any>;
  public options = Modal.defaultModalOptions;
  public dialog = Modal.defaultModalConfig;

  constructor(
    component: Type<any>,
    options?: ModalOptions,
    dialog?: MatDialogConfig,
  ) {
    this.component = component;
    if (options) {
      this.options = Object.assign({}, Modal.defaultModalOptions, options)
      switch (options.size) {
        case ModalSizeOptions.SMALL:
          this.dialog.width = MODAL_SIZE.small.width;
          this.dialog.height = MODAL_SIZE.small.height;
          break
        case ModalSizeOptions.M_SMALL:
          this.dialog.width = MODAL_SIZE.m_small.width;
          this.dialog.height = MODAL_SIZE.m_small.height;
          break
        case ModalSizeOptions.MEDIUM:
          this.dialog.width = MODAL_SIZE.medium.width;
          this.dialog.height = MODAL_SIZE.medium.height;
          break
        case ModalSizeOptions.LARGE:
          this.dialog.width = MODAL_SIZE.large.width;
          this.dialog.height = MODAL_SIZE.large.height;
          break
        case ModalSizeOptions.EXTRA_LARGE:
          this.dialog.width = MODAL_SIZE.extra_large.width;
          this.dialog.height = MODAL_SIZE.extra_large.height;
          break
          case ModalSizeOptions.FULL_SCREEN:
            this.dialog.width = MODAL_SIZE.full_screen.width;
            this.dialog.height = MODAL_SIZE.full_screen.height;
            break
      }
    }
    if (dialog)
      this.dialog = Object.assign({}, Modal.defaultModalConfig, dialog)
    if (this.dialog && !this.dialog.id)
      this.dialog.id = !dialog?.id ? this.genUUID() : dialog.id;

  }

  genUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
