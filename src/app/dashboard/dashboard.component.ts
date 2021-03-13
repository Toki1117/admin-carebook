import { ActivatedRoute, Router } from '@angular/router';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { ROUTES } from '../shared/sidebar/menu-items';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit, OnInit {
  subtitle: string;
  routes: any;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.subtitle = 'This is some text within a card block.';
  }

  ngOnInit() {
    this.routes = ROUTES.slice(2);
  }
  
  ngAfterViewInit() {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
