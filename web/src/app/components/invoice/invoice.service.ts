import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { plainToClass } from "class-transformer";
import { map } from "rxjs/operators";
import { Invoice } from "src/app/models";

@Injectable()
export class InvoiceService {
	constructor(public http: HttpClient) {}

	getInvoices(params: any = {}): Observable<Invoice[]> {
		return this.http
			.get(`/invoice`, {
				params: params
			})
			.pipe(
				map(data => {
					return plainToClass(Invoice, data["data"]);
				})
			);
	}
}
