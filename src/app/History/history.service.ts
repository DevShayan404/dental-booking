import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  headers = { 'content-type': 'application/json-patch+json' };
  constructor(private http: HttpClient) {}

  getHistory(Id: any, toggleId: any) {
    // GetPatientBacknForthForWebsite
    return this.http.get(
      environment.QA +
        `/Patient/GetPatientBacknForthForWebsite?patientId=${Id}&toggleStatus=${toggleId}`
    );
  }

  cancelAppointment(id: number) {
    const url = `${environment.QA}/api/BookAppointment/CancelAppointmentByPatient?Id=${id}`;
    return this.http.put(url, null);
  }

  review(data: any): Observable<any> {
    return this.http.post(environment.QA + `/Patient/giveReviewPatient`, data, {
      headers: this.headers,
      responseType: 'text',
    });
  }

  checkReview(
    doctorId: number,
    vendorId: number,
    appointmentId: number,
    PatientId: number
  ) {
    return this.http.get(
      environment.QA +
        `/api/Review/ValidateReview?doctorId=${doctorId}&vendorId=${vendorId}&appointId=${appointmentId}&patientId=${PatientId}`
    );
  }
}
