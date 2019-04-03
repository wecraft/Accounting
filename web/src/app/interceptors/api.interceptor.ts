import { Injectable, Injector, Inject, LOCALE_ID } from "@angular/core";
import { Observable } from "rxjs";
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest
} from "@angular/common/http";

import { environment } from "../../environments/environment";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
	locale: string;

	constructor(@Inject(LOCALE_ID) locale: string) {
		this.locale = locale;
	}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		let url = req.url;
		if (url.startsWith("/")) {
			url = environment.apiHost + url;
		}

		let headers: any = {};

		headers.Offset = new Date().getTimezoneOffset();
		headers["Web-Origin"] = environment.origin;
		headers["Accept-Language"] = this.locale;

		const newReq = req.clone({
			url: url,
			setHeaders: headers
		});

		return next.handle(newReq);
	}
}
