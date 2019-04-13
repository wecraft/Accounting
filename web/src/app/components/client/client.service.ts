import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { plainToClass } from "class-transformer";
import { map } from "rxjs/operators";
import { Client } from "src/app/models";

@Injectable()
export class ClientService {
	constructor(public http: HttpClient) {}

	getClients = (params: any = {}): Observable<Client[]> => {
		return this.http
			.get(`/client`, {
				params: params
			})
			.pipe(
				map(data => {
					return plainToClass(Client, data["data"]);
				})
			);
	};
}
