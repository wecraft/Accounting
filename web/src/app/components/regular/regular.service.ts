import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Order, Invoice } from "src/app/models";
import { plainToClass } from "class-transformer";
import { map } from "rxjs/operators";

@Injectable()
export class RegularService {
	constructor(public http: HttpClient) {}

	getOrders = (params: any = {}): Observable<Order[]> => {
		return this.http
			.get(`/regular/order`, {
				params: params
			})
			.pipe(
				map(data => {
					return plainToClass(Order, data["data"]);
				})
			);
	};

	getOrdersCount(): Observable<number> {
		return this.http
			.get(`/regular/order/count`)
			.pipe(map(data => data["data"]));
	}

	getOrder(id: number, params: any = {}): Observable<Order> {
		return this.http
			.get(`/regular/order/${id}`, {
				params: params
			})
			.pipe(
				map(data => {
					return plainToClass(Order, data["data"] as Order);
				})
			);
	}

	getInvoices = (params: any = {}): Observable<Invoice[]> => {
		return this.http
			.get(`/regular/invoice`, {
				params: params
			})
			.pipe(
				map(data => {
					return plainToClass(Invoice, data["data"]);
				})
			);
	};

	getInvoicesCount(): Observable<number> {
		return this.http
			.get(`/regular/invoice/count`)
			.pipe(map(data => data["data"]));
	}

	getInvoicePdf(id: number, params: any = {}): Observable<Blob> {
		return this.http.get(`/regular/invoice/${id}`, {
			params: params,
			responseType: "blob"
		});
	}
}
