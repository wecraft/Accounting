import { Injectable } from "@angular/core";
import {
	CanActivate,
	Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	CanActivateChild,
	Route
} from "@angular/router";
import { AppService } from "../app.service";

@Injectable()
export class GuestGuard implements CanActivate, CanActivateChild {
	constructor(private service: AppService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		return this.checkLogin(route.queryParams);
	}

	canActivateChild(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean {
		return this.canActivate(route, state);
	}

	canLoad(route: Route): boolean {
		return this.checkLogin();
	}

	checkLogin(queryParams: any = {}): boolean {
		if (!localStorage.getItem("authUser")) {
			return true;
		}

		// Navigate to the root
		this.router.navigate(["/"], {
			queryParams: queryParams
		});
		return false;
	}
}
