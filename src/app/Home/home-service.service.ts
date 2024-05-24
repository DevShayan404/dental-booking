import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeServiceService {
  // QA = 'http://172.16.100.111:8089';
  // QA = 'http://192.168.60.46:8087';

  constructor(private http: HttpClient) {}

  public setLocation$ = new Subject<any>();
  setLocation() {
    return this.setLocation$.asObservable();
  }

  public drList$ = new Subject<number>();
  getCity() {
    return this.http.get(environment.QA + `/City/GetCities`);
  }

  getServices() {
    return this.http.get(environment.QA + `/api/Services/GetServices`);
  }
  getDrList() {
    return this.http.get(environment.QA + `/Doctor/GetDoctors`);
  }

  getdrList$() {
    return this.drList$.asObservable();
  }
  getDoctorsByLocation(data: any, page: number, pageSize: number) {
    var lat = data.latitude;
    var long = data.longitude;

    return this.http.get(
      environment.QA +
        `/api/Vendor/GetVendorByLocation?lat=${lat}&lng=${long}&PgNo=${page}&PgSize=${pageSize}`
    );
  }
  getPremiumDr(lat: number, lng: number) {
    // return this.http.get(
    //   environment.QA +
    //     `/api/Doctor/GetPremiumDoctorsByLocation?latitude=${lat}&longitude=${lng}`
    // );
    return this.http.get(environment.QA +`/api/Vendor/getPremiumVendorsByLocation?latitude=43.825896809180456&longitude=-79.25175128504634`);
  }

  getReviews() {
    return this.http.get(environment.QA + `/api/Review/GetTopReviews`);
  }

  getGoogleApi( code: string) {
    console.log("countryCode",code);
    
    return this.http.get(
      `https://api.m-rides.com/api/MRide/SearchLocation?SearchValue=canada&CountryCode=CA
      `
    );
  }
}
