import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isScrolled = false;
  menuOffset: number;
  isLinkDisabled: boolean;
  buttonColor: string;

  constructor(private viewportScroller: ViewportScroller, public navbarService: NavbarService) {
    this.menuOffset = 115;
    this.isLinkDisabled = this.navbarService.isLinkDisabled;
    this.buttonColor = "#27291C";
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
  }

  public scrollToElementId(elementId: string): void {
    if(elementId == "contact") {
      this.viewportScroller.setOffset([0, 60]);
    } else {
      this.viewportScroller.setOffset([0, 115]);
    }
    this.viewportScroller.scrollToAnchor(elementId);
  }

  scroll = (): void => {

    let scrollHeigth;

    if(window.innerWidth < 350) {
      scrollHeigth = 150;
    } else if(window.innerWidth < 500 && window.innerWidth > 350) {
      scrollHeigth = 250;
    } else if(window.innerWidth < 700 && window.innerWidth > 500) {
      scrollHeigth = 350;
    } else if(window.innerWidth < 1000 && window.innerWidth > 700) {
      scrollHeigth = 500;
    } else {
      scrollHeigth = 650;
    }

     if(window.scrollY >= scrollHeigth) {
      document.body.style.setProperty('--navbar-scroll', "#8B9263");
      document.body.style.setProperty('--navbar-scroll-text', "#EFEDE3");
      document.body.style.setProperty('--navbar-scroll-shadow', "0px 6px 12px -5px #000000");
      document.body.style.setProperty('--navbar-button-color', "#EFEDE3");
     } else if(window.scrollY < scrollHeigth) {
      document.body.style.setProperty('--navbar-scroll', "#EFEDE3");
      document.body.style.setProperty('--navbar-scroll-text', "#27291C");
      document.body.style.setProperty('--navbar-scroll-shadow', "none");
      document.body.style.setProperty('--navbar-button-color', "#27291C");
     }
   }
}
