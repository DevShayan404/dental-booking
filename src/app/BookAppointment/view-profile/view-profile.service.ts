import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewProfileService {
  private notFixedNav: boolean = false;
  constructor(private http: HttpClient) { }

  getDrProfile(id:number) {
    return this.http.get(environment.QA +`/api/Vendor/GetDoctorListByVendorId?VendorId=1
    `)
  }
}
