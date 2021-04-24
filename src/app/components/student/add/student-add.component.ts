import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { ValidationService } from '../../../services/config/config.service';
import { CustomerService } from '../../../services/customer/customer.service';
import { routerTransition } from '../../../services/config/config.service';

import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-student-add',
	templateUrl: './student-add.component.html',
	styleUrls: ['./student-add.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})

export class StudentAddComponent implements OnInit {
	// create studentAddForm of type FormGroup 
	private studentAddForm: FormGroup;
	selectedCustomerId: any;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private customerService: CustomerService,
		private toastr: ToastrService) {

		// Check for route params
		this.route.params.subscribe(params => {
			this.selectedCustomerId = params['id'];
			// check if ID exists in route & call update or add methods accordingly
			if (this.selectedCustomerId && this.selectedCustomerId != null && this.selectedCustomerId != undefined) {
				this.getCustomerDetails(this.selectedCustomerId);
			} else {
				this.createForm(null);
			}
		});
	}

	ngOnInit() {
	}

	addUpdateCustomer() {
		if (this.selectedCustomerId && this.selectedCustomerId != null && this.selectedCustomerId != undefined) {
			this.studentAddForm.value.id = this.selectedCustomerId
			this.updateCustomer(this.selectedCustomerId);
		} else {
			this.selectedCustomerId = null;
			this.addCustomer()
		}
	}

	addCustomer() {
		let data = {
			first_name: this.studentAddForm.value.first_name,
			last_name: this.studentAddForm.value.last_name,
			mobile_number: this.studentAddForm.value.phone
		}
		this.customerService.addCustomers(data).subscribe((res: any) => {
			if (res.status === 200) {
				this.router.navigate(['/']);
			} else {
				this.toastr.error('Failed', "Something went wrong");
			}
		}, err => {
			this.toastr.error('Failed', err.error.message);
		});
	}

	updateCustomer(id) {
		let data = {
			first_name: this.studentAddForm.value.first_name,
			last_name: this.studentAddForm.value.last_name,
			mobile_number: this.studentAddForm.value.phone
		}
		this.customerService.updateCustomer(id, data).subscribe((res: any) => {
			if (res.status === 200) {
				this.router.navigate(['/']);
			} else {
				this.toastr.error('Failed', "Something went wrong");
			}
		}, err => {
			this.toastr.error('Failed', err.error.message);
		});
	}

	// If this is update form, get user details and update form
	getCustomerDetails(id: string) {
		this.customerService.getCustomerById(id).subscribe((data: any) => {
			this.createForm(data.data);
		}, err => {
			this.toastr.error('Failed', err.error.message);
		});
	}

	// If this is update request then auto fill form
	createForm(data) {
		if (data == null) {
			this.studentAddForm = this.formBuilder.group({
				first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				phone: ['', [Validators.required, ValidationService.checkLimit(5000000000, 9999999999)]],
				email: ['', []] //Validators.required, ValidationService.emailValidator
			});
		} else {
			this.studentAddForm = this.formBuilder.group({
				first_name: [data.first_name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				last_name: [data.last_name, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
				phone: [data.mobile_number, [Validators.required, ValidationService.checkLimit(5000000000, 9999999999)]],
			});
		}
	}

}