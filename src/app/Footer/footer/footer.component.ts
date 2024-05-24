import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(public router: Router, private activatedRoute: ActivatedRoute) {}
  private getRouteData(route: ActivatedRoute): any {
    if (route.firstChild) {
      return this.getRouteData(route.firstChild);
    }
    return route.snapshot.data;
  }

  hideFooter:boolean
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const routeData = this.getRouteData(this.activatedRoute.root);
        this.hideFooter = routeData && routeData.hideFooter;
      }
    });
  }
}
