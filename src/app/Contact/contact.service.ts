import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // QA = 'http://172.16.100.111:8089';
  // QA = 'http://192.168.60.46:8087';
  headers = { 'content-type': 'application/json-patch+json' };

  constructor(private http: HttpClient) { }
  
  postContact(data: any): Observable<any> {
    return this.http.post(environment.QA +`/api/ContactUs/sendNote`, data, {
      headers: this.headers,
      responseType: 'text',
    });
  }
}
