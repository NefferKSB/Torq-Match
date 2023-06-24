import { animate, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { Component, Input, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { ResponsiveService } from '../services/responsive-service';

interface Item {
  imageSrc: string;
  imageAlt: string;
  imageText: string;
}
@Component({
  selector: 'app-gallery-lightbox',
  templateUrl: './gallery-lightbox.component.html',
  styleUrls: ['./gallery-lightbox.component.css'],
  animations: [
    trigger('animation', [
      transition('void => visible', [
        style({transform: 'scale(0.5)'}),
        animate('150ms', style({transform: 'scale(1)'}))
      ]),
      transition('visible => void', [
        style({transform: 'scale(1)'}),
        animate('150ms', style({transform: 'scale(0.5)'}))
      ])
    ]),
    trigger('animation2', [
      transition(':leave', [
        style({opacity: 1}),
        animate('50ms', style({opacity: 0.8}))
      ])
    ])
  ],
  providers: []
})

export class GallaryLightboxComponent implements OnInit {
  @Input() galleryData: Item[] = [];
  @Input() showCount = false;
  @ViewChild('galElement', { static: false, read: ElementRef}) galElement!: ElementRef;
  @ViewChild('swipeElement') swipeElementRef!: ElementRef;

  previewImage = false;
  showMask = false;
  currentLightboxImage: Item = this.galleryData[0];
  currentIndex = 0;
  controls = true;
  totalImageCount = 0;
  isLinkDisabled: boolean;
  screenSize: string = this.responsiveService.screenWidth;
  countPaddingLeft!: string;
  countPaddingRight!: string;
  initialX!: number;

  constructor(
    private renderer: Renderer2,
    public navbarService: NavbarService,
    private responsiveService: ResponsiveService)
  {
    this.isLinkDisabled = this.navbarService.isLinkDisabled;
  }

  ngOnInit(): void {
    this.totalImageCount = this.galleryData.length;
  }

  onPreviewImage(index: number): void {
    this.navbarService.isLinkDisabled = true;
    this.scrollToTarget();
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    this.showMask = true;
    this.previewImage = true;
    this.currentIndex = index;
    this.currentLightboxImage = this.galleryData[index];
  }

  onAnimationEnd(event: AnimationEvent) {
    if(event.toState === 'void') {
      this.showMask = false;
    }
  }

  onClosePreview() {
    this.navbarService.isLinkDisabled = false;
    this.renderer.setStyle(document.body, 'overflow', 'auto');
    this.previewImage = false;
  }

  next(): void {
    this.currentIndex = this.currentIndex + 1;
    if (this.currentIndex > this.galleryData.length - 1) {
      this.currentIndex = 0;
    }
    this.currentLightboxImage = this.galleryData[this.currentIndex];

    const nextImage = this.galleryData[this.currentIndex];

    // Add the fade-out class to transition the current image out
    const imageElement = document.querySelector('.lightbox-img');
    if (imageElement) {
      imageElement.classList.add('slide-in-right');

      // Wait for the fade-out transition to complete
      setTimeout(() => {
        // Update the currentLightboxImage with the next image
        this.currentLightboxImage = nextImage;

        // Remove the fade-out class to fade the next image in
        imageElement.classList.remove('slide-in-right');
      }, 300); // Adjust the timeout duration to match the transition duration in CSS
    }
  }

  prev(): void {
    this.currentIndex = this.currentIndex - 1;
    if (this.currentIndex < 0) {
      this.currentIndex = this.galleryData.length - 1;
    }
    this.currentLightboxImage = this.galleryData[this.currentIndex];

    const nextImage = this.galleryData[this.currentIndex];

    // Add the fade-out class to transition the current image out
    const imageElement = document.querySelector('.lightbox-img');
    if (imageElement) {
      imageElement.classList.add('slide-in-left');

      // Wait for the fade-out transition to complete
      setTimeout(() => {
        // Update the currentLightboxImage with the next image
        this.currentLightboxImage = nextImage;

        // Remove the fade-out class to fade the next image in
        imageElement.classList.remove('slide-in-left');
      }, 300); // Adjust the timeout duration to match the transition duration in CSS
    }
  }

  scrollToTarget() {
      this.galElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  onResize(event: any){
    this.responsiveService.checkWidth();
    this.screenSize = this.responsiveService.screenWidth;
    this.setResponsiveAttrs(this.screenSize);
  }

  setResponsiveAttrs(screenSize: string) {
    if(screenSize === 'lg') {
      this.countPaddingLeft = "";
      this.countPaddingRight = "";
    }
    if(screenSize === 'md') {
      this.countPaddingLeft = "";
      this.countPaddingRight = "";
    }
    if(screenSize === 'sm') {
      this.countPaddingLeft = "15px";
      this.countPaddingRight = "15px";
    }
  }

  onSwipe(data: string) {
    if(data == "left") {
      this.next();
    } else {
      this.prev();
    }
  }
}
