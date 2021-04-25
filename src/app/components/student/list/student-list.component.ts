import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

// Services
import { routerTransition } from '../../../services/config/config.service';
import { CustomerService } from '../../../services/customer/customer.service';
import { PagerService } from '../../../services/pager/pagerService';


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
	totalItems: number = 0;
	limit: Number = 10;
	private allItems: any[];

	// pager object
	pager: any = {};

	// paged items
	pagedItems: any[];


	constructor(
		private customerService: CustomerService,
		private toastr: ToastrService,
		private pagerService: PagerService,
		private spinner: NgxSpinnerService
	) { }
	// Call student list function on page load 
	ngOnInit() {
		this.getCustomers(this.pageNumber, {});
	}

	// Get customers list from services
	getCustomers(pageNumber, params) {
		this.spinner.show();
		this.customerService.getCustomers(this.limit, pageNumber, params).subscribe((res: any) => {
			if (res.status === 200) {
				this.totalItems = res.data.totalItems;
				this.allItems = res.data.items;
				this.setPage(1);
				this.spinner.hide();
			} else {
				this.toastr.error('Failed', "Cannot Add Customer");
				this.spinner.hide();
			}
		}, err => {
			this.toastr.error('Failed', err.error.message);
			this.spinner.hide();
		});
	}

	setPage(page: number) {
		this.pageNumber = page;
		if (page < 1 || page > this.pager.totalPages) {
			return;
		}
		this.pager = this.pagerService.getPager(this.totalItems, page);
		this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
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
		this.spinner.show();
		let params = { search: event.target.value };
		this.getCustomers(this.pageNumber, params);
	}
}
