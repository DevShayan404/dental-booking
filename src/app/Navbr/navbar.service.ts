import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  headers = { 'content-type': 'application/json-patch+json' };

  constructor(private http: HttpClient) {}
  // //////////////
  private _notFixedNavSubject = new BehaviorSubject<boolean>(false);
  notFixedNav$ = this._notFixedNavSubject.asObservable();
  setNotFixedNav(value: boolean) {
    this._notFixedNavSubject.next(value);
  }
  // //////////////
  postSignUp(data: any): Observable<any> {
    return this.http.post(environment.QA + `/Doctor/PostDoctor`, data, {
      headers: this.headers,
      responseType: 'text',
    });
  }

  login(data: any): Observable<any> {
    return this.http.post(environment.QA + `/Login`, data, {
      headers: this.headers,
      responseType: 'text',
    });
  }

  postPateint(data: any): Observable<any> {
    return this.http.post(environment.QA + `/Patient/PostPatient`, data, {
      headers: this.headers,
      responseType: 'text',
    });
  }

  postPatientOtp(number: any) {
    return this.http.post(
      environment.QA + `/Patient/GetOTP?PhoneNumber=${number}`,
      {
        headers: this.headers,
        responseType: 'text',
      }
    );
  }

  patientLogin(data: any): Observable<any> {
    return this.http.post(environment.QA + `/Patient/LoginPatient`, data, {
      headers: this.headers,
      responseType: 'text',
    });
  }

  getPromotion(): Observable<any> {
    return this.http.get(environment.QA + `/api/Promotions/GetAllPromotions`);
  }

  public objTransferIntoDrlist$ = new Subject<any>();
  setObjTransferIntoDrlist() {
    return this.objTransferIntoDrlist$.asObservable();
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(environment.QA + `/Patient/updatePatient`, data, {
      headers: this.headers,
      responseType: 'text',
    });
  }


  // getPDF(): Observable<any> {
  //   return this.http.get(environment.QA + `/api/Guide/GETPortalGuide`);
   
  // }
  
  // getPDFtwo(): Observable<any> {
  //   return this.http.get(environment.QA + `/api/Guide/GETPatientGuideforWebsite`);
   
  // }
}
