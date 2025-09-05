import { Component, ComponentFactoryResolver, Inject, Injector, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Modal } from '@shared/models/modal.model';
import { ModalSizeOptions, MODAL_SIZE } from '@shared/models/enum/modal-size.enum';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})

export class ModalDialogComponent implements OnInit {
  @ViewChild('component', { read: ViewContainerRef, static: true })
  componentTarget: ViewContainerRef;
  actionsFooter: TemplateRef<any>;
  fullscreen: boolean = false;
  isMinimize: boolean = false;
  evt: any;
  hiddenFullScreenIcon: any;


  constructor(
    public cdk: OverlayContainer,
    private dialogRef: MatDialogRef<ModalDialogComponent>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(MAT_DIALOG_DATA) public modal: Modal
  ) { }

  ngOnInit() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      this.modal.component
    );
    const componentRef = this.componentTarget.createComponent(
      factory,
      null,
      Injector.create({
        providers: [
          {
            provide: MAT_DIALOG_DATA,
            useValue: this.modal.dialog.data,
          },
        ],
        parent: this.injector,
      })
    );
    this.actionsFooter = componentRef.instance.actionsFooter;

    if (this.modal.options.size === ModalSizeOptions.FULL_SCREEN) {
      this.fullscreen = true;
    }

    this.hiddenFullScreenIcon = this.modal.options.hiddenFullScreenIcon;
  }

  close(data?: any) {
    if (data)
      this.dialogRef.close(data);
    else
      this.dialogRef.close(this.modal.dialog.data);
  }

  dragEnded(ev): void {
    this.evt = ev.source;
  }

  reset() {
    this.evt?._dragRef?.reset();
  }


  openFullscreen() {
    this.reset();
    this.viewScroll(false);
    if (this.isMinimize && this.modal.options.size !== ModalSizeOptions.FULL_SCREEN) {
      this.closeFullscreen();
      this.disablesScrollModal(false);
    }
    else {
      this.dialogRef.updateSize(MODAL_SIZE.full_screen.width, MODAL_SIZE.full_screen.height);
      this.dialogRef.updatePosition({
        top: MODAL_SIZE.full_screen.top,
        left: MODAL_SIZE.full_screen.left
      })
      this.fullscreen = true;
      this.isMinimize = false;
    }
  }

  closeFullscreen() {
    this.reset();
    this.viewScroll(false);
    this.isMinimize = false;
    this.fullscreen = false;
    const size = this.modal.options.size;
    switch (size) {
      case ModalSizeOptions.SMALL:
        this.dialogRef.updateSize(MODAL_SIZE.small.width, MODAL_SIZE.small.height);
        this.dialogRef.updatePosition({
          bottom: MODAL_SIZE.small.bottom,
          right: MODAL_SIZE.small.right,
        })
        break
      case ModalSizeOptions.M_SMALL:
        this.dialogRef.updateSize(MODAL_SIZE.m_small.width, MODAL_SIZE.m_small.height);
        this.dialogRef.updatePosition({
          bottom: MODAL_SIZE.m_small.bottom,
          right: MODAL_SIZE.m_small.right,
        })
        break
      case ModalSizeOptions.MEDIUM:
        this.dialogRef.updateSize(MODAL_SIZE.medium.width, MODAL_SIZE.medium.height);
        this.dialogRef.updatePosition({
          bottom: MODAL_SIZE.medium.bottom,
          right: MODAL_SIZE.medium.right,
        })
        break
      case ModalSizeOptions.LARGE:
        this.dialogRef.updateSize(MODAL_SIZE.large.width, MODAL_SIZE.large.height);
        this.dialogRef.updatePosition({
          bottom: MODAL_SIZE.large.bottom,
          right: MODAL_SIZE.large.right,
        })
        break
      case ModalSizeOptions.EXTRA_LARGE:
        this.dialogRef.updateSize(MODAL_SIZE.extra_large.width, MODAL_SIZE.extra_large.height);
        this.dialogRef.updatePosition({
          bottom: MODAL_SIZE.extra_large.bottom,
          right: MODAL_SIZE.extra_large.right,
        })

      case ModalSizeOptions.FULL_SCREEN:
        this.dialogRef.updateSize(MODAL_SIZE.extra_large.width, MODAL_SIZE.extra_large.height);
        this.dialogRef.updatePosition({
          bottom: MODAL_SIZE.extra_large.bottom,
          right: MODAL_SIZE.extra_large.right,
        })
        break
    }
  }

  minimize() {
    this.reset();
    this.viewScroll(true);
    this.isMinimize = true;
    this.fullscreen = false;
    this.dialogRef.updateSize(MODAL_SIZE.minimize.width, MODAL_SIZE.minimize.height);
    this.dialogRef.updatePosition({
      bottom: MODAL_SIZE.minimize.bottom,
      right: MODAL_SIZE.minimize.right,
    })
    this.disablesScrollModal(true);
  }

  toTop() {
    this.cdk.getContainerElement().childNodes.forEach((x: any) => {
      if (x.innerHTML.indexOf('id="' + this.modal.dialog.id + '"') <= 0)
        x.style["z-index"] = 998;
      else x.style["z-index"] = 999;
    });
  }

  getContentClass(): string {
    const size = this.modal.options.size;
    if (this.fullscreen) return "mat-dialog-content-full";
    switch (size) {
      case ModalSizeOptions.SMALL:
        return "mat-dialog-content-sm";
      case ModalSizeOptions.M_SMALL:
        return "mat-dialog-content-m-sm";
      case ModalSizeOptions.MEDIUM:
        return "mat-dialog-content-md";
      case ModalSizeOptions.LARGE:
        return "mat-dialog-content-lg";
      case ModalSizeOptions.EXTRA_LARGE:
        return "mat-dialog-content-elg";
      case ModalSizeOptions.FULL_SCREEN:
        return "mat-dialog-content-full";
    }
  }

  viewScroll(view: boolean) {
    const el = document.querySelector("html");
    if (!view) {
      if (!el.className.includes('cdk-global-scrollblock')) {
        el.className += 'cdk-global-scrollblock';
      }
    }
    else {
      if (el.classList.contains("cdk-global-scrollblock")) {
        el.classList.remove("cdk-global-scrollblock");
      }
    }
  }

  disablesScrollModal(disable: boolean) {
    const el = document.getElementById(this.modal.dialog.id);
    if (el) {
      if (disable) {
        if (!el.className.includes('mat-dialog-content-minimize')) {
          el.className += ' mat-dialog-content-minimize';
        }
      } else {
        if (el.classList.contains("mat-dialog-content-minimize")) {
          el.classList.remove("mat-dialog-content-minimize");
        }
      }
    }
  }

}
