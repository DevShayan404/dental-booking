import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { LaoderService } from './Loader/laoder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'DentistWeb';
  

  constructor(public router: Router, public loaderService: LaoderService) {
    this.getTimeZone();
  }
  

  loader: boolean;
  ngOnInit(): void {
    this.loaderService.showLoader();
    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 5000);
  }

  countryCode: any;
  timeZoneInHours: any;
  notAvailRegion: boolean = false;
  getTimeZone() {
    const timeZone = new Date().getTimezoneOffset();
    this.timeZoneInHours = (timeZone / 60) * -1;
    localStorage.setItem('timezone', this.timeZoneInHours);
    if (this.timeZoneInHours === -4 || this.timeZoneInHours === -3) {
      this.countryCode = 'CA';
    } else {
      // this.countryCode = 'PK'
      this.notAvailRegion = true;
      // console.log(this.notAvailRegion);
    }
    // console.log('TimeZone', this.timeZoneInHours);
  }
}
