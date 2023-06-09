import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailData } from '../models/email-data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({ providedIn: 'root'})
export class MailService {

  constructor(private http: HttpClient) {}

  sendEmail(contactName: string, email: string, nameplate: string, motorInfo: string, assembly: string, application: string, additionalInfo: string): Observable<any> {
    // Call an API endpoint or send the email using HttpClient
    // and return the Observable for the API call
    // Example using HttpClient:
    const emailData: EmailData = {contactName: contactName, email: email, nameplate: nameplate, motorInfo: motorInfo, assembly: assembly, application: application, additionalInfo: additionalInfo};
    return this.http.post<any>(BACKEND_URL + '/send-email', emailData);
  }
}
