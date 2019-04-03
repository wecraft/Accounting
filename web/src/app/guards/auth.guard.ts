import { Injectable } from "@angular/core";
import {
	CanActivate,
	Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanActivateChild,
	CanLoad,
	Route
} from "@angular/router";
import { AppService } from "../app.service";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
	constructor(private service: AppService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> {
		const url: string = state.url;

		return this.checkLogin(url);
	}

	canActivateChild(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> {
		return this.canActivate(route, state);
	}

	canLoad(route: Route): Observable<boolean> {
		return this.checkLogin();
	}

	checkLogin(url?: string): Observable<boolean> {
		return this.service.auth
			.me()
			.pipe(
				//take(1),
				map(user => {
					this.service.auth.authUser = user;

					return true;
				})
			)
			.pipe(
				catchError(err => {
					this.service.auth.redirectUrl = url || "/";

					this.router.navigate(["/auth/login"]);
					return of(false);
				})
			);
	}
}
