import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		let authUser: string = localStorage.getItem("authUser");

		let headers: any = {};

		if (authUser) {
			headers.Authorization = `Bearer ${authUser}`;
		}

		request = request.clone({
			setHeaders: headers
		});

		return next.handle(request);
	}
}
