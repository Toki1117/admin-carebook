import { Router } from '@angular/router';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from '../shared/sidebar/menu-items';
import { AuthService } from '../auth/services/auth.service';
import { UserInfo } from '../auth/models/user-info.model';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit, OnInit {
  subtitle: string;
  routes: any;
  date = new Date();
  greets;
  user$ = new Observable<UserInfo>()

  constructor(private router: Router, private authService: AuthService) { 
    this.subtitle = 'This is some text within a card block.';
    this.greets = {
      day: 'Buenos días',
      noon: 'Buenas tardes',
      night: 'Buenas noches',
    };
  }

  get greeting() {
    const hour = this.date.getHours();
    if (hour >= 3 && hour < 12) {
      return this.greets.day;
    } else if(hour >= 12 && hour < 18) {
      return this.greets.noon;
    } else {
      return this.greets.night;
    }
  }

  ngOnInit() {
    this.routes = ROUTES.slice(2);
    this.user$ = this.authService.currentUser;
  }

  ngAfterViewInit() {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
