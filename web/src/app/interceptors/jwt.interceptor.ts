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

		let authProfile: string = localStorage.getItem("authProfile");

		let authListing: string = localStorage.getItem("authListing");

		let headers: any = {};

		if (authUser) {
			headers.Authorization = `Bearer ${authUser}`;
		}

		if (authProfile) {
			headers.profile = authProfile;
		}

		if (authListing) {
			headers.listing = authListing;
		}

		request = request.clone({
			setHeaders: headers
		});

		return next.handle(request);
	}
}
