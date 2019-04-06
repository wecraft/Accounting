import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { plainToClass } from "class-transformer";
import { map } from "rxjs/operators";
import { Account, Currency } from "src/app/models";

@Injectable()
export class AccountService {
	private _accounts: Account[];
	private _currencies: Currency[];

	constructor(public http: HttpClient) {}

	getAccounts(params: any = {}): Observable<Account[]> {
		if (this._accounts) {
			return of(this._accounts);
		}
		return this.http
			.get(`/account`, {
				params: params
			})
			.pipe(
				map(data => {
					let res = plainToClass(Account, data["data"]);
					this._accounts = res;
					return res;
				})
			);
	}

	getCurrencies(params: any = {}): Observable<Currency[]> {
		if (this._currencies) {
			return of(this._currencies);
		}
		return this.http
			.get(`/currency`, {
				params: params
			})
			.pipe(
				map(data => {
					let res = plainToClass(Currency, data["data"]);
					this._currencies = res;
					return res;
				})
			);
	}
}
