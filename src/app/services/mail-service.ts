//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
//import { environment } from 'src/environments/environment';
import { EmailData } from '../models/email-data';

//const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: 'root'})
export class MailService {
  private authStatusListener = new Subject<boolean>();

  //constructor(private http: HttpClient, private router: Router) {}

  sendMail(contactName: string, email: string, nameplate: string, motorInfo: string, assembly: string, application: string, additionalInfo: string) {
    const emailData: EmailData = {contactName: contactName, email: email, nameplate: nameplate, motorInfo: motorInfo, assembly: assembly, application: application, additionalInfo: additionalInfo};
    /*
    this.http.post(BACKEND_URL + "/sendmail", emailData).subscribe(() => {}, error => {
      this.authStatusListener.next(false);
    });
    */
  }
}
