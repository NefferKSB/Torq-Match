import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailData } from '../models/email-data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: 'root'})
export class MailService {

  constructor(private http: HttpClient) {}

  sendEmail(contactName: string, email: string, nameplate: string, motorInfo: string, assembly: string, application: string, additionalInfo: string, attachment: string | Blob): Observable<any> {
    // Call an API endpoint or send the email using HttpClient
    // and return the Observable for the API call
    // Example using HttpClient:
    const emailData: EmailData = {contactName: contactName, email: email, nameplate: nameplate, motorInfo: motorInfo, assembly: assembly, application: application, additionalInfo: additionalInfo, attachment: attachment};

    const formData = new FormData();
    formData.append('contactName', contactName);
    formData.append('email', email);
    formData.append('nameplate', nameplate);
    formData.append('motorInfo', motorInfo);
    formData.append('assembly', assembly);
    formData.append('application', application);
    formData.append('additionalInfo', additionalInfo);
    formData.append('attachment', attachment);

    console.log(formData);

    return this.http.post<any>(BACKEND_URL + '/send-email', formData);
  }
}
