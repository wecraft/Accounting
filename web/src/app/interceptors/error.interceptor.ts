import { Injectable, Injector } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpClient,
	HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { catchError, map, shareReplay, tap, mergeMap } from "rxjs/operators";
import { AuthService } from "../components/auth/auth.service";

import { environment } from "../../environments/environment";
import { AppService } from "../app.service";
import { TOAST_DEFAULT_ERROR } from "../components/toast/toasts";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	refreshObservable: Observable<any>;

	constructor(
		private authService: AuthService,
		private inj: Injector,
		private service: AppService
	) {}

	refreshAuthToken() {
		console.log("REFRESH");
		// Get the auth header from the service.
		const http = this.inj.get(HttpClient);
		const token = localStorage.getItem("authUser");
		const refreshEndpoint = `${
			environment.apiHost
		}/auth/refresh?token=${token}&r=${new Date().getTime()}`;

		return (this.refreshObservable = http
			.get(refreshEndpoint, { observe: "response" })
			.pipe(
				map(res => {
					return res.body["access_token"];
				}),
				catchError((err: HttpErrorResponse) => {
					this.authService.logout();
					return throwError(err);
				})
			)
			.pipe(
				tap(() => {
					this.refreshObservable = null;
				})
			)
			.pipe(shareReplay()));

		// .pipe(do(() => {
		// 	this.refreshObservable = null;
		// }))
		// .share());
	}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((err: HttpErrorResponse) => {
				const errorMsg = err.error.message;

				if (err.status === 401) {
					if (errorMsg == "expired_token") {
						return (
							this.refreshObservable || this.refreshAuthToken()
						).pipe(
							mergeMap(token => {
								if (token) {
									localStorage.setItem("authUser", token);

									const repeatAuthReq = request.clone({
										headers: request.headers.set(
											"Authorization",
											`Bearer ${token}`
										)
									});

									return next.handle(repeatAuthReq);
								}
							})
						);
					} else {
						this.authService.logout();
					}
				} else {
				}

				const error = err.error.message;

				// setTimeout(() => {
				// 	this.service.preloaderState = false;
				// 	this.service.toast(TOAST_DEFAULT_ERROR);
				// });

				console.log("Error:", err);

				return throwError(err);
			})
		);
	}
}
