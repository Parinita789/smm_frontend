import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// Services
import { routerTransition } from '../../../services/config/config.service';
import { CustomerService } from '../../../services/customer/customer.service';

@Component({
	selector: 'app-student-list',
	templateUrl: './student-list.component.html',
	styleUrls: ['./student-list.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})

export class StudentListComponent implements OnInit {
	customers: any;
	pageNumber: number = 1;
	limit: Number = 10;

	constructor(
		private customerService: CustomerService,
		private toastr: ToastrService
	) { }
	// Call student list function on page load 
	ngOnInit() {
		this.getCustomers(this.pageNumber, {});
	}

	// Get customers list from services
	getCustomers(pageNumber, params) {
		this.customerService.getCustomers(this.limit, pageNumber, params).subscribe((res: any) => {
			if (res.status === 200) {
				this.customers = res.data.items;
			} else {
				this.toastr.error('Failed', "Cannot Add Customer");
			}
		}, err => {
			this.toastr.error('Failed', err.error.message);
		});
	}

	pageChanged(event) {
		this.getCustomers(event, {});
	}

	// Delete a customer with its id
	deleteStudent(id: string) {
		this.customerService.deleteCustomer(id).subscribe((res: any) => {
			if (res.status === 200) {
				this.toastr.success("Success", "Customer Deleted Successfully.");
				this.getCustomers(this.pageNumber, {});
			} else {
				this.toastr.error('Failed', "Cannot Delete Customer");
			}
		}, err => {
			this.toastr.error('Failed', err.error.message);
		});
	}

	// uploadFile(event) {
	// 	const formData = new FormData();
	// 	let file = event.target.files[0];
	// 	formData.append('file', new Blob([file], { type: 'text/csv' }), file.name);

	// 	this.customerService.uploadCSV(formData).subscribe((data: any) => {
	// 		if (data.status === 'SUCCESS') {
	// 			this.toastr.success("Success", data.message);
	// 		} else {
	// 			this.toastr.error('Failed', data.message);
	// 		}
	// 	}, (err) => {
	// 		this.toastr.error('Failed', err.message);
	// 	});
	// }

	searchCustomers(event: any) {
		let params = { search: event.target.value };
		this.getCustomers(this.pageNumber, params);
	}
}
