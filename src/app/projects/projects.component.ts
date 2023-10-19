import { Component, OnInit } from '@angular/core';

interface Item {
  imageSrc: string;
  imageAlt: string;
  imageText: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  title = 'gallery-lightbox';
  data: Item[] = [
    {
      imageSrc: '../assets/imgs/1c280n_ball_mill.jpg',
      imageAlt: '1',
      imageText: 'Santasalo® Model 1C280N Replacement on a ball mill'
    },
    {
      imageSrc: '../assets/imgs/V-Class_Replacement.jpg',
      imageAlt: '2',
      imageText: 'V-Class Replacement drive'
    },
    {
      imageSrc: '../assets/imgs/700mdx2-az-30.17_papermill.jpg',
      imageAlt: '3',
      imageText: 'Falk Model 700MDX2-AZ-30.17 Replacement at a papermill'
    },
    {
      imageSrc: '../assets/imgs/710P4N_dryer_drive~3_edit.jpg',
      imageAlt: '4',
      imageText: 'New 710P4N Dryer Drive at a Waste Facility'
    },
    {
      imageSrc: '../assets/imgs/1403-HLE_refinery.jpg',
      imageAlt: '5',
      imageText: 'Foote-Jones® Model 1403-HLE Replacement at a refinery'
    },
    {
      imageSrc: '../assets/imgs/desolventizer_toaster_oil_seed.jpg',
      imageAlt: '6',
      imageText: 'Brad-Foote® Desolventizer Toaster Replacement at an oil seed facility'
    },
    {
      imageSrc: '../assets/imgs/ht1700-67_aluminum_plant.jpg',
      imageAlt: '7',
      imageText: 'Link-Belt® Model HT1700-67 Replacement at an aluminum plant'
    },
    {
      imageSrc: '../assets/imgs/rdh34s_papermill.jpg',
      imageAlt: '9',
      imageText: 'Hansen® Model RDH34S Replacement at a papermill'
    },
    {
      imageSrc: '../assets/imgs/rnb26-ann-14_waste_water.jpg',
      imageAlt: '10',
      imageText: 'Hansen® HPP Model RNB26-ANN-14 Replacements at a wastewater facility'
    },
    {
      imageSrc: '../assets/imgs/rne24-anr-7.1_cement_mill.jpg',
      imageAlt: '11',
      imageText: 'Hansen® HPP Model RNE24-ANR-7.1 Replacement at a cement mill'
    },
    {
      imageSrc: '../assets/imgs/rvhj44-anbr-250_waste_facility.jpg',
      imageAlt: '12',
      imageText: 'Hansen® HPP Model RVHJ44-ANBR-250 Replacement at a waste facility'
    }
  ];

}
