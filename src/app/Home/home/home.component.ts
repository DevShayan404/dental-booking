import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../home-service.service';
import { Router } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
import { zoomIn, zoomOut } from 'ng-animate';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements OnInit {
  // value: number = 5;
  list = [
    '25000+ Dentists',
    '1million+ Patient Reviews',
    '15million+ User Served',
  ];

  items = [
    {
      title: 'Item 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Item 2',
      description:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Item 3',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Item 4',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      title: 'Item 5',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: 'https://via.placeholder.com/300x200',
    },
  ];
  DrListResponse = [
    {
      InitialName: 'Dr',
      FirstName: 'Abdul',
      LastName: 'Qayyum',
    },
    {
      InitialName: 'Dr',
      FirstName: 'Shuja',
      LastName: 'Haider',
    },
    {
      InitialName: 'Dr',
      FirstName: 'Muhammad',
      LastName: 'Shayan',
    },
    {
      InitialName: 'Dr',
      FirstName: 'Ali',
      LastName: 'Abbas',
    },
    {
      InitialName: 'Dr',
      FirstName: 'Abdul',
      LastName: 'Qayyum',
    },
    {
      InitialName: 'Dr',
      FirstName: 'Shuja',
      LastName: 'Haider',
    },
    {
      InitialName: 'Dr',
      FirstName: 'Muhammad',
      LastName: 'Shayan',
    },
    {
      InitialName: 'Dr',
      FirstName: 'Ali',
      LastName: 'Abbas',
    },
  ];

  specialityResponse: any;
  // cityResponse: any;
  // DrListResponse: any;
  locRes: any;
  locResult: any;
  locations: any;
  constructor(private service: HomeServiceService, private router: Router) {
    this.service.getServices().subscribe((res: any) => {
      var result = res.Result;

      this.specialityResponse = result;
      // console.log('hello', result);
    });
  }
  responsiveOptions: any;
  ngOnInit(): void {
    this.getPremiumDr();
    this.getTimeZone();
    this.getReviews();

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '1023px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
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
      this.notAvailRegion = true;
    }
    this.service.getGoogleApi(this.countryCode).subscribe((res) => {
      this.locRes = res;
      this.locResult = JSON.parse(this.locRes.Result.Data);
      this.locations = this.locResult.Locations;
      // console.log(this.locations);
    });
  }

  premiumDrList: any;
  carouselSkeleton: boolean = true;
  getPremiumDr() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          // console.log(latitude, longitude);

          this.service
            .getPremiumDr(latitude, longitude)
            .subscribe((res: any) => {
              this.premiumDrList = res;

              if (this.premiumDrList.length !== 0) {
                this.carouselSkeleton = false;
              }
            });
        },
        (error) => {
          console.error('Error getting location', error);
        }
      );
    } else {
      console.error('Geolocation is not available.');
    }
  }

  reviews: any[];
  getReviews() {
    this.service.getReviews().subscribe((res: any) => {
      this.reviews = res?.Result;
      // console.log(this.reviews);
    });
  }

  coordinates: any;
  searchSpinner: boolean = false;
  searchLocationName: string;
  onChangeLocation(data: any) {
    this.searchLocationName = data.LocationsName;
    this.searchSpinner = true;
    this.coordinates = data?.Coordinates;
    setTimeout(() => {
      this.SearchDrList();
    }, 500);
  }
  typedText: string = '';
  logTyping(event: any) {
    this.typedText = event.target.value;
    // console.log('Typed:', this.typedText);
  }

  dataList: any;

  lat: any;
  long: any;
  taost: boolean = false;
  SearchDrList() {
    if (this.coordinates === null || this.coordinates === undefined) {
      this.taost = true;
      setTimeout(() => {
        this.taost = false;
      }, 3000);
    } else {
      const coordinates = this.coordinates.split(',');
      this.lat = coordinates[0];
      this.long = coordinates[1];
      const obj = {
        lat: coordinates[0],
        long: coordinates[1],
        name: this.searchLocationName,
      };
      this.service.setLocation$.next(obj);
      localStorage.setItem('searchLocationName', JSON.stringify(obj));
      this.router.navigate(['appointment/doctors'], {
        queryParams: { lat: this.lat, long: this.long },
      });
    }
  }

  connectWithDentist() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
