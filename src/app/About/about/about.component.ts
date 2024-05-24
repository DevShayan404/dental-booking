import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  mapCenter: google.maps.LatLngLiteral = {
    lat: 43.82581891446062,
    lng: -79.25175921250067,
  };
  markerPosition: google.maps.LatLngLiteral = {
    lat: 43.82581891446062,
    lng: -79.25175921250067,
  };
  mapOptions: google.maps.MapOptions = {
    zoom: 15,
    draggable: false,
    mapTypeControl: false,
    // zoomControl: false,
    // streetViewControl: false,
    // fullscreenControl: false,
  };
  readMore: boolean = false;
  readmore() {
    this.readMore = true;
  }
  card = [
    {
      name: 'Syed Mansoor Naqvi',
      src: 'assets/Images/mansoor.jpg',
      designation: 'CEO OF MBE GROUP OF COMPANIES',
    },
    // {
    //   name: 'Syed Mehmood Naqvi',
    //   src: 'assets/Images/mahmood.jpg',
    //   designation: 'CIO - CHIEF INFORMATION OFFICER',
    // },
    {
      name: 'Minhal Abbas',
      src: 'assets/Images/Nehal.png',
      designation: 'ISO MANAGER & COORDINATOR',
    },
    // {
    //   name: 'Ali Sarfaraz',
    //   src: 'assets/Images/sarfaraz.jpg',
    //   designation: 'IT HEAD',
    // },
  ];
}
