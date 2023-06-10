import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ResponsiveService } from '../services/responsive-service';
//import { HttpClient } from "@angular/common/http";
//import { environment } from 'src/environments/environment';
import { MailService } from '../services/mail-service';

//const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
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
    public mailService: MailService
  ) {
    this.width = '50%';
    this.selected = '';
    this.contactForm = fb.group({
      Fullname: ['', Validators.required],
      Email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      Subject: ['', Validators.required],
      Message: ['', Validators.required]
    });
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

  onSubmit(form: NgForm) {
    if(form.invalid) {
      alert("not a valid form submission!");
      return;
    }
    alert("valid form submission!");
    this.mailService.sendMail(form.value.contactName, form.value.email, form.value.nameplate, form.value.motorInfo, form.value.assembly, form.value.application, form.value.additionalInfo);
    form.reset();
  }
}
