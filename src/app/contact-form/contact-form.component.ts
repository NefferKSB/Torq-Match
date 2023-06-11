import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ResponsiveService } from '../services/responsive-service';
//import { HttpClient } from "@angular/common/http";
//import { environment } from 'src/environments/environment';
import { MailService } from '../services/mail-service';

//const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
})
export class ContactComponent implements OnInit {
  contactForm = this.formBuilder.group(
    {
      contactName: ['', Validators.required],
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      nameplate: ['', Validators.required],
      motorInfo: ['', Validators.required],
      assembly: ['', Validators.required],
      application: ['', Validators.required],
      additionalInfo: ['', Validators.required]
    }
  );

  disabledSubmitButton: boolean = true;
  optionsSelect: Array<any> = [];
  selected: string;
  width: string;
  screenSize: string = this.responsiveService.screenWidth;

  @HostListener('input') oninput() {
    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
    }
  }

  constructor(
    private fb: FormBuilder,
    //private http: HttpClient,
    private responsiveService: ResponsiveService,
    private formBuilder: FormBuilder,
    public mailService: MailService
  ) {
    this.width = '50%';
    this.selected = '';
  }

  ngOnInit() {
    this.screenSize = this.responsiveService.screenWidth;
    this.setResponsiveAttrs(this.screenSize);
  }

  onResize(event: any){
    this.responsiveService.checkWidth();
    this.screenSize = this.responsiveService.screenWidth;
    this.setResponsiveAttrs(this.screenSize);
  }

  setResponsiveAttrs(screenSize: string) {
    if(screenSize === 'lg') {
      this.width = '40%';
    }
    if(screenSize === 'md') {
      this.width = '50%';
    }
    if(screenSize === 'sm') {
      this.width = '100%';
    }
  }

  onSubmit() {
    if(this.contactForm.invalid) {
      alert("not a valid form submission!");
      return;
    }
    alert("valid form submission!");
    //this.mailService.sendMail(this.contactForm.value.contactName, this.contactForm.value.email, this.contactForm.value.nameplate, this.contactForm.value.motorInfo, this.contactForm.value.assembly, this.contactForm.value.application, this.contactForm.value.additionalInfo);
    this.contactForm.reset();
  }
}
