import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  form!: FormGroup; //Add '!' to indicate definite assignment

  disabledSubmitButton: boolean = true;
  optionsSelect: Array<any> = [];
  selected: string;
  width: string;
  screenSize: string = this.responsiveService.screenWidth;
  private file: Blob | null = null;

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

    this.mailService.sendEmail(
      this.form.value.contactName ?? "",
      this.form.value.email ?? "",
      this.form.value.nameplate ?? "",
      this.form.value.motorInfo ?? "",
      this.form.value.assembly ?? "",
      this.form.value.application ?? "",
      this.form.value.additionalInfo ?? "",
      this.file ?? ""
    ).subscribe({
      next: () => {
        // Email sent successfully
        // Reset the form or show a success message
        this.file = null;
        this.fileInput.nativeElement.value = '';
        this.form.reset();
        this.openDialog();
      },
      error: (error) => {
        // Handle error
        console.error('Failed to send email:', error);
      }
    });
  }

  onFileChange(event: any) {
    if(event.target.files.length > 0) {
      let file = this.fileInput.nativeElement.files[0];

      // Validate the file type
      let validFileTypes = ['application/pdf', 'image/png', 'image/jpeg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if(!validFileTypes.includes(file.type)) {
        alert('Invalid file type. Please select a .pdf, .png, .jpg, .jpeg, .doc, or .docx file.');
        this.file = null;
        this.fileInput.nativeElement.value = '';
        return;
      }

      this.file = file;
    }
  }

  onRemoveFile() {
    this.file = null;
    this.fileInput.nativeElement.value = '';
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
