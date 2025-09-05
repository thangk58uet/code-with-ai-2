import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dialogFrame]',
})
export class DialogFrameDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}