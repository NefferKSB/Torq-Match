import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { ResponsiveService } from '../services/responsive-service';

@Component({
  selector: 'app-advantages',
  templateUrl: './advantages.component.html',
  styleUrls: ['./advantages.component.css']
})
export class AdvantagesComponent implements OnInit {
  // This is the option that uses the package's AnimationOption interface
  options: AnimationOptions = {
    path: '/assets/lottie/mechanics.json'
  };

  rightPosition: string;
  screenSize: string = this.responsiveService.screenWidth;

  constructor(private responsiveService: ResponsiveService) {
    this.rightPosition = "60px";
  }

  ngOnInit(): void {}

  // This is the component function that binds to the animationCreated event from the package
  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  onResize(event: any){
    this.responsiveService.checkWidth();
    this.screenSize = this.responsiveService.screenWidth;
    this.setResponsiveAttrs(this.screenSize);
  }

  setResponsiveAttrs(screenSize: string) {
    if(screenSize === 'lg') {
      this.rightPosition = "60px";
    }
    if(screenSize === 'md') {
      this.rightPosition = "0px";
    }
    if(screenSize === 'sm') {
      this.rightPosition = "0px";
    }
  }
}
