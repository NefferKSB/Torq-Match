import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ResponsiveService } from '../services/responsive-service';
import { MailService } from '../services/mail-service';
import { CommonModule } from '@angular/common';

export interface DialogData {}
@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, CommonModule]
})

export class ContactComponent implements OnInit {
  form!: FormGroup; //Add '!' to indicate definite assignment

  disabledSubmitButton: boolean = true;
  optionsSelect: Array<any> = [];
  selected: string;
  width: string;
  screenSize: string = this.responsiveService.screenWidth;

  @HostListener('input') oninput() {
    if (this.form.valid) {
      this.disabledSubmitButton = false;
    }
  }

  constructor(
    private responsiveService: ResponsiveService,
    private formBuilder: FormBuilder,
    public mailService: MailService,
    public dialog: MatDialog
  ) {
    this.width = '50%';
    this.selected = '';
  }

  ngOnInit() {
    this.screenSize = this.responsiveService.screenWidth;
    this.setResponsiveAttrs(this.screenSize);

    this.form = this.formBuilder.group(
      {
        contactName: ['', Validators.required],
        email: ['', [Validators.email, Validators.required]],
        nameplate: ['', Validators.required],
        motorInfo: ['', Validators.required],
        assembly: ['', Validators.required],
        application: ['', Validators.required],
        additionalInfo: ['']
      }
    );
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

  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {});
  }

  onSubmit() {
    if(this.form.invalid) {
      alert("not a valid form submission!");
      return;
    }
    /*
    //debug alert
    alert(`valid form submission!
    ${this.form.value.contactName}
    ${this.form.value.email}
    ${this.form.value.nameplate}
    ${this.form.value.motorInfo}
    ${this.form.value.assembly}
    ${this.form.value.application}
    ${this.form.value.additionalInfo}
    `);
    */

    this.mailService.sendEmail(
      this.form.value.contactName ?? "",
      this.form.value.email ?? "",
      this.form.value.nameplate ?? "",
      this.form.value.motorInfo ?? "",
      this.form.value.assembly ?? "",
      this.form.value.application ?? "",
      this.form.value.additionalInfo ?? ""
    ).subscribe({
      next: () => {
        // Email sent successfully
        // Reset the form or show a success message
        this.openDialog();
        this.form.reset();
      },
      error: (error) => {
        // Handle error
        console.error('Failed to send email:', error);
      }
    });
  }
}

@Component({
  selector: 'dialog-data',
  templateUrl: 'dialog-data.html',
  standalone: true,
  imports: [MatDialogModule],
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
