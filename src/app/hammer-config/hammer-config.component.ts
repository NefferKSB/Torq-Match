import { HammerGestureConfig } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import * as Hammer from 'hammerjs';

@Injectable()
export class HammerConfigComponent extends HammerGestureConfig {
  override overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL },
  };

  override buildHammer(element: HTMLElement): HammerManager {
    const hammer = new Hammer(element, {
      touchAction: 'auto',
      inputClass: Hammer.TouchInput,
      recognizers: [
        // Add any additional recognizers or configuration here
      ],
    });

    return hammer;
  }
}
