import {
  Directive,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  Input,
} from '@angular/core';

@Directive({
  selector: '[scrollTracker]',
})
export class ScrollTrackerDirective {
  @Input() scollingItems: number;
  @Output() scrollingFinished = new EventEmitter<void>();

  emitted = false;

  constructor(private el: ElementRef) {}

  @HostListener('scroll', [])
  onScroll(): void {
    if (!this.scollingItems || this.scollingItems === 0) {
      return;
    }
    const height = this.el.nativeElement.offsetHeight;
    const scrollTop = this.el.nativeElement.scrollTop;
    const totalHeight =
      this.scollingItems * this.el.nativeElement.children[0].offsetHeight;

    if (scrollTop + height >= totalHeight && !this.emitted) {
      this.emitted = true;
      this.scrollingFinished.emit();
    } else if (scrollTop + height < totalHeight) {
      this.emitted = false;
    }
  }
}
