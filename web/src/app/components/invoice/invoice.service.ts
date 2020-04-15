import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { plainToClass } from "class-transformer";
import { map } from "rxjs/operators";
import { Invoice } from "src/app/models";

@Injectable()
export class InvoiceService {
	constructor(public http: HttpClient) {}

	getInvoices = (params: any = {}): Observable<Invoice[]> => {
		return this.http
			.get(`/invoice`, {
				params: params
			})
			.pipe(
				map(data => {
					return plainToClass(Invoice, data["data"] as Invoice[]);
				})
			);
	};

	getInvoicesCount(): Observable<number> {
		return this.http.get(`/invoice/count`).pipe(map(data => data["data"]));
	}

	getInvoice(id: number, params: any = {}): Observable<Invoice> {
		return this.http
			.get(`/invoice/${id}`, {
				params: params
			})
			.pipe(
				map(data => {
					return plainToClass(Invoice, data["data"] as Invoice);
				})
			);
	}

	getInvoicePdf(id: number, params: any = {}): Observable<Blob> {
		return this.http.get(`/invoice/${id}`, {
			params: params,
			responseType: "blob"
		});
	}

	updateInvoice = (id: number, data: FormData): Observable<Invoice> => {
		data.append("_method", "PUT");
		return this.http.post(`/invoice/${id}`, data).pipe(
			map(data => {
				return plainToClass(Invoice, data["data"] as Invoice);
			})
		);
	};

	createInvoice = (data: FormData): Observable<Invoice> => {
		data.append("action", "save");
		return this.http.post(`/invoice`, data).pipe(
			map(data => {
				return plainToClass(Invoice, data["data"] as Invoice);
			})
		);
	};

	copyInvoice = (
		id: number,
		proforma: boolean = false
	): Observable<Invoice> => {
		const data = {
			proforma: proforma ? 1 : 0
		};

		return this.http.post(`/invoice/${id}/copy`, data).pipe(
			map(data => {
				return plainToClass(Invoice, data["data"] as Invoice);
			})
		);
	};

	getNewInvoicePdf = (type: string, data: FormData): Observable<Blob> => {
		data.append("action", type);
		return this.http.post(`/invoice`, data, {
			responseType: "blob"
		});
	};

	deleteInvoice(id: number): Observable<any> {
		return this.http.delete(`/invoice/${id}`);
	}
}
