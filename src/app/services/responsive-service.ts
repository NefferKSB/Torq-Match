import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class ResponsiveService {
  public screenWidth: string = "";

  constructor() {
    this.checkWidth();
  }

  public checkWidth() {
    const width = window.innerWidth;
    if (width <= 599) {
        this.screenWidth = 'sm';
    } else if (width > 599 && width <= 959) {
        this.screenWidth = 'md';
    } else {
        this.screenWidth = 'lg';
    }
  }
}
