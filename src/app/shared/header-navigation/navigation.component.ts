import { Component, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfo } from 'src/app/auth/models/user-info.model';
import { AuthService } from 'src/app/auth/services/auth.service';
//declare var $: any;

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {
	@Output()
	toggleSidebar = new EventEmitter<void>();
  user$: Observable<UserInfo> = new BehaviorSubject<UserInfo>(null);
	@ViewChild('myDrop', { static: false }) myDrop: NgbDropdown;

	public showSearch = false;

	constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user$ = this.authService.currentUser;
  }

	openDrop(event) {
		event.stopPropagation();
		this.myDrop.toggle();
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['/authentication']);
	}
}
