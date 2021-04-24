import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()

export class UserService {
	baseUrl: any = environment.baseUrl;

	constructor(
		private http: HttpClient,
		public router: Router
	) { }

	signup(data) {
		let url = `${this.baseUrl}/user/register`;
		return this.http.post(url, data);
	}

	login(data) {
		let url = `${this.baseUrl}/user/login`;
		return this.http.post(url, data);
	}

	sessionExpireToLogout() {
		this.router.navigate(['/login']);
		sessionStorage.clear();
	}

	setToken(token) {
		sessionStorage.setItem('token', token);
	}

	getToken() {
		return sessionStorage.getItem('token')
	}

}

