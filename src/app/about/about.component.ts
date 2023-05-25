import { Component, OnInit } from '@angular/core';
import { AdvantagesComponent } from '../advantages/advantages.component';

@Component({
  entryComponents: [AdvantagesComponent],
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
