import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { NavbarService } from './Navbr/navbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  hello: any;
  constructor(private service: NavbarService) {
    this.hello = localStorage.getItem('firstName');
    console.log('1', this.hello);
  }

  canActivate(): boolean {
    const token = localStorage.getItem('firstName');
    console.log('get', token);

    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
