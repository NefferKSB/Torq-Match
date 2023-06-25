import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from '../services/responsive-service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  paddingTop!: string;
  screenSize: string = this.responsiveService.screenWidth;

  constructor(private responsiveService: ResponsiveService) { }

  ngOnInit(): void {
  }

  onResize(event: any){
    this.responsiveService.checkWidth();
    this.screenSize = this.responsiveService.screenWidth;
    this.setResponsiveAttrs(this.screenSize);
  }

  setResponsiveAttrs(screenSize: string) {
    if(screenSize === 'lg') {
      this.paddingTop = "150px";
    }
    if(screenSize === 'md') {
      this.paddingTop = "150px";
    }
    if(screenSize === 'sm') {
      this.paddingTop = "50px";
    }
  }
}
