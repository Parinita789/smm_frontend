import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()


export class CustomerService {
  baseUrl: any = environment.baseUrl;

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  getCustomers(limit: Number, page: Number, params: any) {
    let url = `${this.baseUrl}/customer/all?limit=${limit}&&page=${page}`;
    if (params && Object.keys(params).length > 0) {
      url += `&&search=${params.search}`
    }
    return this.http.get(url);
  }

  addCustomers(data) {
    let url = `${this.baseUrl}/customer/add`;
    return this.http.post(url, data);
  }

  getCustomerById(id: string) {
    let url = `${this.baseUrl}/customer/${id}`;
    return this.http.get(url);
  }

  updateCustomer(id: String, data: Object) {
    let url = `${this.baseUrl}/customer/${id}`;
    return this.http.put(url, data);
  }

  deleteCustomer(id: String) {
    let url = `${this.baseUrl}/customer/${id}`;
    return this.http.delete(url);
  }

  uploadCSV(data) {
    // let headers = new Headers();
    // /** In Angular 5, including the header Content-Type can invalidate your request */
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    // let options = new RequestOptions({ headers: headers });
    // let url = `${this.baseUrl}/customer/add/csv`;
    // return this.http.post(url, data, options);
  }

}
