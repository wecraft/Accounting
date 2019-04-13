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

	getClientsCount(): Observable<number> {
		return this.http.get(`/client/count`).pipe(map(data => data["data"]));
	}

	getClient(id: number, params: any = {}): Observable<Client> {
		return this.http
			.get(`/client/${id}`, {
				params: params
			})
			.pipe(
				map(data => {
					return plainToClass(Client, data["data"] as Client);
				})
			);
	}

	updateClient = (id: number, data: FormData): Observable<Client> => {
		data.append("_method", "PUT");
		return this.http.post(`/client/${id}`, data).pipe(
			map(data => {
				return plainToClass(Client, data["data"] as Client);
			})
		);
	};

	createClient = (data: FormData): Observable<Client> => {
		return this.http.post(`/client`, data).pipe(
			map(data => {
				return plainToClass(Client, data["data"] as Client);
			})
		);
	};

	deleteClient(id: number): Observable<any> {
		return this.http.delete(`/client/${id}`);
	}
}
