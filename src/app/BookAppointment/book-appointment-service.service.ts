import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookAppointmentServiceService {
  // QA = 'http://172.16.100.111:8089';
  // QA = 'http://192.168.60.46:8087';
  headers = { 'content-type': 'application/json-patch+json' };

  constructor(private http: HttpClient) {}
  targetDoctorDiv: string;
  public setPatientModal$ = new Subject<any>();

  setPatientModal() {
    return this.setPatientModal$.asObservable();
  }

  getDrList(cityId: any, serviceId: any) {
    // debugger
    return this.http.get(
      environment.QA +
        `/api/Doctor/GetDoctors?CityId=${cityId}&ServiceId=${serviceId}`
    );
  }

  searchHospitalList(searchKey: string | null, page: number) {
    return this.http.get(
      environment.QA +
        `/api/Vendor/SearchHospitals?keyword=${searchKey}&page=${page}&pageSize=50`
    );
  }

  getDrName(id: number) {
    return this.http.get(environment.QA + `/api/Doctor/GetDoctor?id=${id}`);
  }

  bookSlot(cartId: number, data: any): Observable<any> {
    return this.http.post(
      environment.QA + `/api/BookAppointment/createAppointment/${cartId}`,
      data,
      {
        headers: this.headers,
        responseType: 'text',
      }
    );
  }
  bookSlotWithSaveCart(cartId: number, data: any): Observable<any> {
    return this.http.post(
      environment.QA + `/api/BookAppointment/createAppointmentByCard/${cartId}`,
      data,
      {
        headers: this.headers,
        responseType: 'text',
      }
    );
  }

  getDrProfile(id: number) {
    return this.http.get(
      environment.QA +
        `/api/Vendor/GetDoctorListByVendorId?VendorId=${id}
    `
    );
  }
  getReviews(id: any) {
    return this.http.get(
      environment.QA + `/api/Review/GetReviewListByVendorId?vendorId=${id}`
    );
  }
  getSlots(drVendorId: any, date: any) {
    // debugger;
    return this.http.get(
      environment.QA +
        `/api/DoctorSlot/GetDoctorAvailableSlots?DoctorVendorId=${drVendorId}&Date=${date}`
    );
  }
  private localStorageKey = 'appointmentData';

  setAppointmentObj(data: any) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }
  getAppointmentObj() {
    const storedData = localStorage.getItem(this.localStorageKey);
    return storedData ? JSON.parse(storedData) : null;
  }

  setDrData(data: any) {
    localStorage.setItem('drData', JSON.stringify(data));
  }
  getDrData() {
    const storedData = localStorage.getItem('drData');
    return storedData ? JSON.parse(storedData) : null;
  }
  setHospitalDetails(data: any) {
    localStorage.setItem('hospitalDetails', JSON.stringify(data));
  }
  getHospitalDetails() {
    const storedData = localStorage.getItem('hospitalDetails');
    return storedData ? JSON.parse(storedData) : null;
  }

  getPayment(id: number) {
    return this.http.get(
      environment.QA + `/api/PatientCardDetail/GetCards?PatientId=${id}`
    );
  }

  someOnePostForm(data: any): Observable<any> {
    return this.http.post(environment.QA + `/Patient/PostSomeoneElse`, data, {
      headers: this.headers,
      responseType: 'text',
    });
  }
  getsomeOneList(id: number) {
    return this.http.get(
      environment.QA + `/Patient/GetSomeoneElse?patentId=${id}`
    );
  }

  getFees(id: number) {
    return this.http.get(
      environment.QA + `/api/BookAppointment/GetVendorFees?VendorId=${id}`
    );
  }
}
