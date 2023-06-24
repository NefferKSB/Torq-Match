import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';
import * as Hammer from 'hammerjs';

@Directive({
  selector: '[appSwipe]'
})
export class SwipeDirective {

  @Output() appSwipe = new EventEmitter<string>();

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const element = this.elementRef.nativeElement;

    const hammer = new Hammer.Manager(element);
    const swipe = new Hammer.Swipe();

    hammer.add(swipe);
    hammer.on('swipeleft', () => {
      this.appSwipe.emit('left');
    });

    hammer.on('swiperight', () => {
      this.appSwipe.emit('right');
    });
  }
}
