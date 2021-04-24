import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../../services/config/config.service';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../services/config/config.service';
import { AuthService } from '../../services/auth/auth.service'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})
export class LoginComponent implements OnInit {
	private loginForm: FormGroup;
	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService,
		private toastr: ToastrService,
		private authService: AuthService
	) {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, ValidationService.emailValidator]],
			password: ['', [Validators.required, ValidationService.passwordValidator]]
		});
	}

	// Check if user already logged in
	ngOnInit() {
		if (sessionStorage.getItem('userData')) {
			this.router.navigate(['/']);
		}
	}

	// Initicate login
	login() {
		this.userService.login(this.loginForm.value).subscribe((res: any) => {
			if (res.status === 200) {
				let token = res.data.token;
				this.authService.setToken(token);
				this.router.navigate(['/']);
				this.toastr.success('Success', "Logged In Successfully");
			} else {
				this.toastr.error('Failed', "Invalid Credentials");
			}
		}, err => {
			this.toastr.error(err.error.message);
		});
	}
}