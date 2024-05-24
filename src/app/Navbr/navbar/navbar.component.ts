import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { NavbarService } from '../navbar.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { zoomIn, zoomOut } from 'ng-animate';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BookAppointmentServiceService } from 'src/app/BookAppointment/book-appointment-service.service';
import { HomeServiceService } from 'src/app/Home/home-service.service';
import { GoogleMap } from '@angular/google-maps';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('zoomIn', [
      transition(
        ':enter',
        useAnimation(zoomIn, { params: { timing: 0.2, delay: 0 } })
      ),
      transition(
        ':leave',
        useAnimation(zoomOut, { params: { timing: 0.2, delay: 0 } })
      ),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  @ViewChild('mapSearchField') searchField!: ElementRef;
  @ViewChild(GoogleMap) map!: GoogleMap;

  navbarFixed: boolean = false;
  navLinks: boolean = false;
  navImg: boolean = false;
  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 0) {
      this.navbarFixed = true;
      this.navLinks = true;
      this.navImg = true;
    } else {
      this.navbarFixed = false;
      this.navLinks = false;
      this.navImg = false;
    }
  }

  payload: any = [];
  patientRelation: any;
  promotion: any;
  locations: any;
  existingPromo: any;
  Promo: any;
  constructor(
    public service: NavbarService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private bookAppointmentService: BookAppointmentServiceService,
    private homeService: HomeServiceService,
    private formBuilder: FormBuilder,
    private navService : NavbarService
  ) {
    this.getTimeZone();
    this.homeService.setLocation().subscribe((res: any) => {
      this.locationInput = res.name;
      this.locationInputName = this.locationInput;
      this.locationInputLat = res.lat;
      this.locationInputLong = res.long;
    });
    this.bookAppointmentService.setPatientModal().subscribe((res) => {
      this.modalVisible = res;
      this.modalButtons = false;
      this.displayPatient = res;
    });
    this.service.getPromotion().subscribe((res) => {
      // console.log(res.Result);
      this.promotion = res?.Result;
      // console.log(this.promotion);

      this.existingPromo = this.promotion.filter((x: any) => x.Flag === 0);
      // console.log(this.existingPromo);
      this.Promo = this.promotion.filter((x: any) => x.Flag === 1);
      // console.log(this.Promo);
    });
    this.isIndexPage = this.router.url === '/';
  }
  countryCode: string;
  getTimeZone() {
    const timeZone = new Date().getTimezoneOffset();
    const timeZoneInHours = (timeZone / 60) * -1;
    if (timeZoneInHours === -4 || timeZoneInHours === -3) {
      this.countryCode = 'CA';
    }
    this.homeService.getGoogleApi(this.countryCode).subscribe((res: any) => {
      const locRes = res;
      const locResult = JSON.parse(locRes?.Result?.Data);
      this.locations = locResult.Locations;
      // console.log(this.locations);
    });
  }

  private getRouteData(route: ActivatedRoute): any {
    if (route.firstChild) {
      return this.getRouteData(route.firstChild);
    }
    return route.snapshot.data;
  }
  promotionHeader: boolean = true;
  promoHeader() {
    this.promotionHeader = false;
  }
  visiblePromoDialog: boolean = false;
  position: string = 'top';
  // promotionTitle: string = 'Promotion'
  showPromoDialog(position: string) {
    this.position = position;
    this.visiblePromoDialog = true;
  }
  viewAllPromo: boolean = true;
  viewAll() {
    this.viewAllPromo = false;
  }

  showLocationInput: boolean;
  // hideLocationInput: boolean
  hideNavbar: boolean;
  notFixedNav: boolean;
  isIndexPage: boolean = false;
  ngOnInit(): void {
   
    this.userName = localStorage.getItem('userName');
    this.getPatientNumber = localStorage.getItem('patientNumber');
    this.getInputLocation();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const routeData = this.getRouteData(this.activatedRoute.root);
        this.showLocationInput = routeData && routeData.showLoactionInput;
        // this.hideLocationInput = routeData && routeData.hide;
        this.hideNavbar = routeData && routeData.hideNav;
        this.notFixedNav = routeData && routeData.notFixedNav;
        this.isIndexPage = this.router.url === '/';
        this.navService.setNotFixedNav(this.notFixedNav);
      });

    this.navService.notFixedNav$.subscribe(notFixedNav => {
      this.notFixedNav = notFixedNav;
    });
  }

  navLinkActive = false;
  navSectionActive = false;
  navCollapse: boolean = false;
  navLinkImg: boolean = false;
  navLink() {
    this.navLinkActive = !this.navLinkActive;
    this.navLinkImg = !this.navLinkImg;
    this.navSectionActive = !this.navSectionActive;
    this.navCollapse = !this.navCollapse;
  }

  // ------------------Login Section-----------------------------------------------------------------------------------------
  modalVisible: boolean = false;
  modalButtons: boolean;
  patientOtp: boolean = false;
  modal() {
    this.modalVisible = true;
    this.modalButtons = true;
    this.displayPatient = false;
    this.patientLogin = false;
    this.showFlag = false;
    this.patientForm.reset();
  }
  modalBack() {
    this.modalButtons = true;
    this.displayPatient = false;
  }
  otpOtpToPatientForm() {
    this.patientLogin = false;
    this.showFlag = false;
  }
  displayPatient: boolean = false;
  loginAsPatient(data: boolean) {
    this.modalButtons = data;
    this.displayPatient = true;
  }
  patientForm = new FormGroup({
    patienName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
  });
  get PatienName(): FormControl {
    return this.patientForm.get('patienName') as FormControl;
  }
  get PhoneNumber(): FormControl {
    return this.patientForm.get('phoneNumber') as FormControl;
  }
  showFlag: boolean = false;

  onPhoneNumberInput(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const digitsOnly = inputValue.replace(/\D/g, '');
    const truncatedValue = digitsOnly.substring(0, 10);
    inputElement.value = truncatedValue;
  }
  onInputFocus() {
    this.showFlag = true;
    this.validateInput = false;
  }

  onInputBlur() {
    const phoneNumberControl = this.patientForm.get(
      'phoneNumber'
    ) as FormControl;
    if (phoneNumberControl) {
      if (!phoneNumberControl.touched) {
        this.showFlag = false;
      } else {
        this.showFlag = phoneNumberControl?.value?.trim()?.length > 0;
      }
    }
  }
  patientLogin: boolean = false;
  patientSpinner: boolean = false;
  resPhoneNo: any;
  responsePatient: any;
  getPatientNumber: any;
  resRelation: any;
  timer = 30;
  resPatiendId: any;
  resOtp: any;
  //
  toastwarning = false;
  toastSuccess = false;
  userName: any;
  storeToken: string;
  decodeToken: any;
  validateInput: boolean = false;
  submitPatientForm(data: any) {
    if (this.patientForm.invalid) {
      this.toastwarning = true;
      setTimeout(() => {
        this.toastwarning = false;
      }, 3000);
    } else if (data.phoneNumber.slice(0, 10).length === 10) {
      this.patientSpinner = true;
      const obj = {
        email: data.patienName,
        password: data.phoneNumber.slice(0, 10),
      };
      // console.log(obj);

      this.service.postPateint(obj).subscribe((res) => {
        this.responsePatient = JSON.parse(res);
        console.log('OTP', this.responsePatient.Messages!);
        
        // console.log(this.responsePatient.Messages);
        this.resPhoneNo = this.responsePatient.PhoneNumber;
        localStorage.setItem('patientNumber', data.phoneNumber.slice(0, 10));
        this.resRelation = this.responsePatient.Relation;
        this.resPatiendId = this.responsePatient.Id;
        this.getPatientNumber = localStorage.getItem('patientNumber');
        setInterval(() => {
          if (this.timer > 0) {
            this.timer--;
          }
        }, 1000);
        this.patientLogin = true;
        this.patientSpinner = false;
        this.patientForm.reset();
      });
    } else {
      this.showFlag = false;
      this.validateInput = true;
    }
  }
  resendOtpToast: boolean = false;
  resendOtp() {
    this.resendOtpToast = true;
    setTimeout(() => {
      this.resendOtpToast = false;
      this.timer = 30;
    }, 2000);
    var resendNumber = localStorage.getItem('patientNumber');
    this.service.postPatientOtp(resendNumber).subscribe((res) => {
      // console.log(res);
    });
    this.getPatientNumber = localStorage.getItem('patientNumber');
    // console.log(this.getPatientNumber);
  }
  // patientLoginForm: FormGroup;
  patientLoginForm = this.formBuilder.group({
    patientNo: ['this.getPatientNumber'],
    otp: ['', [Validators.required]],
  });
  get PatientNo(): FormControl {
    return this.patientLoginForm.get('patientNo') as FormControl;
  }
  get OTP(): FormControl {
    return this.patientLoginForm.get('otp') as FormControl;
  }
  otpErrMessage: string;
  otpErr: boolean = false;
  submitPatientLogin(data: any) {
    // console.log(data.patientNo);

    if (this.patientLoginForm.invalid) {
      this.toastwarning = true;
      setTimeout(() => {
        this.toastwarning = false;
      }, 3000);
    } else {
      this.patientSpinner = true;
      const obj = {
        email: data.patientNo,
        password: data.otp,
      };
      this.service.patientLogin(obj).subscribe(
        (res) => {
          // console.log(res);

          this.storeToken = res;
          const jwtHelper = new JwtHelperService();
          const token = jwtHelper.decodeToken(this.storeToken);
          // console.log(token);

          this.payload = token?.unique_name;
          var patientId = token?.sid;
          // var role = token.? http
          localStorage.setItem('patientId', patientId);
          localStorage.setItem('userName', this.payload);
          this.userName = localStorage.getItem('userName');
          this.modalVisible = false;
          this.patientSpinner = false;
          window.location.reload();
        },
        (err) => {
          this.otpErrMessage = err.error;
          // console.log(this.otpErrMessage);

          this.otpErr = true;
          this.patientSpinner = false;
          this.patientLoginForm.get('otp')!.setValue('');
        }
      );
    }
  }
  sidebarVisibleRight: boolean = false;
  sidebarRight() {
    this.sidebarVisibleRight = true;
  }
  slotHistory() {
    this.sidebarVisibleRight = false;
    this.router.navigate(['/slot-history']);
  }

  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('patientNumber');
    localStorage.removeItem('token');
    localStorage.removeItem('patientId');
    this.router.navigate(['/']);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  aboutMapOptions: google.maps.MapOptions = {
    zoom: 13,
  };
  mapCenter: any;
  markerPositions: any;
  geocoder: any;
  locationInput: string;
  locationInputLat: number;
  locationInputLong: number;
  locationInputName: string;
  mapModal: boolean = false;
  modalPosition: string = 'top';
  modalObj: any;
  // mapSearchInput: boolean = false;
  getInputLocation() {
    this.geocoder = new google.maps.Geocoder();
    var response = JSON.parse(localStorage.getItem('searchLocationName')!);
    this.locationInput = response?.name;
    this.locationInputName = this.locationInput;
    this.locationInputLat = response?.lat;
    this.locationInputLong = response?.long;
    this.mapCenter = {
      lat: +this.locationInputLat,
      lng: +this.locationInputLong,
    };
    this.markerPositions = {
      lat: +this.locationInputLat,
      lng: +this.locationInputLong,
    };
  }

  openMapModal() {
    this.getInputLocation();
    this.mapModal = true;
    this.confirmLocationSpinner = false;
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    this.locationInputLat = event.latLng!.lat();
    this.locationInputLong = event.latLng!.lng();

    this.markerPositions = {
      lat: +event.latLng!.lat(),
      lng: +event.latLng!.lng(),
    };
    this.geocoder.geocode(
      { location: event.latLng },
      (results: any, status: any) => {
        if (status === 'OK') {
          if (results[0]) {
            this.locationInputName = results[0].formatted_address;
            this.modalObj = {
              lat: +event.latLng!.lat(),
              long: +event.latLng!.lng(),
              name: results[0].formatted_address,
            };
          } else {
            console.log('No results found');
          }
        } else {
          // console.log('Geocoder failed due to:', status);
        }
      }
    );
  }

  confirmLocationSpinner: boolean = false;
  confirmLocation() {
    this.confirmLocationSpinner = true;
    setTimeout(() => {
      this.mapModal = false;
    }, 1000);
    this.locationInput = this.locationInputName;
    this.service.objTransferIntoDrlist$.next(true);
    localStorage.setItem('searchLocationName', JSON.stringify(this.modalObj));
    this.router.navigate(['appointment/doctors'], {
      queryParams: {
        lat: this.locationInputLat,
        long: this.locationInputLong,
      },
    });
  }

  coordinates: any;
  searchLocationName: string;
  onChangeLocation(data: any) {
    this.searchLocationName = data.LocationsName;
    this.coordinates = data?.Coordinates;
    const coordinates = this.coordinates?.split(',');
    var lat = coordinates[0];
    var long = coordinates[1];
    const modalObj = {
      lat: lat,
      long: long,
      name: this.searchLocationName,
    };
    this.service.objTransferIntoDrlist$.next(true);
    localStorage.setItem('searchLocationName', JSON.stringify(modalObj));
    // console.log(this.searchLocationName);
    this.router.navigate(['appointment/doctors'], {
      queryParams: {
        lat: lat,
        long: long,
      },
    });
  }

  ngAfterViewInit(): void {
    const searchBox = new google.maps.places.SearchBox(
      this.searchField.nativeElement
    );

    // Add an input event listener to open the dropdown when the user types
    this.searchField.nativeElement.addEventListener('input', () => {
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places?.length === 0) {
          return;
        }
        const bounds = new google.maps.LatLngBounds();
        places?.forEach((place: any) => {
          if (place.geometry?.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        this.map.fitBounds(bounds);
      });
    });

    // Add the input field to the map controls
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchField.nativeElement
    );
  }

  updateProfile: FormGroup<any> = this.formBuilder.group({
    name: ['', [Validators.required]],
  });
  submitUpdateProfile(data: any) {
    // console.log(data);
    if (this.updateProfile.valid) {
      const obj = {
        id: +localStorage.getItem('patientId')!,
        name: data.name,
      };
      this.service.updateProfile(obj).subscribe((res) => {
        // console.log(res);
        localStorage.setItem('userName', data.name);
        this.sidebarVisibleRight = false;
        this.ngOnInit();
      });
    }
  }


  //new work
  openPdfGuideforWebsitee() {
    window.open('https://api.dentalbooking.ca/api/Guide/GETPatientGuideforWebsite','_blank')
  }

  openPdfGETPortalGuid() {
    window.open('https://api.dentalbooking.ca/api/Guide/GETPortalGuide','_blank')
  }
  
}
