import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { plainToClass } from "class-transformer";
import { Order } from "src/app/models";
import { map } from "rxjs/operators";

@Injectable()
export class TransactionService {
	constructor(public http: HttpClient) {}

	getOrders = (params: any = {}): Observable<Order[]> => {
		return this.http
			.get(`/order`, {
				params: params
			})
			.pipe(
				map(data => {
					return plainToClass(Order, data["data"]);
				})
			);
	};

	getOrdersCount(): Observable<number> {
		return this.http.get(`/order/count`).pipe(map(data => data["data"]));
	}

	getOrder(id: number, params: any = {}): Observable<Order> {
		return this.http
			.get(`/order/${id}`, {
				params: params
			})
			.pipe(
				map(data => {
					return plainToClass(Order, data["data"] as Order);
				})
			);
	}

	updateOrder = (id: number, data: FormData): Observable<Order> => {
		data.append("_method", "PUT");
		return this.http.post(`/order/${id}`, data).pipe(
			map(data => {
				return plainToClass(Order, data["data"] as Order);
			})
		);
	};
}
