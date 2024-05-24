import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { BookAppointmentServiceService } from '../book-appointment-service.service';
import { HomeServiceService } from 'src/app/Home/home-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarService } from 'src/app/Navbr/navbar.service';

@Component({
  selector: 'app-dr-list',
  templateUrl: './dr-list.component.html',
  styleUrls: ['./dr-list.component.css'],
})
export class DrListComponent implements OnInit, OnDestroy {
  mapOptions = {
    zoom: 15,
    draggable: false,
    mapTypeControl: false,
    zoomControl: false,
    // streetViewControl: false,
    // fullscreenControl: false,
  };

  items: any = [];

  spinner = false;
  DrListResponse: any = [];
  drListData!: any;
  cityId: number | any;
  serviceId: number | any;
  length: number = 0;
  drVendors: any;
  notFound: boolean = false;

  constructor(
    private service: BookAppointmentServiceService,
    private homeService: HomeServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private navService: NavbarService
  ) {}

  ngOnInit(): void {
    this.navService.setObjTransferIntoDrlist().subscribe((res) => {
      if (res === true) {
        this.length = 0
        this.DrListResponse = []
      } 
    });
    this.firstLoad();
  }
  pageSize = 10;
  currentPage = 1;
  firstLoad() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (this.currentPage === 1) {
        this.isLoading = false;
        this.spinner = true;
      }
      const obj = { latitude: params['lat'], longitude: params['long'] };

      this.homeService
        .getDoctorsByLocation(obj, this.currentPage, this.pageSize)
        .subscribe((res: any) => {
          if (res.Result?.length > 0) {
            // this.DrListResponse = []
            var result = res.Result;
            this.length = res.Count;
            this.DrListResponse.push(...result);
            console.log('rrault', this.DrListResponse);

            this.spinner = false;
            this.notFound = false;
            this.isLoading = false;
          } else {
            setTimeout(() => {
              this.spinner = false;
              this.notFound = true;
            }, 2000);
          }
        });
    });
  }
  isLoading: boolean = false;
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // if (!this.searchHospitalListActive) {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (
      windowBottom >= docHeight &&
      !this.spinner &&
      this.DrListResponse.length < this.length
    ) {
      this.currentPage++;
      this.isLoading = true;
      this.firstLoad();
      // this.searchHospitalList();
    }
    // } else {
    //   const windowHeight =
    //   'innerHeight' in window
    //     ? window.innerHeight
    //     : document.documentElement.offsetHeight;
    // const body = document.body;
    // const html = document.documentElement;
    // const docHeight = Math.max(
    //   body.scrollHeight,
    //   body.offsetHeight,
    //   html.clientHeight,
    //   html.scrollHeight,
    //   html.offsetHeight
    // );
    // const windowBottom = windowHeight + window.pageYOffset;

    // if (
    //   windowBottom >= docHeight &&
    //   !this.spinner &&
    //   this.DrListResponse.length < this.length
    // ) {
    //   this.searhPage++
    //   this.isLoading = true;
    //   console.log(this.searhPage);
    //   this.searchHospitalList();
    // }
    // }
  }

  private searchTimeout: any;
  ngOnDestroy() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }
  searchQuery: null | string;
  searchHospitalListActive: boolean = false;
  searchHospitalLists: any[];
  searchLength: number;
  searhPage: number = 1;
  searchHospitalList() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.spinner = true;
      if (this.searchQuery && this.searchQuery.trim() !== '') {
        this.searchHospitalListActive = true;
        this.service
          .searchHospitalList(this.searchQuery, this.searhPage)
          .subscribe(
            (res: any) => {
              var result = res.Result;
              this.searchLength = res.Count;
              this.searchHospitalLists = result.Results;
              setTimeout(() => {
                this.spinner = false;
              }, 100);
            },
            (error: any) => {
              console.error(error);
            }
          );
      } else {
        this.searchHospitalListActive = false;
        this.spinner = false;
      }
    }, 200);
  }

  bookAppointment(data: any) {
    // console.log(data);

    var doctorName =
      data.InitialName + ' ' + data.FirstName + ' ' + data.LastName;
    localStorage.setItem('doctorName', doctorName);

    // var drId = data?.Id;
    var drVendor = data?.DoctorVendorId;
    // console.log(drVendor);
    localStorage.setItem('drVendorId', drVendor);
    this.router.navigate(['appointment/doctors/schedule', drVendor]);
  }
  redirectToDoctors(data: any) {
    var Id = data?.Id;
    this.service.targetDoctorDiv = 'Doctors';
    this.router.navigate(['/appointment/hospital/profile', Id]);
  }

  routeToDrProfile(data: any) {
    var Id = data?.Id;

    this.router.navigate(['/appointment/hospital/profile', Id]);
    // console.log(drId);
  }
}
