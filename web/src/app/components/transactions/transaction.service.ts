import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { plainToClass } from "class-transformer";
import { Order, AccountTrans, UserTrans, BankImport } from "src/app/models";
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
					return plainToClass(Order, data["data"] as Order[]);
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

	createOrder = (data: FormData): Observable<any> => {
		return this.http.post(`/order`, data);
	};

	updateOrder = (id: number, data: FormData): Observable<Order> => {
		data.append("_method", "PUT");
		return this.http.post(`/order/${id}`, data).pipe(
			map(data => {
				return plainToClass(Order, data["data"] as Order);
			})
		);
	};

	deleteOrder(id: number): Observable<any> {
		return this.http.delete(`/order/${id}`);
	}

	getAccountTransactions = (params: any = {}): Observable<AccountTrans[]> => {
		return this.http
			.get(`/account_trans`, {
				params: params
			})
			.pipe(
				map(data => {
					return plainToClass(AccountTrans, data[
						"data"
					] as AccountTrans[]);
				})
			);
	};

	getAccountTransCount(): Observable<number> {
		return this.http
			.get(`/account_trans/count`)
			.pipe(map(data => data["data"]));
	}

	getAccountTrans(id: number, params: any = {}): Observable<AccountTrans> {
		return this.http
			.get(`/account_trans/${id}`, {
				params: params
			})
			.pipe(
				map(data => {
					return plainToClass(AccountTrans, data[
						"data"
					] as AccountTrans);
				})
			);
	}

	createAccountTrans = (data: FormData): Observable<any> => {
		return this.http.post(`/account_trans`, data);
	};

	updateAccountTrans = (
		id: number,
		data: FormData
	): Observable<AccountTrans> => {
		data.append("_method", "PUT");
		return this.http.post(`/account_trans/${id}`, data).pipe(
			map(data => {
				return plainToClass(AccountTrans, data["data"] as AccountTrans);
			})
		);
	};

	deleteAccountTrans(id: number): Observable<any> {
		return this.http.delete(`/account_trans/${id}`);
	}

	getUserTransactions = (params: any = {}): Observable<UserTrans[]> => {
		return this.http
			.get(`/user_trans`, {
				params: params
			})
			.pipe(
				map(data => {
					return plainToClass(UserTrans, data["data"] as UserTrans[]);
				})
			);
	};

	getUserTransCount(): Observable<number> {
		return this.http
			.get(`/user_trans/count`)
			.pipe(map(data => data["data"]));
	}

	getUserTrans(id: number, params: any = {}): Observable<UserTrans> {
		return this.http
			.get(`/user_trans/${id}`, {
				params: params
			})
			.pipe(
				map(data => {
					return plainToClass(UserTrans, data["data"] as UserTrans);
				})
			);
	}

	createUserTrans = (data: FormData): Observable<any> => {
		return this.http.post(`/user_trans`, data);
	};

	updateUserTrans = (id: number, data: FormData): Observable<UserTrans> => {
		data.append("_method", "PUT");
		return this.http.post(`/user_trans/${id}`, data).pipe(
			map(data => {
				return plainToClass(UserTrans, data["data"] as UserTrans);
			})
		);
	};

	deleteUserTrans(id: number): Observable<any> {
		return this.http.delete(`/user_trans/${id}`);
	}

	importOrders(file: File): Observable<BankImport> {
		let data = new FormData();
		data.append("file", file);
		return this.http.post(`/order/import`, data).pipe(
			map(data => {
				return plainToClass(BankImport, data["data"] as BankImport);
			})
		);
	}

	saveBankImport(data: FormData): Observable<any> {
		return this.http.post(`/order/bank_import`, data);
	}
}
