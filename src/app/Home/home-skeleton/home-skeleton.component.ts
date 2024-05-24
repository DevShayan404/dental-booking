import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-skeleton',
  templateUrl: './home-skeleton.component.html',
  styleUrls: ['./home-skeleton.component.css']
})
export class HomeSkeletonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
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
    },    {
      InitialName: 'Dr',
      FirstName: 'Abdul',
      LastName: 'Qayyum',
    }
  ];

}
