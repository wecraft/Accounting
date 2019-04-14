import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable, BehaviorSubject, of } from "rxjs";
import { FormError } from "./components/shared/form/form-error";
import { EmitterService } from "./components/shared/broadcast/emitter.service";
import { Toast } from "./components/toast/toast";
import { AuthService } from "./components/auth/auth.service";
import { TransactionService } from "./components/transactions/transaction.service";
import { ProjectService } from "./components/project/project.service";
import { InvoiceService } from "./components/invoice/invoice.service";
import { AccountService } from "./components/account/account.service";
import { ClientService } from "./components/client/client.service";
import { Country } from "./models";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

@Injectable()
export class AppService {
	private _countries: Country[];

	//Cache authUser
	private _preloaderState: boolean;
	preloaderStateSubject: BehaviorSubject<boolean> = new BehaviorSubject(
		false
	);

	get preloaderState() {
		return this._preloaderState;
	}

	set preloaderState(value: boolean) {
		this._preloaderState = value;

		this.preloaderStateSubject.next(value);
	}

	constructor(
		public router: Router,
		public http: HttpClient,
		public emitter: EmitterService,
		public auth: AuthService,
		public transaction: TransactionService,
		public project: ProjectService,
		public invoice: InvoiceService,
		public account: AccountService,
		public client: ClientService
	) {}

	parseErrors(error: HttpErrorResponse) {
		const status = error.status;
		if (status == 422) {
			const body = error.error.errors;
			let errors: FormError[] = [];
			if (body) {
				for (let controlName in body) {
					let errorItem = new FormError();
					errorItem.controlName = controlName;
					errorItem.errors = [];
					for (let errorKey in body[controlName]) {
						errorItem.errors.push({
							key: errorKey,
							message: body[controlName][errorKey]
						});
					}
					errors.push(errorItem);
				}
			}
			return errors;
		}
		return [];
	}

	submit(
		endPoint: Observable<any>,
		success?: (res) => void,
		error?: (error: HttpErrorResponse, errorObj?: FormError[]) => void,
		showError: boolean = true
	) {
		this.preloaderState = true;
		endPoint.subscribe(
			res => {
				this.preloaderState = false;
				if (success) {
					success(res);
				}
			},
			(err: HttpErrorResponse) => {
				this.preloaderState = false;
				let errorObj = this.parseErrors(err);
				if (error) {
					error(err, errorObj);
				}
			}
		);
	}

	confirm(text: string, onConfirm = () => {}) {
		this.emitter.emit("confirm-dialog", {
			text: text,
			onConfirm: onConfirm
		});
	}

	toast(toast: Toast) {
		this.emitter.emit("show-toast", toast);
	}

	delete(
		endpoint: Observable<any>,
		confirm: { text: string; onConfirm?: (data?: any) => void },
		toast?: Toast
	) {
		this.confirm(confirm.text, () => {
			this.submit(endpoint, (data: any) => {
				if (confirm.onConfirm) {
					confirm.onConfirm(data);
				}
				if (toast) {
					this.toast(toast);
				}
			});
		});
	}

	getCountries(params: any = {}): Observable<Country[]> {
		if (this._countries) {
			return of(this._countries);
		}
		return this.http
			.get(`/country`, {
				params: params
			})
			.pipe(
				map(data => {
					let res = plainToClass(Country, data["data"]);
					this._countries = res;
					return res;
				})
			);
	}

	getDashboard(): Observable<any> {
		return this.http.get(`/dashboard`);
	}
}
