import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	tokenExists = null;
	constructor(
		private ls: StorageService,
		private authService: AuthService,
		private router: Router
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		this.tokenExists = this.ls.getItem('token');
		return this.authService.isLoggedIn.pipe(
      take(1),
			map((loggedIn) => {
				if (!(loggedIn && !!this.tokenExists)) {
					this.router.navigate(['/authentication']);
				}
				return loggedIn && !!this.tokenExists;
			})
		);
	}
}
