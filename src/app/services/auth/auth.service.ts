import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {

	constructor(private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let url: string = state.url;

		if (localStorage.getItem('token')) {
			return true;
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}


	setToken(token) {
		sessionStorage.setItem('token', token);
	}

	getToken() {
		return sessionStorage.getItem('token')
	}
}